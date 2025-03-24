import { StyleSheet } from "react-native";
import { Color, FontFamily } from "../../../../enums";
const styles = StyleSheet.create({

    contain: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },


    btn: {
        backgroundColor: 'grey',
        width: '20%',
        margin: '3%',
        padding: '1%'

    },
    btnContainer: {
        alignItems: 'flex-end',
    },
    progressContainer: {
        backgroundColor: '#F0F4F7',
        marginHorizontal: '5%',
        marginVertical: '3%',
        borderRadius: 5
    },
    progressDataContainer: {
        margin: '4%'
    },
    itemData: {
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        // backgroundColor:'grey'
    },
    progressBarData: {
        marginTop: '5%'
    },
    northTxt: {
        color: '#1F2B4D',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400'
    },
    mtdTxt: {
        color: '#4488A9',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 11,
        textAlign: 'center'
    },
    mtdTxtBg: {
        backgroundColor: '#FFFFFF',
        width: 50,
        height: 22,
        justifyContent: 'center',
        borderRadius: 5
    },
    totalAmountTxt: {
        color: '#1F2B4D',
        fontSize: 14,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontWeight: 400
    },
    childSec: {
        borderBottomWidth: 0.5,
        borderColor: '#D1D1D1',
        marginTop: '3%'
    },
    hmDescTxt: {
        color: '#1F2B4D',
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 11,
        fontWeight: '400'
    },
    totalSalesAmtTxt: {
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontWeight: '400'
    }
})
export default styles;