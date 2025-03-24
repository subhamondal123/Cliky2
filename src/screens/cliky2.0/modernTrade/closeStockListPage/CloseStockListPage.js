import React from "react";
import {
    Platform,
    FlatList,
    Text,
    TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView
} from "react-native";
import { stateCheckForNetwork, customerOrderData, stateCartData, storeOutletListData } from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import { ImagePreview, Loader, NoDataFound } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import { DataValidator } from "../../../../validators";

const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};

class CloseStockListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {},
            selectProductList: [],
            fetchMoreProductDataCheck: true,
            productMainLoader: true,
            totalItemAmount: 0,
            addCartLoader: false,
            allCart: [],
            allUnits: [],
            customerType: "",
            totalArrCount: "0",
            totalAmount: "0",
            totalItem: ""


        };
    }

    componentDidMount = async () => {
        await this._load();
    };

    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            allCart: [],

            selectProductList: [],
            productMainLoader: true,
        })
    }

    //initial load function
    _load = async () => {
        await this._onFetchProductData()
    };


    // unit
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


    // for get the product data
    _onFetchProductData = async () => {
        let reqData = {
            "shopId": this.props.Sales360Redux.storeOutletListData.item.shopId,
            "searchDateTime": DateConvert.fullDateFormat(new Date())
        };
        let responseData = await MiddlewareCheck("getMTOpenStockList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let apiRespData = responseData.response.data;
                let prevStoreCartData = this.state.allCart;

                if (apiRespData.length == 0) {
                    this.state.fetchMoreProductDataCheck = false;
                    // this.setState(this.state)
                }
                for (let i = 0; i < apiRespData.length; i++) {
                    apiRespData[i]["quantity"] = 0;
                    apiRespData[i]["totalAmount"] = 0;
                    apiRespData[i]["inputStdUnit"] = "";
                    apiRespData[i]["stdUnitDisableCheck"] = false;
                    apiRespData[i]["inputUnit"] = "";
                    apiRespData[i]["unitDisableCheck"] = false;
                    apiRespData[i]["inputRate"] = "";
                    apiRespData[i]["rateCheck"] = false;
                    if (apiRespData[i].productAttributes.StdUnit === undefined || apiRespData[i].productAttributes.StdUnit === null || apiRespData[i].productAttributes.StdUnit.length === 0) {
                        apiRespData[i]["stdUnitDisableCheck"] = true;
                    }
                    if (apiRespData[i].productAttributes.Unit === undefined || apiRespData[i].productAttributes.Unit === null || apiRespData[i].productAttributes.Unit.length === 0) {
                        apiRespData[i]["unitDisableCheck"] = true;
                    }
                    if (!(this.onCalculateProductRate(apiRespData[i])).validCheck) {
                        apiRespData[i]["rateCheck"] = true;
                    }
                    for (let j = 0; j < prevStoreCartData.length; j++) {
                        if (apiRespData[i].hierarchyDataId == prevStoreCartData[j].hierarchyDataId) {
                            apiRespData[i].quantity = prevStoreCartData[j].quantity;
                            apiRespData[i].totalAmount = prevStoreCartData[j].totalAmount;
                            apiRespData[i].inputStdUnit = prevStoreCartData[j].inputStdUnit;
                            apiRespData[i].stdUnitDisableCheck = prevStoreCartData[j].stdUnitDisableCheck;
                            apiRespData[i].inputUnit = prevStoreCartData[j].inputUnit;
                            apiRespData[i].unitDisableCheck = prevStoreCartData[j].unitDisableCheck;
                            apiRespData[i].inputRate = prevStoreCartData[j].inputRate;
                            apiRespData[i].rateCheck = prevStoreCartData[j].rateCheck;
                            break;
                        }
                    }
                }
                this.state.selectProductList = [...this.state.selectProductList, ...apiRespData];
                this.setState(this.state);
            }
        }
        this.setState({
            productMainLoader: false
        })
    };

    // for check and store the cart data and return total amount
    _onCheckStoreCartData = async (selectedData) => {
        let totalAmount = 0;
        let respArrData = [];
        let curInsertDataCheck = true;
        let prevStoreCartData = this.state.allCart;
        respArrData = prevStoreCartData;
        if (selectedData && prevStoreCartData) {
            for (let i = 0; i < respArrData.length; i++) {
                if (respArrData[i].hierarchyDataId == selectedData.hierarchyDataId) {
                    respArrData[i].quantity = selectedData.quantity;
                    respArrData[i].totalAmount = selectedData.totalAmount;
                    respArrData[i].inputStdUnit = selectedData.inputStdUnit;
                    respArrData[i].stdUnitDisableCheck = selectedData.stdUnitDisableCheck;
                    respArrData[i].inputUnit = selectedData.inputUnit;
                    respArrData[i].unitDisableCheck = selectedData.unitDisableCheck;
                    respArrData[i].inputRate = selectedData.inputRate;
                    respArrData[i].rateCheck = selectedData.rateCheck;
                    curInsertDataCheck = false;
                    if (respArrData[i].totalAmount == 0) {
                        respArrData.splice(i, 1);
                    }
                }
            }
        }
        if (selectedData && curInsertDataCheck) {
            respArrData.push(selectedData);
        }
        for (let i = 0; i < respArrData.length; i++) {
            totalAmount = (parseFloat(totalAmount) + parseFloat(respArrData[i].totalAmount)).toFixed(1);
        }
        this.state.totalItemAmount = totalAmount;
        this.state.allCart = respArrData;
        this.props.Sales360Redux.cartData.allCart = this.state.allCart;
        this.props.stateCartData(this.props.Sales360Redux.cartData);
        this.setState(this.state);
        return true;
    }

    // for calculate product rate
    onCalculateProductRate = (item) => {
        let tempRate = 0;
        let validCheck = false;
        // for product rate (customerType == "Primary" then PTD but retailer PTR)

        // if (this.state.customerType == "Primary") {
        //     if (item.productAttributes.PTD) {
        //         tempRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
        //         validCheck = true;
        //     }
        // } else {
        if (item.productAttributes.PTR) {
            tempRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
            validCheck = true;
        }
        // }
        return { rate: tempRate, validCheck: validCheck };
    }

    _onChangeRate = async (val, item, key) => {
        let tempVal = 0;
        let tempRate = item.inputRate ? parseFloat(item.inputRate) : 0;
        let tempStdUnit = item.inputStdUnit ? parseFloat(item.inputStdUnit) : 0;
        let tempUnit = item.inputUnit ? parseFloat(item.inputUnit) : 0;
        let tempItemAmount = 0;
        if (val.indexOf(".") >= 1) {
            tempVal = val;
            if (/\.(.+)/.test(val)) {
                tempVal = parseFloat(tempVal).toFixed(2);
            }
        } else if (val.indexOf(".") == 0) {
            tempVal = 0
        }
        else {
            tempVal = val;
        }
        if (val && val.length > 0) {
            tempItemAmount = (parseFloat(tempVal));
        } else {
            tempItemAmount = 0;
        }
        item.quantity = tempUnit;
        tempItemAmount = (tempItemAmount * parseFloat(tempUnit));
        item.inputRate = DataValidator.inputEntryValidate(tempVal, "number");
        item.totalAmount = tempItemAmount;
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreCartData(item);
    }

    // for get the product std unit
    _onChangeStdUnit = async (val, item, key) => {
        if (val > item.quantity_stdUnitWise) {
            Toaster.ShortCenterToaster("Closeing stock can not be more than Opening stock !")
        } else {
            const sanitizedValue = val.replace(/[.,-]/g, '');
            let tempVal = 0;
            let tempUnit = item.inputUnit ? parseFloat(item.inputUnit) : 0;
            let tempItemAmount = 0;
            // if (val.indexOf(".") >= 1) {
            //     tempVal = val;
            //     if (/\.(.+)/.test(val)) {
            //         tempVal = parseFloat(tempVal).toFixed(2);
            //     }
            // } else if (val.indexOf(".") == 0) {
            //     tempVal = 0
            // }
            // else {
            //     tempVal = val;
            // }
            if (sanitizedValue.includes(' ')) {
                tempVal = 0;
            } else {
                tempVal = sanitizedValue;
            }
            if (sanitizedValue && sanitizedValue.length > 0) {
                tempItemAmount = (parseFloat(tempVal) * parseFloat(item.productAttributes.StdUnitConversionFactor));
            } else {
                tempItemAmount = 0;
            }
            item.quantity = (tempItemAmount + parseFloat(tempUnit));
            tempItemAmount = ((tempItemAmount + parseFloat(tempUnit)) * parseFloat((this.onCalculateProductRate(item)).rate)).toFixed(2);
            item.inputStdUnit = DataValidator.inputEntryValidate(tempVal, "number");;
            item.totalAmount = tempItemAmount;
            this.state.selectProductList[key] = item;
            this.setState(this.state);
            await this._onCheckStoreCartData(item);
        }

    }

    // for get the unit
    _onChangeUnit = async (val, item, key) => {
        if (val > item.quantity_unitWise) {
            Toaster.ShortCenterToaster("Closeing stock can not be more than Opening stock !")
        } else {
            const sanitizedValue = val.replace(/[.,-]/g, '')
            let tempVal = 0;
            let tempStdUnit = item.inputStdUnit ? parseFloat(item.inputStdUnit) : 0;
            let tempRate = item.inputRate ? parseFloat(item.inputRate) : 0;
            let tempItemAmount = 0;
            // if (val.indexOf(".") >= 1) {
            //     tempVal = val;
            //     if (/\.(.+)/.test(val)) {
            //         tempVal = parseFloat(tempVal).toFixed(2);
            //     }
            // } else if (val.indexOf(".") == 0) {
            //     tempVal = 0
            // }
            // else {
            //     tempVal = val;
            // }
            if (sanitizedValue.includes(' ')) {
                tempVal = 0;
            } else {
                tempVal = sanitizedValue;
            }
            if (item.rateCheck) {
                tempItemAmount = (parseFloat(tempVal) * parseFloat(tempRate));
                item.quantity = tempItemAmount;
            } else {
                tempItemAmount = (parseFloat(tempStdUnit) * parseFloat(item.productAttributes.StdUnitConversionFactor));
                if (sanitizedValue && sanitizedValue.length > 0) {
                    tempItemAmount = (tempItemAmount + parseFloat(tempVal));
                } else {
                    tempItemAmount = (tempItemAmount + 0);
                }
                item.quantity = tempItemAmount;
                tempItemAmount = (tempItemAmount * parseFloat((this.onCalculateProductRate(item)).rate)).toFixed(2);
            }
            item.inputUnit = DataValidator.inputEntryValidate(tempVal, "number");;
            item.totalAmount = tempItemAmount;
            this.state.selectProductList[key] = item;
            this.setState(this.state);
            await this._onCheckStoreCartData(item);
        }
    }


    //list sectiion
    listSection = (item, key) => {
        let productRate = "0",
            productUnit = "",
            mrp = "0";
        // for product rate (customerType == "Primary" then PTD but retailer PTR)
        if (item.productAttributes.PTR) {
            productRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
        }
        // if (this.state.customerType == "Primary") {
        //     if (item.productAttributes.PTD) {
        //         productRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
        //     }
        // }
        // for MRP
        if (item.productAttributes.MRP) {
            mrp = (parseFloat(item.productAttributes.MRP)).toFixed(2);
        }
        if (item.productAttributes.Unit) {
            productUnit = item.productAttributes.Unit;
        }
        return (
            <View key={key}>
                <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <View style={{ backgroundColor: item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', padding: 14, borderRadius: 14 }} >
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: "center", marginRight: 10 }}>
                            <View activeOpacity={0.9} style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 26, width: 26, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                                    <View style={{ width: 5 }} />
                                    <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>{item.hmName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end", flex: 1 }}>
                                    <Text style={{ color: '#747C90', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{"₹" + " " + item.totalAmount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 5, marginRight: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Opening Stock</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.StdUnit}: <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.quantity_stdUnitWise}</Text></Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.productAttributes.Unit}: <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.quantity_unitWise}</Text></Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Total Amount: <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.totalPrice}</Text></Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                        </View>
                        <View style={{ backgroundColor: item.hideShow ? Color.COLOR.BLUE.BABY_BLUE : item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', top: item.hideShow ? 5 : 0 }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: item.hideShow ? 20 : 15 }} activeOpacity={0.6}>
                                <Image source={item.hideShow ? ImageName.UP_ARROW_WITH_PROGRASS_BLUE : ImageName.DOWN_ARROW_WITH_PROGRASS_BLUE} style={{ height: 30, width: 30, position: 'relative' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: item.hideShow ? 20 : 0, alignItems: 'center', }}>
                            <View style={{ flex: 0.4 }}>
                                {item.rateCheck ?
                                    <View style={{ width: "65%", justifyContent: "center", alignItems: "center", height: 45, borderWidth: 0.8, borderColor: "#000", borderRadius: 20 }}>
                                        <TextInput
                                            placeholder={"Rate"}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            value={item.inputRate.toString()}
                                            onChangeText={(value) => this._onChangeRate(value, item, key)}
                                            // maxLength={8}
                                            keyboardType="number-pad"
                                            style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                            maxLength={6}
                                        />
                                    </View> :
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '2%' }}>{"PTR"}  <Text style={{ color: Color.COLOR.GRAY.TAPA, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + productRate}</Text></Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '2%' }}>MRP <Text style={{ color: Color.COLOR.GRAY.TAPA, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + mrp}</Text></Text>
                                    </View>
                                }
                            </View>
                            <View style={{ flex: 0.6, flexDirection: 'row' }}>
                                {item.stdUnitDisableCheck ?
                                    <View style={{ width: "47%" }} /> :
                                    <View style={{ width: "47%", justifyContent: "center", alignItems: "center", height: 45, borderWidth: 0.8, borderColor: "#000", borderRadius: 20 }}>
                                        <TextInput
                                            editable={!item.stdUnitDisableCheck}
                                            placeholder={item.productAttributes.StdUnit}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            value={item.inputStdUnit.toString()}
                                            onChangeText={(value) => this._onChangeStdUnit(value, item, key)}
                                            keyboardType="number-pad"
                                            maxLength={6}
                                            style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                        />
                                    </View>
                                }
                                {item.unitDisableCheck ?
                                    null :
                                    <React.Fragment>
                                        <View style={{ width: '6%' }} />
                                        <View style={{ width: "47%", justifyContent: "center", alignItems: "center", height: 45, borderWidth: 0.8, borderColor: "#000", borderRadius: 20 }}>
                                            <TextInput
                                                editable={!item.unitDisableCheck}
                                                placeholder={item.productAttributes.Unit}
                                                placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                value={item.inputUnit.toString()}
                                                onChangeText={(value) => this._onChangeUnit(value, item, key)}
                                                maxLength={6}
                                                keyboardType="number-pad"
                                                style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                            />
                                        </View>
                                    </React.Fragment>
                                }
                            </View>
                        </View>
                    </View>
                </View >
            </View >
        )
    };

    _onCloseItem = () => {
        this.props.navigation.navigate("CloseingStockEditDeleteList", { prevProps: this.props.route.params.data, onLoad: this._load, totalAmount: this.state.totalAmount })
    }

    //header section
    headerSec = () => {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 15 }}>
                <TouchableOpacity style={{ flex: 0.1 }} activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 5 }} activeOpacity={0.9} onPress={() => onProfileTab(this.state.profileData)}>
                    <View style={{ height: 35, width: 35, borderRadius: 100 }}>
                        <ImagePreview source={(this.state.profileData.profileImg && this.state.profileData.profileImg.length > 0) ? { uri: App_uri.CRM_BASE_URI + this.state.profileData.profileImg } : ImageName.DUMMY_PROFILE} style={{ height: 35, width: 35, borderRadius: 100, resizeMode: 'cover' }} />
                    </View>
                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} numberOfLines={1}>{"Closing Stock List"}</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#f15e6e', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => this._onCloseItem()}>
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{this.state.totalArrCount + " " + "Update list"}</Text>
                </TouchableOpacity>
            </View>
        )
    };


    // navigate to back screen
    _onBack = async () => {
        this.props.navigation.goBack();
    };

    //to render list
    renderContactList = (item, index) => {
        return (
            <View>
                {this.listSection(item, index)}
            </View>
        )
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

    //footer sec
    _onFooterSec = () => {
        const addToCart = async () => {
            // const filteredData = this.state.allCart.filter(item => item.totalAmount !== "0.00" && item.totalAmount !== 0);
            let tempCartData = this.state.allCart;
            if (tempCartData.length == 0) {
                Toaster.ShortCenterToaster("Please add atleast one product !");
                return true;
            } else {
                let orderArrData = [];
                for (let i = 0; i < tempCartData.length; i++) {
                    let tempUnitId = 0;
                    let tempUnitShort = "";
                    let tempStdUnitId = 0;
                    let tempStdUnitShort = "";
                    let tempRate = "0";
                    let cbValue = "0";
                    let pouValue = "0";
                    let StdUnitConversionFactor = "0";

                    let seleltedUnitData = this.onSelectUnitData(tempCartData[i].productAttributes.Unit);
                    let selectedStdUnitData = this.onSelectStdUnitData(tempCartData[i].productAttributes.StdUnit);
                    if (Object.keys(seleltedUnitData).length > 0) {
                        tempUnitId = seleltedUnitData.unitId;
                        tempUnitShort = seleltedUnitData.unitShort
                    }

                    if (Object.keys(selectedStdUnitData).length > 0) {
                        tempStdUnitId = selectedStdUnitData.unitId;
                        tempStdUnitShort = selectedStdUnitData.unitShort
                    }
                    if (tempCartData[i].rateCheck) {
                        tempRate = tempCartData[i].inputRate;
                    } else {
                        tempRate = this.onCalculateProductRate(tempCartData[i]).rate;
                    }
                    let mrp = (parseFloat(tempCartData[i].productAttributes.MRP)).toFixed(2);

                    cbValue = tempCartData[i].inputStdUnit;
                    pouValue = tempCartData[i].inputUnit;
                    StdUnitConversionFactor = tempCartData[i].productAttributes.StdUnitConversionFactor

                    orderArrData.push({
                        "isPlaceOrder": false,
                        "isSync": false,
                        "productName": tempCartData[i].hmName,
                        "prodhierarchyTypeId": tempCartData[i].mstHierarchyTypeId,
                        "prodhierarchyDataId": tempCartData[i].hierarchyDataId,
                        "quantity": (tempCartData[i].quantity).toString(),
                        "totalPrice": tempCartData[i].totalAmount,
                        "unitId": tempUnitId,
                        "unitShort": tempUnitShort,
                        "rate": tempRate,
                        "CB": cbValue,
                        "pou": pouValue,
                        "stdUnitId": tempStdUnitId,
                        "stdUnitShort": tempStdUnitShort,
                        "MRP": mrp,
                        "StdUnitConversionFactor": StdUnitConversionFactor
                    })
                }
                const { totalPrice, totalQuantity } = orderArrData.reduce(
                    (accumulator, currentItem) => {
                        const quantity = parseInt(currentItem.quantity, 10);
                        const price = parseFloat(currentItem.totalPrice);
                        accumulator.totalPrice += price;
                        accumulator.totalQuantity += quantity;
                        return accumulator;
                    },
                    { totalPrice: 0, totalQuantity: 0 }
                );

                let totalItemAmount = totalPrice.toFixed(2);
                let totalItemQuantity = totalQuantity;
                let closeModArr = [];

                // let closeStoreArrData = await StorageDataModification.closingStockItemList({}, "get");
                let closeStoreArrData = []
                if (closeStoreArrData == null || closeStoreArrData == undefined) {
                    closeStoreArrData = this.state.allCart
                } else {
                    closeModArr = [...closeStoreArrData, ...this.state.allCart];
                    let transformedData = {};
                    closeModArr.forEach(item => {
                        let key = `${item.hierarchyDataId}-${item.hmDescription}-${item.hmName}`;
                        if (!transformedData[key]) {
                            transformedData[key] = { ...item };
                        } else {
                            transformedData[key].inputStdUnit = (parseInt(transformedData[key].inputStdUnit || 0, 10) + parseInt(item.inputStdUnit || 0, 10)).toString();
                            transformedData[key].inputUnit = (parseInt(transformedData[key].inputUnit || 0, 10) + parseInt(item.inputUnit || 0, 10)).toString();
                            transformedData[key].totalAmount = (parseFloat(transformedData[key].totalAmount || 0) + parseFloat(item.totalAmount || 0)).toFixed(2);
                            transformedData[key].quantity += item.quantity;
                        }
                    });
                    closeStoreArrData = Object.values(transformedData);
                }
                await StorageDataModification.closingStockItemList(closeStoreArrData, "store")
                this.state.totalArrCount = closeStoreArrData.length;
                this.state.totalAmount = totalItemAmount
                this.state.totalItem = totalItemQuantity;
                this.setState(this.state);
                await this.onSelectInitialState();
                await this._load();
            }
        }

        return (
            <View style={{ marginHorizontal: "3%", marginTop: 10 }}>
                {this.state.addCartLoader ?
                    <Loader type={"normal"} /> :
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '57%' }}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Selected{"\n"}Items  <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}></Text>{this.state.totalArrCount}</Text>
                            </View>
                        </View>
                        <View style={{ width: '43%', justifyContent: 'center' }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => addToCart()}>
                                <View style={{ width: 5 }} />
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{"Add to Update"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }


    //for Flatlist skeliton
    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    //for subCategory skeliton
    subCategoryabSkeliton = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 8 }}>
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
            </View>
        )
    }


    renderLoader = () => {
        let returnView = <View style={{ marginBottom: 250 }} />;
        if (this.state.listLoader) {
            returnView = <Loader type={"normal"} />;
        }
        return returnView;
    };


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                {this.headerSec()}
                {this.state.productMainLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginHorizontal: 15 }}>
                            {this.ViewSkeletonPlaceholder()}
                        </View>
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.selectProductList.length > 0 ?
                            <>
                                <FlatList
                                    data={this.state.selectProductList}
                                    renderItem={({ item, index }) => this.renderContactList(item, index)}
                                    keyExtractor={(item, index) => index}
                                    // onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}

                                />
                                {this._onFooterSec()}
                            </>
                            :
                            <View style={{ marginTop: 20, height: Dimension.height }}>
                                <NoDataFound />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }} />
                    </React.Fragment>
                }
            </KeyboardAvoidingView>
        );
    }

}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
        customerOrderData,
        stateCartData,
        storeOutletListData
    }, dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CloseStockListPage);