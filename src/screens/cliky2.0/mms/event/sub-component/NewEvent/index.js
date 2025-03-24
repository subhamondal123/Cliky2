import React from "react";
import {
    Image,
    View,

} from "react-native";
import styles from "./style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
} from '../../../../../../redux/Sales360Action';

import { Dimension, ImageName } from "../../../../../../enums";
import {  EventInfo, EventLocation } from "./sub-component";
import { Loader } from "../../../../../../shared";



class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            allPageData: {
                // event iinfo
                meetingTitle:"",
                meetingTitleActive:false,
                meetingTypeArr:[],
                selectedMeetingTypeObj:{},

                date: "",
                dateCheck: false,
                dateRaw: new Date(),
                time: "",
                timeCheck: false,
                timeRaw: new Date(),

                distributorArr:[],
                selectedDistributorObj:{},
                dealerArr:[],
                selectedDealerObj:{},
                meetingDescription:"",
                meetingDescriptionActive:false,

                // event location
                countryArr:this.props.Sales360Redux.allCountries,
                selectedCountryObj:{},
                stateArr:[],
                selectedStateObj:{},
                districtArr:[],
                selectedDistrictObj:{},
                zoneArr:[],
                selectedZoneObj:{},
                city:"",
                cityActive:false,
                pincode:"",
                pincodeActive:false,
                address:"",
                addressActive:false


            },

            isEventInfoCompleted: true,
            isEventLocationCompleted: false,
            pageLoader: true
        };
    }

    componentDidMount = async () => {
        this.onLoad();

    }
    onLoad = async () => {
        this.setState({ pageLoader: false })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };


    onSaveDataFromEventInfo = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isEventInfoCompleted: true,
                isEventLocationCompleted: true,
            })
        }
    }

    onSaveDataFromEventLocation = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
            this.setState({
                isEventLocationCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isEventInfoCompleted: true,
                isEventLocationCompleted: false,
            })
        }
    }


    progressBarSection = () => {
        return (
            <View>
                <View style={styles.progessSection}>
                    <View style={styles.progressView}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isCustomerInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isCustomerInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isCustomerInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isCustomerInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isContactInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isContactInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isContactInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isContactInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessInfoCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                <Image source={this.state.isBusinessInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isBusinessInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isBusinessInfoCompleted ? styles.lineViewCompleted : styles.lineView} />


                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDocumentInfoCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                <Image source={this.state.isDocumentInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isDocumentInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    : <>
                        {/* {this.progressBarSection()} */}

                        {this.state.pageNum == 1 ?
                            <EventInfo {...this.props} onSaveDataToParent={this.onSaveDataFromEventInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <EventLocation {...this.props} onSaveDataToParent={this.onSaveDataFromEventLocation} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                    </>}

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
