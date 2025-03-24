import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LocationSlash({
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
                d="M31.26 39a9.34 9.34 0 01-4.62-8.07c0-5.16 4.17-9.36 9.36-9.36 3.45 0 6.45 1.86 8.07 4.65"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.97 53.43c-5.52-7.53-9.54-17.16-7.08-27.96C15.84 3.69 43.71.18 56.04 14.94M61.14 25.5c3.45 15.24-6.03 28.14-14.34 36.12-6.03 5.82-15.57 5.82-21.63 0M66 6L6 66"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

LocationSlash.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 66,
    width: 58,
    children: null
};

LocationSlash.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LocationSlash;
