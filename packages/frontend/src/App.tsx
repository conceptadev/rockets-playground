import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { RocketsProvider, createConfig } from "@concepta/react-material-ui";
import { Router, Resource, ChildRoutes } from "@concepta/react-navigation";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignInScreen from "./pages/SignIn";
import UsersScreen from "./pages/Users";
import ProfileScreen from "./pages/Profile";
import {
  signInProps,
  forgotPasswordProps,
  changePasswordProps,
} from "./authConstants";
import useGetMe from "./hooks/useGetMe";
import Logo from "./assets/logo.svg";

const Routes = () => {
  const navigate = useNavigate();
  const { user } = useGetMe();

  return (
    <ChildRoutes
      renderSignIn={(home) => <SignInScreen home={home} />}
      renderSignUp={() => null}
      authModuleProps={{
        signIn: signInProps,
        forgotPassword: forgotPasswordProps,
        resetPassword: {
          ...changePasswordProps,
          query: {
            onSuccess: () => {
              toast.success("Password successfully changed.");
              navigate("/sign-in");
            },
            onError: () => {
              toast.error("Password change failed. Please try again.");
            },
          },
        },
      }}
      navbarProps={{
        text: user?.userProfile?.fullName || "",
        subText: user?.email || "",
      }}
      drawerProps={{
        logo: Logo,
      }}
    >
      <Resource
        id="/users"
        name="Users"
        icon={<PeopleAltOutlinedIcon />}
        page={<UsersScreen />}
      />

      <Resource
        id="/profile"
        name="Profile"
        icon={<PersonOutlinedIcon />}
        page={<ProfileScreen />}
      />
    </ChildRoutes>
  );
};

const AdminProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const config = createConfig({
    dataProvider: {
      apiUrl: import.meta.env.VITE_PUBLIC_API_URL,
    },
    auth: {
      onAuthError: () => {
        toast.error(
          "Invalid username or password. Please check your credentials and try again."
        );
      },
      onLogout: () => {
        navigate("/sign-in");
      },
      handleRefreshTokenError: () => {
        toast.error("Your session has ended. Please log in again to continue.");
        navigate("/sign-in");
      },
      handleForbiddenAccessError: () => {
        toast.error("You are not authorized to access this resource.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/sign-in");
      },
    },
  });

  return (
    <RocketsProvider {...config}>
      <ToastContainer
        hideProgressBar
        position="top-center"
        limit={3}
        autoClose={3000}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
      </LocalizationProvider>
    </RocketsProvider>
  );
};

const App = () => (
  <Router
    rootElement={<AdminProvider />}
    childRoutes={<Routes />}
    initialRoute="/users"
  />
);

export default App;
