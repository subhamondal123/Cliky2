import { DateConvert } from "../../../services/common-view-function";
import { App_uri } from "../../../services/config";

export function modifyListData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {

            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null) {
                data[i].hierarchyDataId = "";
            } else {
                data[i].hierarchyDataId = data[i].hierarchyDataId;
            }
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null) {
                data[i].hierarchyTypeId = "";
            } else {
                data[i].hierarchyTypeId = data[i].hierarchyTypeId;
            }
            if (data[i].hmName == undefined || data[i].hmName == null) {
                data[i].hmName = "";
            } else {
                data[i].hmName = data[i].hmName;
            }
            if (data[i].hmTypDesc == undefined || data[i].hmTypDesc == null) {
                data[i].hmTypDesc = "";
            } else {
                data[i].hmTypDesc = data[i].hmTypDesc;
            }
           

            data[i]["listOpenCheck"] = false;
            data[i]["itemSelectcheck"] = false;
            data[i]["check"] = false;
            // if (selectItem && selectItem.length > 0) {
            //     for (let j = 0; j < selectItem.length; j++) {
            //         if (data[i].customerId == selectItem[j].customerId) {
            //             data[i].itemSelectcheck = true;
            //             break;
            //         }
            //     }
            // }
        }
    }
    return data;
}

export function modifyOutletListData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {

            if (data[i].customerId == undefined || data[i].customerId == null) {
                data[i].customerId = "";
            } else {
                data[i].customerId = data[i].customerId;
            }
            if (data[i].id == undefined || data[i].id == null) {
                data[i].id = "";
            } else {
                data[i].id = data[i].id;
            }
            if (data[i].customerName == undefined || data[i].customerName == null) {
                data[i].customerName = "";
            } else {
                data[i].customerName = data[i].customerName;
            }
            if (data[i].isPlanned == undefined || data[i].isPlanned == null) {
                data[i].isPlanned = "";
            } else {
                data[i].isPlanned = data[i].isPlanned == "0" ? "Unplanned Visit" : "Planned Visit";
            }
            if (data[i].nextFollowUpDate == undefined || data[i].nextFollowUpDate == null) {
                data[i].nextFollowUpDate = "N/A";
            } else {
                data[i].nextFollowUpDate = DateConvert.formatDDMMYYYY(data[i].nextFollowUpDate);
            }


            if (data[i].customerType == undefined || data[i].customerType == null) {
                data[i].customerType = "";
            } else {
                data[i].customerType = data[i].customerType;
            }
            if (data[i].countryId == undefined || data[i].countryId == null) {
                data[i].countryId = "";
            } else {
                data[i].countryId = data[i].countryId;
            }
            if (data[i].stateId == undefined || data[i].stateId == null) {
                data[i].stateId = "";
            } else {
                data[i].stateId = data[i].stateId;
            }
            if (data[i].stateName == undefined || data[i].stateName == null) {
                data[i].stateName = "";
            } else {
                data[i].stateName = data[i].stateName;
            }
            if (data[i].districtId == undefined || data[i].districtId == null) {
                data[i].districtId = "";
            } else {
                data[i].districtId = data[i].districtId;
            }
            if (data[i].cityName == undefined || data[i].cityName == null) {
                data[i].cityName = "";
            } else {
                data[i].cityName = data[i].cityName;
            }
            if (data[i].zoneId == undefined || data[i].zoneId == null) {
                data[i].zoneId = "";
            } else {
                data[i].zoneId = data[i].zoneId;
            }
            if (data[i].zoneName == undefined || data[i].zoneName == null) {
                data[i].zoneName = "";
            } else {
                data[i].zoneName = data[i].zoneName;
            }
            if (data[i].contactTypeId == undefined || data[i].contactTypeId == null) {
                data[i].contactTypeId = "";
            } else {
                data[i].contactTypeId = data[i].contactTypeId;
            }
            if (data[i].contactTypeName == undefined || data[i].contactTypeName == null) {
                data[i].contactTypeName = "";
            } else {
                data[i].contactTypeName = data[i].contactTypeName;
            }
            if (data[i].custBusinessName == undefined || data[i].custBusinessName == null) {
                data[i].custBusinessName = "";
            } else {
                data[i].custBusinessName = data[i].custBusinessName;
            }
            if (data[i].phone == undefined || data[i].phone == null) {
                data[i].phone = "";
            } else {
                data[i].phone = data[i].phone;
            }
            if (data[i].email == undefined || data[i].email == null) {
                data[i].email = "";
            } else {
                data[i].email = data[i].email;
            }
            if (data[i].title == undefined || data[i].title == null) {
                data[i].title = "";
            } else {
                data[i].title = data[i].title;
            }
            if (data[i].gender == undefined || data[i].gender == null) {
                data[i].gender = "";
            } else {
                data[i].gender = data[i].gender;
            }
            if (data[i].address == undefined || data[i].address == null) {
                data[i].address = "";
            } else {
                data[i].address = data[i].address;
            }
            if (data[i].zoneName == undefined || data[i].zoneName == null) {
                data[i].zoneName = "";
            } else {
                data[i].zoneName = data[i].zoneName;
            }
            if (data[i].actualDate == undefined || data[i].actualDate == null) {
                data[i].actualDate = "";
            } else {
                data[i].actualDate = data[i].actualDate;
            }

            if (data[i].organizationName == undefined || data[i].organizationName == null) {
                data[i].organizationName = "";
            } else {
                data[i].organizationName = data[i].organizationName;
            }
            if (data[i].visitStatusName == undefined || data[i].visitStatusName == null) {
                data[i].visitStatusName = "N/A";
            } else {
                data[i].visitStatusName = data[i].visitStatusName;
            }
            if (data[i].profilePic == undefined || data[i].profilePic == null) {
                data[i].profilePic = App_uri.IMAGE_URI + "/images/profileImage.png";
            } else {
                data[i].profilePic = App_uri.IMAGE_VIEW_URI + data[i].profilePic;
            }
            if (data[i].isConvertion == undefined || data[i].isConvertion == null) {
                data[i].isConvertion = 0;
            } else {
                data[i].isConvertion = data[i].isConvertion;
            }

            if (data[i].hmName == undefined || data[i].hmName == null) {
                data[i].hmName = "";
            } else {
                data[i].hmName = data[i].hmName;
            }
            if (data[i].hmTypDesc == undefined || data[i].hmTypDesc == null) {
                data[i].hmTypDesc = "";
            } else {
                data[i].hmTypDesc = data[i].hmTypDesc;
            }

            data[i]["listOpenCheck"] = false;
            data[i]["itemSelectcheck"] = false;
            // if (selectItem && selectItem.length > 0) {
            //     for (let j = 0; j < selectItem.length; j++) {
            //         if (data[i].customerId == selectItem[j].customerId) {
            //             data[i].itemSelectcheck = true;
            //             break;
            //         }
            //     }
            // }
        }
    }
    return data;
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].id == item.id) {
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
            if (enquiryData[i].id == item.id) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}


export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
        }
    } else {
        data = [];
    }
    return data;
}

export function dateModArr(inputJson) {
    let arr = [];
    if (inputJson && inputJson.length > 0) {
        const outputJson = {};
        inputJson.forEach(item => {
            // const actualDate = new Date(item.actualDate);
            const dayKey = item.hmName;
            if (!outputJson[dayKey]) {
                outputJson[dayKey] = [];
            }
            outputJson[dayKey].push(item);
        });

        const finalOutput = Object.keys(outputJson).map(key => ({
            [key]: outputJson[key],
            "check": false
        }));
        return finalOutput
    } else {
        return arr
    }


}

