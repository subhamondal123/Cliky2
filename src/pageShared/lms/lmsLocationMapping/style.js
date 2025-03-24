import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../enums';

const styles = StyleSheet.create({
    // for activity section
    mainView:{
        marginHorizontal: 2,
        flexDirection: 'row'
    },
    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.XS
    },
    
})

export default styles;