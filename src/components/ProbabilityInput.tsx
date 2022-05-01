import React from "react";
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

  const convertor = (p: number) => {
    return p / 100;
  };

  return (
    <ValueInput
      setValue={setValue}
      text={`${text} (%)`}
      defaultValue={defaultValue * 100}
      validator={validator}
      convertor={convertor}
    />
  );
};
export default ProbabilityInput;
