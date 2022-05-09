import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import { defaultAGIProb } from "../defaultParameters";
import { probToPercent } from "../utils/converters";

const expectToBeProbability = (p: number) => {
  expect(p).toBeGreaterThan(0);
  expect(p).toBeLessThan(1);
};

test("integration test", async () => {
  render(<App />);

  // Check everything is displayed properly
  const linkElement = screen.getByText(/Assumptions and limitations/i);
  expect(linkElement).toBeInTheDocument();

  // Check resutls are probabilities
  const doomResultElement = screen.getByText(
    /how likely are you to save the world\? p =/i
  );
  const pDoom = parseFloat(doomResultElement.textContent.split(" ").pop());
  expectToBeProbability(pDoom);

  const saveResultElement = screen.getByText(
    /how likely are you to save the world\? p =/i
  );
  const pSave = parseFloat(saveResultElement.textContent.split(" ").pop());
  expectToBeProbability(pSave);

  // Check that modifications work
  const agiProbElement = screen.getByRole("textbox", {
    name: /how likely is agi \(%\)/i,
  });
  const currentAgiProb = probToPercent(defaultAGIProb);
  // expect(agiProbElement).toContainHTML(`${currentAgiProb}`);
  await userEvent.type(agiProbElement, `${currentAgiProb / 10}`);
  // All else equal, dividing the probability of AGI by 10 should divide the probability of doom and save
  const newPDoom = parseFloat(doomResultElement.textContent.split(" ").pop());
  expect(newPDoom).toBeCloseTo(pDoom / 10);
  const newPSave = parseFloat(saveResultElement.textContent.split(" ").pop());
  expect(newPSave).toBeCloseTo(pSave / 10);
});
