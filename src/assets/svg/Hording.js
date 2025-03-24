import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Hording({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M2 2h48M16.4 50l9.6-4.8m0 0V38m0 7.2l9.6 4.8M11.36 38h29.257c4.56 0 6.96-2.4 6.96-6.96V2h-43.2v29.04C4.4 35.6 6.8 38 11.36 38z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>

    )
}

Hording.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 52,
    width: 52,
    children: null
};

Hording.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Hording;
