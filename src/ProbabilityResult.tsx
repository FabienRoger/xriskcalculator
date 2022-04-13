import React, { useContext, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { TextField, Box } from "@mui/material";
import "./App.css";
import { Parameters } from "./types";
import { ParametersContext } from "./ParametersContext";
import { DensityHeatMap } from "./DensityHeatMap";

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
