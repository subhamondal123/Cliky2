import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function StopWatch({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 37 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M18.207 5.565C8.17 5.565 0 13.734 0 23.772S8.169 42 18.207 42s18.207-8.169 18.207-18.207S28.245 5.565 18.207 5.565zM19.782 23.1c0 .86-.714 1.575-1.575 1.575a1.586 1.586 0 01-1.575-1.575V12.6c0-.861.714-1.575 1.575-1.575s1.575.714 1.575 1.575v10.5zM24.276 3.045H12.138c-.84 0-1.512-.672-1.512-1.512S11.298 0 12.138 0h12.138c.84 0 1.512.672 1.512 1.512s-.672 1.533-1.512 1.533z"
                fill={strokeColor}
            />
        </Svg>
    )
}


StopWatch.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

StopWatch.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default StopWatch;