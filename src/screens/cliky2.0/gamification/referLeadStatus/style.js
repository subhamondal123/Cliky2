import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    headerMainView: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: '3%'
    },

    backImg: {
        height: 28,
        width: 28,
        resizeMode: "contain"
    },
    headerCoinsSec: {
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 100,
        marginRight: '5%',
        marginTop: 4
    },

    headerCoinUnderSec: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    threeDot: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },

    yellowCoinsLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    textcoinsNum: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
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

    imageSec: {
        marginHorizontal: '15%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    referLeadLogo: {
        height: 180,
        width: 180,
        resizeMode: 'cover'
    },

    leadStatusText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 15
    },

    leadReferAtText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '2%'
    },

    leadDateText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '3%'
    },

    rowFlex: {
        flexDirection: 'row',
        marginTop: 15
    },

    flexColumn: {
        flexDirection: 'column',
        marginLeft: '2%',
        flex: 0.5
    },

    leadOwanerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 2
    },


    dealerText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 3
    },

    addressStatusText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 2
    },

    flexEnd: {
        flexDirection: 'column',
        flex: 0.5,
        alignItems: 'flex-end'
    },

    verifiedText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 2
    },

    dateText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    leadProgessDetailsTextSec: {
        marginTop: 40,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    leadProgressDetailsText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    earnedTextSec: {
        marginTop: 15,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    youEarnedText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    earnedText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS
    },

    coinsIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },

    coinsTwoTextColumnSec: {
        flexDirection: 'column',
        marginLeft: '2%'
    },

    coinNumberText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    textCoins: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    buttonView: {
        marginHorizontal: '30%',
        marginTop: 15
    },
    //modal
    modalstatusview: {
        maxHeight: Dimension.height / 1.1,
        width: Dimension.width - 20,
        width:"100%",
        backgroundColor: '#fff',
        borderRadius:20
       
      },
      modalStatusHeaderSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 1,
        paddingBottom: 15,
      },
      marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
      },
      profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
      },
      congratulationTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },
      congratulationBottomTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },
      pointAmountTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 20,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
      },
      pointTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 16,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },

});

export default styles;