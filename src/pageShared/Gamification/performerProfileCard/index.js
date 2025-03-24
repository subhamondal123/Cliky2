import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Color, ImageName } from '../../../enums';
import { App_uri } from '../../../services/config';


function PerfomerProfileCard({
    type,
    data,
    isHidden,
    onLikePress,
    onSelectTab,
    props,
}) {
    if (isHidden) return null;

    const onPressLike = (value) => {
        onLikePress(value)
    }

    const onSelectMainTab = (value) => {
        onSelectTab(value)
    }

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.mainBox} activeOpacity={0.9} onPress={() => onSelectMainTab(data)}>
                <View style={styles.profileSec}>
                    <Image source={data.profilePic.length > 0 ? {uri:data.profilePic} : ImageName.DUMMY_PROFILE} style={styles.profileImg} />
                </View>
                <Text style={styles.profileNameTxt}>{data.name}</Text>
                {/* <Text style={styles.profileNameTxt}>samuel jones pathak singh tintin</Text> */}
                {/* <View style={{ marginTop: 5 }}>
                    <Text style={styles.profileNameTxt}>{data.district}</Text>
                </View>
                <Text style={styles.zoneTxt}>{data.zone}</Text> */}
                <View style={{ marginTop: 5 }}>
                    <View style={{ alignSelf: "center", justifyContent: "flex-end", top: 5 }}>
                        <Text style={styles.achievementPercentageTxt}>{data.achievementPercentage}%</Text>
                    </View>
                    <Text style={styles.prcntTxt}>in {data.timeRange}</Text>
                    <TouchableOpacity style={[styles.likedSec,{backgroundColor:data.thanksChecking == "1" ? Color.COLOR.BLUE.BABY_BLUE : Color.COLOR.RED.AMARANTH}]}
                        activeOpacity={0.9}
                        onPress={() => onPressLike(data)}
                        disabled={data.thanksChecking == 0 ? false : true}
                    >
                        <Image source={ImageName.WHITE_THUMB_ICON} style={styles.thumbImg} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </SafeAreaView >
    );

}

PerfomerProfileCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onLikePress:() => {},
    onSelectTab:() => {}

};

PerfomerProfileCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onLikePress:PropTypes.func,
    onSelectTab:PropTypes.func,

};


export default PerfomerProfileCard;