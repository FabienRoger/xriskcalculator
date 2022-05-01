import React from "react";
import { Container, Navbar } from "react-bootstrap";
import InputsSection from "./sections/InputsSection";
import LimitationSection from "./sections/LimitationSection";
import ResultsDetailsSection from "./sections/ResultsDetailsSection";
import ResultsSection from "./sections/ResultsSection";
import Footer from "./sections/Footer";

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
      <Container className="main">
        <InputsSection />
        <ResultsSection />
        <ResultsDetailsSection />
        <LimitationSection />
      </Container>
      <Footer />
    </>
  );
};

export default MainPage;
