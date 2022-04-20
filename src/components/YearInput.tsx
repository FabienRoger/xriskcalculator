import React from "react";
import { endYear, startYear, yearsInterval } from "../utils/constants";
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

  const convertor = (y: number) => {
    return (y - startYear) / yearsInterval;
  };

  return (
    <ValueInput
      setValue={setValue}
      text={text}
      defaultValue={defaultValue * yearsInterval + startYear}
      validator={validator}
      convertor={convertor}
    />
  );
};
export default YearInput;
