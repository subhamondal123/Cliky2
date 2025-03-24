import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";

import { Color, Dimension, FontSize, ImageName } from "../../../../../../enums";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyEmailObject, modifyLocationMappedData, modifyOrganizationArrData, modifyPhoneNumberObject, modifyStateArrData, modifyZoneArrData, organizationModifyData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../../pageShared";
import { StorageDataModification } from "../../../../../../services/common-view-function";


class BusinessDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            locationLoader: false,

        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getHierarchyTypesSlNo();

    }

    _onLoad = async () => {
        this.setState({ pageloader: false, allPageData: this.props.allPageData })
    }

    // for get the get Hierarchy Types With Sl No for country
    _getHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.countryMappedUserArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ locationLoader: false })

        return true;
    }
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getBusinessNameData = async () => {
        this.setState({ businessTypeLoader: true })
        let responseData = await MiddlewareCheck("getExistingOrganization", this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let organizationData = organizationModifyData(responseData);
                this.setState({
                    allBusinessNameArr: modifyOrganizationArrData(organizationData.organizationList),
                })
            }
        }
        this.setState({ businessTypeLoader: false })
    }

    _OnSelectBusinessType = async (value) => {
        this.clearFieldData()
        let data = this.state.allPageData.allBusinessTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allBusinessTypeArr = data;
        this.state.allPageData.selectedBusinessTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })

    }

    getOrganizationDetails = async (value) => {
        let reqData = {
            organizationId: value.id
        }
        this.setState({ pageloader: true })
        let responseData = await MiddlewareCheck("getOrganizationDetails", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userData = responseData.response;
                if (userData[0].orgPhone && (userData[0].orgPhone != undefined || userData[0].orgPhone != null)) {
                    let phArr = userData[0].orgPhone.split(",");
                    this.state.allPageData.businessPhoneArr = modifyPhoneNumberObject(phArr)
                }
                if (userData[0].orgEmail && (userData[0].orgEmail != undefined || userData[0].orgEmail != null)) {
                    let emailArr = userData[0].orgEmail.split(",");
                    this.state.allPageData.businessEmailArr = modifyEmailObject(emailArr)
                }
                this.state.allPageData.businessAddress = userData[0].orgAddress;
                this.state.allPageData.selectedStateObj.id = userData[0].orgStateId;
                await this.getExistingDistrictData(userData[0].orgStateId, userData);
                await this.getExistingZoneData(userData[0].orgCityId, userData);

                this.setState({
                    allPageData: this.state.allPageData,
                })
            } else {
                Toaster.ShortCenterToaster("Internal Server Error");
            }
        }
        this.setState({ pageloader: false })
    }

    getExistingStateData = async (value, userData) => {
        let reqData = {
            countryId: value
        }

        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.allPageData.stateArr = modifyStateArrData(stateData.stateList)

                this.state.allPageData.selectedBusinessStateObj.id = userData[0].orgStateId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
    }

    getExistingDistrictData = async (value, userData) => {
        let reqData = {
            stateId: value
        }

        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList)
                this.state.allPageData.selectedDistrictObj.id = userData[0].orgCityId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }

    }

    getExistingZoneData = async (value, userData) => {
        let reqData = {
            cityId: value
        }

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allPageData.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.state.allPageData.selectedZoneObj.id = userData[0].orgZoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }


    clearFieldData = () => {
        this.state.allPageData.businessName = "",
            this.state.allPageData.businessAddress = "",
            this.state.allPageData.pincode = "",
            this.state.allPageData.city = "",
            this.state.allPageData.notes = "",
            this.state.allPageData.selectedStateObj = {},
            this.state.allPageData.selectedDistrictObj = {},
            this.state.allPageData.selectedZoneObj = {},
            this.state.allPageData.selectedBusinessNameObj = {}
        this.state.allPageData.businessPhoneArr = [{ phone: "", phoneActive: false }],
            this.state.allPageData.businessEmailArr = [
                { email: "", emailActive: false },
            ]
    }

    _OnSelectBusinessName = async (value) => {
        let data = this.state.allPageData.allBusinessNameArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allBusinessNameArr = data;
        this.state.allPageData.selectedBusinessNameObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.getOrganizationDetails(value)
    }


    _onChangeBusinessName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.businessName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeBusinessAddress = (value) => {
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.businessAddress = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeBusinessPhone = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.businessPhoneArr[key].phone = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeBusinessEmail = (value, key) => {
        this.state.allPageData.businessEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }



    ownerEmailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.email}
                    onChangeText={(value) => this._onChangeBusinessEmail(value, key)}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    isActive={item.emailActive}
                    onFocus={() => {
                        this.state.allPageData.businessEmailArr[key].emailActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.businessEmailArr[key].emailActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.businessEmailArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeleteEmail(key)}
                // editable={this.state.allPageData.selectedBusinessTypeObj.id == "0" ? true : false}
                />
            </React.Fragment>
        )
    }

    ownerPhoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.phone}
                    onChangeText={(value) => this._onChangeBusinessPhone(value, key)}
                    placeholder={"Phone Number*"}
                    keyboardType={"numeric"}
                    isActive={item.phoneActive}
                    onFocus={() => {
                        this.state.allPageData.businessPhoneArr[key].phoneActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.businessPhoneArr[key].phoneActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.businessPhoneArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                // editable={this.state.allPageData.selectedBusinessTypeObj.id == "0" ? true : false}
                />
            </React.Fragment>
        )
    }


    getStateData = async (value) => {
        let reqData = {
            countryId: value
        }
        this.setState({ stateLoader: true })
        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.allPageData.stateArr = modifyStateArrData(stateData.stateList)
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ stateLoader: false })
    }

    getDistrictData = async (value) => {
        let reqData = {
            stateId: value.id
        }
        this.setState({ distLoader: true })
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList);
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ distLoader: false })
    }

    _OnSelectState = async (value) => {
        let data = this.state.allPageData.stateArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.stateArr = data;
        this.state.allPageData.selectedStateObj = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
        await this.getDistrictData(value)
    }

    _OnSelectDistrict = async (value) => {
        let data = this.state.allPageData.districtArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.districtArr = data;
        this.state.allPageData.selectedDistrictObj = value
        this.setState({
            selectedDistrictObj: value,
            allDistrictArr: data,
        })

        await this.getZoneData(value);
    }

    getZoneData = async (value) => {
        let reqData = {
            cityId: value.id
        }
        this.setState({ zoneLoader: true })
        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allPageData.zoneArr = modifyZoneArrData(zoneData.zoneList)

                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    _OnSelectZone = (value) => {
        let data = this.state.allPageData.zoneArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.zoneArr = data;
        this.state.allPageData.selectedZoneObj = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }
    _onChangeCity = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.city = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    onSelectLocationData = (val) => {
        this.state.allPageData.locationData = val.value
        this.state.allPageData.locationArr = val.totalData
        // this.state.locationArr = val.totalData;
        // this.state.locationObj = val.value;
        this.setState({ allPageData: this.state.allPageData })
    }

    _onChangePincode = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "number");
        this.state.allPageData.pincode = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeNote = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.notes = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSave = () => {
        let emailId = [];
        this.state.allPageData.businessEmailArr.map((obj) => {
            emailId.push(obj.email)
        })

        let phoneId = [];
        this.state.allPageData.businessPhoneArr.map((obj) => {
            phoneId.push(obj.phone)
        })

        let reqData = {
            "type": this.props.route.params.type,
            "businessType": this.state.allPageData.selectedBusinessTypeObj.name ? this.state.allPageData.selectedBusinessTypeObj.name : "",
            "businessId": this.state.allPageData.selectedBusinessNameObj.id ? this.state.allPageData.selectedBusinessNameObj.id : "",
            "businessName": this.state.allPageData.businessName == "" ? this.state.allPageData.selectedBusinessNameObj.name : this.state.allPageData.businessName,
            "businessAddress": this.state.allPageData.businessAddress ? this.state.allPageData.businessAddress : "",
            "businessEmail": emailId,
            "businessPhone": phoneId,
            "businessPhoneArr": this.props.allPageData.businessPhoneArr,
            "businessEmailArr": this.props.allPageData.businessEmailArr,
            "hierarchyDataId": this.state.allPageData.locationData.hierarchyDataId,
            "hierarchyTypeId": this.state.allPageData.locationData.hierarchyTypeId,
            "locationArr": this.state.allPageData.locationData,
            "stateId": this.state.allPageData.selectedStateObj.id ? this.state.allPageData.selectedStateObj.id : "",
            "districtId": this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id : "",
            "cityVillage": this.state.allPageData.city ? this.state.allPageData.city : "",
            "zoneId": this.state.allPageData.selectedZoneObj.id ? this.state.allPageData.selectedZoneObj.id : "",
            "pincode": this.state.allPageData.pincode ? this.state.allPageData.pincode : "",
            "notes": this.state.allPageData.notes ? this.state.allPageData.notes : "",
            "districtArr": this.state.allPageData.districtArr,
            "zoneArr": this.state.allPageData.zoneArr,
            "countryId": "1"
        }


        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2
            }
            this.props.onSaveDataToParent(data);
        }
    }

    _onBack = () => {

        let data = {
            pageNum: 1,
            type: "previous",
        }
        this.props.onSaveDataToParent(data);
    }

    _onAddEmail = () => {
        let arr = this.state.allPageData.businessEmailArr;
        arr.push({ email: "", emailActive: false });
        this.state.allPageData.businessEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    _onDeleteEmail = (key) => {
        let arr = this.state.allPageData.businessEmailArr;
        arr.splice(key, 1);
        this.state.allPageData.businessEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onAddPhoneNumber = () => {
        let arr = this.state.allPageData.businessPhoneArr;
        arr.push({ phone: "", phoneActive: false });
        this.state.allPageData.businessPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    _onDeletePhoneNumber = (key) => {
        let arr = this.state.allPageData.businessPhoneArr;
        arr.splice(key, 1);
        this.state.allPageData.businessPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Business Details</Text>
                                </View>
                            </View>
                            {this.props.route.params.type == "edit" ? null : <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedBusinessTypeObj.id ? this.state.allPageData.selectedBusinessTypeObj.id.toString() : ""}
                                    data={this.state.allPageData.allBusinessTypeArr}
                                    onSelect={(value) => this._OnSelectBusinessType(value)}
                                    headerText={"Business Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>}


                            {this.state.allPageData.selectedBusinessTypeObj.id == 1 ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedBusinessNameObj.id ? this.state.allPageData.selectedBusinessNameObj.id.toString() : "0"}
                                        data={this.state.allPageData.allBusinessNameArr}
                                        onSelect={(value) => this._OnSelectBusinessName(value)}
                                        headerText={"Organization Name*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                                :
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.businessName}
                                        onChangeText={(value) => this._onChangeBusinessName(value)}
                                        placeholder={"Business Name*"}
                                        keyboardType={"default"}
                                        isActive={this.state.allPageData.businessNameActive}
                                        onFocus={() => { this.state.allPageData.businessNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.businessNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                    />
                                </View>
                            }

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.businessPhoneArr.map((item, key) => (
                                    this.ownerPhoneNumberSection(item, key)
                                ))}
                                {this.state.allPageData.businessPhoneArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.SM }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.businessEmailArr.map((item, key) => (
                                    this.ownerEmailSection(item, key)
                                ))}
                                {this.state.allPageData.businessEmailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.SM }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.businessAddress}
                                    onChangeText={(value) => this._onChangeBusinessAddress(value)}
                                    placeholder={"Address*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.businessAddressActive}
                                    onFocus={() => { this.state.allPageData.businessAddressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.businessAddressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={95}
                                    multiline={true}
                                    alignItems={"flex-start"}
                                // editable={this.state.allPageData.selectedBusinessTypeObj.id == "0" ? true : false}
                                />
                            </View>
                            {/* {this.state.stateLoader ? null : <React.Fragment>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedStateObj.id ? this.state.allPageData.selectedStateObj.id.toString() : "0"}
                                        data={this.state.allPageData.stateArr}
                                        onSelect={(value) => this._OnSelectState(value)}
                                        headerText={"State*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                            </React.Fragment>}
                            {this.state.distLoader ? null : <React.Fragment>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id.toString() : "0"}
                                        data={this.state.allPageData.districtArr}
                                        onSelect={(value) => this._OnSelectDistrict(value)}
                                        headerText={"District*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>

                            </React.Fragment>}

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.city}
                                    onChangeText={(value) => this._onChangeCity(value)}
                                    placeholder={"City/Village"}
                                    keyboardType={"default"}
                                    isActive={this.state.cityActive}
                                    onFocus={() => { this.state.allPageData.cityActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.cityActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>
                            {this.state.zoneLoader ? null : <React.Fragment>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedZoneObj.id ? this.state.allPageData.selectedZoneObj.id.toString() : "0"}
                                        data={this.state.allPageData.zoneArr}
                                        onSelect={(value) => this._OnSelectZone(value)}
                                        headerText={"Zone*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                            </React.Fragment>} */}
                            {this.state.locationLoader ?
                                null :
                                <>
                                    <DynamicLocationMapping
                                        // type={"lastHierarcyField"}
                                        editData={this.props.allPageData.locationArr}
                                        screenName={"Crm"}
                                        marginBottom={15}
                                        flexDirection={"column"}
                                        viewType={"edit"}
                                        isLabelVisible={false}
                                        onApiCallData={(value) => this.onSelectLocationData(value)} />

                                </>
                            }
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.pincode}
                                    onChangeText={(value) => this._onChangePincode(value)}
                                    placeholder={"Pincode"}
                                    keyboardType={"numeric"}
                                    isActive={this.state.allPageData.pincodeActive}
                                    onFocus={() => { this.state.allPageData.pincodeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.pincodeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                    maxLength={6}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.notes}
                                    onChangeText={(value) => this._onChangeNote(value)}
                                    placeholder={"Note"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.notesActive}
                                    onFocus={() => { this.state.allPageData.notesActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.notesActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>



                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={this.props.route.params.type == "edit" ? "Update" : "Submit"}
                                    onPress={() => this._onSave()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default BusinessDetails;