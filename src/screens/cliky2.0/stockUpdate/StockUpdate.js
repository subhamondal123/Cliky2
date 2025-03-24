import React from "react";
import {
    ActivityIndicator,
    SafeAreaView, TextInput, TouchableOpacity, View
} from "react-native";
import { stateCheckForNetwork, customerOrderData, stateCartData } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { Image } from "react-native";
import { Loader } from "../../../shared";
import { ScrollView } from "react-native";
import CustomerSubCategoryTab from "../../../pageShared/order/customerSubCategoryTab";
import { ProjectViewModal } from "../../../pageShared";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { modHigherLevelData, modifyProfileData } from "./Function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { onChangeSelectForObject } from "../../../services/common-view-function/dataConvert";
import { RefreshControl } from "react-native";
import { App_uri } from "../../../services/config";
import Header from "../header/Header";

const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};

const categoryData = [
    {
        id: 1,
        title: "Usual",
        icon: ImageName.YELLOW_OPEN_BOX_LOGO,
        check: true

    },
    {
        id: 2,
        title: "Offers",
        icon: ImageName.RED_PERCENTAGE_LOGO,
        check: false

    },
    {
        id: 3,
        title: "Popular",
        icon: ImageName.YELLOW_STAR_ICON,
        check: false
    },
    {
        id: 4,
        title: "New",
        icon: ImageName.NEW_COLLECTION_ICON,
        check: false
    },
]

class StockUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialApiCall: false,
            categoryArrData: categoryData,
            subCategoryArrData: [],
            selectedBrandId: "",
            profileData: {},
            selectedItemArr: [],
            totalAddedItems: 0,
            selectedAllItems: [],
            pageLoader: true,
            totalDataCount: 0,
            customerId: "",
            subCategoryArr: [],
            selectedSubCategoryObj: {},
            subCategoryLoader: true,
            touchCheck: false,
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            listLoader: false,
            refreshing: true,
            fetchMoreProductDataCheck: true,
            productMainLoader: true,
            totalItemAmount: 0,
            addCartLoader: false,
            allCart: this.props.Sales360Redux.cartData.allCart ? this.props.Sales360Redux.cartData.allCart : [],
            allUnits: [],
            isVisisableProdduct: false,
            selectedProduct: {},
            customerData: {}
        };
    }

    componentDidMount = async () => {
        let customerData = await StorageDataModification.selectedCustomerData({}, "get");
        this.setState({ customerId: customerData.customerId, customerData: customerData })
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        await this.onSelectInitialState();
        await this._load();
        // })
    };

    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            allCart: [],
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            allUnits: [],
            selectedProduct: {},
            subCategoryArr: []
        })
    }

    //initial load function
    _load = async () => {
        let mappedHigherProduct = this.props.Sales360Redux.mappedHigherLevelProductArr;
        if (mappedHigherProduct.length > 0) {
            if (mappedHigherProduct.length > 1) {
                await this.getProductsHirarchywise();
            } else {
                await this.getProductsHirarchywise(mappedHigherProduct[0].hierarchyTypeId, mappedHigherProduct[0].hierarchyDataId);
            }
        } else {
            await this.getProductsHirarchywise();
        }
        // await this.getProductsHirarchywise();
        await this.getProfileData();
        await this._onFetchProductData();
        await this._onCheckStoreStockData(null);
        this.getUnitData();
    };

    // for get profile info
    getProfileData = async () => {
        let reqData = { customerId: this.state.customerId, isCustomer: "1" };
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response);
                modifiedProfileData["allCart"] = this.state.allCart;
                this.props.stateCartData(modifiedProfileData);
                this.setState({ profileData: modifiedProfileData });
            }
        }
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

    //get Products Hirarchywise
    getProductsHirarchywise = async (hierarchyTypeId, hierarchyDataId, index, mainIndex) => {
        let reqObjData = {};
        let mappedHigherLevelData = this.props.Sales360Redux.mappedHigherLevelProductArr;
        let modMappedHigherLevelData = modHigherLevelData(mappedHigherLevelData)
      
        if (hierarchyTypeId !== undefined && hierarchyTypeId !== null && hierarchyTypeId !== "") {
            reqObjData["hierarchyTypeId"] = hierarchyTypeId;
        }
        if (hierarchyDataId !== undefined && hierarchyDataId !== null && hierarchyDataId !== "") {
            reqObjData["hierarchyDataId"] = hierarchyDataId;
        }
        if (index === undefined || index === null) {
            this.state.subCategoryLoader = true;
        }
        if (mainIndex !== undefined || mainIndex !== null) {
            this.state.subCategoryArr.splice(mainIndex + 1);
        }
        this.setState(this.state);
        let responseData = await MiddlewareCheck("getProductsHirarchywise", reqObjData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let apiRespData = responseData.response;
                if (apiRespData.length > 0) {
                    let tempIndex = "";
                    let isLeafLevelInsert = true;
                    let finalArr = this.state.subCategoryArr;
                    let finalObjData = {};
                    if (index !== undefined && index !== null) {
                        tempIndex = index;
                    }
                      // if reqObj data lenght is 0 and redux arr length is greater than 1 show the top divison 
                    // else if reqObj data length is 0 and redux arr length is 1 then hide top division and call sub category length 
                    // else if reqObj data lenght  is greater than 0 then su b category length is called
                    if (Object.keys(reqObjData).length == 0) {
                        if (modMappedHigherLevelData.length > 1) {
                            for (let i = 0; i < modMappedHigherLevelData.length; i++) {
                                isLeafLevelInsert = true;
                                finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = modMappedHigherLevelData[i];
                            }
                        } else {
                            for (let i = 0; i < apiRespData.length; i++) {
                                if (apiRespData[i].leafLevel == 0) {
                                    isLeafLevelInsert = false;
                                }
                                finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
                            }
                        }
                    } else {
                        for (let i = 0; i < apiRespData.length; i++) {
                            if (apiRespData[i].leafLevel == 0) {
                                isLeafLevelInsert = false;
                            }
                            finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
                        }
                    }
                    // for (let i = 0; i < apiRespData.length; i++) {
                    //     if (apiRespData[i].leafLevel == 0) {
                    //         isLeafLevelInsert = false;
                    //     }
                    //     finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
                    // }
                    if (Object.keys(finalObjData).length > 0 && isLeafLevelInsert) {
                        finalArr.push(finalObjData);
                    }
                    this.state.subCategoryArr = finalArr;
                }
            }
        }
        if (index === undefined || index === null) {
            this.state.subCategoryLoader = false;
        }
        this.setState(this.state);
    };

    // for get the product data
    _onFetchProductData = async () => {
        let reqData = {
            limit: this.state.limit.toString(),
            offset: (this.state.pageNum * this.state.limit).toString(),
            hierarchyDataId: this.state.selectedSubCategoryObj.hierarchyDataId ? this.state.selectedSubCategoryObj.hierarchyDataId : "",
            hierarchyTypeId: this.state.selectedSubCategoryObj.mstHierarchyTypeId ? this.state.selectedSubCategoryObj.mstHierarchyTypeId : ""
        };
        let responseData = await MiddlewareCheck("getAllProductBrandwiseList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let apiRespData = responseData.response;
                if (apiRespData && apiRespData.length > 0) {
                    this.state.fetchMoreProductDataCheck = true;
                    let prevStoreCartData = this.state.allCart;
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
                } else {
                    this.state.fetchMoreProductDataCheck = false;
                }
                this.setState(this.state);
            }
        }
        this.state.listLoader = false;
        this.state.refreshing = false;
        this.state.productMainLoader = false;
        this.setState(this.state);
    };

    // sub category section
    subCategorySec = () => {

        const onSubCategory = async (item, itemKey, mainKey) => {
            item.check = true;
            this.state.selectedSubCategoryObj = item;
            this.state.subCategoryArr[mainKey][itemKey] = item;
            this.state.touchCheck = true;
            this.state.subCategoryArr[mainKey] = onChangeSelectForObject(this.state.subCategoryArr[mainKey], itemKey, "check");
            this.setState(this.state);
            await this._onStatusChange();
            await this.getProductsHirarchywise(item.mstHierarchyTypeId, item.hierarchyDataId, itemKey, mainKey);
            await this._onFetchProductData();
            this.state.touchCheck = false;
            this.setState(this.state);
        }


        return (
            <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 15 }}>
                {this.state.subCategoryLoader ?
                    <View style={{ marginHorizontal: 15 }}>
                        <SkeletonPlaceholder>
                            {this.subCategoryabSkeliton()}
                        </SkeletonPlaceholder>
                    </View> :
                    <React.Fragment>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {this.state.subCategoryArr.map((item, key) => (
                                <View style={{ flexDirection: 'row', marginBottom: 10 }} key={key}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                        {Object.keys(item).map((subKey) => (
                                            <View key={subKey}>
                                                <TouchableOpacity disabled={this.state.touchCheck} style={item[subKey].check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(item[subKey], subKey, key)} activeOpacity={0.9} key={subKey}>
                                                    {item[subKey].hmName ?
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ backgroundColor: Color.COLOR.GRAY.GRAY_TINTS, height: 22, width: 22, borderRadius: 11, marginRight: 5, padding: 5, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={ImageName.DAAL_PAPAD} style={{ height: 18, width: 18, resizeMode: 'contain', borderRadius: 50 }} />
                                                            </View>
                                                            <Text style={item[subKey].check ? styles.activeTitleTxt : styles.titleTxt}>{item[subKey].hmName}</Text>
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            ))}
                        </ScrollView>
                    </React.Fragment>
                }
            </View>
        )
    };

    //on decrement
    _onMinus = async (item, key) => {
        let tempQuantity = 0;
        if (parseInt(item.quantity) > 0) {
            tempQuantity = (item.quantity - 1);
        }
        item.quantity = tempQuantity;
        item.totalAmount = (parseFloat(tempQuantity) * parseFloat(item.productAttributes.MRP)).toFixed(2);
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreStockData(item);

    };

    // on increment
    _onPlus = async (item, key) => {
        item.quantity = (parseFloat(item.quantity) + 1);
        item.totalAmount = (parseFloat(item.quantity) * parseFloat(item.productAttributes.MRP)).toFixed(2);
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreStockData(item);
    };

    // for check and store the cart data and return total amount
    _onCheckStoreStockData = async (selectedData) => {
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

    // for change the quantity gtom input box
    // _onChangeQuantity = async (val, item, key) => {
    //     let tempVal = 0;
    //     let tempItemAmount = 0;
    //     if (val.indexOf(".") >= 1) {
    //         tempVal = val;
    //         if (/\.(.+)/.test(val)) {
    //             tempVal = parseFloat(tempVal).toFixed(1);
    //         }
    //     } else {
    //         tempVal = val;
    //     }
    //     if (val && val.length > 0) {
    //         tempItemAmount = (parseFloat(tempVal) * parseFloat(item.productAttributes.MRP)).toFixed(1);
    //     }
    //     item.quantity = tempVal;
    //     item.totalAmount = tempItemAmount;
    //     this.state.selectProductList[key] = item;
    //     this.setState(this.state);
    //     await this._onCheckStoreStockData(item);
    // }

    // for calculate product rate
    onCalculateProductRate = (item) => {
        let tempRate = 0;
        let validCheck = false;
        // for product rate (customerType == "Primary" then PTD but retailer PTR)
        if (item.productAttributes.PTR) {
            tempRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
            validCheck = true;
        }
        if (this.state.profileData.customerType == "Primary") {
            if (item.productAttributes.PTD) {
                tempRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
                validCheck = true;
            }
        }
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
        item.inputRate = tempVal;
        item.totalAmount = tempItemAmount;
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreStockData(item);
    }

    // for get the product std unit
    _onChangeStdUnit = async (val, item, key) => {
        let tempVal = 0;
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
            tempItemAmount = (parseFloat(tempVal) * parseFloat(item.productAttributes.StdUnitConversionFactor));
        } else {
            tempItemAmount = 0;
        }
        item.quantity = (tempItemAmount + parseFloat(tempUnit));
        tempItemAmount = ((tempItemAmount + parseFloat(tempUnit)) * parseFloat((this.onCalculateProductRate(item)).rate)).toFixed(2);
        item.inputStdUnit = tempVal;
        item.totalAmount = tempItemAmount;
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreStockData(item);
    }

    // for get the unit
    _onChangeUnit = async (val, item, key) => {
        let tempVal = 0;
        let tempStdUnit = item.inputStdUnit ? parseFloat(item.inputStdUnit) : 0;
        let tempRate = item.inputRate ? parseFloat(item.inputRate) : 0;
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
        if (item.rateCheck) {
            tempItemAmount = (parseFloat(tempVal) * parseFloat(tempRate));
            item.quantity = tempItemAmount;
        } else {
            tempItemAmount = (parseFloat(tempStdUnit) * parseFloat(item.productAttributes.StdUnitConversionFactor));
            if (val && val.length > 0) {
                tempItemAmount = (tempItemAmount + parseFloat(tempVal));
            } else {
                tempItemAmount = (tempItemAmount + 0);
            }
            item.quantity = tempItemAmount;
            tempItemAmount = (tempItemAmount * parseFloat((this.onCalculateProductRate(item)).rate)).toFixed(2);
        }
        item.inputUnit = tempVal;
        item.totalAmount = tempItemAmount;
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreStockData(item);
    }

    // for hide and expend the view
    onViewExpendItem = (item, key) => {
        this.state.selectProductList[key].hideShow = !(item.hideShow ? item.hideShow : false);
        this.setState(this.state);
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
        if (this.state.profileData.customerType == "Primary") {
            if (item.productAttributes.PTD) {
                productRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
            }
        }
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
                        {/* <View style={{ flexDirection: 'row', marginTop: 5, alignItems: "center", marginRight: 10 }}>
                            <View activeOpacity={0.9} onPress={() => this.onProductDetails(item)} style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 26, width: 26, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                                    <View style={{ width: 5 }} />
                                    <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }} onPress={() => this.productViewModal(true, item)}>{item.hmName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end", flex: 1 }}>
                                    <Text style={{ color: '#747C90', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{"₹" + " " + item.totalAmount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                        </View>
                        <View style={{ backgroundColor: item.hideShow ? Color.COLOR.BLUE.BABY_BLUE : item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', top: item.hideShow ? 5 : 0 }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: item.hideShow ? 20 : 15 }} onPress={() => this.onViewExpendItem(item, key)} activeOpacity={0.6}>
                                <Image source={item.hideShow ? ImageName.UP_ARROW_WITH_PROGRASS_BLUE : ImageName.DOWN_ARROW_WITH_PROGRASS_BLUE} style={{ height: 30, width: 30, position: 'relative' }} />
                            </TouchableOpacity>
                            {item.hideShow ?
                                <React.Fragment>
                                    {this.onViewExpendableView(item, key)}
                                </React.Fragment> :
                                null
                            }
                        </View> */}
                        <View style={{ flexDirection: 'row', marginTop: item.hideShow ? 20 : 0, alignItems: 'center', }}>
                            <View style={{ flex: 0.3 }}>
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
                                            maxLength={8}
                                        />
                                    </View> :
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        {/* <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 26, width: 26, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} /> */}
                                        <View style={{ borderRadius: 20, backgroundColor: "#5990A7", alignItems: "center", justifyContent: "center", height: 30, width: 30 }}>
                                            <Text style={{ color: "#fff", fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} >{(item.hmName).substring(0, 1)}</Text>
                                        </View>
                                        <View style={{ width: 5 }} />
                                        <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }} onPress={() => this.productViewModal(true, item)}>{item.hmName}</Text>
                                    </View>
                                    // <View>
                                    //     <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '2%' }}>{this.state.profileData.customerType == "Primary" ? "PTD" : "PTR"}  <Text style={{ color: Color.COLOR.GRAY.TAPA, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + productRate}</Text></Text>
                                    //     <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '2%' }}>MRP <Text style={{ color: Color.COLOR.GRAY.TAPA, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + mrp}</Text></Text>
                                    // </View>
                                }
                            </View>
                            <View style={{ flex: 0.2 }} />
                            <View style={{ flex: 0.5, flexDirection: 'row' }}>
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
                                                maxLength={8}
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


    // for view the item details for expendable view
    onViewExpendableView = (item, key) => {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>Average Order</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>₹2333</Text>
                    </View>
                    <View style={{ width: '40%' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>5 CB | 8 BOT</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ width: '40%' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>Distributor Stock</Text>
                    </View>
                    <View style={{ width: '15%' }} />
                    <View style={{ width: '35%' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>8 CB | 20 BOT</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                        <View style={{ height: 28, width: 28, borderRadius: 100, backgroundColor: Color.COLOR.GREEN.PURE_GREEN, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Color.COLOR.WHITE.PURE_WHITE }}>
                            <Image source={ImageName.WHITE_TICK_ICON} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 50, height: 40, justifyContent: "center", alignItems: 'center', backgroundColor: "#5CA0C3" }}>
                        <View style={{ width: "50%", paddingLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>Suggested Order</Text>
                        </View>
                        <View style={{ width: "35%" }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>8 CB | 20 BOT</Text>
                        </View>
                        <View style={{ width: "15%", alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 100, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImageName.RELOAD_WITH_WHITE} style={{ height: 20, width: 20, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 50, height: 40, justifyContent: "center", alignItems: 'center', backgroundColor: "#79BADB" }}>
                        <View style={{ width: "50%", paddingLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>Suggested Order</Text>
                        </View>
                        <View style={{ width: "35%" }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>8 CB | 20 BOT</Text>
                        </View>
                        <View style={{ width: "15%", alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 100, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImageName.RELOAD_WITH_WHITE} style={{ height: 20, width: 20, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>3 Offers <Text style={{ color: "#DFF4FE", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: '2%' }}>Available Now</Text></Text>
                </View>
            </View>
        )
    }


    // for navigation to cart
    onCart = () => {
        this.props.navigation.navigate("OrderCartDetails", { data: this.state.profileData, prevProps: this.props.route.params.data, onLoad: this._load })
    }

    // for navigation tp order history
    onOrderHistory = () => {
        this.props.navigation.navigate("OrderHistoryList", { data: this.state.profileData, prevProps: this.props.route.params.data })
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
                        <Image source={(this.state.profileData.profileImg && this.state.profileData.profileImg.length > 0) ? { uri: App_uri.CRM_BASE_URI + this.state.profileData.profileImg } : ImageName.DUMMY_PROFILE} style={{ height: 35, width: 35, borderRadius: 100, resizeMode: 'cover' }} />
                    </View>
                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} numberOfLines={1}>{this.state.profileData.title}</Text>
                    </View>
                </View>
                {/* <View style={{ flex: 0.1, justifyContent: "center" }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.SEARCH_LOGO_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center" }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.FILTER_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View> */}
                {/* <View style={{flex:1}}/> */}
                <TouchableOpacity activeOpacity={0.9} style={{ flex: 0.2, backgroundColor: '#F13748', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => this.onCart()}>
                    <Image source={ImageName.SHOPING_ORDER_BOX} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                    <View style={{ width: 5 }} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{this.state.profileData.cartCount ? this.state.profileData.cartCount : 0}</Text>
                </TouchableOpacity>
            </View>
        )
    };


    //category section
    categorySec = () => {
        const onSelectTab = (val) => {
            for (let i = 0; i < this.state.categoryArrData.length; i++) {
                if (this.state.categoryArrData[i] == val) {
                    this.state.categoryArrData[i].check = true
                } else {
                    this.state.categoryArrData[i].check = false
                }
            }
            this.setState({
                categoryArrData: this.state.categoryArrData
            })
        }

        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, marginHorizontal: 15 }}>
                {this.state.categoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.categoryArrData.map((item, key) => (
                            <View key={key}>
                                <CustomerSubCategoryTab data={item} onPressTab={(val) => onSelectTab(val)} />
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    };


    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.fetchMoreProductDataCheck) {
                    this._onFetchProductData();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
    };


    // loader for scroll
    renderLoader = () => {
        let returnView = <View style={{ marginBottom: 100 }} />;
        if (this.state.listLoader) {
            returnView = <Loader type={"normal"} />;
        }
        return returnView;
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

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            refreshing: true,
            listLoader: true,
            productMainLoader: true
        })
    }

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._onFetchProductData();
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

    onReset = async () => {
        this.onSelectInitialState();
        // await this.getProductsHirarchywise();
        this.state.allCart = [];
        this.state.totalItemAmount = 0;
        this.setState(this.state);
        this.props.Sales360Redux.cartData.allCart = this.state.allCart;
        this.props.stateCartData(this.props.Sales360Redux.cartData);
        this.onRefresh();
    }

    //footer sec
    _onFooterSec = () => {
        const addToCart = async () => {
            let tempCartData = this.state.allCart;
            if (tempCartData.length == 0) {
                Toaster.ShortCenterToaster("Please add atleast one product !");
                return true;
            } else {
                let orderArrData = [];
                for (let i = 0; i < tempCartData.length; i++) {
                    let tempUnitId = 0;
                    let tempRate = "0";
                    let seleltedUnitData = this.onSelectUnitData(tempCartData[i].productAttributes.Unit);
                    if (Object.keys(seleltedUnitData).length > 0) {
                        tempUnitId = seleltedUnitData.unitId;
                    }
                    if (tempCartData[i].rateCheck) {
                        tempRate = tempCartData[i].inputRate;
                    } else {
                        tempRate = this.onCalculateProductRate(tempCartData[i]).rate;
                    }
                    orderArrData.push({
                        "stockUnit": tempUnitId,
                        "remark": "",
                        "hierarchyTypeId": tempCartData[i].mstHierarchyTypeId,
                        "hierarchyDataId": tempCartData[i].hierarchyDataId,
                        "stockValue": (tempCartData[i].quantity).toString(),
                        "totalPrice": (tempCartData[i].totalAmount).toString(),
                        "unitId": tempUnitId,
                        "rate": tempRate
                    })
                }
                let reqData = {
                    fieldVisitId: this.state.customerData.fieldVisitId,
                    stockArrValues: orderArrData,
                    customerId: this.state.customerId,
                    createdAt: DateConvert.fullDateFormat(new Date()),
                    transactionType: this.state.profileData.customerType == "Primary" ? "2" : "3"
                }
                // for location store data
                if (this.state.customerData.locationDataRaw && this.state.customerData.locationDataRaw.length > 0) {
                    reqData["hierarchyDataIdArr"] = this.state.customerData.locationDataRaw;
                }
                this.setState({ addCartLoader: true })
                let responseData = await MiddlewareCheck("addStockUpdate", reqData, this.props);
                if (responseData) {
                    if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.state.profileData.cartCount = this.state.profileData.cartCount + this.state.allCart.length;
                        // this.onSelectInitialState();
                        // await this.getProductsHirarchywise();
                        this.state.allCart = [];
                        this.state.totalItemAmount = 0;
                        this.setState(this.state);
                        this.props.Sales360Redux.cartData.allCart = this.state.allCart;
                        this.props.stateCartData(this.props.Sales360Redux.cartData);
                        Toaster.ShortCenterToaster(responseData.data.message);
                        this.onRefresh();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);
                    }
                }
                this.setState({ addCartLoader: false });
            }
        }
        return (
            <View style={{ marginHorizontal: "3%", marginTop: 10 }}>
                {this.state.addCartLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <View style={{ flexDirection: 'row', marginBottom: 60 }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, paddingVertical: 5, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, borderWidth: 0.5, borderColor: "#F13748" }} onPress={() => this.onReset()}>
                            <View style={{ width: 5 }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>Reset</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#F13748', paddingVertical: 5, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18 }} onPress={() => addToCart()}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>Update Stock</Text>
                        </TouchableOpacity>
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

    onProductDetails = (item) => {
        this.props.navigation.navigate("selectedProductDetail", { data: item })
    }

    // for product view modal
    productViewModal = (type, item) => {
        this.state.isVisisableProdduct = type;
        this.state.selectedProduct = item;
        this.setState(this.state);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                {this.state.isVisisableProdduct ?
                    <ProjectViewModal
                        isVisible={this.state.isVisisableProdduct}
                        data={this.state.selectedProduct}
                        onCloseModal={(value) => this.productViewModal(value, this.state.selectedProduct)}
                    /> :
                    null
                }
                {/* {this.headerSec()}
                {this.categorySec()} */}
                {this.subCategorySec()}
                {this.state.productMainLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginHorizontal: 15 }}>
                            {this.ViewSkeletonPlaceholder()}
                        </View>
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {/* {this.state.selectProductList.length > 0 ? */}
                        <>
                            <FlatList
                                data={this.state.selectProductList}
                                renderItem={({ item, index }) => this.renderContactList(item, index)}
                                keyExtractor={(item, index) => index}
                                onEndReached={this.fetchMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.renderLoader}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                            />
                            {this._onFooterSec()}
                        </>
                        {/* :
                             <View style={{ marginTop: 20, height: Dimension.height }}>
                                 <NoDataFound />
                             </View>
                         } */}
                        <View style={{ marginBottom: 20 }} />
                    </React.Fragment>
                }
            </SafeAreaView>
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
        stateCartData
    }, dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdate);