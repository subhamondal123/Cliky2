
export const PLATFORM = Object.freeze({
    IOS: 1,
    ANDROID: 2,
    WEB: 3,
})

export const MIDDLEWARE = Object.freeze({
    PICK_USER_LOCATION_URI: "pickUserCurrentLocation",
    ODOMETER_READING_URI: "addOdometer"
})

export const GAMIFICATION_CHALLENGE_TYPE = Object.freeze({
    ADMIN: 1,
    SYSTEM:2
})