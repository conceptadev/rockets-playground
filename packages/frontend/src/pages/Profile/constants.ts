import { UiSchema, RJSFSchema, CustomValidator } from "@rjsf/utils";
import { CustomTextFieldWidget } from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { CustomPasswordFieldWidget } from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { validatePasswordScore } from "@concepta/react-material-ui/dist/components/TextField/utils";

type PasswordUpdateForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
};

export const profileFormSchema: RJSFSchema = {
  type: "object",
  required: ["fullName", "nickname", "email"],
  properties: {
    fullName: { type: "string", title: "Full Name", minLength: 3 },
    nickname: { type: "string", title: "Nickname", minLength: 3 },
    email: { type: "string", title: "Email", minLength: 3, readOnly: true },
  },
};

export const passwordChangeFormSchema: RJSFSchema = {
  type: "object",
  required: ["oldPassword", "newPassword", "confirmNewPassword"],
  properties: {
    oldPassword: { type: "string", title: "Current password" },
    newPassword: { type: "string", title: "New password" },
    confirmNewPassword: { type: "string", title: "Confirm new password" },
  },
};

export const passwordChangeUiSchema: UiSchema = {
  oldPassword: {
    "ui:widget": CustomPasswordFieldWidget,
  },
  newPassword: {
    "ui:widget": CustomPasswordFieldWidget,
    "ui:passwordStrengthConfig": {
      hideStrengthBar: false,
      hideRulesText: false,
    },
  },
  confirmNewPassword: {
    "ui:widget": CustomPasswordFieldWidget,
  },
};

export const customValidate: CustomValidator<
  PasswordUpdateForm,
  RJSFSchema,
  Record<string, unknown>
> = (formData, errors) => {
  if (formData?.confirmNewPassword !== formData?.newPassword) {
    errors?.confirmNewPassword?.addError("Your passwords don't match.");
  }
  if (!validatePasswordScore(formData?.newPassword ?? "")) {
    errors?.newPassword?.addError(
      "Your password do not meet the security criteria."
    );
  }

  return errors;
};
