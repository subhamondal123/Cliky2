import { DateConvert } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";

// for modify the api data
export function modifyApiData(data, stateData, props) {
    let resData = [];
    for (let i = 0; i < data.length; i++) {
        resData.push({ id: i, check: false, isGiveAnswer: (modifyQuestionData([data[i]])).isGiveAnswer, questionData: (modifyQuestionData([data[i]])).qsData });
        if (i == stateData.selectIndex) {
            resData[i].check = true;
            stateData.selectedQuestionData = resData[i].questionData;
        }
    }
    stateData.surveyData = resData;
    return stateData;
}


export function modifyQuestionData(qsData) {
    let isGiveAnswer = false;
    for (let i = 0; i < qsData.length; i++) {
        qsData[i]["id"] = qsData[i].questionId;
        qsData[i]["question"] = qsData[i].questionBody;
        qsData[i]["type"] = CommonData.DYNAMIC_QS_TYPE[qsData[i].questionType];
        qsData[i]["selectedValue"] = "";
        qsData[i]["isPreviousGiven"] = false;
        qsData[i]["createdAt"] = "";
        qsData[i]["isEditable"] = true;
        if (qsData[i].ansOfTheQs && qsData[i].ansOfTheQs.length > 0) {
            qsData[i].selectedValue = qsData[i].ansOfTheQs;
            qsData[i].isEditable = false;
            qsData[i].isPreviousGiven = true;
            isGiveAnswer = true;
        }
        if (qsData[i].optionText && qsData[i].optionText.length > 0) {
            let optionData = qsData[i].optionText.split("|");
            let tempOptions = [];
            for (let j = 0; j < optionData.length; j++) {
                tempOptions.push({ id: j, name: optionData[j] });
            }
            qsData[i]["options"] = tempOptions;
        }
    }
    return { qsData: qsData, isGiveAnswer: isGiveAnswer };
}


// for modify the api request data
export function modifyApiRequestData(stateData, props,surveyId) {
    let isCompleteCheck = 1;
    let countCheck = 0;
    let resData = { "surveyId": surveyId, "isComplete": isCompleteCheck, "completionTime": DateConvert.fullDateFormat(new Date()), "answerArr": [] };
    for (let i = 0; i < stateData.surveyData.length; i++) {
        for (let j = 0; j < stateData.surveyData[i].questionData.length; j++) {
            if (stateData.surveyData[i].questionData[j].selectedValue && stateData.surveyData[i].questionData[j].selectedValue.length > 0 && stateData.surveyData[i].questionData[j].isPreviousGiven === false) {
                resData.answerArr.push({
                    "questionType": stateData.surveyData[i].questionData[j].questionType,
                    "questionId": stateData.surveyData[i].questionData[j].questionId,
                    "answerText": stateData.surveyData[i].questionData[j].selectedValue,
                    "createdAt": stateData.surveyData[i].questionData[j].createdAt
                });
                countCheck++;
            }
        }
    }
    if (countCheck === stateData.surveyData.length) {
        resData.isComplete = 2;
    }
    return resData;
}


// for answer given check
export function forCheckAnswerGiven(data) {
    let isGivenAnswerCheck = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].selectedValue && data[i].selectedValue.length > 0) {
            isGivenAnswerCheck = true;
        }
    }
    return isGivenAnswerCheck;
}