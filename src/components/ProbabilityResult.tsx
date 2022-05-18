import { Box } from "@mui/material";
import React from "react";
import { probToDisplayedProb } from "../utils/mathUtils";

const ProbabilityResult = (props: {
  prob: number;
  text: string;
}): JSX.Element => {
  const { prob, text } = props;
  const displayedProb = probToDisplayedProb(prob);

  return (
    <Box className="result-box">
      {text} <br /> p = <strong>{displayedProb}</strong>
    </Box>
  );
};
export default ProbabilityResult;
