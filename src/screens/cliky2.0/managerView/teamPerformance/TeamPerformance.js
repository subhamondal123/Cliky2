import { FlatList, Image, Linking, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../header/Header'
import styles from './Style'
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'
import SvgComponent from '../../../../assets/svg'
import { Loader } from '../../../../shared'
import { modData } from './Function'

class TeamPerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            limit: 10,
            pageNum: 0,
            isApiCall: true,
            listLoader: false,
            designationArr: [],
            selectedDesignationObj: {},
            pageLoader: true,
            listData: [],
        }
    }

    componentDidMount = async () => {
        await this.onLoad()
    }

    //on load function
    onLoad = async () => {
        await this.setOptions()
        await this.getListData(this.props.route.params.designationData.designationArr[0])
    }

    //set initial state data
    setInitialState = async () => {
        this.setState({
            pageLoader: true,
            limit: 10,
            pageNum: 0,
            listLoader: true,
            isApiCall: true,
            listData: []
        })
    }

    //set designation data
    setOptions = async () => {
        let options = this.props.route.params.designationData.designationArr
        for (let i = 0; i < options.length; i++) {
            if (i == 0) {
                options[i].check = true
            } else {
                options[i].check = false
            }
        }
        this.setState({
            designationArr: this.props.route.params.designationData.designationArr,
            selectedDesignationObj: this.props.route.params.designationData.designationArr[0]
        })
    }

    //list data from api
    getListData = async (val) => {
        this.setState({ refreshing: false })
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "refUserId": this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            "refDesignationId": val.id
        }
        let responseData = await MiddlewareCheck("teamPerformace", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                if (modResponseData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.listData = [...this.state.listData, ...modResponseData]
                this.setState(this.state)
            }
            else {
                this.state.isApiCall = false;
                this.setState(this.state)
            }
        }
        this.setState({ pageLoader: false, listLoader: false, isApiCall: this.state.isApiCall })
    }

    //select designation data
    onSelect = async (item, key) => {
        let arr = this.state.designationArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }
        }
        this.state.designationArr = arr;
        this.state.selectedDesignationObj = item
        this.setState(this.state)
        await this.setInitialState()
        await this.getListData(item)
    }

    //designation section
    designationOptionsSec = () => {
        return (
            <View style={{ marginHorizontal: 15 }} >
                <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                    {
                        this.state.designationArr.map((item, key) => (
                            <TouchableOpacity key={key} style={item.check ? styles.activeBtn : styles.itemBtn} onPress={() => this.onSelect(item, key)}>
                                <Text style={item.check ? styles.activeTxt : styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

            </View>
        )
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

    //redirect to team performance drilldown screen
    onSelectItem = (item) => {
        this.props.navigation.navigate("TeamPerformanceDrillDown", { itemData: item, "mainPageData": this.props.route.params.mainPageData })
    }

    //render list iem
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
            {/* <View style={{ marginTop: '3%', gap: 8, justifyContent: 'center' }}>
                    {
                        this.state.valueItems.map((item, key) => (
                            <View key={key} style={{ alignItems: 'center', width: 95, marginBottom: '7%' }}>
                                <Text style={{ color: '#1F2B4D', fontWeight: '400', fontSize: 16 }}>{item.itemValue}</Text>
                                <Text style={{ fontSize: 11, fontWeight: '300' }}>{item.valueName}</Text>
                            </View>
                        ))
                    }
                </View> */}
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

    //refresh the list
    onRefresh = async () => {
        await this.setInitialState()
        await this.getListData(this.state.selectedDesignationObj)

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
                    this.getListData(this.state.selectedDesignationObj);
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
                <Header {...this.props} />
                {this.designationOptionsSec()}
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
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                            />
                            :
                            <View>
                                <Text style={styles.noDataFoundTxt}>No Data Found !</Text>
                            </View>
                        }
                    </View>
                }


            </SafeAreaView>
        )
    }
}

export default TeamPerformance