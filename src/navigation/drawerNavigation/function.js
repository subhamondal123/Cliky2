

//  drawer function is appear here

import { ImageName } from "../../enums";
import { StorageDataModification } from "../../services/common-view-function";

export function getCheckData(data) {
    let resData = { "check": true, "id": 0, "name": "crmSales" };
    for (let i = 0; i < data.length; i++) {
        if (data[i].check) {
            resData = data[i];
            break;
        }
    }
    return resData;
}


async function modifyArrByLength(arr) {
    let tempArr = [];
    let mainArr = [];

    let rem = (arr.length % 8);
    for (let i = 0; i < arr.length; i++) {
        tempArr.push(arr[i]);
        if (tempArr.length == 8) {
            mainArr.push(tempArr);
            tempArr = [];
        }

        if (((rem == 1) || (rem == 2) || (rem == 3) || (rem == 4) || (rem == 5) || (rem == 6) || (rem == 7)) && (i == arr.length - 1)) {
            mainArr.push(tempArr);
            tempArr = [];
        }
    }

    return mainArr;

}

// async function modifySfaDrawerItems(initialDrawerItemsValue, moduleSettings) {
//     for (let i = 0; i < initialDrawerItemsValue.length; i++) {
//         // for (let j = 0; j < initialDrawerItemsValue[i].length; j++) {

//         if (initialDrawerItemsValue[i].name == "Analytics") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_analyticsIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Activity") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_activityIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Retail Visits") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_retailVisitIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Project Visits") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_projectVisitIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Enquiries") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_EnquiryIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Calendar") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_calenderIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Partners") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_partnersIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Attendance") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_attendanceIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Apply Leave") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_leaveIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Meeting") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_meetingIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Odometer Reading") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_otometerIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Survey") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_surveyIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Conversion History") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_conversionIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Feedback") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_feedbackIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Visit Reports") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_visitReportIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Approval Section") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_ApprovalIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Branding") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_brandingIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "CSR") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.sfa_csrIsView == "0" ? true : false;
//         }

//         // }
//     }
//     let modArr = [];
//     for (let k = 0; k < initialDrawerItemsValue.length; k++) {
//         if (initialDrawerItemsValue[k].isHidden == false) {
//             modArr.push(initialDrawerItemsValue[k]);
//         }
//     }

//     let finalArr = await modifyArrByLength(modArr);
//     return finalArr;
//     // return initialDrawerItemsValue;
// }


// async function modifyCrmDrawerItems(initialDrawerItemsValue, moduleSettings) {
//     for (let i = 0; i < initialDrawerItemsValue.length; i++) {
//         // for (let j = 0; j < initialDrawerItemsValue[i].length; j++) {
//         if (initialDrawerItemsValue[i].name == "Task") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_taskIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Enquiry") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_EnquiryIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Contact") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_ContactIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Lead") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_leadIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Opportunity") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_opportunityIsView == "0" ? true : false;
//         }
//         if (initialDrawerItemsValue[i].name == "Organizations") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.crm_organizationIsView == "0" ? true : false;
//         }

//     }
//     // }
//     let modArr = [];
//     for (let k = 0; k < initialDrawerItemsValue.length; k++) {
//         if (initialDrawerItemsValue[k].isHidden == false) {
//             modArr.push(initialDrawerItemsValue[k]);
//         }
//     }

//     let finalArr = await modifyArrByLength(modArr);
//     return finalArr;
//     // return initialDrawerItemsValue;
// }

// async function modifyMmsDrawerItems(initialDrawerItemsValue, moduleSettings) {
//     for (let i = 0; i < initialDrawerItemsValue.length; i++) {
//         // for (let j = 0; j < initialDrawerItemsValue[i].length; j++) {
//         if (initialDrawerItemsValue[i].name == "Event") {
//             initialDrawerItemsValue[i]["isHidden"] = moduleSettings.mms_eventIsView == "0" ? true : false;
//         }
//     }
//     // }
//     let modArr = [];
//     for (let k = 0; k < initialDrawerItemsValue.length; k++) {
//         if (initialDrawerItemsValue[k].isHidden == false) {
//             modArr.push(initialDrawerItemsValue[k]);
//         }
//     }

//     let finalArr = await modifyArrByLength(modArr);
//     return finalArr;
// }

// for modify the drawer data
export function modifyDrawerData(data, selectValue) {
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (selectValue) {
            if (data[i].name == selectValue.drawerName) {
                data[i].check = true;
                index = i;
            } else {
                data[i].check = false;
            }
        }
    }
    return { data: data, index: index };
}

// for modify the redux data
export function modifyReduxDrawerData(data, selectValue) {
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (selectValue) {
            if (selectValue.name == "CRM" || selectValue.name == "SFA") {
                if (data[i].drawerName == selectValue.name) {
                    data[i].check = true;
                    index = i;
                } else {
                    data[i].check = false;
                }
            }
        }
    }
    return { data: data, index: index };
}




// for modify the data for view in the drawer
export function modifyMenuArrData(data, permisionData, dividesBy) {
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
        finalData.push({ name: data[i].name, check: data[i].check, isHidden: data[i].isHidden, drawerItemValue: [] });
        let modArrData = [];
        for (let j = 0; j < data[i].drawerItemValue.length; j++) {
            let insertCheck = defaltInsertCheck(data[i].drawerItemValue[j].menuName);
            data[i].drawerItemValue[j]["isView"] = true;
            data[i].drawerItemValue[j]["addPem"] = false;
            data[i].drawerItemValue[j]["editPem"] = false;
            data[i].drawerItemValue[j]["deletePem"] = false;
            data[i].drawerItemValue[j]["approvePem"] = false;
            data[i].drawerItemValue[j]["commercialPem"] = false;
            data[i].drawerItemValue[j]["child"] = [];
            if (data[i].name == "SFA") {
                for (let k = 0; k < permisionData.sfa.length; k++) {
                    if ((data[i].drawerItemValue[j].menuName == permisionData.sfa[k].name)) {
                        insertCheck = false;
                        if (permisionData.sfa[k].isView == 1) {
                            insertCheck = true;
                        }
                        data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.sfa[k]) };
                        if (permisionData.sfa[k].child && permisionData.sfa[k].child.length > 0) {
                            data[i].drawerItemValue[j].child = permisionData.sfa[k].child;
                        }
                    }
                }
            } else if (data[i].name == "CRM") {
                for (let k = 0; k < permisionData.crm.length; k++) {
                    if (data[i].drawerItemValue[j].menuName == permisionData.crm[k].name) {
                        insertCheck = false;
                        if (permisionData.crm[k].isView == 1) {
                            insertCheck = true;
                        }
                        data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.crm[k]) };
                        if (permisionData.crm[k].child && permisionData.crm[k].child.length > 0) {
                            data[i].drawerItemValue[j].child = permisionData.crm[k].child;
                        }
                    }
                }
            } else if (data[i].name == "MMS") {
                for (let k = 0; k < permisionData.mms.length; k++) {
                    if (data[i].drawerItemValue[j].menuName == permisionData.mms[k].name) {
                        insertCheck = false;
                    }
                    if (permisionData.mms[k].isView == 1) {
                        insertCheck = true;
                    }
                    data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.mms[k]) };
                    if (permisionData.mms[k].child && permisionData.mms[k].child.length > 0) {
                        data[i].drawerItemValue[j].child = permisionData.mms[k].child;
                    }
                }
            } else if (data[i].name == "LMS") {
                for (let k = 0; k < permisionData.lms.length; k++) {
                    if (data[i].drawerItemValue[j].menuName == permisionData.lms[k].name) {
                        insertCheck = false;
                    }
                    if (permisionData.lms[k].isView == 1) {
                        insertCheck = true;
                    }
                    data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.lms[k]) };
                    if (permisionData.lms[k].child && permisionData.lms[k].child.length > 0) {
                        data[i].drawerItemValue[j].child = permisionData.lms[k].child;
                    }
                }
            } else if (data[i].name == "OTS") {
                for (let k = 0; k < permisionData.ots.length; k++) {
                    if (data[i].drawerItemValue[j].menuName == permisionData.ots[k].name) {
                        insertCheck = false;
                    }
                    data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.ots[k]) };
                    if (permisionData.ots[k].child && permisionData.ots[k].child.length > 0) {
                        data[i].drawerItemValue[j].child = permisionData.ots[k].child;
                    }
                }
            }
            if (insertCheck) {
                modArrData.push(data[i].drawerItemValue[j]);
            }
        }
        let modData = [];
        if (modArrData !== undefined && modArrData.length > 0) {
            let divission = parseInt(modArrData.length / dividesBy);
            let reminder = parseInt(modArrData.length % dividesBy);
            for (let j = 0; j < divission; j++) {
                let subDivArr = [];
                for (let k = 0; k < dividesBy; k++) {
                    subDivArr.push(modArrData[j * dividesBy + k]);
                }
                modData.push(subDivArr);
            }
            if (reminder > 0) {
                let reminderArr = [];
                for (let j = 0; j < reminder; j++) {
                    reminderArr.push(modArrData[(divission * dividesBy) + j]);
                }
                modData.push(reminderArr);
            }
        }

        finalData[i]["isHidden"] = false;
        if (data[i].name == "SFA" && modData.length == 0) {
            finalData[i].isHidden = true;
        } else if (data[i].name == "CRM" && modData.length == 0) {
            finalData[i].isHidden = true;
        } else if (data[i].name == "MMS" && modData.length == 0) {
            finalData[i].isHidden = true;
        } else if (data[i].name == "LMS" && modData.length == 0) {
            finalData[i].isHidden = true;
        } else if (data[i].name == "OTS" && modData.length == 0) {
            finalData[i].isHidden = true;
        }

        finalData[i].drawerItemValue = modData;
    }
    return finalData;
}


// for insert check 
export function defaltInsertCheck(menuName) {

    switch (menuName) {
        case "home":
            return true;

        case "shareApp":
            return true;

        case "changePassword":
            return true;

        case "crmHome":
            return true;

        case "mmsHome":
            return true;

        case "order":
            return true;

        case "myPocketMis":
            return true;

        default:
            return false;
    }
}

// for operartion check
export function operationCheck(data) {
    let resCheck = { isView: true, addPem: false, editPem: false, deletePem: false, approvePem: false, commercialPem: false };
    if (data.addPem == 1) {
        resCheck.addPem = true;
    }
    if (data.editPem == 1) {
        resCheck.editPem = true;
    }
    if (data.deletePem == 1) {
        resCheck.deletePem = true;
    }
    if (data.approvePem == 1) {
        resCheck.approvePem = true;
    }
    if (data.commercialPem == 1) {
        resCheck.commercialPem = true;
    }
    return resCheck;
}

// get the value
