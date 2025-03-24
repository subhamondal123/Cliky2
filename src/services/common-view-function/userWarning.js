//  get the user worning
import React, { BackHandler } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
import { AlertMessage } from "../../enums";
import { multipleRemove } from "../async-storage";
import { StorageDataModification, Toaster } from '.';
import JailMonkey from 'jail-monkey';

export function actionToLogoutWorning(props, event) {
    try {
        let alertAction = [];
        let alertBody = AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_WROING_USER;
        // if (props.ReraRedux.userActive === 1) {
        //     alertBody = AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_BODY;
        //     alertAction.push({
        //         text: "No",
        //         onPress: () => console.log("No Pressed"),
        //         style: "cancel"
        //     });
        // }
        alertAction.push({ text: "Yes", onPress: () => removeLoginData(props, event) });

        return Alert.alert(
            AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
            alertBody,
            alertAction
        );
    } catch (e) {
        console.log(e);
    }
}



export async function removeLoginData(props, event) {
    try {
        await StorageDataModification.removeLoginData();
        props.stateUserLoginType("");
        props.navigation.dispatch(event.data.action);
    } catch (e) {
        console.log(e);
    }
}


export async function actionUnauthorizedDeviceWarning(props) {
    try {
        // if (JailMonkey.isJailBroken()) {
        //     Alert.alert(
        //         AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
        //         AlertMessage.MESSAGE.USER_WARNING.ROOT_DEVICE,
        //         [
        //             { text: "Yes", onPress: () => BackHandler.exitApp() }
        //         ]
        //     );
        //     return false;
        // }
        // else if (await JailMonkey.isDevelopmentSettingsMode()) {
        //     Alert.alert(
        //         AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
        //         AlertMessage.MESSAGE.USER_WARNING.ENABLE_DEVELOPER_MODE,
        //         [
        //             { text: "Yes", onPress: () => BackHandler.exitApp() }
        //         ]
        //     );
        //     return false;
        // }
        // else {
            return true;
        // }
    } catch (e) {
        console.log(e);
    }
}

//for customer lIst details screen
export function actionPreventBackCustomerListDetails(state, props, e) {
    try {
        if (state.isStockUpdateAdded && state.isFeedbackAdded && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded && state.isFeedbackAdded == false && state.isVisitNoteAdded) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.FEEDBACK_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded == false && state.isFeedbackAdded && state.isVisitNoteAdded) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.STOCK_UPDATE_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded && state.isFeedbackAdded == false && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_AND_FEEDBACK_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded == false && state.isVisitNoteAdded == false && state.isFeedbackAdded) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_AND_STOCK_UPDATE_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded == false && state.isVisitNoteAdded && state.isFeedbackAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.FEEDBACK_AND_STOCK_UPDATE_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded == false && state.isFeedbackAdded == false && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.FEEDBACK_STOCK_UPDATE_VISIT_NOTE_WARNING);
            e.preventDefault();
        }
        if (state.isStockUpdateAdded && state.isFeedbackAdded && state.isVisitNoteAdded) {
            e.preventDefault(false);
            props.navigation.dispatch(e.data.action);
        }
    } catch (e) {
        console.log(e);
    }
}


//for Influencer lIst details screen
export function actionPreventBackInfluencerListDetails(state, props, e) {
    try {
        if (state.isFeedbackAdded == false && state.isVisitNoteAdded) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.FEEDBACK_WARNING);
            e.preventDefault();
        }
        if (state.isFeedbackAdded && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_WARNING);
            e.preventDefault();
        }
        if (state.isFeedbackAdded == false && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_AND_FEEDBACK_WARNING);
            e.preventDefault();
        }

        if (state.isFeedbackAdded && state.isVisitNoteAdded) {
            e.preventDefault(false);
            props.navigation.dispatch(e.data.action);
        }
    } catch (e) {
        console.log(e);
    }
}


//for project target lIst details screen
export function actionPreventBackProjectTargetListDetails(state, props, e) {
    try {
        if (state.isFeedbackAdded == false && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_WARNING);
            e.preventDefault();
        }

        if (state.isVisitNoteAdded) {
            e.preventDefault(false);
            props.navigation.dispatch(e.data.action);
        }
    } catch (e) {
        console.log(e);
    }
}

//for Target lIst details screen
export function actionPreventBackTargetListDetails(state, props, e) {
    try {
        if (state.isFeedbackAdded == false && state.isVisitNoteAdded) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.FEEDBACK_WARNING);
            e.preventDefault();
        }
        if (state.isFeedbackAdded && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_WARNING);
            e.preventDefault();
        }
        if (state.isFeedbackAdded == false && state.isVisitNoteAdded == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CUSTOMER_LIST_DETAILS_WARING.VISIT_NOTE_AND_FEEDBACK_WARNING);
            e.preventDefault();
        }

        if (state.isFeedbackAdded && state.isVisitNoteAdded) {
            e.preventDefault(false);
            props.navigation.dispatch(e.data.action);
        }
    } catch (e) {
        console.log(e);
    }
}