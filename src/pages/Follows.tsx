import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Box, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Follows = () => {
  const navigate = useNavigate();
  return (
    <>
      <p
        style={{ marginLeft: 10, cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}>
        <ArrowBackOutlinedIcon /> Follows
      </p>

      <Box sx={{ borderBottom: "1px solid gray" }}>
        <Typography p={2} variant="h5">
          Follow
        </Typography>
        <Stack direction="row" height={"40px"} alignItems={"center"}>
          <NavLink
            to={"followers"}
            style={{
              flex: 1,
              color: "gray",
              borderRadius: "0",
              textDecoration: "none",
              textAlign: "center",
            }}>
            Followers
          </NavLink>
          <NavLink
            to={"following"}
            style={{
              flex: 1,
              color: "gray",
              borderRadius: "0",
              textDecoration: "none",
              textAlign: "center",
            }}>
            Following
          </NavLink>
        </Stack>
      </Box>
    </>
  );
};

export default Follows;
