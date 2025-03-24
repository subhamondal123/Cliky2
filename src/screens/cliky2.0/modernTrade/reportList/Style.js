import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    montheTxt: {
        backgroundColor: '#1F2B4D',
        margin: 0,
        alignItems: 'center',
        paddingHorizontal: 15,
        padding: 3
    },
    saleStockTxt: {
        color: '#1F2B4D',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins',
        
    },
    closingListContain:{
        backgroundColor:'#F0F4F7',
        paddingVertical:10,
        // paddingHorizontal:15
    },
    modelStyle:{
        width:320,
        // height:'80%',
        padding:18,
        backgroundColor:'white',
        borderRadius:18,
        gap:15
    },
   
});

export default styles;