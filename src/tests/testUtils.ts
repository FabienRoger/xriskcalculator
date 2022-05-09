import { zeros2DArray } from "../utils/mathUtils";

export const expectArraysToBeClose = (a: number[], b: number[]) => {
  expect(a.length).toBe(b.length);
  for (let i = 0; i < a.length; i++) {
    expect(a[i]).toBeCloseTo(b[i]);
  }
};

export const expect2DArraysToBeClose = (a: number[][], b: number[][]) => {
  expect(a.length).toBe(b.length);
  for (let i = 0; i < a.length; i++) {
    expectArraysToBeClose(a[i], b[i]);
  }
};

export const random2DArray = (lengthI: number, lengthJ: number): number[][] => {
  return zeros2DArray(lengthI, lengthJ).map((subarray) =>
    subarray.map((_) => Math.random())
  );
};
