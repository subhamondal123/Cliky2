import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Scanning({
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
                d="M5 24.375A1.889 1.889 0 013.125 22.5v-6.25c0-7.25 5.9-13.125 13.125-13.125h6.25c1.025 0 1.875.85 1.875 1.875s-.85 1.875-1.875 1.875h-6.25c-5.175 0-9.375 4.2-9.375 9.375v6.25c0 1.025-.85 1.875-1.875 1.875zM55 24.375a1.889 1.889 0 01-1.875-1.875v-6.25c0-5.175-4.2-9.375-9.375-9.375H37.5A1.889 1.889 0 0135.625 5c0-1.025.85-1.875 1.875-1.875h6.25c7.225 0 13.125 5.875 13.125 13.125v6.25c0 1.025-.85 1.875-1.875 1.875zM43.75 56.875H40A1.889 1.889 0 0138.125 55c0-1.025.85-1.875 1.875-1.875h3.75c5.175 0 9.375-4.2 9.375-9.375V40c0-1.025.85-1.875 1.875-1.875s1.875.85 1.875 1.875v3.75c0 7.25-5.9 13.125-13.125 13.125zM22.5 56.875h-6.25C9.025 56.875 3.125 51 3.125 43.75V37.5c0-1.025.85-1.875 1.875-1.875s1.875.85 1.875 1.875v6.25c0 5.175 4.2 9.375 9.375 9.375h6.25c1.025 0 1.875.85 1.875 1.875s-.85 1.875-1.875 1.875zM21.25 28.45a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4zM18.75 45.95a4.7 4.7 0 100-9.4 4.7 4.7 0 000 9.4zM41.25 23.45a4.7 4.7 0 100-9.4 4.7 4.7 0 000 9.4zM38.75 45.95a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z"
                fill={strokeColor}
            />
        </Svg>
    )
}

Scanning.defaultProps = {
    strokeColor: "#292D32",
    height: 51,
    width: 81,
    children: null
};

Scanning.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Scanning;
