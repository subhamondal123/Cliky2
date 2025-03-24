import { StyleSheet } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, Padding } from '../enums';


const globalStyle = StyleSheet.create({
    //define all global styles here
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1
    },

    backImg:{
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    noDataFoundViewForTabList: {
        height: Dimension.height ,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    productBtn: {
        position: "absolute",
        bottom: "15%",
        alignSelf: 'center',
        width: "100%",
        marginHorizontal: "15%",
    },

    headerTextView:{
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    backButtonView:{
        flex: 0.1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerDataText: {
        fontSize: FontSize.LG,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontWeight:"700"
    },
    boxWithShadow: {
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    }

})

export { globalStyle as CustomStyle };