
import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function UserWithPlus({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 82 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Group">
                <Path
                    id="Vector"
                    d="M74.0541 37.7497V8.79162C74.0541 7.25559 73.4302 5.78247 72.3198 4.69633C71.2093 3.61019 69.7033 3 68.1329 3H8.92117C7.35078 3 5.84471 3.61019 4.73427 4.69633C3.62384 5.78247 3 7.25559 3 8.79162V66.7078C3 68.2439 3.62384 69.717 4.73427 70.8031C5.84471 71.8893 7.35078 72.4995 8.92117 72.4995H38.527M68.2316 55.1246V74.43M78.0015 64.6808H58.2643"
                    stroke={strokeColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_2"
                    d="M38.7145 35.1431C44.632 35.1431 49.429 31.1456 49.429 26.2144C49.429 21.2832 44.632 17.2856 38.7145 17.2856C32.797 17.2856 28 21.2832 28 26.2144C28 31.1456 32.797 35.1431 38.7145 35.1431Z"
                    stroke={strokeColor}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_3"
                    d="M56.5714 53.0011C56.5714 43.1392 48.5753 35.1436 38.7139 35.1436C28.8526 35.1436 20.8564 43.1392 20.8564 53.0011"
                    stroke={strokeColor}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    )
}

UserWithPlus.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 78,
    width: 82,
    children: null
};

UserWithPlus.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default UserWithPlus;
