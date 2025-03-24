import { Image, SafeAreaView, Text, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork
} from '../../../redux/Sales360Action';
import { ImageName } from '../../../enums';

class Reminder extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* <Text style={{ color: '#000' }}>Reminder</Text> */}
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image source={ImageName.WORK_IN_PROGRESS} style={{ height: 400, width: 300, resizeMode: "contain" }} />

                </View>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)