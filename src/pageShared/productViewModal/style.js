import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";


const styles = StyleSheet.create({
    modalView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height / 1.2,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
        alignContent:'center'
    },
   
});

export default styles;