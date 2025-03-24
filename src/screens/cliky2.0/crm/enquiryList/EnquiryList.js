import React from "react";
import { Color, ImageName } from "../../../../enums";
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
import { convertListData, enquiryModifyData, modCustomerData } from "./Function";
import Tooltip from "react-native-walkthrough-tooltip";
import { ApprovalModal, AssignedModal, AssignmentModal, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, LottyViewLoad, Modal, NoDataFound } from "../../../../shared";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import { App_uri } from "../../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";

const customerListData = [
  { "check": true, "id": 1, "name": "New" },
  { "check": false, "id": 2, "name": "Existing" }
]

const approvalStausData = [
  { "id": 1, "name": "Approved" },
  { "id": 2, "name": "Not Approved" }
]

class EnquiryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideData: false,
      refreshing: true,
      pageLoader: true,
      listLoader: false,
      actionTooltip: false,
      showHideCheckBox: false,
      showHideButton: false,
      selectAllCheckbox: false,
      selectedButton: "",
      selectItem: {},
      selectedContactItem: {},
      enquiryList: [],
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      selectedStatusDataObj: {},
      isVisibleStatusModal: false,
      isVisibleDeleteModal: false,
      isVisibleFavouriteModal: false,
      isVisibleEditModal: false,
      filterVisibility: false,
      messageTxt: "",
      statusLoader: false,
      downloadCheck: false,
      updateAssigneeModal: false,
      selectedAssignedObj: {},
      selectedDesignationObj: {},
      moduleSettingData: {},
      assignModal: false,
      // isEditPermission:false,
      // isDeletePermission:false,

      // for filter
      allFilterData: {
        enquirySource: "",
        enquirySourceActive: false,
        enquiryType: "",
        enquiryTypeActive: false,
        ownerName: "",
        ownerNameActive: false,
        ownerPhone: "",
        ownerPhoneActive: false,
        ownerEmail: "",
        ownerEmailActive: false,
        businessName: "",
        businessNameActive: false
      },
      // _________________
      initialApiCall: false,
      isApiCall: true,
      remarks: "",
      selectedCustomerObj: {},
      customerList: [],
      selectedEnquiry: {},
      approvalStatus: approvalStausData,
      selectApprovedObj: {},
      isApproveModal: false
    };
  }

  componentDidMount = async () => {
    await this._load();
    StoreUserOtherInformations("", {}, this.props);
  }

  _load = async () => {

    await this._apiCallRes();
    await this._fetchCustomerList();
  };

  _fetchCustomerList = async () => {
    let reqData = {
      "searchName": "",
      "masterMdouleTypeId": "20"
    }
    let responseData = await MiddlewareCheck("getAllSubordinatesOfUser", reqData, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let customerData = modCustomerData(responseData.response);
        this.state.customerList = customerData;
        this.setState({ customerList: this.state.customerList })
      }
    }
  }

  // onCheckPermission = async (data) => {
  //   if (data.crm_EnquiryDeletePem == "0") {
  //     this.st
  //   }
  // }

  storeInitialData = async () => {
    let enquiryData = await StorageDataModification.crmEnquiryListData({}, "get");
    if (enquiryData == null || enquiryData == undefined) {
      this.setState({ pageLoader: true })
    } else {
      this.setState({
        enquiryList: enquiryData.enquiryList,
        totalDataCount: enquiryData.totalCount,
        pageLoader: false
      })
    }
  }

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }

  _onBack = () => {
    this.props.navigation.goBack();
  };

  _apiCallRes = async () => {
    this.setState({ refreshing: false });
    let dataReq = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "searchName": "",
      "enquirySourceText": this.state.allFilterData.enquirySource ? this.state.allFilterData.enquirySource : "",
      "enquiryTypeText": this.state.allFilterData.enquiryType ? this.state.allFilterData.enquiryType : "",
      "enquirySourceId": "",
      "enquiryTypeId": "",
      "ownerNameText": this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
      "ownPhoneNoText": this.state.allFilterData.ownerPhone ? this.state.allFilterData.ownerPhone : "",
      "ownEmailText": this.state.allFilterData.ownerEmail ? this.state.allFilterData.ownerEmail : "",
      "businessNameText": this.state.allFilterData.businessName ? this.state.allFilterData.businessName : "",
      "searchFrom": "",
      "searchTo": "",
      "hierarchyDataIdArr": [],
      "approvedStatus": "",
      "isDownload": "0",
      "view": "list",
      "masterMdouleTypeId": "20"
    }
    await this.fetchListData(dataReq);
  }

  fetchListData = async (dataReq) => {
    let responseData = await MiddlewareCheck("fetchEnquiryList", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let enquiryListData = enquiryModifyData(responseData)
        if (enquiryListData.enquiryList.length == 0) {
          this.state.isApiCall = false;
        }
        this.setState({
          enquiryList: [...this.state.enquiryList, ...enquiryListData.enquiryList],
          totalDataCount: enquiryListData.totalCount
        })

      }
    }
    this.setState({
      pageLoader: false,
      listLoader: false,
    })
  }
  // ........................... all filter functionality ........................................................

  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility
    })
  }

  _onFilterWithApi = async (data) => {
    this.state.allFilterData.enquiryType = data.selectedEnquiryTypeObj.name ? data.selectedEnquiryTypeObj.name.toString() : "";
    this.state.allFilterData.enquirySource = data.selectedEnquiriesObj.name ? data.selectedEnquiriesObj.name.toString() : "";
    this.state.allFilterData.ownerName = data.ownerName ? data.ownerName : "",
      this.state.allFilterData.ownerPhone = data.ownerPhone ? data.ownerPhone : "",
      this.state.allFilterData.ownerEmail = data.ownerEmail ? data.ownerEmail : "",
      this.state.allFilterData.businessName = data.businessName ? data.businessName : "",
      this.setState({
        allFilterData: this.state.allFilterData
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
    this.state.allFilterData.enquirySource = "",
      this.state.allFilterData.enquiryType = "",
      this.state.allFilterData.ownerPhone = "",
      this.state.allFilterData.ownerEmail = "",
      this.state.allFilterData.ownerName = "",
      this.state.allFilterData.businessName = "",
      this.setState({ allFilterData: this.state.allFilterData })
  }

  // ............................................. all flatlist functionality ...............................................................

  onShowHideData = (item) => {
    let allItems = this.state.enquiryList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].enqueryId == item.enqueryId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.enquiryList = allItems;
    this.setState({ enquiryList: this.state.enquiryList })
  }

  // rendering the data
  renderEnquirList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{ flex: 1, marginHorizontal: '2%' }}>
          {this.dataList(item, key)}
        </View>
      </View>
    );
  };

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };

  ListData = (item, key) => {
    return (
      <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
        <View style={styles.mainBox}>
          <View style={[styles.blueBox,]}>
            <View style={styles.blueViewFlex}>
              <View style={styles.homeCircel}>
                <Image source={{ uri: App_uri.SFA_IMAGE_URI + item.profilePic }} style={styles.homeLogo} />
              </View>
              <TouchableOpacity style={{ marginLeft: "5%", flex: 1 }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.saiEnterprisesText, { flex: 1 }]} numberOfLines={2}>{item.enqueryTitle}</Text>
                  {item.isFavorite == "1" ? <React.Fragment>
                    <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                  </React.Fragment> : null}
                </View>

                {/* <Text style={styles.textDealer}>Source : {item.enquerySource}</Text> */}
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowHideData(item)}>
                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
              </TouchableOpacity>
              {this.state.showHideCheckBox ? <React.Fragment>
                <View style={styles.checkBoxView}>
                  {this.checkBoxList(item)}
                </View>
              </React.Fragment> : <React.Fragment>
                <View style={{ marginLeft: '2%' }}>
                  {this._onPressToolTip(item, key)}
                </View>
              </React.Fragment>}

            </View>
          </View>
          {item.showHide ? <React.Fragment>
            <View>
              <View style={styles.textFlexView}>
                <View style={styles.iconView}>
                  <Image source={ImageName.CONTACT_TYPE} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Create Date</Text>
                  <Text style={styles.textVisites}>{item.createdAt}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.CALENDER_LOGO} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>

                  <Text style={styles.headerText}>Email</Text>
                  <Text style={styles.textVisites}>{item.businessEmail}</Text>
                </View>
              </View>
              <View style={styles.textFlexView}>
                <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Address</Text>

                  <Text key={key} style={styles.textVisites} >{item.address}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Contact No</Text>
                  {(item.ownerPhoneNo.split(",")).map((obj, key) => (
                    <Text key={key} style={styles.textVisites}>{obj}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.textFlexView}>
                <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Employees</Text>

                  <Text key={key} style={styles.textVisites} >{item.numberOfEmployee}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Owner Name</Text>

                  <Text key={key} style={styles.textVisites} >{item.businessName}</Text>
                </View>
              </View>
              <View style={styles.textFlexView}>
                <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Approval Status</Text>

                  <Text key={key} style={styles.textVisites} >{item.approvedStatus}</Text>
                </View>
                {/* <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Owner Name</Text>

                  <Text key={key} style={styles.textVisites} >{item.businessName}</Text>
                </View> */}
              </View>
            </View>
          </React.Fragment> : null}
        </View>
      </View>
    )
  };

  //refresh list
  onRefresh = async () => {
    await this._onStatusChange();
    await this._apiCallRes();
  }
  // fetch more
  fetchMore = async () => {
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

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      enquiryList: [],
      refreshing: true,
      listLoader: true,
      pageLoader: true,
      isApiCall: true,
    })
  }
  // .................................................all tooltip functionality for single item .,.........................................

  _onDelete = (item) => {
    this._onDeleteModal(item);
    this.setState({
      enquiryList: convertListData(this.state.enquiryList, item)
    })
  };

  _onDeleteModal = (item) => {
    if (this.state.isVisibleDeleteModal == false && this.state.showHideCheckBox == false) {
      this.setState({
        isVisibleDeleteModal: true,
        selectedContactItem: item,
        selectedEnquiry: item
      });
    } else {
      this.setState({
        isVisibleDeleteModal: false,
        selectedEnquiry: item
      })
    }
  }

  _deleteItem = () => {
    let allItems = this.state.enquiryList,
      totalCount = this.state.totalDataCount;

    for (let i = 0; i < allItems.length; i++) {
      if (this.state.selectedContactItem.enqueryId == this.state.enquiryList[i].enqueryId) {
        allItems.splice(i, 1);
      }
    }
    this.state.enquiryList = allItems;
    this.state.totalDataCount = totalCount - 1;
    this.setState({
      enquiryList: this.state.enquiryList,
      totalDataCount: this.state.totalDataCount,
    });

    let idArr = [];
    idArr.push(this.state.selectedContactItem.enqueryId);
    this.deleteContactItem(idArr);
    this._onDeleteModal();
  }

  deleteContactItem = async (idArr) => {
    let reqData = {
      "type": 4,
      "typeIdArr": idArr
    }
    let responseData = await MiddlewareCheck("deleteMasterData", reqData, this.props);
    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
      Toaster.ShortCenterToaster(responseData.message)
    } else {
      Toaster.ShortCenterToaster(responseData.message)
    }
  }
  // ....................for edit......................
  _onEdit = (item) => {
    this._onEditModal(item);
    this.setState({
      enquiryList: convertListData(this.state.enquiryList, item)
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
    this.props.navigation.navigate("CreateAndEditEnquiry", { data: this.state.selectedContactItem, type: "edit" })
  }
  // ..........for status

  _onChangeStatus = (item) => {
    this._onStatusModal(item);
    this.setState({
      enquiryList: convertListData(this.state.enquiryList, item)
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

  // .............for mark favourite ................

  _onChangeFavourite = (item) => {
    this._onFavouriteModal(item);
    this.setState({
      enquiryList: convertListData(this.state.enquiryList, item)
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
    idArr.push(this.state.selectedContactItem.enqueryId.toString())
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

  // for view details of item
  _onViewDetails = (item) => {
    this.props.navigation.navigate("EnquiryDetails", { data: item, onReloadListPage: this.reloadPage, });
    this.setState({
      enquiryList: convertListData(this.state.enquiryList, item),
    });
  }

  _onAssignModal = (item) => {
    if (this.state.assignModal) {
      this.state.assignModal = false;
      this.setState({
        assignModal: this.state.assignModal,
        selectedEnquiry: item
      })
    } else {
      this.state.assignModal = true;
      this.state.enquiryList = convertListData(this.state.enquiryList, item);
      this.setState({
        assignModal: this.state.assignModal,
        selectedEnquiry: item
      })
    }
  }

  _onApproveModal = (item) => {
    if (this.state.isApproveModal) {
      this.state.isApproveModal = false;
      this.setState({
        isApproveModal: this.state.isApproveModal,
        selectedEnquiry: item
      })
    } else {
      this.state.isApproveModal = true;
      this.state.enquiryList = convertListData(this.state.enquiryList, item);
      this.setState({
        isApproveModal: this.state.isApproveModal,
        selectedEnquiry: item
      })
    }
  }


  // ......open list item tooltip ..........
  _onPressToolTip = (item) => {
    const OnClickTooltip = (item) => {
      this.setState({
        enquiryList: convertListData(this.state.enquiryList, item),
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
        case "assign":
          this._onAssignModal(item);
          break;
        case "approve":
          this._onApproveModal(item);
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
            {/* {this.state.moduleSettingData.crm_EnquiryEditPem == "0" ?
              null
              : */}
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("edit", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Edit</Text>
            </TouchableOpacity>
            {/* } */}
            {/* {this.state.moduleSettingData.crm_EnquiryDeletePem == "0" ?
              null
              : */}
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("delete", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Delete</Text>
            </TouchableOpacity>
            {/* } */}

            {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("status", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Status</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("assign", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Assign</Text>
            </TouchableOpacity>
            {item.approvedStatus == "Approved" ? null :
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("approve", item)}
                activeOpacity={0.7}
              >
                <Text style={styles.tooltipText}>Approve</Text>
              </TouchableOpacity>
            }

            {/* {item.isFavorite == "0" ? <React.Fragment>
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("favourite", item)}
                activeOpacity={0.7}

              >
                <Text style={styles.tooltipText}>{"Mark as Favourite"}</Text>
              </TouchableOpacity>
            </React.Fragment> : null} */}

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
  //.....................................for download section,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  // ..............open action header tooltip ............
  _TooltipDownloadAction = () => {
    const onClickDownloadActionTooltip = () => {
      this.setState({
        downloadCheck: !this.state.downloadCheck
      })
    }

    const OnDownload = async (type) => {

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
  // ................................................for all item list action tooltip functionality.............................................
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

  // ...........for list checkbox,,,,,,,

  onClickListCheckbox = (item) => {
    let allItems = this.state.enquiryList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].enqueryId == item.enqueryId) {
        allItems[i].tick = !(allItems[i].tick)
      }
    }
    this.state.enquiryList = allItems;
    this.setState({ enquiryList: this.state.enquiryList })
    this.showHideBottomButton();
  }

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

  // ................for close all actions.....................

  oncloseActions = () => {
    this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })

    let allItems = this.state.enquiryList;
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].tick = false;
    }
    this.state.enquiryList = allItems;
    this.setState({ enquiryList: this.state.enquiryList })
    this.showHideBottomButton();
  }

  // ......................for select all functionality.............

  onClickSelectAllItem = (type) => {
    let allItems = this.state.enquiryList;
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
    this.state.enquiryList = allItems;
    this.setState({ enquiryList: this.state.enquiryList })
    this.showHideBottomButton();
  }

  // ........................for bottom button............,,,,,,,,

  onSelectAction = (selectedButton) => {
    let allItems = this.state.enquiryList;
    let allMainItem = [];

    if (selectedButton == "delete") {
      let arrId = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == false) {
          allMainItem.push(allItems[i])
        } else {
          arrId.push(allItems[i].enqueryId)
        }
      }

      this.state.enquiryList = allMainItem;
      this.setState({ enquiryList: this.state.enquiryList })
      this.deleteContactItem(arrId)
    } else if (selectedButton == "assign") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].enqueryId)
        }
      }
    } else if (selectedButton == "status") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].enqueryId)
        }
      }
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
          disabled={this.state.showHideCheckBox || this.state.enquiryList.length < 1}
        >
          <Image
            source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
          />
        </TouchableOpacity>
      </Tooltip>
    )
  }
  // .......................................................*****************************..................................................
  showHideBottomButton = () => {
    let counter = 0;
    let btnCounter = 0;
    for (let i = 0; i < this.state.enquiryList.length; i++) {
      if (this.state.enquiryList[i].tick == false) {
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
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()}>
                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
              </TouchableOpacity>
              {/* </View> */}
            </React.Fragment> :
            <React.Fragment>
              <View style={styles.filter_action_btn}>
                <TouchableOpacity
                  style={styles.filterBtn}
                  activeOpacity={0.8}
                  onPress={() => this.onFilterOpenAndClose()}
                // disabled={this.state.showHideCheckBox || this.state.enquiryList.length < 1}
                >
                  <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                </TouchableOpacity>
                {/* <View style={{marginRight:5}}>
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
        "enquiryId": this.state.selectItem.enqueryId,
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

  _onUpdateAssigneeModal = (item) => {
    if (this.state.updateAssigneeModal) {
      this.state.updateAssigneeModal = false;
      this.setState({
        updateAssigneeModal: this.state.updateAssigneeModal
      })
    } else {
      this.state.updateAssigneeModal = true;
      this.state.enquiryList = convertListData(this.state.enquiryList, item);
      this.setState({
        updateAssigneeModal: this.state.updateAssigneeModal,
        enquiryList: this.state.enquiryList
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

  onChangeRemarks = (value) => {
    this.state.remarks = value;
    this.setState({ remarks: this.state.remarks });
  }

  onSelectCustomer = (value) => {
    this.state.selectedCustomerObj = value;
    this.state.selectedCustomerObj.id = value.id;
    this.setState({
      selectedCustomerObj: this.state.selectedCustomerObj
    })
    // this.clearFormData()
  }

  onAssign = async (data) => {
    let reqData = {
      "enquiryId": this.state.selectedEnquiry.enqueryId,
      "assignTo": data.selectedCustomer.id,
      "assignRemarks": data.remark,
      "assignDueDate": data.dueDate,
      "masterMdouleTypeId": "20"
    }
    if (reqData.assignTo == undefined || reqData.assignTo == null || reqData.assignTo.length == 0) {
      Toaster.ShortCenterToaster("Please Select Customer !")
    } else if (reqData.assignDueDate == undefined || reqData.assignDueDate == null || reqData.assignDueDate.length == 0) {
      Toaster.ShortCenterToaster("Please Select Due Date !")
    } else if (reqData.assignRemarks == undefined || reqData.assignRemarks == null || reqData.assignRemarks.length == 0) {
      Toaster.ShortCenterToaster("Please Enter Remarks !")
    } else {
      this.setState({ assignLoader: true });
      let responseData = await MiddlewareCheck("enquiryToLead", reqData, this.props);
      if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          this.setState({ assignModal: false });
          await this.onRefresh()
          Toaster.ShortCenterToaster(responseData.message)
        } else {
          Toaster.ShortCenterToaster(responseData.message)
        }
      }
    }
    this.setState({ assignLoader: false });
  }

  onApproveStatus = async (data) => {
    let reqData = {
      "enquiryId": this.state.selectedEnquiry.enqueryId,
      "approvedRemark": data.approvedRemark,
      "approvedStatus": data.approvedStatus,
      "locationDataArr": data.locationDataArr,
      "isExternal": this.state.selectedEnquiry == "" ? "0" : "1",
    }
    if (reqData.approvedStatus == undefined || reqData.approvedStatus == null || reqData.approvedStatus.length == 0) {
      Toaster.ShortCenterToaster("Please select Approval Status !")
    } else if (reqData.locationDataArr == undefined || reqData.locationDataArr == null || reqData.locationDataArr.length == 0) {
      Toaster.ShortCenterToaster("Please add Location !")
    } else if (reqData.approvedRemark == undefined || reqData.approvedRemark == null || reqData.approvedRemark.length == 0) {
      Toaster.ShortCenterToaster("Please add Remark !")
    } else {
      let responseData = await MiddlewareCheck("approveEnquiry", reqData, this.props);
      if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          this.setState({ isApproveModal: false });
          Toaster.ShortCenterToaster(responseData.message);
        }
      }
    }

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
            type={"crmEnquiriesList"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}
            props={this.props}
          />
          {/* <AssignedModal
            isVisible={this.state.updateAssigneeModal}
            onCloseModal={() => this._onUpdateAssigneeModal()}
            type={"enquiryList"}
            onUpdateButton={(value) => this._onUpdate(value)}
            props={this.props}
            data={this.state.selectItem}
          /> */}
          {this.state.assignModal ?
            <AssignmentModal
              isVisible={this.state.assignModal}
              onCloseModal={() => this._onAssignModal()}
              type={"enquiryList"}
              props={this.props}
              data={this.state.customerList}
              onAssignCustomer={(data) => this.onAssign(data)}
              assignLoader={this.state.assignLoader}
            />
            : null
          }
          {this.state.isApproveModal ?
            <ApprovalModal
              isVisible={this.state.isApproveModal}
              data={this.state.selectedEnquiry}
              onAccept={(data) => this.onApproveStatus(data)}
              onCancel={() => this._onApproveModal()}
            />
            :
            null
          }
        </View>
      )
    }

    return (
      <SafeAreaView style={CustomStyle.container}>
        <React.Fragment>
          <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
          {this.state.pageLoader ?
            <View>
              <SkeletonPlaceholder>
                {this.listHeaderSection()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  <View style={{ marginHorizontal: "7%" }}>
                    {this.ViewSkeletonPlaceholder()}
                  </View>
                </ScrollView>
              </SkeletonPlaceholder>
            </View>
            :
            <React.Fragment>
              {this.listHeaderSection()}

              {this.state.enquiryList.length > 0 ? (
                <React.Fragment>
                  <FlatList
                    data={this.state.enquiryList}
                    renderItem={(item, key) => this.renderEnquirList(item, key)}
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
                  <View style={{ flex: 1, marginTop: 20 }}>
                    <NoDataFound />
                  </View>
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
              {/* {this.state.moduleSettingData.crm_EnquiryAddPem == 1 ?
                <FloatingButton
                  navigation={this.props.navigation.navigate}
                />
                :
                null
              } */}

            </React.Fragment>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryList);
