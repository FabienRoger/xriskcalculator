import React, { useContext } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import "./App.css";
import { DensityHeatMap } from "./DensityHeatMap";
import { ParametersContext } from "./ParametersContext";
import ValueInput from "./ValueInput";
import ProbabilityResult from "./ProbabilityResult";
import YearInput from "./YearInput";
import ProbabilityInput from "./ProbabilityInput";
import { yearsInterval } from "./constants";

const MainPage = (): JSX.Element => {
  const {
    agiProb,
    setAgiProb,
    agiProbModeYear,
    setAgiProbModeYear,
    agiWrongProb,
    setAgiWrongProb,
    aisProb,
    setAisProb,
    aisProbModeYear,
    setAisProbModeYear,
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
          <Navbar.Brand href="#home">
            AGI Safety Usefulness Estimator
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="main" style={{ paddingBottom: "8em" }}>
        <p>
          First, describe how you think AGI would go without your approach to
          AGI safety existing at all.
        </p>
        <Row>
          <Col xs={12} md={4}>
            <ProbabilityInput
              setValue={setAgiProb}
              text={"How likely is AGI"}
              defaultValue={agiProb}
            />
          </Col>
          <Col xs={12} md={4}>
            <ProbabilityInput
              setValue={setAgiWrongProb}
              text={"How likely is it to go wrong?"}
              defaultValue={agiWrongProb}
            />
          </Col>
          <Col xs={12} md={4}>
            <YearInput
              setValue={setAgiProbModeYear}
              text={"When is this AGI most likely?"}
              defaultValue={agiProbModeYear}
            />
          </Col>
        </Row>
        <p>
          Now describe if and when you think your approach to AGI safety will be
          ready to prevent AGI from going wrong.
        </p>
        <Row>
          <Col xs={12} md={4}>
            <ProbabilityInput
              setValue={setAisProb}
              text={"How likely is it to work?"}
              defaultValue={aisProb}
            />
          </Col>
          <Col xs={12} md={4}>
            <YearInput
              setValue={setAisProbModeYear}
              text={"When is it most likely to be ready?"}
              defaultValue={aisProbModeYear}
            />
          </Col>
        </Row>
        <Row>
          <h2>Results' details</h2>
        </Row>
        <Row>
          <Col>
            <p>
              Was is the probability that AI Safety is solved by your approach
              on year x and that a rogue AGI happens on year y? (bellow the
              diagonal line, humanity is doomed)
            </p>
          </Col>
          <Col>
            <p>
              What difference does your intervention make? More precisely, how
              would your intervention change the probability of each scenario
              "AI Safety is solved on year x and a rogue AGI happens on year y"?
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
        <Row>
          <h2>Assumptions and limitations</h2>
          <p>
            This estimator introduces many assumptions that are inacurrate and
            may be completly wrong.
          </p>
          <ul>
            <li>
              This tool assumes that you work on a approach to AGI Safety that
              you are not the only prusuring.
            </li>
            <li>
              This tool assumes that what happens after 2100 is irrelevant.
            </li>
            <li>
              This tool assumes that you speed up AI Safety progress at a
              constant rate throughout the century. This is widely inaccurate if
              you don't expect to work on the problem the whole time.
            </li>
            <li>
              This tool assumes that you speed up AI Safety progress with no
              uncertainty. This is widely inaccurate if you engage in actions
              with a high variance in outcome and that you are a significant
              player in your approach.
            </li>
            <li>
              [Many more incorrect assumptions... Feel free to add the by doing
              a pull request.]
            </li>
            <li>
              The results won't be more precise than the input. Please make
              experiments with lower and higher estimation for each parameters
              if you want to have an idea of the uncertainties at play.
            </li>
          </ul>
          <p>
            Please tell me which of the limitations are the ones that would be
            the most usefull fixing.
          </p>
        </Row>
        <Row>
          Details:
          <ul>
            <li>
              If AI Safety is solved on the same year as rogue AGI appears,
              humanity is considered doomed. In pratice, this doesn't make much
              a difference to the results.
            </li>
            <li>
              Years are taken in batches of {yearsInterval}. The probability in
              each square is the probability that the event happens within this{" "}
              {yearsInterval}-year window, starting at the displayed year.
            </li>
          </ul>
        </Row>
      </Container>
      <Navbar bg="dark" variant="dark" className="bottom-navbar">
        <Container>
          <Row>
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
    </>
  );
};

export default MainPage;
