import { useEffect } from "react";
import { useNavigate } from "react-router";

const useSocialRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    switch (parsedUrl.pathname) {
      case "/ssi/google": {
        navigate(`/ssi/google${parsedUrl.search}`);
        break;
      }
      case "/ssi/apple": {
        navigate(`/ssi/apple${parsedUrl.search}`);
        break;
      }
    }
  }, [navigate]);
};

export default useSocialRedirect;
