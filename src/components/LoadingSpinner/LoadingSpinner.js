import React from "react";

function LoadingSpinner({ color }) {
  return (
    <div className={twStyles.ldsRing}>
      <div
        className={twStyles.ldsRingDiv + " " + twStyles.ldsRingBorders}
        style={{
          borderColor: color,
          ...cssStyles.quarterRing,
          animationDelay: "-0.45s",
        }}
      ></div>
      <div
        className={twStyles.ldsRingDiv + " " + twStyles.ldsRingBorders}
        style={{
          borderColor: color,
          ...cssStyles.quarterRing,
          animationDelay: "-0.3s",
        }}
      ></div>
      <div
        className={twStyles.ldsRingDiv + " " + twStyles.ldsRingBorders}
        style={{
          borderColor: color,
          ...cssStyles.quarterRing,
          animationDelay: "-0.15s",
        }}
      ></div>
      <div></div>
    </div>
  );
}

const twStyles = {
  ldsRing: "inline-block h-20 relative w-20",
  ldsRingDiv: "block absolute h-16 m-2 w-16 animate-lds-ring",
  ldsRingBorders: "border-solid border-8 box-border",
};

const cssStyles = {
  quarterRing: {
    borderRadius: "50%",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
};

export default LoadingSpinner;
