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

function ProductOfferCard({
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
                        <Image source={data.image} style={{ height: 176, width: Dimension.width / 1.4, resizeMode: 'contain', borderRadius: 18, marginHorizontal: 4 }} />
                    </View>
                </React.Fragment >
        </SafeAreaView >
    );

}

ProductOfferCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",



};

ProductOfferCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default ProductOfferCard;