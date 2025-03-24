
import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageName } from "../../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";
import {
  apiErrorResponseValidator,
  apiSuccessResponseValidator,
} from "../../../services/Validators/apiResponseController";
import { Loader, TextInputBox } from "../../../shared";
import { validateModifiedData } from "./Function";
import styles from "./Style";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentialText: "",
      inputActive: false,
      pageLoader: false,
    };
  }

  componentDidMount() {
    this._load();
  }

  _load = () => { };

  onUserCredentialTextChange = (value) => {
    this.setState({
      userCredentialText: value,
    });
  };

  onSubmit = async () => {
    let data = {
      userCredentialText: this.state.userCredentialText
    };
    let modifiedData = validateModifiedData(data);
    if (modifiedData.isValidated) {
      let reqData = {
        email: this.state.userCredentialText
      };
      this.setState({ pageLoader: true });
      let responseData = await MiddlewareCheck("forgetpassword", reqData);
      if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let userInfo = responseData.data.userInfo;
        userInfo["userCredential"] = this.state.userCredentialText;
        apiSuccessResponseValidator(responseData);
        this.props.navigation.navigate("MailCheck", { passwordResData: userInfo });
      } else {
        apiErrorResponseValidator(responseData)
      }
      this.setState({ pageLoader: false });
    }
  };

  _onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.pageLoader ? (
          <Loader />
        ) : (
          <React.Fragment>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.backSec}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this._onBack()}
                >
                  <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>

              <View>
                <View style={styles.headView}>
                  <Image
                    // source={{ uri: ImageName.CONTACT_WITH_BG }}
                    source={ImageName.BLUE_KEY_ICON}
                    style={styles.backgroundImage}
                  />
                </View>
                <View style={styles.belowImageView}>
                  <Text style={styles.loginText}>
                    {"Forgot your Password?"}{" "}
                  </Text>
                  <Text style={styles.passConfirmText}>
                    Please enter your registered email id in which the OTP to reset the password will be send
                  </Text>
                </View>

                <View style={styles.formInputSection}>
                  <View style={{ marginBottom: 17 }}>
                    <View style={{ height: 14 }} />
                    <View style={styles.formInputBox}>
                      <TextInputBox
                        placeholder={"Enter your registered Email id"}
                        value={this.state.userCredentialText}
                        onChangeText={(value) => this.onUserCredentialTextChange(value)}
                        keyboardType={"default"}
                        returnKeyType={"done"}
                        isActive={this.state.inputActive}
                        onFocus={() => {
                          this.setState({ inputActive: true });
                        }}
                        onBlur={() => {
                          this.setState({ inputActive: false });
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={styles.buttonView}
                      activeOpacity={0.9}
                      onPress={() => this.onSubmit()}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 40 }} />
            </ScrollView>
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { Sales360Redux } = state;
  return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
      stateUserInformation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
