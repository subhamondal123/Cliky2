import React from "react";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
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
import { convertListData, historyModifyData, modHeaderData } from "./Function";
import Tooltip from "react-native-walkthrough-tooltip";
import { CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound } from "../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DateConvert, FileDownload, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../services/constant";
import { inputEmptyValidator } from "../../../validators/dataValidator";
import styles from "./Style";
import { CustomStyle } from "../../style";
import { App_uri } from "../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import Header from "../header/Header";

const ProgressImage = createImageProgress(FastImage);

class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageViewVisible: false,
            imageUploadModal: false,
            showHideData: false,
            toolTip: false,
            isVisible: false,
            refreshing: false,
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
            odometerHistoryList: [],
            headerData: {},
            loadMore: false,
            filterData: {},
            pageNum: 0,
            limit: 10,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            listDataLoader: false,
            isVisibleEditModal: false,
            imageShowLoader: true,


            imageUploadModal: false,
            selectedItem: {},
            type: "",

            fromDate: "",
            toDate: "",

            initialApiCall: false,
            downloadCheck: false,
            subordinateId: "",
            reportType: "",
            isApiCall: true
        };
    }

    componentDidMount = async () => {
        await this.storeInitialData();
        await this.getHeaderData()
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    getHeaderData = async () => {
        let responseData = await MiddlewareCheck("getOdometerHeaderDetails", {}, this.props);
        if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
            let modifyHeaderData = modHeaderData(responseData)
            this.setState({ headerData: modifyHeaderData })
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }

    _load = async () => {
        this._apiCallRes();
        // this.setState({
        //     imageShowLoader: false
        // })
    };

    storeInitialData = async () => {
        let odometerData = await StorageDataModification.odometerListData({}, "get");
        if (odometerData == null || odometerData == undefined) {
            this.setState({ listDataLoader: true })
        } else {
            this.setState({
                odometerHistoryList: odometerData.historyList,
                pageLoader: false
            })
        }
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "state": "",
            "city": "",
            "zone": "",
            "userName": "",
            "email": "",
            "phone": "",
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "readingDate": "",
            "reportType": this.state.reportType ? this.state.reportType : "1",
            "subordinateId": this.state.subordinateId ? this.state.subordinateId : "",
            "hierarchyDataId": []
        }
        this.fetchListData(dataReq)
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("OdometerList", dataReq, this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                if (this.state.pageNum == 0) {

                    let odometerData = await StorageDataModification.odometerListData({}, "get");
                    let historyListData = historyModifyData(responseData.data);
                    if (historyListData.historyList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState(this.state);
                    if (odometerData == null || odometerData == undefined) {
                        this.setState({
                            odometerHistoryList: historyListData.historyList,

                        });
                        await StorageDataModification.odometerListData(historyListData, "store");
                    } else if (JSON.stringify(odometerData.historyList) === JSON.stringify(historyListData.historyList)) {
                        this.setState({
                            odometerHistoryList: historyListData.historyList,

                        });
                        if (odometerData.totalCount !== historyListData.totalCount) {
                            await StorageDataModification.odometerListData(historyListData, "store");
                        }
                    } else {
                        this.setState({
                            odometerHistoryList: historyListData.historyList,

                        });
                        await StorageDataModification.odometerListData(historyListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let historyListData = historyModifyData(responseData.data);
                    if (historyListData.historyList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState({
                        odometerHistoryList: [...this.state.odometerHistoryList, ...historyListData.historyList],
                        isApiCall: this.state.isApiCall
                    })
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.odometerListData({}, "clear");
                    this.setState({
                        odometerHistoryList: [],
                        isApiCall: true,
                        limit: 10,
                        pageNum: 0,
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
            listDataLoader: false,
            imageShowLoader: false
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
            odometerHistoryList: convertListData(this.state.odometerHistoryList, item)
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
        // this.setState({
        //     odometerHistoryList: [],
        // })
        await this._onStatusChange();
        await this.getHeaderData()
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
                        this._load();
                    } else {
                        this.setState({ listLoader: false })
                        return null;
                    }
                }
            );
        }
    };

    shimmerView = () => {
        return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10,marginHorizontal:15 }}>
                    <View style={{ flex: 0.9 }}>
                        <View style={{ height: 45, borderRadius: 10 }} />
                    </View>
                    <View style={{ flex: 0.1, marginLeft: '5%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 25, width: 25 }} />
                    </View>
                </View>
                {this.shimmerViewItemSection()}
            </SkeletonPlaceholder>
        )
    }

    shimmerViewItemSection = () => {
        let resData = [];
        for (let i = 0; i < 6; i++) {
            resData.push(
                <View style={{ marginBottom: '2%', marginTop: '2%', }} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    onClickListCheckbox = (item) => {
        let allItems = this.state.odometerHistoryList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].odometerId == item.odometerId) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.odometerHistoryList = allItems;
        this.setState({ odometerHistoryList: this.state.odometerHistoryList })
        this.showHideBottomButton();
    }

    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.odometerHistoryList.length; i++) {
            if (this.state.odometerHistoryList[i].tick == false) {
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

    _onImageOpenModal = (item, type) => {
        this.setState({
            imageUploadModal: !this.state.imageUploadModal,
            selectedItem: item,
            type: type
        })
    }

    onImageCloseModal = () => {
        this.setState({
            imageUploadModal: !this.state.imageUploadModal,
            selectedItem: {}
        })
    }

    // rendering the data
    renderContactList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: 15 }}>
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
        let allItems = this.state.odometerHistoryList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].odometerId == item.odometerId) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.odometerHistoryList = allItems;
        this.setState({ odometerHistoryList: this.state.odometerHistoryList })
    }

    dataList = (item) => {
        return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
    };

    ListData = (item, key) => {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.mainBox}>
                    <View style={styles.blueBox}>
                        <View style={styles.blueViewFlex}>
                            <View style={styles.homeCircel}>
                                <Image source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + item.profileImgUrl }} style={styles.homeLogo} />
                            </View>
                            <TouchableOpacity style={{ marginLeft: "3%", flex: 1, justifyContent: "center" }}
                                activeOpacity={0.9}
                                onPress={() => this.onShowHideData(item)}>
                                <Text style={styles.saiEnterprisesText}>{item.userName}</Text>
                                <Text style={styles.dateData}>{item.inDate}</Text>
                            </TouchableOpacity>
                            {item.showHide ?
                                <TouchableOpacity style={styles.arrowCircelUp}
                                    activeOpacity={0.9}
                                    onPress={() => this.onShowHideData(item)}>
                                    <Image source={ImageName.UP_ARROW} style={styles.arrowImg} />
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.arrowCircel}
                                    activeOpacity={0.9}
                                    onPress={() => this.onShowHideData(item)}>
                                    <Image source={ImageName.DOWN_ARROW} style={styles.arrowImg} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
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
                                        {item.inTimePic == "" ? null : <React.Fragment>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ flex: 0.3 }}>
                                                    <Image source={ImageName.CALENDER_LOGO} style={styles.logoImg} />
                                                </View>
                                                <View style={{ flex: 0.7, }}>
                                                    <Text style={styles.dateTimeTxt}>{item.inDate}</Text>
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
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ flex: 0.3 }}>
                                                    <Image source={ImageName.ODOMETER_GRAY_READING} style={styles.meterImg} />
                                                </View>
                                                <View style={{ flex: 0.7, }}>
                                                    <Text style={styles.dateTimeTxt}>{item.inMeter}</Text>
                                                </View>
                                            </View>
                                            {this.state.imageShowLoader ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                                    <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                                </View> :
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    onPress={() => this._onImageOpenModal(item, "in")}
                                                    style={{ borderRadius: 25 }}>
                                                    {/* <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + item.inTimePic }} style={styles.inOutImg} /> */}
                                                    <ProgressImage
                                                        source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + item.inTimePic }}
                                                        style={styles.inOutImg}
                                                        indicator={Progress.Circle}
                                                        indicatorProps={{
                                                            size: 20,
                                                            borderWidth: 0,
                                                            color: 'rgba(150, 150, 150, 1)',
                                                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        </React.Fragment>}
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: '5%' }}>
                                        {item.outTimePic == "" ? null : <React.Fragment>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ flex: 0.3 }}>
                                                    <Image source={ImageName.CALENDER_LOGO} style={styles.logoImg} />
                                                </View>
                                                <View style={{ flex: 0.7 }}>
                                                    <Text style={styles.dateTimeTxt}>{item.outDate}</Text>
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
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ flex: 0.3 }}>
                                                    <Image source={ImageName.ODOMETER_GRAY_READING} style={styles.meterImg} />
                                                </View>
                                                <View style={{ flex: 0.7, }}>
                                                    <Text style={styles.dateTimeTxt}>{item.outMeter}</Text>
                                                </View>
                                            </View>
                                            {this.state.imageShowLoader ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                                    <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                                </View> :
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    disabled={!this.state.initialApiCall}
                                                    onPress={() => this._onImageOpenModal(item, "out")}>
                                                    {/* <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + item.outTimePic }} style={styles.inOutImg} /> */}
                                                    <ProgressImage
                                                        source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + item.outTimePic }}
                                                        style={styles.inOutImg}
                                                        indicator={Progress.Circle}
                                                        indicatorProps={{
                                                            size: 20,
                                                            borderWidth: 0,
                                                            color: 'rgba(150, 150, 150, 1)',
                                                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        </React.Fragment>
                                        }
                                    </View>
                                </View>
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
                odometerHistoryList: convertListData(this.state.odometerHistoryList, item),
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
                case "status": pageLoader
                    this._onChangeStatus(item);
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
            odometerHistoryList: convertListData(this.state.odometerHistoryList, item)
        })
    };

    _deleteItem = () => {
        let allItems = this.state.odometerHistoryList,
            totalCount = this.state.totalDataCount;

        for (let i = 0; i < allItems.length; i++) {
            if (this.state.selectedContactItem.id == this.state.odometerHistoryList[i].id) {
                allItems.splice(i, 1);
            }
        }
        this.state.odometerHistoryList = allItems;
        this.state.totalDataCount = totalCount - 1;
        this.setState({
            odometerHistoryList: this.state.odometerHistoryList,
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
            odometerHistoryList: convertListData(this.state.odometerHistoryList, item)
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
            odometerHistoryList: convertListData(this.state.odometerHistoryList, item),
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
                    disabled={this.state.showHideCheckBox || this.state.odometerHistoryList.length < 1}
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

        let allItems = this.state.odometerHistoryList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.odometerHistoryList = allItems;
        this.setState({ odometerHistoryList: this.state.odometerHistoryList })
        this.showHideBottomButton();
    }

    onSelectAction = (selectedButton) => {
        let allItems = this.state.odometerHistoryList;
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

            this.state.odometerHistoryList = allMainItem;
            this.setState({ odometerHistoryList: this.state.odometerHistoryList })
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

        let allItems = this.state.odometerHistoryList;
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
        this.state.odometerHistoryList = allItems;
        this.setState({ odometerHistoryList: this.state.odometerHistoryList })
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
            isApiCall: true,
            odometerHistoryList: [],
            refreshing: true,
            listLoader: true,
            listDataLoader: true,
        })
    }

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    _onFilterWithApi = async (data) => {
        this.state.subordinateId = data.selectedSubordinateObj.id ? data.selectedSubordinateObj.id : "";
        this.state.reportType = data.selectedRecordType.id ? data.selectedRecordType.id : "1";

        this.setState({
            subordinateId: this.state.subordinateId,
            reportType: this.state.reportType,
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),

        })
        this.onFilterOpenAndClose();
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        // this._onStatusChange();
        await this.clearFilterData();
        await this.onRefresh();
    }

    clearFilterData = async () => {

        this.state.reportType = "1"
        this.state.subordinateId = ""
        this.setState({
            reportType: this.state.reportType,
            subordinateId: this.state.subordinateId,
            fromDate: "",
            toDate: "",

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
                "limit": this.state.limit.toString(),
                "offset": (this.state.pageNum * this.state.limit).toString(),
                "state": "",
                "city": "",
                "zone": "",
                "userName": "",
                "email": "",
                "phone": "",
                "searchFrom": this.state.fromDate,
                "searchTo": this.state.toDate,
                "readingDate": "",
                "reportType": this.state.reportType ? this.state.reportType : "1",
                "subordinateId": this.state.subordinateId ? this.state.subordinateId : "",
            }
            // if (type == "excel") {
            this.setState({ listDataLoader: true })
            let responseData = await MiddlewareCheck("downloadForOdometer", dataReq, this.props);
            await FileDownload.downloadDocument(App_uri.BASE_URI + responseData.data.originalPath);
            // onClickDownloadActionTooltip()
            this.setState({ listDataLoader: false })
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
            //     animated={true}
            //     arrowSize={{ width: 16, height: 8 }}
            //     placement="bottom"
            //     backgroundColor="rgba(0,0,0,0.5)"
            //     isVisible={this.state.downloadCheck}
            //     content={
            //         <ScrollView>
            //             {/* <TouchableOpacity
            //                 style={styles.tooltipListView}
            //                 onPress={() => onActionTooltipClick("pdf")}
            //                 activeOpacity={0.7}
            //             >
            //                 <Text style={styles.tooltipText}>PDF</Text>
            //             </TouchableOpacity>
            //             <TouchableOpacity
            //                 style={styles.tooltipListView}
            //                 onPress={() => onActionTooltipClick("csv")}
            //                 activeOpacity={0.7}
            //             >
            //                 <Text style={styles.tooltipText}>CSV</Text>
            //             </TouchableOpacity> */}
            //             <TouchableOpacity
            //                 style={styles.tooltipListView}
            //                 onPress={() => onActionTooltipClick("excel")}
            //                 activeOpacity={0.7}
            //             >
            //                 <Text style={styles.tooltipText}>Excel</Text>
            //             </TouchableOpacity>
            //         </ScrollView>
            //     }
            //     onClose={() => onClickDownloadActionTooltip()}
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

    listDataSection = () => {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.RED.AMARANTH, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", marginRight: 15 }}>
                            <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Total Working Day : "}</Text>
                            <Text style={[styles.headerLabelText]}>{this.state.headerData.totalWorkingDay}</Text>
                        </View>

                        {/* </View>
                    <View style={{ flexDirection: "row" }}> */}
                        <View style={{ flexDirection: "row", marginRight: 15 }}>
                            <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Total Km : "}</Text>
                            <Text style={[styles.headerLabelText]}>{this.state.headerData.totalKms}</Text>

                        </View>
                        {/* </View>
                            <View style={{ flexDirection: "row" }}> */}
                        <View style={{ flexDirection: "row", marginRight: 15 }}>
                            <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Avg. Kms/Day : "}</Text>
                            <Text style={[styles.headerLabelText]}>{this.state.headerData.avgKmsPerDay}</Text>

                        </View>
                    </View>

                </View>
            </View>
        )
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    {/* {this.state.showHideCheckBox ?
                        <React.Fragment>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={styles.crossImgView}>
                                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                            </TouchableOpacity>
                        </React.Fragment>
                        :
                        null
                    } */}
                    {/* <View>
                        <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Total Working Day : "}</Text>
                                <Text style={[styles.headerLabelText]}>{this.state.headerData.totalWorkingDay}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Total Km : "}</Text>
                                <Text style={[styles.headerLabelText]}>{this.state.headerData.totalKms + "  |  "}</Text>
                             
                                <Text style={[styles.headerLabelText, { fontFamily: FontFamily.FONTS.POPPINS.BOLD }]}>{"Avg. Kms / Day : "}</Text>
                                <Text style={[styles.headerLabelText]}>{this.state.headerData.avgKmsPerDay}</Text>
                            </View>

                        </View>
                    </View> */}

                    <View style={styles.filter_action_btn}>
                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.calenderBtn}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderImg} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        // disabled={this.state.showHideCheckBox || this.state.odometerHistoryList.length < 1}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                            {this._TooltipDownloadAction()}
                        </View>
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

                    {/* ............show image modal,,,,,,,,,, */}

                    <Modal
                        isVisible={this.state.imageUploadModal}
                        onRequestClose={this.onImageCloseModal}
                        onBackdropPress={this.onImageCloseModal}
                        onBackButtonPress={this.onImageCloseModal}
                        children={
                            <View style={styles.modalImageView}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.type == "in" ?
                                        <View>
                                            {/* <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + this.state.selectedItem.inTimePic }} style={{ height: 230, width: 230, resizeMode: 'cover', borderRadius: 10 }} /> */}
                                            <ProgressImage
                                                source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + this.state.selectedItem.inTimePic }}
                                                style={{ height: 230, width: 230, resizeMode: 'cover', borderRadius: 10, backgroundColor: "#e6f2ff" }}
                                                indicator={Progress.Circle}
                                                indicatorProps={{
                                                    size: 40,
                                                    borderWidth: 0,
                                                    color: 'rgba(150, 150, 150, 1)',
                                                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                                }}
                                            />
                                        </View> :
                                        <View>
                                            {/* <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + this.state.selectedItem.outTimePic }} style={{ height: 230, width: 230, resizeMode: 'cover', borderRadius: 10 }} /> */}
                                            <ProgressImage
                                                source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + this.state.selectedItem.outTimePic }}
                                                style={{ height: 230, width: 230, resizeMode: 'cover', borderRadius: 10, backgroundColor: "#e6f2ff" }}
                                                indicator={Progress.Circle}
                                                indicatorProps={{
                                                    size: 40,
                                                    borderWidth: 0,
                                                    color: 'rgba(150, 150, 150, 1)',
                                                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                                }}
                                            />
                                        </View>
                                    }
                                </View>
                            </View>
                        }
                    />
                    <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"odometerList"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}
                        props={this.props}
                    />
                </View>
            )
        }

        return (
            <View style={[CustomStyle.container]}>
                <Header onRefresh={() => console.log("")} {...this.props} />
                {this.state.listDataLoader ?
                    this.shimmerView()
                    :
                    <React.Fragment>
                        {this.state.odometerHistoryList.length > 0 ? this.listHeaderSection() : null}
                        {this.state.odometerHistoryList.length > 0 ? this.listDataSection() : null}
                        {this.state.odometerHistoryList.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.odometerHistoryList}
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
                                {/* <View style={{ height: 50 }}></View> */}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.state.initialApiCall ?
                                    <View style={CustomStyle.noDataFoundViewForTabList}>
                                        <NoDataFound />
                                    </View>
                                    :
                                    null
                                }
                            </React.Fragment>
                        )}
                    </React.Fragment>}

                {/* ................modal,,,,,,,,,, */}
                {modalSection()}
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
