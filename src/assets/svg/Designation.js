import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Designation({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 60 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G id="Frame 4427">
          <Path
            id="Vector"
            d="M48.0057 53.5563H45.7254C43.3251 53.5563 41.0448 54.4864 39.3646 56.1666L34.2339 61.2373C31.8936 63.5476 28.0832 63.5476 25.7429 61.2373L20.6122 56.1666C18.932 54.4864 16.6217 53.5563 14.2514 53.5563H12.0011C7.02051 53.5563 3 49.5659 3 44.6453V11.911C3 6.99042 7.02051 3 12.0011 3H48.0057C52.9863 3 57.0068 6.99042 57.0068 11.911V44.6453C57.0068 49.5359 52.9863 53.5563 48.0057 53.5563Z"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            d="M30.0036 26.9731C33.8646 26.9731 36.9946 23.8432 36.9946 19.9822C36.9946 16.1212 33.8646 12.9915 30.0036 12.9915C26.1427 12.9915 23.0127 16.1212 23.0127 19.9822C23.0127 23.8432 26.1427 26.9731 30.0036 26.9731Z"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_3"
            d="M42.005 43.9554C42.005 38.5547 36.6343 34.1743 30.0035 34.1743C23.3726 34.1743 18.002 38.5547 18.002 43.9554"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    )
}

Designation.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 60,
    children: null
};

Designation.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Designation;
