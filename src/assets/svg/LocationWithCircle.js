import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LocationWithCircle({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 72 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M35.9998 47.5879C42.5944 47.5879 47.9403 42.1388 47.9403 35.4169C47.9403 28.695 42.5944 23.2458 35.9998 23.2458C29.4052 23.2458 24.0593 28.695 24.0593 35.4169C24.0593 42.1388 29.4052 47.5879 35.9998 47.5879Z"
                stroke={strokeColor}
                strokeWidth={4.5}
            />
            <Path
                d="M3.92905 28.3173C11.4684 -5.46511 60.57 -5.4261 68.0711 28.3563C72.4722 48.1733 60.3786 64.9475 49.7776 75.3241C42.0851 82.892 29.915 82.892 22.1843 75.3241C11.6215 64.9475 -0.472104 48.1343 3.92905 28.3173Z"
                stroke={strokeColor}
                strokeWidth={4.5}
            />
        </Svg>
    )
}

LocationWithCircle.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 84,
    width: 72,
    children: null
};

LocationWithCircle.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LocationWithCircle;
