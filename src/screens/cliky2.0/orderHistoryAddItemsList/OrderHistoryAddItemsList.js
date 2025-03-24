import React, { Component } from 'react'
import { connect } from 'react-redux'
import { stateCheckForNetwork, orderHistoryCartData } from "../../../redux/Sales360Action";

import styles from './Style';
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { modHigherLevelData, modifyProfileData, validateData } from './Function';
import { ErrorCode } from '../../../services/constant';
import { MiddlewareCheck } from '../../../services/middleware';
import { bindActionCreators } from 'redux';
import Header from '../header/Header';
import { onChangeSelectForObject } from '../../../services/common-view-function/dataConvert';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import { Loader, TextInputBox } from '../../../shared';
import { DateConvert, Toaster } from '../../../services/common-view-function';
import { DataValidator } from '../../../validators';
import _debounce from 'lodash/debounce';

class OrderHistoryAddItemsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCart: [],
            pageNum: 0,
            limit: 10,
            customerId: this.props.route.params.data.contactId,
            selectProductList: [],
            productMainLoader: false,
            selectedProduct: {},
            subCategoryArr: [],
            selectedSubCategoryObj: {},
            customerType: "",
            subCategoryLoader: true,
            fetchMoreProductDataCheck: true,
            allCart: this.props.Sales360Redux.orderHistoryCartData.allCart ? this.props.Sales360Redux.orderHistoryCartData.allCart : [],
            // allCart: [],
            touchCheck: false,
            listLoader: false,
            refreshing: true,
            addCartLoader: false,
            profileData: {},
            allUnits: [],
            subCategoryArr: [],
            searchText: "",
        }
    }
    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.onSelectInitialState();
                await this._load();
            })

        // await this._load();
    };
    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            allCart: [],
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            productMainLoader: true,
            // allUnits: [],
            selectedProduct: {},
            subCategoryArr: []
        })
    }

    _load = async () => {
        let custData = this.props.route.params.data.transactionType == 2 ? "Primary" : "Secondary"
        this.setState({ customerType: custData })
        this.getOnlineData()
    }

    getOnlineData = async () => {
        let hierarchyTypeId = "";
        let hierarchyDataId = "";
        await this.getProfileData();
        let mappedHigherProduct = this.props.Sales360Redux.mappedHigherLevelProductArr;
        if (mappedHigherProduct.length > 0) {
            if (mappedHigherProduct.length > 1) {
                await this.getProductsHirarchywise(hierarchyTypeId, hierarchyDataId);
                await this.onFetchProductData(hierarchyTypeId, hierarchyDataId);
            } else {
                await this.getProductsHirarchywise(mappedHigherProduct[0].hierarchyTypeId, mappedHigherProduct[0].hierarchyDataId);
                await this.onFetchProductData(mappedHigherProduct[0].hierarchyTypeId, mappedHigherProduct[0].hierarchyDataId);
            }
        } else {
            await this.getProductsHirarchywise(hierarchyTypeId, hierarchyDataId);
            await this.onFetchProductData(hierarchyTypeId, hierarchyDataId);
        }

        // await this.onFetchProductData();
        await this._onCheckStoreCartData(null);
        this.getUnitData();
    }

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
        this.state.allCart = respArrData.filter(item => item.totalAmount !== "0.00" && item.totalAmount !== 0);
        this.props.Sales360Redux.orderHistoryCartData.allCart = this.state.allCart;
        this.props.orderHistoryCartData(this.props.Sales360Redux.orderHistoryCartData);
        this.setState(this.state);
        return true;
    }

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
                    //     console.log("finalObjData", finalObjData)
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



    // for get profile info
    getProfileData = async () => {
        let reqData = { customerId: this.state.customerId, isCustomer: "1" };
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response);
                modifiedProfileData["allCart"] = this.state.allCart;
                this.props.orderHistoryCartData(modifiedProfileData);
                this.setState({ profileData: modifiedProfileData });
            }
        }
    };

    // for get the product data
    onFetchProductData = async (hierarchyTypeId, hierarchyDataId) => {
        let reqData = {
            limit: this.state.limit.toString(),
            offset: (this.state.pageNum * this.state.limit).toString(),
            hierarchyDataId: hierarchyDataId == undefined || hierarchyDataId == null ? this.state.selectedSubCategoryObj.hierarchyDataId ? this.state.selectedSubCategoryObj.hierarchyDataId : "" : hierarchyDataId,
            hierarchyTypeId: hierarchyTypeId == undefined || hierarchyTypeId == null ? this.state.selectedSubCategoryObj.mstHierarchyTypeId ? this.state.selectedSubCategoryObj.mstHierarchyTypeId : "" : hierarchyTypeId,
            searchText: this.state.searchText
        };
        this.state.selectedSubCategoryObj["hierarchyDataId"] = hierarchyDataId
        this.state.selectedSubCategoryObj["mstHierarchyTypeId"] = hierarchyTypeId
        this.setState({ selectedSubCategoryObj: this.state.selectedSubCategoryObj })
        let responseData = await MiddlewareCheck("getAllProductBrandwiseList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let apiRespData = responseData.response;
                let prevStoreCartData = this.state.allCart;
                if (apiRespData.length == 0) {
                    this.state.fetchMoreProductDataCheck = false;
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
                this.setState({
                    selectProductList: this.state.selectProductList
                })
            }
        }

        this.state.listLoader = false;
        this.state.refreshing = false;
        this.state.productMainLoader = false;
        this.setState(this.state);
    };

    // for calculate product rate
    onCalculateProductRate = (item) => {
        let tempRate = 0;
        let validCheck = false;
        // for product rate (customerType == "Primary" then PTD but retailer PTR)

        if (this.state.customerType == "Primary") {
            if (item.productAttributes.PTD) {
                tempRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
                validCheck = true;
            }
        } else {
            if (item.productAttributes.PTR) {
                tempRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
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
        item.inputRate = DataValidator.inputEntryValidate(tempVal, "number");;
        item.totalAmount = tempItemAmount;
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreCartData(item);
    }

    // for get the product std unit
    _onChangeStdUnit = async (val, item, key) => {
        const sanitizedValue = val.replace(/[.,-]/g, '')
        let tempVal = 0;
        let tempUnit = item.inputUnit ? parseFloat(item.inputUnit) : 0;
        let tempItemAmount = 0;
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

    // for get the unit
    _onChangeUnit = async (val, item, key) => {
        const sanitizedValue = val.replace(/[.,-]/g, '')
        let tempVal = 0;
        let tempStdUnit = item.inputStdUnit ? parseFloat(item.inputStdUnit) : 0;
        let tempRate = item.inputRate ? parseFloat(item.inputRate) : 0;
        let tempItemAmount = 0;
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


    // loader for scroll
    renderLoader = () => {
        let returnView = <View style={{ marginBottom: 100 }} />;
        if (this.state.listLoader) {
            returnView = <Loader type={"normal"} />;
        }
        return returnView;
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
                    this.onFetchProductData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );

    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            fetchMoreProductDataCheck: true,
            refreshing: true,
            listLoader: true,
            productMainLoader: true
        })
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
            await this.onFetchProductData(item.mstHierarchyTypeId, item.hierarchyDataId);

            this.state.touchCheck = false;
            this.setState(this.state);
        }

        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginHorizontal: 15 }}>
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

    //to render list
    renderContactList = (item, index) => {
        return (
            <View>
                {this.listSection(item, index)}
            </View>
        )
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
        if (this.state.customerType == "Primary") {
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
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: "center", marginRight: 10 }}>
                            <View activeOpacity={0.9} style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 26, width: 26, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }} />
                                    <View style={{ width: 5 }} />
                                    <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }} >{item.hmName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end", flex: 1 }}>
                                    {/* <CircularProgressBase
                                            {...bar}
                                            value={60}
                                            radius={10}
                                            activeStrokeColor={'#00B65E'}
                                            inActiveStrokeColor={'#D1D1D1'}
                                            clockwise={false} /> */}
                                    <Text style={{ color: '#747C90', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{"₹" + " " + item.totalAmount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                        </View>
                        <View style={{ backgroundColor: item.hideShow ? Color.COLOR.BLUE.BABY_BLUE : item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', top: item.hideShow ? 5 : 0 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: item.hideShow ? 20 : 15 }} activeOpacity={0.6}>
                                <Image source={item.hideShow ? ImageName.UP_ARROW_WITH_PROGRASS_BLUE : ImageName.DOWN_ARROW_WITH_PROGRASS_BLUE} style={{ height: 30, width: 30, position: 'relative' }} />
                            </View>
                            {/* {item.hideShow ?
                                <React.Fragment>
                                    {this.onViewExpendableView(item, key)}
                                </React.Fragment> :
                                null
                            } */}
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
                                            maxLength={8}
                                        />
                                    </View> :
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '2%' }}>{this.state.customerType == "Primary" ? "PTD" : "PTR"}  <Text style={{ color: Color.COLOR.GRAY.TAPA, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + productRate}</Text></Text>
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

    // for get the seleted unit data
    onSelectUnitData = (selectedUnit) => {
        let resObj = {};
        let unit = this.state.allUnits.find(item => item.unitShort == selectedUnit);
        if (unit) {
            resObj = unit;
        }
        return resObj;
    }

    //footer sec
    _onFooterSec = () => {
        const addItem = async () => {
            const filteredData = this.state.allCart.filter(item => item.totalAmount !== "0.00" && item.totalAmount !== 0);
            let tempCartData = filteredData;
            let validData = validateData(tempCartData)
            if (validData) {
                this.props.navigation.navigate("OrderHistoryItemList", { flow: "fromAddItemList", itemData: this.props.route.params.propData, addedData: tempCartData, itemListData: this.props.route.params.itemList })
                this.props.route.params.onSetData(tempCartData, this.props.route.params.itemList)
            }
        }

        return (
            <View style={{ marginHorizontal: "3%", marginTop: 10 }}>
                {this.state.addCartLoader ?
                    <Loader type={"normal"} /> :
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '57%' }}>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Selected{"\n"}Items  <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{this.state.isOffline ? this.state.allCart.length : (this.state.profileData.allCart ? this.state.profileData.allCart.length : 0)}</Text></Text>
                                </View>
                            </View>
                            <View style={{ width: '43%', justifyContent: 'center' }}>
                                <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => addItem()}>
                                    <View style={{ width: 5 }} />
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{"Add"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 15 }} />
                    </>
                }
            </View>
        )
    }

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this.onFetchProductData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
    }

    debouncedFetchData = _debounce(async (mstHierarchyTypeId, hierarchyDataId) => {
        await this.onFetchProductData(mstHierarchyTypeId, hierarchyDataId); // Pass the searchText to fetchData
    }, 800);

    searchSec = () => {
        const onSearch = async (val) => {
            this.state.searchText = val;
            this.setState({ searchText: this.state.searchText });
            await this._onStatusChange();
            await this.debouncedFetchData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
            // await this.onFetchProductData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
        }
        const onPressSearchIcon = async () => {
            await this.onRefresh();
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center', marginHorizontal: 15 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Product"}
                        isRightIcon={false}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        rightIconDisabled={this.state.listLoader}
                        height={42}
                        borderRadius={22}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
                {this.searchSec()}
                {this.subCategorySec()}
                {this.state.productMainLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginHorizontal: 15 }}>
                            {this.ViewSkeletonPlaceholder()}
                        </View>
                    </SkeletonPlaceholder> :
                    <React.Fragment>
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
                    </React.Fragment>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
        orderHistoryCartData
    }, dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryAddItemsList)