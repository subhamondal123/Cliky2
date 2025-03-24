import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Color, Dimension, FontSize, ImageName } from "../../../../../../enums";
import { StorageDataModification, Toaster } from "../../../../../../services/common-view-function";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyEmailObject, modifyLocationMappedData, modifyPhoneNumberObject, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../../pageShared";

const allType = [
    {
        id: 1,
        name: "New",
        check: false
    },
    {
        id: 2,
        name: "Existing",
        check: false
    },
]

class BusinessDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            locationLoader: false,

            allOrgTakenType: allType,
            selectedOrgTakenType: {},
            allOrg: [],
            selectedOrg: {},
            ownerName: "",
            ownerNameActive: false,
            orgName: "",
            orgNameActive: false,
            address: "",
            addressActive: false,
            phoneNumberArr: [
                { phoneNumber: "", phoneNumberActive: false },
            ],
            emailArr: [
                { emailId: "", emailActive: false },
            ],
            annualRevenue: "",
            annualRevenueActive: false,
            numOfEmp: "",
            numOfEmpActive: false,
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
        this.props.navigation.navigate("NetworkError")
    }

    _onSelectOrgTakenType = (value) => {
        this.clearData();
        this.state.allPageData.selectedOrgTakenType = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }

    clearData = () => {
        this.state.allPageData.selectedOrganizationObj = {};
        this.state.allPageData.organizationName = "";
        this.state.allPageData.ownerName = "";
        this.state.allPageData.businessPhoneArr = [{ phone: "", phoneActive: false }];
        this.state.allPageData.businessEmailArr = [
            { email: "", emailActive: false },
        ];
        this.state.allPageData.businessAddress = "";
        this.state.allPageData.selectedBusinessCountryObj = {};
        this.state.allPageData.selectedBusinessStateObj = {};
        this.state.allPageData.selectedBusinessDistrictObj = {};
        this.state.allPageData.selectedBusinessZoneObj = {};

        this.state.allPageData.noOfEmployee = "";
        this.state.allPageData.annualRevenue = "";
    }

    _onSelectOrg = async (value) => {
        let data = this.state.allPageData.organizationArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.organizationArr = data;
        this.state.allPageData.selectedOrganizationObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })

        await this.getOrganizationDetail(value)
    }



    getOrganizationDetail = async (value) => {
        let reqData = {
            organizationId: value.id
        }
        this.setState({ pageloader: true })
        let responseData = await MiddlewareCheck("getOrganizationDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userData = responseData.response;
                if (userData.length > 0) {
                    this.state.allPageData.ownerName = userData[0].ownerName;

                    if (userData[0].orgPhone && (userData[0].orgPhone != undefined || userData[0].orgPhone != null)) {
                        let phArr = userData[0].orgPhone.split(",");
                        this.state.allPageData.businessPhoneArr = modifyPhoneNumberObject(phArr)
                    }
                    if (userData[0].orgEmail && (userData[0].orgEmail != undefined || userData[0].orgEmail != null)) {
                        let emailArr = userData[0].orgEmail.split(",");
                        this.state.allPageData.businessEmailArr = modifyEmailObject(emailArr)
                    }
                    this.state.allPageData.businessAddress = userData[0].orgAddress;
                    this.state.allPageData.selectedBusinessCountryObj.id = userData[0].orgCountryId;
                    await this.getExistingStateData(userData[0].orgCountryId, userData);
                    await this.getExistingDistrictData(userData[0].orgStateId, userData);
                    await this.getExistingZoneData(userData[0].orgCityId, userData);

                    this.state.allPageData.annualRevenue = userData[0].orgAnualRevenue.toString();
                    this.state.allPageData.noOfEmployee = userData[0].orgNumberOfEmployee;

                    this.setState({
                        allPageData: this.state.allPageData,

                    })
                }


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
                this.state.allPageData.selectedBusinessDistrictObj.id = userData[0].orgCityId;
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
                this.state.allPageData.selectedBusinessZoneObj.id = userData[0].orgZoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }


    _onChangeOrganization = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.organizationName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeOwnerName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.ownerName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.businessPhoneArr[key].phone = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "email");
        this.state.allPageData.businessEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.businessAddress = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectCountry = async (value) => {
        let data = this.state.allPageData.countryArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.countryArr = data;
        this.state.allPageData.selectedBusinessCountryObj = value;
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
            // this._onNetworkError();
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
        this.state.allPageData.selectedBusinessStateObj = value;
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
        this.state.allPageData.selectedBusinessDistrictObj = value;
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
        this.state.allPageData.selectedBusinessZoneObj = value;
        this.setState({
            allPageData: this.state.allPageData
            // selectedZone: value,
            // allZone: data,
        })
    }


    _onChangeAnnualRevenue = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "numeric");
        this.state.allPageData.annualRevenue = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeNumOfEmp = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "numeric");
        this.state.allPageData.noOfEmployee = newText;
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
                    placeholder={"Enter Phone Number"}
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
                />
            </React.Fragment>
        )
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
                />
            </React.Fragment>
        )
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

    _onBack = () => {
        let data = {
            pageNum: 2,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
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
            selectedType: this.state.allPageData.selectedOrgTakenType.id ? this.state.allPageData.selectedOrgTakenType.id : "1",
            organizationId: this.state.allPageData.selectedOrganizationObj.id ? this.state.allPageData.selectedOrganizationObj.id : "",
            organizationName: this.state.allPageData.organizationName ? this.state.allPageData.organizationName : "",
            ownerName: this.state.allPageData.ownerName ? this.state.allPageData.ownerName : "",
            orgPhone: phoneId,
            orgEmail: emailId,
            phoneArr: this.state.allPageData.businessPhoneArr,
            emailArr: this.state.allPageData.businessEmailArr,
            "hierarchyDataId": this.state.allPageData.locationData.hierarchyDataId,
            "hierarchyTypeId": this.state.allPageData.locationData.hierarchyTypeId,
            "locationArr": this.state.allPageData.locationData,

            'orgAddress': this.state.allPageData.businessAddress ? this.state.allPageData.businessAddress : "",
            'orgCountryId': this.state.allPageData.selectedBusinessCountryObj.id ? this.state.allPageData.selectedBusinessCountryObj.id : "",
            'orgStateId': this.state.allPageData.selectedBusinessStateObj.id ? this.state.allPageData.selectedBusinessStateObj.id : "",
            'orgDistrictId': this.state.allPageData.selectedBusinessDistrictObj.id ? this.state.allPageData.selectedBusinessDistrictObj.id : "",
            'orgCityId': this.state.allPageData.selectedBusinessDistrictObj.id ? this.state.allPageData.selectedBusinessDistrictObj.id : "",
            'orgZoneId': this.state.allPageData.selectedBusinessZoneObj.id ? this.state.allPageData.selectedBusinessZoneObj.id : "",
            anualRevenue: this.state.allPageData.annualRevenue ? this.state.allPageData.annualRevenue : "",
            numberOfEmployee: this.state.allPageData.noOfEmployee ? this.state.allPageData.noOfEmployee : "",
        }


        let validData = validateData(reqData, this.props)
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 4,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }

    }
    onSelectLocationData = (val) => {
        this.state.allPageData.orgLocationData = val.value
        this.state.allPageData.orgLocationArr = val.totalData
        // this.state.locationArr = val.totalData;
        // this.state.locationObj = val.value;
        this.setState({ allPageData: this.state.allPageData })
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


                            <React.Fragment>
                                {this.props.route.params.type == "edit" ? null :
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Organization Taken Type</Text>
                                        <View style={{ height: 10 }} />
                                        <DropdownInputBox
                                            selectedValue={this.state.allPageData.selectedOrgTakenType.id ? this.state.allPageData.selectedOrgTakenType.id.toString() : "1"}
                                            data={this.state.allPageData.allTypeData}
                                            onSelect={(value) => this._onSelectOrgTakenType(value)}
                                            headerText={"Select Organization Taken Type"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                        />
                                    </View>
                                }


                                {this.state.allPageData.selectedOrgTakenType.id == 2 ?
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <DropdownInputBox
                                            selectedValue={this.state.allPageData.selectedOrganizationObj.id ? this.state.allPageData.selectedOrganizationObj.id.toString() : "0"}
                                            data={this.state.allPageData.organizationArr}
                                            onSelect={(value) => this._onSelectOrg(value)}
                                            headerText={"Select Organization"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                        />
                                    </View>
                                    :
                                    <View style={{ marginBottom: 15 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.organizationName}
                                            onChangeText={(value) => this._onChangeOrganization(value)}
                                            placeholder={"Organization Name*"}
                                            keyboardType={"default"}

                                            isActive={this.state.allPageData.organizationNameActive}
                                            onFocus={() => { this.state.allPageData.organizationNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.organizationNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                            returnKeyType={'default'}
                                        />
                                    </View>
                                }

                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.ownerName}
                                        onChangeText={(value) => this._onChangeOwnerName(value)}
                                        placeholder={"Enter Owner Name"}
                                        keyboardType={"default"}
                                        isActive={this.state.allPageData.ownerNameActive}
                                        onFocus={() => { this.state.allPageData.ownerNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.ownerNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    {this.state.allPageData.businessPhoneArr.map((item, key) => (
                                        this.phoneNumberSection(item, key)
                                    ))}
                                    {this.state.allPageData.businessPhoneArr.length > 1 ?
                                        null
                                        :
                                        <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                            <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                        </View>
                                    }
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    {this.state.allPageData.businessEmailArr.map((item, key) => (
                                        this.emailSection(item, key)
                                    ))}
                                    {this.state.allPageData.businessEmailArr.length > 1 ?
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
                                        value={this.state.allPageData.businessAddress}
                                        onChangeText={(value) => this._onChangeAddress(value)}
                                        placeholder={"Enter Address*"}
                                        keyboardType={"default"}
                                        multiline={true}
                                        isActive={this.state.allPageData.businessAddressActive}
                                        onFocus={() => { this.state.allPageData.businessAddressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.businessAddressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={90}
                                        returnKeyType={'default'}
                                        alignItems={"flex-start"}
                                    />
                                </View>


                                {/* {this.state.locationLoader ?
                                    null :
                                    <>
                                        <DynamicLocationMapping
                                            // type={"lastHierarcyField"}
                                            editData={this.props.allPageData.orgLocationArr}
                                            screenName={"Crm"}
                                            marginBottom={15}
                                            flexDirection={"column"}
                                            viewType={"edit"}
                                            isLabelVisible={false}
                                            onApiCallData={(value) => this.onSelectLocationData(value)} />

                                    </>
                                } */}

                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.annualRevenue.toString()}
                                        onChangeText={(value) => this._onChangeAnnualRevenue(value)}
                                        placeholder={"Annual Revenue*"}
                                        keyboardType={"numeric"}
                                        isActive={this.state.allPageData.annualRevenueActive}
                                        onFocus={() => { this.state.allPageData.annualRevenueActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.annualRevenueActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.noOfEmployee.toString()}
                                        onChangeText={(value) => this._onChangeNumOfEmp(value)}
                                        placeholder={" Number Of Employee*"}
                                        keyboardType={"numeric"}
                                        isActive={this.state.allPageData.noOfEmployeeActive}
                                        onFocus={() => { this.state.allPageData.noOfEmployeeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.noOfEmployeeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                    />
                                </View>
                            </React.Fragment>

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