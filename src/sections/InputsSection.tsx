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
      <h2>Your beliefs about AGI and AGI safety</h2>
      <p>
        First, describe how you think AGI would go without AGI safety existing
        at all.
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
        text="What is the probability that AGI happens before any given year?"
        distribution={agiDistribution}
        area={agiProb * agiWrongProb}
      />
      <br />
      <p>
        Now describe if and when you think AGI safety will be ready to prevent
        AGI from going wrong.
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
        text="What is the probability that AGI safety is ready at any given year?"
        distribution={aisDistribution}
        area={aisProb}
      />
      <br />
      <p>
        Finally, describe what fraction of the AGI safety work your organization
        is doing, and how much you think you will speedup your organization's
        progress in this direction.
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
            text={"How much do you speed it up (%)"}
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
      <br />
    </>
  );
};
export default InputsSection;
