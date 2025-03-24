import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function FevouritWithTick({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 58 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M43.1874 3H14.2622C7.87109 3 2.68018 8.22093 2.68018 14.5821V56.8595C2.68018 62.2605 6.55086 64.5409 11.2917 61.9304L25.9343 53.799C27.4946 52.9288 30.015 52.9288 31.5453 53.799L46.1879 61.9304C50.9287 64.5709 54.7994 62.2905 54.7994 56.8595V14.5821C54.7694 8.22093 49.5785 3 43.1874 3Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M21.4937 30.0048L25.9944 34.5056L37.9966 22.5035"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

FevouritWithTick.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 66,
    width: 58,
    children: null
};

FevouritWithTick.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default FevouritWithTick;
