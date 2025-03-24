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
import { StorageDataModification } from "../../../services/common-view-function";


const dayDataArr = [{
    "backgroundColor": "#05D093", "dataId": 1, "icon": `<svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 38.498H24.5C33.25 38.498 36.75 34.998 36.75 26.248V15.748C36.75 6.99805 33.25 3.49805 24.5 3.49805H17.5C8.75 3.49805 5.25 6.99805 5.25 15.748V26.248C5.25 34.998 8.75 38.498 17.5 38.498Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.875 13.2598V15.0098C28.875 16.4448 27.7025 17.6348 26.25 17.6348H15.75C14.315 17.6348 13.125 16.4623 13.125 15.0098V13.2598C13.125 11.8248 14.2975 10.6348 15.75 10.6348H26.25C27.7025 10.6348 28.875 11.8073 28.875 13.2598Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.2382 24.5H14.2584" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.9922 24.5H21.0125" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.7452 24.5H27.7654" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.2383 30.627H14.2556" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.9922 30.623H21.0125" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.7452 30.623H27.7654" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, "iconBgColor": null, "isDisable": false, "labelName": "Transaction", "labelNameColor": "#FFFFFF", "name": "Passsbook", "nameColor": "#FFFFFF", "routeName": "PassbookAndRedemption"
}, {
    "backgroundColor": "#0591B9", "dataId": 2, "icon": `<svg width="20" height="20" viewBox="0 0 54 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27 28.15C29.65 30.55 33.15 32 37 32C45.275 32 52 25.275 52 17C52 8.725 45.275 2 37 2C33.15 2 29.65 3.45 27 5.85M27 28.15C30.075 25.425 32 21.425 32 17C32 12.575 30.075 8.575 27 5.85M27 28.15C24.35 30.55 20.85 32 17 32C8.725 32 2 25.275 2 17C2 8.725 8.725 2 17 2C20.85 2 24.35 3.45 27 5.85" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, "iconBgColor": null, "isDisable": false, "labelName": "For you", "labelNameColor": "#FFFFFF", "name": "Customer", "nameColor": "#FFFFFF", "routeName": "SchemePage"
}, {
    "backgroundColor": "#0B4F6C", "dataId": 3, "icon": `<svg width="20" height="20" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M57.75 21.7088V11.1038C57.75 6.93 56.07 5.25 51.8963 5.25H41.2912C37.1175 5.25 35.4375 6.93 35.4375 11.1038V21.7088C35.4375 25.8825 37.1175 27.5625 41.2912 27.5625H51.8963C56.07 27.5625 57.75 25.8825 57.75 21.7088Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5625 22.365V10.4475C27.5625 6.74625 25.8825 5.25 21.7088 5.25H11.1038C6.93 5.25 5.25 6.74625 5.25 10.4475V22.3388C5.25 26.0663 6.93 27.5363 11.1038 27.5363H21.7088C25.8825 27.5625 27.5625 26.0663 27.5625 22.365Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5625 51.8963V41.2912C27.5625 37.1175 25.8825 35.4375 21.7088 35.4375H11.1038C6.93 35.4375 5.25 37.1175 5.25 41.2912V51.8963C5.25 56.07 6.93 57.75 11.1038 57.75H21.7088C25.8825 57.75 27.5625 56.07 27.5625 51.8963Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M39.375 40.6875H55.125" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <path d="M39.375 51.1875H55.125" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>`, "iconBgColor": null, "isDisable": false, "labelName": "Active", "labelNameColor": "#FFFFFF", "name": "Catalogue", "nameColor": "#FFFFFF", "routeName": "Catalogue"
}]


class ActivitySelectionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayData: dayDataArr,
            loader: true
        };
    }

    componentDidMount = async () => {
        await this.onLoad();
    }

    // for load the page with api calling
    onLoad = async () => {
        // let activityData = await StorageDataModification.lmsActivitySelectionTab({}, "get");
        // if (activityData) {
        //     this.state.dayData = activityData;
        // } else {
        //     await this.onApiCalling();
        // }

        // this.setState({ dayData: dayDataArr })
        await this.setLoader(false);
    }

    // for api call 
    onApiCalling = async () => {
        let responseData = await MiddlewareCheck("getCardSection", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dayData = responseData.response;
                await StorageDataModification.lmsActivitySelectionTab(responseData.response, "store")
                this.setState(this.state);
            }
        }
    }

    // for change the loader
    setLoader = async (type) => {
        this.state.loader = type;
        this.setState(this.state);
    }

    // for select the item
    selectItem = async (itemData, key) => {
        await this.setLoader(true);
        if (itemData.routeName && itemData.routeName.length > 0) {
            this.props.navigation.navigate(itemData.routeName);
        }
        this.setState(this.state);
        this.props.onClickItem(itemData);
        await this.setLoader(false);
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
                <TouchableOpacity disabled={isDisable} onPress={() => this.selectItem(itemData, i)} style={{ width: Dimension.width / 3, alignItems: 'center', backgroundColor: backgroundColor, borderRadius: 10, marginRight: 10, paddingVertical: 15 }} key={i}>
                    <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: iconBgColor, justifyContent: "center", alignItems: 'center' }}>
                        <SvgXml xml={`${icon}`} />
                    </View>
                    <Text style={{ color: nameColor, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{name}</Text>
                    <Text style={{ color: labelNameColor, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{labelName}</Text>
                </TouchableOpacity>
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

export default ActivitySelectionTab;