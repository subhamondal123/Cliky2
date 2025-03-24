import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Circle, Polygon, Defs } from "react-native-svg"

function KalikaAppLogo({
    strokeColor,
    height,
    width,
    children
}) {
    return (
        // <Svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     xmlnsXlink="http://www.w3.org/1999/xlink"
        //     // xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
        //     xmlSpace="preserve"
        //     style={{
        //         shapeRendering: "geometricPrecision",
        //         textRendering: "geometricPrecision",
        //         imageRendering: "optimizeQuality",
        //         fillRule: "evenodd",
        //         clipRule: "evenodd",
        //     }}
        //     viewBox="6830.3 7912.22 8020 8020"
        // >
        //     <Defs></Defs>
        //     <G id="Layer_x0020_1">
        //         <G id="_1606761141808">
        //             <Circle className="fil0 str0" cx={10840.3} cy={11922.22} r={4000} />
        //             <G>
        //                 <Polygon
        //                     className="fil1"
        //                     points="9719.87,12431.37 11606.23,14760.85 13296.78,14754.57 11417.29,12431.37 13147.74,10227.06 11503.27,10226.32 "
        //                 />
        //                 <Polygon
        //                     className="fil2"
        //                     points="8383.83,11288.59 10081.3,11288.59 11811.65,9084.34 10167.18,9083.59 "
        //                 />
        //             </G>
        //         </G>
        //     </G>
        // </Svg>
        <Svg
        width={60}
        height={60}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M27 53C41.3594 53 53 41.3594 53 27C53 12.6406 41.3594 1 27 1C12.6406 1 1 12.6406 1 27C1 41.3594 12.6406 53 27 53Z"
          fill="white"
          stroke="#DBDBDB"
          strokeWidth={0.755906}
          strokeMiterlimit={22.9256}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.7168 30.3094L31.9781 45.451L42.9667 45.4102L30.75 30.3094L41.998 15.9814L31.3089 15.9766L19.7168 30.3094Z"
          fill="#0060AA"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.0322 22.8813H22.0658L33.3131 8.5537L22.624 8.54883L11.0322 22.8813Z"
          fill="#E31E24"
        />
      </Svg>
    )
}

KalikaAppLogo.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 71,
    width: 209,
    children: null
};

KalikaAppLogo.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default KalikaAppLogo;
