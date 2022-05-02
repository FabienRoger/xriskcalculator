import { Gradient } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import HeatMap from "react-heatmap-grid";
import { yearsNames, nbYears } from "../utils/constants";
import { max, min, probToDisplayedProb, transpose } from "../utils/mathUtils";

type DensityHeatMapProps = {
  data: number[][];
};

const valueToCol = (val: number, norm: number) => {
  if (norm < 1e-17) return "lightgray";
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
    .map((_, i) => i % 4 === 0);

  const yLabels = [...yearsNames];
  yLabels.reverse();

  const minP = min(data);
  const maxP = max(data);
  const norm = Math.max(maxP, -minP);
  const displayedMinProb = probToDisplayedProb(minP >= 0 ? 0 : -norm);
  const displayedMaxProb = probToDisplayedProb(norm);

  const colorBarGradient =
    minP >= 0
      ? `linear-gradient(${valueToCol(norm, norm)}, white)`
      : `linear-gradient(${valueToCol(norm, norm)} 0%, white 50%,${valueToCol(
          -norm,
          norm
        )} 100%)`;

  const cellSize = 15;

  const getBorderColor = (x: number, y: number): string => {
    return nbYears - x - 1 == y ? "black" : "lightgray";
  };

  return (
    <div
      style={{
        paddingBottom: "2em",
        paddingTop: "1em",
        paddingLeft: "1em",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ position: "relative" }}>
        <p
          style={{
            bottom: "-2em",
            left: "5em",
            position: "absolute",
          }}
        >
          When AGI safety becomes ready
        </p>
        <p
          style={{
            bottom: "8em",
            left: "-5em",
            position: "absolute",
            transform: "rotate(-90deg)",
          }}
        >
          When AGI happens
        </p>
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
            borderTop: `1px solid ${getBorderColor(x, y)}`,
            borderLeft: `1px solid ${getBorderColor(x, y)}`,
            borderRadius: "2px",
          })}
          size
        />
      </div>
      <div
        style={{
          marginLeft: "30px",
          height: `${nbYears * cellSize * 0.7}px`,
          width: "10px",
          border: "1px solid lightgray",
          background: colorBarGradient,
          flexShrink: 0,
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
        <p style={{ marginBottom: "auto" }}>p = {displayedMaxProb}</p>
        <p style={{ marginBottom: "0" }}>p = {displayedMinProb}</p>
      </div>
    </div>
  );
};
