import React, { useContext } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import "./App.css";
import { DensityHeatMap } from "./DensityHeatMap";
import { ParametersContext } from "./ParametersContext";
import ProbabilityInput from "./ProbabilityInput";
import ProbabilityResult from "./ProbabilityResult";

const MainPage = (): JSX.Element => {
  const {
    agiProb,
    setAgiProb,
    aisProb,
    setAisProb,
    probabilityDensity,
    deltaProbabilityDensity,
    doomProbWithYou,
    doomProbWithoutYou,
    saveProb,
  } = useContext(ParametersContext);

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
            <ProbabilityInput
              setProb={setAgiProb}
              text={"AGI probability"}
              defaultValue={agiProb}
            />
          </Col>
          <Col>
            <ProbabilityInput
              setProb={setAisProb}
              text={"AI safety success probability"}
              defaultValue={aisProb}
            />
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
      </Container>
      <Navbar bg="dark" variant="dark" className="bottom-navbar">
        <Container>
          <Row>
            <Col xs={12} sm={3}>
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
            <Col xs={12} sm={6}>
              <ProbabilityResult
                text="How likely are you to save the world?"
                prob={saveProb}
              />
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default MainPage;
