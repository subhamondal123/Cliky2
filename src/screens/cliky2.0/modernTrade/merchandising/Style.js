import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    boxTittle: {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        color: "#1F2B4D",
        fontSize: 14,
        marginTop: 10
    },
    cameraText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        color: "#4B5263",
        fontSize: 11,
        marginTop: 10

    },
    TakephotoText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 5,
        marginLeft: '5%'
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 80,
        width: 80,
        borderRadius: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TakephotoImg: {
        width: '60%',
        height: '60%',
        resizeMode: 'cover',
        // borderRadius: 15
    },
    takeImage: {
        height: 20,
        width: 20,
        resizeMode: 'cover',
        borderRadius: 15
    },
    tauchableSec: {
        // height: 90,
        // width: 90,
        // borderRadius: 60,
        // borderColor: Color.COLOR.RED.AMARANTH,
        // borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },

    crossBtnImg: {
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        height: 25,
        width: 25,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    crossImg: {
        resizeMode: 'contain',
        height: 20,
        width: 20
    },

    addImgField: {
        height: 80,
        width: "100%",
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        borderStyle: "dashed"
    },

    addImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    mainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20
    },
    flexANdMarginView: {
        flex: 0.5,
        // marginHorizontal: '2%'
    },
    logisticImageView: {
        flex: 1,
        height: Dimension.height / 4.7,
        borderRadius: 12,
    },

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 20,
        // width: Dimension.width,
        alignSelf: 'center',
        position: 'absolute',
        width: Dimension.width - 50


    },


});

export default styles;