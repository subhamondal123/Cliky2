import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Mail({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
    width={width}
    height={height}
    viewBox="0 0 66 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G id="Frame 4424">
      <Path
        id="Vector"
        d="M48 54H18C9 54 3 49.5 3 39V18C3 7.5 9 3 18 3H48C57 3 63 7.5 63 18V39C63 49.5 57 54 48 54Z"
        stroke={strokeColor}
        strokeWidth={4.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M48 19.5L38.61 27C35.52 29.46 30.45 29.46 27.36 27L18 19.5"
        stroke={strokeColor}
        strokeWidth={4.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
    )
}

Mail.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 57,
    width: 66,
    children: null
};

Mail.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Mail;
