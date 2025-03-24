import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../enums';

const styles = StyleSheet.create({
    // for activity section
    mainBox: {
        backgroundColor: "#54daa8",
        elevation: 2,
        shadowOffset: 0.8,
        borderRadius: 16,
        justifyContent: 'center',
        flexDirection: 'row',
        width:'100%'
    },
    iconImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    textFlexLeftView: {
        flex: 0.2,
        borderTopLeftRadius:16,
        borderBottomLeftRadius: 16,
        justifyContent:'center',
        alignItems:'center'
    },
    textFlexRightView: {
        paddingVertical: "5%",
        paddingHorizontal: "3%",
        flex: 0.6
    },
    iconView: {
        marginRight: 5,
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },
    textVisites: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    mainView:{
        marginHorizontal: '5%',
        // flexDirection: 'row'
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
        // flex: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        height:20,
        width:1,
        marginLeft:'10%'
    },
    detailsMainView:{
        flex: 1,
        flexDirection: 'column'
    },
    titleText:{
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }
})

export default styles;