import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Dimension, ImageName } from '../../../../enums';
import { Loader } from '../../../../shared';
import { CustomStyle } from '../../../style';
import styles from './Style';
import { EventList, NewEvent } from './sub-component';
import { stateCheckForNetwork,stateUserInformation } from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import Header from '../../header/Header';


class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            item: {},
            isNewEntryActive: true,
            isHistoryActive: false,
            pageLoader: true
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this.setState({ pageLoader: false })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };


    onSaveDataNewEvent = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isNewEntryActive: true,
                isHistoryActive: true,
            })
        }
    }

    onSaveDataEventList = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isNewEntryActive: true,
                isHistoryActive:true
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isNewEntryActive: true,
                isHistoryActive: false
            })
        }
    }


    onClickNewEntry  = () => {
        this.setState({
            pageNum: 1,
            isNewEntryActive: true,
            isHistoryActive: false
        })
    }

   
    onClickHistory = () => {
        this.setState({
            pageNum: 2,
            isNewEntryActive: false,
            isHistoryActive: true
        })
    }
 
    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickNewEntry} activeOpacity={0.9}>
                    <View style={styles.tabSec} >
                        <Text style={this.state.isNewEntryActive ? styles.activetabText : styles.inactivetabText}>New Event</Text>
                    </View>
                    <View style={this.state.isNewEntryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickHistory} activeOpacity={0.9}>
                    <View style={styles.tabSec}>
                        <Text style={this.state.isHistoryActive ? styles.activetabText : styles.inactivetabText}>Event List</Text>
                    </View>
                    <View style={this.state.isHistoryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <Header {...this.props}/>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    : <>
                        <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                                    <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                                </TouchableOpacity>
                                <View style={CustomStyle.headerTextView}>
                                    <Text style={CustomStyle.headerText}>Event</Text>
                                </View>
                                <View style={CustomStyle.backButtonView} />
                            </View> */}
                            {/* {this.tabSection()} */}

                            {this.state.pageNum == 1 ?
                                <NewEvent {...this.props} onSaveDataToParent={this.onSaveDataNewEvent} allData={this.state.allData} />
                                :
                                null
                            }

                            {this.state.pageNum == 2 ?
                                <EventList {...this.props} onSaveDataToParent={this.onSaveDataEventList} allData={this.state.allData} />
                                :
                                null
                            }
                          
                        </View>
                    </>}


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
        stateUserInformation,
        stateCheckForNetwork
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Event);