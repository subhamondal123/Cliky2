import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ChartProgress({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M4.5 33H31.5"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.39996 12.5698H6C5.175 12.5698 4.5 13.2448 4.5 14.0698V26.9998C4.5 27.8248 5.175 28.4998 6 28.4998H8.39996C9.22496 28.4998 9.89996 27.8248 9.89996 26.9998V14.0698C9.89996 13.2448 9.22496 12.5698 8.39996 12.5698Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19.2003 7.78491H16.8003C15.9753 7.78491 15.3003 8.45991 15.3003 9.28491V26.9999C15.3003 27.8249 15.9753 28.4999 16.8003 28.4999H19.2003C20.0253 28.4999 20.7003 27.8249 20.7003 26.9999V9.28491C20.7003 8.45991 20.0253 7.78491 19.2003 7.78491Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M30.0005 3H27.6006C26.7756 3 26.1006 3.675 26.1006 4.5V27C26.1006 27.825 26.7756 28.5 27.6006 28.5H30.0005C30.8255 28.5 31.5005 27.825 31.5005 27V4.5C31.5005 3.675 30.8255 3 30.0005 3Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

ChartProgress.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 71,
    width: 209,
    children: null
};

ChartProgress.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ChartProgress;
