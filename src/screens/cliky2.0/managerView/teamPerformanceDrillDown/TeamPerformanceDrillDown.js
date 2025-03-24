import { FlatList, Image, Linking, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../header/Header'
import styles from './Style'
import { Dimension, FontFamily, ImageName } from '../../../../enums'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'
import SvgComponent from '../../../../assets/svg'
import { Loader, NoDataFound } from '../../../../shared'
import { DateConvert } from '../../../../services/common-view-function'
import { modData } from './Function'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData, teamPerformanceDrillDownData } from "../../../../redux/Sales360Action";

class TeamPerformanceDrillDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            refreshing: true,
            listLoader: false,
            isApiCall: true,
            designationArr: [],
            selectedDesignationObj: {},
            pageLoader: true,
            drilldownData: {},
            requestData: {},
            pageIndex: 0,
            listData: [],
            refUserId: this.props.route.params.itemData.userId,
        }
    }

    componentDidMount = async () => {
        await this.onLoad()
    }

    // on load
    onLoad = async () => {
        this.state.requestData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refDateTime": this.props.route.params.mainPageData.selectedMainDate,
            "refUserId": this.state.refUserId,
            "isFirstCall": true,
        }
        // await this.setOptions()
        this.setState(this.state)
        await this.getListData(this.state.requestData)
    }

    //set initial state
    setInitialState = async () => {
        this.setState({
            limit: 10,
            pageNum: 0,
            listLoader: true,
            refreshing: true,
            isApiCall: true,
            pageLoader: true,
            listData: []
        })
    }

    //list data api
    getListData = async (reqData) => {
        this.setState({ refreshing: false })
        let responseData = await MiddlewareCheck("teamPerformaceDrillDown", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false
                }
                if (modResponseData.length > 0 && !reqData.isFirstCall) {
                    this.state.pageIndex++;
                }

                this.state.listData = [...this.state.listData, ...modResponseData];
                this.setState(this.state)
            }
        }
        this.storeDrillDownData(reqData)
        this.setState({ pageLoader: false, listLoader: false })
    }

    //store drilldowndata
    storeDrillDownData = (reqData) => {
        let drillDownMainData = this.state.drilldownData
        drillDownMainData[this.state.pageIndex] = {
            request: reqData,
            response: this.state.listData,
        }
        this.state.drilldownData = drillDownMainData
    }

    //on select phone
    onSelectPhone = (item, key) => {
        Linking.openURL('tel:' + item.phone);
    }

    //on select whatsapp
    onSelectWhatsapp = (item, key) => {
        let url = "whatsapp://send?text=" + "" + "&phone=" + item.phone;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened");
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });
    }

    //select the list item card
    onSelectItem = async (item) => {
        await this.setInitialState()
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refDateTime": DateConvert.fullDateFormat(new Date()),
            "refUserId": item.userId,
            "isFirstCall": false,
        }
        this.state.isApiCall = true;
        this.state.refUserId = item.userId;
        this.state.requestData = reqData;
        this.setState(this.state)
        await this.getListData(reqData)
    }

    //on back from screen
    onBack = async () => {
        if (this.state.pageIndex == 0) {
            this.props.navigation.goBack()
        } else {
            let drilldownData = this.state.drilldownData;
            let pageIndex = this.state.pageIndex;
            delete drilldownData[pageIndex]
            pageIndex = pageIndex - 1;
            await this.setLoadData()
            this.state.requestData = drilldownData[pageIndex].request
            this.state.listData = drilldownData[pageIndex].response
            this.state.refUserId = drilldownData[pageIndex].request.refUserId

            // this.state.isApiCall = false
            // this.state.listLoader = false
            this.state.pageLoader = false
            this.state.pageIndex = pageIndex;
            this.state.drilldownData = drilldownData
        }

        this.setState(this.state)
    }

    //set data initially
    setLoadData = async () => {
        this.state.limit = 10;
        this.state.pageNum = 0;
        this.state.pageLoader = true;
        // this.state.isApiCall = true;
        // this.state.listLoader = true;
        this.setState(this.state)
    }

    //render item list
    renderItem = (item, key) => (
        <View style={styles.itemContainer} key={key}>
            <View>
                <View style={styles.firstRow}>
                    <View style={styles.dgmAdsContain}>
                        <View style={styles.dgmContain}>
                            <Text style={styles.dgmTxt}>{item.designationName}</Text>
                        </View>
                        <View style={styles.mapAdds}>
                            <SvgComponent svgName={"locationWithCircle"} strokeColor={"#1F2B4D"} height={15} width={15} />
                            <Text style={styles.adsTxt}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={styles.call}>
                        <TouchableOpacity onPress={() => this.onSelectPhone(item, key)}>
                            <Image source={ImageName.RED_CALL_ICON} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onSelectWhatsapp(item, key)}>
                            <Image source={ImageName.REAL_WHATSAPP_ICON} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.secondRow} onPress={() => this.onSelectItem(item)}>
                    <View style={styles.nameTxtContain}>
                        <Text style={styles.nameTxt}>{item.firstname + " " + item.lastname}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.borderLine} />

            <View style={styles.topSection}>
                <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.distributors}</Text>
                    <Text style={styles.itemLabelTxt}>{"Distributor"}</Text>
                </View>
                <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.beats}</Text>
                    <Text style={styles.itemLabelTxt}>{"Beats"}</Text>
                </View>
                <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.outlets}</Text>
                    <Text style={styles.itemLabelTxt}>{"Outlets"}</Text>
                </View>

            </View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
                {/* <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.sc}</Text>
                    <Text style={styles.itemLabelTxt}>{"Outlet Planned"}</Text>
                </View> */}
                <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.upc}</Text>
                    <Text style={styles.itemLabelTxt}>{"UPC"}</Text>
                </View>
                <View style={styles.itemSec}>
                    <Text style={styles.itemDataTxt}>{item.utc}</Text>
                    <Text style={styles.itemLabelTxt}>{"UTC"}</Text>
                </View>
            </View>
        </View>
    )

    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 200 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    //refresh list 
    onRefresh = async () => {
        await this.setInitialState()
        await this.onLoad()
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
                    this.onLoad();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
        // }
    };


    render() {
        return (
            <SafeAreaView style={styles.contain}>
                <Header {...this.props} onBackPress={() => this.onBack()} />
                {this.state.pageLoader ? <View height={Dimension.height}>
                    <Loader />
                </View> :
                    <View >
                        {this.state.listData.length > 0 ?
                            <FlatList
                                data={this.state.listData}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                ListFooterComponent={this.renderLoader}
                                onEndReached={this.fetchMore}
                                onEndReachedThreshold={0.1}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={this.state.refreshing}
                            //         onRefresh={() => this.onRefresh()}
                            //     />
                            // }
                            />
                            :
                            <View style={{ height: Dimension.height, marginTop: 20 }}>
                                <NoDataFound />
                            </View>
                        }
                    </View>
                }
            </SafeAreaView>
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
        userSelectedBeatRouteData,
        teamPerformanceDrillDownData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamPerformanceDrillDown);
