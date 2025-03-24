import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    //header
    headerTxtMain: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },


    //event section
    eventSectionView: {
        paddingVertical: 15,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "#D3D3D3",
        // marginBottom: 15
    },
    eventNameText: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontSize: FontSize.LG
    },
    eventDescText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: "#777696",
        fontSize: FontSize.XS
    },


    //budget section
    budgetSecionView: {
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: "#D3D3D3"
    },


    //budget calculation section
    budgetCalculationView: {
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: "#D3D3D3"
    },



    //button section
    buttonSectionView: {
        paddingVertical: 15,
        flexDirection: 'row',
        marginTop: 15
    },

    calculatorText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.RED.LIGHT_RED,
    },
    calculatorSmallText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        color: '#070457',
    },
    mmBox: {
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // justifyContent: 'center',
        // alignItems: 'center',
        shadowColor: '#000',
        hadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        padding: 10,
        marginHorizontal: 1,
        marginTop: 20
    },
    boxRowSec: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15
    },
    boxFirstText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        color: Color.COLOR.GRAY.DAVY_GRAY,
    },
    boxSecondText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE,
    },
    boxRowText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.GRAY.GRAY_COLOR,
    },
    boxRowValueText: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE,
    },
    boxRowValueLastText: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.PACIFIC,
    },
    descriptionContent: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE,
    },
    firstDesSec: {
        marginTop: 20,
        flex: 1,
        marginLeft: 15
    },
    secondDesSec: {
        marginTop: 20,
        flex: 1,
        marginLeft: 15,
        marginBottom: 10
    },
    totalBugetText: {
        fontSize: FontSize.XXL,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.PACIFIC,
    },

    CheckBoxSec: {
        flexDirection: 'row',
        marginTop: 23
    },
    CheckBox: {
        flex: 1,
        flexDirection: 'row'
    },
    checkBoxText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE,
        marginLeft: 10
    },

    whiteDeleteLogo: {
        height: 18,
        width: 18,
        resizeMode: "contain"
    },
    deleteLogoSec: {
        justifyContent: "center",
        backgroundColor: "#F76770",
        height: 35,
        width: 35,
        borderRadius: 20,
        alignItems: "center",
    },
    editLogoSec: {
        justifyContent: "center",
        backgroundColor: Color.COLOR.BLUE.BABY_BLUE,
        height: 35,
        width: 35,
        borderRadius: 20,
        alignItems: "center",
        marginRight: 10
    },

    //modal section,

    modalMainView: {
        bottom: -20,
        right: 0,
        left: 0,
        position: 'absolute',
        alignItems: 'center'
    },
    modalView: {
        height: Dimension.height / 1.5,
        width: Dimension.width,
        backgroundColor: Color.COLOR.BLUE.DARK_BLUE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    modalHeader: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetUpperText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetLowerText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },

    addAttachment: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.GRAY.GRAY_COLOR,
    }
})

export default styles;