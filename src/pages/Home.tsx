import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const dummy = [
  {
    id :1,
    userId: 1,
    user :{
      username :"Indah Prakarya"
    },
    content : "kalian pernah ga sih main instagram tapi ga bisa dibuka"
  },
  {
    id :2,
    user :{
      username :"aji"
    },
    content : "kalian pernah ga dapet tim megang saber roam tapi mainnya jago",
    
  },
  {
    id :3,
    user :{
      username :"kaja"
    },
    content : "masih coba coba"
  },
  {
    id :4,
    user :{
      username :"Leo"
    },
    content : "coba aja dari dulu saya kayak gini"
  },
  {
    id :5,
    user :{
      username :"Pita"
    },
    content : "kalian tau ga"
  },
  {
    id :6,
    user :{
      username :"Lila"
    },
    content : "Pisang itu sebenernya bergizi loh"
  },
  {
    id :7,
    user :{
      username :"Piya"
    },
    content : "eh  gw mau nanya dong"
  },
  {
    id :8,
    user :{
      username :"kity"
    },
    content : "kucing itu sejenis ga sih"
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: 10, marginBottom: 30 }}>Home</h1>
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          borderBottom: "1px solid  gray",
          paddingBottom: 10,
        }}>
        <Icon
          icon={"gg:profile"}
          style={{ marginLeft: 10, width: "20", height: "30" }}
        />
        <TextField
          id="text"
          label="What is Happening ?"
          style={{ marginLeft: 20, width: "10" }}
        />
        <Icon
          icon={"icon-park-outline:add-picture"}
          style={{
            marginRight: "10",
            color: "green",
            width: 50,
            height: 30,
            marginTop: 20,
          }}
        />

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
        {dummy.map((post) => (
          <div style={{ display: "flex", borderBottom: "1px solid gray" }}>
            <Icon
              width={22}
              icon={"iconamoon:profile-circle"}
              style={{ margin: 10 }}
            />
            <div
              key={post.id}
              style={{ cursor: "pointer", paddingBottom: 10, paddingLeft: 8 }}>
              <h3
                onClick={() => {
                  navigate("/profile/" + post.userId);
                }}
                style={{ cursor: "pointer", marginBottom: 4 }}>
                {post.user.username}
              </h3>
              <p
                onClick={() => {
                  navigate("/detail/" + post.id);
                }}
                style={{ cursor: "pointer" }}>
                {post.content}{" "}
              </p>

              <div style={{ display: "flex" }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{color: "pink"}} />}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding:0 }}
                />
                <p
                  onClick={() => {
                    navigate("/Follows");
                  }}
                  style={{ marginRight: 10 }}>
                  <span style={{ color: "gray", paddingLeft: 6 }}>
                    Followers
                  </span>{" "}
                </p>
                <p
                  onClick={() => {
                    navigate("/Replies");
                  }}>
                  <Icon icon={"ic:baseline-comment"} />{" "}
                  <span style={{ color: "gray", paddingLeft: 6 }}>Replies</span>{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home