import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  stateUserInformation,
  stateCheckForNetwork,
} from '../../../../redux/Sales360Action';
import { CustomStyle } from '../../../style';
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums';
import { ChallengeCard, DashboardTab, DynamicGamificationCard, PerfomerProfileCard, ReferLeadCard, SurveyCard } from '../../../../pageShared';
import Header from '../../header/Header';
import * as Progress from 'react-native-progress';
import styles from './style';
import { BigTextButton, Modal } from '../../../../shared';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { modifyAdminChallengeArr, modifyChallengeArr, modifyDashboardData, modifySurveyArr, modifySystemChallengeArr, modifyTopPerformerArr } from './function';
import { DateConvert, Toaster } from '../../../../services/common-view-function';
import { RefreshControl } from 'react-native';

const referLeadArr = [
  {
    challengeType: "user",
    profileIcon: ImageName.HOME_LOGO,
    challengeIcon: ImageName.YELLOW_COIN_ICON,
    title: "Competitor Activity",
    challengerName: "Ramesh Roy",
    district: "Bardhamanmm",
    zone: "Zone 2",
    userLevel: 3,
    winningPoints: 200,
    lastDate: "2011-08-12T20:17:46.384Z",
  },
]

const topTeamArr = [
  {
    icon: ImageName.CARD_KING_LOGO,
    position: "1",
    // executiveCount: "80",
    achievementPercentage: "80",
    lastDate: "2011-08-12T20:17:46.384Z",
    backgroundColor: "#000000"
  },

  {
    icon: ImageName.CARD_KING_LOGO,
    position: "2",
    // executiveCount: "80",
    achievementPercentage: "60",
    lastDate: "2011-08-12T20:17:46.384Z",
    backgroundColor: "#604D8B"
  },

]

const tabData = [
  {
    id: 1,
    name: "Near to Achieve",
    icon: ImageName.BULLS_EYE_ICON,
    check: false
  },
  {
    id: 2,
    name: "Top Gain",
    icon: ImageName.YELLOW_COIN_ICON,
    check: false
  },
  {
    id: 3,
    name: "My Team",
    icon: ImageName.YELLOW_STAR_ICON,
    check: false
  },
  {
    id: 4,
    name: "Refer A Lead",
    icon: ImageName.POLICE_MIC_ICON,
    check: false
  },
  {
    id: 5,
    name: "Congratulated By",
    icon: ImageName.RED_BACK_THUMB_ICON,
    check: false
  },
]



class GamificationDashboard extends Component {
  constructor(props) {
    super(props)
    this.flatListRef = React.createRef();
    this.state = {
      test: "",
      congratulationModal: false,
      promotionModal: false,
      topPerformerArray: [],
      challengesArray_admin: [],
      challengesArray_system: [],
      surveyArray: [],
      referLeadArray: referLeadArr,
      topPerformerLoader: false,
      adminChallengeLoader: false,
      systemChallengeLoader: false,
      userDashboardLoader: false,
      surveyLoader: false,
      refreshing: true,
      userDashboardData: {
        totalAmount: "",
        userId: "",
        profileImgUrl: "",
        phone: "",
        email: "",
        userName: "",
        designationName: "",
        levelName: "",
        pointsEarned: "",
        levelId: "",
        targetQty: "",
        achievedPercentage: 0,
        achievementDifference: "",
        congratsCount: ""
      }
    }
  }

  componentDidMount = () => {
    this.calculateHeight()
    this._onLoad()
  }
  calculateHeight = () => {
    if (this.flatListRef.current) {
      this.flatListRef.current.measure((_, height) => {
        // Update the height of the FlatList
        this.flatListRef.current.setNativeProps({ style: { height } });
      });
    }
  };
  _onLoad = async () => {
    this.setState({ refreshing: false });
    await this.getDashboardData()
    await this.getTopPerformerList()
    await this.getSurveyList()

  }

  getDashboardData = async () => {
    this.setState({ userDashboardLoader: true })
    let responseData = await MiddlewareCheck("getUserDashboardData", {}, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let dashData = modifyDashboardData(responseData.response)
        this.state.userDashboardData.totalAmount = dashData.totalAmount;
        this.state.userDashboardData.congratsCount = dashData.congratsCount;
        this.state.userDashboardData.userId = dashData.userId;
        this.state.userDashboardData.profileImgUrl = dashData.profileImgUrl;
        this.state.userDashboardData.phone = dashData.phone;
        this.state.userDashboardData.email = dashData.email;
        this.state.userDashboardData.userName = dashData.userName;
        this.state.userDashboardData.designationName = dashData.designationName;
        this.state.userDashboardData.levelName = dashData.levelName;
        this.state.userDashboardData.pointsEarned = dashData.pointsEarned;
        this.state.userDashboardData.targetQty = dashData.targetQty;
        this.state.userDashboardData.achievementDifference = dashData.achievementDifference
        this.state.userDashboardData.achievedPercentage = ((dashData.achievedPercentage) / 100).toFixed(2);

        this.setState({
          userDashboardData: this.state.userDashboardData
        })
        await this.getAdminChallengeList(dashData)
        await this.getSystemChallengeList(dashData)
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
      this.setState({ userDashboardLoader: false })
    }
  }

  getSurveyList = async (userDashboardData) => {
    this.setState({ surveyLoader: true })

    let responseData = await MiddlewareCheck("getSurveyForUser", {}, this.props);
    if (responseData == false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          surveyArray: modifySurveyArr(responseData).list
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ surveyLoader: false })
  }

  getAdminChallengeList = async (userDashboardData) => {
    this.setState({ adminChallengeLoader: true })
    let reqData = {
      "challengeType": "1"
    }
    let responseData = await MiddlewareCheck("getChallenegesForUser", reqData, this.props);
    if (responseData == false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          challengesArray_admin: modifyAdminChallengeArr(responseData, userDashboardData).list
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ adminChallengeLoader: false })
  }

  getSystemChallengeList = async (userDashboardData) => {
    this.setState({ systemChallengeLoader: true })
    let reqData = {
      "challengeType": "2"
    }
    let responseData = await MiddlewareCheck("getChallenegesForUser", reqData, this.props);
    if (responseData == false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          challengesArray_system: modifySystemChallengeArr(responseData, userDashboardData).list
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ systemChallengeLoader: false })
  }
  getTopPerformerList = async () => {
    this.setState({ topPerformerLoader: true })
    let responseData = await MiddlewareCheck("topUserListForGamification", {}, this.props);
    if (responseData == false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          topPerformerArray: modifyTopPerformerArr(responseData).list
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ topPerformerLoader: false })
  }

  progressBarSection = () => {
    return (
      <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
        {this.state.userDashboardLoader ?
          null :
          <>
            <Text style={styles.progressHeaderTxt}>You are in <Text style={styles.headerTxt}>{this.state.userDashboardData.levelName}</Text></Text>
            <View style={styles.progressBarSec}>
              <Progress.Bar progress={Number(this.state.userDashboardData.achievedPercentage)} width={300} style={{ backgroundColor: "#C7C7C7" }} color='#00B65E' borderWidth={0} />
            </View>
            <Text style={styles.progressValueTxt}>{this.state.userDashboardData.totalAmount}MT. <Text style={styles.footerTxt}>achieved of {this.state.userDashboardData.targetQty}MT.</Text></Text>
          </>
        }
      </View>
    )
  }

  onOpenCongratulationModal = () => {
    this.setState({ congratulationModal: !this.state.congratulationModal })
  }

  onOpenPromotionModal = () => {
    // this.setState({ promotionModal: !this.state.promotionModal })
    this.props.navigation.navigate("GamificationPointsSummeryList")
  }

  earningSection = () => {
    return (
      <TouchableOpacity style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }} activeOpacity={0.9} onPress={() => this.onOpenPromotionModal()}>
        <Text style={styles.progressFooterTxt}>You Earned</Text>
        <View style={styles.mainSec}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 5 }}>
            <View>
              <Image source={ImageName.YELLOW_COIN_ICON} style={styles.mainImg} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginLeft: 5 }}>
              <Text style={styles.labelTxt}>{this.state.userDashboardData.pointsEarned}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 50 }}>
          <Text style={styles.progressFooterTxt}>You Need to complete only <Text style={styles.progressValueTxt}>{isNaN(this.state.userDashboardData.achievementDifference) ? 0 : parseInt(this.state.userDashboardData.achievementDifference).toFixed(2)}MT.</Text> Sales to reach next level</Text>
        </View>
      </TouchableOpacity>
    )
  }

  coneLevelSection = () => {
    return (
      <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{ marginRight: 5, marginBottom: 10 }} activeOpacity={0.9} onPress={() => this.onOpenCongratulationModal()}>
          <Image source={ImageName.YELLOW_STAR_ICON} style={styles.starImg} />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.starSecTxt}>5</Text>
          </View>
        </TouchableOpacity>
        <ImageBackground source={ImageName.CLOUD_ICON} style={{ height: 220, width: Dimension.width, resizeMode: "contain" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={ImageName.LEVEL_4_ICON} style={{ height: 70, width: 80, resizeMode: "stretch" }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.starSecLevelTxt}>Level 4</Text>
            </View>
            {this.state.userDashboardData.levelName == "level 4" ?
              <View style={{ position: 'absolute', top: -15, left: 0, right: -105, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={ImageName.RED_FLAG_ICON} style={{ height: 70, width: 80, resizeMode: "stretch" }} />
              </View>
              :
              null
            }


          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={ImageName.LEVEL_3_ICON} style={{ height: 70, width: 155, resizeMode: "stretch" }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.starSecLevelTxt}>Level 3</Text>
            </View>
            {this.state.userDashboardData.levelName == "level 3" ?
              <View style={{ position: 'absolute', top: -15, left: 0, right: -175, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={ImageName.RED_FLAG_ICON} style={{ height: 70, width: 80, resizeMode: "stretch" }} />
              </View>
              :
              null}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={ImageName.LEVEL_2_ICON} style={{ height: 70, width: 230, resizeMode: "stretch" }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.starSecLevelTxt}>Level 2</Text>
            </View>
            {this.state.userDashboardData.levelName == "level 2" ?
              <View style={{ position: 'absolute', top: -15, left: 0, right: -225, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={ImageName.RED_FLAG_ICON} style={{ height: 70, width: 80, resizeMode: "stretch" }} />
              </View>
              :
              null}

          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={ImageName.LEVEL_1_ICON} style={{ height: 70, width: 290, resizeMode: "stretch", top: -1, marginRight: 5 }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.starSecLevelTxt}>Level 1</Text>
            </View>
            {this.state.userDashboardData.levelName == "level 1" ?
              <View style={{ position: 'absolute', top: -15, left: 0, right: -275, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={ImageName.RED_FLAG_ICON} style={{ height: 70, width: 80, resizeMode: "stretch" }} />
              </View>
              :
              null
            }
          </View>

        </ImageBackground>
        <View style={{ marginTop: 80 }}>
          <Text style={styles.footerLevelTxt}>Challenge your next level performer and gain more points</Text>
          <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.footerLevelTxt}>This Target will complete by </Text>
            <Text style={styles.footerLevelDateTxt}>June 23rd</Text>
          </View>
        </View>
      </View>
    )
  }

  topTeamSection = () => {

    const onPressTab = (value) => {
      this.props.navigation.navigate("GamificationChallenges")
    }
    return (
      <View>
        {topTeamArr.length > 0 ?
          <>
            <View style={styles.topTeamLabel}>
              <Text style={styles.topTeamTxt}>Top Performing Team</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                {topTeamArr.map((item, key) => (
                  <View key={key} style={{ marginRight: 15 }}>
                    <DynamicGamificationCard data={item} onSelectTab={(value) => onPressTab(value)} />
                  </View>
                ))
                }
              </View>

            </ScrollView>

          </>
          : null}
      </View>
    )
  }

  //Top Performer Section
  topPerformerSection = () => {

    const getItemLayout = (data, index) => ({
      length: 50, // Height of each item
      offset: 50 * index, // Offset for the current item
      index,
    });
    const onLikePress = async (data, key) => {
      let arrData = this.state.topPerformerArray;
      for (let i = 0; i < arrData.length; i++) {
        if (i == key) {
          arrData[i].thanksChecking = data.thanksChecking == "1" ? "0" : "1"
        }
      }
      this.state.topPerformerArray = arrData;
      this.setState({ topPerformerArray: this.state.topPerformerArray })

      let reqData = {
        "likeToId": data.topUserId.toString(),
        "createdAt": DateConvert.fullDateFormat(new Date())
      }
      let responseData = await MiddlewareCheck("likeToUser", reqData, this.props);
      if (responseData == false) {
      } else {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

          Toaster.ShortCenterToaster(responseData.message)

        } else {
          Toaster.ShortCenterToaster(responseData.message)
        }
      }
    }

    const renderList = (item) => {
      return (
        <View style={{ marginRight: 15 }}>
          <PerfomerProfileCard data={item.item} onLikePress={(data) => onLikePress(data, item.index)} />
        </View>
      )
    }

    return (
      <View>
        {this.state.topPerformerLoader ?
          <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
          </View>
          :
          <React.Fragment>
            {this.state.topPerformerArray.length > 0 ?
              <>
                <View style={styles.topTeamLabel}>
                  <Text style={styles.topTeamTxt}>Top Performer</Text>
                </View>
                <View>
                  <FlatList
                    ref={this.flatListRef}
                    data={this.state.topPerformerArray}
                    renderItem={(item, key) => renderList(item, key)}
                    keyExtractor={(item, key) => key}
                    onEndReachedThreshold={0.1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={styles.contentContainer}
                  />
                </View>

              </>
              : null}

          </React.Fragment>}

      </View>
    )
  }

  //Challenges Section
  challengesSection = () => {
    //for loader
    const onChangeAdminLoader = async (type) => {
      this.state.adminChallengeLoader = type;
      this.setState(this.state);
    }

    const onChangeSystemLoader = async (type) => {
      this.state.systemChallengeLoader = type;
      this.setState(this.state);
    }

    //.................remind later for Admin functionality.....

    const onRemindLaterAdmin = async (val) => {
      await onChangeAdminLoader(true);
      let arr = this.state.challengesArray_admin,
        brr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].challengeGrpId == val.challengeGrpId) {

        } else {
          brr.push(arr[i])
        }
      }
      this.state.challengesArray_admin = brr;
      this.setState({ challengesArray_admin: this.state.challengesArray_admin })
      await onChangeAdminLoader(false);
    }

    //.................remind later for System functionality.....

    const onRemindLaterSystem = async (val) => {
      await onChangeSystemLoader(true);
      let arr = this.state.challengesArray_system,
        brr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].participationConfigId == val.participationConfigId) {

        } else {
          brr.push(arr[i])
        }
      }
      this.state.challengesArray_system = brr;
      this.setState({ challengesArray_system: this.state.challengesArray_system })
      await onChangeSystemLoader(false);
    }

    const onSelectChallengeBox = (value) => {
      this.props.navigation.navigate("GamificationChallengePage", { data: value })
    }

    return (
      <View style={styles.challengesSec}>
        {this.state.challengesArray_admin.length == 0 && this.state.challengesArray_system.length == 0 ?
          null
          :
          <>
            <View style={styles.topTeamLabel}>
              <Text style={styles.challengeLabelTxt}>Challenges for you</Text>
            </View>
            <View>
              <Image source={ImageName.GET_THE_TROPHY_ICON} style={styles.trophyImg} />
            </View>

            {/* System Challenges card */}
            {this.state.systemChallengeLoader ?
              <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
              </View>
              :
              <React.Fragment>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  <View style={{ flexDirection: "row" }}>
                    {this.state.challengesArray_system.length > 0 ?
                      <React.Fragment>
                        {this.state.challengesArray_system.map((item, key) => (
                          <View key={key} style={{ marginBottom: 10 }}>
                            <ChallengeCard data={item} onSelectBox={(value) => onSelectChallengeBox(value)} onRemindLaterPress={(value) => onRemindLaterSystem(value)} />
                          </View>
                        ))
                        }

                      </React.Fragment>
                      :
                      null
                    }

                  </View>
                </ScrollView>
              </React.Fragment>
            }
            {/* Admin Challenges card */}
            {this.state.adminChallengeLoader ?
              <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
              </View>
              :
              <React.Fragment>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  <View style={{ flexDirection: "row" }}>
                    {this.state.challengesArray_admin.length > 0 ?
                      <React.Fragment>
                        {this.state.challengesArray_admin.map((item, key) => (
                          <View key={key} style={{ marginBottom: 10 }}>
                            <ChallengeCard data={item} onSelectBox={(value) => onSelectChallengeBox(value)} onRemindLaterPress={(value) => onRemindLaterAdmin(value)} />
                          </View>
                        ))
                        }
                      </React.Fragment>
                      :
                      null
                    }
                  </View>
                </ScrollView>
              </React.Fragment>
            }
          </>
        }


      </View>
    )
  }

  SurveySection = () => {
    const onChangeSurveyLoader = async (type) => {
      this.state.surveyLoader = type;
      this.setState(this.state);
    }

    const onRemindLater = async (val) => {
      await onChangeSurveyLoader(true);
      let arr = this.state.surveyArray,
        brr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {

        } else {
          brr.push(arr[i])
        }
      }
      this.state.surveyArray = brr;
      this.setState({ surveyArray: this.state.surveyArray })
      await onChangeSurveyLoader(false);
    }

    const onAccept = (val) => {
      this.props.navigation.navigate("GamificationSurveyPage", { data: val })
    }

    return (
      <View style={styles.challengesSec}>
        {this.state.surveyArray.length > 0 ?
          <>
            <View style={styles.topTeamLabel}>
              <Text style={styles.challengeLabelTxt}>Survey</Text>
            </View>
            {/* Survey card */}
            {this.state.surveyLoader ?
              <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
              </View>
              :
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  <View style={{ flexDirection: "row" }}>
                    {this.state.surveyArray.map((item, key) => (
                      <View key={key} style={{ marginBottom: 10 }}>
                        <SurveyCard data={item} onRemindLaterPress={(value) => onRemindLater(value)} onAcceptPress={(value) => onAccept(value)} />
                      </View>
                    ))
                    }
                  </View>
                </ScrollView>

              </View>
            }
          </>
          : null}

      </View>
    )

  }

  referLeadSection = () => {
    const onPressRefer = () => {
      this.props.navigation.navigate("GamificationReferLead", { type: "dashboardList" })
    }

    return (
      <View style={styles.challengesSec}>
        {this.state.referLeadArray.length > 0 ?
          <>
            <View style={styles.topTeamLabel}>
              <Text style={styles.challengeLabelTxt}>Refer a Lead</Text>
            </View>
            {/* refer lead card */}
            <View>
              {this.state.referLeadArray.map((item, key) => (
                <View key={key} style={{ marginBottom: 10 }}>
                  <ReferLeadCard data={item} onReferPress={() => onPressRefer()} />
                </View>
              ))
              }

            </View>
          </>
          : null}

      </View>
    )

  }

  //modalssssss......
  congratulationModalSection = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.congratulationModal}
          // padding={modalPadding}
          onRequestClose={() => this.onOpenCongratulationModal()}
          onBackdropPress={() => this.onOpenCongratulationModal()}
          onBackButtonPress={() => this.onOpenCongratulationModal()}
          children={
            <View style={styles.modalstatusview}>
              <ImageBackground source={ImageName.CELEBRATION_LOGO} style={{ resizeMode: "contain", marginTop: 10 }}>
                <View style={styles.marginView}>
                  <Text style={styles.profileNameText}></Text>
                  <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.9} onPress={() => this.onOpenCongratulationModal()}>
                    <Image source={ImageName.BLACK_CROSS_LOGO} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 30 }}>
                  <Image source={ImageName.YELLOW_STAR_ICON} style={{ height: 120, width: 120, resizeMode: "contain" }} />

                </View>
              </ImageBackground>
              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                <Text style={styles.congratulationTxt}>Congratulations</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                <Text style={styles.congratulationBottomTxt}>You have successfully add a new Dealer and win</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                <View>
                  <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 40, width: 40, resizeMode: "contain" }} />

                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.pointAmountTxt}>200</Text>
                  <Text style={styles.pointTxt}>points</Text>
                </View>
              </View>
              <View style={{ marginHorizontal: 70, marginTop: 10 }}>
                <BigTextButton
                  borderRadius={25}
                  backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                  text={"Collect the Points"}
                  fontFamily={FontFamily.FONTS.INTER.MEDIUM}
                />
              </View>
              <View style={{ marginBottom: 60 }} />
              <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              </View>

            </View>
          }
        />
      </View>
    )
  }

  promotionModalSection = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.promotionModal}
          // padding={modalPadding}
          onRequestClose={() => this.onOpenPromotionModal()}
          onBackdropPress={() => this.onOpenPromotionModal()}
          onBackButtonPress={() => this.onOpenPromotionModal()}
          children={
            <View style={styles.modalstatusview}>
              {/* <View style={styles.modalStatusHeaderSec}> */}

              {/* <ImageBackground source={ImageName.CELEBRATION_LOGO} style={{ resizeMode: "stretch",marginTop:10}}> */}
              <View style={styles.marginView}>
                <Text style={styles.profileNameText}></Text>
                <TouchableOpacity style={{ marginRight: 10, marginTop: 10 }} activeOpacity={0.9} onPress={() => this.onOpenPromotionModal()}>
                  <Image source={ImageName.BLACK_CROSS_LOGO} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                </TouchableOpacity>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                <View>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image source={ImageName.PROMOTION_ICON} style={{ height: 260, width: 320, resizeMode: "contain" }} />

                  </View>
                  {/* </ImageBackground> */}
                  <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 5, marginTop: 10 }}>
                    <Text style={styles.promotionTxt}>You are about to reach</Text>
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.promotionLevelTxt}>level 5</Text>
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                    <Text style={styles.promotionLevelBottomTxt}>Hurry! Sale <Text style={styles.promotionLevelValueTxt}>1258MT.</Text> by <Text style={styles.promotionLevelValueTxt}>23rd April</Text></Text>
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={styles.promotionLevelBottomTxt}>Do you think you could achieve the goal by the time ?</Text>
                  </View>

                  <View style={{ marginHorizontal: 60, marginTop: 10, flexDirection: "row" }}>
                    <BigTextButton
                      borderRadius={25}
                      backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                      fontColor={Color.COLOR.BLUE.EBONY_CLAY}
                      additionalStyles={{ borderWidth: 1, borderColor: Color.COLOR.BLUE.EBONY_CLAY }}

                      text={"No"}
                    />
                    <View style={{ width: 20 }} />
                    <BigTextButton
                      borderRadius={25}
                      backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                      text={"Yes"}
                    />
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, paddingHorizontal: 20 }}>
                    <Text style={styles.promotionLevelBottomTxt}>Ask Me how you could Achieve</Text>
                  </View>
                  <View style={{ marginHorizontal: 60, marginTop: 10, flexDirection: "row" }}>
                    <BigTextButton
                      borderRadius={25}
                      backgroundColor={Color.COLOR.RED.AMARANTH}


                      text={"How could Achieve?"}
                    />
                  </View>
                  <View style={{ marginBottom: 50 }} />

                </View>
              </ScrollView>

            </View>
          }
        />
      </View>
    )
  }

  modalSection = () => {
    return (
      <View>
        {this.congratulationModalSection()}
        {this.promotionModalSection()}
      </View>
    )
  }

  //refresh list
  onRefresh = async () => {
    await this._onStatusChange();
    await this._onLoad();
  }

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      challengesArray_admin: [],
      challengesArray_system: [],
      refreshing: true,
      topPerformerLoader: true,
      adminChallengeLoader: true,
      systemChallengeLoader: true,
      userDashboardLoader: true,
      userDashboardData: {
        totalAmount: "",
        userId: "",
        profileImgUrl: "",
        phone: "",
        email: "",
        userName: "",
        designationName: "",
        levelName: "",
        pointsEarned: "",
        levelId: "",
        targetQty: "",
        achievedPercentage: 0,
        achievementDifference: "",
        congratsCount: ""
      }
    })
  }

  _onSelectTab = (item, key) => {
    if (item.name == "Near to Achieve") {
      this.props.navigation.navigate("GamificationNearToAchieveList")
    } else if (item.name == "Top Gain") {
      this.props.navigation.navigate("GamificationTopGainList", { userData: this.state.userDashboardData })
    }
    else if (item.name == "My Team") {
      // this.props.navigation.navigate("GamificationTopGainList")
    }
    else if (item.name == "Congratulated By") {
      this.props.navigation.navigate("GamificationCongratulatedByScreen")
    }
    else {
      this.props.navigation.navigate("GamificationReferLead", { type: "dashboardTab" })
    }

  }

  render() {

    return (
      <SafeAreaView style={CustomStyle.container}>
        <Header {...this.props} />
        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
          <View style={{ paddingBottom: 30 }}>
            <DashboardTab data={tabData} {...this.props} onSelectTab={(item, index) => this._onSelectTab(item, index)} />
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <>
              {this.progressBarSection()}
              {this.earningSection()}
              {this.coneLevelSection()}
              {this.topTeamSection()}
              {this.topPerformerSection()}
              {this.challengesSection()}
              {this.SurveySection()}
              {this.referLeadSection()}
              <View style={{ height: 150 }} />
            </>
          </ScrollView>
        </View>
        {this.modalSection()}
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
    stateUserInformation,
    stateCheckForNetwork,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GamificationDashboard);
