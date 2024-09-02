import { Navigate, Outlet } from "react-router-dom";


const AuthLayout = () => {
   // const { isLogin } = useStore();
   const isLogin = localStorage.getItem("token");

   if (isLogin && isLogin !== undefined && isLogin !== "undefined") {
      return <Navigate to="/" />;
   }


   return <Outlet />;
};

export default AuthLayout;