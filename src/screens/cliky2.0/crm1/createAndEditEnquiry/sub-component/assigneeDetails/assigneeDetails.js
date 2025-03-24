import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, ImageName } from "../../../../../../enums";
import { DateConvert } from "../../../../../../services/common-view-function";
import { viewDateFormat } from "../../../../../../services/common-view-function/dateConvert";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { assignedEmployeeModifyData, modifyAssignedEmployeeArrData, validateData } from "./function";
import styles from "./style";

class AssigneeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false, })

    }


    _onChangeAssignName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.assignName = newText;
        this.setState({
            // assignName: newText
            allPageData: this.state.allPageData
        })
    }

    getAssignedEmployeeData = async (value) => {
        this.setState({ assignedLoader: true })
        let reqData = {
            "countryId": 1,
            "stateId": this.state.allPageData.selectedStateObj.id,
            "designationId": value.id ? value.id : "",
            "zoneId":this.state.allPageData.selectedZoneObj.id
        }

        let responseData = await MiddlewareCheck("getAssignedEmployeeData", reqData, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let assignedEmployeeData = assignedEmployeeModifyData(responseData);
                this.state.allPageData.allAssignedEmployeeArr = modifyAssignedEmployeeArrData(assignedEmployeeData.assignedEmployeeList);
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            assignedLoader: false
        })
    }

    _OnSelectEmployeeType = async (value) => {
        let data = this.state.allPageData.allEmployeeTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allEmployeeTypeArr = data;
        this.state.allPageData.selectedEmployeeTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.getAssignedEmployeeData(value);
    }

    _OnSelectAssignedEmployee = (value) => {
        let data = this.state.allPageData.allAssignedEmployeeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allAssignedEmployeeArr = data;
        this.state.allPageData.selectedAssignedEmployeeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    _onAssignedDatePicker = () => {
        if (this.state.allPageData.assignedDatePicker == false) {
            this.state.allPageData.assignedDatePicker = true
        } else {
            this.state.allPageData.assignedDatePicker = false
        }
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectAssignedDate = (date) => {
        this.state.allPageData.assignedDateObj.rawDate = date.date;
        this.state.allPageData.assignedDateObj.assignedDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            allPageData: this.state.allPageData
        });
    }

    _onSave = () => {
        let reqData = {
            "employeeTypeId": this.state.allPageData.selectedEmployeeTypeObj.id ? this.state.allPageData.selectedEmployeeTypeObj.id : "",
            "assignTo": this.state.allPageData.selectedAssignedEmployeeObj.id ? this.state.allPageData.selectedAssignedEmployeeObj.id : "",
            "assignDate": this.state.allPageData.assignedDateObj.assignedDate ? DateConvert.fullDateFormat(this.state.allPageData.assignedDateObj.assignedDate) : "",
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
            }
            this.props.onSaveDataToParent(data);
        }
    }

    _onBack = () => {
        this.state.allPageData.assignedDatePicker = false;
        let data = {
            pageNum: 2,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
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

                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Assignee Details</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedEmployeeTypeObj.id ? this.state.allPageData.selectedEmployeeTypeObj.id.toString() : "0"}
                                    data={this.state.allPageData.allEmployeeTypeArr}
                                    onSelect={(value) => this._OnSelectEmployeeType(value)}
                                    headerText={"Employee Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.assignedLoader ? <>
                                    <ActivityIndicator />
                                </> : <>
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedAssignedEmployeeObj.id ? this.state.allPageData.selectedAssignedEmployeeObj.id.toString() : "0"}
                                        data={this.state.allPageData.allAssignedEmployeeArr}
                                        onSelect={(value) => this._OnSelectAssignedEmployee(value)}
                                        headerText={"Assigned Employee*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </>}

                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onAssignedDatePicker()} activeOpacity={0.9}>
                                    <Text style={[styles.inputBoxText, { color: this.state.allPageData.assignedDateObj.assignedDate.length < 0 ? Color.COLOR.GRAY.PHILIPPINE_SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR }]}>{this.state.allPageData.assignedDateObj.assignedDate.length == 0 ? "Assign Date" : viewDateFormat(this.state.allPageData.assignedDateObj.assignedDate)}</Text>
                                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.allPageData.assignedDatePicker}
                                    date={this.state.allPageData.assignedDateObj.rawDate}
                                    mode={"date"}
                                    onConfirm={(date) => {
                                        this._onSelectAssignedDate({ date })
                                    }}
                                    onCancel={() => {
                                        this._onAssignedDatePicker()
                                    }}
                                />
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>

                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />

                                <BigTextButton
                                    text={this.props.route.params.type == "edit" ? "Update" : "Submit"}
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

export default AssigneeDetails;