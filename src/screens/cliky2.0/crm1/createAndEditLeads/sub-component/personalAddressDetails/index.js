import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Dimension } from "../../../../../../enums";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { StorageDataModification } from "../../../../../../services/common-view-function";
import { DynamicLocationMapping } from "../../../../../../pageShared";


class PersonalAddressDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            locationLoader: false,

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
                }
                else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ locationLoader: false })

        return true;
    }

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.personalAddress = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectCountry = (value) => {
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

    _onSelectState = (value) => {
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


    _onSelectDistrictCity = (value) => {
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
            selectedZone: value,
            allZone: data,
        })
    }

    onSelectLocationData = (val) => {
        this.state.allPageData.locationData = val.value
        this.state.allPageData.locationArr = val.totalData
        // this.state.locationArr = val.totalData;
        // this.state.locationObj = val.value;
        this.setState({ allPageData: this.state.allPageData })
    }

    _onBack = () => {
        let data = {
            pageNum: 1,
            type: "previous",
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let reqData = {
            'address': this.state.allPageData.personalAddress ? this.state.allPageData.personalAddress : "",
            "hierarchyDataId": this.state.allPageData.locationData.hierarchyDataId,
            "hierarchyTypeId": this.state.allPageData.locationData.hierarchyTypeId,
            "locationArr": this.state.allPageData.locationData,
          
            'countryId': this.state.allPageData.selectedPersonalCountryObj.id ? this.state.allPageData.selectedPersonalCountryObj.id : "",
            'stateId': this.state.allPageData.selectedPersonalStateObj.id ? this.state.allPageData.selectedPersonalStateObj.id : "",
            'districtId': this.state.allPageData.selectedPersonalDistrictObj.id ? this.state.allPageData.selectedPersonalDistrictObj.id : "",
            'cityId': this.state.allPageData.selectedPersonalDistrictObj.id ? this.state.allPageData.selectedPersonalDistrictObj.id : "",
            'zoneId': this.state.allPageData.selectedPersonalZoneObj.id ? this.state.allPageData.selectedPersonalZoneObj.id : "",
        }

        let validData = validateData(reqData)
        if (validData.status) {
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
                                    <Text style={styles.listHeaderText}>Personal Address Details</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.personalAddress}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Enter Address*"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.personalAddressActive}
                                    onFocus={() => { this.state.allPageData.personalAddressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.personalAddressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    returnKeyType={'default'}
                                    alignItems={"flex-start"}
                                />
                            </View>

                            {this.state.locationLoader ?
                                null :
                                <>
                                    <DynamicLocationMapping
                                        // type={"lastHierarcyField"}
                                        editData={this.props.allPageData.locationArr}
                                        screenName={"Crm"}
                                        marginBottom={15}
                                        flexDirection={"column"}
                                        viewType={"edit"}
                                        isLabelVisible={false}
                                        onApiCallData={(value) => this.onSelectLocationData(value)} />

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

export default PersonalAddressDetails;