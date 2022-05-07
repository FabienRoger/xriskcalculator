import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";

const Footer = (): JSX.Element => {
  return (
    <div className="footer">
      <div>
        By Fabien, Discord: cefabla#8663, Github:{" "}
        <a
          href="https://github.com/FabienRoger/xriskcalculator"
          className="dark"
        >
          https://github.com/FabienRoger/xriskcalculator
        </a>
      </div>
    </div>
  );
};
export default Footer;
