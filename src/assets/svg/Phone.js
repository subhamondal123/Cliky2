import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Phone({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 51 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                id="Vector"
                d="M34.0201 16.125H18.8027M48.6522 21.75V59.25C48.6522 74.25 44.8478 78 29.6304 78H22.0217C6.80435 78 3 74.25 3 59.25V21.75C3 6.75 6.80435 3 22.0217 3H29.6304C44.8478 3 48.6522 6.75 48.6522 21.75ZM32.3079 61.3125C32.3079 64.5227 29.6679 67.125 26.4112 67.125C23.1545 67.125 20.5144 64.5227 20.5144 61.3125C20.5144 58.1023 23.1545 55.5 26.4112 55.5C29.6679 55.5 32.3079 58.1023 32.3079 61.3125Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Phone.defaultProps = {
    strokeColor: "#292D32",
    height: 51,
    width: 81,
    children: null
};

Phone.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Phone;
