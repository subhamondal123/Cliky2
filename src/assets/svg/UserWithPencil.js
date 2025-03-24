import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function UserWithPencil({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 5208">
                <G id="vuesax/linear/user-edit">
                    <G id="user-edit">
                        <Path
                            id="Vector"
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke={strokeColor}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <G id="Group">
                            <Path
                                id="Vector_2"
                                d="M19.21 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.82 15.13 19.21 15.74Z"
                                stroke={strokeColor}
                                strokeWidth={1.5}
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                id="Vector_3"
                                d="M18.7 16.25C19 17.33 19.84 18.17 20.92 18.47"
                                stroke={strokeColor}
                                strokeWidth={1.5}
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </G>
                        <Path
                            id="Vector_4"
                            d="M3.40997 22C3.40997 18.13 7.26 15 12 15C13.04 15 14.04 15.15 14.97 15.43"
                            stroke={strokeColor}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </G>
                </G>
            </G>
        </Svg>

    )
}

UserWithPencil.defaultProps = {
    strokeColor: "#F13748",
    height: 24,
    width: 24,
    children: null
};

UserWithPencil.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default UserWithPencil;
