import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Clock({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 78 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M52.356 50.448l-11.16-6.66c-1.944-1.152-3.528-3.924-3.528-6.192v-14.76M75 39c0 19.872-16.128 36-36 36S3 58.872 3 39 19.128 3 39 3s36 16.128 36 36z"
                stroke={strokeColor}
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Clock.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 71,
    width: 209,
    children: null
};

Clock.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Clock;
