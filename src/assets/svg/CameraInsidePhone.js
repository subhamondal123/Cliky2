import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg";

function CameraInsidePhone({
    strokeColor,
    height,
    width,
}) {

    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 156 261"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M95.2739 180C93.4439 180 91.7639 178.95 90.9239 177.33L88.7639 172.98C87.3839 170.25 83.7839 168 80.7239 168H73.8539C70.7639 168 67.1639 170.25 65.7839 172.98L63.6239 177.33C62.7839 178.95 61.1039 180 59.2739 180C52.7639 180 47.6039 185.49 48.0239 191.97L49.5839 216.75C49.9439 222.93 53.2739 228 61.5539 228H92.9939C101.274 228 104.574 222.93 104.964 216.75L106.524 191.97C106.944 185.49 101.784 180 95.2739 180ZM72.7739 183.75H81.7739C83.0039 183.75 84.0239 184.77 84.0239 186C84.0239 187.23 83.0039 188.25 81.7739 188.25H72.7739C71.5439 188.25 70.5239 187.23 70.5239 186C70.5239 184.77 71.5439 183.75 72.7739 183.75ZM77.2739 216.36C71.6939 216.36 67.1339 211.83 67.1339 206.22C67.1339 200.61 71.6639 196.08 77.2739 196.08C82.8839 196.08 87.4139 200.61 87.4139 206.22C87.4139 211.83 82.8539 216.36 77.2739 216.36Z"
                fill={strokeColor}
            />
            <Path
                d="M104.923 47.625H54.9231M153 66.75V194.25C153 245.25 140.5 258 90.5 258H65.5C15.5 258 3 245.25 3 194.25V66.75C3 15.75 15.5 3 65.5 3H90.5C140.5 3 153 15.75 153 66.75Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


CameraInsidePhone.defaultProps = {
    strokeColor: "#292D32",
    height: 261,
    width: 156,
};

CameraInsidePhone.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
};


export default CameraInsidePhone;