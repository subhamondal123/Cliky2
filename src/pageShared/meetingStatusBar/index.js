//1. this is used for activity process bar with data


import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    View,
    Image,
    Text
} from 'react-native';
import {
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';
import { DateConvert } from '../../services/common-view-function';

function MeetingStatusBar({
    data,
    isHidden,
    isDisabled,
    type,
    borderRadius,
    boxBackgroundColor
}) {
    if (isHidden) return null;



    // .........approve,,,,,,,,,,
    // const approveBoxStyle = {
    //     flexDirection: "row",
    //     borderRadius: 25,
    //     paddingLeft: 20,
    //     alignItems: "center",
    //     backgroundColor: "#209584",
    // }

    const completedBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: "#C77BB2",
    }

    const naBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: "#CBCBCB",
    }

    const approvedBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: "#13BFA6",
    }

    const approveBoxTxtStyle = {
        color: "#7AD9CB",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const approveStatusIconBoxStyle = {
        backgroundColor: "#7AD9CB",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const approveStatusIconTxtStyle = {
        color: "#c3eee8",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    //................accepted................

    const acceptedBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: "#045b5e",
    }

    const acceptedBoxTxtStyle = {
        color: "#10dee6",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const acceptedStatusIconBoxStyle = {
        backgroundColor: "#10dee6",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const acceptedStatusIconTxtStyle = {
        color: "#c3eee8",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    // .......pending,,,,,,,,,,
    const pendingBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: "#3DACFF",
        alignItems: "center",
    }

    const pendingBoxTxtStyle = {
        color: "#99d3ff",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const pendingStatusIconBoxStyle = {
        backgroundColor: "#99d3ff",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const pendingStatusIconTxtStyle = {
        color: "#cce9ff",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    // ,,,,,,,,,,,,,,,approved,,,,,,,,,,,,,
    const draftedBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: "#EEDE4C",
        alignItems: "center",
    }

    const draftedBoxTxtStyle = {
        color: "#f6eea2",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const draftedStatusIconBoxStyle = {
        backgroundColor: "#f6eea2",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const draftedStatusIconTxtStyle = {
        color: "#fbf6d0",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }


    // ,,,,,,,,,,,,,,,hold,,,,,,,,,,,,,
    const holdBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: "#a6b811",
        alignItems: "center",
    }

    const holdBoxTxtStyle = {
        color: "#f6eea2",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const holdStatusIconBoxStyle = {
        backgroundColor: "#717d09",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const holdStatusIconTxtStyle = {
        color: "#717d09",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    // ,,,,,,,,rejected,,,,,,,,,,,,,,,,,,,
    const rejectedBoxStyle = {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: "#F76770",
        alignItems: "center",
    }

    const rejectedBoxTxtStyle = {
        color: "#fa9ea4",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const rejectedStatusIconBoxStyle = {
        backgroundColor: "#fa9ea4",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const rejectedStatusIconTxtStyle = {
        color: "#fccfd2",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    const completedBoxTxtStyle = {
        color: "#f0dbea",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const naBoxTxtStyle = {
        color: "#ffffff",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    }

    const completedStatusIconBoxStyle = {
        backgroundColor: "#e0b8d5",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const naStatusIconBoxStyle = {
        backgroundColor: "#fffff",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16
    }

    const completedStatusIconTxtStyle = {
        color: "#f7edf4",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    const naStatusIconTxtStyle = {
        color: "#999999",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XXL,
        position: "absolute",
    }

    return (
        <View style={type == "pending" ? pendingBoxStyle : type == "draft" ? draftedBoxStyle : type == "rejected" ? rejectedBoxStyle : type == "completed" ? completedBoxStyle : type == "approved" ? approvedBoxStyle : type == "accepted" ? acceptedBoxStyle : type == "hold" ? holdBoxStyle : naBoxStyle}>
            <View style={{ paddingRight: 10 }}>
                <Text style={type == "pending" ? pendingBoxTxtStyle : type == "draft" ? draftedBoxTxtStyle : type == "rejected" ? rejectedBoxTxtStyle : type == "completed" ? completedBoxTxtStyle : type == "approved" ? approveBoxTxtStyle : type == "accepted" ? acceptedBoxTxtStyle : naBoxTxtStyle}>{type == "pending" ? "Pending" : type == "draft" ? "Drafted" : type == "rejected" ? "Rejected" : type == "completed" ? "Completed" : type == "approved" ? "Approved" : type == "accepted" ? "Accepted" : type == "hold" ? "Hold" : "N/A"}</Text>
            </View>
            <View style={type == "pending" ? pendingStatusIconBoxStyle : type == "draft" ? draftedStatusIconBoxStyle : type == "rejected" ? rejectedStatusIconBoxStyle : type == "completed" ? completedStatusIconBoxStyle : type == "approved" ? approveStatusIconBoxStyle : type == "accepted" ? acceptedStatusIconBoxStyle : naStatusIconBoxStyle}>
                <Text style={type == "pending" ? pendingStatusIconTxtStyle : type == "draft" ? draftedStatusIconTxtStyle : type == "rejected" ? rejectedStatusIconTxtStyle : type == "completed" ? completedStatusIconTxtStyle : type == "approved" ? approveStatusIconTxtStyle : type == "accepted" ? acceptedStatusIconTxtStyle : type == "hold" ? holdStatusIconTxtStyle : naStatusIconTxtStyle}>{type == "pending" ? "P" : type == "draft" ? "D" : type == "rejected" ? "R" : type == "completed" ? "C" : type == "approved" ? "A" : type == "accepted" ? "A" : type == "hold" ? "H" : "N"}</Text>
            </View>
        </View>
    )

}

MeetingStatusBar.defaultProps = {
    data: [],
    isHidden: false,
    isDisabled: false,
    type: "approved",
    borderRadius: 25,
    boxBackgroundColor: "#209584"
};

MeetingStatusBar.propTypes = {
    data: PropTypes.array,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
    borderRadius: PropTypes.number,
    boxBackgroundColor: PropTypes.string,
};


export default MeetingStatusBar;