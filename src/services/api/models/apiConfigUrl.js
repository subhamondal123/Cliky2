import { App_uri } from '../../config';

export const APP_LAST_URI = Object.freeze({
    signin: {
        path: App_uri.BASE_URI + "api/v1/signin",
        isAuth: false,
        isPicLocation: false,
        method: "POST"
    },

    //without roles permission
    // login: {
    //     path: App_uri.CRM_BASE_URI + "api/v3/user/login",
    //     isAuth: false,
    //     isPicLocation: false,
    //     isEncrypt:true,
    //     method: "POST"
    // },

    //for roles permission 
    login: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/mobileLogin",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //for version info
    // for staging
    // getCurrentAppVersionInfo: {
    //     path: App_uri.BASE_URI + "api/v1/common/getCurrentAppVersionInfo",
    //     isAuth: false,
    //     isPicLocation: false,
    //     isEncrypt: false,
    //     method: "POST"
    // },
    // for production
    getCurrentAppVersionInfo: {
        path: App_uri.BASE_URI + "api/v2/common/getCurrentAppVersionInfo",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },
    logout: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/logout",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    forgetpassword: {
        path: App_uri.BASE_URI + "api/v1/forgetpassword",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    otpverification: {
        path: App_uri.BASE_URI + "api/v1/otpverification",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    resetpassword: {
        path: App_uri.BASE_URI + "api/v1/resetpassword",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    changepassword: {
        path: App_uri.BASE_URI + "api/v1/changepassword",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get all country daat
    getAllCountryList: {
        path: App_uri.BASE_URI + "api/v1/getAllCountryList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getAllDesignation: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstDesignation/getAllDesignations",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    phoneNumberExist: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/ifTargetPhoneNumberExsist",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    phoneNumberExist_customer: {
        path: App_uri.CRM_BASE_URI + "api/v1/userRolePermission/ifPhoneExistCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },



    customerApprovalList: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getlistOfNotApprvdCustomers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    approveCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/doApprveCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getPartnerCustomerList: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getlistOfNotApprvdCustomers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    approveConversion: {
        path: App_uri.BASE_URI + "api/v1/convertion/approvedVisitConvertion",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAssignedEmployeeByDesignation: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstDesignation/getAllUsrByZoneDesignation",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    updateAssigneeForSfaEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/updateEnquiryAssignee",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getAssignedEmployeeByDesignationCrm: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstDesignation/getAllUsrByZoneDesignationCRM",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getVisitStatusList: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/getVisitStatusList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get general data
    getGeneralData: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/getGeneralData",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getHistoryLogOfLead: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/getHistoryLogOfLead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    sfaEnquiryList: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/gn_getEnqueryListForSFA",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addEnquiryFeedback: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/addLeadFeedback",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    targetListData: {
        path: App_uri.BASE_URI + "api/v1/customer/getTargetMapList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addProductSIzeSpec: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/addProductSIzeSpec",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },


    getAllCompetitors: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getAllCompetitors",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },


    fieldVisitCompetitorData: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/fieldVisitCompetitorData",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    //new unplanned visit form
    newUnplannedVisitCreate: {
        path: App_uri.BASE_URI + "api/v3/pjpmanagement/gn_newUnplannedVisitCreate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    //new unplanned visit form for project
    newUnplannedVisitCreate_project: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/gn_newUnplannedVisitCreateForProject",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // update task
    getMappedUserByCustomer: {
        path: App_uri.BASE_URI + "api/v1/common/getMappedUserByCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // all CRM BASE URI API
    // ......for task list,,,,,,,

    tasklist: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskManagement/gn_listData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllTaskCatagory: {
        path: App_uri.BASE_URI + "api/v1/getAllTaskCatagory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllTaskStageData: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskStage/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateTaskStatusPriority: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/updateStatusPriority",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // / TASK LANDING DATA  
    taskLandingData: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/taskLandingData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //Task add  
    taskAdd: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskManagement/gn_addTask",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    changeMarkFavouriteStatusForTask: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/changeImportant",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    downloadForTask: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    downloadForVisitReport: {
        path: App_uri.BASE_URI + "api/v3/consolidateVisitReport_mob_download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    downloadForOdometer: {
        path: App_uri.BASE_URI + "api/v2/odometerManagement/exportAPI_mob",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    downloadForAttendance: {
        path: App_uri.BASE_URI + "api/v2/leaveAttendence/attendenceExport",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // .........for contact List,,,,,,,,,
    contactList: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/gn_getAllContacts",
        // path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getAllContacts",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // update contact
    updateContactDetails: {
        path: App_uri.CRM_BASE_URI + "api/v2/contactManage/gn_update_ContactDetails",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    changeContactStatus: {
        path: App_uri.CRM_BASE_URI + "api/v2/contactManage/changeContactStatus",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    changeMarkFavouriteStatusForContact: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/changeFavorite",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    downloadForContact: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // organizationLandingData

    orgnizationLandingData: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/landingData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // change org status

    updateOrganizationStatus: {
        path: App_uri.CRM_BASE_URI + "api/v2/org/updateOrganizationStatus",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for organization List,,,,,,,,,
    organizationList: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/gn_getOrganizationList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for fetch organization ,,,,,,,,,
    getOrganizationDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/getOrganizationDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v3/org/gn_add_OrganizationDetails",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // update organization
    updateOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/updateOrganizationDetails",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    changeMarkFavouriteStatusForOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/changeFavorite",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    downloadForOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //.....contact type dropdown    ....
    getContactMasterData: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getLandingData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for leads List,,,,,,,
    leadList: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/gn_getallLeads",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for add lead
    addLead: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/gn_addLeads",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // download list data for lead

    downloadForLead: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get platform 
    getPlatform: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstPlatform/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "GET"
    },
    // for lead status
    getLeadStatus: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstNature/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeadStatusV2: {
        path: App_uri.CRM_BASE_URI + "api/v2/mstNature/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateLeadAssignV2: {
        path: App_uri.CRM_BASE_URI + "api/v2/leadsManagement/updateLeadAssign",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    getLeadOpportunityStages: {
        path: App_uri.BASE_URI + "api/v1/convertion/getLeadOpportunityStages",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    updateLeadAssign: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/updateLeadAssign",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    updateLead: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/UpdateLeadDetails",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // lead status update
    updateLeadTypeStatus: {
        path: App_uri.CRM_BASE_URI + "api/v2/leadsManagement/updateLeadTypeStatus",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // lead all status list
    mstNatureList: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstNature/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // lead stage change
    addleadStageChange: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/addleadStageChange",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    addStockUpdate: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/gn_addStockUpdate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    recordListForBrands: {
        path: App_uri.BASE_URI + "api/v3/stockManagement/recordListForBrands",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // contact landing data
    contactLandingData: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getLandingData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //contact add  
    addContactDetails: {
        path: App_uri.CRM_BASE_URI + "api/v3/contactManage/gn_addContact_Details",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    //==============================CRM NEW================================
    generalApprove: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/generalApprove",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    deleteMasterData: {
        path: App_uri.CRM_BASE_URI + "api/v4/common/deleteMasterData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchNewContactList: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/fetch-new-contact-list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchNewContactDetails: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/fetch-new-contact-details",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateNewContact: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/update-new-contact",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    createNewContactByPhone: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/create-new-contact-by-phone",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    createNewOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/create-new-organization",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    createNewOrganization_fromContact: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/create-new-organization",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchOrganizationList: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/fetch-organizations-list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchLeadList: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/fetch-lead-list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    createNewLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/create-new-lead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchLeadDetails: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/fetch-lead-details",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateNewLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/update-new-lead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchOrganizationDetails: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/fetch-organizations-details",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateNewOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/update-new-organization",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    createNewContact: {
        path: App_uri.CRM_BASE_URI + "api/v4/contactManage/create-new-contact",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    addNewEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/add-new-enquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchEnquiryDetails: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/fetch-enquiry-details",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    fetchEnquiryList: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/fetch-enquiry-list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateEnquiryNewDetails: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/update-enquiry-details",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    enquiryToLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/enquiry-to-lead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    approveEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/approveEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllActivitiesTypeWise: {
        path: App_uri.CRM_BASE_URI + "api/v4/mstActivity/getAllActivitiesTypeWise",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    activityTypeDropdown: {
        path: App_uri.CRM_BASE_URI + "api/v2/mstActivity/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    addGeneralActivity: {
        path: App_uri.CRM_BASE_URI + "api/v4/mstActivity/addGeneralActivity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchContactByEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/fetch-contact-by-enquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    fetchProductByEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/fetch-product-list-by-enquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    deleteProductWithEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/delete-product-with-enquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    addProductWithEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v4/enqueryManagement/add-product-with-enquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addProductWithOrg: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/add-product-with-org",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchProductListByOrg: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/fetch-product-list-by-org",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    deleteProductByOrg: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/delete-product-with-org",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchContactByOrg: {
        path: App_uri.CRM_BASE_URI + "api/v4/org/fetch-contact-by-org",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for add product for lead api
    addProductForLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/addProductForLead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for delete product for lead api
    removeProductForLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/removeProductForLead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for add quote for lead api
    addGeneralQuote: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/addGeneralQuote",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for fetch general quote for lead api
    fetchGeneralQuoteList: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/fetchGeneralQuoteList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for delete general quote for lead api
    deleteGeneralQuote: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/deleteGeneralQuote",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for general quote type for lead api
    fetchGeneralQuoteTypes: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/fetchGeneralQuoteTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllDomain: {
        path: App_uri.CRM_BASE_URI + "api/v4/mstPlatform/getAllDomain",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllSubDomain: {
        path: App_uri.CRM_BASE_URI + "api/v4/mstPlatform/getAllSubDomain",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    revertLead: {
        path: App_uri.CRM_BASE_URI + "api/v4/leadsManagement/revertLead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },




    //=======================================================================

    //landing data of conversion modal
    conversionAllLanding: {
        path: App_uri.BASE_URI + "api/v1/convertion/getAllDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // conversion api
    addConvertion: {
        path: App_uri.BASE_URI + "api/v2/convertion/gn_addConvertion",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    addProjectConvertion: {
        path: App_uri.BASE_URI + "api/v1/convertion/gn_addProjectConvertion",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    conversionHistoryList: {
        path: App_uri.BASE_URI + "api/v1/convertion/getListOfConverstion",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get existing organization details
    // getOrganizationDetails: {
    //     path: App_uri.CRM_BASE_URI + "v1/leadsManagement/ExitingOrganizationDetails",
    //     isAuth: true,
    //     isPicLocation: false,
    //     method: "POST"
    // },

    //get mapped user list
    getMapedUsers: {
        path: App_uri.BASE_URI + "api/v1/employee/getMapedUsers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //contact data
    getContactDropdownData: {
        path: App_uri.BASE_URI + "api/v2/contact/getContactDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get existing userDetails

    getUserDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/ExitingUserDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for opportunity list
    opportunityList: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/Getallopportunity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    changeMarkFavouriteStatusForOpportunity: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/changeFavorite",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // opportunity status update
    updateOpportunityTypeStatus: {
        path: App_uri.CRM_BASE_URI + "api/v2/opportunityManagement/updateOpportunityTypeStatus",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    updateOpportunityAssign: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/updateOpportunityAssign",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    downloadForOpportunity: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/download",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // get enquiry landing list data .............

    getEnquiryLandingData: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/landingPageSelections",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getOwnerList: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/allExitingUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeadSource: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/getLeadSources",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeadDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/GetLeadDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeadDetailsV2: {
        path: App_uri.CRM_BASE_URI + "api/v2/leadsManagement/GetLeadDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    changeMarkFavouriteStatusForLead: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/changeFavorite",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeadsActivityLog: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/GetActivityLog",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getSalesStage: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstSalesStage/getSalesStage",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getOrganizationDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/getOrganizationDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getOrganizationAllActivity: {
        path: App_uri.CRM_BASE_URI + "api/v1/org/getOrganizationAllActivity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getOpportunityDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/GetopportunityDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // update task
    getStateForSubordinate: {
        path: App_uri.CRM_BASE_URI + "api/v2/state/getStateForSubordinate",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getOpportunityActivityLog: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/GetActivityLog",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getContactDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getContactDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getContactDetailsToEdit: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/gn_getContactDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getContactAllActivity: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getContactAllActivity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // get state data ........

    getaDistrictData: {
        path: App_uri.CRM_BASE_URI + "api/v2/city/getCity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get all country daat
    getCountry: {
        path: App_uri.CRM_BASE_URI + "api/v2/country/getCountry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get zone data ........

    getaZoneData: {
        path: App_uri.CRM_BASE_URI + "api/v2/zone/getZone",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getaZoneData_v3: {
        path: App_uri.CRM_BASE_URI + "api/v3/zone/getZone",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // get state data ........

    getaStateData: {
        path: App_uri.CRM_BASE_URI + "api/v2/state/getState",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get enquiry assigned employee list data .............

    getAssignedEmployeeData: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/getSelectedUsrs",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // get enquiry assigned employee list data .............

    addEnquiryData: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/gn_addInternalEnquiry",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for enquiryList,,,,,,,,,,
    enquiryList: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/getEnqueryListV1",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for delete

    deleteCrmEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/deleteInternalEnquiry",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    changeMarkFavouriteStatus: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/changeFavorite",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // get all existing organization
    getExistingOrganization: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/allExitingOrganization",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getProductCategory: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getProductCategory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // Type StockUpdate 
    getProductGroup: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getProductGroup",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllMasterUnitList: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getAllMasterUnitList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for saf scetion

    getExsistingContactList: {
        path: App_uri.CRM_BASE_URI + "api/v1/contactManage/getExsistingContactList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for getAllUser
    getAllUser: {
        path: App_uri.CRM_BASE_URI + "api/v2/leadsManagement/getAllUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for getAllUser
    getContactTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstContactType/getContactTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for getAllUser
    getAllData: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstProduct/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update profile picture
    profilePicUpdate: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/profilePicUpdate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for update shop picture
    updateCustomerImages: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/updateCustomerImages",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },



    getOrderDataForCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderDataForCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for sfa image upload
    imageupload: {
        path: App_uri.BASE_URI + "api/v1/imageupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for crm image upload
    crmImageupload: {
        path: App_uri.CRM_BASE_URI + "api/v1/imageupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get exsisting contact data 
    getExsistingContactData: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getExsistingContactData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // branding List,,,,,,SFA,,,,,,,,,

    brandingList: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/getBrandList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // branding type

    getBrandingType: {
        path: App_uri.CRM_BASE_URI + "api/v1/brandingType/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"

    },

    getPriorityDropdown: {
        path: App_uri.CRM_BASE_URI + "api/v2/mstPriority/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // csr list,,,,,,,,,
    csrList: {
        path: App_uri.BASE_URI + "api/v1/fetchCsrList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    addOdometer: {
        path: App_uri.BASE_URI + "api/v2/odometerManagement/addOdometer",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    getAllReasonData: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstReason/getMasterReasonslist",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addInOdometer: {
        path: App_uri.BASE_URI + "api/v1/odometerManagement/addInOdometerReading",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    addOutOdometer: {
        path: App_uri.BASE_URI + "api/v1/odometerManagement/addOutOdometerReading",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    OdometerList: {
        path: App_uri.BASE_URI + "api/v2/odometerManagement/getOdometerReadingList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    registrationList: {
        path: App_uri.CRM_BASE_URI + "api/v3/customerManagement/gn_getlistOfNewRegCustomers",
        // path: App_uri.CRM_BASE_URI + "api/v2/customerManagement/getlistOfNewRegCustomers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getRegistrationDocumentDropdownData: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstCustomerDocumentTypes/getDocumentsType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // attendanceList,,,,,,

    attendanceList: {
        // path: App_uri.BASE_URI + "api/v2/leaveAttendence/listAttendence",
        path: App_uri.BASE_URI + "api/v3/leaveAttendence/listAttendence_mob",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // add attendance
    addAttendance: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/addAttendence",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //add leave
    addLeave: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/addLeave",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getAttendenceDetails: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/getAttendenceDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // leave list
    leaveList: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/leaveList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // get all good practice name
    mstCsrTypeList: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstCsrType/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //
    mstProductAllData: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstProduct/getAllData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //get customer list for add CSR
    customerList: {
        path: App_uri.BASE_URI + "api/v1/customer/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //  create new CSR
    addCsrRequest: {
        path: App_uri.BASE_URI + "api/v1/addCsrRequest",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: false,
        method: "POST"
    },
    //  get all contactType for dropdown
    allContactTypeArr: {
        path: App_uri.BASE_URI + "api/v1/getallcontacttype",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //  get all feedback f
    addFeedback: {
        path: App_uri.BASE_URI + "api/v1/feedback/submitFeedback",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // ...meeting  

    meetingRequestList: {
        path: App_uri.BASE_URI + "api/v1/meetManagement/meetingRequestList",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    addNewMeetingRequest: {
        path: App_uri.BASE_URI + "api/v1/meetManagement/addNewMeetingRequest",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // unplanned visit,,,,,,

    getCustomerTypeList: {
        path: App_uri.BASE_URI + "api/v1/customer/getCustomerTypeList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getCustomersType: {
        path: App_uri.BASE_URI + "api/v1/convertion/getCustomersType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getSearchedCustomerData: {
        path: App_uri.BASE_URI + "api/v2/customer/getSearchedCustomerData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    addUnplannedVisit: {
        path: App_uri.BASE_URI + "api/v1/customer/addUnplannedVisit",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    //  for new registration
    addNewRegCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/gn_addNewRegCustomer",
        // path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/addNewRegCustomer",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    //  visitNotes for SFA
    fetchVisitNoteForEdit: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getFieldVisitFeedbackData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fieldVisitAdd: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/gn_fieldVisitAdd",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    projectFieldVisitAdd: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/gn_fieldVisitNoteProject",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    fieldVisitUpdate: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/fieldVisitUpdate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getfieldVisitMasterList: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getfieldVisitMasterList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fieldVisitListing: {
        path: App_uri.BASE_URI + "api/v2/fieldVistManagement/fieldVisitListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getBrandType: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/getMasterList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // add brand requisition
    addBrandRequisition: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/addBrandRequisition",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // get unit dropdown data

    unitDropdownData: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/getMeasurementUnitList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for subordinate data
    getChildUserByParent: {
        path: App_uri.BASE_URI + "api/v1/customer/getChildUserByParent",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllSubordinatesOfUser: {
        path: App_uri.CRM_BASE_URI + "api/v4/mstActivity/getAllSubordinatesOfUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // ...meeting  

    getMeetingTypLists: {
        path: App_uri.BASE_URI + "api/v1/meetManagement/getMeetingTypLists",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get reason list
    getMasterReasonslist: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstReason/getMasterReasonslist",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for stage change
    addOpportunityStageChange: {
        path: App_uri.CRM_BASE_URI + "api/v1/opportunityManagement/addOpportunityStageChange",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    //for task details
    getTaskDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/getTaskDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for enquiry update
    updateEnquiryDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/gn_editInternalEnquiry",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    //for enquiry details
    getEnquiryDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/gn_getInternalEnquiryByenquiryId",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAllDropdownForTarget: {
        path: App_uri.BASE_URI + "api/v1/convertion/getAllDropdownForTarget",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for subordinate data
    calenderList: {
        path: App_uri.BASE_URI + "api/v1/calenderActivity/list",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    getStockListInfo: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getStockListInfo",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for customer data
    getCustomerMapList: {
        path: App_uri.BASE_URI + "api/v2/customer/getCustomerMapList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for customer data
    getUserTargetList: {
        path: App_uri.BASE_URI + "api/v2/pjpmanagement/getUserTargetList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for add new pjp
    addNewUnplannedpjp: {
        path: App_uri.BASE_URI + "api/v1/addNewUnplannedpjp",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // create pjp new api(for retail and project)
    addNewPlannedVisit: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/gn_addNewPlannedVisit",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    visitReportList: {
        path: App_uri.BASE_URI + "api/v2/consolidatedVisitReport",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    nextActionsForFieldVisit: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/nextActionsForFieldVisit",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    pjpList: {
        path: App_uri.BASE_URI + "api/v2/fieldVistManagement/pjpNotVisitListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    notVisitedListData: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/gn_notVisitedListData",
        // path: App_uri.BASE_URI + "api/v1/fieldVistManagement/notVisitedListData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    pjpUnvisitReportList: {
        path: App_uri.BASE_URI + "api/v1/pjpUnvisitReportList",
        // path: App_uri.BASE_URI + "api/v1/fieldVistManagement/notVisitedListData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },



    getfieldVisitSubCategoryList: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getfieldVisitSubCategoryList",
        // path: App_uri.BASE_URI + "api/v1/fieldVistManagement/notVisitedListData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // for reschedule pjp(this is pan's api)
    reschedulePJP: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/rescheduleVisit",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // visited listing
    pjpVisitListing: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/gn_pjpVisitListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    pjpVisitedListDetails: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/pjpVisitedListDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    pjpVisitedListDetailsProject: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/pjpVisitedListDetailsProject",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addAdditionalNote: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/addAdditionalNotes",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    //product list
    productListDropdown: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/productListDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // start survey
    startSurvey: {
        path: App_uri.BASE_URI + "api/v1/survey/startSurvey",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // get survey question
    getSurveyQuestion: {
        path: App_uri.BASE_URI + "api/v1/survey/getSurveyQuestion",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    getDashboardData: {
        path: App_uri.DASHBOARD_URI + "api/v1/dashboard/getCrmDashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for dashboard data
    getSFADashboardData: {
        path: App_uri.DASHBOARD_URI + "api/v1/dashboard/getSFADashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // request for SFA
    requestListing: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/requestListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // request approval for SFA
    requestApproveReject: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/requestApproveReject",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // visited listing
    getCustomerBusinessDetails: {
        path: App_uri.BASE_URI + "api/v1/customer/getCustomerBusinessDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // update task
    updateTask: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskManagement/gn_updateTask",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    // get visitor type
    getVisitorType: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/getVisitorType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    upcomingSurveyList: {
        path: App_uri.BASE_URI + "api/v1/survey/upcomingSurveyList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    completedSurveyList: {
        path: App_uri.BASE_URI + "api/v1/survey/completedSurveyList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getCompletedSurveyDetails: {
        path: App_uri.BASE_URI + "api/v1/survey/getCompletedSurveyDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    notificationList: {
        path: App_uri.BASE_URI + "api/v1/notificationManagement/notificationList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    readNotification: {
        path: App_uri.BASE_URI + "api/v1/notificationManagement/readNotification",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getUnreadNotificationCount: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/getUnreadNotificationCount",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    
    deleteNotification: {
        path: App_uri.BASE_URI + "api/v1/notificationManagement/deleteNotification",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    globalDelete: {
        path: App_uri.BASE_URI + "api/v1/common/deleteRec",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    serviceFeedback: {
        path: App_uri.BASE_URI + "api/v1/feedback/addServiceFeedback",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getApplicationPolicy: {
        path: App_uri.BASE_URI + "api/v1/common/getApplicationPolicy",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    targetVisitListing: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/targetVisitListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    calenderType: {
        path: App_uri.BASE_URI + "api/v1/calenderActivity/calenderType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getTaskStage: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskStage/getTaskStage",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getTaskCatagory: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskCategory/getTaskCatagory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addCalenderActivity: {
        path: App_uri.BASE_URI + "api/v1/calenderActivity/addCalenderActivity",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    sendListToSubOrdinates: {
        path: App_uri.CRM_BASE_URI + "api/v1/taskManagement/sendListToSubOrdinates",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getSelectedUsrs: {
        path: App_uri.CRM_BASE_URI + "api/v3/enqueryManagement/getSelectedUsrs",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getDesignationForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/clikyMagic/getDesignationForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchAllChildDesignation: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/fetchAllChildDesignation",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    searchAllChildUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/searchAllChildUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    fetchAllChildUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/fetchAllChildUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getUserList: {
        path: App_uri.CRM_BASE_URI + "api/v1/clikyMagic/getUserList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getMaterialConversionData: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/getMaterialConversionData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getUserTargetVsAchievement: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/getUserTargetVsAchievement",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addRemarkLeads: {
        path: App_uri.CRM_BASE_URI + "api/v1/leadsManagement/addRemarkLeads",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },



    updateTaskAssignToByclientId: {
        path: App_uri.CRM_BASE_URI + "api/v2/taskManagement/gn_changeTaskAssignUser",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getSubOrdinateByZone: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/gn_getSubordinateByZone",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getDistrictForSubordinate: {
        path: App_uri.CRM_BASE_URI + "api/v2/city/getDistrictForSubordinate",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getZoneForSubordinate: {
        path: App_uri.CRM_BASE_URI + "api/v2/zone/getZoneForSubordinate",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    ////////////////map section

    //get user location mapping
    mapUserLocationMapping: {
        path: App_uri.BASE_URI + "api/v1/mapEntity/mapUserLocationMapping",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get all Beat data data
    getBeatData: {
        path: App_uri.BASE_URI + "api/v2/mapEntity/getBeatData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for get all Beat data data
    getBeatDataDetails: {
        path: App_uri.BASE_URI + "api/v1/mapEntity/getBeatDataDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get all Beat data data
    getVisitMap: {
        path: App_uri.BASE_URI + "api/v1/mapEntity/getVisitMap",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get all Beat data daat
    getCrmMap: {
        path: App_uri.BASE_URI + "api/v1/mapEntity/getCrmMap",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //get Designation List
    getDesignationList: {
        path: App_uri.BASE_URI + "api/v1/common/getDesignationList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //get Location Hierarchy
    getLocationHierarchy: {
        path: App_uri.BASE_URI + "api/v1/common/getLocationHierarchy",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //get Customer Type
    getCustomerType: {
        path: App_uri.BASE_URI + "api/v1/getCustomerType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // getUserStatus: {
    //     path: App_uri.BASE_URI + "api/v1/common/getUserStatus",
    //     isAuth: true,
    //     isPicLocation: false,
    //     isEncrypt:true,
    //     method: "POST"
    // },

    getUserStatus: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/checkUserCurrentStatus",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getProjectVisitContactData: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getProjectVisitContactData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getProjectCustomerData: {
        path: App_uri.BASE_URI + "api/v1/customer/getProjectCustomerData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for getAllUser
    getContactTypes_v2: {
        path: App_uri.CRM_BASE_URI + "api/v2/mstContactType/getContactTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getContactType_main: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getContactType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getProjectCustomerData_v2: {
        path: App_uri.BASE_URI + "api/v2/customer/getProjectCustomerData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getAllVisitsForContact: {
        path: App_uri.BASE_URI + "api/v1/convertion/getAllVisitsForContact",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for pic the users locations

    pickUserCurrentLocation: {
        path: App_uri.CRM_BASE_URI + "api/v1/pickUserCurrentLocation",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    getCustomerOrderDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagementBandhan/getCustomerOrderDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getOrderItemListings: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderItemListings",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    saveModifiedOrderData: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/saveModifiedOrderData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    cancelTotalOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/cancelTotalOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },






    // ......................................MMS API....................................

    getMeetingWithPaymentDueDetails: {
        path: App_uri.MMS_BASE_API + "api/meeting/getMeetingWithPaymentDueDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getMeetingPhotographyDelete: {
        path: App_uri.MMS_BASE_API + "api/meetingPhotography/getMeetingPhotographyDelete_Mob",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllDealer: {
        path: App_uri.MMS_BASE_API + "api/dealer/getdealerListMeeting",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllDistributor: {
        path: App_uri.MMS_BASE_API + "api/distributor/fetchDistributorMeeting",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllDistributor: {
        path: App_uri.MMS_BASE_API + "api/distributor/fetchDistributorMeeting",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsMeetingType: {
        path: App_uri.MMS_BASE_API + "api/meetingType/getmeetingTypeList",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getMmsStateData: {
        path: App_uri.MMS_BASE_API + "api/state/fetchState",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getMmsDistrictData: {
        path: App_uri.MMS_BASE_API + "api/district/getdistrictByState",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getMmsCityData: {
        path: App_uri.MMS_BASE_API + "api/district/getZoneDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    mmsAddIndent: {
        path: App_uri.MMS_BASE_API + "api/indent/addindent",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    meetingList: {
        // path: App_uri.MMS_BASE_API + "api/meeting/getAllMeetingDetails_new",
        path: App_uri.MMS_BASE_API + "api/meeting/getAllMeetingDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsImageUpload: {
        path: App_uri.MMS_BASE_API + "api/v1/imageupload",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsFileUpload: {
        path: App_uri.MMS_BASE_API + "api/v1/fileupload",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getMeetingDetails: {
        path: App_uri.MMS_BASE_API + "api/meeting/getMeetingDetailsWithId",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getUpcomingMeetingDetails: {
        path: App_uri.MMS_BASE_API + "api/meeting/getMeetingCountDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsGetExpenseList: {
        path: App_uri.MMS_BASE_API + "api/expense/getExpense",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsAddindentBudget: {
        path: App_uri.MMS_BASE_API + "api/indentBudget/addindentBudget",
        isAuth: false,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    mmsAddindentBudgetV2: {
        path: App_uri.MMS_BASE_API + "api/indentBudget/addindentBudgetV2_new",
        isAuth: false,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    mmsAddindentBudgetForApproved: {
        path: App_uri.MMS_BASE_API + "api/meetingBudget/updateMeetingBudget_actual",
        isAuth: false,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    mmsAddMeetingAndIndentStatusChange: {
        path: App_uri.MMS_BASE_API + "api/indent/addMeetingAndIndentStatusChange",
        isAuth: false,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    mmsGetindentBudgetList: {
        path: App_uri.MMS_BASE_API + "api/indentBudget/getindentBudgetList_new",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsDashboardData: {
        path: App_uri.MMS_BASE_API + "api/meeting/getDashboardData",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    mmsAddMeetingPhotography: {
        path: App_uri.MMS_BASE_API + "api/meetingPhotography/addMeetingPhotography",
        isAuth: false,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    mmsGetMeetingPhotography: {
        path: App_uri.MMS_BASE_API + "api/meetingPhotography/getMeetingPhotography",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //////////////////////////////////////////////////
    checkInterServerError: {
        path: App_uri.BASE_URI + "api/v1/checkInterServerError",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getCurrentLocation: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/getUserCurrentLocation",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getOrdrModuleDashboardData: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/getOrdrModuleDashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    //---------------------------------Expenses API-------------------------------------------

    getExpenseCategory: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseCategory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getChartData: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getKPIdashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getExpenseTravelType: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseTravelType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getExpenseTravelModes: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseTravelModes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    masterExpenseCategoryTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/masterExpenseCategoryTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // for visit expence list
    getAllFieldVisitsByMonths: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getAllFieldVisitsByMonths",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for visit expence list
    masterExpenseSubCategoryTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/masterExpenseSubCategoryTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for modes of sub category
    masterExpenseCategoryModes: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/masterExpenseCategoryModes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // for visit expence list
    getUnitsDropdown: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getUnitsDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    masterExpenseTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/masterExpenseTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addExpenses: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/addExpenses",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },


    getExpenseList: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getOdometerDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getOdometerDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getOdometerHeaderDetails: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/getOdoMeterDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getFoodExpenseDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getFoodExpenseDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getExpenseDashboardData: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseDashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    deleteExpenses: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/deleteExpense",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getAllExpenseCount: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getAllHeaderData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getAllowanceRate: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getAllowanceRate",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getExpenseByApprovedStatusForCalender: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseManagement/getExpenseByApprovedStatus",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllFieldVisitDataForUser: {
        path: App_uri.BASE_URI + "api/v1/reports/getAllFieldVisitDataForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },





    // GAMIFICATION API'S


    addGamificationEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/addGamificationEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getInternalEnquiryByenquiryId: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/getInternalEnquiryByenquiryId",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    editInternalEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v1/enqueryManagement/editInternalEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    collectPointsForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/collectPointsForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    topGainForUserList: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/topGainForUserList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getListOfUserPointsLog: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/getListOfUserPointsLog",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    nearToAchieveList: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/nearToAchieveList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    likeListOfUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/likeListOfUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    thanksToUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/thanksToUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    topUserListForGamification: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/topUserListForGamification",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    likeToUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/likeToUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getChallenegesForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/getChallenegesForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    acceptChallenegesForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/acceptChallenegesForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getUserDashboardData: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/getUserDashboardData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for survey


    getSurveyForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/getSurveyForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    collectSurveyQsAnswers: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/collectSurveyQsAnswers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getUsersAnswerByUsers: {
        path: App_uri.CRM_BASE_URI + "api/v1/gamification/getUsersAnswerByUsers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // order section API's

    getAllProductBrandwiseList: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getAllProductBrandwiseList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //add to cart for order

    addProductForOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/addProductForOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for customer profile data

    getCustomerDataWithCartItemCount: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getCustomerDataWithCartItemCount",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for cart details
    getListForCartDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getListForCartDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for delete cart item
    deleteItemFromCart: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/deleteItemFromCart",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for order history
    getOrderHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for repeat order
    repeatOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/repeatOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for order History Details
    getOrderHistoryDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderDataFrmOrderHistrory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for placing order
    placeNewOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/placeNewOrder",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    //for successfull place order
    orderSuccessfullyDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/orderDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for recent orders
    recentOrderDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/recentOrderDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update payment api 
    updatePayment: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/updatePayment",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update payment api 
    fileupload: {
        path: App_uri.CRM_BASE_URI + "api/v1/fileupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for payment history list
    paymentHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/paymentHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for attendance activty dropdown
    getDailyActivities: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getDailyActivities",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get Products Hirarchy wise
    getProductsHirarchywise: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getProductsHirarchywise",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for leave reason dropdown
    getLeaveReasons: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/getLeaveReasons",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // for new login api
    loginNew: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/gn_mobileLogin",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for get Hierarchy Types Sl No from api
    getHierarchyTypesSlNo: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getHierarchyTypesSlNo",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for get User Immediate Child Data from api
    getUserImmediateChildData: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getUserImmediateChildData",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    ///////////////////////////////

    // for list mapped user
    gn_getUserMappedLastLocationLevelData: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/gn_getUserMappedLastLocationLevelData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for create new field Visit for order
    createFieldVisit: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/createFieldVisit",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getPocketMisDataForUser: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getPocketMisDataForUser",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getPocketMisPerformanceReport: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getPocketMisPerformanceReport",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getDayWiseSalesReport: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getDayWiseSalesReport",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getPocketMisProductSales: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getPocketMisProductSales",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getUserMappedLastLevelLocations: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/getUserMappedLastLevelLocations",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getGrievanceLists: {
        path: App_uri.BASE_URI + "api/v1/feedback/getGrievanceLists",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getCustomerLastVisits: {
        path: App_uri.CRM_BASE_URI + "api/v1/crmFieldVisitManagement/getCustomerLastVisits",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },



    //Cliky 2.0
    // visited listing
    pjpVisitListingV2: {
        path: App_uri.BASE_URI + "api/v2/fieldVistManagement/gn_pjpVisitListing",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for details of the visit
    pjpVisitedListDetailsV2: {
        path: App_uri.BASE_URI + "api/v2/fieldVistManagement/gn_pjpVisitedListDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for Day Activity Selection Section for dashboard
    DayActivitySelectionSection: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/DayActivitySelectionSection",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for User Activity Selection Section for dashboard
    UserActivitySelectionSection: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/UserActivitySelectionSection",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for crm User Activity Selection Section for dashboard

    getCrmDashboardDataForMobile: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/getCrmDashboardDataForMobile",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for User Target Vs Achievement for dashboard
    TargetVsAchievement: {
        path: App_uri.CRM_BASE_URI + "api/v1/dashboard/TargetVsAchievement",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get odometer data
    getOdometerStatusData: {
        path: App_uri.BASE_URI + "api/v1/odometerManagement/getOdometerStatusData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update Daily Work Type
    updateDailyWorkType: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/updateDailyWorkType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for getOfficial Work Type
    getOfficialWorkTypes: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/getOfficialWorkTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // for submit Official Work Type
    updateOfficialWorkType: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/updateOfficialWorkType",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //to verify the otp
    orderOTPverification: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/orderOTPverification",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //to verify the otp
    getUploadPromationalBanners: {
        path: App_uri.CRM_BASE_URI + "api/v1/client/getUploadPromationalBanners",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // get current order list Section for dashboard
    getCurrentOrdersListForDashboard: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getCurrentOrdersListForDashboard",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for customer details section
    getDetailsNewRegCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v2/customerManagement/gn_getDetailsNewRegCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for updateEmpWorkActivityType section
    updateEmpWorkActivityType: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/updateEmpWorkActivityType",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    //for route visited section
    getVisitedLocations: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getVisitedLocations",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getNoOrderVisitStatusChecking: {
        path: App_uri.BASE_URI + "api/v1/fieldVistManagement/getNoOrderVisitStatusChecking",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },





    //-----LMS-------------
    //get banner image
    getPromotionalImage: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getPromotionalImage",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },


    getCategoryByCatalogue: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getCategoryByCatalogue",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    getItemByCategory: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getItemByCategory",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    getItemDetails: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getItemDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    //for lms dashboard card section
    getCardSection: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getCardSection",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "GET"
    },

    // ////////////////////////////////////// Offline data  ///////////////////////////////////

    //for Item List
    getOfflineLtemsConfig: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getOfflineLtemsConfig",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for customer list and sales report section
    gn_getListOfNewRegCustomersForOffline: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/gn_getListOfNewRegCustomersForOffline",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for customer details with customer wise
    gn_getListOfNewRegCustomerDetailsForOffline: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/gn_getListOfNewRegCustomerDetailsForOffline",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for sync offline data
    saveOfflineVisitAndOrders: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/saveOfflineVisitAndOrders",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for VisitNotes offline data
    getOfflineVisitFeedbackConfig: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getOfflineVisitFeedbackConfig",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //Manager View

    // User Summary
    getUserSummary: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getUserSummary",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    callSummary: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/callSummary",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    userWiseCallValue: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/userWiseCallValue",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    getHiearchyTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getHiearchyTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    hiearchyTypeWiseOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/hiearchyTypeWiseOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    outlateSummary: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/outlateSummary",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    hierarchyDrillDownValues: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/hierarchyDrillDownValues",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getAbsentHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getAbsentHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getLeaveHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getLeaveHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getOfficeHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getOfficeHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getRetailHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/getRetailHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    teamPerformace: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/teamPerformace",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    teamPerformaceDrillDown: {
        path: App_uri.CRM_BASE_URI + "api/v1/managerDashboard/teamPerformaceDrillDown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },




    //Modern trade

    // outlet details fetch api
    getMTCustomerList: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/getMTCustomerList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for customer details 
    fetchMTCustomerDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/fetchMTCustomerDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for modern trade login api
    loginVisitMTCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/loginVisitMTCustomer",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for login checking api
    CheckLoginMTCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/CheckLoginMTCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for logout modern trade
    logoutVisitMTCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/logoutVisitMTCustomer",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    addMTStock: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/addMTStock",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getMTStockReport: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/getMTStockReport",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },


    addMerchandisingImages: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/addMerchandisingImages",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getMerchandisingImages: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/getMerchandisingImages",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    deleteMerchandisingImages: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/deleteMerchandisingImages",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for open stock list api
    getMTOpenStockList: {
        path: App_uri.CRM_BASE_URI + "api/v1/modernTradeManagement/getMTOpenStockData",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // for fetch current location api
    getAddressByLatLng: {
        path: App_uri.CRM_BASE_URI + "api/v1/common/getAddressByLatLng",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },


    getGiftTypeList: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseCategory/getGiftTypeList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getGiftStockList: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseCategory/getGiftStockList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addGiftStockRequest: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseCategory/addGiftStockRequest",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addEmpVisitGifts: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseCategory/addEmpVisitGifts",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getGiftCategoryList: {
        path: App_uri.CRM_BASE_URI + "api/v1/expenseCategory/getGiftCategoryList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getFormFieldsValueById: {
        path: App_uri.CRM_BASE_URI + "api/v1/adminManagement/getFormFieldsValueById",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    saveFormFieldsValue: {
        path: App_uri.CRM_BASE_URI + "api/v1/adminManagement/saveFormFieldsValue",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    

    
})