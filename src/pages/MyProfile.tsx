import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Container, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditProfile from "../components/editProfile";
import { useEffect, useState } from "react";
import { getUserById } from "../libs/api/call/user";
import useStore from "../stores/hooks";

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
  const { user } = useStore();
  // const params = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [dataUser, setDataUser] = useState<IProfile>(defaultData);
  // console.log(typeof params.id);

  // const fetchingData = async () => {
  //   const res = await getUserById(params.id);
  //   console.log(res);
  //   if (res && res?.status === 200) {
  //     setDataUser(res?.data);
  //   } else {
  //     setDataUser(defaultData);
  //   }
  // };

  // useEffect(() => {
  //   fetchingData();
  // }, []);

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
    </div>
  );
};
export default Profile;
