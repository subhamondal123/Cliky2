
import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { Line, Rect, G } from "react-native-svg"

function PlusWithCircle({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 497">
                <Line
                    id="Line 17"
                    x1={38}
                    y1={15}
                    x2={38}
                    y2={61}
                    stroke={strokeColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                />
                <Line
                    id="Line 18"
                    x1={17}
                    y1={38}
                    x2={58}
                    y2={38}
                    stroke={strokeColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                />
                <Rect
                    x={3}
                    y={3}
                    width={69}
                    height={69}
                    rx={34.5}
                    stroke={strokeColor}
                    strokeWidth={6}
                />
            </G>
        </Svg>
    )
}

PlusWithCircle.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 75,
    width: 75,
    children: null
};

PlusWithCircle.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default PlusWithCircle;
