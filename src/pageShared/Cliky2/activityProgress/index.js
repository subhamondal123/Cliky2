//1. this is used for activity process bar with data


import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Color,
    ImageName
} from '../../../enums';
import { DateConvert } from '../../../services/common-view-function';
import SvgComponent from '../../../assets/svg';

function ActivityProgress({
    data,
    isHidden,
    isDisabled
}) {
    if (isHidden) return null;

    const [progressData, setProgressData] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);

    useEffect(() => {
        setProgressData(data);
        setPageLoader(false);
    }, []);

    var resData = [];

    const loaderChange = async (type) => {
        setPageLoader(type);
    }

    const OnExpend = async (item, key) => {
        await loaderChange(true);
        progressData[key].check = !item.check;
        setProgressData(progressData);
        await loaderChange(false);
    }

    if (pageLoader) {
        resData = null;
    } else {
        if (progressData.length > 0) {
            for (let i = 0; i < progressData.length; i++) {
                let timePriodData = DateConvert.getTimePeriodSvgName(progressData[i].eventTime);
                resData.push(
                    <View style={styles.mainView} key={i}>
                        <View style={styles.detailsMainView}>
                            <View style={[styles.mainBox, { backgroundColor: "#F0F4F7" }]}>
                                <View style={[styles.textFlexLeftView, { backgroundColor: timePriodData.color }]}>
                                    <SvgComponent svgName={(timePriodData).iconName} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} />
                                    <Text style={styles.headerText}>{(progressData[i].eventTime)}</Text>
                                </View>
                                <View style={styles.textFlexRightView}>
                                    <Text style={styles.headerText}>{progressData[i].title}</Text>
                                    <Text style={styles.textVisites}>{progressData[i].description}</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => OnExpend(progressData[i], i)}>
                                    {/* <SvgComponent svgName={progressData[i].check ? "upArrow" : "downArrow"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {i + 1 == progressData.length ?
                            null :
                            <View style={[styles.processLine, { borderColor: Color.COLOR.BLUE.LOTUS_BLUE }]} />
                        }
                    </View>
                )
            }
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