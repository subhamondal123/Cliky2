import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import LottieView from 'lottie-react-native';

function LottieViewLoad({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width
}) {
    if (isHidden) return null;

    // main container style
    const container = { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 };

    // for view the loading
    const LoadingView = () => {
        if (type == "steps") {
            return (<LottieView source={require('./animations/step-loader.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "study") {
            return (<LottieView source={require('./animations/study-loader-for-apps.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "tinkoff") {
            return (<LottieView source={require('./animations/tinkoff-loader.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "plant") {
            return (<LottieView source={require('./animations/plant-app-loader-flower-opening-animation.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "runningSheep") {
            return (<LottieView source={require('./animations/running-sheep-with-chart-loader.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "taskComplete") {
            return (<LottieView source={require('./animations/task-completed.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "noDataFound") {
            return (<LottieView source={require('./animations/no-data-found.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "noData") {
            return (<LottieView source={require('./animations/no-data.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "searchNoData") {
            return (<LottieView source={require('./animations/no-data-search.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "checkTarkis") {
            return (<LottieView source={require('./animations/check-tarkis.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "networkError") {
            return (<LottieView source={require('./animations/network-error.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "handDiraction") {
            return (<LottieView source={require('./animations/hand-direction.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "nextAction") {
            return (<LottieView source={require('./animations/next-action.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "download") {
            return (<LottieView source={require('./animations/download.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "leftYellowArrow") {
            return (<LottieView source={require('./animations/left-yellow-arrow.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "rightYellowArrow") {
            return (<LottieView source={require('./animations/right-yellow-arrow.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "fingerprint") {
            return (<LottieView source={require('./animations/fingerprint.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "cyclePoint") {
            return (<LottieView source={require('./animations/cycle-point.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "circleLoader") {
            return (<LottieView source={require('./animations/circle-loader.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "updateAvailable") {
            return (<LottieView source={require('./animations/update_available.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "Gpay_Tick") {
            return (<LottieView source={require('./animations/Gpay Tick.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        }
    }

    return (
        <>
            {LoadingView()}
        </>
    )
}

LottieViewLoad.defaultProps = {
    type: "steps",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height: 100,
    width: 100
};

LottieViewLoad.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
};


export default LottieViewLoad;