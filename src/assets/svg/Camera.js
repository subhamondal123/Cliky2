import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Camera({
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
                d="M54 18c-1.83 0-3.51-1.05-4.35-2.67l-2.16-4.35C46.11 8.25 42.51 6 39.45 6h-6.87c-3.09 0-6.69 2.25-8.07 4.98l-2.16 4.35C21.51 16.95 19.83 18 18 18c-6.51 0-11.67 5.49-11.25 11.97l1.56 24.78C8.67 60.93 12 66 20.28 66h31.44C60 66 63.3 60.93 63.69 54.75l1.56-24.78C65.67 23.49 60.51 18 54 18zm-22.5 3.75h9c1.23 0 2.25 1.02 2.25 2.25s-1.02 2.25-2.25 2.25h-9c-1.23 0-2.25-1.02-2.25-2.25s1.02-2.25 2.25-2.25zM36 54.36c-5.58 0-10.14-4.53-10.14-10.14S30.39 34.08 36 34.08s10.14 4.53 10.14 10.14S41.58 54.36 36 54.36z"
                fill={strokeColor}
            />
        </Svg>
    )
}

Camera.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 72,
    width: 72,
    children: null
};

Camera.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Camera;
