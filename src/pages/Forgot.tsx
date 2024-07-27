import { Box } from "@mui/material";
import ForgotForm from "../components/forgot/ForgotForm";

const Forgot = () => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1D1D1D",
            padding: "20px",
         }}
      >
         <ForgotForm />
      </Box>
   );
};

export default Forgot;