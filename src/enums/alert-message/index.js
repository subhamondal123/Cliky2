// Define all the alert and error messages

export const MESSAGE = Object.freeze({
    EXIT_APP: {
        PRESS_AGAIN: "Press again to exit the Application !"
    },
    SERVER: {
        INTERNAL_SERVER_ERROR: "Network Error !"
    },
    NETWORK: {
        ERROR: "Network Error Please Check Your Network !"
    },
    EMAIL: {
        EMAIL_EMPTY: "Please Enter Email !",
        EMAIL_INVALID: "Please Enter Valid Email Id !",
    },
    EMAIL_PASSWORD: {
        INCORRECT: "Incorrect Email or Password"
    },
    PASSWORD: {
        PASSWORD_EMPTY: "Please Enter Password",
        PASSWORD_NOT_VALID: "Password must contains Minimum seven characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        PASSWORD_WRONG: "You have enter a wrong Password",
        PASSWORD_NOT_MATCH: "Password not Matching !",
        CONFIRM_PASSWORD_EMPTY: "Please Enter the Password Again !",
        PASSWORD_NOT_SAME_AS_CURRENT: "Current Password And New Password Cannot Be Same !",
        NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH: "New Password & Confirm Password Not Matched !"
    },
    MOBILE: {
        MOBILE_EMPTY: "Please Enter your Mobile No !",
        MOBILE_LESS: "Mobile No is less than 10 Digits !",
        MOBILE_GREATER: "Mobile no cannot exceed 14 digits !",
        MOBILE_ZERO_CHECK: "Mobile no cannot start with 0 !",
        MOBILE_NOT_MATCH: "Given mobile does not match !",
        MOBILE_VALID: "Mobile number must be a minimum 10 !",
        MOBILE_EXSIST: "Mobile no already exsists !",
        MOBILE_EMAIL_BOTH_EMPTY: "Please Enter your Mobile no or Email Id !"
    },
    CHOOSE_CAMERA_TYPE: {
        SELECT: "Please Select Any One"
    },
    GENDER: {
        GENDER_ERROR: "Please Select Gender !"
    },
    DATE_OF_BIRTH: {
        DOB_ERROR: "Please Select Date of Birth !"
    },

    CREATE_TASK: {
        TASK_DETAILS: {
            TASK_NAME_ERROR: "Please Enter Task Name!",
            TASK_CATEGORY_ERROR: "Please Select Task Category!",
            DUE_DATE_ERROR: "Please Select Due Date!",
            ASSIGNED_USER_ERROR: "Please Select Assigned User!",
            PRIORITY_STATUS_ERROR: "Please Select Priority Status",
            TASK_STAGE_ERROR: "Please Select Task Stage!"
        },
        ADDITIONAL_INFORMATION: {
            ORG_NAME_ERROR: "Please Enter Organization Name!",
            CONTACT_PERSON_ERROR: "Please Enter Contact Person Name!",
            PHONE_NUMBER_ERROR: "Please Enter Phone Number!",
            PHONE_NUMBER_DUPLICATE: "You Can't Enter the same Phone Number!",
            EMAIL_ID_DUPLICATE: "You Can't Enter the same Email!",
            DATE_TIME_ERROR: "Please Select Date & Time!",
            REC_TYPE_ERROR: "Please Select Recurring Type!",
            DATE_ERROR: "Please Select Date!",
            START_DATE_ERROR: "Please Select Start Date!",
            END_DATE_ERROR: "Please Select End Date!",
            NEED_MEETING_ERROR: "Please Choose Need Meeting!",
            RECURRING_STATUS: "Please Choose Recurring Status!"
        },
        VISIBILITY_PERMISSION: {
            PERMISSION_ERROR: "Please Choose Visibility Permission!",
            ASSIGNED_USER_ERROR: "Please Select Individual User!",
        }
    },

    OTP: {
        OTP_VERIFY_SUCCESS: "OTP Verified Succesfully !",
        INVALID_OTP: "Invalid OTP !",
        EMPTY_OTP: "Please Enter OTP !"
    },
    MARK_STAGE_COMPLETED: {
        AMOUNT_ERROR: "Please Enter Amount!",
        PROBABLITY_OF_WINING: "Please Enter Probablity of Wining!",
        EXPECTED_REVENUE: "Please Enter Revenue!",
        EXPECTED_CLOSING_DATE: "Please Select Expected Closing Date",
        FOLLOW_UP_DATE: "Please Choose Follow Up Date",
        PROPOSAL_VALUE: "Please Enter Proposal Value",
        PROPOSAL_NUMBER: "Please Enter Proposal Number",
        PROPOSAL_IMAGE: "Please Select Proposal Image",
        MUTUALLY_AGREED_CONTACT_VALUE: "Please Select Mutually Agreed Contact Value",
        PROPOSAL_SENT_DATE: "Please Choose Proposal Sent Date",
        NEXT_FOLLOWUP_DATE: "Please Choose Next FollowUp Date",
        STAGE_DURATION: "Please Enter Stage Duration",
        DESCRIPTION: "Please Enter Description ",
        SELECT_STAGE: "Plese Select Stage",
        CLOSING_AMOUNT: "Please Enter CLosing Amount",
        CLOSING_DATE: "Please Select Closing Date",
        CLOSING_REASON: "Please Select Closing Reason",
        NEXT_STAGE_ERROR: "Please Select Next Stage !"
    },
    CREATE_ENQUIRY: {
        SOURCE_INFO: {
            LOCATION_ERROR:"Please Select Location !",
            ENQUIRY_SOURCE_ERROR: "Please Select Enquiry Source!",
            ENQUIRY_TYPE_ERROR: "Please Select Enquiry Type!",
            OWNER_NAME: "Please Enter Owner Name",
            OWNER_FIRST_NAME_ERROR: "Please Enter Owner First Name!",
            OWNER_LAST_NAME_ERROR: "Please Enter Owner Last Name",
            OWNER_PHONE_ERROR: "Please Enter Owner Phone No.!",
            OWNER_EMAIL_ERROR: "Please Enter Owner Email!",
            ADDRESS_ERROR: "Please Enter Address !",
            COUNTRY_ERROR: "Please Eelect Country !",
            STATE_ERROR: "Please Select State !",
            DISTRICT_ERROR: "Please Select District !",
            CITY_ERROR: "Please Enter City or Village!",
            ZONE_ERROR: "Please Select Zone !",
            PINCODE_ERROR: "Please Enter Pincode",
            NOTES_ERROR: "Please Enter Notes!",
            LANDMARK_ERROR: "Please Enter Landmark!"
        },
        BUSINESS_INFO: {
            NAME_ERROR: "Please Enter Business Name!",
            CITY_ERROR: "Please Enter City!",
            PINCODE_ERROR: "Please Enter Pincode!",
            EMAIL_ERROR: "Please Enter Email!",
            ADDRESS_ERROR: "Please Enter Address!",
            TYPE: "Please Select Business Type!"
        },
        ASSIGN_INFO: {
            ASSIGNEE_NAME_ERROR: "Please Enter Assignee Name!",
            EMPLOYEE_TYPE_ERROR: "Please Select Employee Type!",
            ASSIGNED_PERSON_ERROR: "Please Select Assigned Person!",
            ASSIGNED_DATE_ERROR: "Please Select Assign Date!",
        }
    },
    BRANDING: {
        NEW_ENTRY: {
            BRANDING_NAME_ERROR: "Please Enter Branding Name!",
            CHOOSE_ITEM_ERROR: "Please Select Branding Type!",
            CHOSE_DESCRIPTION_ERROR: "Please Enter Description!",
            QUANTITY_ERROR: "Please Enter Quantity!",
            UNIT_ERROR: "Please Enter Unit!",
            IMAGE_ERROR: "Please Choose Photo!"
        },
    },

    ODOMETER: {
        TYPE_ERROR: "Please select Type!",
        IMAGE_ERROR: "Please select Image!",
        METER_READING_ERROR: "Please enter Meter Reading!"
    },

    LEAVE: {
        START_DATE_ERROR: "Please enter Start Date!",
        END_DATE_ERROR: "Please enter End Date!",
        TYPE_ERROR: "Please select Leave Type!",
        DAYS_ERROR: "Please enter No. of Days!",
        REMARK_ERROR: "Please enter Remarks!",

    },

    CSR_ADD: {
        GOOD_PRACTICE_ERROR: "Please select good practice name !",
        STATE_ERROR: "Please select state !",
        DISTRICT_ERROR: "Please select district!",
        ZONE_ERROR: "Please select Zone!",
        CUSTOMER_ERROR: "Please select customer !",
        PRODUCT_ERROR: "Please select product !",
        NEXT_VISIT_DATE_ERROR: "PLease select next visit date !",
        VISIT_DATE_ERROR: "PLease select visit date !",
        USER_TYPE_ERROR: "PLease select User Type !",
        REMARK_ERROR: "PLease enter Remark !",
        BRANDING_ITEM_ERROR: "Please Select Brand Type !",
        SIZE_SPECS_ITEM_ERROR: "Please Select Size Specs !",
    },

    NEW_NOTES: {
        CATEGORY_ERROR: "Please select category !",
        DESCRIPTION_ERROR: "Please enter description !",
        CHOOSE_STATUS_ERROR: "Please select status !"
    },
    UNPLANNED_NOTES: {
        CUSTOMER_TYPE_ERROR: "Please select customer type !",
        CUSTOMER_ERROR: "Please select customer !",
        VISITOR_TYPE_ERROR: "Please select Visitor type !",
        VISIT_TYPE_ERROR: "Please select Visit type !"
    },
    MEETING_ADD: {
        STATE_ERROR: "Please select state !",
        DISTRICT_ERROR: "Please select district",
        ZONE_ERROR: "Please select Zone!",
        TITLE_ERROR: "Please enter meeting title !",
        TYPE_ERROR: "Please select meeting type !",
        DATE_ERROR: "Please select meeting date !",
        DURATION_ERROR: "Please enter meeting duration !",
        DESC_ERROR: "Please enter meeting description !",
        LOCATION_ERROR: "Please enter meeting location !",
        EST_BUDGET_ERROR: "Pleade enter meeting estimated budget !",
        NO_OF_ATTENDEES_ERROR: "Please enter number of attendees !"
    },
    VISIT_FORM: {
        CAPACITY_ERROR: "Please enter Capacity !",
        REVENUE_ERROR: "Please enter Annual Revenue !",
        IMAGE_ERROR: "Please select Image !",
        COUNTER_VOLUME: "Please enter Counter Volume !",
        VISIT_DATE: "Please select Visit Date !",
        STATUS: "Please select Status !",
        NOTE: "Please enter Visit Note !"

    },
    SURVEY: {
        VISITOR_ERROR: "Please select visitor type !",
        ORG_NAME_ERROR: "Please enter organization name !",
        OWNER_NAME_ERROR: "Please enter owner name !",
        PRODUCT_ERROR: "Please select product !",
        PHONE_NUMBER_ERROR: "Please enter phone number !",
        EMAIL_ERROR: "Please enter email !",
        ADDRESS_ERROR: "Please enter address !",
        STATE_ERROR: "Please select state !",
        DISTRICT_ERROR: "Please select district !",
        ZONE_ERROR: "Please select zone !",
        REMARK_ERROR: "PLease enter remark !"
    },
    ORGANIZATION: {
        ORGANIZATION_TYPE_ERROR: "Please select Organization Type !",
        NAME_ERROR: "Please enter Organization Name !",
        NAME_ID_ERROR: "Please select Organization Name !",
        DESCRIPTION_ERROR: "Please enter Organization Description !",
        REVENUE_ERROR: "Please enter Annual Revenue !",
        NO_OF_EMP_ERROR: "Please enter Number of Employee !",

        CONTACT_TYPE_ERROR: "Please select Contact Type !",
        FIRST_NAME_ERROR: "Please enter First Name!",
        LAST_NAME_ERROR: "Please enter Last Name !",
        FIRST_NAME_ERROR: "Please enter First Name!",
        LAST_NAME_ERROR: "Please enter Last Name !",

    },
    LEAD: {
        CONTACT_ERROR: "Please select Contact !",
        FIRST_NAME_ERROR: "Please enter First Name !",
        LAST_NAME_ERROR: "Please enter Last Name !",
        DESIGNATION_ERROR: "Please enter Designation !",
        REVENUE_ERROR: "Please enter Annual Revenue !",
        NO_OF_EMP_ERROR: "Please enter Number of Employee !",
        CONTACT_TYPE_ERROR: "Please select Contact Type !",
        CONTACT_BUSINESS_TYPE_ERROR: "Please select Contact Business Type !",
        LEAD_STATUS_ERROR: "Please select Lead Status !",
        LEAD_STAGE_ERROR: "Please select Lead Stage Type !",
        LEAD_SOURCE_TYPE: "Please select Lead Source Type !",
        USER_ERROR: "Please select User !"

    },
    CONTACT_DETAILS_CRM_CONTACT: {
        CONTACT_BUSINESS_ERROR: "Please select contact business type !",
        FRIST_NAME_ERROR: "Please enter frist name !",
        LAST_NAME_ERROR: "Please enter last name !",
        PHONE_NUMBER: "Please enter phone number !",
        EMAIL_ID_ERROR: "Please enter email ID !",
        TITLE_ERROR: "Please enter title!",
        CONTACT_TYPE_ERROR: "Please select contact type !",
        STATUS_ERROR: "Please select status !"
    },
    ADDRESS_DETAILS_CRM_CONTACT: {
        ADDRESS_ERROR: "Please enter address !",
        COUNTRY_ERROR: "Please select country !",
        STATE_ERROR: "Please select STATE !",
        DISTRICT_CITY_ERROR: "Please select district/city !",
        ZONE_ERROR: "Please select zone!",
    },
    CONVERSION_ERROR: {
        BRAND_ERROR: "Please select brand !",
        QUANTITY_ERROR: "Please enter quantity amount !",
        UNIT_ERROR: "Please select unit !",
        REMARK_ERROR: "Please select remarks !",
        CUSTOMER_ERROR: "Please select customer !",
        CONTACT_ERROR: "Please select contact !"
    },
    STOCK_UPDATE_ADD: {
        BRANDING_ITEM_ERROR: "Please Select Brand Type !",
        TYPE_ITEM_ERROR: "Please Select Item Type!",
        SIZE_SPECS_ITEM_ERROR: "Please Select Size Specs !",
        QUANTITY_NAME_ERROR: "Please Enter Quantity !",
        UNIT_ITEM_ERROR: "Please Select Unit !"
    },
    REGISTRATION: {
        BUSINESS_INFO: {
            YEAR_OF_ESTD: "Please select Year of Estd. !",
            LOCATION_ERROR: "Please enter location !",
            CAPACITY_ERROR: "Please enter Capacity !",
            APPLY_CREDIT_LIMIT: "please enter Applied Credit Limit !",
            ADVANCED_CREDIT_LIMIT: "please enter Advanced Credit Limit !",
            PRIMARY_ITEM: "please select Primary Item !",
            CONTACT_NUMBER: "please enter Contact Number !",
        }
    },
    MMS: {
        MEETING: {
            MEETING_TITLE: "Please enter meeting title !",
            MEETING_TYPE: "Please select meeting type !",
            MEETING_DESCRIPTION: "Please enter meeting description !",
            DISTRIBUTOR: "Please select Distributor !",
            MEETING_TIME: "Please select Time",
            DEALER: "Please select Dealer !",
            CITY: "Please enter time !",
            ATTENDEES: "Please select City !",
            ATTENDEES: "Please enter Probable attendees !",
        }
    },
    PERMISSION: {
        ACCESS_DENIED: "Access Denied !"
    },
    USER_WARNING: {
        ACTION_TO_LOGOUT_TITLE: "WARNING",
        ACTION_TO_LOGOUT_BODY: "For security reasons, we have disabled Back option. \n\n Are you sure you want to Logout?",
        ACTION_TO_WROING_USER: "You are not a valid user. \n\n Please login with a valid credential.",
        ROOT_DEVICE: "You can not use this application in a root device.",
        ENABLE_DEVELOPER_MODE: "You have to disable the develper mode."
    },
    CUSTOMER_LIST_DETAILS_WARING: {
        FEEDBACK_WARNING: "Please Add Feedback !",
        VISIT_NOTE_WARNING: "Please Add Visit Note !",
        STOCK_UPDATE_WARNING: "Please Add Stock Update !",
        VISIT_NOTE_AND_FEEDBACK_WARNING: "Please Add Feedback & Visit Note !",
        VISIT_NOTE_AND_STOCK_UPDATE_WARNING: "Please Add Stock Update & Visit Note !",
        FEEDBACK_AND_STOCK_UPDATE_WARNING: "Please Add Stock Update & Feedback !",
        FEEDBACK_STOCK_UPDATE_VISIT_NOTE_WARNING: "Please Add Stock Update & Feedback !",
    },

    EXPENSES: {
        STAY_EXPENSE: {
            EXPENSE_CATEGORY_ERR: "Please Select Expense Category !",
            HOTEL_TYPE_ERR:"Please Select Hotel Type !",
            ROOM_TYPE_ERR: "Please Select Room Type !",
            FROM_DATE_ERR: "Please Select CheckIn Date !",
            TO_DATE_ERR: "Please Select CheckOut Date !",
            ADDRESS_ERR: "Please Enter Address  !",
            ACTUAL_BILL_AMT_ERR: "Please Enter Actual Bill Amount !",
        },
        FOOD_EXPENSE:{
            FOOD_TYPE_ERR: "Please Select Food Type !",
            COST_ERR: "Please Enter Food Cost !",
        }
    },
    TRANSPORT_COST: {
        EXPENSE_CATAGORY_MODE: "Please select Expense Category !",
        TRANSPORT_MODE: "Please select Mode of Transport !",
        TRANSPORT_MODE_TYPE:"Please select Travel Type !",
        UNIT_MODE: "Please select Unit  !",
        APPROX_KM: "Please enter Approx Km !",
        COST: "Please enter Cost !",
        FOOD_MODE:"Please select food type !",
        OTHER:"Please select Other Type !"
    }


});