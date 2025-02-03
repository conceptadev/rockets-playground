import { useState } from "react";
import { SchemaForm } from "@concepta/react-material-ui";
import {
  Container,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@concepta/react-auth-provider";
import { Navigate, useNavigate } from "react-router";
import { IChangeEvent } from "@rjsf/core";
import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { HttpError } from "@concepta/react-data-provider/dist/interfaces";
import { schema, uiSchema, validationRules } from "./constants";
import { validateForm } from "@concepta/react-material-ui/dist/utils/form/validation";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils";
import LogoColored from "../../assets/logo-colored.svg";

export type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordScreen = ({ home }: { home: string }) => {
  const { post } = useDataProvider();
  const navigate = useNavigate();
  const { accessToken: authAccessToken } = useAuth();

  const [formData, setFormData] = useState<ForgotPasswordFormData>();

  const accessToken = authAccessToken ?? localStorage.getItem("accessToken");

  const sendRecoveryPasswordLink = () => {
    return post({
      uri: "/auth/recovery/password",
      body: { email: formData?.email },
    });
  };

  const { execute, isPending } = useQuery(sendRecoveryPasswordLink, false, {
    onSuccess() {
      navigate("/");
      toast.success("Reset password link successfully sent to your e-mail.");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error as HttpError,
          "We encountered an error while sending the e-mail. Please try again later."
        )
      );
    },
  });

  const handleSubmit = (values: IChangeEvent<ForgotPasswordFormData>) => {
    const formData = values.formData;

    if (!formData?.email) return;

    execute({
      email: formData.email,
    });
  };

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  return (
    <Container sx={{ textAlign: "center", padding: "48px 0" }}>
      <img src={LogoColored} alt="Logo" />
      <Typography variant="h4" mt={1} fontWeight={600}>
        Recover Password
      </Typography>
      <Typography variant="h6" mt={1} mb={2} fontWeight={500} color="#1976D2">
        Don't worry, happens to the best of us
      </Typography>
      <Container maxWidth="xs">
        <Card sx={{ padding: "24px" }}>
          <SchemaForm.Form
            formData={formData}
            onChange={({ formData }) => {
              setFormData({
                email: formData.email,
              });
            }}
            customValidate={(formData, error) =>
              validateForm(formData, error, validationRules)
            }
            onSubmit={handleSubmit}
            schema={schema}
            uiSchema={uiSchema}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={isPending && <CircularProgress size={16} />}
              disabled={isPending}
              sx={{ mt: 3 }}
            >
              Send
            </Button>
          </SchemaForm.Form>
        </Card>
      </Container>
    </Container>
  );
};

export default ForgotPasswordScreen;
