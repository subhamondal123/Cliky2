

import { StorageDataModification } from "../../../common-view-function";

export async function orderPermission(props) {
    try {
        let permissionData = {
            addPem: true,
            editPem: true,
            deletePem: true,
            viewPem: true,
            approvePem: true,
        }
        let storeData = await StorageDataModification.userMenuPermision({}, "get");
        if (storeData) {
            storeData.sfa.map((item) => {
                if (item.name == "Book Order") {
                    permissionData.addPem = item.addPem == 1 ? true : false;
                    permissionData.editPem = item.editPem == 1 ? true : false;
                    permissionData.deletePem = item.deletePem == 1 ? true : false;
                    permissionData.viewPem = item.isView == 1 ? true : false;
                    permissionData.approvePem = item.approvePem == 1 ? true : false
                }
            })
        }
        return permissionData;

    } catch (e) {
        console.log("Book Order", e);
    }
}