import React from "react";
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg";

function Menu({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 56 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G id="calendar">
          <Path
            id="Vector"
            d="M18.3994 4.34985V10.8747"
            stroke={strokeColor}
            strokeWidth={3}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            d="M36.8003 4.34985V10.8747"
            stroke={strokeColor}
            strokeWidth={3}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_3"
            d="M8.05078 19.7705H47.1508"
            stroke={strokeColor}
            strokeWidth={3}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_4"
            d="M48.3009 18.4873V36.9743C48.3009 43.4992 44.8509 47.8491 36.8009 47.8491H18.4009C10.3509 47.8491 6.90088 43.4992 6.90088 36.9743V18.4873C6.90088 11.9624 10.3509 7.61255 18.4009 7.61255H36.8009C44.8509 7.61255 48.3009 11.9624 48.3009 18.4873Z"
            stroke={strokeColor}
            strokeWidth={3}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_5"
            d="M36.0978 29.7969H36.1185"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_6"
            d="M36.0978 36.3218H36.1185"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_7"
            d="M27.5905 29.7969H27.6112"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_8"
            d="M27.5905 36.3218H27.6112"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_9"
            d="M19.0768 29.7969H19.0975"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_10"
            d="M19.0768 36.3218H19.0975"
            stroke={strokeColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    )
}


Menu.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 56,
    width: 56
};

Menu.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};


export default Menu;