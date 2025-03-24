import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { Circle, Path, G } from "react-native-svg"

function ThreeDBoxWithTwoCircleRotate({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 5206">
                <G id="vuesax/linear/convert-3d-cube">
                    <G id="convert-3d-cube">
                        <G id="Group">
                            <Path
                                id="Vector"
                                d="M27.5 18.75C27.5 23.5875 23.5875 27.5 18.75 27.5L20.0625 25.3125"
                                stroke={strokeColor}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                id="Vector_2"
                                d="M2.5 11.25C2.5 6.4125 6.4125 2.5 11.25 2.5L9.9375 4.6875"
                                stroke={strokeColor}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                        <G id="Group_2">
                            <G id="Group_3">
                                <Path
                                    id="Vector_3"
                                    d="M2.9375 19.3125L7.9 22.1875L12.8375 19.325"
                                    stroke={strokeColor}
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Path
                                    id="Vector_4"
                                    d="M7.90002 27.2748V22.1748"
                                    stroke={strokeColor}
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </G>
                            <Path
                                id="Vector_5"
                                d="M6.7375 16.5125L3.73751 18.1749C3.06251 18.5499 2.5 19.4999 2.5 20.2749V23.45C2.5 24.225 3.05001 25.175 3.73751 25.55L6.7375 27.2125C7.375 27.575 8.42499 27.575 9.07499 27.2125L12.075 25.55C12.75 25.175 13.3125 24.225 13.3125 23.45V20.2749C13.3125 19.4999 12.7625 18.5499 12.075 18.1749L9.07499 16.5125C8.42499 16.1625 7.375 16.1625 6.7375 16.5125Z"
                                stroke={strokeColor}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                    </G>
                    <Circle
                        id="Ellipse 140"
                        cx={20}
                        cy={5}
                        r={3.25}
                        stroke={strokeColor}
                        strokeWidth={1.5}
                    />
                    <Circle
                        id="Ellipse 141"
                        cx={24}
                        cy={9}
                        r={3.25}
                        stroke={strokeColor}
                        strokeWidth={1.5}
                    />
                </G>
            </G>
        </Svg>

    )
}

ThreeDBoxWithTwoCircleRotate.defaultProps = {
    strokeColor: "#F13748",
    height: 30,
    width: 30,
    children: null
};

ThreeDBoxWithTwoCircleRotate.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ThreeDBoxWithTwoCircleRotate;
