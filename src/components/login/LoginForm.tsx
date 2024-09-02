import  { useState } from "react";
import {
  
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  
  InputAdornment,
  Typography,
} from "@mui/material";
// import TextField from "../common/Textfield"
import CustomInput from "../common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link,  } from "react-router-dom";


import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "../../types/login";
import { useLoginFunction } from "./useLoginfunction";
import {  Visibility, VisibilityOff } from "@mui/icons-material";


const LoginForm = () => {
  const Loginfunc = useLoginFunction();
  const [message, setMessage] = useState<string>("");
  const [successLogin, setSuccessLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  // const { setUser } = useStore();
  const schema = yup.object({
    username: yup.string().required("username is require"),
    password: yup.string().required("password is require"),
  });
  const { handleSubmit, control, reset } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const handleOnSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setLoading(true);
    const res = await Loginfunc.login(data.username, data.password);
    if (res?.token) {
      setMessage("Login Success");
      setSuccessLogin(true);
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } else {
      setMessage(res?.data?.message);
      setSuccessLogin(false);
    }
    reset();
    setLoading(false);
  };

  //   const onSubmit = (data: ILoginForm) => {
  //     setUser({
  //       username: data.username,
  //       email: data.username,
  //       fullName: data.username,
  //     });
  //     navigate("/");
  //   };

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
      onSubmit={handleSubmit(handleOnSubmit, onError)}>
      <Typography variant="h3" fontWeight={"bold"} color="green">
        circle
      </Typography>

      <Typography variant="h4" fontWeight={"bold"} color="white">
        Login to Circle
      </Typography>
      {message && (
        <Typography variant="body1" color={successLogin ? "green" : "red"}>
          {message}
        </Typography>
      )}
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => (
          <FormControl error={Boolean(fieldState.error)}>
            <CustomInput placeholder="Username" sx={{ mb: 2 }} {...field} />
            {Boolean(fieldState.error) && (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
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
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {Boolean(fieldState.error) && (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Typography variant="body2" color="white">
        {" "}
        <Link to="/forgot">
          <span style={{ color: "white" }}>Forgot passsword? </span>
        </Link>{" "}
      </Typography>
      <button style={{ backgroundColor: "green", height: 40 }} type="submit">
        {loading ? <CircularProgress /> : "Login"}
      </button>
      <Typography variant="body2" color="white">
        Don't have an account yet?{" "}
        <Link to="/auth/register" style={{ textDecoration: "none" }}>
          <span style={{ color: "green", textDecoration: "none" }}>
            Create Account
          </span>
        </Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
