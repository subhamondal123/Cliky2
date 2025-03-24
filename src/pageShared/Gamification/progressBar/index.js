import React, { useEffect, useRef } from 'react'
import styles from './style';
import { Animated, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';

function ProgressBar({
    isHidden,
    data,
    props,
    progress,
    height,
    borderRadius,
    primaryBackgroundColor,
    activeBorderRadius,
    activeBackgroundColor,
    primaryFontColor,
    activeFontColor,
    primaryFontSize,
    activeFontSize,
    color
}) {
    if (isHidden) return null;

    const animation = useRef(new Animated.Value(0)).current;

    //   const width = animation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0%', '100%'],
    //   });


    return (
        <View style={[styles.container, { height: height, borderRadius: borderRadius }]}>
            <View style={[styles.activeSec,{ height: height, borderRadius: activeBorderRadius,width:data.mainPercent == undefined || data.mainPercent == null ? "100" : data.mainPercent  + "%" ,backgroundColor:activeBackgroundColor}]}>
                <Text style={[styles.percentageTxt,{color:activeFontColor,fontSize:activeFontSize}]}>{data.activeLabel + " "} {data.mainPercent}%</Text>
            </View>
            <View style={[styles.remainingSec]}>
                <Text style={[styles.percentageTxt,{color:primaryFontColor,fontSize:primaryFontSize}]}>{data.primaryLabel + " "} {100 - data.mainPercent}%</Text>
            </View>

        </View>
    )
}

ProgressBar.defaultProps = {
    isHidden: false,
    data: {},
    height:10,
    borderRadius:20,
    activeBorderRadius:20,
    primaryBackgroundColor:"#F0F4F7",
    activeBackgroundColor:"#F13748",
    primaryFontColor:"#000000",
    activeFontColor:"#000000",
    primaryFontSize:10,
    activeFontSize:10
};

ProgressBar.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    height:PropTypes.number,
    borderRadius: PropTypes.number,
    activeBorderRadius:PropTypes.number,
    primaryBackgroundColor:PropTypes.string,
    activeBackgroundColor:PropTypes.string,
    primaryFontColor:PropTypes.string,
    primaryFontSize:PropTypes.number,
    activeFontSize:PropTypes.number,
};

export default ProgressBar