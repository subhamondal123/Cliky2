import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        // width: Dimension.width,
    },
    mapPortionView: {
        // ...StyleSheet.absoluteFillObject,
        height: Dimension.height / 2,
        // width: Dimension.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    headerAbsoluteView: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    backPortion: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        marginLeft: 5,
        marginTop: 5
    },
    backImg: {
        height: 25,
        width: 25
    },
    filterPortion: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        marginRight: 5,
        marginTop: 5
    },
    absoluteTextView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    absoluteText: {
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.MD,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    smallChipBox: {
        borderRadius: 15,
        backgroundColor: Color.COLOR.BLUE.EBONY_CLAY,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    smallChipBoxSelected: {
        borderRadius: 15,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    smallChipBoxIcon: {
        height: 15,
        width: 15
    },
    smallChipBoxText: {
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.SM,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    boxSection: {
        backgroundColor: Color.COLOR.BLUE.EBONY_CLAY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    fieldForceSection: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxAboveText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.LG,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    boxBelowText: {
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    leftBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    rightBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        // borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    topBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    middleBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomLeftBoxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomRightBoxSection: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        // borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});

export default styles;