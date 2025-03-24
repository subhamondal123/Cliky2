
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from "react-native";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { DateConvert, FileUpload, GetUserData, StorageDataModification, Toaster } from "../../../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, ImageUploadModal, Loader, MultipleDropdownInputBox, TextButton } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { cityModifyData, districtModifyData, modifyCityArrData, modifyContactData, modifyContactTypeArr, modifyContactUserArr, modifyDealerArr, modifyDistributorArr, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, modSelectItem, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../../pageShared";
import CommonModal from "../../../../../../shared/modal";
import style from "react-native-image-blur-loading/src/style";
import MultipleSelectModalDropdown from "../../../../../../shared/multiple-select-modal-dropdown";

class EventLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allPageData: {},
            visibleProfileImgUploadModal: false,
            registrationObjData: {},
            locationObj: {},
            locationLoader: false,
            contactTypeArr: [],
            contactTypeLoader: false,
            isVisibleModal: false,
            customerDetailsArr: [],
            searchText: "",
            selectedContactTypeId: "",
            selectedContact: {
                customerId: "",
                customerName: "",
            },
            dropdownLoader: false,
            contactDataArr: [],
            customerLoader: false

        };
    }

    componentDidMount = async () => {
        this.setState({ allPageData: this.props.allPageData })
        await this._getHierarchyTypesSlNo()

        this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ pageLoader: false })
    }

    // for get the get Hierarchy Types With Sl No for country
    _getHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.countryMappedUserArr), "store");
            }
            else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
        this.setState({ locationLoader: false })

        return true;
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };


    distributorSection = () => {

        const _onSelectDistributor = (value) => {
            this.state.allPageData.selectedDistributorObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const onSearch = async (value) => {
            this.setState({ searchableLoader: true })
            let reqData = {
                "type": "all",
                "isSearch": "1",
                "searchName": value
            }
            let responseData = await MiddlewareCheck("getAllDistributor", reqData, this.props);
            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.allPageData.distributorArr = modifyDistributorArr(responseData.response)
                    this.setState({
                        allPageData: this.state.allPageData
                    })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ searchableLoader: false })

        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    isApiCall={true}
                    onSearchData={(value) => onSearch(value)}
                    isSearchable={true}
                    selectedValue={this.state.allPageData.selectedDistributorObj.id ? this.state.allPageData.selectedDistributorObj.id.toString() : "0"}
                    data={this.state.allPageData.distributorArr}
                    onSelect={(value) => _onSelectDistributor(value)}
                    headerText={"Select Distributor*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                    borderRadius={25}
                    loaderCheck={this.state.searchableLoader}
                />
            </View>
        )
    }


    dealerSection = () => {
        const _onSelectDealer = (value) => {
            this.state.allPageData.selectedDealerObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const onSearch = async (value) => {
            this.setState({ searchableLoader: true })
            let reqData = {
                "type": "all",
                "isSearch": "1",
                "searchName": value
            }
            let responseData = await MiddlewareCheck("getAllDealer", reqData, this.props);

            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.allPageData.dealerArr = modifyDealerArr(responseData.response)
                    this.setState({
                        allPageData: this.state.allPageData
                    })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }

            this.setState({ searchableLoader: false })

        }


        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    isApiCall={true}
                    onSearchData={(value) => onSearch(value)}
                    isSearchable={true}
                    selectedValue={this.state.allPageData.selectedDealerObj.id ? this.state.allPageData.selectedDealerObj.id.toString() : "0"}
                    data={this.state.allPageData.dealerArr}
                    onSelect={(value) => _onSelectDealer(value)}
                    headerText={"Select Dealer*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                    borderRadius={25}
                    loaderCheck={this.state.searchableLoader}
                />
            </View>
        )
    }

    pincodeSection = () => {

        const _onChangePincode = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.allPageData.pincode = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={25}
                    value={this.state.allPageData.pincode}
                    onChangeText={(value) => _onChangePincode(value)}
                    placeholder={"Write Location Pincode"}
                    keyboardType={"number-pad"}
                    isActive={this.state.allPageData.pincodeActive}
                    onFocus={() => { this.state.allPageData.pincodeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.pincodeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={50}
                    returnKeyType={'default'}
                    maxLength={6}
                />
            </View>
        )
    }

    addressSection = () => {

        const _onChangeAddress = (value) => {
            // let newText = '';
            // newText = DataValidator.inputEntryValidate(value, "nameSpace");
            this.state.allPageData.address = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={25}
                    value={this.state.allPageData.address}
                    onChangeText={(value) => _onChangeAddress(value)}
                    placeholder={"Write Detail address"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.addressActive}
                    onFocus={() => { this.state.allPageData.addressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.addressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={90}
                    returnKeyType={'default'}
                    alignItems={"flex-start"}
                    multiline={true}
                    maxLength={500}
                />
            </View>
        )
    }

    _onGetDealerDropdown = async (data) => {
        let reqData = {
            "type": "all",
            "zoneId": data.id
        }
        let responseData = await MiddlewareCheck("getAllDealer", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.dealerArr = modifyDealerArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onGetDistributorDropdown = async (data) => {
        let reqData = {
            "type": "all",
            "zoneId": data.id
        }
        let responseData = await MiddlewareCheck("getAllDistributor", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.distributorArr = modifyDistributorArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }



    _onSave = () => {
        let reqData = {
            "hierarchyDataArr": [this.state.locationObj],
            "state": this.state.allPageData.selectedStateObj.id ? this.state.allPageData.selectedStateObj.id : "",
            "district": this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id : "",
            "city": this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id : "",
            "zoneId": this.state.allPageData.selectedZoneObj.id ? this.state.allPageData.selectedZoneObj.id : "",
            "distributorId": this.state.allPageData.selectedDistributorObj.id ? this.state.allPageData.selectedDistributorObj.id : "",
            "dealerId": this.state.allPageData.selectedDealerObj.id ? this.state.allPageData.selectedDealerObj.id : "",
            "attendeesArr": this.state.allPageData.contactDataArr,
            "pincode": this.state.allPageData.pincode ? this.state.allPageData.pincode : "",
            "address": this.state.allPageData.address ? this.state.allPageData.address : "",
        }


        let validData = validateData(reqData, this.state.locationObj, this.state.selectedContact);
        if (validData.status == true) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2
            }
            this.props.onSaveDataToParent(data);
        }
    }

    onSelectLocationData = async (val) => {
        this.state.locationObj = val.value
        this.state.allPageData.locationArr = val.totalData
        this.state.allPageData.selectedContactTypeObj = {}
        this.state.allPageData.selectedContactObj = {}
        this.setState(this.state)
        let reqData = {
            "isProject": "0",
            "customerAccessType": "1",
            "masterMdouleTypeId": "6"
        }
        let responseData = await MiddlewareCheck("getContactType_main", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.contactTypeArr = modifyContactTypeArr(responseData.response)
                this.setState(this.state)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onBack = () => {
        let data = {
            pageNum: 1,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }

    getContacts = async (searchText) => {
        let reqData = {
            "contactTypeId": this.state.allPageData.selectedContactTypeObj.id,
            "approvalList": "0",
            "hierarchyDataIdArr": this.state.locationObj,
            "searchName": this.state.searchText,
            "customerAccessType": "1",
            "masterMdouleTypeId": "6",
            "limit": "50",
            "offset": "0",
            "isDownload": "0",
        }
        // console.log("-----reqdatata--")
        let responseData = await MiddlewareCheck("registrationList", reqData);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.customerDetailsArr = modifyContactUserArr(responseData.response.data)
                this.setState(this.state)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.dropdownLoader = false;
        this.state.customerLoader = false;
        this.setState(this.state);

    }

    onPressContactType = async (item) => {
        this.state.selectedContactTypeId = item.contactTypeId;
        this.state.contactTypeLoader = true;
        this.state.isVisibleModal = true;
        this.setState(this.state);
        let reqData = {
            "contactTypeId": this.state.selectedContactTypeId,
            "approvalList": "0",
            "hierarchyDataIdArr": this.state.locationObj,
            "searchName": this.state.searchText,
            "customerAccessType": "1",
            "masterMdouleTypeId": "6",
            "limit": "50",
            "offset": "0",
            "isDownload": "0",
        }
        let responseData = await MiddlewareCheck("registrationList", reqData);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.customerDetailsArr = modifyContactUserArr(responseData.response.data)
                this.setState(this.state)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.contactTypeLoader = false;
        this.setState(this.state);
    }
    onSearchListData = async (value) => {
        this.state.contactTypeLoader = true;
        let reqData = {
            "contactTypeId": this.state.selectedContactTypeId,
            "approvalList": "0",
            "hierarchyDataIdArr": this.state.locationObj,
            "searchName": value,
            "customerAccessType": "1",
            "masterMdouleTypeId": "6",
            "limit": "50",
            "offset": "0",
            "isDownload": "0",
        }
        let responseData = await MiddlewareCheck("registrationList", reqData);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.customerDetailsArr = modifyContactUserArr(responseData.response.data)
                this.setState(this.state)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.contactTypeLoader = false;
        this.setState(this.state);
    }

    onBackDropPressModal = () => {
        this.state.isVisibleModal = !this.state.isVisibleModal;
        this.setState(this.state);
    }

    onSearchText = (value) => {
        this.state.searchText = value;
        this.setState(this.state);
        this.onSearchListData(value);
    }

    onPressSelectedContact = (value) => {
        this.state.selectedContact.customerId = value.customerId;
        this.state.selectedContact.customerName = value.customerName;
        this.state.isVisibleModal = !this.state.isVisibleModal;
        this.setState(this.state);
    }

    renderCustomerDetails = (item) => {
        return (
            <View>
                {this.fetchCustomerDetails(item.item, item.index)}
            </View>
        )
    }

    fetchCustomerDetails = (item, key) => {
        return (
            <TouchableOpacity onPress={() => this.onPressSelectedContact(item)} key={key} style={{ marginHorizontal: 15, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR, padding: 10, borderRadius: 30, backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR }}>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: FontSize.SM }}>{item.customerName}</Text>
            </TouchableOpacity>
        )
    }

    onSelectContactType = (val) => {
        this.state.customerDetailsArr = []
        this.state.allPageData.selectedContactObj = {}
        this.state.allPageData.selectedContactTypeObj = val
        this.setState({ allPageData: this.state.allPageData, customerDetailsArr: this.state.customerDetailsArr, customerLoader: true })
        this.getContacts()
    }

    onSelectContact = (val) => {
        let arr = this.state.customerDetailsArr;
        let result = arr.filter(item => val.value.includes(item.id));

        this.state.allPageData.selectedContactArr = modifyContactData(result, this.state.allPageData.selectedContactTypeObj)
        this.state.allPageData.selectedContactObj = modSelectItem(val.selectItem)
        this.state.allPageData.selectedContactIds = val.value

        this.setState({ allPageData: this.state.allPageData })
    }

    searchDropdownData = async (val) => {
        this.state.searchText = val
        this.setState({ searchText: this.state.searchText })
        await this.clearCustomerData();
        await this.getContacts();
    }

    clearCustomerData = async () => {
        this.setState({ customerDetailsArr: [], dropdownLoader: true })
    }

    addContacts = () => {
        if (this.state.allPageData.selectedContactTypeObj.id == undefined || this.state.allPageData.selectedContactTypeObj.id == null || this.state.allPageData.selectedContactTypeObj.id == "") {
            Toaster.ShortCenterToaster("Please Select Contact Type !")
        }
        // else if (this.state.allPageData.selectedContactObj.id == undefined || this.state.allPageData.selectedContactObj.id == null || this.state.allPageData.selectedContactObj.id == "") {
        //     Toaster.ShortCenterToaster("Please Select a Contact !")
        // } 
        else if (this.state.allPageData.selectedContactArr.length == 0) {
            Toaster.ShortCenterToaster("Please Select a Contact !")
        }

        else {
            let contactArr = this.state.allPageData.selectedContactArr
            // contactArr.push({ "typeName": this.state.allPageData.selectedContactTypeObj.name, "typeId": this.state.allPageData.selectedContactTypeObj.id, "attendeesId": this.state.allPageData.selectedContactObj.id, "attendeesName": this.state.allPageData.selectedContactObj.name })
            this.state.allPageData.contactDataArr = [...this.state.allPageData.contactDataArr, ...contactArr];
            this.state.allPageData.selectedContactIds = []
            this.state.allPageData.selectedContactTypeObj = {}
            this.state.allPageData.selectedContactObj = {}
            this.state.customerDetailsArr = []
            this.setState({ allPageData: this.state.allPageData, customerDetailsArr: this.state.customerDetailsArr })


        }
    }

    onDeleteContact = (item, key) => {
        let arr = this.state.allPageData.contactDataArr;
        arr.splice(key, 1)
        // for (let i = 0; i < arr.length; i++) {
        //     if()
        // }
        this.state.allPageData.contactDataArr = arr;
        this.setState(this.state)
    }

    contactTypeSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginBottom: 10, borderWidth: 0.5, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 5 }}>
                    <DropdownInputBox
                        borderRadius={25}
                        selectedValue={this.state.allPageData.selectedContactTypeObj.id ? this.state.allPageData.selectedContactTypeObj.id.toString() : "0"}
                        data={this.state.contactTypeArr}
                        onSelect={(value) => this.onSelectContactType(value)}
                        headerText={"Choose Contact Type*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        height={50}
                        isSearchable={true}
                    />
                    <View style={{ height: 10 }} />
                    {/* <DropdownInputBox
                        loaderCheck={this.state.dropdownLoader}
                        isApiCall={true}
                        onSearchData={(val) => this.searchDropdownData(val)}
                        borderRadius={25}
                        selectedValue={this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id.toString() : "0"}
                        data={this.state.customerDetailsArr}
                        onSelect={(value) => this.onSelectContact(value)}
                        headerText={"Select Contact*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        height={50}
                        isSearchable={true}
                    /> */}
                    {this.state.customerLoader ? <ActivityIndicator size={"small"} /> :
                        <MultipleDropdownInputBox
                            loaderCheck={this.state.dropdownLoader}
                            isApiCall={true}
                            onSearchData={(val) => this.searchDropdownData(val)}
                            borderRadius={25}
                            selectedValue={this.state.allPageData.selectedContactIds}
                            selectedArrData={this.state.allPageData.selectedContactArr}
                            data={this.state.customerDetailsArr}
                            onSelect={(value) => this.onSelectContact(value)}
                            headerText={"Select Contact*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            // height={50}
                            isSearchable={true}
                            additionalListItemStyle={{ borderWidth: 1, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 20 }}
                        />
                    }


                    <View style={{ height: 10 }} />
                    <View style={{ paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => this.addContacts()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, alignSelf: "flex-end", borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.BOLD, fontSize: 12 }}>+ Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 10 }} />
                    {this.state.allPageData.contactDataArr.length > 0 ?
                        <View style={{ backgroundColor: Color.COLOR.GRAY.GRAY_TINTS, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5 }}>
                                <View style={{ alignItems: "flex-start", width: "50%" }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.BOLD, fontSize: 12 }}>Type</Text>
                                </View>
                                {/* <View style={{flex:1}}/> */}
                                <View style={{ width: "50%" }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.BOLD, fontSize: 12 }}>Name</Text>
                                </View>
                            </View>
                            {this.state.allPageData.contactDataArr.map((item, key) => (
                                <View key={key} style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5, borderBottomWidth: 0.5, borderBottomStyle: 'dashed', }}>
                                    <View style={{ alignItems: "flex-start", width: "50%" }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 11 }}>{item.typeName}</Text>

                                    </View>
                                    <View style={{ width: "40%" }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 11 }}>{item.attendeesName}</Text>

                                    </View>
                                    <TouchableOpacity onPress={() => this.onDeleteContact(item, key)} style={{ paddingRight: 5, width: "10%", alignItems: "center" }}>
                                        <Image source={ImageName.DELETE_WITH_RED} style={{ height: 16, width: 16, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                        </View>
                        : null}
                </View>
            </React.Fragment>
        )
    }

    render() {
        return (
            <View >
                {this.state.pageLoader ? <View style={{ height: Dimension.height / 1.1, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View> : <>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                        <View style={{ marginHorizontal: "5%", marrginTop: 15 }}>
                            {/* {this.countrySection()} */}
                            {/* {this.stateSection()}
                            {this.districtSection()}
                            {this.zoneSection()} */}
                            {this.state.locationLoader ?
                                null :
                                <>
                                    <DynamicLocationMapping
                                        // type={"lastHierarcyField"}
                                        editData={this.props.allPageData.locationArr}
                                        screenName={"Mms"}
                                        marginBottom={15}
                                        flexDirection={"column"}
                                        viewType={"edit"}
                                        isLabelVisible={false}
                                        onApiCallData={(value) => this.onSelectLocationData(value)} />

                                </>
                            }
                            {/* {this.distributorSection()}
                            {this.dealerSection()} */}
                            {this.contactTypeSec()}
                            {/* {this.citySection()} */}
                            {/* {this.cityArrSection()} */}
                            {this.pincodeSection()}
                            {this.addressSection()}

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: "row", flex: 1 }}>
                                <View style={{ flex: 0.4 }} >

                                    <BigTextButton
                                        backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                        borderRadius={25}
                                        text={"Previous"}
                                        onPress={() => this._onBack()}
                                    />
                                </View>
                                <View style={{ flex: 0.2 }} />
                                <View style={{ flex: 0.4 }}>
                                    <BigTextButton
                                        backgroundColor={Color.COLOR.RED.AMARANTH}
                                        borderRadius={25}

                                        text={"Submit"}
                                        onPress={() => this._onSave()}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 150 }} />
                    </ScrollView>
                </>}


            </View>
        )
    }
}


export default EventLocation;