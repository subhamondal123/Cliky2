import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import { enquirySourceModifyData, modProductHeirarchyData, modifyEnquiryTypeArrData, modifyLocationMappedData, modifyStatgeArr, modifyStatusData, sourceTypeModifyData } from './function';
import { ErrorCode } from '../../../services/constant';
import { MiddlewareCheck } from '../../../services/middleware';
import { DateConvert, StorageDataModification, Toaster } from '../../../services/common-view-function';
import { DynamicLocationMapping, DynamicProductMapping } from '../../../pageShared';
import DatePicker from 'react-native-date-picker';
import { CheckBox, DropdownInputBox, Modal, TextInputBox } from '../../../shared';

const leadValueTypeData = [
    {
        id: 1,
        name: "Doller"
    },
    {
        id: 2,
        name: "Rupees"
    },
]

const probabilityArrdata = [
    {
        id: 20,
        name: "20%",
        value: "20",
        check: false
    },
    {
        id: 40,
        name: "40%",
        value: "40",
        check: false
    },
    {
        id: 60,
        name: "60%",
        value: "60",
        check: false
    },
    {
        id: 80,
        name: "80%",
        value: "80",
        check: false
    },
    {
        id: 100,
        name: "100%",
        value: "100",
        check: false
    },
]

const productHeirarchyData = [
    {
        selectedProductName: {},
        productArr: [],
        hierarchyDataId: "",
        hierarchyTypeId: "",
        price: "",
        quantity: "",
        discount: "",
        unit: ""
    }
]


function AddLeadModal({
    isVisible,
    data,
    isHidden,
    customerData,
    closeModal,
    addLead
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    if (isVisible == false) return null;


    const [fullName, setFullName] = useState("");
    const [selectedData, setSelectedData] = useState(data);
    const [leadName, setLeadName] = useState("");
    const [leadNameActive, setLeadNameActive] = useState(false);
    const [leadSourceTypeArr, setLeadSourceTypeArr] = useState([]);
    const [selectedSourceTypeObj, setSelectedSourceTypeObj] = useState({});
    const [leadStageArr, setLeadStageArr] = useState([]);
    const [selectedLeadStageObj, setSelectedLeadStageObj] = useState({});
    const [leadStageRemarks, setLeadStageRemarks] = useState("");
    const [leadStageRemarksActive, setLeadStageRemarksActive] = useState(false);
    const [checkAssignType, setCheckAssignType] = useState("self");
    const [customerListData, setCustomerListData] = useState(customerData);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [leadStatus, setLeadStatus] = useState([]);
    const [selectedLeadStatus, setSelectedLeadStatus] = useState({});
    const [locationData, setLocationData] = useState([]);
    const [contactTypeArr, setContactTypeArr] = useState([]);
    const [selectedcontactTypeArr, setSelectedcontactTypeArr] = useState({});
    const [leadValue, setLeadValue] = useState("");
    const [leadValueActive, setLeadValueActive] = useState(false);
    const [leadValueType, setLeadValueType] = useState(leadValueTypeData);
    const [selectedLeadValueType, setSelectedLeadValueType] = useState({});
    const [productData, setProductData] = useState(productHeirarchyData);
    const [addProductLoader, setAddProductLoader] = useState(false);
    const [productLoader, setProductLoader] = useState(false);
    const [visibleDatePicker, setVisibleDatePicker] = useState(false);
    const [selectRawDate, setSelectRawDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState("");
    const [probabilityArr, setProbabilityArr] = useState(probabilityArrdata);
    const [selectedProbabilityObj, setSelectedProbabilityObj] = useState({});
    const [leadAge, setLeadAge] = useState("0");
    const [leadAgeActive, setLeadAgeActive] = useState(false);
    const [ownLeadValue, setOwnLeadValue] = useState("");
    const [ownLeadValueActive, setOwnLeadValueActive] = useState(false);
    const [probability, setProbability] = useState("");



    // selectedProbabilityObj
    // const [selectedLeadStatus, setSelectedLeadStatus] = useState({});

    useEffect(async () => {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        setFullName(userInfo.firstName + " " + userInfo.lastName);
        // activityTypeData();
        // SetInitialStateData();

        await getLeadSource();
        await getLeadAndOpportunityStages();
        await getLeadStatus();
        await _getHierarchyTypesSlNo();
        await getContactType();
        await _getProductHierarchyTypesSlNo();
    }, []);


    const getLeadSource = async () => {
        let responseDataSource = await MiddlewareCheck("getLeadSource", {}, this.props);
        if (responseDataSource) {
            if (responseDataSource.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let sourceTypeData = sourceTypeModifyData(responseDataSource.response);
                setLeadSourceTypeArr(sourceTypeData);
            }
        }
    }

    const getLeadAndOpportunityStages = async () => {
        let responseData = await MiddlewareCheck("getSalesStage", { "moduleType": "lead", "masterMdouleTypeId": "20" }, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let leadStageData = modifyStatgeArr(responseData.response)
                // console.log("leadStageDataleadStageData", JSON.stringify(leadStageData));
                setLeadStageArr(leadStageData);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    const getLeadStatus = async () => {
        let responseData = await MiddlewareCheck("getLeadStatus", { type: "1" }, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let leadStatusData = modifyStatusData(responseData.response)
                setLeadStatus(leadStatusData);
            }
        }
    }

    const _getHierarchyTypesSlNo = async () => {
        let mappedData = await StorageDataModification.mappedLocationData({}, "get");
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, mappedData), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
    }

    const getContactType = async () => {
        let responseDataContact = await MiddlewareCheck("getEnquiryLandingData", {}, this.props);
        if (responseDataContact) {
            if (responseDataContact.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseDataContact.response);
                let contactTypeData = modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList)
                setContactTypeArr(contactTypeData);
            }
        }
    }

    const _getProductHierarchyTypesSlNo = async () => {
        setProductLoader(true);
        let mappedData = await StorageDataModification.mappedProductData({}, "get");
        if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, mappedData), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        setProductLoader(false);
    }

    const onChangeLeadName = (value) => {
        setLeadName(value);
    }

    const onChangeLeadStageRemarks = (value) => {
        setLeadStageRemarks(value);
    }

    const _onCheckType = (type) => {
        setCheckAssignType(type);
    }

    const _onSelectLeadSourceType = (value) => {
        let data = leadSourceTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        setSelectedSourceTypeObj(value);
    }

    const _onSelectLeadStage = (value) => {
        let data = leadStageArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        setSelectedLeadStageObj(value);
        setProbability(value.percentage.toString());
    }

    const onSelectLocationData = (val) => {
        setLocationData(val.value);
    }

    const _onSelectContactType = (value) => {
        let data = contactTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        setSelectedcontactTypeArr(value);
    }

    const _onSelectLeadStatus = (value) => {
        let data = leadStatus;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        setSelectedLeadStatus(value);
    }

    const onSelectProductData = (val, key) => {
        let productDataArr = productData;
        productDataArr[key].hierarchyDataId = val.value.hierarchyDataId
        productDataArr[key].hierarchyTypeId = val.value.hierarchyTypeId
        productDataArr[key].productArr = val.totalData;
        setProductData(productDataArr)
        // this.setState({ productData: this.state.productData })
    }

    const _addAnother = async () => {
        await setProductDataLoader(true)
        let obj = {
            selectedProductName: {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "productArr": [],
            "price": "",
            "quantity": "",
            "discount": "",
            "unit": ""
        }
        productData.push(obj)
        // let arr = productData;
        // arr.push(obj);
        // setProductData(arr);
        await setProductDataLoader(false)
        // console.log("-------",productData)
    }

    const setProductDataLoader = async (type) => {
        setAddProductLoader(type)
    }

    const _onDeleteArray = async (key) => {
        await setProductDataLoader(true)
        let arr = productData;
        arr.splice(key, 1);
        setProductData(arr);
        await setProductDataLoader(false)
    }

    const OnSelectCustomer = (value) => {
        setSelectedCustomer(value);
    }

    const onChangeLeadValue = (value) => {
        setLeadValue(value);
    }

    const OnSelectLeadValueType = (value) => {
        setSelectedLeadValueType(value);
    }

    const onChangeLeadAge = (value) => {
        setLeadAge(value);
    }

    const onChangeOwnLeadValue = (value) => {
        setOwnLeadValue(value);
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
                        <View style={{ height: 10 }} />
                        {productLoader ?
                            <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                            :
                            <DynamicProductMapping
                                editData={item.productArr}
                                flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => onSelectProductData(value, key)}
                            />
                        }
                    </View>
                </View>
            </React.Fragment>
        )
    }

    const _onClose = () => {
        closeModal()
    }

    const _onSelectProbabilityPrcnt = (value) => {
        setSelectedProbabilityObj(value);
    }

    const onResetData = () => {
        setFullName("");
        setSelectedData(data);
        setLeadName("");
        setLeadNameActive(false);
        setLeadSourceTypeArr([]);
        setSelectedSourceTypeObj({});
        setLeadStageArr([]);
        setSelectedLeadStageObj({});
        setLeadStageRemarks("");
        setLeadStageRemarksActive(false);
        setCheckAssignType("self");
        setCustomerListData(customerData);
        setSelectedCustomer({});
        setLeadStatus([]);
        setSelectedLeadStatus({});
        setLocationData([]);
        setContactTypeArr([]);
        setSelectedcontactTypeArr({});
        setLeadValue("");
        setLeadValueActive(false);
        setLeadValueType(leadValueTypeData);
        setSelectedLeadValueType({});
        setProductData(productHeirarchyData);
        setAddProductLoader(false);
        setProductLoader(false);
        setVisibleDatePicker(false);
        setSelectRawDate(new Date());
        setSelectDate("");
        setProbabilityArr(probabilityArrdata);
        setSelectedProbabilityObj({});
        setLeadAge("0");
        setLeadAgeActive(false);
        setOwnLeadValue("");
        setOwnLeadValueActive(false);
        setProbability("")
    }

    const onAddLead = async () => {
        let modProductData = modProductHeirarchyData(productData);
        let userInfo = await StorageDataModification.userCredential({}, "get");
        let data = {
            "contactId": selectedData.contactId,
            "accountId": selectedData.organizationId,
            "leadName": leadName,
            "leadType": selectedcontactTypeArr.id,
            "leadSourceType": selectedSourceTypeObj.id,
            "leadStage": selectedLeadStageObj.id,
            "leadStageRemarks": leadStageRemarks,
            "leadOwner": checkAssignType == "self" ? userInfo.userId : selectedCustomer.id,
            "leadStatus": selectedLeadStatus.id,
            "locationHierarchyDataId": locationData.hierarchyDataId,
            "locationHierarchyTypeId": locationData.hierarchyTypeId,
            "leadValue": leadValue,
            "leadCurrencyType": selectedLeadValueType.name,
            "productArr": modProductData,
            "closingDate": selectDate,
            "probability": probability,
            "leadAge": leadAge,
            "leadOwnValue": ownLeadValue,
            "newOrg": "2",
            "newContact": "2",
            "masterMdouleTypeId": "20"
        }
        addLead(data);
        setProductData(productHeirarchyData);
    }

    const DateView = (key) => {
        const OnDatePickerView = () => {
            setVisibleDatePicker(!visibleDatePicker);
        }

        const OnSelectDateTime = (selectedDate) => {
            let rawDate = selectRawDate,
                viewDate = "";
            if (selectedDate) {
                viewDate = DateConvert.resDataDateFormat(selectedDate);
                rawDate = selectedDate;
            }
            setSelectDate(viewDate);
            setSelectRawDate(rawDate);
            OnDatePickerView();
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Date</Text>
                <View style={{ height: 10 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => OnDatePickerView()} activeOpacity={0.9}>
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
                    onCancel={() => OnDatePickerView()}
                />
            </View>)
        return activityView;
    }

    return (
        <Modal
            isVisible={isVisible}
            // padding={modalPadding}
            children={
                <View style={styles.modalview}>
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Add Lead</Text>
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
                        <View style={{ justifyContent: 'center', margin: 20 }}>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Contact Name</Text>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{selectedData.contactName}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Account Name</Text>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{selectedData.organizationName}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputBox
                                    value={leadName}
                                    onChangeText={(value) => onChangeLeadName(value)}
                                    placeholder={"Write your lead name here"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={leadNameActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setLeadNameActive(true) }}
                                    onBlur={() => { setLeadNameActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <DropdownInputBox
                                    selectedValue={selectedcontactTypeArr.id ? selectedcontactTypeArr.id.toString() : "0"}
                                    data={contactTypeArr}
                                    onSelect={(value) => _onSelectContactType(value)}
                                    headerText={"Lead Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <DropdownInputBox
                                    selectedValue={selectedSourceTypeObj.id ? selectedSourceTypeObj.id.toString() : "0"}
                                    data={leadSourceTypeArr}
                                    onSelect={(value) => _onSelectLeadSourceType(value)}
                                    headerText={"Lead Source Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <DropdownInputBox
                                    selectedValue={selectedLeadStageObj.id ? selectedLeadStageObj.id.toString() : "0"}
                                    data={leadStageArr}
                                    onSelect={(value) => _onSelectLeadStage(value)}
                                    headerText={"Lead Stage*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputBox
                                    value={leadStageRemarks}
                                    onChangeText={(value) => onChangeLeadStageRemarks(value)}
                                    placeholder={"Write Lead stage remarks"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={leadStageRemarksActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setLeadStageRemarksActive(true) }}
                                    onBlur={() => { setLeadStageRemarksActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
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
                                        headerText={"Select Activity"}
                                        selectedText={"Select an option"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                }
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <DropdownInputBox
                                    selectedValue={selectedLeadStatus.id ? selectedLeadStatus.id.toString() : "0"}
                                    data={leadStatus}
                                    onSelect={(value) => _onSelectLeadStatus(value)}
                                    headerText={"Lead Status*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <DynamicLocationMapping
                                    // type={"lastHierarcyField"}
                                    // editData={this.props.allPageData.locationArr}
                                    screenName={"Crm"}
                                    marginBottom={15}
                                    flexDirection={"column"}
                                    viewType={"edit"}
                                    isLabelVisible={false}
                                    onApiCallData={(value) => onSelectLocationData(value)} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <View style={{ flex: 0.7, marginRight: 10 }}>
                                    <TextInputBox
                                        value={leadValue}
                                        onChangeText={(value) => onChangeLeadValue(value)}
                                        placeholder={"Write Lead Value"}
                                        keyboardType={"default"}
                                        multiline={true}
                                        isActive={leadValueActive}
                                        additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                        alignItems={'flex-start'}
                                        onFocus={() => { setLeadValueActive(true) }}
                                        onBlur={() => { setLeadValueActive(false) }}
                                        height={45}
                                        returnKeyType={'default'}
                                    />
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <DropdownInputBox
                                        selectedValue={selectedLeadValueType.id}
                                        // selectedValueType={activityTypeDropdownData}
                                        data={leadValueType}
                                        onSelect={(value) => OnSelectLeadValueType(value)}
                                        headerText={"Select Activity"}
                                        selectedText={"Select an option"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                {addProductLoader ? <ActivityIndicator /> :
                                    <>
                                        {productData.map((item, key) => (
                                            _productSection(item, key)
                                        ))}
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }} />
                                            <TouchableOpacity
                                                style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                                onPress={() => _addAnother()}
                                            >
                                                <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>

                                }
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                {DateView()}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputBox
                                    value={probability}
                                    onChangeText={(value) => onChangeLeadValue(value)}
                                    placeholder={"Probability"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={leadValueActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setLeadValueActive(true) }}
                                    onBlur={() => { setLeadValueActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                    editable={false}
                                />
                                {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{probability}</Text> */}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputBox
                                    value={leadAge}
                                    onChangeText={(value) => onChangeLeadAge(value)}
                                    placeholder={"Write Lead age"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={leadAgeActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setLeadAgeActive(true) }}
                                    onBlur={() => { setLeadAgeActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                    editable={false}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputBox
                                    value={ownLeadValue}
                                    onChangeText={(value) => onChangeOwnLeadValue(value)}
                                    placeholder={"Write Lead Value"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={ownLeadValueActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setOwnLeadValueActive(true) }}
                                    onBlur={() => { setOwnLeadValueActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 10, padding: 5, flex: 0.5, alignItems: 'center', marginHorizontal: 5 }} onPress={() => onResetData()}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 10, padding: 5, flex: 0.5, alignItems: 'center', marginHorizontal: 5 }} onPress={() => onAddLead()}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        />
    );
}


AddLeadModal.defaultProps = {
    isVisible: true,
    data: {},
    isHidden: false,
    customerData: [],
    closeModal: () => { },
    addLead: () => { }
};

AddLeadModal.propTypes = {
    isVisible: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    customerData: PropTypes.array,
    closeModal: PropTypes.func,
    addLead: PropTypes.func
};


export default AddLeadModal;