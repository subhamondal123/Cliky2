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
import { contactModifyData, convertListData, modListData } from "./Function";
import Tooltip from "react-native-walkthrough-tooltip";
import { BigTextButton, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound } from "../../../../shared";
// import Header from "../../header";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { FileDownload, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { App_uri } from "../../../../services/config";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";


class ContactListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageViewVisible: false,
      imageUploadModal: false,
      showHideData: false,
      toolTip: false,
      isVisible: false,
      refreshing: true,
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
      contactList: [],
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
      selectedContactId: [],
      messageTxt: "",
      statusLoader: false,
      isVisibleFavouriteModal: false,
      downloadCheck: false,

      allFilterData: {
        name: "",
        email: "",
        phone: "",
        selectedContactTypeId: "",
        selectedStatusId: ""
      },
      // .................
      initialApiCall: false,
      isApiCall: true,
    };
  }

  componentDidMount = async () => {
    await this._load();
    // StoreUserOtherInformations("", {}, this.props);
  }

  _load = async () => {
    // await this.storeInitialData();
    await this._apiCallRes();
  };


  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }

  _apiCallRes = async () => {
    this.setState({ refreshing: false });
    let dataReq = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "searchName": "",
      "searchTextName": "",
      "searchTextPhone": "",
      "searchTextEmail": "",
      "searchContactTyp": "",
      "searchContactStatus": "",
      "searchFrom": "",
      "searchTo": "",
      "hierarchyDataIdArr": [
      ],
      "view": "list",
      "isDownload": "0",
    }
    let responseData = await MiddlewareCheck("fetchNewContactList", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let contactListData = contactModifyData(responseData.response);
        if (contactListData.contactList.length == 0) {
          this.state.isApiCall = false;
        }
        this.setState({
          contactList: [...this.state.contactList, ...contactListData.contactList],
          totalDataCount: contactListData.totalCount
        })

        await this.showHideBottomButton();
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
      "type": 3,
      "typeIdArr": idArr
    }
    let responseData = await MiddlewareCheck("deleteMasterData", reqData, this.props);
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
      contactList: convertListData(this.state.contactList, item)
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

    await this.oncloseActions();
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

  onClickListCheckbox = (item) => {
    let allItems = this.state.contactList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].contactId == item.contactId) {
        allItems[i].tick = !(allItems[i].tick)
      }
    }
    this.state.contactList = allItems;
    this.setState({ contactList: this.state.contactList })
    this.showHideBottomButton();
  }

  showHideBottomButton = () => {
    let counter = 0;
    let btnCounter = 0;
    for (let i = 0; i < this.state.contactList.length; i++) {
      if (this.state.contactList[i].tick == false) {
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
  _onChangeFavourite = (item) => {
    this.setState({
      contactList: convertListData(this.state.contactList, item)
    })
  }


  // rendering the data
  renderContactList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{ flex: 1, marginLeft: '2%' }}>
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
    let allItems = this.state.contactList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].contactId == item.contactId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.contactList = allItems;
    this.setState({ contactList: this.state.contactList })
  }

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  ListData = (item, key) => {
    return (
      <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
        <View style={styles.mainBox}>
          {/* <View style={[styles.blueBox, { backgroundColor: item.status == 1 ? Color.COLOR.BLUE.KIMBERLY : Color.COLOR.BLUE.STEEL_BLUE }]}> */}
          <View style={[styles.blueBox]}>

            <TouchableOpacity style={styles.blueViewFlex}
              activeOpacity={1}
              onPress={() => this.onShowHideData(item)}>
              <View style={styles.homeCircel}>
                <Image source={item.profilePic && item.profilePic.length > 0 ? { uri: App_uri.SFA_IMAGE_URI + item.profilePic } : ImageName.USER} style={styles.homeLogo} />
              </View>
              <TouchableOpacity style={{ marginLeft: "5%", flex: 0.9 }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.saiEnterprisesText, { flex: 1 }]} numberOfLines={1}>{item.contactName}</Text>
                  {item.isFavorite == "1" ? <React.Fragment>
                    <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                  </React.Fragment> : null}
                </View>
                <Text style={styles.textDealer} numberOfLines={1}>{"Account:" + item.organizationName}</Text>
              </TouchableOpacity>
              <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.arrowImg} />
              {this.state.showHideCheckBox ? <React.Fragment>
                <View style={styles.checkBoxView}>
                  {this.checkBoxList(item)}
                </View>
              </React.Fragment> : <React.Fragment>
                <View style={styles.addVisitsButton}>
                  {this._onPressToolTip(item, key)}
                </View>
              </React.Fragment>}

            </TouchableOpacity>
          </View>
          {item.showHide ? <React.Fragment>
            <View>

              <View style={[styles.textFlexView]}>
                <View style={styles.iconView}>
                  <Image source={ImageName.MAIL_ICON} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Email</Text>
                  <Text style={styles.textVisites}>{item.email}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Phone</Text>
                  <Text style={styles.textVisites}>{item.phoneNumber}</Text>
                </View>
              </View>
              <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>
                <View style={styles.iconView}>
                  <Image source={ImageName.CONVERT_CARD} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Create Date</Text>
                  <Text style={styles.textVisites}>{item.createdAt}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.CLIPBOARD_TICK} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Title</Text>
                  <Text style={styles.textVisites}>{item.title}</Text>
                </View>
              </View>
            </View>
          </React.Fragment> : null}
        </View>
      </View>
    )
  };

  // ......open list item tooltip ..........

  _onPressToolTip = (item) => {
    const OnClickTooltip = (item) => {
      this.setState({
        contactList: convertListData(this.state.contactList, item),
      });
    };

    const onContactTooltipClick = async (type, item) => {
      this.setState({
        selectItem: item,
        selectedButton: "else"
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
            {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("status", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Status</Text>
            </TouchableOpacity> */}
            {/* {item.isFavorite == "0" ? <React.Fragment>
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("favourite", item)}
                activeOpacity={0.7}
              >
                <Text style={styles.tooltipText}>Mark as Favourite</Text>
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

  // for delete contact item

  _onDelete = (item) => {
    this._onDeleteModal(item);
    this.setState({
      contactList: convertListData(this.state.contactList, item)
    })
  };

  _deleteItem = () => {
    for (let i = 0; i < this.state.contactList.length; i++) {
      if (this.state.selectedContactItem.contactId == this.state.contactList[i].contactId) {
        this.state.contactList.splice(i, 1);
      }
    }
    this.setState({
      contactList: this.state.contactList,
      totalDataCount: this.state.totalDataCount - 1
    });

    // let idArr = [];
    // idArr.push(this.state.selectedContactItem.contactId);
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
      contactList: convertListData(this.state.contactList, item)
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
    this.props.navigation.navigate("CreateAndEditContact", { data: this.state.selectedContactItem, type: "edit", onReloadPage: this.onRefresh })
  }

  // for view details of item
  _onViewDetails = (item) => {
    this.props.navigation.navigate("ContactDetails", { data: item, onChangeStatus: this._onChangeColorFromDetails })
    this.setState({
      contactList: convertListData(this.state.contactList, item)
    })
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
    idArr.push(this.state.selectedContactItem.contactId.toString())
    let dataReq = {
      "contactIdArr": idArr,
      "isFavorite": fav
    }

    this.setState({ statusLoader: true })
    let responseData = await MiddlewareCheck("changeMarkFavouriteStatusForContact", dataReq, this.props);

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

  _onChangeColorFromDetails = (value) => {
    let arr = this.state.contactList;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].contactId == value.contactId) {
        arr[i].status = value.statusObj.value;
      }
    }
    this.state.contactList = arr;
    this.setState({
      contactList: this.state.contactList
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
          disabled={this.state.showHideCheckBox || this.state.contactList.length < 1}
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
      showHideCheckBox: true,
      actionTooltip: false,
      selectedButton: type
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
    let allItems = this.state.contactList;
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].tick = false;
    }
    this.state.contactList = allItems;
    this.setState({ contactList: this.state.contactList })
    this.showHideBottomButton();
  }

  onSelectAction = (selectedButton) => {
    let allItems = this.state.contactList;
    let allMainItem = [];

    if (selectedButton == "delete") {
      let arrId = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == false) {
          allMainItem.push(allItems[i])
        } else {
          arrId.push(allItems[i].contactId)
        }
      }

      this.state.contactList = allMainItem;
      this.setState({ contactList: this.state.contactList })
      this.deleteContactItem(arrId);
    } else if (selectedButton == "assign") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].contactId)
        }
      }
    } else if (selectedButton == "status") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].contactId.toString())
        }
      }
      if (this.state.isVisibleStatusModal == false) {
        this.setState({
          isVisibleStatusModal: true,
        })
      } else {
        this.setState({
          isVisibleStatusModal: false,
        })
      }
      // this._onBulkChangeStatus(id,selectedButton);
      this.setState({
        selectedContactId: id
      })
    }
  }


  onClickSelectAllItem = (type) => {
    let allItems = this.state.contactList;
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
    this.state.contactList = allItems;
    this.setState({ contactList: this.state.contactList })
    this.showHideBottomButton();
  }

  // for contact filter,,,,,,
  // for filter with api call
  _onFilterWithApi = async (data) => {
    this.state.allFilterData.name = data.name ? data.name : "";
    this.state.allFilterData.phone = data.phone ? data.phone : "";
    this.state.allFilterData.email = data.email ? data.email : "";
    this.state.allFilterData.selectedContactTypeId = data.selectedContactTypeObj.id ? data.selectedContactTypeObj.id : "";
    this.state.allFilterData.selectedStatusId = data.selectedStatusObj.value ? data.selectedStatusObj.value.toString() : "";
    this.setState({ allFilterData: this.state.allFilterData });
    this.onFilterOpenAndClose();
    await this.onRefresh();
  }

  // for reset the filter
  _onReset = async () => {
    this.onFilterOpenAndClose();
    this.clearFilterData();
    await this.onRefresh();
  }

  clearFilterData = () => {
    this.state.allFilterData.name = "";
    this.state.allFilterData.phone = "";
    this.state.allFilterData.email = "";
    this.state.allFilterData.selectedContactTypeId = "";
    this.state.allFilterData.selectedStatusId = "";
    this.setState({ allFilterData: this.state.allFilterData });
  }


  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      isApiCall: true,
      contactList: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
      pageLoader: true
    })
  }

  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility,
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
        "searchTextName": this.state.allFilterData.name ? this.state.allFilterData.name : "",
        "searchTextPhone": this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
        "searchTextEmail": this.state.allFilterData.email ? this.state.allFilterData.email : "",
        "searchContactTyp": this.state.allFilterData.selectedContactTypeId ? this.state.allFilterData.selectedContactTypeId : "",
        "searchContactStatus": this.state.allFilterData.selectedStatusId ? this.state.allFilterData.selectedStatusId : "",

      }

      if (type == "csv") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForContact", dataReq, this.props);
        // await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.path.file);
        this.setState({ listDataLoader: false })
      }
      if (type == "excel") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForContact", dataReq, this.props);

        // await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.excelPath);
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
            {/* <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onActionTooltipClick("pdf")}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>PDF</Text>
            </TouchableOpacity> */}
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
                // disabled={this.state.showHideCheckBox || this.state.contactList.length < 1}
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
            </React.Fragment>
          }
        </View>
      </View>
    )
  }


  onAddContact = () => {
    this.props.navigation.navigate("CreateAndEditContact")
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


  render() {
    const ViewStatus = () => {
      const _onSelectStatus = (value) => {
        this.setState({
          selectedStatusDataObj: value
        })
      }
      const _onChangeStatusData = async () => {
        if (this.state.selectedButton == "status") {
          if (inputEmptyValidator(this.state.selectedStatusDataObj.id) == false) {
            Toaster.ShortCenterToaster("Please select status");
          } else {
            this.setState({
              statusModalLoader: true
            });
            let reqData = {
              contactId: this.state.selectedContactId,
              activeStatus: this.state.selectedStatusDataObj.value.toString()
            }
            let responseData = await MiddlewareCheck("changeContactStatus", reqData, this.props);
            if (responseData === false) {
              this._onNetworkError();
            } else {
              if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this._onStatusModal();
                this.onClickSelectAllItem("deSelectAll");
                this.onRefresh();
                this.setState({
                  showHideCheckBox: false
                })

                Toaster.ShortCenterToaster(responseData.message);
              } else {
                Toaster.ShortCenterToaster(responseData.message);
              }
            }
            this.setState({
              statusModalLoader: false,
              selectedStatusDataObj: {}
            });
          }
        } else {
          let selectedContact = this.state.selectedContactItem;
          if (inputEmptyValidator(this.state.selectedStatusDataObj.id) == false) {
            Toaster.ShortCenterToaster("Please select status")

          } else {
            if (selectedContact.status == this.state.selectedStatusDataObj.value.toString()) {
              this._onStatusModal();
            } else {
              this.setState({
                statusModalLoader: true
              });
              let contactIdArr = [];
              contactIdArr.push(selectedContact.contactId.toString())
              let reqData = {
                contactId: contactIdArr,
                activeStatus: this.state.selectedStatusDataObj.value.toString()
              }
              let responseData = await MiddlewareCheck("changeContactStatus", reqData, this.props);
              if (responseData === false) {
                this._onNetworkError();
              } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                  this.state.contactList = await modListData(this.state.contactList, selectedContact, this.state.selectedStatusDataObj.id);
                  this._onChangeColorFromDetails({ contactId: selectedContact.contactId, statusObj: this.state.selectedStatusDataObj })
                  this._onStatusModal();
                  this.onClickSelectAllItem("deSelectAll");
                  Toaster.ShortCenterToaster(responseData.message);
                } else {
                  Toaster.ShortCenterToaster(responseData.message);
                  // await this._load();
                }
              }
              this.setState({
                statusModalLoader: false,
                selectedStatusDataObj: {}
              });
            }
          }
        }


      }

      return (
        <View style={{ marginTop: 20 }}>
          <View style={{ marginHorizontal: "10%" }}>
            <DropdownInputBox
              selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : "0"}
              data={CommonData.COMMON.STATUS}
              onSelect={(value) => _onSelectStatus(value)}
              headerText={"Select Status"}
            />
          </View>

          <View style={{ marginHorizontal: '5%', marginTop: 20, flexDirection: 'row' }}>
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
                onPress={() => _onChangeStatusData()}
              />
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
              <View style={styles.modalview}>
                <View style={styles.modalHeaderSec}>
                  <View style={styles.marginView}>
                    <Text style={styles.profileNameText}>Change Status</Text>

                  </View>
                </View>
                {this.state.statusModalLoader ?
                  <View style={{ paddingVertical: 40, }}>
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
            type={"contact"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}
            props={this.props}
          />
        </View >
      )
    }

    return (
      <SafeAreaView style={CustomStyle.container} >
        <React.Fragment>
          <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
          {
            this.state.pageLoader ?
              <View >
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
                {this.state.contactList.length > 0 ? (
                  <React.Fragment>
                    <FlatList
                      data={this.state.contactList}
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
                    <View style={{ flex: 1, marginTop: 20 }}>
                      <NoDataFound />
                    </View>
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

                {/* {this.state.showHideCheckBox ?
                  null
                  :
                  <FloatingButton
                    navigation={this.props.navigation.navigate}
                  />
                } */}

              </React.Fragment>
          }
        </React.Fragment>
        {/* ................modal,,,,,,,,,, */}
        {modalSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactListPage);
