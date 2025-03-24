import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyLocationMappedData, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../../pageShared";
import { StorageDataModification } from "../../../../../../services/common-view-function";


class BusinessAddressDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            locationLoader: false,
            allPageData: {},
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

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.businessAddress = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    onSelectLocationData = (val) => {
        this.state.allPageData.orgLocationData = val.value
        this.state.allPageData.orgLocationArr = val.totalData
        // this.state.locationArr = val.totalData;
        // this.state.locationObj = val.value;
        this.setState({ allPageData: this.state.allPageData })
    }



    _onBack = () => {
        let data = {
            type: "previous",
            pageNum: 2
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let reqData = {
            orgAddress: this.state.allPageData.businessAddress ? this.state.allPageData.businessAddress : "",
            orgCountryId: this.state.allPageData.selectedBusinessCountryObj.id ? this.state.allPageData.selectedBusinessCountryObj.id : "",
            orgStateId: this.state.allPageData.selectedBusinessStateObj.id ? this.state.allPageData.selectedBusinessStateObj.id : "",
            orgDistrictId: this.state.allPageData.selectedBusinessDistrictObj.id ? this.state.allPageData.selectedBusinessDistrictObj.id : "",
            orgZoneId: this.state.allPageData.selectedBusinessZoneObj.id ? this.state.allPageData.selectedBusinessZoneObj.id : "",
            "locationArr": this.state.allPageData.orgLocationData,
            "orgLocationData":[this.state.allPageData.orgLocationData]

        }
        let valid = validateData(reqData);
        if (valid.status) {
            let data = {
                type: "next",
                pageNum: 4,
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
                                    <Text style={styles.listHeaderText}>Business Address Details</Text>

                                </View>
                            </View>


                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{"*"}</Text>Address</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.businessAddress}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Enter Address"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.businessAddressActive}
                                    onFocus={() => { this.state.allPageData.businessAddressActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.businessAddressActive = false; this.setState({ allPageData: this.state.allPageData }) }}
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
                                        editData={this.props.allPageData.orgLocationArr}
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

export default BusinessAddressDetails;