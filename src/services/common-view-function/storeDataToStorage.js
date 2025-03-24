import { getData, singleRemove, storeData } from "../async-storage";


export const allStorageVariable = [

    "userSettingsData",
    "userModuleSettingsData",

    "odometerData",
    "odometer",
    
    "pjpListData",
    "pjpProjectListData",
    "sfaEnquiryListData",
    "visitedCustomerListData",
    "visitedInfluencerListData",
    "visitedTargetListData",
    "crmEnquiryListData",
    "taskListData",
    "attendanceListData",
    "leadListData",
    "opportunityListData",
    "contactListData",
    "odometerListData",
    "LeaveHistoryListData",
    "organizationListData",
    "orderListData",
    "ConversionListData",

    "SFADashBoardData",
    "CRMDashBoardData",
    "MMSDashBoardData",

    "CustomerListData",
    "TargetListData",
    "visitedCustomerListData_project",
    "visitedTargetListData_project",
    "CustomerApprovalListData",
    "ConversionApprovalListData"
]

export async function storePjpListData(data) {
    if (data) {
        await storeData("pjpListData", data);
    }
}

export async function getPjpListData() {
    let data = await getData("pjpListData");
    return data;
}

export async function removePjpListData() {
    await singleRemove("pjpListData");
}

export async function storePjpProjectListData(data) {
    if (data) {
        await storeData("pjpProjectListData", data);
    }
}

export async function getPjpProjectListData() {
    let data = await getData("pjpProjectListData");
    return data;
}

export async function removePjpProjectListData() {
    await singleRemove("pjpProjectListData");
}

export async function storeSfaEnquiryListData(data) {
    if (data) {
        await storeData("sfaEnquiryListData", data);
    }
}

export async function getSfaEnquiryListData() {
    let data = await getData("sfaEnquiryListData");
    return data;
}

export async function removeSfaEnquiryListData() {
    await singleRemove("sfaEnquiryListData");
}

export async function storeCrmEnquiryListData(data) {
    if (data) {
        await storeData("crmEnquiryListData", data);
    }
}

export async function getCrmEnquiryListData() {
    let data = await getData("crmEnquiryListData");
    return data;
}

export async function removeCrmEnquiryListData() {
    await singleRemove("crmEnquiryListData");
}


export async function storeTaskListData(data) {
    if (data) {
        await storeData("taskListData", data);
    }
}

export async function getTaskListData() {
    let data = await getData("taskListData");
    return data;
}

export async function removeTaskListData() {
    await singleRemove("taskListData");
}

export async function storeVisitedCustomerList(data) {
    if (data) {
        await storeData("visitedCustomerListData", data);
    }
}

export async function getVisitedCustomerList() {
    let data = await getData("visitedCustomerListData");
    return data;
}

export async function removeVisitedCustomerList() {
    await singleRemove("visitedCustomerListData");
}

export async function storeVisitedCustomerList_Project(data) {
    if (data) {
        await storeData("visitedCustomerListData_project", data);
    }
}

export async function getVisitedCustomerList_Project() {
    let data = await getData("visitedCustomerListData_project");
    return data;
}

export async function removeVisitedCustomerList_Project(data) {
    await singleRemove("visitedCustomerListData_project");
}

export async function storeVisitedInfluencerList(data) {
    if (data) {
        await storeData("visitedInfluencerListData", data);
    }
}

export async function getVisitedInfluencerList() {
    let data = await getData("visitedInfluencerListData");
    return data;
}

export async function removeVisitedInfluencerList(data) {
    await singleRemove("visitedInfluencerListData");
}

export async function storeVisitedTargetList(data) {
    if (data) {
        await storeData("visitedTargetListData", data);
    }
}

export async function getVisitedTargetList() {
    let data = await getData("visitedTargetListData");
    return data;
}

export async function removeVisitedTargetList() {
    await singleRemove("visitedTargetListData");
}

export async function storeVisitedTargetList_Project(data) {
    if (data) {
        await storeData("visitedTargetListData_project", data);
    }
}

export async function getVisitedTargetList_Project() {
    let data = await getData("visitedTargetListData_project");
    return data;
}

export async function removeVisitedTargetList_Project() {
    await singleRemove("visitedTargetListData_project");
}

export async function storeAttendanceList(data) {
    if (data) {
        await storeData("attendanceListData", data);
    }
}

export async function getAttendanceList() {
    let data = await getData("attendanceListData");
    return data;
}

export async function removeAttendanceList(data) {
    await singleRemove("attendanceListData");
}

export async function storeLeadListData(data) {
    if (data) {
        await storeData("leadListData", data);
    }
}

export async function getLeadListData() {
    let data = await getData("leadListData");
    return data;
}

export async function removeLeadListData() {
    await singleRemove("leadListData");
}

export async function storeOpportunityListData(data) {
    if (data) {
        await storeData("opportunityListData", data);
    }
}

export async function getOpportunityListData() {
    let data = await getData("opportunityListData");
    return data;
}

export async function removeOpportunityListData() {
    await singleRemove("opportunityListData");
}
export async function storeContactListData(data) {
    if (data) {
        await storeData("contactListData", data);
    }
}

export async function getContactListData() {
    let data = await getData("contactListData");
    return data;
}

export async function removeContactListData() {
    await singleRemove("contactListData");
}

export async function storeOdometerList(data) {
    if (data) {
        await storeData("odometerListData", data);
    }
}

export async function getOdometerList() {
    let data = await getData("odometerListData");
    return data;
}

export async function removeOdometerList(data) {
    await singleRemove("odometerListData");
}

export async function storeLeaveHistoryList(data) {
    if (data) {
        await storeData("LeaveHistoryListData", data);
    }
}

export async function getLeaveHistoryList() {
    let data = await getData("LeaveHistoryListData");
    return data;
}

export async function removeLeaveHistoryList(data) {
    await singleRemove("LeaveHistoryListData");
}

export async function storeOrganizationList(data) {
    if (data) {
        await storeData("organizationListData", data);
    }
}

export async function getOrganizationList() {
    let data = await getData("organizationListData");
    return data;
}

export async function removeOrganizationList(data) {
    await singleRemove("organizationListData");
}

export async function storeOrderList(data) {
    if (data) {
        await storeData("orderListData", data);
    }
}

export async function getOrderList() {
    let data = await getData("orderListData");
    return data;
}

export async function removeOrderList(data) {
    await singleRemove("orderListData");
}


export async function storeConversionList(data) {
    if (data) {
        await storeData("ConversionListData", data);
    }
}

export async function getConversionList() {
    let data = await getData("ConversionListData");
    return data;
}

export async function removeConversionList(data) {
    await singleRemove("ConversionListData");
}


export async function storeCustomerList(data) {
    if (data) {
        await storeData("CustomerListData", data);
    }
}

export async function getCustomerList() {
    let data = await getData("CustomerListData");
    return data;
}

export async function removeCustomerList(data) {
    await singleRemove("CustomerListData");
}

export async function storeTargetList(data) {
    if (data) {
        await storeData("TargetListData", data);
    }
}

export async function getTargetList() {
    let data = await getData("TargetListData");
    return data;
}

export async function removeTargetList(data) {
    await singleRemove("TargetListData");
}

export async function storeVisitReportList(data) {
    if (data) {
        await storeData("VisitReportListData", data);
    }
}

export async function getVisitReportList() {
    let data = await getData("VisitReportListData");
    return data;
}

export async function removeVisitReportList(data) {
    await singleRemove("VisitReportListData");
}


export async function storeCustomerApprovalListData(data) {
    if (data) {
        await storeData("CustomerApprovalListData", data);
    }
}

export async function getCustomerApprovalListData() {
    let data = await getData("CustomerApprovalListData");
    return data;
}

export async function removeCustomerApprovalListData(data) {
    await singleRemove("CustomerApprovalListData");
}

export async function storeConversionApprovalListData(data) {
    if (data) {
        await storeData("ConversionApprovalListData", data);
    }
}

export async function getConversionApprovalListData() {
    let data = await getData("ConversionApprovalListData");
    return data;
}

export async function removeConversionApprovalListData(data) {
    await singleRemove("ConversionApprovalListData");
}

// ..................for drawer

export async function getUserSettingsData() {
    let data = await getData("userSettingsData");
    return data;
}

export async function getUserModuleSettingsData() {
    let data = await getData("userModuleSettingsData");
    return data;
}

// ...............DASHBOARD,,,,,,,,,,,,,,,,,,,,,,,,,


export async function storeSFADashBoardData(data) {
    if (data) {
        await storeData("SFADashBoardData", data);
    }
}

export async function storeCRMDashBoardData(data) {
    if (data) {
        await storeData("CRMDashBoardData", data);
    }
}

export async function storeMMSDashBoardData(data) {
    if (data) {
        await storeData("MMSDashBoardData", data);
    }
}

