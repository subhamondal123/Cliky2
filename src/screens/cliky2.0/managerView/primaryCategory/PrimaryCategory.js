import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../header/Header'
import * as Progress from 'react-native-progress';
import styles from './Style'
import Pie from 'react-native-pie'
import { Dimension, FontFamily } from '../../../../enums';
import { getChartData, modMainData, modifyData } from './Function';
import { getAmountWithUnit } from '../../../../services/common-view-function/commonFunctions';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

class PrimaryCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            chartData: [],
            maxValue: 0
        }
    }

    componentDidMount = async () => {
        await this.getHierarcywiseOrder()
    }

    //get main data from api
    getHierarcywiseOrder = async (val) => {
        let reqData = {
            refUserId: this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            refDesignationId: this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : "",
            hierarchyTypeId: this.props.route.params.levelData.id,
            refDateTime: this.props.route.params.mainPageData.selectedMainDate
        }
        let responseData = await MiddlewareCheck("hiearchyTypeWiseOrder", reqData, this.props)

        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // let modResponseData = modHierarcyData(responseData.response)
                let modData = modMainData(responseData.response)
                let modifyMainData = modifyData(modData)
                this.setState({ chartData: modifyMainData.list, maxValue: modifyMainData.maxVal })
            }
        }
        this.setState({ pageLoader: false })
    }

    //skeliton placeholder section
    skeletonPlaceholderSec = () => {
        return (
            <SkeletonPlaceholder>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={{ height: 160, width: 160, borderRadius: 80, }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                    <View style={{ height: 12, width: 80, borderRadius: 10, marginHorizontal: 20 }} />
                    <View style={{ height: 12, width: 120, borderRadius: 10, marginHorizontal: 20 }} />
                </View>
                <View style={{ height: 10, width: Dimension.width - 30, borderRadius: 10, marginHorizontal: 20, marginTop: 15 }} />
            </SkeletonPlaceholder>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.contain} >
                <Header onRefresh={() => console.log("")} {...this.props} onFilterByDate={() => this.onDateFilter()} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} onShare={() => this.onShareWhatsapp()} headerDate={this.state.selectedDate} mainPageData={this.state.mainDataForFilter} />
                {this.state.pageLoader ?
                    <View >
                        {this.skeletonPlaceholderSec()}
                    </View>
                    :
                    <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ width: 175, alignItems: 'center' }}>
                                <Pie
                                    radius={80}
                                    innerRadius={60}
                                    sections={
                                        getChartData(this.state.chartData)
                                    }
                                    backgroundColor="#ddd"
                                />
                                <View style={styles.pieTxtContain}>
                                    <Text style={styles.totalTxt}>Total</Text>
                                    <Text style={styles.crTxt}>₹ {getAmountWithUnit(this.state.maxValue)}</Text>
                                    <Text style={styles.mtdTxt}>MTD</Text>
                                </View>
                            </View>


                        </View>
                        {this.state.chartData.map((item, key) => (
                            <View key={key} style={{ marginHorizontal: '6%' }}>
                                <View style={{ marginTop: '8%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.titleTxt}>{item.title}</Text>
                                        </View>
                                        <View style={styles.salesSec}>
                                            <Text style={styles.amountTxt}>₹ {getAmountWithUnit(item.amount)}</Text>
                                            <Text style={styles.amountLabelTxt}>(Sales)</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: '3%' }}>
                                        <Progress.Bar progress={item.amount / this.state.maxValue} width={Dimension.width - 40} height={7} color={item.color} borderWidth={0} unfilledColor={'#C7D2DB'} borderRadius={5} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                }
            </SafeAreaView >
        )
    }
}

export default PrimaryCategory