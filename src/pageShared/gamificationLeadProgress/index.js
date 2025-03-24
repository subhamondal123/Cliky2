//1. this is used for activity process bar with data


import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    View,
    Image,
    Text
} from 'react-native';
import {
    ImageName
} from '../../enums';
import { DateConvert } from '../../services/common-view-function';

function GamificationLeadProgress({
    data,
    isHidden,
    isDisabled
}) {
    if (isHidden) return null;

    var resData = [];

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let color = "#604D8B";
            if (data[i].color) {
                color = data[i].color;
            }
            resData.push(
                <View style={styles.mainView} key={i}>
                    <View style={styles.processMainView}>
                        <View style={[styles.shadowView, { backgroundColor: color }]} />
                        {i + 1 == data.length ?
                            null :
                            <View style={[styles.processLine, { borderColor: color }]} />
                        }
                    </View>
                    <View style={styles.detailsMainView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleText}>{data[i].title}</Text>
                            {/* <Text style={styles.titleText}>{data[i].textBy}</Text> */}
                        </View>
                        <Text style={styles.textVisites}>{DateConvert.viewDateFormat(data[i].eventTime)}</Text>
                        <View style={{ height: 20 }} />
                    </View>
                </View>
            )
        }
    }

    return resData;
}

GamificationLeadProgress.defaultProps = {
    data: [],
    isHidden: false,
    isDisabled: false,
};

GamificationLeadProgress.propTypes = {
    data: PropTypes.array,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
};


export default GamificationLeadProgress;