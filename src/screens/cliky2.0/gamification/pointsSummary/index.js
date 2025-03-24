import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import {
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
import { convertListData, enquiryModifyData, listModifyData, modifyCustomerTypeArr, pjpModifyData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { BigTextButton, CalenderModal, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, ListViewModal, Loader, Modal, NoDataFound, TextInputBox } from "../../../../shared";

import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import styles from "./style";
import { App_uri } from "../../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import DatePicker from "react-native-date-picker";
import { SafeAreaView } from "react-native";

class GamificationPointsSummaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolTip: false,
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
            allList: [],
            loadMore: false,
            filterData: {},
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            isVisibleEditModal: false,
            calenderVisibility: false,
            filterVisibility: false,
            allCustomerType: [],
            selectedCustomerType: {},
            currentDate: {},

            onDateSelected: "",

            fromDate: "",
            toDate: "",
            selectedContactTypeId: "",
            type: "",
            assignedId: "",
            // .................
            initialApiCall: false,
            recordType: "",

            selectedDateObj: {
                rawDate: new Date(),
                date: ""
            },
            rescheduleDatePicker: false,
            rescheduleReason: "",
            rescheduleReasonActive: false,
            rescheduleModal: false,
        };
    }

    componentDidMount = async () => {
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await this.storeInitialData();
        await this._apiCallRes();
    };

    storeInitialData = async () => {
        let topGainData = await StorageDataModification.gamificationPointsSummaryList({}, "get");
        if (topGainData == null || topGainData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                allList: topGainData.list,
                totalDataCount: topGainData.totalCount,
                pageLoader: false
            })
        }
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("getListOfUserPointsLog", dataReq, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let topGainData = await StorageDataModification.gamificationPointsSummaryList({}, "get");
                    let topGainListData = listModifyData(responseData);
                    if (topGainData == null || topGainData == undefined) {
                        this.setState({
                            allList: topGainListData.list,
                            totalDataCount: topGainListData.totalCount
                        });
                        await StorageDataModification.gamificationPointsSummaryList(topGainListData, "store");
                    } else if (JSON.stringify(topGainData.list) === JSON.stringify(topGainListData.list)) {
                        this.setState({
                            allList: topGainListData.list,
                            totalDataCount: topGainListData.totalCount
                        });
                        if (topGainData.totalCount !== topGainListData.totalCount) {
                            await StorageDataModification.gamificationPointsSummaryList(topGainListData, "store");
                        }
                    } else {
                        this.setState({
                            allList: topGainListData.list,
                            totalDataCount: topGainListData.totalCount
                        });
                        await StorageDataModification.gamificationPointsSummaryList(topGainListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let topGainListData = listModifyData(responseData);
                    this.setState({
                        allList: [...this.state.allList, ...topGainListData.list],
                        totalDataCount: topGainListData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.gamificationPointsSummaryList({}, "get");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        allList: [],
                        initialApiCall: true
                    });
                }
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }
    _onFetchCustomerType = async () => {
        let responseData = await MiddlewareCheck("getContactTypes", {}, this.props);
        if (responseData == false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allCustomerType: modifyCustomerTypeArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onSelectCustomerType = (value) => {
        let data = this.state.allCustomerType;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedCustomerType: value,
            allCustomerType: data,
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
            allList: convertListData(this.state.allList, item)
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
                    if (this.state.allList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this._apiCallRes();
                    }
                }
            );
        }
    };

    onClickListCheckbox = (item) => {
        let allItems = this.state.allList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.allList = allItems;
        this.setState({ allList: this.state.allList })
        this.showHideBottomButton();
    }

    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.allList.length; i++) {
            if (this.state.allList[i].tick == false) {
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


    changeConversionStatus = async (value) => {
        let arr = this.state.allList;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == value) {
                arr[i].isConvertion = 1;
            }
        }
        this.state.allList = arr;
        this.setState({
            allList: this.state.allList
        });
        //...............
        let pjpData = await StorageDataModification.gamificationPointsSummaryList({}, "get");
        let listData = pjpData.list;
        if (pjpData == null || pjpData == undefined) {

        } else {
            for (let i = 0; i < listData.length; i++) {
                if (listData[i].id == value) {
                    listData[i].isConvertion = 1;
                }
            }
        }
        pjpData.list = listData;
        await StorageDataModification.gamificationPointsSummaryList(pjpData, "store");
    }

    onRefreshfromDetails = async () => {
        this.onRefresh();
    }

    _onClickVisits = (item) => {
        if (item.isInfulencer == 1) {
            this.props.navigation.navigate("InfluencerDetails", { data: item, changeIsConverted: this.changeConversionStatus, onRefreshList: this.onRefreshfromDetails })
        } else if (item.isInfulencer == 2 || item.isInfulencer == 3 || item.isInfulencer == 6) {
            this.props.navigation.navigate("SfaTargetDetails", { data: item, changeIsConverted: this.changeConversionStatus, onRefreshList: this.onRefreshfromDetails })
        } else {
            this.props.navigation.navigate("SfaCustomerListDetails", { data: item, changeIsConverted: this.changeConversionStatus, onRefreshList: this.onRefreshfromDetails })
        }
    }

    onShowHideData = (item) => {
        let allItems = this.state.allList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.allList = allItems;
        this.setState({ allList: this.state.allList })
    }

    // rendering the data
    renderList = ({ item, key }) => {
        return (
            <View style={{ flex: 1, marginHorizontal: 5 }} key={key}>
                {this.ListData(item, key)}
            </View>
        );
    };


    ListData = (item, key) => {
        return (
            <View>
                <View style={styles.flexRow}>

                    <View style={styles.listMainView}>
                        <Text style={styles.listheaderText}>{item.userName}</Text>
                        <Text style={styles.listDateText}>{item.pointsEarnedDateTime}</Text>
                    </View>
                    <View style={styles.listView}>
                        <Image source={ImageName.YELLOW_COIN_ICON} style={styles.yellowCoinIcon} />
                        <View style={{ width: 2 }} />
                        <Text style={styles.textCoinNumber}>200</Text>
                    </View>
                </View >
                <View style={styles.underline} />
            </View>
        )
    };

    // ......open list item tooltip ..........
    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                allList: convertListData(this.state.allList, item),
            });
        };

        const _onReschedule = (item) => {
            OnClickTooltip(item);
            this._onChangeRescheduleModal(true);
        }

        const onContactTooltipClick = async (type, item) => {
            this.setState({
                selectItem: item,
            });
            switch (type) {
                case "reschedule":
                    _onReschedule(item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="left"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={item.check}
                content={
                    // <ScrollView>
                    <TouchableOpacity
                        style={styles.tooltipListView}
                        onPress={() => onContactTooltipClick("reschedule", item)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.tooltipText}>Reschedule</Text>
                    </TouchableOpacity>
                    // </ScrollView>
                }
                onClose={() => OnClickTooltip(item)}
            >
                <TouchableOpacity
                    style={{ alignItems: "center", justifyContent: 'center' }}
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
            allList: convertListData(this.state.allList, item)
        })
    };

    _deleteItem = () => {
        let allItems = this.state.allList,
            totalCount = this.state.totalDataCount;

        for (let i = 0; i < allItems.length; i++) {
            if (this.state.selectedContactItem.id == this.state.allList[i].id) {
                allItems.splice(i, 1);
            }
        }
        this.state.allList = allItems;
        this.state.totalDataCount = totalCount - 1;
        this.setState({
            allList: this.state.allList,
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
            allList: convertListData(this.state.allList, item)
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
        // this.props.navigation.navigate("TaskDetails")
        this.setState({
            allList: convertListData(this.state.allList, item),
        });
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
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("status")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={true}
                // disabled={this.state.showHideCheckBox || this.state.allList.length < 1}
                >
                    <Image
                        source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
                    />
                </TouchableOpacity>
            </Tooltip>
        )
    }

    // _onAssign = (type) => {
    //   this.setState({ showHideCheckBox: true, actionTooltip: false, selectedButton: type })
    // }
    _onDeleteAction = (type) => {

        this.setState({ showHideCheckBox: true, actionTooltip: false, selectedButton: type })
    }
    _onStatus = (type) => {
        this.setState({ showHideCheckBox: true, actionTooltip: false, selectedButton: type })
    }


    oncloseActions = () => {
        this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })
        let allItems = this.state.allList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.allList = allItems;
        this.setState({ allList: this.state.allList })
        this.showHideBottomButton();
    }

    onSelectAction = (selectedButton) => {
        let allItems = this.state.allList;
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

            this.state.allList = allMainItem;
            this.setState({ allList: this.state.allList })
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

    // for calender section 
    onCalanderOpenAndClose = () => {
        this.setState({
            calenderVisibility: !this.state.calenderVisibility
        })
    }

    OnCalenderDaySelect = async (data) => {
        this.state.onDateSelected = DateConvert.formatYYYYMMDD(data.selectedDate)
        this.setState({
            onDateSelected: this.state.onDateSelected
        })
        this.onCalanderOpenAndClose();
        await this.onRefresh()

    }

    _onCalenderReset = async () => {
        this.onCalanderOpenAndClose();
        await this._onDateClearData();
        await this.onRefresh()
    }

    _onDateClearData = () => {
        this.setState({
            onDateSelected: ""
        })
    }

    onClickSelectAllItem = (type) => {
        let allItems = this.state.allList;
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
        this.state.allList = allItems;
        this.setState({ allList: this.state.allList })
        this.showHideBottomButton();
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            allList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    {this.state.showHideCheckBox ?
                        <React.Fragment>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={styles.crossImgView}>
                                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                            </TouchableOpacity>
                        </React.Fragment> :
                        null
                    }
                    <View style={styles.filter_action_btn}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.calenderBtn} onPress={() => this.onCalanderOpenAndClose()}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderImg} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        // disabled={true}
                        // disabled={this.state.showHideCheckBox || this.state.allList.length < 1}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                        <View>
                            {/* {this._TooltipAction()} */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    // change the state for refresh
    _onFilterStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            allList: [],
            listLoader: true,
            initialApiCall: false
        })
    }

    // for filter with api call
    _onFilterWithApi = async (data) => {
        this.state.selectedContactTypeId = data.selectedContactTypeObj.id ? data.selectedContactTypeObj.id.toString() : "";
        this.state.type = data.selectedType.id ? data.selectedType.id : "";
        this.state.assignedId = data.selectedSubordinateObj.id ? data.selectedSubordinateObj.id : "";
        this.state.recordType = data.selectedRecordType.id ? data.selectedRecordType.id : "1";
        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
            selectedContactTypeId: this.state.selectedContactTypeId,
            type: this.state.type,
            recordType: this.state.recordType,
            assignedId: this.state.assignedId
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
        this.setState({
            fromDate: "",
            toDate: "",
            selectedContactTypeId: "",
            type: "",
            recordType: "1",
            assignedId: ""
        })
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

    _onChangeRescheduleModal = (value) => {
        if (value) {
            this.state.rescheduleModal = value;
            this.setState({
                rescheduleModal: this.state.rescheduleModal
            })
        } else {
            this.state.rescheduleModal = value;
            this.state.selectedDateObj = {
                rawDate: new Date(),
                date: ""
            };
            this.state.rescheduleReason = "";
            this.state.selectItem = {};
            this.setState({
                rescheduleModal: this.state.rescheduleModal,
                selectedDateObj: this.state.selectedDateObj,
                rescheduleReason: this.state.rescheduleReason,
                selectItem: this.state.selectItem
            })
        }
    }
    headerSection = () => {
        return (
            <View style={styles.headerMainView}>
                <TouchableOpacity onPress={() => this._onBack()} >
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {/* <View style={styles.headerCoinsSec}>
                <View style={styles.headerCoinUnderSec}>
                    <Image source={ImageName.YELLOW_COIN_ICON} style={styles.yellowCoinsLogo} />
                    <View style={{ width: 2 }} />
                    <Text style={styles.textcoinsNum}>200</Text>
                </View>
            </View> */}
                <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDot} />
                </View>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSection()}
                <View style={styles.mainView}>
                    {/* <View style={styles.blackUnderline} /> */}
                    <View style={{ flexDirection: "row", marginHorizontal: 5, marginBottom: 10 }}>
                        <View>
                            <Text style={styles.textTopGain}>Points Summary</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity>
                            <Image source={ImageName.BLACK_FUNNEL_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={styles.tabSec}>
                            <View>
                                <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinImg} />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.coinTxt}>200</Text>
                                <Text style={styles.coinBottomTxt}>January</Text>
                            </View>
                        </View>
                        <View style={styles.tabSec}>
                            <View>
                                <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinImg} />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.coinTxt}>200</Text>
                                <Text style={styles.coinBottomTxt}>January</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <FlatList
                        data={this.state.allList}
                        renderItem={(item, key) => this.renderList(item, key)}
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
                </View>
            </SafeAreaView >
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
            stateUserInformation,
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(GamificationPointsSummaryList);
