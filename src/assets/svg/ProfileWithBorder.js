import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ProfileWithBorder({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 34 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M14.2995 2.4039L5.63078 5.65249C3.63298 6.39949 2 8.76209 2 10.8989V23.8064C2 25.8563 3.35505 28.549 5.0054 29.7824L12.4754 35.3589C14.9249 37.2004 18.9552 37.2004 21.4047 35.3589L28.8748 29.7824C30.5251 28.549 31.8801 25.8563 31.8801 23.8064V10.8989C31.8801 8.76209 30.2471 6.39949 28.2493 5.65249L19.5806 2.4039C18.104 1.86537 15.7414 1.86537 14.2995 2.4039Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M16.9225 17.5005C16.853 17.5005 16.7661 17.5005 16.6966 17.5005C15.0637 17.4484 13.7607 16.0934 13.7607 14.443C13.7607 12.7579 15.1332 11.3855 16.8183 11.3855C18.5034 11.3855 19.8758 12.7579 19.8758 14.443C19.8584 16.1107 18.5555 17.4484 16.9225 17.5005Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M13.4656 22.3646C11.7979 23.4764 11.7979 25.3005 13.4656 26.4123C15.3592 27.6804 18.4688 27.6804 20.3624 26.4123C22.0301 25.3005 22.0301 23.4764 20.3624 22.3646C18.4862 21.0964 15.3766 21.0964 13.4656 22.3646Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

ProfileWithBorder.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 39,
    width: 34,
    children: null
};

ProfileWithBorder.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ProfileWithBorder;
