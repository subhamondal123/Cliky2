import {
    StyleSheet
} from 'react-native';
import { Color, FontFamily, FontSize } from '../../enums';
const WHITE_SMOKE = '#F8F8F8';
const PURE_BLACK = '#000000';
const PURE_WHITE = '#FFFFFF';
const BORDER_WIDTH = 0.4;

const styles = StyleSheet.create({
    touchView: {
        height: 50,
        width:"90%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: BORDER_WIDTH,
        borderColor: WHITE_SMOKE,
        borderRadius:10,
        
    },
    dateText: {
        fontSize: 16,
    },
    dateNameText: {
        fontSize: 13,
        color: PURE_WHITE
    },
    pendingAmtSec:{
        minWidth:50,
        flexDirection:"row",
        borderRadius:15,
        backgroundColor:Color.COLOR.RED.AMARANTH,
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:"center",
    },
    approvedAmtSec:{
        minWidth:50,
        flexDirection:"row",
        borderRadius:15,
        backgroundColor:"#156A94",
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:"center",
    },
    dashboardIcon:{
        height:9,
        width:9,
        resizeMode:"contain"
    },
    dashboardTxt:{
        color:Color.COLOR.WHITE.PURE_WHITE,
        fontFamily:FontFamily.FONTS.INTER.BOLD,
        fontSize:11
    },
    skeletonCalenderView:{
        borderRadius: 8,
        height:35,
        marginBottom: 10,
    },
    circle:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:"red"
    },
});

export default styles;