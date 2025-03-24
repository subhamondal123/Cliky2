// this is used for dashboard
import React, { Component, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import {
    View,
    TouchableOpacity,
    Text
} from "react-native";
import { SvgXml } from "react-native-svg";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { StorageDataModification, Toaster } from "../../../services/common-view-function";



class DayActivitySelectionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayData: [],
            loader: true,
            clickCheck: true,
            userHaedData: {}
        };
    }

    componentDidMount = async () => {
        // await StorageDataModification.dayActivitySelectionSectionData({}, "clear");
        this.onGetEditCheck();
        await this.onLoad();
    }

    // for get edit check
    onGetEditCheck = async () => {
        let dayData = await StorageDataModification.dayActivitySelectionSectionData({}, "get");
        if (dayData) {
            for (let i = 0; i < dayData.length; i++) {
                if (dayData[i].check) {
                    this.state.clickCheck = false;
                    break;
                }
            }
        }
    }

    // for load the page with api calling
    onLoad = async () => {
        let headerData = await StorageDataModification.headerData({}, "get");
        this.state.userHaedData = headerData;
        let activityData = await StorageDataModification.dayActivitySelectionSectionData({}, "get");
        if (activityData) {
            this.state.dayData = activityData;
        } else {
            await this.onApiCalling();
        }
        this.setState(this.state);
        await this.setLoader(false);
    }

    // for api calling
    onApiCalling = async () => {
        let responseData = await MiddlewareCheck("DayActivitySelectionSection", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dayData = responseData.response;
                await StorageDataModification.dayActivitySelectionSectionData(responseData.response, "store");
                this.setState(this.state);
            }
        }
    }


    // for update attandence
    onUpdateAttandance = async (selectedData) => {
        let reqData = {

            "isAttendence": this.props.Sales360Redux.attendanceData.isAttendance,
            "activityId": (selectedData.dataId).toString()
        }
        let resp = await MiddlewareCheck("updateDailyWorkType", reqData, this.props);
    }

    // for change the loader
    setLoader = async (type) => {
        this.state.loader = type;
        this.setState(this.state);
    }

    // for select the item
    selectItem = async (itemData, key) => {
        let isEditable = this.props.Sales360Redux.attendanceData.isAttendance == 1 ? true : false;
        if (this.props.Sales360Redux.attendanceData.isAttendance == 1) {
            await this.setLoader(true);
            let checkIndex = key,
                checkChangeCount = 0,
                dayData = await StorageDataModification.dayActivitySelectionSectionData({}, "get");

            for (let i = 0; i < dayData.length; i++) {
                if (!dayData[i].check) {
                    checkChangeCount++;
                    // this.state.dayData[i]["check"] = true;
                }
                //  else {
                //     this.state.dayData[i]["check"] = false;
                // }
            }
            if (checkChangeCount == dayData.length) {
                this.props.stateDayActivitySelectionData(itemData);
                this.state.clickCheck = false;
                dayData[checkIndex]["check"] = true;
                this.onUpdateAttandance(itemData);
            }
            await StorageDataModification.dayActivitySelectionSectionData(dayData, "store");
            this.state.dayData = dayData;
            if (itemData.routeName && itemData.routeName.length > 0) {
                this.props.navigation.navigate(itemData.routeName);
            }
            this.setState(this.state);
            this.props.onClickItem(itemData);
            await this.setLoader(false);
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
            this.props.onVisibleAttandance();
        }

        else {
            // this.props.onVisibleAttandance();
        }
    }

    // for view the design
    onViewDesign = () => {
        let respDesign = [];
        let dividedBy = this.state.dayData ? this.state.dayData.length : 1;
        if (this.state.dayData && this.state.dayData.length > 3) {
            dividedBy = 3;
        }
        for (let i = 0; i < this.state.dayData.length; i++) {
            let itemData = this.state.dayData[i];
            let labelName = "Visit",
                bgColor = "#FFFFFF",
                icon = null,
                labelColor = "#747C90",
                count = 0,
                isDisable = false,
                isDotView = true,
                dotColor = "#F13748",
                borderColor = "#747C90",
                borderWidth = 1,
                routeName = "Home";
            if (itemData.labelName && itemData.labelName) {
                labelName = itemData.labelName;
            }
            if (itemData.inActiveBgColor && itemData.inActiveBgColor) {
                bgColor = itemData.inActiveBgColor;
            }
            if (itemData.inActiveIcon && itemData.inActiveIcon) {
                icon = itemData.inActiveIcon;
            }
            if (itemData.inActiveLabelColor && itemData.inActiveLabelColor) {
                labelColor = itemData.inActiveLabelColor;
            }
            if (itemData.count && itemData.count) {
                count = parseInt(itemData.count);
            }
            if (itemData.isDisable && itemData.isDisable) {
                isDisable = itemData.isDisable;
            }
            if (!this.state.clickCheck) {
                isDisable = true;
            }
            if (itemData.isDotView && itemData.isDotView) {
                isDotView = itemData.isDotView;
            }
            if (itemData.dotColor && itemData.dotColor) {
                dotColor = itemData.dotColor;
            }
            if (itemData.borderColor && itemData.borderColor) {
                borderColor = itemData.borderColor;
            }
            if (itemData.borderWidth && itemData.borderWidth) {
                borderWidth = parseInt(itemData.borderWidth);
            }
            if (itemData.routeName && itemData.routeName) {
                routeName = itemData.routeName;
            }
            if (itemData.check) {
                if (itemData.activeBgColor && itemData.activeBgColor) {
                    bgColor = itemData.activeBgColor;
                }
                if (itemData.activeIcon && itemData.activeIcon) {
                    icon = itemData.activeIcon;
                }
                if (itemData.activeLabelColor && itemData.activeLabelColor) {
                    labelColor = itemData.activeLabelColor;
                }
            }
            respDesign.push(
                <TouchableOpacity disabled={isDisable} style={{ flexDirection: 'row', backgroundColor: bgColor, width: Dimension.width / dividedBy, paddingVertical: 4 }} onPress={() => this.selectItem(itemData, i)} key={i}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: ((Dimension.width / dividedBy) - 1), paddingVertical: 11 }}>
                        {itemData.isDotView ?
                            <React.Fragment>
                                {itemData.check ?
                                    null :
                                    <React.Fragment>
                                        {(count && count > 0) ?
                                            <View style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 60, right: 15 }}>
                                                <View style={{ height: 5, width: 5, backgroundColor: dotColor, borderRadius: 50 }} />
                                            </View> :
                                            null
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment> :
                            null
                        }
                        <SvgXml xml={`${icon}`} />
                        <Text style={{ color: labelColor, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{labelName}</Text>
                    </View>
                    {((this.state.dayData.length - 1) == i) ?
                        null :
                        <View style={{ borderRightWidth: borderWidth, borderRightColor: borderColor }} />
                    }
                </TouchableOpacity>
            )
        }
        return respDesign;
    }

    // for shimmer view
    shimmerView = () => {
        let itemWidth = ((Dimension.width / 3) - 5);
        return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ height: 75, width: itemWidth, marginRight: 7 }} />
                    <View style={{ height: 75, width: itemWidth, marginRight: 7 }} />
                    <View style={{ height: 75, width: itemWidth }} />
                </View>
            </SkeletonPlaceholder>
        )
    }

    render() {
        if (this.state.loader) {
            return (this.shimmerView());
        } else {
            return (this.onViewDesign());
        }
    }
}


export default DayActivitySelectionSection;