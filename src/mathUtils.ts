export const empty2DArray = (cols: number, rows: number): number[][] => {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(0));
};

export const transpose = (array: number[][], maxI: number): number[][] => {
  return empty2DArray(array.length, array[0].length).map((subarray, i) =>
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

export const uniformDistribution = (
  length: number,
  totalArea: number
): number[] => {
  const result = Array(length)
    .fill(undefined)
    .map((_, i) => totalArea / length);

  return result;
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

export const subtract = (
  array1: number[][],
  array2: number[][]
): number[][] => {
  const result = empty2DArray(array1.length, array1[0].length).map(
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
