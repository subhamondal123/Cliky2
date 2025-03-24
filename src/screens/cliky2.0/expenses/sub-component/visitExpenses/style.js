import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";

const styles = StyleSheet.create({
    // ============================================================================================
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
    modalHeader: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 15
    },
    flexRow: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center'
    },
    locationImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueUnderline: {
        flex: 1,
        height: 2,
        backgroundColor: '#286a94'
    },
    marginTopView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    loactionStartEndText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    greenOdometerLogo: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginTop: 2
    },
    bikeText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginLeft: '5%'
    },
    inTimeText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },
    timeValueText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    // ===========

    whiteDeleteLogo: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    deleteLogoSec: {
        justifyContent: "center",
        backgroundColor: "#F76770",
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: "center",

    },
    TakephotoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    flexANdMarginView: {
        
       width:100,
       margin:5,
        // marginHorizontal: 5
    },
    logisticImageView: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
    addImgField: {

        width: "100%",
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        marginTop: 15,
        // borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        // borderStyle: "dashed"
    },

    addImg: {
        height: 100,
        width: 100,
        borderRadius: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    imageMainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20,
        flexWrap:"wrap"
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 80,
        width: 80,
        borderRadius: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tauchableSec: {
        height: 90,
        width: 90,
        borderRadius: 60,
        borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoSec:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    addressHeaderTxt:{
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    addressTxt:{
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    underLine:{
        borderWidth:0.5,
        borderColor:Color.COLOR.BLACK.PURE_BLACK,
        marginVertical:10
    }



});

export default styles;