import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";

const Footer = (): JSX.Element => {
  return (
    <div
      style={{
        fontSize: "0.8em",
        color: "lightgray",
        backgroundColor: "#343A40",
        margin: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
      }}
    >
      <div>
        By Fabien, Discord: cefabla#8663, Github:{" "}
        <a
          href="https://github.com/FabienRoger/xriskcalculator"
          style={{
            color: "lightgray",
          }}
        >
          https://github.com/FabienRoger/xriskcalculator
        </a>
      </div>
    </div>
  );
};
export default Footer;
