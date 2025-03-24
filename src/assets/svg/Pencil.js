import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Pencil({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M29.96 6.82L6.326 30.454c-.935.934-1.802 2.67-2.003 3.938l-1.268 9.013c-.467 3.271 1.802 5.541 5.074 5.074l9.013-1.268c1.268-.2 3.07-1.068 3.939-2.003l23.633-23.634c4.073-4.072 6.009-8.813 0-14.821C38.772.811 34.033 2.747 29.96 6.82zM26.555 10.225a21.266 21.266 0 0014.821 14.82"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


Pencil.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Pencil.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Pencil;