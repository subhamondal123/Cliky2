import React, { Component, forwardRef } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { MiddlewareCheck } from '../../../services/middleware';
import { modifyData } from './function';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { App_uri } from '../../../services/config';
import { connect } from 'react-redux';
import { ErrorCode } from '../../../services/constant';
import { Loader, NoDataFound, TextInputBox } from '../../../shared';
import { bindActionCreators } from 'redux';
import SvgComponent from '../../../assets/svg';
import DynamicCategoryTab from '../dynamicCategoryTab/DynamicCategoryTab';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LmsLocationMapping from '../lmsLocationMapping';


const tabData = [
    {
        id: 1,
        text: "Favourite",
        check: true
    },
    {
        id: 2,
        text: "Dealer",
        check: false
    },
    {
        id: 3,
        text: "Sub dealer",
        check: false
    },
    {
        id: 4,
        text: "Mason",
        check: false
    },
    {
        id: 5,
        text: "Engineer",
        check: false
    },
]


class AllCustomerList extends Component {

    // Define default props using static defaultProps
    // static defaultProps = {
    //     requestData: {},
    //     onRefreshList: () => { }
    // };

    //constructor
    constructor(props) {
        super(props)

        this.state = {
            tabData: tabData,
            limit: 12,
            pageNum: 0,
            refreshing: true,
            pageLoader: true,
            listLoader: false,
            isApiCall: true,
            customerList: [],
            customerIdArr: [],
            searchText: ""
        }
    }

    componentDidMount = () => {
        this.load()
    }

    load = async () => {
        await this._apiCallRes()
    }

    childMainFunction = () => {
        // Your function logic here
    };


    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": "",
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": "0",
            "contactTypeId": "",
            "contactTypeIdArr": this.state.customerIdArr,
            "isDownload": "0",
            "approvalList": "0",
            "customerAccessType": "",
            "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyData(responseData);
                if (listData.list.length == 0) {
                    this.state.isApiCall = false;
                }
                this.setState({
                    customerList: [...this.state.customerList, ...listData.list],
                });
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    onSelectItem = (item) => {
        this.props.onSelect(item)
    }

    renderList = (item, key) => {
        return (
            <View >
                <View style={{ flex: 1, marginHorizontal: '2%', marginBottom: 10 }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };

    listSec = (item, key) => {
        return (
            <View style={{}} key={key}>
                <TouchableOpacity
                    onPress={() => this.onSelectItem(item)}
                    style={{ alignItems: 'center', marginHorizontal: 5, justifyContent: "center", width: Dimension.width / 4 - 30 }}>
                    <Image source={item.profilePic.length == 0 ? ImageName.USER_IMG : { uri: App_uri.IMAGE_URI + item.profilePic }} style={{ height: 65, width: 65, resizeMode: 'cover', borderRadius: 100, borderWidth: 0.3, borderColor: "#D1D1D1" }} />
                    <View style={{}}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8, textAlign: "center" }} numberOfLines={2}>{item.custBusinessName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // fetch more
    fetchMore = async () => {
        // if (this.state.initialApiCall) {
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
        // }
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 500 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 500 }} />
        );
    };

    ViewSkeletonPlaceholder = () => {
        return (
            <>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 20 }}>
                        <View style={{ marginLeft: 5, width: Dimension.width / 4 - 30, height: 65, borderRadius: 100 }} />
                        <View style={{ width: 50, height: 15, borderRadius: 10, marginTop: 10 }} />
                    </View>
                </View>
            </>

        )
    }

    activePointSec = () => {
        return (
            <React.Fragment>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"locationWithBGColor"} strokeColor={"#F13748"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Kolkata </Text>
                    <Text style={{ color: "#F13748", fontSize: 11, fontFamily: FontFamily.FONTS.INTER.BOLD, marginRight: 5 }}>Zone 2</Text>
                    <View style={{ flex: 0.7 }} />
                    <SvgComponent svgName={"downArrow"} strokeColor={"#F13748"} height={11} width={11} />
                </View>
            </React.Fragment>

        )
    }

    tabSec = () => {
        const tabSelect = (item, key) => {
            let tabData = this.state.tabData;
            for (let i = 0; i < tabData.length; i++) {
                if (i == key) {
                    tabData[i].check = true;
                } else {
                    tabData[i].check = false;
                }
            }
            this.setState({ tabData: tabData })
        }

        const skelitonPlaceHolder = () => {
            return (
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />

                    </View>
                </SkeletonPlaceholder>
            )
        }
        return (
            <>
                <View style={{ marginTop: 10, }}>
                    {this.state.tabData.length > 0 ?
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: "row" }}>
                                {this.state.tabData.map((item, key) => (
                                    <View style={{ marginRight: 5, marginVertical: 5, flexDirection: "row", }} key={key}>
                                        <DynamicCategoryTab
                                            data={item}
                                            onSelectedTab={() => tabSelect(item, key)}
                                        />
                                    </View>
                                ))}
                            </View>

                        </ScrollView>
                        :
                        null
                    }
                </View>
            </>
        )
    }


    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ searchText: val })
        }
        const onPressSearchIcon = () => {
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', paddingBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Customer Name or Number"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
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

    onSelectLocationData = (val) => {
    }


    render() {
        return (
            // <SafeAreaView>
            <View style={{ marginHorizontal: 10 }}>
                {this.props.isVisibleLocation || this.props.isVisibleLocation == undefined || this.props.isVisibleLocation == null ?
                    <LmsLocationMapping
                        type={"lastHierarcyField"}
                        isLabelVisible={false}
                        onApiCallData={(value) => this.onSelectLocationData(value)} />

                    :
                    null
                }
                {this.props.isVisibleUserType || this.props.isVisibleUserType == undefined || this.props.isVisibleUserType == null ?
                    this.tabSec()
                    :
                    null
                }
                {this.props.isVisibleSearch || this.props.isVisibleSearch == undefined || this.props.isVisibleSearch == null ?
                    this.searchSec()
                    :
                    null
                }
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 2 }}>
                        <SkeletonPlaceholder>
                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                {this.ViewSkeletonPlaceholder()}
                            </ScrollView>
                        </SkeletonPlaceholder>
                        {/* <ActivityIndicator color={"blue"} /> */}
                    </View>
                    :
                    <React.Fragment>
                        {this.state.customerList.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    numColumns={4}
                                    data={this.state.customerList}
                                    renderItem={({ item, index }) => this.renderList(item, index)}
                                    // keyExtractor={(item, key) => key}
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
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </View>
            //  </SafeAreaView> 
        )
    }
}


const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userSelectedBeatRouteData
    }, dispatch);

// export default forwardRef((props, ref) => <ChildComponent {...props} forwardedRef={ref} />);
export default connect(mapStateToProps, mapDispatchToProps)(AllCustomerList);

// export default AllCustomerList
