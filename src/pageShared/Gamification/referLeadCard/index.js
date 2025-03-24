import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Color, ImageName } from '../../../enums';
import { BigTextButton } from '../../../shared';


function ReferLeadCard({
    type,
    data,
    isHidden,
    onRemindLaterPress,
    onReferPress,
    props,
}) {
    if (isHidden) return null;

    const onRemindLater = (value) => {
        onRemindLaterPress(value)
    }

    const onRefer = (value) => {
        onReferPress(value)
    }


    return (
        <SafeAreaView>
            <View style={styles.mainBox}>
                <View style={styles.challengeHeaderSec}>
                    <View style={styles.leftSec}>
                        <Text style={styles.challengerLocBotom}>You can refer any lead. If it converted you will get{'\n'}<Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinIcon} />
                            <Text style={styles.winningPoints}> {data.winningPoints} Loyalty points</Text>
                        </Text>
                        <View style={{marginTop:25}}>
                            <BigTextButton
                                text={"Refer"}
                                backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                borderRadius={25}
                                additionalStyles={{ width: 100 }}
                                // fontColor={Color.COLOR.BLACK.PURE_BLACK}
                                fontSize={12}
                                onPress={() => onRefer()}
                            />
                        </View>
                    </View>
                    <View style={styles.profileImgSec}>
                        <Image source={ImageName.LEAD_REFER_ICON} style={styles.profileImg} />
                    </View>  
                </View>
            </View>
        </SafeAreaView >
    );

}

ReferLeadCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onRemindLaterPress: () => { },
    onReferPress: () => { }

};

ReferLeadCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onRemindLaterPress: PropTypes.func,
    onAcceptPress: PropTypes.func,

};


export default ReferLeadCard;