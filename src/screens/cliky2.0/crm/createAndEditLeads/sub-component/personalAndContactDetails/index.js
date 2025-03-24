
import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { GetUserData, Toaster } from "../../../../../../services/common-view-function";
import { App_uri } from "../../../../../../services/config";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { customerModifyData, modifyEmailObject, modifyPhoneNumberObject, modifyStateArrData, modifyUserData, modifyZoneArrData, orgModifyData, stateModifyData, validateData, zoneModifyData } from "./funvtion";
import styles from "./style";
import _debounce from 'lodash/debounce';

const arrData = [
    {
        id: "2",
        name: "Contact"
    },
    {
        id: "3",
        name: "Customer"
    }
]

class PersonalAndContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            searchableContactLoader: false,
            searchableOrganizationLoader: false,
            searchableUserLoader: false,
            customerContactArr: arrData,
            allPageData: {},
            contactListLoader: false,
            contactLoader: false,
            accountListLoader: false,
            isNewAccount: false,
            isNewOrgAccount: false,
            organizationLoader: false,
            organizationArr: [],
            customerArr: []

        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onChangeLeadName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.leadName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLeadStageRemark = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.leadStageRemark = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.lastName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.personalPhoneArr[key].phone = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        this.state.allPageData.personalEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeTitle = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.designation = newText;

        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectContact = async (value, index) => {
        let data = this.state.customerArr;
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                data[i].check = true;
            } else {
                data[i].check = false;
            }
        }

        this.state.allPageData.selectedCustomerObj = value;
        this.state.allPageData.contactId = value.id;
        this.state.customerArr = data;
        this.state.allPageData.contact = value.name
        this.state.allPageData.organizationName = value.organizationName
        this.state.allPageData.organizationId = value.organizationName == "Default" ? "" : value.organizationId
        this.state.allPageData.organization = ""
        this.state.organizationArr = []

        this.setState({
            customerArr: this.state.customerArr,
            allPageData: this.state.allPageData
        })
        // await this.getExistingUser(value);
    }

    _onSelectOrganization = async (value, index) => {
        let data = this.state.organizationArr;
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                data[i].check = true;
            } else {
                data[i].check = false;
            }
        }

        this.state.allPageData.selectedOrganizationObj = value;
        this.state.allPageData.organizationId = value.id;
        this.state.organizationArr = data;
        this.state.allPageData.organization = value.name
        // this.state.allPageData.organizationName = value.name

        this.setState({
            organizationArr: this.state.organizationArr,
            allPageData: this.state.allPageData
        })
    }

    getExistingCustomerUser = async (value) => {
        let reqData = {
            customerId: value.id
        }
        this.setState({ pageloader: true })
        let responseData = await MiddlewareCheck("getDetailsNewRegCustomer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userData = responseData.response;
                // this.state.allPageData.editable = false;
                this.state.allPageData.firstName = userData[0].firstName.split(" ")[0];
                this.state.allPageData.lastName = userData[0].firstName.split(" ")[1];


                if (userData[0].phoneNumber && (userData[0].phoneNumber != undefined || userData[0].phoneNumber != null)) {
                    let phArr = userData[0].phoneNumber.split(",");
                    this.state.allPageData.personalPhoneArr = modifyPhoneNumberObject(phArr)
                }

                if (userData[0].email && (userData[0].email != undefined || userData[0].email != null)) {
                    let emailArr = userData[0].email.split(",");
                    this.state.allPageData.personalEmailArr = modifyEmailObject(emailArr)
                }

                this.state.allPageData.designation = userData[0].designationName;
                this.state.allPageData.selectedContactTypeObj.id = userData[0].contactTypeId;
                this.state.allPageData.selectedStatusObj.id = userData[0].custStatus;
                this.state.allPageData.personalAddress = userData[0].hmName;
                this.state.allPageData.mainDescription = userData[0].description == null || userData[0].description == undefined ? "" : userData[0].description;
                this.state.allPageData.imageUrl = App_uri.IMAGE_URI + userData[0].profilePic;



            }
        }
        this.setState({ pageloader: false })
    }

    getExistingUser = async (value) => {

        let reqData = {
            contactId: value.id
        }
        this.setState({ pageloader: true })

        let responseData = await MiddlewareCheck("getUserDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userData = responseData.response;

                this.state.allPageData.editable = false;
                this.state.allPageData.firstName = userData[0].firstName;
                this.state.allPageData.lastName = userData[0].lastName;

                if (userData[0].phoneNumber && (userData[0].phoneNumber != undefined || userData[0].phoneNumber != null)) {
                    let phArr = userData[0].phoneNumber.split(",");
                    this.state.allPageData.personalPhoneArr = modifyPhoneNumberObject(phArr)
                }

                if (userData[0].email && (userData[0].email != undefined || userData[0].email != null)) {
                    let emailArr = userData[0].email.split(",");
                    this.state.allPageData.personalEmailArr = modifyEmailObject(emailArr)
                }

                this.state.allPageData.designation = userData[0].title;

                this.state.allPageData.selectedContactTypeObj.id = userData[0].contactTypeId;
                this.state.allPageData.selectedStatusObj.id = userData[0].status;
                this.state.allPageData.personalAddress = userData[0].address;
                this.state.allPageData.selectedPersonalCountryObj.id = userData[0].countryId;
                await this.getStateData(userData[0].countryId, userData);
                await this.getDistrictData(userData[0].stateId, userData);
                await this.getZoneData(userData[0].districtId, userData);
                this.state.allPageData.mainDescription = userData[0].description;
                this.state.allPageData.imageUrl = App_uri.IMAGE_URI + userData[0].profilePic;

                this.setState({
                    allPageData: this.state.allPageData,

                })
            } else {
                Toaster.ShortCenterToaster("Internal Server Error");
            }
        }
        this.setState({ pageloader: false })
    }


    _onSelectContactType = (value) => {
        let data = this.state.allPageData.contactTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedContactTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectStatus = (value) => {
        let data = this.state.allStatus;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedStatus: value,
            allStatus: data,
        })
    }

    _onSelectLeadStatus = (value) => {
        let data = this.state.allPageData.leadStatusArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.leadStatusArr = data;
        this.state.allPageData.selectedStatusObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectLeadSourceType = (value) => {
        let data = this.state.allPageData.leadSourceTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.leadSourceTypeArr = data;
        this.state.allPageData.selectedSourceTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectLeadStage = (value) => {
        let data = this.state.allPageData.leadStageArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedLeadStageObj = value
        this.state.allPageData.probability = value.percentage.toString()
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onSelectAssignedUser = (value) => {
        let data = this.state.allPageData.assignedUserArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedAssignedUserObj = value
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    clearData = () => {
        this.state.allPageData.selectedContactObj = {};
        this.state.allPageData.firstName = "";
        this.state.allPageData.lastName = "";
        this.state.allPageData.personalPhoneArr = [{ phone: "", phoneActive: false }];
        this.state.allPageData.personalEmailArr = [
            { email: "", emailActive: false },
        ];
        this.state.allPageData.designation = "";
        this.state.allPageData.selectedContactTypeObj = {};
        this.state.allPageData.selectedSourceTypeObj = {};
        this.state.allPageData.selectedStatusObj = {};
        this.state.allPageData.selectedLeadStageObj = {};
        this.state.allPageData.selectedAssignedUserObj = {};

        this.state.allPageData.personalAddress = "";
        this.state.allPageData.selectedPersonalCountryObj = {};
        this.state.allPageData.selectedPersonalStateObj = {};
        this.state.allPageData.selectedPersonalDistrictObj = {};
        this.state.allPageData.selectedPersonalZoneObj = {};

        this.state.allPageData.mainDescription = "";

        this.state.allPageData.imageUrl = "";

    }

    _onSave = async () => {
        let userData = await GetUserData.getUserData()
        let obj = {
            contactType: this.state.isNewAccount ? 1 : 2,
            newOrg: this.state.isNewOrgAccount ? 1 : 2,
            newContact: this.state.isNewAccount ? 1 : 2,
            contactId: this.state.allPageData.contactId ? this.state.allPageData.contactId : "",
            accountId: this.state.allPageData.organizationId ? this.state.allPageData.organizationId : "",
            orgName: this.state.allPageData.organizationName,

            leadName: this.state.allPageData.leadName ? this.state.allPageData.leadName : "",
            leadType: this.state.allPageData.selectedContactTypeObj.id ? this.state.allPageData.selectedContactTypeObj.id : "",
            leadSourceType: this.state.allPageData.selectedSourceTypeObj.id ? this.state.allPageData.selectedSourceTypeObj.id : "",
            leadStatus: this.state.allPageData.selectedStatusObj.id ? this.state.allPageData.selectedStatusObj.id : "",
            leadStage: this.state.allPageData.selectedLeadStageObj.id ? this.state.allPageData.selectedLeadStageObj.id : "",
            leadStageRemarks: this.state.allPageData.leadStageRemark,
            leadOwner: this.state.allPageData.selectedSelfSubordinate == 1 ? userData.userId : this.state.allPageData.selectedAssignedUserObj.id,
        }
        let validData = validateData(obj, this.props)
        // if (validData.status) {
        //     let data = {
        //         type: "next",
        //         pageNum: 2,
        //         data: obj
        //     }
        //     this.props.onSaveDataToParent(data);
        // }

    }

    _addAnother = () => {
        let obj = {
            selectedProductName: {},
            productDesc: "",
            productDescActive: false,
            currentlyUsing: ""
        }
        let arr = this.state.allLeadProductData;
        arr.push(obj);
        this.state.allLeadProductData = arr;
        this.setState({
            allLeadProductData: this.state.allLeadProductData
        })
    }

    _onDeleteArray = (key) => {
        let arr = this.state.allLeadProductData;
        arr.splice(key, 1);
        this.state.allLeadProductData = arr;
        this.setState({
            allLeadProductData: this.state.allLeadProductData
        })
    }

    //  for status check
    onClickItem = (value, key) => {
        let allTypeArr = this.state.allPageData.selfSubordinate,
            selectedType = "";
        for (let i = 0; i < allTypeArr.length; i++) {
            if (i == key) {
                allTypeArr[i].check = true;
            } else {
                allTypeArr[i].check = false;
            }
        }
        this.state.allPageData.selfSubordinate = allTypeArr;
        this.state.allPageData.selectedSelfSubordinate = value.id;
        this.state.allPageData.selectedAssignedUserObj = {}
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _leadSection = () => {
        return (
            <View>

                <View style={{ marginBottom: 15 }}>
                    <View style={{ height: 10 }} />
                    <DropdownInputBox
                        selectedValue={this.state.allPageData.selectedStatusObj.id ? this.state.allPageData.selectedStatusObj.id.toString() : "0"}
                        data={this.state.allPageData.leadStatusArr}
                        onSelect={(value) => this._onSelectLeadStatus(value)}
                        headerText={"Lead Status*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                </View>


                <View style={{ marginBottom: 15 }}>
                    <View style={{ height: 10 }} />
                    {this.state.allPageData.sourceLoader ? null : <>
                        <DropdownInputBox
                            selectedValue={this.state.allPageData.selectedSourceTypeObj.id ? this.state.allPageData.selectedSourceTypeObj.id.toString() : "0"}
                            data={this.state.allPageData.leadSourceTypeArr}
                            onSelect={(value) => this._onSelectLeadSourceType(value)}
                            headerText={"Lead Source Type*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                    </>}

                </View>
                <View style={{ marginBottom: 20, }}>
                    <View style={{ height: 10 }} />
                    <DropdownInputBox
                        selectedValue={this.state.allPageData.selectedLeadStageObj.id ? this.state.allPageData.selectedLeadStageObj.id.toString() : "0"}
                        data={this.state.allPageData.leadStageArr}
                        onSelect={(value) => this._onSelectLeadStage(value)}
                        headerText={"Lead Stage*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                </View>
                <View style={{ marginBottom: 20, }}>
                    <View style={{ height: 10 }} />
                    <TextInputBox
                        value={this.state.allPageData.leadStageRemark}
                        onChangeText={(value) => this._onChangeLeadStageRemark(value)}
                        placeholder={"Lead Stage Remarks*"}
                        keyboardType={"default"}
                        isActive={this.state.allPageData.leadStageRemarkActive}
                        onFocus={() => { this.state.allPageData.leadStageRemarkActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                        onBlur={() => { this.state.allPageData.leadStageRemarkActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                        height={90}
                        alignItems={"flex-start"}
                        multiline={true}

                    />
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Lead Owner</Text>
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        {this.state.allPageData.selfSubordinate.map((item, key) => (
                            <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                                <CheckBox
                                    type={"tick"}
                                    borderRadius={30}
                                    data={item.check}
                                    onClickValue={() => this.onClickItem(item, key)}

                                />
                                <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {this.state.allPageData.selectedSelfSubordinate == 1 ? null :
                    <View style={{ marginBottom: 20, }}>
                        <View style={{ height: 10 }} />
                        {this.state.allPageData.userLoader ? null : <>
                            <DropdownInputBox
                                selectedValue={this.state.allPageData.selectedAssignedUserObj.id ? this.state.allPageData.selectedAssignedUserObj.id.toString() : "0"}
                                data={this.state.allPageData.assignedUserArr}
                                onSelect={(value) => this._onSelectAssignedUser(value)}
                                headerText={"Select User*"}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isSearchable={true}
                                isApiCall={true}
                                onSearchData={(value) => this.onSearchUserData(value)}
                                loaderCheck={this.state.searchableUserLoader}

                            />
                        </>}
                    </View>
                }
            </View>
        )
    }

    checkBoxItem = (item, key) => {
        return (
            <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                <CheckBox
                    type={"round"}
                    borderRadius={30}
                    data={item.check}
                    onClickValue={(value) => this._onCheckPermission(value, key)}
                />
                <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
            </View>
        )
    }

    _onSelectContactBusnessType = (value) => {
        this.clearData();
        this.state.allPageData.selectedContactBusinessType = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }

    _onSelectCustomerContactType = (value) => {
        this.clearData();
        this.state.allPageData.selectedCustomerContactData = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }


    //  for status check
    _onCheckPermission = (value, key) => {
        let allTypeArr = this.state.allTypeData,
            selectedType = "";

        allTypeArr[key].check = true;
        for (let i = 0; i < allTypeArr.length; i++) {
            if (i == key) {
                if (value == true) {
                    selectedType = allTypeArr[i].id.toString();
                }
            } else {
                allTypeArr[i].check = false;
            }
        }
        // }
        this.state.allPageData.selectedTypeData = selectedType;

        this.setState({
            allTypeData: allTypeArr,
            // selectedTypeData: selectedType
            allPageData: this.state.allPageData
        })
        this.clearData();
    }

    //=====================================
    onSearchContactData = async (value) => {
        await this.debouncedFetchContactData(value)
    }

    debouncedFetchContactData = _debounce(async (value) => {
        await this.onSearchContact(value); // Pass the searchText to fetchData
    }, 400);

    onSearchContact = async (value) => {
        this.setState({ searchableContactLoader: true })
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": value,
            "searchTextName": "",
            "searchTextPhone": "",
            "searchTextEmail": "",
            "searchContactTyp": "",
            "searchContactStatus": "",
            "searchFrom": "",
            "searchTo": "",
            "hierarchyDataIdArr": [],
            "view": "list",
            "isDownload": "0",
            "masterMdouleTypeId": "20"
        }
        this.setState({ customerLoader: false })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactData = customerModifyData(responseData.response);

                this.state.customerArr = contactData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }

        this.setState({ searchableContactLoader: false })

    }

    onSearchOrganizationData = async (value) => {
        await this.debouncedFetchOrganizationData(value)
    }

    debouncedFetchOrganizationData = _debounce(async (value) => {
        await this.onSearchOrganization(value); // Pass the searchText to fetchData
    }, 400);

    onSearchOrganization = async (value) => {
        this.setState({ searchableOrganizationLoader: true })
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": value,
            "searchFrom": "",
            "searchTo": "",
            "searchTextOrgName": "",
            "searchTextOwnerName": "",
            "searchTextContactType": "",
            "searchTextState": "",
            "searchTextPhone": "",
            "status": "",
            "isDownload": "0",
            "view": "list",
            "masterMdouleTypeId": "20"
        }
        this.setState({ customerLoader: false })
        let responseData = await MiddlewareCheck("fetchOrganizationList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let orgData = orgModifyData(responseData.response);

                this.state.allPageData.organizationArr = orgData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }

        this.setState({ searchableOrganizationLoader: false })
    }

    onSearchUserData = async (value) => {
        await this.debouncedFetchUserData(value)
    }
    debouncedFetchUserData = _debounce(async (value) => {
        await this.onSearchUser(value); // Pass the searchText to fetchData
    }, 400);

    onSearchUser = async (value) => {
        this.setState({ searchableUserLoader: true })
        let reqData = {
            "searchName": value,
            "masterMdouleTypeId": "20",
        }
        let responseData = await MiddlewareCheck("getAllSubordinatesOfUser", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let orgData = modifyUserData(responseData.response);

                this.state.allPageData.assignedUserArr = orgData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }

        this.setState({ searchableUserLoader: false })

    }
    _onChangeOrganization = async (value) => {
        this.state.allPageData.organizationId = "";
        this.state.allPageData.organization = value;
        this.state.allPageData.newOrgAccNumber = ""
        this.setState({ allPageData: this.state.allPageData });
        // if (this.state.contactDetails.account.length > 0) {
        this.setState({ accountListLoader: true });
        let reqData = {
            "searchName": this.state.allPageData.organization,
            "isDownload": "0",
            "limit": "50",
            "offset": "0",
            "searchFrom": "",
            "searchTo": "",
            "searchTextOrgName": "",
            "searchTextOwnerName": "",
            "searchTextContactType": "",
            "searchTextState": "",
            "searchTextPhone": "",
            "status": "",
            "view": "list",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchOrganizationList", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response.length > 0) {
                    this.state.organizationArr = orgModifyData(responseData.response)
                    this.setState({ isNewOrgAccount: false, organizationArr: this.state.organizationArr });
                } else {
                    this.setState({ isNewOrgAccount: true });
                }
            }
        }
        this.setState({ accountListLoader: false });
    }

    //-==================================
    _onChangeContact = async (value) => {
        this.state.allPageData.contactId = "";
        this.state.allPageData.contact = value;
        this.setState({ allPageData: this.state.allPageData });
        // if (this.state.contactDetails.account.length > 0) {
        this.setState({ contactListLoader: true });
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": this.state.allPageData.contact,
            "searchTextName": "",
            "searchTextPhone": "",
            "searchTextEmail": "",
            "searchContactTyp": "",
            "searchContactStatus": "",
            "searchFrom": "",
            "searchTo": "",
            "hierarchyDataIdArr": [],
            "view": "list",
            "isDownload": "0",
            "masterMdouleTypeId": "20"
        }
        this.setState({ customerLoader: false })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response.length > 0) {
                    let contactData = customerModifyData(responseData.response);
                    this.state.isNewAccount = false
                    this.state.customerArr = contactData;
                    this.setState({ customerArr: this.state.customerArr })
                } else {
                    this.state.isNewAccount = true
                }
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({ contactListLoader: false });
        // }
    }

    _onChangeNewContactAccNumber = (value) => {
        this.state.allPageData.newContactAccNumber = value;
        this.setState({ allPageData: this.state.allPageData });
    }

    _onChangeNewOrgAccNumber = (value) => {
        this.state.allPageData.newOrgAccNumber = value;
        this.setState({ allPageData: this.state.allPageData });
    }

    _onAddContact = async () => {
        if (this.state.allPageData.contact.length == 0 || this.state.allPageData.contact == null || this.state.allPageData.contact == undefined) {
            Toaster.ShortCenterToaster("Please enter Contact !");
        } else if (this.state.allPageData.newContactAccNumber.length == 0 || this.state.allPageData.newContactAccNumber == null || this.state.allPageData.newContactAccNumber == undefined) {
            Toaster.ShortCenterToaster("Please enter Phone Number !");
        } else {
            this.setState({ contactLoader: true });
            let trimmedName = this.state.allPageData.contact.replace(/\s+/g, ' ').trim();
            let reqData = {
                "contactType": this.state.allPageData.isNewAccount ? 1 : 2,
                "firstName": trimmedName.split(" ")[0],
                "lastName": trimmedName.split(" ")[1],
                "phoneNumber": this.state.allPageData.newContactAccNumber,
                "masterMdouleTypeId": "20"
            }
            let responseData = await MiddlewareCheck("createNewContactByPhone", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.allPageData.contactId = responseData.response.insertedContactId
                    this.state.allPageData.selectedCustomerObj = { "id": responseData.response.insertedContactId, "name": this.state.allPageData.contact }
                    Toaster.ShortCenterToaster(responseData.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                    this.state.allPageData.contactId = ""
                    this.state.allPageData.selectedCustomerObj = {}
                    this.state.allPageData.newContactAccNumber = ""


                }
                this.setState({ allPageData: this.state.allPageData })
            }
            this.setState({ contactLoader: false });
        }
    }

    _onAddOrg = async () => {
        this.setState({ organizationLoader: true });
        let reqData = {
            "organizationName": this.state.allPageData.organization,
            "phone": this.state.allPageData.newOrgAccNumber,
            "contactId": this.state.allPageData.contactId,
            "masterMdouleTypeId": "20",
        }
        let responseData = await MiddlewareCheck("createNewOrganization_fromContact", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // this.state.allPageData.selectedOrganization = { "organizationId": responseData.response.insertedOrgId, "organizationName": responseData.response.organizationName }
                this.state.allPageData.organizationId = responseData.response.insertedOrgId
                this.state.allPageData.organizationName = responseData.response.organizationName
                this.state.allPageData.newOrgAccNumber = ""
                this.state.isNewOrgAccount = false
                this.setState({ allPageData: this.state.allPageData });
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.setState({ allPageData: this.state.allPageData, organizationLoader: false });
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
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.container}>

                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Personal & Contact Details</Text>

                                </View>
                            </View>

                            <View style={{}}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.contact}
                                    onChangeText={(value) => this._onChangeContact(value)}
                                    placeholder={"Search Contact*"}
                                    keyboardType={"default"}
                                    // isActive={this.state.allPageData.firstNameAcive}
                                    // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                    editable={this.props.route.params.type == "edit" ? false : true}
                                />
                            </View>
                            {this.state.contactListLoader ?
                                <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                :
                                <>
                                    {this.state.isNewAccount ?
                                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ flex: 1, marginVertical: 10 }}>
                                                <TextInputBox
                                                    value={this.state.allPageData.newContactAccNumber}
                                                    onChangeText={(value) => this._onChangeNewContactAccNumber(value)}
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
                                                {this.state.contactLoader ?
                                                    <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                                    :
                                                    <TouchableOpacity onPress={() => this._onAddContact()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 5, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: "center" }}>Add Contact</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                        :
                                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                                            <React.Fragment>
                                                {this.state.customerArr.length > 0 ?
                                                    <View style={{ borderRadius: 10, borderWidth: 0.5, borderColor: Color.COLOR.WHITE.WHITE_SMOKE, backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, maxHeight: 150 }}>
                                                        <ScrollView nestedScrollEnabled>
                                                            {this.state.customerArr.map((item, key) => (
                                                                <View style={{ marginVertical: 5 }} key={key}>
                                                                    <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: !item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.RED.AMARANTH }} onPress={() => this._onSelectContact(item, key)}>
                                                                        <Text style={{ color: item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.name}</Text>
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

                            <View style={{}}>
                                {/* <View style={{ height: 10 }} /> */}
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
                                        value={this.state.allPageData.organization}
                                        onChangeText={(value) => this._onChangeOrganization(value)}
                                        placeholder={"Search Account*"}
                                        keyboardType={"default"}
                                        // isActive={this.state.allPageData.firstNameAcive}
                                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        editable={this.props.route.params.type == "edit" ? false : true}

                                    />
                                }
                            </View>
                            {this.state.accountListLoader ?
                                <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                :
                                <>
                                    {this.state.isNewOrgAccount == true ?
                                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                            <View style={{ flex: 0.7 }}>
                                                <TextInputBox
                                                    value={this.state.allPageData.newOrgAccNumber}
                                                    onChangeText={(value) => this._onChangeNewOrgAccNumber(value)}
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
                                                {this.state.organizationLoader ?
                                                    <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                                    :
                                                    <TouchableOpacity onPress={() => this._onAddOrg()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 5, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: "center" }}>Add Org</Text>
                                                    </TouchableOpacity>

                                                }
                                            </View>
                                        </View>
                                        :
                                        <View style={{ marginTop: 10, marginBottom: 10 }}>

                                            <React.Fragment>
                                                {this.state.organizationArr.length > 0 ?
                                                    <View style={{ borderRadius: 10, borderWidth: 0.5, borderColor: Color.COLOR.WHITE.WHITE_SMOKE, backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, maxHeight: 150 }}>
                                                        <ScrollView nestedScrollEnabled>
                                                            {this.state.organizationArr.map((item, key) => (
                                                                <View style={{ marginVertical: 5 }} key={key}>
                                                                    <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: item.check ? Color.COLOR.RED.AMARANTH : Color.COLOR.WHITE.PURE_WHITE }} onPress={() => this._onSelectOrganization(item, key)}>
                                                                        <Text style={{ color: item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.name}</Text>
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

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.leadName}
                                    onChangeText={(value) => this._onChangeLeadName(value)}
                                    placeholder={"Lead Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.leadNameActive}
                                    onFocus={() => { this.state.allPageData.leadNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.leadNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.contactTypeLoader ? null : <>
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedContactTypeObj.id ? this.state.allPageData.selectedContactTypeObj.id.toString() : "0"}
                                        data={this.state.allPageData.contactTypeArr}
                                        onSelect={(value) => this._onSelectContactType(value)}
                                        headerText={"Select Contact Type*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </>}

                            </View>

                            {this._leadSection()}

                            <View style={{ marginTop: 20, marginBottom: 40 }}>
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

export default PersonalAndContactDetails;