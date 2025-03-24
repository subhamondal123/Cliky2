import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../enums/';

const styles = StyleSheet.create({
    // for activity section
    mainView: {
        marginHorizontal: '5%',
        flexDirection: 'row'
    },

    processMainView: {
        flex: 0.1,
        alignItems: 'center'
    },

    shadowView: {
        height: 20,
        width: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    processLine: {
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 1
    },

    detailsMainView: {
        flex: 0.9,
        flexDirection: 'column',
        top: -1
    },

    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        flex: 0.9
    },

    textVisites: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
        
})

export default styles;