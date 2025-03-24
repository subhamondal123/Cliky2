import React from "react";
import {
    View,
    ScrollView,
    Text,
} from "react-native";
import { Color, Dimension } from "../../../../../enums";
import { GetUserData, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { ErrorCode, LengthValidate } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { BigTextButton, DropdownInputBox, Loader, TextInputBox } from "../../../../../shared";
import { DataValidator } from "../../../../../validators";
import { modifyLocationMappedData, modifyZoneArr, validateRequestData } from "./function";
import styles from "./style";
import { DynamicLocationMapping } from "../../../../../pageShared";

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},

            locationLoader: false,
        }
    }

    componentDidMount = async () => {
        await this.load();
        await this._getHierarchyTypesSlNo()

    }

    load = async () => {

        this.setState({
            allPageData: this.props.allPageData,
            pageloader: false
        })
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




    mainContent = () => {
        return (
            <View style={styles.container}>
                <View style={styles.blueBox}>
                    <View style={styles.blueViewFlex}>
                        <Text style={styles.listHeaderText}>Personal Details</Text>
                    </View>
                </View>

                {this.phoneNumber()}
                {this.email()}
                {this.address()}
                {this.location()}
                {/* {this.stateSection()}
                {this.districtSection()}
                {this.zoneSection()} */}
                {this.remarksSection()}
                {this.buttonSection()}
            </View>
        )
    }

    onSelectLocationData = (val) => {
        this.state.allPageData.locationData = val.value
        this.state.allPageData.locationArr = val.totalData
        this.setState({ allPageData: this.state.allPageData })
    }

    location = () => {
        return (
            <View style={{ marginBottom: 15 }}>
                <View style={{ height: 10 }} />
                {this.state.locationLoader ?
                    null :
                    <>
                        <DynamicLocationMapping
                            // type={"lastHierarcyField"}
                            editData={this.state.allPageData.locationArr}
                            screenName={"Crm"}
                            marginBottom={15}
                            flexDirection={"column"}
                            viewType={"edit"}
                            isLabelVisible={false}
                            onApiCallData={(value) => this.onSelectLocationData(value)} />

                    </>
                }

            </View>
        )
    }

    phoneNumber = () => {
        const _onChangePhoneNumber = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "mobile");
            this.state.allPageData.phoneNo = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.phoneNo}
                    onChangeText={(value) => _onChangePhoneNumber(value)}
                    placeholder={"Phone Number*"}
                    keyboardType={"number-pad"}
                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                    isActive={this.state.allPageData.phoneNoActive}
                    onFocus={() => {
                        this.state.allPageData.phoneNoActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.phoneNoActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                />
            </View>
        )
    }

    email = () => {
        const _onChangeEmail = (value) => {
            this.state.allPageData.email = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}>Business Name</Text> */}
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.email}
                    onChangeText={(value) => _onChangeEmail(value)}
                    placeholder={"Email"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.emailActive}
                    onFocus={() => {
                        this.state.allPageData.emailActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.emailActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                />
            </View>
        )
    }

    address = () => {
        const _onChangeOwnerName = (value) => {
            this.state.allPageData.address = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}>Business Name</Text> */}
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.address}
                    onChangeText={(value) => _onChangeOwnerName(value)}
                    placeholder={"Address*"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.addressActive}
                    alignItems={"flex-start"}
                    onFocus={() => {
                        this.state.allPageData.addressActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.addressActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={110}
                />
            </View>
        )
    }



    remarksSection = () => {
        const _onChangeRemarks = (value) => {
            this.state.allPageData.remarks = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}>Business Name</Text> */}
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.remarks}
                    onChangeText={(value) => _onChangeRemarks(value)}
                    placeholder={"Remarks*"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.remarksActive}
                    alignItems={"flex-start"}
                    onFocus={() => {
                        this.state.allPageData.remarksActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.remarksActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={110}
                />
            </View>
        )
    }

    buttonSection = () => {
        const _onPrevious = (type) => {
            this.props.onParentCallBack({ pageNum: 1, data: this.state.allPageData, type: type })
        }
        const _onStartSurvey = async (type) => {
            let validateResult = validateRequestData(this.state.allPageData);
            if (validateResult.status) {
                // this.setState({
                //     pageloader: true
                // })
                let reqData = {
                    "surveyId": this.props.route.params.data.surveyId ? this.props.route.params.data.surveyId.toString() : "0",
                    "customerId": "0",
                    // "productData": this.state.allPageData.productData,
                    "productId": this.props.route.params.data.productId ? this.props.route.params.data.productId.toString() : "0",
                    // "visitorTypeId": this.state.allPageData.selectedVisitorTypeObj.id ? this.state.allPageData.selectedVisitorTypeObj.id.toString() : "0",
                    // "organizationName": this.state.allPageData.orgName,
                    // "ownerName": this.state.allPageData.ownerName,
                    "phone": this.state.allPageData.phoneNo,
                    "email": this.state.allPageData.email,
                    "address": this.state.allPageData.address,
                    "locationData": this.state.allPageData.locationData,
                    // "stateId": this.state.allPageData.selectedStateObj.id ? this.state.allPageData.selectedStateObj.id : "0",
                    // "cityId": this.state.allPageData.selectedDistrictObj.id ? this.state.allPageData.selectedDistrictObj.id : "0",
                    // "zoneId": this.state.allPageData.selectedZoneObj.id ? this.state.allPageData.selectedZoneObj.id : "0",
                    "remarks": this.state.allPageData.remarks
                }
                this.props.onParentCallBack({ pageNum: 2, data: reqData, type: type })

                // let responseData = await MiddlewareCheck("startSurvey", reqData, this.props);
                // if (responseData == false) {
                //     this._onNetworkError();
                // } else {
                //     if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                //         this.props.route.params.onStartSurvey();
                //         Toaster.ShortCenterToaster("Survey Started Successfully !")
                //         this.props.navigation.replace("SurveyQuestions", { data: { item: this.props.route.params.data, surveyReportId: responseData.data.surveyReportId } });
                //         // this.props.navigation.goBack();
                //     } else {
                //         Toaster.ShortCenterToaster(responseData.message)
                //     }
                // }
                this.setState({
                    pageloader: false
                })
            }
        }
        return (
            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                <BigTextButton
                    text={"Previous"}
                    color={Color.COLOR.BLUE.EBONY_CLAY}
                    onPress={() => _onPrevious("prev")}
                />
                <View style={{ width: "5%" }} />
                <BigTextButton
                    text={"Start Survey"}
                    onPress={() => _onStartSurvey("next")}
                />
            </View>
        )
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

                        {this.mainContent()}

                    </ScrollView>
                }
            </View>
        )
    }
}

export default PersonalDetails;