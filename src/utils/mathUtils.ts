import { le, ge } from "binary-search-bounds";

export const probToDisplayedProb = (prob: number): string => {
  return Math.abs(prob) < 1e-2 ? prob.toExponential(1) : prob.toPrecision(2);
};

export const arrayEquals = (a: any[], b: any[]): boolean => {
  return a.length === b.length && a.every((val, index) => val === b[index]);
};

export const zeros2DArray = (cols: number, rows: number): number[][] => {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(0));
};

export const range = (length: number): number[] => {
  return Array(length)
    .fill(undefined)
    .map((_, i) => i);
};

export const uniformlyDistributedPoints = (segments: number): number[] => {
  // 3 => [0, 0.33, 0.66, 1]

  return range(segments + 1).map((v) => v / segments);
};

export const transpose = (array: number[][]): number[][] => {
  const maxI = array.length - 1;
  return zeros2DArray(array.length, array[0].length).map((subarray, i) =>
    subarray.map((_, j) => array[maxI - i][j])
  );
};

export const crossProduct = (
  arrayI: number[],
  arrayJ: number[]
): number[][] => {
  return Array(arrayI.length)
    .fill(undefined)
    .map((_, i) =>
      Array(arrayJ.length)
        .fill(undefined)
        .map((_, j) => arrayJ[j] * arrayI[i])
    );
};

export const interpolate = (
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

export const constantDistribution = (
  length: number,
  value: number
): number[] => {
  const result = Array(length)
    .fill(undefined)
    .map((_, i) => value);

  return result;
};

export const uniformDistribution = (
  length: number,
  totalArea: number
): number[] => {
  return constantDistribution(length, totalArea / length);
};

export const triangleDistribution = (
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

export const piecewiseLinearDistribution = (
  xCoordinates: number[],
  yCoordinates: number[],
  length: number,
  totalArea: number
): number[] => {
  let result = Array(length)
    .fill(undefined)
    .map((_, x) => {
      const leftI = le(xCoordinates, x);
      const rightI = ge(xCoordinates, x);
      if (leftI == rightI) return yCoordinates[leftI];
      const alpha =
        (x - xCoordinates[leftI]) /
        (xCoordinates[rightI] - xCoordinates[leftI]);
      const r =
        alpha * yCoordinates[rightI] + (1 - alpha) * yCoordinates[leftI];
      return r;
    });

  const sum = result.reduce((prev, current) => prev + current, 0);

  for (let i = 0; i < result.length; i++) {
    result[i] *= totalArea / sum;
  }

  return result;
};

export const piecewiseLinearCumulativeDistribution = (
  xCoordinates: number[],
  yCoordinates: number[],
  length: number,
  totalArea: number
): number[] => {
  const fullXCoordinates = [...xCoordinates];
  const fullYCoordinates = [...yCoordinates];

  let result = Array(length)
    .fill(undefined)
    .map((_, x) => {
      const leftI = le(fullXCoordinates, x);
      const rightI = ge(fullXCoordinates, x);
      if (leftI === -1) return 0;
      if (rightI === fullXCoordinates.length) return 1;
      if (fullXCoordinates[rightI] === fullXCoordinates[leftI])
        return fullYCoordinates[leftI];
      const alpha =
        (x - fullXCoordinates[leftI]) /
        (fullXCoordinates[rightI] - fullXCoordinates[leftI]);
      const r =
        alpha * fullYCoordinates[rightI] +
        (1 - alpha) * fullYCoordinates[leftI];
      return r;
    });

  for (let i = 0; i < result.length; i++) {
    result[i] *= totalArea;
  }

  return result;
};

export const subtract = (
  array1: number[][],
  array2: number[][]
): number[][] => {
  const result = zeros2DArray(array1.length, array1[0].length).map(
    (subarray, i) =>
      subarray.map((_, j) => {
        return array1[i][j] - array2[i][j];
      })
  );
  return result;
};

export const sum = (array: number[][]): number => {
  let s = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      s += array[i][j];
    }
  }
  return s;
};

export const min = (array: number[][]): number => {
  let s = array[0][0];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      s = Math.min(s, array[i][j]);
    }
  }
  return s;
};

export const max = (array: number[][]): number => {
  let s = array[0][0];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      s = Math.max(s, array[i][j]);
    }
  }
  return s;
};

export const densityToCumulative = (density: number[]): number[] => {
  const cumulative: number[] = [];
  let current = 0;
  for (let i = 0; i < density.length; i++) {
    const d = density[i];
    current += d;
    cumulative.push(current);
  }
  return cumulative;
};

export const cumulativeToDensity = (cumulative: number[]): number[] => {
  const density: number[] = [cumulative[0]];
  for (let i = 1; i < cumulative.length; i++) {
    density.push(cumulative[i] - cumulative[i - 1]);
  }
  return density;
};
