import { TextField } from "@mui/material";
import React, { useState } from "react";

type ValueInputProps = {
  setValue: (v: number) => void;
  text: string;
  defaultValue: number;
  validator?: (v: number) => boolean;
  convertor?: (v: number) => number;
  canBeUndefined?: boolean;
};

const ValueInput = (props: ValueInputProps): JSX.Element => {
  const {
    setValue,
    text,
    defaultValue,
    validator,
    convertor: _convertor,
    canBeUndefined,
  } = props;

  const convertor = _convertor === undefined ? (v: number) => v : _convertor;

  const [valueInput, setValueInput] = useState<string>(
    defaultValue === undefined ? "" : `${defaultValue}`
  );
  const [valueValid, setValueValid] = useState<boolean>(true);

  const valueChange = (value: string) => {
    setValueInput(value);
    if (canBeUndefined && value === "") {
      setValueValid(true);
      setValue(undefined);
      return;
    }

    const new_value = parseFloat(value);
    if (
      !isNaN(new_value) &&
      (validator === undefined || validator(new_value))
    ) {
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
