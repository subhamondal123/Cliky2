import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    mainView: {
        marginTop: 30
    },

    marginSec: {
        marginHorizontal: '2%',
        flexDirection: 'row',
        // alignItems: 'center',
    },

    userImg: {
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 100
    },

    nameSec: {
        marginLeft: '3%',
        flex: 1,
        flexDirection: 'column'
    },

    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
       
    },

    addressText: {
        color: "#747C90",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        top: -4
    },

    zoneText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        marginLeft: '5%'
    },

    dealerText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    increaseBox: {
        borderRadius: 8,
        borderColor: "#149CE0",
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        height: 30,
    },

    demandIncreaseText: {
        color: "#149CE0",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },





});

export default styles;