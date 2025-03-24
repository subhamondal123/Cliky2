import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ThreeDBoxRotate({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="vuesax/linear/3d-rotate">
                <G id="3d-rotate">
                    <G id="Group">
                        <G id="Group_2">
                            <Path
                                id="Vector"
                                d="M25.125 34.7241L45 46.2366L64.725 34.7991"
                                stroke={strokeColor}
                                strokeWidth={4.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                id="Vector_2"
                                d="M45 66.6372V46.1997"
                                stroke={strokeColor}
                                strokeWidth={4.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                        <Path
                            id="Vector_3"
                            d="M40.3502 23.587L28.3502 30.262C25.6502 31.762 23.4001 35.5495 23.4001 38.6619V51.3744C23.4001 54.4869 25.6127 58.2745 28.3502 59.7745L40.3502 66.4495C42.9002 67.8745 47.1002 67.8745 49.6877 66.4495L61.6877 59.7745C64.3877 58.2745 66.6376 54.4869 66.6376 51.3744V38.6245C66.6376 35.512 64.4252 31.7245 61.6877 30.2245L49.6877 23.5495C47.1002 22.1245 42.9002 22.1245 40.3502 23.587Z"
                            stroke={strokeColor}
                            strokeWidth={4.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </G>
                    <G id="Group_3">
                        <Path
                            id="Vector_4"
                            d="M82.5 56.25C82.5 70.7625 70.7625 82.5 56.25 82.5L60.1875 75.9375"
                            stroke={strokeColor}
                            strokeWidth={4.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            id="Vector_5"
                            d="M7.5 33.75C7.5 19.2375 19.2375 7.5 33.75 7.5L29.8125 14.0625"
                            stroke={strokeColor}
                            strokeWidth={4.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </G>
                </G>
            </G>
        </Svg>

    )
}

ThreeDBoxRotate.defaultProps = {
    strokeColor: "#F13748",
    height: 90,
    width: 90,
    children: null
};

ThreeDBoxRotate.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ThreeDBoxRotate;
