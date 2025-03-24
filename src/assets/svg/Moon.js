import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Moon({
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
                d="M5.07571 31.0499C5.97571 43.9249 16.9007 54.3999 29.9757 54.9749C39.2007 55.3749 47.4507 51.0749 52.4007 44.2999C54.4507 41.5249 53.3507 39.6749 49.9257 40.2999C48.2507 40.5999 46.5257 40.7249 44.7257 40.6499C32.5007 40.1499 22.5007 29.9249 22.4507 17.8499C22.4257 14.5999 23.1007 11.5249 24.3257 8.7249C25.6757 5.6249 24.0507 4.1499 20.9257 5.4749C11.0257 9.6499 4.25071 19.6249 5.07571 31.0499Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


Moon.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Moon.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Moon;