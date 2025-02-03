import { SchemaFormProps } from "@concepta/react-material-ui";
import { CustomPasswordFieldWidget } from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { ResetPasswordFormData } from ".";
import { ValidationRule } from "@concepta/react-material-ui/dist/utils/form/validation";

export const schema: SchemaFormProps["schema"] = {
  type: "object",
  properties: {
    password: { type: "string", title: "New Password" },
    confirmPassword: { type: "string", title: "Confirm Password" },
  },
};

export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const LOWERCASE_REGEX = new RegExp(/.*[a-z]/);
export const NUMBER_REGEX = new RegExp(/.*\d/);
export const SPECIAL_CHARS_REGEX = new RegExp(
  /.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/
);

export const uiSchema = {
  password: {
    "ui:widget": CustomPasswordFieldWidget,
    "ui:passwordStrengthConfig": {
      hideRulesText: false,
      rules: [
        {
          label: "8 characters",
          pattern: LENGTH_REGEX,
        },
        {
          label: "One uppercase character",
          pattern: UPPERCASE_REGEX,
        },
        {
          label: "One lowercase character",
          pattern: LOWERCASE_REGEX,
        },
        {
          label: "One special character",
          pattern: SPECIAL_CHARS_REGEX,
        },
        {
          label: "One number",
          pattern: NUMBER_REGEX,
        },
      ],
    },
  },
  confirmPassword: {
    "ui:widget": CustomPasswordFieldWidget,
  },
};

export const validationRules: ValidationRule<ResetPasswordFormData>[] = [
  {
    field: "password",
    test: (value) => !value,
    message: "Password is required.",
  },
  {
    field: "password",
    test: (value) => {
      const valueStr = value as string;

      return (
        !LENGTH_REGEX.test(valueStr) ||
        !UPPERCASE_REGEX.test(valueStr) ||
        !LOWERCASE_REGEX.test(valueStr) ||
        !NUMBER_REGEX.test(valueStr) ||
        !SPECIAL_CHARS_REGEX.test(valueStr)
      );
    },
    message: "Your password does not meet the security criteria.",
  },
  {
    field: "confirmPassword",
    test: (value) => !value,
    message: "Confirm password is required.",
  },
  {
    field: "confirmPassword",
    test: (value, formData) => value !== formData.password,
    message: "Password and confirm new password don't match.",
  },
];
