import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, Modal, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStore from "../../stores/hooks";
import { createPost, getPost } from "../../libs/api/call/home";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../common/Input";
import { Height, WidthFull } from "@mui/icons-material";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

function setMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

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
  

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

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
    const body = {
      content: input,
    };
    const response = await createPost(body);
    if (response && response?.status === 200) {
      setMessage("Success Create Postingan");
      // setSuccessPost(true);
      // setOpenAlert(true);
      fetchingData();
      setInput("");
      onClose();
    } else {
      setMessage("Failed Create Postingan");
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
        {/* <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon /> */}
        {/* </IconButton> */}
        <DialogContent style={{ display: "flex" }}>
          <div style={{ width: "70%", display:"flex" }}>
            <Avatar
              sx={{ bgcolor: "red", width: 20, height: 20, ml: 1, mt: 2 }}>
              <span style={{ fontSize: 10, display: "flex" }}>
                {user.username}
                {/* {user.username.charAt(0).toUpperCase()} */}
              </span>
            </Avatar>
            <TextField
              // sx={{ Height: 200, width: "100%" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What is Happening ?"
              style={{ marginLeft: 20, width: 270, height:"auto", border: "none" }}
            />
            
          </div>
        </DialogContent>
        <DialogActions>
          <input type="file"  />
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