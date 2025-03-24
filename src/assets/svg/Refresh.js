import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Refresh({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 36 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
           
        >
            <Path
                d="M16.34.683a2.358 2.358 0 013.32 0l6.26 6.222c.917.91.918 2.39.001 3.3l-6.26 6.223a2.358 2.358 0 01-3.321 0 2.323 2.323 0 010-3.3l2.242-2.229c-.192-.007-.386-.01-.582-.01-7.362 0-13.304 5.939-13.304 13.222 0 7.317 5.975 13.222 13.304 13.222 7.325 0 13.304-5.942 13.304-13.222 0-2.735-.821-5.274-2.232-7.342a2.324 2.324 0 01.626-3.24 2.357 2.357 0 013.26.621C34.897 16.99 36 20.441 36 24.111 36 33.968 27.918 42 18 42 8.086 42 0 34.014 0 24.111 0 14.258 8.036 6.222 18 6.222c.202 0 .402.003.601.009L16.34 3.983a2.323 2.323 0 010-3.3z"
                fill={strokeColor}
            />
        </Svg>
    )
}


Refresh.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Refresh.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Refresh;