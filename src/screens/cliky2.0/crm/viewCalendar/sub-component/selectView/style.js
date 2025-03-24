import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    mainView:{
        marginTop: 15,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        borderRadius: 12,
        marginHorizontal: '2%'
    },
    subView:{
        marginHorizontal: '2%',
        flexDirection: 'row'
    },
    canlenderSec: {
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
        borderWidth: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
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
    selectDateText:{
        color: Color.COLOR.GRAY.TAPA,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.SM,
        paddingVertical: 10,
        textAlign: 'center'
    },
    dateView:{ 
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // marginBottom:'5%'
    },
    dateText:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.WHITE.PURE_WHITE,
        paddingVertical: 10
    },
    listMainView: {
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '2%',
        flexDirection: 'row'
    },
    listFirstView: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth:0.5,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR
    },
    timeText: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.GRAY_COLOR
    },
    listTextSection: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    bodyTextView: {
        flex: 0.8
    },
    bodyText: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.DAVY_GRAY
    },
    actionMainView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionView: {
        height: 25,
        width: 25,
        backgroundColor: '#FFE142',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editImg: {
        resizeMode: 'contain'
    },
    bodyItemText: {
        paddingHorizontal: 10,
        paddingBottom:5,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.GRAY_COLOR
    },
    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: "5%"

    },
});

export default styles;