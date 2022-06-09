import React from "react";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Tradespage from "./Pages/Tradespage";

function App() {

  const [data, setData] = React.useState(null);

  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/trades" element={<Tradespage/>} />
    </Routes>
  );
}

export default App;
