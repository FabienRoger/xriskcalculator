import React from "react";
import { Col, Row } from "react-bootstrap";
import IncreaseInput from "../components/IncreaseInput";
import ProbabilityInput from "../components/ProbabilityInput";
import { useParametersContext } from "../ParametersContext";

const MyImpactSubsection = (): JSX.Element => {
  const {
    speedUpFactors,
  } = useParametersContext();
  return (
    <>
      <p>
        Finally, describe what fraction of the AGI safety work your organization
        is doing, and how much you think you will speedup your organization's
        progress in this direction.
      </p>
      <Row>
        {speedUpFactors.map((factor) => {
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
        })}
      </Row>
    </>
  );
};
export default MyImpactSubsection;
