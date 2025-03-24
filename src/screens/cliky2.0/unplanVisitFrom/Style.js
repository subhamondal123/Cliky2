import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    inputBoxText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },

    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#747C90",
        borderWidth: 0.5
    },

    inactiveBox: {
        backgroundColor: '#F0F4F7',
        height: 50,
        width: 110,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5
    },

    activeBox: {
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        height: 50,
        width: 110,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5
    },

    inActiveText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    activeText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },


    // header css from here

    headerContainer: {
        height: 60,
        // elevation: 2,
        backgroundColor: "#fff",
        // shadowColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        // shadowOffset: 5,
        // shadowOpacity: 5,

    },

    gamificationMainView: {
        marginHorizontal: "3%",
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },

    drawerIconSection: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E06336",
        height: 30,
        width: 30,
        borderRadius: 100
    },

    //modal

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute',
    },
    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#9298a9',
        borderRadius: 100,
    },
    beatSelectionSec: {
        elevation: 1,
        flex: 0.8,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        borderRadius: 12,
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: "#747C90",
        borderWidth: 0.5
    },
    beatSvgIconSec: {
        paddingRight: 5,
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionText: {
        marginLeft: 5,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    }
})

export default styles;