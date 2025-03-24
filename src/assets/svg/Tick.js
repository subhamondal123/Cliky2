import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Tick({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 33 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
           
        >
            <Path
                d="M3 16.5l8.7 6L30 3"
                stroke={strokeColor}
                strokeWidth={6}
                strokeLinecap="round"
            />
        </Svg>
    )
}


Tick.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Tick.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Tick;