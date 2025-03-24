import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Color, FontFamily, ImageName } from "../../../../../../enums";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyContactData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { Toaster } from "../../../../../../services/common-view-function";


class PersonalContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            locationLoader: false,
            contactLoader: false,
            allPageData: {},
            contactList: []
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }

    _onSelectContactType = (value) => {
        this.state.allPageData.selectedContactTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        this.clearFormData()
    }

    clearFormData = () => {
        this.state.allPageData.searchContact = ""
        this.state.allPageData.firstName = ""
        this.state.allPageData.lastName = ""
        this.state.allPageData.ownerPhone = ""
        this.state.allPageData.selectedContactObj = {}
        this.state.allPageData.contactList = []
        this.setState({ allPageData: this.state.allPageData })
    }

    _onChangeContactFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.firstName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeContactLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.lastName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeContactPhone = (text) => {
        let txt = DataValidator.inputEntryValidate(text, "mobile");
        this.state.allPageData.ownerPhone = txt;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeSearchContact = async (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.searchContact = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": this.state.allPageData.searchContact,
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
        this.setState({ contactLoader: true })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyContactData(responseData.response)
                this.state.allPageData.contactList = modData.list
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ contactLoader: false })
    }

    _onSelectContact = (item, key) => {
        let arr = this.state.allPageData.contactList;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true;
            } else {
                arr[i].check = false;
            }
        }
        this.state.allPageData.searchContact = item.name
        this.state.allPageData.selectedContactObj = item
        this.setState({ allPageData: this.state.allPageData })
    }

    _onSearchContact = async () => {

    }

    _onBack = () => {
        let data = {
            type: "previous",
            pageNum: 1
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = async () => {
        if (this.state.allPageData.selectedContactTypeObj.id == "1") {
            let reqData = {
                "contactType": this.state.allPageData.selectedContactTypeObj.id,
                "firstName": this.state.allPageData.firstName,
                "lastName": this.state.allPageData.lastName,
                "phoneNumber": this.state.allPageData.ownerPhone,
                "masterMdouleTypeId": "20"
            }
            if (reqData.firstName.length == 0) {
                Toaster.ShortCenterToaster("Please enter Contact First Name !")
            } else if (reqData.lastName.length == 0) {
                Toaster.ShortCenterToaster("Please enter Contact Last Name !")
            } else if (reqData.phoneNumber.length == 0) {
                Toaster.ShortCenterToaster("Please enter Contact Phone No !")
            } else {
                let responseData = await MiddlewareCheck("createNewContactByPhone", reqData, this.props);
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    let maindata = { "contactId": responseData.response.insertedContactId, "contactType": this.state.allPageData.selectedContactTypeObj.id }
                    let data = {
                        type: "next",
                        pageNum: 3,
                        data: maindata
                    }
                    this.props.onSaveDataToParent(data);
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }

            }
        } else {
            if (this.state.allPageData.searchContact.length == 0) {
                Toaster.ShortCenterToaster("Please enter Contact Name !")
            } else if (Object.keys(this.state.allPageData.selectedContactObj).length == 0) {
                Toaster.ShortCenterToaster("Please select a Contact !")
            } else {
                let reqData = {
                    "contactId": this.state.allPageData.selectedContactObj.id,
                    "contactType": this.state.allPageData.selectedContactTypeObj.id
                }
                let data = {
                    type: "next",
                    pageNum: 3,
                    data: reqData
                }
                this.props.onSaveDataToParent(data);
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <>
                        <Loader />
                    </>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>

                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Contact Details</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Contract Type</Text> */}
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
                                />
                            </View>
                            {this.state.allPageData.selectedContactTypeObj.id == "1" ?
                                <React.Fragment>
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.firstName}
                                            onChangeText={(value) => this._onChangeContactFirstName(value)}
                                            placeholder={"Contact First Name*"}
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
                                            onChangeText={(value) => this._onChangeContactLastName(value)}
                                            placeholder={"Contact Last Name*"}
                                            keyboardType={"default"}
                                            isActive={this.state.allPageData.lastNameActive}
                                            onFocus={() => { this.state.allPageData.lastNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.lastNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.ownerPhone}
                                            onChangeText={(value) => this._onChangeContactPhone(value)}
                                            placeholder={"Contact Phone No*"}
                                            keyboardType={"number-pad"}
                                            isActive={this.state.allPageData.ownerPhoneActive}
                                            onFocus={() => { this.state.allPageData.ownerPhoneActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.ownerPhoneActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                            maxLength={10}
                                        />
                                    </View>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.searchContact}
                                            onChangeText={(value) => this._onChangeSearchContact(value)}
                                            placeholder={"Search Contact*"}
                                            keyboardType={"default"}
                                            isActive={this.state.allPageData.searchContactActive}
                                            onFocus={() => { this.state.allPageData.searchContactActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.searchContactActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        // isRightIcon={this.state.allPageData.searchContact.length > 0 ? true : false}
                                        // rightIcon={ImageName.SEARCH_LOGO}
                                        // onPressRightIcon={() => this._onSearchContact()}

                                        />
                                    </View>
                                    {/* {this.props.route.params.type == "edit" ? null : */}
                                    <View style={{ marginBottom: 15 }}>
                                        {this.state.contactLoader ?
                                            <View>
                                                <ActivityIndicator size={"small"} />
                                            </View>
                                            :
                                            <React.Fragment>
                                                {this.state.allPageData.contactList.length > 0 ?
                                                    <View style={{ borderRadius: 10, borderWidth: 0.5, borderColor: Color.COLOR.WHITE.WHITE_SMOKE, backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, maxHeight: 250 }}>
                                                        <ScrollView nestedScrollEnabled>
                                                            {this.state.allPageData.contactList.map((item, key) => (
                                                                <View style={{ marginVertical: 5 }} key={key}>
                                                                    <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: item.check ? Color.COLOR.RED.AMARANTH : Color.COLOR.WHITE.PURE_WHITE }} onPress={() => this._onSelectContact(item, key)}>
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
                                        }
                                    </View>
                                    {/* } */}
                                </React.Fragment>
                            }


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

export default PersonalContactDetails;