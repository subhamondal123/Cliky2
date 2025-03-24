import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { ImageName } from '../../../enums';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { CustomStyle } from '../../style';
import styles from './style';
import { connect } from 'react-redux';

import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { bindActionCreators } from 'redux';
import { HistoryList, UpcommingList } from './sub-component';

class EnquiryListV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            isPjpCompleted: false,
            isVisitedCompleted: false,
            isPjpActive: true,
            isVisitedActive: false,
            listLoader: true
        }
    }

    componentDidMount() {
        // if (this.props.route.params && this.props.route.params.type) {
        //     if(this.props.route.params.type == "newPjp"){
        //         this.onClickPjp();
        //     } else if(this.props.route.params.type == "newBrandingRequisition"){
        //         this.onClickVisit();
        //     } else if(this.props.route.params.type == "fieldVisitNotification"){
        //         this.onClickVisit();
        //     }
        // } else {
        this._load();
        // }
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await MiddlewareCheck("pickUserCurrentLocation", {}, this.props)
        this.setState({
            listLoader: false
        })
    }

    onSaveDataPjpFrom = (childData) => {
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

    onSaveDataVisitedFrom = (childData) => {
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

    onClickPjp = () => {
        this.setState({
            isPjpActive: true,
            isVisitedActive: false,
            listLoader: true
        })
    }
    onClickVisit = () => {
        this.setState({
            isVisitedActive: true,
            isPjpActive: false,
            listLoader: true
        })
    }

    _back = () => {
        this.props.navigation.goBack();
    }

    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickPjp} activeOpacity={0.9}>
                    <View style={styles.tabSec} >
                        <Text style={this.state.isPjpActive ? styles.activetabText : styles.inactivetabText}>Assigned</Text>
                    </View>
                    <View style={this.state.isPjpActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickVisit} activeOpacity={0.9}>
                    <View style={styles.tabSec}>
                        <Text style={this.state.isVisitedActive ? styles.activetabText : styles.inactivetabText}>Activities</Text>
                    </View>
                    <View style={this.state.isVisitedActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} activeOpacity={0.9} onPress={() => this._back()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Enquiries</Text>
                        </View>
                        <View style={CustomStyle.backButtonView} />
                    </View>
                    {this.tabSection()}
                    {this.state.isPjpActive ?
                        <UpcommingList {...this.props} onSaveDataToParent={this.onSaveDataPjpFrom} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.isVisitedActive ?
                        <HistoryList {...this.props} onSaveDataToParent={this.onSaveDataVisitedFrom} allData={this.state.allData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryListV2);
