import React from "react";
import { Col, Row } from "react-bootstrap";
import { DensityHeatMap } from "../components/DensityHeatMap";
import { useParametersContext } from "../ParametersContext";

const ResultsDetailsSection = (): JSX.Element => {
  const { probabilityDensity, deltaProbabilityDensity } =
    useParametersContext();
  return (
    <>
      <h2>Results' details</h2>
      <p>
        To compute the results, the probability distribution on the left is
        shifted to the left (by 1/(1+speedup*fraction_of_the_work)). The
        difference between the old and the new one is displayed on the right.
      </p>
      <Row>
        <Col>
          <p>
            Was is the probability that AI Safety is solved by your approach on
            year x and that a rogue AGI happens on year y? (bellow the diagonal
            line, humanity is doomed)
          </p>
        </Col>
        <Col>
          <p>
            What difference does your intervention make? More precisely, how
            would your intervention change the probability of each scenario "AI
            Safety is solved on year x and a rogue AGI happens on year y"?
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <DensityHeatMap data={probabilityDensity} />
        </Col>
        <Col>
          <DensityHeatMap data={deltaProbabilityDensity} />
        </Col>
      </Row>
    </>
  );
};

export default ResultsDetailsSection;