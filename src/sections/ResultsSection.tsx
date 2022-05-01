import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProbabilityResult from "../components/ProbabilityResult";
import { useParametersContext } from "../ParametersContext";
import { yearsInterval } from "../utils/constants";

const ResultsSection = (): JSX.Element => {
  const { doomProbWithoutYou, doomProbWithYou, saveProb } =
    useParametersContext();
  return (
    <div className="results-section">
      <Container>
        <h2>Results</h2>
        <Row
          style={{
            maxWidth: "40em",
            margin: "3px",
            padding: "5px",
          }}
        >
          <Col sm={12} md={6}>
            <ProbabilityResult
              text="How likely is the world to end?"
              prob={doomProbWithoutYou}
            />
          </Col>
          <Col sm={12} md={6}>
            <ProbabilityResult
              text="How likely are you to save the world?"
              prob={saveProb}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResultsSection;
