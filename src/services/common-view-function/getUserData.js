// This is for modify user data

import { LocationData, StorageDataModification } from ".";
import { getData } from "../async-storage";
import { App_uri } from "../config";

export async function getUserData() {
    try {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        let userObjData = {
            "cmpId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "companyId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "createdBy": userInfo.userId == undefined || userInfo.userId == null ? "" : userInfo.userId.toString(),
            "clientId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "userId": userInfo.userId == undefined || userInfo.userId == null ? "" : userInfo.userId.toString(),
            "userType": userInfo.userType == undefined || userInfo.userType == null ? "" : userInfo.userType.toString(),
            "usertypeId": userInfo.userTypeId == undefined || userInfo.userTypeId == null ? "" : userInfo.userTypeId.toString(),
            "roleId": userInfo.roleId == undefined || userInfo.roleId == null ? "" : userInfo.roleId.toString(),
            "designationId": userInfo.designationId == undefined || userInfo.designationId == null ? "" : userInfo.designationId.toString(),

        };
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}

export async function getAllUserData() {
    try {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        let userObjData = {
            "cmpId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "companyId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "createdBy": userInfo.userId == undefined || userInfo.userId == null ? "" : userInfo.userId.toString(),
            "clientId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "userId": userInfo.userId == undefined || userInfo.userId == null ? "" : userInfo.userId.toString(),
            "userType": userInfo.userType == undefined || userInfo.userType == null ? "" : userInfo.userType.toString(),
            "usertypeId": userInfo.userTypeId == undefined || userInfo.userTypeId == null ? "" : userInfo.userTypeId.toString(),
            "roleId": userInfo.roleId == undefined || userInfo.roleId == null ? "" : userInfo.roleId.toString(),
            "countryId": userInfo.countryId == undefined || userInfo.countryId == null ? "" : userInfo.countryId.toString(),
            "stateId": userInfo.stateId == undefined || userInfo.stateId == null ? "" : userInfo.stateId.toString(),
            "districtId": userInfo.districtId == undefined || userInfo.districtId == null ? "" : userInfo.districtId.toString(),
            "zoneId": userInfo.zoneId == undefined || userInfo.zoneId == null ? "" : userInfo.zoneId.toString(),
            "moduleSettings": userInfo.moduleDetails == undefined || userInfo.moduleDetails == null ? [] : userInfo.moduleDetails,
            "designationId": userInfo.designationId == undefined || userInfo.designationId == null ? "" : userInfo.designationId.toString(),
        };
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}


export async function getUserAllLoginInfo() {
    try {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        let userObjData = {
            "firstName": userInfo.firstName == undefined || userInfo.firstName == null ? "" : userInfo.firstName.toString(),
            "lastName": userInfo.lastName == undefined || userInfo.lastName == null ? "" : userInfo.lastName.toString(),
            "email": userInfo.email == undefined || userInfo.email == null ? "" : userInfo.email.toString(),
            "username": userInfo.username == undefined || userInfo.username == null ? "" : userInfo.username.toString(),
            "userType": userInfo.userType == undefined || userInfo.userType == null ? "" : userInfo.userType,
            "profileImgUrl": userInfo.profileImgUrl == undefined || userInfo.profileImgUrl == null ? "" : (App_uri.SFA_IMAGE_URI + userInfo.profileImgUrl),
        };
        userObjData["fullName"] = userObjData.firstName + " " + userObjData.lastName;
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}

export async function getUserLocation() {
    try {
        let userLocation = await StorageDataModification.userCredential({}, "get");
        let currentLoc = await LocationData.fetchCurrentLocation();
        let userLocationData = {
            // "lattitude": "20.98",
            // "longitude": "89.71"
            "lattitude": currentLoc.latitude,
            "longitude": currentLoc.longitude
        };

        return userLocationData;
    } catch (err) {
        console.log(err)
    }
}

export async function getUserSettingsData(data) {
    try {
        // let userInfo = await getData("userCredential");
        let userInfo = data;

        let userObjData = {
            "hasCRM": "1",
            "hasOTS": "1",
            "hasSFA": "1",
            "hasLMS": "1",
            "hasMMS": "1",
            "companyLogo": "/images/rnimagepickerlibtempebdbbaaeddf1671431625279.png",
            "approvalRequiredForCustomer": "1",
            "approvalRequiredForInfluencer": "1",
            "systemApprovalRequired": "1"
        };
        if (userInfo.clientSettings && userInfo.clientSettings.length > 0) {
            for (let i = 0; i < userInfo.clientSettings.length; i++) {
                if (userInfo.clientSettings[i].settingsType == "hasCRM") {
                    userObjData["hasCRM"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "hasOTS") {
                    userObjData["hasOTS"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "hasSFA") {
                    userObjData["hasSFA"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "hasLMS") {
                    userObjData["hasLMS"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "hasMMS") {
                    userObjData["hasMMS"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "companyLogo") {
                    userObjData["companyLogo"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "approvalRequiredForCustomer") {
                    userObjData["approvalRequiredForCustomer"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "approvalRequiredForInfluencer") {
                    userObjData["approvalRequiredForInfluencer"] = userInfo.clientSettings[i].settingsValue
                }
                if (userInfo.clientSettings[i].settingsType == "systemApprovalRequired") {
                    userObjData["systemApprovalRequired"] = userInfo.clientSettings[i].settingsValue
                }
            }
        }

        return userObjData;
    } catch (err) {
        console.log(err)
    }
}


export async function getUserModuleSettingsData(data) {
    try {
        let userInfo = data;
        let moduleSettings = userInfo.moduleDetails;

        let userObjData = {
            "crm_ContactAddPem": 1,
            "crm_ContactApprovePem": 1,
            "crm_ContactDeletePem": 1,
            "crm_ContactEditPem": 1,
            "crm_ContactIsView": 1,
            "crm_EnquiryAddPem": 1,
            "crm_EnquiryApprovePem": 1,
            "crm_EnquiryDeletePem": 1,
            "crm_EnquiryEditPem": 1,
            "crm_EnquiryIsView": 1,
            "crm_leadAddPem": 1,
            "crm_leadApprovePem": 1,
            "crm_leadDeletePem": 1,
            "crm_leadEditPem": 1,
            "crm_leadIsView": 1,
            "crm_opportunityAddPem": 1,
            "crm_opportunityApprovePem": 1,
            "crm_opportunityDeletePem": 1,
            "crm_opportunityEditPem": 1,
            "crm_opportunityIsView": 1,
            "crm_organizationAddPem": 1,
            "crm_organizationApprovePem": 1,
            "crm_organizationDeletePem": 1,
            "crm_organizationEditPem": 1,
            "crm_organizationIsView": 1,
            "crm_taskAddPem": 1,
            "crm_taskApprovePem": 1,
            "crm_taskDeletePem": 1,
            "crm_taskEditPem": 1,
            "crm_taskIsView": 1,

            "sfa_ApprovalAddPem": 1,
            "sfa_ApprovalApprovePem": 1,
            "sfa_ApprovalConversionAddPem": 1,
            "sfa_ApprovalConversionApprovePem": 1,
            "sfa_ApprovalConversionDeletePem": 1,
            "sfa_ApprovalConversionEditPem": 1,
            "sfa_ApprovalConversionIsView": 1,
            "sfa_ApprovalCustomerAddPem": 1,
            "sfa_ApprovalCustomerApprovePem": 1,
            "sfa_ApprovalCustomerDeletePem": 1,
            "sfa_ApprovalCustomerEditPem": 1,
            "sfa_ApprovalCustomerIsView": 1,
            "sfa_ApprovalDeletePem": 1,
            "sfa_ApprovalEditPem": 1,
            "sfa_ApprovalIsView": 1,
            "sfa_activityAddPem": 1,
            "sfa_activityApprovePem": 1,
            "sfa_activityDeletePem": 1,
            "sfa_activityEditPem": 1,
            "sfa_activityIsView": 1,
            "sfa_analyticsAddPem": 1,
            "sfa_analyticsApprovePem": 1,
            "sfa_analyticsDeletePem": 1,
            "sfa_analyticsEditPem": 1,
            "sfa_analyticsIsView": 1,
            "sfa_attendanceAddPem": 1,
            "sfa_attendanceApprovePem": 1,
            "sfa_attendanceDeletePem": 1,
            "sfa_attendanceEditPem": 1,
            "sfa_attendanceIsView": 1,
            "sfa_brandingAddPem": 1,
            "sfa_brandingApprovePem": 1,
            "sfa_brandingDeletePem": 1,
            "sfa_brandingEditPem": 1,
            "sfa_brandingIsView": 1,
            "sfa_calenderAddPem": 1,
            "sfa_calenderApprovePem": 1,
            "sfa_calenderDeletePem": 1,
            "sfa_calenderEditPem": 1,
            "sfa_calenderIsView": 1,
            "sfa_conversionAddPem": 1,
            "sfa_conversionApprovePem": 1,
            "sfa_conversionDeletePem": 1,
            "sfa_conversionEditPem": 1,
            "sfa_conversionIsView": 1,
            "sfa_csrAddPem": 1,
            "sfa_csrApprovePem": 1,
            "sfa_csrDeletePem": 1,
            "sfa_csrEditPem": 1,
            "sfa_csrIsView": 1,
            "mms_eventAddPem": 1,
            "mms_eventApprovePem": 1,
            "mms_eventDeletePem": 1,
            "mms_eventEditPem": 1,
            "mms_eventIsView": 1,
            "sfa_feedbackAddPem": 1,
            "sfa_feedbackApprovePem": 1,
            "sfa_feedbackDeletePem": 1,
            "sfa_feedbackEditPem": 1,
            "sfa_feedbackIsView": 1,
            "sfa_leaveAddPem": 1,
            "sfa_leaveApprovePem": 1,
            "sfa_leaveDeletePem": 1,
            "sfa_leaveEditPem": 1,
            "sfa_leaveIsView": 1,
            "sfa_meetingAddPem": 1,
            "sfa_meetingApprovePem": 1,
            "sfa_meetingDeletePem": 1,
            "sfa_meetingEditPem": 1,
            "sfa_meetingIsView": 1,
            "sfa_otometerAddPem": 1,
            "sfa_otometerApprovePem": 1,
            "sfa_otometerDeletePem": 1,
            "sfa_otometerEditPem": 1,
            "sfa_otometerIsView": 1,
            "sfa_partnersAddPem": 1,
            "sfa_partnersApprovePem": 1,
            "sfa_partnersDeletePem": 1,
            "sfa_partnersEditPem": 1,
            "sfa_partnersIsView": 1,
            "sfa_projectVisitAddPem": 1,
            "sfa_projectVisitApprovePem": 1,
            "sfa_projectVisitDeletePem": 1,
            "sfa_projectVisitEditPem": 1,
            "sfa_projectVisitIsView": 1,
            "sfa_retailVisitAddPem": 1,
            "sfa_retailVisitApprovePem": 1,
            "sfa_retailVisitDeletePem": 1,
            "sfa_retailVisitEditPem": 1,
            "sfa_retailVisitIsView": 1,
            "sfa_surveyAddPem": 1,
            "sfa_surveyApprovePem": 1,
            "sfa_surveyDeletePem": 1,
            "sfa_surveyEditPem": 1,
            "sfa_surveyIsView": 1,
            "sfa_visitReportAddPem": 1,
            "sfa_visitReportApprovePem": 1,
            "sfa_visitReportDeletePem": 1,
            "sfa_visitReportEditPem": 1,
            "sfa_visitReportIsView": 1,

            "sfa_plannedVisitAddPem": 1,
            "sfa_plannedVisitApprovePem": 1,
            "sfa_plannedVisitDeletePem": 1,
            "sfa_plannedVisitEditPem": 1,
            "sfa_plannedVisitIsView": 1,

            "sfa_unplannedVisitAddPem": 1,
            "sfa_unplannedVisitApprovePem": 1,
            "sfa_unplannedVisitDeletePem": 1,
            "sfa_unplannedVisitEditPem": 1,
            "sfa_unplannedVisitIsView": 1,

            "sfa_EnquiryIsView": 1,
            "sfa_EnquiryAddPem": 1,
            "sfa_EnquiryEditPem": 1,
            "sfa_EnquiryApprovePem": 1,
            "sfa_EnquiryDeletePem": 1,

            "sfa_CustomerRegistrationIsView": 1,
            "sfa_CustomerRegistrationAddPem": 1,
            "sfa_CustomerRegistrationEditPem": 1,
            "sfa_CustomerRegistrationApprovePem": 1,
            "sfa_CustomerRegistrationDeletePem": 1,

            "sfa_ExpensesIsView": 1,
            "sfa_ExpensesAddPem": 1,
            "sfa_ExpensesEditPem": 1,
            "sfa_ExpensesApprovePem": 1,
            "sfa_ExpensesDeletePem": 1,

            "sfa_GamificationIsView": 1,
            "sfa_GamificationAddPem": 1,
            "sfa_GamificationEditPem": 1,
            "sfa_GamificationApprovePem": 1,
            "sfa_GamificationDeletePem": 1

        };
        if (moduleSettings && moduleSettings.length > 0) {
            for (let i = 0; i < moduleSettings.length; i++) {
                if (moduleSettings[i].name == "contact") {
                    userObjData["crm_ContactIsView"] = moduleSettings[i].isView;
                    userObjData["crm_ContactAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_ContactEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_ContactApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_ContactDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "enquiry") {
                    userObjData["crm_EnquiryIsView"] = moduleSettings[i].isView;
                    userObjData["crm_EnquiryAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_EnquiryEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_EnquiryApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_EnquiryDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "lead") {
                    userObjData["crm_leadIsView"] = moduleSettings[i].isView;
                    userObjData["crm_leadAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_leadEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_leadApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_leadDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "opportunity") {
                    userObjData["crm_opportunityIsView"] = moduleSettings[i].isView;
                    userObjData["crm_opportunityAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_opportunityEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_opportunityApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_opportunityDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "organization") {
                    userObjData["crm_organizationIsView"] = moduleSettings[i].isView;
                    userObjData["crm_organizationAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_organizationEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_organizationApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_organizationDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "task") {
                    userObjData["crm_taskIsView"] = moduleSettings[i].isView;
                    userObjData["crm_taskAddPem"] = moduleSettings[i].addPem;
                    userObjData["crm_taskEditPem"] = moduleSettings[i].editPem;
                    userObjData["crm_taskApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["crm_taskDeletePem"] = moduleSettings[i].deletePem;
                }
                //sfa 
                if (moduleSettings[i].name == "Enquiry") {
                    userObjData["sfa_EnquiryIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_EnquiryAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_EnquiryEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_EnquiryApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_EnquiryDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "activity") {
                    userObjData["sfa_activityIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_activityAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_activityEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_activityApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_activityDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "analytics") {
                    userObjData["sfa_analyticsIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_analyticsAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_analyticsEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_analyticsApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_analyticsDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "attendance") {
                    userObjData["sfa_attendanceIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_attendanceAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_attendanceEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_attendanceApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_attendanceDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "branding") {
                    userObjData["sfa_brandingIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_brandingAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_brandingEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_brandingApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_brandingDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "calender") {
                    userObjData["sfa_calenderIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_calenderAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_calenderEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_calenderApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_calenderDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "conversion") {
                    userObjData["sfa_conversionIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_conversionAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_conversionEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_conversionApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_conversionDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "csr") {
                    userObjData["sfa_csrIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_csrAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_csrEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_csrApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_csrDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "approvalSection") {
                    userObjData["sfa_ApprovalIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_ApprovalAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_ApprovalEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_ApprovalApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_ApprovalDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "feedback") {
                    userObjData["sfa_feedbackIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_feedbackAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_feedbackEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_feedbackApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_feedbackDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "leave") {
                    userObjData["sfa_leaveIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_leaveAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_leaveEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_leaveApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_leaveDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "meeting") {
                    userObjData["sfa_meetingIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_meetingAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_meetingEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_meetingApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_meetingDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "otometer") {
                    userObjData["sfa_otometerIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_otometerAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_otometerEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_otometerApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_otometerDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "partners") {
                    userObjData["sfa_partnersIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_partnersAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_partnersEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_partnersApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_partnersDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "projectVisit") {
                    userObjData["sfa_projectVisitIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_projectVisitAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_projectVisitEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_projectVisitApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_projectVisitDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "retailVisit") {
                    userObjData["sfa_retailVisitIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_retailVisitAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_retailVisitEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_retailVisitApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_retailVisitDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "survey") {
                    userObjData["sfa_surveyIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_surveyAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_surveyEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_surveyApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_surveyDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "visitReport") {
                    userObjData["sfa_visitReportIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_visitReportAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_visitReportEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_visitReportApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_visitReportDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "planned visit") {
                    userObjData["sfa_plannedVisitIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_plannedVisitAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_plannedVisitEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_plannedVisitApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_plannedVisitDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "unplanned visit") {
                    userObjData["sfa_unplannedVisitIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_unplannedVisitAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_unplannedVisitEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_unplannedVisitApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_unplannedVisitDeletePem"] = moduleSettings[i].deletePem;
                }
                if (moduleSettings[i].name == "customer registration") {
                    userObjData["sfa_CustomerRegistrationIsView"] = moduleSettings[i].isView;
                    userObjData["sfa_CustomerRegistrationAddPem"] = moduleSettings[i].addPem;
                    userObjData["sfa_CustomerRegistrationEditPem"] = moduleSettings[i].editPem;
                    userObjData["sfa_CustomerRegistrationApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["sfa_CustomerRegistrationDeletePem"] = moduleSettings[i].deletePem;
                }
                // mms
                if (moduleSettings[i].name == "event") {
                    userObjData["mms_eventIsView"] = moduleSettings[i].isView;
                    userObjData["mms_eventAddPem"] = moduleSettings[i].addPem;
                    userObjData["mms_eventEditPem"] = moduleSettings[i].editPem;
                    userObjData["mms_eventApprovePem"] = moduleSettings[i].approvePem;
                    userObjData["mms_eventDeletePem"] = moduleSettings[i].deletePem;
                }

                for (j = 0; j < moduleSettings[i].child.length; j++) {
                    if (moduleSettings[i].name == "approvalSection") {
                        if (moduleSettings[i].child[j].name == "approveConversion") {
                            userObjData["sfa_ApprovalConversionIsView"] = moduleSettings[i].child[j].isView;
                            userObjData["sfa_ApprovalConversionAddPem"] = moduleSettings[i].child[j].addPem;
                            userObjData["sfa_ApprovalConversionEditPem"] = moduleSettings[i].child[j].editPem;
                            userObjData["sfa_ApprovalConversionApprovePem"] = moduleSettings[i].child[j].approvePem;
                            userObjData["sfa_ApprovalConversionDeletePem"] = moduleSettings[i].child[j].deletePem;
                        }
                        if (moduleSettings[i].child[j].name == "approveCustomer") {
                            userObjData["sfa_ApprovalCustomerIsView"] = moduleSettings[i].child[j].isView;
                            userObjData["sfa_ApprovalCustomerAddPem"] = moduleSettings[i].child[j].addPem;
                            userObjData["sfa_ApprovalCustomerEditPem"] = moduleSettings[i].child[j].editPem;
                            userObjData["sfa_ApprovalCustomerApprovePem"] = moduleSettings[i].child[j].approvePem;
                            userObjData["sfa_ApprovalCustomerDeletePem"] = moduleSettings[i].child[j].deletePem;
                        }
                    }
                }
            }
        }
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}