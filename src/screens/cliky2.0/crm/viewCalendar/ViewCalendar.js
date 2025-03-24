import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
// import { LocaleConfig } from 'react-native-calendars';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
// import Header from '../../header';
import { CustomStyle } from '../../../style';
import styles from './Style';

import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { CalendarView, SelectView } from './sub-component';
import { BigTextButton, CheckBox, DropdownInputBox, FloatingButton, Loader, Modal, TextInputBox } from '../../../../shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { modifyCalenderType, modifySubordinateArr, modifyTaskCategoryArr, modifyTaskStageArr, validateInputData } from './Function';
import { DateConvert, StorageDataModification, Toaster } from '../../../../services/common-view-function';
import DatePicker from 'react-native-date-picker';
import Header from '../../header/Header';

const notifyBeforeArr = [
    {
        "id": 1,
        "name": "10 min before",
        "value": "10"
    },
    {
        "id": 2,
        "name": "20 min before",
        "value": "20"
    },
    {
        "id": 3,
        "name": "30 min before",
        "value": "30"
    },
    {
        "id": 4,
        "name": "45 min before",
        "value": "45"
    },
    {
        "id": 5,
        "name": "60 min before",
        "value": "60"
    }
]

class ViewCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            weekCheck: false,
            monthCheck: true,

            addModal: false,
            selectedDate: "",
            remarks: "",
            remarksActive: false,
            selectItem: {},
            allItem: [],
            notifyArr: [],
            selectedNotifyObj: {},
            taskStageArr: [],
            selectedTaskStageObj: {},
            isSelfVisit: true,
            allSubordinate: [],
            selectedSubordinate: {},
            alltaskCategory: [],
            selectedTaskCategory: {},
            eventModalLoader: false,

            selectedTime: "",
            dateTimeRaw: new Date(),
            timePicker: false
        };
    }

    // for initial state set
    _onSetInitialStateData = async () => {
        this.setState({
            pageLoader: true,
            weekCheck: false,
            monthCheck: true
        })
    }


    componentDidMount() {
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        //         await this._onSetInitialStateData();
        this._load();
        // })
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    _load = async () => {
        await this._loadCalenderType();
        await this._onGetSubordinateData();
        await this._onFetchAllTaskStage();
        await this._onFetchAllTaskCategory();
        this.setState({
            notifyArr: notifyBeforeArr,
            pageLoader: false
        })
    }

    _loadCalenderType = async () => {
        let responseData = await MiddlewareCheck("calenderType", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allItem = modifyCalenderType(responseData.data);
                this.setState({
                    allItem: this.state.allItem
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onFetchAllTaskCategory = async () => {
        let responseData = await MiddlewareCheck("getTaskCatagory", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    alltaskCategory: modifyTaskCategoryArr(responseData.response),
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onFetchAllTaskStage = async () => {
        let responseData = await MiddlewareCheck("getTaskStage", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    taskStageArr: modifyTaskStageArr(responseData.response),
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for get the subordinate
    _onGetSubordinateData = async () => {
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allSubordinate: modifySubordinateArr(responseData.data),
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // onSelect = (value) => {
    //     this.props.navigation.navigate("AddCalender")
    // }


    // for change the status view
    _onViewSelect = (type) => {
        let weekCheck = false;
        let monthCheck = false;
        if (type == "week") {
            weekCheck = true;
        }
        if (type == "month") {
            monthCheck = true;
        }
        this.setState({
            monthCheck: monthCheck,
            weekCheck: weekCheck
        })
    }

    // for network error
    _onNetworkError = () => {

    }


    // for filter section view
    _filterSection = () => {
        return (
            <View style={{ marginTop: '5%', flexDirection: 'row' }}>
                <View style={{ width: '40%' }} />
                <View style={{ width: '30%' }}>
                    <TouchableOpacity style={[styles.actionWeekView, this.state.weekCheck ? { borderColor: Color.COLOR.RED.AMARANTH } : { borderColor: Color.COLOR.GRAY.GRAY_COLOR }]} activeOpacity={0.8} onPress={() => this._onViewSelect("week")}>
                        <Text style={[styles.monthWeekTxt, this.state.weekCheck ? { color: Color.COLOR.RED.AMARANTH } : { color: Color.COLOR.GRAY.GRAY_COLOR }]}>Week</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '30%' }}>
                    <TouchableOpacity style={[styles.actionWeekView, this.state.monthCheck ? { borderColor: Color.COLOR.RED.AMARANTH } : { borderColor: Color.COLOR.GRAY.GRAY_COLOR }]} activeOpacity={0.8} onPress={() => this._onViewSelect("month")}>
                        <Text style={[styles.monthWeekTxt, this.state.monthCheck ? { color: Color.COLOR.RED.AMARANTH } : { color: Color.COLOR.GRAY.GRAY_COLOR }]}>Month</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.actionFilterView} activeOpacity={0.8}>
                        <Image source={ImageName.FILTER} style={styles.fliterImg} />
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }

    onOpenAndCloseAddModal = async (dateString) => {
        if (this.state.addModal) {
            this.state.addModal = false;
            this.state.selectedDate = "";
            this.state.selectedTime = "";
            this.state.dateTimeRaw = new Date();
            this.state.timePicker = false;
            this.state.remarks = "";
            this.state.remarksActive = false;
            this.state.selectItem = {};
            this.state.selectedNotifyObj = {};
            this.state.selectedTaskStageObj = {};
            this.state.isSelfVisit = true;
            this.state.selectedSubordinate = {};
            this.state.selectedTaskCategory = {};

            this.setState({
                addModal: this.state.addModal,
                selectedDate: this.state.selectedDate,
                selectedTime: this.state.selectedTime,
                dateTimeRaw: this.state.dateTimeRaw,
                timePicker: this.state.timePicker,
                remarks: this.state.remarks,
                remarksActive: this.state.remarksActive,
                selectItem: this.state.selectItem,
                selectedNotifyObj: this.state.selectedNotifyObj,
                selectedTaskStageObj: this.state.selectedTaskStageObj,
                isSelfVisit: this.state.isSelfVisit,
                selectedSubordinate: this.state.selectedSubordinate,
                selectedTaskCategory: this.state.selectedTaskCategory
            })
        } else {
            this.state.addModal = true;
            this.state.selectedDate = dateString;
            this.state.selectedTime = "";
            this.state.dateTimeRaw = new Date(dateString);
            this.setState({
                addModal: this.state.addModal,
                selectedDate: this.state.selectedDate,
                selectedTime: this.state.selectedTime,
                dateTimeRaw: this.state.dateTimeRaw
            })
        }
    }

    submitModal = async () => {
        if (this.state.selectItem.id == undefined || this.state.selectItem.id == null) {
            Toaster.ShortCenterToaster("Please select category !");
        } else {
            if (this.state.selectItem.id == 1) {
                let validateStatus = validateInputData(this.state.selectedTime, this.state.selectedNotifyObj, this.state.selectedTaskCategory, this.state.selectedTaskStageObj, this.state.isSelfVisit, this.state.selectedSubordinate, this.state.remarks);
                if (validateStatus) {
                    this.setState({ eventModalLoader: true });
                    let visitor = "";
                    if (this.state.isSelfVisit == false) {
                        visitor = this.state.selectedSubordinate.id ? this.state.selectedSubordinate.id.toString() : "";
                    } else {
                        let info = await StorageDataModification.userCredential({}, "get");
                        visitor = info.userId.toString();
                    }
                    let reqData = {
                        "dueDate": this.state.selectedDate,
                        "dueTime": (DateConvert.getAllTimeData(this.state.dateTimeRaw)).rawTime,
                        "taskCategoryId": this.state.selectedTaskCategory.id ? this.state.selectedTaskCategory.id.toString() : "",
                        "notifyBefore": this.state.selectedNotifyObj.id ? this.state.selectedNotifyObj.value : "",
                        "note": this.state.remarks,
                        "taskStage": this.state.selectedTaskStageObj.id ? this.state.selectedTaskStageObj.id.toString() : "",
                        "eventName": this.state.selectItem.id ? this.state.selectItem.name : "",
                        "assignTo": visitor
                    }

                    let responseData = await MiddlewareCheck("addCalenderActivity", reqData, this.props);
                    if (responseData) {
                        if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            await this.onOpenAndCloseAddModal();
                            Toaster.ShortCenterToaster(responseData.message);
                            // this._load();
                            if (this.state.monthCheck) {
                                this.setState({ monthCheck: false });
                                this.setState({ monthCheck: true });
                            }
                            if (this.state.weekCheck) {
                                this.setState({ weekCheck: false });
                                this.setState({ weekCheck: true });
                            }
                        } else {
                            Toaster.ShortCenterToaster(responseData.message)
                        }
                    }
                    this.setState({ eventModalLoader: false });
                }
            } else {
                await this.onOpenAndCloseAddModal();
                this.props.navigation.navigate("MeetingSection");
            }
        }
    }

    _onTimeSelect = (date) => {
        if (date) {
            this.state.dateTimeRaw = date;
            this.state.selectedTime = DateConvert.viewTimeFormat(date);;
            this.setState({
                dateTimeRaw: this.state.dateTimeRaw,
                selectedTime: this.state.selectedTime
            })
        }
    }

    _onTimePicker = () => {
        this.state.timePicker = !this.state.timePicker;
        this.setState({
            timePicker: this.state.timePicker
        })
    }

    allModalSection = () => {
        return (
            <Modal
                isVisible={this.state.addModal}
                onBackButtonPress={() => this.onOpenAndCloseAddModal()}
                onBackdropPress={() => this.onOpenAndCloseAddModal()}
                onRequestClose={() => this.onOpenAndCloseAddModal()}
                children={
                    <View style={styles.modalstatusview}>
                        <View style={styles.modalHeaderSec}>
                            <View style={styles.madalMarginView}>
                                <Text style={styles.profileNameText}>Mark Update</Text>
                            </View>
                        </View>

                        {this.state.eventModalLoader ?
                            <View style={{ height: Dimension.height / 2 }}>
                                <Loader />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 10, marginHorizontal: '5%' }}>
                                    <View style={styles.inputBoxStyle} >
                                        <Text style={[styles.inputBoxText]} numberOfLines={1}>{this.state.selectedDate}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    {this.selectItemSec()}
                                </View>
                                {this.state.selectItem.id == 1 ?
                                    <>
                                        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => this._onTimePicker()}>
                                                    <Text style={[styles.inputBoxText, { color: this.state.selectedTime.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER }]} numberOfLines={1}>{this.state.selectedTime.length > 0 ? this.state.selectedTime : "Select Time"}</Text>
                                                </TouchableOpacity>
                                                <DatePicker
                                                    modal
                                                    open={this.state.timePicker}
                                                    date={this.state.dateTimeRaw}
                                                    // maximumDate={this.state.endDateRaw}
                                                    mode="time"
                                                    onConfirm={(date) => this._onTimeSelect(date)}
                                                    onCancel={() => this._onTimePicker()}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            {this.notifySec()}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            {this.taskCategorySection()}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            {this.taskStageSec()}
                                        </View>
                                        <View style={{ marginTop: 10, marginHorizontal: "5%" }}>
                                            {this.checkBoxSec()}
                                        </View>
                                        {this.state.isSelfVisit ?
                                            null
                                            :
                                            <>
                                                <View style={{ marginTop: 10 }}>
                                                    {this.subordinateSection()}
                                                </View>
                                            </>
                                        }
                                        <View style={{ marginTop: 10 }}>
                                            {this.remarksSection()}
                                        </View>
                                    </>
                                    :
                                    null
                                }
                                <View style={{ marginHorizontal: '5%', marginTop: 40, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                        <BigTextButton
                                            height={40}
                                            borderRadius={24}
                                            backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                            text={"Cancel"}
                                            onPress={() => this.onOpenAndCloseAddModal()}
                                        />
                                    </View>
                                    <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                        <BigTextButton
                                            height={40}
                                            borderRadius={24}
                                            text={"Submit"}
                                            onPress={() => this.submitModal()}
                                        />
                                    </View>
                                </View>
                            </>
                        }
                    </View>
                }
            />
        )
    }

    remarksSection = () => {
        const changeText = (value) => {
            this.setState({
                remarks: value
            })
        }
        return (
            <React.Fragment>
                <View style={{ marginTop: 30, marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.shortheaderText}>Remarks:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                        <TextInputBox
                            placeholder={"Enter Remarks"}
                            value={this.state.remarks}
                            onChangeText={(value) => changeText(value)}
                            isActive={this.state.remarksActive}
                            onFocus={() => { this.setState({ remarksActive: true }) }}
                            onBlur={() => { this.setState({ remarksActive: false }) }}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    checkBoxSec = () => {
        const _onCheckVisitType = (value) => {
            if (value) {
                this.state.isSelfVisit = value;
                this.setState({
                    isSelfVisit: this.state.isSelfVisit,
                })
            } else {
                this.state.isSelfVisit = value;
                this.setState({
                    isSelfVisit: this.state.isSelfVisit
                })
            }
        }
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} >
                        <CheckBox
                            type={"round"}
                            borderRadius={30}
                            data={this.state.isSelfVisit}
                            onClickValue={(value) => _onCheckVisitType(true)}
                        />
                        <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{"Self"}</Text>
                    </View>
                    <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                        <CheckBox
                            type={"round"}
                            borderRadius={30}
                            data={!this.state.isSelfVisit}
                            onClickValue={() => _onCheckVisitType(false)}
                        />
                        <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{"Subordinate"}</Text>
                    </View>
                </View>
            </>
        )
    }

    subordinateSection = () => {
        const _onSelectSubOrdinate = (value) => {
            this.state.selectedSubordinate = value;
            this.setState({
                selectedSubordinate: this.state.selectedSubordinate
            })
        }
        return (
            <View style={{ marginHorizontal: '5%' }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedSubordinate.id ? this.state.selectedSubordinate.id.toString() : "0"}
                    data={this.state.allSubordinate}
                    onSelect={(value) => _onSelectSubOrdinate(value)}
                    headerText={"Subordinate"}
                />
            </View>
        )
    }

    taskCategorySection = () => {
        const _onSelectTaskCategory = (value) => {
            this.state.selectedTaskCategory = value;
            this.setState({
                selectedTaskCategory: this.state.selectedTaskCategory
            })
        }
        return (
            <View style={{ marginHorizontal: '5%' }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedTaskCategory.id ? this.state.selectedTaskCategory.id.toString() : "0"}
                    data={this.state.alltaskCategory}
                    onSelect={(value) => _onSelectTaskCategory(value)}
                    headerText={"Task Category"}
                />
            </View>
        )
    }

    selectItemSec = () => {
        const onSelectItem = (value) => {
            this.setState({
                selectItem: value
            })
        }

        return (
            <React.Fragment>
                <View style={{ marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.shortheaderText}>Status:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectItem.id ? this.state.selectItem.id.toString() : "0"}
                            data={this.state.allItem}
                            onSelect={(value) => onSelectItem(value)}
                            headerText={"Category"}
                            selectedText={this.state.selectItem.name ? this.state.selectItem.name : "Select"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }

    notifySec = () => {
        const onSelectNotify = (value) => {
            this.setState({
                selectedNotifyObj: value
            })
        }

        return (
            <React.Fragment>
                <View style={{ marginHorizontal: '5%' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectedNotifyObj.id ? this.state.selectedNotifyObj.id.toString() : "0"}
                            data={this.state.notifyArr}
                            onSelect={(value) => onSelectNotify(value)}
                            headerText={"Notify Me"}
                            selectedText={this.state.selectedNotifyObj.name ? this.state.selectedNotifyObj.name : "Select"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }

    taskStageSec = () => {
        const onSelectTaskStage = (value) => {
            this.setState({
                selectedTaskStageObj: value
            })
        }

        return (
            <React.Fragment>
                <View style={{ marginHorizontal: '5%' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectedTaskStageObj.id ? this.state.selectedTaskStageObj.id.toString() : "0"}
                            data={this.state.taskStageArr}
                            onSelect={(value) => onSelectTaskStage(value)}
                            headerText={"Task Stage"}
                            selectedText={this.state.selectedTaskStageObj.name ? this.state.selectedTaskStageObj.name : "Select"}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.state.pageLoader ?
                    <Loader /> :
                    <>
                        {this.allModalSection()}
                        <Header {...this.props} />
                        <View style={styles.bodyView}>
                            {this._filterSection()}
                            {this.state.weekCheck ?
                                <SelectView
                                    onNetworkError={() => this._onNetworkError()}
                                    onOpenAddModal={(dateString) => this.onOpenAndCloseAddModal(dateString)}
                                /> :
                                null
                            }
                            {this.state.monthCheck ?
                                <CalendarView
                                    onNetworkError={() => this._onNetworkError()}
                                    onOpenAddModal={(dateString) => this.onOpenAndCloseAddModal(dateString)}
                                /> :
                                null
                            }
                        </View>
                        {/* <FloatingButton
                            props={this.props}
                            moduleType={'sfa'}
                            navigation={this.props.navigation.navigate}
                        /> */}
                    </>
                }
            </SafeAreaView>
        )
    }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(ViewCalendar);