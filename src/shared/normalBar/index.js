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


function NormalBar({
    isHidden,
    horizontal,
    data
}) {
    if (isHidden) return null;

    if (Object.keys(data).length == 0) {
        return null;
    }


    let VectorBar = [];

    if (data.graphData.data !== undefined && data.graphData.data.length > 0) {
        for (let i = 0; i < data.graphData.data.length; i++) {
            VectorBar.push(
                <VictoryBar
                    style={data.graphData.style}
                    // cornerRadius={{ topLeft: 5, topRight: 5 }}
                    categories={data.categories}
                    data={data.graphData.data[i]}
                    key={i} />
            )
        }
    }


    return (
        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft:'3%' }}>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 20 }}
                horizontal={data.horizontal ? data.horizontal == "true" ? true : false : horizontal}
            >
                {VectorBar}
            </VictoryChart>
        </View>
    )
}

NormalBar.defaultProps = {
    isHidden: false,
    horizontal: false,
    data: {}
};

NormalBar.propTypes = {
    isHidden: PropTypes.bool,
    horizontal: PropTypes.bool,
    data: PropTypes.instanceOf(Object)
};


export default NormalBar;