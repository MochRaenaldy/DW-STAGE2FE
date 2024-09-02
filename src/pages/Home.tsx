import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Input,
  Snackbar,
} from "@mui/material";

import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import useStore from "../stores/hooks";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { createPost, getPost } from "../libs/api/call/home";
import Like from "../components/Like/like";
import { IPostModel } from "../types/post";
import baseUrl from "../utils/baseUrl";
// import Inputpost from "../components/Inputpost";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const refImage: any = useRef(null);
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [dataPost, setDataPost] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [successPost, setSuccessPost] = useState(false);
  const [message, setMessage] = useState("");
  const baseUrll = "http://localhost:3000/uploads/";

  const handleSendPost = async () => {
    const formData = new FormData();
    formData.append("content", input);
    if (photo) {
      for (let i = 0; i < photo.length; i++) {
        formData.append("images", photo[i]);
      }
    }

    const response = await createPost(formData);
    if (response && response?.status === 200) {
      setMessage("Success Create Postingan");
      setSuccessPost(true);
      setOpenAlert(true);
      fetchingData();
      setInput("");
    } else {
      setMessage("Failed Create Postingan");
      setSuccessPost(false);
      setOpenAlert(true);
      fetchingData();
      setInput("");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files);
    }
  };

  const fetchingData = async () => {
    const res = await getPost();
    if (res && res?.status === 200) {
      setDataPost(res?.data);
    } else {
      setDataPost([]);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: 10, marginBottom: 30 }}>Home</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid  gray",
          paddingBottom: 10,
          width: "100%",
        }}>
        <div style={{ width: "70%", display: "flex" }}>
          <Avatar sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
            <img src={`${baseUrl.baseUrlImg}${user.profile_pic}`} alt="" />
            <span style={{ fontSize: 10, display: "flex" }}>
              {user.username}
              {/* {user.username.charAt(0).toUpperCase()} */}
            </span>
          </Avatar>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What is Happening ?"
            style={{ marginLeft: 20, width: "90%", border: "none" }}
          />
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
          }}>
          <AddPhotoAlternateOutlinedIcon
            sx={{
              color: "green",
              height: "60px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => refImage.current?.click()}
          />
          <input
            type="file"
            multiple
            ref={refImage}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="images/*"
          />

          <button
            style={{
              backgroundColor: "green",
              marginTop: "16px",
              width: "50px",
              height: "30px",
              borderRadius: 20,
              cursor: "pointer",
            }}
            onClick={handleSendPost}>
            Post
          </button>
        </div>
      </div>
      <div>
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
                src={`${baseUrl.baseUrlImg}${post.profile_pic}`}
              />
            ) : (
              <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                <img
                  src={`${baseUrl.baseUrlImg}${user.profile_pic}`}
                  alt=""
                />
                <span style={{ fontSize: 10, display: "flex" }}>
                  {post.author.username}
                  {/* {post.user.username.charAt(0).toUpperCase()} */}
                </span>
              </Avatar>
            )}
            <div
              key={post.id}
              style={{ cursor: "pointer", paddingBottom: 10, paddingLeft: 8 }}>
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
                <Like postId={post.id} />
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
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setOpenAlert(false)}>
        <Alert
          severity={successPost ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
