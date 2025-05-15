import React, { useEffect } from "react";



import {  createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../Components/Login.jsx"
import Nav from "../Components/Nav.jsx";




import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../src/utils/userSlice.js";
import Browse from "../Components/Browse.jsx";

// const ThemeContext = createContext();

// const Product = () => {
//   const theme = useContext(ThemeContext);

//   return (
//     <div>
//       <h1 style={{ color: theme === "light" ? "blue" : "red" }}>
//         This is product
//       </h1>
//     </div>
//   );
// };

// const Category = () => {
//   return (
//     <div>
//       <h1 className="text-center">This is Category</h1>
//       <Product />
//     </div>
//   );
// };

// const Home = () => {
//   const theme = "light";
//   return (
//     <div className="home">
    

//       <ThemeContext.Provider value={theme}>
//         <Category />
//       </ThemeContext.Provider>
//     </div>
//   );
// };

function Body() {
  

    const dispatch = useDispatch();

    const approuter = createBrowserRouter([
        {
       path:'/',
       element: <Login/>
       
    },
    {
        path:'/browse',
        element: <Browse/>,
    }
])

    useEffect(()=>{
     

        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName,photoURL} = user;
              // ...
              dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}));
            } else {
              // User is signed out
              dispatch(removeUser());
            }
          });

    },[])
  
  return (
   
  
   <RouterProvider router={approuter}/>
   
  );
}

export default Body;
