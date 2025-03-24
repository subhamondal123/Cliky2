import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { stateUserInformation, stateCheckForNetwork } from '../../../redux/Sales360Action';
import { FlatList, Image, KeyboardAvoidingView, Platform, RefreshControl, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './Style';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import { MiddlewareCheck } from '../../../services/middleware';
import { modAddedItems, modData, validData } from './Function';
import Header from '../header/Header';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ErrorCode } from '../../../services/constant';
import { Toaster } from '../../../services/common-view-function';
import { Loader, Modal } from '../../../shared';
import { DataValidator } from '../../../validators';


class OrderHistoryItemList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: true,
            cancelModalVisible: false,
            propData: this.props.route.params.itemData,
            itemList: [],
            fetchMoreProductDataCheck: false,
            fieldVisitId: "",
            allUnits: [],
            addCartLoader: false,
            cancelOrderLoader: false,
            customerType: this.props.route.params.itemData.customerAccessTypeName
        }
    }

    componentDidMount = async () => {
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        await this.setInitialState()
        await this.modifyFetchedData()
        this.getUnitData();
        // })
    }

    setInitialState = async () => {
        this.setState({
            pageLoader: true,
            itemList: [],
            fetchMoreProductDataCheck: false,
            fieldVisitId: "",
            allUnits: [],
        })
    }

    setData = (data, itemList) => {
        let modifyAddedItem = modAddedItems(data, this.state.itemList)
        this.state.itemList = [...this.state.itemList, ...modifyAddedItem];
        this.setState(this.state)

    }

    modifyFetchedData = async () => {
        let reqData = {
            orderNumber: this.props.route.params.itemData.recordNumber
        }
        let responseData = await MiddlewareCheck("getOrderItemListings", reqData, this.props)
        this.setState({ fieldVisitId: responseData.response.data[0].fieldVisitId })
        let apiRespData = modData(responseData.response).List
        // console.log("modListData-----", JSON.stringify(apiRespData))
        // if (this.props.route.params.flow == "fromAddItemList") {
        //     console.log("-------------addedddd data----------------------", JSON.stringify(this.props.route.params.addedData))
        // }
        if (apiRespData && apiRespData.length > 0) {
            this.state.fetchMoreProductDataCheck = true;
            // let prevStoreCartData = this.state.allCart;
            for (let i = 0; i < apiRespData.length; i++) {
                apiRespData[i]["quantity"] = apiRespData[i].totalQty;
                apiRespData[i]["totalAmount"] = apiRespData[i].totalPrice;
                apiRespData[i]["inputStdUnit"] = "";
                apiRespData[i]["stdUnitDisableCheck"] = false;
                apiRespData[i]["inputUnit"] = apiRespData[i].totalQty.toString();
                apiRespData[i]["unitDisableCheck"] = false;
                apiRespData[i]["inputRate"] = "";
                apiRespData[i]["rateCheck"] = false;
                if (apiRespData[i].productAttributes.StdUnit === undefined || apiRespData[i].productAttributes.StdUnit === null || apiRespData[i].productAttributes.StdUnit.length === 0) {
                    apiRespData[i]["stdUnitDisableCheck"] = true;
                }
                if (apiRespData[i].productAttributes.Unit === undefined || apiRespData[i].productAttributes.Unit === null || apiRespData[i].productAttributes.Unit.length === 0) {
                    apiRespData[i]["unitDisableCheck"] = true;
                }
            }
            this.state.itemList = [...this.state.itemList, ...apiRespData];
        } else {
            this.state.fetchMoreProductDataCheck = false;
        }

        this.state.pageLoader = false
        this.setState(this.state);
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

    onChangeRate = async (val, item, key) => {
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
        this.state.itemList[key] = item;
        this.setState(this.state);
        // await this._onCheckStoreCartData(item);
    }

    // for get the product std unit
    onChangeStdUnit = async (val, item, key) => {
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
        // item.totalQty = tempVal;
        item.totalAmount = tempItemAmount;
        this.state.itemList[key] = item;
        this.setState(this.state);
        // await this._onCheckStoreCartData(item);
    }

    // for get the unit
    onChangeUnit = async (val, item, key) => {
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
        item.inputUnit = DataValidator.inputEntryValidate(tempVal, "number");
        item.totalAmount = tempItemAmount;
        this.state.itemList[key] = item;
        this.setState(this.state);
    }

    onRemoveItem = async (item, key) => {
        let arr = this.state.itemList
        arr.splice(key, 1);
        this.setState(this.state)
        // await this.onRemoveItemApi(item)
    }

    onRemoveItemApi = async (item) => {
        let reqData = { "itemId": item.id };
        let responseData = await MiddlewareCheck("deleteItemFromCart", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    //to render list
    renderContactList = (item, index) => {
        return (
            <View>
                {this.listSection(item, index)}
            </View>
        )
    }

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
                    <View style={{ backgroundColor: '#F0F4F7', padding: 14, borderRadius: 14 }} >
                        {this.state.itemList.length == 1 ? null :
                            <TouchableOpacity onPress={() => this.onRemoveItem(item, key)} style={{ position: "absolute", top: 0, right: 0 }}>
                                <Image source={ImageName.GRAY_CIRCEL_CANCEL_LOGO} style={{ height: 26, width: 26, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                        {/* <View style={{ backgroundColor: item.inputStdUnit.length > 0 || item.inputUnit.length > 0 || item.inputRate.length > 0 ? "#8cfae9" : '#F0F4F7', padding: 14, borderRadius: 14 }} > */}
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
                                    <Text style={{ color: '#747C90', fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginRight: 10 }}>{"₹" + " " + item.totalAmount}</Text>

                                </View>
                                {/* <TouchableOpacity onPress={() => this.onRemoveItem(item, key)}>
                                    <Image source={ImageName.GRAY_CIRCEL_CANCEL_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                            <View style={{ borderTopWidth: 1, borderColor: '#89CDEF', marginTop: 12, flex: 1 }} />
                        </View>
                        <View style={{ backgroundColor: '#F0F4F7', top: item.hideShow ? 5 : 0 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: item.hideShow ? 20 : 15 }} >
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
                                            onChangeText={(value) => this.onChangeRate(value, item, key)}
                                            // maxLength={8}
                                            keyboardType="numeric"
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
                                            value={item.inputStdUnit}
                                            onChangeText={(value) => this.onChangeStdUnit(value, item, key)}
                                            keyboardType="numeric"
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
                                                value={item.inputUnit}
                                                onChangeText={(value) => this.onChangeUnit(value, item, key)}
                                                maxLength={8}
                                                keyboardType="numeric"
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

    calculateTotalAmount = (obj) => {
        let tempAmt = 0;
        tempAmt = temp
    }

    submitData = async () => {
        let orderArrData = [];
        let tempAmount = 0;
        for (let i = 0; i < this.state.itemList.length; i++) {
            let tempUnitId = 0;
            let tempUnitShort = "";
            let tempRate = "0";

            let seleltedUnitData = this.onSelectUnitData(this.state.itemList[i].productAttributes.Unit);
            if (Object.keys(seleltedUnitData).length > 0) {
                tempUnitId = seleltedUnitData.unitId;
                tempUnitShort = seleltedUnitData.unitShort
            }

            tempRate = this.onCalculateProductRate(this.state.itemList[i]).rate;
            tempAmount = tempAmount + parseFloat(this.state.itemList[i].totalAmount)
            let orderData = {
                hierarchyTypeId: "",
                hierarchyDataId: "",
                quantity: "",
                totalPrice: "",
                unit: "",
                rate: "",
            }
            orderData.hierarchyDataId = this.state.itemList[i].hierarchyDataId;
            orderData.hierarchyTypeId = this.state.itemList[i].hierarchyTypeId;
            orderData.quantity = this.state.itemList[i].quantity;
            orderData.totalPrice = this.state.itemList[i].totalAmount;
            orderData.unit = tempUnitId
            orderData.rate = tempRate

            orderArrData.push(orderData)
        }

        let reqData = {
            "orderNumber": this.state.propData.recordNumber,
            "orderAmount": tempAmount,
            "transactionType": this.state.propData.customerAccessTypeName == "Primary" ? "2" : "3",
            "customerId": this.state.propData.contactId,
            "fieldVisitId": this.state.fieldVisitId.toString(),
            "orderDetails": orderArrData
        }
        let validateData = validData(reqData)

        if (validateData) {
            this.setState({ addCartLoader: true })
            let responseData = await MiddlewareCheck("saveModifiedOrderData", reqData, this.props)
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    this.props.navigation.goBack()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ addCartLoader: false })
        }
    }

    _onFooterSec = () => {
        const cancelOrder = async () => {
            this.setState({
                cancelModalVisible: true
            })

        }
        return (
            <View style={{ marginHorizontal: "3%", marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: 20 }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, paddingVertical: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 25, }} onPress={() => cancelOrder()}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{"Cancel Order"}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    {this.state.addCartLoader ?
                        <Loader type={"normal"} /> :
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 25, }} onPress={() => this.submitData()}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{"Update"}</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        )
    }
    //for Flatlist skeliton
    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 4; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    onAddItem = () => {
        this.props.navigation.navigate("OrderHistoryAddItemList", { data: this.state.itemList[0], onSetData: this.setData, itemList: this.state.itemList, propData: this.state.propData })
    }

    buttonSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5, paddingBottom: 10, marginHorizontal: 10 }}>
                <TouchableOpacity style={styles.addUnplanSec} onPress={() => this.onAddItem()}>
                    <Text style={styles.buttomTxt}>Add more Items</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
            </View>
        )
    }

    onCancel = async () => {
        this.setState({ cancelOrderLoader: true })
        let reqData = {
            orderNo: this.props.route.params.itemData.recordNumber
        }
        let responseData = await MiddlewareCheck("cancelTotalOrder", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.onCloseModal()
                this.props.navigation.goBack()
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ cancelOrderLoader: false })
    }

    onCloseModal = () => {
        this.setState({
            cancelModalVisible: false
        })
    }

    modalSec = () => {
        return (
            <Modal
                isVisible={this.state.cancelModalVisible}
                // padding={modalPadding}
                onRequestClose={() => this.onCloseModal()}
                onBackdropPress={() => this.onCloseModal()}
                onBackButtonPress={() => this.onCloseModal()}
                children={

                    <View style={styles.modalview}>
                        <View style={styles.modalHeaderSec}>
                            <View style={styles.marginView}>
                                <Text style={styles.profileNameText}>Are you sure?</Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        </View>
                        {/* {updateAssignee()} */}
                        <View style={{ marginHorizontal: '10%', marginTop: 15, flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity style={[styles.updateButton, { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 25, paddingHorizontal: 25 }]}
                                activeOpacity={0.9}
                                onPress={() => this.onCloseModal()}>
                                <Text style={[styles.updateText, { fontSize: 15 }]}>No</Text>
                            </TouchableOpacity>
                            <View style={{ width: "20%" }} />
                            {this.state.cancelOrderLoader ?
                                <Loader type={"normal"} /> :
                                <TouchableOpacity style={[styles.updateButton, { borderRadius: 25, paddingHorizontal: 25 }]}
                                    activeOpacity={0.9}
                                    onPress={() => this.onCancel()}>
                                    <Text style={[styles.updateText, { fontSize: 15 }]}>Yes</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                }
            />
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
                {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}> */}

                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginHorizontal: 15 }}>
                            {this.ViewSkeletonPlaceholder()}
                        </View>
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.itemList.length > 0 ?
                            <React.Fragment>
                                {this.buttonSec()}
                                <FlatList
                                    // keyboardShouldPersistTaps="always"
                                    data={this.state.itemList}
                                    renderItem={({ item, index }) => this.renderContactList(item, index)}
                                    keyExtractor={(item, key) => key}
                                    onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={this.state.refreshing}
                                //         onRefresh={() => this.onRefresh()}
                                //     />
                                // }
                                />

                                {this._onFooterSec()}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                                    {/* <NoDataFound /> */}
                                    <Text style={styles.noDataFound}>No Data Found !</Text>
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
                {this.modalSec()}
                {/* </KeyboardAvoidingView> */}
            </SafeAreaView>
        )
    }
}



const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
            stateUserInformation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryItemList)