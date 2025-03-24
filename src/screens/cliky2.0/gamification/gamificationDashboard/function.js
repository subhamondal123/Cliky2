import { DateConvert } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";

export function modifyTopPerformerArr(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};


                if (pjpData[i].userConfigId == undefined || pjpData[i].userConfigId == null) {
                    modObj["userConfigId"] = "";
                } else {
                    modObj["userConfigId"] = pjpData[i].userConfigId;
                }
                if (pjpData[i].userName == undefined || pjpData[i].userName == null) {
                    modObj["name"] = "";
                } else {
                    let nameArr = pjpData[i].userName.split(" ").join("\n");
                    // modObj["name"] = pjpData[i].userName;
                    modObj["name"] = nameArr;
                }
                if (pjpData[i].topUserId == undefined || pjpData[i].topUserId == null) {
                    modObj["topUserId"] = "";
                } else {
                    modObj["topUserId"] = pjpData[i].topUserId;
                }
                if (pjpData[i].designationName == undefined || pjpData[i].designationName == null) {
                    modObj["designationName"] = "";
                } else {
                    modObj["designationName"] = pjpData[i].designationName;
                }
                if (pjpData[i].levelName == undefined || pjpData[i].levelName == null) {
                    modObj["levelName"] = "";
                } else {
                    modObj["levelName"] = pjpData[i].levelName;
                }
                if (pjpData[i].achievePercentage == undefined || pjpData[i].achievePercentage == null) {
                    modObj["achievementPercentage"] = "";
                } else {
                    modObj["achievementPercentage"] = pjpData[i].achievePercentage;
                }
                if (pjpData[i].pointsEarned == undefined || pjpData[i].pointsEarned == null) {
                    modObj["pointsEarned"] = "";
                } else {
                    modObj["pointsEarned"] = pjpData[i].pointsEarned;
                }
                if (pjpData[i].progressPercentage == undefined || pjpData[i].progressPercentage == null) {
                    modObj["progressPercentage"] = "";
                } else {
                    modObj["progressPercentage"] = pjpData[i].progressPercentage;
                }
                if (pjpData[i].processStatus == undefined || pjpData[i].processStatus == null) {
                    modObj["processStatus"] = "";
                } else {
                    modObj["processStatus"] = pjpData[i].processStatus;
                }
                if (pjpData[i].financialYear == undefined || pjpData[i].financialYear == null) {
                    modObj["timeRange"] = "";
                } else {
                    modObj["timeRange"] = pjpData[i].financialYear;
                }

                if (pjpData[i].profileImgUrl == undefined || pjpData[i].profileImgUrl == null || pjpData[i].profileImgUrl.length == 0) {
                    modObj["profilePic"] = App_uri.SFA_IMAGE_URI + "/images/business.jpg";
                } else {
                    modObj["profilePic"] = App_uri.SFA_IMAGE_URI + pjpData[i].profileImgUrl;
                }
                if (pjpData[i].thanksChecking == undefined || pjpData[i].thanksChecking == null) {
                    modObj["thanksChecking"] = "";
                } else {
                    modObj["thanksChecking"] = pjpData[i].thanksChecking;
                }

                modObj["check"] = false;
                modObj["status"] = pjpData[i].thanksChecking == 1 ? "liked" : "pending";
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyAdminChallengeArr(data, userData) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].participationConfigId == undefined || pjpData[i].participationConfigId == null) {
                    modObj["participationConfigId"] = "";
                } else {
                    modObj["participationConfigId"] = pjpData[i].participationConfigId;
                }
                if (pjpData[i].challengeId == undefined || pjpData[i].challengeId == null) {
                    modObj["challengeId"] = "";
                } else {
                    modObj["challengeId"] = pjpData[i].challengeId;
                }
                if (pjpData[i].challengeName == undefined || pjpData[i].challengeName == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = pjpData[i].challengeName;
                }
                if (pjpData[i].challengeType == undefined || pjpData[i].challengeType == null) {
                    modObj["challengeType"] = "";
                } else {
                    modObj["challengeType"] = pjpData[i].challengeType;
                }
                if (pjpData[i].challengeTargetQty == undefined || pjpData[i].challengeTargetQty == null) {
                    modObj["challengeTargetQty"] = "";
                } else {
                    modObj["challengeTargetQty"] = pjpData[i].challengeTargetQty;
                }
                if (pjpData[i].unit == undefined || pjpData[i].unit == null) {
                    modObj["unit"] = "";
                } else {
                    modObj["unit"] = pjpData[i].unit;
                }
                if (pjpData[i].challengePoints == undefined || pjpData[i].challengePoints == null) {
                    modObj["winningPoints"] = "";
                } else {
                    modObj["winningPoints"] = pjpData[i].challengePoints;
                }
                if (pjpData[i].challengeStartDate == undefined || pjpData[i].challengeStartDate == null) {
                    modObj["challengeStartDate"] = "";
                } else {
                    modObj["challengeStartDate"] = pjpData[i].challengeStartDate;
                }
                if (pjpData[i].challengeEndDate == undefined || pjpData[i].challengeEndDate == null) {
                    modObj["challengeEndDate"] = "";
                } else {
                    modObj["challengeEndDate"] = DateConvert.formatDDMMYYYY(pjpData[i].challengeEndDate);
                }
                if (pjpData[i].challengeGrpId == undefined || pjpData[i].challengeGrpId == null) {
                    modObj["challengeGrpId"] = "";
                } else {
                    modObj["challengeGrpId"] = pjpData[i].challengeGrpId;
                }
                if (pjpData[i].isAccepted == undefined || pjpData[i].isAccepted == null) {
                    modObj["isAccepted_admin"] = "";
                } else {
                    modObj["isAccepted_admin"] = pjpData[i].isAccepted;
                }

                modObj["userTotalAmount"] = userData.totalAmount;

                modObj["targetPercentage"] = isNaN(100 - ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty)) ? 0 : (100 - ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty)).toFixed(2);

                modObj["achievedPercentage"] = isNaN((100 * userData.totalAmount) / pjpData[i].challengeTargetQty) ? 0 : ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty).toFixed(2);

                modObj["check"] = false;
                modObj["challengeType"] = "admin";
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}


export function modifySystemChallengeArr(data, userData) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].participationConfigId == undefined || pjpData[i].participationConfigId == null) {
                    modObj["participationConfigId"] = "";
                } else {
                    modObj["participationConfigId"] = pjpData[i].participationConfigId;
                }
                if (pjpData[i].challengeId == undefined || pjpData[i].challengeId == null) {
                    modObj["challengeId"] = "";
                } else {
                    modObj["challengeId"] = pjpData[i].challengeId;
                }
                if (pjpData[i].challengeName == undefined || pjpData[i].challengeName == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = pjpData[i].challengeName;
                }
                if (pjpData[i].challengeType == undefined || pjpData[i].challengeType == null) {
                    modObj["challengeType"] = "";
                } else {
                    modObj["challengeType"] = pjpData[i].challengeType;
                }
                if (pjpData[i].challengeTargetQty == undefined || pjpData[i].challengeTargetQty == null) {
                    modObj["challengeTargetQty"] = "";
                } else {
                    modObj["challengeTargetQty"] = pjpData[i].challengeTargetQty;
                }
                if (pjpData[i].unit == undefined || pjpData[i].unit == null) {
                    modObj["unit"] = "";
                } else {
                    modObj["unit"] = pjpData[i].unit;
                }
                if (pjpData[i].challengePoints == undefined || pjpData[i].challengePoints == null) {
                    modObj["winningPoints"] = "";
                } else {
                    modObj["winningPoints"] = pjpData[i].challengePoints;
                }
                if (pjpData[i].challengeStartDate == undefined || pjpData[i].challengeStartDate == null) {
                    modObj["challengeStartDate"] = "";
                } else {
                    modObj["challengeStartDate"] = pjpData[i].challengeStartDate;
                }
                if (pjpData[i].challengeEndDate == undefined || pjpData[i].challengeEndDate == null) {
                    modObj["challengeEndDate"] = "";
                } else {
                    modObj["challengeEndDate"] = DateConvert.formatDDMMYYYY(pjpData[i].challengeEndDate);
                }
                if (pjpData[i].challengeGrpId == undefined || pjpData[i].challengeGrpId == null) {
                    modObj["challengeGrpId"] = "";
                } else {
                    modObj["challengeGrpId"] = pjpData[i].challengeGrpId;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = App_uri.SFA_IMAGE_URI + pjpData[i].profilePic;
                }
                if (pjpData[i].userLevel == undefined || pjpData[i].userLevel == null) {
                    modObj["userLevel"] = "";
                } else {
                    modObj["userLevel"] = pjpData[i].userLevel;
                }

                if (pjpData[i].isAccepted == undefined || pjpData[i].isAccepted == null) {
                    modObj["isAccepted_user"] = "";
                } else {
                    modObj["isAccepted_user"] = pjpData[i].isAccepted;
                }
                if (pjpData[i].opponentDetails.isAccepted == undefined || pjpData[i].opponentDetails.isAccepted == null) {
                    modObj["isAccepted_opponent"] = "";
                } else {
                    modObj["isAccepted_opponent"] = pjpData[i].opponentDetails.isAccepted;
                }
                if (pjpData[i].opponentDetails.opponentName == undefined || pjpData[i].opponentDetails.opponentName == null) {
                    modObj["opponentName"] = "";
                } else {
                    modObj["opponentName"] = pjpData[i].opponentDetails.opponentName;
                }

                if (pjpData[i].opponentDetails.profileImgUrl == undefined || pjpData[i].opponentDetails.profileImgUrl == null) {
                    modObj["opponentProfilePic"] = "";
                } else {
                    modObj["opponentProfilePic"] = App_uri.SFA_IMAGE_URI + pjpData[i].opponentDetails.profileImgUrl;
                }

                if (pjpData[i].opponentDetails.userId == undefined || pjpData[i].opponentDetails.userId == null) {
                    modObj["opponentUserId"] = "";
                } else {
                    modObj["opponentUserId"] = pjpData[i].opponentDetails.userId;
                }
                if (pjpData[i].opponentDetails.isAccepted == undefined || pjpData[i].opponentDetails.isAccepted == null) {
                    modObj["opponentIsAccepted"] = "";
                } else {
                    modObj["opponentIsAccepted"] = pjpData[i].opponentDetails.isAccepted;
                }
                if (pjpData[i].opponentDetails.pointsEarned == undefined || pjpData[i].opponentDetails.pointsEarned == null) {
                    modObj["opponentPointsEarned"] = "";
                } else {
                    modObj["opponentPointsEarned"] = pjpData[i].opponentDetails.pointsEarned;
                }
                if (pjpData[i].opponentDetails.phone == undefined || pjpData[i].opponentDetails.phone == null) {
                    modObj["opponentPhone"] = "";
                } else {
                    modObj["opponentPhone"] = pjpData[i].opponentDetails.phone;
                }
                if (pjpData[i].opponentDetails.email == undefined || pjpData[i].opponentDetails.email == null) {
                    modObj["opponentEmail"] = "";
                } else {
                    modObj["opponentEmail"] = pjpData[i].opponentDetails.email;
                }
                if (pjpData[i].opponentDetails.financialYear == undefined || pjpData[i].opponentDetails.financialYear == null) {
                    modObj["opponentFinancialYear"] = "";
                } else {
                    modObj["opponentFinancialYear"] = pjpData[i].opponentDetails.financialYear;
                }
                if (pjpData[i].opponentDetails.totalAmount == undefined || pjpData[i].opponentDetails.totalAmount == null) {
                    modObj["opponentTotalAmount"] = "";
                } else {
                    modObj["opponentTotalAmount"] = pjpData[i].opponentDetails.totalAmount;
                }
                if (pjpData[i].opponentDetails.designationName == undefined || pjpData[i].opponentDetails.designationName == null) {
                    modObj["opponentDesignationName"] = "";
                } else {
                    modObj["opponentDesignationName"] = pjpData[i].opponentDetails.designationName;
                }
                if (pjpData[i].opponentDetails.levelShort == undefined || pjpData[i].opponentDetails.levelShort == null) {
                    modObj["opponentLevelShort"] = "";
                } else {
                    modObj["opponentLevelShort"] = pjpData[i].opponentDetails.levelShort;
                }


                if (pjpData[i].challengeEndDate == undefined || pjpData[i].challengeEndDate == null) {
                    modObj["lastDate"] = "";
                } else {
                    modObj["lastDate"] = DateConvert.formatDDfullMonthYYYY(pjpData[i].challengeEndDate);
                }

                modObj["userTotalAmount"] = userData.totalAmount;

                modObj["userProfilePic"] = App_uri.CRM_BASE_URI + userData.profileImgUrl;
                modObj["userTargetPercentage"] = isNaN(100 - ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty)) ? 0 : (100 - ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty)).toFixed(2);
                modObj["opponentTargetPercentage"] = isNaN(100 - ((100 * pjpData[i].opponentDetails.totalAmount) / pjpData[i].challengeTargetQty)) ? 0 : (100 - ((100 * pjpData[i].opponentDetails.totalAmount) / pjpData[i].challengeTargetQty)).toFixed(2);

                modObj["userAchievedPercentage"] = isNaN((100 * userData.totalAmount) / pjpData[i].challengeTargetQty) ? 0 : ((100 * userData.totalAmount) / pjpData[i].challengeTargetQty).toFixed(2)
                modObj["opponentAchievedPercentage"] = isNaN((100 * pjpData[i].opponentDetails.totalAmount) / pjpData[i].challengeTargetQty) ? 0 : ((100 * pjpData[i].opponentDetails.totalAmount) / pjpData[i].challengeTargetQty).toFixed(2)

                modObj["check"] = false;
                modObj["challengeType"] = "user";
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}




export function modifySurveyArr(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].surveyId == undefined || pjpData[i].surveyId == null) {
                    modObj["surveyId"] = "";
                } else {
                    modObj["surveyId"] = pjpData[i].surveyId;
                }
                if (pjpData[i].surveyName == undefined || pjpData[i].surveyName == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = pjpData[i].surveyName;
                }
                if (pjpData[i].surveyStatus == undefined || pjpData[i].surveyStatus == null) {
                    modObj["surveyStatus"] = "";
                } else {
                    modObj["surveyStatus"] = pjpData[i].surveyStatus;
                }
                if (pjpData[i].publishDate == undefined || pjpData[i].publishDate == null) {
                    modObj["publishDate"] = "";
                } else {
                    modObj["publishDate"] = pjpData[i].publishDate;
                }
                if (pjpData[i].startDate == undefined || pjpData[i].startDate == null) {
                    modObj["startDate"] = "";
                } else {
                    modObj["startDate"] = pjpData[i].startDate;
                }
                if (pjpData[i].endDate == undefined || pjpData[i].endDate == null) {
                    modObj["endDate"] = "";
                } else {
                    modObj["endDate"] = DateConvert.formatDDMMYYYY(pjpData[i].endDate);
                }
                if (pjpData[i].surveyPoints == undefined || pjpData[i].surveyPoints == null) {
                    modObj["surveyPoints"] = "";
                } else {
                    modObj["surveyPoints"] = pjpData[i].surveyPoints;
                }
                if (pjpData[i].description == undefined || pjpData[i].description == null) {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = pjpData[i].description;
                }
                if (pjpData[i].assignTo == undefined || pjpData[i].assignTo == null) {
                    modObj["assignTo"] = "";
                } else {
                    modObj["assignTo"] = pjpData[i].assignTo;
                }
                if (pjpData[i].countryName == undefined || pjpData[i].countryName == null) {
                    modObj["countryName"] = "";
                } else {
                    modObj["countryName"] = pjpData[i].countryName;
                }
                if (pjpData[i].stateName == undefined || pjpData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = pjpData[i].stateName;
                }
                if (pjpData[i].districtName == undefined || pjpData[i].districtName == null) {
                    modObj["districtName"] = "";
                } else {
                    modObj["districtName"] = pjpData[i].districtName;
                }
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }

                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}




export function modifyDashboardData(data) {
    let modData = {};
    if (data) {
        if (data.totalAmount == undefined || data.totalAmount == null) {
            modData['totalAmount'] = "0"
        } else {
            modData['totalAmount'] = data.totalAmount
        }
        if (data.congratsCount == undefined || data.congratsCount == null) {
            modData['congratsCount'] = "0"
        } else {
            modData['congratsCount'] = data.congratsCount
        }
        if (data.userId == undefined || data.userId == null) {
            modData['userId'] = ""
        } else {
            modData['userId'] = data.userId
        }
        if (data.profileImgUrl == undefined || data.profileImgUrl == null) {
            modData['profileImgUrl'] = ""
        } else {
            modData['profileImgUrl'] = data.profileImgUrl
        }
        if (data.phone == undefined || data.phone == null) {
            modData['phone'] = ""
        } else {
            modData['phone'] = data.phone
        }
        if (data.email == undefined || data.email == null) {
            modData['email'] = ""
        } else {
            modData['email'] = data.email
        }
        if (data.userName == undefined || data.userName == null) {
            modData['userName'] = ""
        } else {
            modData['userName'] = data.userName
        }
        if (data.designationName == undefined || data.designationName == null) {
            modData['designationName'] = ""
        } else {
            modData['designationName'] = data.designationName
        }
        if (data.levelName == undefined || data.levelName == null) {
            modData['levelName'] = ""
        } else {
            modData['levelName'] = data.levelName
        }
        if (data.pointsEarned == undefined || data.pointsEarned == null) {
            modData['pointsEarned'] = "0"
        } else {
            modData['pointsEarned'] = data.pointsEarned
        }
        if (data.levelId == undefined || data.levelId == null) {
            modData['levelId'] = ""
        } else {
            modData['levelId'] = data.levelId
        }
        if (data.targetQty == undefined || data.targetQty == null) {
            modData['targetQty'] = "0"
        } else {
            modData['targetQty'] = data.targetQty
        }
        if (data.nextLevelTargetAmount == undefined || data.nextLevelTargetAmount == null) {
            modData['nextLevelTargetAmount'] = ""
        } else {
            modData['nextLevelTargetAmount'] = data.nextLevelTargetAmount
        }


        modData["achievementDifference"] = isNaN(data.nextLevelTargetAmount - data.totalAmount) ? 0 : (data.nextLevelTargetAmount - data.totalAmount)

        modData["achievedPercentage"] = isNaN(((100 * data.totalAmount) / data.targetQty).toFixed(2)) ? 0 : ((100 * data.totalAmount) / data.targetQty).toFixed(2)
    }
    return modData
}