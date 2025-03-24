import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    welcomeScreen: {
        height: 410,
        width: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32
    },
    boxshadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#F0F4F7',
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#74FFBC',
        borderWidth: 1,
        paddingVertical: 10,

    },


    inActiveboxshadowColor: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#F0F4F7',
        marginTop: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row'
    },

    activeBoxshadowColor: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#F0F4F7',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row'
    },

    boxs: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#F0F4F7',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row'
    },

    boxshadowOpen: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#F13748',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionSec: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15
    },
    actionSecImg: {
        width: 25,
        height: 25,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleDropImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        borderRadius: 15
    },

    userSec: {
        justifyContent: 'center',
        width: 50,
        marginLeft: 10
    },
    userProfileImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    userTextSec: {
        marginLeft: 15,
        flex: 1
    },

    mSec: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 20
    },
    centerSec: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ratingText: {
        color: "#FFF",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 15

    },
    mSecImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#dbe0e7',
        borderRadius: 100,
        marginTop: 10
    },
    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    dgText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 8
    },
    kmText: {
        color: "#000000",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 5
    },
    fromText: {
        color: "#747C90",
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: 15
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 100,
        resizeMode: 'cover'
    },



    skipButtonView: {
        // marginHorizontal: "38%",
        marginTop: 15,
        flex: 1
    },

    buttonAdditionalStyle: {
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1
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
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
    },

    buttomTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    addUnplanSec: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    buttomSuggestTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginLeft: 10
    },
    addUnplanSuggestSec: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },

    // ==============================================================================


    dText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },

    userPImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        resizeMode: 'cover'
    },

    userPSec: {
        justifyContent: 'center',
        width: 35,
        marginLeft: 10
    },
    boxshadowPopup: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
    },
    namePText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginTop: 10
    },
    reasonText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: -21,
        position: 'absolute',
        // position: 'absolute',
    },
    crossIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    redCrossIcon: {
        alignItems: 'center',
        marginTop: '10%'
    },
    redCrossImg: {
        width: 60,
        height: 60,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    timeSec: {
        flexDirection: 'row',
        marginTop: 5
    },
    timeImg: {
        width: 20,
        height: 20,
        borderRadius: 20,
        resizeMode: 'contain',
        marginRight: 5
    },
    greaySec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    greayBox: {
        height: 40,
        backgroundColor: '#F0F4F7',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        flexDirection: 'row'
    },
    hafCircleGreay: {
        width: 40,
        height: 40,
        backgroundColor: '#D1D1D1',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20
    },
    boxTextSec: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10
    },
    hafCircleGreen: {
        width: 40,
        height: 40,
        backgroundColor: '#00B65E',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightImg: {
        width: 25,
        height: 25,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    CancleButtonStyle: {
    },
    routeNameTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    changeRouteTxt: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        textDecorationLine: "underline"
    },

    //--------------------

    listMainView: {
        // marginHorizontal: 5,

        backgroundColor: '#F0F4F7',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#00B65E",
        // flexDirection: "row",
        // alignItems:"center",
    },
    imageView: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    image: {
        height: 45,
        width: 45,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    bodyTextView: {
        flex: 0.6,
        marginLeft: '2%',
    },
    bodyHeadText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginLeft: '2%'
    },
    bodySubText: {
        color: '#747C90',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    SubText: {
        color: '#000',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    amountText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    scoreTextView: {
        height: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'flex-end'
    },
    firstText: {
        color: "#00B65E",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    deviderLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#D1D1D1',
        marginLeft: '2%'
    },
    totalItemText: {
        color: '#747C90',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }

})

export default styles;