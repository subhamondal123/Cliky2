import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Rect } from "react-native-svg";

function Suggested({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 57 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M19.277 4.719v33.748m18.614-26.946v34.735M3 14.532v25.26c0 4.932 3.505 6.956 7.762 4.516l6.1-3.478c1.325-.753 3.531-.831 4.907-.13l13.63 6.827c1.375.675 3.582.623 4.906-.13l11.24-6.438c1.429-.83 2.623-2.855 2.623-4.517v-25.26c0-4.932-3.505-6.956-7.762-4.516l-6.101 3.479c-1.324.752-3.53.83-4.907.13L21.77 3.472c-1.376-.675-3.582-.623-4.906.13L5.622 10.04C4.168 10.87 3 12.896 3 14.53z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


Suggested.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Suggested.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Suggested;