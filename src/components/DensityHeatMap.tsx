import React from "react";
import HeatMap from "react-heatmap-grid";
import { nbYears, yearsNames } from "../utils/constants";
import { max, min, probToDisplayedProb, transpose } from "../utils/mathUtils";
import "./DensityHeatMap.css";

type DensityHeatMapProps = {
  data: number[][];
  grayBellowDiagonal?: boolean;
};

const valueToCol = (val: number, norm: number, grayed = false) => {
  if (norm < 1e-17) return "lightgray";

  const saturation = grayed ? "60%" : "80%";

  if (val > 0) {
    const lightness = (norm - val) / norm;
    return `hsl(233.3,${saturation},${60 + Math.floor(40 * lightness)}%)`;
  } else {
    const lightness = (norm + val) / norm;
    return `hsl(6.7,${saturation}, ${60 + Math.floor(40 * lightness)}%)`;
  }
};

export const DensityHeatMap = (props: DensityHeatMapProps) => {
  const { grayBellowDiagonal, data } = props;

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

  const cellColor = (value: number, x: number, y: number): string => {
    return valueToCol(value, norm, grayBellowDiagonal && nbYears - x - 1 <= y);
  };

  return (
    <div className="heatmap-container">
      <div style={{ position: "relative" }}>
        <p className="heatmap-xlabel">When AGI safety becomes ready</p>
        <p className="heatmap-ylabel">When AGI happens</p>
        <HeatMap
          xLabels={yearsNames}
          yLabels={yLabels}
          xLabelsLocation={"bottom"}
          xLabelsVisibility={labelsVisibility}
          height={cellSize}
          data={transpose(data)}
          squares
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: cellColor(value, x, y),
            margin: "0",
            borderTop: `1px solid ${getBorderColor(x, y)}`,
            borderLeft: `1px solid ${getBorderColor(x, y)}`,
            borderRadius: "2px",
          })}
          size
        />
      </div>
      <div
        className="colobar"
        style={{
          height: `${nbYears * cellSize * 0.7}px`,
          background: colorBarGradient,
        }}
      />
      <div
        className="colarbar-labels-container"
        style={{
          height: `${nbYears * cellSize * 0.7}px`,
        }}
      >
        <p style={{ marginBottom: "auto" }}>p = {displayedMaxProb}</p>
        <p style={{ marginBottom: "0" }}>p = {displayedMinProb}</p>
      </div>
    </div>
  );
};
