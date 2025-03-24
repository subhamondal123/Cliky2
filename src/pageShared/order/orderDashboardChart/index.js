import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Rect, VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryTheme } from 'victory-native'
import { Dimension, ImageName } from '../../../enums'
import { Image } from 'react-native';
import { ForeignObject } from 'react-native-svg';

const EmptyComponent = () => null;

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <SafeAreaView>

                <VictoryChart
                    domainPadding={{ x: 25 }}
                    // padding={0.1}
                    width={Dimension.width - 10}

                    theme={VictoryTheme.material}


                // animate={{
                //     duration: 500,
                //     onLoad: { duration: 500 }
                // }}
                >
                    <VictoryAxis
                        // tickComponent={tickMainComponent}
                        tickLabelComponent={<EmptyComponent />}
                        label=""
                        style={{
                            grid: { stroke: 'none' }, // to hide the grid
                            axis: { stroke: "transparent" }, // to make the axis invisible
                            ticks: { stroke: "transparent" }, // to hide the line of this particular axis
                            tickLabels: { fill: "#63677A", fontSize: 15, fontWeight: 600 }


                        }}

                    />
                    <VictoryAxis
                        tickCount={9}
                        dependentAxis
                        // orientation='right'
                        crossAxis={false}
                        offsetX={30}
                        // domain={[0, 4]} // Set the domain to create space on the left side
                        // domainPadding={{ left: 50 }} // Add additional padding on the left side

                        style={{
                            grid: { stroke: 'none' },
                            // ticks: { stroke: "transparent" },
                            tickLabels: { fill: "#1F2B4D", fontSize: 10, fontWeight: 400 }
                        }}


                    />
                    <VictoryGroup offset={0}  >
                        <VictoryBar
                            barWidth={50}
                            data={this.props.data}
                            x="x"
                            y="y2"
                            cornerRadius={8}
                            // labels={({ datum }) => datum.y}  

                            style={{
                                data: {
                                    fill: "#D5E1FF"  //set backgroud color of the bar
                                }
                            }}
                        />

                        <VictoryBar
                            barWidth={50}
                            cornerRadius={8}
                            data={this.props.data}
                            x="x"
                            y="y1"
                            // labels={({ datum }) => datum.y}
                            style={{
                                data: {
                                    fill: "#BED9ED"
                                }
                            }}

                        />
                    </VictoryGroup>
                    {/* VictoryLegend is used for showing the bar labels means it defines which color denotes each bar */}
                    <VictoryLegend
                        // dataComponent={<CustomSymbol />} 
                        x={Dimension.width - 150}
                        orientation='vertical'
                        gutter={30}
                        style={{
                            labels: {
                                fontSize: 12, fill: 'black',fontWeight:500
                            }
                        }}
                        data={[
                            {
                                name: "Present Stock",
                                symbol: {
                                    fill: "#BED9ED"
                                }
                            },
                            {
                                name: "Last Stock",
                                symbol: {
                                    fill: "#E9EFFF"
                                }
                            },

                        ]} />
                </VictoryChart>
            </SafeAreaView>
        )
    }
}

export default Index;
