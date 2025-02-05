import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Dialog } from "@concepta/react-material-ui";
import { alpha } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ModalButtonProps {
  hide?: boolean;
  onClick?: () => void;
  title?: string;
  buttonProps?: ButtonProps;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  color?: ButtonProps["color"];
  icon?: ReactNode | null;
  iconBg?: string;
  title?: ReactNode;
  body?: ReactNode;
  isPending?: boolean;
  cancelButton?: ModalButtonProps;
  confirmButton?: ModalButtonProps;
}

const ConfirmationModal: FC<Props> = (props) => {
  const {
    open,
    handleClose,
    color,
    icon,
    iconBg,
    title,
    body,
    isPending,
    cancelButton,
    confirmButton,
  } = props;

  const modalIcon =
    color === "error" ? (
      <WarningAmberIcon color={color} />
    ) : (
      <CheckIcon color={color || "success"} />
    );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      maxWidth="xs"
      footer={
        isPending ? (
          <CircularProgress sx={{ mx: "auto" }} size={24} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              gap: 2,
              px: 1,
            }}
          >
            {!cancelButton?.hide && (
              <Button
                onClick={cancelButton?.onClick || handleClose}
                variant="outlined"
                sx={{ flex: 1 }}
                color={color}
                {...cancelButton?.buttonProps}
              >
                {cancelButton?.title || "Cancel"}
              </Button>
            )}
            {!confirmButton?.hide && (
              <Button
                onClick={confirmButton?.onClick}
                variant="contained"
                sx={{ flex: 1 }}
                color={color}
                {...confirmButton?.buttonProps}
              >
                {confirmButton?.title || "Confirm"}
              </Button>
            )}
          </Box>
        )
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          textAlign: "center",
        }}
      >
        {icon !== null && (
          <Box
            className="iconContainer"
            sx={{
              backgroundColor: (theme) =>
                iconBg ||
                (color
                  ? alpha(theme.palette[color].light, 0.22)
                  : alpha(theme.palette.success.light, 0.22)),
              alignSelf: "center",
              p: 1.5,
              borderRadius: "50%",
              lineHeight: 0,
            }}
          >
            {icon || modalIcon}
          </Box>
        )}

        {title && typeof title === "string" ? (
          <Typography align="center" variant="h6">
            {title}
          </Typography>
        ) : (
          title
        )}

        {body && typeof body === "string" ? (
          <Typography align="center" variant="body2" color="grey.600">
            {body}
          </Typography>
        ) : (
          body
        )}
      </Box>
    </Dialog>
  );
};
export default ConfirmationModal;
