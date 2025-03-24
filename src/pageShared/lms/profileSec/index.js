import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { View, Image, Text, SafeAreaView, } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';

function ProfileSec({
    type,
    data,
    isHidden,
    props,


}) {
    if (isHidden) return null;

    const activePointSec = () => {
        return (
            <View style={{ marginTop: 15, flexDirection: "row", alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignItems: "center", flexDirection: "row", paddingHorizontal: 14, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#fff"} height={11} width={11} />
                    <View style={{ width: 5 }} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <View style={{ width: 5 }} />
                    <Text style={{ color: "#F13748", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignItems: "center", flexDirection: "row", paddingHorizontal: 14, paddingVertical: 5 }}>
                    <SvgComponent svgName={"locationWithBGColor"} strokeColor={"#F13748"} height={11} width={11} />
                    <View style={{ width: 5 }} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Kolkata </Text>
                    <View style={{ width: 5 }} />
                    <Text style={{ color: "#fff", fontSize: 11, fontFamily: FontFamily.FONTS.INTER.BOLD, marginRight: 5 }}>Zone 2</Text>
                    <View style={{ width: 5 }} />
                    <SvgComponent svgName={"downArrow"} strokeColor={"#fff"} height={11} width={11} />
                </View>
            </View>
        )
    }

    return (
        <View>
            <React.Fragment>
                <View style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 150 }}>
                    <View style={{ marginHorizontal: 10, marginVertical: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderRadius: 100, borderColor: Color.COLOR.WHITE.PURE_WHITE, borderWidth: 1, height: 62, width: 62, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImageName.USER_IMG} style={{ height: 60, width: 60, resizeMode: 'contain', borderRadius: 100 }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: '5%' }}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>For</Text>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Super Trader</Text>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Dealer</Text>
                            </View>
                            <View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    {/* <SvgComponent svgName={"lmsFilter"} strokeColor={"#fff"} height={25} width={25} /> */}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Sales As</Text>
                                    <View style={{ width: 15 }} />
                                    <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 22, width: 22, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {activePointSec()}
                    </View>
                </View>
            </React.Fragment >
        </View >
    );

}

ProfileSec.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
};

ProfileSec.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default ProfileSec;