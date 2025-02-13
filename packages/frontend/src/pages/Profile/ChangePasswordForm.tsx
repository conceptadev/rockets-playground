import { FC, useState } from "react";
import { SchemaForm } from "@concepta/react-material-ui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import { type PasswordChangeFormData } from "./types";
import {
  passwordChangeFormSchema,
  passwordChangeUiSchema,
  customValidate,
} from "./constants";

interface ChangePasswordFormProps {
  closePasswordChangeModal: () => void;
  openConfirmationModal: () => void;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  closePasswordChangeModal,
  openConfirmationModal,
}) => {
  const theme = useTheme();

  const [formData, setFormData] = useState<PasswordChangeFormData>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleFormSubmit = async () => {
    closePasswordChangeModal();
    openConfirmationModal();
  };

  return (
    <SchemaForm.Form
      schema={passwordChangeFormSchema}
      uiSchema={passwordChangeUiSchema}
      onSubmit={handleFormSubmit}
      noHtml5Validate={true}
      showErrorList={false}
      customValidate={customValidate}
      formData={formData}
      onChange={({ formData }) => {
        setFormData(formData);
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        mt={4}
        gap={2}
      >
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
            textTransform: "capitalize",
          }}
          onClick={() => closePasswordChangeModal()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "capitalize" }}
        >
          Save
        </Button>
      </Box>
    </SchemaForm.Form>
  );
};

export default ChangePasswordForm;
