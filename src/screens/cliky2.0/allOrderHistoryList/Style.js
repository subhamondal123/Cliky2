import { StyleSheet } from "react-native"
import { Color, FontFamily, FontSize } from "../../../enums"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    mainView: {
        marginHorizontal: 5,
        marginTop: 15,
        backgroundColor: "#F0F4F7",
        borderRadius: 10,
        borderWidth:0.5
    },
    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 1,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,

    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
    },
    noDataFound: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.SM
    },
    textFlexView: {
        flexDirection: 'row',
        alignItems:"center",
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: "5%",
        borderBottomWidth: 0.5,
        borderBottomColor: Color.COLOR.GRAY.GRAY_TINTS
    },
    iconView: {
        alignSelf:"center",
        // padding: 5,
        marginRight: 5,
        // top:5
    },
    iconImg: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    textVisites: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
})

export default styles