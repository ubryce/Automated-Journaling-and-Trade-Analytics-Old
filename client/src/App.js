import React from "react";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Tradespage from "./Pages/Tradespage";

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/trades" element={<Tradespage/>} />
    </Routes>
  );
}

export default App;
