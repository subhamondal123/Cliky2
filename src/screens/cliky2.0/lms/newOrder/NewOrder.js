import React, { Component } from 'react'
import { SafeAreaView, View } from 'react-native'
import { CustomStyle } from '../../../style'
import Header from '../../header/Header'
import { AllCustomerList } from '../../../../pageShared'
import { connect } from 'react-redux'
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";

import { bindActionCreators } from 'redux'

class NewOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderChildData: false
        }
    }

    onFilter = (val) => {
    }

    onSelectProfile = () => {
        // this.props.navigation.navigate("")
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <Header {...this.props} onRefresh={() => console.log("")} onApplyFilter={(val) => this.onFilter(val)}/>
                <View style={{ marginHorizontal: 10 }}>
                    <AllCustomerList
                        {...this.props}
                        // isVisibleLocation={false}
                        // isVisibleUserType={false}
                        onSelect={(item) => this.onSelectProfile(item)}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

// export default NewOrder

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userSelectedBeatRouteData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
