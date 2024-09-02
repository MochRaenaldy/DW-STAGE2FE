
import { Button, Typography } from "@mui/material";
import CustomInput from "../common/Input";
import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
       <form
          style={{
             width: "30rem",
             display: "flex",
             flexDirection: "column",
             gap: 10,
          }}
       >
          <Typography variant="h3" fontWeight={"bold"} color="green">
             circle
          </Typography>
          <Typography variant="h4" fontWeight={"bold"} color="white">
             Forgot password
          </Typography>
          <CustomInput placeholder="Email*" />
          <Button variant="contained" color="success" sx={{ borderRadius: 23 }}>
             Send Instruction
          </Button>
 
          <Typography variant="body2" color="white">
            Already have account? <Link to="/login"><span style={{ color: "green" }}>Login</span></Link>
          </Typography>
       </form>
    );
 };

export default LoginForm