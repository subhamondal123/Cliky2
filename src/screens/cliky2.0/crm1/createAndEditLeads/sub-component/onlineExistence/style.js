import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../../../../enums';

const styles = StyleSheet.create({
    container: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        marginHorizontal: "5%"
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.SM
    },

    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },

    profileImageView: {
        borderRadius: 130,
        borderWidth: 1,
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.COLOR.BLUE.LAPIS_LAZULI
    },
    profileImage: {
        height: 148,
        width: 148,
        borderRadius: 130,
    },
    cameraView: {
        top: 0,
        right: 5,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: Color.COLOR.BLUE.CAPRI,
        borderRadius: 20
    },
    cameraImg: {
        height: 25,
        width: 25
    },
    belowImageText: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImg: {
        height: 90,
        width: 90,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 500
    },
    profileUploadImg: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 500
    },
    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        // marginHorizontal:"5%",
        marginBottom: 10
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%'
    },
    listHeaderText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    profileImgView: {
        borderRadius: 130,
        borderWidth: 1,
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.COLOR.BLUE.LAPIS_LAZULI
    },
    profileImg: {
        height: 140,
        width: 140,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 70
    },
    cameraView: {
        top: 4,
        left: 190,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: Color.COLOR.BLUE.CAPRI,
        borderRadius: 20
    },
    cameraIconImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
})

export default styles;