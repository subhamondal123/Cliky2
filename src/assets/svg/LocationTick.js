import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LocationTick({
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
                d="M3.728 22.475l-2.194-.5v.003l2.194.497zm50.293.03l-2.194.497 2.194-.497zM39.677 58.634L38.12 57.01l-.004.004 1.562 1.619zm-21.635 0l-1.561 1.62.002.003 1.559-1.623zm4.172-28.718a2.25 2.25 0 00-3.182 3.182l3.182-3.182zm2.91 6.092L23.533 37.6a2.25 2.25 0 003.182 0l-1.591-1.59zm13.594-10.412a2.25 2.25 0 10-3.182-3.182l3.182 3.182zM5.922 22.974c2.68-11.781 12.71-17.73 22.962-17.724 10.254.007 20.276 5.97 22.943 17.752l4.389-.994C53 7.803 40.831.758 28.886.75 16.944.742 4.767 7.77 1.535 21.976l4.387.998zm45.905.028c3.172 14.013-5.51 26.137-13.708 34.009l3.117 3.246c8.426-8.092 18.709-21.775 14.98-38.249l-4.39.994zM38.115 57.015c-5.158 4.978-13.322 4.983-18.514-.004l-3.117 3.246c6.93 6.655 17.85 6.66 24.756-.004l-3.125-3.238zm-18.512-.001C11.435 49.14 2.75 36.987 5.923 22.972l-4.389-.994C-2.195 38.45 8.085 52.163 16.481 60.254l3.122-3.24zm-.571-23.916l4.5 4.501 3.183-3.182-4.501-4.5-3.182 3.181zm7.683 4.501l12.003-12.003-3.182-3.182-12.003 12.003 3.182 3.182z"
                fill={strokeColor}
            />
        </Svg>
    )
}

LocationTick.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 66,
    width: 58,
    children: null
};

LocationTick.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LocationTick;
