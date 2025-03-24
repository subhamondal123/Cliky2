import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    mainView: {
        marginHorizontal: 5,
        marginTop: 20
    },

    marginSec: {
        marginHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    userImg: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 100
    },

    nameSec: {
        marginLeft: '2%',
        flex: 1,
        flexDirection: 'column'
    },

    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    addressText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT
    },

    zoneText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        marginLeft: '5%'
    },

    dealerText: {
        color: "#1F2B4D",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    increaseBox: {
        borderRadius: 8,
        borderColor: "#604D8B",
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        height: 30,
        marginLeft:5

    },

    demandIncreaseText: {
        color: "#604D8B",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    orderCycleSec: {
        marginTop: 15,
       
        borderTopWidth: 0.8,
        borderTopColor: '#F0F4F7',
        borderBottomColor: '#F0F4F7',
        borderBottomWidth: 0.8,
        alignItems: 'center',
        // padding: 4
    },

    avgOrderText: {
        color: "#5F5F5F",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    orderValue: {
        color: "#F13748",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    orderCycleText: {
        color: "#5F5F5F",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: '5%'
    },

    orderCycleValue: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    dateText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    blackDropDown: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginLeft: '5%'
    },
    stockTotalValue:{
        marginLeft:10,
        color: "#747C90",
        fontSize:11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    stockCurrentValue:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize:11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    percentageTxt:{
        top:5,
        color: "#00B65E",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    percentageBottomTxt:{
        top:-3,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    }


});

export default styles;