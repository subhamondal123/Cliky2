import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg";

function Calender({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 60 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M18 1V10"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M42 1V10"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4.5 22.2699H55.5"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M57 20.5V46C57 55 52.5 61 42 61H18C7.5 61 3 55 3 46V20.5C3 11.5 7.5 5.5 18 5.5H42C52.5 5.5 57 11.5 57 20.5Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M41.0841 36.0999H41.1111"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M41.0841 45.0999H41.1111"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M29.9865 36.0999H30.0134"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M29.9865 45.0999H30.0134"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.8829 36.0999H18.9099"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.8829 45.0999H18.9099"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


Calender.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Calender.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Calender;