import { Avatar, InputAdornment, Typography } from "@mui/material";
import CustomInput from "../components/common/Input";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { dummyUserList } from "../utils/dummyData";
import { getUserByUsername } from "../libs/api/call/user";
import { IProfile, IUserList } from "../types/store";

const SearchPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState<string>("");
  const [dataUser, setDataUser] = useState<IUserList[]>();

  const fetchingData = async () => {
    const res = await getUserByUsername(search);
    console.log(res);
    if (res && res?.status === 200) {
      setDataUser(res?.data);
    } else {
      setDataUser([]);
    }
  };

  useEffect(() => {
    if (search) {
      fetchingData();
    } else {
      setDataUser([]);
    }
  }, [search]);

  // const newDummy = dummyUserList.filter((data) =>
  //   data.user.username.toLowerCase().includes(search.toLowerCase())
  // );

  console.log(dataUser);

  return (
    <div>
      <div style={{ padding: 10 }}>
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
        {dataUser &&
          dataUser?.map((user) => (
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid gray",
                padding: "10px",
              }}>
              {user.profile_pic ? (
                <Avatar sx={{ width: 20, height: 20 }} src={user.profile_pic} />
              ) : (
                <Avatar sx={{ bgcolor: "yellow", width: 20, height: 20 }}>
                  <span style={{ fontSize: 10 }}>
                    {user.username}
                    {/* {user.user.username.charAt(0).toUpperCase()} */}
                  </span>
                </Avatar>
              )}
              <div
                key={user.id}
                style={{
                  paddingLeft: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
                <div>
                  <p onClick={() => navigate(`/profile/${user.id}`)}>
                    {user.username}
                  </p>
                  <p style={{ color: "grey" }}>{user.email}</p>
                  <p> {user.bio}</p>
                </div>
                {user.isfollow ? (
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
