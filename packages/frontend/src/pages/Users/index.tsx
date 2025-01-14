import { useState } from "react";
import { CrudModule } from "@concepta/react-material-ui";
import {
  CrudControlsProvider,
  useCrudControls,
} from "@concepta/react-material-ui/dist/modules/crud/useCrudControls";
import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { RJSFSchema, UiSchema, CustomValidator } from "@rjsf/utils";
import { UserProfileInterface } from "./types";
import { RoleInterface } from "@concepta/ts-common";
import { Button, Chip } from "@mui/material";
import { toast } from "react-toastify";
import { SimpleFilter } from "@concepta/react-material-ui/dist/components/Table/types";
import {
  CustomSelectWidget,
  CustomTextFieldWidget,
} from "@concepta/react-material-ui/dist/styles/CustomWidgets";

import ScreenTitle from "../../components/ScreenTitle";
import ConfirmationModal from "../../components/ConfirmationModal";
import { statusNames, statusOptions } from "./constants";
import TruncatedText from "../../components/TruncatedText";

type FormData = Record<string, unknown> | null;

interface PreparedUserData {
  id?: string;
  userId?: string;
  fullName?: string;
  email?: string;
  roleAssignedId?: string;
  roleId?: string;
  active?: boolean;
}

const UsersScreen = () => {
  const { refreshTable, setFormVisible } = useCrudControls();

  const { get, patch, post, del } = useDataProvider();
  const [modalOpen, setModalOpen] = useState(false);

  const getRoles = () =>
    get({
      uri: "/role",
      queryParams: {
        limit: 999,
      },
    });

  const { data: roles, isPending: rolesIsPending } = useQuery<RoleInterface[]>(
    getRoles,
    true,
    {
      onError: () => {
        toast.error(
          "An error happened while fetching roles. Please try again."
        );
      },
    }
  );

  const roleOptions =
    roles?.map?.((role) => ({
      value: role.id,
      label: role.name,
    })) || [];

  const roleFormOptions =
    roles?.map?.((role) => ({
      const: role.id,
      title: role.name,
    })) || [];

  const commonSchema: RJSFSchema = {
    type: "object",
    title: "User Details",
    properties: {
      fullName: { type: "string", title: "Full Name" },
      email: { type: "string", title: "Email", format: "email" },
      roleId: {
        type: "string",
        title: "Role",
        oneOf: roleFormOptions,
      },
    },
  };

  const editSchema: RJSFSchema = {
    ...commonSchema,
    required: ["fullName", "email", "roleId"],
    title: "Edit User",
  };

  const createSchema: RJSFSchema = {
    ...editSchema,
    title: "Add User",
  };

  const uiSchema: UiSchema = {
    roleId: {
      "ui:widget": CustomSelectWidget,
    },
    email: {
      "ui:widget": CustomTextFieldWidget,
    },
  };

  const editUiSchema: UiSchema = {
    ...uiSchema,
    fullName: {
      "ui:disabled": true,
    },
    email: {
      "ui:disabled": true,
    },
  };

  const prepareDataForForm = (data: FormData) => {
    const userData = data as unknown as UserProfileInterface;
    const preparedData: PreparedUserData = {
      id: userData.id,
      userId: userData.user?.id,
      fullName: userData.fullName,
      email: userData.user?.email?.trim(),
      roleAssignedId: userData.user?.userRoles?.[0]?.id,
      roleId: userData.user?.userRoles?.[0]?.role?.id,
      active: userData.user?.active,
    };
    return preparedData as FormData;
  };

  const toggleModal = () => setModalOpen((prv) => !prv);

  const changeUserStatus = async (id: string, status: boolean) => {
    try {
      await patch({
        uri: `/user/${id}`,
        body: {
          active: status,
        },
      });
      setModalOpen(false);
      toast.success(
        `User account successfully ${status ? "activated" : "deactivated"}.`
      );
      setFormVisible?.(false);
      refreshTable?.();
    } catch {
      toast.error(
        `An error happened while ${
          status ? "activating" : "deactivating"
        } the user. Please try again.`
      );
    }
  };

  const footerButton = (data: FormData) => {
    const isActive = data?.active;
    return (
      <>
        <Button
          variant="contained"
          onClick={toggleModal}
          color={isActive ? "error" : "success"}
        >
          {isActive ? "Deactivate" : "Activate"}
        </Button>
        <ConfirmationModal
          open={modalOpen}
          handleClose={toggleModal}
          color={isActive ? "error" : undefined}
          title={
            isActive
              ? "Are you sure you want to deactivate this user?"
              : "Are you sure you want to activate this user?"
          }
          body={
            isActive
              ? "This action will suspend the user account."
              : "This action will restore the user account."
          }
          confirmButton={{
            onClick: () => changeUserStatus(data?.userId as string, !isActive),
          }}
        />
      </>
    );
  };

  const changeRole = async (data: any) => {
    const userData = data.formData as PreparedUserData;
    const { userId, roleId, roleAssignedId } = userData;

    if (roleAssignedId) {
      try {
        await del({
          uri: `/role-assignment/user/${roleAssignedId}`,
        });
      } catch {
        toast.error(
          "An error happened while deleting the user role. Please try again."
        );
        return;
      }
    }
    try {
      await post({
        uri: `/role-assignment/user`,
        body: {
          role: {
            id: roleId,
          },
          assignee: {
            id: userId,
          },
        },
      });
    } catch {
      toast.error(
        "An error happened while assigning the new role. Please try again."
      );
      return;
    }

    toast.success("User role successfully updated.");

    setFormVisible?.(false);
    refreshTable?.();
  };

  const customValidate: CustomValidator<any, RJSFSchema, any> = (
    formData,
    errors
  ) => {
    ["fullName"].forEach((field) => {
      if (formData?.[field] && !formData?.[field]?.trim()) {
        errors[field]?.addError("is a required property.");
      }
    });

    return errors;
  };

  return (
    <CrudModule
      resource="user-profile"
      title={{
        name: "Users",
        component: <ScreenTitle title="Users" subtitle="Registered Users" />,
      }}
      hideBreadcrumb
      tableProps={{
        tableSchema: [
          { id: "id", label: "ID" },
          {
            id: "fullName",
            label: "FULL NAME",
            format: (data) => {
              const { fullName } = data as UserProfileInterface;

              return <TruncatedText width={130}>{fullName}</TruncatedText>;
            },
          },
          {
            id: "user.email",
            label: "EMAIL",
            format: (data) => {
              const {
                user: { email },
              } = data as UserProfileInterface;

              return <TruncatedText width={220}>{email}</TruncatedText>;
            },
          },
          {
            id: "userRole.role.name",
            label: "ROLE",
            format: (data) =>
              (data as UserProfileInterface)?.user?.userRoles?.[0]?.role?.name,
          },
          {
            id: "activityStatus",
            label: "STATUS",
            format: (data) => {
              const activityStatus = (data as UserProfileInterface)
                .activityStatus;

              const { label, color } = statusNames[activityStatus];
              return <Chip label={label} color={color} size="small" />;
            },
          },
          {
            id: "user.active",
            label: "ACCOUNT STATUS",
            format: (data) => {
              const isActive = (data as UserProfileInterface)?.user?.active;

              const { label, color } = isActive
                ? statusNames.ACTIVE
                : statusNames.INACTIVE;
              return <Chip label={label} color={color} size="small" />;
            },
          },
        ],
        filters: [
          {
            id: "user",
            label: "Search by name or email",
            type: "text",
            columns: 4,
          },
          {
            id: "role",
            label: "Role",
            type: "select",
            columns: 4,
            options: roleOptions,
            isLoading: rolesIsPending,
          },
          {
            id: "activityStatus",
            label: "Activity Status",
            type: "select",
            columns: 2,
            options: statusOptions,
          },
          {
            id: "accountStatus",
            label: "Account Status",
            type: "select",
            columns: 2,
            options: statusOptions.filter((item) => item.value !== "BLOCKED"),
          },
        ],
        customSearch: (data) => {
          const { user, role, activityStatus, accountStatus } =
            data as SimpleFilter;

          const filter = {
            $or: user
              ? [
                  {
                    fullName: { $contL: user },
                  },
                  {
                    "user.email": { $contL: user },
                  },
                ]
              : null,
            "user.userRoles.role.id": role ? { $eq: role } : null,
            activityStatus,
            "user.active":
              // Validate both `undefined` and `null`
              accountStatus != null
                ? {
                    $eq: accountStatus === "ACTIVE" ? true : false,
                  }
                : null,
          };

          return filter;
        },
      }}
      hideDeleteButton={true}
      detailsFormProps={{
        formSchema: commonSchema,
        formUiSchema: uiSchema,
        prepareDataForForm,
      }}
      editFormProps={{
        formSchema: editSchema,
        formUiSchema: editUiSchema,
        prepareDataForForm,
        submitDataFormatter: (data) => ({
          roleId: data?.roleId,
        }),
        hideCancelButton: true,
        customFooterContent: footerButton,
        onSubmit: changeRole,
        customValidate,
      }}
      createFormProps={{
        formSchema: createSchema,
        formUiSchema: uiSchema,
        onSuccess: () => toast.success("User successfully created."),
        onError: (error: any) => {
          const serverErrorMessage = error?.response?.data?.message;
          const serverErrorLength = serverErrorMessage?.length || 0;

          toast.error(
            serverErrorLength > 5
              ? serverErrorMessage
              : "An error happened while creating the user."
          );
        },
        customValidate,
      }}
    />
  );
};

const UsersWithControls = () => {
  return (
    <CrudControlsProvider>
      <UsersScreen />
    </CrudControlsProvider>
  );
};

export default UsersWithControls;
