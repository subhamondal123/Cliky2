import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../../../../enums';
import styles from './style';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,

} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../../../../redux/Sales360Action';
import { ErrorCode } from '../../../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import DatePicker from "react-native-date-picker";
import { DateConvert, Toaster } from "../../../../../../services/common-view-function";
import { modifyDistArr, modifymeetingTypeArr, modifyPageData, modifyStateArr, modifyTypeArr, modifyZoneArr, validateData } from "./function";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DataValidator } from "../../../../../../validators";

let listDetails = [
    {
        id: 1,
        headerName: "Sumit Kapoor"
    },
    {
        id: 2,
        headerName: "Amit Malik"
    },
    {
        id: 3,
        headerName: "Warsha Singh"
    }
]


class Meeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allObjData: {},
            stateArr: [],
            districtArr: [],
            zoneArr: [],
            typeArr: [],
            startDateCheck: false,
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this._onGetMeetingType();
        await this._onGetStateData(1);

        this.setState({
            allObjData: modifyPageData(),
            pageLoader: false
        })
    }



    // for get state data by country
    _onGetStateData = async (countryId) => {
        this.setState({ stateLoader: true, distCityLoader: true, zoneLoader: true });
        let responseData = await MiddlewareCheck("getaStateData", { "countryId": countryId }, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    stateArr: modifyStateArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ stateLoader: false, distCityLoader: false, zoneLoader: false });
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }


    _onSelectState = async (value) => {
        let data = this.state.stateArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allObjData.selectedStateObj = value;
        this.setState({
            allObjData: this.state.allObjData,
            stateArr: data,
        })
        await this._onGetDistCityData(value.id);
    }

    // for get state data by country
    _onGetDistCityData = async (stateId) => {
        this.setState({ distCityLoader: true, zoneLoader: true });
        let responseData = await MiddlewareCheck("getaDistrictData", { "stateId": stateId }, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    districtArr: modifyDistArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ distCityLoader: false, zoneLoader: false });
    }

    _onSelectDistrict = async (value) => {
        let data = this.state.districtArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allObjData.selectedDistrictObj = value;
        this.setState({
            allObjData: this.state.allObjData,
            districtArr: data,
        })

        await this._onGetZoneData(value.id);
    }

    // for get the zone data 
    _onGetZoneData = async (cityId) => {
        this.setState({ zoneLoader: true });
        let responseData = await MiddlewareCheck("getaZoneData", { "cityId": cityId }, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    zoneArr: modifyZoneArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ zoneLoader: false });
    }

    _onSelectZone = async (value) => {
        let data = this.state.zoneArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allObjData.selectedZoneObj = value;
        this.setState({
            allObjData: this.state.allObjData,
            zoneArr: data,
        })
    }

    _onGetMeetingType = async () => {
        this.setState({ zoneLoader: true });
        let responseData = await MiddlewareCheck("getMeetingTypLists", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    typeArr: modifymeetingTypeArr(responseData.data)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ zoneLoader: false });


    }

    _onSelectType = async (value) => {
        let data = this.state.typeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.allObjData.selecedTypeObj = value;
        this.setState({
            allObjData: this.state.allObjData,
            typeArr: data,
        })
    }



    _onTitle = (value) => {
        this.state.allObjData.title = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }


    _onDuration = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.state.allObjData.duration = newText;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onDescription = (value) => {
        this.state.allObjData.desc = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onLocationText = (value) => {
        this.state.allObjData.locationText = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onEastimatedBudget = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.state.allObjData.estimatedBudget = newText;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onNoOfAttendees = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allObjData.noOfAttendees = newText;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onOpenStartDate = () => {
        this.setState({
            startDateCheck: !this.state.startDateCheck
        })
    }

    _onStartDateSelect = (selectedDate) => {
        let statDateRaw = this.state.allObjData.statDateRaw,
            startDate = "";
        if (selectedDate) {
            startDate = DateConvert.viewDateFormat(selectedDate);
            statDateRaw = selectedDate;
        }

        this.state.allObjData.startDate = startDate;
        this.state.allObjData.statDateRaw = statDateRaw;
        this.setState({
            allObjData: this.state.allObjData
        })
        this._onOpenStartDate();
    }

    _onSubmit = async () => {
        let validatedDataForAdd = validateData(this.state.allObjData);
        if (validatedDataForAdd.status) {
            this.setState({
                pageLoader: true
            });
            let reqData = {
                "proposedBudget": this.state.allObjData.estimatedBudget,
                "sanctionedBudget": "",
                "expectedAttendeesNo": this.state.allObjData.noOfAttendees,
                "meetingName": this.state.allObjData.title,
                "description": this.state.allObjData.desc,
                "notify": "1",
                "address": this.state.allObjData.locationText,
                "countryId": 1,
                "stateId": this.state.allObjData.selectedStateObj.id,
                "cityId": this.state.allObjData.selectedDistrictObj.id,
                "zoneId": this.state.allObjData.selectedZoneObj.id,

                "meetingDate": DateConvert.formatYYYYMMDD(this.state.allObjData.statDateRaw),
                "meetingDuration": this.state.allObjData.duration,
                "meetingType": this.state.allObjData.selecedTypeObj.id,
                "attendenciesList": this.state.allObjData.attendeesArr
            }
            let responseData = await MiddlewareCheck("addNewMeetingRequest", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.data.message)
                    this.props.onSaveDataToParent({ pageNum: 2 })
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.setState({
                pageLoader: false
            });
        }
    }

    _onAttendeesName = (value, item, key) => {
        this.state.allObjData.attendeesArr[key].attenName = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onAttendeesNumber = (value, item, key) => {
        this.state.allObjData.attendeesArr[key].attenPhone = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onAttendeesEmail = (value, item, key) => {
        this.state.allObjData.attendeesArr[key].attenEmail = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onAddAttendeesRow = () => {
        let item = {
            attenName: "",
            attenNameActive: false,
            attenPhone: "",
            attenPhoneActive: false,
            attenEmail: "",
            attenEmailActive: false
        }

        let arr = this.state.allObjData.attendeesArr;
        arr.push(item);
        this.state.allObjData.attendeesArr = arr;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onDeleteAttendeesRow = (item, key) => {
        let arr = this.state.allObjData.attendeesArr;
        arr.splice(key, 1);
        this.state.allObjData.attendeesArr = arr;
        this.setState({
            allObjData: this.state.allObjData
        })
    }


    _attendeesItem = (item, key) => {
        return (
            <View style={styles.shadowBox} key={key}>
                {key == 0 ?
                    null
                    :
                    <View style={styles.marginView}>
                        <TouchableOpacity style={styles.cancelSec}
                            activeOpacity={0.8}
                            onPress={() => this._onDeleteAttendeesRow(item, key)}  >
                            <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Attendee Name"}
                        value={item.attenName}
                        height={45}
                        onChangeText={(value) => this._onAttendeesName(value, item, key)}
                        keyboardType="default"
                        isActive={item.attenNameActive}
                        onFocus={() => {
                            this.state.allObjData.attendeesArr[key].attenNameActive = true;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                        onBlur={() => {
                            this.state.allObjData.attendeesArr[key].attenNameActive = false;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                    // blurOnSubmit={false}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
                    <TextInputBox
                        placeholder={"Attendee Number"}
                        value={item.attenPhone}
                        height={45}
                        onChangeText={(value) => this._onAttendeesNumber(value, item, key)}
                        keyboardType="default"
                        isActive={item.attenPhoneActive}
                        onFocus={() => {
                            this.state.allObjData.attendeesArr[key].attenPhoneActive = true;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                        onBlur={() => {
                            this.state.allObjData.attendeesArr[key].attenPhoneActive = false;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                    // blurOnSubmit={false}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
                    <TextInputBox
                        placeholder={"Attendee Email"}
                        value={item.attenEmail}
                        height={45}
                        onChangeText={(value) => this._onAttendeesEmail(value, item, key)}
                        keyboardType="default"
                        isActive={item.attenEmailActive}
                        onFocus={() => {
                            this.state.allObjData.attendeesArr[key].attenEmailActive = true;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                        onBlur={() => {
                            this.state.allObjData.attendeesArr[key].attenEmailActive = false;
                            this.setState({ allObjData: this.state.allObjData })
                        }}
                    />
                </View>
            </View>
        )
    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <View style={{ marginTop: 10 }}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flex: 0.1 }}
                                onPress={this.onBack}>
                                <Image source={ImageName.BACK_IMG} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={CustomStyle.headerText}>Meeting</Text>
                            </View>
                            <View flex={0.1} />
                        </View> */}
                        <View style={{ marginBottom: 10 }} />
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 20 }}>
                                {this.state.stateLoader ?
                                    null :
                                    <>
                                        <DropdownInputBox
                                            selectedValue={this.state.allObjData.selectedStateObj.id ? this.state.allObjData.selectedStateObj.id.toString() : "0"}
                                            data={this.state.stateArr}
                                            onSelect={(value) => this._onSelectState(value)}
                                            headerText={"State"}
                                            // selectedText={this.state.selectedStateObj.name ? this.state.selectedStateObj.name : "State"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                        />
                                    </>
                                }
                                <View style={{ marginTop: 20 }}>
                                    {this.state.distCityLoader ?
                                        null :
                                        <>
                                            <DropdownInputBox
                                                selectedValue={this.state.allObjData.selectedDistrictObj.id ? this.state.allObjData.selectedDistrictObj.id.toString() : "0"}
                                                data={this.state.districtArr}
                                                onSelect={(value) => this._onSelectDistrict(value)}
                                                headerText={"District"}
                                                // selectedText={this.state.selectedDistrictObj.name ? this.state.selectedDistrictObj.name : "District"}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                            />
                                        </>
                                    }
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    {this.state.zoneLoader ?
                                        null :
                                        <>
                                            <DropdownInputBox
                                                selectedValue={this.state.allObjData.selectedZoneObj.id ? this.state.allObjData.selectedZoneObj.id.toString() : "0"}
                                                data={this.state.zoneArr}
                                                onSelect={(value) => this._onSelectZone(value)}
                                                headerText={"Zone"}
                                                // selectedText={this.state.selectedZoneObj.name ? this.state.selectedZoneObj.name : "Zone"}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                            />
                                        </>
                                    }
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"Title"}
                                        value={this.state.allObjData.title}
                                        height={45}
                                        onChangeText={(value) => this._onTitle(value)}
                                        keyboardType="default"
                                        isActive={this.state.allObjData.titleActive}
                                        onFocus={() => {
                                            this.state.allObjData.titleActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.titleActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    // blurOnSubmit={false}
                                    />
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <DropdownInputBox
                                        selectedValue={this.state.allObjData.selecedTypeObj.id ? this.state.allObjData.selecedTypeObj.id.toString() : "0"}
                                        data={this.state.typeArr}
                                        onSelect={(value) => this._onSelectType(value)}
                                        headerText={"Type"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.canlenderSec}
                                            activeOpacity={0.9}
                                            onPress={this._onOpenStartDate}
                                        >

                                            <Text style={{
                                                fontSize: FontSize.SM,
                                                color: this.state.allObjData.startDate.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER,
                                                fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                                                marginLeft: 21,
                                                marginRight: 21,
                                                flex: 1
                                            }}>
                                                {this.state.allObjData.startDate.length > 0 ? this.state.allObjData.startDate : "Date"}
                                            </Text>
                                            <View style={styles.calenderImgSec}>
                                                <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                                            </View>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            open={this.state.startDateCheck}
                                            date={this.state.allObjData.statDateRaw}
                                            // maximumDate={this.state.endDateRaw}
                                            minimumDate={new Date()}
                                            mode="date"
                                            onConfirm={(date) => this._onStartDateSelect(date)}
                                            onCancel={() => this._onOpenStartDate()}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"Duration (Days)"}
                                        value={this.state.allObjData.duration}
                                        height={45}
                                        onChangeText={(value) => this._onDuration(value)}
                                        keyboardType="numeric"
                                        isActive={this.state.allObjData.durationActive}
                                        onFocus={() => {
                                            this.state.allObjData.durationActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.durationActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    // blurOnSubmit={false}
                                    />
                                </View>

                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"Description"}
                                        value={this.state.allObjData.desc}
                                        height={115}
                                        onChangeText={(value) => this._onDescription(value)}
                                        keyboardType="default"
                                        alignItems={"flex-start"}
                                        isActive={this.state.allObjData.descActive}
                                        onFocus={() => {
                                            this.state.allObjData.descActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.descActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    // blurOnSubmit={false}
                                    />
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"Location"}
                                        value={this.state.allObjData.locationText}
                                        height={45}
                                        onChangeText={(value) => this._onLocationText(value)}
                                        keyboardType="default"
                                        isActive={this.state.allObjData.locationTextActive}
                                        onFocus={() => {
                                            this.state.allObjData.locationActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.locationActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    // blurOnSubmit={false}
                                    />
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"Estimated Budget (₹)"}
                                        value={this.state.allObjData.estimatedBudget}
                                        height={45}
                                        onChangeText={(value) => this._onEastimatedBudget(value)}
                                        keyboardType="numeric"
                                        isActive={this.state.allObjData.estimatedBudgetActive}
                                        onFocus={() => {
                                            this.state.allObjData.estimatedBudgetActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.estimatedBudgetActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TextInputBox
                                        placeholder={"No of attendees"}
                                        value={this.state.allObjData.noOfAttendees}
                                        height={45}
                                        onChangeText={(value) => this._onNoOfAttendees(value)}
                                        keyboardType="numeric"
                                        isActive={this.state.allObjData.noOfAttendeesActive}
                                        onFocus={() => {
                                            this.state.allObjData.noOfAttendeesActive = true;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                        onBlur={() => {
                                            this.state.allObjData.noOfAttendeesActive = false;
                                            this.setState({ allObjData: this.state.allObjData })
                                        }}
                                    />
                                </View>
                                <View style={{ marginHorizontal: '15%', marginTop: 25 }}>
                                    <BigTextButton
                                        height={40}
                                        borderRadius={16}
                                        backgroundColor={Color.COLOR.RED.AMARANTH}
                                        text={"Submit"}
                                        onPress={() => this._onSubmit()}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 200 }} />
                        </ScrollView>
                    </View>
                }
            </View >
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);