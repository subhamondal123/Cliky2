import React from 'react';
import { BackHandler, Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { Dimension, ImageName } from '../../../../enums';
import { AddButton, FloatingButton } from '../../../../shared';
import { CustomStyle } from '../../../style';
import styles from './Style';
import { Meeting, MeetingHistory } from './sub-component';

import {
    stateCheckForNetwork,
    stateUserInformation
} from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MiddlewareCheck } from '../../../../services/middleware';
import { StorageDataModification } from '../../../../services/common-view-function';

class MeetingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            isNewEntryActive: true,
            isHistoryActive: false,
            isAddPermission: false
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        // let moduleSettingsData = await StorageDataModification.userModuleSettingsData({}, "get");
        // let addPermision = false;
        // if (moduleSettingsData.sfa_meetingAddPem == "0") {
        //     addPermision = false;
        //     this.onClickHistory();
        // } else {
        //     addPermision = true;
        // }
        // this.setState({
        //     isAddPermission: addPermision
        // })
        // await MiddlewareCheck("pickUserCurrentLocation", {}, this.props)
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    onSaveDataEntryFrom = (childData) => {
        this.setState({ pageNum: childData.pageNum })
        if (childData.pageNum == 2) {

            this.onClickHistory();
        }
    }

    onClickHistory = () => {
        this.setState({
            isNewEntryActive: false,
            isHistoryActive: true,

        })
    }

    onSaveDataHistoryFrom = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isPjpCompleted: true
            })
        }
    }

    onClickNewEntry = () => {
        this.setState({
            pageNum: 1,
            isNewEntryActive: true,
            isHistoryActive: false,

        })
    }
    onClickHistory = () => {
        this.setState({
            pageNum: 2,
            isNewEntryActive: false,
            isHistoryActive: true,

        })
    }

    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("OdometerList");
        this.props.navigation.navigate("NetworkError");
    }

    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {/* {this.state.isAddPermission ? */}
                    <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickNewEntry} activeOpacity={0.9}>
                        <View style={styles.tabSec} >
                            <Text style={this.state.isNewEntryActive ? styles.activetabText : styles.inactivetabText}>New Entry</Text>
                        </View>
                        <View style={this.state.isNewEntryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                    </TouchableOpacity>
                    {/* :
                    null
                } */}

                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickHistory} activeOpacity={0.9}>
                    <View style={styles.tabSec}>
                        <Text style={this.state.isHistoryActive ? styles.activetabText : styles.inactivetabText}>History</Text>
                    </View>
                    <View style={this.state.isHistoryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Meeting</Text>
                        </View>
                        <View style={CustomStyle.backButtonView} />
                    </View>
                    {this.tabSection()}
                    <View style={{ height: Dimension.height - Dimension.height / 9 }}>
                        {this.state.pageNum == 1 ?
                            <Meeting {...this.props} onSaveDataToParent={this.onSaveDataEntryFrom} allData={this.state.allData} networkError={() => this._onNetworkError()} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <MeetingHistory {...this.props} onSaveDataToParent={this.onSaveDataHistoryFrom} allData={this.state.allData} networkError={() => this._onNetworkError()} />
                            :
                            null
                        }
                    </View>
                </View>
                {/* {this.state.isHistoryActive ?
                    <FloatingButton props={this.props} moduleType={"sfa"} navigation={this.props.navigation.navigate} />
                    :
                    null
                } */}
            </SafeAreaView>
        )

    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSection);

