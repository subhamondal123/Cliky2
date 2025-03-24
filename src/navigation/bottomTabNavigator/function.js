import { Color, ImageName } from "../../enums";
import { StorageDataModification } from "../../services/common-view-function";
import { MiddlewareCheck } from "../../services/middleware";

// for select and unselect tab view
export function selectUnselectTabView(focused) {
    let respViewStyle = {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 500
    };
    if (focused) {
        respViewStyle["backgroundColor"] = Color.COLOR.BLUE.DE_5902;
    }
    return respViewStyle;
}

// for select and unselect Fevourit view
export function selectUnselectFevouritView(focused) {
    let respViewStyle = {
        height: 65,
        width: 65,
        borderRadius: 100,
        backgroundColor: '#F13748',
        justifyContent: 'center',
        alignItems: 'center',
        left: 42,
        bottom: 30
    }
    if (focused) {
        respViewStyle.backgroundColor = "#F13748";
    }
    return respViewStyle;
}

// for select and unselect Fevourit image
export function selectUnselectFevouritImage(focused) {
    let respImg = ImageName.CHALO_BACHO_LIGHT_RED_LOGO;
    if (focused) {
        respImg = ImageName.CROSS_LIGHT_RED;
    }
    return respImg;
}

export async function getNotificationCount(props) {
    let data = await StorageDataModification.storeNotificationCountData({}, 'get')
}

