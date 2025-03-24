import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LocationWithBGColor({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M41.2402 16.9002C39.1402 7.66024 31.0802 3.50024 24.0002 3.50024C24.0002 3.50024 24.0002 3.50024 23.9802 3.50024C16.9202 3.50024 8.84019 7.64024 6.74019 16.8802C4.40019 27.2002 10.7202 35.9402 16.4402 41.4402C18.5602 43.4802 21.2802 44.5002 24.0002 44.5002C26.7202 44.5002 29.4402 43.4802 31.5402 41.4402C37.2602 35.9402 43.5802 27.2202 41.2402 16.9002ZM24.0002 26.9202C20.5202 26.9202 17.7002 24.1002 17.7002 20.6202C17.7002 17.1402 20.5202 14.3202 24.0002 14.3202C27.4802 14.3202 30.3002 17.1402 30.3002 20.6202C30.3002 24.1002 27.4802 26.9202 24.0002 26.9202Z"
                fill={strokeColor}
            />
        </Svg>
    )
}

LocationWithBGColor.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 84,
    width: 72,
    children: null
};

LocationWithBGColor.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LocationWithBGColor;
