import { StyleSheet } from "react-native";
import { Color, FontFamily } from "../../../../enums";
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    container: {
        flexDirection: 'row', // Set the direction to horizontal
        padding: 20,

    },
    itemBtn: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F13748',
    },
    text: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12
    },
    itemContainer: {
        backgroundColor: '#F0F4F7',
        marginHorizontal: '5%',
        marginVertical: '3%',
        borderRadius: 5,
        padding: 10
    },
    mapAdds: {
        flexDirection: 'row',
        // marginLeft:'5%',
        alignItems: 'center',
        gap: 5
    },
    call: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    adsTxt: {
        fontSize: 11,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
    dgmContain: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 5,
        justifyContent: 'center',
        borderRadius: 5
    },
    dgmTxt: {
        color: '#4488A9',
        fontSize: 11,
        textAlign: 'center',
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,

    },
    dgmAdsContain: {
        flexDirection: 'row',
        gap: 20
    },
    nameTxtContain: {

    },
    nameTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 14
    },
    leaveBtn: {
        backgroundColor: '#F13748',
        paddingHorizontal: 10,
        paddingVertical: 3,
        // width: 50,
        // height: 22,
        justifyContent: 'center',
        borderRadius: 5
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
        alignItems: 'center',

    },
    leaveBtnTxt: {
        textAlign: 'center',
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 11
    },
    activeBtn: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 20,
    },
    activeTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12
    },
    noDataFoundTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 12
    },
    borderLine: {
        borderBottomWidth: 0.5,
        borderColor: '#D1D1D1',
        marginTop: '3%'
    },
    topSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    itemSec: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.33
    },
    itemDataTxt: {
        color: '#1F2B4D',
        fontWeight: '400',
        fontSize: 15,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    itemLabelTxt: {
        color: '#1F2B4D',
        fontWeight: '400',
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    }
})
export default styles;