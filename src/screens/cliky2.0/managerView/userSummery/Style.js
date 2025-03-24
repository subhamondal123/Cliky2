import { StyleSheet } from "react-native";
import { Color, FontFamily,Dimension ,FontSize} from "../../../../enums";
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    container: {
        flexDirection: "row", // Set the direction to horizontal
        padding: 20,
    },
    itemBtn: {
        marginRight: 10,
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F13748",
    },

    itemContainer: {
        backgroundColor: "#F0F4F7",
        marginHorizontal: "5%",
        marginVertical: "3%",
        borderRadius: 5,
        padding: 10,
    },
    mapAdds: {
        flexDirection: "row",
        // marginLeft:'5%',
        alignItems: "flex-start",
        gap: 5,
    },
    call: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
        flex: 0.25,
    },
    firstRow: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: 'space-between'
        flex: 1,
    },
    adsTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontWeight: "300",
    },
    dgmContain: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
        justifyContent: "center",
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    dgmTxt: {
        color: "#4488A9",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontWeight: "500",
        fontSize: 11,
        textAlign: "center",
    },
    dgmAdsContain: {
        flexDirection: "row",
        gap: 20,
        flex: 0.75,
    },
    nameTxtContain: {},
    nameTxt: {
        fontSize: 14,
        color: "#1F2B4D",
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    leaveBtn: {
        backgroundColor: "#F13748",
        paddingHorizontal: 10,
        paddingVertical: 5,
        // width: 50,
        // height: 22,
        justifyContent: "center",
        borderRadius: 5,
    },
    secondRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5%",
        alignItems: "center",
    },
    leaveBtnTxt: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 11,
        fontWeight: "500",
    },
    activeBtn: {
        marginRight: 10,
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        // borderWidth: 1,

        backgroundColor: "#F13748",
    },
    activeTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    text: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    designationSec: { flexDirection: "row", alignItems: "center" },
    phoneTabSec: {
        flex: 0.25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    callIcon: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    whatsappIcon: {
        height: 32,
        width: 32,
        resizeMode: "contain"
    },
    descriptionTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
    },
    viewStyle: {
        borderColor: "#D1D1D1",
        marginTop: "3%",
        borderBottomWidth: 0.5,
    },
    itemSec: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    itemTxtSec: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.33
    },
    itemValTxt: {
        color: "#1F2B4D",
        fontWeight: "400",
        fontSize: 15,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    itemTxt: {
        color: "#1F2B4D",
        fontWeight: "400",
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    productivityTxt: {
        color: "#1F2B4D",
        fontWeight: "400",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    netValSec: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    loaderSec: {
        height: Dimension.height,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default styles;
