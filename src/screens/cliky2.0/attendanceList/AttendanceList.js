import React from "react";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
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
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, enquiryModifyData, modifyAttendanceDetails } from "./Function";

import Tooltip from "react-native-walkthrough-tooltip";
import { CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../shared";
import { CustomStyle } from "../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DateConvert, FileDownload, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../services/constant";
import { inputEmptyValidator } from "../../../validators/dataValidator";
import { getITCtimeFormat, viewDateFormat } from "../../../services/common-view-function/dateConvert";
import { App_uri } from "../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../header/Header";


class AttendanceList extends React.Component {
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
            headerLoader: true,
            listLoader: true,
            actionTooltip: false,
            showHideCheckBox: false,
            showHideButton: false,
            selectAllCheckbox: false,
            filterCheck: false,
            selectedButton: "",
            selectItem: {},
            selectedContactItem: {},
            attendanceList: [],
            loadMore: false,
            filterData: {},
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            listDataLoader: true,
            isVisibleEditModal: false,
            filterVisibility: false,
            downloadCheck: false,
            locationArr: [],
            // nofilter
            fromDate: "",
            toDate: "",
            stateId: "",
            distId: "",

            subordinateId: "",
            reportType: "",
            searchText: "",
            searchActive: false,

            initialApiCall: false,
            settingsData: {},
            isApiCall: true,
            attendanceDetails: {}
        };
    }

    componentDidMount = async () => {

        let settingsData = await StorageDataModification.userModuleSettingsData({}, "get");
        this.setState({ settingsData: settingsData })

        await this.storeInitialData();

        this.attendanceDetailsApi();
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    storeInitialData = async () => {
        let attendanceStoredList = await StorageDataModification.attendanceListData({}, "get");
        if (attendanceStoredList == null || attendanceStoredList == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                attendanceList: attendanceStoredList.enquiryList,
                totalDataCount: attendanceStoredList.totalCount,
                pageLoader: false
            })
        }
    }

    _load = async () => {
        this._apiCallRes();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    attendanceDetailsApi = async () => {
        // this.state.headerLoader = true;
        // this.setState(this.state);
        let responseData = await MiddlewareCheck("getAttendenceDetails", this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                let attendanceDetails = modifyAttendanceDetails(responseData.data);
                this.state.attendanceDetails = attendanceDetails;
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.headerLoader = false;
        this.setState(this.state);
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "userName": "",
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "stateId": this.state.stateId,
            "cityId": this.state.distId,
            "searchName": this.state.searchText,
            "designationId": "",
            "status": "",
            "reportType": this.state.reportType ? this.state.reportType : "1",
            "subordinateId": this.state.subordinateId ? this.state.subordinateId : "",
            "hierarchyDataId": this.state.locationArr
        }
        this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("attendanceList", dataReq, this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                if (this.state.pageNum == 0) {
                    let attendanceStoredList = await StorageDataModification.attendanceListData({}, "get");
                    let attendanceListData = enquiryModifyData(responseData.data);
                    if (attendanceListData.enquiryList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState(this.state)
                    if (attendanceStoredList == null || attendanceStoredList == undefined) {
                        this.setState({
                            attendanceList: attendanceListData.enquiryList,
                            totalDataCount: attendanceListData.totalCount
                        });
                        await StorageDataModification.attendanceListData(attendanceListData, "store");

                    } else if (JSON.stringify(attendanceStoredList.enquiryList) === JSON.stringify(attendanceListData.enquiryList)) {
                        this.setState({
                            attendanceList: attendanceListData.enquiryList,
                            totalDataCount: attendanceListData.totalCount
                        });
                        if (attendanceStoredList.totalCount !== attendanceListData.totalCount) {
                            await StorageDataModification.attendanceListData(attendanceListData, "store");
                        }
                    } else {
                        this.setState({
                            attendanceList: attendanceListData.enquiryList,
                            totalDataCount: attendanceListData.totalCount
                        });
                        await StorageDataModification.attendanceListData(attendanceListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let attendanceListData = enquiryModifyData(responseData.data);
                    if (attendanceListData.enquiryList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState({
                        attendanceList: [...this.state.attendanceList, ...attendanceListData.enquiryList],
                        totalDataCount: attendanceListData.totalCount,
                        isApiCall: this.state.isApiCall
                    })
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.attendanceListData({}, "get");
                    this.setState({
                        pageNum: 0,
                        limit: 5,
                        totalDataCount: 0,
                        isApiCall: true,
                        attendanceList: [],
                        initialApiCall: true,
                    });
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
            attendanceList: convertListData(this.state.attendanceList, item)
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

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._apiCallRes();
        await this.attendanceDetailsApi();
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
                        this._load();
                    } else {
                        this.setState({ listLoader: false })
                        return null;
                    }
                }
            );
        }
    };

    onClickListCheckbox = (item) => {
        let allItems = this.state.attendanceList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.attendanceList = allItems;
        this.setState({ attendanceList: this.state.attendanceList })
        this.showHideBottomButton();
    }

    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.attendanceList.length; i++) {
            if (this.state.attendanceList[i].tick == false) {
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
    renderContactList = ({ item, key }) => {
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

        let allItems = this.state.attendanceList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            }

        }
        this.state.attendanceList = allItems;
        this.setState({ attendanceList: this.state.attendanceList })
    }

    dataList = (item) => {
        return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
    };
    ListData = (item, key) => {
        return (
            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={styles.blueBox}
                        activeOpacity={0.9}
                        onPress={() => this.onShowHideData(item)}>
                        <View style={styles.blueViewFlex}>
                            <View style={styles.homeCircel}>
                                <Image source={{ uri: App_uri.IMAGE_URI + item.profileImgUrl }} style={styles.homeLogo} />
                            </View>
                            <View style={{ marginLeft: "5%", flex: 1 }} >
                                <Text style={styles.saiEnterprisesText}>{item.name}</Text>
                                <Text style={styles.dateText}>{DateConvert.getITCDateFormat(item.created_at)}</Text>
                            </View>
                            <View style={{ marginLeft: '2%' }}>
                                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {item.showHide ?
                        <React.Fragment>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={styles.headerTxt}>IN</Text>
                                        <View style={{ borderWidth: 0.3, borderColor: '#000', marginTop: 8, marginHorizontal: '8%' }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={styles.headerTxt}>OUT</Text>
                                        <View style={{ borderWidth: 0.3, borderColor: '#000', marginTop: 8, marginHorizontal: '8%' }} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: '5%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ flex: 0.3 }}>
                                                <Image source={ImageName.CALENDER_LOGO} style={styles.logoImg} />
                                            </View>
                                            <View style={{ flex: 0.7, }}>
                                                <Text style={styles.dateTimeTxt}>{item.inTimeDate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ flex: 0.3 }}>
                                                <Image source={ImageName.CLOCK_LOGO} style={styles.logoImg} />
                                            </View>
                                            <View style={{ flex: 0.7, }}>
                                                <Text style={styles.dateTimeTxt}>{item.inTime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: '5%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ flex: 0.3 }}>
                                                <Image source={ImageName.CALENDER_LOGO} style={styles.logoImg} />
                                            </View>
                                            <View style={{ flex: 0.7 }}>
                                                <Text style={styles.dateTimeTxt}>{item.outTimeDate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ flex: 0.3 }}>
                                                <Image source={ImageName.CLOCK_LOGO} style={styles.logoImg} />
                                            </View>
                                            <View style={{ flex: 0.7, }}>
                                                <Text style={styles.dateTimeTxt}>{item.outTime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: 10 }} />
                            </View>
                        </React.Fragment> :
                        null
                    }
                </View>
            </View>

        )
    };

    // ......open list item tooltip ..........

    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                attendanceList: convertListData(this.state.attendanceList, item),
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
                            <Text style={styles.tooltipText}>View Details</Text>
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
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("status", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity>
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
            attendanceList: convertListData(this.state.attendanceList, item)
        })
    };

    _deleteItem = () => {
        let allItems = this.state.attendanceList,
            totalCount = this.state.totalDataCount;

        for (let i = 0; i < allItems.length; i++) {
            if (this.state.selectedContactItem.id == this.state.attendanceList[i].id) {
                allItems.splice(i, 1);
            }
        }
        this.state.attendanceList = allItems;
        this.state.totalDataCount = totalCount - 1;
        this.setState({
            attendanceList: this.state.attendanceList,
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
            attendanceList: convertListData(this.state.attendanceList, item)
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
    }



    // for view details of item
    _onViewDetails = (item) => {
        this.setState({
            attendanceList: convertListData(this.state.attendanceList, item),
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
                    // disabled={true}
                    disabled={this.state.showHideCheckBox || this.state.attendanceList.length < 1}
                >
                    <Image
                        source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
                    />
                </TouchableOpacity>
            </Tooltip>
        )
    }

    // filter,, setion

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    // change the state for refresh
    _onFilterStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            isApiCall: true,
            attendanceList: [],
            listLoader: true,
            listDataLoader: true,
        })
    }

    _onDeleteAction = (type) => {
        this.setState({
            // showHideCheckBox: true, 
            actionTooltip: false,
            // selectedButton: type 
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

        let allItems = this.state.attendanceList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.attendanceList = allItems;
        this.setState({ attendanceList: this.state.attendanceList })
        this.showHideBottomButton();
    }

    onSelectAction = (selectedButton) => {
        let allItems = this.state.attendanceList;
        let allMainItem = [];

        if (selectedButton == "delete") {
            let arrId = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == false) {
                    allMainItem.push(allItems[i])
                } else {
                    arrId.push(allItems[i].id)
                }
            }

            this.state.attendanceList = allMainItem;
            this.setState({ attendanceList: this.state.attendanceList })
            this.deleteContactItem(arrId)
        } else if (selectedButton == "assign") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].id)
                }
            }
        } else if (selectedButton == "status") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].id)
                }
            }
        }
    }
    onClickSelectAllItem = (type) => {

        let allItems = this.state.attendanceList;
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
        this.state.attendanceList = allItems;
        this.setState({ attendanceList: this.state.attendanceList })
        this.showHideBottomButton();
    }
    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            isApiCall: true,
            attendanceList: [],
            refreshing: true,
            pageLoader: true,
            listLoader: true,
            listDataLoader: true,
        })
    }

    _onSearchText = (value) => {
        this.setState({
            searchText: value
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
            onClickDownloadActionTooltip();
            let dataReq = {
                "userName": "",
                "searchFrom": this.state.fromDate,
                "searchTo": this.state.toDate,
                "stateId": this.state.stateId,
                "cityId": this.state.distId,
                "searchName": this.state.searchText,
                "designationId": "",
                "status": "",
                "reportType": this.state.reportType ? this.state.reportType : "1",
                "subordinateId": this.state.subordinateId ? this.state.subordinateId : "",
                "hierarchyDataId": [],
            }
            // if (type == "excel") {
            this.setState({ pageLoader: true })
            let responseData = await MiddlewareCheck("downloadForAttendance", dataReq, this.props);
            await FileDownload.downloadDocument(App_uri.BASE_URI + responseData.data.path);
            // onClickDownloadActionTooltip()
            this.setState({ pageLoader: false })
            // }
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
            // <Tooltip
            //   animated={true}
            //   arrowSize={{ width: 16, height: 8 }}
            //   placement="bottom"
            //   backgroundColor="rgba(0,0,0,0.5)"
            //   isVisible={this.state.downloadCheck}
            //   content={
            //     <ScrollView>
            //       {/* <TouchableOpacity
            //                   style={styles.tooltipListView}
            //                   onPress={() => onActionTooltipClick("pdf")}
            //                   activeOpacity={0.7}
            //               >
            //                   <Text style={styles.tooltipText}>PDF</Text>
            //               </TouchableOpacity>
            //               <TouchableOpacity
            //                   style={styles.tooltipListView}
            //                   onPress={() => onActionTooltipClick("csv")}
            //                   activeOpacity={0.7}
            //               >
            //                   <Text style={styles.tooltipText}>CSV</Text>
            //               </TouchableOpacity> */}
            //       <TouchableOpacity
            //         style={styles.tooltipListView}
            //         onPress={() => onActionTooltipClick("excel")}
            //         activeOpacity={0.7}
            //       >
            //         <Text style={styles.tooltipText}>Excel</Text>
            //       </TouchableOpacity>
            //     </ScrollView>
            //   }
            //   onClose={() => onClickDownloadActionTooltip()}
            // >
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => onClickDownloadActionTooltip()}
                onPress={() => OnDownload()}
            // disabled={this.state.downloadCheck}
            >
                <LottyViewLoad type={"download"} autoPlay={true} loop={true} height={20} width={20} />
            </TouchableOpacity>
            // </Tooltip>
        )
    }

    attendanceDetailsSec = () => {
        return (
            <View style={styles.attendanceDetailsView}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.5, paddingLeft: 5 }}>
                        <Text style={styles.attendanceDetailsText}>Total Attendance : {this.state.attendanceDetails.attendenceCount}</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.attendanceDetailsText}>Total Leave : {this.state.attendanceDetails.leaveCount}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.5, paddingLeft: 5 }}>
                        <Text style={styles.attendanceDetailsText}>Late Count : {this.state.attendanceDetails.lateCount}</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.attendanceDetailsText}>Total Absent : {this.state.attendanceDetails.absent}</Text>
                    </View>
                </View>
            </View>
        )
    }

    listHeaderSection = () => {
        return (
            <View>
                {/* {this.state.attendanceList.length > 0 ? */}
                < View style={styles.headerActionArea}>
                    <View style={{ flex: 1 }} />
                    <View style={styles.filter_action_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                            {this._TooltipDownloadAction()}
                        </View>
                    </View>
                </View>
                {/* //     :
                //     null
                // } */}

                <View style={{ marginVertical: 10, paddingHorizontal: 20, }}>
                    <TextInputBox
                        placeholder={"Search"}
                        value={this.state.searchText}
                        onChangeText={(value) => this._onSearchText(value)}
                        isRightIcon={this.state.initialApiCall ? !this.state.pageLoader : false}
                        keyboardType="default"
                        rightIcon={ImageName.SEARCH_LOGO}
                        onPressRightIcon={() => this.onRefresh()}
                        isActive={this.state.searchActive}
                        onFocus={() => { this.setState({ searchActive: true }) }}
                        onBlur={() => { this.setState({ searchActive: false }) }}
                        returnKeyType="done"
                        height={46}
                    />
                </View>
            </View >
        )
    }

    onAddContact = () => {
        this.props.navigation.navigate("CreateAndEditEnquiry")
    }
    // for filter

    // for filter with api call
    _onFilterWithApi = async (data) => {
        this.state.subordinateId = data.selectedSubordinateObj.id ? data.selectedSubordinateObj.id : "";
        this.state.reportType = data.selectedRecordType.id ? data.selectedRecordType.id : "1";

        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
            locationArr: data.locationArr.length == 0 ? [] : data.locationArr
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
        this.setState({
            fromDate: "",
            toDate: "",
            stateId: "",
            distId: "",
            reportType: "1",
            subordinateId: ""
        })
    }

    shimmerView = () => {
        return (
            <SkeletonPlaceholder borderRadius={8}>
                {this.shimmerViewItemSection()}
            </SkeletonPlaceholder>
        )
    }

    shimmerViewItemSection = () => {
        let resData = [];
        for (let i = 0; i < 6; i++) {
            resData.push(
                <View style={{ marginHorizontal: "2%" }} key={i}>
                    <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
                        <View style={{ height: 175 }} />
                    </View>
                </View>
            )
        }
        return resData;
    }


    render() {
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
                    <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"attendance"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}
                        props={this.props}
                    />


                </View>
            )
        }

        return (
            <SafeAreaView style={CustomStyle.container}>
                <Header onRefresh={() => console.log("")} {...this.props} />

                {this.listHeaderSection()}
                {this.state.headerLoader ?
                    <View style={{ marginHorizontal: 30 }}>
                        <SkeletonPlaceholder borderRadius={8}>
                            <View style={{ width: "100%", height: 30 }} />
                        </SkeletonPlaceholder>
                    </View>

                    :
                    <View>
                        {this.attendanceDetailsSec()}
                    </View>
                }
                {this.state.pageLoader ?
                    // <Loader />
                    this.shimmerView()
                    :
                    <React.Fragment>
                        {this.state.attendanceList.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.attendanceList}
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
                                {this.state.initialApiCall ?
                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <NoDataFound />
                                    </View>
                                    :
                                    null
                                }
                            </React.Fragment>
                        )}
                        {/* .............footer section ............. */}
                        {this.state.showHideButton ?
                            <React.Fragment>
                                <View style={styles.productBtn}>
                                    <TouchableOpacity
                                        style={styles.buttonView}
                                        activeOpacity={0.9}
                                        onPress={() => this.onSelectAction(this.state.selectedButton)}
                                    >
                                        <Text style={styles.buttonText}>{this.state.selectedButton == "assign" ? "Assign" : this.state.selectedButton == "delete" ? "Delete" : "Change Status"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                            :
                            null
                        }

                    </React.Fragment>
                }
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
    bindActionCreators(
        {
            stateCheckForNetwork,
            stateUserInformation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceList);
