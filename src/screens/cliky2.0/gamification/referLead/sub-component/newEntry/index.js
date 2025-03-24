import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../../enums';
import styles from './style';
import { SafeAreaView, Text, View, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BigTextButton, DropdownInputBox, TextInputBox } from "../../../../../../shared";
import { DataValidator } from "../../../../../../validators";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { ErrorCode } from "../../../../../../services/constant";
import { districtModifyData, enquirySourceModifyData, modifyConversionLanding, modifyCountryArrData, modifyDistrictArrData, modifyEnquirySourceArrData, modifyEnquiryTypeArrData, modifyFetchData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import { StorageDataModification, Toaster } from "../../../../../../services/common-view-function";


class GamificationReferLead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,

            firstName: "",
            firstNameActive: false,
            lastName: "",
            lastNameActive: false,
            enquirySourceArr: [],
            enquirySourceObj: {},
            enquiryTypeArr: [],
            enquiryTypeObj: {},
            brandArr: [],
            brandObj: {},
            phone: "",
            phoneActive: false,
            email: "",
            emailActive: false,
            address: "",
            addressActive: false,
            countryArr: [],
            countryObj: {},
            stateArr: [],
            stateObj: {},
            districtArr: [],
            districtObj: {},
            zoneArr: [],
            zoneObj: {},
            city: "",
            cityActive: false,
            pincode: "",
            pincodeActive: false,
            notes: "",
            notesActive: false,
            approvedStatus:"",
            businessId:"",
            scroll: false,

            stateLoader: false,
            districtLoader: false,
            zoneLoader: false,
            addLoader: false

        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount = async () => {

        await this._load();
        this.setState({ pageLoader: false })

    }

    _load = async () => {
        let userCredential = await StorageDataModification.userCredential({}, "get");
        this.setState({ countryArr: modifyCountryArrData(userCredential.mappedCountires) })


        await this.getLandingData()
        await this.getBrandData()
        if (this.props.type == "edit") {
            await this.getFetchData()
        }
    }

    getFetchData = async () => {
        let reqData = {
            enquiryId: this.props.mainData.enqueryId
        }
        let responseData = await MiddlewareCheck("getInternalEnquiryByenquiryId", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let fetchData = modifyFetchData(responseData.response);
                this.state.firstName = fetchData.ownerFirstName;
                this.state.lastName = fetchData.ownerLastName;
                this.state.enquirySourceObj.id = fetchData.enquerySourceId;
                this.state.enquiryTypeObj.id = fetchData.enquerySourceTypeId;
                this.state.brandObj.id = fetchData.enqueryBrandId;
                this.state.countryObj.id = fetchData.countryId;
                this.state.stateObj = this.setStateData(fetchData.countryId, fetchData.stateId);
                this.state.districtObj = this.setDistrictData(fetchData.stateId, fetchData.districtId);
                this.state.zoneObj = this.setZoneData(fetchData.districtId, fetchData.zoneId);
                this.state.city = fetchData.cityVillage;
                this.state.pincode = fetchData.pinCode;
                this.state.address = fetchData.address;
                this.state.phone = fetchData.ownerPhone;
                this.state.email = fetchData.ownerEmail;
                this.state.notes = fetchData.notes;
                this.state.approvedStatus = fetchData.approvedStatus;
                this.state.businessId = fetchData.businessId;
                this.setState({
                    countryObj: this.state.countryObj,
                    approvedStatus:this.state.approvedStatus
                })
            }
        }
        this.setState({
            pageloader: false
        })
    }

    setStateData = async (countryId, stateId) => {
        let reqData = {
            countryId: countryId
        }
        this.setState({ stateLoader: true })

        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.stateArr = modifyStateArrData(stateData.stateList)
                this.state.stateObj.id = stateId

                this.setState({
                    stateArr: this.state.stateArr,
                    stateObj: this.state.stateObj
                })
            }
        }
        this.setState({ stateLoader: false })
    }

    setDistrictData = async (stateId, districtId) => {
        let reqData = {
            stateId: stateId
        }

        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.districtArr = modifyDistrictArrData(districtData.districtList)
                this.state.districtObj.id = districtId;
                this.setState({
                    districtArr: this.state.districtArr,
                    districtObj: this.state.districtObj
                })
            }
        }

    }
    setZoneData = async (districtId, zoneId) => {
        let reqData = {
            cityId: districtId
        }
        this.setState({ zoneLoader: true })

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.state.zoneObj.id = zoneId
                this.setState({
                    zoneArr: this.state.zoneArr,
                    zoneObj: this.state.zoneObj
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    getLandingData = async () => {
        let responseData = await MiddlewareCheck("getEnquiryLandingData", {screen:"gamification"}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                this.setState({
                    enquirySourceArr: modifyEnquirySourceArrData(enquirySourceData.enquirySourceList),
                    enquiryTypeArr: modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList),
                })
            }
        }
        this.setState({
            pageloader: false
        })
    }
    getBrandData = async () => {
        let responseData = await MiddlewareCheck("conversionAllLanding", {}, this.props);
        let modifiedData = {};
        if (responseData == false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                modifiedData = await modifyConversionLanding(responseData.data);
                this.state.allBrand = modifiedData.brandingList;

                this.setState({
                    brandArr: this.state.allBrand,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getExistingStateData = async (value) => {
        let reqData = {
            countryId: value
        }
        this.setState({ stateLoader: true })

        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.stateArr = modifyStateArrData(stateData.stateList)

                this.setState({
                    stateArr: this.state.stateArr
                })
            }
        }
        this.setState({ stateLoader: false })
    }

    getExistingDistrictData = async (value) => {
        let reqData = {
            stateId: value
        }
        this.setState({ districtLoader: true })
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.districtArr = modifyDistrictArrData(districtData.districtList)
                this.setState({
                    districtArr: this.state.districtArr
                })
            }
        }
        this.setState({ districtLoader: false })

    }

    getExistingZoneData = async (value) => {
        let reqData = {
            cityId: value
        }
        this.setState({ zoneLoader: true })

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.setState({
                    zoneArr: this.state.zoneArr
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    firstNameSection = () => {
        const _onNameChange = (value) => {
            let newText = DataValidator.inputEntryValidate(value,"nameSpace");
            let mainText  = DataValidator.checkFirstIndexWhiteSpace(newText)
            this.setState({
                firstName: mainText
            })
        }
        return (
            <TextInputBox
                placeholder={"First Name*"}
                value={this.state.firstName}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onNameChange(value)}
                isActive={this.state.firstNameActive}
                onFocus={() => { this.setState({ firstNameActive: true }) }}
                onBlur={() => { this.setState({ firstNameActive: false }) }}
            />
        )
    }

    lastNameSection = () => {
        const _onNameChange = (value) => {
            this.setState({
                lastName: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Last Name*"}
                value={this.state.lastName}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onNameChange(value)}
                isActive={this.state.lastNameActive}
                onFocus={() => { this.setState({ lastNameActive: true }) }}
                onBlur={() => { this.setState({ lastNameActive: false }) }}
            />
        )
    }

    enquirySourceSection = () => {
        const _onChange = (value) => {
            this.setState({
                enquirySourceObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.enquirySourceObj.id ? this.state.enquirySourceObj.id.toString() : "0"}
                data={this.state.enquirySourceArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Enquiry Source*"}
            />
        )
    }
    enquiryTypeSection = () => {
        const _onChange = (value) => {
            this.setState({
                enquiryTypeObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.enquiryTypeObj.id ? this.state.enquiryTypeObj.id.toString() : "0"}
                data={this.state.enquiryTypeArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Enquiry Type*"}
            />
        )
    }

    brandSection = () => {
        const _onChange = (value) => {
            this.setState({
                brandObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.brandObj.id ? this.state.brandObj.id.toString() : "0"}
                data={this.state.brandArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Brand"}
            />
        )
    }

    countrySection = () => {
        const _onChange = (value) => {
            this.setState({
                countryObj: value
            })
            this.getExistingStateData(value.id)

        }
        return (
            <DropdownInputBox
                selectedValue={this.state.countryObj.id ? this.state.countryObj.id.toString() : "0"}
                data={this.state.countryArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Country*"}
            />

        )
    }

    stateSection = () => {
        const _onChange = (value) => {
            this.setState({
                stateObj: value
            })
            this.getExistingDistrictData(value.id)
        }
        return (
            <>
                {this.state.stateLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"small"} />
                    </View>
                    :
                    <DropdownInputBox
                        selectedValue={this.state.stateObj.id ? this.state.stateObj.id.toString() : "0"}
                        data={this.state.stateArr}
                        borderRadius={25}
                        onSelect={(value) => _onChange(value)}
                        headerText={"State*"}
                    />
                }
            </>

        )
    }
    districtSection = () => {
        const _onChange = (value) => {
            this.setState({
                districtObj: value
            })
            this.getExistingZoneData(value.id)
        }
        return (
            <>
                {this.state.districtLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"small"} />
                    </View>
                    :
                    <DropdownInputBox
                        selectedValue={this.state.districtObj.id ? this.state.districtObj.id.toString() : "0"}
                        data={this.state.districtArr}
                        borderRadius={25}
                        onSelect={(value) => _onChange(value)}
                        headerText={"District*"}
                    />
                }
            </>


        )
    }

    zoneSection = () => {
        const _onChange = (value) => {
            this.setState({
                zoneObj: value
            })
        }
        return (
            <>
                {this.state.zoneLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"small"} />
                    </View>
                    :
                    <DropdownInputBox
                        selectedValue={this.state.zoneObj.id ? this.state.zoneObj.id.toString() : "0"}
                        data={this.state.zoneArr}
                        borderRadius={25}
                        onSelect={(value) => _onChange(value)}
                        headerText={"Zone*"}
                    />
                }

            </>


        )
    }

    citySection = () => {
        const _onChange = (value) => {
            this.setState({
                city: value
            })
        }
        return (
            <TextInputBox
                placeholder={"City/Village"}
                value={this.state.city}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.cityActive}
                onFocus={() => { this.setState({ cityActive: true }) }}
                onBlur={() => { this.setState({ cityActive: false }) }}

            />
        )
    }

    phoneSection = () => {
        const _onChange = (value) => {
            this.setState({
                phone: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Phone*"}
                value={this.state.phone}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.phoneActive}
                onFocus={() => { this.setState({ phoneActive: true }) }}
                onBlur={() => { this.setState({ phoneActive: false }) }}
                keyboardType={"number-pad"}
                maxLength={10}
            />
        )
    }

    emailSection = () => {
        const _onChange = (value) => {
            this.setState({
                email: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Email*"}
                value={this.state.email}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.emailActive}
                onFocus={() => { this.setState({ emailActive: true }) }}
                onBlur={() => { this.setState({ emailActive: false }) }}

            />
        )
    }

    pinCodeSection = () => {
        const _onChange = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "number")
            this.setState({
                pincode: newText
            })
        }
        return (
            <TextInputBox
                placeholder={"Pincode*"}
                value={this.state.pincode}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.pincodeActive}
                onFocus={() => { this.setState({ pincodeActive: true }) }}
                onBlur={() => { this.setState({ pincodeActive: false }) }}
                maxLength={6}
                keyboardType={"number-pad"}
            />
        )
    }

    addressSection = () => {
        const _onChange = (value) => {

            this.setState({
                address: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Address*"}
                value={this.state.address}
                borderRadius={25}
                height={90}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.addressActive}
                onFocus={() => { this.setState({ addressActive: true }) }}
                onBlur={() => { this.setState({ addressActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
            />
        )
    }

    noteSection = () => {
        const _onChange = (value) => {

            this.setState({
                notes: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Notes"}
                value={this.state.notes}
                borderRadius={25}
                height={105}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.notesActive}
                onFocus={() => { this.setState({ notesActive: true }) }}
                onBlur={() => { this.setState({ notesActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
            />
        )
    }

    buttonSection = () => {

        const onResetData = () => {
            this.setState({

                firstName: "",
                lastName: "",
                enquirySourceObj: {},
                enquiryTypeObj: {},
                brandObj: {},
                phone: "",
                email: "",
                address: "",
                countryObj: {},
                stateObj: {},
                districtObj: {},
                zoneObj: {},
                city: "",
                pincode: "",
                notes: "",
            })
        }

        const onSubmitData = async () => {
            if (this.props.type == "edit") {
                let reqData = {
                    "enquiryPage": "gamification",
                    "enquiryId": this.props.mainData.enqueryId.toString(),
                    "enquirySourceId": this.state.enquirySourceObj.id ? this.state.enquirySourceObj.id.toString() : "",
                    "enquiryTypeId": this.state.enquiryTypeObj.id ? this.state.enquiryTypeObj.id.toString() : "",
                    "enquirySourceTypeId": this.state.enquiryTypeObj.id ? this.state.enquiryTypeObj.id.toString() : "",
                    "ownerName": this.state.firstName + " " + this.state.lastName,
                    "emailArr": [],
                    "phoneNumberArr": [],
                    "ownerPhone": [this.state.phone],
                    "ownerEmail": [this.state.email],
                    "ownerFirstName": this.state.firstName ? this.state.firstName : "",
                    "ownerLastName": this.state.lastName ? this.state.lastName : "",
                    "enqAddress": this.state.address ? this.state.address : "",
                    "businessType": "New",
                    "businessId": this.state.businessId.toString(),
                    "businessName": "",
                    "businessAddress": "",
                    "businessEmail": [],
                    "businessPhone": [],
                    "businessPhoneArr": [],
                    "businessEmailArr": [],
                    "stateId": this.state.stateObj.id ? this.state.stateObj.id.toString() : "",
                    "districtId": this.state.districtObj.id ? this.state.districtObj.id.toString() : "",
                    "cityVillage": this.state.city ? this.state.city.toString() : "",
                    "zoneId": this.state.zoneObj.id ? this.state.zoneObj.id.toString() : "",
                    "pincode": this.state.pincode ? this.state.pincode.toString() : "",
                    "notes": this.state.notes ? this.state.notes : "",
                    "countryId": this.state.countryObj.id.toString(),
                    "brandId": this.state.brandObj.id.toString(),
                    "approvedStatus":this.state.approvedStatus.toString()
                    
                }
                let validatedData = validateData(reqData);
                if (validatedData.status) {
                    this.setState({ addLoader: true })
                    let responseData = await MiddlewareCheck("editInternalEnquiry", reqData, this.props);
                    if (responseData === false) {
                    } else {
                        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            Toaster.ShortCenterToaster(responseData.message);
                            onResetData()
                            this.props.onSaveDataToParent({ type: "edit" })
                        } else {
                            Toaster.ShortCenterToaster(responseData.message)
                        }
                    }
                    this.setState({ addLoader: false })
                }

            }
            else {
                let reqData = {
                    "enquiryPage": "gamification",
                    "enquirySourceId": this.state.enquirySourceObj.id ? this.state.enquirySourceObj.id : "",
                    "enquiryTypeId": this.state.enquiryTypeObj.id ? this.state.enquiryTypeObj.id : "",
                    "ownerName": this.state.firstName + " " + this.state.lastName,
                    "emailArr": [],
                    "phoneNumberArr": [],
                    "ownerPhone": [this.state.phone],
                    "ownerEmail": [this.state.email],
                    "ownerFirstName": this.state.firstName ? this.state.firstName : "",
                    "ownerLastName": this.state.lastName ? this.state.lastName : "",
                    "enqAddress": this.state.address ? this.state.address : "",
                    "businessType": "",
                    "businessId": "",
                    "businessName": "",
                    "businessAddress": "",
                    "businessEmail": [],
                    "businessPhone": [],
                    "businessPhoneArr": [],
                    "businessEmailArr": [],
                    "stateId": this.state.stateObj.id ? this.state.stateObj.id : "",
                    "districtId": this.state.districtObj.id ? this.state.districtObj.id : "",
                    "cityVillage": this.state.city ? this.state.city : "",
                    "zoneId": this.state.zoneObj.id ? this.state.zoneObj.id : "",
                    "pincode": this.state.pincode ? this.state.pincode : "",
                    "notes": this.state.notes ? this.state.notes : "",
                    "countryId": this.state.countryObj.id,
                    "brandId": this.state.brandObj.id
                }

                let validatedData = validateData(reqData);
                if (validatedData.status) {
                    this.setState({ addLoader: true })
                    let responseData = await MiddlewareCheck("addGamificationEnquiry", reqData, this.props);
                    if (responseData === false) {
                    } else {
                        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            Toaster.ShortCenterToaster(responseData.message);
                            onResetData()
                            this.props.onSaveDataToParent()
                        } else {
                            Toaster.ShortCenterToaster(responseData.message)
                        }
                    }
                    this.setState({ addLoader: false })
                }
            }

        }
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {this.state.addLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center",width:Dimension.width }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <>
                        <View style={{ width: 90 }}>
                            {this.props.type == "edit" ? null
                                :
                                < BigTextButton
                                    text={"Reset"}
                                    backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                    fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                    additionalStyles={{ borderWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE }}
                                    borderRadius={25}
                                    fontSize={12}
                                    onPress={() => onResetData()}
                                />
                            }
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: 90 }}>
                            <BigTextButton
                                text={this.props.type == "edit" ? "Update" : "Submit"}
                                backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                borderRadius={25}
                                fontSize={12}
                                onPress={() => onSubmitData()}
                            />
                        </View>
                    </>
                }

            </View>
        )
    }

    render() {
        return (
            <View style={{ height: Dimension.height }}>
                {this.state.pageLoader ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: Dimension.height / 1.5 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} scrollsToTop={this.state.scroll}>
                        <View style={styles.mainView}>
                            <View style={styles.centerView}>
                                <Image source={ImageName.LEAD_REFER_ICON} style={styles.referLeadLogo} />
                                <Text style={styles.textReferLead}>Refer a Lead</Text>
                                <View style={styles.flexRowView}>
                                    {/* <Text style={styles.textReferrenceId}>Your Reference ID: <Text style={styles.referrenceNo}>DR43245</Text></Text> */}
                                    <View style={{ marginLeft: '5%', marginTop: 2 }}>
                                        <Image source={ImageName.PDF_COPY_IMG} style={styles.pdfImg} />
                                    </View>
                                </View>
                                <Text style={styles.textCustomerInfo}>Customer information</Text>
                            </View>
                            <View style={{ marginTop: 10 }} />
                            {this.firstNameSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.lastNameSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.enquirySourceSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.enquiryTypeSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.brandSection()}


                            <View style={styles.locationView}>
                                <Text style={styles.textLocation}>Location</Text>
                            </View>
                            <View style={{ marginTop: 10 }} />
                            {this.countrySection()}
                            <View style={{ marginTop: 20 }} />
                            {this.stateSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.districtSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.zoneSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.citySection()}
                            <View style={{ marginTop: 20 }} />
                            {this.pinCodeSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.addressSection()}
                            <View style={styles.locationView}>
                                <Text style={styles.contactInfo}>Contact Info</Text>
                            </View>
                            <View style={{ marginTop: 10 }} />
                            {this.phoneSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.emailSection()}
                            <View style={{ marginTop: 20 }} />
                            {this.noteSection()}
                            <View style={{ marginTop: 30 }} />
                            {this.buttonSection()}

                            <View style={{ marginBottom: 150 }} />
                        </View>
                    </ScrollView>
                }

            </View >
        )
    };
};


export default GamificationReferLead;