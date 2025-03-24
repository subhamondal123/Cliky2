import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text
} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Color, Dimension, ImageName } from "../../enums";
import { Loader, LottyViewLoad } from "../../shared";
import LottieViewLoad from "../../shared/lottieViewLoad";
import styles from "./style";
import * as Progress from 'react-native-progress';
import ProgressModal from "./sub-component/progressModal";
import MapFilterModal from "./sub-component/mapFilterModal";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { DateConvert, Toaster } from "../../services/common-view-function";
import { modifyBeatRouteData, modifyLiveTruckingData, modifySalesData, modifyUserMapedData } from "./Function";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  stateCheckForNetwork,
  stateUserInformation
} from '../../redux/Sales360Action';

const Data = [
  {
    id: 1,
    name: 'Live Tracking',
    img: ImageName.TASK_SQUARE
  },
  {
    id: 2,
    name: 'Beat Route',
    img: ImageName.RIGHTICON
  },
  {
    id: 3,
    name: 'Sales',
    img: ImageName.SUBMIT_LOGO
  },
  {
    id: 4,
    name: 'Explore New Area',
    img: ImageName.STAR
  }
]


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationdata: {},
      allTabData: Data,
      selectedTab: {},
      progressModal: false,
      filterVisibility: false,


      pageloader: true,
      mapLoader: true,
      listDataLoader: true,
      polylineArr: [],
      userLocationArr: [],
      locationAreaRegion: {
        latitude: 0.000,
        longitude: 0.000
      },
      salesMapData: {},
      viewCountLiveTrackData: {},

      // for filter
      stateId: "",
      districtId: "",
      zoneId: "",
      designationId: "",
      rating: "",
      selectDate: DateConvert.formatYYYYMMDD(new Date()),
      employeeId: "",
      selectHeaderIndex: 0,
      filterLoader: true,

      selectedUserInfo: {},
      beatRouteData: {},

      // sales section
      salesTotalCount: 0,
      dealerCount: 0,
      subDealerCount: 0,
      distributorCount: 0,
      hierarchyArr: [],
      selesData: {}
    }
  }
  componentDidMount() {
    this.load();
  }

  load = async () => {
    await this.onSelectChipTab(this.state.allTabData[0], 0);
    StoreUserOtherInformations("", {}, this.props);
    // await this._onApiData();
    // await this._onApiCallForTab(0);
  }


  _onApiData = async () => {
    let responseData = await MiddlewareCheck("mapUserLocationMapping", {}, this.props);
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let mapData = modifyUserMapedData(responseData.data.data);
        this.state.polylineArr = mapData.polylineArr;
        this.state.userLocationArr = mapData.userLocationArr;
        this.state.locationAreaRegion = mapData.locationAreaRegion;
        this.state.salesMapData = mapData.salesMapData;
        this.setState(this.state);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
  }


  // api calling with respect to tab selection
  _onApiCallForTab = async (index) => {
    if (index == 0) {
      // for live tracking api call
      await this._onApiLiveTrackingData();
    } else if (index == 1) {
      await this._onApiBeatRouteData();
    } else if (index == 2) {
      await this._onApiSalesData();
    } else if (index == 3) {

    }
    this.state.pageloader = false;
    this.state.mapLoader = false;
    this.state.listDataLoader = false;
    this.state.filterLoader = false;
    this.setState(this.state);
  }

  // Api call for get the beat route
  _onApiBeatRouteData = async () => {
    let responseData = await MiddlewareCheck("getVisitMap", {
      date: this.state.selectDate,
      requserId: this.state.employeeId
    }, this.props);
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let mapData = await modifyBeatRouteData(responseData.data);
        this.state.polylineArr = mapData.polylineArr;
        this.state.userLocationArr = mapData.userLocationArr;
        this.state.locationAreaRegion = mapData.locationAreaRegion;
        this.state.beatRouteData = mapData;
        this.setState(this.state);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
  }

  // Api call for Live Tracking
  _onApiLiveTrackingData = async () => {
    let responseData = await MiddlewareCheck("mapUserLocationMapping", {
      stateId: this.state.stateId,
      districtId: this.state.districtId,
      zoneId: this.state.zoneId,
      designationId: this.state.designationId,
      rating: this.state.rating
    }, this.props);
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let mapData = await modifyLiveTruckingData(responseData.data.data);
        this.state.polylineArr = mapData.polylineArr;
        this.state.userLocationArr = mapData.userLocationArr;
        this.state.locationAreaRegion = mapData.locationAreaRegion;
        this.state.viewCountLiveTrackData = mapData.viewCountData;
        this.setState(this.state);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
  }


  // Api call for Sales data
  _onApiSalesData = async () => {
    let responseData = await MiddlewareCheck("getCrmMap", {
      stateId: this.state.stateId,
      districtId: this.state.districtId,
      zoneId: this.state.zoneId
    }, this.props);
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let mapData = await modifySalesData(responseData.data);
        this.state.polylineArr = mapData.polylineArr;
        this.state.userLocationArr = mapData.userLocationArr;
        this.state.locationAreaRegion = mapData.locationAreaRegion;
        this.state.salesTotalCount = mapData.salesTotalCount;
        this.state.dealerCount = mapData.dealerCount;
        this.state.subDealerCount = mapData.subDealerCount;
        this.state.distributorCount = mapData.distributorCount;
        this.state.hierarchyArr = mapData.hierarchyArr;
        this.state.selesData = mapData;
        this.setState(this.state);
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
  }

  // for set filter state data
  _setInitialStateData = async (type) => {
    this.state.stateId = "";
    this.state.districtId = "";
    this.state.zoneId = "";
    this.state.designationId = "";
    this.state.rating = "";
    this.state.selectDate = DateConvert.formatYYYYMMDD(new Date());
    if (type == "Normal") {
      this.state.employeeId = "";
    }
    this.setState(this.state);
  }

  // select the tab
  onSelectChipTab = async (item, key) => {
    this.state.mapLoader = true;
    this.state.listDataLoader = true;
    this.state.selectedTab = item;
    this.state.selectHeaderIndex = key;
    this.setState(this.state);
    await this._setInitialStateData("Normal");
    await this._onApiCallForTab(key);
    this.state.mapLoader = false;
    this.state.listDataLoader = false;
    this.setState(this.state);
  }


  // select the for live tracking to beat route
  onSelectChipTabLiveToBeat = async (item, key) => {
    this.state.mapLoader = true;
    this.state.listDataLoader = true;
    this.state.selectedTab = item;
    this.state.selectHeaderIndex = key;
    this.setState(this.state);
    await this._setInitialStateData("Select");
    await this._onApiCallForTab(key);
    this.state.mapLoader = false;
    this.state.listDataLoader = false;
    this.setState(this.state);
  }


  _onOpenAndCloseProgressModal = () => {
    this.setState({
      progressModal: !this.state.progressModal
    })
  }

  onRequestCloseModal = () => {
    this._onOpenAndCloseProgressModal();
  }

  _onFilterShowHide = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility
    })
  }


  goBack = () => {
    this.props.navigation.goBack()
  }

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }


  // set the state data for filter
  _setDataForFilter = async (data) => {
    if (this.state.selectedTab.id == 1) {
      this.state.stateId = data.state.id;
      this.state.districtId = data.dist.id;
      this.state.zoneId = data.zone.id;
      this.state.designationId = data.employeeType.id;
    } else if (this.state.selectedTab.id == 2) {
      this.state.employeeId = data.employeeId.id;
      this.state.selectDate = DateConvert.formatYYYYMMDD(data.visitDate.rawDate)
    } else if (this.state.selectedTab.id == 3) {
      this.state.stateId = data.state.id;
      this.state.districtId = data.dist.id;
      this.state.zoneId = data.zone.id;
    }
    this.setState(this.state);
  }

  // for apply the filter
  _onApplyFilter = async (value) => {
    this.state.pageloader = true;
    this.state.mapLoader = true;
    this.state.listDataLoader = true;
    this.state.filterVisibility = false;
    this.setState(this.state);
    await this._setDataForFilter(value);
    if (this.state.selectedTab.id == 3) {
      await this._onSelesDataChangeForFilter(value);
    } else {
      this._onApiCallForTab(this.state.selectHeaderIndex);
    }
  }

  // for show data for seles
  _onSelesDataChangeForFilter = async (data) => {
    if (data.customerType == "lead") {
      this.state.polylineArr = this.state.selesData.lead.leadPolylineArr;
      this.state.userLocationArr = this.state.selesData.lead.leadUserLocationArr;
      this.state.locationAreaRegion = this.state.selesData.lead.leadLocationAreaRegion;
      this.state.salesTotalCount = this.state.selesData.lead.leadObjData.total;
      this.state.dealerCount = this.state.selesData.lead.leadObjData.contact.Dealer;
      this.state.subDealerCount = this.state.selesData.lead.leadObjData.contact["Sub-Dealer"];
      this.state.distributorCount = this.state.selesData.lead.leadObjData.contact.Distributor;
      this.state.hierarchyArr = [{ "percent": this.state.selesData.lead.leadObjData.percent, "type": "Lead", color: "#8db600" }];
    } else if (data.customerType == "enquiry") {
      this.state.polylineArr = this.state.selesData.enquery.enqueryPolylineArr;
      this.state.userLocationArr = this.state.selesData.enquery.enqueryUserLocationArr;
      this.state.locationAreaRegion = this.state.selesData.enquery.enqueryLocationAreaRegion;
      this.state.salesTotalCount = this.state.selesData.enquery.enqueryObjData.total;
      this.state.dealerCount = this.state.selesData.enquery.enqueryObjData.contact.Dealer;
      this.state.subDealerCount = this.state.selesData.enquery.enqueryObjData.contact["Sub-Dealer"];
      this.state.distributorCount = this.state.selesData.enquery.enqueryObjData.contact.Distributor;
      this.state.hierarchyArr = [{ "percent": this.state.selesData.enquery.enqueryObjData.percent, "type": "Enquiry", color: "#FF0000" }];
    } else if (data.customerType == "opportunity") {
      this.state.polylineArr = this.state.selesData.opportunity.opportunityPolylineArr;
      this.state.userLocationArr = this.state.selesData.opportunity.opportunityUserLocationArr;
      this.state.locationAreaRegion = this.state.selesData.opportunity.opportunityLocationAreaRegion;
      this.state.salesTotalCount = this.state.selesData.opportunity.opportunityObjData.total;
      this.state.dealerCount = this.state.selesData.opportunity.opportunityObjData.contact.Dealer;
      this.state.subDealerCount = this.state.selesData.opportunity.opportunityObjData.contact["Sub-Dealer"];
      this.state.distributorCount = this.state.selesData.opportunity.opportunityObjData.contact.Distributor;
      this.state.hierarchyArr = [{ "percent": this.state.selesData.opportunity.opportunityObjData.percent, "type": "Opportunity", color: "#0000FF" }];
    } else if (data.customerType == "closed") {
      this.state.polylineArr = this.state.selesData.closed.closedPolylineArr;
      this.state.userLocationArr = this.state.selesData.closed.closedUserLocationArr;
      this.state.locationAreaRegion = this.state.selesData.closed.closedLocationAreaRegion;
      this.state.salesTotalCount = this.state.selesData.closed.closedObjData.total ? this.state.selesData.closed.closedObjData.total : 0;
      this.state.dealerCount = this.state.selesData.closed.closedObjData.contact.Dealer ? this.state.selesData.closed.closedObjData.contact.Dealer : 0;
      this.state.subDealerCount = this.state.selesData.closed.closedObjData.contact["Sub-Dealer"] ? this.state.selesData.closed.closedObjData.contact["Sub-Dealer"] : 0;
      this.state.distributorCount = this.state.selesData.closed.closedObjData.contact.Distributor ? this.state.selesData.closed.closedObjData.contact.Distributor : 0;
      this.state.hierarchyArr = [{ "percent": this.state.selesData.closed.closedObjData.percent ? this.state.selesData.closed.closedObjData.percent : 0, "type": "Recently Converted", color: "#fc8a3f" }];
    }
    this.state.pageloader = false;
    this.state.mapLoader = false;
    this.state.listDataLoader = false;
    this.setState(this.state);
  }


  // marker section for view the marker
  markerSection = () => {
    return (
      <React.Fragment>
        {this.state.selectedTab.id == 1 ? this._onLiveLocationMarkers() : null}
        {this.state.selectedTab.id == 2 ? this._onBeatRouteMarkers() : null}
        {this.state.selectedTab.id == 3 ? this._onSalesMarkers() : null}
      </React.Fragment>
    )
  }

  // for select the item from map for beat route
  _onSelectMarkFromLiveLocationMark = async (item, key) => {
    this.state.selectedUserInfo = item;
    this.state.employeeId = item.userId;
    this.setState(this.state);
    await this.onSelectChipTabLiveToBeat(this.state.allTabData[1], 1);
  }

  // for live tracking marker
  _onLiveLocationMarkers = () => {
    return (
      <React.Fragment>
        {this.state.userLocationArr.map((item, key) => (
          <Marker.Animated
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
            image={{ uri: item.image }}
            title={item.title}
            description={item.description}
            pinColor={item.color}
            key={key}
            onPress={(value) => this._onSelectMarkFromLiveLocationMark(item, key)}
          />
        ))}
      </React.Fragment>
    )
  }

  // for view the mark for beat routes

  _onBeatRouteMarkers = () => {
    return (
      <React.Fragment>
        {this.state.userLocationArr.map((item, key) => (
          <Marker
            title={"(" + (key + 1) + ") " + item.title}
            description={item.description}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
            pinColor={item.color}
            key={key}
          />
        ))}

        <Polyline
          coordinates={this.state.polylineArr}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={2}
        />
      </React.Fragment>
    )
  }


  onPressMarker = (data) => {
    if (this.state.selectedTab.id == 3) {
      this._onOpenAndCloseProgressModal()
    }
  }


  // sales marker view section
  _onSalesMarkers = () => {
    return (
      <React.Fragment>
        {this.state.userLocationArr.map((item, key) => (
          <Marker.Animated
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
            title={item.title}
            description={item.description}
            pinColor={item.color}
            key={key}
            onPress={(value) => this.onPressMarker(item, key)}
          />
        ))}
      </React.Fragment>
    );
  }



  // for live tracking view
  _liveTrackingView = () => {
    return (
      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
        <View style={{ marginTop: 15, height: 100, }}>
          <View style={styles.fieldForceSection}>
            <Text style={styles.boxAboveText}>{this.state.viewCountLiveTrackData.fieldForce}</Text>
            <Text style={styles.boxBelowText}>Field Force</Text>
          </View>
        </View>
        <View style={{ marginTop: 15, height: 100, flexDirection: 'row' }}>
          <View style={styles.boxSection}>
            <Text style={styles.boxAboveText}>{this.state.viewCountLiveTrackData.onDuty}</Text>
            <Text style={styles.boxBelowText}>On Duty</Text>
          </View>
          <View style={{ width: 15 }} />
          <View style={styles.boxSection}>
            <Text style={styles.boxAboveText}>{this.state.viewCountLiveTrackData.absent}</Text>
            <Text style={styles.boxBelowText}>Absent</Text>
          </View>
        </View>
        <View style={{ marginTop: 15, height: 100, flexDirection: 'row' }}>
          <View style={styles.boxSection}>
            <Text style={styles.boxAboveText}>{this.state.viewCountLiveTrackData.onLeave}</Text>
            <Text style={styles.boxBelowText}>On Leave</Text>
          </View>
          <View style={{ width: 15 }} />
          <View style={styles.boxSection}>
            <Text style={styles.boxAboveText}>{this.state.viewCountLiveTrackData.late}</Text>
            <Text style={styles.boxBelowText}>Late</Text>
          </View>
        </View>
      </View>
    )
  }

  // for map loader
  _onMapLoader = () => {
    return (
      <View style={[styles.mapPortionView, { backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE }]}>
        <Loader />
      </View>
    )
  }


  render() {

    let filterType = null;
    if (this.state.selectedTab.id == 1) {
      filterType = "liveLocation";
    } else if (this.state.selectedTab.id == 2) {
      filterType = "beatRoute";
    } else if (this.state.selectedTab.id == 3) {
      filterType = "sales";
    }

    return (
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        {this.state.filterLoader ?
          null :
          <MapFilterModal
            isVisible={this.state.filterVisibility}
            onCloseModal={() => this._onFilterShowHide()}
            type={filterType}
            applyFilterData={(value) => this._onApplyFilter(value)}
            props={this.props}
          />
        }
        {this.state.pageloader ?
          <Loader /> :
          <React.Fragment>
            <ProgressModal isActive={this.state.progressModal} onRequestClose={() => this.onRequestCloseModal()} props={this.props} />
            {this.state.mapLoader ?
              <React.Fragment>
                {this._onMapLoader()}
              </React.Fragment> :
              <React.Fragment>
                <View style={[styles.mapPortionView, this.state.selectedTab.id == 4 ? { height: Dimension.height } : {}]}>
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                      ...this.state.locationAreaRegion,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }}
                    zoomControlEnabled
                  // showsUserLocation={true}
                  // showsMyLocationButton={true}
                  // followsUserLocation={true}
                  // showsCompass={true}
                  // scrollEnabled={true}
                  // zoomEnabled={true}
                  // pitchEnabled={true}
                  // rotateEnabled={true}
                  >
                    {this.markerSection()}
                  </MapView>
                  <View style={styles.headerAbsoluteView}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={styles.backPortion}
                        activeOpacity={0.9}
                        onPress={this.goBack}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                      </TouchableOpacity>
                      <View style={styles.absoluteTextView}>
                        <LottyViewLoad type={"cyclePoint"} height={40} width={40} />
                        <Text style={styles.absoluteText}>{this.state.selectedTab.name}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.filterPortion}
                        activeOpacity={0.9}
                        onPress={() => this._onFilterShowHide()}
                      >
                        <Image source={ImageName.FILTER_LOGO} style={styles.backImg} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {this.state.allTabData.map((item, key) => (
                          <TouchableOpacity
                            style={[item.id == this.state.selectedTab.id ? styles.smallChipBoxSelected : styles.smallChipBox, { marginRight: item.id == this.state.allTabData.length ? 10 : null }]}
                            activeOpacity={0.9}
                            key={key}
                            onPress={() => this.onSelectChipTab(item, key)}>
                            <Image source={item.img} style={styles.smallChipBoxIcon} />
                            <View style={{ width: 5 }} />
                            <Text style={styles.smallChipBoxText}>{item.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </React.Fragment>
            }
            {this.state.selectedTab.id == 4 ?
              null :
              <View style={{ height: Dimension.height / 2, backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                  {/* for live location tracking */}
                  {this.state.selectedTab.id == 1 ? <React.Fragment>{this._liveTrackingView()}</React.Fragment> : null}

                  {/* for beat route view */}
                  {this.state.selectedTab.id == 2 ? <React.Fragment>{this._bestRouteView()}</React.Fragment> : null}

                  {/* For Sales view */}
                  {this.state.selectedTab.id == 3 ? <React.Fragment>{this._salesView()}</React.Fragment> : null}

                </ScrollView>
              </View >
            }
          </React.Fragment>
        }
      </SafeAreaView >
    )
  }


  // for best route view 
  _bestRouteView = () => {
    return (
      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
        {this.state.listDataLoader ?
          <View style={{ marginHorizontal: '10%', marginVertical: '10%' }}>
            {/* <Loader /> */}
          </View> :
          <React.Fragment>
            {this.state.employeeId.length == 0 ?
              <React.Fragment /> :
              <React.Fragment>
                {/* for Margin Type Count section */}
                <View style={{ marginTop: 15, }}>
                  {this.state.beatRouteData.visitType.map((item, key) => (
                    <View style={{ height: 70, flexDirection: 'row' }} key={key}>
                      {item.map((subItem, subKey) => (
                        <React.Fragment key={subKey}>
                          <View style={[subKey == 0 ? styles.leftBoxSection : styles.rightBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                            <Text style={styles.boxAboveText}>{subItem.name}-{subItem.value}</Text>
                          </View>
                          {subKey == 0 ?
                            <View style={{ width: 1 }} /> :
                            null
                          }
                        </React.Fragment>
                      ))}
                    </View>
                  ))}
                  {this.state.beatRouteData.visitType.length == 0 ?
                    null :
                    <View style={{ marginTop: 1, height: 60, }}>
                      <LinearGradient colors={[Color.COLOR.BLUE.VIOLET_BLUE, Color.COLOR.YELLOW.GARGOYLE_GAS]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomBoxSection}>
                        <Text style={styles.boxBelowText}>Margin Type Count</Text>
                      </LinearGradient>
                    </View>
                  }
                </View>

                {/* Customer count section */}
                <View style={{ marginTop: 15, }}>
                  {this.state.beatRouteData.customer.map((item, key) => (
                    <View style={{ height: 70, flexDirection: 'row' }} key={key}>
                      {item.map((subItem, subKey) => (
                        <React.Fragment key={subKey}>
                          <View style={[key > 0 ? styles.middleBoxSection : subKey == 0 ? styles.leftBoxSection : styles.rightBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                            <Text style={styles.boxAboveText}>{subItem.name}-{subItem.value}</Text>
                          </View>
                          {subKey == 0 ?
                            <View style={{ width: 1 }} /> :
                            null
                          }
                        </React.Fragment>
                      ))}
                    </View>
                  ))}
                  {this.state.beatRouteData.customer.length == 0 ?
                    null :
                    <View style={{ marginTop: 1, height: 60, }}>
                      <LinearGradient colors={[Color.COLOR.BLUE.VIOLET_BLUE, Color.COLOR.YELLOW.GARGOYLE_GAS]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomBoxSection}>
                        <Text style={styles.boxBelowText}>Customer Count</Text>
                      </LinearGradient>
                    </View>
                  }
                </View>

                {/* For New Customer count section */}
                <View style={{ marginTop: 15, }}>
                  {this.state.beatRouteData.newcustomer.map((item, key) => (
                    <View style={{ height: 70, flexDirection: 'row' }} key={key}>
                      {item.map((subItem, subKey) => (
                        <React.Fragment key={subKey}>
                          <View style={[key > 0 ? styles.middleBoxSection : subKey == 0 ? styles.leftBoxSection : styles.rightBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                            <Text style={styles.boxAboveText}>{subItem.name}-{subItem.value}</Text>
                          </View>
                          {subKey == 0 ?
                            <View style={{ width: 1 }} /> :
                            null
                          }
                        </React.Fragment>
                      ))}
                    </View>
                  ))}
                  {this.state.beatRouteData.newcustomer.length == 0 ?
                    null :
                    <View style={{ marginTop: 1, height: 60, }}>
                      <LinearGradient colors={[Color.COLOR.BLUE.VIOLET_BLUE, Color.COLOR.YELLOW.GARGOYLE_GAS]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomBoxSection}>
                        <Text style={styles.boxBelowText}>New Customer Count</Text>
                      </LinearGradient>
                    </View>
                  }
                </View>

                {/* For Meeting Count section */}
                <View style={{ marginTop: 15, }}>
                  <View style={{ height: 70, flexDirection: 'row' }}>
                    <View style={[styles.leftBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                      <Text style={styles.boxAboveText}>MASON-0</Text>
                    </View>
                    <View style={{ width: 1 }} />
                    <View style={[styles.rightBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                      <Text style={styles.boxAboveText}>IFB-0</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 1, height: 60, }}>
                    <LinearGradient colors={[Color.COLOR.BLUE.VIOLET_BLUE, Color.COLOR.YELLOW.GARGOYLE_GAS]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomBoxSection}>
                      <Text style={styles.boxBelowText}>Meeting Count</Text>
                    </LinearGradient>
                  </View>
                </View>

                {/* for Influencer view section */}
                <View style={{ marginTop: 15 }}>
                  {this.state.beatRouteData.influencer.map((item, key) => (
                    <View style={[{ height: 70, flexDirection: 'row' }, key > 0 ? { marginTop: 1 } : null]} key={key}>
                      {item.map((subItem, subKey) => (
                        <React.Fragment key={subKey}>
                          <View style={[key > 0 ? styles.middleBoxSection : subKey == 0 ? styles.leftBoxSection : styles.rightBoxSection, { backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE }]}>
                            <Text style={styles.boxAboveText}>{subItem.name}-{subItem.value}</Text>
                          </View>
                          {subKey == 0 ?
                            <View style={{ width: 1 }} /> :
                            null
                          }
                        </React.Fragment>
                      ))}
                    </View>
                  ))}
                  {this.state.beatRouteData.influencer.length == 0 ?
                    null :
                    <View style={{ marginTop: 1, height: 60, }}>
                      <LinearGradient colors={[Color.COLOR.BLUE.VIOLET_BLUE, Color.COLOR.YELLOW.GARGOYLE_GAS]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomBoxSection}>
                        <Text style={styles.boxBelowText}>Total Influencer Count</Text>
                      </LinearGradient>
                    </View>
                  }
                </View>
              </React.Fragment>
            }
          </React.Fragment>
        }
      </View>
    )
  }

  // for sales view
  _salesView = () => {
    return (
      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
        <View style={{ marginTop: 15, }}>
          <View style={{ height: 50, flexDirection: 'row' }}>
            <LinearGradient colors={[Color.COLOR.BLUE.EBONY_CLAY, "#B2505C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
              <Text style={styles.boxBelowText}>Total Count</Text>
            </LinearGradient>
          </View>
          <View style={{ marginTop: 1, height: 70, }}>
            <View style={[styles.bottomBoxSection, { backgroundColor: Color.COLOR.BLUE.EBONY_CLAY }]}>
              <Text style={styles.boxAboveText}>{this.state.salesTotalCount}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 15, }}>
          <View style={{ height: 50, }}>
            <LinearGradient colors={[Color.COLOR.BLUE.EBONY_CLAY, "#B2505C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
              <Text style={styles.boxBelowText}>Type Count</Text>
            </LinearGradient>
          </View>
          <View style={{ marginTop: 1, height: 70, flexDirection: 'row' }}>
            <View style={[styles.bottomLeftBoxSection, { backgroundColor: Color.COLOR.BLUE.EBONY_CLAY }]}>
              <Text style={styles.boxAboveText}>DLR-{this.state.dealerCount}</Text>
            </View>
            <View style={{ width: 1 }} />
            <View style={[styles.middleBoxSection, { backgroundColor: Color.COLOR.BLUE.EBONY_CLAY }]}>
              <Text style={styles.boxAboveText}>DST-{this.state.subDealerCount}</Text>
            </View>
            <View style={{ width: 1 }} />
            <View style={[styles.bottomRightBoxSection, { backgroundColor: Color.COLOR.BLUE.EBONY_CLAY }]}>
              <Text style={styles.boxAboveText}>SD-{this.state.distributorCount}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 15, }}>
          <View style={{ height: 50, }}>
            {this.state.hierarchyArr.length > 0 ?
              <View style={[styles.topBoxSection, { backgroundColor: "#D3D3D3" }]}>
                <Text style={styles.boxBelowText}>Hierarchy</Text>
              </View> :
              null
            }
          </View>
          <View style={[styles.bottomBoxSection, { backgroundColor: "#c0c0c0", marginTop: 1 }]}>
            {this.state.hierarchyArr.map((item, key) => (
              <View style={{ paddingVertical: '2%', justifyContent: 'center', alignItems: 'center' }} key={key}>
                <Progress.Bar
                  progress={(item.percent / 100).toFixed(2)}
                  width={Dimension.width / 1.3}
                  color={item.color}
                  borderWidth={1}
                  height={15}
                  borderRadius={14}
                />
                <Text style={styles.boxBelowText}>{item.type}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }


}



const mapStateToProps = (state) => {
  const { chalobechoRedux } = state
  return { chalobechoRedux }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    stateCheckForNetwork,
    stateUserInformation
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);