// import { UserProfileActivityStatus } from "ses-ai-mu-portal-common"; // TODO: Fix this. Importing this breaks the app
import { SelectFieldProps } from "@concepta/react-material-ui";
import { ChipProps as MuiChipProps } from "@mui/material";

interface ChipProps {
  label: string;
  color: MuiChipProps["color"];
}

// TODO: map from UserProfileActivityStatus to statusNames once the import is fixed
export const statusNames: Record<string, ChipProps> = {
  ACTIVE: { label: "Active", color: "chipSuccess" },
  INACTIVE: { label: "Inactive", color: "chipDefault" },
  BLOCKED: { label: "Blocked", color: "chipError" },
};

export const statusOptions: SelectFieldProps["options"] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLOCKED", label: "Blocked" },
];
