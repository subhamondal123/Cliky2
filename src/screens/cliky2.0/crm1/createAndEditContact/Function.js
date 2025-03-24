import { DateConvert } from "../../../../services/common-view-function";

export function modifyAllContactBusinessTypeData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        obj["check"] = false;
        arr.push(obj);
    }
    return arr;
}

export function modifyLandingData(data) {
    if (data.contactTypData.length > 0) {
        for (let i = 0; i < data.contactTypData.length; i++) {
            data.contactTypData[i]["id"] = data.contactTypData[i].contactTypeId;
            data.contactTypData[i]["name"] = data.contactTypData[i].contactTypeName;
        }
    }

    if (data.platformData.length > 0) {
        for (let i = 0; i < data.platformData.length; i++) {
            data.platformData[i]["id"] = data.platformData[i].platformId;
            data.platformData[i]["name"] = data.platformData[i].platformName;
        }
    }

    if (data.occassionData.length > 0) {
        for (let i = 0; i < data.occassionData.length; i++) {
            data.occassionData[i]["id"] = data.occassionData[i].occasionId;
            data.occassionData[i]["name"] = data.occassionData[i].occasionName;
        }
    }

    if (data.countryData.length > 0) {
        for (let i = 0; i < data.countryData.length; i++) {
            data.countryData[i]["id"] = data.countryData[i].countryId;
            data.countryData[i]["name"] = data.countryData[i].countryName;
        }
    }

    if (data.activityList.length > 0) {
        for (let i = 0; i < data.activityList.length; i++) {
            data.activityList[i]["id"] = data.activityList[i].activityId;
            data.activityList[i]["name"] = data.activityList[i].activiryName;
        }
    }

    if (data.userList.length > 0) {
        for (let i = 0; i < data.userList.length; i++) {
            data.userList[i]["id"] = data.userList[i].userId;
            data.userList[i]["name"] = data.userList[i].firstName + " " + data.userList[i].lastName;
        }
    }

    return data;
}

export function modifyResp(data, allContactLanding) {
    let modifiedResp = {};
    if (data) {
        if (data.contactId == undefined || data.contactId == null) {
            modifiedResp["contactId"] = "";
        } else {
            modifiedResp["contactId"] = data.contactId;
        }
        if (data.organizationId == undefined || data.organizationId == null) {
            modifiedResp["orgId"] = "";
        } else {
            modifiedResp["orgId"] = data.organizationId;
        }

        if (data.contactFirstName == undefined || data.contactFirstName == null) {
            modifiedResp["firstName"] = "";
        } else {
            modifiedResp["firstName"] = data.contactFirstName;
        }

        if (data.contactLastName == undefined || data.contactLastName == null) {
            modifiedResp["lastName"] = "";
        } else {
            modifiedResp["lastName"] = data.contactLastName;
        }

        if (data.contactTitle == undefined || data.contactTitle == null) {
            modifiedResp["title"] = "";
        } else {
            modifiedResp["title"] = data.contactTitle;
        }
        if (data.contactClientId == undefined || data.contactClientId == null) {
            modifiedResp["contactClientId"] = "";
        } else {
            modifiedResp["contactClientId"] = data.contactClientId;
        }
        if (data.contactTypeName == undefined || data.contactTypeName == null) {
            modifiedResp["contactTypeName"] = "";
        } else {
            modifiedResp["contactTypeName"] = data.contactTypeName;
        }
        if (data.businessType == undefined || data.businessType == null) {
            modifiedResp["businessType"] = "";
        } else {
            modifiedResp["businessType"] = data.businessType;
        }
        if (data.approvedStatus == undefined || data.approvedStatus == null) {
            modifiedResp["approvedStatus"] = "";
        } else {
            modifiedResp["approvedStatus"] = data.approvedStatus;
        }
        


        if (data.contactTypeId == undefined || data.contactTypeId == null) {
            modifiedResp["selectedContactType"] = null;
        } else {
            modifiedResp["selectedContactType"] = data.contactTypeId;
        }

        if (data.contactStatus == undefined || data.contactStatus == null) {
            modifiedResp["selectedStatus"] = null;
        } else {
            modifiedResp["selectedStatus"] = data.contactStatus == '1' ? parseInt(data.contactStatus) : 0;
        }

        if (data.contactPhone == undefined || data.contactPhone == null) {
            modifiedResp["phoneNumberArr"] = [
                { phoneNumber: "", phoneNumberActive: false },
            ];
        } else {
            modifiedResp["phoneNumberArr"] = modifyPhoneNumStrToArr(data.contactPhone);
        }

        if (data.contactEmail == undefined || data.contactEmail == null) {
            modifiedResp["emailArr"] = [
                { emailId: "", emailActive: false },
            ];
        } else {
            modifiedResp["emailArr"] = modifyEmailStrToArr(data.contactEmail);
        }

        if (data.contactAddress == undefined || data.contactAddress == null) {
            modifiedResp["address"] = null;
        } else {
            modifiedResp["address"] = data.contactAddress;
        }

        if (data.contactCountryId == undefined || data.contactCountryId == null) {
            modifiedResp["selectedCountry"] = null;
        } else {
            modifiedResp["selectedCountry"] = data.contactCountryId;
        }

        if (data.contactStateId == undefined || data.contactStateId == null) {
            modifiedResp["selectedState"] = null;
        } else {
            modifiedResp["selectedState"] = data.contactStateId;
        }

        if (data.contactDistrictId == undefined || data.contactDistrictId == null) {
            modifiedResp["selectedDistrictCity"] = null;
        } else {
            modifiedResp["selectedDistrictCity"] = data.contactDistrictId;
        }

        if (data.contactZoneId == undefined || data.contactZoneId == null) {
            modifiedResp["selectedZone"] = null;
        } else {
            modifiedResp["selectedZone"] = data.contactZoneId;
        }

        if (data.contactGeolocation == undefined || data.contactGeolocation == null) {
            modifiedResp["geoLocation"] = null;
        } else {
            modifiedResp["geoLocation"] = data.contactGeolocation;
        }

        if (data.organization == undefined || data.organization == null || data.organization.length == 0) {
            modifiedResp["selectedContactBusinessTypeData"] = 0;
        } else {
            modifiedResp["selectedContactBusinessTypeData"] = 1;

            if (data.organization[0].orgName == undefined || data.organization[0].orgName == null) {
                modifiedResp["orgName"] = null;
            } else {
                modifiedResp["orgName"] = data.organization[0].orgName;
            }

            if (data.organization[0].orgAddress == undefined || data.organization[0].orgAddress == null) {
                modifiedResp["orgAddress"] = null;
            } else {
                modifiedResp["orgAddress"] = data.organization[0].orgAddress;
            }

            if (data.organization[0].orgCountryId == undefined || data.organization[0].orgCountryId == null) {
                modifiedResp["selectedOrgCountry"] = null;
            } else {
                modifiedResp["selectedOrgCountry"] = data.organization[0].orgCountryId;
            }

            if (data.organization[0].orgStateId == undefined || data.organization[0].orgStateId == null) {
                modifiedResp["selectedOrgState"] = null;
            } else {
                modifiedResp["selectedOrgState"] = data.organization[0].orgStateId;
            }

            if (data.organization[0].orgCityId == undefined || data.organization[0].orgCityId == null) {
                modifiedResp["selectedOrgDistrictCity"] = null;
            } else {
                modifiedResp["selectedOrgDistrictCity"] = data.organization[0].orgCityId;
            }

            if (data.organization[0].orgZoneId == undefined || data.organization[0].orgZoneId == null) {
                modifiedResp["selectedOrgZone"] = null;
            } else {
                modifiedResp["selectedOrgZone"] = data.organization[0].orgZoneId;
            }

            if (data.organization[0].orgAnualRevenue == undefined || data.organization[0].orgAnualRevenue == null) {
                modifiedResp["orgAnnualRevenue"] = null;
            } else {
                modifiedResp["orgAnnualRevenue"] = data.organization[0].orgAnualRevenue;
            }

            if (data.organization[0].orgNumberOfEmployee == undefined || data.organization[0].orgNumberOfEmployee == null) {
                modifiedResp["orgNumOfEmp"] = null;
            } else {
                modifiedResp["orgNumOfEmp"] = data.organization[0].orgNumberOfEmployee.toString();
            }

            if (data.organization[0].orgPhone == undefined || data.organization[0].orgPhone == null) {
                modifiedResp["orgPhoneNumberArr"] = null;
            } else {
                modifiedResp["orgPhoneNumberArr"] = modifyPhoneNumStrToArr(data.organization[0].orgPhone);
            }

            if (data.organization[0].orgEmail == undefined || data.organization[0].orgEmail == null) {
                modifiedResp["orgEmailArr"] = null;
            } else {
                modifiedResp["orgEmailArr"] = modifyEmailStrToArr(data.organization[0].orgEmail);
            }

            if (data.organization[0].orgGeoLocation == undefined || data.organization[0].orgGeoLocation == null) {
                modifiedResp["orgGeoLocation"] = null;
            } else {
                modifiedResp["orgGeoLocation"] = data.organization[0].orgGeoLocation;
            }

            if (data.organization[0].organizationId == undefined || data.organization[0].organizationId == null) {
                modifiedResp["organizationId"] = null;
            } else {
                modifiedResp["organizationId"] = data.organization[0].organizationId;
            }
        }

        if (data.contactDescription == undefined || data.contactDescription == null) {
            modifiedResp["description"] = null;
        } else {
            modifiedResp["description"] = data.contactDescription;
        }

        if (data.enevtArr == undefined || data.enevtArr == null || data.enevtArr.length == 0) {
            modifiedResp["datesToRemArr"] = null;
        } else {
            modifiedResp["datesToRemArr"] = modifyEventArr(data.enevtArr, allContactLanding.occassionData);
        }

        if (data.contactPrflPic == undefined || data.contactPrflPic == null) {
            modifiedResp["contactPrflPic"] = null;
        } else {
            modifiedResp["contactPrflPic"] = data.contactPrflPic;
        }

        if (data.platformArr == undefined || data.platformArr == null || data.platformArr.length == 0) {
            modifiedResp["platformArr"] = null;
        } else {
            modifiedResp["platformArr"] = modifyPlatformArr(data.platformArr, allContactLanding.platformData);
        }

    }
    return modifiedResp;
}

export function modifyPhoneNumStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["phoneNumber"] = splitArr[i];
        obj["phoneNumberActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEmailStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["emailId"] = splitArr[i];
        obj["emailActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEventArr(data, occassionData) {
    let modArr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};

            if (data[i].occasionId == undefined || data[i].occasionId == null) {
                obj["selectedOccasion"] = {};
            } else {
                obj["selectedOccasion"] = getOccasionObjFromArrById(data[i], occassionData);
            }

            obj["datePicker"] = false;

            if (data[i].occationDate == undefined || data[i].occationDate == null || data[i].occationDate.length == 0) {
                obj["dateObj"] = {
                    "rawDate": new Date(),
                    "date": ""
                };
            } else {
                obj["dateObj"] = {
                    "rawDate": new Date(data[i].occationDate),
                    "date": DateConvert.formatYYYYMMDD(new Date(data[i].occationDate))
                };
            }

            if (data[i].occasionReminder == undefined || data[i].occasionReminder == null) {
                obj["isReminder"] = false;
            } else {
                obj["isReminder"] = data[i].occasionReminder == "1" ? true : false;
            }

            if (data[i].occasionYrlyRepet == undefined || data[i].occasionYrlyRepet == null) {
                obj["isYearlyRepeat"] = false;
            } else {
                obj["isYearlyRepeat"] = data[i].occasionYrlyRepet == "1" ? true : false;
            }

            modArr.push(obj);
        }
    }
    return modArr;
}

export function getOccasionObjFromArrById(data, occassionData) {
    let obj = {};
    for (let i = 0; i < occassionData.length; i++) {
        if (occassionData[i].id == data.occasionId) {
            obj = occassionData[i];
        }
    }
    return obj;
}

export function modifyPlatformArr(data, platformData) {
    let modArr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};

            if (data[i].platformId == undefined || data[i].platformId == null) {
                obj["selectedTypeObj"] = {};
            } else {
                obj["selectedTypeObj"] = getPlatformObjFromArrById(data[i], platformData);
            }

            if (data[i].platformUrl == undefined || data[i].platformUrl == null) {
                obj["link"] = "";
            } else {
                obj["link"] = data[i].platformUrl;
            }

            obj["linkActive"] = false;

            modArr.push(obj);
        }
    }
    return modArr;
}

export function getPlatformObjFromArrById(data, platformData) {
    let obj = {};
    for (let i = 0; i < platformData.length; i++) {
        if (platformData[i].id == data.platformId) {
            obj = platformData[i];
        }
    }
    return obj;
}