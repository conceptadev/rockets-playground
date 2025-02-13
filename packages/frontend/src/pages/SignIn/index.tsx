import { useState } from "react";
import { SchemaForm } from "@concepta/react-material-ui";
import { Container, Card, Typography, Link } from "@mui/material";
import { useAuth } from "@concepta/react-auth-provider";
import { Navigate } from "react-router";
import { IChangeEvent } from "@rjsf/core";
import { schema, uiSchema, validationRules } from "./constants";
import { validateForm } from "@concepta/react-material-ui/dist/utils/form/validation";
import SocialSignIn from "../../components/SocialSignIn";
import LogoColored from "../../assets/logo-colored.svg";

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
    <Container sx={{ textAlign: "center", padding: "48px 0" }}>
      <img src={LogoColored} alt="Logo" />
      <Typography variant="h4" mt={1} fontWeight={600}>
        Welcome
      </Typography>
      <Typography variant="h6" mt={1} mb={2} fontWeight={500} color="#1976D2">
        Sign in to continue
      </Typography>
      <Container maxWidth="xs">
        <Card sx={{ padding: "24px" }}>
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
            <SocialSignIn />
            <Container sx={{ marginTop: 3 }}>
              <Link href="/forgot-password" underline="none">
                Forgot your password?
              </Link>
            </Container>
            <SchemaForm.Button>Sign in</SchemaForm.Button>
          </SchemaForm.Form>
        </Card>
      </Container>
    </Container>
  );
};

export default SignInScreen;
