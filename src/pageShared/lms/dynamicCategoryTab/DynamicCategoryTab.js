import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import styles from './Style';

function DynamicCategoryTab({
    data,
    isHidden,
    isDisabled,
    onSelectedTab,
    borderRadius
}) {
    if (isHidden) return null;

    const [selectedIndex, setSelectedIndex] = useState(0);

    // styless

    const mainBox = {
        borderRadius: borderRadius,
        // marginHorizontal: 5,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderWidth: 1,
        borderColor: "#747C90",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 20
    }

    const activeMainBox = {
        borderRadius: borderRadius,
        // marginHorizontal: 5,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 20,
        // borderWidth: 1,
        // borderColor: "#747C90",
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    }

    const activeTxt = {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.WHITE.PURE_WHITE,
    }
    const mainTxt = {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
    }

    const onTabSelect = (value, index) => {
        onSelectedTab(value, index)
        setSelectedIndex(index)
    }

    return (
        <React.Fragment>
            {data == undefined || data == null ? null :
                <React.Fragment>
                    <TouchableOpacity style={data.check ? activeMainBox : mainBox}
                        activeOpacity={0.9} onPress={() => onTabSelect(data)}
                    >

                        {data.text == undefined || data.text == null ? null :
                            <Text style={data.check ? activeTxt : mainTxt}>{data.text}</Text>
                        }
                    </TouchableOpacity>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

DynamicCategoryTab.defaultProps = {
    data: {},
    isHidden: false,
    isDisabled: false,
    onSelectedTab: () => { },
    borderRadius: 20
};

DynamicCategoryTab.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onSelectedTab: PropTypes.func,
    borderRadius: PropTypes.number
};


export default DynamicCategoryTab