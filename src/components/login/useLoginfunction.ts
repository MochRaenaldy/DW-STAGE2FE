import { setAuthToken } from "../../libs/api";
import * as authAsync from "../../libs/api/call/auth";
// import useStore from "../../stores/hooks";

export const useLoginFunction = () => {
  // const { setUser } = useStore();

  const login = async (username: string, password: string) => {
    try {
      const resLogin = await authAsync.login(username, password);
      // const profile = await authAsync.checkAuth();

      setTimeout(() => {
        // setUser(profile);
        setAuthToken(resLogin.token);
        localStorage.setItem("token", resLogin.token);
      }, 2000);

      return resLogin;
    } catch (error: any) {
      return error?.response;
    }
  };

  return {
    login,
  };
};
