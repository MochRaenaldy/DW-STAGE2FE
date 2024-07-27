import { Avatar, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const NAV_ITEMS = [
  {
    name: "Home",
    path: "/",
    icon: {
      active: <OtherHousesIcon sx={{ color: "#fff" }} />,
      nonactive: <OtherHousesOutlinedIcon color="action" />,
    },
  },
  {
    name: "Search",
    path: "/search",
    icon: {
      active: <PersonRoundedIcon sx={{ color: "#fff" }} />,
      nonactive: <PersonSearchOutlinedIcon color="action" />,
    },
  },
  {
    name: "Follows",
    path: "/follows",
    icon: {
      active: <FavoriteRoundedIcon color="action" />,
      nonactive: <FavoriteBorderRoundedIcon color="action" />,
    },
  },
  {
    name: "Profile",
    path: "/my-profile",
    icon: {
      active: <AccountCircleIcon color="action" />,
      nonactive: <AccountCircleOutlinedIcon color="action" />,
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
              ml: 2,
              gap: 1,
            }}>
            {isActive ? item.icon.active : item.icon.nonactive}
            <Typography
              color={isActive ? "rgba(4, 200, 30, 1)" : "white"}
              sx={{ fontSize: "1.2rem", ml: 1 }}>
              {item.name}
            </Typography>
          </Box>
        )}
      </NavLink>
    );
  });
};

export default NavItem;
