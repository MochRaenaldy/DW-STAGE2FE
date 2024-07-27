import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const NAV_ITEMS = [
   {
      name: "Home",
      path: "/",
      icon: {
         active: "solar:home-angle-bold",
         nonactive: "solar:home-angle-linear",
      },
   },
   {
      name: "Search",
      path: "/search",
      icon: {
         active: "mdi:user-search",
         nonactive: "mdi:user-search-outline",
      },
   },
   {
      name: "Follows",
      path: "/follows",
      icon: {
         active: "ion:heart",
         nonactive: "ion:heart-outline",
      },
   },
   {
      name: "Profile",
      path: "/my-profile",
      icon: {
         active: "carbon:user-avatar-filled",
         nonactive: "carbon:user-avatar",
      },
   },
];

const NavItem = () => {
   return NAV_ITEMS.map((item) => {
      return (
         <NavLink to={item.path} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     mb: 1,
                     ml : 2,
                     gap: 1,
                  }}
               >
                  <Icon
                     icon={isActive ? item.icon.active : item.icon.nonactive}
                     color={isActive ? "rgba(4, 200, 30, 1)" : "white"}
                     fontSize={"22px"}
                  />
                  <Typography
                     color={isActive ? "rgba(4, 200, 30, 1)" : "white"}
                     sx={{ fontSize: "1.2rem", ml : 1 }}
                  >
                     {item.name}
                  </Typography>
               </Box>
            )}
         </NavLink>
      );
   });
};

export default NavItem;