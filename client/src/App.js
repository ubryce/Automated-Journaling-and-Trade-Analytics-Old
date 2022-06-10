import React from "react";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Journalspage from "./Pages/Journalspage";

function App() {

  const [data, setData] = React.useState(null);

  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/journals" element={<Journalspage/>} />
    </Routes>
  );
}

export default App;
