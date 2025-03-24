import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, FontSize } from '../../../enums'
import { CircularProgressBase } from 'react-native-circular-progress-indicator'
import * as Progress from 'react-native-progress';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modData } from './function';
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions';
import styles from './style';

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoader: true,
            teamPerformanceData: {},
        }
    }

    componentDidMount = async () => {
        await this.load()
    }

    //on load
    load = async () => {
        let reqData = {
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            refDateTime: this.props.mainPageData.selectedMainDate,
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : ""
        }

        let responseData = await MiddlewareCheck("outlateSummary", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                this.setState({ teamPerformanceData: modResponseData })
            }
        }
        this.setState({ pageLoader: false })
    }

    //redirect to team performance screen
    onSelect = () => {
        this.props.navigation.navigate("TeamPerformance", { designationData: this.props.mainPageData, "mainPageData": this.props.mainPageData })
    }

    render() {
        return (
            <>
                {
                    this.state.pageLoader ?
                        <SkeletonPlaceholder>
                            <View style={{ height: 250, borderRadius: 10 }} />
                        </SkeletonPlaceholder>
                        :
                        <TouchableOpacity onPress={() => this.onSelect()} style={styles.mainCardSec} activeOpacity={0.8}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.headerTxt}>Outlet Summary</Text>
                                <View style={{ flex: 1 }} />
                                <View style={styles.dgmMtdView}>
                                    <Text style={styles.dgmMtdText}>MTD</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                <View style={styles.topSection}>
                                    <View style={styles.progressSection}>
                                        <CircularProgressBase
                                            value={this.state.teamPerformanceData.prodVisitPercentage}
                                            activeStrokeColor={"#00B65E"}
                                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                            activeStrokeWidth={5}
                                            inActiveStrokeWidth={5}
                                            DashedCircleProps={{
                                                circleCircumference: 5,
                                            }}
                                            radius={35}
                                            clockwise={true}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.prodVisitPrcntTxt}>{this.state.teamPerformanceData.prodVisitPercentage}%</Text>
                                            </View>
                                        </CircularProgressBase>
                                    </View>
                                    <View style={{ flexDirection: "row", marginLeft: 5 }}>
                                        <View style={{ marginRight: 10 }}>
                                            <Text style={styles.visitTxt}>{this.state.teamPerformanceData.productiveVisit}</Text>
                                            <Text style={styles.labelTxt}>{"Productive Call"}</Text>
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                            <Text style={styles.visitTxt}>{this.state.teamPerformanceData.totalVisit}</Text>
                                            <Text style={styles.labelTxt}>{"Target Call"}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 20, borderTopColor: Color.COLOR.GRAY.GRAY_COLOR, borderTopWidth: 0.5 }}>
                                <View style={{ marginHorizontal: 5, marginLeft: 7, marginBottom: 15, width: (Dimension.width - 65) / 3.5 }}>
                                    <Text style={styles.labelTxt}>{"UTC"}</Text>
                                    <Text style={styles.amountWithUnitTxt}>{getAmountWithUnit(this.state.teamPerformanceData.uniqueTotalCount)}</Text>
                                    <Progress.Bar progress={this.state.teamPerformanceData.maxAmount == 0 ? 0 : this.state.teamPerformanceData.uniqueTotalCount / this.state.teamPerformanceData.maxAmount} width={(Dimension.width - 65) / 3.5} height={7} color={"#00B65E"} borderWidth={0} unfilledColor={'#C7D2DB'} />
                                </View>
                                <View style={{ marginHorizontal: 5, marginLeft: 7, marginBottom: 15, width: (Dimension.width - 65) / 3.5 }}>
                                    <Text style={styles.labelTxt}>{"UPC"}</Text>
                                    <Text style={styles.amountWithUnitTxt}>{getAmountWithUnit(this.state.teamPerformanceData.uniqueProdCount)}</Text>
                                    <Progress.Bar progress={this.state.teamPerformanceData.maxAmount == 0 ? 0 : this.state.teamPerformanceData.uniqueProdCount / this.state.teamPerformanceData.maxAmount} width={(Dimension.width - 65) / 3.5} height={7} color={"#F68217"} borderWidth={0} unfilledColor={'#C7D2DB'} />
                                </View>
                                <View style={{ marginHorizontal: 5, marginLeft: 7, marginBottom: 15, width: (Dimension.width - 65) / 3.5 }}>
                                    <Text style={styles.labelTxt}>{"Zero Order"}</Text>
                                    <Text style={styles.amountWithUnitTxt}>{getAmountWithUnit(this.state.teamPerformanceData.zeroOrder)}</Text>
                                    <Progress.Bar progress={this.state.teamPerformanceData.maxAmount == 0 ? 0 : this.state.teamPerformanceData.zeroOrder / this.state.teamPerformanceData.maxAmount} width={(Dimension.width - 65) / 3.5} height={7} color={"#F13748"} borderWidth={0} unfilledColor={'#C7D2DB'} />
                                </View>
                            </View>
                        </TouchableOpacity>
                }
            </>

        )
    }
}
