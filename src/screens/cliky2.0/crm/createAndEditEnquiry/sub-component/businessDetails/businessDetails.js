import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyEmailObject, modifyLocationMappedData, modifyOrganizationArrData, modifyPhoneNumberObject, modifyStateArrData, modifyZoneArrData, organizationModifyData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../../pageShared";
import { StorageDataModification, Toaster } from "../../../../../../services/common-view-function";


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
        this.setState({ locationLoader: false })

        return true;
    }
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
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

    onSelectLocationData = (val) => {
        this.state.allPageData.locationData = val.value
        this.state.allPageData.locationArr = val.totalData
        this.setState({ allPageData: this.state.allPageData })
    }

    _onSave = () => {
        let reqData = {
            "hierarchyDataId": this.state.allPageData.locationData.hierarchyDataId,
            "hierarchyTypeId": this.state.allPageData.locationData.hierarchyTypeId,
            "address": this.state.allPageData.address,
            "organizationId": this.state.allPageData.organizationId,
            "newOrg": this.state.allPageData.isNewAccount ? "1" : "0",
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 3
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

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.address = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAccount = async (value) => {
        this.state.allPageData.account = value;
        this.state.allPageData.organizationId = "";

        this.setState({ allPageData: this.state.allPageData });
        if (this.state.allPageData.account.length > 0) {
            this.state.allPageData.accountListLoader = true;
            this.setState({ allPageData: this.state.allPageData });
            let reqData = {
                "searchName": this.state.allPageData.account,
                "isDownload": "0",
                "view": "list",
                "limit": "50",
                "offset": "0",
                "masterMdouleTypeId": "20"
            }
            let responseData = await MiddlewareCheck("fetchOrganizationList", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    if (responseData.response.length > 0) {

                        this.state.allPageData.accountList = organizationModifyData(responseData.response).organizationList;
                        this.state.allPageData.isNewAccount = false;
                        this.setState({ allPageData: this.state.allPageData });
                    } else {
                        this.state.allPageData.isNewAccount = true;
                        this.setState({ allPageData: this.state.allPageData });
                    }
                }
            }
            this.state.allPageData.accountListLoader = false;
            this.setState({ allPageData: this.state.allPageData });
        }
    }

    _onChangeNewAccNumber = (value) => {

        this.state.allPageData.newAccNumber = value;
        this.setState({ allPageData: this.state.allPageData });
    }

    _onAddOrg = async () => {
        this.state.allPageData.organizationLoader = true;
        this.setState({ allPageData: this.state.allPageData });
        let reqData = {
            "organizationName": this.state.allPageData.account,
            "phone": this.state.allPageData.newAccNumber,
            "contactId": this.state.allPageData.contactId,
            "masterMdouleTypeId": "20",
        }
        let responseData = await MiddlewareCheck("createNewOrganization_fromContact", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.selectedOrganization = { "organizationId": responseData.response.insertedOrgId, "organizationName": responseData.response.organizationName }
                this.state.allPageData.organizationId = responseData.response.insertedOrgId
                this.setState({ allPageData: this.state.allPageData });
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.state.allPageData.organizationLoader = false;
        this.setState({ allPageData: this.state.allPageData });
        // }
    }

    _onSelectOrganization = (item, key) => {
        let arr = this.state.allPageData.accountList
        this.state.allPageData.account = item.organizationName;
        this.state.allPageData.selectedOrganization = item;
        this.state.allPageData.organizationId = item.organizationId
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }
        }
        this.state.allPageData.accountList = arr
        this.setState({ allPageData: this.state.allPageData });
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

                            <View style={{ marginTop: 10 }}>
                                {this.state.allPageData.organizationName !== "Default" ?
                                    <TextInputBox
                                        value={this.state.allPageData.organizationName}
                                        onChangeText={(value) => this._onChangeAccount(value)}
                                        placeholder={"Enter Account"}
                                        keyboardType={"default"}
                                        // isActive={this.state.allPageData.firstNameAcive}
                                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        editable={false}

                                    />
                                    :
                                    <TextInputBox
                                        value={this.state.allPageData.account}
                                        onChangeText={(value) => this._onChangeAccount(value)}
                                        placeholder={"Enter Account"}
                                        keyboardType={"default"}
                                        // isActive={this.state.allPageData.firstNameAcive}
                                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        editable={this.props.route.params.type == "edit" ? false : true}

                                    />
                                }
                            </View>
                            {this.state.allPageData.accountListLoader ?
                                <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                :
                                <>

                                    {this.state.allPageData.isNewAccount == true ?
                                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                            <View style={{ flex: 0.7 }}>
                                                <TextInputBox
                                                    value={this.state.allPageData.newAccNumber}
                                                    onChangeText={(value) => this._onChangeNewAccNumber(value)}
                                                    placeholder={"Enter Phone Number"}
                                                    keyboardType={"numeric"}
                                                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                                    // isActive={this.state.allPageData.firstNameAcive}
                                                    // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                                    // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                                    height={45}
                                                />
                                            </View>
                                            <View style={{ flex: 0.3, marginLeft: 15 }}>
                                                {this.state.allPageData.organizationLoader ?
                                                    <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                                    :
                                                    <BigTextButton
                                                        text={"Add Org"}
                                                        onPress={() => this._onAddOrg()}
                                                    />
                                                }
                                            </View>
                                        </View>
                                        :
                                        <View style={{ margin: 10 }}>

                                            <React.Fragment>
                                                {this.state.allPageData.accountList.length > 0 ?
                                                    <View style={{ borderRadius: 10, borderWidth: 0.5, borderColor: Color.COLOR.WHITE.WHITE_SMOKE, backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, maxHeight: 250 }}>
                                                        <ScrollView nestedScrollEnabled>
                                                            {this.state.allPageData.accountList.map((item, key) => (
                                                                <View style={{ marginVertical: 5 }} key={key}>
                                                                    <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: item.check ? Color.COLOR.RED.AMARANTH : Color.COLOR.WHITE.PURE_WHITE }} onPress={() => this._onSelectOrganization(item, key)}>
                                                                        <Text style={{ color: item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.organizationName}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            ))}
                                                        </ScrollView>

                                                    </View>
                                                    :
                                                    null
                                                }
                                            </React.Fragment>


                                        </View>
                                    }
                                </>}

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
                                    {/* } */}
                                </>
                            }
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.address}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Address*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.addressActive}
                                    onFocus={() => { this.state.allPageData.addressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.addressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    multiline={true}
                                    alignItems={"flex-start"}
                                />
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={"Save & Next"}
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