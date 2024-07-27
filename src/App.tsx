// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes/routes'
// import { useEffect, useState } from 'react';

  function App () {
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
  

export default App
