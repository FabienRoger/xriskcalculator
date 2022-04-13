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
