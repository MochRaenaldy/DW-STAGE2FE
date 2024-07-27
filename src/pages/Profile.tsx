import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const dummy = [
    {
      id: 1,
      user: {
        username: "Indah Prakarya"
      },
      content: "kalian pernah ga sih main instagram tapi ga bisa dibuka"
    },

  ];

  return (
    <div>
      {dummy.map((post) => (
        <div key={post.id} >
          <div style={{ display: "flex" }}>
            <p style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => { navigate("/"); }}>
              <Icon icon={"ep-back"} /></p> {post.user.username}
          </div>
          <Box>
            <Container style={{ borderBottom: "1px solid gray", padding: 10 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", ml: 1 }}
              >
                My Profile
              </Typography>

              <Box
                sx={{
                  height: 100,
                  borderRadius: 1,
                  bgcolor: 'gray',
                }} />
              <Box
                sx={{
                  mt: -6,
                  ml: 2,
                  width: 10,
                  border: "50px solid",
                  borderRadius: 50,
                  position: 'fixed',
                  color: '',
                }}
              >
              </Box>
              <Box>
                <button
                  style={{
                    display: "flex",
                    marginTop: 10,
                    marginLeft: "auto",
                    padding: 6,
                    borderRadius: 50,
                    color: "white",
                    backgroundColor: "#1d1d1d",
                    border: "1px solid white",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Follow
                </button>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", ml: 1, mt: 3 }}
              >
                {post.user.username}
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", ml: 2 }}
              >
                <span onClick={() => { navigate("/profile"); }} style={{ color: "gray", cursor: "pointer" }}>{post.user.username}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", ml: 1 }}
              >
                Picked over the worms , and weird fishes
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", ml: 2 }}
              >
                291 <span style={{ color: "gray" }}>Following </span> 23 <span style={{ color: "gray" }}>Followers</span>
              </Typography>
            </Container>
          </Box>
        </div>

      ))}
    </div>
  );
}
export default Profile