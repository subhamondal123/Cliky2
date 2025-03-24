import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function BlueLock({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 39 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M19.5 0C11.7 0 5.174 4.26 5.571 14.875v7.438H3.25C1.45 22.313 0 23.8 0 25.819v21.538C0 49.375 1.45 51 3.25 51h32.5c1.8 0 3.25-1.625 3.25-3.643V25.82c0-2.018-1.424-3.506-3.25-3.506h-2.321v-7.438C33.429 4.25 27.3 0 19.5 0zm0 6.375c3.9 0 8.357 1.532 8.357 8.5v7.438H11.143v-7.438c0-6.899 4.457-8.5 8.357-8.5z"
                fill={strokeColor}
            />
        </Svg>
    )
}

BlueLock.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 39,
    width: 34,
    children: null
};

BlueLock.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default BlueLock;
