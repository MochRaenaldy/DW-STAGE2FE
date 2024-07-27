import { Box } from "@mui/material";
import ResetForm from "../components/reset/ResetForm";

const Reset = () => {
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
         <ResetForm />
      </Box>
   );
};

export default Reset;