import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { VictoryArea, VictoryAxis, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native'
import { Color, Dimension, FontFamily } from '../../../enums';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { Loader } from '../../../shared';
import { modifyChartData, modifyTargetAchievementChartData } from './function';

const data = [
    { x: 0, y: 3000 },
    { x: 1000, y: 1500 },
    { x: 3000, y: 2500 },
    { x: 10000, y: 300 },
    // { x: "Mar", y: 51 },
    // { x: "Apr", y: 40 },
    // { x: "May", y: 2 },
    // { x: "June", y: 700 },
    // { x: "july", y: 356 },
    // { x: "Aug", y: 51 },
    // { x: "Sept", y: 40 },
    // { x: "Oct", y: 2 },
    // { x: "Nov", y: 40 },
    // { x: "Dec", y: 2 },
];

export default class CrmDashboardBarChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartLoader: false,
            targetLoader: false,
            chartDataArr: [],
            targetAchievementDataArr: []
        }
    }
    componentDidMount = () => {
        this.getChartData()
        this.getTargetAchievementData()
    }
    getChartData = async () => {
        this.setState({ chartLoader: true })
        let responseData = await MiddlewareCheck("getMaterialConversionData", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let chartData = modifyChartData(responseData.response)
                this.setState({ chartDataArr: chartData })
            }
        }
        this.setState({ chartLoader: false })

    }
    getTargetAchievementData = async () => {
        this.setState({ targetLoader: true })
        let responseData = await MiddlewareCheck("getUserTargetVsAchievement", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let chartData = modifyTargetAchievementChartData(responseData.response)
                this.setState({ targetAchievementDataArr: chartData })
            }
        }
        this.setState({ targetLoader: false })

    }

    materialConversionChart = () => {
        return (
            <>
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, top: 20 }}>Material Conversion</Text>
                {this.state.chartLoader ?
                    <View style={{ marginTop: 50 }}>
                        <Loader type={"normal"} />
                    </View>
                    :
                    <VictoryChart
                        theme={VictoryTheme.material}
                        // style={{ parent: { border: 0 } }} // Customize other styles as needed
                        // containerComponent={<VictoryContainer translate={{ x: 100 }} />} // Add this line to set left margin
                        // padding={{ right:50 }} 
                        // domainPadding={{ x: 0 }}
                        height={300}
                        width={Dimension.width - 40}
                    >
                        <VictoryAxis
                            // tickValues={[4, 6, 8]}
                            crossAxis={false}
                            offsetY={48}
                            // tickComponent={tickMainComponent}
                            style={{
                                grid: { stroke: 'none' }, // to hide the grid
                                axis: { stroke: "black" }, // to make the axis invisible
                                ticks: { stroke: "black", size: 2 }, // to hide the line of this particular axis
                                tickLabels: { fill: "#63677A", fontSize: 10, fontWeight: 400 },
                            }}
                        />
                        <VictoryAxis
                            tickCount={6}
                            dependentAxis
                            // tickValues={[4, 6, 8]}
                            crossAxis={false}
                            offsetX={48}
                            style={{
                                grid: { stroke: 'none' },
                                axis: { stroke: "black" }, // to make the axis invisible
                                ticks: { stroke: "black", size: 2 },
                                tickLabels: { fill: "#63677A", fontSize: 10, fontWeight: 400 }
                                // tickLabels: { fill: 'black' }, // Make the tick labels invisible
                            }}
                        />
                        <VictoryArea
                            interpolation="natural"
                            data={this.state.chartDataArr}
                            style={{
                                data: { fill: '#f73120', stroke: '#8a160c', strokeWidth: 3 },

                            }}
                        animate={{
                            duration: 600,
                            onLoad: { duration: 600 }
                        }}
                        />
                    </VictoryChart>
                }
            </>
        )
    }

    targetVsAchievement = () => {
        return (
            <>
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, top: 20 }}>Target vs Achievement</Text>
                {this.state.targetLoader ?
                    <View style={{ marginTop: 50 }}>
                        <Loader type={"normal"} />
                    </View>
                    :
                    <VictoryChart
                        theme={VictoryTheme.material}
                        // style={{ parent: { border: 0 } }} // Customize other styles as needed
                        // containerComponent={<VictoryContainer translate={{ x: 100 }} />} // Add this line to set left margin
                        // padding={{ right:50 }} 
                        // domainPadding={{ x: 0 }}

                        height={300}
                        width={Dimension.width - 40}
                    >
                        <VictoryAxis
                            // tickValues={[4, 6, 8]}
                            crossAxis={false}
                            offsetY={48}
                            
                            // tickComponent={tickMainComponent}
                            style={{
                                grid: { stroke: 'none' }, // to hide the grid
                                axis: { stroke: "black" }, // to make the axis invisible
                                ticks: { stroke: "black", size: 2 }, // to hide the line of this particular axis
                                tickLabels: { fill: "#63677A", fontSize: 10, fontWeight: 400 },
                            }}
                        />
                        <VictoryAxis
                            tickCount={6}
                            dependentAxis
                            domain={[0, 10000]} // Set a fixed value for the top of the Y-axis

                            // tickValues={[4, 6, 8]}
                            crossAxis={false}
                            offsetX={48}
                            style={{
                                grid: { stroke: 'none' },
                                axis: { stroke: "black" }, // to make the axis invisible
                                ticks: { stroke: "black", size: 2 },
                                tickLabels: { fill: "#63677A", fontSize: 10, fontWeight: 400 }
                                // tickLabels: { fill: 'black' }, // Make the tick labels invisible
                            }}
                        />
                        <VictoryArea
                            interpolation="natural"
                            data={this.state.targetAchievementDataArr}
                            style={{
                                data: { fill: '#3498db', stroke: '#2980b9', strokeWidth: 3 },

                            }}
                        animate={{
                            duration: 600,
                            onLoad: { duration: 600 }
                        }}
                        />
                    </VictoryChart>
                }
            </>
        )
    }
    render() {
        return (
            <View style={{}}>
                {this.props.type == "materialConversion" ?
                    <>
                        {this.materialConversionChart()}
                    </>
                    :
                    null
                }
                {this.props.type == "materialConversion" ?
                    <>
                        {this.targetVsAchievement()}
                    </>
                    :
                    null
                }


            </View>
        )
    }
}
