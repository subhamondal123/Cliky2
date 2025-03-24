import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../../../../../../enums';

const styles = StyleSheet.create({

    blueBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems:"center",
      },
      blueViewFlex: {
        flexDirection: 'row',
      },
      listHeaderText:{
        fontSize: FontSize.LG,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontWeight:"700"
      },
      profileImgView: {
        borderWidth:1,
        borderColor:Color.COLOR.GRAY.CORDUROY,
        // elevation: 5,
        borderRadius: 500,
        // alignSelf: 'center',
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    profileImg: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 500
    },
    cameraView: {
        alignSelf: 'center',
        bottom: 30,
        marginLeft: 60
    },
    cameraIconImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    canlenderSec: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        height:45,
        flexDirection:"row",
        alignItems:"center"

    },
    calenderImgSec: {
        borderStyle: 'solid',
        height: 20,
        width: 20,
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },
})

export default styles;