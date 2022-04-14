import { Box } from "@mui/material";
import React from "react";
import "./App.css";

const ProbabilityResult = (props: {
  prob: number;
  text: string;
}): JSX.Element => {
  const { prob, text } = props;
  const displayedProb = prob.toPrecision(2);

  return (
    <Box sx={{ color: "white" }}>
      {text} <br /> = {displayedProb}
    </Box>
  );
};
export default ProbabilityResult;
