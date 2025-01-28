import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

type ResponseData = {
  accessToken: string;
  refreshToken: string;
};

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { get } = useDataProvider();
  const [params] = useSearchParams();

  const saveTokensAndRedirect = (data: ResponseData) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    navigate("/users");
  };

  useQuery(
    () =>
      get({
        uri: `/auth/google/callback?${params}`,
      }),
    true,
    {
      onSuccess: (data: ResponseData) => saveTokensAndRedirect(data),
      onError: () => navigate("/sign-in"),
    }
  );

  return <div>Loading authentication data...</div>;
};

export default GoogleSignIn;
