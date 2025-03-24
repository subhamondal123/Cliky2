import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({
    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "10%"
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.RED_ORANGE,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    crossImgSec: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: 5
    },
    redCrossImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
})

export default styles;
