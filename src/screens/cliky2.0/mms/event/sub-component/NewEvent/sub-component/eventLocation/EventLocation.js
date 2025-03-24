
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import { Color, Dimension, FontFamily, ImageName } from "../../../../../../../../enums";
import { DateConvert, FileUpload, GetUserData, Toaster } from "../../../../../../../../services/common-view-function";
import { App_uri } from "../../../../../../../../services/config";
import { CommonData, ErrorCode } from "../../../../../../../../services/constant";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../../../../../../services/middleware";
import { DropdownInputBox, ImageUploadModal, Loader, TextButton } from "../../../../../../../../shared";
import BigTextButton from "../../../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyStateArrData, modifyZoneArrData, stateModifyData, zoneModifyData } from "./function";
import styles from "./style";

class EventLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allPageData: {},
            visibleProfileImgUploadModal: false,
            registrationObjData: {},
        };
    }

    componentDidMount = async () => {
        this.setState({ allPageData: this.props.allPageData})

        this._onLoad();
    }
    _onLoad = async () => {
        let UserInfo = await GetUserData.getAllUserData()
        this.getStateData(UserInfo.countryId)
         this.setState({  pageLoader: false })
         StoreUserOtherInformations("", {}, this.props);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // get state array

    getStateData = async (value) => {
        let reqData = {
            countryId: value
        }
        this.setState({ stateLoader: true })
        let responseData = await MiddlewareCheck("getaStateData", reqData);
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

    // get district array
    getDistrictData = async (value) => {
        let reqData = {
            stateId: value
        }
        this.setState({ distLoader: true })
        let responseData = await MiddlewareCheck("getaDistrictData", reqData);
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

    // zone array

    getZoneData = async (value) => {
        let reqData = {
            cityId: value.id
        }
        this.setState({ zoneLoader: true })
        let responseData = await MiddlewareCheck("getaZoneData", reqData);
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

    countrySection = () => {

        const _onSelect = async(data) => {
           this.state.allPageData.selectedCountryObj = data;

           await this.setState({
                allPageData: this.state.allPageData
            })
            await this.getStateData(data);
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedCountryObj.id ? this.state.allPageData.selectedCountryObj.id.toString() : "0"}
                    data={this.state.allPageData.countryArr}
                    onSelect={(value) => _onSelect(value)}
                    headerText={"Select Country"}
                    height={50}
                />
            </View>
        )
    }

    stateSection = () => {

        const _onSelect = async(data) => {
            this.state.allPageData.selectedStateObj = data;

            this.setState({
                allPageData: this.state.allPageData
            })
            await this.getDistrictData(data.id);
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedStateObj.id ? this.state.allPageData.selectedStateObj.id.toString() : "0"}
                    data={this.state.allPageData.stateArr}
                    onSelect={(value) => _onSelect(value)}
                    headerText={"Select State"}
                    height={50}
                />
            </View>
        )
    }

    districtSection = () => {
        const _onSelect = async(data) => {
            this.state.allPageData.selectedDistrictObj = data;

            this.setState({
                allPageData: this.state.allPageData
            })
            await this.getZoneData(data);
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id.toString() : "0"}
                    data={this.state.allPageData.districtArr}
                    onSelect={(value) => _onSelect(value)}
                    headerText={"Select District"}
                    height={50}
                />
            </View>
        )
    }

    zoneSection = () => {
        const _onSelect = async(data) => {
            this.state.allPageData.selectedZoneObj = data;

            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedZoneObj.id ? this.state.allPageData.selectedZoneObj.id.toString() : "0"}
                    data={this.state.allPageData.zoneArr}
                    onSelect={(value) => _onSelect(value)}
                    headerText={"Select Zone"}
                    height={50}
                />
            </View>
        )
    }

    citySection = () => {

        const _onChangeCity = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "nameSpace");
            this.state.allPageData.city = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={20}
                    value={this.state.allPageData.city}
                    onChangeText={(value) => _onChangeCity(value)}
                    placeholder={"Write City"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.cityActive}
                    onFocus={() => { this.state.allPageData.cityActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.cityActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={50}
                    returnKeyType={'default'}
                />
            </View>
        )
    }

    pincodeSection = () => {

        const _onChangePincode = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.allPageData.pincode = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={20}
                    value={this.state.allPageData.pincode}
                    onChangeText={(value) => _onChangePincode(value)}
                    placeholder={"Write Location Pincode"}
                    keyboardType={"number-pad"}
                    isActive={this.state.allPageData.pincodeActive}
                    onFocus={() => { this.state.allPageData.pincodeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.pincodeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={50}
                    returnKeyType={'default'}
                />
            </View>
        )
    }

    addressSection = () => {

        const _onChangeAddress = (value) => {
            // let newText = '';
            // newText = DataValidator.inputEntryValidate(value, "nameSpace");
            this.state.allPageData.address = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={20}
                    value={this.state.allPageData.address}
                    onChangeText={(value) => _onChangeAddress(value)}
                    placeholder={"Write Detail address"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.addressActive}
                    onFocus={() => { this.state.allPageData.addressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.addressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={90}
                    returnKeyType={'default'}
                    alignItems={"flex-start"}
                    multiline={true}
                />
            </View>
        )
    }



    _onSave = () => {

        // let reqData = {
        //     "sourceType": this.state.allPageData.selectedCustomerSourceTypeObj.id ? this.state.allPageData.selectedCustomerSourceTypeObj.id : "0",
        //     "contactType": this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id : "",
        //     "profilePic": this.state.allPageData.profileImg ? this.state.allPageData.profileImg : "",
        //     "visitDate": this.state.allPageData.visitDateObj.visitDate ? DateConvert.formatYYYYMMDD(this.state.allPageData.visitDateObj.rawDate) : "",
        //     "customerTypeId": this.state.allPageData.selectedCustomerTypeObj.id ? this.state.allPageData.selectedCustomerTypeObj.id : "",
        //     "custBusinessName": this.state.allPageData.businessName ? this.state.allPageData.businessName : "",
        //     "firstName": this.state.allPageData.firstName ? this.state.allPageData.firstName : "",
        //     "lastName": this.state.allPageData.lastName ? this.state.allPageData.lastName : "",
        //     "gender": this.state.allPageData.selectedGenderObj.sName ? this.state.allPageData.selectedGenderObj.sName : "",
        //     "dob": this.state.allPageData.dobDateObj.dobDate ? DateConvert.formatYYYYMMDD(this.state.allPageData.dobDateObj.rawDate) : "",
        //     "title": this.state.allPageData.title,
        //     "customerDescription": this.state.allPageData.customerDesription,
        //     "erpCode": this.state.allPageData.erpCode ? this.state.allPageData.erpCode : ""
        // }
        // let validData = validateData(reqData);
        // if (validData.status == true) {
        let data = {
            type: "next",
            data: reqData,
            pageNum: 2
        }
        this.props.onSaveDataToParent(data);
        // }
    }

    _onBack = () => {
        let data = {
            pageNum: 1,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }



    render() {
        return (
            <View >
                {this.state.pageLoader ? <View style={{ height: Dimension.height / 1.1, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View> : <>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Event Location</Text>

                            </View>
                        </View>

                            {/* {this.countrySection()} */}
                            {this.stateSection()}
                            {this.districtSection()}
                            {this.zoneSection()}
                            {this.citySection()}
                            {this.pincodeSection()}
                            {this.addressSection()}
                            

                        <View style={{ marginTop: 20, marginBottom: 40, flexDirection: "row", flex: 1 }}>
                            <View style={{ flex: 0.4 }} >

                                <BigTextButton
                                    backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                    borderRadius={25}
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                            </View>
                            <View style={{ flex: 0.2 }} />
                            <View style={{ flex: 0.4 }}>
                                <BigTextButton
                                    backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                    borderRadius={25}

                                    text={"Submit"}
                                    onPress={() => this._onSave()}
                                />
                            </View>

                        </View>
                        {/* </View> */}
                        <View style={{ height: 150 }} />
                    </ScrollView>
                </>}


            </View>
        )
    }
}


export default EventLocation;