import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { Rect, Path, G } from "react-native-svg"

function AngryFace({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 1018">
                <Rect width={90} height={90} rx={45} fill={strokeColor} />
                <Path
                    id="Vector"
                    d="M70.3721 67.4996H61.9817C61.9817 58.9685 54.3637 52.0247 44.9971 52.0247C35.6345 52.0247 28.0178 58.9696 28.0178 67.4996H19.6274C19.6274 54.3027 31.0077 43.5635 44.9971 43.5635C58.9889 43.5649 70.3721 54.3024 70.3721 67.4996Z"
                    fill="white"
                />
                <Path
                    id="Vector_2"
                    d="M37.067 38.7766L24.8936 28.8917L29.957 22.5L42.1276 32.3894L37.067 38.7766Z"
                    fill="white"
                />
                <Path
                    id="Vector_3"
                    d="M53.4116 38.7766L48.3511 32.3894L60.526 22.5L65.5851 28.8917L53.4116 38.7766Z"
                    fill="white"
                />
            </G>
        </Svg>
    )
}

AngryFace.defaultProps = {
    strokeColor: "#FF2E00",
    height: 90,
    width: 90,
    children: null
};

AngryFace.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default AngryFace;
