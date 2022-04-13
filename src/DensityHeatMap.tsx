import React, { useContext, useState } from "react";
import HeatMap from "react-heatmap-grid";
import { yearsNames, nbYears } from "./constants";

type DensityHeatMapProps = {
  data: number[][];
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
          background: `rgba(66, 86, 244, ${1 -
            (max - value) / (max > 0 ? max : 1)})`,
          margin: "0",
        })}
        size
        // cellRender={(value) => ``}
        // title={(value, unit) => `${value}`}
      />
    </div>
  );
};
