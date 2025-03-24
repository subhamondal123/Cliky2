import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Download({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M31.9275 0H13.0725C4.8825 0 0 4.8825 0 13.0725V31.905C0 40.1175 4.8825 45 13.0725 45H31.905C40.095 45 44.9775 40.1175 44.9775 31.9275V13.0725C45 4.8825 40.1175 0 31.9275 0ZM14.5575 20.205C15.21 19.5525 16.29 19.5525 16.9425 20.205L20.8125 24.075V10.1475C20.8125 9.225 21.5775 8.46 22.5 8.46C23.4225 8.46 24.1875 9.225 24.1875 10.1475V24.075L28.0575 20.205C28.71 19.5525 29.79 19.5525 30.4425 20.205C31.095 20.8575 31.095 21.9375 30.4425 22.59L23.6925 29.34C23.535 29.4975 23.355 29.61 23.1525 29.7C22.95 29.79 22.725 29.835 22.5 29.835C22.275 29.835 22.0725 29.79 21.8475 29.7C21.645 29.61 21.465 29.4975 21.3075 29.34L14.5575 22.59C13.905 21.9375 13.905 20.88 14.5575 20.205ZM36.54 34.245C32.0175 35.7525 27.27 36.5175 22.5 36.5175C17.73 36.5175 12.9825 35.7525 8.46 34.245C7.5825 33.9525 7.11 32.985 7.4025 32.1075C7.695 31.23 8.64 30.735 9.54 31.05C17.91 33.84 27.1125 33.84 35.4825 31.05C36.36 30.7575 37.3275 31.23 37.62 32.1075C37.89 33.0075 37.4175 33.9525 36.54 34.245Z"
                fill="#1F2B4D"
            />
        </Svg>
    )
}

Download.defaultProps = {
    strokeColor: "#292D32",
    height: 51,
    width: 81,
    children: null
};

Download.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default Download;
