import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { MenuItem, Select, Slider } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import IncreaseInput from "../components/IncreaseInput";
import ProbabilityInput from "../components/ProbabilityInput";
import { useParametersContext } from "../ParametersContext";
import { nbYears } from "../utils/constants";
import { indexToYear } from "../utils/converters";
import { increaseToDisplayedIncrease, range } from "../utils/mathUtils";

const MyImpactSubsection = (): JSX.Element => {
  const {
    speedUpFactorsChains,
    currentSpeedUpChain,
    setCurrentSpeedUpChain,
    speedUpRange,
    setSpeedUpRange,
    speedup,
  } = useParametersContext();

  const sliderMarks = range(nbYears)
    .filter((i) => i % 4 == 0)
    .map((i) => ({
      value: i,
      label: indexToYear(i),
    }));

  return (
    <>
      <p>
        <ArrowRightIcon />
        Finally, describe how you speed up AGI safety work.
      </p>
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
            {chain.title}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <p>{speedUpFactorsChains[currentSpeedUpChain].description}</p>
      <Row>
        {speedUpFactorsChains[currentSpeedUpChain].speedUpFactors.map(
          (factor, i) => {
            const [value, setValue] = factor.state;
            const props = {
              setValue: setValue,
              text: factor.question,
              defaultValue: value,
              key: `value${i}`,
            };
            return (
              <Col sm={12} md={4} key={`col${i} ${currentSpeedUpChain}`}>
                {
                  {
                    "%prob": <ProbabilityInput {...props} />,
                    "%increase": <IncreaseInput {...props} />,
                  }[factor.type]
                }
              </Col>
            );
          }
        )}
      </Row>
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
export default MyImpactSubsection;
