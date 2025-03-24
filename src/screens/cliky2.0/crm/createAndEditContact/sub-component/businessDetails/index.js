import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Color, Dimension, ImageName } from "../../../../../../enums";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { StorageDataModification } from "../../../../../../services/common-view-function";


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

        // await this.getCountryData();
        // if (this.props.allData.selectedOrgCountry) {
        //     await this.getStateData({ id: this.props.allData.selectedOrgCountry })
        // }
        // if (this.props.allData.selectedOrgState) {
        //     await this.getDistrictData({ id: this.props.allData.selectedOrgState })
        // }
        // if (this.props.allData.selectedOrgDistrictCity) {
        //     await this.getZoneData({ id: this.props.allData.selectedOrgDistrictCity })
        // }
        // let modifiedData = modifyData(this.props.allData, this.state.allCountry, this.state.allState, this.state.allDistrictCity, this.state.allZone);
        // this.setState(modifiedData);
        // this.setState({ pageloader: false })
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

    _onChangeOrgName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.orgName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.orgPhoneNumberArr[key].phoneNumber = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "email");
        this.state.allPageData.orgEmailArr[key].emailId = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.orgAddress = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    getCountryData = async () => {
        this.setState({
            allCountry: this.props.contactLandingData.countryData,
        })
    }


    _onChangeAnnualRevenue = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.annualRevenue = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeNumOfEmp = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.numOfEmp = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onAddPhoneNumber = () => {
        this.state.allPageData.orgPhoneNumberArr.push({ "phoneNumber": "", "phoneNumberActive": false });
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeletePhoneNumber = (key) => {

        this.state.allPageData.orgPhoneNumberArr.splice(key, 1);
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />

            </React.Fragment>
        )
    }

    _onAddEmail = () => {
        this.state.allPageData.orgEmailArr.push({ "emailId": "", "emailActive": false });
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteEmail = (key) => {
        this.state.allPageData.orgEmailArr.splice(key, 1);
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onBack = () => {
        let data = {
            pageNum: 2
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let emailId = [];
        this.props.allPageData.orgEmailArr.map((obj) => {
            emailId.push(obj.emailId)
        })

        let phoneId = [];
        this.props.allPageData.orgPhoneNumberArr.map((obj) => {
            phoneId.push(obj.phoneNumber)
        })
        if (this.props.allData.selectedContactBusinessTypeData == 1) {
            let data = {
                "orgName": this.state.allPageData.orgName,
                "orgAddress": this.state.allPageData.orgAddress,
                "selectedOrgCountry": this.state.selectedCountry.id ? this.state.selectedCountry.id : "",
                "selectedOrgState": this.state.selectedState.id ? this.state.selectedState.id : "",
                "selectedOrgDistrictCity": this.state.selectedDistrictCity.id ? this.state.selectedDistrictCity.id : "",
                "selectedOrgZone": this.state.selectedZone.id ? this.state.selectedZone.id : "",
                "orgAnnualRevenue": this.state.allPageData.annualRevenue,
                "orgPhoneNumber": phoneId,
                "orgEmail": emailId,
                "orgNumOfEmp": this.state.allPageData.numOfEmp,
                "orgPhoneNumberArr": this.state.allPageData.orgPhoneNumberArr,
                "orgEmailArr": this.state.allPageData.orgEmailArr,

            }

            let validatedData = validateData(data);
            if (validatedData.status) {
                let uata = {
                    type: "next",
                    pageNum: 4,
                    data: data
                }
                this.props.onSaveDataToParent(uata);
            }
        } else {
            let uata = {
                type: "next",
                pageNum: 4,
            }
            this.props.onSaveDataToParent(uata);
        }
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
                        <View style={{ marginVertical: 15 }}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Business Details</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            {this.props.allData.selectedContactBusinessTypeData == 1 ?
                                <React.Fragment>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.orgName}
                                            onChangeText={(value) => this._onChangeOrgName(value)}
                                            placeholder={"Enter Organization Name"}
                                            keyboardType={"default"}
                                            isActive={this.state.allPageData.orgNameActive}
                                            onFocus={() => { this.state.allPageData.orgNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.orgNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.address}
                                            onChangeText={(value) => this._onChangeAddress(value)}
                                            placeholder={"Enter Address"}
                                            keyboardType={"default"}
                                            multiline={true}
                                            alignItems={"flex-start"}
                                            isActive={this.state.allPageData.addressActive}
                                            onFocus={() => { this.state.allPageData.addressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.addressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={90}
                                            returnKeyType={'default'}
                                        />
                                    </View>



                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.annualRevenue}
                                            onChangeText={(value) => this._onChangeAnnualRevenue(value)}
                                            placeholder={"Enter Annual Revenue"}
                                            keyboardType={"numeric"}
                                            isActive={this.state.allPageData.annualRevenueActive}
                                            onFocus={() => { this.state.allPageData.annualRevenueActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.annualRevenueActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ height: 10 }} />
                                        <TextInputBox
                                            value={this.state.allPageData.numOfEmp}
                                            onChangeText={(value) => this._onChangeNumOfEmp(value)}
                                            placeholder={"Enter Number Of Employee"}
                                            keyboardType={"numeric"}
                                            isActive={this.state.allPageData.numOfEmpActive}
                                            onFocus={() => { this.state.allPageData.numOfEmpActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.numOfEmpActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        {this.state.allPageData.orgPhoneNumberArr.map((item, key) => (
                                            <View style={{ marginTop: 8 }} key={key}>
                                                <TextInputBox
                                                    value={item.phoneNumber}
                                                    onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                                                    placeholder={"Enter Phone Number"}
                                                    keyboardType={"numeric"}
                                                    isActive={item.phoneNumberActive}
                                                    maxLength={10}
                                                    onFocus={() => {
                                                        this.state.allPageData.orgPhoneNumberArr[key].phoneNumberActive = true;
                                                        this.setState({ allPageData: this.state.allPageData })
                                                    }}
                                                    onBlur={() => {
                                                        this.state.allPageData.orgPhoneNumberArr[key].phoneNumberActive = false;
                                                        this.setState({ allPageData: this.state.allPageData })
                                                    }}
                                                    height={45}
                                                    returnKeyType={'default'}
                                                    rightIcon={ImageName.DELETE_WITH_RED}
                                                    isRightIcon={this.state.allPageData.orgPhoneNumberArr.length > 1 ? true : false}
                                                    onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                                                />
                                            </View>
                                        ))}
                                        {this.state.allPageData.orgPhoneNumberArr.length < 2 ?
                                            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                                <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                            </View> :
                                            null
                                        }
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        {this.state.allPageData.orgEmailArr.map((item, key) => (
                                            <View style={{ marginTop: 8 }} key={key}>
                                                <TextInputBox
                                                    value={item.emailId}
                                                    onChangeText={(value) => this._onChangeEmail(value, key)}
                                                    placeholder={"Enter Email Id"}
                                                    keyboardType={"email-address"}
                                                    isActive={item.emailActive}
                                                    onFocus={() => {
                                                        this.state.allPageData.orgEmailArr[key].emailActive = true;
                                                        this.setState({ allPageData: this.state.allPageData })
                                                    }}
                                                    onBlur={() => {
                                                        this.state.allPageData.orgEmailArr[key].emailActive = false;
                                                        this.setState({ allPageData: this.state.allPageData })
                                                    }}
                                                    height={45}
                                                    returnKeyType={'default'}
                                                    rightIcon={ImageName.DELETE_WITH_RED}
                                                    isRightIcon={this.state.allPageData.orgEmailArr.length > 1 ? true : false}
                                                    onPressRightIcon={() => this._onDeleteEmail(key)}
                                                />
                                            </View>

                                        ))}
                                        {this.state.allPageData.orgEmailArr.length < 2 ?
                                            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                                <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                            </View> :
                                            null
                                        }
                                    </View>





                                </React.Fragment>
                                :
                                null
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

export default BusinessDetails;