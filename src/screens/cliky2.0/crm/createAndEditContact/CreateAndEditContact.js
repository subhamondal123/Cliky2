import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CustomStyle } from "../../../style";
import { MiddlewareCheck } from "../../../../services/middleware";
import { CommonData, ErrorCode, LengthValidate } from "../../../../services/constant";
import { modifyAllContactBusinessTypeData, modifyLandingData, modifyLocationMappedData, modifyResp, onAddOrgValidation, onSaveApiCall, onSaveValidation } from "./Function";
import { BigTextButton, CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../shared";
import { StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { DynamicLocationMapping } from "../../../../pageShared";

const phoneTypeArray = [
    {
        id: 1,
        name: "business"
    }, {
        id: 2,
        name: "work"
    }, {
        id: 3,
        name: "personal"
    }, {
        id: 4,
        name: "home"
    }, {
        id: 5,
        name: "others"
    },
]

class CreateAndEditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            contactDetails: {
                firstName: "",
                lastName: "",
                title: "",
                account: "",
                newAccNumber: "",
            },
            businessPhoneArr: [{
                phoneNumber: "",
                countryCode: "91",
                isPrimary: true,
                selectedPhoneType: {
                    id: 3,
                    name: "Personal"
                },
                phonetype: "Personal",
                phoneActive: false
            }],
            businessEmailArr: [{
                email: "",
                selectedEmailType: {
                    id: 3,
                    name: "Personal"
                },
                emailtype: "Personal",
                isPrimary: true,
                emailActive: false
            },
            ],
            phoneTypeArr: phoneTypeArray,
            isNewAccount: false,
            contactList: [],
            selectedOrganization: {},
            contactLoader: false,
            accountListLoader: false,
            organizationLoader: false,
            locationArr: [],
            locationArrData: [],
            locationData: {},
            locationLoader: false,
        };
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getContactDetails();
            await this._getHierarchyTypesSlNo();

        }
        this.setState({
            pageLoader: false
        })
    }

    _getHierarchyTypesSlNo = async () => {
        let mappedData = await StorageDataModification.mappedLocationData({}, "get");

        this.setState({ locationLoader: true })
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

    getHierarcyTypeIdAndDataId = (data) => {
        if (data.length > 0) {
            const result = data.reduce((acc, curr) => {
                if (!acc || curr.slNo > acc.slNo) {
                    return curr;
                } else {
                    return acc;
                }
            }, null);
            return result
        }
    }

    getContactDetails = async () => {
        let reqData = {
            "contactId": this.props.route.params.data.contactId
        }
        let responseData = await MiddlewareCheck("fetchNewContactDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response);
                this.state.contactDetails.firstName = modifiedApiResponse.firstName
                this.state.contactDetails.lastName = modifiedApiResponse.lastName
                this.state.contactDetails.title = modifiedApiResponse.title
                this.state.businessPhoneArr = modifiedApiResponse.phoneNumber
                this.state.businessEmailArr = modifiedApiResponse.emailArr
                this.state.locationArr = modifiedApiResponse.location
                this.state.locationData = { "hierarchyTypeId": this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).typeId, "hierarchyDataId": this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).id }
                this.state.contactDetails.account = modifiedApiResponse.accounts.length > 0 ? modifiedApiResponse.accounts[0].organizationName : ""
                this.state.selectedOrganization = { "organizationId": modifiedApiResponse.organizationId, "organizationName": modifiedApiResponse.organizationName }
            }
        }

    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    _onChangeFirstName = (value) => {
        this.state.contactDetails.firstName = value;
        this.setState({ contactDetails: this.state.contactDetails });
    }

    _onChangeLastName = (value) => {
        this.state.contactDetails.lastName = value;
        this.setState({ contactDetails: this.state.contactDetails });
    }

    _onChangeTitle = (value) => {
        this.state.contactDetails.title = value;
        this.setState({ contactDetails: this.state.contactDetails });
    }

    _onChangePhoneNumber = (value, key) => {
        let arr = this.state.businessPhoneArr;
        arr[key].phoneNumber = value;
        this.setState({ businessPhoneArr: arr });
    }

    _onChangeEmail = (value, key) => {
        let arr = this.state.businessEmailArr;
        arr[key].email = value;
        this.setState({ businessEmailArr: arr });
    }

    _onChangeAccount = async (value) => {
        this.state.contactDetails.account = value;
        this.setState({ contactDetails: this.state.contactDetails });
        // if (this.state.contactDetails.account.length > 0) {
        this.setState({ accountListLoader: true });
        let reqData = {
            "searchName": this.state.contactDetails.account,
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
                    this.setState({ isNewAccount: false, contactList: responseData.response });
                } else {
                    this.setState({ isNewAccount: true });
                }
            }
        }
        this.setState({ accountListLoader: false });
        // }
    }

    _onChangeNewAccNumber = (value) => {
        this.state.contactDetails.newAccNumber = value;
        this.setState({ contactDetails: this.state.contactDetails });
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
                            isRightIcon={this.state.businessPhoneArr.length > 1 ? true : false}
                            onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                        />
                    </View>

                    <View style={{ marginLeft: 10, flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedPhoneType.id ? item.selectedPhoneType.id.toString() : "0"}
                            data={this.state.phoneTypeArr}
                            onSelect={(value) => this._onSelectPhoneType(value, key)}
                            headerText={"PhoneType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                        />

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => this.onClickPrimaryItem(item, key)}

                        />
                    </View>
                </View>

            </React.Fragment>
        )
    }

    _onAddPhoneNumber = () => {
        let arr = this.state.businessPhoneArr;
        arr.push({
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
        this.state.businessPhoneArr = arr
        this.setState({
            businessPhoneArr: this.state.businessPhoneArr
        })
    }

    _onDeletePhoneNumber = (key) => {
        let arr = this.state.businessPhoneArr;
        arr.splice(key, 1);
        arr[0].isPrimary = true;
        this.state.businessPhoneArr = arr;
        this.setState({
            businessPhoneArr: this.state.businessPhoneArr
        })
    }

    onClickPrimaryItem = (item, key) => {
        let arr = this.state.businessPhoneArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].isPrimary = true
            } else {
                arr[i].isPrimary = false
            }
        }
        this.state.businessPhoneArr = arr
        this.setState({
            businessPhoneArr: this.state.businessPhoneArr
        })
    }

    _onSelectPhoneType = (val, key) => {
        let arr = this.state.businessPhoneArr;
        arr[key].selectedPhoneType = val;
        arr[key].phonetype = val.name
        this.state.businessPhoneArr = arr
        this.setState({
            businessPhoneArr: this.state.businessPhoneArr
        })
    }


    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 0.7 }}>
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
                            isRightIcon={this.state.businessEmailArr.length > 1 ? true : false}
                            onPressRightIcon={() => this._onDeleteEmail(key)}
                        />
                    </View>
                    <View style={{ marginLeft: 10, flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedEmailType.id ? item.selectedEmailType.id.toString() : "0"}
                            data={this.state.phoneTypeArr}
                            onSelect={(value) => this._onSelectEmailType(value, key)}
                            headerText={"EmailType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                        />

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => this.onClickEmailPrimaryItem(item, key)}

                        />
                    </View>
                </View>

            </React.Fragment>
        )
    }

    _onAddEmail = () => {
        let arr = this.state.businessEmailArr;
        arr.push({
            email: "",
            emailActive: false,
            selectedEmailType: {
                id: 3,
                name: "Personal"
            },
            emailtype: "Personal",
            isPrimary: false,
        });
        this.state.businessEmailArr = arr;
        this.setState({
            businessEmailArr: this.state.businessEmailArr
        })
    }

    _onDeleteEmail = (key) => {
        let arr = this.state.businessEmailArr;
        arr.splice(key, 1);
        arr[0].isPrimary = true;
        this.state.businessEmailArr = arr;
        this.setState({
            businessEmailArr: this.state.businessEmailArr
        })
    }

    onClickEmailPrimaryItem = (item, key) => {
        let arr = this.state.businessEmailArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].isPrimary = true
            } else {
                arr[i].isPrimary = false
            }
        }
        this.state.businessEmailArr = arr
        this.setState({
            businessEmailArr: this.state.businessEmailArr
        })
    }

    _onSelectEmailType = (val, key) => {
        let arr = this.state.businessEmailArr;
        arr[key].selectedEmailType = val;
        arr[key].emailtype = val.name
        this.state.businessEmailArr = arr
        this.setState({
            businessEmailArr: this.state.businessEmailArr
        })
    }

    onSelectLocationData = (val) => {
        this.setState({ locationData: val.value, locationArrData: val.totalData })
    }


    _onSave = async () => {
        let status = onSaveValidation(this.state, this.props);
        if (status) {
            // let contactData = this.state.contactDetails;
            this.setState({ contactLoader: true });
            let reqData = {
                "firstName": this.state.contactDetails.firstName,
                "lastName": this.state.contactDetails.lastName,
                "title": this.state.contactDetails.title,
                "phoneNumber": this.state.businessPhoneArr,
                "email": this.state.businessEmailArr,
                "organizationId": this.state.selectedOrganization.organizationId,
                "newOrg": this.state.isNewAccount == true ? 1 : 0,
                "masterMdouleTypeId": "20"
            }
            if (this.props.route.params.type == "edit") {
                reqData["contactId"] = this.props.route.params.data.contactId
                reqData["hierarchyDataArr"] = [this.state.locationData]
                let responseData = await MiddlewareCheck("updateNewContact", reqData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.goBack();
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("createNewContact", reqData, this.props);
                if (responseData) {
                    if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.replace("ContactListPage")
                    }
                }
            }
            this.setState({ contactLoader: false });
        }
    }

    _onAddOrg = async () => {
        if (this.state.contactDetails.account.length == 0 || this.state.contactDetails.account == null || this.state.contactDetails.account == undefined) {
            Toaster.ShortCenterToaster("Please enter Account !");
        } else if (this.state.contactDetails.newAccNumber.length == 0 || this.state.contactDetails.newAccNumber == null || this.state.contactDetails.newAccNumber == undefined) {
            Toaster.ShortCenterToaster("Please enter Phone Number !");
        } else {
            this.setState({ organizationLoader: true });
            let reqData = {
                "contactId": "0",
                "organizationName": this.state.contactDetails.account,
                "phone": this.state.contactDetails.newAccNumber,
                "masterMdouleTypeId": "20"
            }
            let responseData = await MiddlewareCheck("createNewOrganization_fromContact", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ selectedOrganization: { "organizationId": responseData.response.insertedOrgId, "organizationName": responseData.response.organizationName } })
                    Toaster.ShortCenterToaster(responseData.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                    this.setState({ selectedOrganization: {} })

                }
            }
            this.setState({ organizationLoader: false });
        }
    }

    _onSelectOrganization = (item, key) => {
        this.state.contactDetails.account = item.organizationName;
        this.setState({ contactDetails: this.state.contactDetails, selectedOrganization: item });
    }

    render() {
        if (this.state.pageloader) {
            return (
                <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={CustomStyle.container}>
                    <View style={{ alignItems: "flex-start" }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this._onBack}
                            style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
                        >
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerSection}>
                        <Text style={styles.headerTxt}>{this.props.route.params.type == "add" ? "New Contact" : "Update Contact"}</Text>
                    </View>
                    <ScrollView style={{ margin: 15 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Contact Details</Text>
                            </View>
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInputBox
                                value={this.state.contactDetails.firstName}
                                onChangeText={(value) => this._onChangeFirstName(value)}
                                placeholder={"Enter First Name*"}
                                keyboardType={"default"}
                                // isActive={this.state.allPageData.firstNameAcive}
                                // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                height={45}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInputBox
                                value={this.state.contactDetails.lastName}
                                onChangeText={(value) => this._onChangeLastName(value)}
                                placeholder={"Enter Last Name*"}
                                keyboardType={"default"}
                                // isActive={this.state.allPageData.firstNameAcive}
                                // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                height={45}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInputBox
                                value={this.state.contactDetails.title}
                                onChangeText={(value) => this._onChangeTitle(value)}
                                placeholder={"Enter Ttile*"}
                                keyboardType={"default"}
                                // isActive={this.state.allPageData.firstNameAcive}
                                // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                height={45}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Phone Number</Text> */}
                            {this.state.businessPhoneArr.map((item, key) => (
                                this.phoneNumberSection(item, key)
                            ))}
                            {this.state.businessPhoneArr.length > 1 ?
                                null
                                :
                                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                    <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                </View>
                            }
                        </View>

                        <View style={{ margin: 10 }}>
                            {this.state.businessEmailArr.map((item, key) => (
                                this.emailSection(item, key)
                            ))}
                            {this.state.businessEmailArr.length > 1 ?
                                null
                                :
                                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                    <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                </View>
                            }
                        </View>
                        {this.props.route.params.type == "edit" ?
                            <View>
                                {this.state.locationLoader ?
                                    null :
                                    <>
                                        <DynamicLocationMapping
                                            // type={"lastHierarcyField"}
                                            editData={this.state.locationArr}
                                            screenName={"Crm"}
                                            marginBottom={15}
                                            flexDirection={"column"}
                                            viewType={"edit"}
                                            isLabelVisible={false}
                                            onApiCallData={(value) => this.onSelectLocationData(value)} />

                                    </>
                                }
                            </View>
                            : null}

                        <View style={{ margin: 10 }}>
                            <TextInputBox
                                value={this.state.contactDetails.account}
                                onChangeText={(value) => this._onChangeAccount(value)}
                                placeholder={"Enter Account*"}
                                keyboardType={"default"}
                                // isActive={this.state.allPageData.firstNameAcive}
                                // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                height={45}
                            />
                        </View>
                        {this.state.accountListLoader ?
                            <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                            :
                            <>
                                {this.state.isNewAccount == true ?
                                    <View style={{ flexDirection: 'row', margin: 10, }}>
                                        <View style={{ flex: 0.7 }}>
                                            <TextInputBox
                                                value={this.state.contactDetails.newAccNumber}
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
                                            {this.state.organizationLoader ?
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
                                            {this.state.contactList.length > 0 ?
                                                <View style={{ borderRadius: 10, borderWidth: 0.5, borderColor: Color.COLOR.WHITE.WHITE_SMOKE, backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, maxHeight: 250 }}>
                                                    <ScrollView nestedScrollEnabled>
                                                        {this.state.contactList.map((item, key) => (
                                                            <View style={{ marginVertical: 5 }} key={key}>
                                                                <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: Color.COLOR.WHITE.PURE_WHITE }} onPress={() => this._onSelectOrganization(item, key)}>
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

                        {this.state.organizationLoader ? null :
                            <View style={{ marginTop: 20, marginBottom: 40 }}>
                                {this.state.contactLoader ?
                                    <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                    :
                                    <BigTextButton
                                        text={"Save"}
                                        onPress={() => this._onSave()}
                                    />
                                }
                            </View>
                        }
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditContact);

