
import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { App_uri } from "../../../../../../services/config";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyEmailObject, modifyPhoneNumberObject, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./funvtion";
import styles from "./style";

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
            customerContactArr: arrData,
            allPageData: {},
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

    _onChangeFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.firstName = newText;
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

    _onSelectContact = async (value) => {
        let data = this.state.allPageData.contactArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allPageData.selectedContactObj = value;
        this.state.allPageData.contactArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.getExistingUser(value);
    }

    _onSelectCustomer = async (value) => {
        let data = this.state.allPageData.customerArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allPageData.selectedCustomerObj = value;
        this.state.allPageData.customerArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.getExistingCustomerUser(value);
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

    getStateData = async (value, userData) => {
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

                this.state.allPageData.selectedPersonalStateObj.id = userData[0].stateId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }

    }

    getDistrictData = async (value, userData) => {
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
                this.state.allPageData.selectedPersonalDistrictObj.id = userData[0].districtId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }

    }

    getZoneData = async (value, userData) => {
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
                this.state.allPageData.selectedPersonalZoneObj.id = userData[0].zoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
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


    phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.phone}
                    onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                    placeholder={"Phone Number*"}
                    keyboardType={"numeric"}
                    isActive={item.phoneActive}
                    onFocus={() => {
                        this.state.allPageData.personalPhoneArr[key].phoneActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.personalPhoneArr[key].phoneActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.personalPhoneArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                />
            </React.Fragment>
        )
    }

    _onAddPhoneNumber = () => {
        let arr = this.state.allPageData.personalPhoneArr;
        arr.push({ phone: "", phoneActive: false });
        this.state.allPageData.personalPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeletePhoneNumber = (key) => {
        let arr = this.state.allPageData.personalPhoneArr;
        arr.splice(key, 1);
        this.state.allPageData.personalPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.email}
                    onChangeText={(value) => this._onChangeEmail(value, key)}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    isActive={item.emailActive}
                    onFocus={() => {
                        this.state.allPageData.personalEmailArr[key].emailActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.personalEmailArr[key].emailActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.personalEmailArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeleteEmail(key)}
                />
            </React.Fragment>
        )
    }

    _onAddEmail = () => {
        let arr = this.state.allPageData.personalEmailArr;
        arr.push({ email: "", emailActive: false });
        this.state.allPageData.personalEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteEmail = (key) => {
        let arr = this.state.allPageData.personalEmailArr;
        arr.splice(key, 1);
        this.state.allPageData.personalEmailArr = arr;
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

    _onSave = () => {
        let emailId = [];
        this.state.allPageData.personalEmailArr.map((obj) => {
            emailId.push(obj.email)
        })

        let phoneId = [];
        this.state.allPageData.personalPhoneArr.map((obj) => {
            phoneId.push(obj.phone)
        })
        let obj = {
            selectedTypeData: this.state.allPageData.selectedContactBusinessType.id ? this.state.allPageData.selectedContactBusinessType.id : "",
            selectedContactCustomer: this.state.allPageData.selectedCustomerContactData.id ? this.state.allPageData.selectedCustomerContactData.id : "",
            contactId: this.state.allPageData.selectedCustomerContactData.id == 2 ? (this.state.allPageData.selectedContactObj.id == undefined || this.state.allPageData.selectedContactObj.id == null ? "" : this.state.allPageData.selectedContactObj.id) : (this.state.allPageData.selectedCustomerObj.id == undefined || this.state.allPageData.selectedCustomerObj.id == null ? "" : this.state.allPageData.selectedCustomerObj.id),
            firstName: this.state.allPageData.firstName ? this.state.allPageData.firstName.replace(/\s/g, "") : "",
            lastName: this.state.allPageData.lastName ? this.state.allPageData.lastName.replace(/\s/g, "") : "",
            phoneNumber: phoneId,
            email: emailId,
            title: this.state.allPageData.designation ? this.state.allPageData.designation.replace(/\s/g, "") : "",
            contactTypeId: this.state.allPageData.selectedContactTypeObj.id ? this.state.allPageData.selectedContactTypeObj.id : "",
            leadSourceType: this.state.allPageData.selectedSourceTypeObj.id ? this.state.allPageData.selectedSourceTypeObj.id : "",
            leadTypeStatus: this.state.allPageData.selectedStatusObj.id ? this.state.allPageData.selectedStatusObj.id : "",
            leadStatus: this.state.allPageData.selectedLeadStageObj.id ? this.state.allPageData.selectedLeadStageObj.id : "",
            leadType: this.state.allPageData.selectedSourceTypeObj.id ? this.state.allPageData.selectedSourceTypeObj.id : "",
            status: "",
            contactType: this.state.allPageData.selectedContactBusinessType.id == 2 ? this.state.allPageData.selectedCustomerContactData.id : "1",
            // assignType: this.state.allPageData.selectedAssigedToCheck,
            assignType: "1",
            assignTo: this.state.allPageData.selectedAssignedUserObj.id ? this.state.allPageData.selectedAssignedUserObj.id : "",
            phoneArr: this.state.allPageData.personalPhoneArr,
            emailArr: this.state.allPageData.personalEmailArr,
            accessId: this.state.allPageData.selectedAssignedUserObj.id ? this.state.allPageData.selectedAssignedUserObj.id : "",
        }

        let validData = validateData(obj, this.props)
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 2,
                data: obj
            }
            this.props.onSaveDataToParent(data);
        }

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
    _onCheckAssiged = (value, key) => {
        let allTypeArr = this.state.allPageData.assignedToArr,
            selectedType = "";
        allTypeArr[key].check = !allTypeArr[key].check;
        for (let i = 0; i < allTypeArr.length; i++) {
            if (i == key) {
                if (value == true) {
                    selectedType = allTypeArr[i].id.toString();
                }
            } else {
                allTypeArr[i].check = false;
            }
        }
        this.state.allPageData.assignedToArr = allTypeArr;
        this.state.allPageData.selectedAssigedToCheck = selectedType;

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

                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Assigned To</Text>
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        {this.state.allPageData.assignedToArr.map((item, key) => (
                            <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                                <CheckBox
                                    type={"tick"}
                                    borderRadius={30}
                                    data={item.check}

                                />
                                <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

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
                        />
                    </>}
                </View>
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

    // onLandingPermissionCheck = (value) => {
    //     let allTypeArr = this.state.allTypeData;
    //     for (let i = 0; i < allTypeArr.length; i++) {
    //         if (allTypeArr[i].id == 1) {
    //             allTypeArr[i].check = true;
    //         } else {
    //             allTypeArr[i].check = false;
    //         }
    //     }

    //     this.state.allTypeData = allTypeArr;
    //     this.setState({ allTypeData: this.state.allTypeData })
    // }

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

                            {this.props.route.params.type == "edit" ? null :
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Contact Business Type</Text>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedContactBusinessType.id ? this.state.allPageData.selectedContactBusinessType.id.toString() : "0"}
                                        data={this.state.allPageData.allTypeData}
                                        onSelect={(value) => this._onSelectContactBusnessType(value)}
                                        headerText={"Select Contact Business Type"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                            }
                            {this.state.allPageData.selectedContactBusinessType.id == 2 ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedCustomerContactData.id ? this.state.allPageData.selectedCustomerContactData.id.toString() : "0"}
                                        data={this.state.customerContactArr}
                                        onSelect={(value) => this._onSelectCustomerContactType(value)}
                                        headerText={"Select Type*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                                :
                                null
                            }

                            {this.state.allPageData.selectedCustomerContactData.id == 2 ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id.toString() : "0"}
                                        data={this.state.allPageData.contactArr}
                                        onSelect={(value) => this._onSelectContact(value)}
                                        headerText={"Select Contact*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        isSearchable={true}
                                    />
                                </View>
                                :
                                null}
                            {this.state.allPageData.selectedCustomerContactData.id == 3 ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedCustomerObj.id ? this.state.allPageData.selectedCustomerObj.id.toString() : "0"}
                                        data={this.state.allPageData.customerArr}
                                        onSelect={(value) => this._onSelectCustomer(value)}
                                        headerText={"Select Customer*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        isSearchable={true}
                                    />
                                </View>
                                :
                                null
                            }

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.firstName}
                                    onChangeText={(value) => this._onChangeFirstName(value)}
                                    placeholder={"First Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.firstNameActive}
                                    onFocus={() => { this.state.allPageData.firstNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.firstNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.lastName}
                                    onChangeText={(value) => this._onChangeLastName(value)}
                                    placeholder={"Last Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.lastNameActive}
                                    onFocus={() => { this.state.allPageData.lastNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.lastNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Phone Number</Text> */}
                                {this.state.allPageData.personalPhoneArr.map((item, key) => (
                                    this.phoneNumberSection(item, key)
                                ))}
                                {this.state.allPageData.personalPhoneArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {this.state.allPageData.personalEmailArr.map((item, key) => (
                                    this.emailSection(item, key)
                                ))}
                                {this.state.allPageData.personalEmailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.designation}
                                    onChangeText={(value) => this._onChangeTitle(value)}
                                    placeholder={"Designation*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.designationActive}
                                    onFocus={() => { this.state.allPageData.designationActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.designationActive = false, this.setState({ allPageData: this.state.allPageData }) }}
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