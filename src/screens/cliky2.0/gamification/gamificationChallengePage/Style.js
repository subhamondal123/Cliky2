import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    backImg: {
        height: 28,
        width: 28,
        resizeMode: "contain"
    },

    mainView: {
        marginHorizontal: '5%',
        marginTop: 10
    },

    circelBackground: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECC8'
    },

    headrFlexRow: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: '3%'
    },

    coinMainView: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth:0.5,
        borderColor:Color.COLOR.BLACK.PURE_BLACK,
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5
    },

    coinLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    textCoinText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    threeDotImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },

    centerView: {
        marginHorizontal: '15%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    challengeLogo: {
        height: 200,
        width: 250,
        resizeMode: 'cover'
    },

    challengeText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 2
    },

    textCenterView: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center"
    },

    skyCircel: {
        backgroundColor: "#149CE0",
        height: 15,
        width: 15,
        borderRadius: 100,
    },

    personNameText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '2%'
    },

    vsText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginLeft: '2%'
    },

    yellowCircel: {
        backgroundColor: "#F8B200",
        height: 15,
        width: 15,
        borderRadius: 100,
        marginLeft: '4%',
    },

    youText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '3%'
    },

    textSalesTarget: {
        marginTop: 5,
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    targetRemoveText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    personLogo: {
        height: 37,
        width: 37,
        resizeMode: 'cover',
        borderRadius: 100
    },

    profileYellowCircel: {
        backgroundColor: "#149CE0",
        height: 15,
        width: 15,
        borderRadius: 100,
        marginTop: 5,
        top: -23,
        right: 2
    },

    gamificationColumn: {
        // flexDirection: 'column',
        marginLeft: '2%'
    },

    salesExcitiveText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 3
    },

    addressText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 2
    },

    achivementNo: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 2
    },

    persentNoText: {
        color: "#F13748",
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 3
    },

    profileSkyCircel: {
        backgroundColor: "#F8B200",
        height: 15,
        width: 15,
        borderRadius: 100,
        marginTop: 5,
        top: -23,
        right: 2
    },

    hurryTextSec: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%'
    },

    hurryTextAchive: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    textAchivementText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign: 'center',
        marginTop: 8
    },

    buttonView: {
        marginHorizontal: '2%',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    ogleTimeText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign: 'center',
        marginTop: 10
    },

    twoButtonView: {
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: '12%'
    },

    salesData: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 5
    },



});

export default styles;