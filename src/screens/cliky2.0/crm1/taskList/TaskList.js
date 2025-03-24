import React from "react";
import { Color, Dimension, ImageName } from "../../../../enums";
import styles from "./Style";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, taskModifyData } from "./Function";
import Tooltip from "react-native-walkthrough-tooltip";
import { AssignedModal, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../../shared";
// import Header from "../../../header";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { FileDownload, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import { viewDateFormat } from "../../../../services/common-view-function/dateConvert";
import { App_uri } from "../../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";

const status = [
    {
        id: 1,
        name: "Open"
    },
    {
        id: 2,
        name: "Closed"
    }
]

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageViewVisible: false,
            imageUploadModal: false,
            showHideData: false,
            toolTip: false,
            isVisible: false,
            refreshing: true,
            pageLoader: false,
            listLoader: false,
            actionTooltip: false,
            showHideCheckBox: false,
            showHideButton: false,
            selectAllCheckbox: false,
            filterCheck: false,
            selectedButton: "",
            selectItem: {},
            selectedContactItem: {},
            taskList: [],
            loadMore: false,
            filterData: {},
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            listDataLoader: true,
            isVisibleEditModal: false,
            filterVisibility: false,
            selectStatus: {},
            remarks: "",
            remarksActive: false,
            isVisibleFavouriteModal: false,
            messageTxt: "",
            statusLoader: false,
            downloadCheck: false,
            deleteLoader: false,
            updateAssigneeModal: false,
            selectedAssignedObj: {},
            allFilterData: {
                taskName: "",
                assignedTo: "",
                contactPerson: "",
                phone: "",
                priortyStatus: ""
            },
            // .................
            initialApiCall: false,
            moduleSettingsData: {},

            isApiCall: true,
        };
    }

    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._load();
                StoreUserOtherInformations("", {}, this.props);
            })
    }

    _load = async () => {
        let moduleSettingsData = await StorageDataModification.userModuleSettingsData({}, "get");
        this.setState({ moduleSettingsData: moduleSettingsData })
        await this.storeInitialData();
        await this._apiCallRes();
    };

    storeInitialData = async () => {
        let taskData = await StorageDataModification.taskListData({}, "get");
        if (taskData == null || taskData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                taskList: taskData.taskList,
                totalDataCount: taskData.totalCount,
                pageLoader: false
            })
        }
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "taskName": this.state.allFilterData.taskName ? this.state.allFilterData.taskName : "",
            "searchName": this.state.allFilterData.taskName ? this.state.allFilterData.taskName : "",
            "dueDate": "",
            "assignTo": this.state.allFilterData.assignedTo ? this.state.allFilterData.assignedTo : "0",
            "contactPerson": this.state.allFilterData.contactPerson ? this.state.allFilterData.contactPerson : "",
            "phone": this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
            "priority": this.state.allFilterData.priortyStatus ? this.state.allFilterData.priortyStatus.toString() : "",
            "isDownload": "0",
            "hierarchyDataIdArr": [],
            "searchFrom": "",
            "searchTo": "",
        }
        let responseData = await MiddlewareCheck("tasklist", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let taskData = await StorageDataModification.taskListData({}, "get");
                    let taskListData = taskModifyData(responseData);
                    if (taskListData.taskList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    if (taskData == null || taskData == undefined) {
                        this.setState({
                            taskList: taskListData.taskList,
                            totalDataCount: taskListData.totalCount
                        });
                        await StorageDataModification.taskListData(taskListData, "store");
                    } else if (JSON.stringify(taskData.taskList) === JSON.stringify(taskListData.taskList)) {
                        this.setState({
                            taskList: taskListData.taskList,
                            totalDataCount: taskListData.totalCount
                        });
                        if (taskData.totalCount !== taskListData.totalCount) {
                            await StorageDataModification.taskListData(taskListData, "store");
                        }
                    } else {
                        this.setState({
                            taskList: taskListData.taskList,
                            totalDataCount: taskListData.totalCount
                        });
                        await StorageDataModification.taskListData(taskListData, "store");
                    }
                    this.setState({ initialApiCall: true });
                } else {
                    let taskListData = taskModifyData(responseData);
                    if (taskListData.taskList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState({
                        taskList: [...this.state.taskList, ...taskListData.taskList],
                        totalDataCount: taskListData.totalCount
                    })
                }
                await this.showHideBottomButton();
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.taskListData({}, "clear");
                    this.setState({
                        isApiCall: true,
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        taskList: [],
                        initialApiCall: true
                    })
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    deleteContactItem = async (idArr) => {
        let reqData = {
            "contactId": idArr
        }
        let responseData = await MiddlewareCheck("deleteContact", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }

    // ..........for status

    _onChangeStatus = (item) => {
        this._onStatusModal(item);
        this.setState({
            taskList: convertListData(this.state.taskList, item)
        })
    }
    _onStatusModal = (item) => {
        if (this.state.isVisibleStatusModal == false && this.state.showHideCheckBox == false) {
            this.setState({
                isVisibleStatusModal: true,
                selectedContactItem: item,
                selectedStatusDataObj: {}
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
            })
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 100,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    _onFilterWithApi = async (data) => {
        this.state.allFilterData.taskName = data.taskName ? data.taskName.toString() : "";
        this.state.allFilterData.assignedTo = data.assignedTo ? data.assignedTo.toString() : "";
        this.state.allFilterData.contactPerson = data.contactPerson ? data.contactPerson : "",
            this.state.allFilterData.phone = data.phone ? data.phone : "",
            this.state.allFilterData.priortyStatus = data.priorityStatus.name ? data.priorityStatus.name : "",
            this.setState({
                allFilterData: this.state.allFilterData
            })
        this.onFilterOpenAndClose();
        await this.onRefresh();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        await this.clearFilterData();
        await this.onRefresh();
    }

    clearFilterData = async () => {
        this.state.allFilterData.taskName = "",
            this.state.allFilterData.assignedTo = "",
            this.state.allFilterData.contactPerson = "",
            this.state.allFilterData.phone = "",
            this.state.allFilterData.priortyStatus = "",
            this.setState({ allFilterData: this.state.allFilterData })
    }

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // fetch more
    fetchMore = async () => {
        if (this.state.initialApiCall) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.isApiCall) {
                        this._apiCallRes();

                    } else {
                        this.setState({ listLoader: false })
                        return null;
                    }
                }
            );
        }
    };

    onClickListCheckbox = (item) => {
        let allItems = this.state.taskList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].taskId == item.taskId) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.taskList = allItems;
        this.setState({ taskList: this.state.taskList })
        this.showHideBottomButton();
    }

    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.taskList.length; i++) {
            if (this.state.taskList[i].tick == false) {
                counter++;
            } else {
                btnCounter++;
            }
        }
        if (counter == 0) {
            this.setState({
                selectAllCheckbox: true
            });
        } else {
            this.setState({
                selectAllCheckbox: false
            });
        }
        if (btnCounter == 0) {
            this.setState({
                showHideButton: false,
            });
        } else {
            this.setState({
                showHideButton: true,
            });
        }
    }

    // rendering the data
    renderTaskList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.dataList(item, key)}
                </View>
            </View>
        );
    };

    // ...........for list checkbox,,,,,,,

    checkBoxList = (item) => {
        return (
            <CheckBox
                type="tick"
                borderRadius={10}
                data={item.tick}
                onClickValue={() => this.onClickListCheckbox(item)}
                image={ImageName.YELLOW_TICK}
                additionalImgStyle={{ height: 20, width: 20 }}
            />
        )
    }

    onShowHideData = (item) => {
        let allItems = this.state.taskList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].taskId == item.taskId) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.taskList = allItems;
        this.setState({ taskList: this.state.taskList })
    }

    dataList = (item) => {
        return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
    };
    ListData = (item, key) => {
        return (
            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
                <View style={styles.mainBox}>
                    {/* <View style={[styles.blueBox, { backgroundColor: item.color }]}> */}
                    <View style={[styles.blueBox]}>

                        <TouchableOpacity style={styles.blueViewFlex}
                            activeOpacity={1}
                            onPress={() => this.onShowHideData(item)}>
                            <View style={styles.homeCircel}>
                                <Image source={{ uri: App_uri.SFA_IMAGE_URI + item.profilePic }} style={styles.homeLogo} />
                            </View>
                            <TouchableOpacity style={{ marginLeft: "5%", flex: 1 }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[styles.saiEnterprisesText, { flex: 1 }]} numberOfLines={1}>{item.taskName}</Text>
                                    {item.isImportant == "1" ? <React.Fragment>
                                        <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                                    </React.Fragment> : null}
                                </View>
                                <Text style={styles.textDealer} numberOfLines={1}>Contact Person : {item.contactPerson} </Text>
                            </TouchableOpacity>
                            <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
                            {this.state.showHideCheckBox ? <React.Fragment>
                                <View style={styles.checkBoxView}>
                                    {this.checkBoxList(item)}
                                </View>
                            </React.Fragment>
                                :
                                <React.Fragment>
                                    {this.state.moduleSettingsData.crm_taskEditPem == 1 ?
                                        <View style={{ marginLeft: '2%' }}>
                                            {this._onPressToolTip(item, key)}
                                        </View>
                                        :
                                        null
                                    }
                                </React.Fragment>}

                        </TouchableOpacity>
                    </View>
                    {item.showHide ? <React.Fragment>
                        <View>
                            <View style={styles.textFlexView}>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.CLIPBOARD} style={styles.iconImg} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Task Name</Text>
                                    <Text style={styles.textVisites}>{item.taskName == "" ? "N/A" : item.taskName}</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.CONTACT_TYPE} style={styles.iconImg} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Assigned To</Text>
                                    <Text style={styles.textVisites}>{item.assignUsers.length > 0 ? item.assignUsers.map((obj, key) => (
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 11 }}>{obj.userName + ","}</Text>
                                        </View>

                                    )) : null}</Text>
                                </View>
                            </View>
                            <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.CLIPBOARD_TICK} style={styles.iconImg} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Organization Name</Text>

                                    <Text key={key} style={styles.textVisites} numberOfLines={1}>{item.organizationName}</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.CALENDER_LOGO} style={styles.iconImg} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Due Date</Text>

                                    <Text key={key} style={styles.textVisites}>{item.dueDate == "" ? "N/A" : viewDateFormat(item.dueDate)}</Text>

                                </View>
                            </View>
                        </View>
                    </React.Fragment> : null}

                </View>
            </View>
        )
    };

    _onChangeFavourite = (item) => {
        this._onFavouriteModal(item);
        this.setState({
            taskList: convertListData(this.state.taskList, item)
        })
    }

    // for mark favourite
    _onFavouriteModal = (item) => {
        if (this.state.isVisibleFavouriteModal == false && this.state.showHideCheckBox == false) {
            this.setState({
                isVisibleFavouriteModal: true,
                selectedContactItem: item
            });
        } else {
            this.setState({
                isVisibleFavouriteModal: false,
            })
        }
        if (item && item.isImportant == "0") {
            this.state.messageTxt = "Are you sure want to Mark as Important?";
            this.setState({ messageTxt: this.state.messageTxt })
        } else {
            this.state.messageTxt = "Are you sure want to Remove from Important?";
            this.setState({ messageTxt: this.state.messageTxt })
        }
    }

    _markFavouriteItem = async () => {
        let fav = ""
        if (this.state.selectedContactItem.isImportant == "0") {
            fav = "1"
        } else {
            fav = "0"
        }
        let idArr = [];
        idArr.push(this.state.selectedContactItem.taskId.toString())
        let dataReq = {
            "taskIdArr": idArr,
            "isImportant": fav
        }
        this.setState({ statusLoader: true })
        let responseData = await MiddlewareCheck("changeMarkFavouriteStatusForTask", dataReq, this.props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.onRefresh()
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ statusLoader: false })
        this._onFavouriteModal();
    }

    // ......open list item tooltip ..........

    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                taskList: convertListData(this.state.taskList, item),
            });
        };
        const onContactTooltipClick = async (type, item) => {
            this.setState({
                selectItem: item,
            });
            switch (type) {
                case "viewdetails":
                    this._onViewDetails(item);
                    break;
                case "edit":
                    this._onEdit(item);
                    break;
                case "delete":
                    this._onDelete(item);
                    break;
                case "status":
                    this._onChangeStatus(item);
                    break;
                case "reminder":
                    this._onChangeFavourite(item);
                    break;
                case "updateAssignee":
                    this._onUpdateAssigneeModal(item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={item.check}
                content={
                    <ScrollView>
                        {/* <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("viewdetails", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>View</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("edit", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("delete", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("status", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("updateAssignee", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Update Assignee</Text>
                        </TouchableOpacity>
                        {item.isImportant == "0" ? <React.Fragment>
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onContactTooltipClick("reminder", item)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.tooltipText}>Mark as Important</Text>
                                {/* <Text style={styles.tooltipText}>{item.isImportant == "0" ? "Mark as Important" : "Remove from Important"}</Text> */}

                            </TouchableOpacity>
                        </React.Fragment> : null}

                    </ScrollView>
                }
                onClose={() => OnClickTooltip(item)}
            >
                <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => OnClickTooltip(item)}
                    disabled={!this.state.initialApiCall}
                >
                    <Image
                        source={ImageName.THREE_DOT}
                        style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </Tooltip>
        );
    };

    // for delete contact item

    _onDelete = (item) => {
        this._onDeleteModal(item);
        this.setState({
            taskList: convertListData(this.state.taskList, item)
        })
    };

    _deleteItem = () => {
        if (this.state.showHideCheckBox) {
            this.onSelectAction(this.state.selectedButton)
        } else {
            let idArr = [];
            let allItems = this.state.taskList,
                totalCount = this.state.totalDataCount;

            for (let i = 0; i < allItems.length; i++) {
                if (this.state.selectedContactItem.taskId == this.state.taskList[i].taskId) {
                    allItems.splice(i, 1);
                }
            }
            this.state.taskList = allItems;
            this.state.totalDataCount = totalCount - 1;
            this.setState({
                taskList: this.state.taskList,
                totalDataCount: this.state.totalDataCount,
            });

            idArr.push(this.state.selectedContactItem.taskId);
            this.deleteItemApi(idArr);
        }
    }

    deleteItemApi = async (idArr) => {
        let reqData = {
            "taskId":this.state.selectedContactItem.taskId,
        }
        this.setState({ deleteLoader: true })
        let responseData = await MiddlewareCheck("taskDelete", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this._onDeleteModal();
                Toaster.ShortCenterToaster(responseData.message);
                if (this.state.showHideCheckBox) {
                    this.onRefresh();
                    this.oncloseActions();
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.setState({ deleteLoader: false })
    }

    _onDeleteModal = (item) => {
        if (this.state.showHideCheckBox) {
            this.state.isVisibleDeleteModal = !this.state.isVisibleDeleteModal;
            this.setState({
                isVisibleDeleteModal: this.state.isVisibleDeleteModal,
            })
        } else {
            if (this.state.isVisibleDeleteModal == false) {
                this.setState({
                    isVisibleDeleteModal: true,
                    selectedContactItem: item
                });
            } else {
                this.setState({
                    isVisibleDeleteModal: false,
                })
            }
        }
    }

    // for edit task item

    _onEdit = (item) => {
        this._onEditModal(item);
        this.setState({
            taskList: convertListData(this.state.taskList, item)
        })
    }
    _onEditModal = (item) => {
        if (this.state.isVisibleEditModal == false && this.state.showHideCheckBox == false) {
            this.state.isVisibleEditModal = true;
            this.setState({
                isVisibleEditModal: this.state.isVisibleEditModal,
                selectedContactItem: item
            });
        } else {
            this.state.isVisibleEditModal = false;
            this.setState({
                isVisibleEditModal: this.state.isVisibleEditModal,
            })
        }
    }

    _editItem = () => {
        this._onEditModal();
        this.props.navigation.navigate("CreateAndEditTask", { data: this.state.selectedContactItem, type: "edit", onReloadList: this.onRefresh })
    }

    // for view details of item
    _onViewDetails = (item) => {
        this.props.navigation.navigate("TaskDetails", { data: item })
        this.setState({
            taskList: convertListData(this.state.taskList, item)
        })
    }

    // .......show hide modal,,,,,,
    _onContactModal = (item) => {
        if (this.state.isVisible == false) {
            this.setState({
                isVisible: true,
                selectedContactItem: item
            });
        } else {
            this.setState({
                isVisible: false,
            })
        }
    }
    // ..............open action header tooltip ............
    _TooltipAction = () => {
        const onClickActionTooltip = () => {
            if (this.state.actionTooltip == false) {
                this.setState({
                    actionTooltip: true
                })
            } else {
                this.setState({
                    actionTooltip: false
                })
            }
        }
        const onActionTooltipClick = async (type, item) => {
            switch (type) {
                case "delete":
                    this._onDeleteAction(type, item);
                    break;
                case "status":
                    this._onStatus(type, item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="left"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.actionTooltip}
                content={
                    <ScrollView>

                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("delete")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("status")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    // disabled={this.state.showHideCheckBox || this.state.taskList.length < 1}
                    disabled={true}
                >
                    <Image
                        source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
                    />
                </TouchableOpacity>
            </Tooltip>
        )
    }
    _onDeleteAction = (type) => {

        this.setState({
            showHideCheckBox: true,
            actionTooltip: false,
            selectedButton: type
        })
    }
    _onStatus = (type) => {
        this.setState({
            // showHideCheckBox: true, 
            actionTooltip: false,
            // selectedButton: type 
        })
    }

    oncloseActions = () => {
        this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })
        let allItems = this.state.taskList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.taskList = allItems;
        this.setState({ taskList: this.state.taskList })
        this.showHideBottomButton();
    }

    onSelectAction = (selectedButton) => {
        let allItems = this.state.taskList;
        let allMainItem = [];

        if (selectedButton == "delete") {
            let arrId = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == false) {
                    allMainItem.push(allItems[i])
                } else {
                    arrId.push(allItems[i].taskId)
                }
            }
            this.state.taskList = allMainItem;
            this.setState({ taskList: this.state.taskList });
            this.deleteItemApi(arrId);
        } else if (selectedButton == "assign") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].taskId)
                }
            }
        } else if (selectedButton == "status") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].taskId)
                } deleteContactItem
            }
        }
    }
    onClickSelectAllItem = (type) => {
        let allItems = this.state.taskList;
        switch (type) {
            case "selectAll":
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = true;

                }
                break;
            case "deSelectAll":
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = false;

                }
                break;
            default:
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = !allItems[i].tick;

                }
        }
        this.state.taskList = allItems;
        this.setState({ taskList: this.state.taskList })
        this.showHideBottomButton();
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            taskList: [],
            refreshing: true,
            listLoader: true,
            listDataLoader: true,
            pageLoader: true,
            isApiCall: true
        })
    }
    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    // ..............open action header tooltip ............
    _TooltipDownloadAction = () => {
        const onClickDownloadActionTooltip = () => {
            this.setState({
                downloadCheck: !this.state.downloadCheck
            })
        }

        const OnDownload = async (type) => {
            onClickDownloadActionTooltip()
            let dataReq = {
                "limit": this.state.totalDataCount.toString(),
                "offset": (this.state.pageNum * this.state.limit).toString(),
                "taskName": this.state.allFilterData.taskName ? this.state.allFilterData.taskName : "",
                "dueDate": "",
                "assignTo": this.state.allFilterData.assignedTo ? this.state.allFilterData.assignedTo : "",
                "contactPerson": this.state.allFilterData.contactPerson ? this.state.allFilterData.contactPerson : "",
                "phone": this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
                "priority": this.state.allFilterData.priortyStatus ? this.state.allFilterData.priortyStatus.toString() : "",

            }

            if (type == "csv") {
                this.setState({ listDataLoader: true })
                let responseData = await MiddlewareCheck("downloadForTask", dataReq, this.props);
                await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.path.file);
                // onClickDownloadActionTooltip()
                this.setState({ listDataLoader: false })
            }
            if (type == "excel") {
                this.setState({ listDataLoader: true })
                let responseData = await MiddlewareCheck("downloadForTask", dataReq, this.props);
                await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.excelPath);
                // onClickDownloadActionTooltip()
                this.setState({ listDataLoader: false })
            }
        }

        const onActionTooltipClick = async (type) => {
            switch (type) {
                case "pdf":
                    OnDownload(type);
                    break;
                case "csv":
                    OnDownload(type);
                    break;
                case "excel":
                    OnDownload(type);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.downloadCheck}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("pdf")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("csv")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>CSV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("excel")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Excel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickDownloadActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickDownloadActionTooltip()}
                    disabled={this.state.downloadCheck}
                >
                    <LottyViewLoad type={"download"} autoPlay={true} loop={true} height={20} width={20} />
                </TouchableOpacity>
            </Tooltip>
        )
    }

    // .................................update assignee section,,,,,,,,,,,,,,,,,,,,,,,,

    _onUpdateAssigneeModal = (item) => {
        if (this.state.updateAssigneeModal) {
            this.state.updateAssigneeModal = false;
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal
            })
        } else {
            this.state.updateAssigneeModal = true;
            this.state.taskList = convertListData(this.state.taskList, item);
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal,
                taskList: this.state.taskList
            })
        }
    }

    _onUpdate = async (value) => {
        this.state.selectedAssignedObj = value.selectedAssignedTypeObj;
        this.setState({
            selectedAssignedObj: this.state.selectedAssignedObj
        });
        if (this.state.selectedAssignedObj.id == undefined || this.state.selectedAssignedObj.id == null) {
            Toaster.ShortCenterToaster("Please Select Assigned Employee !");
        }
        else {
            let dataReq = {
                "taskId": this.state.selectItem.taskId,
                "assignTo": "0",
                "assignType": "1",
                "assignToArr": this.state.selectedAssignedObj.id ? [this.state.selectedAssignedObj.id] : "",
            }
            let responseData = await MiddlewareCheck("updateTaskAssignToByclientId", dataReq, this.props);

            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    await this._onUpdateAssigneeModal();
                    await this.onRefresh()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    // .......................................................***************************...............................................

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    {this.state.showHideCheckBox ?
                        <React.Fragment>
                            <TouchableOpacity style={styles.selectAll} activeOpacity={0.8}>
                                <CheckBox
                                    type="tick"
                                    borderRadius={10}
                                    data={this.state.selectAllCheckbox}
                                    onClickValue={() => this.onClickSelectAllItem(this.state.selectAllCheckbox ? "deSelectAll" : "selectAll")}
                                    image={ImageName.YELLOW_TICK}
                                    additionalImgStyle={{ height: 20, width: 20 }}
                                />
                                <Text style={styles.selectAllTxt}>Select All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                            </TouchableOpacity>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            {/* <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this._onBack}>
                                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                            </TouchableOpacity> */}

                            <View style={styles.filter_action_btn}>
                                <TouchableOpacity
                                    style={styles.filterBtn}
                                    activeOpacity={0.8}
                                    onPress={() => this.onFilterOpenAndClose()}
                                // disabled={this.state.showHideCheckBox || this.state.taskList.length < 1}
                                >
                                    <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                                </TouchableOpacity>
                                <View style={{ marginRight: 10 }}>
                                    {this._TooltipDownloadAction()}
                                </View>
                                {/* <View>
                                    {this._TooltipAction()}
                                </View> */}
                            </View>
                        </React.Fragment>
                    }
                </View>
            </View>
        )
    }

    onAddEnquiry = (val) => {
        if (val == "bt_addToEnquiry") {
            this.props.navigation.navigate("CreateEnquiry")
        }
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    render() {
        const ViewStatus = () => {
            const _onSelectPriority = (value) => {
                this.setState({
                    selectedStatusDataObj: value
                })
            }
            const _onChangeStatusData = () => {
                let selectedContact = this.state.selectedContactItem;
                let errorCount = 0;
                if (inputEmptyValidator(this.state.selectedStatusDataObj.id) == false) {
                    Toaster.ShortCenterToaster("Please select priority")
                    errorCount++;
                }

                if (errorCount === 0) {
                    this._onStatusModal();
                }
            }
            const onSelectStatus = (value) => {
                this.setState({
                    selectStatus: value
                })
            }

            const changeText = (value) => {
                this.setState({
                    remarks: value
                })
            }

            return (
                <View style={{ marginTop: '10%' }}>
                    <View style={{ marginHorizontal: "10%" }}>
                        <View style={{ justifyContent: 'center', flex: 1, marginBottom: 30 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectStatus.id ? this.state.selectStatus.id.toString() : "0"}
                                data={status}
                                onSelect={(value) => onSelectStatus(value)}
                                headerText={"Status"}
                                selectedText={this.state.selectStatus.name ? this.state.selectStatus.name : "Priority"}
                            />
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1, marginVertical: 30 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : "0"}
                                data={CommonData.COMMON.PRIORITY_STATUS}
                                onSelect={(value) => _onSelectPriority(value)}
                                headerText={"Priority"}
                                selectedText={this.state.selectedStatusDataObj.name ? this.state.selectedStatusDataObj.name : "Select Status"}
                                selectedTextColor={this.state.selectedStatusDataObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                            />
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginVertical: 30 }}>
                            <TextInputBox
                                placeholder={"Enter Remarks"}
                                value={this.state.remarks}
                                onChangeText={(value) => changeText(value)}
                                isActive={this.state.remarksActive}
                                onFocus={() => { this.setState({ remarksActive: true }) }}
                                onBlur={() => { this.setState({ remarksActive: false }) }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '10%', justifyConfor: 'center', alignContent: 'center', marginRight: '15%', marginLeft: '15%' }}>
                            <TouchableOpacity style={styles.cancelButton}
                                onPress={() => this._onStatusModal()}
                                activeOpacity={0.9}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={{ marginLeft: '5%' }} />
                            <TouchableOpacity style={styles.priorityChangeButton} onPress={() => _onChangeStatusData()} activeOpacity={0.9}>
                                <Text style={styles.cancelText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        const modalSection = () => {
            return (
                <View>
                    <ListViewModal isVisible={this.state.isVisible} data={this.state.selectedContactItem} onCloseModal={() => this._onContactModal(this.state.selectedContactItem)} onRequestClose={() => this._onContactModal(this.state.selectedContactItem)}
                        onBackdropPress={() => this._onContactModal(this.state.selectedContactItem)}
                        onBackButtonPress={() => this._onContactModal(this.state.selectedContactItem)}
                        type="contact"
                    />
                    {/* status modal */}
                    <Modal
                        isVisible={this.state.isVisibleStatusModal}
                        onRequestClose={() => this._onStatusModal()}
                        onBackdropPress={() => this._onStatusModal()}
                        onBackButtonPress={() => this._onStatusModal()}
                        children={
                            <View style={styles.modalview}>
                                <View style={styles.modalHeaderSec}>
                                    <View style={styles.marginView}>
                                        <Text style={styles.profileNameText}>Change Status</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                </View>
                                {ViewStatus()}
                            </View>
                        }
                    />
                    {/* delete modal  */}
                    <EditAndDeleteModal
                        type={'delete'}
                        isVisible={this.state.isVisibleDeleteModal}
                        onCancel={() => this._onDeleteModal()}
                        onDelete={() => this._deleteItem()}
                        isLoading={this.state.deleteLoader}
                    />
                    {/* edit modal */}
                    <EditAndDeleteModal
                        type={'edit'}
                        isVisible={this.state.isVisibleEditModal}
                        onCancel={() => this._onEditModal()}
                        onEdit={() => this._editItem()}
                    />
                    {/* favourite modal */}
                    <EditAndDeleteModal
                        type={'favourite'}
                        isVisible={this.state.isVisibleFavouriteModal}
                        onCancel={() => this._onFavouriteModal()}
                        onFavourite={() => this._markFavouriteItem()}
                        messageText={this.state.messageTxt}
                        isLoading={this.state.statusLoader}
                    />
                    <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"task"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}
                        props={this.props}
                    />
                    <AssignedModal
                        isVisible={this.state.updateAssigneeModal}
                        onCloseModal={() => this._onUpdateAssigneeModal()}
                        type={"task"}
                        onUpdateButton={(value) => this._onUpdate(value)}
                    />
                </View>
            )
        }

        return (
            <SafeAreaView style={CustomStyle.container}>
                {/* <Header {...this.props} /> */}
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />


                {this.state.pageLoader ?
                    <View>
                        <SkeletonPlaceholder>
                            {this.listHeaderSection()}
                            <View style={{ marginHorizontal: "7%" }}>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {this.ViewSkeletonPlaceholder()}
                                </ScrollView>
                            </View>
                        </SkeletonPlaceholder>
                    </View> :
                    <React.Fragment>
                        {this.listHeaderSection()}
                        {this.state.taskList.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.taskList}
                                    renderItem={(item, key) => this.renderTaskList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.state.initialApiCall ?
                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <NoDataFound />
                                    </View>
                                    :
                                    null}

                            </React.Fragment>
                        )}


                        {/* .............footer section ............. */}
                        {this.state.showHideButton ? <React.Fragment>
                            <View style={styles.productBtn}>
                                <TouchableOpacity
                                    style={styles.buttonView}
                                    activeOpacity={0.9}
                                    onPress={() => this._onDeleteModal()}
                                // onPress={() => this.onSelectAction(this.state.selectedButton)}
                                >
                                    <Text style={styles.buttonText}>{this.state.selectedButton == "assign" ? "Assign" : this.state.selectedButton == "delete" ? "Delete" : "Change Status"}</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment> : null}
                        {/* {this.state.showHideCheckBox ?
                            null
                            :
                            <>
                                {this.state.moduleSettingsData.crm_taskAddPem == 1 ?
                                    <FloatingButton navigation={this.props.navigation.navigate} />
                                    :
                                    null
                                }
                            </>
                        } */}
                    </React.Fragment>}
                {/* ................modal,,,,,,,,,, */}
                {modalSection()}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
