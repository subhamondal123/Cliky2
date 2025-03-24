import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Location({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 4429">
                <Path
                    id="Vector"
                    d="M63 24V42C63 49.5 61.5 54.7501 58.14 58.1401L39 39L62.19 15.8101C62.73 18.1801 63 20.88 63 24Z"
                    stroke={strokeColor}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_2"
                    d="M62.19 15.81L15.81 62.19C6.77997 60.12 3 53.88 3 42V24C3 9 9 3 24 3H42C53.88 3 60.12 6.78001 62.19 15.81Z"
                    stroke={strokeColor}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_3"
                    d="M58.1386 58.14C54.7486 61.5 49.4986 63 41.9986 63H23.9986C20.8786 63 18.1786 62.73 15.8086 62.19L38.9986 39L58.1386 58.14Z"
                    stroke={strokeColor}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_4"
                    d="M15.7208 20.9399C17.7608 12.1499 30.9608 12.1499 33.0008 20.9399C34.1708 26.0999 30.9308 30.4799 28.0808 33.1799C26.0108 35.1599 22.7408 35.1599 20.6408 33.1799C17.7908 30.4799 14.5208 26.0999 15.7208 20.9399Z"
                    stroke="#1F2B4D"
                    strokeWidth={4.5}
                />
                <Path
                    id="Vector_5"
                    d="M24.2824 23.0999H24.3093"
                    stroke="#1F2B4D"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    )
}

Location.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 66,
    children: null
};

Location.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Location;
