import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function DownArrow({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 42 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M3 2.25L21.419 18 39 2.25"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
            />
        </Svg>
    )
}


DownArrow.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 25,
    width: 25
};

DownArrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default DownArrow;