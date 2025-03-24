import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../../../enums';

const styles = StyleSheet.create({
    modalMainView: {
        bottom: 0,
        left: 0,
        right: 0,
        width: Dimension.width - 30,
        maxHeight: Dimension.height/1.2,
        alignSelf: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 20
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        top: - 5,
        marginRight: 5,
        // marginTop: 15
    },
    cancelImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    progessSection: {
        // height: 70,
        // backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        alignItems: 'center',
        justifyContent: 'center',


    },
    progressMainView: {
        // flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: "3%"
    },
    eachNumberCommonView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1
    },
    numberCircle: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.DARK_GRAY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: Color.COLOR.GRAY.GRAY_COLOR,

    },
    numberCircleActive: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH,
    },
    numberCircleInactive: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.FADED_RED,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.RED.FADED_RED,
    },
    lineView: {
        flex: 1,
        // height: 50,
        width: 5,
        backgroundColor: Color.COLOR.RED.FADED_RED,
        borderRadius: 3
    },
    lineViewActive: {
        flex: 1,
        // height: 50,
        width: 5,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 3
    },
    lineViewCompleted: {
        flex: 1,
        height: 5,
        backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
        borderRadius: 3
    },
    numText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: "center",
        // top: -3
    },
    numTextActive: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: "center",
        // top: -3
    },
    numTextCompleted: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: "center",
        top: -3
    },
    stageName: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: 14,
    },








    boxSection: {
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxAboveText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XL,
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
        backgroundColor: Color.COLOR.BLUE.LAGOON,
        // borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },


    profileImageView: {
        borderRadius: 60,
        borderWidth: 1,
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.COLOR.BLUE.LAPIS_LAZULI
    },
    profileImage: {
        height: 110,
        width: 110,
        borderRadius: 60,
    },
    cameraView: {
        top: 0,
        right: 8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        backgroundColor: Color.COLOR.BLUE.CAPRI,
        borderRadius: 20
    },
    cameraImg: {
        height: 20,
        width: 20
    },
    belowImageText: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;