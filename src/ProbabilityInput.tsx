import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./App.css";

type ProbabilityInputProps = {
  setProb: (p: number) => void;
  text: string;
  defaultValue: number;
};

const ProbabilityInput = (props: ProbabilityInputProps): JSX.Element => {
  const { setProb, text, defaultValue } = props;

  const [probInput, setProbInput] = useState<string>(
    `${defaultValue.toPrecision(2)}`
  );

  const probChange = (prob: string) => {
    setProbInput(prob);
    const new_prob = parseFloat(prob);
    if (!isNaN(new_prob)) {
      setProb(new_prob);
    }
  };

  return (
    <TextField
      size="small"
      id={text}
      label={text}
      variant="outlined"
      value={probInput}
      onChange={(e) => probChange(e.target.value)}
    />
  );
};
export default ProbabilityInput;
