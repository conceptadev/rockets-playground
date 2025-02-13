import { Typography } from "@mui/material";

type Props = {
  width: number;
  children: string;
  lines?: number;
};

const TruncatedText = ({ width, children, lines = 5 }: Props) => (
  <Typography
    sx={{
      width,
      display: "-webkit-box",
      WebkitLineClamp: lines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    }}
    title={children}
  >
    {children}
  </Typography>
);

export default TruncatedText;
