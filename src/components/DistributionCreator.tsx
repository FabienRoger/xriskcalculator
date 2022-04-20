import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { endYear, yearsNames } from "../utils/constants";
import { piecewiseLinearDistribution } from "../utils/mathUtils";
import { PiecewiseDistributionParameters } from "../types";
import ValueInput from "./ValueInput";
import YearInput from "./YearInput";

type PiecewiseLinearDistributionCreatorProps = {
  setDistribution: (v: PiecewiseDistributionParameters) => void;
  defaultDistribution: PiecewiseDistributionParameters;
  text: string;
  mostLikelyText?: string;
  area?: number;
};

const PiecewiseLinearDistributionCreator = (
  props: PiecewiseLinearDistributionCreatorProps
): JSX.Element => {
  const { setDistribution, defaultDistribution: distribution, text } = props;

  const displayedArea = props.area ? props.area : 1;
  const mostLikelyText = props.mostLikelyText
    ? props.mostLikelyText
    : `When is this ${text} most likely?`;

  const data = piecewiseLinearDistribution(
    distribution.xCoordinates,
    distribution.yCoordinates,
    distribution.length,
    displayedArea
  ).map((v, i) => {
    return { year: yearsNames[i], p: v };
  });

  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          <YearInput
            setValue={(y) => {
              const newDistribution = { ...distribution };
              newDistribution.xCoordinates[1] = y;
              setDistribution(newDistribution);
            }}
            text={mostLikelyText}
            defaultValue={distribution.xCoordinates[1]}
          />
        </Col>
        <Col sm={12} md={4}>
          <ValueInput
            setValue={(x) => {
              const newDistribution = { ...distribution };
              newDistribution.yCoordinates[0] = x;
              setDistribution(newDistribution);
            }}
            text={`P(${text} now) / P(${text} at max) = `}
            defaultValue={distribution.yCoordinates[0]}
            validator={(v: number): boolean => {
              return v >= 0;
            }}
            convertor={(v: number): number => v}
          />
        </Col>
        <Col sm={12} md={4}>
          <ValueInput
            setValue={(x) => {
              const newDistribution = { ...distribution };
              newDistribution.yCoordinates[2] = x;
              setDistribution(newDistribution);
            }}
            text={`P(${text} in ${endYear}) / P(${text} at max) = `}
            defaultValue={distribution.yCoordinates[2]}
            validator={(v: number): boolean => {
              return v >= 0;
            }}
            convertor={(v: number): number => v}
          />
        </Col>
      </Row>
      <Row>
        <div style={{ width: "100%", height: "8em" }}>
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="p" stroke="blue" />
              <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Row>
    </>
  );
};
export default PiecewiseLinearDistributionCreator;
