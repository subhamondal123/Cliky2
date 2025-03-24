import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import styles from './Style'
import Header from '../../header/Header'
import CommonModal from '../../../../shared/modal';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import { ChangeRouteModal, DynamicLocationMapping, OfficeActivityModal } from '../../../../pageShared';
import { OfflineFunction, StorageDataModification, Toaster } from '../../../../services/common-view-function';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { modOutletData, modifyLocationMappedData } from './Function';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateUserInformation,
    stateCheckForNetwork,
    userSelectedBeatRouteData
} from '../../../../redux/Sales360Action';
import { Loader, Modal, NoDataFound, TextInputBox } from '../../../../shared';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import _debounce from 'lodash/debounce';
import SvgComponent from '../../../../assets/svg';
import { DeviceInfo } from '../../../../services/config';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleModal: false,
            locationArr: [],
            locationLoader: false,

            limit: 10,
            offset: 0,
            searchText: "",
            listdata: [],
            isLoading: true,
            isApiCall: true,
            pageLoader: true,
            selectedRoute: {},
            refreshing: false,
            offlineProgressModal: false,
            isOffline: false,
            isVisibleChangeRouteModal: false,
            isVisibleOfficeModal: false,
        };
    }


    componentDidMount = async () => {
        // await this._getHierarchyTypesSlNo()
        // await this._load();

        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.onSelectInitialState();
                await this._load();
                // if (offlineCheck) {
                // if (this.props.route.params.flow == "fromRouteVisit") {
                //     await this.setProfileDataOffline();
                // }
                // }
            })
    }


    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            isVisibleModal: false,
            locationArr: [],
            locationLoader: false,
            isVisibleChangeRouteModal: false,
            isVisibleOfficeModal: false,
            limit: 10,
            offset: 0,
            searchText: "",
            listdata: [],
            isLoading: true,
            isApiCall: true,
            pageLoader: true,
            selectedRoute: {},
            refreshing: false,
            offlineProgressModal: false,
            isOffline: false

        })
    }

    _load = async () => {
        // let locationData = await StorageDataModification.mappedLocationData({}, "get");
        await this.fetchData()
    }

    fetchData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.offset * this.state.limit).toString(),
            "searchText": this.state.searchText
        }
        let responseData = await MiddlewareCheck("gn_getUserMappedLastLocationLevelData", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listArrData = modOutletData(responseData.response);
                if (listArrData.outletList && listArrData.outletList.length > 0) {
                    this.setState({ listdata: [...this.state.listdata, ...listArrData.outletList] });
                } else {
                    this.state.isApiCall = false;
                    this.setState(this.state);
                }
            }
        }
        this.state.isLoading = false;
        this.state.pageLoader = false;
        this.state.refreshing = false;
        this.setState(this.state);
    };

    onOpenModal = () => {
        // this.props.navigation.navigate("OutletDetail")
        this.state.isVisibleModal = true;
        this.setState(this.state);
    }

    onRequestCloseModal = () => {
        this.state.isVisibleModal = false;
        this.setState(this.state);
    }

    onSelectLocationData = (val) => {
        this.state.locationArr = val.value
        this.setState(this.state);
        // this.state.allPageData.orgLocationArr = val.totalData
        // this.state.locationArr = val.totalData;
        // this.state.locationObj = val.value;
        // this.setState({ allPageData: this.state.allPageData })
    }


    // for get the get Hierarchy Types With Sl No for country
    _getHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.countryMappedUserArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ locationLoader: false })

        return true;
    }

    _onProceed = async (item, key) => {
        this.state.searchText = "";
        this.setState(this.state);
        this.props.navigation.navigate("OutletDetail", { "heirarchyData": [{ "hierarchyDataId": item.hierarchyDataId, "hierarchyTypeId": item.hierarchyTypeId }] });
    }


    _modalSec = () => {
        return (
            <Modal
                isVisible={this.state.isVisibleModal}
                onRequestClose={() => this.onRequestCloseModal()}
                onBackdropPress={() => this.onRequestCloseModal()}
                onBackButtonPress={() => this.onRequestCloseModal()}
                children={
                    <View style={styles.modalview}>
                        <View style={{ paddingHorizontal: 10, justifyContent: "center" }}>
                            <React.Fragment>
                                <View style={{ justifyContent: "center", marginVertical: 10 }}>
                                    <Text style={styles.modalHeaderTxt}>Select Location</Text>
                                </View>
                                {this.state.locationLoader ?
                                    null :
                                    <>

                                        <DynamicLocationMapping
                                            // type={"lastHierarcyField"}
                                            // editData={this.props.allPageData.orgLocationArr}
                                            screenName={"Crm"}
                                            marginBottom={15}
                                            flexDirection={"column"}
                                            viewType={"edit"}
                                            isLabelVisible={false}
                                            onApiCallData={(value) => this.onSelectLocationData(value)}
                                        />
                                    </>
                                }
                            </React.Fragment>
                            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                <TouchableOpacity onPress={() => this._onProceed()} style={{ backgroundColor: "red", borderRadius: 10, alignSelf: "center", paddingHorizontal: 20, paddingVertical: 10 }}>
                                    <Text style={styles.selectedLocationTxt}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            />
        )
    }


    renderList = (item, index) => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                {this.listData(item.item, item.index)}
            </View>
        )
    }

    listData = (item, key) => {
        return (
            <View key={key}>
                <TouchableOpacity style={styles.greaySec} key={key} onPress={() => this._onProceed(item, key)} activeOpacity={0.8}>
                    <View style={styles.greayBox}>
                        <View style={styles.boxTextSec}>
                            <Text style={styles.reasonText}>{item.hmName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    fetchMore = async () => {
        if (this.state.isLoading) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { isLoading: true, offset: prevState.offset + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this.fetchData();
                } else {
                    this.setState({ isLoading: false })
                    return null;
                }
            }
        );
    };


    renderFooter = () => {
        if (this.state.isLoading) {
            return (
                <View style={{ marginBottom: 100 }}>
                    <Loader type={"normal"} />
                </View>
            )
        } else {
            return <View style={{ marginBottom: 100 }} />
        }
    };

    onRefresh = async () => {
        this.state.onRefresh = true;
        this.state.searchText = "";
        this.setState(this.state);
        await this.onSetChangeData()
        await this.fetchData();
    }

    // for change the state for refrace
    onSetChangeData = async () => {
        this.setState({
            limit: 10,
            offset: 0,
            listdata: [],
            isLoading: true,
            isApiCall: true,
            pageLoader: true,
            selectedRoute: {}
        })
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={{ marginHorizontal: '5%' }}>
                    <View style={[styles.greaySec, { marginVertical: 10 }]} key={i}>
                        <View style={styles.greayBox} />
                    </View>
                </View>

            )
        }
        return resData;
    }

    debouncedFetchData = _debounce(async () => {
        await this.fetchData(); // Pass the searchText to fetchData
    }, 400);


    searchSec = () => {
        const onSearch = async (val) => {
            this.setState({ searchText: val })
            await this.onSetChangeData()
            await this.debouncedFetchData()
        }
        const onPressSearchIcon = async () => {
            await this.onSetChangeData()
            await this.fetchData();
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', marginHorizontal: 20 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Route"}
                        // isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconDisabled={this.state.isLoading}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={42}
                        borderRadius={12}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    // for visible office modal
    onVisibleOfficeModal = async () => {
        if (await DeviceInfo.CheckConnection()) {
            this.updateWorkType("2")
        }
        this.setState({ isVisibleOfficeModal: true });
    }

    // for redirect to the shop list page 
    onClickBeatRoute = async () => {
        if (await DeviceInfo.CheckConnection()) {
            this.updateWorkType("1")
        }
        this.props.navigation.navigate("OutletDetail", { "heirarchyData": [{ "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId, "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId }] });

    }
    updateWorkType = async (id) => {
        let reqData = {
            isAttendence: this.props.Sales360Redux.attendanceData.isAttendance,
            activityId: id
        }
        let responseData = await MiddlewareCheck("updateEmpWorkActivityType", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    changeRouteModal = () => {
        this.updateWorkType("1")
        this.setState({ isVisibleChangeRouteModal: true });
    }

    modalSection = () => {
        const onCloseRouteModal = () => {
            this.setState({ isVisibleChangeRouteModal: false })
        }

        const onSelection = async (value) => {
            this.props.userSelectedBeatRouteData(value);
            await StorageDataModification.routeData(value, "store");
            onCloseRouteModal();
            // await OfflineFunction.clearStorageForRouteChange(this.props);
            // await this.onLoad();
        }

        const closeOfficeModal = () => {
            this.setState({ isVisibleOfficeModal: false })
        }

        return (
            <>
                {this.state.isVisibleChangeRouteModal ?
                    <ChangeRouteModal
                        isVisible={this.state.isVisibleChangeRouteModal}
                        props={this.props}
                        onCloseModal={() => onCloseRouteModal()}
                        onSelectRoute={(val) => onSelection(val)}
                    /> :
                    null
                }
                {this.state.isVisibleOfficeModal ?
                    <OfficeActivityModal
                        props={this.props}
                        isVisible={this.state.isVisibleOfficeModal}
                        onCloseModal={() => closeOfficeModal()}
                    />
                    :
                    null
                }
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._modalSec()}
                <Header {...this.props} />
                <View style={{ borderColor: "#000", borderWidth: 0.5 }} />
                {/* {this.searchSec()}
                {this.state.pageLoader ?
                    <View >
                        <SkeletonPlaceholder>
                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                {this.ViewSkeletonPlaceholder()}
                            </ScrollView>
                        </SkeletonPlaceholder>
                    </View> :

                    <React.Fragment>
                        <View style={{ marginTop: 10 }} />
                        {this.state.listdata.length > 0 ?
                            <FlatList
                                data={this.state.listdata}
                                renderItem={(item, index) => this.renderList(item, index)}
                                keyExtractor={(item, key) => key}
                                onEndReached={this.fetchMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.renderFooter}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                            /> :
                            <View style={{ marginTop: 20, height: Dimension.height }}>
                                <NoDataFound />
                            </View>
                        }

                    </React.Fragment>
                } */}
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.LG, color: Color.COLOR.BLACK.PURE_BLACK }} numberOfLines={1}>Select the Route</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ flex: 0.8, backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 30, flexDirection: 'row', paddingVertical: 10 }}>
                        <TouchableOpacity style={{ flex: 0.8, flexDirection: 'row' }} activeOpacity={0.7} onPress={() => this.onClickBeatRoute()}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgComponent svgName={"location_with_route"} />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS, color: Color.COLOR.WHITE.PURE_WHITE }} numberOfLines={1}>{this.props.Sales360Redux.routeData.hmName ? this.props.Sales360Redux.routeData.hmName : ""}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7} onPress={() => this.changeRouteModal()}>
                            <SvgComponent svgName={"downArrow"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: Color.COLOR.RED.AMARANTH, borderRadius: 500, paddingVertical: 10, paddingHorizontal: 10 }} activeOpacity={0.7} onPress={() => this.onVisibleOfficeModal()}>
                            <SvgComponent svgName={"office"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.modalSection()}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        userSelectedBeatRouteData,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);