import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Home({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M30.0371 46.185V38.0739M21.98 5.22403L7.40704 16.5796C4.97371 18.4722 3 22.5007 3 25.5559V45.5904C3 51.863 8.11001 57 14.3826 57H45.6915C51.9641 57 57.0741 51.863 57.0741 45.6174V25.9344C57.0741 22.6629 54.8841 18.4722 52.2075 16.6066L35.4986 4.89958C31.7134 2.24995 25.63 2.38513 21.98 5.22403Z"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Home.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Home.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Home;
