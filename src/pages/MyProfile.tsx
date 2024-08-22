import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Checkbox, Container, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditProfile from "../components/editProfile";
import { useEffect, useState } from "react";
import { getUserById } from "../libs/api/call/user";
import useStore from "../stores/hooks";
import { getAllPostByUserId } from "../libs/api/call/home";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

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

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  // const params = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataPost, setDataPost] = useState([])
  const [buttonActive, setButtonActive] = useState<"allpost" | "media">("allpost")
  // const [dataUser, setDataUser] = useState<IProfile>(defaultData);
  // console.log(typeof params.id);

  console.log(user)

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
            {user.email}
          </span>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
          {user.bio}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2 }}>
          291 <span style={{ color: "gray" }}>Following </span> 23{" "}
          <span style={{ color: "gray" }}>Followers</span>
        </Typography>
      </Container>
      {openModal && (
        <EditProfile open={openModal} onClose={() => setOpenModal(false)} />
      )}

      {dataPost.map((post: any) => (
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid gray",
            padding: " 10px",
          }}>
          {post?.author?.profile_pic ? (
            <Avatar
              sx={{ width: 20, height: 20 }}
              src={post.author.profile_pic}
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
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "pink" }} />}
                  defaultChecked={post.isLike ? true : false}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                    padding: 0,
                  }}
                />
                <span style={{ color: "gray", paddingLeft: 6 }}>
                  {post.like || 0}
                </span>{" "}
              </div>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  navigate("/Replies");
                }}>
                <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                <span style={{ color: "gray", paddingLeft: 6 }}>
                  {post.replies || 0}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Profile;
