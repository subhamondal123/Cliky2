import { SafeAreaView, Text, View, Image, FlatList, ScrollView, TouchableOpacity, TextInput, TurboModuleRegistry } from 'react-native'
import React, { Component } from 'react'
import styles from './Style'
import Header from '../../header/Header'
import CommonModal from '../../../../shared/modal'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums'
import { Loader, Modal, NoDataFound, TextInputBox } from '../../../../shared';
import {
    stateUserInformation,
    stateCheckForNetwork,
    stateCartData,
    storeOutletListData
} from '../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MiddlewareCheck } from '../../../../services/middleware'
import { DateConvert, FileDownload, Toaster } from '../../../../services/common-view-function'
import { modifyArrData } from './Function'
import SvgComponent from '../../../../assets/svg'
import { App_uri } from '../../../../services/config'
import { ErrorCode } from '../../../../services/constant'
import moment from 'moment';
import 'moment/locale/en-gb';

class ReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockArr: [],
            isVisible: false,
            isShow: false,
            itemData: {},
            isEdit: 0,
            pageLoader: true,

            reportTotalAmount: "",
            reportDownloadArr: []
        }

    }

    componentDidMount = () => {
        this._onLoad()
    }


    _onLoad = async () => {
        let dateMoment = moment(this.props.route.params.data.lastReport.lastUpdatedDate, 'Do MMM YYYY');
        let formattedDate = dateMoment.format('YYYY-MM-DD');
        let reqData = {
            "shopId": this.props.route.params.data.shopId,
            "searchDateTime": formattedDate ? formattedDate : DateConvert.formatYYYYMMDD(new Date()),
            "isDownload": "0"
        }
        let responseData = await MiddlewareCheck("getMTStockReport", reqData, this.props);
        this.state.reportDownloadArr = responseData.response.data.length > 0 ? Object.keys(responseData.response.data[0]).slice(2) : [];
        let mainArr = modifyArrData(responseData.response.data);
        this.state.stockArr = mainArr;
        this.state.reportTotalAmount = responseData.response.allTotalPrice
        this.state.pageLoader = false;
        this.setState(this.state);
    }

    listCountSec = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let month = today.toLocaleString('default', { month: 'long' });
        return (
            <View style={{ alignItems: "center", flexDirection: "row", borderWidth: 1, borderColor: '#AAB6BF' }}>
                <View style={styles.montheTxt}>

                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: '#FFFFFF', fontWeight: '500' }}>{dd}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'Poppins', fontWeight: '300' }}>{month}</Text>
                </View>
                <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ color: '#F13748', fontFamily: 'Poppins', fontSize: 12, fontWeight: '600' }}>{this.state.stockArr.length}</Text>
                    <Text style={{ color: '#4B5263', fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', }}>item in list</Text>
                </View>
                <View style={{ flex: 1, borderRightWidth: 0.5, padding: 20, borderRightColor: '#AAB6BF', marginRight: '4%' }} />
                <View style={{ paddingHorizontal: 20 }}>
                    {/* <Text style={s.saleStockTxt}>Sale <Text style={{ color: '#F13748', fontSize: 12, fontFamily: 'Poppins', fontWeight: '400' }}>8% </Text><Text>of total Stock</Text></Text> */}
                </View>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#D1D1D1', alignItems: 'center', justifyContent: 'center', marginHorizontal: '5%' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.Product}</Text>
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.OpeningQuantityStandard} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.OpeningUnitStandard ? item.OpeningUnitStandard : "CB"}</Text></Text>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.OpeningQuantity} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.OpeningUnit ? item.OpeningUnit : 'POU'}</Text></Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.ClosingQuantityStandard ? item.ClosingQuantityStandard : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.ClosingUnitStandard ? item.ClosingUnitStandard : "CB"}</Text></Text>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.ClosingQuantity ? item.ClosingQuantity : '0'} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.ClosingUnit ? item.ClosingUnit : "POU"}</Text></Text>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )
    }

    _onDownload = async () => {
        let reqData = {
            "shopId": this.props.route.params.data.shopId,
            "searchDateTime": DateConvert.formatYYYYMMDD(new Date()),
            "isDownload": "1",
            "tableHeader": this.state.reportDownloadArr
        }
        let responseData = await MiddlewareCheck("getMTStockReport", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await FileDownload.downloadDocument(App_uri.BASE_URI + "temp/" + responseData.response);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _footerSec = () => {
        return (
            <View>
                {/* <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#F0F4F7', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Poppins', color: '#1F2B4D' }}>Total Sale Value</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', fontFamily: 'Poppins', color: '#1F2B4D' }}>"₹" {this.state.reportTotalAmount}</Text>
                        <Text style={{ fontSize: 11, fontWeight: '500', fontFamily: 'Poppins', color: '#F13748' }}>8%<Text style={{ fontSize: 10, fontWeight: '500', fontFamily: 'Poppins', color: '#1F2B4D' }} >of total stock</Text></Text>
                    </View>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{ backgroundColor: '#F13748', padding: 6, paddingHorizontal: 12, borderRadius: 20 }} onPress={() => this._onDownload()}>
                        <Text style={{ fontSize: 14, fontWeight: '500', fontFamily: 'Poppins', color: '#FFFFFF' }}>Download the Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }


    headerSec = () => {
        return (
            <View style={{ marginHorizontal: '2%', marginTop: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={ImageName.OUTLET_LOGO} style={{ height: 48, width: 48, resizeMode: 'contain' }} />
                    <View style={{ width: 8 }} />
                    <TouchableOpacity style={{ marginTop: 2 }} activeOpacity={0.9} onPress={() => this._onBack()}>
                        <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <View style={{ width: 9 }} />
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Reports</Text>
                    </View>
                </View>
            </View>
        )
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSec()}

                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View> :
                    <>
                        {this.state.stockArr.length > 0 ?
                            <React.Fragment>
                                {this.listCountSec()}
                                <View style={styles.closingListContain}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
                                        <View style={{ flex: 0.55, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>items</Text>
                                        </View>
                                        <View style={{ flex: 0.25, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Opening</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Closing</Text>
                                        </View>
                                    </View>
                                </View>
                                <FlatList
                                    data={this.state.stockArr}
                                    renderItem={(item, index) => this.renderItem(item, index)}
                                    keyExtractor={(item, index) => index}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                                {this._footerSec()}
                            </React.Fragment>
                            :
                            <View style={{ marginTop: 20, height: Dimension.height }}>
                                <NoDataFound />
                            </View>
                        }
                    </>
                }
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
        stateUserInformation,
        stateCheckForNetwork,
        stateCartData,
        storeOutletListData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);




