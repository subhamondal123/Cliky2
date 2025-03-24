import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ContactId({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 66 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G id="Frame 4430">
          <Path
            id="Vector"
            d="M48 57H18C6 57 3 54 3 42V18C3 6 6 3 18 3H48C60 3 63 6 63 18V42C63 54 60 57 48 57Z"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            d="M39 18H54"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_3"
            d="M42 30H54"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_4"
            d="M48 42H54"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_5"
            d="M22.4984 27.8698C25.4973 27.8698 27.9284 25.4387 27.9284 22.4398C27.9284 19.4409 25.4973 17.0098 22.4984 17.0098C19.4995 17.0098 17.0684 19.4409 17.0684 22.4398C17.0684 25.4387 19.4995 27.8698 22.4984 27.8698Z"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_6"
            d="M33 42.99C32.58 38.64 29.13 35.22 24.78 34.83C23.28 34.68 21.75 34.68 20.22 34.83C15.87 35.25 12.42 38.64 12 42.99"
            stroke={strokeColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    )
}

ContactId.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 60,
    width: 66,
    children: null
};

ContactId.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ContactId;
