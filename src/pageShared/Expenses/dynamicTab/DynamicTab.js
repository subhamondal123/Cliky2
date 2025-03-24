import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Color, ImageName } from '../../../enums';

import styles from './Style';

function DynamicTab({
    data,
    isHidden,
    isDisabled,
    onSelectedTab
}) {
    if (isHidden) return null;

    const [selectedIndex, setSelectedIndex] = useState(0);

    // styless

    const mainBox = {
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: Color.COLOR.WHITE.FLASH_WHITE,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15
    }

    const activeMainBox = {
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.WHITE.FLASH_WHITE,
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation:2,

    }

    const onTabSelect = (value, index) => {
        onSelectedTab(value, index)
        setSelectedIndex(index)
    }

    const imageSection = (item) => {
        return (
            <View style={{ marginVertical: 5 }}>
                <Image source={item.label == "Visit" ? ImageName.EXPENSE_VISIT_LOGO :
                    item.label == "Odometer" ? ImageName.EXPENSE_ODOMETER_LOGO :
                        item.label == "Food" ? ImageName.EXPENSE_FOOD_LOGO :
                            item.label == "Other" ? ImageName.EXPENSE_OTHER_LOGO :
                                ImageName.EXPENSE_VISIT_LOGO
                }
                    style={styles.mainImg} />
            </View>
        )
    }
    return (
        <React.Fragment>
            {data == undefined || data == null ? null :
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {data.length > 0 ?
                        <React.Fragment>
                            {data.map((item, key) => (
                               
                                <TouchableOpacity style={item.check ? activeMainBox : mainBox}
                                    activeOpacity={0.9} onPress={() => onTabSelect(item, key)}
                                    key={key}
                                >
                                    <Text style={styles.bottomTxt}>{item.label}</Text>
                                    {item.ImageUrl.length == 0 || item.ImageUrl == undefined || item.ImageUrl == null ? null : imageSection(item)}
                                    <View style={{height:10}}/>
                                    {/* {item.bottomText == undefined || item.bottomText == null ? null :
                                        <Text style={styles.bottomTxt}>{'\u20B9' + " " + item.bottomText}</Text>
                                    } */}
                                </TouchableOpacity>
                            ))}
                        </React.Fragment>
                        :
                        null
                    }

                </ScrollView>
            }

        </React.Fragment>
    )
}

DynamicTab.defaultProps = {
    data: [],
    isHidden: false,
    isDisabled: false,
    onSelectedTab: () => { }
};

DynamicTab.propTypes = {
    data: PropTypes.array,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onSelectedTab: PropTypes.func
};


export default DynamicTab