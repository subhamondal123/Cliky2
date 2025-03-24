import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg";

function AchiveBook({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M22.395 3.75v8.85c0 .66-.78.99-1.26.555L18.51 10.74a.743.743 0 00-1.02 0l-2.624 2.4c-.48.45-1.26.105-1.26-.54V3.75c0-.42.33-.75.75-.75h7.29c.42 0 .75.33.75.75z"
                fill={strokeColor}
            />
            <Path
                d="M25.47 3.09c-.435-.06-.825.315-.825.75v9.03a2.89 2.89 0 01-1.725 2.64 2.883 2.883 0 01-3.105-.525l-1.305-1.2a.743.743 0 00-1.02 0l-1.305 1.2c-.54.51-1.245.765-1.95.765-.39 0-.78-.075-1.155-.24a2.89 2.89 0 01-1.725-2.64V3.84c0-.435-.39-.81-.825-.75-4.2.525-6.03 3.36-6.03 7.41v15C4.5 30 6.75 33 12 33h12c5.25 0 7.5-3 7.5-7.5v-15c0-4.05-1.83-6.885-6.03-7.41zm.78 25.035H13.5c-.615 0-1.125-.51-1.125-1.125s.51-1.125 1.125-1.125h12.75c.615 0 1.125.51 1.125 1.125s-.51 1.125-1.125 1.125zm0-6h-6.375c-.615 0-1.125-.51-1.125-1.125s.51-1.125 1.125-1.125h6.375c.615 0 1.125.51 1.125 1.125s-.51 1.125-1.125 1.125z"
                fill={strokeColor}
            />
        </Svg>
    )
}


AchiveBook.defaultProps = {
    strokeColor: "#F13748",
    height: 25,
    width: 25
};

AchiveBook.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default AchiveBook;