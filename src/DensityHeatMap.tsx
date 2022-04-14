import { Gradient } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import HeatMap from "react-heatmap-grid";
import { yearsNames, nbYears } from "./constants";
import { max, min, transpose } from "./mathUtils";

type DensityHeatMapProps = {
  data: number[][];
};

const valueToCol = (val: number, norm: number) => {
  if (norm == 0) return "lightgray";
  if (val > 0) {
    return `rgba(66, 86, 244, ${1 - (norm - val) / norm})`;
  } else {
    return `rgba(244, 86, 66, ${1 - (norm + val) / norm})`;
  }
};

export const DensityHeatMap = (props: DensityHeatMapProps) => {
  const { data } = props;

  const labelsVisibility = new Array(nbYears)
    .fill(0)
    .map((_, i) => (i % 3 === 0 ? true : false));

  const yLabels = [...yearsNames];
  yLabels.reverse();

  const minP = min(data);
  const maxP = max(data);
  const norm = Math.max(maxP, -minP);
  const displayedMinProb = minP >= 0 ? 0 : (-norm).toPrecision(2);
  const displayedMaxProb = norm.toPrecision(2);

  const colorBarGradient =
    minP >= 0
      ? `linear-gradient(white,${valueToCol(norm, norm)})`
      : `linear-gradient(${valueToCol(-norm, norm)} 0%, white 50%,${valueToCol(
          norm,
          norm
        )} 100%)`;

  const cellSize = 15;

  return (
    <div
      style={{
        paddingBottom: "2em",
        paddingTop: "1em",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <HeatMap
          xLabels={yearsNames}
          yLabels={yLabels}
          xLabelsLocation={"bottom"}
          xLabelsVisibility={labelsVisibility}
          height={cellSize}
          data={transpose(data)}
          squares
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: valueToCol(value, norm),
            margin: "0",
            border: "1px solid lightgray"
          })}
          size
        />
      </div>
      <div
        style={{
          marginLeft: "20px",
          height: `${nbYears * cellSize * 0.7}px`,
          width: "10px",
          border: "1px solid lightgray",
          background: colorBarGradient,
        }}
      />
      <div
        style={{
          marginLeft: "5px",
          height: `${nbYears * cellSize * 0.7}px`,
          display: "flex",
          flexDirection: "column",
          fontSize: "0.7rem",
        }}
      >
        <p style={{ marginBottom: "auto" }}>{displayedMaxProb}</p>
        <p style={{ marginBottom: "0" }}>{displayedMinProb}</p>
      </div>
    </div>
  );
};
