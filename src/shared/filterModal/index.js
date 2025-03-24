import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';
import DropdownInputBox from '../dropdown-input-box';
import CheckBox from '../check-box';
import BigTextButton from '../big-text-button';
import TextInputBox from '../text-input-box';
import { DataValidator } from '../../validators';
import DatePicker from 'react-native-date-picker';
import { DateConvert, GetUserData } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { enquirySourceModifyData, modifyBrandTypeArr, modifyCustomerTypeArr, modifyDistrictArrData, modifyEnquirySourceArrData, modifymeetingTypeArr, modifyPriorityData, modifyPriorityStatus, modifyStateArrData, modifyStatusData, modifySubordinateArr, modifyZoneArrData, orgModifyData, stateModifyData, zoneModifyData } from './function';
import { CommonData, ErrorCode } from '../../services/constant';
import { Loader } from '../loader'
import { DynamicLocationMapping } from '../../pageShared';

const allStatus = [
    {
        id: 1,
        name: "Hot",
    },
    {
        id: 2,
        name: "Warm",
    },
    {
        id: 3,
        name: "Cold",
    }
]

const activeInactiveAll = [
    {
        id: 1,
        name: "Active",
    },
    {
        id: 2,
        name: "Inactive",
    }
]

const allPriority = [
    {
        id: 1,
        name: "High",
    },
    {
        id: 2,
        name: "Medium",
    },
    {
        id: 3,
        name: "Low",
    }
]

const allLeadSource = [
    {
        id: 1,
        name: "Website",
    },
    {
        id: 2,
        name: "Facebook Campaign",
    },
    {
        id: 3,
        name: "Email",
    },
    {
        id: 4,
        name: "Linkedin",
    }
]

const pjpTypeArr = [

    {
        id: 1,
        name: "Planned",
    },
    {
        id: 2,
        name: "Expired",
    },

]

const allTaskCategory = [
    {
        id: 1,
        name: "F2F Meeting",
    },
    {
        id: 2,
        name: "Phone Call",
    },
    {
        id: 3,
        name: "E-Meet",
    },
    {
        id: 4,
        name: "Email",
    }
]

const enquiryStatusList = [
    {
        id: 1,
        name: "New",
    },
    {
        id: 2,
        name: "Assigned",
    },
    {
        id: 3,
        name: "Not Assigned",
    },
    {
        id: 4,
        name: "Approved",
    },
    {
        id: 5,
        name: "Not Approved",
    }
]

const approvedNotapprovedAll = [
    {
        id: 1,
        name: "Approved",
    },
    {
        id: 2,
        name: "Not Approved",
    }
]

const leadStages = [
    {
        id: 1,
        name: "Not Contacted",
    },
    {
        id: 2,
        name: "Attempt Contact",
    },
    {
        id: 3,
        name: "Contacted",
    },
    {
        id: 4,
        name: "Converted",
    }
]

const opportunityStages = [
    {
        id: 1,
        name: "Needs Analysis",
    },
    {
        id: 2,
        name: "Identify Decision Makers",
    },
    {
        id: 3,
        name: "Proposal",
    },
    {
        id: 4,
        name: "Negotiation",
    },
    {
        id: 5,
        name: "Closed",
    }
]

const mmsMeetingStatusArrData = [
    {
        id: "0",
        name: "Draft"
    },
    {
        id: "1",
        name: "Pending"
    },
    {
        id: "2",
        name: "Approved"
    },
    {
        id: "3",
        name: "Rejected"
    }
]

const recordTypeArr = [
    {
        id: "1",
        name: "Self"
    },
    {
        id: "2",
        name: "Sub-Ordinate"
    }
]

const periodTypeArr = [
    {
        id: "1",
        name: "Last Month"
    },
    {
        id: "2",
        name: "Last Quarter"
    }
]
const convertonStatusArr = [
    {
        id: "1",
        name: "Approved"
    },
    {
        id: "0",
        name: "Not Approved"
    }
]
const sfaEnquiryStatusArr = [
    {
        id: "1",
        name: "Upcoming"
    },
    {
        id: "2",
        name: "History"
    },

]

const enquiryVisitStatusArr = [
    {
        id: "0",
        name: "Not Visited"
    },
    {
        id: "1",
        name: "Visited"
    },

]

function FilterModal({
    modalPadding,
    isVisible,
    type,
    selectedDataObj,
    // fontFamily,
    // fontSize,
    // color,
    isHidden,
    isLoading,
    // onLogout,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    onApply,
    data,
    resetData,
    props
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [filterLoader, setFilterLoader] = useState(false);
    const [allData, setSelectedAllData] = useState({});
    const [subordinateLoader, setSubordinateLoader] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedLeadSource, setSelectedLeadSource] = useState({});
    const [selectedPriority, setSelectedPriority] = useState({});
    const [selectedTaskType, setSelectedTaskType] = useState({});
    const [name, setName] = useState("");
    const [nameActive, setNameActive] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");
    const [assignedToActive, setAssignedToActive] = useState(false);
    const [contactPerson, setContactPerson] = useState("");
    const [contactPersonActive, setcontactPersonActive] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [businessNameActive, setBusinessNameActive] = useState(false);
    const [email, setEmail] = useState("");
    const [emailActive, setEmailActive] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneActive, setPhoneActive] = useState(false);
    const [expectedRevenue, setExpectedRevenue] = useState("");
    const [expectedRevenueActive, setExpectedRevenueActive] = useState(false);
    const [selectedSalesStage, setSelectedSalesStage] = useState({});
    const [title, setTitle] = useState("");
    const [titleActive, setTitleActive] = useState(false);

    const [allContactType, setAllContactType] = useState([]);
    const [selectedContactType, setSelectedContactType] = useState({});

    const [allContactProjectType, setAllContactProjectType] = useState([]);
    const [selectedContactProjectType, setSelectedContactProjectType] = useState({});

    const [stateArr, setStateArr] = useState([]);
    const [selectedState, setStateData] = useState({});
    const [distArr, setDistArr] = useState([]);
    const [selectedDist, setDistData] = useState({});
    const [zoneArr, setZoneArr] = useState([]);
    const [selectedZone, setZoneData] = useState({});
    const [selectedBrandingStatus, setBrandingStatus] = useState({});
    const [selectedType, setCsrType] = useState({});
    const [dueDatePicker, setDueDatePicker] = useState(false);
    const [dueDateObj, setDueDateObj] = useState({ rawDate: new Date(), fromDate: "" });
    const [enrollmentDatePicker, setEnrollmentDatePicker] = useState(false);
    const [enrollmentDateObj, setEnrollmentDateObj] = useState({ rawDate: new Date(), fromDate: "" });

    const [fromDatePicker, setFromDatePicker] = useState(false);
    const [fromDateObj, setFromDateObj] = useState({ rawDate: new Date(), fromDate: "" });

    const [toDatePicker, setToDatePicker] = useState(false);
    const [toDateObj, setToDateObj] = useState({ rawDate: new Date(), toDate: "" });
    const [dateOfVisitDatePicker, setDateOfVisitDatePicker] = useState(false);
    const [dateOfVisitObj, setDateOfVisitObj] = useState({ rawDate: new Date(), date: "" });
    const [userTypeArr, setUserTypeArr] = useState([]);

    const [subordinateArr, setSubordinateArr] = useState([]);
    const [selectedSubordinateObj, setSelectedSubordinateObj] = useState({});

    const [organizationArr, setOrganizationArr] = useState([]);
    const [selectedOrganizationObj, setSelectedOrganizationObj] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [requitionDatePicker, setRequitionDatePicker] = useState(false);
    const [requitionDateObj, setRequitionDateObj] = useState({ rawDate: new Date(), date: "" });

    const [ascendingCheck, setAscendingCheck] = useState(false);
    const [descendingCheck, setDescendingCheck] = useState(false);

    const [selectedItemType, setItemType] = useState({});
    const [brandTypeArr, setBrandTypeArr] = useState([]);
    const [enquirieSourceArr, setenquiriesSourceArr] = useState([]);
    const [selectedenquirieSource, setenquirieSource] = useState({});

    const [leadStatusArr, setLeadStatusArr] = useState([]);
    const [selectedLeadStatusObj, setSelectedLeadStatusObj] = useState({});

    const [priorityArr, setPriorityArr] = useState([]);
    const [selectedPriorityObj, setSelectedPriorityObj] = useState({});
    const [expectedValueName, setexpectedValue] = useState("");
    const [expectedValueActive, setexpectedValueActive] = useState(false);
    const [opportunityStatusArr, setOpportunityStatusArr] = useState([]);
    const [selectedOpportunityStatusObj, setSelectedOpportunityStatusObj] = useState({});

    const [activeInactiveStatusArr, setActiveInactiveStatusArr] = useState(CommonData.COMMON.STATUS);
    const [selectedActiveInactiveStatusObj, setSelectedActiveInactiveStatusObj] = useState({});
    const [pjpType, setPjpType] = useState(pjpTypeArr);
    const [selectedPjpType, setSelectedPjpType] = useState({});
    const [selectedMeetingType, setMeetingType] = useState({});
    const [meetingTypeArr, setMeetingTypeArr] = useState([]);

    const [mmsMeetingStatusTypeObj, setMmsMeetingStatusType] = useState({});
    const [mmsMeetingStatusArr, setMmsMeetingStatusArr] = useState([]);
    const [recordType, setrecordType] = useState(recordTypeArr);
    const [selectedRecordType, setSelectedRecordType] = useState({ id: "1", name: "Self" });
    const [selectedSfaEnquiryStatus, setSelectedSfaEnquiryStatus] = useState({ id: "1", name: "Upcoming" });


    const [periodArrData, setPeriodArrData] = useState(periodTypeArr);
    const [periodTypeObj, setPeriodTypeObj] = useState({});
    const [conversionStatusArrData, setconversionStatusArrData] = useState(convertonStatusArr);
    const [conversionStatusObj, setConversionStatusObj] = useState({});


    const [leadOwner, setLeadOwner] = useState("");
    const [leadOwnerActive, setLeadOwnerActive] = useState(false);

    const [enquiryVisitTypeArr, setEnquiryVisitTypeArr] = useState(enquiryVisitStatusArr);

    const [enquiryVisitTypeObj, setEnquiryVisitTypeObj] = useState({});

    const [locationArr, setLocationArr] = useState([]);

    useEffect(() => {
        if (type == "myActivity" || type == "leaveList") {
            getSubordinateData();
        }
        if (type == "contact" || type == "pjpCreation" || type == "pjpCreationProject" || type == "visitedCustomer" || type == "pjpNotVisitList" || type == "enquiriesList" || type == "crmEnquiriesList" || type == "visitedCustomer") {
            getCustomerType();
            getCustomerTypeProject();
            getSubordinateData();
        }
        if (type == "branding" || type == "stockUpdateList") {
            getBrandTypeData();
        }
        if (type == "enquiriesList" || type == "crmEnquiriesList") {
            getLandingData();
            getPriorityDropdown();
            getSubordinateData();
        }
        if (type == "lead") {
            getExistingOrganization();
            getLeadStatus();
        }
        if (type == "organization") {
            getCustomerType();
            getExistingOrganization();
            // getStateData();
        }
        if (type == "task") {
            getPriorityDropdown();
        }
        if (type == "opportunity") {
            getOpportunityStatus();
        }
        if (type == "meetingList") {
            getMeetingTypeData()
        }
        if (type == "oderList") {
            getZoneData()
        }
        if (type == "attendance") {
            getStateData()
        }
        if (type == "allCustomerList") {
            getStateData()
            getCustomerType();
        }
        if (type == "VisitReport" || type == "attendance" || type == "odometerList") {
            getSubordinateData();
        }
        if (type == "allTargetList") {
            getCustomerType();
        }


    }, [])

    const getSubordinateData = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setSubordinateArr(modifySubordinateArr(responseData.data))
            }
            //  else {
            //     Toaster.ShortCenterToaster(responseData.message)
            // }
        }
        setFilterLoader(false);
    }

    const getOpportunityStatus = async () => {
        let mstPriorityStatusResponse = await MiddlewareCheck("mstNatureList", { type: 2 }, props);

        if (mstPriorityStatusResponse === false) {
        } else {
            if (mstPriorityStatusResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setOpportunityStatusArr(modifyPriorityStatus(mstPriorityStatusResponse.response))
            }
            //   else {
            //     Toaster.ShortCenterToaster(mstPriorityStatusResponse.message);
            //   }
        }
    }

    const getMeetingTypeData = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getMeetingTypLists", {}, props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setMeetingTypeArr(modifymeetingTypeArr(responseData.data))
            }
        }
        setFilterLoader(false)
    }

    const getExistingOrganization = async () => {
        setFilterLoader(true);
        let responseDataOrg = await MiddlewareCheck("getExistingOrganization", {}, props);
        if (responseDataOrg === false) {
        } else {
            if (responseDataOrg.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setOrganizationArr(orgModifyData(responseDataOrg.response))
            }
        }
        setFilterLoader(false)
    }

    const getLeadStatus = async () => {
        let responseData = await MiddlewareCheck("getLeadStatus", { type: "1" }, props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setLeadStatusArr(modifyStatusData(responseData.response))
            }
        }
    }

    const getPriorityDropdown = async () => {
        let responseData = await MiddlewareCheck("getPriorityDropdown", {}, props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setPriorityArr(modifyPriorityData(responseData.response))
            }
        }
    }

    const getCustomerType = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getContactTypes_v2", { isProject: "1" }, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setAllContactType(modifyCustomerTypeArr(responseData.response))
            }
        }
        setFilterLoader(false)
    }

    const getCustomerTypeProject = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getContactTypes_v2", { isProject: "1" }, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setAllContactProjectType(modifyCustomerTypeArr(responseData.response))
            }
        }
        setFilterLoader(false)
    }

    const getBrandTypeData = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getProductCategory", {}, props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setBrandTypeArr(modifyBrandTypeArr(responseData.data))
            }
        }
        setFilterLoader(false)
    }

    const getLandingData = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getEnquiryLandingData", {}, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                setenquiriesSourceArr(modifyEnquirySourceArrData(enquirySourceData.enquirySourceList))

            }
        }
        setFilterLoader(false)
    }

    const getStateData = async () => {
        setFilterLoader(true);
        let userData = await GetUserData.getAllUserData();
        let reqData = {
            countryId: userData.countryId
        }

        let responseData = await MiddlewareCheck("getaStateData", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                setStateArr(modifyStateArrData(stateData.stateList))
            }
        }
        setFilterLoader(false);
    }
    const getDistrictData = async (value) => {
        let reqData = {
            stateId: value.id
        }
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = modifyDistrictArrData(responseData.response);
                setDistArr(districtData);
            }
        }
    }
    const getZoneData = async (distId) => {
        setFilterLoader(true);
        let userData = await GetUserData.getAllUserData();
        let reqData = {
            cityId: userData.districtId
        }
        let responseData = await MiddlewareCheck("getaZoneData", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                setZoneArr(modifyZoneArrData(zoneData.zoneList))
            }
        }
        setFilterLoader(false);
    }

    const getZoneDataForDist = async (value) => {
        setFilterLoader(true);
        let reqData = {
            cityId: value.id
        }
        let responseData = await MiddlewareCheck("getaZoneData", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                setZoneArr(modifyZoneArrData(zoneData.zoneList))
            }
        }
        setFilterLoader(false);
    }

    const _onClose = () => {
        onCloseModal();


    }

    // const _onLogout = () => {
    //     onLogout();
    // }

    const onRequestCloseModal = () => {
        // onRequestClose();
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const onApplyPress = () => {
        let filterData = {};
        if (type == "visitedCustomer") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["selectedRecordType"] = selectedRecordType;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;


        } else if (type == "myActivity") {
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;

        } else if (type == "contact") {
            filterData["name"] = name;
            filterData["phone"] = phone;
            filterData["email"] = name;
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["selectedStatusObj"] = selectedActiveInactiveStatusObj;

        } else if (type == "pjpCreation") {
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["phone"] = phone;

        } else if (type == "pjpCreationProject") {
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["phone"] = phone;

        } else if (type == "pjpNotVisitList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["selectedType"] = selectedPjpType;
            filterData["selectedRecordType"] = selectedRecordType;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;

        } else if (type == "branding") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedStatusObj"] = selectedBrandingStatus;
            filterData["selectedItemTypeObj"] = selectedItemType;

        } else if (type == "stockUpdateList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedItemTypeObj"] = selectedItemType;
        }
        else if (type == "enquiriesList") {
            filterData["selectedContactTypeObj"] = selectedContactType;
            filterData["selectedEnquiriesObj"] = selectedenquirieSource;
            filterData["phone"] = phone;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;
            filterData["selectedRecordType"] = selectedRecordType;
            filterData["selectedStatus"] = selectedSfaEnquiryStatus;
        }
        else if (type == "crmEnquiriesList") {
            filterData["selectedEnquiryTypeObj"] = selectedContactType;
            filterData["selectedEnquiriesObj"] = selectedenquirieSource;
            filterData["ownerPhone"] = phone;
            filterData["ownerEmail"] = email;
            filterData["ownerName"] = name;
            filterData["businessName"] = businessName;
        }
        else if (type == "visitNotesList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
        }
        else if (type == "odometerList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;
            filterData["selectedRecordType"] = selectedRecordType;
        }
        else if (type == "attendance") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["locationArr"] = locationArr;
            // filterData["stateObj"] = selectedState;
            // filterData["distObj"] = selectedDist;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;
            filterData["selectedRecordType"] = selectedRecordType;
        }
        else if (type == "lead") {
            filterData["selectedName"] = name;
            filterData["selectedOrganizationObj"] = selectedOrganizationObj;
            filterData["phone"] = phone;
            filterData["email"] = email;
            filterData["title"] = title;
            filterData["status"] = selectedLeadStatusObj;
        }
        else if (type == "organization") {
            filterData["selectedName"] = selectedOrganizationObj;
            filterData["ownerName"] = name;
            filterData["contactType"] = selectedContactType;
            filterData["phone"] = phone;
            filterData["selectedStatusObj"] = selectedActiveInactiveStatusObj;

        }
        else if (type == "task") {
            filterData["taskName"] = name;
            filterData["assignedTo"] = assignedTo;
            filterData["contactPerson"] = contactPerson;
            filterData["phone"] = phone;
            filterData["priorityStatus"] = selectedPriorityObj;
        }
        else if (type == "opportunity") {
            filterData["name"] = name;
            filterData["phone"] = phone;
            filterData["expectedValue"] = expectedValueName;
            filterData["contactPerson"] = contactPerson;
            filterData["selectedOrganizationObj"] = selectedOrganizationObj;
            filterData["selectedStatusObj"] = selectedOpportunityStatusObj;
        }
        else if (type == "leaveList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;
        }
        else if (type == "meetingList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedMeetingTypeObj"] = selectedMeetingType
        }
        else if (type == "userBranding") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
        }
        else if (type == "mmsMeetingList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["status"] = mmsMeetingStatusTypeObj;
        }
        else if (type == "oderList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["zoneObj"] = selectedZone;
        }
        else if (type == "conversionHistory") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["periodObj"] = periodTypeObj;
            filterData["status"] = conversionStatusObj;
        }
        else if (type == "allCustomerList") {
            // filterData["stateObj"] = selectedState;
            // filterData["districtObj"] = selectedDist;
            // filterData["zoneObj"] = selectedZone;
            filterData["locationArr"] = locationArr;
            filterData["selectedContactTypeObj"] = selectedContactType;
        }
        else if (type == "allTargetList") {
            // filterData["stateObj"] = selectedState;
            // filterData["districtObj"] = selectedDist;
            // filterData["zoneObj"] = selectedZone;
            filterData["locationArr"] = locationArr;
            filterData["selectedContactTypeObj"] = selectedContactType;
        }

        else if (type == "VisitReport") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedSubordinateObj"] = selectedSubordinateObj;
            filterData["selectedRecordType"] = selectedRecordType;
        }
        else if (type == "approveCustomerList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
        }
        else if (type == "sfaEnquiriesActivitiesList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["visitStatus"] = enquiryVisitTypeObj;
            filterData["leadOwner"] = leadOwner;
        }
        onApply(filterData);
    }

    const _onResetAllStateData = () => {
        setSelectedStatus({});
        setSelectedContactType({});
        setItemType({});
        setBrandingStatus({});
        setPhone("");
        setenquirieSource({});
        setFromDateObj({
            rawDate: new Date(),
            fromDate: ""
        });
        setToDateObj({
            rawDate: new Date(),
            toDate: ""
        });
        setName("");
        setEmail("");
        setSelectedOrganizationObj({});
        setenquirieSource({});
        setBusinessName("");
        setSelectedLeadStatusObj({});
        setTitle("");
        setStateData({});
        setSelectedPriorityObj({});
        setexpectedValue("");
        setSelectedOpportunityStatusObj({});
        setSelectedActiveInactiveStatusObj({});
        setSelectedPjpType({});
        setMeetingType({});
        setMmsMeetingStatusType({});
        setSelectedRecordType({ id: "1", name: "Self" });
        setZoneData({});
        setPeriodTypeObj({ id: "1", name: "Last Month" });
        setConversionStatusObj({});
        setDistArr([]);
        setDistData({});
        setSelectedSubordinateObj({})
        setLeadOwner(""),
            setEnquiryVisitTypeObj({}),
            setLocationArr([])
    }

    // for reset
    const onReset = () => {
        _onClose();
        _onResetAllStateData();
        resetData();
    }

    const statusSection = () => {
        const _onSelectStatus = (value) => {
            setSelectedStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedStatus.id ? selectedStatus.id.toString() : ""}
                    data={allStatus}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const opportunityStatusSection = () => {
        const _onSelectStatus = (value) => {
            setSelectedOpportunityStatusObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedOpportunityStatusObj.id ? selectedOpportunityStatusObj.id.toString() : ""}
                    data={opportunityStatusArr}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const conversionStatusSection = () => {
        const _onSelectStatus = (value) => {
            setConversionStatusObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={conversionStatusObj.id ? conversionStatusObj.id.toString() : ""}
                    data={conversionStatusArrData}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const statusSectionForActiveInactive = () => {
        const _onSelectStatus = (value) => {
            setSelectedActiveInactiveStatusObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedActiveInactiveStatusObj.id ? selectedActiveInactiveStatusObj.id.toString() : ""}
                    data={activeInactiveStatusArr}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const leadSourceSection = () => {
        const _onSelectLeadSource = (value) => {
            setSelectedLeadSource(value);
            selectedDataObj = {}
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Source</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedLeadSource.id ? selectedLeadSource.id.toString() : ""}
                    data={allLeadSource}
                    onSelect={(value) => _onSelectLeadSource(value)}
                    headerText={"Source"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const leadStatusSection = () => {
        const _onSelectLeadStatus = (value) => {
            setSelectedLeadStatusObj(value);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedLeadStatusObj.id ? selectedLeadStatusObj.id.toString() : ""}
                    data={leadStatusArr}
                    onSelect={(value) => _onSelectLeadStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const organizationDropdownSection = () => {
        const _onSelectOrganization = (value) => {
            setSelectedOrganizationObj(value);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Organization</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedOrganizationObj.id ? selectedOrganizationObj.id.toString() : ""}
                    data={organizationArr}
                    onSelect={(value) => _onSelectOrganization(value)}
                    headerText={"Organization"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const prioritySection = () => {
        const _onSelectPriority = (value) => {
            setSelectedPriorityObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Priority</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedPriorityObj.id ? selectedPriorityObj.id.toString() : ""}
                    data={priorityArr}
                    onSelect={(value) => _onSelectPriority(value)}
                    headerText={"Priority"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const taskTypeSection = () => {
        const _onSelectTaskType = (value) => {
            setSelectedTaskType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Task Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedTaskType.id ? selectedTaskType.id.toString() : ""}
                    data={allTaskCategory}
                    onSelect={(value) => _onSelectTaskType(value)}
                    headerText={"Task Category"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const checkBoxAscSection = () => {
        const onCheck = () => {
            setAscendingCheck(!ascendingCheck)
            setDescendingCheck(false)
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    type={"select"}
                    borderRadius={15}
                    data={ascendingCheck}
                    onClickValue={() => onCheck()}
                />
                <View style={{ width: 10 }} />
                <Text style={styles.labelText}>Ascending</Text>
            </View>
        )
    }

    const expRevenueSection = () => {
        const changeExpRevenue = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "mobile")
            setExpectedRevenue(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Expected Revenue</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Expected Revenue"}
                    value={expectedRevenue}
                    height={45}
                    onChangeText={(value) => changeExpRevenue(value)}
                    keyboardType="numeric"
                    isActive={expectedRevenueActive}
                    onFocus={() => {
                        setExpectedRevenueActive(true)
                    }}
                    onBlur={() => {
                        setExpectedRevenueActive(false)
                    }}
                />
            </View>
        )
    }

    const nameSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setName(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Name</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Name"}
                    value={name}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={nameActive}
                    onFocus={() => {
                        setNameActive(true)
                    }}
                    onBlur={() => {
                        setNameActive(false)
                    }}
                />
            </View>
        )
    }

    const titleSection = () => {
        const changeTitle = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setTitle(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Title</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Title"}
                    value={title}
                    height={45}
                    onChangeText={(value) => changeTitle(value)}
                    keyboardType="default"
                    isActive={titleActive}
                    onFocus={() => {
                        setTitleActive(true)
                    }}
                    onBlur={() => {
                        setTitleActive(false)
                    }}
                />
            </View>
        )
    }
    const ownerNameSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setName(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Owner Name</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Owner Name"}
                    value={name}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={nameActive}
                    onFocus={() => {
                        setNameActive(true)
                    }}
                    onBlur={() => {
                        setNameActive(false)
                    }}
                />
            </View>
        )
    }
    const phoneSection = () => {
        const changePhone = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "mobile")
            setPhone(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Phone</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Phone"}
                    value={phone}
                    height={45}
                    onChangeText={(value) => changePhone(value)}
                    keyboardType="numeric"
                    isActive={phoneActive}
                    onFocus={() => {
                        setPhoneActive(true)
                    }}
                    onBlur={() => {
                        setPhoneActive(false)
                    }}
                    maxLength={10}
                />
            </View>
        )
    }
    const ownerPhoneSection = () => {
        const changePhone = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "mobile")
            setPhone(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Owner Phone</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Owner Phone"}
                    value={phone}
                    height={45}
                    onChangeText={(value) => changePhone(value)}
                    keyboardType="numeric"
                    isActive={phoneActive}
                    onFocus={() => {
                        setPhoneActive(true)
                    }}
                    onBlur={() => {
                        setPhoneActive(false)
                    }}
                    maxLength={10}
                />
            </View>
        )
    }
    const emailSection = () => {
        const changeEmail = (value) => {
            setEmail(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Email</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Email"}
                    value={email}
                    height={45}
                    onChangeText={(value) => changeEmail(value)}
                    keyboardType="default"
                    isActive={emailActive}
                    onFocus={() => {
                        setEmailActive(true)
                    }}
                    onBlur={() => {
                        setEmailActive(false)
                    }}
                />
            </View>
        )
    }
    const ownerEmailSection = () => {
        const changeEmail = (value) => {
            setEmail(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Owner Email</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Owner Email"}
                    value={email}
                    height={45}
                    onChangeText={(value) => changeEmail(value)}
                    keyboardType="default"
                    isActive={emailActive}
                    onFocus={() => {
                        setEmailActive(true)
                    }}
                    onBlur={() => {
                        setEmailActive(false)
                    }}
                />
            </View>
        )
    }
    const businessNameSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setBusinessName(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Business Name</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Business Name"}
                    value={businessName}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={businessNameActive}
                    onFocus={() => {
                        setBusinessNameActive(true)
                    }}
                    onBlur={() => {
                        setBusinessNameActive(false)
                    }}
                />
            </View>
        )
    }

    const assignedToSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setAssignedTo(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Assigned To</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Assigned To"}
                    value={assignedTo}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={assignedToActive}
                    onFocus={() => {
                        setAssignedToActive(true)
                    }}
                    onBlur={() => {
                        setAssignedToActive(false)
                    }}
                />
            </View>
        )
    }

    const contactPersonSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setContactPerson(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Contact Person</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Contact Person"}
                    value={contactPerson}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={contactPersonActive}
                    onFocus={() => {
                        setcontactPersonActive(true)
                    }}
                    onBlur={() => {
                        setcontactPersonActive(false)
                    }}
                />
            </View>
        )
    }
    const checkBoxDescSection = () => {
        const onCheck = () => {
            setDescendingCheck(!descendingCheck)
            setAscendingCheck(false)
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    type={"select"}
                    borderRadius={15}
                    data={descendingCheck}
                    onClickValue={() => onCheck()}
                />
                <View style={{ width: 10 }} />
                <Text style={styles.labelText}>Descending</Text>
            </View>
        )
    }

    const leadStageSection = () => {
        const _onSelectSalesStage = (value) => {
            setSelectedSalesStage(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Lead Stage</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedSalesStage.id ? selectedSalesStage.id.toString() : ""}
                    data={leadStages}
                    onSelect={(value) => _onSelectSalesStage(value)}
                    headerText={"Lead Stage"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const opportunityStageSection = () => {
        const _onSelectSalesStage = (value) => {
            setSelectedSalesStage(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Opportunity Stage</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedSalesStage.id ? selectedSalesStage.id.toString() : ""}
                    data={opportunityStages}
                    onSelect={(value) => _onSelectSalesStage(value)}
                    headerText={"Opportunity Stage"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const contactTypeSection = () => {
        const _onSelectContactType = (value) => {
            setSelectedContactType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Contact Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedContactType.id ? selectedContactType.id.toString() : ""}
                    data={allContactType}
                    onSelect={(value) => _onSelectContactType(value)}
                    headerText={"Contact Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const sfaStatusType = () => {
        const _onSelectStatusType = (value) => {
            setSelectedSfaEnquiryStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedSfaEnquiryStatus.id ? selectedSfaEnquiryStatus.id.toString() : "1"}
                    data={sfaEnquiryStatusArr}
                    onSelect={(value) => _onSelectStatusType(value)}
                    headerText={"Status"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    const contactTypePojectSection = () => {
        const _onSelectContactType = (value) => {
            setSelectedContactProjectType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Contact Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedContactProjectType.id ? selectedContactProjectType.id.toString() : ""}
                    data={allContactProjectType}
                    onSelect={(value) => _onSelectContactType(value)}
                    headerText={"Contact Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const enquiryTypeSection = () => {
        const _onSelectContactType = (value) => {
            setSelectedContactType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Contact Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedContactType.id ? selectedContactType.id.toString() : ""}
                    data={allContactType}
                    onSelect={(value) => _onSelectContactType(value)}
                    headerText={"Enquiry Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    // branding itemType Filter
    const itemType = () => {
        const _onItemType = (value) => {
            setItemType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Item Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedItemType.id ? selectedItemType.id.toString() : ""}
                    data={brandTypeArr}
                    onSelect={(value) => _onItemType(value)}
                    headerText={"Item Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const enquiriType = () => {
        const _onEnquireSource = (value) => {
            setenquirieSource(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Enquire Source</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedenquirieSource.id ? selectedenquirieSource.id.toString() : ""}
                    data={enquirieSourceArr}
                    onSelect={(value) => _onEnquireSource(value)}
                    headerText={"Enquire Source"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const statusSectionForEnquiry = () => {
        const _onSelectStatus = (value) => {
            setSelectedStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedStatus.id ? selectedStatus.id.toString() : ""}
                    data={enquiryStatusList}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const stateSection = () => {
        const _onSelectState = async (value) => {
            if (selectedState.id && (selectedState.id == value.id)) {

            } else {
                setDistData({});
                setDistArr([]);
                setStateData(value)
                getDistrictData(value);
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>State</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedState.id ? selectedState.id.toString() : ""}
                    data={stateArr}
                    onSelect={(value) => _onSelectState(value)}
                    headerText={"State"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const distSection = () => {
        const _onSelectDist = (value) => {
            setDistData(value);
            getZoneDataForDist(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>District</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedDist.id ? selectedDist.id.toString() : ""}
                    data={distArr}
                    onSelect={(value) => _onSelectDist(value)}
                    headerText={"District"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const zoneSection = () => {
        const _onSelectZone = (value) => {
            setZoneData(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Zone</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedZone.id ? selectedZone.id.toString() : ""}
                    data={zoneArr}
                    onSelect={(value) => _onSelectZone(value)}
                    headerText={"Zone"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }



    const brandingStatus = () => {
        const _onBrandingStatus = (value) => {
            setBrandingStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedBrandingStatus.id ? selectedBrandingStatus.id.toString() : ""}
                    data={approvedNotapprovedAll}
                    onSelect={(value) => _onBrandingStatus(value)}
                    headerText={"Status"}
                />
            </View>
        )
    }

    const csrType = () => {
        const _onCsrType = (value) => {
            setCsrType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Item Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedType.id ? selectedType.id.toString() : ""}
                    data={approvedNotapprovedAll}
                    onSelect={(value) => _onCsrType(value)}
                    headerText={"Type"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const enrollmentDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setEnrollmentDatePicker(!enrollmentDatePicker);
        }
        const onSelectDate = (date) => {
            setEnrollmentDateObj({
                fromDate: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Enrollment Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{enrollmentDateObj.fromDate.length == 0 ? "Select Date" : enrollmentDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={enrollmentDatePicker}
                    date={enrollmentDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const dueDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setDueDatePicker(!dueDatePicker);
        }
        const onSelectDate = (date) => {
            setDueDateObj({
                fromDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Due Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{dueDateObj.fromDate.length == 0 ? "Select Date" : dueDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={dueDatePicker}
                    date={dueDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const fromDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setFromDatePicker(true);
        }
        const onClosedatePicker = () => {
            setFromDatePicker(false);
        }

        const onSelectDate = (date) => {
            setFromDateObj({
                fromDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onClosedatePicker();
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>From Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={[styles.inputBoxStyle, , { borderRadius: type == "mmsMeetingList" ? 25 : 10 }]} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{fromDateObj.fromDate.length == 0 ? "Select Date" : fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={fromDatePicker}
                    date={fromDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onClosedatePicker()
                    }}
                />
            </View>
        )
    }
    const dateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setFromDatePicker(!fromDatePicker);
        }
        const onSelectDate = (date) => {
            setFromDateObj({
                fromDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{fromDateObj.fromDate.length == 0 ? "Select Date" : fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={fromDatePicker}
                    date={fromDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const subordinateSection = () => {
        const _onSubordinateChange = (value) => {
            setSelectedSubordinateObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Subordinate</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    isSearchable={true}
                    selectedValue={selectedSubordinateObj.id ? selectedSubordinateObj.id.toString() : ""}
                    data={subordinateArr}
                    onSelect={(value) => _onSubordinateChange(value)}
                    headerText={"SubOrdinate"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />

            </View>
        )
    }

    const toDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setToDatePicker(true);
        }
        const onToClosedatePicker = () => {
            setToDatePicker(false);
        }
        const onSelectDate = (date) => {
            setToDateObj({
                toDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onToClosedatePicker();
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>To Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={[styles.inputBoxStyle, { borderRadius: type == "mmsMeetingList" ? 25 : 10 }]} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{toDateObj.toDate.length == 0 ? "Select Date" : toDateObj.toDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={toDatePicker}
                    date={toDateObj.rawDate}
                    mode={"date"}
                    minimumDate={fromDateObj.rawDate}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onToClosedatePicker()
                    }}

                />
            </View>
        )
    }

    const dateOfVisitSection = () => {
        const onOpenAndClosedatePicker = () => {
            setDateOfVisitDatePicker(!dateOfVisitDatePicker);
        }
        const onSelectDate = (date) => {
            setDateOfVisitObj({
                date: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Visit Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{dateOfVisitObj.date.length == 0 ? "Select Date" : dateOfVisitObj.date}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={dateOfVisitDatePicker}
                    date={dateOfVisitObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const userTypeSection = () => {
        const _onUserType = (value) => {
            setSelectedUser(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>User Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedUser.id ? selectedUser.id.toString() : ""}
                    data={userTypeArr}
                    onSelect={(value) => _onUserType(value)}
                    headerText={"User Type"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const requitionDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setRequitionDatePicker(!requitionDatePicker);
        }
        const onSelectDate = (date) => {
            setRequitionDateObj({
                date: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Requition Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{requitionDateObj.date.length == 0 ? "Select Date" : requitionDateObj.date}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={requitionDatePicker}
                    date={requitionDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const pjpCreationContact = () => {
        const _onBrandingStatus = (value) => {
            setBrandingStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedBrandingStatus.id ? selectedBrandingStatus.id.toString() : ""}
                    data={approvedNotapprovedAll}
                    onSelect={(value) => _onBrandingStatus(value)}
                    headerText={"Status"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const expectedValue = () => {
        const expectValue = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "number")
            setexpectedValue(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Expected Value</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Expected Value"}
                    value={expectedValueName}
                    height={45}
                    onChangeText={(value) => expectValue(value)}
                    keyboardType="default"
                    isActive={expectedValueActive}
                    onFocus={() => {
                        setexpectedValueActive(true)
                    }}
                    onBlur={() => {
                        setexpectedValueActive(false)
                    }}
                />
            </View>
        )
    }

    const pjpTypeSection = () => {
        const _onPjpTypeChange = (value) => {
            setSelectedPjpType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedPjpType.id ? selectedPjpType.id.toString() : ""}
                    data={pjpType}
                    onSelect={(value) => _onPjpTypeChange(value)}
                    headerText={"Status"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }
    const recordTypeSection = () => {
        const _onRecordTypeChange = (value) => {
            setSelectedRecordType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Record Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedRecordType.id ? selectedRecordType.id.toString() : "1"}
                    data={recordType}
                    onSelect={(value) => _onRecordTypeChange(value)}
                    headerText={"Record Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const meetingType = () => {
        const _onMeetingType = (value) => {
            setMeetingType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Meeting Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedMeetingType.id ? selectedMeetingType.id.toString() : ""}
                    data={meetingTypeArr}
                    onSelect={(value) => _onMeetingType(value)}
                    headerText={"Meeting Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    const leadOwnerSection = () => {
        const expectValue = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "alphanumeric")
            setLeadOwner(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Lead Owner</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Assigned To"}
                    value={leadOwner}
                    height={45}
                    onChangeText={(value) => expectValue(value)}
                    keyboardType="default"
                    isActive={leadOwnerActive}
                    onFocus={() => {
                        setLeadOwnerActive(true)
                    }}
                    onBlur={() => {
                        setLeadOwnerActive(false)
                    }}
                />
            </View>
        )
    }

    const enquiryVisitStatusSection = () => {
        const _onStatusType = (value) => {
            setEnquiryVisitTypeObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={enquiryVisitTypeObj.id ? enquiryVisitTypeObj.id.toString() : ""}
                    data={enquiryVisitTypeArr}
                    onSelect={(value) => _onStatusType(value)}
                    headerText={"Status"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const mmsMeetingStatusSecton = () => {
        const _onMeetingType = (value) => {
            setMmsMeetingStatusType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={mmsMeetingStatusTypeObj.id ? mmsMeetingStatusTypeObj.id.toString() : ""}
                    data={mmsMeetingStatusArrData}
                    onSelect={(value) => _onMeetingType(value)}
                    headerText={"Status"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    borderRadius={25}
                />
            </View>
        )
    }

    const timePeriodSection = () => {
        const _onPeriodType = (value) => {
            setPeriodTypeObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Time Period</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={periodTypeObj.id ? periodTypeObj.id.toString() : "1"}
                    data={periodArrData}
                    onSelect={(value) => _onPeriodType(value)}
                    headerText={"Time Period"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                // borderRadius={25}
                />
            </View>
        )
    }

    const onSelectLocationData = (val) => {
        setFilterLoader(true);
        setLocationArr(val.value)
        setFilterLoader(false);
    }

    const mainFilterSection = () => {
        return (
            <>
                {type == "task" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {nameSection()}
                                    <View style={{ width: 5 }} />
                                    {assignedToSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {contactPersonSection()}
                                    <View style={{ width: 5 }} />
                                    {phoneSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {prioritySection()}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }

                {type == "lead" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {nameSection()}
                            <View style={{ width: 5 }} />
                            {organizationDropdownSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {titleSection()}
                            <View style={{ width: 5 }} />
                            {phoneSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {emailSection()}
                            <View style={{ width: 5 }} />
                            {leadStatusSection()}
                        </View>
                    </>
                    :
                    null
                }

                {type == "opportunity" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {nameSection()}
                            <View style={{ width: 5 }} />
                            {expectedValue()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {phoneSection()}
                            <View style={{ width: 5 }} />
                            {contactPersonSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {organizationDropdownSection()}
                            <View style={{ width: 5 }} />
                            {opportunityStatusSection()}
                        </View>
                    </>
                    :
                    null
                }
                {type == "contact" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {nameSection()}
                                    <View style={{ width: 5 }} />
                                    {phoneSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {emailSection()}
                                    <View style={{ width: 5 }} />
                                    {contactTypeSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {statusSectionForActiveInactive()}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "enquiry" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {leadSourceSection()}
                            <View style={{ width: 5 }} />
                            {contactTypeSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {statusSectionForEnquiry()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {type == "organization" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {organizationDropdownSection()}
                                    <View style={{ width: 5 }} />
                                    {ownerNameSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {contactTypeSection()}
                                    <View style={{ width: 5 }} />
                                    {/* {stateSection()} */}
                                    {phoneSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {statusSectionForActiveInactive()}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "branding" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {brandingStatus()}
                            <View style={{ width: 5 }} />
                            {filterLoader ?
                                <View style={styles.pageLoaderViewStyle}>
                                    <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                </View>
                                :
                                <>
                                    {itemType()}
                                </>
                            }
                        </View>
                        {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {requitionDateSection()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View> */}
                    </>
                    :
                    null
                }

                {type == "csr" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {csrType()}
                            <View style={{ width: 5 }} />
                            {dateOfVisitSection()}
                        </View>
                    </>
                    :
                    null
                }
                {type == "attendance" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {stateSection()}
                            <View style={{ width: 5 }} />
                            {distSection()}
                        </View> */}


                        <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 15 }}>
                            <View style={{ flex: 0.5 }} >
                                {(recordTypeSection())}
                            </View>
                            <View style={{ width: 5 }} />
                            {/* <View style={{ flex: 0.5, marginTop: 2 }}>

                            </View> */}
                            <View style={{ flex: 0.5 }} >
                                <View style={{ marginTop: 5 }}>
                                    <DynamicLocationMapping
                                        type={"lastHierarcyField"}
                                        flexDirection={"column"}
                                        marginBottom={10}
                                        viewType={"add"}
                                        isLabelVisible={true}
                                        onApiCallData={(value) => onSelectLocationData(value)}
                                    />
                                </View>

                            </View>

                            {/* {subordinateSection()} */}
                        </View>
                        <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 15 }}>
                            <View style={{ flex: 0.5 }} >
                                {selectedRecordType.id == "1" ? null : subordinateSection()}
                            </View>
                        </View>

                    </>
                    :
                    null
                }
                {type == "sfapjp" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {contactTypeSection()}
                            <View style={{ width: 5 }} />
                            {dateOfVisitSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                    </>
                    :
                    null
                }
                {type == "sfavisitcustomer" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {dateOfVisitSection()}
                            <View style={{ width: 5 }} />
                            {userTypeSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {statusSectionForActiveInactive()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {type == "sfavisitinfluencer" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {dateOfVisitSection()}
                            <View style={{ width: 5 }} />
                            {userTypeSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {statusSectionForActiveInactive()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {type == "sfavisittarget" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {dateOfVisitSection()}
                            <View style={{ width: 5 }} />
                            {userTypeSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {statusSectionForActiveInactive()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {
                    type == "visitedCustomer" ?
                        <>
                            <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                {fromDateSection()}
                                <View style={{ width: 5 }} />
                                {toDateSection()}
                            </View>
                            {filterLoader ?
                                <View style={styles.pageLoaderViewStyle}>
                                    <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                </View>
                                :
                                <>
                                    <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                        {contactTypeSection()}
                                        <View style={{ width: 5 }} />
                                        {recordTypeSection()}
                                    </View>
                                    <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }} >
                                        <View style={{ flex: 1 }} >
                                            {selectedRecordType.id == "1" ? null : subordinateSection()}
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>
                                </>


                            }
                        </>
                        :
                        null
                }
                {
                    type == "myActivity" ?
                        <>
                            <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                {filterLoader ? <>
                                    <View style={styles.pageLoaderViewStyle}>
                                        <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                    </View>
                                </> : <>
                                    {subordinateSection()}
                                </>}

                                {/* <View style={{ width: 5 }} />
                                {toDateSection()} */}
                            </View>
                        </>
                        :
                        null
                }
                {type == "pjpCreation" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                {contactTypeSection()}
                                <View style={{ width: 5 }} />
                                {phoneSection()}
                            </View>
                        }
                    </>
                    :
                    null
                }
                {type == "pjpCreationProject" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                {contactTypePojectSection()}
                                <View style={{ width: 5 }} />
                                {phoneSection()}
                            </View>
                        }
                    </>
                    :
                    null
                }
                {type == "pjpNotVisitList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(contactTypeSection())}
                                    <View style={{ width: 5 }} />
                                    {pjpTypeSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 0.5 }} >
                                        {(recordTypeSection())}
                                    </View>
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 0.5 }} >
                                        {selectedRecordType.id == "1" ? null : subordinateSection()}
                                    </View>
                                    {/* {subordinateSection()} */}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "stockUpdateList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(itemType())}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "enquiriesList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {contactTypeSection()}
                                    <View style={{ width: 5 }} />
                                    {enquiriType()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(phoneSection())}
                                    <View style={{ width: 5 }} />
                                    {sfaStatusType()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 0.5 }} >
                                        {(recordTypeSection())}
                                    </View>
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 0.5 }} >
                                        {selectedRecordType.id == "1" ? null : subordinateSection()}
                                    </View>
                                    {/* {subordinateSection()} */}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }

                {type == "crmEnquiriesList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {enquiryTypeSection()}
                                    <View style={{ width: 5 }} />
                                    {enquiriType()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(ownerNameSection())}
                                    <View style={{ width: 5 }} />
                                    {ownerPhoneSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(ownerEmailSection())}
                                    <View style={{ width: 5 }} />
                                    {businessNameSection()}
                                </View>
                                {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {(prioritySection())}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View> */}
                            </>
                        }
                    </>
                    :
                    null
                }


                {type == "visitNotesList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>

                            </>
                        }
                    </>
                    :
                    null
                }

                {type == "odometerList" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            <View style={{ flex: 0.5 }} >
                                {(recordTypeSection())}
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.5 }} >
                                {selectedRecordType.id == "1" ? null : subordinateSection()}
                            </View>
                            {/* {subordinateSection()} */}
                        </View>
                    </>
                    :
                    null
                }
                {type == "leaveList" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {subordinateSection()}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {type == "meetingList" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {(meetingType())}
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </>
                    :
                    null
                }
                {type == "userBranding" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                    </>
                    :
                    null
                }
                {type == "mmsMeetingList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {mmsMeetingStatusSecton()}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "oderList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {zoneSection()}
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 1 }} />
                                </View> */}
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "conversionHistory" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {timePeriodSection()}
                                    <View style={{ width: 5 }} />
                                    {conversionStatusSection()}
                                    {/* <View style={{ flex: 1 }} /> */}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "allCustomerList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 1, marginTop: 2 }}>
                                        <DynamicLocationMapping
                                            type={"lastHierarcyField"}
                                            flexDirection={"column"}
                                            marginBottom={10}
                                            viewType={"add"}
                                            isLabelVisible={true}
                                            onApiCallData={(value) => onSelectLocationData(value)}
                                        />
                                    </View>
                                    <View style={{ width: 5 }} />
                                    {contactTypeSection()}
                                    {/* <View style={{ flex: 1 }} /> */}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "allTargetList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 1, marginTop: 2 }}>
                                        <DynamicLocationMapping
                                            type={"lastHierarcyField"}
                                            flexDirection={"column"}
                                            marginBottom={10}
                                            viewType={"add"}
                                            isLabelVisible={true}
                                            onApiCallData={(value) => onSelectLocationData(value)}
                                        />
                                    </View>
                                    <View style={{ width: 5 }} />
                                    {contactTypeSection()}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "VisitReport" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 0.5 }} >
                                        {(recordTypeSection())}
                                    </View>
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 0.5 }} >
                                        {selectedRecordType.id == "1" ? null : subordinateSection()}
                                    </View>
                                    {/* {subordinateSection()} */}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "approveCustomerList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 0.5 }} >
                                        {(recordTypeSection())}
                                    </View>
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 0.5 }} >
                                        {selectedRecordType.id == "1" ? null : subordinateSection()}
                                    </View>
                                </View> */}
                            </>
                        }
                    </>
                    :
                    null
                }

                {type == "sfaEnquiriesActivitiesList" ?
                    <>
                        {filterLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    {fromDateSection()}
                                    <View style={{ width: 5 }} />
                                    {toDateSection()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={{ flex: 0.5 }} >
                                        {(leadOwnerSection())}
                                    </View>
                                    <View style={{ width: 5 }} />
                                    <View style={{ flex: 0.5 }} >
                                        {enquiryVisitStatusSection()}
                                    </View>
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
            </>
        )
    }
    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity
                                style={styles.crossImgSec}
                                activeOpacity={0.9}
                                onPress={() => _onClose()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.redCrossImg} />
                            </TouchableOpacity>
                        </View>
                        {isLoading ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {mainFilterSection()}

                                {/* <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                                    {checkBoxAscSection()}
                                </View>
                                <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                                    {checkBoxDescSection()}
                                </View> */}
                                {type == "mmsMeetingList" ?
                                    <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                        <BigTextButton
                                            backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                            fontColor={Color.COLOR.BLUE.DARK_BLUE}
                                            text={"RESET"}
                                            onPress={() => onReset()}
                                            additionalStyles={{ borderColor: Color.COLOR.BLUE.DARK_BLUE, borderWidth: 1 }}
                                            borderRadius={25}

                                        />
                                        <View style={{ width: 10 }} />
                                        <BigTextButton
                                            text={"APPLY FILTER"}
                                            onPress={() => onApplyPress()}
                                            backgroundColor={Color.COLOR.RED.AMARANTH}
                                            borderRadius={25}
                                        />
                                    </View>
                                    :
                                    <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                        <BigTextButton
                                            backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                            text={"RESET"}
                                            onPress={() => onReset()}
                                        />
                                        <View style={{ width: 10 }} />
                                        <BigTextButton
                                            text={"APPLY FILTER"}
                                            onPress={() => onApplyPress()}
                                        />
                                    </View>
                                }

                            </ScrollView>
                        }
                        <View style={{ height: 30 }} />
                    </React.Fragment>
                </View>
            }
        />
    );
}

FilterModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "organization",
    data: {},
    // fontFamily: FontFamily.FONTS.INTER.BOLD,
    // fontSize: FontSize.MD,
    // color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    // onLogout: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onApply: () => { },
    resetData: () => { }
};

FilterModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    // fontFamily: PropTypes.string,
    // fontSize: PropTypes.number,
    // color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    // onLogout: PropTypes.func,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    onApply: PropTypes.func,
    data: PropTypes.object,
    resetData: PropTypes.func
};


export default FilterModal;