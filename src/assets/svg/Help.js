import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Help({
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
        <Path
          d="M11.792 11.7898L22.412 22.3798M11.792 54.2101L22.412 43.6201M54.2401 54.2101L43.6201 43.6201M54.2401 11.7898L43.6201 22.3798M63 33C63 49.5685 49.5685 63 33 63C16.4315 63 3 49.5685 3 33C3 16.4315 16.4315 3 33 3C49.5685 3 63 16.4315 63 33ZM46.5908 33C46.5908 40.4558 40.5467 46.5 33.0908 46.5C25.635 46.5 19.5908 40.4558 19.5908 33C19.5908 25.5442 25.635 19.5 33.0908 19.5C40.5467 19.5 46.5908 25.5442 46.5908 33Z"
          stroke={strokeColor}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
}

Help.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 66,
    children: null
};

Help.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Help;
