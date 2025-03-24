import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Camera_with_pencil({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 126 126"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M104.96 81.82l-23.634 23.634c-.934.934-1.802 2.67-2.003 3.939l-1.268 9.012c-.468 3.272 1.802 5.542 5.074 5.074l9.012-1.268c1.269-.201 3.072-1.068 3.94-2.003l23.633-23.634c4.073-4.072 6.009-8.813 0-14.821-5.942-5.942-10.681-4.006-14.754.067zM101.555 85.225a21.268 21.268 0 0014.821 14.821"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M28.728 93.493h44.536c11.73 0 16.404-7.182 16.957-15.936l2.21-35.103c.594-9.179-6.715-16.956-15.937-16.956-2.592 0-4.972-1.487-6.162-3.782l-3.06-6.162C65.317 11.687 60.218 8.5 55.883 8.5h-9.732c-4.377 0-9.476 3.187-11.431 7.054l-3.06 6.162c-1.19 2.295-3.57 3.782-6.162 3.782-9.222 0-16.531 7.777-15.936 16.956l2.21 35.103c.51 8.754 5.227 15.936 16.956 15.936zM44.622 33.998H57.37"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M50.996 76.494c7.607 0 13.811-6.205 13.811-13.812 0-7.606-6.204-13.81-13.811-13.81s-13.811 6.204-13.811 13.81c0 7.607 6.204 13.812 13.811 13.812z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Camera_with_pencil.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 71,
    width: 209,
    children: null
};

Camera_with_pencil.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Camera_with_pencil;
