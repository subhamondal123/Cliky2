import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../enums/';

const styles = StyleSheet.create({
    // for activity section
    mainBox: {
        backgroundColor: "#54daa8",
        elevation: 2,
        shadowOffset: 0.8,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        width:'100%'
    },
    iconImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    textFlexView: {
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        flex: 1
    },
    iconView: {
        marginRight: 5,
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textVisites: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    mainView:{
        marginHorizontal: '5%',
        flexDirection: 'row'
    },
    processMainView:{
        flex: 0.1,
        alignItems: 'center'
    },
    shadowView:{
        height: 20,
        width: 20,
        borderRadius: 50,
        opacity: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotView:{
        height: 10,
        width: 10,
        borderRadius: 50
    },
    processLine:{
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 1
    },
    detailsMainView:{
        flex: 0.9,
        flexDirection: 'column'
    },
    titleText:{
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    }
})

export default styles;