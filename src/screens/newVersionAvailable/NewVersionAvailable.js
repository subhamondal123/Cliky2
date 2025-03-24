import React from 'react';
import styles from './Style';
import { DeviceInfo } from '../../services/config';
import { Toaster } from '../../services/common-view-function';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    ImageName,
    Padding
} from '../../enums';
import { TextButton } from '../../shared';
import LottieViewLoad from '../../shared/lottieViewLoad';
import { PLAYSTORE_URL } from '../../../globalConstant';

class NewVersionAvailable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versionData: this.props.route.data
        }
    }

    componentDidMount() {
        
    }

    onUpdate = async () => {
        Linking.openURL(this.state.versionData.appLink)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={ImageName.BACKGROUND_IMAGE} style={styles.bgimage}>
                    <View style={styles.logoSec}>
                        <LottieViewLoad height={150} type={"updateAvailable"} autoPlay={true} loop={true} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.errorText}>{`NEW VERSION AVAILABLE`}</Text>
                        {/* <Text style={styles.errorTextMsg}>Please Update</Text> */}
                        <View style={{ marginTop: Padding.PADDING.NORMAL_PADDING.NORMAL_PADDING_20X }} />
                        <TextButton
                            backgroundColor={Color.COLOR.RED.AMARANTH}
                            color={Color.COLOR.WHITE.PURE_WHITE}
                            fontFamily={FontFamily.FONTS.INTER.BOLD}
                            text={"Update"}
                            onClickValue={(value) => this.onUpdate(value)}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
};



export default (NewVersionAvailable);
