import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { dummyContentList, dummyUserList } from "../utils/dummyData";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import useStore from "../stores/hooks";
import { useEffect, useState } from "react";
import { getUserById } from "../libs/api/call/user";
import { getAllPostByUserId } from "../libs/api/call/home";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import Media from "./Media"
import Like from "../components/Like/like";
import { IPostModel } from "../types/post";
import { api } from "../libs/api";
import { IUserList } from "../types/store";
import baseUrl from "../utils/baseUrl";

export interface IProfile {
  id: number;
  email: string;
  username: string;
  fullName: string;
  password: string;
  bio: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
  isFollow: boolean;
  following: number;
  followers: number;
}

const defaultData = {
  id: 0,
  email: "",
  username: "",
  fullName: "",
  password: "",
  bio: "",
  profile_pic: "",
  createdAt: "",
  updatedAt: "",
  isFollow: false,
  followers: 0,
  following: 0,
};

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dataUser, setDataUser] = useState<IProfile>(defaultData);
   const [dataPost, setDataPost] = useState([]);
     const { user, users, getUsers } = useStore();
     const userId = user.id;
     const baseUrll = "http://localhost:3000/uploads/";
     const [followers, setFollowers] = useState<number>(0);
     const [follows, setFollows] = useState<number>(0);
     const [loading, setLoading] = useState<boolean>(false);
     const [statusFollow, setStatusFollow] = useState<Map<number, boolean>>(
       new Map()
     );
  const [buttonActive, setButtonActive] = useState<"allpost" | "media">(
    "allpost"
  );
  // const newDummy = dummyUserList.filter((data) => data.userId == Number(params.id))
  const countFollow = async (userId: number) => {
    const res = await api.get(`/users/follows/${userId}`);
    setFollowers(res.data.followers);
    setFollows(res.data.following);
  };

  useEffect(() => {
    countFollow(userId);
  }, [userId]);


   const followFunc = async (followersId: number, followingId: number) => {
     try {
       const res = await api.post("/follow", { followersId, followingId });
       if (res.data) {
         setStatusFollow((prev) => new Map(prev).set(followingId, true));
       }
     } catch (error) {
     } finally {
       setLoading(false);
     }
   };

   const unfollow = async (followersId: number, followingId: number) => {
     setLoading(true);
     try {
       await api.post("/follow/unfollow", { followersId, followingId });
       setStatusFollow((prev) => new Map(prev).set(followingId, false));
     } catch (error) {
     } finally {
       setLoading(false);
     }
   };

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
    const res = await getUserById(params.id);
    if (res && res?.status === 200) {
      setDataUser(res?.data);
    } else {
      setDataUser(defaultData);
    }
  };
    useEffect(() => {
      fetchingData();
    }, []);

  const fetchingAllPost = async () => {
    const res = await getAllPostByUserId(params.id);
    console.log(res);
    if (res && res?.status === 200) {
      setDataPost(res?.data);
    } else {
      setDataPost([]);
    }
  };

    useEffect(() => {
      if (buttonActive === "allpost") {
        fetchingAllPost();
      } else {
        fetchingAllPost(); //ini buat mediaa
      }
    }, [buttonActive]);


  const isFollowing = statusFollow.get(user.id);
  return (
    <div key={dataUser?.id}>
      <div style={{ display: "flex" }}>
        <p
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}>
          <ArrowBackOutlinedIcon />
        </p>{" "}
        {dataUser.username}
      </div>
      <Box>
        <Container
          style={{
            borderBottom: "1px solid gray",
            padding: "0 10px",
            position: "relative",
          }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 1 }}>
            {dataUser.username}
          </Typography>

          <Box
            sx={{
              height: 100,
              borderRadius: 1,
              bgcolor: "gray",
              position: "relative",
            }}
          />
          {dataUser.profile_pic ? (
            <Avatar
              sx={{
                mt: -6,
                ml: 2,
                width: "100px",
                height: "100px",
                position: "absolute",
              }}
              src={`${baseUrl.baseUrlImg}${dataUser.profile_pic}`}
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
                {dataUser.username}
                {/* {dataUser.user.username.charAt(0).toUpperCase()} */}
              </span>
            </Avatar>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}>
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
                onClick={() => unfollow(userId, user.id)}>
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
                onClick={() => followFunc(userId, user.id)}>
                Follow
              </button>
            )}
          </Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", ml: 1, mt: 3 }}>
            {dataUser.username}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
            <span style={{ color: "gray", cursor: "pointer" }}>
              {dataUser.email}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
            {dataUser.bio}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
            {follows || 0} <span style={{ color: "gray" }}>Following </span>{" "}
            {followers || 0} <span style={{ color: "gray" }}>Followers</span>
          </Typography>
        </Container>
      </Box>

      <Box
        display="flex"
        sx={{
          flexDirection: "column",
          bgcolor: "black",
          height: "56vh",
          marginTop: "5px",
          borderRadius: "20px",
        }}>
        <div
          style={{
            display: "flex",
          }}>
          <Button
            sx={{
              width: "100%",
              color: "white",
              borderBottom:
                buttonActive === "allpost" ? "2px solid blue" : "1px solid",
              borderRadius: "0",
            }}
            variant="text"
            onClick={() => setButtonActive("allpost")}>
            All post
          </Button>
          <Button
            sx={{
              width: "100%",
              color: "white",
              borderBottom:
                buttonActive === "media" ? "2px solid blue" : "1px solid",
              borderRadius: "0",
            }}
            variant="text"
            onClick={() => setButtonActive("media")}>
            Media
          </Button>
        </div>
        {buttonActive === "allpost" ? (
          <div
            style={{
              overflowY: "auto",
              maxHeight: 500,
            }}>
            {dataPost.map((post: IPostModel) => (
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid gray",
                  padding: " 10px",
                }}>
                {post?.author?.profil_pic ? (
                  <Avatar
                    sx={{ width: 20, height: 20 }}
                    src={post.author.profil_pic}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                    <span style={{ fontSize: 10, display: "flex" }}>
                      {post.author.username}
                      {/* {post.user.username.charAt(0).toUpperCase()} */}
                    </span>
                  </Avatar>
                )}
                <div
                  key={post.id}
                  style={{
                    cursor: "pointer",
                    paddingBottom: 10,
                    paddingLeft: 8,
                  }}>
                  <div style={{ display: "flex" }}>
                    <h3
                      onClick={() => {
                        navigate("/profile/" + post.author.id);
                      }}
                      style={{
                        cursor: "pointer",
                        marginBottom: 4,
                        marginRight: "10px",
                      }}>
                      {post.author.username}
                    </h3>
                    <p style={{ color: "gray" }}> {post.author.email || ""}</p>
                  </div>

                  <p
                    onClick={() => {
                      navigate("/detail/" + post.id);
                    }}
                    style={{ cursor: "pointer" }}>
                    {post.content}{" "}
                  </p>
                  {post.images.length > 0 &&
                    post.images.map((image: { image: string }) => (
                      <img
                        src={`${baseUrll}${image.image}`}
                        alt=""
                        style={{ width: 150, padding: 10, cursor: "pointer" }}
                        key={image.image}
                      />
                    ))}
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Like postId={post.id} />
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => {
                        navigate("/detail/" + post.id);
                      }}>
                      <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                      <span style={{ color: "gray", paddingLeft: 6 }}>
                        {post.comments.length || 0}
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Media />
          </div>
        )}
      </Box>
    </div>
  );
 
};
export default Profile;
