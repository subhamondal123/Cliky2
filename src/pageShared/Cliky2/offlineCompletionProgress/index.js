import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import { BottomModal } from "../../../shared";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Color, FontFamily, FontSize } from '../../../enums';
import { offlineDataFetch, routeFilter, visitNotesData } from './function';

const bar = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.6
};

let countupTimer;

function OfflineCompletionProgress({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    props
}) {
    if (isHidden) return null;
    const [progressValue, setProgressValue] = useState(0);
    const [fakeProgress, setFakeProgress] = useState(true);

    // for api call
    useEffect(() => {
        onFetchData();
    }, [])


    // Function to start the count-up timer using setInterval
    const startCountupTimer = () => {
        return setInterval(() => {
            setProgressValue(progressValue => progressValue < 50 ? progressValue + 1 : progressValue);
        }, 650);
    };

    // call for interval count 
    useEffect(() => {
        countupTimer = startCountupTimer();
        // Create a function to decrement the countdown by 1 second
        if (fakeProgress) {
            if (progressValue < 50) {
                setTimeout(() => {
                    clearInterval(countupTimer);
                }, 50000);
            }
        }
        if (fakeProgress) {
            return () => clearInterval(countupTimer);
        }
    }, [progressValue])

    // for offline data fetch
    const onFetchData = async () => {
        let data = await offlineDataFetch(props);
        setProgressValue(80);
        await visitNotesData(props);
        setProgressValue(90);
        await routeFilter(props);
        if (data) {
            setFakeProgress(false);
            setProgressValue(100);
            onCloseModal();
        }
    }

    return (
        <BottomModal
            isVisible={isVisible}
            children={
                <View style={styles.modalview}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                        <CircularProgressBase
                            {...bar}
                            value={progressValue}
                            // startInPausedState={true}
                            radius={70}
                            activeStrokeColor={Color.COLOR.RED.AMARANTH}
                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_COLOR}
                            clockwise={true}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>{progressValue}%</Text>
                            </View>
                        </CircularProgressBase>
                        <View style={{ marginBottom: 60 }} />
                    </View>
                </View>

            }
        />

    )
}

OfflineCompletionProgress.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onCloseModal: () => { },
    props: {}
}

OfflineCompletionProgress.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onCloseModal: PropTypes.func,
    props: PropTypes.instanceOf(Object)
}

export default OfflineCompletionProgress;