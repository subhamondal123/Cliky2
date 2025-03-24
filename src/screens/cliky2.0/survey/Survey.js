import React from "react";
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,

} from "react-native";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../redux/Sales360Action';
import { CustomStyle } from "../../style";
import { Dimension, ImageName } from "../../../enums";
import { BusinessDetails, PersonalDetails } from "./sub-component";
import { modifyCustomerType, modifyPageData } from "./Function";
import { MiddlewareCheck } from "../../../services/middleware";
import { Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { Loader } from "../../../shared";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageLoader: true,
            allData: {},
            allPageData: {
                // business details
                selectedVisitorTypeObj: {},
                allCustomerType: [],
                orgName: "",
                orgNameActive: false,
                ownerName: "",
                ownerNameActive: false,
                selectedProduct: {},
                productArr: [],
                productData: {},

                //personal details
                phoneNo: "",
                phoneNoActive: false,
                email: "",
                emailActive: false,
                address: "",
                addressActive: false,
                remarks: "",
                remarksActive: false,
                locationData: {},
                locationArr: []
            },
            isbusiness: true,
            isPersonal: false
        };
    }

    componentDidMount = async () => {
        await this._onLoad()
        this.setState({
            allData: modifyPageData()
        })
    }

    _onLoad = async () => {
        await MiddlewareCheck("pickUserCurrentLocation", {}, this.props)
        await this._onFetchCustomerType();
        this.setState({
            pageLoader: false
        })

    }

    _onFetchCustomerType = async () => {
        let responseData = await MiddlewareCheck("getContactTypes", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.allCustomerType = modifyCustomerType(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    headerSection = () => {
        return (
            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={CustomStyle.backButtonView} activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                    </TouchableOpacity>
                    <View style={CustomStyle.headerTextView}>
                        <Text style={CustomStyle.headerText}>Survey Form</Text>
                    </View>
                    <View style={CustomStyle.backButtonView} />
                </View>
            </View>
        )
    }

    progressBarSection = () => {
        return (
            <View>
                {this.headerSection()}

                <View style={styles.progessSection}>
                    <View style={[styles.progressMainView, { marginTop: 3 }]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isbusiness ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isbusiness ? ImageName.TICK_MARK_IMG : null} style={styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isbusiness ? styles.lineViewCompleted : styles.lineView} />
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonal ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonal ? ImageName.TICK_MARK_IMG : null} style={styles.numText} />
                            </View>
                        </View>

                    </View>
                </View>
            </View>

        )
    }

    parentCallbackFromPersonal = async (data) => {
        let allData = this.state.allData;
        Object.assign(allData, data.data);
        this.setState({

            pageNo: data.pageNum,
            allData: allData,
        })
        if (data.type == "next") {
            this.setState({
                pageLoader: true,
                isPersonal: true
            })
            let responseData = await MiddlewareCheck("startSurvey", this.state.allData, this.props);
            if (responseData) {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.route.params.onStartSurvey();
                    Toaster.ShortCenterToaster("Survey Started Successfully !")
                    this.props.navigation.replace("SurveyQuestions", { data: { item: this.props.route.params.data, surveyReportId: responseData.data.surveyReportId } });
                    // this.props.navigation.goBack();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ pageLoader: false })
        } else {
            this.setState({
                isPersonal: false
            })
        }
    }

    parentCallbackFromBusiness = (data) => {
        let allData = this.state.allData;
        Object.assign(allData, data.data);
        this.setState({
            pageNo: data.pageNum,
            allData: allData,
            isbusiness: true,
            isPersonal: true
        })
    }


    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    : <>
                        {this.progressBarSection()}
                        {this.state.pageNo == 1 ?
                            <BusinessDetails {...this.props} onParentCallBack={(data) => this.parentCallbackFromBusiness(data)} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNo == 2 ?
                            <PersonalDetails {...this.props} onParentCallBack={(data) => this.parentCallbackFromPersonal(data)} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }
                    </>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Survey);