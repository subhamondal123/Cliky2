import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, TextInput, TouchableOpacity, View
} from "react-native";
import { stateCheckForNetwork, customerOrderData, stateCartData } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { Color, Dimension, FontSize, ImageName } from "../../../enums";
import { Image } from "react-native";
import { DropdownInputBox, ImagePreview, Loader, NoDataFound, TextInputBox } from "../../../shared";
import { ScrollView } from "react-native";
import CustomerSubCategoryTab from "../../../pageShared/order/customerSubCategoryTab";
import { ProjectViewModal } from "../../../pageShared";
import { MiddlewareCheck } from "../../../services/middleware";
import { CommonData, ErrorCode } from "../../../services/constant";
import { getItemListDataFromOffline, getProductHierarcyDataFromOffline, getUnitItemData, modHigherLevelData, modUnitData, modifyBrandList, modifyProductList, modifyProfileData, modifyRequestProduct } from "./Function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { onChangeSelectForObject } from "../../../services/common-view-function/dataConvert";
import { RefreshControl } from "react-native";
import { App_uri, DeviceInfo } from "../../../services/config";
import { ClientSettings } from "../../../services/userPermissions";
import { DataValidator } from "../../../validators";
import _debounce from 'lodash/debounce';
import { maskData } from "../../../services/common-view-function/commonFunctions";


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

class OrderProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialApiCall: false,
            categoryArrData: categoryData,
            selectedBrandId: "",
            profileData: {},
            selectedItemArr: [],
            totalAddedItems: 0,
            selectedAllItems: [],
            pageLoader: true,
            totalDataCount: 0,
            customerId: this.props.route.params.type === "OrderProductList" ? this.props.route.params.data.customerId : this.props.route.params.data.id,
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
            productMainLoader: false,
            totalItemAmount: 0,
            addCartLoader: false,
            allCart: this.props.Sales360Redux.cartData.allCart ? this.props.Sales360Redux.cartData.allCart : [],
            allUnits: [],
            isVisisableProdduct: false,
            selectedProduct: {},
            searchText: "",
            custAccessType: "",
            customerType: "",
            offlineCartCount: 0,
            isOffline: false,
            reverseTextChnge: false,
            apiRequestCount: 0,
            apiRespCount: 0
        };
    }

    componentDidMount = async () => {
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.state.isOffline = offlineCheck;
        this.setState(this.state);

        await this.onSelectInitialState();
        await this._load();
        // if (offlineCheck) {
        // if (this.props.route.params.flow == "fromRouteVisit") {
        //     await this.setProfileDataOffline();
        // }
        // }
        // })

        // await this._load();
    };

    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            allCart: [],
            pageNum: 0,
            limit: 10,
            selectProductList: [],
            selectedSubCategoryObj: {},
            productMainLoader: true,
            // allUnits: [],
            selectedProduct: {},
            subCategoryArr: []
        })
    }

    //initial load function
    _load = async () => {
        let custData = "";
        if (this.props.route.params.data.customerAccessType == undefined || this.props.route.params.data.customerAccessType == null) {
            custData = this.props.route.params.custAccessType == 2 ? "Secondary" : "Primary"
        } else {
            custData = this.props.route.params.data.customerAccessType
        }
        this.setState({ customerType: custData })
        let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.state.isOffline = offlineCheck;
        if (offlineCheck && (this.props.route.params.flow == "fromRouteVisit")) {
            this.getOfflineData()
        } else {
            this.getOnlineData()
        }
    };

    getOfflineData = async () => {
        await this.setProfileDataOffline();
        await this.getUnitDataOffline();
        this.getOfflineProductHierarcyData();
        this.getOfflineItemListData();
    }

    setProfileDataOffline = async () => {
        let cartCountData = 0;
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        if (storageCartData !== null || storageCartData !== undefined || Object.keys(storageCartData).length > 0) {
            if ((Object.keys(storageCartData[this.state.customerId].orderData).length > 0) && storageCartData[this.state.customerId].orderData.orderDetails) {
                for (let i = 0; i < storageCartData[this.state.customerId].orderData.orderDetails.length; i++) {
                    if (storageCartData[this.state.customerId].orderData.orderDetails[i].isPlaceOrder == false) {
                        cartCountData = cartCountData + 1;
                    }
                }
            }
        }
        this.state.profileData = {
            profileImg: this.props.route.params.data.profilePic,
            title: this.props.route.params.data.custBusinessName,
            cartCount: cartCountData
        }
        this.setState(this.state);
    }

    getOfflineItemListData = async (hierarchyDataId, hierarchyTypeId) => {
        let prevStoreCartData = this.state.allCart;
        let reqData = {
            hierarchyDataId: hierarchyDataId == undefined || hierarchyDataId == null ? this.state.selectedSubCategoryObj.hierarchyDataId ? this.state.selectedSubCategoryObj.hierarchyDataId : "" : hierarchyDataId,
            hierarchyTypeId: hierarchyTypeId == undefined || hierarchyTypeId == null ? this.state.selectedSubCategoryObj.mstHierarchyTypeId ? this.state.selectedSubCategoryObj.mstHierarchyTypeId : "" : hierarchyTypeId,
            searchText: this.state.searchText
        };

        this.setState(await getItemListDataFromOffline(reqData, prevStoreCartData, this.state, this.props))
        this.setState({ productMainLoader: false })

    }

    getOfflineProductHierarcyData = async (hierarchyTypeId, hierarchyDataId, index, mainIndex) => {
        let reqObjData = {}
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
        this.setState(await getProductHierarcyDataFromOffline(hierarchyTypeId, hierarchyDataId, index, mainIndex, this.state, modMappedHigherLevelData, this.props))
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

    getUnitDataOffline = async () => {
        let unitArr = await getUnitItemData();
        this.state.allUnits = unitArr
        this.setState(this.state)
        // this.setState(await getUnitItemData(this.state))
    }

    // for get profile info
    getProfileData = async () => {

        let reqData = { customerId: this.state.customerId, isCustomer: this.props.route.params.data.visitType == "0" || this.props.route.params.data.visitType == "1" || this.props.route.params.data.visitType == undefined || this.props.route.params.data.visitType == null ? "1" : "2" };

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
                this.setState({ allUnits: this.state.allUnits });
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
                console.log("=====apiRespData==========", JSON.stringify(apiRespData));
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
                        apiRespData[i].productAttributes["Unit"] = ""
                        apiRespData[i].productAttributes["UnitId"] = "0"
                        apiRespData[i].productAttributes["rateUnit"] = ""
                        apiRespData[i].productAttributes["rateUnitId"] = "0"

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
        this.setState({
            listLoader: false,
            refreshing: false,
            productMainLoader: false
        })
    };

    // for api req and resp count check
    onCheckApiReqRespData = async () => {
        if (this.state.apiRequestCount === this.state.apiRespCount) {
            this.state.selectProductList = [];
            this.state.apiRequestCount = 0;
            this.state.apiRespCount = 0;
        } else {
            this.state.productMainLoader = true;
        }
        this.setState(this.state);
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
            if (this.state.isOffline) {
                await this.getOfflineProductHierarcyData(item.mstHierarchyTypeId, item.hierarchyDataId, itemKey, mainKey)
                await this.getOfflineItemListData(item.hierarchyDataId, item.mstHierarchyTypeId)
            } else {
                await this.getProductsHirarchywise(item.mstHierarchyTypeId, item.hierarchyDataId, itemKey, mainKey);
                await this.onFetchProductData(item.mstHierarchyTypeId, item.hierarchyDataId);
            }
            this.state.touchCheck = false;
            this.setState(this.state);
        }

        return (
            <View style={styles.categorySection}>
                {this.state.subCategoryLoader ?
                    <View style={{ marginHorizontal: 15 }}>
                        <SkeletonPlaceholder>
                            {this.subCategoryabSkeliton()}
                        </SkeletonPlaceholder>
                    </View> :
                    <React.Fragment>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {this.state.subCategoryArr.map((item, key) => (
                                <View style={styles.categoryMapSection} key={key}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                        {Object.keys(item).map((subKey) => (
                                            <View key={subKey}>
                                                <TouchableOpacity disabled={this.state.touchCheck} style={item[subKey].check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(item[subKey], subKey, key)} activeOpacity={0.9} key={subKey}>
                                                    {item[subKey].hmName ?
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={styles.dialPadImgSec}>
                                                                <Image source={ImageName.DAAL_PAPAD} style={styles.dialPadImg} />
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
        await this._onCheckStoreCartData(item);

    };

    // on increment
    _onPlus = async (item, key) => {
        item.quantity = (parseFloat(item.quantity) + 1);
        item.totalAmount = (parseFloat(item.quantity) * parseFloat(item.productAttributes.MRP)).toFixed(2);
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreCartData(item);
    };

    // for check and store the cart data and return total amount
    _onCheckStoreCartData = async (selectedData) => {
        let totalAmount = 0;
        let respArrData = [];
        let curInsertDataCheck = true;
        let prevStoreCartData = this.state.allCart;
        respArrData = prevStoreCartData;
        // console.log("prevStoreCartDataprevStoreCartData====", JSON.stringify(prevStoreCartData))
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
                    if (this.props.Sales360Redux.loginData.clientId == 19) {

                    } else {
                        if (respArrData[i].totalAmount == 0 || parseInt(respArrData[i].totalAmount) == 0) {
                            respArrData.splice(i, 1);
                        }
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
        console.log("respArrData====", JSON.stringify(respArrData))

        if (this.props.Sales360Redux.loginData.clientId == 19) {
            this.state.allCart = respArrData.filter(item => (item.quantity && item.productAttributes.Unit.length > 0))
        } else {
            this.state.allCart = respArrData.filter(item => item.totalAmount !== "0.00" && item.totalAmount !== 0);
        }
        console.log("this.state.allCart====", JSON.stringify(this.state.allCart))


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
    //     await this._onCheckStoreCartData(item);
    // }

    _onSelectUnit = async (val, item, key) => {
        item.productAttributes.Unit = val.name
        item.productAttributes.UnitId = val.id

        if (item.unitDisableCheck) {
            if (item.productAttributes.Unit == "KG") {
                if (item.productAttributes.rateUnit == "TONNE" || item.productAttributes.rateUnit == "MT") {
                    item.totalAmount = parseFloat(item.inputRate) * CommonData.MaterialUnitConvertionRate.KG_TO_TON_RATE * item.quantity
                }
                if (item.productAttributes.rateUnit == "KG") {
                    item.totalAmount = parseFloat(item.inputRate) * item.quantity
                }
            }

            if (item.productAttributes.Unit == "TONNE" || item.productAttributes.Unit == "MT") {
                if (item.productAttributes.rateUnit == "TONNE" || item.productAttributes.rateUnit == "MT") {
                    item.totalAmount = parseFloat(item.inputRate) * item.quantity
                }
                if (item.productAttributes.rateUnit == "KG") {
                    item.totalAmount = parseFloat(item.inputRate) * CommonData.MaterialUnitConvertionRate.TON_TO_KG * item.quantity
                }
            }
        }

        this.state.selectProductList[key] = item;
        this.setState(this.state)
        await this._onCheckStoreCartData(item);

    }

    _onSelectRateUnit = async (val, item, key) => {
        item.productAttributes.rateUnit = val.name
        item.productAttributes.rateUnitId = val.id
        this.state.selectProductList[key] = item;
        this.setState(this.state)
        await this._onCheckStoreCartData(item);

    }

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
        item.inputRate = DataValidator.inputEntryValidate(tempVal, "number");
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
        let sanitizedValue = val.replace(/[,-]/g, '')
        const decimalCount = (sanitizedValue.match(/\./g) || []).length;

        // If more than one decimal, remove extra occurrences
        if (decimalCount > 1) {
            sanitizedValue = sanitizedValue.replace(/\.+$/, ""); // Remove last entered decimal
        }
        let tempVal = 0;
        let tempStdUnit = item.inputStdUnit ? parseFloat(item.inputStdUnit) : 0;
        let tempRate = item.inputRate ? parseFloat(item.inputRate) : 0;
        let tempItemAmount = 0;
        console.log("sanitizedValue", sanitizedValue)

        console.log("sanitizedValue.includes(' ')", sanitizedValue.includes(' '))
        if (sanitizedValue.includes(' ')) {
            tempVal = 0;
        } else {
            tempVal = sanitizedValue;
        }
        console.log("item.rateCheck----", item.rateCheck)
        console.log("(parseFloat(tempVal)----", typeof tempVal)
        console.log("parseFloat(tempRate)----", parseFloat(tempRate))
        if (item.rateCheck) {
            let t = tempVal.length > 0 ? parseFloat(tempVal) : 0;
            tempItemAmount = t * parseFloat(tempRate);
            // tempItemAmount = (parseFloat(tempVal) * parseFloat(tempRate));
            // item.quantity = tempItemAmount;
            item.quantity = parseFloat(tempVal);
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
        console.log("tempItemAmount", tempItemAmount)
        item.inputUnit = tempVal;

        // item.inputUnit = DataValidator.inputEntryValidate(tempVal, "number");
        item.totalAmount = parseFloat(tempItemAmount);
        this.state.selectProductList[key] = item;
        this.setState(this.state);
        await this._onCheckStoreCartData(item);

    }

    // for hide and expend the view
    onViewExpendItem = (item, key) => {
        this.state.selectProductList[key].hideShow = !(item.hideShow ? item.hideShow : false);
        this.setState(this.state);
    }

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
                <View style={styles.listSec}>
                    <View style={{ backgroundColor: item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', padding: 14, borderRadius: 14 }} >
                        <View style={styles.totalAmountSec}>
                            <View activeOpacity={0.9} onPress={() => this.onProductDetails(item)} style={{ flexDirection: "row" }}>
                                <View style={styles.productViewModalSec}>
                                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={styles.redParcentageLogo} />
                                    <View style={{ width: 5 }} />
                                    <Text style={styles.productModalTxtTab} onPress={() => this.productViewModal(true, item)}>{item.hmName}</Text>
                                </View>
                                <View style={styles.totalAmountTxtSec}>
                                    {/* <CircularProgressBase
                                            {...bar}
                                            value={60}
                                            radius={10}
                                            activeStrokeColor={'#00B65E'}
                                            inActiveStrokeColor={'#D1D1D1'}
                                            clockwise={false} /> */}
                                    <Text style={styles.totalAmountTxt}>{"₹" + " " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(item.totalAmount.toFixed(2)) : item.totalAmount.toFixed(2))}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewStyle} />
                            <View style={styles.viewStyle} />
                        </View>
                        <View style={{ backgroundColor: item.hideShow ? Color.COLOR.BLUE.BABY_BLUE : item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', top: item.hideShow ? 5 : 0 }}>
                            <TouchableOpacity style={[styles.upArrowTab, { bottom: item.hideShow ? 20 : 15 }]} onPress={() => this.onViewExpendItem(item, key)} activeOpacity={0.6}>
                                <Image source={item.hideShow ? ImageName.UP_ARROW_WITH_PROGRASS_BLUE : ImageName.DOWN_ARROW_WITH_PROGRASS_BLUE} style={{ height: 30, width: 30, position: 'relative' }} />
                            </TouchableOpacity>
                            {/* {item.hideShow ?
                                <React.Fragment>
                                    {this.onViewExpendableView(item, key)}
                                </React.Fragment> :
                                null
                            } */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: item.hideShow ? 20 : 0, alignItems: 'center' }}>
                            <View style={{}}>
                                {item.rateCheck ?
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.rateInput}>
                                            <TextInput
                                                placeholder={"Rate"}
                                                placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                value={this.props.Sales360Redux.loginData.clientId == 19 ? "0" : item.inputRate.toString()}
                                                onChangeText={(value) => this._onChangeRate(value, item, key)}
                                                // maxLength={8}
                                                keyboardType="number-pad"
                                                style={styles.txtInputStyle}
                                                maxLength={6}
                                                editable={this.props.Sales360Redux.loginData.clientId == 19 ? false : true}

                                            />
                                        </View>
                                        <View style={{ width: 5 }} />
                                        <DropdownInputBox
                                            backgroundColor={"transparent"}
                                            isSearchable={true}
                                            selectedValue={item.productAttributes.rateUnitId ? item.productAttributes.rateUnitId.toString() : "0"}
                                            data={modUnitData(this.state.allUnits)}
                                            onSelect={(value) => this._onSelectRateUnit(value, item, key)}
                                            headerText={"Unit"}
                                            fontSize={14}
                                            additionalTextStyle={{ marginLeft: 10, marginRight: 5 }}
                                            additionalBoxStyle={{ borderWidth: 0.5, width: 80, borderRadius: 20, backgroundColor: item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7' }}
                                            isDisabled={this.props.Sales360Redux.loginData.clientId == 19 ? true : false}

                                        />
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.ptrMrpTxt}>{this.state.customerType == "Primary" ? "PTD" : "PTR"}  <Text style={styles.productRateTxt}>{"₹" + " " + productRate}</Text></Text>
                                        <Text style={styles.ptrMrpTxt}>MRP <Text style={styles.productRateTxt}>{"₹" + " " + mrp}</Text></Text>
                                    </View>
                                }
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View style={styles.editableUnitInputSec}>
                                {item.stdUnitDisableCheck ?
                                    // <View style={{ width: "47%" }} /> 
                                    <View style={styles.editableUnitInput}>
                                        <TextInput
                                            // editable={!item.unitDisableCheck}
                                            placeholder={"Qty"}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            value={item.inputUnit.toString()}
                                            onChangeText={(value) => this._onChangeUnit(value, item, key)}
                                            maxLength={6}
                                            keyboardType="numeric"
                                            style={styles.txtInputStyle}
                                        />
                                    </View>
                                    :
                                    <View style={styles.editableUnitInput}>
                                        <TextInput
                                            editable={!item.stdUnitDisableCheck}
                                            placeholder={item.productAttributes.StdUnit}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            value={item.inputStdUnit.toString()}
                                            onChangeText={(value) => this._onChangeStdUnit(value, item, key)}
                                            keyboardType="numeric"
                                            maxLength={6}
                                            style={styles.txtInputStyle}
                                        />
                                    </View>
                                }
                                {item.unitDisableCheck ?
                                    // null
                                    <React.Fragment>
                                        <View style={{ width: 5 }} />
                                        <DropdownInputBox
                                            backgroundColor={"transparent"}
                                            isSearchable={true}
                                            selectedValue={item.productAttributes.UnitId ? item.productAttributes.UnitId.toString() : "0"}
                                            data={modUnitData(this.state.allUnits)}
                                            onSelect={(value) => this._onSelectUnit(value, item, key)}
                                            headerText={"Unit"}
                                            fontSize={14}
                                            additionalTextStyle={{ marginLeft: 10, marginRight: 5 }}
                                            additionalBoxStyle={{ borderWidth: 0.5, width: 80, borderRadius: 20, backgroundColor: item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7' }}
                                        />
                                    </React.Fragment>

                                    :
                                    <React.Fragment>
                                        <View style={{ width: 10 }} />
                                        <View style={styles.editableUnitInput}>
                                            <TextInput
                                                editable={!item.unitDisableCheck}
                                                placeholder={item.productAttributes.Unit}
                                                placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                value={item.inputUnit.toString()}
                                                onChangeText={(value) => this._onChangeUnit(value, item, key)}
                                                maxLength={6}
                                                keyboardType="numeric"
                                                style={styles.txtInputStyle}
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
                        <Text style={styles.averageTxt}>Average Order</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                        <Text style={styles.averageTxt}>₹2333</Text>
                    </View>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.averageTxt}>5 CB | 8 BOT</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.averageTxt}>Distributor Stock</Text>
                    </View>
                    <View style={{ width: '15%' }} />
                    <View style={{ width: '35%' }}>
                        <Text style={styles.averageTxt}>8 CB | 20 BOT</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                        <View style={styles.whiteTickImgSec}>
                            <Image source={ImageName.WHITE_TICK_ICON} style={styles.whiteTickImg} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.suggestedOrderSec}>
                        <View style={{ width: "50%", paddingLeft: 10 }}>
                            <Text style={styles.suggestedOrderTxt}>Suggested Order</Text>
                        </View>
                        <View style={{ width: "35%" }}>
                            <Text style={styles.suggestedOrderTxt}>8 CB | 20 BOT</Text>
                        </View>
                        <View style={styles.reloadWhiteImgTabSec}>
                            <TouchableOpacity style={styles.reloadWhiteImgTab}>
                                <Image source={ImageName.RELOAD_WITH_WHITE} style={styles.reloadWhiteImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.suggestedOrdercbSec}>
                        <View style={{ width: "50%", paddingLeft: 10 }}>
                            <Text style={styles.suggestedOrderTxt}>Suggested Order</Text>
                        </View>
                        <View style={{ width: "35%" }}>
                            <Text style={styles.suggestedOrderTxt}>8 CB | 20 BOT</Text>
                        </View>
                        <View style={styles.reloadWhiteImgTabSec}>
                            <TouchableOpacity style={styles.reloadWhiteImgTab}>
                                <Image source={ImageName.RELOAD_WITH_WHITE} style={styles.reloadWhiteImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.offerSec}>
                    <Image source={ImageName.RED_PERCENTAGE_LOGO} style={styles.reloadWhiteImg} />
                    <Text style={styles.suggestedOrderTxt}>3 Offers <Text style={styles.avalaibleNowTxt}>Available Now</Text></Text>
                </View>
            </View>
        )
    }


    // for navigation to cart
    onCart = () => {
        this.props.navigation.navigate("OrderCartDetails", { data: this.state.profileData, prevProps: this.props.route.params.data, onLoad: this._load, flow: this.props.route.params.flow, screenName: this.props.route.params.screenName })
    }

    // for navigation tp order history
    onOrderHistory = () => {
        this.props.navigation.navigate("OrderHistoryList", { data: this.state.profileData, prevProps: this.props.route.params.data, flow: this.props.route.params.flow })
    }

    //header section
    headerSec = () => {
        return (
            <View style={styles.headerSec}>
                <TouchableOpacity style={{ flex: 0.1 }} activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={styles.profileTab} activeOpacity={0.9} onPress={() => onProfileTab(this.state.profileData)}>
                    <View style={styles.imgPreviewSec}>
                        <ImagePreview source={(this.state.profileData.profileImg && this.state.profileData.profileImg.length > 0) ? { uri: App_uri.CRM_BASE_URI + this.state.profileData.profileImg } : ImageName.DUMMY_PROFILE} style={{ height: 35, width: 35, borderRadius: 100, resizeMode: 'cover' }} />
                    </View>
                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <Text style={styles.titleTxt} numberOfLines={1}>{this.state.profileData.title}</Text>
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
                <TouchableOpacity activeOpacity={0.9} style={styles.cardTab} onPress={() => this.onCart()}>
                    <Image source={ImageName.SHOPING_ORDER_BOX} style={styles.shoppingImg} />
                    <View style={{ width: 5 }} />
                    <Text style={styles.cartCountTxt}>{this.state.profileData.cartCount ? this.state.profileData.cartCount : 0}</Text>
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
            <View style={styles.categorySec}>
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

    onFetchOnlineOfflineList = async () => {
        if (this.state.isOffline) {
            this.getOfflineItemListData()
        } else {
            this.onFetchProductData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
        }
    }

    // fetch more
    fetchMore = async () => {
        // if (this.state.searchText.length == 0) {
        if (!this.state.isOffline) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.fetchMoreProductDataCheck) {
                        this.onFetchOnlineOfflineList();
                    } else {
                        this.setState({ listLoader: false })
                        return null;
                    }
                }
            );
        }
        // }

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

    // change the state for refresh
    _onStatusChange = async () => {
        this.state.pageNum = 0;
        this.state.limit = 10;
        this.state.selectProductList = [];
        this.state.fetchMoreProductDataCheck = true;
        this.state.refreshing = true;
        this.state.listLoader = true;
        this.state.productMainLoader = true;
        this.setState(this.state)
    }

    //refresh list
    onRefresh = async () => {
        if (await DeviceInfo.CheckConnection()) {
            await this._onStatusChange();
            await this.onFetchProductData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
        }
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


    addToCartOnline = async (orderArrData) => {
        let reqData = {
            orderDetails: orderArrData,
            contactId: this.state.customerId,
            createdAt: DateConvert.fullDateFormat(new Date()),
            transactionType: this.state.customerType == "Primary" ? "2" : "3",
            fieldVisitId: this.props.route.params.data.fieldVisitId == undefined || this.props.route.params.data.fieldVisitId == null ? "0" : this.props.route.params.data.fieldVisitId.toString()
        }
        // for location store data
        if (this.props.route.params.data.locationData && this.props.route.params.data.locationData.length > 0) {
            reqData["hierarchyTypeId"] = this.props.route.params.data.locationData[0].hierarchyTypeId;
            reqData["hierarchyDataId"] = this.props.route.params.data.locationData[0].hierarchyDataId;
        }
        // if visit id is avaible then added in the object
        // if (this.props.route.params.type === "OrderProductList" && this.props.route.params.data.id) {
        //     reqData["fieldVisitId"] = this.props.route.params.data.id;
        // }
        this.setState({ addCartLoader: true })
        console.log("reqdataaa----",JSON.stringify(reqData))
        let responseData = await MiddlewareCheck("addProductForOrder", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.profileData.cartCount = this.state.profileData.cartCount + orderArrData.length;
                this.state.allCart = [];
                this.state.totalItemAmount = 0;
                this.setState(this.state);
                this.props.Sales360Redux.cartData.allCart = this.state.allCart;
                this.props.stateCartData(this.props.Sales360Redux.cartData);
                Toaster.ShortCenterToaster(responseData.message);
                this.onRefresh();
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.setState({ addCartLoader: false });
    }


    addToCartOffline = async (orderArrData, totalItemAmount, totalItemQuantity) => {
        this.setState({ addCartLoader: true })
        let tempOrderObj = {
            "orderDetails": orderArrData,
            "contactId": this.state.customerId,
            "createdAt": DateConvert.fullDateFormat(new Date()),
            "transactionType": this.state.customerType == "Primary" ? "2" : "3",
            "hierarchyTypeId": this.props.route.params.data.locationData[0].hierarchyTypeId,
            "hierarchyDataId": this.props.route.params.data.locationData[0].hierarchyDataId,
            "totalAmount": totalItemAmount,
            "deliveryDate": "",
            "totalOrderQty": totalItemQuantity,
            "remarks": "",
            "isCustomer": "1",
            "isProject": "0"
        };

        let storageData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        if (storageData[this.state.customerId].orderData && Object.keys(storageData[this.state.customerId].orderData).length > 0 && storageData[this.state.customerId].orderData.orderDetails.length > 0) {
            tempOrderObj.orderDetails = [...tempOrderObj.orderDetails, ...storageData[this.state.customerId].orderData.orderDetails];
        }
        let totalAmunt = 0.00;
        let totalQty = 0;
        for (let i = 0; i < tempOrderObj.orderDetails.length; i++) {
            totalAmunt = (totalAmunt + (parseFloat(tempOrderObj.orderDetails[i].totalPrice)));
            totalQty = totalQty + (parseInt(tempOrderObj.orderDetails[i].quantity));
        }
        tempOrderObj.totalAmount = totalAmunt.toString();
        tempOrderObj.totalOrderQty = totalQty.toString();
        storageData[this.state.customerId].orderData = tempOrderObj;
        await StorageDataModification.customerOrderANdVisitData(storageData, "store");
        this.state.profileData.cartCount = this.state.profileData.cartCount + orderArrData.length;
        this.state.allCart = [];
        this.state.totalItemAmount = 0;
        this.setState(this.state);
        this.props.Sales360Redux.cartData.allCart = this.state.allCart;
        this.props.stateCartData(this.props.Sales360Redux.cartData);
        Toaster.ShortCenterToaster("Added to Cart Successfully !");
        // this.onRefresh();
        await this._onStatusChange();
        this.getOfflineItemListData()
        this.setState({ addCartLoader: false });
    }

    //footer sec
    _onFooterSec = () => {
        const addToCart = async () => {
            let filteredData = [];
            if (this.props.Sales360Redux.loginData.clientId == 19) {
                filteredData = this.state.allCart.filter(item => item.quantity  && item.productAttributes.Unit.length > 0);

            } else {
                filteredData = this.state.allCart.filter(item => item.totalAmount !== "0.00" && item.totalAmount !== 0 && item.productAttributes.Unit.length !== 0);
            }
            console.log("filteredData", JSON.stringify(filteredData))
            let tempCartData = filteredData;
            if (tempCartData.length == 0) {
                Toaster.ShortCenterToaster("Please add atleast one product !");
                return true;
            }
            else {
                let orderArrData = [];
                for (let i = 0; i < tempCartData.length; i++) {
                    let tempUnitId = 0;
                    let tempUnitShort = "";
                    let tempRate = "0";
                    let seleltedUnitData = this.onSelectUnitData(tempCartData[i].productAttributes.Unit);
                    if (Object.keys(seleltedUnitData).length > 0) {
                        tempUnitId = seleltedUnitData.unitId;
                        tempUnitShort = seleltedUnitData.unitShort
                    }
                    if (tempCartData[i].rateCheck) {
                        tempRate = tempCartData[i].inputRate;
                    } else {
                        tempRate = this.onCalculateProductRate(tempCartData[i]).rate;
                    }
                    orderArrData.push({
                        "isPlaceOrder": false,
                        "isSync": false,
                        "productName": tempCartData[i].hmName,
                        "prodhierarchyTypeId": tempCartData[i].mstHierarchyTypeId,
                        "prodhierarchyDataId": tempCartData[i].hierarchyDataId,
                        "quantity": (tempCartData[i].quantity).toString(),
                        "totalPrice": tempCartData[i].totalAmount.toString(),
                        "unitId": tempUnitId,
                        "unitShort": tempUnitShort,
                        "rate":this.props.Sales360Redux.loginData.clientId == 19 ? "0" : tempRate,
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
                if (this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit")) {
                    this.addToCartOffline(orderArrData, totalItemAmount, totalItemQuantity)
                } else {
                    this.addToCartOnline(orderArrData)
                }
            }
        }

        return (
            <View style={styles.footerSec}>
                {this.state.addCartLoader ?
                    <Loader type={"normal"} /> :
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '57%' }}>
                            <View style={styles.selectedTxtSec}>
                                <Text style={styles.selectedTxt}>Selected{"\n"}Items  <Text style={styles.itemLengthTxt}>{this.state.isOffline ? this.state.allCart.length : (this.state.allCart ? this.state.allCart.length : 0)}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.addCartTxt}>
                            {/* <BigTextButton
                                text={"Add ₹" + " " + this.state.totalItemAmount}
                                backgroundColor={this.state.profileData.allCart.length > 0 ? Color.COLOR.BLUE.LOTUS_BLUE : Color.COLOR.GRAY.GRAY_COLOR}
                                isDisabled={this.state.profileData.allCart.length > 0 ? false : true}
                                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                borderRadius={24}
                                fontSize={14}
                                onPress={() => addToCart()}
                            /> */}
                            {console.log("this.props.Sales360Redux.loginData.clientId-=====", this.props.Sales360Redux.loginData.clientId)}
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: (this.state.isOffline && this.state.allCart.length > 0) ? Color.COLOR.BLUE.LOTUS_BLUE : (this.state.profileData.allCart && this.state.profileData.allCart.length) > 0 ? Color.COLOR.BLUE.LOTUS_BLUE : Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => addToCart()}>
                                <View style={{ width: 5 }} />
                                <Text style={styles.addTxt}>{"Add " + (this.props.Sales360Redux.loginData.clientId == 19 ? "" : "₹" + " " + this.state.totalItemAmount)}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ width: '2%' }} /> */}
                        {/* <View style={{ width: '20%', justifyContent: 'center' }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#F13748', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => this.onCart()}>
                                <Image source={ImageName.SHOPING_ORDER_BOX} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                <View style={{ width: 5 }} />
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{this.state.profileData.cartCount ? this.state.profileData.cartCount : 0}</Text>
                                <Image source={ImageName.RIGHT_ARROW_WITH_WHITE} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View> */}
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
            <View style={styles.categoryskeletonSec}>
                <View style={styles.categoryskeletonStyle} />
                <View style={styles.categoryskeletonStyle} />
                <View style={styles.categoryskeletonStyle} />
                <View style={styles.categoryskeletonStyle} />
                <View style={styles.categoryskeletonStyle} />
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

    debouncedFetchData = _debounce(async (mstHierarchyTypeId, hierarchyDataId) => {
        await this.onFetchProductData(mstHierarchyTypeId, hierarchyDataId); // Pass the searchText to fetchData
    }, 1000);

    searchSec = () => {
        const onPressSearchIcon = async () => {
            if (this.state.isOffline) {
                await this._onStatusChange();
                this.getOfflineItemListData();
            } else {
                await this.onRefresh();
            }
            // await this._load();
        }

        const onSearch = async (val) => {
            this.state.searchText = val
            this.setState({ searchText: this.state.searchText })
            if (this.state.isOffline) {
                await this._onStatusChange();
                this.getOfflineItemListData();
            } else {
                await this._onStatusChange();
                await this.debouncedFetchData(this.state.selectedSubCategoryObj.mstHierarchyTypeId, this.state.selectedSubCategoryObj.hierarchyDataId);
            }

        }
        return (
            <View style={styles.searchProductInputsec}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Product"}
                        // isRightIcon={true}
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
                {this.state.isVisisableProdduct ?
                    <ProjectViewModal
                        isVisible={this.state.isVisisableProdduct}
                        data={this.state.selectedProduct}
                        onCloseModal={(value) => this.productViewModal(value, this.state.selectedProduct)}
                    /> :
                    null
                }
                {this.headerSec()}
                {/* {this.categorySec()} */}
                {this.searchSec()}
                {this.subCategorySec()}
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -45} style={{ flex: 1 }}>
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
                                        onEndReached={this.fetchMore}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.renderLoader}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.refreshing}
                                                onRefresh={() => this.onRefresh()}
                                            />
                                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductList);