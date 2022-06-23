import React from "react";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Journalspage from "./Pages/Journalspage";
import Exchangespage from "./Pages/Exchangespage";

function App() {

  const [data, setData] = React.useState(null);

  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/journals" element={<Journalspage/>} />
      <Route path="/exchanges" element={<Exchangespage/>} />
    </Routes>
  );
}

export default App;
