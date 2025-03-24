import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Color, ImageName } from "../../../../../../enums";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { StorageDataModification } from "../../../../../../services/common-view-function";
import { DynamicLocationMapping } from "../../../../../../pageShared";



class PersonalContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            locationLoader: false,
            allPageData: {},
            phoneNumberArr: [
                { phoneNumber: "", phoneNumberActive: false },
            ],
            emailArr: [
                { emailId: "", emailActive: false },
            ],
            address: "",
            addressActive: false,
            allCountry: [],
            selectedCountry: {},
            allState: [],
            selectedState: {},
            allDistrictCity: [],
            selectedDistrictCity: {},
            allZone: [],
            selectedZone: {}
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getHierarchyTypesSlNo()
    }

    _onLoad = async () => {

        this.setState({ allPageData: this.props.allPageData, pageloader: false })
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

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.personalAddress = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectContactType = (value) => {
        let arr = this.state.allPageData.contactTypeArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == value.id) {
                arr[i].check = true;
            }
        }
        this.state.allPageData.contactTypeArr = arr;
        this.state.allPageData.selectedContactObj = value;
        this.setState({ allPageData: this.state.allPageData })
    }

    _onSelectCountry = async (value) => {
        let data = this.state.allPageData.countryArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.countryArr = data;
        this.state.allPageData.selectedPersonalCountryObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })

        this.getStateData(value)
    }

    getStateData = async (value) => {
        let reqData = {
            countryId: value.id
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

    _onSelectState = async (value) => {
        let data = this.state.allPageData.stateArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.stateArr = data;
        this.state.allPageData.selectedPersonalStateObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })

        this.getDistrictData(value.id)


    }


    getDistrictData = async (value) => {
        let reqData = {
            stateId: value
        }
        this.setState({ distLoader: true })
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList)

                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ distLoader: false })
    }

    _onSelectDistrictCity = async (value) => {
        let data = this.state.allPageData.districtArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.districtArr = data;
        this.state.allPageData.selectedPersonalDistrictObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        this.getZoneData(value);
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


    _onSelectZone = (value) => {
        let data = this.state.allPageData.zoneArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.zoneArr = data;
        this.state.allPageData.selectedPersonalZoneObj = value;
        this.setState({
            allPageData: this.state.allPageData
            // selectedZone: value,
            // allZone: data,
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
        let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "email");
        this.state.allPageData.personalEmailArr[key].email = value;
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

    phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.phone}
                    onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                    placeholder={"Enter Phone Number"}
                    keyboardType={"numeric"}
                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
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
                    placeholder={"Enter Email Id"}
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
        this.state.allPageData.personalEmailArr = arr;;
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

    _onBack = () => {
        let data = {
            type: "previous",
            pageNum: 1
        }
        this.props.onSaveDataToParent(data);
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
        let reqData = {
            "contactType": "1",
            contactTypeId: this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id : "",
            firstName: this.state.allPageData.firstName ? this.state.allPageData.firstName : "",
            lastName: this.state.allPageData.lastName ? this.state.allPageData.lastName : "",
            phoneNumber: phoneId,
            email: emailId,
            contactAddress: this.state.allPageData.personalAddress ? this.state.allPageData.personalAddress : "",
            countryId: this.state.allPageData.selectedPersonalCountryObj.id ? this.state.allPageData.selectedPersonalCountryObj.id : "",
            stateId: this.state.allPageData.selectedPersonalStateObj.id ? this.state.allPageData.selectedPersonalStateObj.id : "",
            districtId: this.state.allPageData.selectedPersonalDistrictObj.id ? this.state.allPageData.selectedPersonalDistrictObj.id : "",
            zoneId: this.state.allPageData.selectedPersonalZoneObj.id ? this.state.allPageData.selectedPersonalZoneObj.id : "",
            phoneArr: this.state.allPageData.personalPhoneArr,
            emailArr: this.state.allPageData.personalEmailArr,
            "locationArr": this.state.allPageData.locationData,
            "locationData": [this.state.allPageData.locationData]


        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                pageNum: 3,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
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
                                    <Text style={styles.listHeaderText}>Personal Contact Details</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Contract Type</Text> */}
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id.toString() : "0"}
                                    data={this.state.allPageData.contactTypeArr}
                                    onSelect={(value) => this._onSelectContactType(value)}
                                    headerText={"Select Contact Type*"}
                                    // selectedText={this.state.selectedContactType.name ? this.state.selectedContactType.name : "Select Contract Type"}
                                    // selectedTextColor={this.state.selectedContactType.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>First Name</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.firstName}
                                    onChangeText={(value) => this._onChangeFirstName(value)}
                                    placeholder={"Enter First Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.firstNameActive}
                                    onFocus={() => { this.state.allPageData.firstNameActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.firstNameActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Last Name</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.lastName}
                                    onChangeText={(value) => this._onChangeLastName(value)}
                                    placeholder={"Enter Last Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.lastNameActive}
                                    onFocus={() => { this.state.allPageData.lastNameActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.lastNameActive = false; this.setState({ allPageData: this.state.allPageData }) }}
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
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.BLUE.CAPRI }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Email Adderss</Text> */}
                                {this.state.allPageData.personalEmailArr.map((item, key) => (
                                    this.emailSection(item, key)
                                ))}
                                {this.state.allPageData.personalEmailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.BLUE.CAPRI }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>


                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{"*"}</Text>Address</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.personalAddress}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Enter Address"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.personalAddressActive}
                                    onFocus={() => { this.state.allPageData.personalAddressActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.personalAddressActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    returnKeyType={'default'}
                                    alignItems={"flex-start"}
                                />
                            </View>

                            {this.state.locationLoader ?
                                null :
                                <>
                                    {/* {
                                        this.props.route.params.type == "add" ?
                                            <DynamicLocationMapping
                                                // type={"lastHierarcyField"}
                                                // editData={this.props.allPageData.locationArr}
                                                screenName={"Crm"}
                                                marginBottom={15}
                                                flexDirection={"column"}
                                                viewType={"add"}
                                                isLabelVisible={false}
                                                onApiCallData={(value) => this.onSelectLocationData(value)} />
                                            : */}
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