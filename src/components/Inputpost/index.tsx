import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Input, styled, } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useStore from "../../stores/hooks";
import { createPost, getPost } from "../../libs/api/call/home";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import baseUrl from "../../utils/baseUrl";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

// function setMessage() {
//   throw new Error("Function not implemented.");
// }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IModal {
  open: boolean;
  onClose: (val?: any) => void;
}

const Inputpost: React.FC<IModal> = ({ open, onClose }) => {
// export default function CustomizedDialogs() {
  // const [ close, setOpen] = React.useState(false);
    const [input, setInput] = useState("");
    const {user} = useStore()
    const [dataPost, setDataPost] = useState([]);
    const refImage: any = useRef(null);
    const [photo, setPhoto] = useState<any>(null);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files);
    }
  };

    const fetchingData = async () => {
      const res = await getPost();
      if (res && res?.status === 200) {
        setDataPost(res?.data);
      } else {
        setDataPost([]);
      }
    };

  useEffect(() => {
    fetchingData();
    handleSendPost() ;
    
  }, []);

  const handleSendPost = async () => {
    const formData = new FormData();
    formData.append("content", input);
    if (photo) {
      for (let i = 0; i < photo.length; i++) {
        formData.append("images", photo[i]);
      }
    }
    const response = await createPost(formData);
    if (response && response?.status === 200) {
      // setMessage("Success Create Postingan");
      // setSuccessPost(true);
      // setOpenAlert(true);
      fetchingData();
      setInput("");
      onClose();
    } else {
      // setMessage("Failed Create Postingan");
      // setSuccessPost(false);
      // setOpenAlert(true);
      fetchingData();
      setInput("");
      onClose();
    }
  };


  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={open}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose()}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{"Create Post"}</span>
            <CancelTwoToneIcon onClick={() => onClose()} />
          </div>
        </DialogTitle>

        <DialogContent style={{ display: "flex" }}>
          <div style={{ width: "90%", display: "flex" }}>
            <Avatar
              sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
              <img src={`${baseUrl.baseUrlImg}${user.profile_pic}`} alt="" />
              <span style={{ fontSize: 10, display: "flex" }}>
                {user.username}
                {dataPost.length}
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
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
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
          </div>

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
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default Inputpost

{
  /* <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon /> */
}
{
  /* </IconButton> */
}