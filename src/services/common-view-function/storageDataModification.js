import { getData, multipleRemove, singleRemove, storeData } from "../async-storage";

{/* Local storage data actual value Start

1.  "#IPcfvPi11#-X8HM" used for "auth";
2.  "3tC0GEo75zrSql$6" used for "userCredential";
3.  "n--KcnaDhS50l-xW" used for "headerData";
4.  "9XHfYHCjK0zFZ0yj" used for "pjpListData";

5.  "VK3#4qFHW8IwzfPH" used for "pjpProjectListData";
6.  "pVIX-XFsYPOzXKbY" used for "sfaEnquiryListData";
7.  "pf2vyhkr431ELLSt" used for "crmEnquiryListData";
8.  "9LaBs6@-BlQzUXH5" used for "taskListData";
9:  "uIvLGve-EHP52Ly1" used for "visitedCustomerListData";
10. "iQ@gbwDkCSOL-19X" used for "visitedCustomerListData_project";
11. "6u#88p_Z-nPKV7yk" used for "visitedInfluencerListData";
12. "nOi_ckUnWMu@sO#8" used for "visitedTargetListData";
13. "46iIrXuxC9m5p@kk" used for "visitedTargetListData_project";
14. "PH6x6c6boreYnu2z" used for "attendanceListData";
15. "CDgHbsOcKd@Sl7hg" used for "leadListData";
16. "qtePG3QE@7dutE92" used for "opportunityListData";
17. "z9MF313ruX6o6q3e" used for "contactListData";
18. "MAPkfqKyZZesZ$Ac" used for "odometerListData";
19. "fIW6Yt62mqx0LkXy" used for "LeaveHistoryListData",
20. "Ix__khgyPZ0uFX@x" used for "organizationListData",
21. "n_cY0V6sXMmRyiE@" used for "orderListData",
22. "b_c2_uHWhRb_#6Vv" used for "ConversionListData",
23. "M1Le187h6deZQ6dw" used for "CustomerListData",
24. "ccN2l3aFv5s#GAwX" used for "TargetListData",
25. "$EaY29B0Cu#KP6ow" used for "VisitReportListData",
26. "CLvoGn7aK327N$dx" used for "CustomerApprovalListData",
27. "FrVBi2miXj--X7r1" used for "ConversionApprovalListData",
28. "bUFX-19g9B_BJOHG" used for "userSettingsData",
29. "vgMpeQK9XSixef7b" used for "userModuleSettingsData",
30. "Jd$37rT_yachAUjx" used for "SFADashBoardData",
31. "A2Xe#p0r32Wu2@KK" used for "CRMDashBoardData",
32. "xkXT-IZeymK8kf2K" used for "MMSDashBoardData",
33. "a#HU-k_Jwr8BJEDo" used for "odometer data"
34. "vBayuvp_$PlAAO88" used for "odometer"
35. "a#HU-k_JwllJEDo" used for "userMenuPermision"
36. "VBfRDLepOHJ1kAp" used for "GamificationLeadList"
37. "0Icp6u8pfW@dYq%" used for "GamificationTopGainList"
38. "3z2qKZH@$$3HlAc" used for "GamificationPointsSummary"
39. "gBSAX$NWfC%ujhv" used for "GamificationNearToAchieve"
40. "wXD8$jVFt1&Ewwy" used for "GamificationCongratulatedByList"
41. "eXG(z#nN3OeYMn%x" used for "PrimaryOrderList"
42. "hWgiCDWS3OBuB5qF" used for "SecondaryOrderList"
43. "eXG(z#opnN3OeYMn%x" used for "productList"
44. "kAAxzD1hTd6FMDHo" used for "Brand List"
45. "Hzu4lTpU7kUUgbYj" used for "customerProfileData"
46."Pkihu$$$ikOeYMn%x" used for cardDetailsList,
47."TGkiool##@ikOeYMn%x" used for order history kist,
48."LLhnmy###l##@ikOeYMn%x" used for order Details list,
49."Ktre_@#l##@ikOeYMn%x" used for resent order list,


50."K$e_@l%@ikOeNSa%c" used for user mapped country
51. "Hzu$4lTpU7*@UgbY%" used for "cart data",


52. "Z$e_@l%@QkOePSa%c" used for "DAY ACTIVITY SELECTION SECTION"
53. "J$e_&l%0%ikOed_Sa%c" used for "USER_ACTIVITY_SELECTION_SECTION"
54. "K$e7@l%@ikOl&Sa%c" used for "PROGRESS_CIRCULAR_FOR_HOME"

55. "a$e_@l%(%*kOeVSa%h" used for "ROUTE_DATA"
56. "a$e#@l%(%*k!eVS%h&" used for "order list data in dashboard and day wise list page"
57. "v$1#@l%)%8z!eVS-h&" used for "lms dashboard activity selection tab"
58. "K$)_)n%@QlOePSa%V" used for "lms sale list data"
59. "!$&_)n%@QdOehSa*l" used for mapped location data
60. "Fzu$9lTkU7#@DgbY)" used for selected customer data
61. "h$e*l%+%*kLeVDa@9" used for store the offline images
62. "r$e*l%+%kLiV7a@10" used for store the notificationCount

 End */ }

const USER_LOCATION_MAPPED_DATA = "K$e_@l%@ikOeNSa%c";
const USER_PRODUCT_MAPPED_DATA = "J$e_@l%(%ikOeNSa%c";
const CART_DATA = "Hzu$4lTpU7*@UgbY%";
const OUTLET_LIST_DATA = "Z$e_@l%@QkOePSa%c";
const ROUTE_DATA = "a$e_@l%(%*kOeVSa%h";

const DAY_ACTIVITY_SELECTION_SECTION = "Z$e*@l%@QkOT_PSa%c";
const USER_ACTIVITY_SELECTION_SECTION = "J$e_&l%0%ikOed_Sa%c";
const CRM_USER_ACTIVITY_SELECTION_SECTION = "a$e#@l%+++%*k!eVS%h&";
const PROGRESS_CIRCULAR_FOR_HOME = "K$e7@l%@ikOl&Sa%c";
const USER_ATTENDANCE_DATA = "Z$L7@l#@ik7_l&Sa^c";

const DAY_WISE_ORDER_LIST = "a$e#@l%(%*k!eVS%h&";
const LMS_ACTIVITY_SELECTION_TAB = "v$1#@l%)%8z!eVS-h&";
const LMS_SALES_LIST_DATA = "K$)_)n%@QlOePSa%V";
const MAPPED_LOCATION_DATA = "!$&_)n%@QdOehSa*l";
const SELECTED_CUSTOMER_DATA = "Fzu$9lTkU7#@DgbY)";
const MAPPED_PRODUCT_DATA = "K$e&&l%0uikOkd_Sa%c";
const MAPPED_HIGHER_LEVEL_PRODUCT_DATA = "l)e&&d^0uikLkd_SL%Q";
const CLIENT_SETTINGS = "Z$e*@l_%@QkOT_PSa#c";
const OFFICE_WORK = "l%@ikObsOcKd@l&Sa%c";
const ROUTE_FILTER_LIST = "vgMpeQK9Xd@Sl7hgkr431E";
const SUBORDINATE_DATA = "a#HU-k_Jwr8BJEl%0uikOkd_S";
const VISIT_NOTES = "Z$e*@l%@QOeVSa8**^$^^$#";
const CUSTOMER_CART_DATA = "h$e_)l%(%*kLeVDa%z";
const CUSTOMER_PLACE_ORDER_DATA = "&z8lTkU8#@DgbY)-";
const CUSTOMER_ORDER_VISIT_NOTE_DATA = "PXx(z#op#N3!eYMe%)";
const OFFLINE_IMG_DATA = "h$e*l%+%*kLeVDa@9";

const TRADE_ITEM_DATA = "OcKd@l&Sa%Q@gbwDkCSOL-1vyhkr431E";
const CLOSING_STOCK_LIST = "iQ@gbwDkCSOL-HbsOcKd@Sl7&&&"
const STORE_CHEACKING_DATA = "pVIX-iIrXue-EHP5xC9m5XFsYPOzX";
const NOTIFICATION_COUNT_DATA = "r$e*l%+%kLiV7a@10"



//  Here define all the storage data key
export const allStorageVariable = [
    "#IPcfvPi11#-X8HM",
    "3tC0GEo75zrSql$6",
    "n--KcnaDhS50l-xW",
    "9XHfYHCjK0zFZ0yj",
    "VK3#4qFHW8IwzfPH",
    "pVIX-XFsYPOzXKbY",
    "pf2vyhkr431ELLSt",
    "9LaBs6@-BlQzUXH5",
    "uIvLGve-EHP52Ly1",
    "iQ@gbwDkCSOL-19X",
    "6u#88p_Z-nPKV7yk",
    "nOi_ckUnWMu@sO#8",
    "46iIrXuxC9m5p@kk",
    "PH6x6c6boreYnu2z",
    "CDgHbsOcKd@Sl7hg",
    "qtePG3QE@7dutE92",
    "z9MF313ruX6o6q3e",
    "MAPkfqKyZZesZ$Ac",
    "fIW6Yt62mqx0LkXy",
    "Ix__khgyPZ0uFX@x",
    "n_cY0V6sXMmRyiE@",
    "b_c2_uHWhRb_#6Vv",
    "M1Le187h6deZQ6dw",
    "ccN2l3aFv5s#GAwX",
    "$EaY29B0Cu#KP6ow",
    "CLvoGn7aK327N$dx",
    "FrVBi2miXj--X7r1",
    "bUFX-19g9B_BJOHG",
    "vgMpeQK9XSixef7b",
    "Jd$37rT_yachAUjx",
    "A2Xe#p0r32Wu2@KK",
    "xkXT-IZeymK8kf2K",
    "a#HU-k_Jwr8BJEDo",
    "a#HU-k_JwllJEDo",
    "VBfRDLepOHJ1kAp",
    "0Icp6u8pfW@dYq%",
    "3z2qKZH@$$3HlAc",
    "gBSAX$NWfC%ujhv",
    "wXD8$jVFt1&Ewwy",
    "eXG(z#nN3OeYMn%x",
    "hWgiCDWS3OBuB5qF",
    "eXG(z#opnN3OeYMn%x",
    "kAAxzD1hTd6FMDHo",
    "Hzu4lTpU7kUUgbYj",
    "Pkihu$$$ikOeYMn%x",
    "TGkiool##@ikOeYMn%x",
    "LLhnmy###l##@ikOeYMn%x",
    "Ktre_@#l##@ikOeYMn%x",
    "vBayuvp_$PlAAO88",


    USER_LOCATION_MAPPED_DATA,
    USER_PRODUCT_MAPPED_DATA,
    CART_DATA,
    OUTLET_LIST_DATA,
    ROUTE_DATA,

    DAY_ACTIVITY_SELECTION_SECTION,
    USER_ACTIVITY_SELECTION_SECTION,
    CRM_USER_ACTIVITY_SELECTION_SECTION,
    PROGRESS_CIRCULAR_FOR_HOME,
    USER_ATTENDANCE_DATA,
    DAY_WISE_ORDER_LIST,
    LMS_ACTIVITY_SELECTION_TAB,
    LMS_SALES_LIST_DATA,
    MAPPED_LOCATION_DATA,
    MAPPED_PRODUCT_DATA,
    MAPPED_HIGHER_LEVEL_PRODUCT_DATA,
    CLIENT_SETTINGS,
    OFFICE_WORK,
    ROUTE_FILTER_LIST,
    SUBORDINATE_DATA,
    VISIT_NOTES,
    CUSTOMER_CART_DATA,
    CUSTOMER_PLACE_ORDER_DATA,
    // CUSTOMER_ORDER_VISIT_NOTE_DATA,
    OFFLINE_IMG_DATA,

    TRADE_ITEM_DATA,
    CLOSING_STOCK_LIST,
    STORE_CHEACKING_DATA,
    NOTIFICATION_COUNT_DATA
]

// for remove the data which is stored in login
export async function removeLoginData() {
    await multipleRemove([
        "#IPcfvPi11#-X8HM",
        "3tC0GEo75zrSql$6",
        "n--KcnaDhS50l-xW",
        "a#HU-k_JwllJEDo",

        USER_LOCATION_MAPPED_DATA,
        USER_PRODUCT_MAPPED_DATA,
        CART_DATA,
        OUTLET_LIST_DATA,
        ROUTE_DATA,

        DAY_ACTIVITY_SELECTION_SECTION,
        USER_ACTIVITY_SELECTION_SECTION,
        PROGRESS_CIRCULAR_FOR_HOME,
        USER_ATTENDANCE_DATA,
        DAY_WISE_ORDER_LIST,
        LMS_ACTIVITY_SELECTION_TAB,
        LMS_SALES_LIST_DATA,
        MAPPED_LOCATION_DATA,
        SELECTED_CUSTOMER_DATA,
        MAPPED_PRODUCT_DATA,
        MAPPED_HIGHER_LEVEL_PRODUCT_DATA,
        CLIENT_SETTINGS,
        OFFICE_WORK,
        ROUTE_FILTER_LIST,
        SUBORDINATE_DATA,
        VISIT_NOTES,
        CUSTOMER_CART_DATA,
        CUSTOMER_PLACE_ORDER_DATA,
        // CUSTOMER_ORDER_VISIT_NOTE_DATA,
        OFFLINE_IMG_DATA,

        TRADE_ITEM_DATA,
        CLOSING_STOCK_LIST,
        STORE_CHEACKING_DATA,
        NOTIFICATION_COUNT_DATA
    ]);
}

export async function removeAllStorageData() {
    await multipleRemove(allStorageVariable);
}

// For User Credential
export async function userCredential(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("3tC0GEo75zrSql$6", data);
            }
            return true;
        case "get":
            return await getData("3tC0GEo75zrSql$6");

        case "clear":
            return await singleRemove("3tC0GEo75zrSql$6");

        default:
            return true;
    }
}

// For Auth Data
export async function authData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("#IPcfvPi11#-X8HM", data);
            }
            return true;
        case "get":
            return await getData("#IPcfvPi11#-X8HM");

        case "clear":
            return await singleRemove("#IPcfvPi11#-X8HM");

        default:
            return true;
    }
}

// For header Data
export async function headerData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("n--KcnaDhS50l-xW", data);
            }
            return true;
        case "get":
            return await getData("n--KcnaDhS50l-xW");

        case "clear":
            return await singleRemove("n--KcnaDhS50l-xW");

        default:
            return true;
    }
}


// For Pjp List Data
export async function pjpListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("9XHfYHCjK0zFZ0yj", data);
            }
            return true;
        case "get":
            return await getData("9XHfYHCjK0zFZ0yj");

        case "clear":
            return await singleRemove("9XHfYHCjK0zFZ0yj");

        default:
            return true;
    }
}


// For Project Type Data
export async function pjpProjectListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("VK3#4qFHW8IwzfPH", data);
            }
            return true;
        case "get":
            return await getData("VK3#4qFHW8IwzfPH");

        case "clear":
            return await singleRemove("VK3#4qFHW8IwzfPH");

        default:
            return true;
    }
}


// For sfa Enquiry List Data
export async function sfaEnquiryListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("pVIX-XFsYPOzXKbY", data);
            }
            return true;
        case "get":
            return await getData("pVIX-XFsYPOzXKbY");

        case "clear":
            return await singleRemove("pVIX-XFsYPOzXKbY");

        default:
            return true;
    }
}

// For Crm Enquiry List Data
export async function crmEnquiryListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("pf2vyhkr431ELLSt", data);
            }
            return true;
        case "get":
            return await getData("pf2vyhkr431ELLSt");

        case "clear":
            return await singleRemove("pf2vyhkr431ELLSt");

        default:
            return true;
    }
}

// For Crm Task List Data
export async function taskListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("9LaBs6@-BlQzUXH5", data);
            }
            return true;
        case "get":
            return await getData("9LaBs6@-BlQzUXH5");

        case "clear":
            return await singleRemove("9LaBs6@-BlQzUXH5");

        default:
            return true;
    }
}

// For Visited Customer List Data
export async function visitedCustomerListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("uIvLGve-EHP52Ly1", data);
            }
            return true;
        case "get":
            return await getData("uIvLGve-EHP52Ly1");

        case "clear":
            return await singleRemove("uIvLGve-EHP52Ly1");

        default:
            return true;
    }
}

// For Visited Customer List Data for project
export async function visitedCustomerListData_project(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("iQ@gbwDkCSOL-19X", data);
            }
            return true;
        case "get":
            return await getData("iQ@gbwDkCSOL-19X");

        case "clear":
            return await singleRemove("iQ@gbwDkCSOL-19X");

        default:
            return true;
    }
}
// For Visited Influencer List Data
export async function visitedInfluencerListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("6u#88p_Z-nPKV7yk", data);
            }
            return true;
        case "get":
            return await getData("6u#88p_Z-nPKV7yk");

        case "clear":
            return await singleRemove("6u#88p_Z-nPKV7yk");

        default:
            return true;
    }
}

// For Visited Target List Data
export async function visitedTargetListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("nOi_ckUnWMu@sO#8", data);
            }
            return true;
        case "get":
            return await getData("nOi_ckUnWMu@sO#8");

        case "clear":
            return await singleRemove("nOi_ckUnWMu@sO#8");

        default:
            return true;
    }
}

// For Visited Target List Data for project
export async function visitedTargetListData_project(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("46iIrXuxC9m5p@kk", data);
            }
            return true;
        case "get":
            return await getData("46iIrXuxC9m5p@kk");

        case "clear":
            return await singleRemove("46iIrXuxC9m5p@kk");

        default:
            return true;
    }
}
// For Attendance List Data
export async function attendanceListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("PH6x6c6boreYnu2z", data);
            }
            return true;
        case "get":
            return await getData("PH6x6c6boreYnu2z");

        case "clear":
            return await singleRemove("PH6x6c6boreYnu2z");

        default:
            return true;
    }
}

// For Lead List Data
export async function leadListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("CDgHbsOcKd@Sl7hg", data);
            }
            return true;
        case "get":
            return await getData("CDgHbsOcKd@Sl7hg");

        case "clear":
            return await singleRemove("CDgHbsOcKd@Sl7hg");

        default:
            return true;
    }
}


// For opportunity List Data
export async function opportunityListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("qtePG3QE@7dutE92", data);
            }
            return true;
        case "get":
            return await getData("qtePG3QE@7dutE92");

        case "clear":
            return await singleRemove("qtePG3QE@7dutE92");

        default:
            return true;
    }
}
// For contact List Data
export async function contactListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("z9MF313ruX6o6q3e", data);
            }
            return true;
        case "get":
            return await getData("z9MF313ruX6o6q3e");

        case "clear":
            return await singleRemove("z9MF313ruX6o6q3e");

        default:
            return true;
    }
}

// For odometer List Data
export async function odometerListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("MAPkfqKyZZesZ$Ac", data);
            }
            return true;
        case "get":
            return await getData("MAPkfqKyZZesZ$Ac");

        case "clear":
            return await singleRemove("MAPkfqKyZZesZ$Ac");

        default:
            return true;
    }
}

// For Leave History List Data
export async function LeaveHistoryListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("fIW6Yt62mqx0LkXy", data);
            }
            return true;
        case "get":
            return await getData("fIW6Yt62mqx0LkXy");

        case "clear":
            return await singleRemove("fIW6Yt62mqx0LkXy");

        default:
            return true;
    }
}

// For Organization List Data
export async function organizationListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Ix__khgyPZ0uFX@x", data);
            }
            return true;
        case "get":
            return await getData("Ix__khgyPZ0uFX@x");

        case "clear":
            return await singleRemove("Ix__khgyPZ0uFX@x");

        default:
            return true;
    }
}

// For Order List Data
export async function orderListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("n_cY0V6sXMmRyiE@", data);
            }
            return true;
        case "get":
            return await getData("n_cY0V6sXMmRyiE@");

        case "clear":
            return await singleRemove("n_cY0V6sXMmRyiE@");

        default:
            return true;
    }
}

// For Conversion List Data
export async function ConversionListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("b_c2_uHWhRb_#6Vv", data);
            }
            return true;
        case "get":
            return await getData("b_c2_uHWhRb_#6Vv");

        case "clear":
            return await singleRemove("b_c2_uHWhRb_#6Vv");

        default:
            return true;
    }
}

// For Customer List Data
export async function CustomerListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("M1Le187h6deZQ6dw", data);
            }
            return true;
        case "get":
            return await getData("M1Le187h6deZQ6dw");

        case "clear":
            return await singleRemove("M1Le187h6deZQ6dw");

        default:
            return true;
    }
}

// For Target List Data
export async function TargetListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("ccN2l3aFv5s#GAwX", data);
            }
            return true;
        case "get":
            return await getData("ccN2l3aFv5s#GAwX");

        case "clear":
            return await singleRemove("ccN2l3aFv5s#GAwX");

        default:
            return true;
    }
}

// For Visit Report List Data
export async function VisitReportListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("$EaY29B0Cu#KP6ow", data);
            }
            return true;
        case "get":
            return await getData("$EaY29B0Cu#KP6ow");

        case "clear":
            return await singleRemove("$EaY29B0Cu#KP6ow");

        default:
            return true;
    }
}

// For Customer Approval List Data
export async function CustomerApprovalListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("CLvoGn7aK327N$dx", data);
            }
            return true;
        case "get":
            return await getData("CLvoGn7aK327N$dx");

        case "clear":
            return await singleRemove("CLvoGn7aK327N$dx");

        default:
            return true;
    }
}

// For Conversion Approval List Data
export async function ConversionApprovalListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("FrVBi2miXj--X7r1", data);
            }
            return true;
        case "get":
            return await getData("FrVBi2miXj--X7r1");

        case "clear":
            return await singleRemove("FrVBi2miXj--X7r1");

        default:
            return true;
    }
}


// For user setting Data
export async function userSettingsData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("bUFX-19g9B_BJOHG", data);
            }
            return true;
        case "get":
            return await getData("bUFX-19g9B_BJOHG");

        case "clear":
            return await singleRemove("bUFX-19g9B_BJOHG");

        default:
            return true;
    }
}

// For user module setting Data
export async function userModuleSettingsData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("vgMpeQK9XSixef7b", data);
            }
            return true;
        case "get":
            return await getData("vgMpeQK9XSixef7b");

        case "clear":
            return await singleRemove("vgMpeQK9XSixef7b");

        default:
            return true;
    }
}
// For user sfa dashboard Data
export async function SFADashBoardData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Jd$37rT_yachAUjx", data);
            }
            return true;
        case "get":
            return await getData("Jd$37rT_yachAUjx");

        case "clear":
            return await singleRemove("Jd$37rT_yachAUjx");

        default:
            return true;
    }
}

// For user crm dashboard Data
export async function CRMDashBoardData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("A2Xe#p0r32Wu2@KK", data);
            }
            return true;
        case "get":
            return await getData("A2Xe#p0r32Wu2@KK");

        case "clear":
            return await singleRemove("A2Xe#p0r32Wu2@KK");

        default:
            return true;
    }
}

// For user mms dashboard Data
export async function MMSDashBoardData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("xkXT-IZeymK8kf2K", data);
            }
            return true;
        case "get":
            return await getData("xkXT-IZeymK8kf2K");

        case "clear":
            return await singleRemove("xkXT-IZeymK8kf2K");

        default:
            return true;
    }
}

// For odometer 
export async function odometer(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("vBayuvp_$PlAAO88", data);
            }
            return true;
        case "get":
            return await getData("vBayuvp_$PlAAO88");

        case "clear":
            return await singleRemove("vBayuvp_$PlAAO88");

        default:
            return true;
    }
}

// For odometerData
export async function odometerData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("a#HU-k_Jwr8BJEDo", data);
            }
            return true;
        case "get":
            return await getData("a#HU-k_Jwr8BJEDo");

        case "clear":
            return await singleRemove("a#HU-k_Jwr8BJEDo");

        default:
            return true;
    }
}

// for user permision
export async function userMenuPermision(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("a#HU-k_JwllJEDo", data);
            }
            return true;
        case "get":
            return await getData("a#HU-k_JwllJEDo");

        case "clear":
            return await singleRemove("a#HU-k_JwllJEDo");

        default:
            return true;
    }
}

//for gamification lead list

export async function gamificationLeadList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("VBfRDLepOHJ1kAp", data);
            }
            return true;
        case "get":
            return await getData("VBfRDLepOHJ1kAp");

        case "clear":
            return await singleRemove("VBfRDLepOHJ1kAp");

        default:
            return true;
    }
}

//for gamification top gain list

export async function gamificationTopGainList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("0Icp6u8pfW@dYq%", data);
            }
            return true;
        case "get":
            return await getData("0Icp6u8pfW@dYq%");

        case "clear":
            return await singleRemove("0Icp6u8pfW@dYq%");

        default:
            return true;
    }
}
//for gamification points summary list

export async function gamificationPointsSummaryList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("3z2qKZH@$$3HlAc", data);
            }
            return true;
        case "get":
            return await getData("3z2qKZH@$$3HlAc");

        case "clear":
            return await singleRemove("3z2qKZH@$$3HlAc");

        default:
            return true;
    }

}
//for gamification near to achieve list

export async function gamificationNearToAchieveList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("gBSAX$NWfC%ujhv", data);
            }
            return true;
        case "get":
            return await getData("gBSAX$NWfC%ujhv");

        case "clear":
            return await singleRemove("gBSAX$NWfC%ujhv");

        default:
            return true;
    }

}
//for gamification congratulated By list

export async function gamificationCongratulatedByList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("wXD8$jVFt1&Ewwy", data);
            }
            return true;
        case "get":
            return await getData("wXD8$jVFt1&Ewwy");

        case "clear":
            return await singleRemove("wXD8$jVFt1&Ewwy");

        default:
            return true;
    }

}

// For Primary Order List Data
export async function PrimaryOrderListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("eXG(z#nN3OeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("eXG(z#nN3OeYMn%x");

        case "clear":
            return await singleRemove("eXG(z#nN3OeYMn%x");

        default:
            return true;
    }
}
// For Secondary Order List Data
export async function SecondaryOrderListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("hWgiCDWS3OBuB5qF", data);
            }
            return true;
        case "get":
            return await getData("hWgiCDWS3OBuB5qF");

        case "clear":
            return await singleRemove("hWgiCDWS3OBuB5qF");

        default:
            return true;
    }
}
// For select product List Data
export async function selectProductListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("eXG(z#opnN3OeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("eXG(z#opnN3OeYMn%x");

        case "clear":
            return await singleRemove("eXG(z#opnN3OeYMn%x");

        default:
            return true;
    }
}
// For brand Data
export async function BrandListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("kAAxzD1hTd6FMDHo", data);
            }
            return true;
        case "get":
            return await getData("kAAxzD1hTd6FMDHo");

        case "clear":
            return await singleRemove("kAAxzD1hTd6FMDHo");

        default:
            return true;
    }
}

// For customer profile data
export async function OrderCustomerProfileData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Hzu4lTpU7kUUgbYj", data);
            }
            return true;
        case "get":
            return await getData("Hzu4lTpU7kUUgbYj");

        case "clear":
            return await singleRemove("Hzu4lTpU7kUUgbYj");

        default:
            return true;
    }
}

// For card details List Data
export async function cardDetailsListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Pkihu$$$ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("Pkihu$$$ikOeYMn%x");

        case "clear":
            return await singleRemove("Pkihu$$$ikOeYMn%x");

        default:
            return true;
    }
}

// For order List Data
export async function orderHistoryListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("TGkiool##@ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("TGkiool##@ikOeYMn%x");

        case "clear":
            return await singleRemove("TGkiool##@ikOeYMn%x");

        default:
            return true;
    }
}


// For order history List details Data
export async function orderHistoryListDetails(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("LLhnmy###l##@ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("LLhnmy###l##@ikOeYMn%x");

        case "clear":
            return await singleRemove("LLhnmy###l##@ikOeYMn%x");

        default:
            return true;
    }
}


// For order history List details Data
export async function recentOrderList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Ktre_@#l##@ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("Ktre_@#l##@ikOeYMn%x");

        case "clear":
            return await singleRemove("Ktre_@#l##@ikOeYMn%x");

        default:
            return true;
    }
}


// for new mapped data
// For location data store
export async function locationMappedData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(USER_LOCATION_MAPPED_DATA, data);
            }
            return true;
        case "get":
            return await getData(USER_LOCATION_MAPPED_DATA);

        case "clear":
            return await singleRemove(USER_LOCATION_MAPPED_DATA);

        default:
            return true;
    }
}

// For product data store
export async function locationMappedDataProduct(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(USER_PRODUCT_MAPPED_DATA, data);
            }
            return true;
        case "get":
            return await getData(USER_PRODUCT_MAPPED_DATA);

        case "clear":
            return await singleRemove(USER_PRODUCT_MAPPED_DATA);

        default:
            return true;
    }
}

// For Cart data
export async function OrderCartData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CART_DATA, data);
            }
            return true;
        case "get":
            return await getData(CART_DATA);

        case "clear":
            return await singleRemove(CART_DATA);

        default:
            return true;
    }
}

// For Outlet List data
export async function outletListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(OUTLET_LIST_DATA, data);
            }
            return true;
        case "get":
            return await getData(OUTLET_LIST_DATA);

        case "clear":
            return await singleRemove(OUTLET_LIST_DATA);

        default:
            return true;
    }
}

// For Route data
export async function routeData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(ROUTE_DATA, data);
            }
            return true;
        case "get":
            return await getData(ROUTE_DATA);

        case "clear":
            return await singleRemove(ROUTE_DATA);

        default:
            return true;
    }
}

// For Day Activity Selection Section Data
export async function dayActivitySelectionSectionData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(DAY_ACTIVITY_SELECTION_SECTION, data);
            }
            return true;
        case "get":
            return await getData(DAY_ACTIVITY_SELECTION_SECTION);

        case "clear":
            return await singleRemove(DAY_ACTIVITY_SELECTION_SECTION);

        default:
            return true;
    }
}


// For User Activity Selection Section Data
export async function userActivitySelectionSectionData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(USER_ACTIVITY_SELECTION_SECTION, data);
            }
            return true;
        case "get":
            return await getData(USER_ACTIVITY_SELECTION_SECTION);

        case "clear":
            return await singleRemove(USER_ACTIVITY_SELECTION_SECTION);

        default:
            return true;
    }
}

// For Crm User Activity Selection Section Data
export async function crmUserActivitySelectionSectionData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CRM_USER_ACTIVITY_SELECTION_SECTION, data);
            }
            return true;
        case "get":
            return await getData(CRM_USER_ACTIVITY_SELECTION_SECTION);

        case "clear":
            return await singleRemove(CRM_USER_ACTIVITY_SELECTION_SECTION);

        default:
            return true;
    }
}

// For progress Circular For Home Data
export async function progressCircularForHomeData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(PROGRESS_CIRCULAR_FOR_HOME, data);
            }
            return true;
        case "get":
            return await getData(PROGRESS_CIRCULAR_FOR_HOME);

        case "clear":
            return await singleRemove(PROGRESS_CIRCULAR_FOR_HOME);

        default:
            return true;
    }
}


// For user attendance Data
export async function attendanceData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(USER_ATTENDANCE_DATA, data);
            }
            return true;
        case "get":
            return await getData(USER_ATTENDANCE_DATA);

        case "clear":
            return await singleRemove(USER_ATTENDANCE_DATA);

        default:
            return true;
    }
}

// For day wise order list
export async function dayWiseOrderListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(DAY_WISE_ORDER_LIST, data);
            }
            return true;
        case "get":
            return await getData(DAY_WISE_ORDER_LIST);

        case "clear":
            return await singleRemove(DAY_WISE_ORDER_LIST);

        default:
            return true;
    }
}


// For LMS Activity Selection Section Data
export async function lmsActivitySelectionTab(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(LMS_ACTIVITY_SELECTION_TAB, data);
            }
            return true;
        case "get":
            return await getData(LMS_ACTIVITY_SELECTION_TAB);

        case "clear":
            return await singleRemove(LMS_ACTIVITY_SELECTION_TAB);

        default:
            return true;
    }
}

// For Lms sale list Section Data
export async function todaySaleListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(LMS_SALES_LIST_DATA, data);
            }
            return true;
        case "get":
            return await getData(LMS_SALES_LIST_DATA);

        case "clear":
            return await singleRemove(LMS_SALES_LIST_DATA);

        default:
            return true;
    }
}

// For  mapped location  Data
export async function mappedLocationData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(MAPPED_LOCATION_DATA, data);
            }
            return true;
        case "get":
            return await getData(MAPPED_LOCATION_DATA);

        case "clear":
            return await singleRemove(MAPPED_LOCATION_DATA);

        default:
            return true;
    }
}

// For  mapped location  Data
export async function selectedCustomerData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(SELECTED_CUSTOMER_DATA, data);
            }
            return true;
        case "get":
            return await getData(SELECTED_CUSTOMER_DATA);

        case "clear":
            return await singleRemove(SELECTED_CUSTOMER_DATA);

        default:
            return true;
    }
}

export async function mappedProductData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(MAPPED_PRODUCT_DATA, data);
            }
            return true;
        case "get":
            return await getData(MAPPED_PRODUCT_DATA);

        case "clear":
            return await singleRemove(MAPPED_PRODUCT_DATA);

        default:
            return true;
    }
}

export async function mappedHigherLevelProductData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(MAPPED_HIGHER_LEVEL_PRODUCT_DATA, data);
            }
            return true;
        case "get":
            return await getData(MAPPED_HIGHER_LEVEL_PRODUCT_DATA);

        case "clear":
            return await singleRemove(MAPPED_HIGHER_LEVEL_PRODUCT_DATA);

        default:
            return true;
    }
}


// For Visit Notes data
export async function visitData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(ROUTE_DATA, data);
            }
            return true;
        case "get":
            return await getData(ROUTE_DATA);

        case "clear":
            return await singleRemove(ROUTE_DATA);

        default:
            return true;
    }
}

// For Client Settings data
export async function clientSettings(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CLIENT_SETTINGS, data);
            }
            return true;
        case "get":
            return await getData(CLIENT_SETTINGS);

        case "clear":
            return await singleRemove(CLIENT_SETTINGS);

        default:
            return true;
    }
}


// For  office work offline data
export async function officeWorkData(data, type) {

    switch (type) {
        case "store":
            if (data) {
                await storeData(OFFICE_WORK, data);
            }
            return true;
        case "get":
            return await getData(OFFICE_WORK);

        case "clear":
            return await singleRemove(OFFICE_WORK);

        default:
            return true;
    }
}


// for offline header sec  ==========================


// For route filter listing offline data
export async function routeFilterList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(ROUTE_FILTER_LIST, data);
            }
            return true;
        case "get":
            return await getData(ROUTE_FILTER_LIST);

        case "clear":
            return await singleRemove(ROUTE_FILTER_LIST);

        default:
            return true;
    }
}



// for subordinate data store 
export async function storeSubordinateData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(SUBORDINATE_DATA, data);
            }
            return true;
        case "get":
            return await getData(SUBORDINATE_DATA);

        case "clear":
            return await singleRemove(SUBORDINATE_DATA);

        default:
            return true;
    }
}


// For Client Settings data
export async function visitNotesDropDownData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(VISIT_NOTES, data);
            }
            return true;
        case "get":
            return await getData(VISIT_NOTES);

        case "clear":
            return await singleRemove(VISIT_NOTES);

        default:
            return true;
    }
}


// For Visit notes data Settings
export async function visitNotesData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(VISIT_UPDATE, data);
            }
            return true;
        case "get":
            return await getData(VISIT_UPDATE);

        case "clear":
            return await singleRemove(VISIT_UPDATE);

        default:
            return true;
    }
}

// For Store customer Place order data
export async function customerPlaceOrderData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CUSTOMER_PLACE_ORDER_DATA, data);
            }
            return true;
        case "get":
            return await getData(CUSTOMER_PLACE_ORDER_DATA);

        case "clear":
            return await singleRemove(CUSTOMER_PLACE_ORDER_DATA);

        default:
            return true;
    }
}

// For Store customer order and visit note data
export async function customerOrderANdVisitData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CUSTOMER_ORDER_VISIT_NOTE_DATA, data);
            }
            return true;
        case "get":
            return await getData(CUSTOMER_ORDER_VISIT_NOTE_DATA);

        case "clear":
            return await singleRemove(CUSTOMER_ORDER_VISIT_NOTE_DATA);

        default:
            return true;
    }
}

// For Store customer Cart data
export async function customerCartData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CUSTOMER_CART_DATA, data);
            }
            return true;
        case "get":
            return await getData(CUSTOMER_CART_DATA);

        case "clear":
            return await singleRemove(CUSTOMER_CART_DATA);

        default:
            return true;
    }
}



// for store offline image data
export async function imageData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(OFFLINE_IMG_DATA, data);
            }
            return true;
        case "get":
            return await getData(OFFLINE_IMG_DATA);

        case "clear":
            return await singleRemove(OFFLINE_IMG_DATA);

        default:
            return true;
    }
}

// for store  trade item  List data
export async function trandItemList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(TRADE_ITEM_DATA, data);
            }
            return true;
        case "get":
            return await getData(TRADE_ITEM_DATA);

        case "clear":
            return await singleRemove(TRADE_ITEM_DATA);

        default:
            return true;
    }
}

//for store closing stocklist

export async function closingStockItemList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(CLOSING_STOCK_LIST, data);
            }
            return true;
        case "get":
            return await getData(CLOSING_STOCK_LIST);

        case "clear":
            return await singleRemove(CLOSING_STOCK_LIST);

        default:
            return true;
    }
}

//for check closing and api data
export async function storeCheckingData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(STORE_CHEACKING_DATA, data);
            }
            return true;
        case "get":
            return await getData(STORE_CHEACKING_DATA);

        case "clear":
            return await singleRemove(STORE_CHEACKING_DATA);

        default:
            return true;
    }
}

//for check notification count and api data
export async function storeNotificationCountData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(NOTIFICATION_COUNT_DATA, data);
            }
            return true;
        case "get":
            return await getData(NOTIFICATION_COUNT_DATA);

        case "clear":
            return await singleRemove(NOTIFICATION_COUNT_DATA);

        default:
            return true;
    }
}

