import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import IncreaseInput from "../components/IncreaseInput";
import ProbabilityInput from "../components/ProbabilityInput";
import { useParametersContext } from "../ParametersContext";

const MyImpactSubsection = (): JSX.Element => {
  const { speedUpFactorsChains, currentSpeedUpChain, setCurrentSpeedUpChain } =
    useParametersContext();

  console.log(speedUpFactorsChains.map((chain, i) => chain.title));
  return (
    <>
      <p>Finally, describe how you speed up AGI safety work.</p>
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
          <MenuItem value={i}>{chain.title}</MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <p>{speedUpFactorsChains[currentSpeedUpChain].description}</p>
      <Row>
        {speedUpFactorsChains[currentSpeedUpChain].speedUpFactors.map(
          (factor) => {
            const [value, setValue] = factor.state;
            const props = {
              setValue: setValue,
              text: factor.question,
              defaultValue: value,
            };
            return (
              <Col sm={12} md={4}>
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
    </>
  );
};
export default MyImpactSubsection;
