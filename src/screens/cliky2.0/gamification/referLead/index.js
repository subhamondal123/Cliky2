import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './style';
import { CustomStyle } from '../../../style';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ImageName } from '../../../../enums';
import { ReferLeadEntry, ReferLeadHistory } from './sub-component';

class ReferLead extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNum: 1,
            isNewEntry: true,
            isHistory: false,
            type:"",
            childDataItem:{}
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    onSaveDataHistory = (childData) => {
        if(childData.type == "edit"){
            this.setState({
                type:"edit",
                childDataItem:childData.data,
                isNewEntry:true,
                isHistory:false
            })
        }
    }

    onSaveDataEntry = (childData) => {
        this.setState({
            isNewEntry:false,
            isHistory:true
        })
    }


    tabSection = () => {
        const onClickNewEntry = () => {
            this.setState({
                isNewEntry: true,
                isHistory: false,
                listLoader: true
            })
        }
        const onClickHistory = () => {
            this.setState({
                isHistory: true,
                isNewEntry: false,
                listLoader: true
            })
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={() => onClickNewEntry()} activeOpacity={0.9}>
                    <View style={this.state.isNewEntry ? styles.activeLeftTabSec : styles.inactiveLeftTabSec} >
                        <Text style={this.state.isNewEntry ? styles.activetabText : styles.inactivetabText}>{this.state.type == "edit" ? "Edit Enquiry" : "New Entry"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={() => onClickHistory()} activeOpacity={0.9}>
                    <View style={this.state.isHistory ? styles.activeRightTabSec : styles.inactiveRightTabSec} >
                        <Text style={this.state.isHistory ? styles.activetabText : styles.inactivetabText}>History</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    headerSection = () => {
        return (
            <View style={styles.headerMainView}>
                <TouchableOpacity onPress={() => this._onBack()} >
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                
                {/* <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDot} />
                </View> */}
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{marginHorizontal:10}}>
                    {this.headerSection()}
                    {this.tabSection()}

                    {this.state.isNewEntry ?
                        <ReferLeadEntry {...this.props} onSaveDataToParent={this.onSaveDataEntry}  type={this.state.type} mainData={this.state.childDataItem}/>
                        :
                        null
                    }
                      {this.state.isHistory ?
                        <ReferLeadHistory {...this.props} onSaveDataToParent={this.onSaveDataHistory}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferLead);
