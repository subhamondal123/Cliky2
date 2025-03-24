import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../../../enums';

const styles = StyleSheet.create({
    addMoreButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 10
    },
    addMoreText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 10,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    flexANdMarginView: {
        flex: 0.5,
        marginHorizontal: '2%',
    },
    timeSec: {
        height: 50,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTime: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginHorizontal: "2%"
    },
    crossBtnImg: {
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        height: 20,
        width: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    crossImg: {
        resizeMode: 'contain',
        height: 17,
        width: 17
    },


    liftedFromText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 12,
        color: Color.COLOR.BLACK.PURE_BLACK
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
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
    },


    //modal design
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: 50,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "2%",
    },
    ModalheaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        // marginTop: 8,/
        textAlign: 'center'
    },
    marginView: {
        // flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    textVisites: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    mainBox: {
        paddingBottom: '10%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 0.7
    },
    blueBox: {
        backgroundColor:Color.COLOR.RED.AMARANTH,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center'
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: 'center'
    },
    homeCircel: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    homeLogo: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    saiEnterprisesBelowText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    addVisitsButton: {
        flex: 0.2,
    },

    textFlexView: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: '5%'
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
    checkBoxLabel: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    }
});

export default styles;