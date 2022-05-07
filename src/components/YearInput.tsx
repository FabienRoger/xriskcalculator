import React from "react";
import { endYear, startYear, yearsInterval } from "../utils/constants";
import { indexToYear, yearToIndex } from "../utils/converters";
import ValueInput from "./ValueInput";

type YearInputProps = {
  setValue: (v: number) => void;
  text: string;
  defaultValue: number;
};

const YearInput = (props: YearInputProps): JSX.Element => {
  const { setValue, text, defaultValue } = props;

  const validator = (y: number) => {
    return y >= startYear && y <= endYear;
  };

  return (
    <ValueInput
      setValue={setValue}
      text={text}
      defaultValue={indexToYear(defaultValue)}
      validator={validator}
      convertor={yearToIndex}
    />
  );
};
export default YearInput;
