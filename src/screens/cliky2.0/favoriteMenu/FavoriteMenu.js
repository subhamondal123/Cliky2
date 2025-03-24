import { SafeAreaView, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../redux/Sales360Action';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';
import Header from '../header/Header';
import { TouchableOpacity } from 'react-native';
import { ClientSettings, UserAccessPermission } from '../../../services/userPermissions';
import { Toaster } from '../../../services/common-view-function';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';

class FavoriteMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            permission: {
                order: {},
                registration: {}
            },

            isDisable: this.props.Sales360Redux.attendanceData.isAttendance,
            pageLoader: true
        }
    }

    componentDidMount = async () => {
        this.state.permission.order = await UserAccessPermission.ORDER.orderPermission(this.props);
        this.state.permission.registration = await UserAccessPermission.REGISTRATION.registrationPermission(this.props);
        this.setState(this.state)
    }

    onRouteVisit = async () => {
        if (this.state.isDisable == 0) {
            Toaster.ShortCenterToaster("Attendance is required to initiate any activity !")
        } else {
            if (!await ClientSettings.OfflineAccess.getOfflineAccess()) {

                let reqData = {
                    isAttendence: this.props.Sales360Redux.attendanceData.isAttendance,
                    activityId: 1
                }
                let responseData = await MiddlewareCheck("updateEmpWorkActivityType", reqData, this.props);
                if (responseData) {
                    if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
            }
            this.props.navigation.navigate("RouteVisit")
        }
    }

    onAddOutlet = () => {
        if (this.state.isDisable == 0) {
            Toaster.ShortCenterToaster("Attendance is required to initiate any activity !")
        } else {
            if (this.state.permission.registration.viewPem) {
                this.props.navigation.navigate("UnplanVisitForm", { type: "global" })
            } else {
                Toaster.ShortCenterToaster("Access Denied !")
            }
        }
    }

    onPocketMis = () => {
        this.props.navigation.navigate("MyPocketMis")
    }

    onOrder = () => {
        if (this.state.isDisable == 0) {
            Toaster.ShortCenterToaster("Attendance is required to initiate any activity !")
        } else {
            if (this.state.permission.order.viewPem) {
                this.props.navigation.navigate("OrderDashboard")
            }
            else {
                Toaster.ShortCenterToaster("Access Denied !")
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', height: Dimension.height, flex: 1 }}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ScrollView>

                    <View style={{ borderBottomColor: "#747C90", borderBottomWidth: 0.5, borderTopColor: "#747C90", borderTopWidth: 0.5, padding: 8, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} onPress={() => this.onPocketMis()} disabled={true}>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <View style={{ flex: 0.6 }} />
                                    {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 25, width: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 2 }}>0</Text>
                                    </View> */}
                                </View>
                                <SvgComponent svgName={"location_with_route"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>Performance MIS</Text>
                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Pocket MIS</Text>
                            </TouchableOpacity>
                            <View style={{ borderRightColor: "#000", borderRightWidth: 0.8 }} />
                            {/* <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} onPress={() => this.onOrder()} disabled={this.state.isDisable == 2 ? true : false}> */}
                            <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} onPress={() => this.onOrder()} disabled={true}>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <View style={{ flex: 0.6 }} />
                                    {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 25, width: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 2 }}>0</Text>
                                    </View> */}
                                </View>
                                <SvgComponent svgName={"suggested"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>Order</Text>
                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>My Order Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: "#747C90", borderBottomWidth: 0.5, borderTopColor: "#747C90", borderTopWidth: 0.5, padding: 8, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 0.5 }} onPress={() => this.onAddOutlet()} disabled={this.state.isDisable == 2 ? true : false}> */}
                            <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 0.5 }} onPress={() => this.onAddOutlet()} disabled={true}>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <View style={{ flex: 0.6 }} />
                                    {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 25, width: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 2 }}>0</Text>
                                    </View> */}
                                </View>
                                <SvgComponent svgName={"van"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>Add Shop/Outlet</Text>
                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Add Outlet</Text>
                            </TouchableOpacity>
                            <View style={{ borderRightColor: "#000", borderRightWidth: 0.8 }} />
                            {this.props.Sales360Redux.routeData.hmName == undefined || this.props.Sales360Redux.routeData.hmName == null ? null :
                                // <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 0.5 }} onPress={() => this.onRouteVisit()} disabled={this.state.isDisable == 2 ? true : false}>
                                <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 0.5 }} onPress={() => this.onRouteVisit()} disabled={true}>

                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <View style={{ flex: 0.6 }} />
                                        {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 25, width: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 2 }}>0</Text>
                                        </View> */}
                                    </View>
                                    <SvgComponent svgName={"location_with_route"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>Route Visit</Text>
                                    <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Route Visit</Text>
                                </TouchableOpacity>
                            }

                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMenu)