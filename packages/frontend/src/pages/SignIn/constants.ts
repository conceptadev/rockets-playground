import { SchemaFormProps } from "@concepta/react-material-ui";
import {
  CustomTextFieldWidget,
  CustomPasswordFieldWidget,
} from "@concepta/react-material-ui/dist/styles/CustomWidgets";
import { ValidationRule } from "@concepta/react-material-ui/dist/utils/form/validation";
import { SignInFormData } from ".";
import { emailValidation } from "../../utils";

export const schema: SchemaFormProps["schema"] = {
  type: "object",
  properties: {
    email: { type: "string", title: "Email" },
    password: { type: "string", title: "Password" },
  },
};

export const uiSchema = {
  email: {
    "ui:widget": CustomTextFieldWidget,
  },
  password: {
    "ui:widget": CustomPasswordFieldWidget,
  },
};

export const validationRules: ValidationRule<SignInFormData>[] = [
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
  {
    field: "password",
    test: (value) => !value,
    message: "Password is required.",
  },
];
