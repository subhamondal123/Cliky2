import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Van({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M33 39h3c3.3 0 6-2.7 6-6m0 0V3H15C10.5 3 6.57 5.49 4.53 9.15M42 33V12h5.52c2.16 0 4.14 1.17 5.22 3.03L57.87 24M3 48c0 4.98 4.02 9 9 9h3m0 0c0-3.3 2.7-6 6-6m-6 6a6 6 0 0012 0m-12 0a6 6 0 016-6m0 0c3.3 0 6 2.7 6 6m-6-6a6 6 0 016 6m0 0h12m0 0c0-3.3 2.7-6 6-6m-6 6a6 6 0 0012 0m-12 0a6 6 0 016-6m0 0c3.3 0 6 2.7 6 6m-6-6a6 6 0 016 6m0 0h3c4.98 0 9-4.02 9-9v-9m0 0h-9c-1.65 0-3-1.35-3-3v-9c0-1.65 1.35-3 3-3h3.87M63 39v-6l-5.13-9M3 21h18M3 30h12M3 39h6"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


Van.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Van.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Van;