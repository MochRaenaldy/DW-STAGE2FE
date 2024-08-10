import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  dummyContentList,
  dummyRepliesContent,
  dummyUserList,
} from "../utils/dummyData";
import { Avatar, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();

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

  console.log(dummyreplies);

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
          {dummycontent.map((content) => (
            <div key={content.content.id}>
              <div style={{ display: "flex" }}>
                <Avatar src={content.user.image} />
                <div style={{marginLeft:"10px"}}>
                  <p>{content.user.username}</p>
                  <p style={{color:"gray"}}>{content.user.email}</p>
                </div>
              </div>
              <p> {content.content.textContent}</p>
              <div style={{ color: "gray" }}>{content.content.time}</div>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "pink" }} />}
                  defaultChecked={content.content.isLike}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: 0 }}
                />
                <div style={{ paddingRight: "10px" }}>
                  {content.content.like}
                </div>
                <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />
                <div>{content.content.replies}</div>
              </div>
            </div>
          ))}
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
