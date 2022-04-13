import React, { createContext, ReactNode, useEffect, useState } from "react";
import { nbYears } from "./constants";
import { Parameters } from "./types";

interface ParametersContextProps {
  parameters: Parameters;
  setParameters: (param: Parameters) => void;
}

const default_params: Parameters = {
  agiProb: 0.5,
  aisProb: 0.8,
  agiProbModeYear: 19,
  aisProbModeYear: 10,
  save_prob: 0,
  probabilityDensityAGI: [],
  probabilityDensityAIS: [],
  probabilityDensity: [],
  probabilityDensityT: [],
  speedUpPerYear: [],
  shiftedProbabilityDensity: [],
  shiftedProbabilityDensityT: [],
};

const empty2DArray = (cols: number, rows: number): number[][] => {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(0));
};

const transpose = (array: number[][], maxI: number): number[][] => {
  return empty2DArray(array.length, array[0].length).map((subarray, i) =>
    subarray.map((_, j) => array[maxI - i][j])
  );
};

const crossProduct = (arrayI: number[], arrayJ: number[]): number[][] => {
  return Array(arrayI.length)
    .fill(undefined)
    .map((_, i) =>
      Array(arrayJ.length)
        .fill(undefined)
        .map((_, j) => arrayJ[j] * arrayI[i])
    );
};

const uniformDistribution = (length: number, totalArea: number): number[] => {
  const result = Array(length)
    .fill(undefined)
    .map((_, i) => totalArea / length);

  return result;
};

const triangleDistribution = (
  mode: number,
  length: number,
  totalArea: number
): number[] => {
  // mode need to be strictly between 0 and length - 1

  let result = Array(length)
    .fill(undefined)
    .map((_, i) => Math.min(i / mode, (length - 1 - i) / (length - 1 - mode)));

  const sum = result.reduce((prev, current) => prev + current, 0);

  for (let i = 0; i < result.length; i++) {
    result[i] *= totalArea / sum;
  }

  return result;
};

const updateSaveProb = (p: Parameters): Parameters => {
  p.save_prob = p.agiProb * p.aisProb;

  p.probabilityDensityAGI = triangleDistribution(
    p.agiProbModeYear,
    nbYears,
    p.agiProb
  );
  p.probabilityDensityAIS = triangleDistribution(
    p.aisProbModeYear,
    nbYears,
    p.aisProb
  );
  p.speedUpPerYear = Array(nbYears)
    .fill(undefined)
    .map((_, i) => 0.5);
  console.log(p.speedUpPerYear);

  p.probabilityDensity = crossProduct(
    p.probabilityDensityAIS,
    p.probabilityDensityAGI
  );
  p.probabilityDensityT = transpose(p.probabilityDensity, nbYears - 1);

  p.shiftedProbabilityDensity = shiftProbDensity(
    p.probabilityDensity,
    p.speedUpPerYear
  );
  p.shiftedProbabilityDensityT = transpose(
    p.shiftedProbabilityDensity,
    nbYears - 1
  );
  return p;
};

const interpolate = (
  array: number[],
  index: number,
  outOfBoundValue: number
): number => {
  const floorIndex = Math.floor(index);
  const ceilIndex = Math.ceil(index);
  if (floorIndex < 0 || ceilIndex > array.length - 1) return outOfBoundValue;

  const alpha = ceilIndex - index;
  return alpha * array[floorIndex] + (1 - alpha) * array[ceilIndex];
};

const shiftProbDensity = (
  array: number[][],
  speedupPerYear: number[]
): number[][] => {
  let result: number[][] = empty2DArray(nbYears, nbYears);

  for (let agiYear = 0; agiYear < nbYears; agiYear++) {
    let aisProgress = 0; // Mesured in year index
    for (let aisYear = 0; aisYear < nbYears; aisYear++) {
      result[agiYear][aisYear] = interpolate(array[agiYear], aisProgress, 0);
      aisProgress += (1 + speedupPerYear[aisYear]);
    }
  }

  return result;
};

export const ParametersContext = createContext<ParametersContextProps>({
  parameters: default_params,
  setParameters: (_) => {},
});

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [parameters, setParameters_] = useState(updateSaveProb(default_params));

  const setParameters = (p: Parameters) => {
    setParameters_(updateSaveProb(p));
  };

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};
