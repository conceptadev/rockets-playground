import { useState } from "react";
import { SchemaForm } from "@concepta/react-material-ui";
import { Box } from "@mui/material";
import { useAuth } from "@concepta/react-auth-provider";
import { Navigate } from "react-router";
import { IChangeEvent } from "@rjsf/core";
import { schema, uiSchema, validationRules } from "./constants";
import { validateForm } from "@concepta/react-material-ui/dist/utils/form/validation";
import SocialSignIn from "../../components/SocialSignIn";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignInScreen = ({ home }: { home: string }) => {
  const { accessToken: authAccessToken, doLogin } = useAuth();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const accessToken = authAccessToken ?? localStorage.getItem("accessToken");

  const handleSubmit = (values: IChangeEvent<SignInFormData>) => {
    const formData = values.formData;

    if (!formData?.email || !formData?.password) return;

    doLogin({
      username: formData.email,
      password: formData.password,
      loginPath: "/auth/login",
    });
  };

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: 438,
          width: "100%",
        }}
      >
        <SchemaForm.Form
          formData={formData}
          onChange={({ formData }) => {
            setFormData({
              email: formData.email,
              password: formData.password,
            });
          }}
          customValidate={(formData, error) =>
            validateForm(formData, error, validationRules)
          }
          onSubmit={handleSubmit}
          schema={schema}
          uiSchema={uiSchema}
        >
          <SchemaForm.Button>Submit</SchemaForm.Button>
        </SchemaForm.Form>
        <SocialSignIn />
      </Box>
    </Box>
  );
};

export default SignInScreen;
