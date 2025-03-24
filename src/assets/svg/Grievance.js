import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Grievance({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G id="Frame 4444">
          <Path
            id="Vector"
            d="M24 63H42C57 63 63 57 63 42V24C63 9 57 3 42 3H24C9 3 3 9 3 24V42C3 57 9 63 24 63Z"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            d="M18 23.25C21 20.25 25.89 20.25 28.92 23.25"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_3"
            d="M37.0811 23.25C40.0811 20.25 44.9711 20.25 48.0011 23.25"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_4"
            d="M22.2 50.1001H43.8C45.3 50.1001 46.5 48.9001 46.5 47.4001C46.5 39.9301 40.47 33.9001 33 33.9001C25.53 33.9001 19.5 39.9301 19.5 47.4001C19.5 48.9001 20.7 50.1001 22.2 50.1001Z"
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

Grievance.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 66,
    children: null
};

Grievance.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Grievance;
