import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    bodyView: {
        marginHorizontal: '5%'
    },
    calendarMainView: {
        borderColor: '#0068FF',
        borderWidth: 1,
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '5%',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2
    },
    listMainView: {
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '5%',
        flexDirection: 'row'
    },
    listFirstView: {
        backgroundColor: '#0068FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    timeText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE
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
        paddingVertical: 20,
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
    actionFilterView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionWeekView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: '5%',
        paddingVertical: 10
    },
    monthWeekTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.SM
    },
    fliterImg: {
        resizeMode: 'contain',
        height: 25,
        width: 25
    },


    //modal style
    modalstatusview: {
        maxHeight: Dimension.height,
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 60,
        borderRadius: 10
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    madalMarginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
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
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
    }

});

export default styles;