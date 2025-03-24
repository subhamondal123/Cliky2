import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as Progress from 'react-native-progress';
import styles from './style';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modData } from './function';
import { Loader } from '../../../shared';
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { GetUserData } from '../../../services/common-view-function';
import { Color, FontFamily, FontSize } from '../../../enums';
import { ScrollView } from 'react-native-gesture-handler';


export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoader: true,
            designationLoader: false,
            dgmLoader: false,
            designationArr: [],
            selectedDesignationObj: {},
            dgmWiseOrderArr: [],
            maxAmount: 0,
            designationName: ""
        }
    }

    componentDidMount = async () => {
        await this.load()
        await this.setDesignationName()
    }
    //on load
    load = async () => {
        this.setState({ dgmLoader: true })
        let userData = await GetUserData.getAllUserData()
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
                // let name = this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationName : ""
                this.setState({ dgmWiseOrderArr: modResponseData, maxAmount: maxValue })
            }
        }
        this.setState({ dgmLoader: false, pageLoader: false })
    }

    // dget designation from general data api
    setDesignationName = async () => {
        let name = "";
        let apiRespName = "";
        let responseData = await MiddlewareCheck("getGeneralData", {}, this.props)
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                apiRespName = responseData.data.details.designationName
            }
        }
        name = this.props.mainPageData.selectedDesignationObj.designationName ? this.props.mainPageData.selectedDesignationObj.designationName : apiRespName
        this.setState({ designationName: name })
    }
    render() {
        return (
            <>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginTop: 15, height: 160, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <View style={styles.dgmMainView}>
                        <View style={styles.dgmTitleView}>
                            <Text style={styles.dgmTitleText}>{this.state.designationName} Wise Order</Text>
                            <View style={styles.dgmMtdView}>
                                <Text style={styles.dgmMtdText}>MTD</Text>
                            </View>
                        </View>
                        {this.state.dgmLoader ?
                            <Loader type={"normal"} />
                            :
                            <React.Fragment>
                                {this.state.dgmWiseOrderArr.length > 0 ?
                                    <View style={{ maxHeight: 200 }}>
                                        <ScrollView>
                                            {this.state.dgmWiseOrderArr.map((item, key) => (
                                                <View key={key} style={styles.dgmBarChartMainView}>
                                                    <View style={styles.dgmNameView}>
                                                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS }}>{item.firstname + " " + item.lastname}</Text>
                                                    </View>
                                                    <View style={styles.dgmBarView}>
                                                        <View style={{ flex: 1 }}>
                                                            <Progress.Bar
                                                                progress={item.totalSalesAmnt / parseInt(this.state.maxAmount)}
                                                                height={30}
                                                                color={"#156A94"}
                                                                borderWidth={0}
                                                                unfilledColor={'#C7D2DB'}
                                                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                            />
                                                        </View>
                                                        <View style={styles.dgmAmountView}>
                                                            <Text style={styles.dgmAmountText}>{getAmountWithUnit(item.totalSalesAmnt)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        </ScrollView>

                                    </View>
                                    :
                                    <View style={styles.noDataFoundSec}>
                                        <Text style={styles.noDataFound}>No Data Found !</Text>
                                    </View>
                                }
                            </React.Fragment>
                        }
                    </View>
                }
            </>
        )
    }
}
