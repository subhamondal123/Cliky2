import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";


const styles = StyleSheet.create({
    inputView:{
        marginTop: 30,
        height: 55,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputFieldStyle:{
        color: Color.COLOR.BLACK.PURE_BLACK,
        paddingLeft: 20,
        width: '100%',
        fontFamily:FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.SM
    }

});

export default styles;