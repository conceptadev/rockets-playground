import { SchemaFormProps } from "@concepta/react-material-ui";
import { CustomTextFieldWidget } from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { ValidationRule } from "@concepta/react-material-ui/dist/utils/form/validation";
import { ForgotPasswordFormData } from ".";
import { emailValidation } from "../../utils";

export const schema: SchemaFormProps["schema"] = {
  type: "object",
  properties: {
    email: { type: "string", title: "Email" },
  },
};

export const uiSchema = {
  email: {
    "ui:widget": CustomTextFieldWidget,
  },
};

export const validationRules: ValidationRule<ForgotPasswordFormData>[] = [
  {
    field: "email",
    test: (value) => !value,
    message: "Email is required.",
  },
  {
    field: "email",
    test: (_, formData) => !emailValidation(formData.email),
    message: "Please enter a valid email.",
  },
];
