import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page";
import CustomersList from "./components/CustomersList";
import Logs from "./components/Logs";
import "./App.css";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
