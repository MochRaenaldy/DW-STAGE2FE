import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Rightbar from "../components/rightbar/right";
import useStore from "../stores/hooks";

const Profile = () => {
  const navigate = useNavigate();
 const { user } = useStore();

  return (
    <div>
      <Container style={{ border: "1px solid gray", padding: 10 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 1 }}>
          My Profile
        </Typography>

        <Box
          sx={{
            width: 400,
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
        <Box>
          <button
            style={{
              marginLeft: 300,
              marginTop: 10,
              padding: 6,
              borderRadius: 50,
              color: "white",
              backgroundColor: "#1d1d1d",
              border: "1px solid white",
              cursor: "pointer",
            }}
            type="submit">
            Edit Profile
          </button>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "bold", ml: 1, mt: 3 }}>
          {user.fullName}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          <span
            onClick={() => {
              navigate("/profile");
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