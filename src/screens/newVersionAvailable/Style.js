import { StyleSheet, Dimensions } from "react-native";
import { FontFamily, FontSize, Color, Padding } from '../../enums';
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    bgimage: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
        opacity: .9,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
    },
    logoSec: {
        position: 'absolute',
        top: Padding.PADDING.NORMAL_PADDING.NORMAL_PADDING_15X,
        elevation: 10,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1
    },
    logoImg: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    section: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '30%'
    },
    errorText: {
        fontSize: 30,
        fontFamily:FontFamily.FONTS.INTER.BOLD,
        // fontWeight: 'bold',
        color:Color.COLOR.BLACK.BLACK_PEARL
    },
    errorTextMsg: {
        fontSize: 14,
        fontFamily:FontFamily.FONTS.INTER.MEDIUM,
        // fontWeight: 'bold',
        color:Color.COLOR.BLACK.BLACK_PEARL
    },
    btn: {
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1,
        padding: 10,
        marginTop: '20%',
    },
    btnText: {
        alignSelf: 'center',
        color: '#01a3a4'
    }
});

export default styles;