import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


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
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    circelBackground: {
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECC8'
    },

    circelImg: {
        height: 26,
        width: 26,
        borderRadius: 100,
        resizeMode: 'contain'
    },

    listTextView: {
        flexDirection: 'column',
        marginLeft: '5%',
        flex: 1
    },

    listHeaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    listDateText: {
        top:-5,
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT
    },

    underline: {
        marginTop: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 0.3
    },

    flexRow: {
        marginTop: 15,
        flexDirection: 'row',
        // alignItems:"center"
    },

    nearToAchiveText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginTop: 18
    },

    tooltipListView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      tooltipText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.XS
      },
      statusText:{
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: 11
      },
      //.......................
      mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5
    
    
      },
      blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: "center"
      },

});

export default styles;