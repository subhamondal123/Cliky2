import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddButton, CheckBox, DropdownInputBox, Loader, Modal, TextInputBox } from "../../../shared";
import BigTextButton from "../../../shared/big-text-button";
import { CommonData, ErrorCode } from "../../../services/constant";
import { DateConvert, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import {  modifyQuestionList, validateAnswer } from "./Function";



class SurveyQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tmtbarText: "",
            totalDataCount: 0,
            offset: 0,
            noteTextActive: false,
            questionList: [],
            answerArr: [],
            pageloader: true,
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let reqData = {
            "surveyId": this.props.route.params.data.item.surveyId,
            "surveyReportId": this.props.route.params.data.surveyReportId,
            "limit": "4",
            "customerId": "0",
            "offset": this.state.offset.toString(),
            "answer": this.state.answerArr
        }
        let responseData = await MiddlewareCheck("getSurveyQuestion", reqData, this.props);
        if (responseData == false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.offset > this.state.totalDataCount) {
                    Toaster.ShortCenterToaster("Survey submitted successfully !\nThank You !");
                    this.props.navigation.goBack();
                } else {
                    this.setState({
                        totalDataCount: responseData.data.count,
                        questionList: modifyQuestionList(responseData.data.questionList, this.state.offset),
                        answerArr: []
                    })
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({
            pageloader: false
        })
    }


    headerSection = () => {
        const onBack = () => {
            this.props.navigation.goBack();
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 0.1 }}
                    onPress={() => onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ textAlign: 'center', fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: FontSize.LG, color: Color.COLOR.BLACK.PURE_BLACK }}>Questions</Text>
                </View>
                <View style={{ flex: 0.1 }} />
            </View>
        )
    }

    renderQuestionItem = (item, key) => {
        if (item.questionType == 1) {
            return this.multiChoiceQuestion(item, key)
        } else if (item.questionType == 2) {
            return this.writtenAnswerQuestion(item, key)
        } else if (item.questionType == 3) {
            return this.singleChoiceQuestion(item, key)
        }

    }

    multiChoiceQuestion = (item, key) => {
        const onCheck = (optionItem, optionKey, item, key) => {
            this.state.questionList[key].optionArr[optionKey].check = !optionItem.check;
            this.setState({
                questionList: this.state.questionList
            })
        }

        return (
            <View style={styles.mainBox} key={key}>
                <View style={[styles.violetBox, { backgroundColor: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : null }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
                        <View style={{}}>
                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                                <Text
                                    style={{
                                        color: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : '#5d6ec6',
                                        fontSize: FontSize.XS,
                                        fontFamily: FontFamily.FONTS.INTER.BOLD
                                    }}
                                >
                                    {"Q" + item.questionIndex.toString()}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD }}>{item.questionText}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: '1%' }}>
                    {item.optionArr.map((optionItem, optionKey) => (
                        <React.Fragment key={optionKey}>
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <View style={{ flex: 0.2 }}>
                                    <CheckBox
                                        borderRadius={0}
                                        data={optionItem.check}
                                        onClickValue={() => onCheck(optionItem, optionKey, item, key)}
                                    />
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{optionItem.value}</Text>
                                </View>
                            </View>
                            <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                        </React.Fragment>
                    ))}

                    {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <View style={{ flex: 0.2 }}>
                            <CheckBox
                                borderRadius={20}
                            />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>4-9 years</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <View style={{ flex: 0.2 }}>
                            <CheckBox
                                borderRadius={20}
                            />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>9 years of above</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} /> */}


                </View>
            </View>
        )
    }

    singleChoiceQuestion = (item, key) => {
        const onCheck = (optionItem, optionKey, item, key) => {
            let arr = this.state.questionList[key].optionArr;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == optionItem.id) {
                    arr[i].check = !arr[i].check;
                } else {
                    arr[i].check = false;
                }
            }
            this.state.questionList[key].optionArr = arr;
            this.setState({
                questionList: this.state.questionList
            })
        }

        return (
            <View style={styles.mainBox} key={key}>
                <View style={[styles.greenBox, { backgroundColor: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : null }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
                        <View style={{}}>
                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                                <Text
                                    style={{
                                        color: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : '#54daa8',
                                        fontSize: FontSize.XS,
                                        fontFamily: FontFamily.FONTS.INTER.BOLD
                                    }}
                                >
                                    {"Q" + item.questionIndex.toString()}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.boxHeaderText}>{item.questionText}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: '1%' }}>
                    {item.optionArr.map((optionItem, optionKey) => (
                        <React.Fragment key={optionKey}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }} key={optionKey}>
                                <View style={{ flex: 0.2 }}>
                                    <CheckBox
                                        borderRadius={20}
                                        data={optionItem.check}
                                        onClickValue={() => onCheck(optionItem, optionKey, item, key)}
                                    />
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Text style={styles.checkBoxText}>{optionItem.value}</Text>
                                </View>
                            </View>
                            <View style={styles.underline} />
                        </React.Fragment>
                    ))}
                    {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 0.2 }}>
                            <CheckBox
                                borderRadius={20}
                            />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>4-9 years</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 0.2 }}>
                            <CheckBox
                                borderRadius={20}
                            />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>9 years of above</Text>
                        </View>
                    </View>
                    <View style={styles.underline} /> */}


                </View>
            </View>
        )
    }

    writtenAnswerQuestion = (item, key) => {
        const _onChangeWrittenAns = (value) => {
            this.state.questionList[key].answerStr = value
            this.setState({
                questionList: this.state.questionList
            })
        }
        return (
            <View style={styles.mainBox} key={key}>
                <View style={[styles.salmonBox, { backgroundColor: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : null }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>

                        <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                            <Text
                                style={{
                                    color: key == 0 ? "#57CAEB" : key == 1 ? "#35DAA8" : key == 2 ? "#5D6EC6" : key == 3 ? "#FF7976" : '#f37977',
                                    fontSize: FontSize.XS,
                                    fontFamily: FontFamily.FONTS.INTER.BOLD
                                }}
                            >
                                {"Q" + item.questionIndex.toString()}
                            </Text>

                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD }}>{item.questionText}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 15, marginHorizontal: '2%' }}>
                    <TextInputBox
                        placeholder={"Type here ..."}
                        value={item.answerStr}
                        onChangeText={(value) => _onChangeWrittenAns(value, key)}
                        keyboardType="default"
                        isActive={item.answerStrActive}
                        onFocus={() => {
                            this.state.questionList[key].answerStrActive = true;
                            this.setState({ questionList: this.state.questionList })
                        }}
                        onBlur={() => {
                            this.state.questionList[key].answerStrActive = false;
                            this.setState({ questionList: this.state.questionList })
                        }}
                    />
                </View>
            </View>
        )
    }

    buttonSection = () => {
        const _onSubmit = async () => {
            let validatedData = validateAnswer(this.state.questionList);
            if (validatedData.status) {
                this.state.answerArr = validatedData.modifiedAnsArr;
                this.state.offset = this.state.offset + 4;
                this.setState({
                    answerArr: this.state.answerArr,
                    offset: this.state.offset,
                    pageloader: true,
                });
                await this._load();
            }
        }
        return (
            <View style={{ marginVertical: 40, marginHorizontal: "10%" }}>
                <BigTextButton
                    text={"Save & Next"}
                    onPress={() => _onSubmit()}
                />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <>
                        {this.headerSection()}
                        <View style={{ marginLeft: '5%', marginRight: '5%', }}>

                            {/* <View style={{ marginBottom: 10 }} /> */}
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                {/* <View style={styles.mainBox}>
                                <View style={styles.greenBox}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
                                        <View style={{}}>
                                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                                                <Text style={{ color: '#54daa8', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Q2</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text style={styles.boxHeaderText}>How many years in the Business ? </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, marginHorizontal: '1%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.checkBoxText}>1-3 years</Text>
                                        </View>
                                    </View>
                                    <View style={styles.underline} />
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>4-9 years</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>9 years of above</Text>
                                        </View>
                                    </View>
                                    <View style={styles.underline} />


                                </View>
                            </View> */}
                                {/* <View style={styles.mainBox}>
                                <View style={styles.violetBox}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
                                        <View style={{}}>
                                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                                                <Text style={{ color: '#5d6ec6', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Q3</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Quantity of your TMT business Per month(MT)?</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, marginHorizontal: '1%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>1-3 years gvjvjgj hvhg hjgchgdf hgfyggfc gfrdtd gfg gfhgh</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>4-9 years</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <CheckBox
                                                borderRadius={20}
                                            />
                                        </View>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ color: Color.COLOR.GRAY.ROUND_CAMEO, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>9 years of above</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 0.3, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, marginHorizontal: '5%', marginTop: 15 }} />


                                </View>
                            </View> */}
                                {/* <View style={styles.mainBox}>
                                <View style={styles.salmonBox}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
                                       
                                        <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                                            <Text style={{ color: '#f37977', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Q4</Text>
                                           
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Which Quantity of your TMT b</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15, marginHorizontal: '2%' }}>
                                    <TextInputBox
                                        placeholder={"TextInput"}
                                        value={this.state.tmtbarText}
                                        onChangeText={(value) => this._tmtText(value)}
                                        keyboardType="default"
                                        isActive={this.state.noteTextActive}
                                        onFocus={() => { this.setState({ noteTextActive: true }) }}
                                        onBlur={() => { this.setState({ noteTextActive: false }) }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View> */}

                                {this.state.questionList.map((item, key) => (
                                    this.renderQuestionItem(item, key)
                                ))}

                                {this.buttonSection()}
                                <View style={{ marginBottom: 40 }} />
                            </ScrollView>
                        </View>
                    </>
                }
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
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestions);