import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../../../../../enums';

const styles = StyleSheet.create({
    container: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        marginHorizontal: "5%"
    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height / 1.2,
        right: 0,
        left: 0,
    },
    modalHeaderSec: {
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1,
        textAlign: 'center'
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        top: -10,
        left: -4
    },
    cancelImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    formInputBox: {
        height: 35,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        marginTop: 8,
        // flexDirection: 'row',
        borderColor: '#000'
    },
    canlenderSec: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10
    },
    calenderImgSec: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
        height: 20,
        width: 20,
        bottom: 10
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
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