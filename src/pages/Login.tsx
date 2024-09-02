import { Box } from "@mui/material";
import LoginForm from "../components/login/LoginForm";


const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1D1D1D",
        padding: "20px",
      }}>
      <LoginForm />
    </Box>
  );
};

// const Login = () => {
//    // const navigate = useNavigate();

//    const { setUser } = useStore();

//    return (
//       <div>
//          <h1>Login</h1>
//          <button
//             type="button"
//             onClick={() =>
//                setUser({
//                   username: "admin",
//                   email: "admin",
//                   fullName: "admin",
//                })
//             }
//          >
//             LOGIN
//          </button>
//       </div>
//    );
// };

export default Login;
