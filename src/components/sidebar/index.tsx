import COLORS from "../../utils/COLORS";
import NavItem from "./NavItem";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useStore, {} from "../../stores/hooks"

const Sidebar = () => {
   const navigate: any = useNavigate()
   const { clearUser } = useStore();
   const handlelogout = () => {
      navigate("/login")
      clearUser()
   }
   return (
      <Box
         sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 3,
         }}
      >
         <Typography
            variant="h3"
            sx={{ color: COLORS.PRIMARY, fontWeight: "bold" , ml :2}}
         >
            Circle
         </Typography>

         <NavItem />

         <Button
            variant="contained"
            color="success"
            sx={{
               color: "white",
               backgroundColor: COLORS.PRIMARY,
            }}
         >
            Create Post
         </Button>
         <Button
            startIcon={<Icon icon="solar:logout-2-outline" />}
            sx={{ mt: "auto" }}  onClick={handlelogout}
         >
            Logout
         </Button>
      </Box>
   );
};

export default Sidebar;