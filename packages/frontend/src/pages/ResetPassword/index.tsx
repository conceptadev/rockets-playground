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
import { useSearchParams } from "react-router-dom";
import { IChangeEvent } from "@rjsf/core";
import { getErrorMessage } from "../../utils";
import { schema, uiSchema, validationRules } from "./constants";
import { validateForm } from "@concepta/react-material-ui/dist/utils/form/validation";
import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { HttpError } from "@concepta/react-data-provider/dist/interfaces";
import { toast } from "react-toastify";

import LogoColored from "../../assets/logo-colored.svg";

export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordScreen = ({ home }: { home: string }) => {
  const { patch } = useDataProvider();
  const navigate = useNavigate();
  const { accessToken: authAccessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState<ResetPasswordFormData>();

  const accessToken = authAccessToken ?? localStorage.getItem("accessToken");

  const createUser = (password: string) => {
    return patch({
      uri: "/auth/recovery/password",
      body: {
        passcode: token,
        newPassword: password,
      },
    });
  };

  const { execute, isPending: isPending } = useQuery(createUser, false, {
    onSuccess: () => {
      navigate("/");
      toast.success("Password successfully updated.");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error as HttpError,
          "We encountered an error while updating the password. Please try again later."
        )
      );
    },
  });

  const handleSubmit = (values: IChangeEvent<ResetPasswordFormData>) => {
    const formData = values.formData;

    if (!formData?.password || !formData?.confirmPassword) return;

    execute(formData.password);
  };

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  return (
    <Container sx={{ textAlign: "center", padding: "48px 0" }}>
      <img src={LogoColored} alt="Logo" />
      <Typography variant="h4" mt={1} fontWeight={600}>
        Change Password
      </Typography>
      <Typography variant="h6" mt={1} mb={2} fontWeight={500} color="#1976D2">
        Create your new passowrd
      </Typography>
      <Container maxWidth="xs">
        <Card sx={{ padding: "24px" }}>
          <SchemaForm.Form
            formData={formData}
            onChange={({ formData }) => {
              setFormData(formData);
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
              Change Password
            </Button>
          </SchemaForm.Form>
        </Card>
      </Container>
    </Container>
  );
};

export default ResetPasswordScreen;
