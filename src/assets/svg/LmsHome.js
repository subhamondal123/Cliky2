
import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LmsHome({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="akar-icons:home">
                <Path
                    id="Vector"
                    d="M68.75 62.4998V38.0435C68.7502 36.3421 68.403 34.6584 67.7297 33.0958C67.0564 31.5332 66.0712 30.1245 64.8344 28.956L41.7937 7.18105C40.6333 6.08395 39.0969 5.47266 37.5 5.47266C35.9031 5.47266 34.3667 6.08395 33.2062 7.18105L10.1656 28.956C8.92882 30.1245 7.9436 31.5332 7.27031 33.0958C6.59701 34.6584 6.24982 36.3421 6.25 38.0435V62.4998C6.25 64.1574 6.90848 65.7471 8.08058 66.9192C9.25268 68.0913 10.8424 68.7498 12.5 68.7498H62.5C64.1576 68.7498 65.7473 68.0913 66.9194 66.9192C68.0915 65.7471 68.75 64.1574 68.75 62.4998Z"
                    stroke={strokeColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    )
}

LmsHome.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 75,
    width: 75
};

LmsHome.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default LmsHome;
