import React from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import styles from "./Style";
import { CustomStyle } from "../../style";
import { ImageName } from "../../../enums";
import { CompletedSurveys, UpcomingSurveys } from "./sub-component";
import { MiddlewareCheck } from "../../../services/middleware";
import { connect } from "react-redux";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";

class SurveyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpcoming: true,
            isCompleted: false
        }
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async() => {
        await MiddlewareCheck("pickUserCurrentLocation", {},this.props)
    }

    onClickUpcoming = () => {
        this.state.isUpcoming = true;
        this.state.isCompleted = false;
        this.setState({
            isUpcoming: this.state.isUpcoming,
            isCompleted: this.state.isCompleted
        })
    }
    onClickCompleted = () => {
        this.state.isUpcoming = false;
        this.state.isCompleted = true;
        this.setState({
            isUpcoming: this.state.isUpcoming,
            isCompleted: this.state.isCompleted
        })
    }

    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickUpcoming} activeOpacity={0.9}>
                    <View style={styles.tabSec} >
                        <Text style={this.state.isUpcoming ? styles.activetabText : styles.inactivetabText}>Upcoming</Text>
                    </View>
                    <View style={this.state.isUpcoming ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickCompleted} activeOpacity={0.9}>
                    <View style={styles.tabSec}>
                        <Text style={this.state.isCompleted ? styles.activetabText : styles.inactivetabText}>Completed</Text>
                    </View>
                    <View style={this.state.isCompleted ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
            </View>
        )
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} activeOpacity={0.9} onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Survey</Text>
                        </View>
                        <View style={CustomStyle.backButtonView} />
                    </View>
                    {this.tabSection()}
                    {this.state.isUpcoming ?
                        <UpcomingSurveys {...this.props} />
                        :
                        null
                    }

                    {this.state.isCompleted ?
                        <CompletedSurveys {...this.props} />
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
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userSelectedBeatRouteData,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
// export default SurveyList;