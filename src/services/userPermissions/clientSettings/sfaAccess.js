
import { StorageDataModification } from "../../common-view-function";

export async function getSfaAccess(props) {
    try {
        let permissionData = false;
        let storeData = await StorageDataModification.clientSettings({}, "get");
        if (storeData) {
            storeData.map((item) => {
                if (item.settingsType == "hasSFA") {
                    permissionData = item.settingsValue == 1 ? true : false;

                    // permissionData = item.settingsValue == 1 ? false : true;

                }
            })
        }
        return permissionData;

    } catch (e) {
        console.log("SfaAccess", e);
    }
}