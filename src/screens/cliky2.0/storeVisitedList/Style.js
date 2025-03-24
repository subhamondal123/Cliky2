
import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({

    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        elevation: 2,
        shadowColor: Color.COLOR.BLACK.BLACK_PEARL,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
    },

    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: 'center'
    },

    homeCircel: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3
    },

    homeLogo: {
        height: 35,
        width: 35,
        resizeMode: 'cover',
        borderRadius: 50
    },

    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    nameText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },


    textFlexView: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: '5%',
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },

    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    textVisites: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    imgSec: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: '2%'
    },

    textImgLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 3
    },

    productBtn: {
        position: "absolute",
        bottom: "5%",
        alignSelf: 'center',
        width: "100%",
        marginHorizontal: "15%"
    },

    bottomView: {
        justifyContent: 'center',
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.BLACK_PEARL,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#ffffff"
    },

    subCircel: {
        height: 20,
        width: 20,
        borderRadius: 18,
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 5
    },
    subCircelAdd: {
        height: 20,
        width: 20,
        borderRadius: 18,
        // backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 5
    },

    subImgLogo: {
        height: 18,
        width: 18,
        resizeMode: 'center'
    },

    subBoxText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    conversionButton: {
        flexDirection: 'row',
        marginLeft: '2%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: 0.8,
    },

    //.................................
    monthTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    yearTxt: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    dateSec: {
        marginHorizontal: 15,
        marginTop: 15
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
        // paddingVertical: 10,
        flexDirection: 'row',
    },
    boxsbody: {
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 10,
        // elevation: 3,
        // backgroundColor: '#F0F4F7',
        // marginTop: 15,
        // borderRadius: 10,
        // paddingBottom:15
        // paddingVertical: 10,
        // flexDirection: 'row',
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

    boxTextSec: {
        marginLeft: 10,
        flex: 0.5,
        justifyContent: 'center',
    },
    userNewSec: {
        justifyContent: 'center',
        flex: 0.2,
        alignItems: "center",
        backgroundColor: '#C7ECFF',
        borderTopLeftRadius: 10,
        // borderBottomLeftRadius:10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    dateText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    weekText: {
        color: "#607077",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    nameTextSpace: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 10
    },
    nameTextSpaceM: {
        color: "#1F2B4D",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginLeft: 15
    },
    dText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: 5
        // marginTop: 8
    },
    remarksText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 10,
        marginTop: 10
    },
    noteHeadText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    remarksBodyText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: 10,
        marginTop: 10
    },
    dropdownSec: {
        marginRight: 10,
        marginLeft: 5,
        flex: 0.15
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    userSec: {
        justifyContent: 'center',
        width: 50,
        marginLeft: 10
    },
    userTextSec: {
        marginLeft: 15,
    },
    dgText: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 8
    },

});

export default styles;