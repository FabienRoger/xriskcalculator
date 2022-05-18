import { MenuItem, Select, Slider } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Collapsable from "../components/Collapsable";
import IncreaseInput from "../components/IncreaseInput";
import ProbabilityInput from "../components/ProbabilityInput";
import ValueInput from "../components/ValueInput";
import { useParametersContext } from "../ParametersContext";
import { nbYears } from "../utils/constants";
import { indexToYear } from "../utils/converters";
import { increaseToDisplayedIncrease, range } from "../utils/mathUtils";

const LivesSavedSection = (): JSX.Element => {
  const { livesPreventByWrongAGI, setLivesPreventedByWrongAGI } =
    useParametersContext();

  return (
    <Collapsable
      optional
      text={
        <>
          Describe what you think how agI that goes wrong could limit the
          potential of humanity.
        </>
      }
    >
      <p>
        How many lives would be prevented, in expectation, by the creation of an
        AGI which would go wrong?
      </p>
      <Row>
        <Col sm={12} md={4}>
          <ValueInput
            setValue={setLivesPreventedByWrongAGI}
            text={"How many lives would it prevent?"}
            defaultValue={livesPreventByWrongAGI}
            canBeUndefined
          />
        </Col>
      </Row>
    </Collapsable>
  );
};
export default LivesSavedSection;
