
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
import { CheckBox, DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { addNewContactValidation, enquirySourceModifyData, modifyContactData, modifyEnquirySourceArrData, modifyEnquiryTypeArrData, validateData } from "./function";
import styles from "./style";
import { Toaster } from "../../../../../../services/common-view-function";
import _debounce from 'lodash/debounce';

class EnquiryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }


    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })

    }

    _OnSelectEnquirySource = (value) => {
        let data = this.state.allPageData.allEnquirySourceArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedEnquirySourceObj = value;
        this.state.allPageData.allEnquirySourceArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _OnSelectEnquiryType = (value) => {
        let data = this.state.allPageData.allEnquiryTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedEnquiryTypeObj = value;
        this.state.allPageData.allEnquiryTypeArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeOwnerFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.ownerFirstName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeOwnerLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.ownerLastName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAddress = (value) => {
        this.state.allPageData.address = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for ph number change
    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.ownerPhoneArr[key].phoneNumber = newText;
        this.state.allPageData.ownerPhoneArr[key].countryCode = "91";
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {

        this.state.allPageData.ownerEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for delete ph number
    _onDeletePhoneNumber = (key) => {
        let arr = this.state.allPageData.ownerPhoneArr;
        arr.splice(key, 1);
        this.state.allPageData.ownerPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for add the email
    _onAddEmail = () => {
        let arr = this.state.allPageData.ownerEmailArr;
        arr.push({ email: "", emailActive: false });
        this.state.allPageData.ownerEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for delete email from array
    _onDeleteEmail = (key) => {
        let arr = this.state.allPageData.ownerEmailArr;
        arr.splice(key, 1);
        this.state.allPageData.ownerEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSave = () => {
        let reqData = {
            "enquerySourceTypeId": this.state.allPageData.selectedEnquiryTypeObj.id ? this.state.allPageData.selectedEnquiryTypeObj.id : "",
            "enquerySourceId": this.state.allPageData.selectedEnquirySourceObj.id ? this.state.allPageData.selectedEnquirySourceObj.id : "",
            "phoneNumber": this.props.allPageData.businessPhoneArr,
            "email": this.props.allPageData.businessEmailArr,
            "ownerFirstName": this.state.allPageData.newContactFirstName,
            "ownerLastName": this.state.allPageData.newContactLastName,
            "selectedContactType": this.state.allPageData.selectedContactTypeObj.id,
            "selectedContact": this.state.allPageData.selectedContactObj,
            "contactId": this.state.allPageData.contactId,
            "contactType": this.state.allPageData.selectedContactTypeObj.id
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2,
            }
            this.props.onSaveDataToParent(data);
        }
    }

    _onChangeFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.firstName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.lastName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let obj = this.state.allPageData;
        obj.businessPhoneArr[key].phoneNumber = value;
        this.setState({ allPageData: obj });
    }

    _onChangeEmail = (value, key) => {
        let obj = this.state.allPageData;
        obj.businessEmailArr[key].email = value;
        this.setState({ allPageData: obj });
    }

    _onAddPhoneNumber = () => {
        let obj = this.state.allPageData;
        obj.businessPhoneArr.push({
            phoneNumber: "",
            phoneActive: false,
            countryCode: "91",
            isPrimary: false,
            selectedPhoneType: {
                id: 3,
                name: "Personal"
            },
            phonetype: "Personal",
        });
        this.state.allPageData = obj
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeletePhoneNumber = (key) => {
        let obj = this.state.allPageData;
        obj.businessPhoneArr.splice(key, 1);
        obj.businessPhoneArr[0].isPrimary = true;
        this.state.allPageData = obj;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    onClickPrimaryItem = (item, key) => {
        let obj = this.state.allPageData;
        for (let i = 0; i < obj.businessPhoneArr.length; i++) {
            if (i == key) {
                obj.businessPhoneArr[i].isPrimary = true
            } else {
                obj.businessPhoneArr[i].isPrimary = false
            }
        }
        this.state.allPageData = obj
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectPhoneType = (val, key) => {
        let obj = this.state.allPageData;
        obj.businessPhoneArr[key].selectedPhoneType = val;
        obj.businessPhoneArr[key].phonetype = val.name
        this.state.allPageData = obj
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onAddEmail = () => {
        let obj = this.state.allPageData;
        obj.businessEmailArr.push({
            email: "",
            emailActive: false,
            selectedEmailType: {
                id: 3,
                name: "Personal"
            },
            emailtype: "Personal",
            isPrimary: false,
        });
        this.state.allPageData = obj;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteEmail = (key) => {
        let obj = this.state.allPageData;
        obj.businessEmailArr.splice(key, 1);
        obj.businessEmailArr[0].isPrimary = true;
        this.state.allPageData = obj;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    onClickEmailPrimaryItem = (item, key) => {
        let obj = this.state.allPageData;
        for (let i = 0; i < obj.businessEmailArr.length; i++) {
            if (i == key) {
                obj.businessEmailArr[i].isPrimary = true
            } else {
                obj.businessEmailArr[i].isPrimary = false
            }
        }
        this.state.allPageData = obj
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectEmailType = (val, key) => {
        let obj = this.state.allPageData;
        obj.businessEmailArr[key].selectedEmailType = val;
        obj.businessEmailArr[key].emailtype = val.name
        this.state.allPageData = obj
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectContactType = (value) => {
        this.state.allPageData.selectedContactTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        this.clearFormData()
    }

    clearFormData = () => {
        this.state.allPageData.searchContactName = ""
        this.state.allPageData.newContactFirstName = ""
        this.state.allPageData.newContactLastName = ""
        this.state.allPageData.selectedContactObj = {}
        this.state.allPageData.contactId = ""
        this.state.allPageData.businessPhoneArr = [{
            phoneNumber: "",
            countryCode: "91",
            isPrimary: true,
            selectedPhoneType: {
                id: 3,
                name: "personal"
            },
            phonetype: "personal",
            phoneActive: false
        }]
        this.state.allPageData.businessEmailArr = [{
            email: "",
            selectedEmailType: {
                id: 3,
                name: "personal"
            },
            emailtype: "personal",
            isPrimary: true,
            emailActive: false
        },
        ]
        this.setState({ allPageData: this.state.allPageData, contactList: [] })
    }

    _onChangeNewContactFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.newContactFirstName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeNewContactLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.newContactLastName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeNewContactPhoneNumber = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.newContactPhoneNumber = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    onSearchContactData = async (value) => {
        await this.debouncedFetchContactData(value)
    }

    debouncedFetchContactData = _debounce(async (value) => {
        await this.onSearchContact(value); // Pass the searchText to fetchData
    }, 400);

    onSearchContact = async (value) => {
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
        this.state.allPageData.searchContactLoader = true;
        this.setState({ allPageData: this.state.allPageData })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyContactData(responseData.response)
                this.state.allPageData.contactList = modData.list;
                this.setState({ allPageData: this.state.allPageData })
            }
        }
        this.state.allPageData.searchContactLoader = false;
        this.setState({ allPageData: this.state.allPageData })

    }

    onGetContactData = async (value) => {
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
        this.state.allPageData.phLoader = true;
        this.setState({ allPageData: this.state.allPageData })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyContactData(responseData.response)
                this.state.allPageData.businessPhoneArr = modData.list[0].phoneNumber
                this.state.allPageData.businessEmailArr = modData.list[0].email
                this.state.allPageData.mainEmail = modData.list[0].mainEmail
                this.setState({ allPageData: this.state.allPageData })
            }
        }
        this.state.allPageData.phLoader = false;
        this.setState({ allPageData: this.state.allPageData })
    }

    _onChangeSearchContactName = async (value) => {
        let trimmedName = value.name.replace(/\s+/g, ' ').trim();
        this.state.allPageData.newContactFirstName = trimmedName.split(" ")[0];
        this.state.allPageData.newContactLastName = trimmedName.split(" ")[1];
        this.state.allPageData.selectedContactObj = value
        this.state.allPageData.contactId = value.id
        this.state.allPageData.organizationName = value.organizationName
        this.state.allPageData.organizationId = value.organizationId
        this.state.allPageData.accountList = []
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.onGetContactData(value.name)
    }


    _onSelectContact = (item, key) => {
        let obj = this.state.allPageData;
        for (let i = 0; i < obj.contactList.length; i++) {
            if (i == key) {
                obj.contactList[i].check = true;
            } else {
                obj.contactList[i].check = false;
            }
        }
        this.state.allPageData.selectedContactObj = item
        this.setState({ allPageData: obj })
    }

    _onAddNewContact = async () => {
        let allData = this.state.allPageData;
        let phone;
        for (let i = 0; i < allData.businessPhoneArr.length; i++) {
            if (allData.businessPhoneArr[i].isPrimary) {
                phone = allData.businessPhoneArr[i].phoneNumber;
            }
        }
        let reqData = {
            "firstName": allData.newContactFirstName,
            "lastName": allData.newContactLastName,
            "phoneNumber": phone,
            "masterMdouleTypeId": "20"
        }
        let validateAddNewContact = addNewContactValidation(reqData)

        if (validateAddNewContact.status) {
            allData.addContactLoader = true;
            this.setState({ allPageData: allData });
            let responseData = await MiddlewareCheck("createNewContactByPhone", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.allPageData.contactId = responseData.response.insertedContactId;
                    this.setState({ allPageData: this.state.allPageData })
                    Toaster.ShortCenterToaster(responseData.message)
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.state.allPageData.addContactLoader = false;
            this.setState({ allPageData: this.state.allPageData });
        }
    }

    phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, height: 45, borderRadius: 10, justifyContent: "center", paddingHorizontal: 10, marginRight: 5 }}>
                        <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.BLACK.PURE_BLACK }}>+{item.countryCode}</Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <TextInputBox
                            value={item.phoneNumber}
                            onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                            placeholder={"Enter Phone Number*"}
                            keyboardType={"numeric"}
                            maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                            // isActive={item.phoneActive}
                            // onFocus={() => {
                            //     this.state.allPageData.businessPhoneArr[key].phoneActive = true;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            // onBlur={() => {
                            //     this.state.allPageData.businessPhoneArr[key].phoneActive = false;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            height={45}
                            returnKeyType={'done'}
                            // isActivityLoader={this.state.checkPhoneLoader ? true : false}
                            // activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                            // activityLoaderSize={"small"}
                            rightIcon={ImageName.DELETE_WITH_RED}
                            isRightIcon={this.state.allPageData.businessPhoneArr.length > 1 ? true : false}
                            onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                            editable={this.state.allPageData.selectedContactTypeObj.id == 1 ? true : false}
                        />
                    </View>

                    <View style={{ marginLeft: 10, flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedPhoneType.id ? item.selectedPhoneType.id.toString() : "0"}
                            data={this.state.allPageData.phoneTypeArr}
                            onSelect={(value) => this._onSelectPhoneType(value, key)}
                            headerText={"PhoneType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                            isDisabled={this.state.allPageData.selectedContactTypeObj.id == 1 ? false : true}
                        />

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => this.onClickPrimaryItem(item, key)}
                            isDisabled={this.state.allPageData.selectedContactTypeObj.id == 1 ? false : true}
                        />
                    </View>
                </View>

            </React.Fragment>
        )
    }

    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 0.65 }}>
                        <TextInputBox
                            value={item.email}
                            onChangeText={(value) => this._onChangeEmail(value, key)}
                            placeholder={"Enter Email Id*"}
                            keyboardType={"email-address"}
                            // isActive={item.emailActive}
                            // onFocus={() => {
                            //     this.state.allPageData.businessEmailArr[key].emailActive = true;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            // onBlur={() => {
                            //     this.state.allPageData.businessEmailArr[key].emailActive = false;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            height={45}
                            returnKeyType={'default'}
                            rightIcon={ImageName.DELETE_WITH_RED}
                            isRightIcon={this.state.allPageData.businessEmailArr.length > 1 ? true : false}
                            onPressRightIcon={() => this._onDeleteEmail(key)}
                            editable={this.state.allPageData.selectedContactTypeObj.id == 1 ? true : false}

                        />
                    </View>
                    <View style={{ marginLeft: 10, flex: 0.35 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedEmailType.id ? item.selectedEmailType.id.toString() : "0"}
                            data={this.state.allPageData.phoneTypeArr}
                            onSelect={(value) => this._onSelectEmailType(value, key)}
                            headerText={"EmailType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                            isDisabled={this.state.allPageData.selectedContactTypeObj.id == 1 ? false : true}

                        />

                    </View>
                    <View style={{ marginLeft: 10, flex: 0.1 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => this.onClickEmailPrimaryItem(item, key)}
                            isDisabled={this.state.allPageData.selectedContactTypeObj.id == 1 ? false : true}

                        />
                    </View>
                </View>

            </React.Fragment>
        )
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

                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Enquiry Details</Text>

                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedContactTypeObj.id ? this.state.allPageData.selectedContactTypeObj.id.toString() : "0"}
                                    data={this.state.allPageData.contactTypeArr}
                                    onSelect={(value) => this._onSelectContactType(value)}
                                    headerText={"Select Contact Type*"}
                                    // selectedText={this.state.selectedContactType.name ? this.state.selectedContactType.name : "Select Contract Type"}
                                    // selectedTextColor={this.state.selectedContactType.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isDisabled={this.props.route.params.type == "edit" ? true : false}
                                />
                            </View>

                            {this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                <>
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.newContactFirstName}
                                            onChangeText={(value) => this._onChangeNewContactFirstName(value)}
                                            placeholder={"Enter New Contact First Name*"}
                                            keyboardType={"default"}
                                            isActive={this.state.allPageData.newContactFirstNameActive}
                                            onFocus={() => { this.state.allPageData.newContactFirstNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.newContactFirstNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.newContactLastName}
                                            onChangeText={(value) => this._onChangeNewContactLastName(value)}
                                            placeholder={"Enter New Contact Last Name*"}
                                            keyboardType={"default"}
                                            isActive={this.state.allPageData.newContactLastNameActive}
                                            onFocus={() => { this.state.allPageData.newContactLastNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.newContactLastNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>
                                    {/* <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.newContactPhoneNumber}
                                            onChangeText={(value) => this._onChangeNewContactPhoneNumber(value)}
                                            placeholder={"Enter Phone Number*"}
                                            keyboardType={"numeric"}
                                            maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                            isActive={this.state.allPageData.newContactPhoneNumberActive}
                                            onFocus={() => { this.state.allPageData.newContactPhoneNumberActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.newContactPhoneNumberActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View> */}
                                </>
                                :
                                <>
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id.toString() : "0"}
                                        data={this.state.allPageData.contactList}
                                        onSelect={(value) => this._onChangeSearchContactName(value)}
                                        headerText={"Select Contact*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        isSearchable={true}
                                        isApiCall={true}
                                        onSearchData={(value) => this.onSearchContactData(value)}
                                        loaderCheck={this.state.allPageData.searchContactLoader}
                                        isDisabled={this.props.route.params.type == "edit" ? true : false}

                                    />
                                </>

                            }

                            <View style={{ marginBottom: 10 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Phone Number</Text> */}
                                {this.state.allPageData.businessPhoneArr.map((item, key) => (
                                    this.phoneNumberSection(item, key)
                                ))}
                                {this.state.allPageData.businessPhoneArr.length > 1 ?
                                    null
                                    :
                                    <>
                                        {this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                                <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                            </View>
                                            : null}
                                    </>
                                }
                            </View>
                            {this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                <View>
                                    {this.state.allPageData.businessEmailArr.map((item, key) => (
                                        this.emailSection(item, key)
                                    ))}
                                    {this.state.allPageData.businessEmailArr.length > 1 ?
                                        null
                                        :
                                        <>
                                            {
                                                this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                                    </View>
                                                    : null
                                            }
                                        </>
                                    }
                                </View>
                                :
                                <>
                                    {this.state.allPageData.mainEmail.length > 0 ?
                                        <View >
                                            {this.state.allPageData.businessEmailArr.map((item, key) => (
                                                this.emailSection(item, key)
                                            ))}
                                            {this.state.allPageData.businessEmailArr.length > 1 ?
                                                null
                                                :
                                                <>
                                                    {this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                                        <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                                            <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                                        </View>
                                                        : null}
                                                </>

                                            }
                                        </View>
                                        : null}

                                </>
                            }
                            {
                                this.state.allPageData.selectedContactTypeObj.id == 1 ?
                                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                                        {this.state.allPageData.addContactLoader ?
                                            <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                                            :
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 0.6 }} />
                                                <View style={{ flex: 0.4 }}>
                                                    <BigTextButton
                                                        text={"Add New Contact"}
                                                        onPress={() => this._onAddNewContact()}
                                                        fontSize={FontSize.XS}
                                                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                                    />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                    : null
                            }

                            < View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedEnquirySourceObj.id ? this.state.allPageData.selectedEnquirySourceObj.id.toString() : "0"}
                                    data={this.state.allPageData.allEnquirySourceArr}
                                    onSelect={(value) => this._OnSelectEnquirySource(value)}
                                    headerText={"Source*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedEnquiryTypeObj.id ? this.state.allPageData.selectedEnquiryTypeObj.id.toString() : "0"}
                                    data={this.state.allPageData.allEnquiryTypeArr}
                                    onSelect={(value) => this._OnSelectEnquiryType(value)}
                                    headerText={"Enquiry Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>


                            <View style={{ marginTop: 20, marginBottom: 40 }}>
                                <BigTextButton
                                    text={"Next"}
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


export default EnquiryDetails;