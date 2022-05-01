import React from "react";
import { Col, Row } from "react-bootstrap";
import ProbabilityResult from "../components/ProbabilityResult";
import { useParametersContext } from "../ParametersContext";
import { yearsInterval } from "../utils/constants";

const ResultsSection = (): JSX.Element => {
  const { doomProbWithoutYou, doomProbWithYou, saveProb } =
    useParametersContext();
  return (
    <>
      <h2>Results</h2>
      <Row
        style={{
          maxWidth: "40em",
          border: "3px solid blue",
          borderRadius: "5px",
          boxSizing: "content-box",
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
      <br />
    </>
  );
};

export default ResultsSection;
