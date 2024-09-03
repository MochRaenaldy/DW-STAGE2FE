import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

import { Avatar, Input } from "@mui/material";

import { getPostById } from "../libs/api/call/home";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { addReply, getReplyByPostId } from "../libs/api/call/reply";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { IPostModel } from "../types/post";
import Like from "../components/Like/like";
import Inputpost from "../components/Inputpost";
// import baseUrl from "../utils/baseUrl";
import useStore from "../stores/hooks";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {user} = useStore();
  const [dataPost, setDataPost] = useState<IPostModel>();
  const [input, setInput] = useState<string>("");
  const [photo, setPhoto] = useState<any>(null);
  const [dataReply, setDataReply] = useState<IPostModel[]>([]);
  const refImage: any = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  // const baseUrll = "http://localhost:3000/uploads/";

  console.log(dataReply);

  //  const newUserFilter = (id: any) => {
  //       return dummyUserList.filter((user) => user.userId === id)
  //  }

  //  console.log(newReplies)
  // const dummycontent = dummyContentList.filter(
  //   (content) => content.user.userId === Number(params.id)
  // );
  // const dummyreplies = dummyRepliesContent.filter(
  //   (replies) => replies.contentReplies.contentId === Number(params.id)
  // );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files);
    }
  };
  const fetchPost = async () => {
    const res = await getPostById(String(params.id));
    console.log(res);
    if (res?.status === 200) {
      setDataPost(res?.data);
    }
  };
  const addReplies = async (formData: any) => {
    const res = await addReply(String(params.id), formData);
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
    const formData = new FormData();
    formData.append("content", input);
    if (photo) {
      for (let i = 0; i < photo.length; i++) {
        formData.append("files", photo[i]);
      }
    }
    const response = await addReplies(formData);
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
          {dataPost && (
            <div key={dataPost?.id}>
              <div style={{ display: "flex" }}>
                {/* {user.profile_pic? (
                  <img
                    src={`${baseUrl.baseUrlImg}${user.profile_pic}`}
                    alt=""
                  />
                ) : ( */}
                <Avatar src={`${user.profile_pic}`}
                  // sx={{ bgcolor: "yellow", width: 40, height: 40 }}
                  >
                  {/* <span style={{ fontSize: 10, display: "flex" }}>
                    {dataPost?.author?.username.charAt(0).toUpperCase()}
                  </span> */}
                </Avatar>
                <div style={{ marginLeft: "10px" }}>
                  <p>{dataPost?.author?.username}</p>
                  <p style={{ color: "gray" }}>{dataPost?.author?.email}</p>
                </div>
              </div>
              <p> {dataPost?.content}</p>
              {dataPost.images.length > 0 &&
                dataPost?.images.map((image: { image: string }) => (
                  <img
                    src={`${image.image}`}
                    alt=""
                    style={{
                      width: 120,
                      marginLeft: "20px",
                      padding: 10,
                      cursor: "pointer",
                    }}
                    key={image.image}
                  />
                ))}
              <div style={{ color: "gray" }}>{dataPost?.createdAt}</div>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <Like postId={dataPost?.id} />
                {/* <div style={{ paddingRight: "10px" }}>{dataPost.length || 0}</div> */}
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => {
                    navigate("/detail/" + dataPost?.id);
                  }}>
                  <InsertCommentOutlinedIcon
                    sx={{ fontSize: "18px", marginRight: "10px" }}
                  />
                  <div>{dataPost?.comments.length || 0}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 20, marginLeft: 5 }}>Replies</div>
          <div style={{ width: "70%", display: "flex" }}>
            <Avatar
              sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
              <img src={`${user.profile_pic}`} alt="" />
              <span style={{ fontSize: 10, display: "flex" }}>
                {dataPost?.author.username}
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
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "40px",
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

        <div
          style={{
            borderBottom: "1px solid gray",
          }}>
          {dataReply.map((replies: IPostModel) => (
            <div>
              <div key={replies.author.id}>
                <div
                  style={{
                    display: "flex",
                    borderTop: "1px solid gray",
                    padding: 4,
                  }}>
                  <Avatar src={`${user.profile_pic}`} />
                  <p>{replies.author.username}</p>
                </div>
                <p>{replies.content}</p>
                {replies.images.length > 0 &&
                  replies.images.map((image: { image: string }) => (
                    <img
                      src={`${image.image}`}
                      alt=""
                      style={{ width: 150, padding: 10, cursor: "pointer" }}
                      key={image.image}
                    />
                  ))}
              </div>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <Like postId={replies.id} />
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => {
                    navigate("/replies/" + replies.id);
                  }}>
                  <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                  <span style={{ color: "gray", paddingLeft: 6 }}>
                    {replies.comments.length || 0}
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openModal && (
        <Inputpost open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default Detail;

// import React from 'react'
// import Detail from './Detail'

// const Replies = () => {
//   return (
//     <Detail />
//   )
// }

// export default Replies
