import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function SendDown({
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
                d="M5.13 59.713L57.681 38.07c3.207-1.336 3.029-5.879-.178-6.948l-17.992-6.145-22.713 19.239c-.713.534-1.603-.356-1.069-1.069l19.329-22.625-6.146-17.993c-1.159-3.295-5.7-3.384-6.948-.178L.32 54.901c-1.336 3.03 1.78 6.058 4.81 4.811v.001z"
                fill={strokeColor}
            />
        </Svg>
    )
}

SendDown.defaultProps = {
    strokeColor: "#292D32",
    height: 60,
    width: 60,
    children: null
};

SendDown.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default SendDown;
