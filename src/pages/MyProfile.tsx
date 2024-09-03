import { useNavigate, } from "react-router-dom";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditProfile from "../components/editProfile";
import { useEffect, useState } from "react";

import useStore from "../stores/hooks";
import { getAllPostByUserId } from "../libs/api/call/home";

import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import Media from "./Media";
import Like from "../components/Like/like";
import { IPostModel } from "../types/post";
import { api } from "../libs/api";
// import baseUrl from "../utils/baseUrl";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  // const params = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [followers, setFollowers] = useState<number>(0);
  const [follows, setFollows] = useState<number>(0);
  const userId = user.id;
  const [dataPost, setDataPost] = useState([])
  const [buttonActive, setButtonActive] = useState<"allpost" | "media">("allpost")
  // const baseUrll = "http://localhost:3000/uploads/";
  // const [dataUser, setDataUser] = useState<IProfile>(defaultData);
  // console.log(typeof params.id);

    const countFollow = async (userId: number) => {
      const res = await api.get(`/users/follows/${userId}`);
      setFollowers(res.data.followers);
      setFollows(res.data.following);
    };

    useEffect(() => {
      countFollow(userId);
    }, [userId]);


   const fetchingAllPost = async () => {
     const res = await getAllPostByUserId(String(user?.id));
    //  console.log(res);
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

  return (
    <div>
      <Container style={{ border: "1px solid gray", width: "100%" }}>
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
            mt: -5,
            ml: 2,
            borderRadius: 50,
            position: "relative",
          }}>
          <Avatar sx={{ bgcolor: "red", width: "70px", height: "70px" }}>
            <img src={`${user.profile_pic}`} alt="" />
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
        <Typography variant="body1" sx={{ fontWeight: "bold", ml: 1 }}>
          {user.username}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          <span
            onClick={() => {
              navigate("/my-profile");
            }}
            style={{ color: "gray", cursor: "pointer" }}>
            {user.email}
          </span>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
          {user.bio}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          <span style={{ color: "gray" }}>{follows}Follow</span>{" "}
          {
            <span style={{ color: "gray" }}>
              {followers} Followers 
              {/*dataUser.followers*/}{" "}
            </span>
          }
        </Typography>
      </Container>
      {openModal && (
        <EditProfile open={openModal} onClose={() => setOpenModal(false)} />
      )}
      <Box>
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
              maxHeight: 426,
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
                        src={`${image.image}`}
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
          <Media />
        )}
      </Box>
    </div>
  );
};
export default Profile;
