import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function PerformanceGraph({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 4449">
                <G id="Group 8">
                    <Path
                        id="Vector"
                        d="M17.6396 51.4502V45.2402"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                    />
                    <Path
                        id="Vector_2"
                        d="M33 51.45V39.03"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                    />
                    <Path
                        id="Vector_3"
                        d="M48.3604 51.4498V32.7898"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                    />
                    <Path
                        id="Vector_4"
                        d="M48.3597 14.5503L46.9796 16.1703C39.3296 25.1103 29.0696 31.4403 17.6396 34.2903"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                    />
                    <Path
                        id="Vector_5"
                        d="M39.5684 14.5503H48.3584V23.3103"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        id="Vector_6"
                        d="M24 63H42C57 63 63 57 63 42V24C63 9 57 3 42 3H24C9 3 3 9 3 24V42C3 57 9 63 24 63Z"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </G>
            </G>
        </Svg>
    )
}

PerformanceGraph.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 66,
    children: null
};

PerformanceGraph.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default PerformanceGraph;
