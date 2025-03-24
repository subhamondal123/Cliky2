import { PropTypes } from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import LottieViewLoad from '../lottieViewLoad';

function Loader({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width,
    backgroundColor,
    loaderColor,
    showMessage
}) {
    if (isHidden) return null;

    const container = { justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, zIndex: 1 };
    let loaderSize = "small";
    if (height >= 100) {
        loaderSize = "large";
    }
    if (type == "normal") {
        return (<ActivityIndicator size={loaderSize} color={loaderColor} />);
    } else {
        return (
            <View style={[StyleSheet.absoluteFillObject, container]}>
                <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} height={height} width={width} />
            </View>
        )
    }
}


Loader.defaultProps = {
    type: "circleLoader",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height: 120,
    width: 120,
    backgroundColor: "#fff",
    loaderColor: "#1F2B4D",
    showMessage:false
};

Loader.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
    loaderColor: PropTypes.string,
    showMessage: PropTypes.bool,
};



export default Loader;