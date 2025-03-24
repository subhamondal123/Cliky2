import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Cross({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 177 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M160.388 16.7274L16.2217 144.558"
                stroke={strokeColor}
                strokeWidth={32}
                strokeLinecap="round"
            />
            <Path
                d="M160.501 147.67L16.4372 19.7303"
                stroke={strokeColor}
                strokeWidth={32}
                strokeLinecap="round"
            />
        </Svg>
    )
}

Cross.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 165,
    width: 177,
    children: null
};

Cross.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Cross;
