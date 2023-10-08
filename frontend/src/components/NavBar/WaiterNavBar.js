import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function WaiterNavbar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#orders">Orders</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default WaiterNavbar;
