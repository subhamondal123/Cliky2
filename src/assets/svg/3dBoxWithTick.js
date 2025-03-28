import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function ThreeDBoxWithTick({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                id="Vector"
                d="M34.8576 38.0659L37.0627 40.2257L41.6257 35.6809M3.70247 14.2393L22.9806 25.7362L42.1277 14.3067M22.9808 46.1205V25.714M46.997 37.7959C47.0407 39.4833 46.604 41.0808 45.818 42.4532C45.3814 43.2632 44.7919 44.0057 44.1369 44.6132C42.6305 46.0531 40.6437 46.9306 38.4386 46.998C35.2511 47.0655 32.4347 45.3781 30.8846 42.7908C30.0549 41.4633 29.5528 39.8659 29.531 38.1785C29.4655 35.3436 30.6881 32.7787 32.653 31.0913C34.1376 29.8313 36.0152 29.0439 38.0675 28.9989C42.8925 28.8864 46.8878 32.8237 46.997 37.7959ZM43.9621 18.1317V30.8662C43.9621 30.9787 43.9622 31.0686 43.9404 31.1811C42.4121 29.8087 40.4471 28.9988 38.2639 28.9988C36.2116 28.9988 34.3122 29.7413 32.8057 30.9787C30.7971 32.6211 29.5308 35.1635 29.5308 37.9984C29.5308 39.6858 29.9893 41.2832 30.7971 42.6331C30.9936 42.9931 31.2338 43.3306 31.4958 43.6456L27.5004 45.918C25.0115 47.358 20.9506 47.358 18.4617 45.918L6.80313 39.2583C4.16138 37.7509 2 33.9711 2 30.8662V18.1317C2 15.0269 4.16138 11.2471 6.80313 9.73969L18.4617 3.07995C20.9506 1.64002 25.0115 1.64002 27.5004 3.07995L39.159 9.73969C41.8008 11.2471 43.9621 15.0269 43.9621 18.1317Z"
                stroke={strokeColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>

    )
}

ThreeDBoxWithTick.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 49,
    width: 49,
    children: null
};

ThreeDBoxWithTick.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default ThreeDBoxWithTick;
