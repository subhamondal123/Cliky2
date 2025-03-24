import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    space: {
        marginHorizontal: '5%',
        marginTop: '5%'
    },
    rcBox: {
        borderRadius: 30,
        backgroundColor: '#070457',
        height: 129,
        flexDirection: 'row'
    },
    calenderImgSec: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'center'
    },
    calenderImg: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    meetingBoxSec: {
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    upcomingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ACAAC6'
    },
    upcomingValue: {
        fontSize: 48,
        fontWeight: '700',
        color: '#fff'
    },
    boxRow: {
        flexDirection: 'row',
        marginTop: 22
    },
    boxSec: {
        borderRadius: 20,
        flex: 1,
        height: 129,
        marginRight: 5
    },
    boxApproveSec: {
        borderRadius: 20,
        flex: 1,
        height: 129,
        marginLeft: 5
    },
    boxSideSpace: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    whiteCircleSec: {
        alignSelf: 'flex-end',
        marginTop: 10
    },
    whiteCircle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    text: {
        color: '#fff',
        textShadowColor: '#838EAD',
        textShadowOffset: { width: 3, height: 4 },
        textShadowRadius: 5,
        fontSize: 23,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    textApprove: {
        color: '#fff',
        textShadowColor: '#C8BB4E',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        fontSize: 23,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    meetingText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        color: '#808DAF'
    },
    meetingApproveText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        color: '#B9B064'
    },
    exText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: '#1C165B'
    },
    exApproveText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: '#756D2A'
    },
    underLine: {
        borderWidth: 0.5,
        borderColor: "#f5f5f5",
        marginHorizontal: "5%",
        backgroundColor: "#f5f5f5"
    },
    circularBarSec: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // paddingVertical:"10%"
    },
    loaderSec: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"30%",
        backgroundColor:"green"
        // flex:1
        // paddingVertical:"10%"
    },
    filterImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    filterImgSec: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        width: Dimension.width / 3,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: 20,
        position: 'absolute',
        shadowColor: "#C8BB4E",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5
    },
    barTooltipSec: {
        width: "100%",
        padding: "5%",
    },
    meetingCountSec: {
        flexDirection: "row",
        paddingVertical: "5%"
    },
    meetingApprovedSec: {
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "flex-start",
        paddingRight: "5%"
    },
    meetingPendingSec: {
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "flex-start"
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 7,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#336dff",
        marginTop: "5%",
        elevation: 2
    },
    dotCanceled: {
        height: 10,
        width: 10,
        borderRadius: 7,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#CAD9FF",
        marginTop: "5%",
        elevation: 2
    },
    dotCompany: {
        height: 10,
        width: 10,
        borderRadius: 7,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#FCC576",
        marginTop: "5%",
        elevation: 2
    },
    dotPartner: {
        height: 10,
        width: 10,
        borderRadius: 7,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#feeacd",
        marginTop: "5%",
        elevation: 2
    },
    labelTxt: {
        fontSize: 8,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: '#818181'
    },
    labelApprovedTxt:{
        fontSize: 10,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: '#818181'
    },
    barHeadSec: {

        flexDirection: "row",
        // alignItems:"center",
        // justifyContent:"space-between"
    },
    barTitleTxt: {
        fontSize: 13,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.DARK_BLUE
    },
    barTimeTxt: {
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        color: "#000000"
    },
    valueTxt: {
        fontSize: 15,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.BLUE.DARK_BLUE
    },
    tooltipListView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    filterFieldTxt:{
        fontSize: 14,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.DARK_BLUE
    },
    bottomButton:{ 
        height: 65,
        width: 65,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextBtnText: {
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM,
        color: '#fff',
        marginLeft: 10,
        marginRight: 10
    },

    ///////////////////////////////
    headerBelowBox: {
        height: 60
    },
    smallBox: {
        flexDirection: 'row',
        marginTop: "5%"
    },
    smallLeftBox: {
        height: Dimension.height / 4,
        width: (Dimension.width / 2) - 20,
        // marginLeft: 10,
        marginRight: 10
    },
    smallRightBox: {
        height: Dimension.height / 4,
        width: (Dimension.width / 2) - 20,
        // marginLeft: 10,
        marginRight: 10
    },
    graphBox: {
        marginTop: '5%',
        height: Dimension.height / 2
    }
});

export default styles;