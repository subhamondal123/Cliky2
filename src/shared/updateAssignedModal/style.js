import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums/';

const styles = StyleSheet.create({

    // Modal Section Start
    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },

    updateButton: {
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: '5%',
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    updateText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },


})

export default styles;