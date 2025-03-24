import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function FooterCurve({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 209 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M45.4965 33.0708C33.4974 9.07266 9.99923 1.40658 0 1.07327H201.139C203.467 0.910272 205.913 0.902886 208.484 1.07327H201.139C175.848 2.84402 164.524 22.9792 159.488 33.0708C142.823 66.4649 116.491 70.7132 103.492 70.0466C72.2944 70.0466 52.4852 47.0482 45.4965 33.0708Z"
                fill={strokeColor}
            />
            {children}
        </Svg>
    )
}

FooterCurve.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 71,
    width: 209,
    children: null
};

FooterCurve.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default FooterCurve;
