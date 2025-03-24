import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function PencilWithUnderline({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M33.15 9L12.625 30.725c-.775.825-1.525 2.45-1.675 3.575l-.925 8.1C9.7 45.325 11.8 47.325 14.7 46.825l8.05-1.375c1.125-.2 2.7-1.025 3.475-1.875L46.75 21.85c3.55-3.75 5.15-8.025-.375-13.25-5.5-5.175-9.675-3.35-13.225.4zM29.725 12.625C30.8 19.525 36.4 24.8 43.35 25.5M7.5 55h45"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


PencilWithUnderline.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 60,
    width: 60
};

PencilWithUnderline.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default PencilWithUnderline;