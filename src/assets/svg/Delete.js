import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Delete({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 33 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M12.75 6h7.5a3.75 3.75 0 00-7.5 0zM10.5 6a6 6 0 1112 0h9.375a1.125 1.125 0 010 2.25H29.91l-1.826 21.904A6.375 6.375 0 0121.732 36H11.268a6.375 6.375 0 01-6.353-5.846L3.09 8.25H1.125a1.125 1.125 0 010-2.25H10.5zm3.75 8.625a1.125 1.125 0 10-2.25 0v12.75a1.125 1.125 0 102.25 0v-12.75zm5.625-1.125a1.125 1.125 0 00-1.125 1.125v12.75a1.125 1.125 0 102.25 0v-12.75a1.125 1.125 0 00-1.125-1.125z"
                fill={strokeColor}
            />
        </Svg>
    )
}


Delete.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Delete.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Delete;