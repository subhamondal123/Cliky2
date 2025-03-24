export function modifyDashData(objData) {
    let modObj = {};
    if (objData.upcomingMeetingCount == null || objData.upcomingMeetingCount == undefined || objData.upcomingMeetingCount == 0) {
        modObj["upcomingMeetingCount"] = "00";
    }

    else if (objData.upcomingMeetingCount.toString().length < 2) {
        modObj["upcomingMeetingCount"] = "0" + objData.upcomingMeetingCount;
    }
    else {
        modObj["upcomingMeetingCount"] = objData.upcomingMeetingCount;
    }
    if (objData.rejectedMeetingCount == null || objData.rejectedMeetingCount == undefined || objData.rejectedMeetingCount == 0) {
        modObj["rejectedMeetingCount"] = "00";
    } else {
        modObj["rejectedMeetingCount"] = objData.rejectedMeetingCount;
    }
    if (objData.approvedMeetingCount == null || objData.approvedMeetingCount == undefined || objData.approvedMeetingCount == 0) {
        modObj["approvedMeetingCount"] = "00";
    } else {
        modObj["approvedMeetingCount"] = objData.approvedMeetingCount;
    }
    if (objData.pendingMeetingCount == null || objData.pendingMeetingCount == undefined || objData.pendingMeetingCount == 0) {
        modObj["pendingMeetingCount"] = "00";
    }
    else if (objData.pendingMeetingCount.toString().length < 2) {
        modObj["pendingMeetingCount"] = "0" + objData.pendingMeetingCount;
    }
    else {
        modObj["pendingMeetingCount"] = objData.pendingMeetingCount;
    }
    if (objData.estimatedBudgetAmount == null || objData.estimatedBudgetAmount == undefined || objData.estimatedBudgetAmount == 0) {
        modObj["estimatedBudgetAmount"] = "00";
    } else {
        modObj["estimatedBudgetAmount"] = objData.estimatedBudgetAmount;
    }
    if (objData.companyBudget == null || objData.companyBudget == undefined || objData.companyBudget == 0) {
        modObj["companyBudget"] = "00.00";
    } else {
        modObj["companyBudget"] = objData.companyBudget;
    }
    if (objData.totalExpenses == null || objData.totalExpenses == undefined || objData.totalExpenses == 0) {
        modObj["totalExpenses"] = 0;
    } else {
        modObj["totalExpenses"] = objData.totalExpenses;
    }

    let totalPendingCanceledUpcomingCount = parseInt(objData.pendingMeetingCount) + parseInt(objData.rejectedMeetingCount) + parseInt(objData.approvedMeetingCount);
    let totalCanceledPending = parseInt(objData.pendingMeetingCount) + parseInt(objData.rejectedMeetingCount);

    modObj["totalPendingCanceledUpcomingCount"] = totalPendingCanceledUpcomingCount;

    modObj["meetingApprovedPercentage"] = calculatePercentage(totalPendingCanceledUpcomingCount, objData.approvedMeetingCount, totalCanceledPending);
    modObj["expensePercentage"] = (parseInt(objData.companyBudget) / parseInt(objData.totalExpenses)) * 100;
    modObj["totalCanceledPending"] = totalCanceledPending;
    modObj["partnerExpenses"] = objData.totalExpenses - objData.companyBudget;



    return modObj;
}


export function calculatePercentage(totalCount, activeValue, inactiveValue) {
    let activePercentage = (activeValue / totalCount) * 100;
    return activePercentage;
}