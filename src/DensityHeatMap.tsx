import React, { useContext, useState } from "react";
import HeatMap from "react-heatmap-grid";
import { yearsNames, nbYears } from "./constants";

type DensityHeatMapProps = {
  data: number[][];
};

const valueToCol = (val: number, min: number, max: number) => {
  const norm = Math.max(max, -min);
  if (norm == 0) return "black";
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

  return (
    <div style={{ paddingBottom: "2em", paddingTop: "1em" }}>
      <HeatMap
        xLabels={yearsNames}
        yLabels={yLabels}
        xLabelsLocation={"bottom"}
        xLabelsVisibility={labelsVisibility}
        height={15}
        data={data}
        squares
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: valueToCol(value, min, max),
          margin: "0",
        })}
        size
        // cellRender={(value) => ``}
        // title={(value, unit) => `${value}`}
      />
    </div>
  );
};
