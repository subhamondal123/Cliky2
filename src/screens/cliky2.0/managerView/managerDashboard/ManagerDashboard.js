import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Color, Dimension, ImageName } from '../../../../enums';
import Header from '../../header/Header';
import styles from './Style';
import { DateConvert, GetUserData, Toaster } from '../../../../services/common-view-function';
import { CalenderModal, Loader } from '../../../../shared';
import { CallSummaryCard, DgmWiseOrderCard, LocationSaleSummaryCard, PrimaryCategoryWiseSaleCard, TeamPerformanceCard, UserSummaryCard, UserWiseTcPcCard } from '../../../../pageShared';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../../services/middleware';
import { modifyDesignationData } from './Function';
import { ErrorCode } from '../../../../services/constant';

const orderVsSalesObj = {
  order: "2.87 Cr",
  sale: "2.00 Cr",
  mom: 5,
  percentage: 87,
  color: "#F13748"
}


class ManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: DateConvert.getDayNameMonthDateYYY(new Date()),
      selectedDateRaw: "",
      isVisibleCalender: false,
      pageLoader: true,

      //=====
      orderVsSalesObj: orderVsSalesObj,

      mainDataForFilter: {
        designationArr: [],
        selectedDesignationObj: {},
        selectedMainDate: DateConvert.fullDateFormat(new Date()),
        referenceUserId: "",
        managerArr: []
      },


      // loader
    }
  }

  componentDidMount = async () => {
    await StoreUserOtherInformations("", {}, this.props);
    await this.onLoad()

  }

  // on component load function
  onLoad = async () => {
    this.setState({ mainDataForFilter: this.state.mainDataForFilter })
    await this.getDesignationList()
  }

  // get all designations list from api
  getDesignationList = async () => {
    let userData = await GetUserData.getUserData()
    this.state.mainDataForFilter.selectedDesignationObj.userId = userData.userId
    this.setState({ mainDataForFilter: this.state.mainDataForFilter })
    let reqData = {
      "refUserId": userData.userId
    }
    let responseData = await MiddlewareCheck("fetchAllChildDesignation", reqData, this.props);
    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
      let designationData = modifyDesignationData(responseData.response)
      this.state.mainDataForFilter.designationArr = designationData
      this.setState({
        mainDataForFilter: this.state.mainDataForFilter,
      })
    }
    this.setState({ pageLoader: false })
  }

  //user Summary section
  userSummSec = () => {
    return (
      <View>
        <UserSummaryCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </View>
    )
  }

  // Call summery section
  callSummSec = () => {
    return (
      <View>
        <CallSummaryCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </View>
    )
  }

  // Primary Category wise order vs sale progress section
  orderVsSaleSec = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={styles.orderVsSalesView}>
          <Text style={styles.orderVsSalesText}>Primary Category Wise Order Vs Sales</Text>
        </View>
        <View style={styles.tagMainView}>
          <View style={styles.orderSalesTagView}>
            <Text style={styles.orderSalesTagText}>Order Detail</Text>
          </View>
          <View style={{ flex: 1, }} />
          <View style={styles.orderSalesTagView}>
            <Text style={styles.orderSalesTagText}>Sales Detail</Text>
          </View>
        </View>
        <View>
          <View style={styles.mtdProgressMainView}>
            <View style={{ flex: 0.3 }}>
              <View style={styles.orderSalesIndicatorView}>
                <View style={styles.orderIndicatorView} />
                <Text style={styles.orderIndicatorText}>Order</Text>
              </View>
              <Text style={styles.orderSaleAmountText}>{this.state.orderVsSalesObj.order}</Text>
            </View>
            <View style={styles.mtdProgressView}>
              <CircularProgressBase
                value={this.state.orderVsSalesObj.percentage}
                activeStrokeColor={this.state.orderVsSalesObj.color}
                inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                activeStrokeWidth={15}
                rotation={180}
                inActiveStrokeWidth={15}
                DashedCircleProps={{
                  circleCircumference: 5,
                }}
                radius={120}
                clockwise={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.mtdProgressText}>Sales of Order</Text>
                  <Text style={styles.mtdProgressAmountText}>{this.state.orderVsSalesObj.percentage}%</Text>
                  <Text style={styles.mtdProgressText}>MTD</Text>
                </View>
              </CircularProgressBase>
            </View>
            <View style={styles.saleIndicatorMainView}>
              <View style={styles.orderSalesIndicatorView}>
                <View style={styles.saleIndicatorView} />
                <Text style={styles.orderIndicatorText}>Sale</Text>
              </View>
              <Text style={styles.orderSaleAmountText}>{this.state.orderVsSalesObj.sale}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View>
            <View style={styles.momMainView}>
              <Text style={styles.momPercentageText}>{this.state.orderVsSalesObj.mom}%</Text>
              <Image source={ImageName.GREEN_UP_ARROW} style={styles.momArrowImg} />
            </View>
            <Text style={styles.momText}>MoM</Text>
          </View>
        </View>
      </View>

    )
  }

  // DGM wise order section
  dgmWiseOrder = () => {
    return (
      <>
        <DgmWiseOrderCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </>
    )
  }

  // Primary Category wise order vs sale pie chart section
  pieChartSec = () => {
    return (
      <View>
        <PrimaryCategoryWiseSaleCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </View>
    )
  }

  // Outlate summery section
  outletSummarySec = () => {
    return (
      <View>
        <TeamPerformanceCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </View>
    )
  }

  //location summary section
  locationSummSec = () => {
    return (
      <View>
        <LocationSaleSummaryCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </View>

    )
  }

  // user wise tc ,pc data section
  userWiseValue = () => {
    return (
      <>
        <UserWiseTcPcCard {...this.props} mainPageData={this.state.mainDataForFilter} />
      </>
    )
  }

  //open date filter calender 
  onDateFilter = () => {
    this.setState({ isVisibleCalender: true })

  }

  // set the page loader
  setPageLoader = async (type) => {
    this.setState({ pageLoader: type })
  }

  //all modals initialize here
  modalSec = () => {
    //close the date calender
    const onCloseCalender = () => {
      this.setState({ isVisibleCalender: false })
    }
    // on select calender Date
    const OnCalenderDaySelect = async (val) => {
      let date = DateConvert.fullDateFormat(new Date(val.selectedDate))
      if (new Date(val.selectedDate) > new Date()) {
        Toaster.ShortCenterToaster("Please select a date in the past or today !")
      } else {
        await this.setPageLoader(true)
        this.state.mainDataForFilter.selectedMainDate = date
        this.setState({
          selectedDateRaw: val.selectedDate,
          selectedDate: DateConvert.getDayNameMonthDateYYY(val.selectedDate),
          mainDataForFilter: this.state.mainDataForFilter
        })
        onCloseCalender()
        await this.setPageLoader(false)
      }

    }

    // reset the celender date selection
    const onCalenderReset = async () => {
      await this.setPageLoader(true)
      this.state.mainDataForFilter.selectedMainDate = DateConvert.fullDateFormat(new Date())
      this.setState({
        selectedDateRaw: DateConvert.formatYYYYMMDD(new Date()),
        selectedDate: DateConvert.getDayNameMonthDateYYY(new Date()),
        mainDataForFilter: this.state.mainDataForFilter
      })
      this.setState({ isVisibleCalender: false })
      await this.setPageLoader(false)
    }
    return (
      <CalenderModal
        isVisible={this.state.isVisibleCalender}
        onCloseModal={() => onCloseCalender()}
        onApply={(data) => OnCalenderDaySelect(data)}
        resetData={() => onCalenderReset()}
      />
    )
  }

  //filter the list by designation/manager name
  filterData = async (data) => {
    if (Object.keys(data.selectedDesignationObj).length == 0 && Object.keys(data.selectedManagerObj).length == 0) {
      Toaster.ShortCenterToaster("Please Select Designation !")
    } else {
      await this.setPageLoader(true)
      this.state.mainDataForFilter.selectedDesignationObj = Object.keys(data.selectedDesignationObj).length == 0 ? data.selectedManagerObj : data.selectedDesignationObj
      this.setState({ mainDataForFilter: this.state.mainDataForFilter })
      await this.setPageLoader(false)
    }
  }
  //reseting the filtered data
  onResetFilterData = async () => {
    this.state.mainDataForFilter.selectedDesignationObj = {}
    this.setState(this.state)
    await this.onRefresh()
  }

// refresh the dashboard list
  onRefresh = async () => {
    await this.setPageLoader(true)
    await this.onLoad()
    await this.setPageLoader(false)
  }

  //render the component
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header onRefresh={() => console.log("")} {...this.props} onFilterByDate={() => this.onDateFilter()} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} onShare={() => this.onShareWhatsapp()} headerDate={this.state.selectedDate} mainPageData={this.state.mainDataForFilter} />
        <View style={styles.headerLine} />
        {this.state.pageLoader ?
          <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
            <Loader />
          </View>
          :
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <View style={styles.mainView}>
              {this.userSummSec()}
              {this.callSummSec()}
              {/* {this.orderVsSaleSec()} */}
              {this.dgmWiseOrder()}
              {this.pieChartSec()}
              {this.outletSummarySec()}
              {this.locationSummSec()}
              {this.userWiseValue()}
            </View>
          </ScrollView>
        }
        {this.modalSec()}
      </SafeAreaView >
    )
  }
}
export default ManagerDashboard;