import { cumulativeToDensity, densityToCumulative } from "./mathUtils";

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
