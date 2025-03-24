import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import styles from './style';
import LottieViewLoad from '../lottieViewLoad';

function NoDataFound({
    isHidden,
    type,
    autoPlay,
    loop
}) {
    if (isHidden) return null;

    return (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
            <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} />
        </View>
    )
}

NoDataFound.defaultProps = {
    type: "searchNoData",
    isHidden: false,
    autoPlay: true,
    loop: true
};

NoDataFound.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool
};


export default NoDataFound;