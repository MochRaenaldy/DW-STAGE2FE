import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Follows = () => {
  const navigate = useNavigate();
  return (
  <>
    <p
      style={{ marginLeft: 10, cursor: "pointer" }}
      onClick={() => {
        navigate("/");
      }}>
      <ArrowBackOutlinedIcon /> Follows
    </p>
    
    <Box>
      
    </Box>
    </>
  );
};

export default Follows;
