import React, { createContext, ReactNode, useEffect, useState } from "react";
import { nbYears } from "./constants";
import { Parameters } from "./types";

interface ParametersContextProps {
  parameters: Parameters;
  setParameters: (param: Parameters) => void;
}

const default_params: Parameters = {
  agiProb: 0.5,
  aisProb: 0.8,
  save_prob: 0,
  probabilityDensityAGI: [],
  probabilityDensityAIS: [],
  probabilityDensity: [[]],
};

const updateSaveProb = (p: Parameters): Parameters => {
  p.save_prob = p.agiProb * p.aisProb;
  p.probabilityDensityAGI = Array(nbYears)
    .fill(undefined)
    .map((_, i) => (p.agiProb + (2 * i) / 100) / nbYears);
  p.probabilityDensityAIS = Array(nbYears)
    .fill(undefined)
    .map((_, i) => (p.aisProb + i / 100) / nbYears);
  p.probabilityDensity = Array(nbYears)
    .fill(undefined)
    .map((_, i) =>
      Array(nbYears)
        .fill(undefined)
        .map(
          (_, j) =>
            p.probabilityDensityAGI[j] *
            p.probabilityDensityAIS[nbYears - i - 1]
        )
    );
  return p;
};

export const ParametersContext = createContext<ParametersContextProps>({
  parameters: default_params,
  setParameters: (_) => {},
});

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [parameters, setParameters_] = useState(updateSaveProb(default_params));

  const setParameters = (p: Parameters) => {
    setParameters_(updateSaveProb(p));
  };

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};
