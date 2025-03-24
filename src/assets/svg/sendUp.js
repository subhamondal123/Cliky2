import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function SendUp({
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
                d="M54.869.287L2.318 21.93c-3.207 1.336-3.029 5.879.178 6.947l17.992 6.147 22.713-19.24c.713-.534 1.603.356 1.069 1.069L24.94 39.479l6.146 17.993c1.159 3.295 5.7 3.384 6.948.178L59.679 5.098c1.336-3.028-1.78-6.057-4.81-4.81V.287z"
                fill={strokeColor}
            />
        </Svg>
    )
}

SendUp.defaultProps = {
    strokeColor: "#292D32",
    height: 60,
    width: 60,
    children: null
};

SendUp.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default SendUp;
