import React from "react";
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
      defaultValue={defaultValue * 100}
      validator={(v: number): boolean => {
        return v >= 0;
      }}
      convertor={(v: number): number => {
        return v / 100;
      }}
    />
  );
};
export default IncreaseInput;
