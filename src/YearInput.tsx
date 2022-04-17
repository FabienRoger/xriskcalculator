import React from "react";
import "./App.css";
import { endYear, nbYears, startYear } from "./constants";
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
    return (y - startYear) / nbYears;
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
export default YearInput;
