import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    },

    // filter section
    filterSectionMainView: {
        flex: 1,
        marginHorizontal: '5%',
        marginVertical: '5%',
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        paddingVertical: 15,
        borderRadius: 12
    },
    filterSubView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%'
    },
    filterSearchItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.9
    },
    startDateView: {
        flex: 0.9,
        marginHorizontal: '1%'
    },
    dateTextView: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        paddingLeft: 10,
        top: 10
    },
    toText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    canlenderSec: {
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    calenderImgSec: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
        height: 20,
        width: 20,
        bottom: 10,
        left: 8
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },
    searcImgView: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    /////////////////

    // map section
    mapPortionView: {
        height: (Dimension.height - (Dimension.height / 7)),
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: '5%',
        // borderWidth: 1,
        // borderColor: Color.COLOR.BLUE.VIOLET_BLUE
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default styles;