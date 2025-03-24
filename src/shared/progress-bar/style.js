import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../enums/';

const styles = StyleSheet.create({
    // 2nd progress bar
    inner: {
        width: '100%'
    },
    label: {
        fontSize: 7,
        color: '#000',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center'
    },
    mainView:{
        alignItems:"center",
        justifyContent:"center",
    },
    labelTxt:{
        color:Color.COLOR.BLACK.PURE_BLACK,
        fontWeight:"600"
    }
})

export default styles;