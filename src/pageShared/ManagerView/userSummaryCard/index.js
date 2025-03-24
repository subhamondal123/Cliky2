import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CircularProgressBase } from 'react-native-circular-progress-indicator'
import { Color } from '../../../enums'
import styles from './styles'
import { MiddlewareCheck } from '../../../services/middleware'
import { modData, normalizeValue } from './function'
import { ErrorCode } from '../../../services/constant'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'


export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: true,
            userSummArr: {}
        }
    }

    componentDidMount = () => {
        this.load()
    }
    //on load function
    load = async () => {
        let reqData = {
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            refDateTime: this.props.mainPageData.selectedMainDate,
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : ""
        }
        let responseData = await MiddlewareCheck("getUserSummary", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modResponseData = modData(responseData.response)
                this.setState({ userSummArr: modResponseData })
            }
        }
        this.setState({ pageLoader: false })
    }

    //on selecting the summary card
    onSelect = () => {
        this.props.navigation.navigate("UserSummary", { "mainPageData": this.props.mainPageData })
    }

    render() {
        return (
            <>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ height: 160, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <View style={styles.userSummMainView} >
                        <TouchableOpacity style={styles.userSummTitleView} onPress={() => this.onSelect()} activeOpacity={0.8}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.userSummTitle}>User Summary</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.userSummTotal}>Total</Text>
                                <Text style={styles.userSummNum}>{this.state.userSummArr.userCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={styles.userSummBodyView}>
                                <View style={styles.userSummProgressView}>
                                    <View>
                                        <CircularProgressBase
                                            value={normalizeValue(this.state.userSummArr.retailCount, this.state.userSummArr.totalCount)}
                                            activeStrokeColor={"#00B65E"}
                                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                            activeStrokeWidth={5}
                                            inActiveStrokeWidth={5}
                                            radius={30}
                                            clockwise={true}>
                                            <View style={styles.userSummScoreView}>
                                                <Text style={styles.userSummScoreText}>{this.state.userSummArr.retailCount}</Text>
                                            </View>
                                        </CircularProgressBase>
                                    </View>
                                    <View>
                                        <Text style={styles.userSummProgressTitle}>{"Retailing"}</Text>
                                    </View>
                                </View>
                                {/* ))} */}
                                <View style={styles.userSummProgressView}>
                                    <View>
                                        <CircularProgressBase
                                            value={normalizeValue(this.state.userSummArr.officeCount, this.state.userSummArr.totalCount)}
                                            activeStrokeColor={"#149CE0"}
                                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                            activeStrokeWidth={5}
                                            inActiveStrokeWidth={5}
                                            radius={30}
                                            clockwise={true}>
                                            <View style={styles.userSummScoreView}>
                                                <Text style={styles.userSummScoreText}>{this.state.userSummArr.officeCount}</Text>
                                            </View>
                                        </CircularProgressBase>
                                    </View>
                                    <View>
                                        <Text style={styles.userSummProgressTitle}>{"Office Work"}</Text>
                                    </View>
                                </View>
                                <View style={styles.userSummProgressView}>
                                    <View>
                                        <CircularProgressBase
                                            value={normalizeValue(this.state.userSummArr.leaveCount, this.state.userSummArr.totalCount)}
                                            activeStrokeColor={"#F68217"}
                                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                            activeStrokeWidth={5}
                                            inActiveStrokeWidth={5}
                                            radius={30}
                                            clockwise={true}>
                                            <View style={styles.userSummScoreView}>
                                                <Text style={styles.userSummScoreText}>{this.state.userSummArr.leaveCount}</Text>
                                            </View>
                                        </CircularProgressBase>
                                    </View>
                                    <View>
                                        <Text style={styles.userSummProgressTitle}>{"Leave"}</Text>
                                    </View>
                                </View>
                                <View style={styles.userSummProgressView}>
                                    <View>
                                        <CircularProgressBase
                                            value={normalizeValue(this.state.userSummArr.absentCount, this.state.userSummArr.totalCount)}
                                            activeStrokeColor={"#F13748"}
                                            inActiveStrokeColor={Color.COLOR.GRAY.GRAY_TINTS}
                                            activeStrokeWidth={5}
                                            inActiveStrokeWidth={5}
                                            radius={30}
                                            clockwise={true}>
                                            <View style={styles.userSummScoreView}>
                                                <Text style={styles.userSummScoreText}>{this.state.userSummArr.absentCount}</Text>
                                            </View>
                                        </CircularProgressBase>
                                    </View>
                                    <View>
                                        <Text style={styles.userSummProgressTitle}>{"Absent"}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                }

            </>

        )
    }
}
