// define all fields for common data

export const COMMON = Object.freeze({

    EXPENSES_STATUS: [
        {
            id: 0,
            name: "ALL PENDING",
            color: '#FEF0CD',
            txtColor: '#FAA500'
        }, {
            id: 1,
            name: "ALL APPROVED",
            color: '#4BC014',
            txtColor: '#3A8B00'
        }, {
            id: 2,
            name: "REJECTED",
            color: '#fa8372',
            txtColor: '#FF2E00'
        }, {
            id: 3,
            name: "PARTIALLY APPROVED",
            color: '#FFD5CC',
            txtColor: '#FF2E00'
        }
    ],


    MONTHS: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    CREATE_TASK: {
        PRIORITY_STATUS: [
            {
                id: 1,
                name: "High",
                check: false
            },
            {
                id: 2,
                name: "Medium",
                check: false
            },
            {
                id: 3,
                name: "Low",
                check: false
            }
        ],
        TASK_STAGE: [
            {
                id: 1,
                name: "Open",
                check: false
            },
            {
                id: 2,
                name: "Closed",
                check: false
            },
            {
                id: 3,
                name: "Overdue",
                check: false
            }
        ],
    },
    PRIORITY_STATUS: [
        {
            id: 1,
            name: "High",
            check: false
        },
        {
            id: 2,
            name: "Medium",
            check: false
        },
        {
            id: 3,
            name: "Low",
            check: false
        },
    ],
    LEAD_DETAILS_STATUS: [
        {
            id: 1,
            name: "Hot",
            check: false,
            value: 1
        },
        {
            id: 2,
            name: "Warm",
            check: false,
            value: 2
        },
        {
            id: 3,
            name: "Cold",
            check: false,
            value: 3
        }
    ],
    ENQUIRY_STATUS: [
        {
            id: 1,
            name: "New",
            check: false,
            value: 1
        },
        {
            id: 2,
            name: "Assgned",
            check: false,
            value: 2
        },
        {
            id: 3,
            name: "Not Assigned",
            check: false,
            value: 3
        },
        {
            id: 4,
            name: "Approved",
            check: false,
            value: 4
        },
        {
            id: 5,
            name: "Not Approved",
            check: false,
            value: 5
        }
    ],
    STATUS: [
        {
            id: 1,
            name: "Active",
            check: false,
            value: 1
        },
        {
            id: 2,
            name: "Inactive",
            check: false,
            value: "0"
        },
    ],

    CREATE_CONTACT: {
        PERSONAL_AND_CONTACT_DETAILS: {
            STATUS: [
                {
                    id: 1,
                    name: "Active",
                    value: 1
                },
                {
                    id: 2,
                    name: "Inactive",
                    value: 0
                }
            ],
            CONTACT_BUSINESS_TYPE_DATA: [
                {
                    id: 1,
                    name: "Self",
                    value: 0
                },
                {
                    id: 2,
                    name: "Organization",
                    value: 1
                }
            ]
        }
    },
    RECORDS_PER_PAGE: [
        {
            id: 1,
            name: "10",
            check: false
        },
        {
            id: 2,
            name: "15",
            check: false
        },
        {
            id: 3,
            name: "20",
            check: false
        },
        {
            id: 4,
            name: "30",
            check: false
        },
        {
            id: 5,
            name: "50",
            check: false
        },

    ],
    SELECT_STAGE: [
        {
            id: 1,
            name: "Select an option",
            check: false
        },
        {
            id: 2,
            name: "Not Contacted",
            check: false
        },
        {
            id: 3,
            name: "Attempted Contact",
            check: false
        },
    ],
    // CREATE_ENQUIRY: {
    //     SOURCE_INFO: {
    //         ENQUIRY_SOURCE_ERROR: "Please Select Enquiry Source!",
    //         ENQUIRY_TYPE_ERROR: "Please Select Enquiry Type!",
    //         OWNER_FIRST_NAME_ERROR: "Please enter Owner First Name!",
    //         OWNER_LAST_NAME_ERROR: "Please enter Owner Lat Name",
    //         OWNER_PHONE_ERROR: "Please enter Owner Phone No.!",
    //         OWNER_EMAIL_ERROR: "Please enter Owner Email!",
    //         ADDRESS_ERROR: "Please enter Address!",
    //         COUNTRY_ERROR: "Please select Country!",
    //         STATE_ERROR: "Please select State",
    //         DISTRICT_ERROR: "Please select District!",
    //         CITY_ERROR: "Please enter City or Village!",
    //         ZONE_ERROR: "Please select Zone!",
    //         PINCODE_ERROR: "Please enter pincode",
    //         NOTES_ERROR: "Please enter notes!"
    //     },
    //     BUSINESS_INFO: {
    //         NAME_ERROR: "Please enter Business name!",
    //         EMAIL_ERROR: "Please enter Email!",
    //         ADDRESS_ERROR: "Please enter Address!",
    //     },
    //     ASSIGN_INFO: {
    //         EMPLOYEE_TYPE_ERROR: "Please select Employee Type!",
    //         ASSIGNED_PERSON_ERROR: "Please select Assigned Person!",
    //         ASSIGNED_DATE_ERROR: "Please select Assign Date!",
    //     }
    // },
    CUSTOMER_TYPE: [
        {
            id: "1",
            name: "New"
        }, {
            id: "2",
            name: "Exsisting"
        }
    ],
    GENDER: [
        {
            id: "1",
            sName: "M",
            name: "Male"
        }, {
            id: "2",
            sName: "F",
            name: "Female"
        }
    ]
});


export const ROUTING = {
    "bt_addToCalendar": { routeName: "ViewCalendar" },
    "bt_addToEnquiry": { routeName: "CreateEnquiry" },
    "bt_addRegistration": { routeName: "Registration" },
    "bt_addPjp": { routeName: "CreatePjp" },

    "bt_visitForm": { routeName: "VisitForm" },
    // "bt_addUnplannedvisit": { routeName: "UnplannedVisit" },
    "bt_odometerReading": { routeName: "odometer" },
    "bt_addLeave": { routeName: "LeaveScreen" },
    "bt_csr": { routeName: "Csr" },
    "bt_survey": { routeName: "SurveyList" },
    // "bt_conversion":{routeName: "Survey"},
    "bt_newRequest": { routeName: "NewRegistration" },


    // "bt_task": { routeName: "TaskList" },
    // "bt_lead": { routeName: "LeadsList" },
    // "bt_crmEnquiry": { routeName: "EnquiryList" },
    // "bt_contact": { routeName: "ContactListPage" },
    // "bt_organization": { routeName: "OrganizationList" },

    "bt_task": { routeName: "CreateAndEditTask" },
    "bt_lead": { routeName: "CreateAndEditLeads" },
    "bt_crmEnquiry": { routeName: "CreateAndEditEnquiry" },
    "bt_contact": { routeName: "CreateAndEditContact" },
    "bt_organization": { routeName: "CreateAndEditOrganization" },

    // mms

    "bt_event": { routeName: "MmsNewEvent" },
}

export const ACTIVITY_DATA = {
    "Visit": { color: "#eac8ff" },
    "Meeting": { color: "#b3b1ff" },
    "Event": { color: "#ffba7b" },
    "Task": { color: "#aadaff" },
    "Follow Up": { color: "#bbc5cd" }
}
export const MONTH_SHORT_DATA = {
    "January": { shortName: "Jan" },
    "February": { shortName: "Feb" },
    "March": { shortName: "Mar" },
    "April": { shortName: "Apr" },
    "May": { shortName: "May" },
    "June": { shortName: "Jun" },
    "July": { shortName: "July" },
    "August": { shortName: "Aug" },
    "September": { shortName: "Sept" },
    "October": { shortName: "Oct" },
    "November": { shortName: "Nov" },
    "December": { shortName: "Dec" }
}

export const PRIORITY_STATUS_DATA = {
    "High": { color: "#bd5431" },
    "Medium": { color: "#2aa89e" },
    "Low": { color: "#a6b833" },

}

export const ACTIVITY_COLOR = {
    0: { color: "#A73B47" },
    1: { color: "#E4805B" },
    2: { color: "#54daa8" },
    3: { color: "#4286A7" },
    4: { color: "#41AEE4" },
    5: { color: "#3CA792" },
    6: { color: "#77A754" },
    7: { color: "#A73B47" },
    8: { color: "#E4805B" },
    9: { color: "#54daa8" },
    10: { color: "#4286A7" },
    11: { color: "#41AEE4" },
    12: { color: "#3CA792" },
    13: { color: "#77A754" },
    14: { color: "#A73B47" },
    15: { color: "#E4805B" },
    16: { color: "#54daa8" },
    17: { color: "#4286A7" },
    18: { color: "#41AEE4" },
    19: { color: "#3CA792" },
}


export const EXPENSE_STATUS_COLOR = {
    "ALL_PENDING": { color: "#FEF0CD", txtColor: "#FAA500" },
    "ALL_APPROVED": { color: "#4BC014", txtColor: "#3A8B00" },
    "REJECTED": { color: "#fa8372", txtColor: "#FF2E00" },
    "PARTIALLY_APPROVED": { color: "#FFD5CC", txtColor: "#c90076" },
}

export const DYNAMIC_QS_TYPE = {
    1: "trueFalse",
    2: "inputText",
    3: "singleCheck",
    4: "optionSelect"
}

export const FileType = {
    "jpg": "image",
    "JPG": "image",
    "jpeg": "image",
    "JPEG": "image",
    "png": "image",
    "PNG": "image",
    "svg": "image",
    "SVG": "image",
    "pdf": "file",
    "PDF": "file",
    "xls": "file",
    "XLS": "file",
    "xlsx": "file",
    "XLSX": "file",
    "txt": "file",
    "TXT": "file",
    "doc": "file",
    "DOC": "file",
    "docx": "file",
    "DOCX": "file",
    "html": "web",
    "HTML": "web",
    "htm": "web",
    "HTM": "web",
}

export const MaterialUnitConvertionRate ={
    "KG_TO_TON_RATE":0.001,
    "TON_TO_KG":1000
}