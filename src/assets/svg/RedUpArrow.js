import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function RedUpArrow({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M.879 30.879A3 3 0 105.12 35.12L.88 30.88zM36 3a3 3 0 00-3-3H6a3 3 0 000 6h24v24a3 3 0 106 0V3zM5.121 35.121l30-30L30.88.88l-30 30L5.12 35.12z"
                fill={strokeColor}
            />
        </Svg>
    )
}

RedUpArrow.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 39,
    width: 34,
    children: null
};

RedUpArrow.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default RedUpArrow;
