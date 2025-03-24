import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { Dimension, ImageName } from "../../../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CustomStyle } from "../../../style";
import {
    AdditionalInformation,
    Description,
    TaskDetails,
    VisibilityPermission,

} from "./sub-component";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { Toaster } from "../../../../services/common-view-function";
import { modifyLanding, modifyResp } from "./Function";
import { Loader } from "../../../../shared";

class CreateAndEditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageloader: true,
            taskLandingData: {},
            allData: {},
            isTaskDetailsCompleted: true,
            isAdditionalInformationCompleted: false,
            isDescriptionCompleted: false,
            isPermissionCompleted: false,
        };
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this.getAllTaskLandingData();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            // await this.getTaskDetails();
            let modifyData = modifyResp(this.props.route.params.data)
            this.setState({
                allData: modifyData
            })

        }
        this.setState({
            pageloader: false
        })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getTaskDetails = async () => {
        let reqData = {
            taskId: this.props.route.params.data.taskId.toString()
        }
        let responseData = await MiddlewareCheck("getTaskDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0]);
                this.state.allData = modifiedApiResponse;
                this.setState({
                    allData: this.state.allData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getAllTaskLandingData = async () => {
        let responseData = await MiddlewareCheck("taskLandingData", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    taskLandingData: modifyLanding(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    onSaveDataFromTaskDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isAdditionalInformationCompleted: true
            })
        }

    }

    onSaveDataFromAdditionalInformation = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
            this.setState({
                isDescriptionCompleted: true
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isAdditionalInformationCompleted: false
            })
        }
    }

    onSaveDataFromDescription = (childData) => {

        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
            this.setState({
                isPermissionCompleted: true
            })
        } else {
            this.setState({
                isDescriptionCompleted: false
            })
        }
    }

    onSaveDataFromVisibilityPermission = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
        } else {
            this.setState({
                isPermissionCompleted: false
            })
        }
    }

    _onBack = () => {
        this.props.navigation.goBack()
    }

    headerSection = () => {
        return (
            <View>
                <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this._onBack()}
                        style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
                    >
                        <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerSection}>
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "edit" ? "Update Task" : "Create New Task"}</Text>
                </View>
            </View>
        )
    }

    progressBarSection = () => {
        return (
            <>
                {this.headerSection()}
                <View style={styles.progessSection}>
                    <View style={[styles.progressMainView, { marginTop: 3 }]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isTaskDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isTaskDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={styles.imgTick} />
                            </View>
                        </View>

                        <View style={this.state.isTaskDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isAdditionalInformationCompleted ? styles.numberCircleActive : styles.numberCircle}>

                                <Image source={this.state.isAdditionalInformationCompleted ? ImageName.TICK_MARK_IMG : null} style={styles.imgTick} />
                            </View>
                        </View>

                        <View style={this.state.isAdditionalInformationCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDescriptionCompleted ? styles.numberCircleActive : styles.numberCircle}>

                                <Image source={this.state.isDescriptionCompleted ? ImageName.TICK_MARK_IMG : null} style={styles.imgTick} />
                            </View>
                        </View>

                        <View style={this.state.isDescriptionCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPermissionCompleted ? styles.numberCircleActive : styles.numberCircle}>

                                <Image source={this.state.isPermissionCompleted ? ImageName.TICK_MARK_IMG : null} style={styles.imgTick} />
                            </View>
                        </View>

                    </View>
                </View>
            </>
        )
    }

    render() {
        if (this.state.pageloader) {
            return (
                <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={CustomStyle.container}>

                    {this.progressBarSection()}

                    {this.state.pageNum == 1 ?
                        <TaskDetails {...this.props} onSaveDataToParent={this.onSaveDataFromTaskDetails} taskLandingData={this.state.taskLandingData} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.pageNum == 2 ?
                        <AdditionalInformation {...this.props} onSaveDataToParent={this.onSaveDataFromAdditionalInformation} taskLandingData={this.state.taskLandingData} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.pageNum == 3 ?
                        <Description {...this.props} onSaveDataToParent={this.onSaveDataFromDescription} taskLandingData={this.state.taskLandingData} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.pageNum == 4 ?
                        <VisibilityPermission {...this.props} onSaveDataToParent={this.onSaveDataFromVisibilityPermission} taskLandingData={this.state.taskLandingData} allData={this.state.allData} />
                        :
                        null
                    }

                </SafeAreaView>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditTask);
