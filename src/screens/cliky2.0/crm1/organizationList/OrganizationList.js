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
import { convertListData, organizationModifyData } from "./Function";

import Tooltip from "react-native-walkthrough-tooltip";
import { BigTextButton, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound } from "../../../../shared";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck } from "../../../../services/middleware";
import { FileDownload, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { App_uri } from "../../../../services/config";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";


class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageViewVisible: false,
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
      selectedButton: "",
      selectItem: {},
      selectedOrgItem: {},
      organizationList: [],
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

      allFilterData: {
        organizationName: "",
        ownerName: "",
        contactType: "",
        phone: "",
        selectedStatusId: ""
      },
      // .................
      initialApiCall: false,
    };
  }

  componentDidMount = async () => {
    await this._load();
  }

  _load = async () => {
    await this.storeInitialData();
    await this._apiCallRes();
  };

  storeInitialData = async () => {

    let organizationData = await StorageDataModification.organizationListData({}, "get");
    if (organizationData == null || organizationData == undefined) {
      this.setState({ pageLoader: true })
    } else {
      this.setState({
        organizationList: organizationData.organizationList,
        totalDataCount: organizationData.totalCount,
        pageLoader: false
      })
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
      "searchTextOrgName": this.state.allFilterData.organizationName ? this.state.allFilterData.organizationName : "",
      "searchTextOwnerName": this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
      "searchTextContactType": this.state.allFilterData.contactType ? this.state.allFilterData.contactType : "",
      "searchTextState": "",
      "searchTextPhone": this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
      "status": this.state.allFilterData.selectedStatusId ? this.state.allFilterData.selectedStatusId : "",
    }
    let responseData = await MiddlewareCheck("organizationList", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (this.state.pageNum == 0) {
          let organizationData = await StorageDataModification.organizationListData({}, "get");
          let organizationListData = organizationModifyData(responseData.response);
          if (organizationData == null || organizationData == undefined) {
            this.setState({
              organizationList: organizationListData.organizationList,
              totalDataCount: organizationListData.totalCount
            })
            await StorageDataModification.organizationListData(organizationListData, "store");
          } else if (JSON.stringify(organizationData.organizationList) === JSON.stringify(organizationListData.organizationList)) {
            this.setState({
              organizationList: organizationListData.organizationList,
              totalDataCount: organizationListData.totalCount
            })
            if (organizationData.totalCount !== organizationListData.totalCount) {
              await StorageDataModification.organizationListData(organizationListData, "store");
            }
          } else {
            this.setState({
              organizationList: organizationListData.organizationList,
              totalDataCount: organizationListData.totalCount
            });
            await StorageDataModification.organizationListData(organizationListData, "store");
          }
          this.setState({ initialApiCall: true })
        } else {
          let organizationListData = organizationModifyData(responseData.response)
          this.setState({
            organizationList: [...this.state.organizationList, ...organizationListData.organizationList],
            totalDataCount: organizationListData.totalCount
          })
        }
        await this.showHideBottomButton();
      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.organizationListData({}, "clear");
          this.setState({
            pageNum: 0,
            limit: 0,
            totalDataCount: 0,
            organizationList: [],
            initialApiCall: true
          })
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
      organizationList: convertListData(this.state.organizationList, item)
    })
  }
  _onStatusModal = (item) => {
    if (this.state.isVisibleStatusModal == false && this.state.showHideCheckBox == false) {
      this.setState({
        isVisibleStatusModal: true,
        selectedOrgItem: item,
        selectedStatusDataObj: {}
      });
    } else {
      this.setState({
        isVisibleStatusModal: false,
        selectedStatusDataObj: {}
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

  _onFilterWithApi = async (data) => {
    this.state.allFilterData.organizationName = data.selectedName.name ? data.selectedName.name.toString() : "";
    this.state.allFilterData.ownerName = data.ownerName ? data.ownerName.toString() : "";
    this.state.allFilterData.contactType = data.contactType.id ? data.contactType.id : "",
      this.state.allFilterData.phone = data.phone ? data.phone : "",
      this.state.allFilterData.selectedStatusId = data.selectedStatusObj.value ? data.selectedStatusObj.value.toString() : "";
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

  //refresh list
  onRefresh = async () => {
    await this._onStatusChange();
    // await this._apiCallRes();
    await this._load()
  }

  clearFilterData = async () => {
    this.state.allFilterData.organizationName = "",
      this.state.allFilterData.ownerName = "",
      this.state.allFilterData.contactType = "",
      this.state.allFilterData.phone = "",
      this.state.allFilterData.selectedStatusId = ""
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
          if (this.state.organizationList.length >= this.state.totalDataCount) {
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
    let allItems = this.state.organizationList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].organizationId == item.organizationId) {
        allItems[i].tick = !(allItems[i].tick)
      }
    }
    this.state.organizationList = allItems;
    this.setState({ organizationList: this.state.organizationList })
    this.showHideBottomButton();
  }

  showHideBottomButton = () => {
    let counter = 0;
    let btnCounter = 0;
    for (let i = 0; i < this.state.organizationList.length; i++) {
      if (this.state.organizationList[i].tick == false) {
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

    this._onFavouriteModal(item);
    this.setState({
      organizationList: convertListData(this.state.organizationList, item)
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
    let allItems = this.state.organizationList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].organizationId == item.organizationId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.organizationList = allItems;
    this.setState({ organizationList: this.state.organizationList })
  }

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  ListData = (item, key) => {
    return (
      <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}>
        <View style={styles.mainBox}>
          <View style={[styles.blueBox]}>
            <View style={styles.blueViewFlex}>
              <View style={styles.homeCircel}>
                <Image source={{ uri: App_uri.IMAGE_VIEW_URI + "images/cbOrz.png" }} style={styles.homeLogo} />
              </View>
              <TouchableOpacity style={{ marginLeft: "5%", flex: 1 }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={[styles.saiEnterprisesText, { flex: 1 }]}>{item.organizationName}</Text>
                  {item.isFavorite == "1" ? <React.Fragment>
                    <Image source={ImageName.YELLOW_STAR} style={styles.starImg} />
                  </React.Fragment> : null}
                </View>
                <Text style={styles.textDealer}>{item.contactTypeName}</Text>
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
                  <View style={styles.addVisitsButton}>
                    {this._onPressToolTip(item, key)}
                  </View>
                </React.Fragment>
              }
            </View>
          </View>
          {item.showHide ? <React.Fragment>
            <View>
              <View style={styles.textFlexView}>
                <View style={styles.iconView}>
                  <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Phone</Text>
                  <Text style={styles.textVisites}>{item.phone}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.CLIPBOARD} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Status</Text>
                  <Text style={styles.textVisites}>{item.status == "1" ? "Active" : "Inactive"}</Text>
                </View>
              </View>
              <View style={[styles.textFlexView]}>
                <View style={styles.iconView}>
                  <Image source={ImageName.CONTACT_TYPE} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Owner</Text>
                  <Text style={styles.textVisites}>{item.ownerName}</Text>
                </View>
                <View style={styles.iconView}>
                  <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Location</Text>
                  {item.location.map((obj, key) => (
                    <Text style={styles.textVisites} key={key}>{obj.key + " : " + obj.name}</Text>

                  ))}
                </View>
              </View>
              <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>

                <View style={styles.iconView}>
                  <Image source={ImageName.CLIPBOARD_TICK} style={styles.iconImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerText}>Approval Status</Text>
                  <Text style={styles.textVisites}>{item.approvedStatus == "1" ? "Approved" : "Not Approved"}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  {/* <View style={styles.iconView}>
                    <Image source={ImageName.CONVERT_CARD} style={styles.iconImg} />
                  </View> */}
                  {/* <Text style={styles.headerText}>Conversion Status</Text>
                  <Text style={styles.textVisites}>{item.isConverted == "1" ? "Converted" : "Not Converted"}</Text> */}
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
        organizationList: convertListData(this.state.organizationList, item),
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

            {item.isFavorite == "0" ? <React.Fragment>
              <TouchableOpacity
                style={styles.tooltipListView}
                onPress={() => onContactTooltipClick("favourite", item)}
                activeOpacity={0.7}
              >
                <Text style={styles.tooltipText}>Mark as Favourite</Text>
                {/* <Text style={styles.tooltipText}>{item.isFavorite == "0" ? "Mark as Favourite" : "Remove from Favourite"}</Text> */}

              </TouchableOpacity>
            </React.Fragment> : null}

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
      organizationList: convertListData(this.state.organizationList, item)
    })
  };

  _deleteItem = () => {
    for (let i = 0; i < this.state.organizationList.length; i++) {
      if (this.state.selectedOrgItem.organizationId == this.state.organizationList[i].organizationId) {
        this.state.organizationList.splice(i, 1);
      }
    }
    this.setState({
      organizationList: this.state.organizationList,
      totalDataCount: this.state.totalDataCount - 1
    });

    // let idArr = [];
    // idArr.push(this.state.selectedOrgItem.organizationId);
    // this.deleteContactItem(idArr);
    this._onDeleteModal()
  }

  _onDeleteModal = (item) => {
    if (this.state.isVisibleDeleteModal == false && this.state.showHideCheckBox == false) {
      this.setState({
        isVisibleDeleteModal: true,
        selectedOrgItem: item
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
      organizationList: convertListData(this.state.organizationList, item)
    })

  }
  _onEditModal = (item) => {
    if (this.state.isVisibleEditModal == false && this.state.showHideCheckBox == false) {
      this.setState({
        isVisibleEditModal: true,
        selectedOrgItem: item
      });
    } else {
      this.setState({
        isVisibleEditModal: false,
      })
    }
  }

  _editItem = () => {
    this._onEditModal();
    this.props.navigation.navigate("CreateAndEditOrganization", { data: this.state.selectedOrgItem, type: "edit" })
  }

  // for view details of item
  _onViewDetails = (item) => {
    this.props.navigation.navigate("OrganizationDetails", { data: item, onChangeListItemStatus: this._onChangeStatusOfListItemFromDetails });
    this.setState({
      organizationList: convertListData(this.state.organizationList, item)
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
    idArr.push(this.state.selectedContactItem.organizationId.toString())
    let dataReq = {
      "orgIdArr": idArr,
      "isFavorite": fav
    }

    this.setState({ statusLoader: true })
    let responseData = await MiddlewareCheck("changeMarkFavouriteStatusForOrganization", dataReq, this.props);

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


  // .......show hide modal,,,,,,
  _onContactModal = (item) => {
    if (this.state.isVisible == false) {
      this.setState({
        isVisible: true,
        selectedOrgItem: item
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
          disabled={this.state.showHideCheckBox || this.state.organizationList.length < 1}
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

    let allItems = this.state.organizationList;
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].tick = false;
    }
    this.state.organizationList = allItems;
    this.setState({ organizationList: this.state.organizationList })
    this.showHideBottomButton();
  }

  onSelectAction = (selectedButton) => {
    let allItems = this.state.organizationList;
    let allMainItem = [];

    if (selectedButton == "delete") {
      let arrId = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == false) {
          allMainItem.push(allItems[i])
        } else {
          arrId.push(allItems[i].organizationId)
        }
      }

      this.state.organizationList = allMainItem;
      this.setState({ organizationList: this.state.organizationList })
      this.deleteContactItem(arrId)
    } else if (selectedButton == "assign") {
      let id = [];
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tick == true) {
          id.push(allItems[i].organizationId)
        }
      }
    } else if (selectedButton == "status") {
      // let id = [];
      // for (let i = 0; i < allItems.length; i++) {
      //   if (allItems[i].tick == true) {
      //     id.push(allItems[i].organizationId)
      //   }
      // }

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

    let allItems = this.state.organizationList;
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
    this.state.organizationList = allItems;
    this.setState({ organizationList: this.state.organizationList })
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

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      organizationList: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
      pageLoader: true
    })
  }


  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility
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
        "searchTextOrgName": this.state.allFilterData.organizationName ? this.state.allFilterData.organizationName : "",
        "searchTextOwnerName": this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
        "searchTextContactType": this.state.allFilterData.contactType ? this.state.allFilterData.contactType : "",
        "searchTextState": "",
        "searchTextPhone": this.state.allFilterData.phone ? this.state.allFilterData.phone : "",
        "status": this.state.allFilterData.selectedStatusId ? this.state.allFilterData.selectedStatusId : "",

      }

      if (type == "csv") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForOrganization", dataReq, this.props);
        await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + responseData.response.path.dir + responseData.response.path.file);
        this.setState({ listDataLoader: false })
      }
      if (type == "excel") {
        this.setState({ listDataLoader: true })
        let responseData = await MiddlewareCheck("downloadForOrganization", dataReq, this.props);
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
          {this.state.showHideCheckBox ? <React.Fragment>
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
          </React.Fragment> :
            <React.Fragment>

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
  onAddContact = () => {
    this.props.navigation.navigate("CreateAndEditOrganization")
  }

  _onChangeStatusOfListItemFromDetails = (item, statusValue) => {
    let arr = this.state.organizationList;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].organizationId == item.organizationId) {
        arr[i].status = statusValue;
      }
    }

    this.setState({
      organizationList: arr
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

  render() {
    const ViewStatus = () => {
      const _onSelectStatus = (value) => {
        this.setState({
          selectedStatusDataObj: value
        })
      }
      const _onChangeStatusData = async () => {
        let selectedItem = this.state.selectedOrgItem
        let errorCount = 0;
        if (inputEmptyValidator(this.state.selectedStatusDataObj.id) == false) {
          Toaster.ShortCenterToaster("Please select status")
          errorCount++;
        }

        if (errorCount === 0) {
          if (selectedItem.status == this.state.selectedStatusDataObj.value.toString()) {
            this._onStatusModal();
          } else {
            this.setState({
              statusModalLoader: true
            });

            // let id = [];
            // for (let i = 0; i < allItems.length; i++) {
            //   if (allItems[i].tick == true) {
            //     id.push(allItems[i].organizationId)
            //   }
            // }

            let selectedContact = this.state.selectedOrgItem;
            let id = [];
            if (this.state.showHideCheckBox) {
              let allItems = this.state.organizationList;
              for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                  id.push(allItems[i].organizationId.toString());
                }
              }
            } else {
              id = [selectedContact.organizationId.toString()];
            }

            let reqData = {
              organizationId: id,
              status: this.state.selectedStatusDataObj.value.toString()
            }
            let responseData = await MiddlewareCheck("updateOrganizationStatus", reqData, this.props);
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
                  this._onChangeStatusOfListItemFromDetails(selectedItem, reqData.status);

                  this._onStatusModal();
                }
              } else {
                Toaster.ShortCenterToaster(responseData.message);
              }
            }
            this.setState({
              statusModalLoader: false
            });
          }
        }
      }

      return (
        <View style={{}}>
          <View style={{ marginTop: 20, marginHorizontal: "5%" }}>
            <DropdownInputBox
              selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : "0"}
              data={CommonData.COMMON.STATUS}
              onSelect={(value) => _onSelectStatus(value)}
              headerText={"Select Status"}
              selectedText={this.state.selectedStatusDataObj.name ? this.state.selectedStatusDataObj.name : "Select Status"}
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
          <ListViewModal isVisible={this.state.isVisible} data={this.state.selectedOrgItem} onCloseModal={() => this._onContactModal(this.state.selectedOrgItem)} onRequestClose={() => this._onContactModal(this.state.selectedOrgItem)}
            onBackdropPress={() => this._onContactModal(this.state.selectedOrgItem)}
            onBackButtonPress={() => this._onContactModal(this.state.selectedOrgItem)}
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
                  <Text style={styles.profileNameText}>Change Status</Text>
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
            type={"organization"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}
            props={this.props}
          />
        </View>
      )
    }

    return (
      <SafeAreaView style={CustomStyle.container}>
        <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
        {this.state.pageLoader ?
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
          </View> :
          <React.Fragment>
            {this.listHeaderSection()}
            {this.state.organizationList.length > 0 ? (
              <React.Fragment>
                <FlatList
                  data={this.state.organizationList}
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
                  : null}

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
              </React.Fragment> : null}
            {/* {this.state.showHideCheckBox ?
              null
              :
              <FloatingButton
                navigation={this.props.navigation.navigate}
              />
            } */}
          </React.Fragment>}

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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationList);
