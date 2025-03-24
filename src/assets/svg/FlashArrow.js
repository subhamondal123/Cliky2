import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function FlashArrow({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 67 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M47.5 25.5L34.9 38.1l-4.8-7.2-9.6 9.6m27-15h-6m6 0v6M25 63h18c15 0 21-6 21-21V24C64 9 58 3 43 3H25C10 3 4 9 4 24v18c0 15 6 21 21 21z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

FlashArrow.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

FlashArrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default FlashArrow;