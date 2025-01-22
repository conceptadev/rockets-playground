import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { Box, Typography, Button } from "@mui/material";

const SocialSignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#4B4B4B",
          }}
        >
          Or
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "capitalize",
            borderColor: "#C8C8C8",
            color: "#191919",
            fontWeight: 400,
            height: "40px",
            width: "100%",
          }}
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_PUBLIC_API_URL}auth/google/login`,
              "_blank"
            )
          }
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<AppleIcon />}
          sx={{
            textTransform: "capitalize",
            borderColor: "#C8C8C8",
            color: "#191919",
            fontWeight: 400,
            height: "40px",
          }}
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_PUBLIC_API_URL}auth/apple/login`,
              "_blank"
            )
          }
        >
          Continue with Apple
        </Button>
      </Box>
    </Box>
  );
};

export default SocialSignIn;
