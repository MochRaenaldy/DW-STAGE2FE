import React, { useState } from 'react'
import { Button, FormControl, FormHelperText, Input,  Typography } from "@mui/material";
// import TextField from "../common/Textfield"
import CustomInput from "../common/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../stores/hooks';
import { IUser } from '../../types/store';
import { Controller, useForm } from 'react-hook-form';
import { ILoginForm } from '../../types/login';

const LoginForm = () => {
   const navigate = useNavigate()
   const { setUser } = useStore ();
   const schema = yup.object({
      email : yup.string().required("email is require").email("Email is invalid"),
      password : yup.string().required("password is require")
   })
   const {handleSubmit, control, watch} = useForm<ILoginForm>({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "",
         password: "",
      },
      reValidateMode: "onSubmit",
      mode: "all",
   });

   const onSubmit = (data: ILoginForm) => {
      setUser({
         username:data.email,
         email:data.email,
         fullName:data.email,
      })
     navigate("/")
   }

   const onError = (errors: any) => {
      console.log(errors);
   };

    return (
       <form
          style={{
             width: "30rem",
             display: "flex",
             flexDirection: "column",
             gap: 10,
          }}
          onSubmit={handleSubmit(onSubmit, onError)}
       >
          <Typography variant="h3" fontWeight={"bold"} color="green">
             circle
          </Typography>
          <Typography variant="h4" fontWeight={"bold"} color="white">
             Login to Circle 
          </Typography>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
               <FormControl error={Boolean(fieldState.error)}>
                  <CustomInput placeholder="Email" sx={{ mb: 2 }} {...field} />
                  {Boolean(fieldState.error) && (
                     <FormHelperText>
                        {fieldState.error?.message}
                     </FormHelperText>
                  )}
               </FormControl>
            )}
         />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
               <FormControl error={Boolean(fieldState.error)}>
                  <CustomInput
                     placeholder="Password"
                     sx={{ mb: 2 }}
                     {...field}
                  />
                  {Boolean(fieldState.error) && (
                     <FormHelperText>
                        {fieldState.error?.message}
                     </FormHelperText>
                  )}
               </FormControl>
            )}
         />

          <Typography variant="body2" color="white" > <Link to="/forgot"><span style={{ color: "white" }}>
            Forgot passsword? </span>
         </Link> </Typography>
         <button style={{backgroundColor: "green", height: 40}}
      //    <Button
      //    type="submit"
      //    variant="contained"
      //    color="success"
      //    sx={{ borderRadius: 23 }}
      // >
      //    Create
      // </Button>
            type="submit"
                
        
         >
            LOGIN
         </button>
          <Typography variant="body2" color="white">
             Don't have an account yet? <Link to="/register" style={{textDecoration: "none"}}><span style={{ color: "green",  textDecoration: "none" }}>Create Account</span></Link>
          </Typography>
       </form>
    );
 };

export default LoginForm