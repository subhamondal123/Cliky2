//1. this is used for activity process bar with data


import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import Swiper from 'react-native-swiper';
import { BarGroup, NormalBar, NormalLoader, PieChart } from '../../shared';
import { Color } from '../../enums';

function DynamicGraph({
    data,
    isHidden,
    isDisabled,
    loader
}) {
    if (isHidden) return null;

    if (data == undefined || data.length == 0) {
        return null;
    }

    var graphArrData = [];

    const graphViewStyle = { height: 400, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' };

    if (data !== undefined && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            graphArrData.push(
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                    key={i}>
                    {data[i].title && data[i].title.length > 0 ?
                        <View style={[{ width: '90%', marginHorizontal: '5%' }, data[i].type == "PieChart" ? { marginBottom: '5%' } : {}]}>
                            <Text style={styles.targetText}>{data[i].title}</Text>
                        </View> :
                        null
                    }
                    {data[i].header && Object.keys(data[i].header).length > 0 ?
                        <View style={[{ width: '90%', flexDirection: 'row', paddingTop: 5 }]}>
                            {HeaderTextView(data[i].header)}
                            {/* <Text style={styles.targetText}>{data[i].title}</Text> */}
                        </View> :
                        null
                    }
                    {graphViewData(data[i], loader)}
                </View>
            )
        }
    }

    if (loader == true) {
        return <View style={graphViewStyle}><NormalLoader /></View>
    } else {
        return (
            <Swiper style={graphViewStyle} automaticallyAdjustContentInsets={true}>
                {graphArrData}
            </Swiper>
        );
    }
}


// for header section
function HeaderTextView(data) {
    let resText = "";
    let index = 0;
    for (var key of Object.keys(data)) {
        index++;
        resText = resText + (key + "->" + data[key] + ((index % 2) == 0 ? "\n" : ", "));
    }
    return <Text style={[styles.targetText, { fontSize: 10, color: Color.COLOR.BLUE.EBONY_CLAY }]} key={key}>{resText}</Text>;
}


function graphViewData(data, loader) {
    let respView = null;

    if (data.type == "BarGroup") {
        respView = <BarGroup data={data} />;
    } else if (data.type == "NormalBar") {
        respView = <NormalBar data={data} />;
    } else if (data.type == "PieChart") {
        respView = <PieChart data={data} />;
    }
    return respView;
}

DynamicGraph.defaultProps = {
    data: [],
    isHidden: false,
    isDisabled: false,
    loader: false
};

DynamicGraph.propTypes = {
    data: PropTypes.array,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    loader: PropTypes.bool
};


export default DynamicGraph;