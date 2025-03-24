
export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [], maxPjpId: "" };
    if (data) {
        let pjpData = data.data.reportList;
        respData.maxPjpId = pjpData.length > 0 ? getMaxId(pjpData) : "0";
        respData.totalCount = data.data.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].id == undefined || pjpData[i].id == null) {
                    modObj["fieldVisitId"] = "";
                } else {
                    modObj["fieldVisitId"] = pjpData[i].id;
                }
                if (pjpData[i].customerName == undefined || pjpData[i].customerName == null) {
                    modObj["customerName"] = "";
                } else {
                    modObj["customerName"] = pjpData[i].customerName;
                }
                if (pjpData[i].contactId == undefined || pjpData[i].contactId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].contactId;
                }
                if (pjpData[i].plannedDateData == undefined || pjpData[i].plannedDateData == null) {
                    modObj["plannedDateData"] = "";
                } else {
                    modObj["plannedDateData"] = pjpData[i].plannedDateData;
                }
                if (pjpData[i].custBusinessName == undefined || pjpData[i].custBusinessName == null || pjpData[i].custBusinessName == "N/A") {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = pjpData[i].custBusinessName;
                }
                if (pjpData[i].userName == undefined || pjpData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = pjpData[i].userName;
                }
                if (pjpData[i].name == undefined || pjpData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = pjpData[i].name;
                }
                if (pjpData[i].ERPCode == undefined || pjpData[i].ERPCode == null) {
                    modObj["ERPCode"] = "";
                } else {
                    modObj["ERPCode"] = pjpData[i].ERPCode;
                }
                if (pjpData[i].isExpired == undefined || pjpData[i].isExpired == null) {
                    modObj["isExpired"] = "";
                } else {
                    modObj["isExpired"] = pjpData[i].isExpired;
                }
                if (pjpData[i].phone == undefined || pjpData[i].phone == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = pjpData[i].phone;
                }
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }
                if (pjpData[i].zoneId == undefined || pjpData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = pjpData[i].zoneId;
                }
                if (pjpData[i].cityId == undefined || pjpData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = pjpData[i].cityId;
                }
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = pjpData[i].contactTypeName;
                }
                if (pjpData[i].contactTypeId == undefined || pjpData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = pjpData[i].contactTypeId;
                }
                if (pjpData[i].visitStatusName == undefined || pjpData[i].visitStatusName == null) {
                    modObj["visitStatusName"] = "";
                } else {
                    modObj["visitStatusName"] = pjpData[i].visitStatusName;
                }
                if (pjpData[i].isConvertion == undefined || pjpData[i].isConvertion == null) {
                    modObj["isConvertion"] = "0";
                } else {
                    modObj["isConvertion"] = pjpData[i].isConvertion;
                }
                if (pjpData[i].contactId == undefined || pjpData[i].contactId == null) {
                    modObj["customerId"] = "0";
                } else {
                    modObj["customerId"] = pjpData[i].contactId;
                }
                if (pjpData[i].visitType == undefined || pjpData[i].visitType == null) {
                    modObj["visitType"] = "0";
                } else {
                    modObj["visitType"] = pjpData[i].visitType;
                }
                if (pjpData[i].email == undefined || pjpData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = pjpData[i].email;
                }
                if (pjpData[i].isInfulencer == undefined || pjpData[i].isInfulencer == null) {
                    modObj["isInfulencer"] = "0";
                } else {
                    modObj["isInfulencer"] = pjpData[i].isInfulencer;
                }
                if (pjpData[i].contactFirstName == undefined || pjpData[i].contactFirstName == null) {
                    modObj["contactFirstName"] = "";
                } else {
                    modObj["contactFirstName"] = pjpData[i].contactFirstName;
                }
                if (pjpData[i].isProject == undefined || pjpData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = pjpData[i].isProject.toString();
                }
                if (pjpData[i].visitto == undefined || pjpData[i].visitto == null) {
                    modObj["visitto"] = "";
                } else {
                    modObj["visitto"] = pjpData[i].visitto;
                }
                if (pjpData[i].visitto == undefined || pjpData[i].visitto == null) {
                    modObj["visitto"] = "";
                } else {
                    modObj["visitto"] = pjpData[i].visitto;
                }
                // if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                //     modObj["userId"] = "0";
                // } else {
                //     modObj["userId"] = pjpData[i].userId;
                // }

                if (pjpData[i].plannedDate == undefined || pjpData[i].plannedDate == null) {
                    modObj["plannedDate"] = 0;
                } else {
                    modObj["plannedDate"] = pjpData[i].plannedDate;
                }
                if (pjpData[i].stateId == undefined || pjpData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = pjpData[i].stateId;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "/images/business.jpg";
                } else {
                    modObj["profilePic"] = pjpData[i].profilePic;
                }
                if (pjpData[i].visitLocation == undefined || pjpData[i].visitLocation == null) {
                    modObj["locationData"] = "";
                } else {
                    modObj["locationData"] = pjpData[i].visitLocation;
                }

                if (pjpData[i].shopName == undefined || pjpData[i].shopName == null || pjpData[i].shopName == "N/A"|| pjpData[i].shopName == "NA"|| pjpData[i].shopName == "na") {
                    modObj["shopName"] = "";
                } else {
                    modObj["shopName"] = pjpData[i].shopName;
                }
                if (pjpData[i].contactTypeDataName == undefined || pjpData[i].contactTypeDataName == null) {
                    modObj["contactTypeDataName"] = "";
                } else {
                    modObj["contactTypeDataName"] = pjpData[i].contactTypeDataName;
                }
                if (pjpData[i].organizationName == undefined || pjpData[i].organizationName == null || pjpData[i].organizationName == "N/A" || pjpData[i].organizationName == "NA" || pjpData[i].organizationName == "na") {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = pjpData[i].organizationName;
                }



                // modObj["locationData"] = visitLocation;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}

function getMaxId(arrData) {
     arrData.sort((a, b) => b.id - a.id);
    return arrData[0].id
}


// function getAddress(obj) {
//     let mainString = "";
//     if (Object.keys(obj).length > 0) {
//         for (let key in obj) {
//             mainString = mainString + (obj[key] + "\n")
//         }
//     }
//     return mainString
// }