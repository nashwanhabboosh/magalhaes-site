import React from "react";
import "./CTAButton.css"; // optional if you want separate styles

export default function CTAButton({ label, onClick }) {
  return (
    <button className="cta-button" onClick={onClick}>
      {label}
    </button>
  );
}
