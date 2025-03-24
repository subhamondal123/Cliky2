// this is used for dashboard
import React, { Component } from "react";
import { Dimension, FontFamily, FontSize } from "../../../enums";
import { View, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { StorageDataModification } from "../../../services/common-view-function";
import { storageTabData } from "./function";


class CrmUserActivitySelectionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayData: [],
            loader: true
        };
    }

    componentDidMount = async () => {
        await this.onLoad();
    }

    onRefresh = async () => {
        this.setState({ loader: true })
        await this.onLoad();
    }

    // for load the page with api calling
    onLoad = async () => {
        this.setState(await storageTabData(this.state, this.props));
        await this.setLoader(false);
    }

    // // for api call 
    // onApiCalling = async () => {
    //     let responseData = await MiddlewareCheck("UserActivitySelectionSection", {}, this.props);
    //     if (responseData) {
    //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //             this.state.dayData = responseData.response;
    //             await StorageDataModification.userActivitySelectionSectionData(responseData.response, "store")
    //             this.setState(this.state);
    //         }
    //     }
    // }

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
            // for (let i = 0; i < this.state.dayData.length; i++) {
            //     if (i === key) {
            //         this.state.dayData[i]["check"] = true;
            //     } else {
            //         this.state.dayData[i]["check"] = false;
            //     }
            // }
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
            let name = "",
                backgroundColor = "#F0F4F7",
                nameColor = "#1F2B4D",
                labelName = "",
                labelNameColor = "#747C90",
                icon = null,
                iconBgColor = null,
                isDisable = false,
                routeName = "",
                dataId = 1;

            if (itemData.name && itemData.name.length > 0) {
                name = itemData.name;
            }
            if (itemData.backgroundColor && itemData.backgroundColor.length > 0) {
                backgroundColor = itemData.backgroundColor;
            }
            if (itemData.nameColor && itemData.nameColor.length > 0) {
                nameColor = itemData.nameColor;
            }
            if (itemData.labelName && itemData.labelName.length > 0) {
                labelName = itemData.labelName;
            }
            if (itemData.labelNameColor && itemData.labelNameColor.length > 0) {
                labelNameColor = itemData.labelNameColor;
            }
            if (itemData.icon && itemData.icon.length > 0) {
                icon = itemData.icon;
            }
            if (itemData.iconBgColor && itemData.iconBgColor.length > 0) {
                iconBgColor = itemData.iconBgColor;
            }
            if (itemData.isDisable) {
                isDisable = itemData.isDisable;
            }
            if (itemData.routeName && itemData.routeName.length > 0) {
                routeName = itemData.routeName;
            }
            if (itemData.dataId) {
                dataId = itemData.dataId;
            }

            respDesign.push(
                <View disabled={isDisable} style={{ width: Dimension.width / 3, alignItems: 'center', backgroundColor: backgroundColor, borderRadius: 10, marginRight: 10, paddingVertical: 15 }} key={i}>
                    <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: iconBgColor, justifyContent: "center", alignItems: 'center' }}>
                        <SvgXml xml={`${icon}`} />
                    </View>
                    <Text style={{ color: nameColor, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{name}</Text>
                    <Text style={{ color: labelNameColor, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{labelName}</Text>
                </View>
            )
        }
        return respDesign;
    }

    // for shimmer view
    shimmerView = () => {
        let itemWidth = ((Dimension.width / 3) - 5);
        return (
            <SkeletonPlaceholder borderRadius={10}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: Dimension.width / 3, width: itemWidth, marginRight: 7 }} />
                    <View style={{ height: Dimension.width / 3, width: itemWidth, marginRight: 7 }} />
                    <View style={{ height: Dimension.width / 3, width: itemWidth }} />
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

export default CrmUserActivitySelectionSection;