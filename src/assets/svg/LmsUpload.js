import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function LmsUpload({
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
        <G id="Frame 5210">
          <G id="vuesax/linear/send-square">
            <G id="send-square">
              <Path
                id="Vector"
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <G id="Group">
                <Path
                  id="Vector_2"
                  d="M9 9.50977L12 6.50977L15 9.50977"
                  stroke={strokeColor}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  id="Vector_3"
                  d="M12 6.50977V14.5098"
                  stroke={strokeColor}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </G>
              <Path
                id="Vector_4"
                d="M6 16.5098C9.89 17.8098 14.11 17.8098 18 16.5098"
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

LmsUpload.defaultProps = {
    strokeColor: "#F13748",
    height: 24,
    width: 24,
    children: null
};

LmsUpload.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default LmsUpload;
