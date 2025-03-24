import { SafeAreaView, Text, View, Image, FlatList, ScrollView, TouchableOpacity, TextInput, TurboModuleRegistry, ActivityIndicator } from 'react-native'
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
import { DateConvert, StorageDataModification, Toaster } from '../../../../services/common-view-function'
import { modifyListData } from './Function'
import { EditDeleteModal } from '../../../../pageShared'
import SvgComponent from '../../../../assets/svg'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'

// this is open stock update list page
class CloseingStockEditDeleteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            stockArr: [],
            isVisible: false,
            isShow: false,
            bot: '',
            cb: '',
            itemData: {},
            resObj: {},
            updateLoader: false,
            itemIndex: "",
            allUnits: [],
            footerLoader: false,
            listLoader: false

        }

    }

    componentDidMount = async () => {
        await this._onLoad();
        await this.getUnitData();
    }

    _onLoad = async () => {
        let tempOpeningData = [];
        let storeListData = await StorageDataModification.closingStockItemList({}, "get");
        let respoData = (storeListData == null || storeListData == undefined) ? [] : storeListData;
        let reqData = {
            "shopId": this.props.Sales360Redux.storeOutletListData.item.shopId,
            "searchDateTime": DateConvert.fullDateFormat(new Date())
        }
        let responseData = await MiddlewareCheck("getMTOpenStockList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                tempOpeningData = responseData.response.data;
            }
        }
        for (let i = 0; i < respoData.length; i++) {
            respoData[i]["isClose"] = true;
            respoData[i]["isOpenClose"] = false;
            respoData[i]["open_quantity_unitWise"] = "0";
            respoData[i]["open_quantity_stdUnitWise"] = "0";
            respoData[i]["open_unitName"] = respoData[i].productAttributes.Unit;
            respoData[i]["open_unitShort"] = respoData[i].productAttributes.StdUnit;
            for (let j = 0; j < tempOpeningData.length; j++) {
                if ((respoData[i].hierarchyDataId == tempOpeningData[j].hierarchyDataId) && (respoData[i].hierarchyTypeId == tempOpeningData[j].hierarchyTypeId)) {
                    respoData[i].open_quantity_unitWise = tempOpeningData[j].quantity_unitWise;
                    respoData[i].open_quantity_stdUnitWise = tempOpeningData[j].quantity_stdUnitWise;
                    respoData[i].open_unitName = tempOpeningData[j].unitName;
                    respoData[i].open_unitShort = tempOpeningData[j].unitShort;
                    respoData[i]["isOpenClose"] = true;
                    tempOpeningData.splice(j, 1);
                    break;
                }
            }
        }

        for (let i = 0; i < tempOpeningData.length; i++) {
            let itemWithHighestSlNo = tempOpeningData[i].pdData.reduce((maxItem, currentItem) => {
                return currentItem.slNo > maxItem.slNo ? currentItem : maxItem;
            }, tempOpeningData[i].pdData[0]);
            let reqData = {
                "hierarchyDataId": tempOpeningData[i].hierarchyDataId,
                "mstHierarchyTypeId": tempOpeningData[i].hierarchyTypeId,
                "hmName": itemWithHighestSlNo.name,
                "hmDescription": itemWithHighestSlNo.name,
                "leafLevel": 0,
                "productAttributes": {
                    "Unit": tempOpeningData[i].unitShort,
                    "StdUnit": tempOpeningData[i].unitName,
                    "PTR": "0",
                    "PTD": "0",
                    "StdUnitConversionFactor": "0"
                },
                "quantity": 0,
                // "totalAmount": tempOpeningData[i].totalPrice,
                "totalAmount": "0.00",
                "inputStdUnit": "0",
                "stdUnitDisableCheck": false,
                "inputUnit": "0",
                "unitDisableCheck": false,
                "inputRate": "",
                "rateCheck": false,
                "open_quantity_unitWise": tempOpeningData[i].quantity_unitWise.toString(),
                "open_quantity_stdUnitWise": tempOpeningData[i].quantity_stdUnitWise.toString(),
                "open_unitName": tempOpeningData[i].unitName,
                "open_unitShort": tempOpeningData[i].unitShort,
                "isClose": false,
                "isOpenClose": false
            }
            respoData.push(reqData);
        }
        this.state.stockArr = respoData;
        this.state.pageLoader = false;
        this.setState(this.state);
    }

    getUnitData = async () => {
        let responseData = await MiddlewareCheck("getAllMasterUnitList", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allUnits = responseData.data;
                this.setState(this.state);
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }


    _onthreeDot = (item, index) => {
        this.state.itemData = item;
        this.state.itemIndex = index;
        this.state.isVisible = true;
        this.setState(this.state);
    }

    onRequestCloseModal = async () => {
        this.state.isShow = false;
        this.state.isVisible = false;
        this.setState(this.state);
        await this._onLoad()
    }

    onCalculateProductRate = (item) => {
        let tempRate = 0;
        let validCheck = false;
        if (item.productAttributes.PTR) {
            tempRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
            validCheck = true;
        }
        return { rate: tempRate, validCheck: validCheck };
    }


    // for get the seleted unit data
    onSelectUnitData = (selectedUnit) => {
        let resObj = {};
        let unit = this.state.allUnits.find(item => item.unitShort == selectedUnit);
        if (unit) {
            resObj = unit;
        }
        return resObj;

    }

    onSelectStdUnitData = (selectedStdUnit) => {
        let resObj = {};
        let unit = this.state.allUnits.find(item => item.unitShort == selectedStdUnit);
        if (unit) {
            resObj = unit;
        }
        return resObj;
    }


    _onOpenStockUpdate = async () => {
        let productArrdata = [];
        for (let i = 0; i < this.state.stockArr.length; i++) {
            if (this.state.stockArr[i].isClose == true) {
                let tempRate = "0";
                let tempUnitId = 0;
                let tempUnitShort = "";
                let tempStdUnitId = 0;
                let tempStdUnitShort = "";
                if (this.state.stockArr[i].rateCheck) {
                    tempRate = this.state.stockArr[i].inputRate;
                } else {
                    tempRate = this.onCalculateProductRate(this.state.stockArr[i]).rate;
                }
                let seleltedUnitData = this.onSelectUnitData(this.state.stockArr[i].productAttributes.Unit);
                let selectedStdUnitData = this.onSelectStdUnitData(this.state.stockArr[i].productAttributes.StdUnit);
                if (Object.keys(seleltedUnitData).length > 0) {
                    tempUnitId = seleltedUnitData.unitId;
                    tempUnitShort = seleltedUnitData.unitShort
                }

                if (Object.keys(selectedStdUnitData).length > 0) {
                    tempStdUnitId = selectedStdUnitData.unitId;
                    tempStdUnitShort = selectedStdUnitData.unitShort
                }
                let netVal = this.state.stockArr[i].inputUnit * this.state.stockArr[i].productAttributes.PTR
                let stdNetVal = this.state.stockArr[i].inputStdUnit * this.state.stockArr[i].productAttributes.StdUnitConversionFactor * this.state.stockArr[i].productAttributes.PTR
                productArrdata.push({
                    "hierarchyDataId": this.state.stockArr[i].hierarchyDataId,
                    "hierarchyTypeId": this.state.stockArr[i].hierarchyTypeId,
                    "quantity_unitWise": this.state.stockArr[i].inputUnit ? this.state.stockArr[i].inputUnit : "0",
                    "unitId": tempUnitId,
                    "quantity_stdUnitWise": this.state.stockArr[i].inputStdUnit ? this.state.stockArr[i].inputStdUnit : "0",
                    "stdUnitId": tempStdUnitId,
                    "rate": tempRate,
                    "remarks": "",
                    "netVal_unitWise": netVal.toString(),
                    "netVal_stdUnitWise": stdNetVal.toString(),
                    "totalPrice": this.state.stockArr[i].totalAmount
                })
            }
        }
        if (productArrdata.length == 0) {
            Toaster.ShortCenterToaster("Please add atleast one product !");
        } else {
            let reqData = {
                "visitId": this.props.Sales360Redux.storeOutletListData.storeCheckingData.visitId,
                "shopId": this.props.route.params.prevProps.shopId,
                "stockType": "2",
                "productData": productArrdata,
            }
            this.setState({ updateLoader: true })
            let responseData = await MiddlewareCheck("addMTStock", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.navigation.navigate("OutletLogInPage");
                    Toaster.ShortCenterToaster(responseData.message);
                    await StorageDataModification.closingStockItemList({}, "clear")

                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ updateLoader: false });
        }
    }


    listCountSec = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let month = today.toLocaleString('default', { month: 'long' });
        return (
            <View style={{ alignItems: "center", flexDirection: "row", borderWidth: 1, borderColor: '#AAB6BF' }}>
                <View style={styles.montheTxt}>
                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 14, color: '#FFFFFF', fontWeight: '500' }}>{dd}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontWeight: '300' }}>{month}</Text>
                </View>
                <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ color: '#F13748', fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 12, fontWeight: '600' }}>{this.state.stockArr.length}</Text>
                    <Text style={{ color: '#4B5263', fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 12, fontWeight: '500', }}>item in list</Text>
                </View>
                <View style={{ flex: 1, borderRightWidth: 0.5, padding: 20, borderRightColor: '#AAB6BF', marginRight: '4%' }} />
                <View style={{ paddingHorizontal: 20 }}>
                    {/* <Text style={styles.saleStockTxt}>Sale <Text style={{ color: '#F13748', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontWeight: '400' }}>8% </Text><Text>of total Stock</Text></Text> */}
                </View>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#D1D1D1', alignItems: 'center', justifyContent: 'center', marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>
                        <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.hmName}</Text>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <View style={{ marginLeft: '14%' }}>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.open_quantity_stdUnitWise ? item.open_quantity_stdUnitWise : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.open_unitName}</Text></Text>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.open_quantity_unitWise ? item.open_quantity_unitWise : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.open_unitShort}</Text></Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <View style={{ marginLeft: '14%' }}>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.inputStdUnit ? item.inputStdUnit : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.StdUnit}</Text></Text>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.inputUnit ? item.inputUnit : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.Unit}</Text></Text>
                        </View>
                    </View>
                    {item.isClose ?
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 0.1 }} onPress={() => this._onthreeDot(item, index)} activeOpacity={0.5}>
                            <Image source={ImageName.THREE_DOT_IMG} style={{ height: 21, width: 3 }} />
                        </TouchableOpacity> :
                        <View style={{ flex: 0.1 }} />
                    }
                </View>
            </React.Fragment>
        )
    }

    _footerLoaderChange = async (type) => {
        this.state.footerLoader = type;
        this.setState(this.state);
    }

    // for loader set of main page
    _onMainPageLoaderSet = async (type) => {
        this.state.pageLoader = type;
        this.setState(this.state);
    }

    _onDeleteItem = async (data) => {
        await this._onMainPageLoaderSet(true);
        let stockData = this.state.stockArr;
        let tempStockArr = [];
        if (data.isOpenClose) {
            stockData[this.state.itemIndex].inputStdUnit = "0";
            stockData[this.state.itemIndex].inputUnit = "0";
            stockData[this.state.itemIndex].totalAmount = "0.00";
            stockData[this.state.itemIndex].isClose = false;
        } else {
            stockData.splice(this.state.itemIndex, 1);
        }

        // this.setState({ stockArr: stockData });
        for (let i = 0; i < stockData.length; i++) {
            if (stockData[i].isClose) {
                tempStockArr.push(stockData[i]);
            }
        }
        await StorageDataModification.closingStockItemList(tempStockArr, "store");
        // await this._onMainPageLoaderSet(false);
        this.setState({ stockArr: [] });
        await this._onLoad();
    }

    _onSaveData = async (data) => {
        // await this._footerLoaderChange(true);
        let tempStockArr = [];
        this.state.stockArr[this.state.itemIndex] = data;
        this.setState(this.state);
        for (let i = 0; i < this.state.stockArr.length; i++) {
            if (this.state.stockArr[i].isClose) {
                tempStockArr.push(this.state.stockArr[i]);
            }
        }
        await StorageDataModification.closingStockItemList(tempStockArr, "store");
        // await this._footerLoaderChange(false);
    }


    modalSec = () => {

        if (this.state.isVisible) {
            return (
                <EditDeleteModal
                    isVisible={this.state.isVisible}
                    onCloseModal={() => this.onRequestCloseModal()}
                    data={this.state.itemData}
                    onDeleteItem={(data) => this._onDeleteItem(data)}
                    onDataSave={(data) => this._onSaveData(data)}
                    props={this.props}
                    type={"closeingStock"}
                />)
        } else {
            return null;
        }
    }


    _footerSec = () => {
        const totalAmountSum = this.state.stockArr.reduce((sum, item) => {
            return sum + parseFloat(item.totalAmount);
        }, 0);
        if (this.state.footerLoader) {
            return (<ActivityIndicator size={"small"} color={Color.COLOR.RED.AMARANTH} />)
        } else {
            return (
                <View>
                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#F0F4F7', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: '#1F2B4D' }}>Total Amount</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: '#1F2B4D' }}>{totalAmountSum ? totalAmountSum.toFixed(2) : "0"}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1F2B4D', padding: 6, paddingHorizontal: 12, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._onBack()} activeOpacity={0.9}>
                            <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.WHITE.PURE_WHITE }}>Add New</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        {this.state.updateLoader ?
                            <View style={{ marginRight: '5%' }}>
                                <ActivityIndicator size={"large"} color={Color.COLOR.RED.AMARANTH} />
                            </View> :
                            <TouchableOpacity style={{ backgroundColor: '#F13748', padding: 6, borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }} onPress={() => this._onOpenStockUpdate()} activeOpacity={0.9}>
                                <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.WHITE.PURE_WHITE }}>Update items</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            )
        }

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
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Closing stock Update</Text>
                    </View>
                </View>
            </View>
        )
    }


    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 200 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSec()}
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
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>items</Text>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Opening</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                            <View style={{ marginLeft: '10%' }}>
                                                <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Closing</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <FlatList
                                    data={this.state.stockArr}
                                    renderItem={(item, index) => this.renderItem(item, index)}
                                    // keyExtractor={(item, index) => index}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                                {this._footerSec()}
                            </React.Fragment> :
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

export default connect(mapStateToProps, mapDispatchToProps)(CloseingStockEditDeleteList);




