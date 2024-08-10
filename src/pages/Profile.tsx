import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { dummyContentList, dummyUserList } from "../utils/dummyData";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams()

  console.log(typeof params.id)
  const newDummy = dummyUserList.filter((data) => data.userId == Number(params.id))

  return (
    <div>
      {newDummy.map((profile) => (
        <div key={profile.userId}>
          <div style={{ display: "flex" }}>
            <p
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}>
              <ArrowBackOutlinedIcon />
            </p>{" "}
            {profile.user.username}
          </div>
          <Box>
            <Container style={{ borderBottom: "1px solid gray", padding: 10 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", ml: 1 }}>
                {profile.user.username}
              </Typography>

              <Box
                sx={{
                  height: 100,
                  borderRadius: 1,
                  bgcolor: "gray",
                }}
              />
              {profile.image ? (
                <Avatar
                  sx={{
                    mt: -6,
                    ml: 2,
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                  }}
                  src={profile.image}
                />
              ) : (
                <Avatar
                  sx={{
                    mt: -6,
                    ml: 2,
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    background: "white",
                  }}>
                  <span style={{ fontSize: 50 }}>
                    {profile.user.username}
                    {/* {profile.user.username.charAt(0).toUpperCase()} */}
                  </span>
                </Avatar>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}>
                {profile.isFollow ? (
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
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", ml: 1, mt: 3 }}>
                {profile.user.username}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
                <span style={{ color: "gray", cursor: "pointer" }}>
                  {profile.user.email}
                </span>
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
                {profile.user.bio}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
                {profile.user.following}{" "}
                <span style={{ color: "gray" }}>Following </span>{" "}
                {profile.user.followers}{" "}
                <span style={{ color: "gray" }}>Followers</span>
              </Typography>
            </Container>
          </Box>
        </div>
      ))}
    </div>
  );
}
export default Profile