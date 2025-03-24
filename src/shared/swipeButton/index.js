import SwipeButton from 'rn-swipe-button';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { Dimension, FontFamily, ImageName } from '../../enums';
import { Image } from 'react-native';
import { UserAccessPermission } from '../../services/userPermissions';

function SwipeButtonScreen({
    props,
    isDisabled,
    height,
    width,
    onSuccessSwipe,
    title,
    backgroundColor,
    thumbBackgroundColor,
    thumbBorderColor,
    railBackgroundColor,
    borderColor,
    railBorderColor,
    thumbIcon,
    thumbIconStyle
}) {

    const [buttonPermission, setButtonPermission] = useState({});

    useEffect(() => {
        getPermission()
    }, [])

    const getPermission = async () => {
        let permission = await UserAccessPermission.ATTENDANCE.attendancePermission(props);
        setButtonPermission(permission);
    }

    const onSuccess = () => {
        onSuccessSwipe()
    }

    const titleStyle = {
        color: "white",
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }

    return (
        <View>
            <SwipeButton
                disabled = {false}
                // disabled={(isDisabled == false ? !buttonPermission.addPem : true )}
                //disable the button by doing true (Optional)
                swipeSuccessThreshold={70}
                height={height}
                //height of the button (Optional)
                width={width}
                //width of the button (Optional)
                title={title}
                //Text inside the button (Optional)
                thumbIconImageSource={thumbIcon}
                thumbIconStyles={thumbIconStyle}

                //You can also set your own icon (Optional)
                onSwipeSuccess={() => onSuccess()}
                //After the completion of swipe (Optional)
                // thumbIconComponent = {Image/>}
                // thumbIconStyles={{borderRadius:10}}
                railFillBackgroundColor={railBackgroundColor} //(Optional)
                railFillBorderColor={railBorderColor} //(Optional)
                thumbIconBackgroundColor={thumbBackgroundColor} //(Optional)
                thumbIconBorderColor={thumbBorderColor} //(Optional)
                railBackgroundColor={backgroundColor} //(Optional)
                railBorderColor={borderColor}//(Optional)
                titleStyles={titleStyle}
            />
        </View>
    )
}

SwipeButtonScreen.defaultProps = {
    isDisabled: false,
    height: 45,
    width: Dimension.width,
    onSuccessSwipe: () => { },
    title: "Swipe to Submit",
    backgroundColor: "#1F2B4D",
    thumbBackgroundColor: "#00B65E",
    thumbBorderColor: "#1F2B4D",
    railBackgroundColor: "#1F2B4D",
    borderColor: "#1F2B4D",
    railBorderColor: "#1F2B4D",
    thumbIcon: null,
    thumbIconStyle: {}
}

SwipeButtonScreen.propTypes = {
    isDisabled: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    onSuccessSwipe: PropTypes.func,
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    thumbBackgroundColor: PropTypes.string,
    thumbBorderColor: PropTypes.string,
    railBackgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    railBorderColor: PropTypes.string,
    thumbIcon: PropTypes.any,
    thumbIconStyle: PropTypes.instanceOf(Object),
}

export default SwipeButtonScreen