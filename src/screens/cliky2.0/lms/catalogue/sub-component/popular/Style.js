import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../../../../enums';

const styles = StyleSheet.create({
    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 15,
        width: Dimension.width - 40,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        top: 20,
        position: 'absolute',
        // marginHorizontal: "10%"
        padding:15
    },
    modalHeaderSec:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10,
        paddingHorizontal:15
    },
    crossImgSec: {
       
        // justifyContent: 'center',
        // alignSelf: 'flex-end',
        
        // marginRight: 5
    },
    redCrossImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
    },


})

export default styles;