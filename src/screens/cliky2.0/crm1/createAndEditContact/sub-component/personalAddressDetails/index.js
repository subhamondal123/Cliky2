import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Color, Dimension } from "../../../../../../enums";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
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

            // allCountry: [],
            // selectedCountry: {},
            // allState: [],
            // selectedState: {},
            // allDistrictCity: [],
            // selectedDistrictCity: {},
            // allZone: [],
            // selectedZone: {},

            // stateLoader: false,
            // distLoader: false,
            // zoneLoader: false,

        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getHierarchyTypesSlNo();
    }

    _onLoad = async () => {
        this.setState({ pageloader: false, allPageData: this.props.allPageData })

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

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.address = newText
        this.setState({ allPageData: this.state.allPageData })
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
            pageNum: 1
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let data = {
            "contactAddress": this.state.allPageData.address,
            "address": this.state.allPageData.address,
            "hierarchyDataId": this.state.allPageData.locationData.hierarchyDataId,
            "hierarchyTypeId": this.state.allPageData.locationData.hierarchyTypeId,
            "locationArr": this.state.allPageData.locationData,
            "locationData": [this.state.allPageData.locationData]

        }
        let validatedData = validateData(data);
        if (validatedData.status) {

            let uata = {
                type: "next",
                pageNum: 3,
                data: data
            }
            this.props.onSaveDataToParent(uata);
        }
    }

    render() {
        if (this.state.pageloader) {
            return (
                <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ marginVertical: 15 }}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Address Details</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
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
                </View>
            )
        }
    }
}

export default PersonalAddressDetails;