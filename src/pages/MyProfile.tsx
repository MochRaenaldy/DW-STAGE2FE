import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import useStore from "../stores/hooks";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Profile = () => {
  const navigate = useNavigate();
 const { user } = useStore();

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
            width: "1s00%",
            height: 100,
            borderRadius: 1,
            bgcolor: "primary.main",
          }}
        />
        <Box
          sx={{
            mt: -6,
            ml: 2,
            width: 10,
            border: "50px solid",
            borderRadius: 50,
            position: "fixed",
            color: "red",
          }}></Box>
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
            // onClick={() => setOpenModal(true)}
            >
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
    </div>
  );
}
export default Profile