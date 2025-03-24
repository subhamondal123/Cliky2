import React from "react";
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  stateCheckForNetwork,
  stateUserInformation
} from "../../redux/Sales360Action";
import RenderHtml from "react-native-render-html";
import { Dimension, ImageName } from "../../enums";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { Toaster } from "../../services/common-view-function";
import { Loader } from "../../shared";
import { AppInfo } from "../../services/config";
import { APP_INDEX } from "../../../globalConstant";
import { CustomStyle } from "../style";
import { Image } from "react-native";


class PolicyView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      htmlData: "",
      pageLoader: true
    };
  }

  // set the initial data
  _onSetInitialStateData = async () => {
    this.setState({
      htmlData: "",
      pageLoader: true
    })
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus', async () => {
        await this._onSetInitialStateData();
        this._load();
      })
  }

  _load = async () => {
    let responseData = await MiddlewareCheck("getApplicationPolicy", { "packageName": AppInfo.getAppPackageName(), "policyType": this.props.route.params.type, "appIndex": APP_INDEX });
    if (responseData == false) {
      this.props.navigation.navigate("NetworkError");
    } else {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({ htmlData: responseData.data.body });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({ pageLoader: false })
  }

  _onBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    if (this.state.pageLoader) {
      return <Loader />;
    } else {
      return (
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '2%' }}>
            <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
              <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
            </TouchableOpacity>
            <View style={CustomStyle.headerTextView}>
              <Text style={CustomStyle.headerText}>{this.props.route.params.type == "privacyPolicy" ? "Privacy Policy" : "Terms & Conditions"}</Text>
            </View>
            <View style={CustomStyle.backButtonView} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: '5%' }}>
            <RenderHtml contentWidth={Dimension.width} source={{ html: this.state.htmlData }} />
            <View style={{ marginBottom: "20%" }} />
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { Sales360Redux } = state;
  return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    stateCheckForNetwork,
    stateUserInformation
  }, dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PolicyView);
