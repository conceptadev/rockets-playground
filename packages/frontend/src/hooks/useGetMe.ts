import { useEffect } from "react";
import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { useAuth } from "@concepta/react-auth-provider";

type UseGetMeProps = (immediate?: boolean) => {
  execute: () => void;
  isPending: boolean;
  user?: any;
  setUser: (user: any) => void;
};

const useGetMe: UseGetMeProps = (immediate) => {
  const { get } = useDataProvider();
  const { user, setUser, accessToken } = useAuth();

  const getMe = () =>
    get({
      uri: "/me",
    });

  const { execute, isPending } = useQuery<any>(getMe, immediate, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    if (accessToken && !user) {
      execute();
    }
  }, [accessToken]);

  return {
    execute,
    isPending,
    user: user as unknown as any,
    setUser,
  };
};

export default useGetMe;
