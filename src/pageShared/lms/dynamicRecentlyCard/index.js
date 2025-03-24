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
    Dimension,
} from '../../../enums';

function DynamicRecentlyCard({
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
                    <Image source={data.image} style={{ height: 250, width: Dimension.width / 1.2, resizeMode: 'contain', borderRadius: 18, marginHorizontal: 6 }} />
                </View>
            </React.Fragment >
        </SafeAreaView >
    );

}

DynamicRecentlyCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
};

DynamicRecentlyCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
};


export default DynamicRecentlyCard;