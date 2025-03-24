
import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Image, View, Text, } from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { BigTextButton, TextInputBox } from "../../../../../shared";
import SvgComponent from "../../../../../assets/svg";

function VisitReschedule({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onVisitReschedule

}) {
    if (isHidden) return null;

    const onReschedule = () => {
        onVisitReschedule(data)
    }

    return (
        <React.Fragment>
            <View style={{ justifyContent: 'center', marginHorizontal: '5%' }}>
                <View style={styles.redCrossIcon}>
                    <View style={{ height: 65, width: 65, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f38119" }}>
                        <SvgComponent svgName={"refresh"} strokeColor={"#fff"} height={50} width={50} />
                    </View>
                    <Text style={styles.namePText}>Visit Reschedule</Text>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginLeft: '2%' }}>
                    <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
                    <View style={{ width: 10 }} />
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Select next Schedule Date</Text>
                </View>
                <View style={{ marginTop: 25 }}>
                    <TextInputBox
                        placeholder={"Add Detail Note of Address"}
                        placeholderTextColor={"#747C90"}
                        height={90}
                        alignItems={"flex-start"}
                    />
                </View>
                <View style={{ marginTop: 20, marginHorizontal: '25%' }}>
                    <BigTextButton
                        text={"Submit"}
                        backgroundColor={"#F13748"}
                        borderRadius={26}
                        height={40}
                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                        fontSize={12}
                        onPress={() => onReschedule()}
                    />
                </View>
            </View>
        </React.Fragment>
    )
}

VisitReschedule.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onVisitReschedule: () => { }
}

VisitReschedule.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onVisitReschedule: PropTypes.func
}

export default VisitReschedule;