import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    mainView: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },

    shadowBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 15
    },

    dropDownSec: {
        flexDirection: 'row',
        marginLeft: '2%',
        marginRight: '2%'
    },
    boxMainText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },
    dropDownImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    detailsHeaderText: {
        color: Color.COLOR.GRAY.GRAY_TINTS,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    detailsSubText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign: 'left'
    },
    profileImg: {
        height: 110,
        width: 110,
        resizeMode: 'cover',
        borderRadius: 55,
        borderColor: Color.COLOR.GRAY.TAPA,
        borderWidth: 1
    },
    textFollowUpCall: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textSubheader: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    textPhoneCall: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textTaskDetails: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textOpen: {
        color: Color.COLOR.GREEN.SEA_GREEN,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '2%'
    },
    textDetailsInfo: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },
    allDetailsView: {
        marginHorizontal: '5%',
        marginTop: 15,
        flexDirection: 'row'
    },
    viewImg: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
        borderRadius: 8,
        borderColor: '#999',
        borderWidth: 1
    },

    textSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 0.7
    },
    viewHeaderText: {
        color: Color.COLOR.BLUE.CAPRI,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    viewSubText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    shortheaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 10
    },
    underLine: {
        borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        marginTop: 4,
        borderWidth: 0.5
    },

    keyImgSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEECFA',
        height: 120,
        width: 120,
        borderRadius: 30,
        elevation: 2
    },
    keyImg: {
        height: Dimension.height / 3.5,
        width: "90%",
        resizeMode: 'cover'
    },
    // ==================================================================================

    imgSec: {
        flexDirection: 'row',
        flex: 0.6,
        marginLeft: '3%',
    },
    userImg: {
        height: 45,
        width: 45,
        resizeMode: 'cover',
        borderRadius: 100
    },
    headerImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',

    },
    textRecordIdText: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    textValueText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    textAssignTo: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    textAssigntoName: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },

    // Modal section start form here

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        width: Dimension.width - 20,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
    },
    headerText: {
        color: "#0068FF",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        // textAlign: 'center'
    },
    marginView: {
        // marginLeft: '5%',
        // flexDirection: 'row',
        flex: 1
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    noDataFoundText: {
        textAlign: 'center',
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 14,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        marginVertical: 10
    },
    modalstatusview: {
        maxHeight: Dimension.height,
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 60,
        borderRadius: 10
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    madalMarginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },


});

export default styles;