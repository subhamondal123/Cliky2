//1. this is used for activity process bar with data


import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { DateConvert, StorageDataModification } from '../../../services/common-view-function';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { ImageName } from '../../../enums';
import { dailyOrderList, fetchOrderData, modifyOrderListData } from './function';
import { ClientSettings } from '../../../services/userPermissions';
import { DeviceInfo } from '../../../services/config';

class OrderListWithNextPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loader: true,
            previousViewCheck: true,
            nextViewCheck: false,
            changedDate: new Date(),
            orderCount: 0,
            offlineData: "",
            isOffline: false,
            isNetActive: false,
            offlineListData: []
        };
    }

    componentDidMount = async () => {
        this.load();
    }

    onRefresh = async () => {
        this.setState({ loader: true })
        await this.setInitialData()
        await this.load();
    }

    setInitialData = async () => {
        this.setState({
            previousViewCheck: true,
            nextViewCheck: false,
            changedDate: new Date(),
            orderCount: 0,
            data: [],
        })
    }

    // for initial load of the component
    load = async () => {
        let dailyList = await StorageDataModification.dayWiseOrderListData({}, "get");
        if (dailyList) {
            // this.state.data = dailyList.data;
            // this.state.orderCount = dailyList.totalOrderCount;
            // this.state.loader = false;
            // this.setState(this.state);
            this.setState({
                data: dailyList.data,
                orderCount: dailyList.totalOrderCount,
                loader: false
            })
            if (await ClientSettings.OfflineAccess.getOfflineAccess()) {
                this.setState({ isOffline: true })
            } else {
                this.setState({ isOffline: false })
            }
            if (await DeviceInfo.CheckConnection()) {
                this.setState({ isNetActive: true })
                await this.fetchOrderData(this.state.changedDate);
            } else {
                this.setState({ isNetActive: false })
                await this.setOfflineOrderList()
            }
        } else {
            if (await DeviceInfo.CheckConnection()) {
                this.setState({ isNetActive: true })
                await this.fetchOrderData(this.state.changedDate);
            } else {
                this.setState({ isNetActive: false })
            }
            this.setState({ loader: false })
        }
        // this.state.loader = false;
        this.state.offlineData = await ClientSettings.OfflineAccess.getOfflineAccess();
        // this.setState(this.state);
        this.setState({ loader: false, offlineData: this.state.offlineData })
    }

    setOfflineOrderList = async () => {
        let orderListArr = [],
            orderCount = 0;
        let visitOfflineData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        if (visitOfflineData !== null && visitOfflineData !== undefined && Object.keys(visitOfflineData).length > 0) {

            // const outputArray = Object.values(visitOfflineData).map(order => order.orderData.orderDetails).flat();
            const outputArray = Object.values(visitOfflineData)
                .filter(entry => entry.orderData && entry.orderData.orderDetails)
                .flatMap(entry => {
                    const orderData = entry.orderData;
                    return orderData.orderDetails.map(detail => ({
                        isPlaceOrder: detail.isPlaceOrder,
                        isSync: detail.isSync,
                        productName: detail.productName,
                        prodhierarchyTypeId: detail.prodhierarchyTypeId,
                        prodhierarchyDataId: detail.prodhierarchyDataId,
                        quantity: detail.quantity,
                        totalPrice: detail.totalPrice,
                        unitShort: detail.unitShort,
                        rate: detail.rate
                    }));
                });

            orderListArr = modifyOrderListData(outputArray)
            orderCount = modifyOrderListData(outputArray).length
            this.setState(this.state)
        }
        this.setState({ offlineListData: orderListArr, orderCount: orderCount })
    }

    // for get the order Data from api
    fetchOrderData = async (date) => {
        let reqData = {
            currentDate: DateConvert.formatYYYYMMDD(date),
            searchText: "",
            limit: "5",
            offset: "0"
        }
        let responseData = await MiddlewareCheck("getCurrentOrdersListForDashboard", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.data = responseData.response.data;
                this.state.orderCount = responseData.response.totalOrderCount;
                await StorageDataModification.dayWiseOrderListData(responseData.response, "store");
                this.setState({ data: this.state.data, orderCount: this.state.orderCount });
            }
        }
    }

    // for previous click
    onPrevious = async () => {
        const previous = new Date(this.state.changedDate.getTime());
        previous.setDate(this.state.changedDate.getDate() - 1);
        this.state.changedDate = previous;
        this.state.nextViewCheck = true;
        this.state.loader = true;
        this.setState(this.state);
        await this.fetchOrderData(previous);
        this.state.loader = false;
        this.setState(this.state);
    }

    // for next click
    onNext = async () => {
        const next = new Date(this.state.changedDate.getTime());
        next.setDate(this.state.changedDate.getDate() + 1);
        this.state.changedDate = next;
        // if (DateConvert.formatDDMMYYYY(this.state.changedDate) < DateConvert.formatDDMMYYYY(new Date())) {
        if ((new Date(this.state.changedDate) < new Date().setHours(0, 0, 0, 0))) {
            this.state.nextViewCheck = true;
            this.state.loader = true;
            this.setState(this.state);
            await this.fetchOrderData(next);
            this.state.loader = false;
            this.setState(this.state);

        }
        else {
            this.state.nextViewCheck = false;
            this.state.loader = true;
            this.setState(this.state);
            await this.fetchOrderData(next);
            this.state.loader = false;
            this.setState(this.state);

        }
        this.setState(this.state);
    }


    // for view today's order list section
    onViewTodayOrder = () => {
        let dateViewText = "Today’s";
        if (new Date(this.state.changedDate) < new Date().setHours(0, 0, 0, 0)) {
            dateViewText = DateConvert.getDayMonthYearName(this.state.changedDate);
        }
        return (
            <React.Fragment>
                <View style={styles.headMainView}>
                    <View style={styles.dateMainTextView}>
                        <Text style={styles.dateMainText}>{dateViewText} Orders</Text>
                    </View>
                    <View style={styles.orderCountView}>
                        <Text style={styles.orderCountText}>{this.state.orderCount}</Text>
                    </View>
                    <View style={styles.buttonMainView}>
                        {this.state.previousViewCheck ?
                            <React.Fragment>
                                {this.state.nextViewCheck ?
                                    null :
                                    <View style={{ flex: 1 }} />
                                }
                                <React.Fragment>
                                    {this.state.offlineData ?
                                        null :
                                        <View style={{ flex: 1, marginHorizontal: this.state.nextViewCheck ? 10 : 0 }}>
                                            <TouchableOpacity style={styles.buttonTouchView} onPress={() => this.onPrevious()}>
                                                <Text style={styles.buttonText}>Previous</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </React.Fragment>
                            </React.Fragment> :
                            null
                        }
                        {this.state.nextViewCheck ?
                            <React.Fragment>
                                {this.state.previousViewCheck ?
                                    null :
                                    <View style={{ flex: 1 }} />
                                }
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={styles.buttonTouchView} onPress={() => this.onNext()}>
                                        <Text style={styles.buttonText}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment> :
                            null
                        }
                    </View>
                </View>
                <View style={styles.listContainerView}>
                    {!this.state.isNetActive ? this.isViewOfflineListItem() : this.onViewListItem()}
                </View>
            </React.Fragment>
        )
    }



    isViewOfflineListItem = () => {
        let listData = [];
        for (let i = 0; i < this.state.offlineListData.length; i++) {
            listData.push(
                <View style={styles.listMainView} key={i}>
                    <View style={styles.imageView}>
                        <Image source={ImageName.CHALO_BACHO_LOGO} style={styles.image} />
                    </View>
                    <View style={styles.bodyTextView}>
                        <Text style={styles.bodyHeadText}>{this.state.offlineListData[i].productName}</Text>
                        {/* <Text style={styles.bodySubText}>{subName}</Text> */}
                    </View>
                    <View style={{ flex: 0.4 }} >
                        <Text style={styles.amountText}>{"₹" + " " + (this.state.offlineListData[i].totalPrice ? this.state.offlineListData[i].totalPrice : "0")}</Text>
                    </View>
                    {/* <View style={styles.scoreTextView}>
                        <Text style={styles.firstText}>{(this.state.data[i].storeCount ? parseInt(this.state.data[i].storeCount).toFixed(2) : "0")}</Text>
                        <View style={{ width: 8 }} />
                        <View style={styles.deviderLine} />
                        <View style={{ width: 8 }} />
                        <Text style={styles.totalItemText}>{(this.state.data[i].totalQty ? parseInt(this.state.data[i].totalQty).toFixed(2) : "0")}</Text>
                    </View> */}
                </View>
            )
        }
        return (listData);
    }

    // for view the list item
    onViewListItem = () => {
        let listData = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let headName = "",
                subName = "",
                shopName = this.state.data[i].shopName,
                objData = this.state.data[i].prodHmUpperNodes;
            if (objData && Object.keys(objData).length > 0) {
                const keys = Object.keys(objData);
                if (keys.length >= 2) {
                    subName = objData[keys[0]];
                    headName = objData[keys[1]];
                } else {
                    console.log("Data object does not have enough properties.");
                }
            }
            listData.push(
                <View style={styles.listMainView} key={i}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.imageView}>
                            <Image source={ImageName.PAPAD_IMG} style={styles.image} />
                        </View>
                        <View style={{ flex: 0.55 }}>
                            <Text style={styles.bodyHeadText}>{headName}</Text>

                        </View>

                        {/* <View style={styles.bodyTextView}>
                            <Text style={styles.bodySubText}>{subName}</Text>
                        </View> */}
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.scoreTextView}>
                            <Text style={styles.firstText}>{(this.state.data[i].storeCount ? parseInt(this.state.data[i].storeCount).toFixed(2) : "0")}</Text>
                            <View style={{ width: 8 }} />
                            <View style={styles.deviderLine} />
                            <View style={{ width: 8 }} />
                            <Text style={styles.totalItemText}>{(this.state.data[i].totalQty ? parseInt(this.state.data[i].totalQty).toFixed(2) : "0")}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.15 }} />
                        <View style={{ flex: 0.35 }}>
                            <Text style={styles.bodySubText}>{subName}</Text>
                        </View>
                        <View style={{ flex: 0.15 }} />
                        <View style={{ flex: 0.45 }}>
                            <Text style={styles.bodyShopText}>{shopName}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.imageView}>
                        <Image source={ImageName.PAPAD_IMG} style={styles.image} />
                    </View>
                    <View style={styles.bodyTextView}>
                        <Text style={styles.bodyHeadText}>{headName}</Text>
                        <Text style={styles.bodySubText}>{subName}</Text>
                    </View>
                    <View style={{ flex: 0.4 }} >
                        <Text style={styles.amountText}>{"₹" + " " + (this.state.data[i].totalPrice ? this.state.data[i].totalPrice : "0")}</Text>
                    </View>
                    <View style={styles.scoreTextView}>
                        <Text style={styles.firstText}>{(this.state.data[i].storeCount ? parseInt(this.state.data[i].storeCount).toFixed(2) : "0")}</Text>
                        <View style={{ width: 8 }} />
                        <View style={styles.deviderLine} />
                        <View style={{ width: 8 }} />
                        <Text style={styles.totalItemText}>{(this.state.data[i].totalQty ? parseInt(this.state.data[i].totalQty).toFixed(2) : "0")}</Text>
                    </View> */}
                </View>
            )
        }

        return (listData);
    }

    // for shimmer view
    shimmerView = () => {
        return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={{ marginVertical: 5 }}>
                    <View style={{ height: 70, marginBottom: 10, borderRadius: 12 }} />
                    <View style={{ height: 70, marginBottom: 10, borderRadius: 12 }} />
                    <View style={{ height: 70, marginBottom: 10, borderRadius: 12 }} />
                </View>
            </SkeletonPlaceholder>
        )
    }

    render() {
        if (this.state.loader) {
            return (this.shimmerView());
        } else {
            return (this.onViewTodayOrder());
        }
    }
}

export default OrderListWithNextPreview;