import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { api, setAuthToken } from "./libs/api";
import routes from "./routes/routes";
import useStore from "./stores/hooks";

function App() {
  const { setUser } = useStore();
  async function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    try {
      const response = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data);
      setAuthToken(token);
    } catch (error) {
      console.log(error);
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
