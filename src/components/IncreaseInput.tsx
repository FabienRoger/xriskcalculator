import React from "react";
import { percentToProb, probToPercent } from "../utils/converters";
import ValueInput from "./ValueInput";

type IncreaseInputInputProps = {
  setValue: (v: number) => void;
  text: string;
  defaultValue: number;
};

const IncreaseInput = (props: IncreaseInputInputProps): JSX.Element => {
  const { setValue, text, defaultValue } = props;

  return (
    <ValueInput
      setValue={setValue}
      text={`${text} (%)`}
      defaultValue={probToPercent(defaultValue)}
      convertor={percentToProb}
      validator={(v: number): boolean => {
        return v >= 0;
      }}
    />
  );
};
export default IncreaseInput;
