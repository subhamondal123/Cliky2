import React, { Component } from 'react'
import { MiddlewareCheck } from '../../../services/middleware'
import { Image, Text, View } from 'react-native'
import { CircularProgressBase } from 'react-native-circular-progress-indicator'
import { Color, ImageName } from '../../../enums'
import styles from './style'
import { ErrorCode } from '../../../services/constant'
import { getVisitDifferencePercentage, modData } from './function'
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: true,
            callSumData: {}
        }
    }

    componentDidMount = () => {
        this.load()
    }

    //on load
    load = async () => {
        let reqData = {
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            refDateTime: this.props.mainPageData.selectedMainDate,
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("callSummary", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                this.setState({ callSumData: modResponseData })
            }
        }
        this.setState({ pageLoader: false })

    }
    render() {
        return (
            <>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginTop: 15, height: 260, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <View style={styles.callSummMainView}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.callSummTitleText}>Call Summary</Text>
                        </View>
                        <View style={styles.callSummMainBodyView}>
                            <View style={styles.callSummSubBodyView}>
                                <View style={styles.callSummProgressView}>
                                    {/* <CircularProgressBase
                                value={item.target.percentage}
                                activeStrokeColor={item.color}
                                inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                activeStrokeWidth={5}
                                inActiveStrokeWidth={5}
                                DashedCircleProps={{
                                    circleCircumference: 5,
                                }}
                                radius={30}
                                clockwise={true}>
                                <View style={styles.callSummPercentageView}>
                                    <Text style={styles.callSummPercentageText}>{item.target.percentage}%</Text>
                                </View>
                            </CircularProgressBase> */}
                                    <Text style={styles.callSumTargetText}>{this.state.callSumData.totalVisit}</Text>
                                    <Text style={styles.callSumTargetText}>{"Total"}</Text>
                                </View>
                            </View>
                            <View style={styles.callSummSubBodyView}>
                                <View style={styles.callSummProgressView}>
                                    <CircularProgressBase
                                        value={this.state.callSumData.prodVisitPercentage}
                                        activeStrokeColor={"#F68217"}
                                        inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                        activeStrokeWidth={5}
                                        inActiveStrokeWidth={5}
                                        DashedCircleProps={{
                                            circleCircumference: 5,
                                        }}
                                        radius={30}
                                        clockwise={true}>
                                        <View style={styles.callSummPercentageView}>
                                            <Text style={styles.callSummPercentageText}>{this.state.callSumData.prodVisitPercentage}%</Text>
                                        </View>
                                    </CircularProgressBase>
                                    <Text style={styles.callSumTargetText}>{"Productive"}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <View style={styles.tcGrowthTitleView}>
                                <Text style={styles.tcGrowthTitleText}>TC Growth</Text>
                            </View>
                            <View style={styles.tcGrowthMainView}>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.tcGrowthAmountText}>{this.state.callSumData.totalVisitMTD}</Text>
                                    <Text style={styles.ltdLmtdText}>MTD</Text>
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={styles.tcGrowthAmountText}>{this.state.callSumData.totalVisitLMTD}</Text>
                                    <Text style={styles.ltdLmtdText}>LMTD</Text>
                                </View>
                                <View style={styles.tcGrowthPercentageView}>
                                    <Text style={styles.tcGrowthPercentageText}>{getVisitDifferencePercentage(this.state.callSumData.totalVisitMTD, this.state.callSumData.totalVisitLMTD)}%</Text>
                                    {getVisitDifferencePercentage(this.state.callSumData.totalVisitMTD, this.state.callSumData.totalVisitLMTD) == 0 ? null :
                                        <View>
                                            <Image source={this.state.callSumData.totalVisitMTD > this.state.callSumData.totalVisitLMTD ? ImageName.GREEN_UP_ARROW : ImageName.RED_DOWN_ARROW_ICON} style={styles.tcGrowthArrowImg} />
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={styles.netValMainView}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.netValText}>Net Val.</Text>
                                </View>
                                <Text style={styles.netValAmountText}>₹ {getAmountWithUnit(this.state.callSumData.netVal)}</Text>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }
}
