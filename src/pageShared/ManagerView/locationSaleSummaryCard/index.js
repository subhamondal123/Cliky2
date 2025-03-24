import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel, VictoryTheme } from 'victory-native'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums'
import { DropdownInputBox, Loader, SingleSelectModalDropdown } from '../../../shared'
import { MiddlewareCheck } from '../../../services/middleware'
import { ErrorCode } from '../../../services/constant'
import { modData, modMainData, setChartData } from './function'
import { DateConvert } from '../../../services/common-view-function'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { getAmountWithUnit } from '../../../services/common-view-function/commonFunctions'
import styles from './style'

// const locationSaleData = [
//     { "x": "West", "y": 200 },
//     { "x": "South", "y": 100 },
//     { "x": "North", "y": 500 },
//     { "x": "East", "y": 700 },
//     // { "x": "h", "y": 700 }
// ]


export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: true,
            chartLoader: false,
            levelLoader: false,
            modalVisible: false,
            selectedLevelObj: {},
            levelArr: [],
            mainData: [],
            locationSaleData: [],
            netAmount: 0
        }
    }

    componentDidMount = () => {
        this.load()
    }

    //on load function
    load = async () => {
        this.setState({ levelLoader: true })
        let reqData = {
            hmId: 1
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

    //get the chart data
    getHierarcywiseOrder = async (val) => {
        this.setState({ chartLoader: true })
        let reqData = {
            refDesignationId: this.props.mainPageData.selectedDesignationObj.userId == null || this.props.mainPageData.selectedDesignationObj.userId == undefined || this.props.mainPageData.selectedDesignationObj.userId == "" ? this.props.mainPageData.selectedDesignationObj.designationId ? this.props.mainPageData.selectedDesignationObj.designationId : "" : "",
            refUserId: this.props.mainPageData.selectedDesignationObj.userId ? this.props.mainPageData.selectedDesignationObj.userId : "",
            hierarchyTypeId: val.id,
            refDateTime: this.props.mainPageData.selectedMainDate
        }
        let responseData = await MiddlewareCheck("hiearchyTypeWiseOrder", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modMainData(responseData.response).listData
                let totalAmount = modMainData(responseData.response).totalAmount
                this.setState({ locationSaleData: modData, netAmount: totalAmount })
            }
        }
        this.setState({ chartLoader: false })
    }

    //set the level
    _onSelectLevel = async (val) => {
        await this.setInitialData()
        this.setState({ selectedLevelObj: val, modalVisible: false })
        await this.getHierarcywiseOrder(val)
    }

    //initial data set
    setInitialData = async () => {
        this.setState({
            locationSaleData: [],
            netAmount: 0
        })
    }

    //redirect to location wise sales screen
    onSelect = () => {
        this.props.navigation.navigate("LocationWiseSales", { levelData: this.state.selectedLevelObj, "mainPageData": this.props.mainPageData });
    }

    //open close level modal
    onOpenAndCloseModal = (type) => {
        this.setState({
            modalVisible: type
        })
    }

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
                        <View style={{ marginTop: 20, height: 450, borderRadius: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.onSelect()} activeOpacity={0.8}>
                        <View style={{}}  >
                            <View style={{ alignItems: 'center', }}>
                                <Image source={ImageName.LOCATION_SUMMERY} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <View style={{ flex: 1 }} />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.headerTxt}>Location Sale Summary</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                <View style={styles.dgmMtdView}>
                                    <Text style={styles.dgmMtdText}>MTD</Text>
                                </View>
                            </View>
                        </View>

                        {this.state.levelLoader ?
                            <Loader type={"normal"} />
                            :
                            // <DropdownInputBox
                            //     selectedValue={this.state.selectedLevelObj.id ? this.state.selectedLevelObj.id.toString() : "0"}
                            //     data={this.state.levelArr}
                            //     onSelect={(value) => this._onSelectLevel(value)}
                            //     headerText={"*Select Level"}
                            //     // // selectedText={this.state.selectedTaskCategoryObj.name ? this.state.selectedTaskCategoryObj.name : "Select Task Category"}
                            //     // selectedTextColor={this.state.selectedUserObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            //     isBackButtonPressRequired={true}
                            //     isBackdropPressRequired={true}
                            //     isSearchable={true}
                            // />
                            <React.Fragment>
                                {this.state.locationSaleData.length > 0 ?
                                    <TouchableOpacity style={styles.iconSec} onPress={() => this.onOpenAndCloseModal(true)}>
                                        <Image source={ImageName.HORIZONTAL_THREE_DOT} style={styles.threeDotImg} />
                                    </TouchableOpacity>
                                    : null}
                            </React.Fragment>

                        }
                        {/* <ScrollView> */}

                        {this.state.chartLoader ? <Loader type="normal" /> :
                            // <TouchableOpacity onPress={() => this.onSelect()} style={{backgroundColor:"green"}}>
                            <React.Fragment>
                                {this.state.locationSaleData.length > 0 ?
                                    <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}>
                                        <View >
                                            <VictoryChart
                                                theme={VictoryTheme.material}
                                                padding={{ left: 70, right: 70, top: 50, bottom: 30 }} // Adjust padding as needed

                                            >
                                                <VictoryAxis
                                                    style={{
                                                        // grid: { stroke: 'none' }, // to hide the grid
                                                        axis: { stroke: "none" }, // to make the axis invisible
                                                        ticks: { stroke: "none", size: 2 }, // to hide the line of this particular axis
                                                        tickLabels: { fill: "#63677A", fontSize: setChartData(this.state.locationSaleData).length > 2 ? 9 : setChartData(this.state.locationSaleData).length > 6 ? 9 : 12, fontWeight: 400 },
                                                    }}
                                                    // tickLabelComponent={<VictoryLabel angle={45}/>}
                                                    offsetX={100}
                                                />
                                                <VictoryBar
                                                    cornerRadius={{ topLeft: 10, topRight: 10 }}
                                                    barWidth={setChartData(this.state.locationSaleData).length > 3 ? 50 : setChartData(this.state.locationSaleData).length > 6 ? 30 : 70}
                                                    data={setChartData(this.state.locationSaleData)}
                                                    style={{ data: { fill: "#156A94", } }}
                                                    labels={({ datum }) => getAmountWithUnit(datum.y)} // Use datum.y as the label
                                                    labelComponent={<VictoryLabel dy={-10} />} // Adjust dy as needed to position the label
                                                />
                                            </VictoryChart>
                                        </View>
                                    </ScrollView>
                                    :
                                    <View style={styles.noDataFoundSec}>
                                        <Text style={styles.noDataFound}>No Data Found !</Text>
                                    </View>
                                }
                            </React.Fragment>
                        }
                        <View style={styles.totalAmountSec}>
                            <Text style={styles.totalTxt}>Total</Text>
                            <Text style={styles.netAmountTxt}>₹ {getAmountWithUnit(this.state.netAmount)}</Text>
                        </View>
                        {this.modalSec()}
                    </TouchableOpacity>
                }
            </>

        )
    }
}
