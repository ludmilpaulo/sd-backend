import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Login  from "./screens/Login";
import Home from "./screens/Home";




function App() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Router>

  );
}

export default App;

