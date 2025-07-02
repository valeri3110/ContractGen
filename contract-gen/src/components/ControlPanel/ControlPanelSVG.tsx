import React from "react";

const ControlPanelSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className={props.className}
    viewBox="0 0 200 200"
    preserveAspectRatio="none"
    {...props}
  >
    <rect width="200" height="200" fill="#facc15" />
    <path d="M0,20 Q50,-30 100,20 T200,20" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,40 Q50,-10 100,40 T200,40" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,100 Q50,50 100,100 T200,100" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,110 Q50,60 100,110 T200,110" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,120 Q50,70 100,120 T200,120" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,130 Q50,80 100,130 T200,130" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,140 Q50,90 100,140 T200,140" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,180 Q50,130 100,180 T200,180" fill="none" stroke="#000" strokeWidth="1" />
    <path d="M0,190 Q50,140 100,190 T200,190" fill="none" stroke="#000" strokeWidth="1" />
  </svg>
);

export default ControlPanelSVG;