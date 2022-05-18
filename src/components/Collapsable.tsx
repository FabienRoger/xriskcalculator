import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import "./Collapsable.css";

type CollapsableProps = {
  children: JSX.Element[] | JSX.Element;
  text: string | JSX.Element;
  optional?: boolean;
};

const Collapsable = (props: CollapsableProps): JSX.Element => {
  const { text, children } = props;

  const optional = props.optional ? props.optional : false;

  const [collapsed, setCollapsed] = useState<boolean>(optional);

  const className: string = optional
    ? "optional-collapsable-head collapsable-head"
    : "collapsable-head";

  const optionalTag = optional ? <>(Optional) </> : <></>;

  return (
    <>
      {collapsed ? (
        <>
          <p className={className}>
            <ArrowRightIcon
              onClick={() => {
                setCollapsed(false);
              }}
            />
            {optionalTag}
            {text}
          </p>
        </>
      ) : (
        <>
          <p className={className}>
            <ArrowDropDownIcon
              onClick={() => {
                setCollapsed(true);
              }}
            />
            {optionalTag}
            {text}
          </p>

          {children}
        </>
      )}
    </>
  );
};
export default Collapsable;
