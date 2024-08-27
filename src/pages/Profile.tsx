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
  const { user } = useStore();
  const [dataUser, setDataUser] = useState<IProfile>(defaultData);
   const [dataPost, setDataPost] = useState([]);
  const [buttonActive, setButtonActive] = useState<"allpost" | "media">(
    "allpost"
  );

  console.log(typeof params.id);
  // const newDummy = dummyUserList.filter((data) => data.userId == Number(params.id))

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
              src={dataUser.profile_pic}
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
            {dataUser?.isFollow ? (
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
            {dataUser.following || 0}{" "}
            <span style={{ color: "gray" }}>Following </span>{" "}
            {dataUser.followers || 0}{" "}
            <span style={{ color: "gray" }}>Followers</span>
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
