import React from "react";
import { Container, Navbar } from "react-bootstrap";
import InputsSection from "./sections/InputsSection";
import LimitationSection from "./sections/LimitationSection";
import ResultsDetailsSection from "./sections/ResultsDetailsSection";
import ResultsNavbar from "./sections/ResultsNavbar";

const MainPage = (): JSX.Element => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            AGI Safety Usefulness Estimator
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="main" style={{ paddingBottom: "8em" }}>
        <InputsSection />
        <br />
        <ResultsDetailsSection />
        <LimitationSection />
      </Container>
      <ResultsNavbar />
    </>
  );
};

export default MainPage;
