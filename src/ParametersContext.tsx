import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Parameters } from "./types";
import { updateParameters } from "./updateParameters";

export const default_params: Parameters = {
  agiProb: 0.5,
  aisProb: 0.8,
  agiProbModeYear: 10,
  aisProbModeYear: 10,
  speedUpEveryYear: 5e-1,
  saveProb: 0,
  probabilityDensityAGI: [],
  probabilityDensityAIS: [],
  probabilityDensity: [],
  probabilityDensityT: [],
  speedUpPerYear: [],
  shiftedProbabilityDensity: [],
  deltaProbabilityDensity: [],
  deltaProbabilityDensityT: [],
  doomProbWithoutYou: 0,
  doomProbWithYou: 0,
};

interface ParametersContextProps {
  parameters: Parameters;
  setParameters: (param: Parameters) => void;
}

export const ParametersContext = createContext<ParametersContextProps>({
  parameters: default_params,
  setParameters: (_) => {},
});

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [parameters, setParameters_] = useState(
    updateParameters(default_params)
  );

  const setParameters = (p: Parameters) => {
    setParameters_(updateParameters(p));
  };

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};
