import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { IRegisterForm } from "../../types/register";
import CustomInput from "../common/Input";
import { useRegisterValidation } from "./hooks/useRegisterValidation";
import { Link, } from "react-router-dom";

import { useRegisterFunction } from "./hooks/useRegisterFunction";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

interface IRegisterProps {
  title?: string;
}

const RegisterForm = ({ }: IRegisterProps) => {
  const { control, handleSubmit, reset, } = useRegisterValidation();
  const registerFunction = useRegisterFunction();
  const [showPassword, setShowPassword] = useState(false);
  // const [message, setMessage] = useState<string>("");
  // const [successLogin, setSuccessLogin] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  // const { setUser } = useStore();
  const onSubmit = async (data: IRegisterForm) => {
    await registerFunction.register(data);
    reset();
    // setUser({
    //   ...data
    // })
    // navigate("/")
    // reset();
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  // console.log(watch("email"));

  return (
    <form
      style={{
        width: "30rem",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onSubmit={handleSubmit(onSubmit, onError)}>
      <Typography variant="h3" fontWeight={"bold"} color="green">
        Circle
      </Typography>
      <Typography variant="h4" fontWeight={"bold"} color="white">
        Create account Circle
      </Typography>

      <Controller
        control={control}
        name="fullName"
        render={({ field, fieldState }) => (
          <FormControl error={Boolean(fieldState.error)}>
            <CustomInput placeholder="Fullname" sx={{ mb: 2 }} {...field} />
            {Boolean(fieldState.error) && (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

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
        name="email"
        render={({ field, fieldState }) => (
          <FormControl error={Boolean(fieldState.error)}>
            <CustomInput placeholder="Email" sx={{ mb: 2 }} {...field} />
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

      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ borderRadius: 23 }}>
        Create
      </Button>

      <Typography variant="body2" color="white">
        Already have account?{" "}
        <Link to="/auth/login" style={{ textDecoration: "none" }}>
          <span style={{ color: "green" }}>Login</span>
        </Link>
      </Typography>
    </form>
  );
};

export default RegisterForm;
