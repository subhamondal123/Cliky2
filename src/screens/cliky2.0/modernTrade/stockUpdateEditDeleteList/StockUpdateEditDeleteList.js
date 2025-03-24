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
class StockUpdateEditDeleteList extends Component {
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
            newArray: []

        }

    }

    componentDidMount = () => {
        this._onLoad();
        this.getUnitData();
    }

    _onLoad = async () => {
        let storeListData = await StorageDataModification.trandItemList({}, "get");
        // let respoData = modifyListData(storeListData);
        let respoData = storeListData == null || storeListData == undefined ? [] : storeListData;
        // let transformedData = {};
        // respoData.forEach(item => {
        //     let key = `${item.hierarchyDataId}-${item.hmDescription}-${item.hmName}`;
        //     if (!transformedData[key]) {
        //         transformedData[key] = { ...item };
        //     } else {
        //         transformedData[key].inputStdUnit = (parseInt(transformedData[key].inputStdUnit || 0, 10) + parseInt(item.inputStdUnit || 0, 10)).toString();
        //         transformedData[key].inputUnit = (parseInt(transformedData[key].inputUnit || 0, 10) + parseInt(item.inputUnit || 0, 10)).toString();
        //         transformedData[key].totalAmount = (parseFloat(transformedData[key].totalAmount || 0) + parseFloat(item.totalAmount || 0)).toFixed(2);
        //         transformedData[key].quantity += item.quantity;
        //     }
        // });
        // this.state.stockArr = Object.values(transformedData);
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
        // }
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
        if (this.state.stockArr.length == 0) {
            Toaster.ShortCenterToaster("Please add atleast one product !");
        } else {
            let productArrdata = [];
            for (let i = 0; i < this.state.stockArr.length; i++) {
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
                    "hierarchyTypeId": this.state.stockArr[i].mstHierarchyTypeId,
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
            let reqData = {
                "visitId": this.props.Sales360Redux.storeOutletListData.storeCheckingData.visitId,
                "shopId": this.props.route.params.prevProps.shopId,
                "stockType": "1",
                "productData": productArrdata,
            }
            this.setState({ updateLoader: true })
            let responseData = await MiddlewareCheck("addMTStock", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.navigation.navigate("OutletLogInPage");
                    Toaster.ShortCenterToaster(responseData.message);
                    await StorageDataModification.trandItemList({}, "clear");

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
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.inputStdUnit ? item.inputStdUnit : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.StdUnit}</Text></Text>
                            <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.inputUnit ? item.inputUnit : "0"} <Text style={{ color: '#1F2B4D', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.Unit}</Text></Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.totalAmount}</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 0.1 }} onPress={() => this._onthreeDot(item, index)} activeOpacity={0.5}>
                        <Image source={ImageName.THREE_DOT_IMG} style={{ height: 21, width: 3 }} />
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    _onDeleteItem = async (data) => {
        let indexToDelete = this.state.stockArr.findIndex(item => item === data);
        if (indexToDelete !== -1) {
            this.state.stockArr.splice(indexToDelete, 1);
            this.setState({ stockArr: this.state.stockArr });
            await StorageDataModification.trandItemList(this.state.stockArr, "store");
        }
    }

    _onSaveData = async (data) => {
        this.state.stockArr[this.state.itemIndex] = data;
        this.setState(this.state);
        await StorageDataModification.trandItemList(this.state.stockArr, "store");

    }


    modalSec = () => {
        return (
            <>
                {this.state.isVisible ?
                    <EditDeleteModal
                        isVisible={this.state.isVisible}
                        onCloseModal={() => this.onRequestCloseModal()}
                        data={this.state.itemData}
                        onDeleteItem={(data) => this._onDeleteItem(data)}
                        onDataSave={(data) => this._onSaveData(data)}
                        props={this.props}
                        type={"openingStock"}

                    />
                    :
                    null
                }
            </>


        )
    }


    _footerSec = () => {
        let totalAmountSum = this.state.stockArr.reduce((sum, item) => {
            return sum + parseFloat(item.totalAmount);
        }, 0);

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
                    <TouchableOpacity style={{ backgroundColor: '#1F2B4D', padding: 6, paddingHorizontal: 12, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._onBack()}>
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
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Opening stock Update</Text>
                    </View>
                </View>
            </View>
        )
    }


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
                                                <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Amount</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdateEditDeleteList);




