import { Checkbox, MenuItem, Select, Slider } from "@mui/material";
import React from "react";
import Collapsable from "../components/Collapsable";
import IncreaseInput from "../components/IncreaseInput";
import ProbabilityInput from "../components/ProbabilityInput";
import { SpeedUpFactorChain, useParametersContext } from "../ParametersContext";
import { nbYears } from "../utils/constants";
import { indexToYear } from "../utils/converters";
import { increaseToDisplayedIncrease, range } from "../utils/mathUtils";
import {
  InputGridContainer,
  LargeInputGridItem,
} from "../components/GridComponents";

const sliderMarks = range(nbYears)
  .filter((i) => i % 4 === 0)
  .map((i) => ({
    value: i,
    label: indexToYear(i),
  }));

const SpeedUpChainInput = (
  speedUpFactorsChains: SpeedUpFactorChain[],
  setSpeedUpFactorsChains: React.Dispatch<
    React.SetStateAction<SpeedUpFactorChain[]>
  >,
  currentSpeedUpChain: number,
  setCurrentSpeedUpChain: React.Dispatch<React.SetStateAction<number>>,
  speedUpRange: [number, number],
  setSpeedUpRange: React.Dispatch<React.SetStateAction<[number, number]>>,
  speedup: number
): JSX.Element => {
  return (
    <>
      <Select
        value={currentSpeedUpChain}
        onChange={(v) => {
          const value = v.target.value as number;
          setCurrentSpeedUpChain(value);
        }}
        autoWidth
        label=""
      >
        {speedUpFactorsChains.map((chain, i) => (
          <MenuItem value={i} key={i}>
            <div style={{ whiteSpace: "normal" }}>{chain.title}</div>
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <p>{speedUpFactorsChains[currentSpeedUpChain].description}</p>
      <InputGridContainer>
        {speedUpFactorsChains[currentSpeedUpChain].speedUpFactors.map(
          (factor, i) => {
            const props = {
              setValue: (v: number) => {
                let newSpeedUpFactorsChains = [...speedUpFactorsChains];
                newSpeedUpFactorsChains[currentSpeedUpChain].speedUpFactors[
                  i
                ].value = v;
                setSpeedUpFactorsChains(newSpeedUpFactorsChains);
              },
              text: factor.question,
              defaultValue: factor.value,
              key: `value${i}`,
            };
            return (
              <LargeInputGridItem key={`col${i} ${currentSpeedUpChain}`}>
                {
                  {
                    "%prob": <ProbabilityInput {...props} />,
                    "%increase": <IncreaseInput {...props} />,
                  }[factor.type]
                }
              </LargeInputGridItem>
            );
          }
        )}
      </InputGridContainer>
      <br />
      <p>Resulting speedup: +{increaseToDisplayedIncrease(speedup)}%</p>
      <p>When will this speedup be effective?</p>
      <div>
        <Slider
          value={speedUpRange}
          onChange={(e: Event, newRange: number[]) => {
            setSpeedUpRange([Math.min(...newRange), Math.max(...newRange)]);
          }}
          min={0}
          max={nbYears - 1}
          step={1}
          marks={sliderMarks}
        />
      </div>
    </>
  );
};

const MyImpactSubsection = (): JSX.Element => {
  const {
    speedUpFactorsChains,
    setSpeedUpFactorsChains,
    currentSpeedUpChain,
    setCurrentSpeedUpChain,
    speedUpRange,
    setSpeedUpRange,
    speedup,
    agiSpeedUpFactorsChains,
    setAgiSpeedUpFactorsChains,
    currentAgiSpeedUpChain,
    setCurrentAgiSpeedUpChain,
    agiSpeedUpRange,
    setAgiSpeedUpRange,
    agiSpeedup,
    useAgiSpeedup,
    setUseAgiSpeedup,
  } = useParametersContext();

  const aisSpeedUpChainInput = SpeedUpChainInput(
    speedUpFactorsChains,
    setSpeedUpFactorsChains,
    currentSpeedUpChain,
    setCurrentSpeedUpChain,
    speedUpRange,
    setSpeedUpRange,
    speedup
  );
  const agiSpeedUpChainInput = SpeedUpChainInput(
    agiSpeedUpFactorsChains,
    setAgiSpeedUpFactorsChains,
    currentAgiSpeedUpChain,
    setCurrentAgiSpeedUpChain,
    agiSpeedUpRange,
    setAgiSpeedUpRange,
    agiSpeedup
  );
  return (
    <>
      <Collapsable
        text={<>Finally, describe how you speed up AGI safety work.</>}
      >
        {aisSpeedUpChainInput}
      </Collapsable>
      <Collapsable
        optional
        text="Describe how much you speed up work on building AGI."
      >
        <p>
          <Checkbox
            value={useAgiSpeedup}
            onChange={(v) => {
              const checked = v.target.value === "true";
              setUseAgiSpeedup(!checked);
            }}
          />
          Take into account the possibility of speeding up AGI through AGI
          safety work?
        </p>
        {agiSpeedUpChainInput}
      </Collapsable>
    </>
  );
};
export default MyImpactSubsection;
