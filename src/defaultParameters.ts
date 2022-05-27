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
    title: "You increase the speed at which an AGI safety organisation works",
    description: `Describe what fraction of the AGI safety work your organization is doing,
        and how much you think you will speedup your organization's progress in this direction`,
    speedUpFactors: [
      {
        question: "What fraction of the work is your org. doing?",
        type: "%prob",
        defaultValue: 0.05,
      },
      {
        question: "How much do you speedup your org.'s work?",
        type: "%increase",
        defaultValue: 0.01,
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
        defaultValue: 0.2,
      },
      {
        question: "How much do you speed up research in your field?",
        type: "%increase",
        defaultValue: 0.01,
      },
    ],
  },
  {
    title: "You are creating an AGI safety organization",
    description: `Describe how likely you are to be successful at creating this new organization,
      how much it will speed up AGI safety progress if it is successful, 
      how likely it is that you are creating an organization that would have existed otherwise
      (that this organization would have been created without your help), 
      and how much you think that you prevent another organization with a similar impact
      on AGI safety from existing - for example, by taking funds it would have used.`,
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
        question: "How likely is it that it would have existed without you?",
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
export const defaultSpeedUpRange: [number, number] = [1, 10];

export const defaultLivesPreventByWrongAGI = undefined;

export const defaultAGISpeedUpChain = 0;
export const defaultAGISpeedUpFactorsChains = [
  {
    title: "You increase the speed at which an organisation works",
    description: `Describe what fraction of the work towards building AGI your organization is doing,
        and how much you think you will speedup your organization's progress in this direction`,
    speedUpFactors: [
      {
        question: "What fraction of the work is your org. doing?",
        type: "%prob",
        defaultValue: 0.001,
      },
      {
        question: "How much do you speedup your org.'s work?",
        type: "%increase",
        defaultValue: 0.005,
      },
    ],
  },
  {
    title: "You are an independent researcher",
    description: `Describe what fraction of the AGI progress your field will be responsible for,
        and how much you think you will speedup your field's progress`,
    speedUpFactors: [
      {
        question: "For what fraction of the progress in AGI will you field do?",
        type: "%prob",
        defaultValue: 0.001,
      },
      {
        question: "How much do you speed up research in your field?",
        type: "%increase",
        defaultValue: 0.005,
      },
    ],
  },
  {
    title: "You are creating an AGI safety organization",
    description: `Describe how likely you are to be successful at creating this new organization,
      how much it will speed up AGI progress (in expectation),
      how likely it is that you are creating an organization that would have existed otherwise
      (that this organization would have been created without your help), 
      and how much you think that you prevent another organization with a similar impact
      on building AGI from existing - for example, by taking funds it would have used.`,
    speedUpFactors: [
      {
        question: "How likely is it that you will be successful",
        type: "%prob",
        defaultValue: 0.5,
      },
      {
        question: "How much will your org. speed up building AGI?",
        type: "%increase",
        defaultValue: 0.005,
      },
      {
        question: "How likely is it that it would have existed without you?",
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
export const defaultAGISpeedUpRange: [number, number] = [2, 10];