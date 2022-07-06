import React, { useState, useEffect } from "react";
import Base64SVG from "./Base64SVG";
import envelope from "@fortawesome/fontawesome-free/svgs/solid/envelope.svg";

const icons = { envelope };

console.log(icons);

const SocialButton = ({ brand, regular, solid, href, fill, hover }) => {
  const svg = icons[solid || regular || brand] || null;

  if (!svg) return null;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Base64SVG stream={svg} {...{ fill, hover }} />
      <style jsx>{`
        a {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin: 5px;
        }
      `}</style>
    </a>
  );
};

export default SocialButton;
