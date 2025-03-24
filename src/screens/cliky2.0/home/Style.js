import { StyleSheet } from "react-native";
import { Color } from "../../../enums";

const styles = StyleSheet.create({
    beatSelectionSec: {
        flex: 0.8,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 30,
        flexDirection: 'row',
        paddingVertical: 10
    },
    beatSvgIconSec: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    officeSelectionSec: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})

export default styles