import React from "react";
import { Col, Row } from "react-bootstrap";
import PiecewiseLinearDistributionCreator from "../components/DistributionCreator";
import { useParametersContext } from "../ParametersContext";
import ProbabilityInput from "../components/ProbabilityInput";
import ValueInput from "../components/ValueInput";

const InputsSection = (): JSX.Element => {
  const {
    agiProb,
    agiWrongProb,
    aisProb,
    agiDistribution,
    aisDistribution,
    speedUpEveryYear,
    speedUpFraction,
    setAgiProb,
    setAgiWrongProb,
    setAisProb,
    setAgiDistribution,
    setAisDistribution,
    setSpeedUpEveryYear,
    setSpeedUpFraction,
  } = useParametersContext();
  return (
    <>
      <h2>Your believes about AGI and AI safety</h2>
      <p>
        First, describe how you think AGI would go without your approach to AGI
        safety existing at all.
      </p>
      <Row>
        <Col sm={12} md={4}>
          <ProbabilityInput
            setValue={setAgiProb}
            text={"How likely is AGI"}
            defaultValue={agiProb}
          />
        </Col>
        <Col sm={12} md={4}>
          <ProbabilityInput
            setValue={setAgiWrongProb}
            text={"How likely is it to go wrong?"}
            defaultValue={agiWrongProb}
          />
        </Col>
      </Row>
      <PiecewiseLinearDistributionCreator
        setDistribution={setAgiDistribution}
        text="AGI"
        defaultDistribution={agiDistribution}
      />
      <br />
      <p>
        Now describe if and when you think your approach to AGI safety will be
        ready to prevent AGI from going wrong.
      </p>
      <Row>
        <Col sm={12} md={4}>
          <ProbabilityInput
            setValue={setAisProb}
            text={"How likely is it to work?"}
            defaultValue={aisProb}
          />
        </Col>
      </Row>

      <PiecewiseLinearDistributionCreator
        setDistribution={setAisDistribution}
        text="AI Safety solved"
        mostLikelyText="When is it most likely to be solved?"
        defaultDistribution={aisDistribution}
      />
      <br />
      <p>
        Finally, describe what fraction of the work your organization is doing
        in your approach of AI safety, and how much you think you will speedup
        your organization's progress in this direction.
      </p>
      <Row>
        <Col sm={12} md={4}>
          <ProbabilityInput
            setValue={setSpeedUpFraction}
            text={"What fraction of the work is your org. doing?"}
            defaultValue={speedUpFraction}
          />
        </Col>
        <Col sm={12} md={4}>
          <ValueInput
            setValue={setSpeedUpEveryYear}
            text={"How much do you speed it up (in %)"}
            defaultValue={speedUpEveryYear * 100}
            validator={(v: number): boolean => {
              return v >= 0;
            }}
            convertor={(v: number): number => {
              return v / 100;
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default InputsSection;
