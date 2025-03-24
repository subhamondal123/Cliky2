export function contactModifyData(data) {
    var respData = { "totalCount": 0, "contactList": [] };
    if (data) {
        let contactData = data.data;
        respData.totalCount = data.count;
        if (contactData && contactData.length > 0) {
            for (let i = 0; i < contactData.length; i++) {
                let modObj = {};
                if (contactData[i].contactId == undefined || contactData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = contactData[i].contactId;
                }
                if (contactData[i].contactName == undefined || contactData[i].contactName == null) {
                    modObj["contactName"] = "";
                } else {
                    modObj["contactName"] = contactData[i].contactName;
                }
                if (contactData[i].isFavorite == undefined || contactData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = contactData[i].isFavorite;
                }

                if (contactData[i].phoneNumber == undefined || contactData[i].phoneNumber == null) {
                    modObj["phoneNumber"] = "";
                } else {
                    modObj["phoneNumber"] = contactData[i].phoneNumber;
                }
                if (contactData[i].email == undefined || contactData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = contactData[i].email;
                }
                if (contactData[i].contactTypeId == undefined || contactData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = contactData[i].contactTypeId;
                }
                if (contactData[i].contactTypeName == undefined || contactData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = contactData[i].contactTypeName;
                }
                if (contactData[i].status == undefined || contactData[i].status == null) {
                    modObj["status"] = "";
                } else {
                    modObj["status"] = contactData[i].status;
                }
                if (contactData[i].profilePic == undefined || contactData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = contactData[i].profilePic;
                }
                if (contactData[i].isConverted == undefined || contactData[i].isConverted == null) {
                    modObj["isConverted"] = "0";
                } else {
                    modObj["isConverted"] = contactData[i].isConverted;
                }
                if (contactData[i].approvedStatus == undefined || contactData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "0";
                } else {
                    modObj["approvedStatus"] = contactData[i].approvedStatus;
                }
                
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.contactList.push(modObj);
            }
        }
    }

    return (respData);
}

// convert list data
export function convertListData(contactData, item) {
    if (contactData && contactData.length > 0) {
        for (let i = 0; i < contactData.length; i++) {
            if (contactData[i].contactId == item.contactId) {
                contactData[i].check = !contactData[i].check;
            } else {
                contactData[i].check = false;
            }
        }
    }
    return contactData;
}

export function checkedListData(contactData, item) {
    if (contactData && contactData.length > 0) {
        for (let i = 0; i < contactData.length; i++) {
            if (contactData[i].contactId == item.contactId) {
                contactData[i].tick = !contactData[i].tick;
            } else {
                contactData[i].tick = false;
            }
        }
    }
    return contactData;
}
export function modListData(contactData, item,statusType) {
    if (contactData && contactData.length > 0) {
        for (let i = 0; i < contactData.length; i++) {
            if (contactData[i].contactId == item.contactId) {
                contactData[i].status = statusType;
            } 
        }
    }
    return contactData;
}

