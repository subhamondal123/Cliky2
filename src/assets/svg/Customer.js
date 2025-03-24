import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Customer({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 63 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M45.195 9c5.82 0 10.5 4.71 10.5 10.5 0 5.67-4.5 10.29-10.11 10.5-.24-.03-.51-.03-.78 0m6.18 27c2.16-.45 4.2-1.32 5.88-2.61 4.68-3.51 4.68-9.3 0-12.81-1.65-1.26-3.66-2.1-5.79-2.58m-27.63-9.39c-.3-.03-.66-.03-.99 0-7.14-.24-12.81-6.09-12.81-13.29C9.645 8.97 15.585 3 22.965 3c7.35 0 13.32 5.97 13.32 13.32-.03 7.2-5.7 13.05-12.84 13.29zm-15 11.07c-7.26 4.86-7.26 12.78 0 17.61 8.25 5.52 21.78 5.52 30.03 0 7.26-4.86 7.26-12.78 0-17.61-8.22-5.49-21.75-5.49-30.03 0z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Customer.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Customer.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Customer;