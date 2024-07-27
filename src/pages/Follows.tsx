import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";

const Follows = () => {
  const navigate = useNavigate();

  return (
    <p
      style={{ marginLeft: 10, cursor: "pointer" }}
      onClick={() => {
        navigate("/");
      }}>
      <ArrowBackOutlinedIcon /> Follows
    </p>
  );
};

export default Follows;
