import React from "react";
import {
    Image,
    ImageBackground,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import DashboardSelectionBox from "../../../pageShared/order/orderDashboardSelectionBox";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, VirtualizedView } from "../../../shared";
import { OrderDashboardChart, OrderDashboardCustomerList } from "../../../pageShared";
import { FlatList } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import ProductOfferCard from "../../../pageShared/order/orderProductOfferCard";
import { Header } from "../../cliky2.0";
import { MiddlewareCheck } from "../../../services/middleware";
import { Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { modifyStatisticData, pjpModifyData } from "./Function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const bar = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.2
};

const data = [
    { x: "Jan", y1: 100, y2: 200 },
    { x: "Feb", y1: 80, y2: 170 },
    { x: "March", y1: 70, y2: 140 },
    { x: "April", y1: 20, y2: 190 }
];


let staticSelectionBoxData = [
    {
        id: 1,
        iconBackgroundColor: "#F13748",
        backgroundColor: "#FFE4DC",
        fontSize: 12,
        text: "Create \n Primary Order",
        image: ImageName.PRIMARY_CUSTOMER_ICON,
        redIcon: true
    }, {
        id: 2,
        iconBackgroundColor: "#F137A7",
        backgroundColor: "#FFD4F6",
        fontSize: 12,
        text: "Create \n Secondary Order",
        image: ImageName.SECONDARY_CUSTOMER_ICON,
        redIcon: true
    },
    // {
    //     id: 3,
    //     iconBackgroundColor: "#5CA9E2",
    //     fontSize: 12,
    //     text: "Recent \n Order Status",
    //     image: ImageName.ORDER_STATUS_IMG,
    //     redIcon: false

    // }, 
    // {
    //     id: 4,
    //     iconBackgroundColor: "#54DD9B",
    //     fontSize: 12,
    //     text: "Offers \n & Scheme",
    //     image: ImageName.ORDER_OFFER_SCHEME_LOGO,
    //     redIcon: false

    // }, {
    //     id: 5,
    //     iconBackgroundColor: "#D6D040",
    //     fontSize: 12,
    //     text: "Popular \n Customers",
    //     image: ImageName.ORDER_CUSTOMER_LOGO,
    //     redIcon: false

    // }, 
    {
        id: 6,
        iconBackgroundColor: "#FFA8B0",
        fontSize: 12,
        text: "My \n Performance",
        image: ImageName.ORDER_PERFORMANCE_LOGO,
        redIcon: false

    }
]

let staticData = [
    {
        id: 1,
        tmtText: "TMT 200",
        mmText: "45mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "90%"
    },
    {
        id: 2,
        tmtText: "TMT 400",
        mmText: "75mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "20%"
    },
    {
        id: 3,
        tmtText: "TMT 500",
        mmText: "55mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "40%"
    },
    {
        id: 4,
        tmtText: "TMT 800",
        mmText: "12mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "70%"
    }
]

let customerListData = [
    //status - 1:Demand Increase,2:New Cycle Start,3:Low Stock,4:Order Request
    {
        id: 1,
        customer_name: "Ramesh Roy",
        dealerText: "Dealer",
        amount: "2215",
        days: "10",
        status: 3,
    },
    {
        id: 2,
        customer_name: "Sukanta Samanta",
        dealerText: "Dealer",
        amount: "4815",
        days: "5",
        status: 4,
    },
    {
        id: 3,
        customer_name: "Subha Mondal",
        dealerText: "Dealer",
        amount: "72005",
        days: "5",
        status: 1,
    },
    {
        id: 4,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 5,
    },
    {
        id: 5,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
    },
    {
        id: 6,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 4,
    },
    {
        id: 7,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
    },
    {
        id: 8,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
    },
    {
        id: 9,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "25",
        status: 3,
    },
    {
        id: 10,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
    },

]

let imageArr = [
    {
        id: 1,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 2,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 3,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 4,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 5,
        image: ImageName.BANNER_LOGO
    }
]

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marketDemandIncrease: staticData,
            customerList: customerListData,
            imageName: imageArr,
            chartData: data,
            todayOrderData: {
                todayOrderText: "27",
                targetQty: "897000",
                todayOrderQty: "2720006",
                todayOrderAmount: "99742457",
                orderStatus_Approved: "20",
                orderStatus_Pending: "10",
                orderStatus_Partial: "15",
                tillDateOrderQty: "67668",
                tillDateOrderAmount: "678964",
                targetAchivePercentage: 70,

            },
            isApiCall: true,
            customerLoader: true,
            customerListOrder: [],
            statisticData: {},
            refreshing: true,
            statisticLoader: true
        };
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        await this.getOrderStatisticData()
        await this._apiCallRes()

    };

    _apiCallRes = async () => {
        let dataReq = {
            "limit": "10",
            "offset": "0",
            "searchName": "",
            "hierarchyDataIdArr": [],
            "stateIdArr": [],
            "districtIdArr": [],
            "zoneIdArr": [],
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "customerAccessType": "1",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": this.state.isProject,
            "contactTypeId": "",
            "isDownload": "0",
            "approvalList": "0",
            "forOrderListing": "1",
            "hierarchyDataIdArr": [
                {
                    "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                    "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                }
            ],

        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                // let pjpData = await StorageDataModification.PrimaryOrderListData({}, "get");
                let pjpListData = pjpModifyData(responseData);

                this.setState(this.state);
                this.setState({
                    customerListOrder: [...this.state.customerListOrder, ...pjpListData.pjpList],
                    totalDataCount: pjpListData.totalCount
                });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false,
            customerLoader: false
        })
    }

    getOrderStatisticData = async () => {
        this.setState({ refreshing: false })
        let responseData = await MiddlewareCheck("getOrdrModuleDashboardData", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ statisticData: modifyStatisticData(responseData.response) });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
                // this.setState({ statisticData: statData });
            }
        }
        this.setState({ statisticLoader: false })
    }

    //refresh list
    _onRefresh = async () => {
        await this.setInitialState()
        await this._load();
    }

    setInitialState = async () => {
        this.setState({
            todayOrderData: {
                todayOrderText: "27",
                targetQty: "897000",
                todayOrderQty: "2720006",
                todayOrderAmount: "99742457",
                orderStatus_Approved: "20",
                orderStatus_Pending: "10",
                orderStatus_Partial: "15",
                tillDateOrderQty: "67668",
                tillDateOrderAmount: "678964",
                targetAchivePercentage: 70,

            },
            isApiCall: true,
            customerLoader: true,
            customerListOrder: [],
            statisticData: {},
            refreshing: true,
            statisticLoader: true
        })
    }

    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item, key)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <OrderDashboardCustomerList
                    data={item}
                />
            </View>
        )
    }

    footerSec = () => {
        const searchOtherCustomer = () => {
            this.props.navigation.navigate("OrderPrimaryCustomerList")
        }
        return (
            <View>
                <View style={{ marginHorizontal: '12%', marginTop: 25 }}>
                    <BigTextButton
                        text={"Search Other Customer"}
                        backgroundColor={'#1F2B4D'}
                        fontColor={"#fff"}
                        borderRadius={22}
                        onPress={() => searchOtherCustomer()}
                    />
                </View>
            </View>
        )
    }

    productOfferSec = () => {
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 35 }}>Product Offer</Text>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.state.imageName.map((item, key) => (
                        <View key={key}>
                            <ProductOfferCard
                                data={item}
                            />
                        </View>
                    ))}
                </ScrollView>

            </>
        )
    }

    stockReportChartSec = () => {
        return (
            <View>
                <View style={{ marginTop: 5, width: 150, top: 30 }}>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>My Order Activity Trades</Text>
                </View>
                <View>
                    <OrderDashboardChart data={this.state.chartData} />
                </View>
            </View>
        )
    }

    todaysOrderSec = () => {
        return (
            <View style={styles.todayOrderCard}>
                <View style={styles.marginSec}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.todayOrderText}>Today's  Order  <Text style={styles.todayOrderValueText}>{this.state.statisticData.todaysOrder}</Text></Text>
                        <Text style={styles.mtText}>{this.state.statisticData.quantity}  {this.props.Sales360Redux.loginData.clientId == 19 ? null : <Text style={styles.qtyText}>{'\u20B9' + "" + this.state.statisticData.amount}</Text>}</Text>
                        <Text style={styles.lastWeekOrderStatusText}>Last Week Order Status</Text>
                        <View style={styles.flexRow}>
                            <View style={styles.approvedSec}>
                                <Text style={{ color: '#fff', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Approved</Text>
                            </View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 5, marginLeft: '5%' }}>{this.state.statisticData.approved}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <View style={styles.partialSec}>
                                <Text style={{ color: '#fff', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Partial</Text>
                            </View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 5, marginLeft: '5%' }}>{this.state.statisticData.partial}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <View style={styles.pendingSec}>
                                <Text style={{ color: '#5f5f5f', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Pending</Text>
                            </View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 5, marginLeft: '5%' }}>{this.state.statisticData.pending}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgressBase
                            {...bar}
                            value={this.state.todayOrderData.targetAchivePercentage}
                            radius={60}
                            activeStrokeColor={'#00B65E'}
                            inActiveStrokeColor={'#D1D1D1'}
                            clockwise={false}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 5 }}>{this.state.statisticData.targetAchievementpercentage}%</Text>
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"Target"}</Text>
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -4 }}>{"Achieved"}</Text>
                            </View>
                        </CircularProgressBase>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8 }}>Target {this.state.statisticData.targerQuantity}</Text>
                        {this.props.Sales360Redux.loginData.clientId == 19 ? null :
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                                <Text style={{ color: '#1F2B4D', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Till Date Order</Text>
                                <Text style={{ color: '#5F5F5F', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -5 }}>{this.state.statisticData.tillDateOrderQuantity}  <Text style={{ color: "#F13748", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{'\u20B9' + "" + this.state.statisticData.totalAmount}</Text></Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    suggestedCustomerSec = () => {
        return (
            <View>

                <React.Fragment>
                    {this.state.customerListOrder.map((item, key) => (
                        <React.Fragment key={key}>
                            {this.renderContactList(item, key)}
                        </React.Fragment>
                    ))}
                    {this.footerSec()}
                    {/* <FlatList
                        data={this.state.customerListOrder}
                        renderItem={(item, key) => this.renderContactList(item, key)}
                        keyExtractor={(item, key) => key}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={this.footerSec}

                    /> */}
                </React.Fragment>
            </View>
        )
    }

    onPressTab = (value) => {
        if (value.id == "1") {
            this.props.navigation.navigate("OrderPrimaryCustomerList")
        }
        if (value.id == "2") {
            this.props.navigation.navigate("OrderSecondaryCustomerList")
        }
        if (value.id == "3") {
            this.props.navigation.navigate("recentOrderList")
        }
        if (value.id == "6") {
            this.props.navigation.navigate("MyPocketMis")
        }

    }

    onCreateOrder = () => {
        this.props.navigation.navigate("OrderPrimaryCustomerList")
    }

    listSkeletonSec = () => {
        let resData = [];
        for (let i = 0; i < 10; i++) {
            resData.push(
                <SkeletonPlaceholder>
                    <View style={{ height: 120, borderRadius: 15, marginTop: 30 }} />
                </SkeletonPlaceholder>
            )
        }
        return resData
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                {/* <VirtualizedView > */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />
                    }
                >
                    <View style={{ marginHorizontal: 15 }}>
                        <DashboardSelectionBox data={staticSelectionBoxData} onSelectTab={(value) => this.onPressTab(value)} />
                        {this.state.statisticLoader ? <View>
                            <SkeletonPlaceholder>
                                <View style={{ borderRadius: 15, marginTop: 20, height: 230 }} />
                            </SkeletonPlaceholder>
                        </View> :
                            this.todaysOrderSec()
                        }
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Image source={ImageName.TRUCK_ICON} style={styles.truckImg} />
                        </View>
                        <View style={{ marginHorizontal: '20%', marginTop: 10 }}>
                            <BigTextButton
                                text={"Create an Order"}
                                backgroundColor={"#F13748"}
                                fontColor={"#fff"}
                                borderRadius={22}
                                onPress={() => this.onCreateOrder()}
                            />
                        </View>
                        {/* {this.stockReportChartSec()} */}
                        {/* <View style={{ marginHorizontal: '10%', justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={ImageName.ORDER_VAN_ICON} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                            </View> */}

                        {/* <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                {this.state.marketDemandIncrease.map((item, key) => (
                                    <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 10, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 0.9, borderStyle: "dashed", width: Dimension.width / 1.2, marginHorizontal: 5 }} key={key}>
                                        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={ImageName.RECOMENDATION_MAGIC_STICK_ICON} style={{ height: 32, width: 32, resizeMode: 'contain' }} />
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 12 }}>{item.tmtText}</Text>
                                                <Text style={{ color: '#5F5F5F', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: 12 }}>{item.mmText}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flex: 0.8 }}>
                                                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.predicted} <Text style={{ color: '#000', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.marketDemandText} </Text>{item.desText}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', flex: 0.2, marginLeft: 5 }}>
                                                    <Text style={{ color: "#F13748", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.persentText}</Text>
                                                    <Image source={ImageName.GREEN_UP_ARROW} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView> */}
                        <View style={{ marginTop: 18 }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Suggested Customer</Text>
                        </View>
                        {this.state.customerLoader ?
                            <React.Fragment>
                                {this.listSkeletonSec()}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.suggestedCustomerSec()}
                            </React.Fragment>
                        }
                        {/* {this.productOfferSec()} */}
                    </View>
                    <View style={{ marginBottom: 100 }} />
                </ScrollView>
                {/* </VirtualizedView> */}
            </SafeAreaView >
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
            stateUserInformation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Index);
