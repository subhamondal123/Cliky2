import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../../enums';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    headerText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.EXTRA_LIGHT,
        marginTop: 8
    },
    subText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 8
    },
    underLine: {
        borderWidth: 0.8,
        borderColor: Color.COLOR.GRAY.SONIC_SILVER,
        marginTop: 8
    },

    cancelSec: {
        height: 25,
        width: 25,
        borderRadius: 14,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        top: -15,
        left: 1
    },
    cancelImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },
    profileImg: {
        height: 110,
        width: 110,
        resizeMode: 'cover',
        borderRadius: 55,
        borderColor: Color.COLOR.GRAY.TAPA,
        borderWidth: 1
    },
    textProfileName: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.SM
    },
    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },
    calenderImgSec: {
        borderStyle: 'solid',
        // height: 20,
        // width: 20,
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    datePickerTxt: {
        fontSize: 14,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    activeDatePickerTxt: {
        fontSize: 14,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    canlenderSec: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        height: 50,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between"
        // alignItems:"center"

    },

    selectionText: {
        marginLeft: 10,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    }
})

export default styles;