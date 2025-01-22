import { useEffect } from "react";
import useDataProvider, { useQuery } from "@concepta/react-data-provider";
import { useAuth } from "@concepta/react-auth-provider";
import { User } from "../pages/Profile/types";

type UseGetMeProps = (immediate?: boolean) => {
  execute: () => void;
  isPending: boolean;
  user?: User;
  setUser: (user: User) => void;
};

const useGetMe: UseGetMeProps = (immediate) => {
  const { get } = useDataProvider();
  const { user, setUser, accessToken } = useAuth();

  const getMe = () =>
    get({
      uri: "/me",
    });

  const { execute, isPending } = useQuery<User>(getMe, immediate, {
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
    user: user as User,
    setUser,
  };
};

export default useGetMe;
