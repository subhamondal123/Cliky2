import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Sun({
    strokeColor,
    height,
    width
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
                d="M54.03 11.97l.39-.39M11.58 54.42l.39-.39M33 3.24V3m0 60v-.24M3.24 33H3m60 0h-.24M11.97 11.97l-.39-.39m42.84 42.84l-.39-.39M52.5 33c0 10.77-8.73 19.5-19.5 19.5S13.5 43.77 13.5 33 22.23 13.5 33 13.5 52.5 22.23 52.5 33z"
                stroke={strokeColor}
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>

    )
}


Sun.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Sun.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Sun;