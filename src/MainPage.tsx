import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import "./App.css";

const MainPage = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">X-Risk Calculator</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="main">
        <Row xs={1} md={2}>
          <Col>first</Col>
          <Col>second</Col>
        </Row>
      </Container>
      <Navbar bg="dark" variant="dark" className="bottom-navbar">
        <Container>p = 0.5</Container>
      </Navbar>
    </>
  );
};

export default MainPage;
