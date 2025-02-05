import { FC, useState, useEffect } from "react";
import { Dialog, Text } from "@concepta/react-material-ui";
import { useAuth } from "@concepta/react-auth-provider";
import { SchemaForm } from "@concepta/react-material-ui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import useTheme from "@mui/material/styles/useTheme";
import { toast } from "react-toastify";

import ScreenTitle from "../../components/ScreenTitle";
import ChangePasswordForm from "./ChangePasswordForm";
import ConfirmationModal from "./ConfirmationModal";
import { profileFormSchema, widgets } from "./constants";

import type { User } from "./types";

const ProfileScreen: FC = () => {
  const theme = useTheme();

  const { user } = useAuth();

  const [isPasswordChangeModalOpen, setPasswordChangeModalOpen] =
    useState<boolean>(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    email: "",
  });
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const openPasswordChangeModal = () => {
    setPasswordChangeModalOpen(true);
  };

  const closePasswordChangeModal = () => {
    setPasswordChangeModalOpen(false);
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  /* TODO: Implement BE call on form submit */
  const handleFormSubmit = async () => {
    setLoadingSubmit(true);

    setTimeout(() => {
      setLoadingSubmit(false);
      toast.success("Profile successfully updated");
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      const form = user as User;

      setFormData({
        fullName: form.userProfile?.fullName || "",
        nickname: form.userProfile?.nickname || "",
        email: form.email || "",
      });
    }
  }, [user]);

  return (
    <Box>
      <ScreenTitle title="Profile" subtitle="Update your profile" />

      <Box display="flex" mb={4}>
        <SchemaForm.Form
          schema={profileFormSchema}
          onSubmit={handleFormSubmit}
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
          formData={formData}
          onChange={({ formData }) => {
            setFormData(formData);
          }}
        >
          <Box mt={3}>
            <Text sx={{ fontWeight: 600, fontSize: "14px" }}>Password</Text>
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              onClick={openPasswordChangeModal}
            >
              Update Password
            </Button>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            borderTop="1px solid rgba(0,0,0, 0.2)"
            paddingTop={3}
            gap={2}
            mt={3}
          >
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoadingSubmit}
              sx={{ textTransform: "capitalize" }}
            >
              {isLoadingSubmit ? (
                <CircularProgress sx={{ color: "white" }} size={24} />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Box>

      <Dialog
        open={isPasswordChangeModalOpen}
        handleClose={closePasswordChangeModal}
        title="Update password"
      >
        <ChangePasswordForm
          closePasswordChangeModal={closePasswordChangeModal}
          openConfirmationModal={openConfirmationModal}
        />
      </Dialog>

      <Dialog
        open={isConfirmationModalOpen}
        handleClose={closeConfirmationModal}
      >
        <ConfirmationModal handleClose={closeConfirmationModal} />
      </Dialog>
    </Box>
  );
};

export default ProfileScreen;
