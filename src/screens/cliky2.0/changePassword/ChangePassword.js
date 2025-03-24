import React from "react";
import { AlertMessage, Color, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../enums';
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
import { ErrorCode, LengthValidate } from '../../../services/constant';
import { validationCheck } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader, TextInputBox } from "../../../shared";
import { MiddlewareCheck } from "../../../services/middleware";
import { apiErrorResponseValidator, apiSuccessResponseValidator } from "../../../services/Validators/apiResponseController";
import { CommonActions } from "@react-navigation/native";
import { StorageDataModification } from "../../../services/common-view-function";


class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            password: "",
            confirmPassword: "",
            currentPassActive: false,
            passActive: false,
            confirmActive: false,
            passwordCheck: true,
            confirmPasswordCheck: true,
            currentPasswordCheck: true,
            passError: false,
            confirmPassError: false,
            currentPassError: false,
            userCredential: {},
            pageLoader: false,

        }
    }

    componentDidMount() {

        this._load();
    }


    _load = async () => {
        let userdata = await StorageDataModification.userCredential({}, "get");
        this.setState({
            userCredential: userdata
        })

    }

    _onCurrentPassword = (value) => {
        this.setState({
            currentPassword: value
        })
    }

    _onPassword = (value) => {
        this.setState({
            password: value

        })
    }

    _onConfirmassword = (value) => {
        this.setState({
            confirmPassword: value

        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    _eyeVisiable = (data) => {
        if (data == "PasswordNew") {
            this.state.passwordCheck = !this.state.passwordCheck;
        } else if (data == "ConfirmPass") {
            this.state.confirmPasswordCheck = !this.state.confirmPasswordCheck;
        } else { this.state.currentPasswordCheck = !this.state.currentPasswordCheck }

        this.setState({
            passwordCheck: this.state.passwordCheck,
            confirmPasswordCheck: this.state.confirmPasswordCheck,
            currentPasswordCheck: this.state.currentPasswordCheck
        })

    }

    _onSavePassword = async () => {
        let data = {
            currentPassword: this.state.currentPassword,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        let validPass = validationCheck(data)
        if (validPass.status == true) {
            let reqData = {
                "oldPassword": this.state.currentPassword,
                "newPassword": this.state.confirmPassword,
                "userId": this.state.userCredential.userId
            }
            this.setState({ pageLoader: true });
            let responseData = await MiddlewareCheck("changepassword", reqData, this.props)
            this.setState({ pageLoader: false });
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.removeLoginData();
                await StorageDataModification.removeAllStorageData();

                // await multipleRemove(["auth", "userCredential", "headerData", ...StoreDataToStorage.allStorageVariable]);
                apiSuccessResponseValidator(responseData);
                this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
            } else {
                apiErrorResponseValidator(responseData)
            }
        } else {
            this.setState(validPass.stateObj);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ? <Loader />
                    : <React.Fragment>
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>

                            <View style={styles.backSec}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ marginLeft: '10%', marginRight: '10%' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                    <Image source={ImageName.LOGIN_BACKGROUND_BIG_IMAGE} style={styles.backgroundImage} />
                                </View>
                                <View style={styles.belowImageView}>
                                    <Text style={styles.loginText}>{"Change Password"} </Text>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.formLabel}>Current Password</Text>
                                    <View style={styles.formInputBox}>
                                        <TextInputBox
                                            placeholder={"Enter Your Current Password"}
                                            value={this.state.currentPassword}
                                            onChangeText={(value) => this._onCurrentPassword(value)}
                                            secureTextEntry={this.state.currentPasswordCheck}
                                            maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                            isRightIcon={true}
                                            keyboardType="default"
                                            rightIcon={this.state.currentPasswordCheck ? ImageName.CLOSE_EYE : ImageName.OPEN_EYE}
                                            onPressRightIcon={() => this._eyeVisiable("CurrentPass")}
                                            refName={ref => this.firstTextInput = ref}
                                            isActive={this.state.currentPassActive}
                                            onFocus={() => { this.setState({ currentPassActive: true }) }}
                                            onBlur={() => { this.setState({ currentPassActive: false }) }}
                                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                        />

                                    </View>

                                    <View style={{ marginBottom: 1 }}>
                                        <Text style={styles.formLabel}>New Password</Text>
                                        <View style={styles.formInputBox}>
                                            <TextInputBox
                                                placeholder={"Enter New Password"}
                                                value={this.state.password}
                                                onChangeText={(value) => this._onPassword(value)}
                                                secureTextEntry={this.state.passwordCheck}
                                                maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                                isRightIcon={true}
                                                keyboardType="default"
                                                rightIcon={this.state.passwordCheck ? ImageName.CLOSE_EYE : ImageName.OPEN_EYE}
                                                onPressRightIcon={() => this._eyeVisiable("PasswordNew")}
                                                refName={ref => this.secondTextInput = ref}
                                                isActive={this.state.passActive}
                                                onFocus={() => { this.setState({ passActive: true }) }}
                                                onBlur={() => { this.setState({ passActive: false }) }}
                                                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={styles.formLabel}>Confirm Password</Text>
                                        <View style={styles.formInputBox}>
                                            <TextInputBox
                                                placeholder={"Enter Your Confirm Password"}
                                                value={this.state.confirmPassword}
                                                onChangeText={(value) => this._onConfirmassword(value)}
                                                secureTextEntry={this.state.confirmPasswordCheck}
                                                maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                                isRightIcon={true}
                                                keyboardType="default"
                                                rightIcon={this.state.confirmPasswordCheck ? ImageName.CLOSE_EYE : ImageName.OPEN_EYE}
                                                onPressRightIcon={() => this._eyeVisiable("ConfirmPass")}
                                                refName={ref => this.thirdTextInput = ref}
                                                isActive={this.state.confirmActive}
                                                onFocus={() => { this.setState({ confirmActive: true }) }}
                                                onBlur={() => { this.setState({ confirmActive: false }) }}

                                            />

                                        </View>
                                    </View>
                                    <View style={styles.buttonSection}>
                                        <TouchableOpacity style={styles.buttonView}
                                            activeOpacity={0.9}
                                            onPress={() => this._onSavePassword()}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginBottom: 50 }} />
                                </View>
                            </View>
                        </ScrollView>
                    </React.Fragment>}

            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);