//1. tick is used for check and uncheck with tick icon, 
//2. singleSelectBox is used for one time check. 
//3. circle is used for check and uncheck with round circle 


import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    SafeAreaView,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Color,
    ImageName
} from '../../enums';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine, VictoryPie, VictoryScatter, VictoryTheme } from 'victory-native';


function BarGroup({
    isHidden,
    horizontal,
    data
}) {
    if (isHidden) return null;

    if (Object.keys(data).length == 0) {
        return null;
    }


    let VectorBar = [];

    if (data.graphData !== undefined && data.graphData.data.length > 0) {
        for (let i = 0; i < data.graphData.data.length; i++) {
            VectorBar.push(
                <VictoryBar
                    // cornerRadius={{ topLeft: 5, topRight: 5 }}
                    style={data.graphData.style}
                    categories={data.categories}
                    data={data.graphData.data[i]}
                    key={i} />
            )
        }
    }

    return (
        <View style={{marginLeft:'3%'}}>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ y: [0.4, 5.4] }}
            >
                <VictoryGroup
                    horizontal={data.horizontal ? data.horizontal == "true" ? true : false : horizontal}
                    offset={10}
                    style={{ data: { width: 6, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 } }}
                    colorScale={data.colorScale ? data.colorScale : []}
                >
                    {VectorBar}
                </VictoryGroup>
            </VictoryChart>
        </View>
    )
}

BarGroup.defaultProps = {
    isHidden: false,
    horizontal: false,
    data: {}
};

BarGroup.propTypes = {
    isHidden: PropTypes.bool,
    horizontal: PropTypes.bool,
    data: PropTypes.instanceOf(Object)
};


export default BarGroup;