import { App_uri } from "../../../../services/config";

export function modifyDetailsData(arr) {
    let respData = {};
    if (arr && arr.length > 0) {
        if (arr[0].id == undefined || arr[0].id == null) {
            respData["id"] = "N/A"
        } else {
            respData["id"] = arr[0].id
        }
        if (arr[0].description == undefined || arr[0].description == null) {
            respData["description"] = "N/A"
        } else {
            respData["description"] = arr[0].description
        }
        if (arr[0].imagePath == undefined || arr[0].imagePath == null) {
            respData["imagePath"] = ""
        } else {
            respData["imagePath"] = App_uri.LMS_IMAGE_VIEW_URI + arr[0].imagePath
        }
        if (arr[0].itemCode == undefined || arr[0].itemCode == null) {
            respData["itemCode"] = "N/A"
        } else {
            respData["itemCode"] = arr[0].itemCode
        }
        if (arr[0].itemName == undefined || arr[0].itemName == null) {
            respData["itemName"] = "N/A"
        } else {
            respData["itemName"] = arr[0].itemName
        }

    }
    return respData
}