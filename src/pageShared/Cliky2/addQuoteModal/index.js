import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { CheckBox, Modal, TextButton } from '../../../shared';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../../enums';
import { DropdownInputBox, TextInputBox, BigTextButton } from '../../../shared';
import DatePicker from 'react-native-date-picker';
import { DateConvert, StorageDataModification, Toaster } from '../../../services/common-view-function';
import { DataValidator } from '../../../validators';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modQuoteTypeData, modifyData, modifyLocationMappedData, validateActivityData } from './function';
import { getUserData } from '../../../services/common-view-function/getUserData';
import DynamicProductMapping from '../../dynamicProductMapping';
let allActivityArr = [{ id: "1", name: "suk" }, { id: "2", name: "sam" }, { id: "3", name: "jam" }];
let allAssignToArr = [{ id: "1", name: "suk" }, { id: "2", name: "sam" }, { id: "3", name: "jam" }];
let allUserListArr = [{ id: "1", name: "suk_user" }, { id: "2", name: "sam_user" }, { id: "3", name: "jam_usetr" }];

const productHeirarchyData = [
    {
        selectedProductName: {},
        producthArr: [],
        prodHmUpperNodes: {},
        hierarchyDataId: "",
        hierarchyTypeId: "",
        price: "",
        quantity: "",
        discount: "",
        unit: "",
        unitName: "",
        hmName: ""
    }
]

function AddQuoteModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    onCloseModal,
    modalType,
    submitData,
    data,
    customerList,
    selectedItemData,
    onPressAddQuotes
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    if (isVisible == false) return null;


    const [quoteName, setQuoteName] = useState("");
    const [quoteNameActive, setQuoteNameActive] = useState(false);
    const [productData, setProductData] = useState(productHeirarchyData);
    const [productLoader, setProductLoader] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [addProductLoader, setAddProductLoader] = useState(false);
    const [activityTypeDetails, setActivityTypeDetails] = useState([]);
    const [productListData, setProductListData] = useState([]);
    const [quoteTypeData, setQuoteTypeData] = useState([]);
    const [selectedQuoteTypeData, setSelectedQuoteTypeData] = useState({});


    useEffect(async () => {
        // activityTypeData();
        SetInitialStateData();
        await _getProductHierarchyTypesSlNo();
        await getQuoteTypeData();
    }, []);

    const activityTypeData = async () => {
        let reqData = {
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("activityTypeDropdown", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modActivityTypeData = modifyData(responseData.response.data)
                setActivityTypeDropdownData(modActivityTypeData);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    const getQuoteTypeData = async () => {
        let reqData = {
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchGeneralQuoteTypes", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modTypeData = modQuoteTypeData(responseData.response);
                setQuoteTypeData(modTypeData);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    const _getProductHierarchyTypesSlNo = async () => {
        setProductLoader(true);
        let mappedProductData = await StorageDataModification.mappedProductData({}, "get")
        // if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
        let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, mappedProductData), "store");
            } else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
        // }
        setProductLoader(false);
        return true;
    }

    const SetInitialStateData = () => {
        const productDetails = [
            {
                selectedProductName: {},
                producthArr: [],
                prodHmUpperNodes: {},
                hierarchyDataId: "",
                hierarchyTypeId: "",
                price: "",
                quantity: "",
                discount: "",
                unit: "",
                unitName: "",
                hmName: ""
            }
        ]
        setQuoteName("");
        setQuoteNameActive(false);
        setProductData(productDetails);
        setProductLoader(false);
        setProductDetails([]);
        setAddProductLoader(false);
        setActivityTypeDetails([]);
        setProductListData([]);
        setQuoteTypeData([]);
        setSelectedQuoteTypeData({});
    }

    const _onClose = () => {
        onCloseModal(false);
    }

    const OnChangeQuoteName = (value) => {
        setQuoteName(value);
    }


    const addQuote = async () => {
        let reqData = {
            "tableType": "3",
            "refId": selectedItemData.leadId,
            "productArr": productData,
            "quoteName": quoteName,
            "quoteTypeId": selectedQuoteTypeData.id,
            "masterMdouleTypeId": "20"
        }
        onPressAddQuotes(reqData);
        SetInitialStateData();
    }

    const onAddQuote = async () => {
        addQuote()
    }

    const setProductDataLoader = async (type) => {
        setAddProductLoader(type)
    }

    const _addAnother = async () => {
        await setProductDataLoader(true)
        let obj = {
            "selectedProductName": {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "producthArr": [],
            "price": "",
            "quantity": "",
            "discount": "",
            "unit": "",
            "unitName": "",
            "prodHmUpperNodes": {},
            "hmName": ""

        }
        let arr = productData;
        arr.push(obj);
        setProductData(arr);
        await setProductDataLoader(false)
    }

    const _onDeleteArray = async (key) => {
        await setProductDataLoader(true)
        let arr = productData;
        arr.splice(key, 1);
        setProductData(arr);
        await setProductDataLoader(false)
    }

    const onSelectProductData = (val, key) => {
        let productDataArr = productData;
        productDataArr[key].hierarchyDataId = val.value.hierarchyDataId
        productDataArr[key].hierarchyTypeId = val.value.hierarchyTypeId
        productDataArr[key].producthArr = val.totalData;
        setProductData(productDataArr)
    }

    const onChangePrice = (value, index) => {
        // console.log("valueueueue:::::>.>>>", value);
        let productDataArr = [...productData];
        productDataArr[index].price = value;
        setProductData(productDataArr)
        // console.log("productDataArr[index].price", productDataArr);

    }

    const onChangeDiscount = (value, index) => {
        let productDataArr = [...productData];
        productDataArr[index].discount = value;
        setProductData(productDataArr)
    }

    const onChangeQuantity = (value, index) => {
        let productDataArr = [...productData];
        productDataArr[index].quantity = value;
        setProductData(productDataArr)
    }

    const onChangeUnit = (value, index) => {
        let productDataArr = [...productData];
        productDataArr[index].unit = value;
        setProductData(productDataArr)
    }

    const OnSelectQuoteType = (value) => {
        setSelectedQuoteTypeData(value);
    }

    const _productSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.GRAY.DAVY_GRAY, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => _onDeleteArray(key)}>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }
                    <View style={{ marginBottom: 15, }}>
                        {productLoader ? null : <>

                            <View style={{ height: 10 }} />
                            <DynamicProductMapping
                                editData={item.producthArr}
                                // flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => onSelectProductData(value, key)}
                            />
                        </>
                        }
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        {/* {console.log("mainuem-----", item)} */}
                        <TextInputBox
                            value={item.price}
                            onChangeText={(value) => onChangePrice(value, key)}
                            placeholder={"Add price"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            // additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            // alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.discount}
                            onChangeText={(value) => onChangeDiscount(value, key)}
                            placeholder={"Add discount"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.quantity}
                            onChangeText={(value) => onChangeQuantity(value, key)}
                            placeholder={"Add quantity"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.unit}
                            onChangeText={(value) => onChangeUnit(value, key)}
                            placeholder={"Add Unit"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    const productInfo = () => {
        return (
            <View >
                {/* <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textDetailsInfo}>Product Added for the Deal</Text>
                </View> */}
                <View >
                    {addProductLoader ?
                        <ActivityIndicator />
                        :
                        <View style={{}}>
                            {productData.map((item, key) => (
                                _productSection(item, key)
                            ))}
                        </View>
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 15 }}>
                        <TouchableOpacity
                            style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                            onPress={() => _addAnother()}
                        >
                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {addProductLoader ?
                        <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                        :
                        <View style={{ marginTop: 10 }}>
                            <BigTextButton
                                height={40}
                                borderRadius={24}
                                backgroundColor={Color.COLOR.RED.AMARANTH}
                                text={"Add Product"}
                                onPress={() => onAddProduct()}
                            />
                        </View>
                    } */}


                </View>
            </View>
        )
    }

    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            children={
                <View style={styles.modalview}>
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Add New Quotes</Text>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => _onClose()}  >
                                <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                            {/* {ViewFields()} */}
                            {/* <View style={{ marginBottom: 15 }}>
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Activity Type</Text>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={selectedActivity.id}
                                    // selectedValueType={activityTypeDropdownData}
                                    data={activityTypeDropdownData}
                                    onSelect={(value) => OnSelectActivityType(value)}
                                    headerText={"Select Activity"}
                                    selectedText={"Select an option"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                                <View style={{ marginBottom: 15 }} >
                                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Date</Text>
                                    <View style={{ height: 10 }} />
                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => OnDatePickerView(true)} activeOpacity={0.9}>
                                        <Text style={styles.inputBoxText}>{selectDate.length == 0 ? "yyyy-mm-dd" : selectDate}</Text>
                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                        </View>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={visibleDatePicker}
                                        date={selectRawDate}
                                        mode={"date"}
                                        // maximumDate={new Date()}
                                        onConfirm={(date) => OnSelectDateTime(date)}
                                        onCancel={() => OnDatePickerView(false)}
                                    />
                                </View>
                                {dateTimeSec()}
                                <View style={{ marginBottom: 15 }} >
                                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Write your note</Text>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={description}
                                        onChangeText={(value) => OnChangeDescription(value)}
                                        placeholder={"Write your Note"}
                                        keyboardType={"default"}
                                        multiline={true}
                                        isActive={descriptionActive}
                                        additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                        alignItems={'flex-start'}
                                        onFocus={() => { setDescriptionActive(true) }}
                                        onBlur={() => { setDescriptionActive(false) }}
                                        height={90}
                                        returnKeyType={'default'}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 15 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <CheckBox
                                        type={"singleSelectBox"}
                                        borderRadius={40}
                                        data={checkAssignType == "self" ? true : false}
                                        onClickValue={() => _onCheckType("self")}
                                    />
                                    <Text style={styles.selectionText}>Self</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <CheckBox
                                        type={"singleSelectBox"}
                                        borderRadius={40}
                                        data={checkAssignType == "subordinate" ? true : false}
                                        onClickValue={() => _onCheckType("subordinate")}
                                    />
                                    <Text style={styles.selectionText}>Subordinate</Text>
                                </View>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                {checkAssignType == "self" ?
                                    <Text style={styles.selectionText}>{fullName}</Text>
                                    :
                                    <DropdownInputBox
                                        selectedValue={selectedCustomer.id}
                                        // selectedValueType={activityTypeDropdownData}
                                        data={customerListData}
                                        onSelect={(value) => OnSelectCustomer(value)}
                                        headerText={"Select Subordinate"}
                                        selectedText={"Select an option"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                }
                            </View> */}
                            {/* {ViewButton()} */}
                            <View style={{ marginBottom: 15 }} >
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Write your Quote</Text>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={quoteName}
                                    onChangeText={(value) => OnChangeQuoteName(value)}
                                    placeholder={"Write Quote name"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={quoteNameActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setQuoteNameActive(true) }}
                                    onBlur={() => { setQuoteNameActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <DropdownInputBox
                                    selectedValue={selectedQuoteTypeData.id}
                                    // selectedValueType={activityTypeDropdownData}
                                    data={quoteTypeData}
                                    onSelect={(value) => OnSelectQuoteType(value)}
                                    headerText={"Select Type"}
                                    selectedText={"Select an option"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={styles.shadowBox}>
                                {productInfo()}
                            </View>
                            {/* {addActivityLoader ?
                                <ActivityIndicator color={Color.COLOR.WHITE.FLASH_WHITE} />
                                : */}
                            <BigTextButton
                                text={"Add Quote"}
                                onPress={() => onAddQuote()}
                            />
                            {/* } */}
                        </View>
                    </ScrollView>
                </View>
            }
        />
    );
}


AddQuoteModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    onCloseModal: () => { },
    modalType: "contact",
    submitData: () => { },
    data: {},
    customerList: [],
    selectedItemData: {},
    onPressAddQuotes: () => { }
};

AddQuoteModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onCloseModal: PropTypes.func,
    modalType: PropTypes.string,
    submitData: PropTypes.func,
    data: PropTypes.instanceOf(Object),
    customerList: PropTypes.array,
    selectedItemData: PropTypes.instanceOf(Object),
    onPressAddQuotes: PropTypes.func
};


export default AddQuoteModal;