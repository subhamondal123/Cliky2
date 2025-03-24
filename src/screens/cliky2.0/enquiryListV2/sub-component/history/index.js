import React from "react";
import { Color, Dimension, ImageName } from "../../../../../enums";
import styles from "./style";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Linking,
} from "react-native";
import { convertListData, enquiryModifyData, modifySubordinateArr } from "./function";

import Tooltip from "react-native-walkthrough-tooltip";
import { AssignedModal, BigTextButton, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../services/middleware";
import { DateConvert, FileDownload, GetUserData, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../../services/constant";
import { inputEmptyValidator } from "../../../../../validators/dataValidator";
import { App_uri } from "../../../../../services/config";
import { textTruncate } from "../../../../../services/common-view-function/commonFunctions";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import DatePicker from "react-native-date-picker";


class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            selectedButton: "",
            selectItem: {},
            selectedContactItem: {},
            enquiriesList: [],
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            isVisibleEditModal: false,
            filterVisibility: false,
            isVisibleFavouriteModal: false,
            messageTxt: "",
            statusLoader: false,
            updateAssigneeModal: false,
            selectedAssignedObj: {},
            selectedDesignationObj: {},
            leadOwner: "",
            visitStatus: "",
            fromDate: "",
            toDate: "",

            status: "",
            // _________________
            initialApiCall: false,
            moduleSettingData: {},
            feedbackModalVisible: false,
            selectedObjItem: {},
            reAssignModal: false,
            subordinateArr: [],
            selectedSubordinateObj: {},
            datePicker: false,
            dateObj: {
                rawDate: new Date(),
                selectedDate: ""
            },
            reassignRemark: "",
            reassignRemarkActive: false,
            isCallOtherData: false,

            leadDescription: [],
            userLocationArr: [],
            isApiCall: true
        };
    }

    componentDidMount = async () => {
        let moduleSettingData = await StorageDataModification.userModuleSettingsData({}, "get");
        this.state.moduleSettingData = moduleSettingData;
        this.setState({
            moduleSettingData: this.state.moduleSettingData
        })
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        // await this.storeInitialData();
        await this._apiCallRes();
        await GetUserData.getAllUserData();
        this.setState({ isCallOtherData: true })
        await this.getSubordinateData()
    };

    storeInitialData = async () => {
        let enquiryData = await StorageDataModification.sfaEnquiryListData({}, "get");
        if (enquiryData == null || enquiryData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                enquiriesList: enquiryData.enquiryList,
                totalDataCount: enquiryData.totalCount,
                pageLoader: false
            })
        }
    }

    getSubordinateData = async () => {
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.subordinateArr = modifySubordinateArr(responseData.data);
                this.setState({
                    subordinateArr: this.state.subordinateArr
                })
            }
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
            contactName: "",
            orgName: "",
            title: "",
            phone: "",
            email: "",
            visitStatus: this.state.visitStatus ? this.state.visitStatus : "",
            leadStatus: "",
            owner: this.state.leadOwner ? this.state.leadOwner : "",
            usedFor: "enqHistory",
            searchFrom: this.state.fromDate ? this.state.fromDate : "",
            searchTo: this.state.toDate ? this.state.toDate : "",
            isDownload: "0"

        }
        this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("leadList", dataReq, this.props);
        let enquiryListData = enquiryModifyData(responseData);
        if (enquiryListData.enquiryList.length == 0) {
            this.state.isApiCall = false;
        }
        this.setState({
            enquiriesList: [...this.state.enquiriesList, ...enquiryListData.enquiryList],
            totalDataCount: enquiryListData.totalCount,
            isApiCall: this.state.isApiCall
        })

        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    onAddVisit = (item) => {
        this.props.navigation.navigate("SfaUnplannedVisitForm", { data: item, type: "enquiry", visitorTypeName: item.enquerySourceName, visitorTypeId: item.enquerySourceTypeId, onRefreshEnquiryList: this.onRefresh })
    }


    deleteContactItem = async (idArr) => {
        let reqData = {
            "contactId": idArr
        }
        // let responseData = await MiddlewareCheck("deleteContact", reqData);
        // if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //   Toaster.ShortCenterToaster(responseData.message)
        this.setState({ showHideCheckBox: false, showHideButton: false })
        // } else {
        //   Toaster.ShortCenterToaster(responseData.message)
        // }
    }

    // ..........for status

    _onChangeStatus = (item) => {
        this._onStatusModal(item);
        this.setState({
            enquiriesList: convertListData(this.state.enquiriesList, item)
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

    _onChangeFavourite = (item) => {
        this._onFavouriteModal(item)
        this.setState({
            enquiriesList: convertListData(this.state.enquiriesList, item)
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

        if (item && item.isFavorite == "0") {
            this.state.messageTxt = "Are you sure want to Mark as Favourite?";
            this.setState({ messageTxt: this.state.messageTxt })
        } else {
            this.state.messageTxt = "Are you sure want to Remove from Favourite?";
            this.setState({ messageTxt: this.state.messageTxt })
        }
    }

    _markFavouriteItem = async () => {
        let fav = ""
        if (this.state.selectedContactItem.isFavorite == "0") {
            fav = "1"
        } else {
            fav = "0"
        }
        let idArr = [];
        idArr.push(this.state.selectedContactItem.leadId.toString())
        let dataReq = {
            "enqueryIdArr": idArr,
            "isFavorite": fav
        }

        this.setState({ statusLoader: true })
        let responseData = await MiddlewareCheck("changeMarkFavouriteStatus", dataReq, this.props);
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

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // fetch more
    fetchMore = async () => {
        // if (this.state.initialApiCall) {
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
        // }
    };

    onClickListCheckbox = (item) => {
        let allItems = this.state.enquiriesList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].leadId == item.leadId) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.enquiriesList = allItems;
        this.setState({ enquiriesList: this.state.enquiriesList })
        this.showHideBottomButton();
    }

    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.enquiriesList.length; i++) {
            if (this.state.enquiriesList[i].tick == false) {
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

    onFeedbacks = (item) => {
        this.setState({ feedbackModalVisible: true, selectedObjItem: item })
    }

    onFeedbacksClose = (item) => {
        this.setState({ selectedObjItem: {} })
        if (this.state.feedbackModalVisible == false) {
            this.setState({ feedbackModalVisible: true })
        } else {
            this.setState({ feedbackModalVisible: false })
        }
    }

    // rendering the data
    renderContactList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{ flex: 1 }}>
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

    getHistoryLogOfLead = async (item) => {
        let dataReq = { leadId: item.leadId }
        this.setState({ historyLoader: true })
        let responseData = await MiddlewareCheck("getHistoryLogOfLead", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ leadDescription: responseData.response })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ historyLoader: false })
    }

    onShowHideData = (item) => {
        let allItems = this.state.enquiriesList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].leadId == item.leadId) {
                allItems[i].showHide = !(allItems[i].showHide)
                this.getHistoryLogOfLead(item)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.enquiriesList = allItems;
        this.setState({ enquiriesList: this.state.enquiriesList })
    }

    dataList = (item) => {
        return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
    };

    linkPhone = (data) => {
        Linking.openURL('tel:' + data);
    }
    ListData = (item, key) => {
        return (
            <View style={{ marginHorizontal: '2%', marginTop: 15 }}>
                <View style={styles.mainBox}>
                    <View style={[styles.blueBox]}>
                        <View style={styles.blueViewFlex}>
                            <View style={styles.homeCircel}>
                                <Image source={{ uri: App_uri.IMAGE_URI + item.profilePic }} style={styles.homeLogo} />
                            </View>
                            <TouchableOpacity style={{ marginLeft: "5%", flex: 1 }} activeOpacity={0.9} onPress={() => this.onShowHideData(item)}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[styles.saiEnterprisesText, { flex: 1 }]} numberOfLines={1}>{textTruncate(item.enqueryTitle)}</Text>
                                    {item.isFavorite == "1" ? <React.Fragment>
                                        <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                                    </React.Fragment> : null}
                                </View>
                                <Text numberOfLines={1} style={styles.textDealer}>Visited By : {item.LeadOwner}</Text>
                            </TouchableOpacity>
                            {item.showHide ?
                                null
                                // <>
                                //     {item.VisitStatus == "Visited" ?
                                //         <View style={styles.addVisitsButton}
                                //             activeOpacity={0.9}
                                //         >
                                //             <Text style={styles.addVisitBtnTxt}>{item.VisitStatus}</Text>
                                //         </View>
                                //         :
                                //         <TouchableOpacity style={styles.addVisitsButton}
                                //             activeOpacity={0.9}
                                //             onPress={() => this.onAddVisit(item)} >
                                //             <Text style={styles.addVisitBtnTxt}>Add Activity</Text>
                                //         </TouchableOpacity>
                                //     }
                                // </>
                                :
                                <View style={styles.addVisitsButton}
                                    activeOpacity={0.9}
                                >
                                    <Text style={styles.addVisitBtnTxt}>{item.VisitStatus}</Text>
                                </View>
                            }
                            <View>
                                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
                            </View>
                            {/* {this.state.showHideCheckBox ?
                                <React.Fragment>
                                    <View style={styles.checkBoxView}>
                                        {this.checkBoxList(item)}
                                    </View>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <View style={{ marginLeft: 5 }}>
                                        {this._onPressToolTip(item, key)}
                                    </View>
                                </React.Fragment>
                                } */}

                        </View>
                    </View>
                    {item.showHide ? <React.Fragment>
                        <View>
                            {this.state.historyLoader ?
                                <View style={{ justifyContent: "center", height: 80 }}>
                                    <ActivityIndicator />
                                </View>
                                :
                                <View style={styles.textFlexView}>
                                    {this.state.leadDescription.length > 0 ?
                                        <>
                                            {this.state.leadDescription.map((item, key) => (
                                                <View style={styles.mainView} key={key}>
                                                    <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                        <View style={[styles.dotCircle, { backgroundColor: "red" }]} />
                                                        <Text style={styles.descriptionTxt}>{item.description}</Text>
                                                    </View>
                                                    <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.dateTxt}>{DateConvert.fullDateFormat(item.createdAt)}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </>
                                        :
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={styles.textVisites}>{"No Data Found"}</Text>
                                        </View>
                                    }
                                </View>
                            }
                        </View>
                    </React.Fragment> : null}

                </View>
            </View>
        )
    };

    // ......open list item tooltip ..........
    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                enquiriesList: convertListData(this.state.enquiriesList, item),
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
                case "favourite":
                    this._onChangeFavourite(item);
                    break;
                case "updateAssignee":
                    this._onUpdateAssigneeModal(item);
                    break;
                case "reAssign":
                    this._onReAssignModal(item);
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
                        {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("edit", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Edit</Text>
            </TouchableOpacity> */}
                        {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("delete", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("status", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Status</Text>
            </TouchableOpacity> */}
                        {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("updateAssignee", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Update Assignee</Text>
            </TouchableOpacity> */}
                        {item.isFavorite == "0" ? <React.Fragment>
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onContactTooltipClick("favourite", item)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.tooltipText}>Mark as Favourte</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("reAssign", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Re-Assign</Text>
                        </TouchableOpacity>

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
            enquiriesList: convertListData(this.state.enquiriesList, item)
        })
    };

    _deleteItem = () => {
        let allItems = this.state.enquiriesList,
            totalCount = this.state.totalDataCount;

        for (let i = 0; i < allItems.length; i++) {
            if (this.state.selectedContactItem.leadId == this.state.enquiriesList[i].leadId) {
                allItems.splice(i, 1);
            }
        }
        this.state.enquiriesList = allItems;
        this.state.totalDataCount = totalCount - 1;
        this.setState({
            enquiriesList: this.state.enquiriesList,
            totalDataCount: this.state.totalDataCount,
        });

        // let idArr = [];
        // idArr.push(this.state.selectedContactItem.id);
        // this.deleteContactItem(idArr);
        this._onDeleteModal();
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
            enquiriesList: convertListData(this.state.enquiriesList, item)
        })

    }
    _onEditModal = (item) => {
        if (this.state.isVisibleEditModal == false && this.state.showHideCheckBox == false) {
            this.setState({
                isVisibleEditModal: true,
                selectedContactItem: item
            });
        } else {
            this.setState({
                isVisibleEditModal: false,
            })
        }
    }

    _editItem = () => {
        this._onEditModal();
        this.props.navigation.navigate("SfaCreateEnquiry", { data: this.state.selectedContactItem, type: "edit" })
    }

    // for view details of item
    _onViewDetails = (item) => {
        // this.props.navigation.navigate("TaskDetails")
        this.setState({
            enquiriesList: convertListData(this.state.enquiriesList, item),
        });
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
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.actionTooltip}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            activeOpacity={0.7}
                            onPress={() => onActionTooltipClick("delete")}>
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
              style={styles.tooltipListView}
              activeOpacity={0.7}
              onPress={() => onActionTooltipClick("status")}>
              <Text style={styles.tooltipText}>Status</Text>
            </TouchableOpacity> */}
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={this.state.showHideCheckBox || this.state.enquiriesList.length < 1}>
                    <Image source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn} />
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
            //  selectedButton: type
        })
    }

    oncloseActions = () => {
        this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })
        let allItems = this.state.enquiriesList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.enquiriesList = allItems;
        this.setState({ enquiriesList: this.state.enquiriesList })
        this.showHideBottomButton();
    }

    onSelectAction = (selectedButton) => {
        let allItems = this.state.enquiriesList;
        let allMainItem = [];

        if (selectedButton == "delete") {
            let arrId = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == false) {
                    allMainItem.push(allItems[i])
                } else {
                    arrId.push(allItems[i].leadId)
                }
            }

            this.state.enquiriesList = allMainItem;
            this.setState({ enquiriesList: this.state.enquiriesList })
            this.deleteContactItem(arrId)
        } else if (selectedButton == "assign") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].leadId)
                }
            }
        } else if (selectedButton == "status") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].leadId)
                }
            }
        }
    }
    onClickSelectAllItem = (type) => {
        let allItems = this.state.enquiriesList;
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
        this.state.enquiriesList = allItems;
        this.setState({ enquiriesList: this.state.enquiriesList })
        this.showHideBottomButton();
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            isApiCall: true,
            enquiriesList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    onFilterOpenAndClose = async () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    _onFilterWithApi = async (data) => {
        this.state.visitStatus = data.visitStatus.id ? data.visitStatus.id.toString() : "";
        this.state.leadOwner = data.leadOwner ? data.leadOwner.toString() : "";


        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
            leadOwner: this.state.leadOwner,
            visitStatus: this.state.visitStatus,

        })
        this.onFilterOpenAndClose();
        await this.onRefresh();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        await this.filterClearData();
        await this.onRefresh()
    }

    filterClearData = async () => {
        this.setState({
            leadOwner: "",
            visitStatus: "",
            fromDate: "",
            toDate: ""
        })
    }

    onClickDownload = async () => {
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": "0",
            contactName: "",
            orgName: "",
            title: "",
            phone: "",
            email: "",
            visitStatus: this.state.visitStatus ? this.state.visitStatus : "",
            leadStatus: "",
            owner: this.state.leadOwner ? this.state.leadOwner : "",
            usedFor: "enqHistory",
            searchFrom: this.state.fromDate ? this.state.fromDate : "",
            searchTo: this.state.toDate ? this.state.toDate : "",
            isDownload: "1"

        }
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("leadList", dataReq, this.props);
        await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + "temp/" + responseData.response.path);
        Toaster.ShortCenterToaster(responseData.message)
        // onClickDownloadActionTooltip()
        this.setState({ listDataLoader: false })
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    {/* {this.state.showHideCheckBox ? <React.Fragment>
                         <TouchableOpacity style={styles.crossImgView}
                          activeOpacity={0.8}
                          onPress={() => this.oncloseActions()}>
                        <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                    </TouchableOpacity>
                        </React.Fragment> :
                            <React.Fragment>
                                <TouchableOpacity style={styles.crossImgView}
                                     activeOpacity={0.7}
                                     onPress={this._onBack}>
                                     <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                                </TouchableOpacity>
                            </React.Fragment>}
                         <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={CustomStyle.headerText}>Enquiries</Text>
                         </View> */}
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.onClickDownload()}

                    >
                        <LottyViewLoad type={"download"} autoPlay={true} loop={true} height={20} width={20} />
                    </TouchableOpacity>
                    <View style={styles.filter_action_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}>
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                        {/* <View>
              {this._TooltipAction()}
            </View> */}
                    </View>
                </View>
            </View>
        )
    }

    onAddContact = () => {
        this.props.navigation.navigate("CreateAndEditEnquiry")
    }


    _onReAssignModalOpen = (item) => {
        this.state.enquiriesList = convertListData(this.state.enquiriesList, item);
        this.setState({
            reAssignModal: !this.state.reAssignModal
        })
    }

    _onReAssignModal = (item) => {
        if (this.state.reAssignModal) {
            this.state.reAssignModal = false;
            this.setState({
                reAssignModal: this.state.reAssignModal
            })
        } else {
            this.state.reAssignModal = true;
            this.state.enquiriesList = convertListData(this.state.enquiriesList, item);
            this.setState({
                reAssignModal: this.state.reAssignModal,
                enquiriesList: this.state.enquiriesList
            })
        }
    }

    _onUpdateAssigneeModal = (item) => {
        if (this.state.updateAssigneeModal) {
            this.state.updateAssigneeModal = false;
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal
            })
        } else {
            this.state.updateAssigneeModal = true;
            this.state.enquiriesList = convertListData(this.state.enquiriesList, item);
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal,
                enquiriesList: this.state.enquiriesList
            })
        }
    }

    _onUpdate = async (value) => {
        this.state.selectedAssignedObj = value.selectedAssignedTypeObj;
        this.state.selectedDesignationObj = value.selectedDesignationObj;
        this.setState({
            selectedAssignedObj: this.state.selectedAssignedObj,
            selectedDesignationObj: this.state.selectedDesignationObj
        });
        if (this.state.selectedAssignedObj.id == undefined || this.state.selectedAssignedObj.id == null) {
            Toaster.ShortCenterToaster("Please Select Assigned Employee !");
        }
        else {
            let dataReq = {
                "enquiryId": this.state.selectItem.leadId,
                "assigneeId": this.state.selectedAssignedObj.id ? this.state.selectedAssignedObj.id : "",
            }

            let responseData = await MiddlewareCheck("updateAssigneeForSfaEnquiry", dataReq, this.props);
            if (responseData === false) {
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

    ViewSkeletonPlaceholder = () => {
        let resData = [];

        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: "5%" }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    _onSubordinateChange = (data) => {
        this.state.selectedSubordinateObj = data;
        this.setState({
            selectedSubordinateObj: this.state.selectedSubordinateObj
        })
    }

    modalSection = () => {
        const ViewStatus = () => {
            const _onSelectStatus = (value) => {
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
                    // let reqData = {
                    //   taskId: selectedContact.taskId.toString(),
                    //   status: this.state.selectedStatusDataObj.id.toString()
                    // }
                }
            }

            return (
                <View style={{ marginTop: '10%' }}>
                    <View style={{ marginHorizontal: "10%" }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : "0"}
                            data={CommonData.COMMON.STATUS}
                            onSelect={(value) => _onSelectStatus(value)}
                            headerText={"Select Status"}
                            selectedText={this.state.selectedStatusDataObj.name ? this.state.selectedStatusDataObj.name : "Select Status"}
                            selectedTextColor={this.state.selectedStatusDataObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
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
                    // padding={modalPadding}
                    onRequestClose={() => this._onStatusModal()}
                    onBackdropPress={() => this._onStatusModal()}
                    onBackButtonPress={() => this._onStatusModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Change Status</Text>
                                    {/* <TouchableOpacity style={styles.cancelSec}
                    activeOpacity={0.8}
                    onPress={() => this._onStatusModal()}  >
                    <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                  </TouchableOpacity> */}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewStatus()}
                        </View>
                    }
                />
                {/* feedback modal */}
                <Modal
                    isVisible={this.state.feedbackModalVisible}
                    // padding={modalPadding}
                    onRequestClose={() => this.onFeedbacksClose()}
                    onBackdropPress={() => this.onFeedbacksClose()}
                    onBackButtonPress={() => this.onFeedbacksClose()}
                    children={
                        <View style={styles.modalview_feedback}>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Feedbacks</Text>
                                    {/* <TouchableOpacity style={styles.cancelSec}
                    activeOpacity={0.8}
                    onPress={() => this._onStatusModal()}  >
                    <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                  </TouchableOpacity> */}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {this.ViewFeedback()}
                            </ScrollView>
                        </View>
                    }
                />
                {/* reAssign modal */}
                <Modal
                    isVisible={this.state.reAssignModal}
                    // padding={modalPadding}
                    onRequestClose={() => this._onReAssignModal()}
                    onBackdropPress={() => this._onReAssignModal()}
                    onBackButtonPress={() => this._onReAssignModal()}
                    children={
                        <View style={styles.modalview_feedback}>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Re-Assign</Text>

                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {this.ViewReAssign()}
                            </ScrollView>
                        </View>
                    }
                />
                {/* delete modal  */}
                <EditAndDeleteModal
                    type={'delete'}
                    isVisible={this.state.isVisibleDeleteModal}
                    onCancel={() => this._onDeleteModal()}
                    onDelete={() => this._deleteItem()}
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
                {/* filter modal */}
                <FilterModal
                    isVisible={this.state.filterVisibility}
                    onCloseModal={() => this.onFilterOpenAndClose()}
                    type={"sfaEnquiriesActivitiesList"}
                    onApply={(data) => this._onFilterWithApi(data)}
                    resetData={() => this._onReset()}
                    props={this.props}
                />

                <AssignedModal
                    isVisible={this.state.updateAssigneeModal}
                    onCloseModal={() => this._onUpdateAssigneeModal()}
                    type={"sfaEnquiryList"}
                    onUpdateButton={(value) => this._onUpdate(value)}
                    props={this.props}
                    data={this.state.selectItem}
                />

            </View>
        )
    }

    ViewFeedback = () => {
        let mainObj = this.state.selectedObjItem.leadFeedback;
        return (
            <View style={{ marginHorizontal: 5 }}>
                {mainObj == undefined || mainObj == null ?
                    null
                    :
                    <React.Fragment>
                        {mainObj.map((item, key) => (
                            <View key={key} style={styles.feedbackForm}>
                                <View style={{ flex: 0.40 }}>
                                    <Text style={styles.feedbackLabel}>Feedback</Text>
                                    <Text style={styles.feedbackLabel}>Follow Up Date</Text>
                                </View>
                                <View style={{ flex: 0.04 }}>
                                    <Text style={styles.feedbackLabel}>:</Text>
                                    <Text style={styles.feedbackLabel}>:</Text>
                                </View>
                                <View style={{ flex: 0.56 }}>

                                    <Text style={styles.feedbackLabelData}>{item.feedback}</Text>
                                    <Text style={styles.feedbackLabelData}>{item.createdAt == undefined || item.createdAt == null ? "N/A" : DateConvert.formatYYYYMMDD(item.createdAt)}</Text>
                                </View>
                            </View>
                        ))}
                    </React.Fragment>

                }
                {/* {mainObj.map((item,obj) => (
          <Text>{item.feedback}</Text>
        ))} */}
            </View>
        )
    }

    _onOpenAndCloseDatePicker = (value) => {
        if (value) {
            this.state.datePicker = value;
            this.setState({
                datePicker: this.state.datePicker
            });
        } else {
            this.state.datePicker = value;
            this.setState({
                datePicker: this.state.datePicker
            });
        }
    }

    _onSelectDate = (date) => {
        if (date) {
            this.state.dateObj.rawDate = date;
            this.state.dateObj.selectedDate = DateConvert.formatYYYYMMDD(date);
            this.setState({
                dateObj: this.state.dateObj
            });
        }
        this._onOpenAndCloseDatePicker(false);
    }

    _onChangeRemark = (value) => {
        this.setState({ reassignRemark: value })
    }

    clearReassignModalData = () => {
        this.setState({
            selectedSubordinateObj: {},
            dateObj: {
                rawDate: new Date(),
                selectedDate: ""
            },
        })
    }


    ViewReAssign = () => {
        const onSubmitReAssign = async () => {
            if (this.state.selectedSubordinateObj.id == undefined || this.state.selectedSubordinateObj.id == null) {
                Toaster.ShortCenterToaster("Please select Sub-Ordinate !")
            } else if (this.state.dateObj.selectedDate.length == 0) {
                Toaster.ShortCenterToaster("Please select Due Date !")
            } else {
                this.setState({ reAssignLoader: true })
                let reqData = {
                    assignTo: this.state.selectedSubordinateObj.id,
                    assignDueDate: this.state.dateObj.selectedDate,
                    assignRemarks: this.state.reassignRemark,
                    leadId: this.state.selectItem.leadRefId

                }

                let responseData = await MiddlewareCheck("updateLeadAssignV2", reqData, this.props);
                if (responseData === false) {
                    this._onNetworkError();
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this._onReAssignModal()
                        this.onRefresh()
                        this.clearReassignModalData()
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState({ reAssignLoader: false })
            }
        }
        return (
            <View style={{ marginHorizontal: 10 }}>

                <DropdownInputBox
                    isSearchable={true}
                    selectedValue={this.state.selectedSubordinateObj.id ? this.state.selectedSubordinateObj.id.toString() : "0"}
                    data={this.state.subordinateArr}
                    onSelect={(value) => this._onSubordinateChange(value)}
                    headerText={"SubOrdinate"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
                <View style={{ marginVertical: 12 }}>
                    <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => this._onOpenAndCloseDatePicker(true)} disabled={this.state.isPhoneExists ? true : false}>
                        <Text style={[styles.inputBoxText, { color: this.state.dateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{this.state.dateObj.selectedDate.length == 0 ? "Due Date*" : this.state.dateObj.selectedDate}</Text>
                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.datePicker}
                        date={this.state.dateObj.rawDate}
                        mode={"date"}
                        minimumDate={new Date()}
                        onConfirm={(date) => {
                            this._onSelectDate(date);
                        }}
                        onCancel={() => {
                            this._onOpenAndCloseDatePicker(false)
                        }}
                    />
                </View>
                <View>
                    <TextInputBox
                        value={this.state.reassignRemark}
                        onChangeText={(value) => this._onChangeRemark(value)}
                        placeholder={"Remarks"}
                        keyboardType={"default"}
                        multiline={true}
                        isActive={this.state.reassignRemarkActive}
                        onFocus={() => { this.setState({ reassignRemarkActive: true }) }}
                        onBlur={() => { this.setState({ reassignRemarkActive: false }) }}
                        height={90}
                        returnKeyType="done"
                        alignItems={"flex-start"}
                    />
                </View>
                {
                    this.state.reAssignLoader ?
                        <View style={{ justifyContent: "center", marginVertical: 15 }}>
                            <ActivityIndicator size={"small"} color={Color.COLOR.RED.AMARANTH} />
                        </View>
                        :
                        <View style={{ marginVertical: 15, marginHorizontal: 20 }}>
                            <BigTextButton
                                text={"Submit"}
                                onPress={() => onSubmitReAssign()}
                            />
                        </View>
                }


            </View>
        )
    }


    render() {
        return (
            <View style={{ height: Dimension.height }}>
                <React.Fragment>
                    {this.listHeaderSection()}
                    {this.state.pageLoader ?
                        <View>
                            <SkeletonPlaceholder>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {this.ViewSkeletonPlaceholder()}
                                </ScrollView>
                            </SkeletonPlaceholder>
                        </View>
                        :
                        <React.Fragment>
                            {this.state.showHideCheckBox && this.state.enquiriesList.length > 0 ? <React.Fragment>
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
                            </React.Fragment> : null}
                            {this.state.enquiriesList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.enquiriesList}
                                        renderItem={(item, key) => this.renderContactList(item, key)}
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
                                    {/* {this.state.initialApiCall ? */}
                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <NoDataFound />
                                    </View>
                                    {/* :
                                        null
                                    } */}

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
                            <FloatingButton
                                moduleType={'sfa'}
                                navigation={this.props.navigation.navigate}
                            />
                        </React.Fragment>
                    }
                </React.Fragment>
                {/* ................modal,,,,,,,,,, */}
                {this.state.isCallOtherData ?
                    <React.Fragment>
                        {this.modalSection()}
                    </React.Fragment> :
                    null
                }

            </View>
        );
    }
}



export default HistoryList;
