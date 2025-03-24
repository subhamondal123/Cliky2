import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CustomStyle } from '../../style';
import { PrimaryCustomerList, SecondaryCustomerList } from './sub-component';
import PrimarySecondaryTab from '../../../pageShared/order/primarySecondaryTab';
import { ImageName } from '../../../enums';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import styles from './style';

const mainTab = {
    primaryTxt: "Primary",
    secondaryTxt: "Secondary"
}

class CustomerOrderList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNum: 1,
            isPrimary: true,
            isSecondary: false,
            type: "",
            childDataItem: {}
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    tabSection = () => {
        const onClickPrimary = () => {
            this.setState({
                isPrimary: true,
                isSecondary: false,
                listLoader: true
            })
        }
        const onClickSecondary = () => {
            this.setState({
                isSecondary: true,
                isPrimary: false,
                listLoader: true
            })
        }
        return (
            <View style={{ marginTop: 10 }}>
                <PrimarySecondaryTab data={mainTab} onPressPrimary={() => onClickPrimary()} onPressSecondary={() => onClickSecondary()} />
            </View>
        )
    }

    headerSection = () => {
        return (
            <View style={{ marginTop: 8, flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:"center",flexDirection:"row"}}>
                    <Text style={styles.headingTxt}>Order for Customer</Text>

                </View>
                <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ marginHorizontal: 10 }}>
                    {this.headerSection()}
                    {this.tabSection()}
                    {this.state.isPrimary ?
                        <PrimaryCustomerList {...this.props} />
                        :
                        null
                    }
                    {this.state.isSecondary ?
                        <SecondaryCustomerList {...this.props} />
                        :
                        null
                    }
                </View>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateUserInformation,
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderList);
