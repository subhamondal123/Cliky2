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
        height: 140,
        width: 140,
        borderRadius: 130,
        resizeMode:'cover'
    },
    cameraView: {
        top: 4,
        right: 5,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: Color.COLOR.BLUE.CAPRI,
        borderRadius: 20
    },
    cameraImg: {
        height: 20,
        width: 20,
        
    },
    belowImageText: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueBox: {
        backgroundColor: Color.COLOR.BLUE.EBONY_CLAY,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: "5%",
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
    }
})

export default styles;