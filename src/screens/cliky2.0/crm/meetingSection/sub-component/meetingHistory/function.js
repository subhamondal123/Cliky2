export function meetinglistModifyData(data) {
    var respData = { "totalCount": 0, "meetingList": [] };
    if (data) {
        let meetingListData = data.data;
        respData.totalCount = data.count;
        if (meetingListData && meetingListData.length > 0) {
            for (let i = 0; i < meetingListData.length; i++) {
                let modObj = {};
                if (meetingListData[i].id == undefined || meetingListData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = meetingListData[i].id;
                }
                if (meetingListData[i].eventDate == undefined || meetingListData[i].eventDate == null) {
                    modObj["eventDate"] = "";
                } else {
                    modObj["eventDate"] = meetingListData[i].eventDate;
                }
                if (meetingListData[i].proposedBudget == undefined || meetingListData[i].proposedBudget == null) {
                    modObj["proposedBudget"] = "";
                } else {
                    modObj["proposedBudget"] = meetingListData[i].proposedBudget;
                }
                if (meetingListData[i].sanctionedBudget == undefined || meetingListData[i].sanctionedBudget == null) {
                    modObj["sanctionedBudget"] = "";
                } else {
                    modObj["sanctionedBudget"] = meetingListData[i].sanctionedBudget;
                }
                if (meetingListData[i].expectedAttendeesNo == undefined || meetingListData[i].expectedAttendeesNo == null) {
                    modObj["expectedAttendeesNo"] = "";
                } else {
                    modObj["expectedAttendeesNo"] = meetingListData[i].expectedAttendeesNo;
                }
                if (meetingListData[i].location == undefined || meetingListData[i].location == null) {
                    modObj["location"] = "";
                } else {
                    modObj["location"] = meetingListData[i].location;
                }
                if (meetingListData[i].name == undefined || meetingListData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = meetingListData[i].name;
                }
                if (meetingListData[i].duration == undefined || meetingListData[i].duration == null) {
                    modObj["duration"] = "";
                } else {
                    modObj["duration"] = meetingListData[i].duration;
                }
                if (meetingListData[i].description == undefined || meetingListData[i].description == null) {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = meetingListData[i].description;
                }
                if (meetingListData[i].notify == undefined || meetingListData[i].notify == null) {
                    modObj["notify"] = "";
                } else {
                    modObj["notify"] = meetingListData[i].notify;
                }
                if (meetingListData[i].meetingTypeName == undefined || meetingListData[i].meetingTypeName == null) {
                    modObj["meetingTypeName"] = "";
                } else {
                    modObj["meetingTypeName"] = meetingListData[i].meetingTypeName;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.meetingList.push(modObj);

            }
        }
    }
    return (respData);
}