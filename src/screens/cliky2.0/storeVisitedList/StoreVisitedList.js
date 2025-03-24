import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import styles from './Style';
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
import { BigTextButton, NoDataFound, Loader, FilterModal, TextInputBox } from "../../../shared";
import { CustomStyle } from '../../style';
import { dateModArr, getSelectId, modifyListData, modifyOutletListData, modifySummary } from "./Function";
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { DateConvert, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SvgComponent from "../../../assets/svg";
import { Header } from "..";

class StoreVisitedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchActive: false,
            allListData: [],
            // selectListItem: this.props.selectItem.customer,
            selectListItem: "",
            pageNum: 0,
            limit: 20,
            totalDataCount: 0,
            refreshing: true,
            listLoader: true,
            pageLoader: false,
            listDataLoader: false,
            filterVisibility: false,
            // fromDate: "",
            toDate: "",
            fromDate: DateConvert.formatYYYYMMDD(new Date()),
            // toDate: DateConvert.formatYYYYMMDD(new Date()),
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
            isSearchVisible: false,
            dateListArr: [],
            arrData: [],
            outletList: [],
            outletLoader: false
        }
    }

    componentDidMount = async () => {
        // let firstDate = DateConvert.getFirstDateOfCurrentMonth();
        // this.setState({ fromDate: DateConvert.formatYYYYMMDD(firstDate) })
        await this.storeInitialData();
        await this._load();
        this.setState({ isCallOtherData: true, });
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

    getOutletListData = async (item) => {
        let dataReq = {
            "limit": "",
            "offset": "",
            "userName": "",
            "customerType": "0",
            "isProject": "",
            "searchFrom": "",
            "contactTypeIdArr": [],
            "searchTo": "",
            "contactTypeId": "",
            "recordType": "1",
            "assignedId": "",
            "hierarchyDataIdArr": [{ hierarchyDataId: item.hierarchyDataId, hierarchyTypeId: item.hierarchyTypeId }]
        }
        this.setState({ outletLoader: true })
        let responseData = await MiddlewareCheck("pjpVisitListingV2", dataReq, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let dateListArr = modifyOutletListData(responseData.data.visitList);
                this.setState({ outletList: dateListArr })
            }
        }
        this.setState({ outletLoader: false })
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false })
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "serchName": this.state.searchText,
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
        }
        let responseData = await MiddlewareCheck("getVisitedLocations", dataReq, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let dateListArr = modifyListData(responseData.data);
                if (dateListArr.length == 0) {
                    this.state.isApiCall = false;
                }
                this.setState({
                    allListData: [...this.state.allListData, ...dateListArr]
                })

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

    showHideData = (item, index) => {
        let arr = this.state.allListData;
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].check = !arr[i].check
                this.getOutletListData(item)
            } else {
                arr[i].check = false
            }
        }
        this.state.allListData = arr;
        this.setState({ allListData: this.state.allListData })

    }

    renderList = (item, index) => {
        return (
            <View>
                {this.renderListData(item, index)}
            </View>
        )
    }

    // rendering the data
    renderListData = (item, index) => {
        return (
            <View style={{}} key={index}>
                <TouchableOpacity
                    onPress={() => this.showHideData(item, index)}
                    style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 10, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 15, flex: 1, marginTop: 20 }}
                >
                    <View style={{ flex: 0.75, alignItems: "center", flexDirection: "row", marginRight: 5 }}>
                        <SvgComponent svgName={"location_with_route"} height={15} width={15} />
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS, marginLeft: 10 }}>{item.hmName}</Text>
                    </View>
                    <View style={{ flex: 0.05 }} />
                </TouchableOpacity>
                {item.check ?
                    <React.Fragment>
                        {this.state.outletLoader ?
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Loader type={"normal"} />
                            </View>
                            :
                            <React.Fragment>
                                {this.state.outletList.map((item, key) => (
                                    <View style={styles.boxsbody} key={key}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: "center" }}
                                            activeOpacity={0.8}
                                        >
                                            <View style={styles.userSec}>
                                                <View style={{ alignSelf: 'flex-end' }}>
                                                    <View style={{ height: 18, width: 18, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                                        <SvgComponent svgName={"love"} height={10} width={10} />
                                                    </View>
                                                </View>
                                                <Image source={{ uri: item.profilePic }} style={styles.userImage} />
                                            </View>
                                            <View style={styles.userTextSec} activeOpacity={0.9}>
                                                <Text style={styles.nameText}>{item.customerNameOld}</Text>
                                                <Text style={styles.dgText}>{item.contactTypeName}</Text>
                                            </View>

                                        </TouchableOpacity>

                                    </View>
                                ))}

                            </React.Fragment>
                        }

                    </React.Fragment>
                    :
                    null
                }
                {/* {!item.check ?
                    <React.Fragment>
                        {item[objectKey].map((item1, key1) => (
                            <View style={styles.boxsbody} key={key1}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: "center" }}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.userSec}>
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <View style={{ height: 18, width: 18, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                                <SvgComponent svgName={"love"} height={10} width={10} />
                                            </View>
                                        </View>
                                        <Image source={{ uri: item1.profilePic }} style={styles.userImage} />
                                    </View>
                                    <View style={styles.userTextSec} activeOpacity={0.9}>
                                        <Text style={styles.nameText}>{item1.customerNameOld}</Text>
                                        <Text style={styles.dgText}>{item1.contactTypeName}</Text>
                                    </View>
                                   
                                </TouchableOpacity>
                              
                            </View>

                        ))}
                    </React.Fragment>
                    : null} */}



            </View>
        );
    };


    dataArr = () => {

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
                    this.setState({ listLoader: false });
                    return null;
                }
            }
        );
        // }
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
        this.state.fromDate = data.fromDateObj.rawFromDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.fromDateObj.rawFromDate) : "";
        this.state.toDate = data.toDateObj.rawToDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.toDateObj.rawToDate) : "";
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
    onSearch = () => {
        let searchVisible = this.state.isSearchVisible,
            searchData = this.state.searchText;
        if (searchVisible == false) {
            searchVisible = true;
        } else {
            searchVisible = false;
        }
        if (searchVisible == false) {
            searchData = "";
            this.onRefresh()
        }
        this.setState({ isSearchVisible: searchVisible, searchText: searchData })
    }

    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ searchText: val })
        }
        const onPressSearchIcon = () => {

            this.onRefresh()
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', paddingBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search by Customer Name"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={42}
                        borderRadius={22}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    render() {
        // const { allListData } = this.state;

        // Create a flat list data array with headers and items
        // const flatListData = [];
        // allListData.forEach(itemGroup => {
        //     const objectKey = Object.keys(itemGroup)[0];
        //     flatListData.push({ isHeader: true, date: objectKey }); // Add header
        //     itemGroup[objectKey].forEach(item => {
        //         flatListData.push({ isHeader: false, item });
        //     });
        // });

        return (
            <SafeAreaView style={{ height: Dimension.height - Dimension.height / 5, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, flex: 1 }}>
                <Header {...this.props}
                    onRefresh={() => console.log("")}
                    onFilterData={(data) => this.filterData(data)}
                    onReset={() => this.onResetFilterData()}
                    onDownloadData={() => this.onDownload()}
                    onSearchData={() => this.onSearch()}
                />

                <View style={{ marginHorizontal: 15 }}>
                    {this.state.pageLoader ?
                        this.shimmerView()
                        :
                        <React.Fragment>
                            {this.state.allListData.length > 0 ?
                                <React.Fragment>
                                    {this.state.isSearchVisible ? this.searchSec() : null}
                                    <FlatList
                                        data={this.state.allListData}
                                        renderItem={({ item, index }) => this.renderList(item, index)}
                                        keyExtractor={({ item, index }) => index}
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
                                    <View style={{ height: Dimension.height, marginTop: 20 }}>
                                        <NoDataFound />
                                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreVisitedList);