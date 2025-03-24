
import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LmsFilter({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 5016">
                <G id="vuesax/linear/filter-search">
                    <G id="filter-search">
                        <G id="Group">
                            <Path
                                id="Vector"
                                d="M42.96 57.2103C42.96 59.0403 41.7599 61.4403 40.2299 62.3703L36 65.1003C32.07 67.5303 26.61 64.8003 26.61 59.9403V43.8903C26.61 41.7603 25.41 39.0303 24.18 37.5303L12.6599 25.4102C11.1299 23.8802 9.92999 21.1803 9.92999 19.3503V12.3903C9.92999 8.76026 12.6601 6.03027 15.9901 6.03027H56.0099C59.3399 6.03027 62.07 8.76024 62.07 12.0902V18.7502C62.07 21.1802 60.54 24.2103 59.04 25.7103"
                                stroke={strokeColor}
                                strokeWidth={4.5}
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                        <G id="Group_2">
                            <Path
                                id="Vector_2"
                                d="M48.21 49.5598C53.512 49.5598 57.8101 45.2618 57.8101 39.9599C57.8101 34.658 53.512 30.3599 48.21 30.3599C42.9081 30.3599 38.61 34.658 38.61 39.9599C38.61 45.2618 42.9081 49.5598 48.21 49.5598Z"
                                stroke={strokeColor}
                                strokeWidth={4.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                id="Vector_3"
                                d="M59.61 51.3599L56.61 48.3599"
                                stroke={strokeColor}
                                strokeWidth={4.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    )
}

LmsFilter.defaultProps = {
    strokeColor: "#172834",
    height: 72,
    width: 72
};

LmsFilter.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default LmsFilter;
