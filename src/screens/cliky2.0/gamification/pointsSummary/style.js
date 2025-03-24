import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    backImg: {
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

    flexRow: {
        marginTop: 25,
        marginBottom:10,
        flexDirection: 'row',
        alignItems:"center"
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

    listView: {
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 20,
        flexDirection:"row"
    },

    flewRowView: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // marginTop: 5
    },

    yellowCoinIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    textCoinNumber: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    underline: {
        marginTop: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 0.3
    },

    threeDot: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    headerMainView: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: 15
    },
    textTopGain: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    mainView: {
        marginHorizontal: 10,
        marginTop: 10
    },
    tabSec:{
         paddingHorizontal: 8, 
         paddingVertical: 5, 
         backgroundColor: '#F0F4F7', 
         borderRadius: 14, 
         alignItems:"center",
         flexDirection:"row",
         alignSelf:"flex-start",
         marginHorizontal: 5 
    },
    coinImg:{
        height: 20, 
        width: 20, 
        resizeMode: 'contain'
    },
    coinTxt:{
        top:3,
        color: Color.COLOR.BLUE.LOTUS_BLUE, 
        fontSize: FontSize.XS, 
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM 
    },
    coinBottomTxt:{
        top:-3,
        color: Color.COLOR.BLUE.LOTUS_BLUE, 
        fontSize: 11, 
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM 
    }

});

export default styles;