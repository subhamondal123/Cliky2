import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Upload({
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
                d="M47.084 23.21c11.369.98 16.011 6.821 16.011 19.61v.411C63.095 57.347 57.442 63 43.327 63H22.769C8.652 63 3 57.347 3 43.231v-.41c0-12.695 4.579-18.537 15.758-19.58m14.305 19.233V6.537m10.58 7.042L33.063 3 22.484 13.579"
                stroke={strokeColor}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>


    )
}


Upload.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Upload.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Upload;