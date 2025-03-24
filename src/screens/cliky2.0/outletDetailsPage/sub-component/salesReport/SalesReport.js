import React from "react";
import { Color, FontFamily, FontSize } from '../../../../../enums';
import styles from './Style';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { stateUserInformation, stateCheckForNetwork, stateCartData } from '../../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, Toaster } from "../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { ClientSettings } from "../../../../../services/userPermissions";
import { getSalesReportDataFromOffline } from "./Function";
import { maskData } from "../../../../../services/common-view-function/commonFunctions";

class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevApiResData: this.props.route.params.item ? this.props.route.params.item : {},
            salesReportData: {}
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this.getOfflineOnlineData();
    }

    // for get the offline and online data fetch
    getOfflineOnlineData = async () => {
        if (await ClientSettings.OfflineAccess.getOfflineAccess()) {
            this.setState(await getSalesReportDataFromOffline(this.state, this.props));
        } else {
            this.getSalesReport();
        }
    }

    // for get the sales report data from api
    getSalesReport = async () => {
        let reqData = { customerId: this.props.route.params.item.id };
        let responseData = await MiddlewareCheck("getOrderDataForCustomer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ salesReportData: responseData.response });
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                <View style={{ backgroundColor: '#EDEDED', padding: 9, justifyContent: 'center', flexDirection: 'row', marginTop: 8, alignItems: 'center', borderRadius: 12 }}>
                    <View style={{ backgroundColor: '#747C90', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 8, paddingHorizontal: 12, borderRadius: 14, }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>MTD</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Total Order</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{(Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.MTD_totalOrderQty : 0)} Qty</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#F13748", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{'\u20B9' + " " + (Object.keys(this.state.salesReportData).length > 0 ? (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(this.state.salesReportData.MTD_totalOrderValue) : this.state.salesReportData.MTD_totalOrderValue) : 0)}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#EDEDED', padding: 9, justifyContent: 'center', flexDirection: 'row', marginTop: 8, alignItems: 'center', borderRadius: 12 }}>
                    <View style={{ backgroundColor: '#747C90', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 8, paddingHorizontal: 12, borderRadius: 14, }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Last 5 Order AVG</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastFiveOrderAvgQty : 0} Qty</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>LPC {Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastFiveOrderLPC : 0}</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#F13748", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{'\u20B9' + " " + (this.state.lastFiveOrderAvgValue ? (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(this.state.lastFiveOrderAvgValue) : this.state.lastFiveOrderAvgValue) : 0)}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#EDEDED', padding: 9, justifyContent: 'center', flexDirection: 'row', marginTop: 8, alignItems: 'center', borderRadius: 12 }}>
                    <View style={{ backgroundColor: '#747C90', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 8, paddingHorizontal: 12, borderRadius: 14, marginLeft: 10 }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Last Visit</Text>
                    </View>
                    <View style={{ flex: 0.6 }} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastVisitDate : "N/A"}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#F13748", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastVisitDaysAgo : 0}{" Day" + (parseInt(this.state.salesReportData.lastVisitDaysAgo) > 0 ? "s" : "") + " Ago"}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#EDEDED', padding: 9, justifyContent: 'center', flexDirection: 'row', marginTop: 8, alignItems: 'center', borderRadius: 12 }}>
                    <View style={{ backgroundColor: '#747C90', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 8, paddingHorizontal: 12, borderRadius: 14, marginLeft: 10 }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Last Order</Text>
                    </View>
                    <View style={{ flex: 0.6 }} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastOrderDate : ""}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#F13748", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{Object.keys(this.state.salesReportData).length > 0 ? this.state.salesReportData.lastOrderDaysAgo + " Day" + " " + " Ago" : ""}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
        stateCartData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);