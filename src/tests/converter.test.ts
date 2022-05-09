import {
  indexToYear,
  percentToProb,
  probToPercent,
  yearToIndex,
} from "../utils/converters";

test("prob converter have good inverses", () => {
  expect(probToPercent(percentToProb(20))).toBeCloseTo(20);
  expect(percentToProb(probToPercent(0.2))).toBeCloseTo(0.2);
});

test("year converter have good inverses", () => {
  expect(indexToYear(yearToIndex(2050))).toBeCloseTo(2050);
  expect(yearToIndex(indexToYear(5))).toBeCloseTo(5);
  expect(yearToIndex(indexToYear(0))).toBeCloseTo(0);
});
