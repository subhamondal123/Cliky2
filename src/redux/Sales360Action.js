// Define all the actions

export const setDeviceId = (deviceId) => ({
    type: "SET_DEVICEID",
    payload: deviceId,
});

export const stateCheckForNetwork = (networkCheckState) => ({
    type: "SET_STATE_CHECK_FOR_NETWORK",
    payload: networkCheckState,
});

export const stateAllCountries = (countryArr) => ({
    type: "SET_ALL_COUNTRIES",
    payload: countryArr,
});
export const stateUserInformation = (userInfo) => ({
    type: "SET_USER_INFORMATION",
    payload: userInfo,
});

//order customer data
export const customerOrderData = (userInfo) => ({
    type: "SET_CUSTOMER_ORDER_INFORMATION",
    payload: userInfo,
});

export const mappedCountriesUserData = (countryMappedUserArr) => ({
    type: "SET_MAPPED_COUNTRIES_USER_DATA",
    payload: countryMappedUserArr,
});

export const mappedProductUserData = (productMappedUserArr) => ({
    type: "SET_MAPPED_PRODUCT_USER_DATA",
    payload: productMappedUserArr,
});

// cart cart data by user
export const stateCartData = (cartData) => ({
    type: "SET_CART_DATA",
    payload: cartData
});
// cart selected beat route data by user
export const userSelectedBeatRouteData = (routeData) => ({
    type: "SET_BEAT_ROUTE_DATA",
    payload: routeData
});

// cart item data by user
export const stateDayActivitySelectionData = (dayActivitySelectionData) => ({
    type: "SET_DAY_ACTIVIY_SELECTION_DATA",
    payload: dayActivitySelectionData
});

// set user attendance data
export const userAttendanceData = (attendanceData) => ({
    type: "SET_ATTENDANCE_DATA",
    payload: attendanceData
});

// cart store data by user
export const stateStoreData = (storeData) => ({
    type: "SET_STORE_DATA",
    payload: storeData
});

// higher level product data by user
export const mappedHigherLevelProducts = (productData) => ({
    type: "SET_MAPPED_HIGHER_LEVEL_PRODUCT",
    payload: productData
});

// higher level product data by user
export const loginData = (loginData) => ({
    type: "SET_LOGIN_DATA",
    payload: loginData
});

// order history cart data by user
export const orderHistoryCartData = (orderHistoryCartData) => ({
    type: "SET_ORDER_HISTORY_CART_DATA",
    payload: orderHistoryCartData
});

// team performance drilldownData
export const teamPerformanceDrillDownData = (teamPerformanceDrillDownData) => ({
    type: "SET_TEAM_PERFORMANCE_DRILLDOWN_DATA",
    payload: teamPerformanceDrillDownData
});

//MORDERN TRADE

// for outlet list data store
export const storeOutletListData = (storeOutletListData) => ({
    type: "STORE_OUTLET_LIST_DATA",
    payload: storeOutletListData
});


export const storeNotificationCountData = (storeNotificationCountData) => ({
    type: "STORE_NOTIFICATION_COUNT_DATA",
    payload: storeNotificationCountData
});
