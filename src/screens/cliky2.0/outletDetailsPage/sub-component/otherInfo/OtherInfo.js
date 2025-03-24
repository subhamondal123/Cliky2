import React from "react";
import { Color, FontFamily, FontSize } from '../../../../../enums';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { stateUserInformation, stateCheckForNetwork, stateCartData } from '../../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SvgComponent from "../../../../../assets/svg";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { DateConvert, StorageDataModification } from "../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../services/constant";
import { getOtherInfoData, modInfoData } from "./Function";
import { ClientSettings } from "../../../../../services/userPermissions";

class OtherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: false,
            otherInfoLoader: false,
            otherInfoObj: {}
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this.customerOtherInfoApi()

    }

    getOfflineOnlineData = async () => {
        if (await ClientSettings.OfflineAccess.getOfflineAccess()) {
            // this.setState(await getOtherInfoData(this.state, this.props));
        } else {
            this.customerOtherInfoApi();
        }
    }

    customerOtherInfoApi = async () => {
        this.setState({ pageLoader: true });
        let reqData = {
            "customerId": this.props.route.params.item.id,
            "currentDateTime": DateConvert.fullDateFormat(new Date()),
            "isUpdate": true,
        }
        this.setState({ otherInfoLoader: true })
        let responseData = await MiddlewareCheck("getDetailsNewRegCustomer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ otherInfoObj: modInfoData(responseData.response) })
                let infoData = Object.assign(responseData.response[0], { "fieldVisitId": this.props.route.params.item.fieldVisitId })
                await StorageDataModification.selectedCustomerData(infoData, "store")
            }
        }

        this.setState({
            otherInfoLoader: false,
        })
    }

    onSelectTab = (type) => {
        if (type == "stockUpdate") {
            this.props.onSelect(type)
        }
    }

    onPressPhone = (item) => {
        Linking.openURL('tel:' + item)
    }


    render() {
        return (
            <View>
                <View style={{ borderBottomColor: "#747C90", borderBottomWidth: 0.5, borderTopColor: "#747C90", borderTopWidth: 0.5, padding: 8, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} onPress={() => this.onPressPhone(this.props.route.params.item.phone)}>
                            <SvgComponent svgName={"telephone"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>{this.props.route.params.item.phone}</Text>
                            <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Prime Number to Call</Text>
                        </TouchableOpacity>
                        <View style={{ borderRightColor: "#000", borderRightWidth: 0.8 }} />
                        <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                            <SvgComponent svgName={"suggested"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>{this.state.otherInfoObj.recordId}</Text>
                            <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>ERP Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderBottomColor: "#747C90", borderBottomWidth: 0.5, borderTopColor: "#747C90", borderTopWidth: 0.5, padding: 8, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.onSelectTab("stockUpdate")}
                            style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                            <SvgComponent svgName={"locationTick"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10 }}>Stock Update</Text>
                            <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Update the stock</Text>
                        </TouchableOpacity>

                        <View style={{ borderRightColor: "#000", borderRightWidth: 0.8 }} />
                        <TouchableOpacity style={{ marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                            <SvgComponent svgName={"location"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginTop: 10, textAlign: "center" }}>{this.state.otherInfoObj.address}</Text>
                            <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Address</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ marginBottom: 50 }} />
            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherInfo);