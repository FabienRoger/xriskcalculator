import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useParametersContext } from "../ParametersContext";
import ProbabilityResult from "../components/ProbabilityResult";

const ResultsNavbar = (): JSX.Element => {
  const { doomProbWithoutYou, doomProbWithYou, saveProb } =
    useParametersContext();

  return (
    <Navbar bg="dark" variant="dark" className="bottom-navbar">
      <Container>
        <Row style={{ width: "100%" }}>
          <Col sm={12} md={4}>
            <ProbabilityResult
              text="How likely is the world to end?"
              prob={doomProbWithoutYou}
            />
          </Col>
          <Col sm={12} md={3}>
            <ProbabilityResult
              text="How likely is it if you help?"
              prob={doomProbWithYou}
            />
          </Col>
          <Col sm={12} md={5}>
            <ProbabilityResult
              text="How likely are you to save the world?"
              prob={saveProb}
            />
          </Col>
        </Row>
      </Container>
      <div style={{ fontSize: "0.8em", color: "lightgray" }}>
        <p>By Fabien</p>
        <p>Discord: cefabla#8663</p>
      </div>
    </Navbar>
  );
};
export default ResultsNavbar;
