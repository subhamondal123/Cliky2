import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Color, FontSize, ImageName } from "../../enums";
import styles from "./Style";
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
} from '../../redux/Sales360Action';
import { connect } from "react-redux";

class MailCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propData: {}
        };
    }

    componentDidMount = async () => {
        if (this.props.route.params !== undefined || this.props.route.params !== null) {
            this.setState({
                propData: this.props.route.params.passwordResData
            })
        }

    }

    _onPressOkButton = () => {
        this.props.navigation.replace("OtpVerifyChangePassword", { propData: this.state.propData })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                    <View style={styles.contentSec}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                            <View style={styles.boxSec}>
                                <Image source={{ uri: ImageName.MESSAGE_WITH_BG }} style={styles.boxImg} />
                            </View>
                        </View>
                        <View style={{}}>
                            <Text style={styles.mailText}>{"Check Your \nMail"}</Text>
                        </View>
                        <View style={{ marginTop: 13 }}>
                            <Text style={styles.belowMailText}>We have sent a verification code on your email. Please ensure to check your spam box incase you can't find it in your inbox.</Text>
                        </View>
                    </View>
                    <View style={styles.buttonSec}>
                        <View style={styles.buttonSection}>
                            <TouchableOpacity style={styles.buttonView} activeOpacity={0.9} onPress={() => this._onPressOkButton()}>
                                <Text style={styles.buttonText}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
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
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MailCheck);
