import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";

type CollapsableProps = {
  children: JSX.Element[];
  text: string | JSX.Element;
  optional?: boolean;
};

const Collapsable = (props: CollapsableProps): JSX.Element => {
  const { text, children } = props;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <>
      {collapsed ? (
        <>
          <p>
            <ArrowRightIcon
              onClick={() => {
                setCollapsed(false);
              }}
            />
            {text}
          </p>
        </>
      ) : (
        <>
          <p>
            <ArrowDropDownIcon
              onClick={() => {
                setCollapsed(true);
              }}
            />
            {text}
          </p>

          {children}
        </>
      )}
    </>
  );
};
export default Collapsable;
