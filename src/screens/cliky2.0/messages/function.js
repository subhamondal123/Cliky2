// for click on the list item

import { DateConvert, Toaster } from "../../../services/common-view-function";
import { App_uri } from "../../../services/config";
import { DataValidator } from "../../../validators";

export function modifyListData(data, selectItem) {
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
            if (selectItem && selectItem.length > 0) {
                for (let j = 0; j < selectItem.length; j++) {
                    if (data[i].customerId == selectItem[j].customerId) {
                        data[i].itemSelectcheck = true;
                        break;
                    }
                }
            }
        }
    }
    return data;
}

export function getSelectId(data, item) {
    let index = 0;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].customerId == item.customerId) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export function validateCustomer(data) {
    let errorCounter = 0;

    if (!DataValidator.dropdownEmptyValidator(data)) {
        Toaster.ShortCenterToaster("Please select customer");
        errorCounter++;
    }

    if (errorCounter === 0) {
        return { status: true };
    } else {
        return { status: false };
    }
}


export function modifySummary(data) {
    let respObj = { "profileData": {}, "stockUpdateData": [], "brandingData": [], "conversionData": [], "notes": [], "additionalNotes": [], "competitorData": [] }

    if (data && data.length > 0) {
        let profileObj = {}
        if (data[0].userName == undefined || data[0].userName == null) {
            profileObj["userName"] = "N/A";
        } else {
            profileObj["userName"] = data[0].userName;
        }
        if (data[0].isPlanned == undefined || data[0].isPlanned == null) {
            profileObj["isPlanned"] = "";
        } else {
            profileObj["isPlanned"] = data[0].isPlanned;
        }
        if (data[0].designationName == undefined || data[0].designationName == null) {
            profileObj["designationName"] = "N/A";
        } else {
            profileObj["designationName"] = data[0].designationName;
        }
        if (data[0].actualDate == undefined || data[0].actualDate == null) {
            profileObj["actualDate"] = "";
        } else {
            profileObj["actualDate"] = data[0].actualDate;
        }
        if (data[0].visitStatus == undefined || data[0].visitStatus == null) {
            profileObj["visitStatus"] = "";
        } else {
            profileObj["visitStatus"] = data[0].visitStatus;
        }
        if (data[0].visitStatusName == undefined || data[0].visitStatusName == null) {
            profileObj["visitStatusName"] = "N/A";
        } else {
            profileObj["visitStatusName"] = data[0].visitStatusName;
        }
        if (data[0].nextFollowUpDate == undefined || data[0].nextFollowUpDate == null) {
            profileObj["nextFollowUpDate"] = "";
        } else {
            profileObj["nextFollowUpDate"] = data[0].nextFollowUpDate;
        }
        respObj.profileData = profileObj;

        //...........

        if (data[0].stocks && data[0].stocks.length > 0) {
            let stockData = data[0].stocks;

            for (let i = 0; i < stockData.length; i++) {
                let modObj = {}

                if (stockData[i].stockId == undefined || stockData[i].stockId == null) {
                    modObj["stockId"] = ""
                } else {
                    modObj["stockId"] = stockData[i].stockId
                }
                if (stockData[i].productName == undefined || stockData[i].productName == null) {
                    modObj["productName"] = "N/A"
                } else {
                    modObj["productName"] = stockData[i].productName
                }
                if (stockData[i].stockValue == undefined || stockData[i].stockValue == null) {
                    modObj["stockValue"] = "N/A"
                } else {
                    modObj["stockValue"] = stockData[i].stockValue
                }
                if (stockData[i].description == undefined || stockData[i].description == null) {
                    modObj["description"] = "N/A"
                } else {
                    modObj["description"] = stockData[i].description
                }
                if (stockData[i].unit == undefined || stockData[i].unit == null) {
                    modObj["unit"] = "N/A"
                } else {
                    modObj["unit"] = stockData[i].unit
                }

                respObj.stockUpdateData.push(modObj);
            }
        }

        //..............competitor....................

        if (data[0].competitors && data[0].competitors.length > 0) {
            let stockData = data[0].competitors;

            for (let i = 0; i < stockData.length; i++) {
                let modObj = {}

                if (stockData[i].competitorName == undefined || stockData[i].competitorName == null) {
                    modObj["competitorName"] = "N/A"
                } else {
                    modObj["competitorName"] = stockData[i].competitorName
                }
                if (stockData[i].qunatity == undefined || stockData[i].qunatity == null) {
                    modObj["qunatity"] = "N/A"
                } else {
                    modObj["qunatity"] = stockData[i].qunatity
                }
                if (stockData[i].unitName == undefined || stockData[i].unitName == null) {
                    modObj["unitName"] = "N/A"
                } else {
                    modObj["unitName"] = stockData[i].unitName
                }

                if (stockData[i].remark == undefined || stockData[i].remark == null) {
                    modObj["remark"] = "N/A"
                } else {
                    modObj["remark"] = stockData[i].remark
                }


                respObj.competitorData.push(modObj);
            }
        }

        //................brand.................

        if (data[0].branding && data[0].branding.length > 0) {
            let brandingData = data[0].branding;
            for (let i = 0; i < brandingData.length; i++) {
                let modObj = {};
                if (brandingData[i].brandId == undefined || brandingData[i].brandId == null) {
                    modObj["brandId"] = ""
                } else {
                    modObj["brandId"] = brandingData[i].brandId
                }
                if (brandingData[i].brandName == undefined || brandingData[i].brandName == null) {
                    modObj["brandName"] = "N/A"
                } else {
                    modObj["brandName"] = brandingData[i].brandName
                }
                if (brandingData[i].brandDescription == undefined || brandingData[i].brandDescription == null) {
                    modObj["brandDescription"] = "N/A"
                } else {
                    modObj["brandDescription"] = brandingData[i].brandDescription
                }
                if (brandingData[i].productName == undefined || brandingData[i].productName == null) {
                    modObj["productName"] = "N/A"
                } else {
                    modObj["productName"] = brandingData[i].productName
                }
                if (brandingData[i].remarks == undefined || brandingData[i].remarks == null) {
                    modObj["remarks"] = "N/A"
                } else {
                    modObj["remarks"] = brandingData[i].remarks
                }
                if (brandingData[i].allocatedQty == undefined || brandingData[i].allocatedQty == null) {
                    modObj["allocatedQty"] = "N/A"
                } else {
                    modObj["allocatedQty"] = brandingData[i].allocatedQty
                }
                if (brandingData[i].unit == undefined || brandingData[i].unit == null) {
                    modObj["unit"] = "N/A"
                } else {
                    modObj["unit"] = brandingData[i].unit
                }
                if (brandingData[i].requestNo == undefined || brandingData[i].requestNo == null) {
                    modObj["requestNo"] = "N/A"
                } else {
                    modObj["requestNo"] = brandingData[i].requestNo
                }
                respObj.brandingData.push(modObj);
            }
        }
        //..............conversion,,,,,,,,,,,,

        if (data[0].conversion) {
            let conversionData = data[0].conversion;
            for (let i = 0; i < conversionData.length; i++) {
                let modObj1 = {};
                if (conversionData[i].hmName == undefined || conversionData[i].hmName == null) {
                    modObj1["hmName"] = "N/A"
                } else {
                    modObj1["hmName"] = conversionData[i].hmName
                }
                if (conversionData[i].hmTypDesc == undefined || conversionData[i].hmTypDesc == null) {
                    modObj1["hmTypDesc"] = "N/A"
                } else {
                    modObj1["hmTypDesc"] = conversionData[i].hmTypDesc
                }
                if (conversionData[i].brandDescription == undefined || conversionData[i].brandDescription == null) {
                    modObj1["brandDescription"] = "N/A"
                } else {
                    modObj1["brandDescription"] = conversionData[i].brandDescription
                }
                if (conversionData[i].quantity == undefined || conversionData[i].quantity == null) {
                    modObj1["quantity"] = "N/A"
                } else {
                    modObj1["quantity"] = conversionData[i].quantity
                }
                if (conversionData[i].unit == undefined || conversionData[i].unit == null) {
                    modObj1["unit"] = "N/A"
                } else {
                    modObj1["unit"] = conversionData[i].unit
                }
                if (conversionData[i].remarks == undefined || conversionData[i].remarks == null) {
                    modObj1["remarks"] = "N/A"
                } else {
                    modObj1["remarks"] = conversionData[i].remarks
                }
                respObj.conversionData.push(modObj1);
            }
        }

        if (data[0].feedback && data[0].feedback.length > 0) {
            let noteData = data[0].feedback;
            for (let i = 0; i < noteData.length; i++) {
                let modObj = {};
                if (noteData[i].itemName == undefined || noteData[i].itemName == null) {
                    modObj["itemName"] = "N/A"
                } else {
                    modObj["itemName"] = noteData[i].itemName
                }
                if (noteData[i].itemFeedback == undefined || noteData[i].itemFeedback == null) {
                    modObj["itemFeedback"] = "N/A"
                } else {
                    modObj["itemFeedback"] = noteData[i].itemFeedback
                }
                respObj.notes.push(modObj);
            }
        }

        if (data[0].additionalNotes && data[0].additionalNotes.length > 0) {
            let additionalNoteData = data[0].additionalNotes;
            for (let i = 0; i < additionalNoteData.length; i++) {
                let modObj = {};
                if (additionalNoteData[i].note == undefined || additionalNoteData[i].note == null) {
                    modObj["note"] = "N/A"
                } else {
                    modObj["note"] = additionalNoteData[i].note
                }

                respObj.additionalNotes.push(modObj);
            }
        }
    }

    return respObj
}


export function dateModArr(inputJson) {
    const outputJson = {};
    inputJson.forEach(item => {
        const actualDate = new Date(item.actualDate);
        const dayKey = actualDate.toISOString().slice(0, 10);
        if (!outputJson[dayKey]) {
            outputJson[dayKey] = [];
        }
        outputJson[dayKey].push(item);
    });
    const finalOutput = Object.keys(outputJson).map(key => ({
        [key]: outputJson[key]
    }));

    return finalOutput

}


