import { Navigate, Outlet } from "react-router-dom";
import useStore from "../stores/hooks";

const AuthLayout = () => {
   const { isLogin } = useStore();

   if (isLogin) {
      return <Navigate to="/" />;
   }

   return <Outlet />;
};

export default AuthLayout;