import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Checkbox,
  FormControlLabel,
  Input,
  Snackbar,
  TextField,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { dummyContentList } from "../utils/dummyData";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import useStore from "../stores/hooks";
import CustomInput from "../components/common/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../libs/api";
import { createPost, getPost } from "../libs/api/call/home";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [input, setInput] = useState("");
  const [dataPost, setDataPost] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [successPost, setSuccessPost] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendPost = async () => {
    const body = {
      content: input,
    };
    const response = await createPost(body);
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
        <div style={{ width: "70%" }}>
          <Avatar sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
            <span style={{ fontSize: 10, display: "flex" }}>
              {user.username}
              {/* {user.username.charAt(0).toUpperCase()} */}
            </span>
          </Avatar>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What is Happening ?"
            style={{ marginLeft: 20, width: "90%", border: "none", }}
          />
        </div>
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "5px",
          }}>
          <AddPhotoAlternateOutlinedIcon
            sx={{
              color: "green",
              height: "60px",
              cursor: "pointer",
              marginRight: "10px",
            }}
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
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "pink" }} />}
                    defaultChecked={post.isLike ? true : false}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
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
