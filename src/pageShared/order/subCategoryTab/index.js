import React, { useState } from 'react'
import styles from "./style";
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

function SubCategoryTab({
    props,
    data,
    onPressTab,
    backgroundColor,
    additionStyles,
    isHidden
}) {

    if (isHidden) return null;

    const onClickTab = (data) => {
        onPressTab(data)
    }

    const mainTab = {
        borderRadius: 10,
        backgroundColor: "#F0F4F7",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 8
    }

    const ActiveMainTab = {
        borderRadius: 10,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: "#5CA9E2",
        padding: 8
    }

    const triangle = {
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E2EFFF',
        transform: [{ rotate: "180deg" }],
        borderTopColor: 'blue', // Border color for the triangle
    }
    return (
        <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={[data.check ? ActiveMainTab : mainTab, { backgroundColor: backgroundColor, ...additionStyles }]} onPress={() => onClickTab(data)} activeOpacity={0.9}>
                {data.icon ?
                    <View style={styles.imgSec}>
                        <Image source={data.icon} style={styles.mainImg} />
                    </View>
                    : null}

                {data.title ?
                    <View style={styles.titleSec}>
                        <Text style={styles.titleTxt}>{data.title}</Text>
                    </View>
                    : null}

            </TouchableOpacity>
        </View>
    )
}

SubCategoryTab.defaultProps = {
    isHidden: false,
    data: {},
    onPressTab: () => { },
    backgroundColor: "#F0F4F7",
    additionStyles: {}
};

SubCategoryTab.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    onPressTab: () => { },
    backgroundColor: PropTypes.string,
    additionStyles: PropTypes.instanceOf(Object),
};

export default SubCategoryTab