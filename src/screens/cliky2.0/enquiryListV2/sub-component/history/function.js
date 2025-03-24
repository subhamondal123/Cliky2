
export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "enquiryList": [] };
    if (data) {
        let enquiriesListData = data.response.data;
        respData.totalCount = data.response.count;
        if (enquiriesListData && enquiriesListData.length > 0) {
            for (let i = 0; i < enquiriesListData.length; i++) {
                let modObj = {};
                if (enquiriesListData[i].contactId == undefined || enquiriesListData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = enquiriesListData[i].contactId;
                }
                if (enquiriesListData[i].contactFullName == undefined || enquiriesListData[i].contactFullName == null) {
                    modObj["enqueryTitle"] = "";
                } else {
                    modObj["enqueryTitle"] = enquiriesListData[i].contactFullName;
                }
                
                if (enquiriesListData[i].LeadOwner == undefined || enquiriesListData[i].LeadOwner == null) {
                    modObj["LeadOwner"] = "";
                } else {
                    modObj["LeadOwner"] = enquiriesListData[i].LeadOwner;
                }
                if (enquiriesListData[i].isFavorite == undefined || enquiriesListData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = enquiriesListData[i].isFavorite;
                }
                if (enquiriesListData[i].leadId == undefined || enquiriesListData[i].leadId == null) {
                    modObj["leadId"] = "";
                } else {
                    modObj["leadId"] = enquiriesListData[i].leadId;
                }
                if (enquiriesListData[i].VisitStatus == undefined || enquiriesListData[i].VisitStatus == null) {
                    modObj["VisitStatus"] = "";
                } else {
                    modObj["VisitStatus"] = enquiriesListData[i].VisitStatus;
                }
             
                
                if (enquiriesListData[i].profilePic == undefined || enquiriesListData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = enquiriesListData[i].profilePic;
                }
             
             
               
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.enquiryList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].check = !enquiryData[i].check;
            } else {
                enquiryData[i].check = false;
            }
        }
    }
    return enquiryData;
}

export function checkedListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}
export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}
