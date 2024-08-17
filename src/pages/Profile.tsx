import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { dummyContentList, dummyUserList } from "../utils/dummyData";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import useStore from "../stores/hooks";
import { useEffect, useState } from "react";
import { getUserById } from "../libs/api/call/user";

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

  console.log(typeof params.id);
  // const newDummy = dummyUserList.filter((data) => data.userId == Number(params.id))

  const fetchingData = async () => {
    const res = await getUserById(params.id);
    console.log(res);
    if (res && res?.status === 200) {
      setDataUser(res?.data);
    } else {
      setDataUser(defaultData);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
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
          <Container style={{ borderBottom: "1px solid gray", padding: 10 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 1 }}>
              {dataUser.username}
            </Typography>

            <Box
              sx={{
                height: 100,
                borderRadius: 1,
                bgcolor: "gray",
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
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", ml: 1, mt: 3 }}>
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
      </div>
    </div>
  );
};
export default Profile;
