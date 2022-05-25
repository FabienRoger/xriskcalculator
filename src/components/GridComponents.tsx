import { Grid } from "@mui/material";
import React from "react";

export const InputGridItem = (props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => (
  <Grid item xs={12} sm={6} md={5} lg={4}>
    {props.children}
  </Grid>
);

export const LargeInputGridItem = (props: {
    children: JSX.Element | JSX.Element[];
  }): JSX.Element => (
    <Grid item xs={12} sm={10} md={8} lg={6}>
      {props.children}
    </Grid>
  );

export const InputGridContainer = (props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => (
  <Grid container spacing={2}>
    {props.children}
  </Grid>
);
