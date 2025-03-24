import React from "react";
import { Color, Dimension, ImageName } from '../../../enums';
import styles from './style';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import { TextInputBox, BigTextButton, NoDataFound, Loader, FilterModal } from "../../../shared";
import { CustomStyle } from '../../style';
import { dateModArr, getSelectId, modifyListData, modifySummary } from "./function";
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { DateConvert, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SvgComponent from "../../../assets/svg";
import { Header } from "..";



class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchActive: false,
            allListData: [],
            // selectListItem: this.props.selectItem.customer,
            selectListItem: "",
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            refreshing: false,
            listLoader: false,
            pageLoader: false,
            listDataLoader: false,
            filterVisibility: false,
            fromDate: "",
            toDate: "",
            selectedContactTypeId: "",
            detailsLoader: false,
            //___________________________
            initialApiCall: false,
            recordType: "",
            assignedId: "",
            isCallOtherData: false,
            isApiCall: true,
            customerIdArr: [],
            summaryDataObj: {
                profileData: {},
                stockUpdateData: [],
                brandingData: [],
                conversionData: [],
                notes: [],
                additionalNotes: [],
                competitorData: []
            },

            dateListArr: []
        }
    }

    componentDidMount = async () => {
        await this.storeInitialData();
        await this._load();
        this.setState({ isCallOtherData: true });
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await this._apiCallRes();
    }

    storeInitialData = async () => {
        let visitData = await StorageDataModification.visitedCustomerListData({}, "get");
        if (visitData == null || visitData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                allListData: visitData.listData,
                totalDataCount: visitData.totalCount,
                pageLoader: false
            })
        }
    }

    _apiCallRes = async () => {
        this.setState({ pageLoader: true })
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "userName": this.state.searchText,
            "customerType": "0",
            "isProject": "",
            "searchFrom": this.state.fromDate,
            "contactTypeIdArr": this.state.customerIdArr,
            "searchTo": this.state.toDate,
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "recordType": this.state.recordType ? this.state.recordType.toString() : "1",
            "assignedId": this.state.assignedId ? this.state.assignedId.toString() : ""
        }
        let responseData = await MiddlewareCheck("pjpVisitListingV2", dataReq, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let visitData = await StorageDataModification.visitedCustomerListData({}, "get");
                    let modData = modifyListData(responseData.data.visitList, this.state.selectListItem);
                    let dateListArr = dateModArr(modData);
                    this.setState({
                        allListData: dateListArr
                    })

                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.visitedCustomerListData({}, "clear");
                    this.setState({
                        allListData: [],
                        totalDataCount: 0,
                        isApiCall: true,
                        limit: 10,
                        pageNum: 0,
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        await this._onStateUpdate();
    }

    // set state update
    _onStateUpdate = async () => {
        this.setState({
            refreshing: false,
            listLoader: false,
            pageLoader: false,
            listDataLoader: false,
        })
    }

    _onSearchText = async (value) => {
        this.setState({
            searchText: value
        })
    }

    // for rearch the data
    _onSearch = async () => {
        await this._onSetChangeData();
        await this._apiCallRes();
    }

    // for check and uncheck the item 
    _onCheckItem = (item) => {
        let selectItemData = this.state.selectListItem;
        if (selectItemData.length == 0) {
            selectItemData.push(item);
        } else {
            if (item.itemSelectcheck == false) {
                selectItemData.push(item);
            } else {
                selectItemData.splice(getSelectId(selectItemData, item), 1);
            }
        }
        this.state.allListData[getSelectId(this.state.allListData, item)].itemSelectcheck = !item.itemSelectcheck;
        this.setState({
            allListData: this.state.allListData,
            selectListItem: selectItemData
        })
    }

    // for visible item list
    _onVisibleItemList = (item) => {
        let arrData = this.state.allListData;
        for (let i = 0; i < arrData.length; i++) {
            if (arrData[i].id == item.id) {
                this.state.allListData[i].listOpenCheck = !item.listOpenCheck;
            } else {
                this.state.allListData[i].listOpenCheck = false;
            }
        }
        if (item.listOpenCheck) {
            this.getVisitDetails(item.customerType, item.customerId, item.id)
        }
        this.state.allListData = arrData;
        this.setState({
            allListData: this.state.allListData
        })
    }

    getVisitDetails = async (customerType, customerId, fieldVisitId) => {
        let reqData = {
            "customerType": customerType.toString(),
            "customerId": customerId,
            "fieldVisitId": fieldVisitId,
        }
        this.setState({ detailsLoader: true })

        let responseData = await MiddlewareCheck("pjpVisitedListDetailsV2", reqData, this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                let modifySummaryData = modifySummary(responseData.data)
                this.state.summaryDataObj.profileData = modifySummaryData.profileData;
                this.state.summaryDataObj.stockUpdateData = modifySummaryData.stockUpdateData;
                this.state.summaryDataObj.notes = modifySummaryData.notes;
                this.state.summaryDataObj.conversionData = modifySummaryData.conversionData;
                this.state.summaryDataObj.brandingData = modifySummaryData.brandingData;
                this.state.summaryDataObj.additionalNotes = modifySummaryData.additionalNotes;
                this.state.summaryDataObj.competitorData = modifySummaryData.competitorData;
                this.setState({
                    summaryDataObj: this.state.summaryDataObj
                })
            }

        }
        this.setState({ detailsLoader: false })
    }

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    onOpenEnquiry = (item) => {
        this.props.navigation.navigate("VisitEnquiryDetails", { type: "customer", data: item });
    }

    onConvert = (item) => {
        this.props.selectedItemData(item)
    }

    onAddNote = (item) => {
        this.props.selectedItemForNote(item)
    }

    renderList = (item) => {
        return (
            <View>
                {this.renderListData(item.item, item.index)}
            </View>
        )
    }

    // rendering the data
    renderListData = (item, key) => {
        let objectKey = Object.keys(item)
        return (
            <View style={{}} key={key}>
                <Text style={{}}>{objectKey}</Text>
                {item[objectKey].map((item1, key1) => (
                    <View style={styles.boxsbody}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }} onPress={() => this._onVisibleItemList(item1)} activeOpacity={0.8}>
                            <View style={styles.userNewSec}>
                                <Text style={styles.dateText}>{DateConvert.getDDthMonthNameYYYYformat(item1.actualDate).day}</Text>
                                <Text style={styles.weekText}>{DateConvert.getDayName(item1.actualDate)}</Text>
                            </View>
                            <View style={styles.boxTextSec}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: '#00B65E' }} />
                                    <Text style={styles.nameTextSpace}>{item1.visitStatusName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <SvgComponent svgName={"user"} strokeColor={"#1F2B4D"} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.dText}>{item1.organizationName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 0.25 }}>
                                <Text style={styles.nameTextSpaceM} numberOfLines={2}>{item1.contactTypeName}</Text>

                            </View>
                            <View style={styles.dropdownSec}>
                                <Image source={item1.listOpenCheck ? ImageName.UP_ARROW_WITH_GREY_CIRCLE : ImageName.BLUE_DROPDOWN_IMG_CLIKY2} style={{ width: 36, height: 36, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        {item1.listOpenCheck ?
                            <>
                                {this.state.detailsLoader ?
                                    <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
                                        <Loader type={"normal"} />
                                    </View>
                                    :
                                    <React.Fragment>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ABC5C8' }} />
                                        <View style={{ flexDirection: 'row', backgroundColor: '#E4EFF0', marginTop: 5, paddingVertical: 10 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                <View>
                                                    <SvgComponent svgName={"locationWithCircle"} strokeColor={"#1F2B4D"} height={20} width={20} />
                                                </View>
                                                <Text style={styles.nameTextSpace}>{item1.isPlanned}</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10 }}>
                                                <View>
                                                    <SvgComponent svgName={"calender"} strokeColor={"#1F2B4D"} height={20} width={20} />
                                                </View>
                                                <Text style={styles.dText}>Next Visit</Text>
                                                <Text style={styles.nameTextSpace}>{item1.nextFollowUpDate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ABC5C8', marginTop: 5 }} />

                                        {this.state.summaryDataObj.conversionData.length > 0 ? <>
                                            <View style={{ borderBottomWidth: 1, borderColor: '#ABC5C8', marginTop: 10 }} />
                                            <View style={{ flexDirection: 'row', backgroundColor: '#E4EFF0', marginTop: 5, paddingVertical: 10, alignItems: "center" }}>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                    <View>
                                                        <SvgComponent svgName={"3dBoxWithTick"} strokeColor={"#1F2B4D"} height={20} width={20} />
                                                    </View>
                                                    <Text style={styles.nameTextSpace}>{this.state.summaryDataObj.conversionData[0].hmTypDesc}</Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                                                    <Text style={styles.nameTextSpace}>{this.state.summaryDataObj.conversionData[0].hmName}</Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                                                    <Text style={styles.dText}>Qty  <Text style={styles.nameTextSpace}>{this.state.summaryDataObj.conversionData[0].quantity} {this.state.summaryDataObj.conversionData[0].unit}</Text></Text>
                                                </View>
                                            </View>
                                            <View style={{ borderBottomWidth: 1, borderColor: '#ABC5C8', marginTop: 5 }} />

                                        </> : null}
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={styles.remarksText}>Remarks</Text>
                                            <Text style={styles.remarksBodyText}>Pellentesque consequat hendrerit euismod. Nunc ultricies ullamcorper imperdiet. Nam id leo vel lectus rutrum bibendum quis venenatis leo</Text>
                                        </View>
                                    </React.Fragment>
                                }
                            </>
                            :
                            null
                        }
                    </View>

                ))}

            </View>
        );
    };

    dataArr = () => {

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
                        this.setState({ listLoader: false });
                        return null;
                    }
                }
            );
        }
    };

    // loader for scroll
    renderLoader = () => {
        if (this.state.listLoader) {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
            </View>
        } else {
            return <View style={{ marginBottom: 200 }} />
        }
    };

    // for change the state for refrace
    _onSetChangeData = async () => {
        this.setState({
            allListData: [],
            totalDataCount: 0,
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            isApiCall: true,
            limit: 10,
            pageNum: 0,
        })
    }

    //refresh list
    onRefresh = async () => {
        await this._onSetChangeData();
        await this._apiCallRes();
    }

    // for filter with api call
    _onFilterWithApi = async (data) => {
        this.state.selectedContactTypeId = data.selectedContactTypeObj.id ? data.selectedContactTypeObj.id.toString() : "";
        this.state.recordType = data.selectedRecordType.id ? data.selectedRecordType.id : "1";
        this.state.assignedId = data.selectedSubordinateObj.id ? data.selectedSubordinateObj.id : "";

        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.viewDateFormat(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.viewDateFormat(data.toDateObj.rawDate),
            selectedContactTypeId: this.state.selectedContactTypeId,
            recordType: this.state.recordType,
            assignedId: this.state.assignedId
        })
        this.onFilterOpenAndClose();
        // await this._onSetChangeData();
        // await this._apiCallRes();
        await this.onRefresh()
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        await this.clearFilterData();
        await this.onRefresh()
    }

    clearFilterData = async () => {
        this.setState({
            fromDate: "",
            toDate: "",
            selectedContactTypeId: "",
            recordType: "1",
            assignedId: ""
        })
    }

    //this function called in parent component by ref obj for conversion status change
    _onConversionSuccess = (value) => {
        let arr = this.state.allListData;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == value.id) {
                arr[i].isConvertion = 1;
            }
        }
        this.state.allListData = arr;
        this.setState({
            allListData: this.state.allListData
        });
    }

    shimmerView = () => {
        return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 5 }}>
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

    filterData = async (data) => {
        this.state.customerIdArr = data.customerIdArr;
        this.state.fromDate = DateConvert.formatYYYYMMDD(data.fromDateObj.rawFromDate);
        this.state.toDate = DateConvert.formatYYYYMMDD(data.toDateObj.rawToDate);
        this.setState(this.state);
        this.onRefresh();
    }

    onResetFilterData = async () => {
        this.setState({ customerIdArr: [], fromDate: "", toDate: "" })
        this.onRefresh();
    }

    onDownload = () => {
        console.log("download")
    }

    render() {
        return (
            <SafeAreaView style={{ height: Dimension.height - Dimension.height / 5, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, flex: 1 }}>
                <Header {...this.props} onRefresh={() => console.log("")} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} />
                {/* {this.state.isCallOtherData ?
                    <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"visitedCustomer"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}
                        props={this.props}
                    /> :
                    null
                } */}
                {/* <View style={styles.dateSec}>
                    <Text style={styles.monthTxt}>{DateConvert.getDDthMonthNameYYYYformat(new Date()).month}<Text style={styles.yearTxt}> {DateConvert.getDDthMonthNameYYYYformat(new Date()).year}</Text></Text>
                </View> */}
                <View style={{ marginHorizontal: 15 }}>
                    {this.state.pageLoader ?
                        this.shimmerView()
                        :
                        <React.Fragment>
                            {this.state.allListData.length > 0 ?
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.allListData}
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
                                </React.Fragment> :
                                <>
                                    {this.state.initialApiCall ?
                                        <View style={{ height: Dimension.height, marginTop: 20 }}>
                                            <NoDataFound />
                                        </View>
                                        : null
                                    }
                                </>
                            }
                            {this.state.selectListItem.length > 0 ?
                                <View style={CustomStyle.productBtn}>
                                    <BigTextButton
                                        text="Save & Next"
                                        onPress={() => this._onSubmiViewt()}
                                        backgroundColor={Color.COLOR.YELLOW.SUNGLOW}
                                    />
                                </View> :
                                null
                            }
                        </React.Fragment>

                    }
                </View>

            </SafeAreaView>
        )
    };
};


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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);