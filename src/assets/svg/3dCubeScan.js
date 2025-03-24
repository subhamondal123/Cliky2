import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ThreeDCubeScan({
    strokeColor,
    height,
    width,
    children
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
                d="M55 24.375a1.889 1.889 0 01-1.875-1.875v-5c0-6.45-4.175-10.625-10.625-10.625h-25c-6.45 0-10.625 4.175-10.625 10.625v5c0 1.025-.85 1.875-1.875 1.875A1.889 1.889 0 013.125 22.5v-5C3.125 8.9 8.9 3.125 17.5 3.125h25c8.6 0 14.375 5.775 14.375 14.375v5c0 1.025-.85 1.875-1.875 1.875zM42.5 56.875h-25C8.9 56.875 3.125 51.1 3.125 42.5v-5c0-1.025.85-1.875 1.875-1.875s1.875.85 1.875 1.875v5c0 6.45 4.175 10.625 10.625 10.625h25c6.45 0 10.625-4.175 10.625-10.625v-5c0-1.025.85-1.875 1.875-1.875s1.875.85 1.875 1.875v5c0 8.6-5.775 14.375-14.375 14.375z"
                fill={strokeColor}
            />
            <Path
                d="M41 20.525l-9.4-5.075a3.397 3.397 0 00-3.175 0L19 20.525c-.675.375-1.1 1.1-1.1 1.9 0 .825.425 1.55 1.1 1.925l9.4 5.075c.5.275 1.05.4 1.6.4s1.1-.125 1.6-.4L41 24.35c.675-.375 1.1-1.1 1.1-1.925 0-.8-.425-1.525-1.1-1.9zM26.85 31.175L18.1 26.8a2.167 2.167 0 00-2.1.1c-.625.4-1 1.075-1 1.825V37c0 1.425.8 2.725 2.075 3.35l8.75 4.375c.3.15.625.225.975.225.4 0 .775-.1 1.125-.325A2.117 2.117 0 0028.95 42.8v-8.275c-.025-1.425-.8-2.7-2.1-3.35zM43.975 26.9a2.167 2.167 0 00-2.1-.1l-8.75 4.375c-1.275.65-2.075 1.925-2.075 3.35V42.8c0 .75.375 1.425 1.025 1.825.35.225.725.325 1.125.325.325 0 .65-.075.975-.225l8.75-4.375C44.2 39.7 45 38.425 45 37v-8.275c0-.75-.375-1.425-1.025-1.825z"
                fill={strokeColor}

            />
        </Svg>

    )
}

ThreeDCubeScan.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 49,
    width: 49,
    children: null
};

ThreeDCubeScan.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ThreeDCubeScan;
