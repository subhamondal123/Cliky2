import React from "react";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { historyModifyData, } from "./function";
import { CalenderModal, NoDataFound } from "../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DateConvert, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import styles from "./style";
import { CustomStyle } from "../../style";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SvgComponent from "../../../assets/svg";
import Header from "../header/Header";

let leaveRequestData = [
  {
    id: 7,
    typeName: "Casual",
    shortName: "CL",
    check: true
  },
  {
    id: 6,
    typeName: "Privilege",
    shortName: "PL",
    check: false
  },
  {
    id: 8,
    typeName: "Medical",
    shortName: "ML",
    check: false
  },
  {
    id: 10,
    typeName: "Earn",
    shortName: "EL",
    check: false
  }
]




// for leave list page
class LeaveHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideData: false,
      isVisible: false,
      refreshing: false,
      pageLoader: true,
      listLoader: false,
      actionTooltip: false,
      showHideCheckBox: false,
      showHideButton: false,
      selectAllCheckbox: false,
      filterCheck: false,
      selectedButton: "",
      selectItem: {},
      selectedContactItem: {},
      leaveAllList: [],
      loadMore: false,
      filterData: {},
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      selectedStatusDataObj: {},
      isVisibleStatusModal: false,
      isVisibleDeleteModal: false,
      listDataLoader: false,
      isVisibleEditModal: false,

      filterVisibility: false,
      fromDate: "",
      toDate: "",
      selectSubordinateId: "",

      initialApiCall: false,
      leaveReason: leaveRequestData,
      selectedReasonObj: {},

    };
  }

  // this is a initial function which is call first
  componentDidMount = async () => {
    await this.storeInitialData();
    await this._load();
    StoreUserOtherInformations("", {}, this.props);
  }

  // for store data 
  storeInitialData = async () => {
    let LeaveData = await StorageDataModification.LeaveHistoryListData({}, "get");
    if (LeaveData == null || LeaveData == undefined) {
      this.setState({ listDataLoader: true })
    } else {
      this.setState({
        leaveAllList: LeaveData.historyList,
        totalDataCount: LeaveData.totalCount,
      })
    }
  }

  // this is the first function where set the state data
  _load = async () => {
    this.setLabelName(this.state.leaveReason)
    this._apiCallRes();
  };

  setLabelName = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].check == true) {
        this.state.selectedReasonObj = arr[i]
      }
    }
    this.setState(this.state);
  }

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }

  // this function used for list data api call here
  _apiCallRes = async () => {
    let userInfo = await GetUserData.getUserData();
    this.setState({ refreshing: false, });
    let dataReq = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "userName": "",
      "leaveType": "",
      "searchFrom": this.state.fromDate,
      "searchTo": this.state.toDate,
      "reqUserId": this.state.selectSubordinateId.length > 0 ? this.state.selectSubordinateId : userInfo.userId,
      "hierarchyDataId": [
        {
          "hierarchyTypeId": "",
          "hierarchyDataId": ""
        }
      ],

    }
    let responseData = await MiddlewareCheck("leaveList", dataReq, this.props);
    if (responseData === false) {
      this._onNetworkError()
    } else {
      if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
        if (this.state.pageNum == 0) {
          let LeaveData = await StorageDataModification.LeaveHistoryListData({}, "get");
          let historyListData = historyModifyData(responseData.data)
          if (LeaveData == null || LeaveData == undefined) {
            this.setState({
              leaveAllList: historyListData.historyList,
              totalDataCount: historyListData.totalCount
            });
            await StorageDataModification.LeaveHistoryListData(historyListData, "store");
          } else if (JSON.stringify(LeaveData.historyList) === JSON.stringify(historyListData.historyList)) {
            this.setState({
              leaveAllList: historyListData.historyList,
              totalDataCount: historyListData.totalCount
            });
            if (LeaveData.totalCount !== historyListData.totalCount) {
              await StorageDataModification.LeaveHistoryListData(historyListData, "store");
            }
          } else {
            this.setState({
              leaveAllList: historyListData.historyList,
              totalDataCount: historyListData.totalCount
            });
            await StorageDataModification.LeaveHistoryListData(historyListData, "store");
          }
          this.setState({ initialApiCall: true })
        } else {
          let historyListData = historyModifyData(responseData.data)
          this.setState({
            leaveAllList: [...this.state.leaveAllList, ...historyListData.historyList],
            totalDataCount: historyListData.totalCount
          })
        }
      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.LeaveHistoryListData({}, "clear");
          this.setState(this.state);
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

  // for back button this function used
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // loader for scroll  this function used 
  renderLoader = () => {
    return this.state.listLoader ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
        <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
      </View>
    ) : (
      <View style={{ marginBottom: 500 }} />
    );
  };

  //refresh the  list data 
  onRefresh = async () => {
    this.setState({
      leaveAllList: [],
    })
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
          if (this.state.leaveAllList.length >= this.state.totalDataCount) {
            this.setState({ listLoader: false })
            return null;
          } else {
            this._load();
          }
        }
      );
    }
  };

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

  // for list show hide this function used
  onShowHideData = (item) => {
    let allItems = this.state.leaveAllList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == item.id) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.leaveAllList = allItems;
    this.setState({ leaveAllList: this.state.leaveAllList })
  }

  // data list item 
  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };

  // for list design this function used 
  ListData = (item, key) => {
    return (
      <View style={{}}>
        <View style={styles.mainBox}>
          <TouchableOpacity style={item.showHide ? styles.selectedsubBox : styles.subBox} onPress={() => this.onShowHideData(item)} activeOpacity={0.8}>
            <View style={styles.BoxMarginSec}>
              <View style={item.showHide ? styles.selectedVioletSmallBox : styles.violetSmallBox} >
                <View style={{ flexDirection: 'row', marginHorizontal: '2%' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.numberText}>{DateConvert.getDDthMonthNameYYYYformat(item.startDate).day}</Text>
                    <Text style={{ color: "#607077", fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{DateConvert.getDayName(item.startDate)}</Text>
                  </View>
                  <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: Color.COLOR.GREEN.SEA_GREEN }} />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.columnSec}>
                  <Text style={styles.auctionText}>{item.leaveTypeName}</Text>
                  <Text style={styles.auctionTypeText}>{"Personal Reason"} </Text>
                </View>
                <View style={{ top: 22, marginLeft: '5%' }}>
                  <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.noOfDays} days</Text>
                </View>
              </View>
              <View style={{}}>
                <SvgComponent svgName={item.showHide ? "upArrow" : "downArrow"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={15} width={15} />
              </View>
              <View style={{ width: 8 }} />
            </View>
          </TouchableOpacity>
          {item.showHide ?
            <React.Fragment>
              <View style={{ marginHorizontal: '3%', paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={styles.textFlexView}>
                    <View style={styles.iconView}>
                      <Image source={ImageName.CALENDER_LOGO} style={styles.iconImg} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headerText}>Start Date</Text>
                      <Text style={styles.textVisites}>{DateConvert.getITCDateFormat(item.startDate)}</Text>
                    </View>
                  </View>
                  <View style={styles.textFlexView}>
                    <View style={styles.iconView}>
                      <Image source={ImageName.CALENDER_LOGO} style={styles.iconImg} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headerText}>End Date</Text>
                      <Text style={styles.textVisites}>{DateConvert.getITCDateFormat(item.endDate)}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={styles.textFlexView}>
                    <View style={styles.iconView}>
                      <Image source={ImageName.BILL_LOGO} style={styles.iconImg} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headerText}>No. Of Days</Text>
                      <Text style={styles.textVisites}>{item.noOfDays}</Text>
                    </View>
                  </View>
                  <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>
                    <View style={styles.iconView}>
                      <Image source={ImageName.CONTACT_TYPE} style={styles.iconImg} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headerText}>Leave Type</Text>
                      <Text style={styles.textVisites} numberOfLines={1}>{item.leaveTypeName}</Text>
                    </View>
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

  _onStatus = (type) => {
    this.setState({ showHideCheckBox: true, actionTooltip: false, selectedButton: type })
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
      leaveAllList: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
    })
  }

  listHeaderSection = () => {
    return (
      <View style={styles.headerActionArea}>
        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, flex: 1 }}>Leave History</Text>
        <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR }}>Till <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{DateConvert.formatDDfullMonthYYYY(new Date())}</Text>
        </Text>
      </View>
    )
  }
  // for shimmer effect design here
  shimmerView = () => {
    return (
      <SkeletonPlaceholder borderRadius={4}>
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

  onTabClick = (item, key) => {
    let allItems = this.state.leaveReason;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == item.id) {
        allItems[i].check = true
      } else {
        allItems[i].check = false
      }
    }
    this.state.leaveReason = allItems;
    this.state.selectedReasonObj = item;
    this.setState(this.state);
  }



  leaveReasonSec = () => {
    return (
      <View style={{ padding: 5, borderTopColor: "#000", borderTopWidth: 0.5, borderBottomColor: "#000", borderBottomWidth: 0.5, flexDirection: 'row', marginTop: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.leaveReason.map((item, key) => (
            <React.Fragment key={key}>
              <TouchableOpacity style={item.check == true ? { flex: 1, marginHorizontal: 2, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE } : { flex: 1, marginHorizontal: 2 }} onPress={() => this.onTabClick(item, key)}>
                <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                  <Text style={item.check == true ? styles.activeReasonShortName : styles.reasonShortName}>{item.shortName}</Text>
                  <View style={{ width: 10 }} />
                  <View style={[styles.circelView, { backgroundColor: item.shortName == "CL" ? "#43b65e" : item.shortName == "ML" ? "#43b65e" : item.shortName == "PL" ? Color.COLOR.RED.AMARANTH : "#747c8f" }]}>
                    <Text style={styles.leaveCount}>0</Text>
                  </View>
                </View>
                <Text style={item.check == true ? styles.activeReasonText : styles.reasonText}>{item.typeName}</Text>
              </TouchableOpacity>
              <View style={{ borderRightWidth: 0.8, borderRightColor: '#000' }} />
            </React.Fragment>
          ))}
          <View style={{ borderRightWidth: 0.8, borderRightColor: '#000' }} />
          <TouchableOpacity style={{ marginHorizontal: 2, flex: 1 }} onPress={() => this.onCalanderOpenAndClose()} activeOpacity={0.9}>
            <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
              <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Leave</Text>
              <View style={{ width: 18 }} />
              <SvgComponent svgName={"calender"} strokeColor={"#000"} height={20} width={20} />
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
              <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>History</Text>
              <View style={{ width: 10 }} />
              <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>2023</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View >
    )
  }

  // for calender section 
  onCalanderOpenAndClose = () => {
    this.setState({
      calenderVisibility: !this.state.calenderVisibility
    })
  }

  OnCalenderDaySelect = async (data) => {
    this.state.fromDate = DateConvert.formatYYYYMMDD(data.selectedDate)
    this.state.toDate = DateConvert.formatYYYYMMDD(data.selectedDate)
    this.setState({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    this.onCalanderOpenAndClose();
    await this.onRefresh()

  }

  _onCalenderReset = async () => {
    this.onCalanderOpenAndClose();

    this.setState({
      fromDate: "",
      toDate: ""
    })
    await this.onRefresh()
  }


  modalSec = () => {
    return (
      <CalenderModal
        isVisible={this.state.calenderVisibility}
        onCloseModal={() => this.onCalanderOpenAndClose()}
        onApply={(data) => this.OnCalenderDaySelect(data)}
        resetData={() => this._onCalenderReset()}
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
        <Header {...this.props} onRefresh={() => console.log("")} />
        {this.leaveReasonSec()}
        {this.state.listDataLoader ?
          this.shimmerView()
          :
          <View style={{ marginHorizontal: 15 }}>
            {this.listHeaderSection()}
            {this.state.leaveAllList.length > 0 ? (
              <React.Fragment>
                <View style={{ marginTop: 5 }}>
                  <FlatList
                    data={this.state.leaveAllList}
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
                </View>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.state.initialApiCall ?
                  < View style={CustomStyle.noDataFoundViewForTabList}>
                    <NoDataFound />
                  </View>
                  :
                  null
                }
              </React.Fragment>
            )}
          </View>}
        {this.modalSec()}
      </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaveHistory);
