import React from "react";
import { probToPercent } from "../utils/converters";
import ValueInput from "./ValueInput";

type ProbabilityInputProps = {
  setValue: (v: number) => void;
  text: string;
  defaultValue: number;
};

const ProbabilityInput = (props: ProbabilityInputProps): JSX.Element => {
  const { setValue, text, defaultValue } = props;

  const validator = (p: number) => {
    return 0 <= p && p <= 100;
  };

  return (
    <ValueInput
      setValue={setValue}
      text={`${text} (%)`}
      defaultValue={probToPercent(defaultValue)}
      validator={validator}
      convertor={probToPercent}
    />
  );
};
export default ProbabilityInput;
