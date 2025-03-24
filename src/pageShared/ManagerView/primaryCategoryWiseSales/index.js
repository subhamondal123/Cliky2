import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Pie from 'react-native-pie'
import { Color, FontFamily, FontSize, ImageName } from '../../../enums'
import { MiddlewareCheck } from '../../../services/middleware'
import { ErrorCode } from '../../../services/constant'
import { getTotalAmount, modData, modHierarcyData, modMainData, setPieChartData } from './function'
import { DropdownInputBox, Loader, SingleSelectModalDropdown } from '../../../shared'
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions'
import { ScrollView } from 'react-native-gesture-handler'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import styles from './style'

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pieChartArr: [],
            levelArr: [],
            mainData: [],
            selectedLevelObj: {},
            modalVisible: false,
            levelLoader: false,
            chartLoader: false,
            pageLoader: true,
            totalAmount: 0
        }
    }

    componentDidMount = () => {
        this.load()
    }
    //on load
    load = async () => {
        this.setState({ levelLoader: true })
        let reqData = {
            hmId: 2
        }

        let responseData = await MiddlewareCheck("getHiearchyTypes", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                this.setState({ levelArr: modResponseData, selectedLevelObj: modResponseData[0] })
                await this.getHierarcywiseOrder(modResponseData[0])
            }

        }
        this.setState({ levelLoader: false, pageLoader: false })
    }

    //get api data
    getHierarcywiseOrder = async (val) => {
        this.setState({ chartLoader: true })
        let reqData = {
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : "",
            hierarchyTypeId: val.id,
            refDateTime: this.props.mainPageData.selectedMainDate
        }
        let responseData = await MiddlewareCheck("hiearchyTypeWiseOrder", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modMainData(responseData.response).list
                let maxAmount = modMainData(responseData.response).maxAmount
                this.setState({ mainData: modData, totalAmount: maxAmount })
            }
        }
        this.setState({ chartLoader: false })
    }

    //selectthe level
    _onSelectLevel = async (val) => {
        this.setState({ selectedLevelObj: val, modalVisible: false })
        await this.getHierarcywiseOrder(val)

    }

    //redirect to category wise sales screen
    onSelect = () => {
        this.props.navigation.navigate("CategoryWiseSales", { propData: this.state.mainData, levelData: this.state.selectedLevelObj, "mainPageData": this.props.mainPageData })
    }

    //open close modal 
    onOpenAndCloseModal = (type) => {
        this.setState({
            modalVisible: type
        })
    }

    //modal section
    modalSec = () => {
        return (
            <>
                <SingleSelectModalDropdown
                    isSearchable={true}
                    selectedValue={this.state.selectedLevelObj.id ? this.state.selectedLevelObj.id.toString() : "0"}
                    data={this.state.levelArr}
                    onPress={(value) => this._onSelectLevel(value)}
                    isVisible={this.state.modalVisible}
                    headerText={"*Select Level"}
                    borderRadius={15}
                    onClose={() => this.onOpenAndCloseModal(false)}
                    onBackButtonPress={() => this.onOpenAndCloseModal(false)}
                    // onBackdropPress={() => onBackdropPress()}
                    onRequestClose={() => this.onOpenAndCloseModal(false)}
                // loaderCheck={loaderCheck}
                // fetchMore={() => onFetchMore()}
                // endReachedLoader={endReachedLoader}
                />
            </>
        )
    }

    render() {
        return (
            <>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginVertical: 15, height: 200, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <View style={styles.cardSection}>
                        <View style={styles.headerSec}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerTxt}>Product Category Wise Sales</Text>
                            </View>
                            <View style={styles.dgmMtdView}>
                                <Text style={styles.dgmMtdText}>MTD</Text>
                            </View>
                            {this.state.levelLoader ?
                                null
                                :
                                <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => this.onOpenAndCloseModal(true)}>
                                    <Image source={ImageName.HORIZONTAL_THREE_DOT} style={{ height: 30, width: 30, resizeMode: "contain" }} />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{ borderTopColor: Color.COLOR.GRAY.GRAY_COLOR, borderTopWidth: 0.5, paddingTop: 10 }} />

                        {this.state.chartLoader ?
                            <Loader type={"normal"} />
                            :
                            <View style={{ paddingTop: 20, flexDirection: 'row', }} >

                                <>
                                    <TouchableOpacity style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onSelect()}>
                                        {/* {this.state.mainData.length > 0 ? */}
                                        <>
                                            <Pie
                                                radius={70}
                                                innerRadius={50}
                                                sections={
                                                    setPieChartData(this.state.mainData)
                                                }
                                                backgroundColor="#8a8686"
                                            />
                                            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.totalMtdTxt}>Total</Text>
                                                <Text style={styles.totalAmtUnitTxt}>{getAmountWithUnit(getTotalAmount(this.state.mainData).toFixed(2))}</Text>
                                                <Text style={styles.totalMtdTxt}>MTD</Text>
                                            </View>
                                        </>
                                        {/* : null} */}


                                    </TouchableOpacity>
                                    <View style={styles.listItemSec}>
                                        <ScrollView nestedScrollEnabled>
                                            <View style={{ flex: 1 }}>
                                                {this.state.mainData.length > 0 ?
                                                    <React.Fragment>
                                                        {this.state.mainData.map((item, key) => (
                                                            <View key={key} style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                                <View style={styles.titleSec}>
                                                                    <View style={[styles.titleMainSec, { backgroundColor: item.color }]}>
                                                                        <Text style={styles.titleTxt}>{item.title}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.amountSec}>
                                                                    <Text style={styles.amountPercentageTxt}>{parseFloat(item.percentage).toFixed(2)}%</Text>
                                                                    <Text style={styles.amountTxt}>₹ {getAmountWithUnit(item.amount)}</Text>
                                                                </View>
                                                            </View>
                                                        ))}
                                                    </React.Fragment>
                                                    : null}
                                            </View>

                                        </ScrollView>

                                    </View>
                                </>


                            </View>
                        }
                        {this.modalSec()}
                    </View>
                }
            </>

        )
    }
}
