import { useNavigate } from "react-router-dom"
import { Avatar, Checkbox, FormControlLabel, TextField } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { dummyContentList } from "../utils/dummyData";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import useStore from "../stores/hooks";

const Home = () => {
  const navigate = useNavigate();
  const {user} = useStore()

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: 10, marginBottom: 30 }}>Home</h1>
      </div>
      <div
        style={{
          display: "flex",

          borderBottom: "1px solid  gray",
          paddingBottom: 10,
          width: "100%",
        }}>
        <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
          <span style={{ fontSize: 10 }}>
            {user.username.charAt(0).toUpperCase()}
          </span>
        </Avatar>
        <TextField
          id="text"
          label="What is Happening ?"
          style={{ marginLeft: 20, width: "60%", border: "none" }}
        />
        <AddPhotoAlternateOutlinedIcon />

        <button
          style={{
            backgroundColor: "green",
            width: 40,
            borderRadius: 20,
            padding: 1,
            cursor: "pointer",
          }}>
          Post
        </button>
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
                <span style={{ fontSize: 10 }}>
                  {post.user.username.charAt(0).toUpperCase()}
                </span>
              </Avatar>
            )}
            <div
              key={post.content.id}
              style={{ cursor: "pointer", paddingBottom: 10, paddingLeft: 8 }}>
              <h3
                onClick={() => {
                  navigate("/profile/" + post.user.userId);
                }}
                style={{ cursor: "pointer", marginBottom: 4 }}>
                {post.user.username}
              </h3>
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
}

export default Home