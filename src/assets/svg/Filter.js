import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Filter({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 39 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M39 4.54615V9.54692C39 11.3654 37.8662 13.6385 36.7325 14.775L26.9822 23.4127C25.6217 24.5492 24.7147 26.8223 24.7147 28.6408V38.415C24.7147 39.7788 23.8077 41.5973 22.6739 42.2792L19.4994 44.325C16.5517 46.1435 12.4702 44.0977 12.4702 40.4608V28.4135C12.4702 26.8223 11.5631 24.7765 10.6561 23.64L9.59042 22.5262C8.88749 21.7761 8.75144 20.6395 9.31832 19.753L20.928 1.06835C21.3361 0.409154 22.0617 0 22.8553 0H34.465C36.9592 0 39 2.04577 39 4.54615Z"
                fill={strokeColor}
            />
            <Path
                d="M15.7592 3.47781L7.70953 16.4116C6.93858 17.6618 5.16992 17.8437 4.14954 16.7753L2.04076 14.5477C0.907004 13.4112 0 11.3654 0 10.0015V4.77346C0 2.04577 2.04076 0 4.53502 0H13.8318C15.6005 0 16.6889 1.95485 15.7592 3.47781Z"
                fill={strokeColor}
            />
        </Svg>
    )
}

Filter.defaultProps = {
    strokeColor: "#292D32",
    height: 51,
    width: 81,
    children: null
};

Filter.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Filter;
