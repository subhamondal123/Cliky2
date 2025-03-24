import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, FontSize, ImageName } from "../../../../../../enums";
import { DateConvert } from "../../../../../../services/common-view-function";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { modifyData, validateData } from "./function";
import styles from "./style";


const RecurringType = [
    {
        id: 1,
        name: "Daily from a date",
        check: false
    },
    {
        id: 2,
        name: "From date to End Date",
        check: false
    }
]

class AdditionalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            organizationName: "",
            organizationNameActive: false,
            contactPersonName: "",
            contactPersonNameActive: false,
            phoneNumberArr: [
                { phoneNumber: "", phoneNumberActive: false },
            ],
            emailArr: [
                { emailId: "", emailActive: false },
            ],
            isNeedMeeting: false,
            dateTimePicker: false,
            dateTimeObj: {
                rawDateTime: new Date(),
                date: "",
                time: ""
            },
            isRecurring: false,
            allRecurringType: RecurringType,
            selectedRecurringTypeObj: {},
            datePicker: false,
            dateObj: {
                rawDate: new Date(),
                date: ""
            },
            startDatePicker: false,
            startDateObj: {
                rawDate: new Date(),
                date: ""
            },
            endDatePicker: false,
            endDateObj: {
                rawDate: new Date(),
                date: ""
            },
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        let modifiedData = modifyData(this.props.allData, this.state.allRecurringType);
        this.setState(modifiedData);
        this.setState({
            pageloader: false
        })
    }

    _onChangeOrganizationName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.setState({
            organizationName: newText
        })
    }

    _onChangeContactPersonName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.setState({
            contactPersonName: newText
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.phoneNumberArr[key].phoneNumber = newText
        this.setState({
            phoneNumberArr: this.state.phoneNumberArr
        })
    }

    _onChangeEmail = (value, key) => {
        this.state.emailArr[key].emailId = value;
        this.setState({
            emailArr: this.state.emailArr
        })
    }

    phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    maxLength={10}
                    value={item.phoneNumber}
                    onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                    placeholder={"*Phone Number"}
                    keyboardType={"numeric"}
                    isActive={item.phoneNumberActive}
                    onFocus={() => {
                        this.state.phoneNumberArr[key].phoneNumberActive = true;
                        this.setState({ phoneNumberArr: this.state.phoneNumberArr })
                    }}
                    onBlur={() => {
                        this.state.phoneNumberArr[key].phoneNumberActive = false;
                        this.setState({ phoneNumberArr: this.state.phoneNumberArr })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.phoneNumberArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                    editable={this.props.route.params.type == "edit" ? false : true}

                />
            </React.Fragment>
        )
    }

    _onAddPhoneNumber = () => {
        let arr = this.state.phoneNumberArr;
        arr.push({ phoneNumber: "", phoneNumberActive: false });
        this.setState({
            phoneNumberArr: arr
        })
    }

    _onDeletePhoneNumber = (key) => {
        let arr = this.state.phoneNumberArr;
        arr.splice(key, 1);
        this.state.phoneNumberArr = arr;
        this.setState({
            phoneNumberArr: this.state.phoneNumberArr
        })
    }


    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.emailId}
                    onChangeText={(value) => this._onChangeEmail(value, key)}
                    placeholder={"Email Id"}
                    keyboardType={"email-address"}
                    isActive={item.emailActive}
                    onFocus={() => {
                        this.state.emailArr[key].emailActive = true;
                        this.setState({ emailArr: this.state.emailArr })
                    }}
                    onBlur={() => {
                        this.state.emailArr[key].emailActive = false;
                        this.setState({ emailArr: this.state.emailArr })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.emailArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeleteEmail(key)}
                    editable={this.props.route.params.type == "edit" ? false : true}

                />
            </React.Fragment>
        )
    }

    _onAddEmail = () => {
        let arr = this.state.emailArr;
        arr.push({ emailId: "", emailActive: false });
        this.setState({
            emailArr: arr
        })
    }

    _onDeleteEmail = (key) => {
        let arr = this.state.emailArr;
        arr.splice(key, 1);
        this.state.emailArr = arr;
        this.setState({
            emailArr: this.state.emailArr
        })
    }

    _onDateTimePicker = () => {
        this.setState({
            dateTimePicker: !this.state.dateTimePicker
        })
    }

    _onSelectDateTime = (date) => {
        this.state.dateTimeObj.rawDateTime = date.date;
        this.state.dateTimeObj.date = DateConvert.formatYYYYMMDDHHMM(date.date);

        this.setState({
            dateTimeObj: this.state.dateTimeObj,
        })
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
            organizationName: this.state.organizationName,
            contactPersonName: this.state.contactPersonName,
            phoneNumberArr: this.state.phoneNumberArr,
            emailArr: this.state.emailArr,
            isNeedMeeting: this.state.isNeedMeeting,
            dateTime: this.state.dateTimeObj.date,
            dateTimeRaw: this.state.dateTimeObj.rawDateTime,
            isRecurring: this.state.isRecurring,
            recurringType: this.state.selectedRecurringTypeObj.id ? this.state.selectedRecurringTypeObj.id : "",
            date: this.state.dateObj.date,
            startDate: this.state.startDateObj.date,
            endDate: this.state.endDateObj.date
        }

        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                pageNum: 3,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }
    }

    _onChangeNeedMeeting = () => {
        if (this.state.isNeedMeeting) {
            this.state.dateTimeObj = {
                rawDateTime: new Date(),
                date: "",
                time: ""
            };
            this.setState({
                dateTimeObj: this.state.dateTimeObj,
                isNeedMeeting: false
            })
        } else {
            this.setState({
                isNeedMeeting: true
            })
        }
    }

    _onChangeRecurring = () => {

        if (this.state.isRecurring) {
            this.state.selectedRecurringTypeObj = {}
            this.setState({
                selectedRecurringTypeObj: this.state.selectedRecurringTypeObj,
                isRecurring: false
            })
        } else {
            this.setState({
                isRecurring: true
            })
        }
    }

    _onSelectRecurringType = (value) => {
        let data = this.state.allRecurringType;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.setState({
            selectedRecurringTypeObj: value,
            allRecurringType: data,
            dateObj: {
                rawDate: new Date(),
                date: ""
            },
            startDateObj: {
                rawDate: new Date(),
                date: ""
            },
            endDateObj: {
                rawDate: new Date(),
                date: ""
            },
        })
    }

    reacurringTypeDateSection = (id) => {
        return (
            <React.Fragment>
                {id == 1 ?
                    <View style={{ marginBottom: 15 }}>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onDatePicker(true)} activeOpacity={0.9} disabled={this.props.route.params.type == "edit" ? true : false}>
                            <Text style={[styles.inputBoxText, this.state.dateObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>
                                {this.state.dateObj.date.length == 0 ? "*Date" : this.state.dateObj.date}
                            </Text>
                            <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.datePicker}
                            date={this.state.dateObj.rawDate}
                            mode={"date"}
                            onConfirm={(date) => {
                                this._onSelectDate({date})
                            }}
                            onCancel={() => {
                                this._onDatePicker(false)
                            }}
                        />
                    </View>
                    :
                    <React.Fragment>
                        <View style={{ marginBottom: 15 }}>
                            <View style={{ height: 10 }} />
                            <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onStartDatePicker(true)} activeOpacity={0.9} disabled={this.props.route.params.type == "edit" ? true : false}>
                                <Text style={[styles.inputBoxText, this.state.startDateObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>
                                    {this.state.startDateObj.date.length == 0 ? "*Start Date" : this.state.startDateObj.date}
                                </Text>
                                <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                </View>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={this.state.startDatePicker}
                                date={this.state.startDateObj.rawDate}
                                mode={"date"}
                                onConfirm={(date) => {
                                    this._onSelectStartDate({ date })
                                }}
                                onCancel={() => {
                                    this._onStartDatePicker(false)
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <View style={{ height: 10 }} />
                            <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onEndDatePicker(true)} activeOpacity={0.9}>
                                <Text style={[styles.inputBoxText, this.state.endDateObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>
                                    {this.state.endDateObj.date.length == 0 ? "*End Date" : this.state.endDateObj.date}
                                </Text>
                                <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                </View>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={this.state.endDatePicker}
                                date={this.state.endDateObj.rawDate}
                                minimumDate={this.state.startDateObj.rawDate}
                                mode={"date"}
                                onConfirm={(date) => {
                                    this._onSelectEndDate({ date })
                                }}
                                onCancel={() => {
                                    this._onEndDatePicker(false)
                                }}
                            />
                        </View>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }

    _onDatePicker = (type) => {
        this.setState({
            datePicker: type
        })
    }

    _onSelectDate = (date) => {
        this.state.dateObj.rawDate = date.date;
        this.state.dateObj.date = DateConvert.formatYYYYMMDD(date.date);

        this.setState({
            dateObj: this.state.dateObj,
        })
    }

    _onStartDatePicker = (type) => {
        this.setState({
            startDatePicker: type
        })
    }

    _onSelectStartDate = (date) => {
        this.state.startDateObj.rawDate = date.date;
        this.state.startDateObj.date = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            startDateObj: this.state.startDateObj,
        });

        if (date.date.getTime() > this.state.endDateObj.rawDate.getTime()) {
            this.state.endDateObj.rawDate = date.date;
            this.state.endDateObj.date = "";
            this.setState({
                endDateObj: this.state.endDateObj,
            })
        }
    }

    _onEndDatePicker = (type) => {
        this.setState({
            endDatePicker: type
        })
    }

    _onSelectEndDate = (date) => {
        this.state.endDateObj.rawDate = date.date;
        this.state.endDateObj.date = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            endDateObj: this.state.endDateObj,
        })
    }

    yellowBoxSection = () => {
        return (
            <View style={styles.blueBox}>
                <View style={styles.blueViewFlex}>
                    <Text style={styles.listHeaderText}>Additional Information</Text>
                </View>
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
                        <View style={styles.container}>
                            {this.yellowBoxSection()}
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.organizationName}
                                    onChangeText={(value) => this._onChangeOrganizationName(value)}
                                    placeholder={"*Organization Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.organizationNameActive}
                                    onFocus={() => { this.setState({ organizationNameActive: true }) }}
                                    onBlur={() => { this.setState({ organizationNameActive: false }) }}
                                    returnKeyType={'default'}
                                    editable={this.props.route.params.type == "edit" ? false : true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.contactPersonName}
                                    onChangeText={(value) => this._onChangeContactPersonName(value)}
                                    placeholder={"*Contact Person Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.contactPersonNameActive}
                                    onFocus={() => { this.setState({ contactPersonNameActive: true }) }}
                                    onBlur={() => { this.setState({ contactPersonNameActive: false }) }}
                                    height={45}
                                    returnKeyType={'default'}
                                    editable={this.props.route.params.type == "edit" ? false : true}

                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {this.state.phoneNumberArr.map((item, key) => (
                                    this.phoneNumberSection(item, key)
                                ))}

                                {this.state.phoneNumberArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.BLUE.CAPRI }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>

                                {this.state.emailArr.map((item, key) => (
                                    this.emailSection(item, key)
                                ))}

                                {this.state.emailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.BLUE.CAPRI }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15, }}>
                                <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} >
                                    <CheckBox
                                        type={"tick"}
                                        borderRadius={30}
                                        data={this.state.isNeedMeeting}
                                        onClickValue={(value) => this._onChangeNeedMeeting(value)}
                                        isDisabled={this.props.route.params.type == "edit" ? true : false}

                                    />
                                    <View style={{ width: 10 }} />
                                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Need Meeting</Text>
                                </View>
                            </View>

                            {this.state.isNeedMeeting ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onDateTimePicker()} activeOpacity={0.9} disabled={this.props.route.params.type == "edit" ? true : false}>
                                        <Text style={[styles.inputBoxText, this.state.dateTimeObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>
                                            {this.state.dateTimeObj.date.length == 0 ? "*Date & Time" : this.state.dateTimeObj.date}
                                        </Text>
                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                        </View>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={this.state.dateTimePicker}
                                        date={this.state.dateTimeObj.rawDateTime}
                                        mode={"datetime"}
                                        onConfirm={(date) => {
                                            this._onSelectDateTime({ date })
                                        }}
                                        onCancel={() => {
                                            this._onDateTimePicker()
                                        }}
                                    />
                                </View>
                                :
                                null
                            }


                            <View style={{ marginBottom: 15, }}>
                                <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} >
                                    <CheckBox
                                        type={"tick"}
                                        borderRadius={30}
                                        data={this.state.isRecurring}
                                        onClickValue={(value) => this._onChangeRecurring(value)}
                                        isDisabled={this.props.route.params.type == "edit" ? true : false}

                                    />
                                    <View style={{ width: 10 }} />
                                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Recurring</Text>
                                </View>
                            </View>

                            {this.state.isRecurring ?
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.selectedRecurringTypeObj.id ? this.state.selectedRecurringTypeObj.id.toString() : "0"}
                                        data={this.state.allRecurringType}
                                        onSelect={(value) => this._onSelectRecurringType(value)}
                                        headerText={"*Recurring Type"}
                                        selectedText={this.state.selectedRecurringTypeObj.name ? this.state.selectedRecurringTypeObj.name : "Select Recurring Type"}
                                        selectedTextColor={this.state.selectedRecurringTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        isDisabled={this.props.route.params.type == "edit" ? true : falseI}
                                    />
                                </View>
                                :
                                null
                            }

                            {this.state.selectedRecurringTypeObj.id ?
                                this.reacurringTypeDateSection(this.state.selectedRecurringTypeObj.id)
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

export default AdditionalInformation;