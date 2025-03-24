import { Toaster } from "../../../services/common-view-function";

export function modifyOptions(optionsStr) {
    let optionARR = optionsStr.split("||");
    let returnArr = [];
    for (let i = 0; i < optionARR.length; i++) {
        returnArr.push({ "id": i, "check": false, "value": optionARR[i] })
    }
    return returnArr;
}

export function modifyQuestionList(data, offset) {
    let questionIndex = offset;
    for (let i = 0; i < data.length; i++) {
        questionIndex++;
        data[i]["questionIndex"] = questionIndex;
        if (data[i].questionType == 1 || data[i].questionType == 3) {
            data[i]["optionArr"] = modifyOptions(data[i].questionValue);
            data[i]["answerStr"] = "";
        } else {
            data[i]["answerStr"] = "";
            data[i]["answerStrActive"] = false;
        }
    }
    return data;
}

export function validateAnswer(data) {
    let modifiedDataArr = modifyAnswer(data);

    let modObj = {
        status: false,
        modifiedAnsArr: modifiedDataArr
    }
    let errCounter = 0;
    for (let i = 0; i < modifiedDataArr.length; i++) {
        if (modifiedDataArr[i].questionType && (modifiedDataArr[i].questionType == 1 || modifiedDataArr[i].questionType == 2 || modifiedDataArr[i].questionType == 3)) {
            if (modifiedDataArr[i].value.length == 0) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        modObj.status = true
    } else {
        Toaster.ShortCenterToaster("Please answer all the questions !")
    }

    return modObj;
}

export function modifyAnswer(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        if (data[i].questionType == 1) {
            obj["questionType"] = data[i].questionType;
            obj["surveyQuestionId"] = data[i].surveyQuestionId;
            obj["value"] = modifyAnswerToStr(data[i].optionArr);
        } else if (data[i].questionType == 2) {
            obj["questionType"] = data[i].questionType;
            obj["surveyQuestionId"] = data[i].surveyQuestionId;
            obj["value"] = data[i].answerStr;
        } else if (data[i].questionType == 3) {
            obj["questionType"] = data[i].questionType;
            obj["surveyQuestionId"] = data[i].surveyQuestionId;
            obj["value"] = modifyAnswerToStr(data[i].optionArr);
        }
        arr.push(obj);
    }

    return arr;
}

export function modifyAnswerToStr(data) {
    let value = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].check) {
            if (value.length == 0) {
                value = value + data[i].value;
            } else {
                value = value + "||" + data[i].value;
            }
        }
    }
    return value;
}
