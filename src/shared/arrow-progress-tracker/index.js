import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    AppRegistry,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, {
    Polyline,
} from 'react-native-svg';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';

function ArrowProgressTracker({
    height,
    arrowWidth,
    eachCellWidth,
    activeColor,
    inActiveColor,
    fontColor,
    fontFamily,
    fontSize,
    data,
    onPress,
    activeValueType,
    buttonNameType,
    marginRight,
    marginLeft
}) {
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = height;
    const ARROW_WIDTH = arrowWidth;
    const MIN_CELL_WIDTH = eachCellWidth;
    const selectedColor = activeColor;
    const notSelectedColor = inActiveColor;
    const [selectedIndex, setSelectedIndex] = useState(0);

    function _arrowView(index, totalCount, isLeft, isSelected) {
        let color = isSelected ? selectedColor : notSelectedColor;
        if (isLeft) {
            if (index == 0) {
                // For the first cell, add a rect arrow view
                return <View style={[styles.leftArrowView, { backgroundColor: color }]} />
            } else {
                // For other cell, add an arrow view containing C, D.
                return (
                    <View style={[styles.leftArrowView]}>
                        <View style={[styles.triangleC, { borderTopColor: color }]}></View>
                        <View style={[styles.triangleD, { borderBottomColor: color }]}></View>
                    </View>
                );
            }

        } else { // Right arrow view
            // if (index == totalCount - 1) {
            //     // For the last cell, add a rect arrow view
            //     return <View style={[styles.rightArrowView, { backgroundColor: color }]} />
            // } else {
            // An arrow view containing A and polyline.
            return (
                <View style={[styles.rightArrowView]}>
                    <View style={[styles.triangleA, { borderLeftColor: isSelected ? selectedColor : notSelectedColor }]}></View>
                    <Svg width={ARROW_WIDTH} height={HEIGHT}>
                        <Polyline fill='none' stroke='white' strokeWidth='2'
                            points={'0,-2 ' + (ARROW_WIDTH - 1) + ',' + HEIGHT / 2
                                + ' 0,' + (HEIGHT + 2)} />
                    </Svg>
                </View>
            );
            // }
        }
    }

    function _arrowButtons(items, cellWidth) {
        let totalCount = items.length;
        const onSelect = (item) => {
            onPress(item);
        }
        return items.map((item, index) => {
            let left = 0;
            // let isSelected = index == selectedIndex;
            let isSelected = false;
            if (item[activeValueType] == true) {
                isSelected = true
            }

            if (totalCount == 1 || index == 0) {
                left = 0;
            } else {
                left = (cellWidth - ARROW_WIDTH) * index;
            }
            let positionStyle = {
                position: 'absolute',
                top: 0, left,
                height: HEIGHT,
                width: cellWidth,
            };

            return (
                <TouchableOpacity key={index}
                    style={positionStyle}
                    activeOpacity={0.9}
                    onPress={() => onSelect(item)}
                >
                    { // Left arrow viewtotalCount
                        _arrowView(index, totalCount, true, isSelected)
                    }
                    <View style={[styles.titleWrapper, styles.center, styles.bgColor, { backgroundColor: isSelected ? selectedColor : notSelectedColor }]}>
                        <Text style={styles.titleActionText}>{item[buttonNameType]}</Text>
                    </View>
                    { // Right arrow view
                        _arrowView(index, totalCount, false, isSelected)
                    }
                </TouchableOpacity>
            );

        });
    }

    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            height: HEIGHT,
            backgroundColor: 'transparent',
            alignItems: 'center',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            marginTop: 20,
        },
        progressTracker: {
            height: HEIGHT,
            // width: WIDTH,
        },
        scrollViewContent: {
            height: HEIGHT,
        },
        center: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        bgColor: {
            backgroundColor: '#252831',
        },
        titleWrapper: {
            position: 'absolute',
            top: 0,
            left: ARROW_WIDTH,
            right: ARROW_WIDTH,
            height: HEIGHT,
        },
        titleActionText: {
            fontSize: fontSize,
            // fontWeight: 'bold',
            color: fontColor,
            fontFamily: fontFamily
        },

        //Arrow
        leftArrowView: {
            position: 'absolute',
            top: 0,
            height: HEIGHT,
            width: ARROW_WIDTH,
            left: 0,
        },
        rightArrowView: {
            position: 'absolute',
            top: 0,
            height: HEIGHT,
            width: ARROW_WIDTH,
            right: 0
        },
        triangleA: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderTopWidth: HEIGHT / 2,
            borderBottomWidth: HEIGHT / 2,
            borderLeftWidth: ARROW_WIDTH - 2,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
        },
        triangleC: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderLeftWidth: ARROW_WIDTH - 2,
            borderRightWidth: 0,
            borderTopWidth: HEIGHT / 2 + 0,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
        },
        triangleD: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderLeftWidth: ARROW_WIDTH - 2,
            borderRightWidth: 0,
            borderBottomWidth: HEIGHT / 2,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
        },
    })

    let items = data
    let totalCount = items.length;
    let cellWidth = WIDTH;
    let contentWidth = WIDTH;
    if (totalCount > 1) {
        cellWidth = (WIDTH - ARROW_WIDTH) / totalCount + ARROW_WIDTH;
        if (cellWidth < MIN_CELL_WIDTH) {
            cellWidth = MIN_CELL_WIDTH;
        }
        contentWidth = (cellWidth - ARROW_WIDTH) * totalCount + ARROW_WIDTH;
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.welcome}>
                ReactNativeProgressTracker
            </Text> */}
            <ScrollView style={styles.progressTracker}
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={[styles.scrollViewContent, { width: contentWidth }]}>
                    {_arrowButtons(items, cellWidth)}
                </View>
            </ScrollView>
        </View>
    )
}

ArrowProgressTracker.defaultProps = {
    height: 25,
    arrowWidth: 16,
    eachCellWidth: 120,
    activeColor: Color.COLOR.GREEN.APPLE_GREEN,
    inActiveColor: Color.COLOR.YELLOW.SUNGLOW,
    fontColor: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.XS,
    data: [
        {
            name: 'Button 0',
            isSelected: true,
        },
        {
            name: 'Button 1',
            isSelected: true
        },
        {
            name: 'Button 2',
            isSelected: false
        },
        {
            name: 'Button 3',
            isSelected: false
        }
    ],
    onPress: () => { },
    activeValueType: "isSelected",
    buttonNameType: "name",
    marginRight: 10,
    marginLeft: 10
}

ArrowProgressTracker.propTypes = {
    height: PropTypes.number,
    arrowWidth: PropTypes.number,
    eachCellWidth: PropTypes.number,
    activeColor: PropTypes.string,
    inActiveColor: PropTypes.string,
    fontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    data: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    activeValueType: PropTypes.string,
    buttonNameType: PropTypes.string,
    marginRight: PropTypes.number,
    marginLeft: PropTypes.number
}

export default ArrowProgressTracker;