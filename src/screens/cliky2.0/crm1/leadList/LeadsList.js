import React from "react";
import { Color, FontFamily, FontSize, ImageName } from "../../../../enums";
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
import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, leadModifyData, modifyPriorityStatus, modListData } from "./Function";

import Tooltip from "react-native-walkthrough-tooltip";
import { AssignedModal, BigTextButton, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../../shared";
// import Header from "../header";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, FileDownload, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { ErrorCode } from "../../../../services/constant";
import { App_uri } from "../../../../services/config";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";


class LeadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageViewVisible: false,
      filterLoader: false,
      imageUploadModal: false,
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
      filterCheck: false,
      status: [],
      selectedButton: "",
      selectItem: {},
      selectedContactItem: {},
      leadList: [],
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
      statusModalLoader: false,
      messageTxt: "",
      statusLoader: false,
      isVisibleFavouriteModal: false,
      downloadCheck: false,
      updateAssigneeModal: false,
      selectedAssignedObj: {},
      moduleSettingData: {},
      historyLoader: false,
      leadDescription: [],
      // for filter
      allFilterData: {
        title: "",
        titleAcive: false,
        contactName: "",
        contactNameActive: false,
        orgName: "",
        orgNameActive: false,
        ownerName: "",
        ownerNameActive: false,
        phone: "",
        phoneActive: false,
        email: "",
        emailActive: false,
        selectedLeadStatusObj: {},
        leadStatusArr: [],
        leadStatus: "",
      },
      // .................
      initialApiCall: false,
      isApiCall: true,
      isRemarkVisiable: false,
      remarkValue: "",
      leadMainId: "",
      remarkLoader: false
    };
  }

  componentDidMount = async () => {
    await this._load();
    StoreUserOtherInformations("", {}, this.props);
  }

  _load = async () => {
    let moduleSettingData = await StorageDataModification.userModuleSettingsData({}, "get");
    this.state.moduleSettingData = moduleSettingData;
    this.setState({
      moduleSettingData: this.state.moduleSettingData
    })
    // if (this.props.route.params && this.props.route.params.type) {
    //   if (this.props.route.params.type == "addNewLead") {
    //     this.onRefresh();
    //   }
    // } else {
    await this.storeInitialData();
    await this._apiCallRes();
    await this.fetchAllStatusData();
    // }
  };

  storeInitialData = async () => {
    let leadData = await StorageDataModification.leadListData({}, "get");
    if (leadData == null || leadData == undefined) {
      this.setState({ pageLoader: true })
    } else {
      this.setState({
        leadList: leadData.leadList,
        totalDataCount: leadData.totalCount,
        pageLoader: false
      })
    }
  }

  fetchAllStatusData = async () => {
    let mstPriorityStatusResponse = await MiddlewareCheck("mstNatureList", { type: 1 }, this.props);
    if (mstPriorityStatusResponse === false) {
      this._onNetworkError();
    } else {
      if (mstPriorityStatusResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let modifiedPriorityStatusData = modifyPriorityStatus(mstPriorityStatusResponse.response);
        this.state.status = modifiedPriorityStatusData;
        this.setState({
          status: this.state.status,
        })
      } else {
        Toaster.ShortCenterToaster(mstPriorityStatusResponse.message);
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
      'contactName': this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
      'orgName': this.state.allFilterData.orgName ? this.state.allFilterData.orgName : "",
      'title': this.state.allFilterData.title ? this.state.allFilterData.title : "",
      'phone': this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
      'email': this.state.allFilterData.email ? this.state.allFilterData.email : "",
      'leadStatus': this.state.allFilterData.leadStatus ? this.state.allFilterData.leadStatus : "",
      'owner': "",
      "platform": "",
      "isDownload": "0",
      "view": "list",
      "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
    }
    this.fetchListData(dataReq);
  }

  fetchListData = async (dataReq) => {
    let responseData = await MiddlewareCheck("leadList", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (this.state.pageNum == 0) {
          let leadData = await StorageDataModification.leadListData({}, "get");

          let leadListData = leadModifyData(responseData.response);
          if (leadListData.leadList.length == 0) {
            this.state.isApiCall = false;
          }
          if (leadData == null || leadData == undefined) {
            this.setState({
              leadList: leadListData.leadList,
              totalDataCount: leadListData.totalCount
            })
            await StorageDataModification.leadListData(leadListData, "store");
          } else if (JSON.stringify(leadData.leadList) === JSON.stringify(leadListData.leadList)) {
            this.setState({
              leadList: leadListData.leadList,
              totalDataCount: leadListData.totalCount
            });
            if (leadData.totalCount !== leadListData.totalCount) {
              await StorageDataModification.leadListData(leadListData, "store");
            }
          } else {
            this.setState({
              leadList: leadListData.leadList,
              totalDataCount: leadListData.totalCount
            });
            await StorageDataModification.leadListData(leadListData, "store");
          }
          this.setState({ initialApiCall: true })
        } else {
          let leadListData = leadModifyData(responseData.response)
          if (leadListData.leadList.length == 0) {
            this.state.isApiCall = false;
          }
          this.setState({
            leadList: [...this.state.leadList, ...leadListData.leadList],
            totalDataCount: leadListData.totalCount
          })
        }
        await this.showHideBottomButton();
      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.leadListData({}, "clear");
          this.setState({
            isApiCall: false,
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            leadList: [],
            initialApiCall: true
          })
        }
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({
      filterLoader: false,
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
      contactList: convertListData(this.state.leadList, item)
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
        selectedStatusDataObj: {}
      })
    }
  }
  _onChangeFavorite = (item) => {

    this._onFavouriteModal(item);
    this.setState({
      contactList: convertListData(this.state.leadList, item)
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
      "leadIdArr": idArr,
      "isFavorite": fav
    }
    this.setState({ statusLoader: true })
    let responseData = await MiddlewareCheck("changeMarkFavouriteStatusForLead", dataReq, this.props);
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

  _onClose = () => {
    this.onFilterOpenAndClose();
    //  this.clearFilterData();
  }

  _onFilterWithApi = async (data) => {
    this.state.allFilterData.ownerName = data.selectedName ? data.selectedName.toString() : "";
    this.state.allFilterData.orgName = data.selectedOrganizationObj.name ? data.selectedOrganizationObj.name.toString() : "";
    this.state.allFilterData.title = data.title ? data.title : "",
      this.state.allFilterData.phone = data.phone ? data.phone : "",
      this.state.allFilterData.email = data.email ? data.email : "",
      this.state.allFilterData.leadStatus = data.status.id ? data.status.id : "",
      this.setState({
        allFilterData: this.state.allFilterData
      })
    this.onFilterOpenAndClose();
    await this.onRefresh();
  }

  _onReset = async () => {
    this.onFilterOpenAndClose();
    this.clearFilterData();
    this.onRefresh();
  }

  reloadPage = async () => {
    await this.onRefresh();
  }

  clearFilterData = () => {
    this.state.allFilterData.ownerName = "",
      this.state.allFilterData.title = "",
      this.state.allFilterData.leadStatus = "",
      this.state.allFilterData.email = "",
      this.state.allFilterData.phone = "",
      this.state.allFilterData.orgName = "",
      this.setState({ allFilterData: this.state.allFilterData })
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
            this.setState({ listLoader: false })
            return null;

          }
        }
      );
    }
  };

  onClickListCheckbox = (item) => {
    let allItems = this.state.leadList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].leadId == item.leadId) {
        allItems[i].tick = !(allItems[i].tick)
      }
    }
    this.state.leadList = allItems;
    this.setState({ leadList: this.state.leadList })
    this.showHideBottomButton();
  }

  showHideBottomButton = () => {
    let counter = 0;
    let btnCounter = 0;
    for (let i = 0; i < this.state.leadList.length; i++) {
      if (this.state.leadList[i].tick == false) {
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

  getHistoryLogOfLead = async (item) => {
    let dataReq = { leadId: item.leadId }
    this.setState({ historyLoader: true })

    let responseData = await MiddlewareCheck("getHistoryLogOfLead", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({ leadDescription: responseData.response })
        // Toaster.ShortCenterToaster(responseData.message)
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ historyLoader: false })
  }

  onShowHideData = (item) => {
    let allItems = this.state.leadList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].leadId == item.leadId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.leadList = allItems;
    this.setState({ leadList: this.state.leadList })
    if (item.showHide) {
      this.getHistoryLogOfLead(item)
    }
  }

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  ListData = (item, key) => {
    return (
      <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
        <View style={styles.mainBox}>
          <View style={[styles.blueBox, { backgroundColor: item.leadTypeStatus == "Warm" ? Color.COLOR.BLUE.KIMBERLY : item.leadTypeStatus == "Cold" ? Color.COLOR.BLUE.PICTON_BLUE : Color.COLOR.BLUE.STEEL_BLUE }]}>
            <View style={styles.blueViewFlex}>
              <TouchableOpacity style={styles.homeCircel} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                <Image source={{ uri: App_uri.SFA_IMAGE_URI + item.profilePic }} style={styles.homeLogo} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: "5%", flex: 1 }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.saiEnterprisesText, { flex: 1 }]} numberOfLines={1}>{item.firstName + " " + item.lastName}</Text>
                  {item.isFavorite == "1" ? <React.Fragment>
                    <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                  </React.Fragment> : null}
                </View>
                <Text style={styles.textDealer}>{item.leadSourceTypeName == "" || item.leadSourceTypeName == undefined || item.leadSourceTypeName == null ? "N/A" : item.leadSourceTypeName}</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowHideData(item)}>
                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
              </TouchableOpacity>

              {this.state.showHideCheckBox ?
                <React.Fragment>
                  <View style={styles.checkBoxView}>
                    {this.checkBoxList(item)}
                  </View>
                </React.Fragment>
                :
                <React.Fragment>
                  {this.state.moduleSettingData.crm_leadEditPem == 1 ?
                    <View style={styles.addVisitsButton}>
                      {this._onPressToolTip(item, key)}
                    </View>
                    :
                    null
                  }

                </React.Fragment>
              }

            </View>
          </View>
          {item.showHide ?
            <React.Fragment>
              <View>
                <View style={styles.textFlexView}>
                  <View style={styles.iconView}>
                    <Image source={ImageName.CONTACT_TYPE} style={styles.iconImg} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Contact Type</Text>
                    <Text style={styles.textVisites}>{item.contactTypeName}</Text>
                  </View>
                  <View style={styles.iconView}>
                    <Image source={ImageName.CLIPBOARD} style={styles.iconImg} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Status</Text>
                    <Text style={styles.textVisites}>{item.leadTypeStatusName}</Text>
                  </View>
                </View>
                <View style={[styles.textFlexView]}>
                  <View style={styles.iconView}>
                    <Image source={ImageName.CONVERT_CARD} style={styles.iconImg} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Conversion status</Text>
                    {/* {(item.email.split(",")).map((obj, key) => ( */}
                    <Text key={key} style={styles.textVisites}>{item.isConverted == "1" ? "Converted" : "Not Converted"}</Text>
                    {/* ))} */}
                  </View>
                  <View style={styles.iconView}>
                    <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Phone</Text>
                    {(item.phone.split(",")).map((obj, key) => (
                      <Text key={key} style={styles.textVisites} numberOfLines={1}>{obj}</Text>
                    ))}
                  </View>
                </View>
                <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>
                  <View style={styles.iconView}>
                    <Image source={ImageName.DIRECTIONS} style={styles.iconImg} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>History</Text>
                    {this.state.historyLoader ?
                      <View style={{ justifyContent: "center", height: 80 }}>
                        <ActivityIndicator />
                      </View>
                      :
                      <>
                        {this.state.leadDescription.length > 0 ?
                          <>
                            {this.state.leadDescription.map((obj, key1) => (
                              <View style={styles.mainView} key={key1}>
                                <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                  <View style={[styles.dotCircle, { backgroundColor: "red" }]} />
                                  <Text style={styles.descriptionTxt}>{obj.description}</Text>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                  <Text style={styles.dateTxt}>{DateConvert.fullDateFormat(obj.createdAt)}</Text>
                                </View>
                              </View>
                            ))}
                          </>
                          :
                          <Text style={styles.textVisites}>{"No Data Found"}</Text>
                        }
                      </>
                    }
                  </View>
                </View>
              </View>
            </React.Fragment>
            :
            null
          }

        </View>
      </View>

    )
  };

  // ......open list item tooltip ..........

  _onConversionMark = (item) => {
    this.props.navigation.navigate("Conversion", { data: item })
    this.state.leadList = convertListData(this.state.leadList, item);
  }


  _onRemarkModal = (item) => {
    this.state.isRemarkVisiable = true;
    this.state.leadMainId = item.leadId;
    this.state.leadList = convertListData(this.state.leadList, item);
    this.setState(this.state);
  }

  _onPressToolTip = (item) => {
    const OnClickTooltip = (item) => {
      this.setState({
        leadList: convertListData(this.state.leadList, item),
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
          this._onChangeFavorite(item);
          break;
        case "updateAssignee":
          this._onUpdateAssigneeModal(item);
          break;
        case "conversionMark":
          this._onConversionMark(item);
          break;
        case "remark":
          this._onRemarkModal(item);
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
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("status", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("updateAssignee", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Update Assignee</Text>
            </TouchableOpacity>
            {item.isFavorite == "0" ? <React.Fragment>
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("favourite", item)}
                activeOpacity={0.7}
              >
                <Text style={styles.tooltipText}>Mark as favourite</Text>
                {/* <Text style={styles.tooltipText}>{item.isFavorite == "0" ? "Mark as Favourite" : "Remove from Favourite"}</Text> */}

              </TouchableOpacity>
            </React.Fragment> : null}
            {item.fieldVisitId !== 0 && item.isConverted == 0 ?
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("conversionMark", item)}
                activeOpacity={0.7}>
                <Text style={styles.tooltipText}>Mark Conversion</Text>
              </TouchableOpacity> :
              null
            }
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("remark", item)}
              activeOpacity={0.7}>
              <Text style={styles.tooltipText}>Remark</Text>
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
      leadList: convertListData(this.state.leadList, item)
    })
  };

  _deleteItem = () => {
    for (let i = 0; i < this.state.leadList.length; i++) {
      if (this.state.selectedContactItem.leadId == this.state.leadList[i].leadId) {
        this.state.leadList.splice(i, 1);
      }
    }
    this.setState({
      leadList: this.state.leadList,
      totalDataCount: this.state.totalDataCount - 1
    });
    // let idArr = [];
    // idArr.push(this.state.selectedContactItem.leadId);
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
      leadList: convertListData(this.state.leadList, item)
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
    this.props.navigation.navigate("CreateAndEditLeads", { data: this.state.selectedContactItem, type: "edit" })

  }
  // for view details of item
  _onViewDetails = (item) => {
    this.props.navigation.navigate("LeadDetails", { data: item, onReloadListPage: this.reloadPage, onChangeStatus: this._onChangeColorFromDetails });
    this.setState({
      leadList: convertListData(this.state.leadList, item)
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
            {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onActionTooltipClick("delete")}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Delete</Text>
            </TouchableOpacity> */}
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
          disabled={this.state.showHideCheckBox || this.state.leadList.length < 1 || this.state.moduleSettingData.crm_leadEditPem == 0 ? true : false}
        // disabled={true}
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
      // showHideCheckBox: true,
      actionTooltip: false,
      // selectedButton: type 
    })
  }
  _onStatus = (type) => {
    this.setState({
      showHideCheckBox: true,
      actionTooltip: false,
      selectedButton: type
    })
  }

  oncloseActions = () => {
    this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })

    let allItems = this.state.leadList;
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].tick = false;
    }
    this.state.leadList = allItems;
    this.setState({ leadList: this.state.leadList })
    this.showHideBottomButton();
  }

  onSelectAction = (selectedButton) => {
    let allItems = this.state.leadList;
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

      this.state.leadList = allMainItem;
      this.setState({ leadList: this.state.leadList })
      this.deleteContactItem(arrId)
    } else if (selectedButton == "assign") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].leadId)
        }
      }
    } else if (selectedButton == "status") {
      if (this.state.isVisibleStatusModal == false) {
        this.setState({
          isVisibleStatusModal: true,
        })
      } else {
        this.setState({
          isVisibleStatusModal: false,
        })
      }
    }
  }
  onClickSelectAllItem = (type) => {
    let allItems = this.state.leadList;
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
    this.state.leadList = allItems;
    this.setState({ leadList: this.state.leadList })
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

  // _onFilterApicall = async (data) => {
  //   this.setState({
  //     filterData: data
  //   })
  //   await this._onStatusChange();
  //   this._onFilter();
  //   this._apiCallRes(data);
  // }
  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      isApiCall: true,
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      leadList: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
      pageLoader: true
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
        'contactName': this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
        'orgName': this.state.allFilterData.orgName ? this.state.allFilterData.orgName : "",
        'title': this.state.allFilterData.title ? this.state.allFilterData.title : "",
        'phone': this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
        'email': this.state.allFilterData.email ? this.state.allFilterData.email : "",
        'leadStatus': this.state.allFilterData.leadStatus ? this.state.allFilterData.leadStatus : "",
        'owner': "",
        "platform": "",
      }

      if (type == "csv") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForLead", dataReq, this.props);
        await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.path.file);
        this.setState({ listDataLoader: false })
      }
      if (type == "excel") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForLead", dataReq, this.props);
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

  // .......................................................***************************...............................................

  listHeaderSection = () => {
    return (
      <View>
        <View style={styles.headerActionArea}>
          {this.state.showHideCheckBox ?
            <React.Fragment>
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
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
              </TouchableOpacity>
            </React.Fragment>
            :
            <React.Fragment>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={this._onBack}>
                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
              </TouchableOpacity> */}
              <View style={styles.filter_action_btn}>
                <TouchableOpacity
                  style={styles.filterBtn}
                  activeOpacity={0.8}
                  onPress={() => this.onFilterOpenAndClose()}
                // disabled={this.state.showHideCheckBox || this.state.opportunityList.length < 1}
                >
                  <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                </TouchableOpacity>
                {/* <View style={{ marginRight: 10 }}>
                  {this._TooltipDownloadAction()}
                </View> */}
                <View>
                  {this._TooltipAction()}
                </View>
              </View>
            </React.Fragment>}
        </View>
      </View>
    )
  }
  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility
    })
  }
  onAddContact = () => {
    this.props.navigation.navigate("CreateAndEditContact")
  }

  _onChangeColorFromDetails = (value) => {
    let arr = this.state.leadList;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].leadId == value.leadId) {
        arr[i].leadTypeStatusName = value.statusObj.name;
      }
    }
    this.state.leadList = arr;
    this.setState({
      leadList: this.state.leadList
    })
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
        "leadId": this.state.selectItem.leadId,
        "assignTo": this.state.selectedAssignedObj.id ? this.state.selectedAssignedObj.id : "",
      }
      let responseData = await MiddlewareCheck("updateLeadAssign", dataReq, this.props);
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

  _onChangeStatusData = async () => {
    let errorCount = 0;
    if (inputEmptyValidator(this.state.selectedStatusDataObj.id) == false) {
      Toaster.ShortCenterToaster("Please select Status !")
      errorCount++;
    } else {
      this.setState({
        statusModalLoader: true
      });

      let selectedContact = this.state.selectedContactItem;
      let id = [];
      if (this.state.showHideCheckBox) {
        let allItems = this.state.leadList;
        for (let i = 0; i < allItems.length; i++) {
          if (allItems[i].tick == true) {
            id.push(allItems[i].leadId.toString());
          }
        }
      } else {
        id = [selectedContact.leadId.toString()];
      }

      let reqData = {
        leadId: id,
        leadTypeStatus: this.state.selectedStatusDataObj.id
      }

      let responseData = await MiddlewareCheck("updateLeadTypeStatus", reqData, this.props);

      if (responseData === false) {
        this._onNetworkError();
      } else {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          Toaster.ShortCenterToaster(responseData.message);
          if (this.state.showHideCheckBox) {
            this._onStatusModal();
            this.onRefresh();
            this.oncloseActions();
          } else {
            this.state.leadList = await modListData(this.state.leadList, selectedContact, this.state.selectedStatusDataObj.name);
            this._onStatusModal();
            // this._onChangeColorFromDetails(this.state.selectedStatusDataObj);
          }
        } else {
          Toaster.ShortCenterToaster(responseData.message);
        }
      }
      this.setState({
        statusModalLoader: false,
        selectedStatusDataObj: {},
        leadList: this.state.leadList
      });
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
      this.state.leadList = convertListData(this.state.leadList, item);
      this.setState({
        updateAssigneeModal: this.state.updateAssigneeModal,
        leadList: this.state.leadList
      })
    }
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

  _onRemarkSubmit = async () => {
    let errCounter = 0;
    if (this.state.remarkValue == undefined || this.state.remarkValue == null || this.state.remarkValue == "") {
      Toaster.ShortCenterToaster("Please enter Remarks");
      errCounter++;
    }
    if (errCounter == 0) {
      let reqData = {
        "leadId": this.state.leadMainId,
        "remarks": this.state.remarkValue,
        "currentDateTime": DateConvert.fullDateFormat(new Date()),
      }
      this.setState({ remarkLoader: true });
      let responseData = await MiddlewareCheck("addRemarkLeads", reqData, this.props);
      if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          this.setState({
            remarkValue: ""
          })
          this._onRemarkCancel()
          Toaster.ShortCenterToaster(responseData.message);
        } else {
          Toaster.ShortCenterToaster(responseData.message)
        }
      }
      this.setState({ remarkLoader: false });


    }
  }

  _onRemarkCancel = () => {
    this.state.isRemarkVisiable = false
    this.setState(this.state);
  }

  onChangeRemark = (value) => {
    this.state.remarkValue = value;
    this.setState(this.state);
  }

  render() {
    const ViewStatus = () => {
      const _onSelectStatus = (value) => {
        this.setState({
          selectedStatusDataObj: value
        })
      }

      return (
        <View style={{ marginTop: 20 }}>
          <View style={{ marginHorizontal: "5%" }}>
            <DropdownInputBox
              selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : "0"}
              data={this.state.status}
              onSelect={(value) => _onSelectStatus(value)}
              headerText={"Select Status"}
              selectedText={this.state.selectedStatusDataObj.name ? this.state.selectedStatusDataObj.name : "Select Status"}
              selectedTextColor={this.state.selectedStatusDataObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
              isBackButtonPressRequired={true}
              isBackdropPressRequired={true}
            />
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ flex: 1, marginHorizontal: '5%' }}>
                <BigTextButton
                  height={40}
                  borderRadius={24}
                  backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                  text={"Cancel"}
                  onPress={() => this._onStatusModal()}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: '5%' }}>
                <BigTextButton
                  height={40}
                  borderRadius={24}
                  text={"Ok"}
                  onPress={() => this._onChangeStatusData()}
                />
              </View>
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
              <View style={styles.modalstatusview}>
                <View style={styles.modalStatusHeaderSec}>
                  <View style={styles.marginView}>
                    <Text style={styles.profileNameText}>Change Status</Text>
                  </View>
                </View>
                {this.state.statusModalLoader ?
                  <View style={{ paddingVertical: 40 }}>
                    <Loader />
                  </View>
                  :
                  <>
                    {ViewStatus()}
                  </>
                }
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
            type={"lead"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}
            props={this.props}
          />

          <AssignedModal
            isVisible={this.state.updateAssigneeModal}
            onCloseModal={() => this._onUpdateAssigneeModal()}
            type={"lead"}
            onUpdateButton={(value) => this._onUpdate(value)}

          />
          {/* add remark */}
          <Modal
            isVisible={this.state.isRemarkVisiable}
            onRequestClose={() => this._onRemarkCancel()}
            onBackdropPress={() => this._onRemarkCancel()}
            onBackButtonPress={() => this._onRemarkCancel()}
            children={
              <View style={styles.modalstatusview}>
                <View style={styles.modalStatusHeaderSec}>
                  <View style={styles.marginView}>
                    <Text style={styles.profileNameText}>Add Remark</Text>
                  </View>
                </View>
                <View style={{ marginHorizontal: '5%', marginTop: 15 }}>
                  <TextInputBox
                    placeholder={"Remarks/Comments"}
                    height={45}
                    value={this.state.remarkValue}
                    onChangeText={(value) => this.onChangeRemark(value)}
                  />
                  <View style={{ marginTop: 15, flexDirection: 'row', }}>
                    {this.state.remarkLoader ?
                      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                      </View> :
                      <>
                        <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, padding: 8, justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 12 }} onPress={() => this._onRemarkCancel()} activeOpacity={0.9}>
                          <Text style={{ color: '#fff', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={{ width: 8 }} />
                        <TouchableOpacity style={{ backgroundColor: Color.COLOR.RED.AMARANTH, padding: 8, justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 12 }} onPress={() => this._onRemarkSubmit()} activeOpacity={0.9}>
                          <Text style={{ color: '#fff', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Submit</Text>
                        </TouchableOpacity>
                      </>
                    }
                  </View>
                </View>
              </View>
            }
          />

        </View>
      )
    }



    return (
      <SafeAreaView style={CustomStyle.container}>
        <React.Fragment>
          <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />

          {/* {this.state.listDataLoader ?
            <View style={{ height: Dimension.height / 1.2, justifyContent: 'center', alignItems: 'center' }}>
              <Loader />
            </View> : */}
          {/* <React.Fragment> */}
          {this.state.pageLoader ?
            <View>
              {/* <Loader /> */}
              <SkeletonPlaceholder>
                {this.listHeaderSection()}
                <ScrollView showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true}>
                  <View style={{ marginHorizontal: "7%" }}>
                    {this.ViewSkeletonPlaceholder()}
                  </View>
                </ScrollView>
              </SkeletonPlaceholder>
            </View>
            :
            <React.Fragment>
              {this.listHeaderSection()}
              {this.state.leadList.length > 0 ? (
                <React.Fragment>
                  <FlatList
                    data={this.state.leadList}
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
                  {this.state.initialApiCall ? <View style={{ flex: 1, marginTop: 20 }}>
                    <NoDataFound />
                  </View>
                    :
                    null}

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
                : null
              }
              {/* {this.state.showHideCheckBox ?
                null
                :
                <>
                  {this.state.moduleSettingData.crm_leadAddPem == 1 ?
                    <FloatingButton
                      navigation={this.props.navigation.navigate}
                    />
                    :
                    null
                  }

                </>

              } */}
            </React.Fragment>}
          {/* </React.Fragment>} */}
        </React.Fragment>
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
      stateUserInformation,
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadList);
