import { Grid } from "@mui/material";
import React from "react";
import Collapsable from "../components/Collapsable";
import PiecewiseLinearDistributionCreator from "../components/DistributionCreator";
import {
  InputGridContainer,
  InputGridItem,
} from "../components/GridComponents";
import ProbabilityInput from "../components/ProbabilityInput";
import { useParametersContext } from "../ParametersContext";
import LivesSavedSection from "./LivesSavedSection";
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
        <InputGridContainer>
          <InputGridItem>
            <ProbabilityInput
              setValue={setAgiProb}
              text={"How likely is AGI"}
              defaultValue={agiProb}
            />
          </InputGridItem>
          <InputGridItem>
            <ProbabilityInput
              setValue={setAgiWrongProb}
              text={"How likely is it to go wrong?"}
              defaultValue={agiWrongProb}
            />
          </InputGridItem>
        </InputGridContainer>
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
        <InputGridContainer>
          <InputGridItem>
            <ProbabilityInput
              setValue={setAisProb}
              text={"How likely is AGI safety to work?"}
              defaultValue={aisProb}
            />
          </InputGridItem>
        </InputGridContainer>

        <PiecewiseLinearDistributionCreator
          setDistribution={setAisDistribution}
          text="What is the probability that AGI safety has already been solved at any given year?"
          distribution={aisDistribution}
          area={aisProb}
        />
      </Collapsable>
      <br />
      <MyImpactSubsection />
      <LivesSavedSection />
    </>
  );
};
export default InputsSection;
