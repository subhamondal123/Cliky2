import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,

} from 'react-native';
import {
    Color,
    Dimension,
    FontFamily,
    FontSize,
    ImageName
} from '../../../enums';

function DynamicOfferCard({
    type,
    data,
    isHidden,
    props,


}) {
    if (isHidden) return null;

    return (
        <SafeAreaView>
            <React.Fragment>
                <View style={styles.mainView}>
                    <Image source={data.image} style={{ height: 128, resizeMode: 'contain', width: Dimension.width / 0.3, borderRadius: 12}} />
                </View>
            </React.Fragment >
        </SafeAreaView >
    );

}

DynamicOfferCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",



};

DynamicOfferCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default DynamicOfferCard;