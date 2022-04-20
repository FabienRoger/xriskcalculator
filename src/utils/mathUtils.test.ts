import {
  cumulativeToDensity,
  densityToCumulative,
  triangleDistribution,
  piecewiseLinearDistribution,
  uniformDistribution,
} from "./mathUtils";

test("test to cumulative", () => {
  const cumulate = densityToCumulative([0.1, 0.2, 0.2]);
  expect(cumulate.length).toBe(3);
  expect(cumulate[0]).toBeCloseTo(0.1);
  expect(cumulate[1]).toBeCloseTo(0.3);
  expect(cumulate[2]).toBeCloseTo(0.5);
});

test("test to density", () => {
  const density = cumulativeToDensity([0.1, 0.3, 0.5]);
  expect(density.length).toBe(3);
  expect(density[0]).toBeCloseTo(0.1);
  expect(density[1]).toBeCloseTo(0.2);
  expect(density[2]).toBeCloseTo(0.2);
});

test("distributions are positive and sum to the required number", () => {
  const length = 20;
  const area = 0.94;
  const eps = 1e-10;
  const uniform = uniformDistribution(length, area);
  const triangular = triangleDistribution(length / 3, length, area);
  const piecewise1 = piecewiseLinearDistribution(
    [0, length / 3, length],
    [3, 4, 1],
    length,
    area
  );
  const piecewise2 = piecewiseLinearDistribution(
    [0, length / 3, length / 2, length * 0.6, length],
    [3, 4, 0, 5, 1],
    length,
    area
  );
  const distribs = [uniform, triangular, piecewise1, piecewise2];
  distribs.forEach((distrib) => {
    expect(distrib.length).toBe(length);
    let sum = 0;
    for (let i = 0; i < distrib.length; i++) {
      const element = distrib[i];
      expect(element).toBeGreaterThanOrEqual(-eps);
      sum += element;
    }
    expect(sum).toBeCloseTo(area);
  });
});

test("piecewise linear and triangular match", () => {
  const fromTriangular = triangleDistribution(5, 20, 2);
  const fromPiecewise = piecewiseLinearDistribution(
    [0, 5, 19],
    [0, 1, 0],
    20,
    2
  );
  expect(fromPiecewise.length).toBe(20);
  expect(fromTriangular.length).toBe(20);
  for (let i = 0; i < fromTriangular.length; i++) {
    expect(fromTriangular[i]).toBeCloseTo(fromPiecewise[i]);
  }
});
