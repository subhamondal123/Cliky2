import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    mainBox: {
        paddingBottom: '5%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: '2%'
        // alignItems:'center'
    },
    greenBox: {
        backgroundColor: '#54daa8',
        // height: 50,
        paddingVertical: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    violetBox: {
        backgroundColor: '#5d6ec6',
        // height: 50,
        paddingVertical: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    salmonBox: {
        backgroundColor: '#f37977',
        // height: 50,
        paddingVertical: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    boxHeaderText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    checkBoxText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    underline: {
        borderWidth: 0.3,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        marginHorizontal: '5%',
        marginTop: 15
    },


});

export default styles;