import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./style/Navbar.style.css";

function navbarBS() {
  return (
    <Navbar bg="none" className="navbar">
      <Nav className="nav">
        <Nav.Link href="/" className="link">
          Home
        </Nav.Link>
        <Nav.Link href="/customers" className="link">
          Customers List
        </Nav.Link>
        <Nav.Link href="/logs" className="link">
          Logs
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default navbarBS;
