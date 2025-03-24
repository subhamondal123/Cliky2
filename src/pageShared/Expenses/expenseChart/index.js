import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryTheme } from 'victory-native'
import { Dimension, ImageName } from '../../../enums'
import { Image } from 'react-native';
import { ForeignObject } from 'react-native-svg';

const tickMainComponent = (props) => (
    // <ForeignObject>
    //     <View style={{ width: 20, height: 20 }}>
    //         <Image source={ImageName.EXPENSE_VISIT_ICON} style={{ width: 20, height: 20 }} />
    //     </View>
    // </ForeignObject>

    <ForeignObject style={{ paddingTop: String(props.xAxisImagesTopPadding) + "px", paddingLeft: String(props.xAxisImagesLeftInitialPadding + (props.xAxisImagesTickSize * props.index)) + "px" }}>
        {
            props.xAxisInformation[props.index] !== undefined ?
                <Image source={ImageName.EXPENSE_VISIT_ICON} style={{ width: 20, height: 20 }} />
                : null
        }
    </ForeignObject>

);
class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView>

                <VictoryChart theme={VictoryTheme.material}

                // animate={{
                //     duration: 500,
                //     onLoad: { duration: 500 }
                // }}
                >
                    <VictoryAxis
                        // tickComponent={tickMainComponent}
                        style={{
                            grid: { stroke: 'none' }, // to hide the grid
                            axis: { stroke: "transparent" }, // to make the axis invisible
                            ticks: { stroke: "transparent" }, // to hide the line of this particular axis
                            tickLabels: { fill: "#63677A", fontSize: 15, fontWeight: 600 }

                        }}

                    />
                    <VictoryAxis
                        tickCount={6}
                        dependentAxis
                        crossAxis={false}
                        offsetX={45}
                        style={{
                            grid: { stroke: 'none' },
                            ticks: { stroke: "transparent" },
                            tickLabels: { fill: "#63677A", fontSize: 10, fontWeight: 400 }
                        }}


                    />
                    {/* <VictoryAxis label="Week"/> */}
                    <VictoryGroup offset={20}  >
                        <VictoryBar
                            data={this.props.data.previous}
                            cornerRadius={8}
                            // labels={({ datum }) => datum.y}  

                            style={{
                                data: {
                                    fill: "#CCCDD2"  //set backgroud color of the bar
                                }
                            }}
                        />
                        <VictoryBar
                            cornerRadius={8}
                            data={this.props.data.current}
                            // labels={({ datum }) => datum.y}
                            style={{
                                data: {
                                    fill: ({ datum }) => datum.x == "Visit" ? "#156A94" : datum.x == "Meter" ? "#57942B" : datum.x == "Food" ? "#E06336" : "#604D8B",
                                }
                            }}

                        />
                    </VictoryGroup>
                    {/* VictoryLegend is used for showing the bar labels means it defines which color denotes each bar */}
                    <VictoryLegend

                        x={Dimension.width / 2 - 80}
                        orientation='horizontal'
                        gutter={30}
                        data={[
                            {
                                name: "Previous Expenses",
                                symbol: {
                                    fill: "#CCCDD2"
                                }
                            },
                            // {
                            //     name: "Current",
                            //     symbol: {
                            //         fill: "#156A94"
                            //     }
                            // }
                        ]} />
                </VictoryChart>
            </SafeAreaView>
        )
    }
}

export default Index;
