import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgComponent from '../../../assets/svg';

function PassbookTab({
    data,
    isHidden,

}) {
    if (isHidden) return null;

    return (
        <SafeAreaView>
            <React.Fragment>
                <TouchableOpacity >
                    <LinearGradient colors={data.color} style={styles.mainView} >
                        <SvgComponent svgName={"nineDot"} />
                        <View style={{ paddingTop: 15 }}>
                            <Text style={styles.labelTxt}>{data.label}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </React.Fragment >
        </SafeAreaView >
    );

}

PassbookTab.defaultProps = {
    isHidden: false,
    data: {},
    onSelectTab: () => { }
};

PassbookTab.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    onSelectTab: PropTypes.func
};


export default PassbookTab;