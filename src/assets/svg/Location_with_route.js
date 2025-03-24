import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Location_with_route({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M23.45 26.75h-1.5 1.5zm-4.9-21.3a1.5 1.5 0 100 3v-3zm6.6 7.292l.987 1.128.002-.001-.99-1.127zM11.966 24.274l.985 1.131.003-.002-.988-1.129zm6.583 7.275a1.5 1.5 0 000-3v3zM7.802 6.275a1.5 1.5 0 100 3v-3zm.019 3a1.5 1.5 0 100-3v3zm21.43 18.45a1.5 1.5 0 000 3v-3zm.02 3a1.5 1.5 0 000-3v3zM12.05 7.775a4.275 4.275 0 01-4.275 4.275v3a7.275 7.275 0 007.275-7.275h-3zM7.775 12.05A4.275 4.275 0 013.5 7.775h-3a7.275 7.275 0 007.275 7.275v-3zM3.5 7.775A4.275 4.275 0 017.775 3.5v-3A7.275 7.275 0 00.5 7.775h3zM7.775 3.5a4.275 4.275 0 014.275 4.275h3A7.275 7.275 0 007.775.5v3zM26.75 24.95h4.95v-3h-4.95v3zm4.95 0c.987 0 1.8.813 1.8 1.8h3a4.81 4.81 0 00-4.8-4.8v3zm1.8 1.8v4.95h3v-4.95h-3zm0 4.95c0 .987-.813 1.8-1.8 1.8v3a4.81 4.81 0 004.8-4.8h-3zm-1.8 1.8h-4.95v3h4.95v-3zm-4.95 0a1.81 1.81 0 01-1.8-1.8h-3a4.81 4.81 0 004.8 4.8v-3zm-1.8-1.8v-4.95h-3v4.95h3zm0-4.95c0-.987.813-1.8 1.8-1.8v-3a4.81 4.81 0 00-4.8 4.8h3zm-6.4-18.3h4.421v-3H18.55v3zm4.421 0c1.665 0 2.445 2.062 1.189 3.164l1.979 2.255c3.33-2.924 1.273-8.419-3.168-8.419v3zm1.19 3.163L10.979 23.145l1.976 2.258L26.137 13.87l-1.975-2.257zm-13.18 11.53c-3.341 2.91-1.274 8.407 3.146 8.407v-3c-1.651 0-2.422-2.06-1.176-3.144l-1.97-2.262zm3.146 8.407h4.422v-3h-4.421v3zM7.802 9.275h.019v-3H7.8v3zm21.45 21.45h.019v-3h-.02v3z"
                fill={strokeColor}
            />
        </Svg>
    )
}


Location_with_route.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Location_with_route.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Location_with_route;