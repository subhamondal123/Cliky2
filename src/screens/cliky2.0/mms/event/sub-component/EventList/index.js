import React from "react";
import { Color, Dimension, ImageName } from "../../../../../../enums";
import styles from "./style";
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
    ImageBackground,
    TextInput,
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, enquiryModifyData, modifyUpomingData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { CustomStyle } from "../../../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../../services/middleware";
import { DateConvert, FileDownload, Toaster } from "../../../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../../../services/constant";
import { App_uri } from "../../../../../../services/config";
import Header from "../../../../header/Header";
import { AssignedModal, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../../../../shared";

const status = [
    {
        id: 1,
        name: "Open"
    },
    {
        id: 2,
        name: "Closed"
    }
];


class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            imageViewVisible: false,
            imageUploadModal: false,
            showHideData: false,
            toolTip: false,
            isVisible: false,
            refreshing: true,
            pageLoader: true,
            listLoader: true,
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
            searchText: "",
            searchActive: false,
            meetingDetails: {
                upcoming: "",
                rejected: "",
                drafted: "",
                pending: "",
                approved: ""
            },

            allFilterData: {
                fromDate: "",
                toDate: "",
                status: ""
            },
            isApiCall: true
        }
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this._apiCallRes();
        await this.getMeetingDetails();
        StoreUserOtherInformations("", {}, this.props);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getMeetingDetails = async () => {
        let responseData = await MiddlewareCheck("getUpcomingMeetingDetails", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modObj = modifyUpomingData(responseData.response)
                this.state.meetingDetails.upcoming = modObj.upcoming;
                this.state.meetingDetails.drafted = modObj.draft;
                this.state.meetingDetails.rejected = modObj.rejected;
                this.state.meetingDetails.pending = modObj.pending;
                this.state.meetingDetails.approved = modObj.approved;

                this.setState({
                    meetingDetails: this.state.meetingDetails
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    _apiCallRes = async () => {
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchText": this.state.searchText ? this.state.searchText : "",
            "fromDate": this.state.allFilterData.fromDate ? this.state.allFilterData.fromDate : "",
            "toDate": this.state.allFilterData.toDate ? this.state.allFilterData.toDate : "",
            "status": this.state.allFilterData.status ? this.state.allFilterData.status : ""
        }
        let responseData = await MiddlewareCheck("meetingList", dataReq, this.props);
        console.log("----responseData-----", JSON.stringify(responseData))
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactListData = enquiryModifyData(responseData)
                if (contactListData.taskList.length == 0) {
                    this.setState({ isApiCall: false })
                }
                this.setState({
                    taskList: [...this.state.taskList, ...contactListData.taskList],
                    totalDataCount: contactListData.totalCount
                })
            } else {
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
            <View style={{ marginBottom: 150 }} />
        );
    };

    _onFilterWithApi = async (data) => {
        this.state.allFilterData.fromDate = data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate);
        this.state.allFilterData.toDate = data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate);
        this.state.allFilterData.status = data.status.id ? data.status.id.toString() : "",
            this.setState({
                allFilterData: this.state.allFilterData
            })
        this.onFilterOpenAndClose();
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        this._onStatusChange();
        await this.clearFilterData();
        await this._apiCallRes();
    }


    clearFilterData = async () => {

        this.state.allFilterData.fromDate = "",
            this.state.allFilterData.toDate = "",
            this.state.allFilterData.status = "",

            this.setState({ allFilterData: this.state.allFilterData })
    }


    //refresh list
    onRefresh = async () => {
        // this.clearSearchData();
        this.setState({
            taskList: [],
        })
        await this._onStatusChange();
        await this._apiCallRes();

    }

    onMainRefresh = async () => {
        this.setState({
            taskList: [],
        })
        await this._onStatusChange();
        await this._apiCallRes();

    }

    clearSearchData = () => {
        this.setState({ searchText: "" })
    }



    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._load();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
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

    _onViewEventDetails = (item) => {
        console.log("itemmmm====", JSON.stringify(item))
        // if (item.isBudget == 0 && item.eventStatus == "0") {
        if (item.eventStatus == "0") {
            this.props.navigation.navigate("MmsCreateAndEditBudget", { data: item, type: "reloadNeeded", onReloadPreviousPage: this.onRefresh });
        } else {
            this.props.navigation.navigate("MmsEventDetails", { data: item, type: "reloadNeeded", onReloadPreviousPage: this.onRefresh });
        }

    }

    // rendering the data
    renderMeetingList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: "5%" }}>
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
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.mainBox} activeOpacity={0.9} onPress={() => this._onViewEventDetails(item)}>
                    <View style={styles.listDataHeaderSection}>
                        <View style={styles.listDataLeftSection}>
                            <View style={{ paddingBottom: 5 }}>
                                <Text style={styles.headTitle}>{item.meetingTitle}</Text>
                            </View>
                            <Text style={styles.slNo}>{item.indentNumber}</Text>
                            {/* <Text style={styles.slNo}>I-S-67676-7867-5657</Text> */}
                        </View>
                        <View style={styles.listDataRightSection}>
                            <View style={[styles.statusLogo, { backgroundColor: item.eventStatus == 0 ? "#EEDE4C" : item.eventStatus == 1 ? "#3DACFF" : item.eventStatus == 2 ? "#045b5e" : item.eventStatus == 3 ? "#C77BB2" : item.eventStatus == 5 ? "#13BFA6" : item.eventStatus == 6 ? "#717d09" : "#F76770" }]}>
                                <Text style={[styles.statusLogoTxt]}>{item.eventStatus == 0 ? "D" : item.eventStatus == 1 ? "P" : item.eventStatus == 2 ? "A" : item.eventStatus == 3 ? "C" : item.eventStatus == 5 ? "A" : item.eventStatus == 6 ? "H" : "R"}</Text>
                            </View>
                            <Text style={styles.statusNameTxt}>{item.eventStatus == 0 ? "Draft" : item.eventStatus == 1 ? "Pending" : item.eventStatus == 2 ? "Accepted" : item.eventStatus == 3 ? "Completed" : item.eventStatus == 5 ? "Approved" : item.eventStatus == 6 ? "Hold" : "Rejected"}</Text>

                        </View>
                    </View>
                    <View style={styles.listDataFooterSection}>
                        <View style={styles.listDataLeftSection}>
                            <Text style={styles.headTitle}></Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={ImageName.BLUE_CALENDER_LOGO} style={styles.calenderLogo}></Image>
                                <Text style={styles.dateTxt}>{item.meetingDate}</Text>
                            </View>

                        </View>
                        <View style={styles.listDataRightSection}>
                            <Text style={styles.proposedBudgetLabelTxt}>{item.eventStatus == 0 ? "Budget" : "Proposed Budget"}</Text>
                            <Text style={styles.budgetValue}>{item.eventStatus == 2 ? item.approvedBudget : item.estimatedBudget}</Text>

                        </View>
                    </View>

                </TouchableOpacity>
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
            this._onNetworkError()
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
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("viewdetails", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>View</Text>
                        </TouchableOpacity>
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

    deleteItemApi = async (idArr) => {

        let reqData = {
            "pageName": "task",
            "id": idArr,
            "status": "2"
        }
        this.setState({ deleteLoader: true })
        let responseData = await MiddlewareCheck("globalDelete", reqData, this.props);

        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                this._onDeleteModal();

                Toaster.ShortCenterToaster(responseData.data.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }

        this.setState({ deleteLoader: false })


    }

    _onDeleteModal = (item) => {
        if (this.state.isVisibleDeleteModal == false && this.state.showHideCheckBox == false) {
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
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={this.state.showHideCheckBox || this.state.taskList.length < 1}
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
            this.setState({ taskList: this.state.taskList })
            this.deleteContactItem(arrId)
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
                }
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

    // for task filter,,,,,,
    _onFilter = async () => {
        this.setState({
            filterCheck: !this.state.filterCheck
        })
    }
    _onCancelFilterModal = () => {
        this._onFilter()
    }

    _onFilterApicall = async (data) => {
        this.setState({
            filterData: data
        })
        await this._onStatusChange();
        this._onFilter();
        this._apiCallRes(data);
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
                "assignTo": this.state.selectedAssignedObj.id ? this.state.selectedAssignedObj.id : ""
            }
            let responseData = await MiddlewareCheck("updateTaskAssignToByclientId", dataReq, this.props);
            if (responseData === false) {
                this._onNetworkError()
            } else {
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

            <View style={styles.headerActionArea}>
                {this.state.showHideCheckBox ? <React.Fragment>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={styles.crossImgView}>
                        <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                    </TouchableOpacity>

                </React.Fragment> :
                    <React.Fragment>
                        <View style={styles.crossImgView}>

                        </View>
                        {/* <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this._onBack} style={styles.crossImgView}>
                                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                            </TouchableOpacity> */}
                    </React.Fragment>}

                {/* <View style={styles.headerTextView}>
                    <Text style={CustomStyle.headerDataText}>Meetings</Text>
                </View> */}


                <View style={styles.filter_action_btn}>
                    <TouchableOpacity
                        style={styles.filterBtn}
                        activeOpacity={0.8}
                        onPress={() => this.onFilterOpenAndClose()}
                    // disabled={this.state.showHideCheckBox || this.state.taskList.length < 1}
                    >
                        <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                    </TouchableOpacity>
                    {/* <View style={{ marginRight: 10 }}>
                            {this._TooltipDownloadAction()}
                        </View>
                        <View>
                            {this._TooltipAction()}
                        </View> */}
                </View>
            </View>

        )
    }


    headerDataSection = () => {
        return (
            <ImageBackground style={styles.headerDataBox} source={ImageName.UPCOMING_MEETING_BACKGROUND} imageStyle={{ resizeMode: "cover" }} >
                <View style={styles.headerDataViewFlex}>
                    <View style={styles.dataSection}>
                        <View style={styles.mainData}>
                            <Text style={styles.dataUpcmingLabelTxt}>Upcoming</Text>
                            <Text style={styles.upcmingDataValueTxt}>{this.state.meetingDetails.upcoming}</Text>
                        </View>

                    </View>
                    <View style={styles.dataSection}>
                        <View style={styles.mainStatusData}>
                            <Text style={styles.dataLabelTxt}>Draft</Text>
                            <Text style={[styles.dataValueTxt, { color: Color.COLOR.YELLOW.FRESH_BANANA }]}>{this.state.meetingDetails.drafted}</Text>
                        </View>
                        <View style={styles.mainStatusData}>
                            <Text style={styles.dataLabelTxt}>Pending</Text>
                            <Text style={[styles.dataValueTxt, { color: Color.COLOR.SKY.DAVY_SKY }]}>{this.state.meetingDetails.pending}</Text>
                        </View>
                        <View style={styles.mainStatusData}>
                            <Text style={styles.dataLabelTxt}>Approved</Text>
                            <Text style={[styles.dataValueTxt, { color: Color.COLOR.BLUE.TIFFANY_BLUE }]}>{this.state.meetingDetails.approved}</Text>
                        </View>
                        <View style={styles.mainStatusData}>

                        </View>
                        <View style={styles.mainStatusRejectData}>
                            <View style={{ flex: 1 }} />
                            <View>
                                <Text style={styles.dataLabelTxt}>Rejected</Text>
                                <Text style={[styles.dataValueTxt, { color: Color.COLOR.PINK.BEGONIA }]}>{this.state.meetingDetails.rejected}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    searchSection = () => {

        const _onSearchText = (value) => {
            this.setState({ searchText: value })
        }

        const onSearch = () => {
            this.onMainRefresh();
        }

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: "6%" }}>

                <View style={styles.searchTextSec}>
                    <View style={{
                        flex: 1, justifyContent: "flex-end", borderBottomWidth: 1,
                        borderBottomColor: '#D9D9D9'
                    }}>
                        <TextInput
                            placeholder={"Search by Name"}
                            height={45}
                            color={"#000"}
                            onChangeText={(value) => _onSearchText(value)}
                            value={this.state.searchText}
                            placeholderTextColor={"#777696"}

                        />
                    </View>
                    <TouchableOpacity style={styles.searchImgSec} activeOpacity={0.9} onPress={() => onSearch()}>
                        <Image source={ImageName.SEARCH_LOGO} style={styles.searchImg} />
                    </TouchableOpacity>
                    <View style={styles.filter_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        >
                            <Image source={ImageName.BLUE_FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
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
                        type={"mmsMeetingList"}
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
                <Header {...this.props} />

                {this.state.listDataLoader ?
                    <View style={{ height: Dimension.height / 1.1, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View> :
                    <React.Fragment>
                        {/* {this.listHeaderSection()} */}
                        {this.headerDataSection()}
                        {this.searchSection()}
                        {this.state.taskList.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.taskList}
                                    renderItem={(item, key) => this.renderMeetingList(item, key)}
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
                                <View style={{ flex: 1, marginTop: "5%" }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        )}


                        {/* .............footer section ............. */}
                        {this.state.showHideButton ? <React.Fragment>
                            <View style={styles.productBtn}>
                                <TouchableOpacity
                                    style={styles.buttonView}
                                    activeOpacity={0.9}
                                    onPress={() => this.onSelectAction(this.state.selectedButton)}
                                >
                                    <Text style={styles.buttonText}>{this.state.selectedButton == "assign" ? "Assign" : this.state.selectedButton == "delete" ? "Delete" : "Change Status"}</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment> : null}
                    </React.Fragment>}

                {/* ................modal,,,,,,,,,, */}
                {modalSection()}

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

export default connect(mapStateToProps, mapDispatchToProps)(EventList);