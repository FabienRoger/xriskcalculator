import React from "react";
import Collapsable from "../components/Collapsable";
import { InputGridContainer, LargeInputGridItem } from "../components/GridComponents";
import ValueInput from "../components/ValueInput";
import { useParametersContext } from "../ParametersContext";

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
      <InputGridContainer>
        <LargeInputGridItem>
          <ValueInput
            setValue={setLivesPreventedByWrongAGI}
            text={"How many lives would it prevent?"}
            defaultValue={livesPreventByWrongAGI}
            canBeUndefined
          />
        </LargeInputGridItem>
      </InputGridContainer>
    </Collapsable>
  );
};
export default LivesSavedSection;
