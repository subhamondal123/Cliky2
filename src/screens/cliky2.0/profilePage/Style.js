
import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    backgroundImg: {
        justifyContent: "center",
        height: 150,
        width: Dimension.width,
        resizeMode: 'cover',

    },
    backImg: {
        height: 28,
        width: 28,
        // marginLeft: '3%',
        // top: -25,
        resizeMode: 'contain',
    },

    profileSec: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500
    },
    profileImg: {
        height: 130,
        width: 130,
        resizeMode: 'cover',
        borderRadius: 500,
    },
    profileCameraView: {
        height: 35,
        width: 35,
        backgroundColor: Color.COLOR.GRAY.ROUND_CAMEO,
        justifyContent: 'center',
        borderRadius: 500,
        top: 40,
        left: 45
    },
    profileCamera: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    profileUnselectCameraView: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        borderRadius: 18,
        top: 50,
        left: 40
    },
    profileView: {
        marginTop: '15%',
        alignSelf: 'center',
        marginRight: '5%',
        marginLeft: '5%',
        justifyContent: "center",
        alignItems: 'center'
    },
    profileName: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: 16,
        marginTop: 15
    },
    editProfileName: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontSize: 12,
        marginBottom: 3,
        textAlign: 'center'
    },
    mainView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        marginTop: '5%'
    },
    textInputView: {
        marginTop: 25,
        marginHorizontal: 15
    },
    detailsMainView: {
        flexDirection: 'row',
        alignItems:"center",
        marginBottom: 10,
        marginLeft:10
    },
    headerText: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        color: Color.COLOR.BLUE.LOTUS_BLUE
    },
    subTextName: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        color: "#747C90"
    },

    textShowMore: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textDecorationLine: 'underline',
        alignItems: 'center'
    },

    modalstatusview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height / 1.5,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
    },
    //.............................

    profileHead: {
        width: Dimension.width,
        flexDirection: "row"

    },
    locationTxt:{
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    }

});

export default styles;