import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function GreenDownArrrow({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M35.121 5.121A3 3 0 1030.88.88L35.12 5.12zM0 33a3 3 0 003 3h27a3 3 0 100-6H6V6a3 3 0 10-6 0v27zM30.879.879l-30 30L5.12 35.12l30-30L30.88.88z"
                fill={strokeColor}
            />
        </Svg>

    )
}

GreenDownArrrow.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 49,
    width: 49,
    children: null
};

GreenDownArrrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default GreenDownArrrow;
