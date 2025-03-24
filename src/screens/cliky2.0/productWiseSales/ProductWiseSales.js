
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";
import { Share } from "react-native";
import { PLAYSTORE_URL } from "../../../../globalConstant";
import { FileCreation, FileDownload, ShareFile, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { modResponseData, modResponseSkuData } from "./Function";
import { App_uri } from "../../../services/config";
import { maskData } from "../../../services/common-view-function/commonFunctions";

const subCategoryData = [
    {
        id: 1,
        title: " Primary ",
        name: "primary",
        check: false

    },
    {
        id: 2,
        title: "Secondary",
        name: "secondary",
        check: false

    },
    {
        id: 3,
        title: "SKU",
        name: "sku",
        check: false
    }

]

class ProductWiseSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            subCategoryData: subCategoryData,
            selectedTab: "",
            skuData: [],
            listData: [],
            listLoader: false

        };
    }

    componentDidMount = async () => {
        this.setTab()
        this.setState({ selectedTab: "primary" })
        await this._load("primary");
    }

    setTab = () => {
        let data = this.state.subCategoryData;
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                data[i].check = true
            } else {
                data[i].check = false
            }
        }
        this.setState({ subCategoryData: data })
    }
    onBack = () => {
        this.props.navigation.goBack();
    };
    _load = async (type) => {
        this.setState({ listLoader: true })
        let reqData = {
            reportType: type
        }
        let responseData = await MiddlewareCheck("getPocketMisProductSales", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modResponseData(responseData.response)
                this.setState({
                    listData: modData
                })
            }
        }
        this.setState({ listLoader: false })

        // await this.orderHistoryApi(this.state.selectedCategoryId)
    };
    skuApi = async () => {
        this.setState({ listLoader: true })
        let reqData = {
            reportType: "sku"
        }
        let responseData = await MiddlewareCheck("getPocketMisProductSales", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modResponseSkuData(responseData.response)
                this.setState({
                    skuData: modData
                })
            }
        }
        this.setState({ listLoader: false })
    }
    onSelectTab = async (val) => {
        for (let i = 0; i < this.state.subCategoryData.length; i++) {
            if (this.state.subCategoryData[i].id == val.id) {
                this.state.subCategoryData[i].check = true
            } else {
                this.state.subCategoryData[i].check = false
            }
        }
        this.setState({ subCategoryData: this.state.subCategoryData, selectedTab: val.name })
        if (val.name == "sku") {
            await this.skuApi()
        } else {
            await this._load(val.name)

        }
    }


    //header section
    headerSec = () => {
        return (
            <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 15 }}>
                <TouchableOpacity style={{ flex: 0.1 }} activeOpacity={0.9} onPress={() => this.onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 0.9, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{"Product Wise Sales (MTD)"}</Text>
                    </View>
                </View>
            </View>
        )
    };



    _onSubTab = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.state.subCategoryData.map((item, key) => (
                        <TouchableOpacity style={item.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => this.onSelectTab(item)} activeOpacity={0.9} key={key}>
                            {item.title ?
                                <View key={key}>
                                    <Text style={item.check ? styles.activeTitleTxt : styles.titleTxt}>{item.title}</Text>
                                </View>
                                : null}

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

        )
    }
    onShare = async () => {
        let reqData = {
            reportType: this.state.selectedTab,
            isShared: "1",
        }
        let responseData = await MiddlewareCheck("getPocketMisProductSales", reqData, this.props)
        console.log("responseData", responseData)
        if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            if (responseData.response == undefined || responseData.response == null) {
                Toaster.ShortCenterToaster("No Data to Share !")
            } else {
                const filepath = await FileCreation.createTXTfile(responseData.response, "Product Wise Sales(MTD)")
                if (filepath) {
                    console.log('Text file created at:', filepath);
                    // Share the .txt file on WhatsApp
                    await ShareFile.shareTextFile(filepath, 'Order Details', 'Sharing Product Wise Sales(MTD) details via WhatsApp');
                } else {
                    console.log('Error creating text file.');
                }
            }

        }
    }

    onDownload = async () => {
        let reqData = {
            reportType: this.state.selectedTab,
            isDownload: "1",
        }
        let responseData = await MiddlewareCheck("getPocketMisProductSales", reqData, this.props)
        if (responseData) {
            await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + "temp/" + responseData.response);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSec()}
                <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                    {this._onSubTab()}
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                        {/* <View style={styles.dateSec}>
                            <Text style={styles.priceText}>₹ 39528.25</Text>
                        </View>
                        <View style={{ backgroundColor: '#F0F4F7', borderRadius: 10, flexDirection: 'row', paddingVertical: 5 }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>28</Text>
                                <Text style={styles.valueText}>Qty</Text>
                                <Text style={styles.valueText}>STD Unit</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>6</Text>
                                <Text style={styles.valueText}>SC</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>19</Text>
                                <Text style={styles.valueText}>TC</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>14</Text>
                                <Text style={styles.valueText}>PC</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>37</Text>
                                <Text style={styles.valueText}>LPC</Text>
                            </View>

                        </View> */}
                        <View style={{ marginTop: 10 }} />
                        <View style={{ backgroundColor: '#D5E1EA', borderTopEndRadius: 10, borderTopStartRadius: 10, }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, marginLeft: 20, marginRight: 20 }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={styles.unitText}>{this.state.selectedTab == "sku" ? "SKU" : "Category"}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={styles.unitText}>Qty(Std Unit)</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.unitText}>Net Value</Text>
                                </View>
                            </View>
                        </View>

                        {/* <View style={{ backgroundColor: '#F0F4F7' }}>
                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Category M</Text>
                                <View style={{ backgroundColor: '#747C90', borderWidth: 0.9, }} />
                                <View style={{ paddingBottom: 10 }} />
                            </View>
                        </View> */}


                        <View style={{ backgroundColor: '#F0F4F7', paddingVertical: 10 }}>
                            {this.state.listLoader ? <View>
                                <ActivityIndicator size={"small"} />
                            </View>
                                :
                                <React.Fragment>
                                    {this.state.selectedTab == "sku" ?
                                        <React.Fragment>
                                            {this.state.skuData.length > 0 ?
                                                <React.Fragment>
                                                    {this.state.skuData.map((item, key) => (
                                                        <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }} key={key}>
                                                            <View style={{ flex: 1, }}>
                                                                <Text style={styles.unitText}>{item.Sku}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                                <Text style={styles.unitText}>{item.Quantity + " " + item.Unit}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={styles.unitPText}>₹ {this.props.Sales360Redux.loginData.clientId == 19 ? maskData(item.Amount) : item.Amount}</Text>

                                                            </View>
                                                        </View>
                                                    ))}
                                                </React.Fragment>
                                                :
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={styles.noDataFound}>No Data Found</Text>
                                                </View>
                                            }
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            {this.state.listData.length > 0 ?
                                                <React.Fragment>
                                                    {this.state.listData.map((item, key) => (
                                                        <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }} key={key}>
                                                            <View style={{ flex: 1, }}>
                                                                <Text style={styles.unitText}>{item.Category}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                                <Text style={styles.unitText}>{item.Quantity + " " + item.Unit}</Text>
                                                            </View>
                                                            {console.log("item.amount",item.Amount)}
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={styles.unitPText}>₹ {(this.props.Sales360Redux.loginData.clientId == 19 ? maskData(item.Amount) : item.Amount)}</Text>

                                                            </View>
                                                        </View>
                                                    ))}
                                                </React.Fragment>
                                                :
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={styles.noDataFound}>No Data Found</Text>
                                                </View>
                                            }
                                        </React.Fragment>
                                    }
                                </React.Fragment>}

                        </View>


                    </View>
                    <View style={{ height: 50 }} />
                </ScrollView>
                {this.state.listData.length > 0 || this.state.skuData.length > 0 ?
                    <View style={{ flexDirection: 'row', marginTop: 30, position: "absolute", bottom: 0, marginHorizontal: 15, marginBottom: 15 }}>
                        <BigTextButton
                            text={"Download"}
                            borderRadius={22}
                            backgroundColor={"#1F2B4D"}
                            // fontColor={"#000"}
                            fontSize={12}
                            height={42}
                            // additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                            onPress={() => this.onDownload()}
                            // isDisabled={!field.isEditable}
                            isRightIcon={true}
                            rightIcon={ImageName.DOWNLOAD}
                            rightIconStyle={{ height: 20 }}
                        />

                        <View style={{ width: 60 }} />
                        <BigTextButton
                            text={"Share"}
                            borderRadius={22}
                            backgroundColor={"#1F2B4D"}
                            // fontColor={"#000"}
                            fontSize={12}
                            height={42}
                            // additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                            onPress={() => this.onShare()}
                            // isDisabled={!field.isEditable}
                            isRightIcon={true}
                            rightIcon={ImageName.SHARE}
                            rightIconStyle={{ height: 20 }}
                        />
                    </View>
                    :
                    null
                }
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
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductWiseSales);
