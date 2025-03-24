import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Expenses({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 66 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
       
      >
        <Path
          d="M59.999 34.65c1.68-.06 3-1.41 3-3.06v-6.18c0-1.65-1.32-3-3-3.06m0 12.3h-5.88c-3.24 0-6.21-2.37-6.48-5.61-.18-1.89.54-3.66 1.8-4.89 1.11-1.14 2.64-1.8 4.32-1.8h6.24m0 12.3V39c0 9-6 14.999-15 14.999h-7.5M60 22.349V18c0-8.22-5.01-13.95-12.75-14.849C46.53 3.03 45.78 3 45 3H18c-.84 0-1.65.06-2.43.18C7.92 4.14 3 9.84 3 18v6m26.254 19.08v6.09c0 5.16-4.8 9.33-10.71 9.33-5.91 0-10.74-4.17-10.74-9.33v-6.09c0 5.16 4.8 8.82 10.74 8.82 5.91 0 10.71-3.69 10.71-8.82zm-.004-8.25c0 1.5-.42 2.88-1.14 4.08-1.77 2.91-5.4 4.74-9.6 4.74-4.2 0-7.83-1.86-9.6-4.74a7.87 7.87 0 01-1.14-4.08c0-2.58 1.2-4.89 3.12-6.57 1.95-1.71 4.62-2.73 7.59-2.73 2.97 0 5.64 1.05 7.59 2.73 1.98 1.65 3.18 3.99 3.18 6.57z"
          stroke={strokeColor}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
}


Expenses.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Expenses.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Expenses;