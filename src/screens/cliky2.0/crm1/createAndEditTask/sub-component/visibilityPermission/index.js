import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../../enums";
import { DateConvert, StorageDataModification, Toaster } from "../../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { CheckBox, DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { convertEmailsToAString, convertPhoneNumbersToAString, modifyData, validateData } from "./function";
import styles from "./style";

const allPermissionData = [
    {
        id: 1,
        name: "Everyone", //1=>Everyone, 2=>Only Record Owner, 3=>Select a team, 4=> Select individual people
    },
    {
        id: 2,
        name: "Only the record owner",
    },
    {
        id: 4,
        name: "Select individual people",
    }
]

class VisibilityPermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPermissions: allPermissionData,
            selectedPermission: "",
            allUser: [],
            selectedUserObj: {}
        };
    }

    componentDidMount() {
        this._onLoad();
    }

    _onLoad = async () => {
        await this._loadingInitialData();
        let modifedData = modifyData(this.props.allData, this.state.allPermissions, this.state.allUser);
        this.setState(modifedData);
        this.setState({
            pageloader: false
        })
    }

    _loadingInitialData = async () => {
        this.state.allUser = this.props.taskLandingData.userDtl;
        this.setState({
            allUser: this.state.allUser
        })
    }

    //  for status check
    _onCheckPermission = (value, key) => {
        let allPermissionArr = this.state.allPermissions,
            selectedPermission = "";
        allPermissionArr[key].check = !allPermissionArr[key].check;
        for (let i = 0; i < allPermissionArr.length; i++) {
            if (i == key) {
                if (value == true) {
                    selectedPermission = allPermissionArr[i].id.toString();
                }
            } else {
                allPermissionArr[i].check = false;
            }
        }
        this.setState({
            allPermissions: allPermissionArr,
            selectedPermission: selectedPermission,
            selectedUserObj: {}
        })
    }

    checkBoxItem = (item, key) => {
        return (
            <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                <CheckBox
                    type={"round"}
                    borderRadius={30}
                    data={item.check}
                    onClickValue={(value) => this._onCheckPermission(value, key)}
                    isDisabled={this.props.route.params.type == "edit" ? true : false}
                />
                <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
            </View>
        )
    }

    _onBack = () => {
        let reqData = {
            permission: this.state.selectedPermission
        }
        if (this.state.selectedPermission == 3) {
            reqData["selectedIndividualUser"] = this.state.selectedUserObj.id
        }
        let data = {
            type: "prev",
            pageNum: 3,
            data: reqData
        }
        this.props.onSaveDataToParent(data);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onSave = async () => {
        let reqData = {
            permission: this.state.selectedPermission
        }
        if (this.state.selectedPermission == 3) {
            reqData["selectedIndividualUser"] = this.state.selectedUserObj.id
        }
        let validatedStatus = validateData(this.state)
        if (validatedStatus) {
            4
            this.setState({
                pageloader: true
            })
            let data = {
                type: "next",
                pageNum: 4,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
            let info = await StorageDataModification.userCredential({}, "get");
            let dataForApi = {
                "taskName": this.props.allData.taskName,
                "taskCategoryId": this.props.allData.taskCategory,
                "assignTo": "0",
                "assignType": this.props.allData.assignToType ? 1 : 2,            // 1=user, 2=> Group
                "dueDate": this.props.allData.dueDate,
                "priorityStatusId": this.props.allData.priorityStatus,
                "taskStageId": this.props.allData.taskStage,
                "organizationName": this.props.allData.organizationName,
                "contactPerson": this.props.allData.contactPersonName,
                "contactPersonPhone": convertPhoneNumbersToAString(this.props.allData.phoneNumberArr),
                "contactPersonEmail": convertEmailsToAString(this.props.allData.emailArr),
                "taskDescription": this.props.allData.description,
                "permissionType": this.state.selectedPermission,                                        // 1=>Everyone, 2=>Only Record Owner, 3=>Select a team, 4=> Select individual people
                "accessId": this.state.selectedPermission == 4 ? this.state.selectedUserObj.id : info.userId,
                "needMeeting": this.props.allData.isNeedMeeting ? '1' : '',                                   // 1=> Yes, 0=> No
                "meetingTime": DateConvert.fullDateFormat(this.props.allData.dateTimeRaw),
                "isRecurring": this.props.allData.isRecurring ? '1' : '',                                    // 1=> Yes, 0 => No
                "recurringType": this.props.allData.recurringType,
                "assignToArr": this.props.allData.assignToArr,                                  // 1=> Daily from a particular date, 2=> Daily from start date to end date
                "startDate": this.props.allData.recurringType == 1 ? (this.props.allData.date.length == 0 ? null : this.props.allData.date) : (this.props.allData.startDate.length == 0 ? null : this.props.allData.startDate),
                "endDate": this.props.allData.endDate.length == 0 ? null : this.props.allData.endDate
            }
            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                dataForApi["taskId"] = this.props.route.params.data.taskId;
                let responseData = await MiddlewareCheck("updateTask", dataForApi, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.route.params.onReloadList();
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
            } else {
                let responseData = await MiddlewareCheck("taskAdd", dataForApi, this.props);
                if (responseData === false) {
                    this._onNetworkError();
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
            }
            this.setState({
                pageloader: false
            })
        }
    }

    individualSection = () => {
        const _onSelectUser = (value) => {
            this.setState({
                selectedUserObj: value
            })
        }

        return (
            <View style={{ marginVertical: 10 }} >
                <DropdownInputBox
                    selectedValue={this.state.selectedUserObj.id ? this.state.selectedUserObj.id.toString() : "0"}
                    data={this.state.allUser}
                    onSelect={(value) => _onSelectUser(value)}
                    headerText={"*User"}
                    // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                    // selec/tedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    yellowBoxSection = () => {
        return (
            <View style={styles.blueBox}>
                <View style={styles.blueViewFlex}>
                    <Text style={styles.listHeaderText}>Visibility Permissions</Text>
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

                            {this.state.allPermissions.map((item, key) => (
                                this.checkBoxItem(item, key)
                            ))}

                            {this.state.selectedPermission == 4 ?
                                this.individualSection()
                                :
                                null
                            }

                            <View style={{ marginTop: 80, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
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

export default VisibilityPermission;