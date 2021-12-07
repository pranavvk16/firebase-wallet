import React from "react";
import MainPage from "./Component/MainPage";
import LandingPage from "./Component/LandingPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
