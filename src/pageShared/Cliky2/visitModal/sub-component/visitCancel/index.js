
import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Image, View, Text, ScrollView, } from "react-native";
import { Color, ImageName } from "../../../../../enums";
import { BigTextButton, TextInputBox } from "../../../../../shared";
import SvgComponent from "../../../../../assets/svg";

function VisitCancel({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onSubmitCancelVisitData

}) {
    if (isHidden) return null;


    const arrData = [
        {
            id: 1,
            type: false
        },
        {
            id: 2,
            type: true
        },
        {
            id: 3,
            type: false
        },
        {
            id: 4,
            type: true
        },
        {
            id: 1,
            type: false
        },
        {
            id: 2,
            type: true
        },
        {
            id: 3,
            type: false
        },
        {
            id: 4,
            type: true
        },
        {
            id: 1,
            type: false
        },
        {
            id: 2,
            type: true
        },
        {
            id: 3,
            type: false
        },
        {
            id: 4,
            type: true
        },

    ]

    const onCancelVisit = () => {
        onSubmitCancelVisitData(data)
    }

    return (
        <React.Fragment>
            <View style={styles.redCrossIcon}>
                <View style={{ height: 65, width: 65, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.RED.AMARANTH }}>
                    <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={35} width={35} />
                </View>
                <Text style={styles.namePText}>Visit Cancel</Text>
                <View style={styles.timeSec}>
                    <SvgComponent svgName={"clock"} strokeColor={"#F13748"} height={20} width={20} />
                    <Text style={styles.dText}>at <Text style={styles.namePText}>10:30</Text> am.</Text>
                </View>
            </View>

            <View style={{ height: 250 }}>
                <ScrollView>
                    {arrData.map((item, key) => (
                        <View style={styles.greaySec} key={key}>
                            <View style={styles.greayBox}>
                                <View style={item.type ? styles.hafCircleGreay : styles.hafCircleGreen}>
                                    {item.type ?
                                        null :
                                        <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                    }

                                </View>
                                <View style={styles.boxTextSec}>
                                    <Text style={styles.reasonText}>Select Reason to Cancelled  Visit</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 20 }}>
                <TextInputBox
                    placeholder={"Add Detail Note of Address"}
                    placeholderTextColor={"#747C90"}
                    // maxLength={8}
                    height={75}
                    maxLength={8}
                />
            </View>
            <View style={{ marginTop: 20, marginHorizontal: '30%' }}>
                <BigTextButton
                    text={"Cancel"}
                    backgroundColor={"#F13748"}
                    additionalStyles={styles.CancleButtonStyle}
                    borderRadius={26}
                    height={35}
                    fontColor={Color.COLOR.WHITE.PURE_WHITE}
                    fontSize={12}
                    onPress={() => onCancelVisit()}
                />
            </View>
        </React.Fragment >
    )
}

VisitCancel.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onSubmitCancelVisitData: () => { }
}

VisitCancel.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onSubmitCancelVisitData: PropTypes.func,
}

export default VisitCancel;