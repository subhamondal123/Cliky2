import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { DateConvert, StorageDataModification } from "../../../../../../services/common-view-function";
import { CheckBox, DropdownInputBox, Loader, MultipleDropdownInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { modifyData, modifyDesignationData, modifyLocationMappedData, modifyUserData, validateData } from "./function";
import styles from "./style";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DynamicLocationMapping } from "../../../../../../pageShared";

class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            taskName: "",
            designationLoader: false,
            isDesignationUser: false,
            selectedUserIdArr: [],

            designationArr: [],
            selectedDesignationObj: {},
            selectedDesignationArr: [],

            taskNameActive: false,

            allTaskCategory: [],
            selectedTaskCategoryObj: {},
            allPriorityStatus: {},
            selectedPriorityStatusObj: {},
            allTaskStage: {},
            selectedTaskStageObj: {},
            dueDatePicker: false,
            dueDateObj: {
                rawDate: new Date(),
                dueDate: ""
            },
            isUser: true,
            allUser: [],
            selectedUserObj: {},
            locationLoader: false,
            locationArr: [],
            locationObj: {},
            locationArrmain: []
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getHierarchyTypesSlNo()
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

    _onLoad = async () => {
        await this.loadLandingData();
        await this.getUserListData()
        let modifiedData = modifyData(this.props.allData, this.state.allTaskCategory, this.state.allPriorityStatus, this.state.allTaskStage, this.state.allUser, this.state.selectedUserIdArr);
        this.setState(modifiedData);
        this.setState({
            pageloader: false
        })
    }

    getUserListData = async (id) => {
        let reqData = {
            refDesignationId: id == undefined || id == null ? "" : id,
            hierarchyDataIdArr: this.state.locationArrmain
            //used designationId as parameter
        }
        this.setState({ userLoader: true })
        let responseData = await MiddlewareCheck("getUserList", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let designationData = modifyUserData(responseData.response)
            this.setState({ allUser: designationData })
        }
        this.setState({ userLoader: false })
    }

    loadLandingData = async () => {
        this.state.allTaskCategory = this.props.taskLandingData.categoryDtl;
        this.state.allPriorityStatus = this.props.taskLandingData.priorityDtl;
        this.state.allTaskStage = this.props.taskLandingData.stageDtl;
        // this.state.allUser = this.props.taskLandingData.userDtl;
        this.setState({
            allTaskCategory: this.state.allTaskCategory,
            allPriorityStatus: this.state.allPriorityStatus,
            allTaskStage: this.state.allTaskStage,
            allUser: this.state.allUser
        })
    }

    _onChangeTaskName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.setState({
            taskName: newText
        })
    }

    _OnSelectTaskCategory = (value) => {
        let data = this.state.allTaskCategory;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedTaskCategoryObj: value,
            allTaskCategory: data,
        })
    }

    _OnSelectPriorityStatus = (value) => {
        let data = this.state.allPriorityStatus;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedPriorityStatusObj: value,
            allPriorityStatus: data,
        })
    }

    _OnSelectTaskStage = (value) => {
        let data = this.state.allTaskStage;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedTaskStageObj: value,
            allTaskStage: data,
        })
    }

    _onDueDatePicker = () => {
        this.setState({
            dueDatePicker: !this.state.dueDatePicker
        })
    }

    _onSelectDueDate = (date) => {
        this.state.dueDateObj.rawDate = date.date;
        this.state.dueDateObj.dueDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            dueDateObj: this.state.dueDateObj
        });
    }

    _onSave = () => {
        let reqData = {
            "taskName": this.state.taskName,
            "taskCategory": this.state.selectedTaskCategoryObj.id ? this.state.selectedTaskCategoryObj.id : "",
            "dueDate": this.state.dueDateObj.dueDate,
            "priorityStatus": this.state.selectedPriorityStatusObj.id ? this.state.selectedPriorityStatusObj.id : "",
            "taskStage": this.state.selectedTaskStageObj.id ? this.state.selectedTaskStageObj.id : "",
            "assignToType": this.state.isUser,
            "assignedUser": this.state.selectedUserObj.id ? this.state.selectedUserObj.id : "",
            "assignToArr": this.state.selectedUserIdArr,
            "designationId": this.state.selectedDesignationObj.id ? this.state.selectedDesignationObj.id : "",

        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2
            }
            this.props.onSaveDataToParent(data);
        }
    }

    yellowBoxSection = () => {
        return (
            <View style={styles.blueBox}>
                <View style={styles.blueViewFlex}>
                    <Text style={styles.listHeaderText}>Task Details</Text>
                </View>
            </View>
        )
    }

    getDesignationList = async () => {
        this.setState({ designationLoader: true })
        let responseData = await MiddlewareCheck("getDesignationForUser", {}, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let designationData = modifyDesignationData(responseData.response.data)
            this.setState({ designationArr: designationData })
        }
        this.setState({ designationLoader: false })

    }

    // for selecting the item with value
    onSelectItem = async (value, index) => {
        this.state.selectedUserIdArr = value.value
        this.setState(this.state)
        // this.state.mapData[index].selectedId = value.value;
        // this.state.mapData[index].errorCheckData = false;
        // this.setState(this.state);
        // if (index < (this.state.mapData.length - 1) && selectParentData.selectedId.length > 0) {
        //     await this.listLoader((index + 1), true);
        //     await this.getUserImmediateChildData(value, selectParentData, index);
        //     await this.listLoader((index + 1), false);
        // } else {
        //     await this.chieldValueChange(index);
        // }
        // this._onApiCallInfoData(index)
    }

    onSelectLocationData = (val) => {
        this.state.locationArr = val.totalData;
        this.state.locationObj = val.value;
        this.state.locationArrmain.push(this.state.locationObj)
        this.setState(this.state);
        this.getUserListData()
    }

    assignToSection = () => {
        const changeToUser = () => {
            if (!this.state.isUser) {
                this.setState({
                    isUser: true,
                    isDesignationUser: false
                })
            }
            this.setState({ selectedDesignationObj: {}, selectedUserObj: {}, })
        }

        const changeToGroup = async () => {
            await this.getDesignationList()
            if (this.state.isUser) {
                this.setState({
                    isUser: false,
                    isDesignationUser: false
                })
            }
            this.setState({ selectedDesignationObj: {}, selectedUserObj: {}, })

        }

        const _onSelectUser = (value) => {
            this.setState({
                selectedUserObj: value
            })
        }

        const _onSelectDesignation = (value) => {
            this.state.selectedDesignationArr = value.value;
            this.setState(this.state);
            // this.setState({
            //     isDesignationUser: true,
            //     selectedDesignationObj: value
            // })
            // this.getUserListData(value.id)
        }



        return (
            <>
                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Assigned to</Text>
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <CheckBox
                                data={true}
                                type={'radio'}
                                borderRadius={20}
                                onClickValue={() => changeToUser()}
                            />
                            <Text style={[styles.labelText, { marginLeft: "5%" }]}>Users</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <CheckBox
                                data={!this.state.isUser}
                                type={'radio'}
                                borderRadius={20}
                                onClickValue={() => changeToGroup()}
                             isDisabled={true}
                            />
                            <Text style={[styles.labelText, { marginLeft: "5%" }]}>Groups</Text>
                        </View> */}
                    </View>
                </View>
                {this.state.userLoader ?
                    <Loader type={"normal"} />
                    :
                    // <DropdownInputBox
                    //     selectedValue={this.state.selectedUserObj.id ? this.state.selectedUserObj.id.toString() : "0"}
                    //     data={this.state.allUser}
                    //     onSelect={(value) => _onSelectUser(value)}
                    //     headerText={"*User"}
                    //     // // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                    //     // selectedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    //     isBackButtonPressRequired={true}
                    //     isBackdropPressRequired={true}
                    //     isSearchable={true}
                    // />

                    <MultipleDropdownInputBox
                        // additionalMainTouchStyle={item.errorCheckData ? { borderColor: Color.COLOR.RED.LIGHT_RED, borderWidth: 1 } : {}}
                        selectedValue={this.state.selectedUserIdArr ? this.state.selectedUserIdArr : []}
                        data={this.state.allUser}
                        onSelect={(value) => this.onSelectItem(value)}
                        headerText={"*User"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        isSearchable={true}
                    />
                }

                {/* {this.state.isUser ?
                    <View style={{ marginVertical: 10 }} >
                        {this.state.userLoader ?
                            <Loader type={"normal"} />
                            :
                            // <DropdownInputBox
                            //     selectedValue={this.state.selectedUserObj.id ? this.state.selectedUserObj.id.toString() : "0"}
                            //     data={this.state.allUser}
                            //     onSelect={(value) => _onSelectUser(value)}
                            //     headerText={"*User"}
                            //     // // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                            //     // selectedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            //     isBackButtonPressRequired={true}
                            //     isBackdropPressRequired={true}
                            //     isSearchable={true}
                            // />

                            <MultipleDropdownInputBox
                                // additionalMainTouchStyle={item.errorCheckData ? { borderColor: Color.COLOR.RED.LIGHT_RED, borderWidth: 1 } : {}}
                                selectedValue={this.state.selectedUserIdArr ? this.state.selectedUserIdArr : []}
                                data={this.state.allUser}
                                onSelect={(value) => this.onSelectItem(value)}
                                headerText={"*User"}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isSearchable={true}
                            />
                        }

                    </View>
                    :
                    <View style={{ marginVertical: 10 }} >
                        {this.state.designationLoader ?
                            <Loader type={"normal"} />
                            :
                            <MultipleDropdownInputBox
                                selectedValue={this.state.selectedDesignationArr ? this.state.selectedDesignationArr : []}
                                data={this.state.designationArr}
                                onSelect={(value) => _onSelectDesignation(value)}
                                headerText={"*Designation"}
                                // // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                                // selectedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isSearchable={true}
                            />
                        }

                    </View>

                } */}
                {/* {this.state.isDesignationUser ?
                    <View style={{ marginVertical: 10 }} >
                        <DropdownInputBox
                            selectedValue={this.state.selectedUserObj.id ? this.state.selectedUserObj.id.toString() : "0"}
                            data={this.state.allUser}
                            onSelect={(value) => _onSelectUser(value)}
                            headerText={"*User"}
                            // // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                            // selectedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            isSearchable={true}
                        />
                    </View>
                    :
                    null

                } */}
            </>
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
                                    value={this.state.taskName}
                                    onChangeText={(value) => this._onChangeTaskName(value)}
                                    placeholder={"*Task Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.taskNameActive}
                                    onFocus={() => { this.setState({ taskNameActive: true }) }}
                                    onBlur={() => { this.setState({ taskNameActive: false }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.selectedTaskCategoryObj.id ? this.state.selectedTaskCategoryObj.id.toString() : "0"}
                                    data={this.state.allTaskCategory}
                                    onSelect={(value) => this._OnSelectTaskCategory(value)}
                                    headerText={"*Task Category"}
                                    selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                                    selectedTextColor={this.state.selectedTaskCategoryObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isDisabled={this.props.route.params.type == "edit" ? true : false}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }} >Select area to assign user(optional)</Text>
                                {this.state.locationLoader ?
                                    null :
                                    <>
                                        <DynamicLocationMapping
                                            // type={"lastHierarcyField"}
                                            // editData={this.props.allPageData.locationArr}
                                            screenName={"Crm"}
                                            marginBottom={15}
                                            flexDirection={"column"}
                                            viewType={"edit"}
                                            isLabelVisible={false}
                                            onApiCallData={(value) => this.onSelectLocationData(value)} />

                                    </>
                                }

                            </View>
                            {this.assignToSection()}
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onDueDatePicker()} activeOpacity={0.9} disabled={this.props.route.params.type == "edit" ? true : false}>
                                    <Text style={[styles.inputBoxText, this.state.dueDateObj.dueDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.dueDateObj.dueDate.length == 0 ? "*due date" : DateConvert.viewDateFormat(this.state.dueDateObj.dueDate)}</Text>
                                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.dueDatePicker}
                                    date={this.state.dueDateObj.rawDate}
                                    mode={"date"}
                                    onConfirm={(date) => {
                                        this._onSelectDueDate({ date })
                                    }}
                                    onCancel={() => {
                                        this._onDueDatePicker()
                                    }}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.selectedPriorityStatusObj.id ? this.state.selectedPriorityStatusObj.id.toString() : "0"}
                                    data={this.state.allPriorityStatus}
                                    onSelect={(value) => this._OnSelectPriorityStatus(value)}
                                    headerText={"*Priority Status"}
                                    selectedText={this.state.selectedPriorityStatusObj.name ? this.state.selectedPriorityStatusObj.name : "Select Priority Status"}
                                    selectedTextColor={this.state.selectedPriorityStatusObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isDisabled={this.props.route.params.type == "edit" ? true : false}

                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.selectedTaskStageObj.id ? this.state.selectedTaskStageObj.id.toString() : "0"}
                                    data={this.state.allTaskStage}
                                    onSelect={(value) => this._OnSelectTaskStage(value)}
                                    headerText={"*Task Stage"}
                                    selectedText={this.state.selectedTaskStageObj.name ? this.state.selectedTaskStageObj.name : "Select Task Stage"}
                                    selectedTextColor={this.state.selectedTaskStageObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isDisabled={this.props.route.params.type == "edit" ? true : false}

                                />
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40 }}>
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

export default TaskDetails;