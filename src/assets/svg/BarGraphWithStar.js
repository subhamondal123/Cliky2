import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function BarGraphWithStar({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 64 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G id="Frame 4448">
                <Path
                    id="Vector"
                    d="M22.0137 39.0756H8.00112C4.7005 39.0756 2 41.7761 2 45.0767V63.08H22.0137V39.0756Z"
                    stroke={strokeColor}
                    strokeWidth={3.9}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_2"
                    d="M35.997 27.0732H27.9855C24.6849 27.0732 21.9844 29.7737 21.9844 33.0744V63.08H41.9981V33.0744C41.9981 29.7737 39.3276 27.0732 35.997 27.0732Z"
                    stroke={strokeColor}
                    strokeWidth={3.9}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_3"
                    d="M56.0107 48.0771H41.998V63.0799H62.0118V54.0783C62.0118 50.7777 59.3113 48.0771 56.0107 48.0771Z"
                    stroke={strokeColor}
                    strokeWidth={3.9}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    id="Vector_4"
                    d="M33.5666 3.27904L35.1569 6.45963C35.3669 6.90971 35.937 7.32978 36.4171 7.3898L39.2976 7.8699C41.128 8.16995 41.5781 9.52015 40.2578 10.8104L38.0074 13.0608C37.6173 13.4509 37.4073 14.171 37.5273 14.6811L38.1574 17.4417C38.6675 19.6321 37.4973 20.4723 35.5769 19.3321L32.8764 17.7418C32.3964 17.4417 31.5862 17.4417 31.1061 17.7418L28.4056 19.3321C26.4852 20.4723 25.315 19.6321 25.8251 17.4417L26.4552 14.6811C26.5753 14.171 26.3652 13.4209 25.9752 13.0608L23.7547 10.8404C22.4345 9.52017 22.8546 8.1999 24.7149 7.89984L27.5955 7.41983C28.0755 7.32981 28.6457 6.90974 28.8557 6.48966L30.446 3.30899C31.3161 1.56866 32.6964 1.56872 33.5666 3.27904Z"
                    stroke={strokeColor}
                    strokeWidth={3.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    )
}

BarGraphWithStar.defaultProps = {
    strokeColor: "#1F2B4D",
    height: 66,
    width: 64,
    children: null
};

BarGraphWithStar.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default BarGraphWithStar;
