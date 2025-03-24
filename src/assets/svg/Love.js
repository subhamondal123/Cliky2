import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Love({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          
        >
            <Path
                d="M15.162 0c-1.9 0-3.602.89-4.662 2.255A5.902 5.902 0 005.838 0C2.614 0 0 2.528 0 5.653 0 6.856.2 7.969.546 9c1.659 5.056 6.772 8.08 9.303 8.909.357.121.945.121 1.302 0 2.53-.83 7.644-3.853 9.303-8.909C20.8 7.969 21 6.856 21 5.653 21 2.528 18.386 0 15.162 0z"
                fill={strokeColor}
            />
        </Svg>
    )
}


Love.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Love.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Love;