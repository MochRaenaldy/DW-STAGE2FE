import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  dummyContentList,
  dummyRepliesContent,
  dummyUserList,
} from "../utils/dummyData";
import { Avatar, Button, Checkbox, Input } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { createPost, getPostById } from "../libs/api/call/home";
import { useEffect, useState } from "react";
import { addReply, getReplyByPostId } from "../libs/api/call/reply";
import CustomInput from "../components/common/Input";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Ipostform, IPostModel } from "../types/post";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dataPost, setDataPost] = useState<any>({});
  const [input, setInput] = useState<string>("");
  const [dataReply, setDataReply] = useState<IPostModel[]>([]);

  console.log(dataReply);

  //  const newUserFilter = (id: any) => {
  //       return dummyUserList.filter((user) => user.userId === id)
  //  }

  //  console.log(newReplies)
  const dummycontent = dummyContentList.filter(
    (content) => content.user.userId === Number(params.id)
  );
  const dummyreplies = dummyRepliesContent.filter(
    (replies) => replies.contentReplies.contentId === Number(params.id)
  );

  const fetchPost = async () => {
    const res = await getPostById(String(params.id));
    console.log(res);
    if (res?.status === 200) {
      setDataPost(res?.data);
    } else {
      setDataPost({});
    }
  };
  const addReplies = async (body: Ipostform) => {
    const res = await addReply(String(params.id), body);
    console.log(res);
  };

  const fetchReplies = async () => {
    const res = await getReplyByPostId(String(params.id));
    console.log(res);
    if (res?.status === 200) {
      setDataReply(res?.data);
    } else {
      setDataReply([]);
    }
  };

  const handleSendPost = async () => {
    const body = {
      content: input,
    };
    const response = await addReplies(body);
    console.log(response, "casca");
    // if (response && response?.status === 200) {
    // setMessage("Success Create Postingan");
    // setSuccessPost(true);
    // setOpenAlert(true);
    fetchPost();
    fetchReplies();
    setInput("");
    // } else {
    // setMessage("Failed Create Postingan");
    // setSuccessPost(false);
    // setOpenAlert(true);
    //   fetchPost();
    //   fetchReplies();
    //   setInput("");
    // }
  };

  {
    useEffect(() => {
      fetchPost();
      fetchReplies();
    }, []);
  }

  return (
    <div>
      <div>
        <p
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}>
          <ArrowBackOutlinedIcon /> Status
        </p>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ borderBottom: "1px solid gray" }}>
          <div key={dataPost?.id}>
            <div style={{ display: "flex" }}>
              {dataPost?.author?.profile_pic ? (
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={dataPost.author.profile_pic}
                />
              ) : (
                <Avatar sx={{ bgcolor: "yellow", width: 40, height: 40 }}>
                  <span style={{ fontSize: 10, display: "flex" }}>
                    {/* {dataPost.author.username} */}
                    {dataPost?.author?.username.charAt(0).toUpperCase()}
                  </span>
                </Avatar>
              )}
              <div style={{ marginLeft: "10px" }}>
                <p>{dataPost?.author?.username}</p>
                <p style={{ color: "gray" }}>{dataPost?.author?.email}</p>
              </div>
            </div>
            <p> {dataPost?.content}</p>
            <div style={{ color: "gray" }}>{dataPost?.createdAt}</div>
            <div style={{ display: "flex", marginRight: "10px" }}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "pink" }} />}
                defaultChecked={dataPost?.isLike}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
              />
              <div style={{ paddingRight: "10px" }}>{dataPost?.like || 0}</div>
              <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />
              <div>{dataPost?.replies || 0}</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 20, marginLeft: 5 }}>Replies</div>
          <CustomInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Replies"
          />
          <Button onClick={handleSendPost}>Send</Button>
        </div>

        <div
          style={{
            borderBottom: "1px solid gray",
          }}>
          {dataReply.map((replies) => (
            <div>
              <div key={replies.author.id}>
                <div
                  style={{
                    display: "flex",
                    borderTop: "1px solid gray",
                    padding: 4,
                  }}>
                  <Avatar src={replies.author.profil_pic} />
                  <p>{replies.author.username}</p>
                </div>
                <p>{replies.content}</p>
              </div>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "pink" }} />}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
                />
                {replies.image || 0}
                <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                <span style={{ color: "gray", paddingLeft: 6 }}>
                  {replies.image || 0}
                </span>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;

//  <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           borderBottom: "1px solid  gray",
//           paddingBottom: 10,
//           width: "100%",
//         }}>
//         <div style={{ width: "70%" }}>
//           <Avatar sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
//             <span style={{ fontSize: 10, display: "flex" }}>
//               {dataPost.username}
//               {/* {user.username.charAt(0).toUpperCase()} */}
//             </span>
//           </Avatar>

//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="What is Happening ?"
//             style={{ marginLeft: 20, width: "90%", border: "none" }}
//           />
//         </div>
//         <div
//           style={{
//             width: "30%",
//             display: "flex",
//             justifyContent: "flex-end",
//             paddingRight: "5px",
//           }}>

//             <AddPhotoAlternateOutlinedIcon
//               sx={{
//                 color: "green",
//                 height: "60px",
//                 cursor: "pointer",
//                 marginRight: "10px",
//               }}
//             />
//           <button
//             style={{
//               backgroundColor: "green",
//               marginTop: "16px",
//               width: "50px",
//               height: "30px",
//               borderRadius: 20,
//               cursor: "pointer",
//             }}
//             onClick={handleSendPost}>
//             Post
//           </button>
//         </div>
