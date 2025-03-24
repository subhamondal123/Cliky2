import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ThreeDBox({
    strokeColor,
    height,
    width,
    children
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
                d="M9.51 22.32L36 37.65l26.31-15.24M36 64.83V37.62"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M29.79 7.44l-16.02 8.88c-3.63 2.01-6.6 7.05-6.6 11.19v16.95c0 4.14 2.97 9.18 6.6 11.19l16.02 8.91c3.42 1.89 9.03 1.89 12.45 0l16.02-8.91c3.63-2.01 6.6-7.05 6.6-11.19V27.51c0-4.14-2.97-9.18-6.6-11.19L42.24 7.41c-3.45-1.89-9.03-1.89-12.45.03z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>

    )
}

ThreeDBox.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 72,
    width: 72,
    children: null
};

ThreeDBox.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ThreeDBox;
