import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Color, Dimension, ImageName } from '../../../enums';
import { BigTextButton, DynamicProgressBar } from '../../../shared';
import { DateConvert, Toaster } from '../../../services/common-view-function';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';


function ChallengeCard({
    type,
    data,
    isHidden,
    onRemindLaterPress,
    onAcceptPress,
    onSelectBox,
    props,
}) {
    if (isHidden) return null;
    const [adminChallengeLoader, setAdminChallengeLoader] = useState(false)
    const [systemChallengeLoader, setSystemChallengeLoader] = useState(false)
    const [acceptChallenge, setAcceptChallenge] = useState(false)
    const [companyAcceptChallenge, setCompanyAcceptChallenge] = useState(false)

    useEffect(() => {
        setAcceptChallenge(data.isAccepted_user == 1 ? true : false)
        setCompanyAcceptChallenge(data.isAccepted_admin == 1 ? true : false)
    }, [])


    const onRemindLater = (value) => {
        onRemindLaterPress(value)
    }

    const onAcceptSystem = async (value, type) => {
        onAcceptPress(value)
        //for system
        let reqData = {
            "challengeType": "2",
            "challengeId": value.challengeId,
            "challengeGroupId": value.challengeGrpId,
            "isAccepted": "1",
            "acceptedDatetime": DateConvert.fullDateFormat(new Date())
        }
        setSystemChallengeLoader(true)
        let responseData = await MiddlewareCheck("acceptChallenegesForUser", reqData, props);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                setAcceptChallenge(true)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        setSystemChallengeLoader(false)
    }

    const onAcceptAdmin = async (value, type) => {
        onAcceptPress(value)
        let reqData = {
            "challengeType": "1",
            "challengeId": value.challengeId.toString(),
            "challengeGroupId": value.challengeGrpId.toString(),
            "isAccepted": "1",
            "acceptedDatetime": DateConvert.fullDateFormat(new Date())
        }
        setAdminChallengeLoader(true)
        let responseData = await MiddlewareCheck("acceptChallenegesForUser", reqData, props);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                setCompanyAcceptChallenge(true)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        setAdminChallengeLoader(false)
    }

    const onSelectChallengeBox = (value) => {
        onSelectBox(value)
    }


    return (
        <SafeAreaView>
            {data.challengeType == "user" ?
                <View style={styles.mainBox} >
                    <>
                        {systemChallengeLoader ?
                            <View style={{ justifyContent: "center", alignItems: "center", height: 220, width: Dimension.width }}>
                                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                            </View>
                            :
                            <>
                            {/* //after accepting the system challenge bellow view will render */}
                                {acceptChallenge ?
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => onSelectChallengeBox(data)}>
                                        <View style={styles.acceptChallengeHeaderSec}>
                                            <View style={{ height: 15, width: 15, borderRadius: 8, backgroundColor: "#149CE0", marginRight: 5 }} />
                                            <Text style={styles.acceptchallengerName}>{data.opponentName}   vs    </Text>
                                            <View style={{ height: 15, width: 15, borderRadius: 8, backgroundColor: "#FFBD3D", marginRight: 3 }} />
                                            <Text style={styles.acceptchallengerName}>You</Text>
                                        </View>
                                        <View style={styles.loyaltyPointsSec}>
                                            <View>
                                                <Text style={styles.challengerLocAccept}>If you will win you get additional
                                                    <Text style={styles.winningPoints}>{'\n'} {data.winningPoints} Loyalty points</Text>
                                                </Text>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 30, width: 30, resizeMode: "contain" }} />
                                            </View>
                                        </View>
                                        <View style={styles.saleSec}>
                                            <View>
                                                <Text style={styles.challengerLocAcceptMid}>You only
                                                    <Text style={styles.winningPoints}> {data.userTargetPercentage}% away </Text>
                                                    to win the Challenge{'\n'} {parseInt(data.opponentTotalAmount) > parseInt(data.userTotalAmount) ? data.opponentName + " already sale" + ((parseInt(data.opponentTotalAmount) - parseInt(data.userTotalAmount).toFixed(2))) + "MT more than you" : "You Sale " + ((parseInt(data.userTotalAmount) - parseInt(data.opponentTotalAmount)).toFixed()) + "MT more than " + data.opponentName}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.profileChallengerSec}>
                                            <View>
                                                <Image source={data.opponentProfilePic.length == 0 ? ImageName.DUMMY_PROFILE : { uri: data.opponentProfilePic }} style={{ height: 40, width: 40, borderRadius: 500, resizeMode: "cover" }} />
                                            </View>
                                            <View style={{ width: 10 }} />
                                            <View>
                                                <Image source={data.userProfilePic.length == 0 ? ImageName.DUMMY_PROFILE : { uri: data.userProfilePic }} style={{ height: 40, width: 40, borderRadius: 500, resizeMode: "cover" }} />
                                            </View>
                                            <View style={{ width: 50 }} />
                                            <View style={{}}>
                                                <Text style={styles.profDateTxt}>{data.lastDate}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.progressBarSec}>
                                            <DynamicProgressBar
                                                data={data.userAchievedPercentage / 10}
                                                actualWidth={Dimension.width - 70}
                                                fontSize={12}
                                                type={"shak"}
                                                height={20}
                                                borderRadius={25}
                                                backgroundColor={"#FFBD3D"}
                                                activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                                                // mainValue={100}
                                                // totalValue={400}
                                                isText={false} />
                                        </View>
                                        <View style={styles.progressBarSec}>
                                            <DynamicProgressBar
                                                data={data.opponentAchievedPercentage / 10}
                                                actualWidth={Dimension.width - 70}
                                                fontSize={12}
                                                type={"shak"}
                                                height={20}
                                                borderRadius={25}
                                                backgroundColor={"#149CE0"}
                                                activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                                                // mainValue={100}
                                                // totalValue={400}
                                                isText={false} />
                                        </View>

                                    </TouchableOpacity>
                                    :
                                    <>
                                        <View style={styles.challengeHeaderSec}>
                                            <View style={styles.profileImgSec}>
                                                <Image source={data.opponentProfilePic.length == 0 ? ImageName.DUMMY_PROFILE : { uri: data.opponentProfilePic }} style={styles.profileImg} />
                                            </View>
                                            <View style={styles.mainChallengerDesc}>
                                                <Text style={styles.challengerName}>{data.title}</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={styles.challengerLoc}>{data.district}    </Text>
                                                    <Text style={styles.challengerLoc}>{data.zone}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.starImgSec}>
                                                <Image source={ImageName.YELLOW_STAR_ICON} style={styles.starImg} />
                                                <View style={{ position: 'absolute', top: 5, bottom: 0, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={styles.labelTxt}>{data.opponentLevelShort}</Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ marginTop: 20, paddingRight: 40, paddingLeft: 5 }}>
                                            <Text style={styles.challengerLoc}>Accept the challenge. If you win you get additional <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinIcon} />
                                                <Text style={styles.winningPoints}> {data.winningPoints} Loyalty points</Text>
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10, paddingLeft: 5 }}>
                                            <Text style={styles.termsCondition}>Terms and condition applied</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20, marginBottom: 15 }}>
                                            <View>
                                                <BigTextButton
                                                    text={"Remind me Later"}
                                                    backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                                    borderRadius={25}
                                                    fontColor={Color.COLOR.BLACK.PURE_BLACK}
                                                    fontSize={12}
                                                    additionalStyles={{ width: 160 }}
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
                                                    onPress={() => onAcceptSystem(data, "user")}
                                                />
                                            </View>

                                        </View>
                                    </>
                                }
                            </>
                        }
                    </>

                </View>
                :

                //elseeee

                //for admin

                <View style={styles.mainCompanyBox}>
                    <>
                     {/* //after accepting the admin challenge bellow view will render */}
                        {adminChallengeLoader ?
                            <View style={{ justifyContent: "center", alignItems: "center", height: 180, width: Dimension.width }}>
                                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                            </View>
                            :
                            <>
                                {companyAcceptChallenge ?
                                    <View activeOpacity={0.9} >
                                        <View style={styles.challengeHeaderSec}>
                                            <View style={styles.surveyChallengerDesc}>

                                                <View style={{ width: "90%" }}>
                                                    <Text style={styles.challengerName}>{data.title}</Text>
                                                    <Text style={styles.challengerLoc}>Challenge open till {data.challengeEndDate}</Text>
                                                    <Text style={styles.challengerLoc}>Sales Challenge Target : <Text style={styles.winningPoints}>{data.winningPoints} MT.</Text></Text>
                                                </View>
                                            </View>

                                            {/* <View style={styles.realEdgeImgSec}>
                                                <Image source={ImageName.REAL_EDGE_ICON} style={styles.realEdgeImg} />
                                            </View> */}

                                        </View>
                                        <View style={styles.loyaltyPointsSec_Company}>
                                            <View>
                                                <Text style={styles.challengerLocCompanyAccept}>If you win you will get additional
                                                    <Text style={styles.winningPoints}>{'\n'} {data.winningPoints} Loyalty points</Text>
                                                </Text>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 30, width: 30, resizeMode: "contain" }} />
                                            </View>
                                        </View>
                                        <View style={styles.saleSec_company}>
                                            <View>
                                                <Text style={styles.challengerLocAcceptCompanyMid}>You only
                                                    <Text style={styles.winningPoints}> {data.targetPercentage}% away </Text>
                                                    to win the Challenge
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.progressBarSec}>
                                            <DynamicProgressBar
                                                data={data.achievedPercentage / 10}
                                                fontSize={12}
                                                type={"shak"}
                                                height={40}
                                                borderRadius={25}
                                                backgroundColor={"#F13748"}
                                                activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                                                // mainValue={100}
                                                // totalValue={400}
                                                actualWidth={Dimension.width - 70}
                                                isText={false} />
                                        </View>
                                        <View style={{ height: 10 }} />
                                    </View>
                                    :
                                    <View activeOpacity={0.9} onPress={() => onSelectChallengeBox(data)}>
                                        <View style={styles.challengeHeaderSec}>
                                            <View style={styles.surveyChallengerDesc}>

                                                <View style={{ width: "90%" }}>
                                                    <Text style={styles.challengerName}>{data.title}</Text>
                                                    <Text style={styles.challengerLoc}>Challenge open till {data.challengeEndDate}</Text>
                                                </View>
                                            </View>
                                            {data.icon ?
                                                <View style={styles.realEdgeImgSec}>
                                                    <Image source={ImageName.REAL_EDGE_ICON} style={styles.realEdgeImg} />
                                                </View>
                                                :
                                                null}


                                        </View>
                                        <View style={{ marginTop: 10, paddingRight: 40, paddingLeft: 5 }}>
                                            <Text style={styles.challengerLocRedTxt}>Accept the challenge. If you win you get additional <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinIcon} />
                                                <Text style={styles.winningPoints}> {data.winningPoints} Loyalty points</Text>
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10, paddingLeft: 5 }}>
                                            <Text style={styles.termsCondition}>Terms and condition applied</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20, marginBottom: 15 }}>
                                            <View>
                                                <BigTextButton
                                                    text={"Remind me Later"}
                                                    backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                                    borderRadius={25}
                                                    fontColor={Color.COLOR.BLACK.PURE_BLACK}
                                                    fontSize={12}
                                                    additionalStyles={{ width: 160 }}
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
                                                    onPress={() => onAcceptAdmin(data, "company")}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                }
                            </>
                        }
                    </>
                </View>
            }

        </SafeAreaView >
    );

}

ChallengeCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onRemindLaterPress: () => { },
    onAcceptPress: () => { },
    onSelectBox: () => { }
};

ChallengeCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onRemindLaterPress: PropTypes.func,
    onAcceptPress: PropTypes.func,
    onSelectBox: PropTypes.func,

};


export default ChallengeCard;