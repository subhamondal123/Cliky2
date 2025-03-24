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


function SurveyCard({
    type,
    data,
    isHidden,
    onRemindLaterPress,
    onAcceptPress,
    props,
}) {
    if (isHidden) return null;

    const onRemindLater = (value) => {
        onRemindLaterPress(value)
    }

    const onAccept = (value) => {
        onAcceptPress(value)
    }


    return (
        <SafeAreaView>
            <View style={styles.mainBox}>
                <View style={styles.challengeHeaderSec}>
                    <View style={styles.profileImgSec}>
                        <Image source={ImageName.GAMIFICATION_SURVEY_ICON} style={styles.profileImg} />
                    </View>
                    <View style={styles.mainChallengerDesc}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.challengerName}>{data.title}</Text>
                        </View>
                        <View>
                            <Text style={styles.challengerLoc}>Challenge open till {data.endDate}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.challengerLocBotom}>Complete the Survey and you will get additional  {'\n'} <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinIcon} />
                                <Text style={styles.winningPoints}> {data.surveyPoints} Loyalty points</Text>
                            </Text>
                        </View>
                        <View>
                        <Text style={styles.termsCondition}>Terms and condition applied</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 15 }}>
                    <View>
                        <BigTextButton
                            text={"Remind me Later"}
                            backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                            borderRadius={25}
                            fontColor={Color.COLOR.BLACK.PURE_BLACK}
                            fontSize={12}
                            additionalStyles={{ width: 160 ,borderWidth:0.5,borderColor:Color.COLOR.GRAY.DAVY_GRAY}}
                            onPress={() => onRemindLater(data)}
                            
                        />
                    </View>
                    <View style={{ width: 10 }} />
                    <View>
                        <BigTextButton
                            text={"Accept"}
                            backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                            borderRadius={25}
                            additionalStyles={{ width: 100 }}
                            // fontColor={Color.COLOR.BLACK.PURE_BLACK}
                            fontSize={12}
                            onPress={() => onAccept(data)}
                        />
                    </View>

                </View>
            </View>
        </SafeAreaView >
    );

}

SurveyCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onRemindLaterPress: () => { },
    onAcceptPress: () => { }

};

SurveyCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onRemindLaterPress: PropTypes.func,
    onAcceptPress: PropTypes.func,

};


export default SurveyCard;