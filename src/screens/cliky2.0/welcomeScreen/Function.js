import { App_uri } from "../../../services/config";

export function modBannerData(data) {
    let respData = [];
    if (data && data.data) {
        let arrData = data.data;
        if (arrData.length > 0) {
            for (let i = 0; i < arrData.length; i++) {
                let modObj = {};
                if (arrData[i].id == undefined || arrData[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = arrData[i].id
                }
                if (arrData[i].fileName == undefined || arrData[i].fileName == null) {
                    modObj["fileName"] = ""
                } else {
                    modObj["fileName"] = App_uri.AWS_S3_IMAGE_VIEW_URI + arrData[i].fileName
                }
                if (arrData[i].orginalFileName == undefined || arrData[i].orginalFileName == null) {
                    modObj["orginalFileName"] = ""
                } else {
                    modObj["orginalFileName"] = arrData[i].orginalFileName
                }
                if (arrData[i].createdAt == undefined || arrData[i].createdAt == null) {
                    modObj["createdAt"] = ""
                } else {
                    modObj["createdAt"] = arrData[i].createdAt
                }
                respData.push(modObj)
            }
        }
        return respData;
    }
}


export function modifyUserObj(data) {
    let modObj = {};
    if (data.isAttendence == undefined || data.isAttendence == null) {
        modObj["isAttendence"] = "0"
    } else {
        modObj["isAttendence"] = data.isAttendence
    }
    if (data.activityType == undefined || data.activityType == null || data.activityType == "") {
        modObj["activityType"] = ""
    } else {
        modObj["activityType"] = data.activityType
    }
    if (data.isOdometer == undefined || data.isOdometer == null || data.isOdometer == "") {
        modObj["isOdometer"] = ""
    } else {
        modObj["isOdometer"] = data.isOdometer
    }
    if (data.details == undefined || data.details == null || data.details == {}) {
        modObj["details"] = {}
    } else {
        modObj["details"] = modDataObj(data.details)
    }
    if (data.notificationCount == undefined || data.notificationCount == null || data.notificationCount == {}) {
        modObj["notificationCount"] = {}
    } else {
        modObj["notificationCount"] = data.notificationCount
    }

    return modObj
}


export function modDataObj(data) {
    let dataObj = {}
    if (data.userId == undefined || data.userId == null || data.userId == "") {
        dataObj["userId"] = ""
    } else {
        dataObj["userId"] = data.userId
    }
    if (data.name == undefined || data.name == null || data.name == "") {
        dataObj["name"] = ""
    } else {
        dataObj["name"] = data.name
    }
    if (data.clientId == undefined || data.clientId == null || data.clientId == "") {
        dataObj["clientId"] = ""
    } else {
        dataObj["clientId"] = data.clientId
    }
    if (data.username == undefined || data.username == null || data.username == "") {
        dataObj["username"] = ""
    } else {
        dataObj["username"] = data.username
    }
    if (data.email == undefined || data.email == null || data.email == "") {
        dataObj["email"] = ""
    } else {
        dataObj["email"] = data.email
    }
    if (data.phone == undefined || data.phone == null || data.phone == "") {
        dataObj["phone"] = ""
    } else {
        dataObj["phone"] = data.phone
    }
    if (data.address == undefined || data.address == null || data.address == "") {
        dataObj["address"] = ""
    } else {
        dataObj["address"] = data.address
    }
    if (data.hmName == undefined || data.hmName == null || data.hmName == "") {
        dataObj["hmName"] = ""
    } else {
        dataObj["hmName"] = data.hmName
    }
    if (data.hierarchyDataId == undefined || data.hierarchyDataId == null || data.hierarchyDataId == "") {
        dataObj["hierarchyDataId"] = ""
    } else {
        dataObj["hierarchyDataId"] = data.hierarchyDataId
    }
    if (data.profileImgUrl == undefined || data.profileImgUrl == null || data.profileImgUrl == "") {
        dataObj["profileImgUrl"] = ""
    } else {
        dataObj["profileImgUrl"] = data.profileImgUrl
    }
    if (data.designationName == undefined || data.designationName == null || data.designationName == "") {
        dataObj["designationName"] = ""
    } else {
        dataObj["designationName"] = data.designationName
    }
    if (data.roleName == undefined || data.roleName == null || data.roleName == "") {
        dataObj["roleName"] = ""
    } else {
        dataObj["roleName"] = data.roleName
    }
    if (data.createdAt == undefined || data.createdAt == null || data.createdAt == "") {
        dataObj["createdAt"] = ""
    } else {
        dataObj["createdAt"] = data.createdAt
    }
    if (data.isActive == undefined || data.isActive == null || data.isActive == "") {
        dataObj["isActive"] = ""
    } else {
        dataObj["isActive"] = data.isActive
    }
    if (data.tcsERPcode == undefined || data.tcsERPcode == null || data.tcsERPcode == "") {
        dataObj["tcsERPcode"] = ""
    } else {
        dataObj["tcsERPcode"] = data.tcsERPcode
    }
    if (data.cmpERPcode == undefined || data.cmpERPcode == null || data.cmpERPcode == "") {
        dataObj["cmpERPcode"] = ""
    } else {
        dataObj["cmpERPcode"] = data.cmpERPcode
    }
    if (data.erpCode == undefined || data.erpCode == null || data.erpCode == "") {
        dataObj["erpCode"] = ""
    } else {
        dataObj["erpCode"] = data.erpCode
    }
    if (data.dateOfJoining == undefined || data.dateOfJoining == null || data.dateOfJoining == "") {
        dataObj["dateOfJoining"] = ""
    } else {
        dataObj["dateOfJoining"] = data.dateOfJoining
    }
    if (data.hmTypDesc == undefined || data.hmTypDesc == null || data.hmTypDesc == "") {
        dataObj["hmTypDesc"] = ""
    } else {
        dataObj["hmTypDesc"] = data.hmTypDesc
    }
    if (data.levelId == undefined || data.levelId == null || data.levelId == "") {
        dataObj["levelId"] = ""
    } else {
        dataObj["levelId"] = data.levelId
    }
    if (data.pointsEarned == undefined || data.pointsEarned == null || data.pointsEarned == "") {
        dataObj["pointsEarned"] = ""
    } else {
        dataObj["pointsEarned"] = data.pointsEarned
    }
    if (data.levelName == undefined || data.levelName == null || data.levelName == "") {
        dataObj["levelName"] = ""
    } else {
        dataObj["levelName"] = data.levelName
    }

    if (data.hmUpperNodes == undefined || data.hmUpperNodes == null || data.hmUpperNodes == "") {
        dataObj["hmUpperNodes"] = ""
    } else {
        dataObj["hmUpperNodes"] = modhmUpperNodes(data.hmUpperNodes)
    }

    return dataObj
}

export function modhmUpperNodes(data) {
    let hmUpperObj = {}
    if (data.Beat == undefined || data.Beat == null || data.Beat == "") {
        hmUpperObj["Beat"] = ""
    } else {
        hmUpperObj["Beat"] = data.Beat
    }
    if (data.Territory == undefined || data.Territory == null || data.Territory == "") {
        hmUpperObj["Territory"] = ""
    } else {
        hmUpperObj["Territory"] = data.Territory
    }
    if (data.Region == undefined || data.Region == null || data.Region == "") {
        hmUpperObj["Region"] = ""
    } else {
        hmUpperObj["Region"] = data.Region
    }
    if (data.Zone == undefined || data.Zone == null || data.Zone == "") {
        hmUpperObj["Zone"] = ""
    } else {
        hmUpperObj["Zone"] = data.Zone
    }
    if (data.Country == undefined || data.Country == null || data.Country == "") {
        hmUpperObj["Country"] = ""
    } else {
        hmUpperObj["Country"] = data.Country
    }
    return hmUpperObj
}

