import { Slider } from "@mui/material";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PiecewiseDistributionParameters } from "../types";
import { nbYears, yearsNames } from "../utils/constants";
import {
  arrayEquals,
  piecewiseLinearCumulativeDistribution,
} from "../utils/mathUtils";
import "./DistributionCreator.css";

type PiecewiseLinearDistributionCreatorProps = {
  setDistribution: (v: PiecewiseDistributionParameters) => void;
  distribution: PiecewiseDistributionParameters;
  text: string;
  mostLikelyText?: string;
  area?: number;
};

const PiecewiseLinearDistributionCreator = (
  props: PiecewiseLinearDistributionCreatorProps
): JSX.Element => {
  const { setDistribution, distribution, text } = props;

  const [localDistribution, setLocalDistribution] =
    useState<PiecewiseDistributionParameters>(distribution);

  const displayedArea = props.area ? props.area : 1;

  const data = piecewiseLinearCumulativeDistribution(
    localDistribution.xCoordinates,
    localDistribution.yCoordinates,
    localDistribution.length,
    displayedArea
  ).map((v, i) => {
    return { year: yearsNames[i], p: v.toPrecision(2) };
  });

  const [sliders, setSliders] = useState<number[]>(distribution.xCoordinates);

  const updateDistribution = useCallback(
    _.debounce((newDistribution: PiecewiseDistributionParameters) => {
      setDistribution(newDistribution);
    }, 500),
    []
  );

  const handleChange = (e: Event, newSliders: number[]) => {
    if (arrayEquals(newSliders, sliders)) return;
    setSliders([...newSliders]);

    const sortedNewSliders = newSliders.sort((a, b) => a - b);
    const newDistribution = { ...distribution };
    newDistribution.xCoordinates = sortedNewSliders;
    setLocalDistribution(newDistribution);

    updateDistribution(newDistribution);
  };

  return (
    <>
      <Row>
        <p className="slider-title">{text}</p>
        <div className="linechart-container">
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 0, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="linear" dataKey="p" stroke="blue" dot={false} />
              <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="slider-container">
          <Slider
            track={false}
            value={sliders}
            onChange={handleChange}
            min={0}
            max={nbYears - 1}
            step={0.25}
          />
        </div>
      </Row>
    </>
  );
};
export default PiecewiseLinearDistributionCreator;
