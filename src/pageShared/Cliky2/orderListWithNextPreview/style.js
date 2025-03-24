import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../enums';

const styles = StyleSheet.create({
    headMainView: {
        flexDirection: 'row'
    },
    dateMainTextView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    dateMainText: {
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.LOTUS_BLUE
    },
    orderCountView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderCountText: {
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.GREEN.SEA_GREEN
    },
    buttonMainView: {
        flex: 0.5,
        flexDirection: 'row'
    },
    buttonTouchView: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.LOTUS_BLUE
    },
    listContainerView: {
        marginVertical: 10
    },
    listMainView: {
        // marginHorizontal: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#F0F4F7',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#00B65E"
    },
    imageView: {
        flex:0.15
        // height: 50,
        // width: 50,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 100,
     
    },
    image: {
        height: 45,
        width: 45,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    bodyTextView: {
        flex: 0.6,
        marginLeft: '2%'
    },
    bodyHeadText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },
    bodyShopText: {
        color: Color.COLOR.BLUE.LAGOON,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },
    bodySubText: {
        color: '#747C90',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    amountText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    scoreTextView: {
        flex: 0.2,
        height: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        borderRadius: 8,
        justifyContent: 'center'
        // alignSelf:"flex-end"
        // alignContent:"flex-end"
    },
    firstText: {
        color: "#00B65E",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    deviderLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#D1D1D1',
        marginLeft: '2%'
    },
    totalItemText: {
        color: '#747C90',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }
})

export default styles;