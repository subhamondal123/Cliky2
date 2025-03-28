// define all fields length validation

export const VALIDATIONS = Object.freeze({
    FIRSTNAME_MIN: 1,
    FIRSTNAME_MAX: 100,
    LASTNAME_MIN: 1,
    LASTNAME_MAX: 100,
    MOBILE_MIN: 10,
    MOBILE_MAX: 14,
    PASSWORD_MIN: 7,
    PASSWORD_MAX: 15,
    EMAIL_MIN: 0,
    EMAIL_MAX: 100,
    CITY_MAX: 100,
    ZIP_MIN: 1,
    ZIP_MAX: 15,
    SEARCH_MIN: 1,
    SEARCH_MAX: 128,
    ORDERBY_MIN: 1,
    ORDERBY_MAX: 128,
    ADDRESS_MIN: 1,
    ADDRESS_MAX: 256,
    PROPERTYNAME_MIN: 1,
    PROPERTYNAME_MAX: 128,
    LOCATIONNAME_MIN: 1,
    LOCATIONNAME_MAX: 150,
    INVENTORYNAME_MAX: 128,
    DESCRIPTINON_MAX: 500,
    PROMO_TITLE_MAX: 128,
    PROMO_CODE_MAX: 100,
    PRICING_PLAN_MAX: 128,
    ROOMNAME_MAX: 128,
    FAQ_QUESTION_MIN: 1,
    FAQ_ANSWER_MIN: 1,
    FAQ_QUESTION_MAX: 228,
    FAQ_ANSWER_MAX: 2128,
    AMOUNT_MIN: 1,
    AMOUNT_MAX: 7,
    WINNING_PROBABILITY_MAX:2
});