import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  dummyContentList,
  dummyRepliesContent,
  dummyUserList,
} from "../utils/dummyData";
import { Avatar, Button, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { getPostById } from "../libs/api/call/home";
import { useEffect, useState } from "react";
import { addReply, getReplyByPostId } from "../libs/api/call/reply";
import CustomInput from "../components/common/Input";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dataPost, setDataPost] = useState<any>({});
  const [input, setInput] = useState<string>("");

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
      fetchReplies();
    } else {
      setDataPost({});
    }
  };

  const fetchReplies = async () => {
    const res = await getReplyByPostId(String(params.id));
    console.log(res);
  };

  const addReplies = async () => {
    const body = {
      ...dataPost,
      comments: [
        {
          comment: input,
        },
      ],
    };
    const res = await addReply(String(params.id), body);
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
          <CustomInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Replies"
          />
          <Button onClick={addReplies}>Send</Button>
        </div>

        <div style={{ borderBottom: "1px solid gray" }}>
          {dummyreplies.map((replies) => (
            <div>
              <div key={replies.contentReplies.contentId}>
                <div style={{ display: "flex" }}>
                  <Avatar src={replies.user.image} />
                  <p>{replies.user.username}</p>
                </div>
                <p>{replies.contentReplies.textReplies}</p>
              </div>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "pink" }} />}
                  defaultChecked={replies.contentReplies.isLike}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
                />
                <div style={{ paddingRight: "10px" }}>
                  {replies.contentReplies.like}
                  {replies.contentReplies.time}
                </div>
                <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />
                <div>{replies.contentReplies.replies}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
