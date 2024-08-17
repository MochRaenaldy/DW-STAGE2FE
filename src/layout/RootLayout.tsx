import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar";
import useStore from "../stores/hooks";
import Rightbar from "../components/rightbar/right";

const RootLayout = () => {
  // const { isLogin } = useStore();
  const isLogin = localStorage.getItem("token");

  if (!isLogin || isLogin === undefined || isLogin === "undefined") {
    return <Navigate to="/auth/login" />;
  }
  

  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#1D1D1D",
          borderRight: "1px solid gray",
        }}>
        <Sidebar />
      </Box>
      <Box sx={{ flex: 2, overflow: "auto" }}>
        <Outlet />
      </Box>
      <Box sx={{ flex: 1.5, borderLeft: "1px solid gray" }}>
        <Rightbar />
        <Box />
      </Box>
    </Box>
  );
};

export default RootLayout;
