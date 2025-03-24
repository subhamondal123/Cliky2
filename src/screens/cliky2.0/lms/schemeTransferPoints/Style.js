import { StyleSheet } from "react-native";
import { Color, Dimension } from "../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    activeBoxshadowColor: {
        marginTop: 15,
        marginHorizontal: 5
    },

    dashUnderline: {
        borderStyle: 'dashed',
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
        borderWidth: 0.7,
        marginHorizontal: 8
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
    },

})

export default styles;