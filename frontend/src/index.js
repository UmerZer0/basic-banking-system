import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page";
import CustomersList from "./components/customers-list";
import Logs from "./components/logs";
import { Navbar, Nav } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <Navbar bg="dark" variant="dark" className="px-5 sticky-top">
      <Navbar.Brand href="/">Basic Banking</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/customers">Customer List</Nav.Link>
        <Nav.Link href="/logs">Logs</Nav.Link>
      </Nav>
    </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  </>
);
