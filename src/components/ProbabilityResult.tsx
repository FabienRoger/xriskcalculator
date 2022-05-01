import { Box } from "@mui/material";
import React from "react";

const ProbabilityResult = (props: {
  prob: number;
  text: string;
}): JSX.Element => {
  const { prob, text } = props;
  const displayedProb =
    prob < 1e-2 ? prob.toExponential(1) : prob.toPrecision(2);

  return (
    <Box>
      {text} <br /> p = <strong>{displayedProb}</strong>
    </Box>
  );
};
export default ProbabilityResult;
