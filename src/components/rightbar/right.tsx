import { Avatar, Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../stores/hooks";
import { dummyUserList } from "../../utils/dummyData";
import { useEffect, useState } from "react";
import EditProfile from "../editProfile";
import { IProfile } from "../../pages/Profile";
import {
  findAll,
  getUserById,
  getUserByUsername,
} from "../../libs/api/call/user";
import { IUserList } from "../../types/store";
import { DoorBack } from "@mui/icons-material";
import { api } from "../../libs/api";

const Rightbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStore();
  const params = useParams();
  const userId = user.id;
  const [dataUser, setDataUser] = useState<IUserList[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isFollow, setisFollow] = useState(false);
  const [datauserbaru, setDatauserbaru] = useState<IUserList[]>();

  const followFunc = async () => {
    const res = await api.post(`/follow/${userId}`);
    if (res.data) {
      setisFollow(true);
    }
  };

  const unfollow = async () => {
    const res = await api.delete(`follow/${userId}`);
    if (res.data) {
      setisFollow(false);
    }
  };

  useEffect (() => {
    const getuser = async (userId :number) => {
      try {
        const res = await api.get(`/users/userlogin/${userId}`);
        setDatauserbaru(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getuser(userId);
  })

  const fetchingData = async () => {
    const res = await findAll();
    console.log(res);
    if (res && res?.status === 200) {
      setDataUser(res?.data);
    } else {
      setDataUser([]);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

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
                {/* {user.username.charAt(0).toUpperCase()} */}
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
          <Typography variant="body1" sx={{ fontWeight: "bold", ml: 1, mt: 2 }}>
            {user.username}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
            <span
              onClick={() => {
                navigate("/my-profile");
              }}
              style={{ color: "gray", cursor: "pointer" }}>
              {user.fullName}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
            {user.bio}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
            <span style={{ color: "gray" }}>
              {/*dataUser.following*/} Following
            </span>{" "}
            {
              <span style={{ color: "gray" }}>
                {/*dataUser.followers*/} Followers{" "}
              </span>
            }
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
          {datauserbaru &&
            datauserbaru?.map((post) => (
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid gray",
                  padding: "10px",
                }}>
                {post.profile_pic ? (
                  <Avatar
                    sx={{ width: 20, height: 20 }}
                    src={post.profile_pic}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                    <span style={{ fontSize: 10 }}>
                      {post.username}
                      {/* {post.user.username.charAt(0).toUpperCase()} */}
                    </span>
                  </Avatar>
                )}
                <div
                  key={post.id}
                  style={{
                    paddingLeft: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}>
                  <div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        window.location.replace(`/profile/${post.id}`)
                      }>
                      {post.username}
                    </p>
                    <p style={{ color: "grey" }}>{post.email}</p>
                  </div>
                  {post.isfollow ? (
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

      {openModal && (
        <EditProfile open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </Box>
  );
};

export default Rightbar;
