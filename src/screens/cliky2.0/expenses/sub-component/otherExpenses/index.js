import React, { Component } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import ImageBlurLoading from 'react-native-image-blur-loading'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums'
import { DateConvert, Toaster } from '../../../../../services/common-view-function'
import { App_uri } from '../../../../../services/config'
import { ErrorCode } from '../../../../../services/constant'
import { MiddlewareCheck } from '../../../../../services/middleware'
import { BigTextButton } from '../../../../../shared'
import { modifyExpenceCategoryArr, modifyOtherExpenseData, modifyOtherFetchData, modTransportData } from './function'
import styles from './style'
import { FoodExpenses, StayExpenses, TravelExpenses } from './sub-component'

export class OtherExpenses extends Component {
  constructor(props) {
    super(props)
    this.loaderRef = React.createRef();
    this.state = {
      selectedTab: 0,
      selectedTabItem: {},
      otherExpensesTabArr: [],
      otherExpenseDataArr: [],
      selectedItem: this.props.selectedTabData,
      otherLoader: false
    }
  }

  componentDidMount = async () => {
    await this.getOtherExpenseData()
    await this._onExpenceCategory()
  }

  getOtherExpenseData = async () => {
    this.setState({
      otherExpenseDataArr: this.props.mainData.otherListData
    })

  }

  _onExpenceCategory = async () => {
    let reqData = {
      "expenseTypeId": this.props.selectedTabData.id
    }
    this.setState({ pageLoader: true })
    let responseData = await MiddlewareCheck("masterExpenseCategoryTypes", reqData, this.props);
    if (responseData === false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          otherExpensesTabArr: modifyExpenceCategoryArr(responseData.response),
          selectedTabItem: modifyExpenceCategoryArr(responseData.response).length == 0 ? {} : modifyExpenceCategoryArr(responseData.response)[0]
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ pageLoader: false })
  }

  tabSection = () => {
    const onSelectTab = (item, key) => {
      this.setState({ selectedTab: key, selectedTabItem: item })
    }
    return (
      <View style={{ flexDirection: "row" }}>
        {this.state.otherExpensesTabArr.map((item, key) => (
          <React.Fragment key={key}>
            <TouchableOpacity style={styles.imgSec} activeOpacity={0.8} onPress={() => onSelectTab(item, key)}>
              <Image source={item.name == "Lodging" ? ImageName.EXPENSE_STAY_LOGO :
                item.name == "Travelling" ? ImageName.EXPENSE_COURIER_LOGO :
                  item.name == "Courier" ? ImageName.EXPENSE_COURIER_LOGO :
                    item.name == "Print" ? ImageName.EXPENSE_PRINT_LOGO :
                      item.name == "Service" ? ImageName.EXPENSE_SERVICE_LOGO :
                        null
              } style={styles.mainImg} />
              <Text style={styles.bottomTxt}>{item.name}</Text>
            </TouchableOpacity>

          </React.Fragment>
        ))}
      </View>
    )
  }

  deleteItem = async (item, key) => {
    let arr = this.state.otherExpenseDataArr;
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i == key) {
      } else {
        tempArr.push(arr[i]);
      }
    }
    this.state.otherExpenseDataArr = tempArr;
    this.setState({ otherExpenseDataArr: this.state.otherExpenseDataArr })
    let reqData = {
      "expenseId": item.expenseId.toString(),
    }
    let responseData = await MiddlewareCheck("deleteExpenses", reqData, this.props);
    if (responseData === false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        Toaster.ShortCenterToaster("Deleted successfully!")
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }

  }

  totalDataSection = () => {
    return (
      <View>
        {this.state.otherExpenseDataArr.map((item, key) => (
          <View style={{ backgroundColor: "#F3F3F3", marginVertical: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#A3A6AF" }} key={key}>
            <View style={{ flexDirection: "row", marginBottom: 10, marginLeft: 5, alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.boxView}>
                  <Text style={styles.textdate}>{DateConvert.viewDateFormat(item.rawDate).substring(0, 2)}</Text>
                  <Text style={styles.textDay}>{item.currentDay}</Text>
                </View>
                <Image source={item.type == "Lodging" ? ImageName.EXPENSE_STAY_LOGO :
                  item.type == "Travelling" ? ImageName.EXPENSE_COURIER_LOGO :
                    null
                } style={styles.arrImg} />
              </View>
              <View style={{ flexDirection: "column", flex: 1, marginLeft: 10 }}>
                <Text style={styles.labelTxt}>{item.hotelName}</Text>
                <Text style={styles.labelTxt}>{item.roomType}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.amountTxt}>{'\u20B9' + " " + item.totalAmount}</Text>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.deleteItem(item, key)}>
                  <Image source={ImageName.RED_DELETE_OUTLINE} style={styles.dltImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: "#A3A6AF" }}>
              <View style={{}}>
                <View >
                  <View style={styles.photoSec}>
                    <View style={{ flex: 0.3 }}>
                      {item.allBillImage.map((item1, key1) => (
                        <React.Fragment key={key1}>
                          <View style={styles.mainView}>
                            <View style={styles.mainImageView}>
                              <View style={styles.flexANdMarginView}>
                                <View style={styles.logisticImageView}>
                                  <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item1.images }} style={styles.TakephotoImg} />
                                </View>
                              </View>
                            </View>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                    {item.type == "Travelling" ?
                      <View style={{ flex: 0.7, marginTop: 10 }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>From Point : <Text style={{ color: "#000", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.REGULAR }} numberOfLines={1}>{item.fromPoint}</Text></Text>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>To Point: <Text style={{ color: "#000", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.REGULAR }} numberOfLines={1}>{item.toPoint}</Text></Text>
                      </View>
                      : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}

      </View>

    )
  }

  //for stay
  onSaveDataFromStayExpenses = async (childData) => {
    let arr = this.state.otherExpenseDataArr;
    arr.push(childData);
    let reqData = {
      "fieldVisitId": "0",
      "isProject": "0",
      "description": "",
      "insertData": modTransportData(arr)
    }
    this.setState({ arrLoader: true })
    this.loaderRef.current._onLoader(true);
    let responseData = await MiddlewareCheck("addExpenses", reqData, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        Toaster.ShortCenterToaster(responseData.message)
        await this._onOtherExpenseApi()
        // this.state.otherExpenseDataArr = modifyOtherExpenseData(reqData.insertData);
        // this.setState({ otherExpenseDataArr: this.state.otherExpenseDataArr })
        this.loaderRef.current._onLoader(false);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({
      arrLoader: false
    })

    this.setState({ arrLoader: false })

  }

  //for travel
  onSaveDataFromTravelExpenses = async (childData) => {
    let arr = this.state.otherExpenseDataArr;
    arr.push(childData);
    let reqData = {
      "fieldVisitId": "0",
      "isProject": "0",
      "description": "",
      "insertData": modTransportData(arr)
    }

    this.setState({ arrLoader: true })
    this.loaderRef.current._onLoader(true);
    let responseData = await MiddlewareCheck("addExpenses", reqData, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        Toaster.ShortCenterToaster(responseData.message)
        await this._onOtherExpenseApi()
        // this.state.otherExpenseDataArr = modifyOtherExpenseData(reqData.insertData);
        // this.setState({ otherExpenseDataArr: this.state.otherExpenseDataArr })
        this.loaderRef.current._onLoader(false);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({
      arrLoader: false
    })
    this.setState({ arrLoader: false })

  }

  _onOtherExpenseApi = async () => {
    let dataReq = {
      "limit": "50",
      "offset": "0",
      "searchFrom": this.props.date.fromDate,
      "searchTo": this.props.date.toDate,
      "fieldVisitId": "",
      "dataListType": "singleUser",
      "expenseTypeId": this.props.selectedTabData.id
    }
    this.setState({ otherLoader: true })
    let responseData = await MiddlewareCheck("getExpenseList", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let fetchedData = (await modifyOtherFetchData(responseData.response)).visitListData;
        this.setState({
          otherExpenseDataArr: fetchedData
        })
      }
      else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ otherLoader: false })
  }


  onSaveDataFromFoodExpenses = (childData) => {
    let arr = this.state.otherExpenseDataArr;
    arr.push(childData);
    this.state.otherExpenseDataArr = arr;
    this.setState({ otherExpenseDataArr: this.state.otherExpenseDataArr })
  }
  render() {
    return (
      <View style={{ height: Dimension.height }}>
        <View >
          <ScrollView showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <>
              <View style={styles.titleSection}>
                <Text style={styles.titleTxt}>Add Other Expenses</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {this.tabSection()}
              </ScrollView>
              <View style={{ marginTop: 10, marginHorizontal: 5 }}>

                {this.state.selectedTabItem.name == "Lodging" ?
                  <StayExpenses {...this.props} onSaveDataToParent={this.onSaveDataFromStayExpenses} selectedTabData={this.props.selectedTabData} selectedSubTabItem={this.state.selectedTabItem} ref={this.loaderRef} />
                  :
                  null
                }
                {this.state.selectedTabItem.name == "Travelling" ?
                  <TravelExpenses {...this.props} onSaveDataToParent={this.onSaveDataFromTravelExpenses} selectedTabData={this.props.selectedTabData} selectedSubTabItem={this.state.selectedTabItem} ref={this.loaderRef} />
                  :
                  null
                }
              </View>
              {/* {this.state.arrLoader ?
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.DARK_BLUE} />

                </View>
                : */}
              {this.state.otherLoader ? null :
                this.totalDataSection()
              }
              {/* } */}

              <View style={{ marginBottom: 400 }} />
            </>


          </ScrollView>
        </View>
        {/* <View style={{
          marginVertical: 10, flexDirection: "row", position: 'absolute', //Here is the trick
          bottom: 0
        }}>
          <View style={{ flex: 0.5 }}></View>
          <View style={{ flex: 0.5 }}>
            <BigTextButton text={"Final Submit"} backgroundColor={Color.COLOR.BLUE.SKY_BLUE} onPress={() => this.onFinalSubmit()} />
          </View>
        </View> */}

      </View>
    )
  }
}

export default OtherExpenses