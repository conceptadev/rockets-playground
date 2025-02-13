import { HttpError } from "@concepta/react-data-provider/dist/interfaces";

const getErrorMessage = (error: HttpError, defaultMessage: string) => {
  const errorMessage =
    typeof error?.response?.status === "number" && error.response.status !== 500
      ? error.response.data?.message
      : null;

  return errorMessage ?? defaultMessage;
};

export default getErrorMessage;
