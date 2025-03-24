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

function CheckBox({
    data,
    image,
    width,
    height,
    borderRadius,
    borderColor,
    borderWidth,
    backgroundColor,
    selectBackgroundColor,
    isHidden,
    type,
    onClickValue,
    isDisabled,
    additionalImgStyle
}) {
    if (isHidden) return null;

    let imgHeight = height - 5;
    let imgWidth = width - 5;
    let innerViewHeight = height - 5;
    let innerViewWidth = width - 5;
    if (height > 16 && width > 16) {
        imgHeight = height - 10;
        imgWidth = width - 10;
    }
    if (height > 16 && width > 16) {
        innerViewHeight = height - 7;
        innerViewWidth = width - 7;
    }

    const unCheckStyle = { height: height, width: width, borderRadius: borderRadius, borderColor: borderColor, borderWidth: borderWidth, backgroundColor: backgroundColor }
    const checkImageStyle = { height: height, width: width, borderRadius: borderRadius, backgroundColor: selectBackgroundColor }
    const outlineCheckStyle = { height: height, width: width, borderRadius: borderRadius, borderColor: borderColor, borderWidth: borderWidth, backgroundColor: backgroundColor }
    const imgViewStyle = { height: imgHeight, width: imgWidth, ...additionalImgStyle }
    const innerBackgroundView = { height: innerViewHeight, width: innerViewWidth, backgroundColor: selectBackgroundColor, borderRadius: borderRadius - 3 }

    const onredioCheck = (value) => {
        onClickValue(value)
    }

    return (
        <View>
            {type == "tick" ?
                <React.Fragment>
                    <TouchableOpacity
                        onPress={() => onredioCheck(!data)}
                        style={data ? [checkImageStyle, styles.radioCircleTickView] : [unCheckStyle, styles.radioCircleOutCheck]}
                        disabled={isDisabled}
                    >
                        {data ?
                            <Image source={image}
                                style={[imgViewStyle, styles.checkMarkImg]} /> :
                            <React.Fragment />
                        }
                    </TouchableOpacity>
                </React.Fragment> :
                <React.Fragment>
                    {type == "singleSelectBox" ?
                        <React.Fragment>
                            {data ?
                                <View style={[outlineCheckStyle, styles.radioCircleOutCheck]}>
                                    <View style={innerBackgroundView} />
                                </View> :
                                <TouchableOpacity
                                    onPress={() => onredioCheck(!data)}
                                    style={[outlineCheckStyle, styles.radioCircleOutCheck]}
                                    disabled={isDisabled}
                                />
                            }
                        </React.Fragment> :
                        <React.Fragment>
                            {data ?
                                <TouchableOpacity
                                    style={[outlineCheckStyle, styles.radioCircleOutCheck]}
                                    onPress={() => onredioCheck(!data)}
                                    disabled={isDisabled}
                                >
                                    <View style={innerBackgroundView} />
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    onPress={() => onredioCheck(!data)}
                                    style={[outlineCheckStyle, styles.radioCircleOutCheck]}
                                    disabled={isDisabled}
                                />
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </View>
    )
}

CheckBox.defaultProps = {
    data: false,
    image: ImageName.TICK_MARK_IMG,
    width: 20,
    height: 20,
    borderRadius: 7,
    borderColor: Color.COLOR.GRAY.ROUND_CAMEO,
    borderWidth: 1,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    selectBackgroundColor: Color.COLOR.BLUE.EBONY_CLAY,
    type: "tick",
    onClickValue: () => { },
    isDisabled: false,
    additionalImgStyle: {}
};

CheckBox.propTypes = {
    data: PropTypes.bool,
    image: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    backgroundColor: PropTypes.string,
    selectBackgroundColor: PropTypes.string,
    type: PropTypes.string.isRequired,
    onClickValue: PropTypes.func,
    isDisabled: PropTypes.bool,
    additionalImgStyle: PropTypes.instanceOf(Object),
};


export default CheckBox;