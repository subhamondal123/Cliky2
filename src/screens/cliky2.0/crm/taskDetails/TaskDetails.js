import React from "react";
import { Color, Dimension, ImageName } from '../../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../../redux/Sales360Action';
import { ErrorCode } from '../../../../services/constant';
import { modifyApiResp, modifyPriorityData, modifyTaskStageData, validateStatusUpdateData } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, TextInputBox } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";

class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsCheck: false,
            additionalInfoCheck: false,
            descriptionCheck: false,
            showHideCheck: false,
            detailsInfoData: [],
            ProfileModal: false,

            priorityStatus: [],
            selectPriorityStatusObj: {},

            taskOwnerData: [],
            allTaskDetails: {},

            detailsModal: false,
            pageLoader: true,
            popUpModal: false,
            popUpType: "",

            isVisibleStatusModal: false,
            statusModalLoader: false,
            remarks: "",
            remarksActive: false,

            allStatus: [],
            selectStatus: {},
            refreshing: false
        }
    }

    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("TaskDetails");
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this.setState({
            pageLoader: true
        })
        await this.loadLandingData();
        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            this.state.detailsInfoData[i]["check"] = false;
        }
        let reqData = {
            taskId: this.props.route.params.data.taskId.toString()
        }
        let responseData = await MiddlewareCheck("getTaskDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedResp = modifyApiResp(responseData.response)
                this.state.detailsInfoData = modifiedResp.allDetails;
                this.state.taskOwnerData = modifiedResp.taskOwnerShip;
                this.state.allTaskDetails = responseData.response[0];
                this.setState({
                    detailsInfoData: this.state.detailsInfoData,
                    taskOwnerData: this.state.taskOwnerData,
                    allTaskDetails: this.state.allTaskDetails

                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
                // }
            }
        }
        this.setState({
            pageLoader: false
        })
    }

    resetStateData = async () => {
        this.setState({
            detailsCheck: false,
            additionalInfoCheck: false,
            descriptionCheck: false,
            showHideCheck: false,
            detailsInfoData: [],
            ProfileModal: false,
            priorityStatus: [],
            selectPriorityStatusObj: {},
            taskOwnerData: [],
            allTaskDetails: {},
            detailsModal: false,
            pageLoader: true,
            popUpModal: false,
            popUpType: "",
            isVisibleStatusModal: false,
            statusModalLoader: false,
            remarks: "",
            remarksActive: false,
            allStatus: [],
            selectStatus: {},
            refreshing: false
        });
    }

    _onReload = async () => {
        await this.resetStateData();
        await this._load();
    }

    loadLandingData = async () => {
        await this.getPriorityDropdown();
        await this.getTaskStatusData();
    }

    getPriorityDropdown = async () => {
        let responseData = await MiddlewareCheck("getPriorityDropdown", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.priorityStatus = modifyPriorityData(responseData.response);
                this.setState({
                    priorityStatus: this.state.priorityStatus
                })
            }
        }
    }

    getTaskStatusData = async () => {
        let responseData = await MiddlewareCheck("getAllTaskStageData", {}, this.props);
        if (responseData === false) {
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allStatus = modifyTaskStageData(responseData.response);
                this.setState({
                    allStatus: this.state.allStatus
                })
            }
        }
    }

    _onProfile = () => {
        this.setState({
            ProfileModal: !this.state.ProfileModal

        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    _onShowHide = (item, key) => {
        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            if (this.state.detailsInfoData[i].tabName == item.tabName) {
                if (this.state.detailsInfoData[key].check) {
                    this.state.detailsInfoData[i]["check"] = false
                } else {
                    this.state.detailsInfoData[i]["check"] = true
                }
            } else {
                this.state.detailsInfoData[i]["check"] = false
            }
        }
        this.setState({
            detailsInfoData: this.state.detailsInfoData
        })

    }


    assignedTo = () => {
        return (
            <View style={styles.allDetailsView}>
                <TouchableOpacity style={{ flex: 0.3 }}
                    activeOpacity={0.8}
                    onPress={() => this._onProfile()}>
                    <Image source={ImageName.LOGIN_BACKGROUND_BIG_IMAGE} style={styles.viewImg} />
                </TouchableOpacity>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Assigned to</Text>
                    <Text style={styles.viewSubText}>Mobile User</Text>
                </View>
            </View>
        )
    }

    dueDate = () => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    <Image source={ImageName.NO_IMG} style={styles.viewImg} />
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Due Date</Text>
                    <Text style={styles.viewSubText}>2022-07-30</Text>
                </View>
            </View>
        )
    }

    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
    }


    onOpenAndClosePopUp = (type) => {
        if (this.state.popUpModal == false) {
            this.setState({
                popUpModal: true,
                popUpType: type
            })
        } else {
            this.setState({
                popUpModal: false,
            })
        }
    }
    _OnSelectPriorityStatus = (value) => {
        let data = this.state.priorityStatus;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.setState({
            selectPriorityStatusObj: value,
            priorityStatus: data,
        })
    }

    statusSection = () => {
        const onSelectStatus = (value) => {
            this.setState({
                selectStatus: value
            })
        }

        return (
            <React.Fragment>
                <View style={{ marginTop: 30, marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.shortheaderText}>Status:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.5 }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectStatus.id ? this.state.selectStatus.id.toString() : "0"}
                            data={this.state.allStatus}
                            onSelect={(value) => onSelectStatus(value)}
                            headerText={"Status"}
                            selectedText={this.state.selectStatus.name ? this.state.selectStatus.name : "Priority"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }


    proretyStatusSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginTop: 30, marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.shortheaderText}>Status:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.5 }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectPriorityStatusObj.id ? this.state.selectPriorityStatusObj.id.toString() : "0"}
                            data={this.state.priorityStatus}
                            onSelect={(value) => this._OnSelectPriorityStatus(value)}
                            headerText={"Priority"}
                            selectedText={this.state.selectPriorityStatusObj.name ? this.state.selectPriorityStatusObj.name : "Priority"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }


    _onStatusModal = () => {
        if (this.state.isVisibleStatusModal == false) {
            this.setState({
                isVisibleStatusModal: true,
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
                selectStatus: {},
                selectPriorityStatusObj: {},
                remarks: ""
            })
        }
    }

    _onSubmitStatusData = async () => {
        let reqData = {
            priorityStatusId: this.state.selectPriorityStatusObj.id ? this.state.selectPriorityStatusObj.id.toString() : "",
            taskStageId: this.state.selectStatus.id ? this.state.selectStatus.id.toString() : "",
            remarks: this.state.remarks,
            taskId: this.props.route.params.data.taskId.toString(),
        }
        let validationStatus = validateStatusUpdateData(reqData);
        if (validationStatus) {
            this.setState({ statusModalLoader: true });
            let responseData = await MiddlewareCheck("updateTaskStatusPriority", reqData, this.props);
            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    this._onStatusModal();
                    this._onReload();
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.setState({ statusModalLoader: false });
        }
    }



    _onStatusView = () => {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this._onStatusModal()}
                            disabled={this.state.allTaskDetails.isComplete && this.state.allTaskDetails.isComplete == "1" ? true : false}
                            activeOpacity={0.9}>
                            <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN, top: -4, marginLeft: '5%' }]}>{this.state.allTaskDetails.priorityName}</Text>
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 10, width: 10, marginLeft: 5, top: -4 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textAssignTo}>Assigned to: <Text style={styles.textAssigntoName}>{this.state.allTaskDetails.firstName}  {this.state.allTaskDetails.lastName}</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Organization Name:</Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allTaskDetails.organizationName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Contact Person:</Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allTaskDetails.contactPerson}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Due Date : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{DateConvert.viewDateFormat(this.state.allTaskDetails.dueDate)}</Text>
                    </View>
                </View>
            </React.Fragment>
        )
    }

    taskDetailsInfoData = () => {
        return (
            this.state.detailsInfoData.map((item, key) =>
                <React.Fragment key={key}>
                    {this.infoDetails(item, key)}
                </React.Fragment>
            )
        )
    }

    infoDetails = (item, key) => {
        return (
            <View style={styles.shadowBox}>
                <TouchableOpacity style={styles.dropDownSec}
                    onPress={() => this._onShowHide(item, key)}
                    activeOpacity={0.9}>
                    <Text style={styles.boxMainText}>{item.tabName}</Text>
                    <Image source={item.check ? ImageName.DROPDOWN_UP_ARROW : ImageName.DROPDOWN_DOWN_ARROW} style={styles.dropDownImg} />
                </TouchableOpacity>
                {item.check ?
                    <React.Fragment>
                        <View style={styles.underLine} />
                        {this.ViewDetailsData(item)}
                    </React.Fragment> :
                    null
                }
            </View>
        )
    }

    ViewDetailsData = (item) => {
        let detailsDropDown = [];
        for (let [key, value] of Object.entries(item.value)) {
            detailsDropDown.push(
                <View style={{ flexDirection: 'row', marginTop: 8 }} key={key}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.detailsSubText}>{value.length > 0 ? value : "N/A"}</Text>
                    </View>
                </View>
            )
        }
        return (
            detailsDropDown
        );
    }

    ViewTaskOwnership = () => {
        let taskDropDown = [];
        for (let [key, value] of Object.entries(this.state.taskOwnerData)) {
            taskDropDown.push(
                <View style={{ flexDirection: 'row', marginTop: 8 }} key={key}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.detailsSubText}>{value.length == 0 ? 'N/A' : value}</Text>
                    </View>
                </View>
            )
        }
        return (
            taskDropDown
        );
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                    :
                    <React.Fragment>
                        <PhoneEmailLocationPopup
                            isVisible={this.state.popUpModal}
                            data={this.state.popUpType == "phone" ? this.state.allTaskDetails.contactPersonPhone : this.state.popUpType == "email" ? this.state.allTaskDetails.contactPersonEmail : ""}
                            type={this.state.popUpType}
                            onCloseModal={() => this.onOpenAndClosePopUp()}
                        />
                        <Modal
                            isVisible={this.state.isVisibleStatusModal}
                            onRequestClose={() => this._onStatusModal()}
                            onBackdropPress={() => this._onStatusModal()}
                            onBackButtonPress={() => this._onStatusModal()}
                            children={
                                <View style={styles.modalstatusview}>
                                    <View style={styles.modalHeaderSec}>
                                        <View style={styles.madalMarginView}>
                                            <Text style={styles.profileNameText}>Mark Update</Text>
                                        </View>
                                    </View>
                                    {this.state.statusModalLoader ?
                                        <View style={{ paddingVertical: 40, }}>
                                            <Loader />
                                        </View>
                                        :
                                        <>
                                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                            </View>
                                            {this.statusSection()}
                                            <View style={{ marginTop: 30 }}>
                                                {this.proretyStatusSec()}
                                            </View>
                                            <View style={{ marginTop: 30 }}>
                                                {this.remarksSection()}
                                            </View>
                                            <View style={{ marginHorizontal: '5%', marginTop: 40, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                                    <BigTextButton
                                                        height={40}
                                                        borderRadius={24}
                                                        backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                                        text={"Cancel"}
                                                        onPress={() => this._onStatusModal()}
                                                    />
                                                </View>
                                                <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                                    <BigTextButton
                                                        height={40}
                                                        borderRadius={24}
                                                        text={"Submit"}
                                                        onPress={() => this._onSubmitStatusData()}
                                                    />
                                                </View>
                                            </View>
                                        </>
                                    }
                                </View>
                            }
                        />
                        <View style={{ marginHorizontal: '2%', marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ marginTop: 2 }}
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                                <View style={styles.imgSec}>
                                    <View>
                                        <Image source={{ uri: App_uri.SFA_IMAGE_URI + this.props.route.params.data.profilePic }} style={styles.userImg} />
                                    </View>
                                    <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                                        <Text numberOfLines={1} style={styles.textFollowUpCall}>{this.state.allTaskDetails.taskName}</Text>
                                        <Text numberOfLines={1} style={styles.textSubheader}>Task type : {this.state.allTaskDetails.taskType}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 0.4 }}>
                                    <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}
                                        activeOpacity={0.9}
                                        onPress={() => this.onOpenAndClosePopUp("phone")}
                                    >
                                        <Image source={ImageName.CALL_BLACK} style={styles.headerImg} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                                        activeOpacity={0.9}
                                        onPress={() => this.onOpenAndClosePopUp("email")}
                                    >
                                        <Image source={ImageName.SMS_LOGO} style={styles.headerImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginBottom: 5 }} />
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onReload()}
                                />
                            }>
                            <View style={styles.mainView}>
                                <View style={styles.shadowBox}>
                                    {this._onStatusView()}
                                </View>
                                {/* <Text style={styles.textDetailsInfo}>Detail informations</Text> */}
                                <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Details Information</Text>
                                    {this.taskDetailsInfoData()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.textDetailsInfo}>Task Ownership</Text>
                                        </View>

                                    </View>
                                    {this.ViewTaskOwnership()}
                                </View>
                                <View style={{ marginBottom: 50 }} />
                            </View>
                        </ScrollView>
                        {/* <FloatingButton navigation={this.props.navigation.navigate} /> */}
                    </React.Fragment>
                }

            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);