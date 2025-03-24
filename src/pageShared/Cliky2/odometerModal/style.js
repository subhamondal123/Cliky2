import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../../enums';


const styles = StyleSheet.create({
    //modal
    odometermodalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: 0,
        position: 'absolute',
        // marginHorizontal: "10%"
    },

    crossImgSec: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        justifyContent: 'center',
        alignItems: "center"
        // alignSelf: 'flex-end',
    },
    redCrossImg: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    dateTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 5
    },
    totalKMSec: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    totalKmTxt: {
        top: 15,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 40,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    KmTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 20,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: 10
    },
    totalOdometerTillDate: {
        flexDirection: "row"
    },
    OdoDate: {
        color: "#5F5F5F",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    totalOdoDate: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 10
    },
    mainDate: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    takePhotoTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    profileUploadImg: {
        height: 95,
        width: 80,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 15
    },
    networkNotAvailableError: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        textAlign: "center"
    }
})

export default styles;