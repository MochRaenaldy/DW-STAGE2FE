import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CustomInput from "../common/Input";
import { useRef, useState } from "react";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";

interface IModal {
  open: boolean;
  onClose: (val?: any) => void;
}

const EditProfile: React.FC<IModal> = ({ open, onClose }) => {
  const refImage: any = useRef(null);
  const [photo, setPhoto] = useState<any>(null);

  const handleChangePhoto = (e: any) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPhoto(objectUrl);
  };

  return (
    <Dialog
      open={open}
      //   onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "10px",
          background: "#1D1D1D",
          width: "500px",
        },
      }}>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{"Edit Profile"}</span>
          <CancelTwoToneIcon onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              backgroundImage:
                "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
              height: "150px",
              borderRadius: "16px",
            }}></div>
          <div
            style={{ position: "relative" }}
            onClick={() => refImage.current.click()}>
            <Avatar
              ref={refImage}
              src={
                photo ||
                "https://rerollcdn.com/GENSHIN/Characters/1/Clorinde.png"
              }
              sx={{
                width: "100px",
                height: "100px",
                position: "absolute",
                bottom: "-20px",
                left: "20px",
                zIndex: 99,
                background: "#fff",
              }}
            />
            <div
              style={{
                borderRadius: "50%",
                background: "grey",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: "50px",
                bottom: "10px",
                translate: "transform(-50%)",
                zIndex: 999,
              }}>
              <AddPhotoAlternateTwoToneIcon />
            </div>
            <input
              type="file"
              ref={refImage}
              style={{ visibility: "hidden" }}
              onChange={handleChangePhoto}
              accept="image/*"
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <CustomInput placeholder="Name" autoComplete="none" />
          <CustomInput placeholder="Username" />
          <CustomInput placeholder="Bio" rows={5} multiline />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            width: "86px",
            height: "42px",
            background: "#04A51E",
            borderRadius: "20px",
            textTransform: "capitalize",
            color: "#fff",
          }}
          onClick={() => console.log("test")}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
