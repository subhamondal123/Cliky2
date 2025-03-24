import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function InvoiceWithTick({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 5209">
                <G id="vuesax/linear/receipt-minus">
                    <Path
                        id="Vector"
                        d="M66 18V25.26C66 30 63 33 58.26 33H48V12.03C48 8.69999 50.73 6 54.06 6C57.33 6.03 60.33 7.34999 62.49 9.50999C64.65 11.7 66 14.7 66 18Z"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        id="Vector_2"
                        d="M6 21V63C6 65.49 8.82 66.9 10.8 65.4L15.93 61.56C17.13 60.66 18.81 60.78 19.89 61.86L24.87 66.87C26.04 68.04 27.96 68.04 29.13 66.87L34.17 61.83C35.22 60.78 36.9 60.66 38.07 61.56L43.2 65.4C45.18 66.87 48 65.46 48 63V12C48 8.7 50.7 6 54 6H21H18C9 6 6 11.37 6 18V21Z"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        id="Vector 132"
                        d="M19 32L26.5 38L41.5 20"
                        stroke={strokeColor}
                        strokeWidth={4.5}
                        strokeLinecap="round"
                    />
                </G>
            </G>
        </Svg>

    )
}

InvoiceWithTick.defaultProps = {
    strokeColor: "#F13748",
    height: 72,
    width: 72,
    children: null
};

InvoiceWithTick.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default InvoiceWithTick;
