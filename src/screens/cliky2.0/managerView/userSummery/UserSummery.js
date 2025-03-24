import { FlatList, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../header/Header'
import styles from './Style'
import { Color, Dimension, ImageName } from '../../../../enums'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'
import { modData } from './Function'
import SvgComponent from '../../../../assets/svg'
import { Loader, NoDataFound } from '../../../../shared'
import Swiper from 'react-native-swiper'
import { getAmountWithUnit } from '../../../../services/common-view-function/commonFunctions'

const btnName = [
    {
        id: 1,
        name: 'Absent',
        check: true
    },
    {
        id: 2,
        name: 'Leave',
        check: false
    },
    {
        id: 3,
        name: 'Retailing',
        check: false
    },
    {
        id: 4,
        name: 'Office Work',
        check: false
    },
]
// this is user summery page 
class UserSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            pageLoader: true,
            userSummArr: [],
            isCollapseId: 0,
            btnArr: btnName,
            listLoader: false,
            selectedBtnObj: {},
            isApiCall: true,
        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        await this.setBtnData()
        await this.getAbsentListData()
    }
    // for set initial state data 
    setInitialState = async () => {
        this.setState({
            limit: 10,
            pageNum: 0,
            userSummArr: [],
            listLoader: true,
            pageLoader: true,
            isApiCall: true,
        })
    }
    // for set btn data 
    setBtnData = async () => {
        let arr = this.state.btnArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }

        }
        this.setState({
            btnArr: arr,
            selectedBtnObj: this.state.btnArr[0]
        })
    }

    handleButton = async (item, index) => {
        await this.setInitialState()
        let arr = this.state.btnArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }
        }
        this.state.btnArr = arr;
        this.state.selectedBtnObj = item
        this.setState(this.state)
        if (item.name == "Retailing") {
            await this.getRetailListData()
        } else if (item.name == "Leave") {
            await this.getLeaveListData()
        } else if (item.name == "Office Work") {
            await this.getOfficeListData()
        } else if (item.name == "Absent") {
            await this.getAbsentListData()
        }
    }
    // for get getAbsentHistory api data 
    getAbsentListData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refUserId": this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            "refDateTime": this.props.route.params.mainPageData.selectedMainDate,
            "refDesignationId": this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("getAbsentHistory", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.userSummArr = [...this.state.userSummArr, ...modResponseData];
                this.setState(this.state);
            }
        }
        this.setState({ pageLoader: false, listLoader: false })
    }
    // for get getLeaveHistory api data 
    getLeaveListData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refUserId": this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            "refDateTime": this.props.route.params.mainPageData.selectedMainDate,
            "refDesignationId": this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("getLeaveHistory", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.userSummArr = [...this.state.userSummArr, ...modResponseData];
                this.setState(this.state);
            }
        }
        this.setState({ pageLoader: false, listLoader: false })
    }
    // for get getOfficeHistory api data 
    getOfficeListData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refUserId": this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            "refDateTime": this.props.route.params.mainPageData.selectedMainDate,
            "refDesignationId": this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("getOfficeHistory", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.userSummArr = [...this.state.userSummArr, ...modResponseData];
                this.setState(this.state);
            }
        }
        this.setState({ pageLoader: false, listLoader: false })
    }
    // for get getRetailHistory api data 
    getRetailListData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refUserId": this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            "refDateTime": this.props.route.params.mainPageData.selectedMainDate,
            "refDesignationId": this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("getRetailHistory", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.userSummArr = [...this.state.userSummArr, ...modResponseData];
                this.setState(this.state);
            }
        }
        this.setState({ pageLoader: false, listLoader: false })
    }

    onSelectPhone = (item, key) => {
        Linking.openURL('tel:' + item.phone);
    }

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
                    if (this.state.selectedBtnObj.name == "Retailing") {
                        this.getRetailListData()
                    } else if (this.state.selectedBtnObj.name == "Leave") {
                        this.getLeaveListData()
                    } else if (this.state.selectedBtnObj.name == "Office Work") {
                        this.getOfficeListData()
                    } else if (this.state.selectedBtnObj.name == "Absent") {
                        this.getAbsentListData()
                    }
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
        // }
    };
    // for design render item 
    renderItem = (item, key) => (
        <View style={styles.itemContainer} key={key}>
            <View>
                <View style={styles.designationSec}>
                    <View style={{ flex: 0.25 }}>
                        <View style={styles.dgmContain}>
                            <Text style={styles.dgmTxt}>{item.designationName}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: "row" }}>
                        <SvgComponent svgName={"locationWithCircle"} strokeColor={"#1F2B4D"} height={15} width={15} />
                        <View style={{ marginLeft: 1 }}>
                            <Text style={styles.adsTxt}>{item.address}</Text>
                            {item.beat.length > 0 ?
                                <Text style={styles.adsTxt}>{item.beat}</Text>
                                : null}
                        </View>
                    </View>
                    <View style={styles.phoneTabSec}>
                        <TouchableOpacity onPress={() => this.onSelectPhone(item, key)}>
                            <Image source={ImageName.RED_CALL_ICON} style={styles.callIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onSelectWhatsapp(item, key)} style={{ marginLeft: 1 }}>
                            <Image source={ImageName.REAL_WHATSAPP_ICON} style={styles.whatsappIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.firstRow}>
                    <View style={styles.dgmAdsContain}>
                        <View style={styles.dgmContain}>
                            <Text style={styles.dgmTxt}>{item.designationName}</Text>
                        </View>
                        <View style={styles.mapAdds}>
                            <View>
                                <SvgComponent svgName={"locationWithCircle"} strokeColor={"#1F2B4D"} height={15} width={15} />

                            </View>
                            <View style={{ backgroundColor: "red",flexWrap:"wrap",width:100 }}>
                                <Text style={styles.adsTxt}>{item.address}</Text>
                                {item.beat.length > 0 ?
                                    <Text style={styles.adsTxt}>{item.beat}</Text>
                                    : null}
                            </View>
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
                </View> */}
                <View style={styles.secondRow}>
                    <View style={styles.nameTxtContain}>
                        <Text style={styles.nameTxt}>{item.firstname + " " + item.lastname}</Text>
                    </View>
                    <TouchableOpacity style={styles.leaveBtn}>
                        <Text style={styles.leaveBtnTxt}>{this.state.selectedBtnObj.name}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.selectedBtnObj.name == "Office Work" ?
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <View style={{ flex: 0.5 }} />
                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                            <Text style={styles.descriptionTxt}>{item.description}</Text>
                        </View>
                    </View>
                    : null}
            </View>
            {this.state.selectedBtnObj.name == "Retailing" ?
                <React.Fragment>
                    <View style={styles.viewStyle}></View>
                    <Swiper showsButtons={false} height={170} activeDotColor={Color.COLOR.RED.AMARANTH}>
                        <View style={{ height: 170 }}>
                            <View style={styles.itemSec}>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.login}</Text>
                                    <Text style={styles.itemTxt}>{"Login"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.firstCall}</Text>
                                    <Text style={styles.itemTxt}>{"First Call"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.firstPC}</Text>
                                    <Text style={styles.itemTxt}>{"First Pc"}</Text>
                                </View>

                            </View>
                            <View style={styles.itemSec}>
                                {/* <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.sc}</Text>
                                    <Text style={styles.itemTxt}>{"SC"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.cap}</Text>
                                    <Text style={styles.itemTxt}>{"CAP"}</Text>
                                </View> */}
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.pc}</Text>
                                    <Text style={styles.itemTxt}>{"PC"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.prodactivity}</Text>
                                    <Text style={styles.productivityTxt}>{"Productivity(%)"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.tc}</Text>
                                    <Text style={styles.itemTxt}>{"TC"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 170 }}>
                            <View style={styles.itemSec}>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.pc}</Text>
                                    <Text style={styles.itemTxt}>{"PC"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.prodactivity}</Text>
                                    <Text style={styles.productivityTxt}>{"Productivity(%)"}</Text>
                                </View>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.quantityData}</Text>
                                    <Text style={styles.itemTxt}>{"Qty(Std Unit)"}</Text>
                                </View>
                                {/* <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.schProductivity}</Text>
                                    <Text style={styles.productivityTxt}>{"SchProductivity(%)"}</Text>
                                </View> */}

                            </View>
                            <View style={styles.netValSec}>
                                <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{getAmountWithUnit(item.netval)}</Text>
                                    <Text style={styles.itemTxt}>{"Net Value"}</Text>
                                </View>
                                {/* <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.quantityData}</Text>
                                    <Text style={styles.itemTxt}>{"Qty(Std Unit)"}</Text>
                                </View> */}
                                {/* <View style={styles.itemTxtSec}>
                                    <Text style={styles.itemValTxt}>{item.ovc}</Text>
                                    <Text style={styles.itemTxt}>{"OVC(%)"}</Text>
                                </View> */}

                            </View>

                        </View>
                    </Swiper>
                </React.Fragment>
                : null}
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
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.contain}>
                <Header {...this.props} />

                <View style={{ marginHorizontal: 10 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>

                        {
                            btnName.map((item, key) => (
                                <TouchableOpacity key={key} style={item.check ? styles.activeBtn : styles.itemBtn} onPress={() => this.handleButton(item, key)} disabled={item.check}>
                                    <Text style={item.check ? styles.activeTxt : styles.text}>{item.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
                <View style={{ marginBottom: '10%' }}>
                    {this.state.pageLoader ? <View style={styles.loaderSec}>
                        <Loader />
                    </View> :
                        <React.Fragment>
                            {this.state.userSummArr.length > 0 ?
                                <FlatList
                                    data={this.state.userSummArr}
                                    renderItem={({ item, index }) => this.renderItem(item, index)}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    onEndReachedThreshold={0.1}
                                    onEndReached={this.fetchMore}
                                // keyExtractor={(item) => item.id}
                                />
                                :
                                <View style={{ height: Dimension.height, marginTop: 20 }}>
                                    <NoDataFound />
                                </View>
                            }
                        </React.Fragment>

                    }
                </View>

            </SafeAreaView>
        )
    }
}

export default UserSummery