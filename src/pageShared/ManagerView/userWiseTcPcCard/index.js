import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import * as Progress from 'react-native-progress';
import styles from './style';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modData, modifyDesignationData } from './function';
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions';
import { Color, Dimension, FontFamily, FontSize } from '../../../enums';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';



const valColor = {
    tc: Color.COLOR.PURPLE.DAVY_PURPLE,
    pc: "#89CDEF",
    netVal: Color.COLOR.BLUE.CYAN_BLUE_AZURE
}

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: true,
            designationLoader: false,
            dgmLoader: false,
            valColor: valColor,
            userValArr: [],
            maxAmount: 0,
            pcMaxValue: 0,
            tcMaxValue: 0
        }
    }

    componentDidMount = async () => {
        await this.load()
    }
    // on load functionality
    load = async () => {
        this.setState({ dgmLoader: true })
        let reqData = {
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            refDateTime: this.props.mainPageData.selectedMainDate,
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("userWiseCallValue", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response).list
                let maxValue = modData(responseData.response).maxValue
                let tcMax = modData(responseData.response).tcMaxValue
                let pcMax = modData(responseData.response).pcMaxValue

                this.setState({ userValArr: modResponseData, maxAmount: maxValue, tcMaxValue: tcMax, pcMaxValue: pcMax })
            }
        }
        this.setState({ dgmLoader: false, pageLoader: false })

    }

    // select the card section 
    onSelect = () => {
        this.props.navigation.navigate("UserWiseSalesValue", { propData: this.state.userValArr, maxValue: { maxAmount: this.state.maxAmount, pcMaxValue: this.state.pcMaxValue, tcMaxValue: this.state.tcMaxValue, } })
    }

    render() {
        return (
            <>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginTop: 20, height: 160, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <TouchableOpacity onPress={() => this.onSelect()} style={styles.cardSection} activeOpacity={0.8}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.cardHeaderTxt}>User Wise TC PC & Sales Value</Text>
                                <View style={{ flex: 1 }} />
                                <View style={styles.dgmMtdView}>
                                    <Text style={styles.dgmMtdText}>MTD</Text>
                                </View>
                            </View>
                            {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>User Wise TC PC & Sales Value</Text> */}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <View style={[styles.labelIcon, { backgroundColor: this.state.valColor.tc }]} />
                                    <Text style={styles.labelTxt}>TC</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <View style={[styles.labelIcon, { backgroundColor: this.state.valColor.pc }]} />
                                    <Text style={styles.labelTxt}>PC</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <View style={[styles.labelIcon, { backgroundColor: this.state.valColor.netVal }]} />
                                    <Text style={styles.labelTxt}>net Value</Text>
                                </View>
                            </View>
                        </View>
                        {this.state.userValArr.length > 0 ?
                            <React.Fragment>
                                {this.state.userValArr.map((item, key) => (
                                    <View key={key} style={styles.listItemSec}>
                                        <View style={styles.nameSec}>
                                            <Text style={styles.nameTxt}>{item.firstname + " " + item.lastname}</Text>
                                        </View>
                                        <View style={styles.mainBarSec}>
                                            <View style={{ marginVertical: 5, flexDirection: "row" }}>
                                                <Progress.Bar
                                                    progress={item.totalSalesAmnt / this.state.maxAmount}
                                                    width={Dimension.width - 200}
                                                    height={20}
                                                    color={this.state.valColor.tc}
                                                    borderWidth={0}
                                                    unfilledColor={'#C7D2DB'}
                                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                />
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.amountSec}>{item.totalVisits}</Text>

                                            </View>
                                            <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                                                <Progress.Bar
                                                    progress={item.totalProductiveVisits / this.state.pcMaxValue}
                                                    width={Dimension.width - 200}
                                                    height={20}
                                                    color={this.state.valColor.pc}
                                                    borderWidth={0}
                                                    unfilledColor={'#C7D2DB'}
                                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                />
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.amountSec}>{item.totalProductiveVisits}</Text>

                                            </View>
                                            <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                                                <Progress.Bar
                                                    progress={item.totalVisits / this.state.tcMaxValue}
                                                    width={Dimension.width - 200}
                                                    height={20}
                                                    color={this.state.valColor.netVal}
                                                    borderWidth={0} unfilledColor={'#C7D2DB'}
                                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                />
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.amountSec}>{getAmountWithUnit(item.totalSalesAmnt)}</Text>

                                            </View>


                                        </View>
                                    </View>
                                ))}
                            </React.Fragment>
                            :
                            <View style={styles.noDataFoundSec}>
                                <Text style={styles.noDataFound}>No Data Found !</Text>
                            </View>
                        }
                    </TouchableOpacity>
                }
            </>


        )
    }
}
