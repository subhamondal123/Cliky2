//1. tick is used for check and uncheck with tick icon, 
//2. singleSelectBox is used for one time check. 
//3. circle is used for check and uncheck with round circle 


import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize
} from '../../enums';

function ExpendableTextView({
    data,
    type,
    isHidden,
    borderRadius,
    maxLength,
    backgroundColor,
    additionalViewStyle,
    additionalTextStyle,
    additionalShowMoreTextStyle,
}) {
    if (isHidden) return null;

    // for visible and hide text
    const [showAllText, setShowAllText] = useState(false);

    // for show more and show less test
    const toggleShowAllText = () => {
        setShowAllText(!showAllText);
    };

    const truncatedText = `${data.slice(0, maxLength)}...`;


    // for main view style
    const mainView = {
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: borderRadius,
        ...additionalViewStyle
    };

    // for text style
    const textStyle = {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.DARK_BLACK,
        ...additionalTextStyle
    };

    // for show more text style
    const showMoretextStyle = {
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.DARK_BLUE,
        ...additionalShowMoreTextStyle
    };

    if (type == "box") {
        return (
            <View style={mainView}>
                <Text style={textStyle}>{maxLength >= data.length ? data : showAllText ? data : truncatedText}
                    {data.length > maxLength && (
                        <Text style={showMoretextStyle} onPress={toggleShowAllText}>{showAllText ? 'Show less' : 'Show more'}</Text>
                    )}
                </Text>
            </View>
        );
    } else if (type == "normal") {
        return (<Text style={textStyle}>{maxLength >= data.length ? data : showAllText ? data : truncatedText}
            {data.length > maxLength && (
                <Text style={showMoretextStyle} onPress={toggleShowAllText}>{showAllText ? 'Show less' : 'Show more'}</Text>
            )}
        </Text>
        );
    }
}

ExpendableTextView.defaultProps = {
    data: "",
    type: "box",
    isHidden: false,
    borderRadius: 15,
    maxLength: 100,
    backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
    additionalViewStyle: {},
    additionalTextStyle: {},
    additionalShowMoreTextStyle: {}
};

ExpendableTextView.propTypes = {
    data: PropTypes.string,
    type: PropTypes.string,
    isHidden: PropTypes.bool,
    borderRadius: PropTypes.number,
    maxLength: PropTypes.number,
    backgroundColor: PropTypes.string,
    additionalViewStyle: PropTypes.instanceOf(Object),
    additionalTextStyle: PropTypes.instanceOf(Object),
    additionalShowMoreTextStyle: PropTypes.instanceOf(Object)
};


export default ExpendableTextView;