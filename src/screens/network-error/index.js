import React from 'react';
import styles from './style';
import { DeviceInfo } from '../../services/config';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    ImageName,
    Padding
} from '../../enums';
import { TextButton } from '../../shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
} from '../../redux/Sales360Action';
import LottieViewLoad from '../../shared/lottieViewLoad';

class NetworkError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authCheck: false
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        if (await StorageDataModification.authData({}, "get")) {    //chcek if user is logIn or not
            this.setState({
                authCheck: true
            })
        }
    }


    handleBackPress = async () => {
        // Check if the component is currently active
        if (this.props.navigation.isFocused()) {
            // Prevent going back when the network error screen is displayed
            // return true;
            if (await DeviceInfo.CheckConnection()) {
                // this.props.route.params.reload();
                this.props.navigation.goBack();
            } else {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NETWORK.ERROR);
            }
            return true; // Prevent default behavior
        } else {
            this.props.navigation.goBack();

            // return false; // Allow default behavior for other components

        }

    };


    onTryAgain = async () => {
        if (await DeviceInfo.CheckConnection()) {
            // this.props.route.params.reload();
            this.props.navigation.goBack();
        } else {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NETWORK.ERROR);
        }
    }

    onOdometer = () => {
        this.props.navigation.replace("odometer");
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={ImageName.BACKGROUND_IMAGE} style={styles.bgimage}>
                    <View style={styles.logoSec}>
                        <LottieViewLoad height={150} type={"networkError"} autoPlay={true} loop={true} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.errorText}>{`OOPS! \n NO INTERNET`}</Text>
                        <Text style={styles.errorTextMsg}>Please check your network connection</Text>
                        <View style={{ marginTop: Padding.PADDING.NORMAL_PADDING.NORMAL_PADDING_20X }} />
                        <TextButton
                            backgroundColor={Color.COLOR.BLUE.CAPRI}
                            color={Color.COLOR.WHITE.PURE_WHITE}
                            fontFamily={FontFamily.FONTS.INTER.BOLD}
                            text={"TRY AGAIN"}
                            onClickValue={(value) => this.onTryAgain(value)}
                        />
                    </View>
                    {/* {this.state.authCheck ?
                        <View style={{ marginHorizontal: "5%", marginTop: "10%" }}>
                            <TextButton
                                backgroundColor={Color.COLOR.YELLOW.SIMILER_YELLOW}
                                color={Color.COLOR.WHITE.PURE_WHITE}
                                fontFamily={FontFamily.FONTS.INTER.BOLD}
                                text={"Upload Odometer Photo"}
                                onClickValue={(value) => this.onOdometer(value)}
                            />
                        </View>
                        :
                        null
                    } */}
                </ImageBackground>
            </SafeAreaView>
        );
    }
};



// export default NetworkError;
const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NetworkError);
