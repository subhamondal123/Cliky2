import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    mainView: {
        marginHorizontal: 5,
        marginTop: 20
    },

    marginSec: {
        marginHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },

    userImg: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 100
    },

    nameSec: {
        marginLeft: 15,
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
    orderCycleSec: {
        borderTopWidth: 0.8,
        borderTopColor: '#F0F4F7',
        borderBottomColor: '#F0F4F7',
        borderBottomWidth: 0.8,
        alignItems: 'center',
        // padding: 4
    },
    aidTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    blackDropDown: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        top: 3
    },

    orderAmount: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 90,
        borderRadius: 8,
        justifyContent: 'center',
    },
    dateText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    orderValue:{
        color:"#747C90",
        fontSize: 13,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    mainTab: {
        borderRadius: 25,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_TINTS,
    },
    ActiveMainTab: {
        borderRadius: 25,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
    
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    titleTxt: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: 12,
      color: "#1F2B4D"
    },
    activeTitleTxt: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: 12,
      color: Color.COLOR.WHITE.PURE_WHITE
    },

});

export default styles;