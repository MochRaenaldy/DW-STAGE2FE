import { useNavigate } from "react-router-dom";
import { Avatar, Box, Container, Typography } from "@mui/material";
import useStore from "../stores/hooks";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditProfile from "../components/editProfile";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <Container
        style={{ border: "1px solid gray", padding: 10, width: "100%" }}>
        <div style={{ display: "flex" }}>
          <p
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}>
            <ArrowBackOutlinedIcon />
          </p>{" "}
          My Profile
        </div>

        <Box
          sx={{
            width: "100%",
            height: 100,
            borderRadius: 1,
            backgroundImage:
              "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          }}
        />
        <Box
          sx={{
            mt: "-30px",
            ml: 2,
            borderRadius: 50,
            position: "absolute",
          }}>
          <Avatar sx={{ bgcolor: "red", width: "70px", height: "70px" }}>
            <span style={{ fontSize: 10 }}>
              {user.username}
              {/* {user.username.charAt(0).toUpperCase()x} */}
            </span>
          </Avatar>
        </Box>
        <Box
          sx={{
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
            paddingRight: "20px",
          }}>
          <button
            style={{
              marginTop: 10,
              padding: 6,
              borderRadius: 50,
              color: "white",
              backgroundColor: "#1d1d1d",
              border: "1px solid white",
              cursor: "pointer",
            }}
            onClick={() => setOpenModal(true)}>
            Edit Profile
          </button>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "bold", ml: 1, mt: 3 }}>
          {user.fullName}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          <span
            onClick={() => {
              navigate("/my-profile");
            }}
            style={{ color: "gray", cursor: "pointer" }}>
            @audinafh
          </span>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
          Picked over the worms , and weird fishes
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          291 <span style={{ color: "gray" }}>Following </span> 23{" "}
          <span style={{ color: "gray" }}>Followers</span>
        </Typography>
      </Container>
      {openModal && (
        <EditProfile open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};
export default Profile;
