//1. tick is used for check and uncheck with tick icon, 
//2. singleSelectBox is used for one time check. 
//3. circle is used for check and uncheck with round circle 


import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import Pie from 'react-native-pie';
import { VictoryLabel, VictoryPie } from 'victory-native';


function PieChart({
    isHidden,
    innerRadius,
    radius,
    data
}) {
    if (isHidden) return null;

    if (Object.keys(data).length == 0) {
        return null;
    }

    return (
        // <Pie
        //     radius={data.radius ? data.radius : radius}
        //     innerRadius={data.donut ? data.donut : innerRadius}
        //     sections={data.graphData.data}
        //     strokeCap={data.strokeCap}
        // />
        <VictoryPie
            innerRadius={data.donut ? data.donut : innerRadius}
            colorScale={data.colorScale}
            data={data.graphData.data}
            style={data.graphData.style}
            height={data.radius ? data.radius : radius}
            width={data.radius ? data.radius : radius}
            labelComponent={<VictoryLabel angle={45} />}
        />
    )
}

PieChart.defaultProps = {
    isHidden: false,
    innerRadius: 0,
    radius: 300,
    data: {}
};

PieChart.propTypes = {
    isHidden: PropTypes.bool,
    innerRadius: PropTypes.number,
    radius: PropTypes.number,
    data: PropTypes.instanceOf(Object)
};


export default PieChart;