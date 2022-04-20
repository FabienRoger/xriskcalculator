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
    return 0 <= p && p <= 1;
  };

  const convertor = (p: number) => {
    return p;
  };

  return (
    <ValueInput
      setValue={setValue}
      text={text}
      defaultValue={defaultValue}
      validator={validator}
      convertor={convertor}
    />
  );
};
export default ProbabilityInput;
