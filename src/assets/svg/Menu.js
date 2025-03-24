import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg";

function Menu({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 60 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path d="M3 3H57" stroke={strokeColor} strokeWidth={4.5} strokeLinecap="round" />
            <Path d="M3 18H57" stroke={strokeColor} strokeWidth={4.5} strokeLinecap="round" />
            <Path d="M3 33H57" stroke={strokeColor} strokeWidth={4.5} strokeLinecap="round" />
        </Svg>
    )
}


Menu.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Menu.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Menu;