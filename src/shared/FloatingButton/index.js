
import { PropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FloatingAction } from 'react-native-floating-action';
import { Color, ImageName } from '../../enums';
// import { ConversionModal, PjpAddModal, UnplannedVisit } from '../../screens/sfa';
import { StorageDataModification } from '../../services/common-view-function';
import { CommonData } from '../../services/constant';

let sfaActions = [
    // {
    //     text: "PJP",
    //     icon: ImageName.ADD_ICON,
    //     name: "bt_addPjp",
    //     position: 1,
    //     color: "#ffffff",
    //     textColor: "#ffffff",
    //     textBackground: null,
    //     buttonSize: 30
    // },
    // {
    //     text: "Enquiry",
    //     icon: ImageName.ADD_ICON,
    //     name: "bt_addToEnquiry",
    //     position: 2,
    //     color: "#ffffff",
    //     textColor: "#ffffff",
    //     textBackground: null,
    //     buttonSize: 30
    // },
    {
        text: "PJP",
        icon: ImageName.INFLUENCE,
        name: "bt_addPjp",
        position: 1,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    },

    {
        text: "Unplanned Visit",
        icon: ImageName.LOCATION_TICK,
        name: "bt_addUnplannedvisit",
        position: 2,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Odometer",
        icon: ImageName.ODOMETER_READING,
        name: "bt_odometerReading",
        position: 3,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Calendar",
        icon: ImageName.CALENDER_IMAGE,
        name: "bt_addToCalendar",
        position: 4,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Leave",
        icon: ImageName.NOTIFICATION_STATUS,
        name: "bt_addLeave",
        position: 5,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    },
    //  {
    //     text: "CSR",
    //     icon: ImageName.INFLUENCE,
    //     name: "bt_csr",
    //     position: 7,
    //     color: "#ffffff",
    //     textColor: "#ffffff",
    //     textBackground: null,
    //     buttonSize: 30
    // },
    {
        text: "Survey",
        icon: ImageName.NEW_TICKET,
        name: "bt_survey",
        position: 6,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    },
    //  {
    //     text: "New Request",
    //     icon: ImageName.PROFILE_USERS,
    //     name: "bt_newRequest",
    //     position: 9,
    //     color: "#ffffff",
    //     textColor: "#ffffff",
    //     textBackground: null,
    //     buttonSize: 30
    // },
    {
        text: "Registration",
        icon: ImageName.USER_CIRCLE_ADD,
        name: "bt_addRegistration",
        position: 7,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    },
    {
        text: "Conversion",
        icon: ImageName.ALERT,
        name: "bt_conversion",
        position: 8,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }
];

let CrmActions = [
    {
        text: "Task",
        icon: ImageName.NEW_TICKET,
        name: "bt_task",
        position: 1,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Lead",
        icon: ImageName.PROFILE_USERS,
        name: "bt_lead",
        position: 2,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Enquiry",
        icon: ImageName.ADD_ICON,
        name: "bt_crmEnquiry",
        position: 3,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Contact",
        icon: ImageName.USER_CIRCLE_ADD,
        name: "bt_contact",
        position: 4,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }, {
        text: "Organization",
        icon: ImageName.INFLUENCE,
        name: "bt_organization",
        position: 5,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    }
];

let MmsActions = [
    {
        text: "Event",
        icon: ImageName.NEW_TICKET,
        name: "bt_event",
        position: 1,
        color: "#ffffff",
        textColor: "#ffffff",
        textBackground: null,
        buttonSize: 30,
        isHidden: false
    },
];

function FloatingButton({
    isHidden,
    moduleType,
    onSelect,
    pageNamePosition,
    navigation,
    color
}) {

    if (isHidden) return null;

    const [visiblePjpModal, setVisiblePjpModal] = useState(false);
    const [mainCrmActionArr, setMainCrmActionArr] = useState([]);
    const [mainSfaActionArr, setMainSfaActionArr] = useState([]);
    const [mainMmsActionArr, setMainMmsActionArr] = useState([]);
    const [unplannedVisitModal, setUnplannedVisitModal] = useState(false);
    const [conversionModal, setConversionModal] = useState(false);

    let actionArr = [];

    if (moduleType == "crmSales") {
        actionArr = mainCrmActionArr;
        // actionArr = CrmActions;
    } else if (moduleType == "sfa") {
        actionArr = mainSfaActionArr;
        // actionArr = sfaActions;
    } else if (moduleType == "mms") {
        actionArr = mainMmsActionArr;
        // actionArr = MmsActions;
    }

    for (let i = 0; i < actionArr.length; i++) {
        if (actionArr[i].position == pageNamePosition) {
            actionArr.splice(i, 1);
        }
    }

    useEffect(() => {
        modCrmArrData();
        modSfaArrData();
        modMmsArrData();
    }, [])

    async function modCrmArrData() {
        let moduleSettingsData = await StorageDataModification.userModuleSettingsData({},"get");
        for (let i = 0; i < CrmActions.length; i++) {
            if (CrmActions[i].text == "Task") {
                CrmActions[i]["isHidden"] = moduleSettingsData.crm_taskAddPem == "0" ? true : false;
            }
            if (CrmActions[i].text == "Lead") {
                CrmActions[i]["isHidden"] = moduleSettingsData.crm_leadAddPem == "0" ? true : false;
            }
            if (CrmActions[i].text == "Enquiry") {
                CrmActions[i]["isHidden"] = moduleSettingsData.crm_EnquiryAddPem == "0" ? true : false;
            }
            if (CrmActions[i].text == "Contact") {
                CrmActions[i]["isHidden"] = moduleSettingsData.crm_ContactAddPem == "0" ? true : false;
            }
            if (CrmActions[i].text == "Organization") {
                CrmActions[i]["isHidden"] = moduleSettingsData.crm_organizationAddPem == "0" ? true : false;
            }
        }
        let modBtnData = await modButtonData(CrmActions);
        setMainCrmActionArr(modBtnData);
    }

    async function modSfaArrData() {
        let moduleSettingsData =await StorageDataModification.userModuleSettingsData({},"get");
        for (let i = 0; i < sfaActions.length; i++) {
            if (sfaActions[i].text == "Odometer") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_otometerAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Calendar") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_calenderAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Leave") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_leaveAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Survey") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_surveyIsView == "0" || moduleSettingsData.sfa_surveyAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Conversion") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_conversionAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "PJP") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_plannedVisitAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Unplanned Visit") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_unplannedVisitAddPem == "0" ? true : false;
            }
            if (sfaActions[i].text == "Registration") {
                sfaActions[i]["isHidden"] = moduleSettingsData.sfa_CustomerRegistrationAddPem == "0" ? true : false;
            }
        }
        let modBtnData = await modButtonData(sfaActions);
        setMainSfaActionArr(modBtnData);
    }

    async function modMmsArrData() {
        let moduleSettingsData = await StorageDataModification.userModuleSettingsData({},"get");
        for (let i = 0; i < MmsActions.length; i++) {
            if (MmsActions[i].text == "Event") {
                MmsActions[i]["isHidden"] = moduleSettingsData.mms_eventAddPem == "0" ? true : false;
            }
        }
        let modBtnData = await modButtonData(MmsActions);
        setMainMmsActionArr(modBtnData);
    }

    const modButtonData = async (data) => {
        let modArr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].isHidden == false) {
                modArr.push(data[i])
            }
        }
        return modArr;
       
    }

    const OnSelectClick = (name) => {
        onSelect(name);
        if (name == "bt_addPjp") {
            setVisiblePjpModal(true);
        } else if (name == "bt_addUnplannedvisit") {
            setUnplannedVisitModal(true);
        } else if (name == "bt_conversion") {
            setConversionModal(true);
        } else if (name == "bt_task") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        } else if (name == "bt_crmEnquiry") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        } else if (name == "bt_contact") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        } else if (name == "bt_organization") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        } else if (name == "bt_lead") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        } else if (name == "bt_addToEnquiry") {
            navigation((CommonData.ROUTING[name]).routeName, { type: "add" })
        }
        else {
            navigation((CommonData.ROUTING[name]).routeName)
        }
    }

    return (
        <>
            {/* {visiblePjpModal ?
                <>
                    <PjpAddModal
                        visibleModal={visiblePjpModal}
                        onPjpModalClose={() => setVisiblePjpModal(!visiblePjpModal)}
                        navigation={navigation}
                    />
                </>
                :
                null
            }
            {unplannedVisitModal ?
                <UnplannedVisit
                    isVisible={unplannedVisitModal}
                    onCloseModal={() => setUnplannedVisitModal(!unplannedVisitModal)}
                    navigation={navigation}
                />
                :
                null
            }
            {conversionModal ?
                <ConversionModal
                    isVisible={conversionModal}
                    onCloseModal={() => setConversionModal(!conversionModal)}
                    navigation={navigation}
                />
                :
                null
            } */}
            <FloatingAction
                color={color}
                actions={actionArr}
                tintColor="#000000"
                overlayColor={'#000000'}
                onPressItem={(name) => OnSelectClick(name)}
            />
        </>
    )
}

FloatingButton.defaultProps = {
    isHidden: false,
    moduleType: "crmSales",   // "crm", "crmSales"
    onSelect: () => { },
    pageNamePosition: 0,     // SFA [PJP => 1, Enquiry =>2, Unplanned Visit => 3, Odometer => 4, Calendar => 5, Leave =>6, CSR =>7, Survey =>8, New Request =>9] , CRM [Task=>1, Lead =>2, Enquiry => 3, Contact => 4, Organization => 5] 
    navigation: () => { },
    color: Color.COLOR.RED.AMARANTH
}

FloatingButton.propTypes = {
    isHidden: PropTypes.bool,
    moduleType: PropTypes.string,
    onSelect: PropTypes.func,
    pageNamePosition: PropTypes.number,
    color: PropTypes.string,
    navigation: PropTypes.func
}

export default FloatingButton;