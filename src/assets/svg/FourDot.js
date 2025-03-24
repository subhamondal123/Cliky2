
import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Circle, G } from "react-native-svg"

function FourDot({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 631">
                <Circle
                    id="Ellipse 28"
                    cx={15}
                    cy={15}
                    r={12}
                    stroke={strokeColor}
                    strokeWidth={6}
                />
                <Circle
                    id="Ellipse 32"
                    cx={54}
                    cy={15}
                    r={12}
                    stroke={strokeColor}
                    strokeWidth={6}
                />
                <Circle
                    id="Ellipse 31"
                    cx={15}
                    cy={54}
                    r={12}
                    stroke={strokeColor}
                    strokeWidth={6}
                />
                <Circle
                    id="Ellipse 33"
                    cx={54}
                    cy={54}
                    r={12}
                    stroke={strokeColor}
                    strokeWidth={6}
                />
            </G>
        </Svg>
    )
}

FourDot.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 69,
    width: 69,
    children: null
};

FourDot.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default FourDot;
