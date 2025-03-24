import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: -21,
        position: 'absolute',
        // position: 'absolute',
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
        color: Color.COLOR.GRAY.GRAY_COLOR,
        flex: 1
    }




})

export default styles;