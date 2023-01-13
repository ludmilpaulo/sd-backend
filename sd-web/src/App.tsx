import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Login  from "./screens/Login";
import Home from "./screens/Home";
import  Details  from "./screens/Details";




function App() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Details/:id?" element={<Details />} />
          
        </Routes>
      </Router>

  );
}

export default App;

