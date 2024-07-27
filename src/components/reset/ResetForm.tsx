import React from 'react'
import { Button, Input, Typography } from "@mui/material";
import CustomInput from "../common/Input";

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
             Reset password 
          </Typography>
          <CustomInput placeholder="New Password*" />
          <CustomInput placeholder="Confirm New Password*" />
          <Button variant="contained" color="success" sx={{ borderRadius: 23 }}>
             Login
          </Button>
       </form>
    );
 };

export default LoginForm