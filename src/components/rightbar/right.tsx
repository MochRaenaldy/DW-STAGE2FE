import { Avatar, Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate, } from "react-router-dom";
import useStore from "../../stores/hooks";

import { useEffect, useState } from "react";
import EditProfile from "../editProfile";

import {
  findAll,
  
} from "../../libs/api/call/user";
import {  IUserList } from "../../types/store";

import { api } from "../../libs/api";

// import baseUrl from "../../utils/baseUrl";

const Rightbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user ,getUsers, users} = useStore();
  // const params = useParams();
  const userId = user.id;
  const [photo] = useState<any>(null);
  const [dataUser, setDataUser] = useState<IUserList[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [isFollow, setisFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusFollow, setStatusFollow] = useState<Map<number, boolean>>(new Map());
  // const [datauserbaru, setDatauserbaru] = useState<IUserList[]>();
  const [follows, setFollows] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);

  console.log(users);

  const followFunc = async (followersId: number , followingId: number) => {
    try {
    const res = await api.post("/follow" , {followersId, followingId});
    if (res.data) {
      setStatusFollow((prev) => new Map(prev).set(  followingId, true));
    }
  } catch (error) {
  } finally {
    setLoading(false)
  }
};

  const unfollow = async (followersId: number, followingId: number) => {
    setLoading(true)
    try {
      await api.post("/follow/unfollow", {followersId, followingId});
      setStatusFollow((prev) => new Map(prev).set(  followingId, false));
    } catch (error) {
    } finally{
      setLoading(false)
    }
  };

  const countFollow = async (userId: number) => {
    const res = await api.get(`/users/follows/${userId}`);
    setFollowers(res.data.followers);
    setFollows(res.data.following);
  };

  useEffect(() => {
    countFollow(userId);
  }, [userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      getUsers(userId);
    };
    fetchUsers();
  }, [userId]);


    useEffect(() => {
      const checkfollow = async (followersId: number, users: IUserList[]) => {
        setLoading(true);
        try {
          const res = await api.post("/follow/check", { followersId, users });
          const followMap = new Map<number, boolean>(
            res.data.map((user: { id: number; isFollowing: boolean }) => [
              user.id,
              user.isFollowing,
            ])
          );
          const updatedStatusFollow = new Map<number, boolean>(
            users.map((user) => [user.id, followMap.get(user.id) || false])
          );
          setStatusFollow(updatedStatusFollow);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      if (users.length > 0) {
        checkfollow(userId, users);
      }
    }, [userId, users]);

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
              <img
                src={
                  photo ||
                  "https://rerollcdn.com/GENSHIN/Characters/1/Clorinde.png"
                }
              />
              <span style={{ fontSize: 10 }}>
                {user.username}
                {}
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
            <span style={{ color: "gray" }}>{followers}Follow</span>{" "}
            {
              <span style={{ color: "gray" }}>
                {follows} Followers
                {/*dataUser.followers*/}{" "}
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
          {users &&
            users?.map((post) => {
              const isFollowing = statusFollow.get(post.id);
              return (
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid gray",
                    padding: "10px",
                  }}>
                  {user.profile_pic ? (
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src={`${user.profile_pic}`}
                    />
                  ) : (
                    <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                      <img
                        src={`${user.profile_pic}`}
                        alt=""
                      />
                      <span style={{ fontSize: 10 }}>
                        {user.username}
                        {dataUser?.length}
                        {/* {user.username.charAt(0).toUpperCase()} */}
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
                    {isFollowing ? (
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
                        type="submit"
                        onClick={() => unfollow(userId, post.id)}>
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
                        type="submit"
                        onClick={() => followFunc(userId, post.id)}>
                        Follow
                      </button>
                    )}
                    disabled = {loading}
                  </div>
                </div>
              );
            })}
        </div>
      </Container>

      {openModal && (
        <EditProfile open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </Box>
  );
};

export default Rightbar;
