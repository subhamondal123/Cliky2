import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize } from '../../enums/';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        borderRadius: OtherSize.OTHERS.BORDER_RADIOUS.BORDER_10PX
    }
})

export default styles;