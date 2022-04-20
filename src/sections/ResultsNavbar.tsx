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
          <Col xs={12} sm={4}>
            <ProbabilityResult
              text="How likely is the world to end?"
              prob={doomProbWithoutYou}
            />
          </Col>
          <Col xs={12} sm={3}>
            <ProbabilityResult
              text="How likely is it if you help?"
              prob={doomProbWithYou}
            />
          </Col>
          <Col xs={12} sm={5}>
            <ProbabilityResult
              text="How likely are you to save the world?"
              prob={saveProb}
            />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
export default ResultsNavbar;
