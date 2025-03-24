import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums/';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    cancelSec: {
        height: 25,
        width: 25,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        left: 12
    },
    cancelImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    // modalHeaderSec: {
    //     backgroundColor: Color.COLOR.BLUE.PACIFIC,
    //     paddingTop: 15,
    //     paddingBottom: 15,
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10

    // },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 8,
        textAlign: 'center'
    },
    visiableBox: {
        height: 125,
        width: 120,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 20,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSec: {
        backgroundColor: "#3a34eb",
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25
    },
    logoImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    boxUnderText: {
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    flexView: {
        flexDirection: 'row',
       
    },












})

export default styles;