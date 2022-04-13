import React, { useContext, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { TextField, Box } from "@mui/material";
import "./App.css";
import { Parameters } from "./types";
import { ParametersContext } from "./ParametersContext";
import { DensityHeatMap } from "./DensityHeatMap";
import ProbabilityResult from "./ProbabilityResult";

const MainPage = (): JSX.Element => {
  const { parameters, setParameters } = useContext(ParametersContext);
  const [agiProb, setAgiProb] = useState<string>(`${parameters.agiProb}`);
  const [aisProb, setAisProb] = useState<string>(`${parameters.aisProb}`);

  const agiProbChange = (prob: string) => {
    setAgiProb(prob);
    const newParameters = parameters;
    const new_prob = parseFloat(prob);
    console.log(new_prob);
    if (!isNaN(new_prob)) {
      newParameters.agiProb = new_prob;
      setParameters(newParameters);
    }
  };

  const aisProbChange = (prob: string) => {
    setAisProb(prob);
    const newParameters = parameters;
    const new_prob = parseFloat(prob);
    if (!isNaN(new_prob)) {
      newParameters.aisProb = new_prob;
      setParameters(newParameters);
    }
  };

  const densityData = parameters.probabilityDensityT;
  const deltaDensityData = parameters.deltaProbabilityDensityT;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">X-Risk Calculator</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="main">
        <Row xs={1} md={2}>
          <Col>
            <TextField
              size="small"
              id="agi-probability"
              label="AGI probability"
              variant="outlined"
              value={agiProb}
              onChange={(e) => agiProbChange(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              size="small"
              id="ais-probability"
              label="AI safety success probability"
              variant="outlined"
              value={aisProb}
              onChange={(e) => aisProbChange(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DensityHeatMap data={densityData} />
          </Col>
          <Col>
            <DensityHeatMap data={deltaDensityData} />
          </Col>
        </Row>
      </Container>
      <Navbar bg="dark" variant="dark" className="bottom-navbar">
        <Container>
          <Row>
            <Col xs={12} sm={3}>
              <ProbabilityResult
                text="How likely is the world to end?"
                prob={parameters.doomProbWithoutYou}
              />
            </Col>
            <Col xs={12} sm={3}>
              <ProbabilityResult
                text="How likely is it if you help?"
                prob={parameters.doomProbWithYou}
              />
            </Col>
            <Col xs={12} sm={6}>
              <ProbabilityResult
                text="How likely are you to save the world?"
                prob={parameters.saveProb}
              />
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default MainPage;
