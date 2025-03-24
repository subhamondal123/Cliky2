import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function SunFog({
    strokeColor,
    height,
    width
}) {
    return (

        <Svg
            width={width}
            height={height}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M55.5 36C55.5 25.23 46.77 16.5 36 16.5C25.23 16.5 16.5 25.23 16.5 36"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.97 14.97L14.58 14.58M57.03 14.97L57.42 14.58L57.03 14.97ZM36 6.23996V6V6.23996ZM6.24005 36H6H6.24005ZM66 36H65.7599H66Z"
                stroke={strokeColor}
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 45H60"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18 54H54"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M27 63H45"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


SunFog.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

SunFog.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default SunFog;