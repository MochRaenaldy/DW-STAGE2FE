import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { dummyContentList } from "../utils/dummyData";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import useStore from "../stores/hooks";
import CustomInput from "../components/common/Input";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [input, setInput] = useState("");

  const handleSendPost = async () => {
    try {
     const res = await axios.post(
       "http://localhost:3000/posts",
       {
         content: input,
       },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }
     );

     console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
            style={{ marginLeft: 20, width: "90%", border: "none" }}
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
        {dummyContentList.map((post) => (
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid gray",
              padding: " 10px",
            }}>
            {post.user.image ? (
              <Avatar sx={{ width: 20, height: 20 }} src={post.user.image} />
            ) : (
              <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                <span style={{ fontSize: 10, display: "flex" }}>
                  {post.user.username}
                  {/* {post.user.username.charAt(0).toUpperCase()} */}
                </span>
              </Avatar>
            )}
            <div
              key={post.content.id}
              style={{ cursor: "pointer", paddingBottom: 10, paddingLeft: 8 }}>
              <div style={{ display: "flex" }}>
                <h3
                  onClick={() => {
                    navigate("/profile/" + post.user.userId);
                  }}
                  style={{
                    cursor: "pointer",
                    marginBottom: 4,
                    marginRight: "10px",
                  }}>
                  {post.user.username}
                </h3>
                <p style={{ color: "gray" }}> {post.user.email}</p>
              </div>

              <p
                onClick={() => {
                  navigate("/detail/" + post.content.id);
                }}
                style={{ cursor: "pointer" }}>
                {post.content.textContent}{" "}
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "pink" }} />}
                    defaultChecked={post.content.isLike}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
                  />
                  <span style={{ color: "gray", paddingLeft: 6 }}>
                    {post.content.like}
                  </span>{" "}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => {
                    navigate("/Replies");
                  }}>
                  <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                  <span style={{ color: "gray", paddingLeft: 6 }}>
                    {post.content.replies}
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
