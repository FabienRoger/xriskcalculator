import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Collapsable from "../components/Collapsable";
import PiecewiseLinearDistributionCreator from "../components/DistributionCreator";
import ProbabilityInput from "../components/ProbabilityInput";
import { useParametersContext } from "../ParametersContext";
import MyImpactSubsection from "./MyImpactSubsection";

const InputsSection = (): JSX.Element => {
  const {
    agiProb,
    agiWrongProb,
    aisProb,
    agiDistribution,
    aisDistribution,
    setAgiProb,
    setAgiWrongProb,
    setAisProb,
    setAgiDistribution,
    setAisDistribution,
  } = useParametersContext();
  return (
    <>
      <h2>Your beliefs about AGI and AGI safety</h2>
      <Collapsable
        text={
          <>
            First, describe how you think AGI would go
            <i>without AGI safety existing at all</i>
          </>
        }
      >
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
          text="What is the probability that AGI that goes wrong happens before any given year?"
          distribution={agiDistribution}
          area={agiProb * agiWrongProb}
        />
      </Collapsable>
      <br />
      <Collapsable
        text={
          <>
            Now, describe if and when you think AGI safety will be ready to
            prevent AGI from going wrong.
          </>
        }
      >
        <p>
          <i>
            Note: In this estimation, AGI happening and AGI safety being solved
            are supposed to be independent events. AGI safety being prevented by
            AGI happening first should not be considered here.
          </i>
        </p>
        <Row>
          <Col sm={12} md={4}>
            <ProbabilityInput
              setValue={setAisProb}
              text={"How likely is AGI safety to work?"}
              defaultValue={aisProb}
            />
          </Col>
        </Row>

        <PiecewiseLinearDistributionCreator
          setDistribution={setAisDistribution}
          text="What is the probability that AGI safety has already been solved at any given year?"
          distribution={aisDistribution}
          area={aisProb}
        />
      </Collapsable>
      <br />
      <MyImpactSubsection />
    </>
  );
};
export default InputsSection;
