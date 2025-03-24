import { Text, TouchableOpacity, View, ScrollView, SafeAreaView, FlatList } from 'react-native'

import React, { Component } from 'react'
import Header from '../../header/Header'
import * as Progress from 'react-native-progress';
import styles from './Style'
import { Dimension, FontFamily } from '../../../../enums';
import { getAmountWithUnit } from '../../../../services/common-view-function/commonFunctions';
import { modMainData, modRespData } from './Function';
import { DateConvert } from '../../../../services/common-view-function';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { NoDataFound } from '../../../../shared';

class LocationWiseSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxAmount: 0,
            listDataArr: [],
            isExpandId: 0,
            pageLoader: true
        }
    }

    componentDidMount = async () => {
        await this.load()
    }

    //on load
    load = async () => {
        let reqData = {
            refUserId: this.props.route.params.mainPageData.selectedDesignationObj.userId ? this.props.route.params.mainPageData.selectedDesignationObj.userId : "",
            refDateTime: this.props.route.params.mainPageData.selectedMainDate,
            hierarchyTypeId: this.props.route.params.levelData.id,
            refDesignationId: this.props.route.params.mainPageData.selectedDesignationObj.userId == null || this.props.route.params.mainPageData.selectedDesignationObj.userId == undefined || this.props.route.params.mainPageData.selectedDesignationObj.userId == "" ? this.props.route.params.mainPageData.selectedDesignationObj.designationId ? this.props.route.params.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("hierarchyDrillDownValues", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modListData = []
                if (responseData.response.length > 0) {
                    modListData = modRespData(responseData.response)
                    this.setState({ listDataArr: modListData })
                } else {
                    let responseData = await MiddlewareCheck("hiearchyTypeWiseOrder", reqData, this.props)
                    if (responseData) {
                        if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            let modData = modMainData(responseData.response, this.props.route.params.levelData)
                            this.setState({ listDataArr: modData })
                        }
                    }
                }
            }
        }
        this.setState({ pageLoader: false })
    }

    //render list item data
    renderItem = (item, key) => (
        <View style={styles.progressContainer} key={key}>
            <View style={styles.progressDataContainer} >
                <TouchableOpacity style={styles.itemData} >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.northTxt}>{item.parent}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={styles.totalAmountTxt}>₹ {getAmountWithUnit(item.total)} </Text>
                        </View>
                        <View style={styles.mtdTxtBg}>
                            <Text style={styles.mtdTxt}>MTD</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <>
                    <View style={styles.childSec} />
                    {item.childs.map((item1, key1) => (
                        <View key={key1} style={styles.progressBarData}>
                            <View style={styles.itemData}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.hmDescTxt}>{item1.hmDescription}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <Text style={styles.totalSalesAmtTxt}>₹ {getAmountWithUnit(item1.totalSalesAmnt)} </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: '2%' }}>
                                <Progress.Bar progress={item1.totalSalesAmnt / item.maxVal} width={Dimension.width - 60} height={3} color='#149CE0' borderWidth={0} unfilledColor={'#C7D2DB'} borderRadius={4} />
                            </View>
                        </View>
                    ))
                    }
                </>
            </View>
        </View>
    )

    filterData = () => {

    }

    onResetFilterData = () => {

    }

    onDownload = () => {

    }
    onSearch = () => {

    }

    render() {
        return (
            <SafeAreaView style={styles.contain}>
                <Header onRefresh={() => console.log("")} {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} onShare={() => this.onShareWhatsapp()} />
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ height: 160, borderRadius: 10, marginHorizontal: 15, marginTop: 15 }} />
                    </SkeletonPlaceholder>
                    :
                    <React.Fragment>
                        {this.state.listDataArr.length > 0 ?
                            <FlatList
                                data={this.state.listDataArr}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                // keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={{ height: Dimension.height, marginTop: 20 }}>
                                <NoDataFound />
                            </View>
                        }
                    </React.Fragment>
                }
            </SafeAreaView>
        )
    }
}

export default LocationWiseSales