import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    mainView: {
        marginHorizontal: '5%',
        marginTop: 10
    },

    headerMainView: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: 15
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
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    
    likeSec: {
        marginTop: 10,
        flexDirection: 'row',
    },

    likeCircel: {
        backgroundColor: '#F13748',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },

    whiteLikeImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    circelBackground: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECC8'
    },

    listTextSec: {
        flexDirection: 'column',
        marginLeft: '5%',
        flex: 1
    },

    listHeaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    dateText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT
    },

    coinsSec: {
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 100
    },

    circelCoinsView: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },


    coinTwotext: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    listButtomUnderline: {
        marginTop: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 0.3
    },

    textLevel: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    pepoleNumberText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    peopleText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT
    },

    mainUnderline: {
        borderColor: '#000',
        borderWidth: 0.5,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal: 10,
        borderRadius: 20
    },

    coinsMain: {
        // marginHorizontal: '2%',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // marginTop: 5
    },

    
    blackUnderline: {
        color: "#A3A3A3",
        borderWidth: 0.5,
        borderColor: "#000",
        marginVertical: 12
    },

    textTopGain: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },

    listMainView: {
        flexDirection: 'column',
        marginLeft: '5%',
        flex: 1
    },

    listheaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    listDateText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.LIGHT
    },

    textCoinNumber: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },
    flexRow: {
        marginTop: 20,
        marginBottom:10,
        flexDirection: 'row',
        alignItems:"center"
    },

    yellowCoinIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    underline: {
        marginTop: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 0.3
    },
    listView: {
        borderColor: '#000',
        borderWidth: 0.5,
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius: 20,
        alignItems:"center",
        justifyContent:"center"
    },

    flewRowView: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    circelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
      },
    
      blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
      },


});

export default styles;