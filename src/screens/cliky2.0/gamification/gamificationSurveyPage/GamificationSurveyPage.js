import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import styles from './Style';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    stateCheckForNetwork,
    setDeviceId,
    stateAllCountries,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DynamicComponent } from "../../../../pageShared";
import { ActivityIndicator } from "react-native";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { BigTextButton, CheckBox } from "../../../../shared";
import { forCheckAnswerGiven, modifyApiData, modifyApiRequestData } from "./Function";
import { DataConvert, DateConvert, Toaster } from "../../../../services/common-view-function";


class GamificationSurveyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leadProgressDetails: [],
            surveyLoader: true,
            surveyData: [],
            selectedQuestionData: [],
            questionLoader: false,
            selectIndex: 0
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let reqData = {
            "surveyId": this.props.route.params.data.surveyId.toString()
        }
        let responseData = await MiddlewareCheck("getUsersAnswerByUsers", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState(modifyApiData(responseData.response.data, this.state, this.props));
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        await this._onChangeSurveyLoader(false);
    }

    headerSection = () => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center", marginHorizontal: '3%' }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 28, width: 28, resizeMode: "contain" }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <View style={{ borderColor: '#000', borderWidth: 0.5, padding: 5, borderRadius: 100, marginRight: '5%', marginTop: 4 }}>
                    <View style={{ marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                        <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        <View style={{ width: 2 }} />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>200</Text>
                    </View>
                </View>
                <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 25, width: 25, resizeMode: "contain" }} />
                </View>
            </View>
        )
    }


    // for survey Loader change
    _onChangeSurveyLoader = async (type) => {
        this.state.surveyLoader = type;
        this.setState(this.state);
    }


    // for select question
    _onSelectQuestion = async (item, key) => {
        await this._onChangeSurveyLoader(true);
        this.state.surveyData = DataConvert.singleSetectDataModification(this.state.surveyData, key);
        this.state.selectedQuestionData = item.questionData;
        this.state.selectIndex = key;
        this.setState(this.state);
        await this._onChangeSurveyLoader(false);
    }


    // for render the check box section
    _onRenderCheckbox = () => {
        return (
            <React.Fragment>
                {this.state.surveyData.map((item, key) => (
                    <View style={{ marginRight: (key + 1 == this.state.surveyData.length) ? 0 : 10, marginVertical: 5 }} key={key}>
                        <CheckBox
                            borderWidth={1.5}
                            width={22}
                            height={22}
                            borderRadius={100}
                            borderColor={"#0D9478"}
                            type={item.isGiveAnswer ? "tick" : "singleSelectBox"}
                            onClickValue={() => this._onSelectQuestion(item, key)}
                            selectBackgroundColor={"#0D9478"}
                            data={item.isGiveAnswer ? true : item.check}
                            isDisabled={item.check}
                        />
                    </View>
                ))}
            </React.Fragment>);
    }

    // for render image section
    imageSection = () => {
        return (
            <>
                <View style={styles.imgCenterSec}>
                    <Image source={ImageName.GAMIFICATION_SURVEY_IMG} style={styles.surveyLogo} />
                    <Text style={styles.surveyText}>Survey</Text>
                    <Text style={styles.surveyMarketCompilerText}>Survey For Market Competitor</Text>
                </View>
                <View style={styles.greenCircelView}>
                    {this._onRenderCheckbox()}
                </View>
            </>
        )
    }

    // for submit the answer
    _onSubmitAnswer = async (value) => {
        let reqData = modifyApiRequestData(this.state, this.props,this.props.route.params.data.surveyId.toString());
        if (reqData.answerArr.length > 0) {
            await this._onChangeSurveyLoader(true);
            let responseData = await MiddlewareCheck("collectSurveyQsAnswers", reqData, this.props);
            if (responseData) {
                Toaster.ShortCenterToaster(responseData.message);
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ surveyLoader: true });
                    this._load();
                }
            }
            await this._onChangeSurveyLoader(false);
        }
    }

    // for check answer
    _onCheckAnswer = async (key, arrValue) => {
        if ((this.state.selectIndex + 1) < this.state.surveyData.length) {
            await this._onChangeSurveyLoader(true);
            this.state.surveyData[key].questionData = arrValue;
            this.state.surveyData[key].isGiveAnswer = forCheckAnswerGiven(arrValue);
            this.state.selectIndex = key + 1;
            this.state.selectedQuestionData = this.state.surveyData[this.state.selectIndex].questionData;
            this.state.surveyData = DataConvert.singleSetectDataModification(this.state.surveyData, this.state.selectIndex);
            this.setState(this.state);
            await this._onChangeSurveyLoader(false);
        }
    }

    // for check input answer
    _onCheckInputAnswer = async (key, arrValue) => {
        this.state.surveyData[key].questionData = arrValue;
        this.setState(this.state);
    }



    // for submit button
    _omSubmitButton = () => {
        if ((this.state.selectIndex + 1) == this.state.surveyData.length) {
            return (
                <View style={{ marginTop: '10%', marginHorizontal: '10%' }}>
                    <BigTextButton
                        text={"Submit"}
                        borderRadius={22}
                        backgroundColor={"#1F2B4D"}
                        fontSize={12}
                        height={42}
                        additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                        onPress={() => this._onSubmitAnswer()}
                    />
                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSection()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                        {this.imageSection()}
                        {this.state.surveyLoader ?
                            <View style={{ justifyContent: "center", alignItems: "center", height: Dimension.height / 2 }}>
                                <ActivityIndicator size={"large"} color={"#0D9478"} />
                            </View> :
                            <React.Fragment>
                                <DynamicComponent onTextInputAnswer={(key, arrValue) => this._onCheckInputAnswer(key, arrValue)} data={this.state.selectedQuestionData} selectIndex={this.state.selectIndex} onCheckAnswer={(key, arrValue) => this._onCheckAnswer(key, arrValue)} />
                                {this._omSubmitButton()}
                            </React.Fragment>
                        }
                        <View style={{ marginTop: 20 }} />
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        setDeviceId,
        stateAllCountries,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GamificationSurveyPage);