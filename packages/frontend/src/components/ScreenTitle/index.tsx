import { Box } from "@mui/material";
import { Typography } from "@mui/material";

interface ScreenTitleProps {
  title?: string;
  subtitle?: string;
}

const ScreenTitle = ({ title, subtitle }: ScreenTitleProps) => (
  <Box mt={3} mb={4}>
    {title && <Typography variant="h5">{title}</Typography>}
    {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
  </Box>
);

export default ScreenTitle;
