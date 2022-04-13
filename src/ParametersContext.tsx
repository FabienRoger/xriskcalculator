import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Parameters } from "./types";
import { updateParameters } from "./updateParameters";

export const default_params: Parameters = {
  agiProb: 0.5,
  aisProb: 0.8,
  agiProbModeYear: 19,
  aisProbModeYear: 10,
  save_prob: 0,
  probabilityDensityAGI: [],
  probabilityDensityAIS: [],
  probabilityDensity: [],
  probabilityDensityT: [],
  speedUpPerYear: [],
  shiftedProbabilityDensity: [],
  shiftedProbabilityDensityT: [],
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
