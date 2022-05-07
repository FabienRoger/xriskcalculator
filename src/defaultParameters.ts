import { useState } from "react";
import { SpeedUpFactorChain } from "./ParametersContext";
import { nbYears } from "./utils/constants";

export const defaultAGIProb = 0.5;
export const defaultAGIWrongProb = 0.8;
export const defaultAISProb = 0.5;
export const defaultAGIDistributionXCoordinates = [0, 5, 10, nbYears - 1];
export const defaultAISDistributionXCoordinates = [2, 8, 14, nbYears - 1];
export const defaultSpeedUpChain = 0;
export const defaultSpeedUpFactorsChains = [
  {
    title: "You increase the speed at which an organisation works",
    description: `Describe what fraction of the AGI safety work your organization is doing,
        and how much you think you will speedup your organization's progress in this direction`,
    speedUpFactors: [
      {
        question: "What fraction of the work is your org. doing?",
        type: "%prob",
        defaultValue: 0.01,
      },
      {
        question: "How much do you speed it up?",
        type: "%increase",
        defaultValue: 0.005,
      },
    ],
  },
  {
    title: "You are an independent researcher",
    description: `Describe what fraction of the AGI safety progress your field will be responsible for,
        and how much you think you will speedup your field's progress`,
    speedUpFactors: [
      {
        question: "For what fraction of the progress will you field do?",
        type: "%prob",
        defaultValue: 0.01,
      },
      {
        question: "How much do you speed it up?",
        type: "%increase",
        defaultValue: 0.005,
      },
    ],
  },
  {
    title: "You are creating an AGI safety organization",
    description: `Describe how likely you are to be successful at creating this new organization,
      how much it will speed up AGI safety progress if it is successful, 
      how likely it is that you are creating an organization that would have existed otherwise
      (that somebody would have created an organization very similar to yours, 
      and how much you think that you prevent another organization with a similar impact
      on AGI safety from existing (for example, by taking funds it would have used).`,
    speedUpFactors: [
      {
        question: "How likely is it that you will be successful",
        type: "%prob",
        defaultValue: 0.5,
      },
      {
        question: "How much will your org. speed up the progress?",
        type: "%increase",
        defaultValue: 0.05,
      },
      {
        question: "How likely is it that it would have existed?",
        type: "%prob",
        defaultValue: 0.4,
        inverted: true,
      },
      {
        question:
          "How likely is it that you prevent a similar org. from existing?",
        type: "%prob",
        defaultValue: 0.4,
        inverted: true,
      },
    ],
  },
];
export const defaultSpeedUpRange: [number, number] = [2, 10];
