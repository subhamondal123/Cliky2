import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Back({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 28 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M25 3L4 27.5581L25 51"
                stroke="#1F2B4D"
                strokeWidth={6}
                strokeLinecap="round"
            />
        </Svg>
    )
}

Back.defaultProps = {
    strokeColor: "#292D32",
    height: 51,
    width: 81,
    children: null
};

Back.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Back;
