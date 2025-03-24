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

function ActivityProgress({
    data,
    isHidden,
    isDisabled
}) {
    if (isHidden) return null;

    var resData = [];

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let color = "#54daa8";
            if (data[i].color) {
                color = data[i].color;
            }
            resData.push(
                <View style={styles.mainView} key={i}>
                    <View style={styles.processMainView}>
                        <View style={[styles.shadowView, { backgroundColor: color }]}>
                            <View style={[styles.dotView, { backgroundColor: color }]} />
                        </View>
                        {i + 1 == data.length ?
                            null :
                            <View style={[styles.processLine, { borderColor: color }]} />
                        }
                    </View>
                    <View style={styles.detailsMainView}>
                        <Text style={styles.titleText}>{data[i].title}</Text>
                        <View style={[styles.mainBox, { backgroundColor: color }]}>
                            <View style={styles.textFlexView}>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.WHITE_CALENDER_LOGO} style={styles.iconImg} />
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.headerText}>Date</Text>
                                    <Text style={styles.textVisites}>{DateConvert.viewDateFormat(data[i].eventTime)}</Text>
                                </View>
                            </View>
                            <View style={styles.textFlexView}>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.WHITE_CLOCK_LOGO} style={styles.iconImg} />
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.headerText}>Time</Text>
                                    <Text style={styles.textVisites}>{DateConvert.viewTimeFormat(data[i].eventTime)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 20 }} />
                    </View>
                </View>
            )
        }
    }

    return resData;
}

ActivityProgress.defaultProps = {
    data: [],
    isHidden: false,
    isDisabled: false,
};

ActivityProgress.propTypes = {
    data: PropTypes.array,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
};


export default ActivityProgress;