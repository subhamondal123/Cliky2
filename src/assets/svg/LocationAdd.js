import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LocationAdd({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 58 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M20.6221 30.0067H37.1262M28.8741 38.2588V21.7547M3.72845 22.4749C9.63993 -3.51162 48.1395 -3.48161 54.021 22.5049C57.4719 37.7487 47.9895 50.6519 39.6774 58.6339C33.6459 64.4554 24.1035 64.4554 18.042 58.6339C9.75996 50.6519 0.277587 37.7187 3.72845 22.4749Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
            />
        </Svg>
    )
}

LocationAdd.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 66,
    width: 58,
    children: null
};

LocationAdd.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LocationAdd;
