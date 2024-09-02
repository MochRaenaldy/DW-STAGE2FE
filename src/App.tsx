import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {  setAuthToken } from "./libs/api";
import * as authAsync from "./libs/api/call/auth";
import routes from "./routes/routes";
import useStore from "./stores/hooks";

function App() {
  const { setUser } = useStore();
  async function checkAuth() {
    const token = localStorage.getItem("token");
    console.log(token)

    if (!token) {
      return null;
    }

    try {
      const response = await authAsync.checkAuth();
      console.log(response);
      setUser(response.data);
      setAuthToken(token);
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        if (error.response.data.status === "expired jwt") {
          console.log("Expired JWT")
        }
      }
      setAuthToken();
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={createBrowserRouter(routes)} />;
}

//   const [Listmahasiswa, setListmahasiswa] = useState('');

//   useEffect (() => {
//       console.log("mounted")

//       return() => {
//         console.log("unmounted");
//       }

//   }, []);

//   useEffect(() => {
//     console.log("update", Listmahasiswa);
//   }, [Listmahasiswa]
// )

//   return (
//     <>
//       <input
//         type="text"
//         onChange={(e) => setListmahasiswa(e.target.value)}
//         value={Listmahasiswa}
//         />
//         <p>{Listmahasiswa}</p>
//     </>
//   )

export default App;
