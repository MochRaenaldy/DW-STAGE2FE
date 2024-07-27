import {
   Avatar,
  Box,
  Button,
  Container,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import COLORS from "../../utils/COLORS";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../stores/hooks";
import { dummyUserList } from "../../utils/dummyData";

const Rightbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const { user } = useStore();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
      }}>
      {location.pathname !== "/my-profile" && (
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
              position: "absolute",
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
      )}

      <Container
        style={{
          border: "1px solid gray",
          overflow: "auto",
          width: "100%",
          position: "relative",
        }}>
        <div
          style={{
            fontWeight: "bold",
            position: "sticky",
            zIndex: 9,
            top: 0,
            height: 30,
            backgroundColor: "#121212",
          }}>
          Suggested For You
        </div>

        <div>
          {dummyUserList.map((post) => (
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid gray",
                padding: "10px",
              }}>
              {post.image ? (
                <Avatar sx={{ width: 20, height: 20 }} src={post.image} />
              ) : (
                <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                  <span style={{ fontSize: 10 }}>
                    {post.user.username.charAt(0).toUpperCase()}
                  </span>
                </Avatar>
              )}
              <div
                key={post.userId}
                style={{
                  paddingLeft: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
                <div>
                  <p onClick={() => navigate(`/profile/${post.userId}`)}>
                    {post.user.username}
                  </p>
                  <p style={{ color: "grey" }}>{post.user.email}</p>
                </div>
                {post.isFollow ? (
                  <button
                    style={{
                      padding: 5,
                      borderRadius: 50,
                      color: "gray",
                      backgroundColor: "#1d1d1d",
                      border: "1px solid gray",
                      cursor: "pointer",
                      height: 30,
                    }}
                    type="submit">
                    Following
                  </button>
                ) : (
                  <button
                    style={{
                      padding: 5,
                      borderRadius: 50,
                      color: "white",
                      backgroundColor: "#1d1d1d",
                      border: "1px solid ",
                      cursor: "pointer",
                      height: 30,
                    }}
                    type="submit">
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default Rightbar;
