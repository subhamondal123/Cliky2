import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function DoubleUser({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 39 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M27.5608 5.63453C31.0863 5.63453 33.9212 8.48763 33.9212 11.995C33.9212 15.4296 31.1953 18.2282 27.7971 18.3554C27.6517 18.3372 27.4881 18.3372 27.3246 18.3554M31.0674 34.7108C32.3758 34.4382 33.6115 33.9112 34.6292 33.1297C37.4641 31.0035 37.4641 27.4962 34.6292 25.37C33.6297 24.6068 32.4121 24.0979 31.1219 23.8072M14.3861 18.1191C14.2044 18.101 13.9863 18.101 13.7864 18.1191C9.46136 17.9738 6.02673 14.4301 6.02673 10.0687C6.02673 5.61636 9.62491 2 14.0954 2C18.5477 2 22.164 5.61636 22.164 10.0687C22.1459 14.4301 18.7112 17.9738 14.3861 18.1191ZM5.29833 24.8248C0.900555 27.7688 0.900555 32.5664 5.29833 35.4922C10.2958 38.8359 18.4917 38.8359 23.4891 35.4922C27.8869 32.5482 27.8869 27.7506 23.4891 24.8248C18.5098 21.4992 10.314 21.4992 5.29833 24.8248Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


DoubleUser.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 40,
    width: 39
};

DoubleUser.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default DoubleUser;