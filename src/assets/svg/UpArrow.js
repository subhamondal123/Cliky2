import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function UpArrow({
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
                d="M39.1035 19.7251L20.6849 3.9751L3.10352 19.7251"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
            />
        </Svg>
    )
}


UpArrow.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 25,
    width: 25
};

UpArrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default UpArrow;