import { AuthModuleProps } from "@concepta/react-material-ui";
import { UiSchema } from "@rjsf/utils";
import { CustomPasswordFieldWidget } from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { toast } from "react-toastify";
import { validatePasswordScore } from "@concepta/react-material-ui/dist/components/TextField/utils";

export const commonAuthProps: Partial<AuthModuleProps> = {
  hideLogo: true,
  signUpPath: "",
  hideTitle: true,
};

export const signInProps: AuthModuleProps = {
  ...commonAuthProps,
  route: "signIn",
  formSchema: {
    type: "object",
    properties: {
      username: {
        type: "string",
        title: "Email",
        format: "email",
      },
    },
  },
};

export const forgotPasswordProps: AuthModuleProps = {
  ...commonAuthProps,
  route: "forgotPassword",
  query: {
    onSuccess: () => {
      toast.success(
        "If an account exists with this email, you will receive a password reset link shortly."
      );
    },
  },
};

const changePasswordUiSchema: UiSchema = {
  newPassword: {
    "ui:widget": CustomPasswordFieldWidget,
    "ui:passwordStrengthConfig": {
      hideStrengthBar: false,
      hideRulesText: false,
    },
  },
};

export const changePasswordProps: AuthModuleProps = {
  ...commonAuthProps,
  route: "resetPassword",
  formUiSchema: changePasswordUiSchema,
  submitButtonTitle: "Save Password",
  submitDataFormatter: (data: any) => {
    return {
      newPassword: data.newPassword,
      passcode: data.passcode,
    };
  },
  customValidation: [
    {
      field: "newPassword",
      test: (_, formData) => !validatePasswordScore(formData?.newPassword),
      message: "Your password do not meet the security criteria.",
    },
    {
      field: "confirmNewPassword",
      test: (value, formData) => value !== formData.newPassword,
      message: "Your passwords don't match. Please try again",
    },
  ],
};
