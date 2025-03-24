import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize} from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },

    canlenderSec: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxLabel:{
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
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

    shadowBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 10
    },

    marginView: {
        alignItems: 'flex-end'
    },

    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },

    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    uploadDocSection: {
        flexDirection: "row",
        alignItems: "center",

    },
    uploadDocName: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    formfooterBtn: {
        marginTop: 20,
        marginBottom: 40,
        flexDirection: 'row',
        flex: 1
    },
    whiteCrossImg:{
        height: 15, 
        width: 15, 
        resizeMode: 'contain'
    },

    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputBoxText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
    },
    underline:{
        marginVertical:10,
        borderWidth:1,
        borderColor:Color.COLOR.BLACK.PURE_BLACK
    }

});

export default styles;