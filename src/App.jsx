import React from "react";

import { useContext } from "react";

import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import Profile from "../Components/Profile.jsx";

import About from "../Components/About.jsx";
import Nav from "../Components/Nav.jsx";

import "./App.css";

import { createContext } from "react";
import SignPage from "../Components/SignPage.jsx";

const ThemeContext = createContext();

const Product = () => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h1 style={{ color: theme === "light" ? "blue" : "red" }}>
        This is product
      </h1>
    </div>
  );
};

const Category = () => {
  return (
    <div>
      <h1 className="text-center">This is Category</h1>
      <Product />
    </div>
  );
};

const Home = () => {
  const theme = "light";
  return (
    <div className="home">
    

      <ThemeContext.Provider value={theme}>
        <Category />
      </ThemeContext.Provider>
    </div>
  );
};

function App() {
  return (
    <div className="app-bx">
  
      <BrowserRouter>
      <Nav/>
      <SignPage/>
        <Routes>
          <Route index Component={Home} />
          <Route path="/profile" Component={Profile} />
          <Route path="/prfl" >
            <Route path="/prfl/discuss" element={<h1>Discuss</h1>} />
            <Route path="/prfl/discuss/sub" element={<h1>Discuss-Sub</h1>} />
          </Route>
          <Route path="/about" Component={About} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
