import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./App.css";

type ValueInputProps = {
  setValue: (v: number) => void;
  text: string;
  defaultValue: number;
  validator: (v: number) => boolean;
  convertor: (v: number) => number;
};

const ValueInput = (props: ValueInputProps): JSX.Element => {
  const { setValue, text, defaultValue, validator, convertor } = props;

  const [valueInput, setValueInput] = useState<string>(`${defaultValue}`);
  const [valueValid, setValueValid] = useState<boolean>(true);

  const valueChange = (value: string) => {
    setValueInput(value);
    const new_value = parseFloat(value);
    if (!isNaN(new_value) && validator(new_value)) {
      setValue(convertor(new_value));
      setValueValid(true);
    } else {
      setValueValid(false);
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        marginTop: "1rem",
      }}
    >
      <TextField
        size="small"
        id={text}
        label={text}
        variant="outlined"
        value={valueInput}
        onChange={(e) => valueChange(e.target.value)}
        error={!valueValid}
        fullWidth
      />
    </div>
  );
};
export default ValueInput;
