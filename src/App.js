import React from "react";
import MainPage from "./Component/MainPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<h1>Auth Page</h1>} />
        <Route exact path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
