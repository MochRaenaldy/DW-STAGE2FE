import { Avatar, InputAdornment, Typography } from "@mui/material";
import CustomInput from "../components/common/Input";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useNavigate } from "react-router-dom";
import { dummyUserList } from "../utils/dummyData";


const SearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const newDummy = dummyUserList.filter((data) => data.user.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{padding:10 }}>
        <CustomInput
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <PersonSearchOutlinedIcon />
            </InputAdornment>
          }
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 22 }}>
        {newDummy.map((post) => (
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid gray",
              padding: "10px",
            }}>
            {post.image ? (
              <Avatar sx={{ width: 20, height: 20 }} src={post.image} />
            ) : (
              <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                <span style={{ fontSize: 10 }}>
                  {post.user.username.charAt(0).toUpperCase()}
                </span>
              </Avatar>
            )}
            <div
              key={post.userId}
              style={{
                paddingLeft: 8,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <div>
                <p onClick={() => navigate(`/profile/${post.userId}`)}>
                  {post.user.username}
                </p>
                <p style={{ color: "grey" }}>{post.user.email}</p>
              </div>
              {post.isFollow ? (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
