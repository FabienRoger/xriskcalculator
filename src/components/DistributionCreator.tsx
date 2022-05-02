import { debounce, Slider } from "@mui/material";
import React, { useCallback, useState } from "react";
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
import _ from "lodash";

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
  const { setDistribution, distribution: distribution, text } = props;

  const displayedArea = props.area ? props.area : 1;

  const data = piecewiseLinearCumulativeDistribution(
    distribution.xCoordinates,
    distribution.yCoordinates,
    distribution.length,
    displayedArea
  ).map((v, i) => {
    return { year: yearsNames[i], p: v.toPrecision(2) };
  });

  const [sliders, setSliders] = useState<number[]>(distribution.xCoordinates);

  const updateDistribution = useCallback(
    _.throttle((newSliders: number[]) => {
      const sortedNewSliders = newSliders.sort((a, b) => a - b);
      const newDistribution = { ...distribution };
      newDistribution.xCoordinates = sortedNewSliders;
      setDistribution(newDistribution);
    }, 100),
    []
  );

  const handleChange = (e: Event, newSliders: number[]) => {
    if (arrayEquals(newSliders, sliders)) return;
    setSliders([...newSliders]);
    updateDistribution(newSliders);
  };

  return (
    <>
      <Row>
        <p>{text}</p>
        <div style={{ width: "100%", height: "8em" }}>
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="linear" dataKey="p" stroke="blue" dot={false} />
              <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginLeft: "4em", marginRight: "1em", width: "100%" }}>
          <Slider
            track={false}
            value={sliders}
            onChange={handleChange}
            min={0}
            max={nbYears - 1}
            step={0.001}
          />
        </div>
      </Row>
    </>
  );
};
export default PiecewiseLinearDistributionCreator;
