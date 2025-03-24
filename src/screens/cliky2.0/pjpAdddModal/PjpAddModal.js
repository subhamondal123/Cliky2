import React from "react";
import { AlertMessage, Color, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBox, DropdownInputBox, Modal, BigTextButton } from "../../../shared";
import DatePicker from "react-native-date-picker";
import { DateConvert, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { modifyDataForApi, modifyDistArr, modifyStateArr, modifySubordinateArr, modifySubordinateArrV2, modifyZoneArr, validatePjpDetails } from "./Function";
import { DynamicLocationMapping } from "../../../pageShared";


class PjpAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allDistrictCity: [],
            zoneLoader: false,
            allZone: [],
            stateArr: [],
            stateArrForSubordinate: [],
            allSubordinate: [],
            locationLoader: false,
            createPjpModalObj: {
                fieldVisitId: "",
                assigningType: true,
                selectDate: "",
                visibleSelectDate: false,
                selectRawDate: new Date(),
                stateObj: {},
                districtObj: {},
                zoneObj: {},
                subOrdinateObj: {},
                locationObj: [],
                locationArr: []
            }
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let userData = await GetUserData.getAllUserData();
        await this._onGetStateData(userData.countryId);
        if (this.props.data == undefined || this.props.data == null) {
            await this._onGetSubordinateData();
        } else {
            await this._onGetSubordinateDataByCustomerId();
        }
        if (this.props.data == undefined || this.props.data == null) {
            // this.state.createPjpModalObj.stateObj = {};
            // this.state.createPjpModalObj.districtObj = {};
            // this.state.createPjpModalObj.zoneObj = {};
            this.state.createPjpModalObj.locationObj = [];
            this.state.createPjpModalObj.locationArr = [];
            this.state.createPjpModalObj.fieldVisitId = "";
        } else {
            // this.state.createPjpModalObj.stateObj.id = this.props.data.stateId;
            // this.state.createPjpModalObj.districtObj.id = this.props.data.cityId;
            // this.state.createPjpModalObj.zoneObj.id = this.props.data.zoneId;
            this.state.createPjpModalObj.locationObj = this.props.data.locationData;
            this.state.createPjpModalObj.locationArr = this.props.data.locationArr;
            this.state.createPjpModalObj.fieldVisitId = this.props.data.id;
        }

        this.setState({
            createPjpModalObj: this.state.createPjpModalObj,
            pageLoader: false,
        })
    }

    // for get state data by country
    _onGetStateData = async (countryId) => {
        let responseData = await MiddlewareCheck("getaStateData", { "countryId": countryId }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    stateArr: modifyStateArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for get state data by subordinate id
    _onGetSubordinateStateData = async (data) => {
        this.setState({ stateLoader: true });
        let responseData = await MiddlewareCheck("getStateForSubordinate", { "countryId": data.countryId, "subordinateId": data.id }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    stateArrForSubordinate: modifyStateArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ stateLoader: false });
    }

    // for get state data by country
    _onGetDistCityData = async (stateId) => {
        this.setState({ distLoader: true });
        let responseData = await MiddlewareCheck("getaDistrictData", { "stateId": stateId }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allDistrictCity: modifyDistArr(responseData.response),
                    allZone: []
                })
            }
            //  else {
            //     Toaster.ShortCenterToaster(responseData.message)
            // }
        }
        this.setState({ distLoader: false });
    }

    // for get the subordinate
    _onGetSubordinateData = async () => {
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allSubordinate: modifySubordinateArr(responseData.data),
                })
            }
            //  else {
            //     Toaster.ShortCenterToaster(responseData.message)
            // }
        }
    }

    // for get the subordinate
    _onGetSubordinateDataByCustomerId = async () => {
        let reqData = {
            "zoneId": this.props.data.zoneId
        }
        let responseData = await MiddlewareCheck("getSubOrdinateByZone", reqData, this.props);
        // let responseData = await MiddlewareCheck("getMappedUserByCustomer", { "contactId": this.props.data.customerId, "type": this.props.data.name });
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allSubordinate: modifySubordinateArrV2(responseData.data),
                })
            }

        }
    }

    loaderChange = async () => {
        this.state.locationLoader = true;
        this.setState({ locationLoader: this.state.locationLoader })
    }

    // for check and umcheck the value
    _onCheckType = async (value) => {
        await this.loaderChange()
        this.state.createPjpModalObj.assigningType = value;
        this.state.createPjpModalObj.subOrdinateObj = {};
        this.state.locationLoader = false;
        if (this.props.data == undefined || this.props.data == null) {
            // this.state.createPjpModalObj.stateObj = {};
            // this.state.createPjpModalObj.districtObj = {};
            // this.state.createPjpModalObj.zoneObj = {};
            this.state.createPjpModalObj.locationArr = [];
            this.state.createPjpModalObj.locationObj = [];
        }
        this.state.createPjpModalObj.selectDate = "";
        this.state.createPjpModalObj.selectRawDate = new Date();
        this.state.stateArrForSubordinate = [];
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj,
            stateArrForSubordinate: this.state.stateArrForSubordinate,
            locationLoader: this.state.locationLoader
        })
        await this._onBlankZoneDist()
    }

    _onBlankZoneDist = async () => {
        if (this.props.data == undefined || this.props.data == null) {
            await this.setState({ distLoader: true, zoneLoader: true });
            this.state.allDistrictCity = [];
            this.state.allZone = [];
            await this.setState({
                allDistrictCity: this.state.allDistrictCity,
                allZone: this.state.allZone,
                distLoader: false,
                zoneLoader: false
            })
        }
    }

    // for visible date
    _onSelectDate = (type) => {
        this.state.createPjpModalObj.visibleSelectDate = type
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj
        })
    }

    // for select date
    _onStartDateSelect = (selectedDate) => {
        if (selectedDate) {
            this.state.createPjpModalObj.selectDate = DateConvert.formatYYYYMMDD(selectedDate);
            this.state.createPjpModalObj.selectRawDate = selectedDate;
        }
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj
        })
        this._onSelectDate(false);
    }


    // for select subordinate
    _onSelectSubOrdinate = async (data) => {
        if (this.state.createPjpModalObj.subOrdinateObj.id !== undefined && this.state.createPjpModalObj.subOrdinateObj.id == data.id) {

        } else {
            this.state.createPjpModalObj.subOrdinateObj = data;
            if (this.props.data == undefined || this.props.data == null) {
                // this.state.createPjpModalObj.stateObj = {};
                // this.state.createPjpModalObj.districtObj = {};
                // this.state.createPjpModalObj.zoneObj = {};
                this.state.createPjpModalObj.locationObj = [];
                this.state.createPjpModalObj.locationArr = [];
            }
            this.setState({
                createPjpModalObj: this.state.createPjpModalObj
            })

            await this._onGetSubordinateStateData(data);
        }
    }

    // for select the district/city
    // _onSelectDistrictCity = async (data) => {
    //     this.state.createPjpModalObj.districtObj = data;
    //     this.state.createPjpModalObj.zoneObj = {};
    //     this.setState({
    //         createPjpModalObj: this.state.createPjpModalObj
    //     })
    //     await this._onGetZoneData(data.id);
    // }

    // _onSelectSubordinateDistrictCity = async (data) => {
    //     this.state.createPjpModalObj.districtObj = data;
    //     this.state.createPjpModalObj.zoneObj = {};
    //     this.setState({
    //         createPjpModalObj: this.state.createPjpModalObj
    //     })
    //     await this._onGetSubordinateZoneData(data.id);
    // }

    _onGetSubordinateZoneData = async (cityId) => {
        this.setState({ zoneLoader: true });
        let responseData = await MiddlewareCheck("getZoneForSubordinate", { "cityId": cityId, "subordinateId": this.state.createPjpModalObj.subOrdinateObj.id }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allZone: modifyZoneArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ zoneLoader: false });
    }

    // for select the state
    _onSelectState = async (data) => {
        this.state.createPjpModalObj.stateObj = data;
        this.state.createPjpModalObj.districtObj = {};
        this.state.createPjpModalObj.zoneObj = {};
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj
        })
        await this._onGetDistCityData(data.id);
    }


    // for select the subordinate state
    _onSelectSubordinateState = async (data) => {
        this.state.createPjpModalObj.stateObj = data;
        this.state.createPjpModalObj.districtObj = {};
        this.state.createPjpModalObj.zoneObj = {};
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj
        })
        await this._onGetSubordinateDistCityData(data.id);
    }

    _onGetSubordinateDistCityData = async (stateId) => {
        this.setState({ distLoader: true });
        let responseData = await MiddlewareCheck("getDistrictForSubordinate", { "stateId": stateId, "subordinateId": this.state.createPjpModalObj.subOrdinateObj.id }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allDistrictCity: modifyDistArr(responseData.response),
                    allZone: []
                })
            }
            //  else {
            //     Toaster.ShortCenterToaster(responseData.message)
            // }
        }
        this.setState({ distLoader: false });
    }


    // for get the zone data 
    _onGetZoneData = async (cityId) => {
        this.setState({ zoneLoader: true });
        let responseData = await MiddlewareCheck("getaZoneData", { "cityId": cityId }, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allZone: modifyZoneArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ zoneLoader: false });
    }

    // fro select the zone
    _onSelectZone = async (data) => {
        this.state.createPjpModalObj.zoneObj = data;
        this.setState({
            createPjpModalObj: this.state.createPjpModalObj
        })
    }

    // for submit the data
    _onSubmit = () => {
        let locData = { locationObj: this.state.createPjpModalObj.locationObj, locationArr: this.state.createPjpModalObj.locationArr }
        let validateData = validatePjpDetails(this.state.createPjpModalObj);
        if (validateData.status == true) {
            if (this.props.data == undefined || this.props.data == null) {
                this.props.navigation.navigate("CreatePjp", { data: validateData.reqData, locationData: locData });
                this._onSetInitialStateData();
                this.props.onPjpModalClose();
            } else {
                this._onCreatePJP();
            }
        }
    }

    _onCreatePJP = async () => {
        this.setState({ pageLoader: true });
        let visitor = "";
        if (this.state.createPjpModalObj.assigningType) {
            let info = await StorageDataModification.userCredential({}, "get");
            visitor = info.userId.toString();
        } else {
            visitor = this.state.createPjpModalObj.subOrdinateObj.id;
        }
        let dataReq = {
            "fieldVisitId": "0",
            "customerList": modifyDataForApi(this.props.data),
            "pjpDate": DateConvert.formatYYYYMMDD(this.state.createPjpModalObj.selectRawDate),
            "purposeId": "",
            "note": "",
            "assignedUserId": visitor,
            "isProject": this.props.data.isInfulencer == 6 || this.props.data.isInfulencer == 7 ? "1" : "0",
            "hierarchyDataIdArr": this.props.data.locationData
        }

        let responseData = await MiddlewareCheck("addNewPlannedVisit", dataReq, this.props);

        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message);
                this.props.onVisitAddSuccess();
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.setState({ pageLoader: false });
    }

    // for set initial state data
    _onSetInitialStateData = () => {
        this.setState({
            allDistrictCity: [],
            allZone: [],
            createPjpModalObj: {
                assigningType: false,
                selectDate: "",
                visibleSelectDate: false,
                selectRawDate: new Date(),
                districtObj: {},
                zoneObj: {}
            }
        })
    }

    onSelectLocationData = (val) => {
        this.state.createPjpModalObj.locationArr = val.totalData;
        this.state.createPjpModalObj.locationObj = val.value;
        this.setState({ createPjpModalObj: this.state.createPjpModalObj })
    }

    render() {
        return (
            <Modal
                isVisible={this.props.visibleModal}
                // onBackButtonPress={() => this.props.onPjpModalClose()}
                // onBackdropPress={() => this.props.onPjpModalClose()}
                // onRequestClose={() => this.props.onPjpModalClose()}
                children={
                    <View style={styles.modalview}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.marginView}>
                                <TouchableOpacity style={styles.cancelSec}
                                    activeOpacity={0.8}
                                    onPress={() => this.props.onPjpModalClose()}  >
                                    <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: '10%' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.headerText}>Set Parameters</Text>
                                </View>
                            </View>
                            {this.state.pageLoader ?
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} /> :
                                <View style={{ marginHorizontal: '5%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <CheckBox
                                                type={"singleSelectBox"}
                                                borderRadius={40}
                                                data={this.state.createPjpModalObj.assigningType}
                                                onClickValue={() => this._onCheckType(true)}
                                            />
                                            <Text style={styles.selectionText}>Self</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <CheckBox
                                                type={"singleSelectBox"}
                                                borderRadius={40}
                                                data={!this.state.createPjpModalObj.assigningType}
                                                onClickValue={() => this._onCheckType(false)}
                                            />
                                            <Text style={styles.selectionText}>Subordinate</Text>
                                        </View>
                                    </View>
                                    {this.state.createPjpModalObj.subOrdinateObj == undefined ?
                                        null :
                                        <>
                                            {this.state.createPjpModalObj.assigningType ?
                                                null :
                                                <View style={{ flex: 1, marginTop: 15 }}>
                                                    <DropdownInputBox
                                                        isSearchable={true}
                                                        selectedValue={this.state.createPjpModalObj.subOrdinateObj.id ? this.state.createPjpModalObj.subOrdinateObj.id.toString() : "0"}
                                                        data={this.state.allSubordinate}
                                                        onSelect={(value) => this._onSelectSubOrdinate(value)}
                                                        headerText={"Subordinate"}
                                                    />
                                                </View>
                                            }
                                        </>
                                    }
                                    <View style={{ marginTop: 15 }}>
                                        <TouchableOpacity style={styles.canlenderSec}
                                            activeOpacity={0.9}
                                            onPress={() => this._onSelectDate(true)}
                                        >
                                            <Text style={[styles.selectLabelText, this.state.createPjpModalObj.selectDate.length > 0 ? { color: Color.COLOR.BLUE.LOTUS_BLUE } : { color: Color.COLOR.GRAY.SILVER }]}>
                                                {this.state.createPjpModalObj.selectDate.length > 0 ? DateConvert.viewDateFormat(this.state.createPjpModalObj.selectDate) : "Select Date"}
                                            </Text>
                                            <View style={styles.calenderImgSec}>
                                                <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                                            </View>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            open={this.state.createPjpModalObj.visibleSelectDate}
                                            date={this.state.createPjpModalObj.selectRawDate}
                                            minimumDate={new Date()}
                                            mode="date"
                                            onConfirm={(date) => this._onStartDateSelect(date)}
                                            onCancel={() => this._onSelectDate(false)}
                                        />
                                    </View>
                                    {this.props.type == undefined || this.props.type == null ?
                                        <>

                                            {/* location section */}
                                            <View style={{ height: 10 }} />
                                            {this.state.locationLoader ?
                                                null :
                                                <DynamicLocationMapping
                                                    type={"lastHierarcyField"}
                                                    flexDirection={"column"}
                                                    marginBottom={10}
                                                    viewType={"add"}
                                                    isLabelVisible={false}
                                                    onApiCallData={(value) => this.onSelectLocationData(value)} />
                                            }
                                        </>
                                        : null}

                                    <View style={styles.buttonView}>
                                        <BigTextButton
                                            text={"Submit"}
                                            onPress={() => this._onSubmit()}
                                        />
                                    </View>
                                </View>
                            }
                        </ScrollView>
                    </View>
                }
            />
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PjpAddModal);