import React from "react";
import { Grid } from "@mui/material";
import { DensityHeatMap } from "../components/DensityHeatMap";
import { useParametersContext } from "../ParametersContext";

const ResultsDetailsSection = (): JSX.Element => {
  const { probabilityDensity, deltaProbabilityDensity } =
    useParametersContext();
  return (
    <>
      <h2>Results' details</h2>
      <p>
        To compute the results, the probability distribution on the left is
        shifted to the left (compressed by a factor of 1+speedup, where the
        speedup is relevant). The difference between the old and the new one is
        displayed on the right.
      </p>
      <Grid container spacing={3}>
        <Grid item sm={12} md={6} minWidth={360}>
          <p>
            Was is the probability that AGI safety is ready on year x and that a
            rogue AGI happens on year y? (bellow the diagonal line, humanity is
            doomed)
          </p>
          <DensityHeatMap data={probabilityDensity} />
        </Grid>
        <Grid item sm={12} md={6} lg={6} minWidth={360}>
          <p>
            How would your intervention change the probability of each scenario
            "AGI safety is solved on year x and a rogue AGI happens on year y"?
          </p>
          <DensityHeatMap data={deltaProbabilityDensity} />
        </Grid>
      </Grid>
    </>
  );
};

export default ResultsDetailsSection;
