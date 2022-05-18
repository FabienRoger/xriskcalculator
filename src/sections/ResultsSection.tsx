import { Box } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProbabilityResult from "../components/ProbabilityResult";
import { useParametersContext } from "../ParametersContext";
import { useDevice } from "../utils/deviceHook";
import { numberToDisplay } from "../utils/mathUtils";

const ResultsSection = (): JSX.Element => {
  const { doomProbWithoutYou, saveProb, expectedLivesSaved } =
    useParametersContext();

  const isDesktop = useDevice(800);

  const doomResult = (
    <ProbabilityResult
      text="How likely is the world to end?"
      prob={doomProbWithoutYou}
    />
  );
  const saveResult = (
    <ProbabilityResult
      text="How likely are you to save the world?"
      prob={saveProb}
    />
  );
  const displayExpectedLivesSaved = expectedLivesSaved !== undefined;
  const livesResult = displayExpectedLivesSaved ? (
    <Box className="result-box">
      <p>
        In expectation, you would save{" "}
        <strong>{numberToDisplay(expectedLivesSaved)}</strong> lives
      </p>
    </Box>
  ) : (
    <></>
  );

  return (
    <div className="results-section">
      <Container>
        <h2>Results</h2>
        <Row
        // style={{
        //   maxWidth: "40em",
        // }}
        >
          {isDesktop ? (
            <>
              <Col style={{ maxWidth: "20em" }}>{doomResult}</Col>
              <Col style={{ maxWidth: "25em" }}>{saveResult}</Col>
              {displayExpectedLivesSaved && <Col>{livesResult}</Col>}
            </>
          ) : (
            <>
              {doomResult}
              <br />
              <br />
              {saveResult}
              <br />
              <br />
              {livesResult}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ResultsSection;
