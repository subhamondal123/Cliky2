// for progress bar

import { PropTypes } from 'prop-types';
import { Text, View, Animated, Dimensions } from 'react-native'
import React, { Component, useEffect } from 'react'
import styles from './style';

const { width } = Dimensions.get('screen');

function ProgressBar({
  data,
  isHidden,
  type,
  height,
  borderRadius,
  backgroundColor,
  isText,
  fontSize,
  activeFontColor,
  primaryFontColor,
  totalValue,
  mainValue,
  additionalStyle,
  actualWidth
}) {
  if (isHidden) return null;

  if (type == "shak") {
    return (
      <ShakProgressBar widthPct={data}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        isText={isText}
        fontSize={fontSize}
        activeFontColor={activeFontColor}
        primaryFontColor={primaryFontColor}
        totalValue={totalValue}
        mainValue={mainValue}
        additionalStyle={additionalStyle}
        actualWidth = {actualWidth}
      />
    )
  } else {
    return (
      <SmothProgressBar height={height} borderRadius={borderRadius} backgroundColor={backgroundColor} isText={isText} />
    )
  }
}

const ShakProgressBar = ({ widthPct, height, borderRadius, backgroundColor, activeFontColor, fontSize, primaryFontColor, mainValue, totalValue, additionalStyle,actualWidth }) => {

  const barWidth = React.useRef(new Animated.Value(0)).current;
  const finalWidth = (actualWidth * widthPct) / 10;

  useEffect(() => {
    Animated.spring(barWidth, {
      toValue: finalWidth,
      bounciness: 10,
      speed: 1,
      useNativeDriver: false,
      delay: widthPct * 100,
    }).start();
  }, []);

  return (
    <Animated.View style={[{
      backgroundColor: "#F0F4F7",
      borderRadius: borderRadius,
      flexDirection: "row",
      ...additionalStyle
    }]}>
      <Animated.View style={[{
        backgroundColor: backgroundColor,
        height: height,
        borderRadius: borderRadius,
      },
      { width: barWidth}, styles.mainView]} >
        <Text style={[styles.labelTxt, { color: activeFontColor, fontSize: fontSize }]}>{mainValue ? mainValue + "MT." : null} {widthPct < 1.8 ? "" : (widthPct * 10).toFixed(2) + "%"}</Text>
      </Animated.View>
      <View style={styles.mainView}>
        <Text style={[styles.labelTxt, { color: primaryFontColor, fontSize: widthPct > 6.4 ? 11 : fontSize }]}>{widthPct > 6.4 ? "" : (totalValue ? (totalValue - mainValue) + "MT." : null)} {widthPct > 6.4 ? "" : ((10 - widthPct) * 10).toFixed(2) + "%"}</Text>
      </View>
    </Animated.View>

  );
};

class SmothProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parcent: 0
    }
  }

  anim = new Animated.Value(0);


  componentDidMount() {
    // this.onAnimate();
  }

  onAnimate = () => {
    this.anim.addListener(({ value }) => {
      this.setState({ parcent: parseInt(value, 10) });
    });

    Animated.timing(this.anim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false
    }).start();

  }

  render() {
    return (
      <View>
        <Animated.View style={[styles.inner,
        { height: this.props.height, borderRadius: this.props.borderRadius, backgroundColor: this.props.backgroundColor },
        { width: `${this.state.parcent}%` }]} />
        {this.props.isText ?
          <Animated.Text style={styles.label}>
            {`${this.state.parcent}%`}
          </Animated.Text> :
          null
        }
      </View>
    )
  }
}

ProgressBar.defaultProps = {
  data: 10,
  type: "tick",
  isHidden: false,
  height: 10,
  borderRadius: 20,
  backgroundColor: "#005d83",
  isText: false,
  activeFontColor: "#000000",
  primaryFontColor: "#000000",
  totalValue: 0,
  mainValue: 0,
  additionalStyle: {},
  actualWidth:width
};

ProgressBar.propTypes = {
  data: PropTypes.number,
  type: PropTypes.string,
  isHidden: PropTypes.bool,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  isText: PropTypes.bool,
  activeFontColor: PropTypes.string,
  primaryFontColor: PropTypes.string,
  totalValue: PropTypes.number,
  mainValue: PropTypes.number,
  additionalStyle: PropTypes.instanceOf(Object),
  actualWidth:PropTypes.number,
};


export default ProgressBar;