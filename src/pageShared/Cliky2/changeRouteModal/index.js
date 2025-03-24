
import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, View, ScrollView, Text, TouchableOpacity, RefreshControl, KeyboardAvoidingView, Platform } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./style";
import { BigTextButton, BottomModal, DropdownInputBox, Loader, NoDataFound, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { FlatList } from 'react-native';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modOutletData } from './function';
import { Toaster } from '../../../services/common-view-function';
import OfflineCompletionProgress from '../offlineCompletionProgress';
import { ClientSettings } from '../../../services/userPermissions';
import _debounce from 'lodash/debounce';

class ChangeRouteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
    }


    onRequestCloseModal = () => {
        this.props.onCloseModal();
    }

    onBackDropPressModal = () => {
        this.props.onCloseModal();
    }

    onBackButtonPressModal = () => {
        this.props.onCloseModal();
    }

    componentDidMount = async () => {
        await this.fetchData(); // Initial API call with limit 10 and offset 0
        this.state.isOffline = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.setState(this.state);
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


    setApiCallOffset = async () => {
        setOffset(offset + 1);
        setIsLoading(true);
    }


    // fetch more
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

    renderList = (item) => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                {this.listData(item.item, item.index)}
            </View>
        )
    }

    onSelect = (item, key) => {
        const updatedArray = this.state.listdata.map((item, index) => ({
            ...item,
            check: index === key ? true : false,
        }));
        this.state.listdata = updatedArray;
        this.state.selectedRoute = item;
        this.setState(this.state);
    }

    listData = (item, key) => {
        return (
            <View key={key}>
                <TouchableOpacity style={styles.greaySec} key={key} onPress={() => this.onSelect(item, key)}>
                    <View style={styles.greayBox}>
                        <View style={item.check ? styles.hafCircleGreen : styles.hafCircleGreay}>
                            {item.check ?
                                <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                :
                                null
                            }

                        </View>
                        <View style={styles.boxTextSec}>
                            <Text style={styles.reasonText}>{item.hmName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onRouteSelect = async () => {
        if (Object.keys(this.state.selectedRoute).length == 0) {
            Toaster.ShortCenterToaster("Please select a Route !");
        } else {
            this.props.onSelectRoute(this.state.selectedRoute);
            if (this.state.isOffline) {
                // this.props.userSelectedBeatRouteData(this.state.selectedRoute);
                // await StorageDataModification.routeData(this.state.selectedRoute, "store");
                // await OfflineFunction.clearStorageForRouteChange(this.props);
                // this.onVisibleProgressModal(true);
            }
        }
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

    debouncedFetchData = _debounce(this.fetchData, 400); // Adjust the delay as needed


    searchSec = () => {
        // const onSearch = async (val) => {
        //     this.setState({ searchText: val })
        //     // const prevLength = this.state.searchText.length;
        //     // if ((val.length > 0 && val.length % 3 === 0 && val.length !== prevLength - 1) || val.length == 0) {
        //         await this.onSetChangeData()
        //         await this.fetchData();
        //     // }
        // }
        const onSearch = async (val) => {
            this.setState({ searchText: val });
            await this.onSetChangeData();
            await this.debouncedFetchData()
            // await this.fetchData();
        } // You can adjust the delay (300 milliseconds in this example)



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
                        borderRadius={22}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    // for refreshing the data
    onRefresh = async () => {
        this.state.onRefresh = true;
        this.state.searchText = "";
        this.setState(this.state);
        await this.onSetChangeData()
        await this.fetchData();
    }

    // for visible the progress modal
    onVisibleProgressModal = (type) => {
        this.state.offlineProgressModal = type;
        this.setState(this.state);
    }

    render() {
        if (this.props.isHidden) {
            return null;
        } else {
            return (
                <React.Fragment>
                    {this.state.offlineProgressModal ?
                        <OfflineCompletionProgress isVisible={this.state.offlineProgressModal} props={this.props} onCloseModal={() => this.onVisibleProgressModal(false)} /> :
                        null
                    }
                    <BottomModal
                        isVisible={this.props.isVisible}
                        onRequestClose={() => this.onRequestCloseModal()}
                        onBackdropPress={() => this.onBackDropPressModal()}
                        onBackButtonPress={() => this.onBackButtonPressModal()}
                        children={
                            <View style={styles.modalview} >
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={styles.userPSec}>
                                            <SvgComponent svgName={"location_with_route"} strokeColor={"#1F2B4D"} height={35} width={35} />
                                        </View>
                                        <View style={styles.userTextSec}>
                                            <Text style={styles.nameText}>Change Route</Text>
                                            {/* <Text style={styles.dText}>Dealer</Text> */}
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity style={styles.dropdownSec} onPress={() => this.onRequestCloseModal()} >
                                        <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                                    </TouchableOpacity>
                                </View>
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                                    {this.searchSec()}
                                    {this.state.pageLoader ?
                                        <View style={{ height: (Dimension.height - (Dimension.height / 2)) }}>
                                            <Loader type={"normal"} />
                                        </View>
                                        :
                                        <>
                                            <View style={{ height: (Dimension.height - (Dimension.height / 2)) }}>
                                                {this.state.listdata.length > 0 ?
                                                    <FlatList
                                                        data={this.state.listdata}
                                                        renderItem={(item, key) => this.renderList(item, key)}
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
                                                    />
                                                    :
                                                    <View style={{ marginHorizontal: 10 ,marginTop:20,flex:1}}>
                                                        <NoDataFound />
                                                    </View>
                                                }
                                            </View>
                                            <View style={{ marginHorizontal: 60, paddingVertical: 10 }}>
                                                <BigTextButton
                                                    text={"Go for the Route"}
                                                    borderRadius={25}
                                                    onPress={() => this.onRouteSelect()}
                                                />
                                            </View>
                                        </>
                                    }
                                </KeyboardAvoidingView>
                                <View style={{ marginBottom: 28 }} />
                            </View >
                        }
                    />
                </React.Fragment>
            )
        }
    }
}


export default ChangeRouteModal;