import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function User({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 31 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Vector">
                <Path
                    d="M15.6427 20.8057C15.8426 20.7845 16.0825 20.7845 16.3024 20.8057C21.06 20.636 24.8381 16.5018 24.8381 11.4134C24.8381 6.21908 20.8801 2 15.9626 2C11.065 2 7.08696 6.21908 7.08696 11.4134C7.10695 16.5018 10.8851 20.636 15.6427 20.8057Z"
                    stroke={strokeColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M25.6384 28.629C30.476 32.0636 30.476 37.6608 25.6384 41.0742C20.1411 44.9753 11.1256 44.9753 5.62835 41.0742C0.790757 37.6396 0.790757 32.0424 5.62835 28.629C11.1056 24.7491 20.1211 24.7491 25.6384 28.629Z"
                    stroke={strokeColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    )
}

User.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 46,
    width: 31,
    children: null
};

User.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default User;
