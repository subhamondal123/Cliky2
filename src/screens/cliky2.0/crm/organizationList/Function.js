export function organizationModifyData(data) {
    var respData = { "totalCount": 0, "organizationList": [] };
    if (data) {
        let organizationData = data;
        respData.totalCount = data.count;
        if (organizationData && organizationData.length > 0) {
            for (let i = 0; i < organizationData.length; i++) {
                let modObj = {};
                if (organizationData[i].organizationId == undefined || organizationData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = organizationData[i].organizationId;
                }
                if (organizationData[i].organizationName == undefined || organizationData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = organizationData[i].organizationName;
                }
                if (organizationData[i].website == undefined || organizationData[i].website == null) {
                    modObj["website"] = "";
                } else {
                    modObj["website"] = organizationData[i].website;
                }
                if (organizationData[i].ownerName == undefined || organizationData[i].ownerName == null) {
                    modObj["ownerName"] = 0;
                } else {
                    modObj["ownerName"] = organizationData[i].ownerName;
                }
                if (organizationData[i].anualRevenue == undefined || organizationData[i].anualRevenue == null) {
                    modObj["anualRevenue"] = "";
                } else {
                    modObj["anualRevenue"] = organizationData[i].anualRevenue;
                }
                if (organizationData[i].email == undefined || organizationData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = organizationData[i].email;
                }
               
                if (organizationData[i].phone == undefined || organizationData[i].phone == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = organizationData[i].phone;
                }
             
                if (organizationData[i].approvedStatus == undefined || organizationData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = organizationData[i].approvedStatus;
                }
                if (organizationData[i].contactName == undefined || organizationData[i].contactName == null) {
                    modObj["contactName"] = [];
                } else {
                    modObj["contactName"] = organizationData[i].contactName;
                }
                if (organizationData[i].createdByName == undefined || organizationData[i].createdByName == null) {
                    modObj["createdByName"] = "";
                } else {
                    modObj["createdByName"] = organizationData[i].createdByName;
                }


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.organizationList.push(modObj);
            }
        }
    }
    return (respData);
}

modifyLocationData = (obj) => {
    const transformedArray = Object.keys(obj).map(key => ({ key, name: obj[key] }));

    return transformedArray

}

// convert list data
export function convertListData(organizationData, item) {
    if (organizationData && organizationData.length > 0) {
        for (let i = 0; i < organizationData.length; i++) {
            if (organizationData[i].organizationId == item.organizationId) {
                organizationData[i].check = !organizationData[i].check;
            } else {
                organizationData[i].check = false;
            }
        }
    }
    return organizationData;
}

export function checkedListData(organizationData, item) {
    if (organizationData && organizationData.length > 0) {
        for (let i = 0; i < organizationData.length; i++) {
            if (organizationData[i].organizationId == item.organizationId) {
                organizationData[i].tick = !organizationData[i].tick;
            } else {
                organizationData[i].tick = false;
            }
        }
    }
    return organizationData;
}