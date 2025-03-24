import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function RightArrow({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 28 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
           
        >
            <Path
                d="M25 3L4 27.558 25 51"
                stroke={strokeColor}
                strokeWidth={6}
                strokeLinecap="round"
            />
        </Svg>
    )
}


RightArrow.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

RightArrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default RightArrow;