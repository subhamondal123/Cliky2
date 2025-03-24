import { Toaster } from "../../../../services/common-view-function";

export function validateQuantityAmount(data) {
    let status = false;
    let errorCounter = 0;
    if (data.rate == undefined || data.rate == null || data.rate.length == 0 || parseInt(data.rate) == 0) {
        errorCounter++;
    } else if (data.quantity == undefined || data.quantity == null || data.quantity.length == 0 || parseInt(data.quantity) == 0) {
        errorCounter++;
    }

    if (errorCounter == 0) {
        status = true;
    }
    return status;
}

export function validateNewAddItemData(data) {
    let status = false;
    let errorCounter = 0;

    if (data.selectedParticular.id == undefined || data.selectedParticular.id == null) {
        Toaster.ShortCenterToaster("Please select particular !");
        errorCounter++;
    } else if (data.rate == undefined || data.rate == null || data.rate.length == 0 || parseInt(data.rate) == 0) {
        Toaster.ShortCenterToaster("Please enter rate !");
        errorCounter++;
    } else if (data.quantity == undefined || data.quantity == null || data.quantity.length == 0 || parseInt(data.quantity) == 0) {
        Toaster.ShortCenterToaster("Please enter quantity !");
        errorCounter++;
    } else if (data.description == undefined || data.description == null || data.description.length == 0) {
        Toaster.ShortCenterToaster("Please enter description !");
        errorCounter++;
    } else if (data.remarks == undefined || data.remarks == null || data.remarks.length == 0) {
        Toaster.ShortCenterToaster("Please enter remarks !");
        errorCounter++;
    }

    if (errorCounter == 0) {
        status = true;
    }
    return status;
}

export function calculateTotalEstimateBudget(data) {
    let totalBudget = 0;
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            totalBudget = totalBudget + data[i].totalParticularAmount;
        }
    }
    return totalBudget;
}

export function modifyResp(data) {
    let resp = {
        allDetails: {},
        budgetArr: []
    }
    if (data && data.indentDetails) {
        resp.allDetails = data.indentDetails;

        if (resp.allDetails.indentNumber == undefined || resp.allDetails.indentNumber == null || resp.allDetails.indentNumber.length == 0) {
            resp.allDetails.indentNumber = "N/A";
        } else {
            resp.allDetails.indentNumber = resp.allDetails.indentNumber;
        }

        if (resp.allDetails.meetingTitle == undefined || resp.allDetails.meetingTitle == null || resp.allDetails.meetingTitle.length == 0) {
            resp.allDetails.meetingTitle = "N/A";
        } else {
            resp.allDetails.meetingTitle = resp.allDetails.meetingTitle;
        }

        if (resp.allDetails.districtName == undefined || resp.allDetails.districtName == null || resp.allDetails.districtName.length == 0) {
            resp.allDetails.districtName = "N/A";
        } else {
            resp.allDetails.districtName = resp.allDetails.districtName;
        }

        if (resp.allDetails.cityName == undefined || resp.allDetails.cityName == null || resp.allDetails.cityName.length == 0) {
            resp.allDetails.cityName = "N/A";
        } else {
            resp.allDetails.cityName = resp.allDetails.cityName;
        }

        if (resp.allDetails.meetingTypeName == undefined || resp.allDetails.meetingTypeName == null || resp.allDetails.meetingTypeName.length == 0) {
            resp.allDetails.meetingTypeName = "N/A";
        } else {
            resp.allDetails.meetingTypeName = resp.allDetails.meetingTypeName;
        }

        if (resp.allDetails.meetingDate == undefined || resp.allDetails.meetingDate == null || resp.allDetails.meetingDate.length == 0) {
            resp.allDetails.meetingDate = "";
        } else {
            resp.allDetails.meetingDate = resp.allDetails.meetingDate;
        }

        if (resp.allDetails.estimatedBudgetInt == undefined || resp.allDetails.estimatedBudgetInt == null) {
            resp.allDetails.estimatedBudgetInt = 0;
        } else {
            resp.allDetails.estimatedBudgetInt = resp.allDetails.estimatedBudgetInt;
        }

        if (resp.allDetails.companyBudget == undefined || resp.allDetails.companyBudget == null || resp.allDetails.companyBudget == 0) {
            resp.allDetails.companyBudget = "";
        } else {
            resp.allDetails.companyBudget = resp.allDetails.companyBudget.toString();
        }

        if (resp.allDetails.partnerBudget == undefined || resp.allDetails.partnerBudget == null || resp.allDetails.partnerBudget == 0) {
            resp.allDetails.partnerBudget = "";
        } else {
            resp.allDetails.partnerBudget = resp.allDetails.partnerBudget.toString();
        }


    } else {
        resp.allDetails.indentNumber = "";
        resp.allDetails.meetingTitle = "";
        resp.allDetails.districtName = "";
        resp.allDetails.cityName = "";
        resp.allDetails.meetingTypeName = "";
        resp.allDetails.meetingDate = "";
        resp.allDetails.estimatedBudgetInt = 0;
        resp.allDetails.companyBudget = "";
        resp.allDetails.partnerBudget = "";
    }

    if (data && data.indentBudgetDetails && data.indentBudgetDetails.length > 0) {
        let arr = [];
        let respArr = data.indentBudgetDetails;
        for (let i = 0; i < respArr.length; i++) {
            let obj = {
                rateActive: false,
                quantityActive: false,
                descriptionActive: false,
                remarksActive: false
            };
            if (respArr[i].particularId == undefined || respArr[i].particularId == null) {
                obj["selectedParticular"] = {};
                obj["particular"] = "";
            } else {
                obj["selectedParticular"] = {
                    "id": respArr[i].particularId,
                    "name": respArr[i].name ? respArr[i].name : ""
                };
                obj["particular"] = respArr[i].particularId;
            }

            if (respArr[i].rate == undefined || respArr[i].rate == null) {
                obj["rate"] = "";
            } else {
                obj["rate"] = respArr[i].rate.toString();
            }

            if (respArr[i].QTY == undefined || respArr[i].QTY == null) {
                obj["quantity"] = "";
            } else {
                obj["quantity"] = respArr[i].QTY.toString();
            }

            if (respArr[i].description == undefined || respArr[i].description == null) {
                obj["description"] = "";
            } else {
                obj["description"] = respArr[i].description.toString();
            }
            if (respArr[i].docFile == undefined || respArr[i].docFile == null) {
                obj["docData"] = "";
            } else {
                obj["docData"] = modData(respArr[i].docFile);
            }

            if (respArr[i].remark == undefined || respArr[i].remark == null) {
                obj["remarks"] = "";
            } else {
                obj["remarks"] = respArr[i].remark.toString();
            }

            if (respArr[i].amount == undefined || respArr[i].amount == null) {
                obj["totalParticularAmount"] = 0;
            } else {
                obj["totalParticularAmount"] = respArr[i].amount;
            }

            arr.push(obj);
        }
        resp.budgetArr = arr;
    }


    return resp;
}

function modData(data){
    let arr = [];
    let obj = {
        "fileName": data,
        "orgfilename": data.split('/').pop()
    }
    arr.push(obj)
    return arr
}

export function validateForSubmitOrSave(data) {
    let status = false
    let errorCounter = 0;

    if (data.allItems.length == 0) {
        Toaster.ShortCenterToaster("Please Add Atleast A Particular Budget !");
        errorCounter++;
    } else if (data.partnerContribution == undefined || data.partnerContribution == null || data.partnerContribution.length == 0 ) {
        Toaster.ShortCenterToaster("Please Enter Partner Contribution Amount !");
        errorCounter++;
    } else if (data.companyPart == undefined || data.companyPart == null || data.companyPart.length == 0 ) {
        Toaster.ShortCenterToaster("Please Enter Company Part Amount !");
        errorCounter++;
    } else if (checkTotalCountAndPartnerCompanyPart(data.partnerContribution, data.companyPart, data.totalEstimatedBudget) == false) {
        Toaster.ShortCenterToaster("Total Estimated Budget Not Matched !");
        errorCounter++;
    }

    if (errorCounter == 0) {
        status = true;
    }

    return status;
}

export function checkTotalCountAndPartnerCompanyPart(partnerContribution, companyPart, totalEstimatedBudget) {
    let status = false
    let total = parseInt(partnerContribution) + parseInt(companyPart);
    if (total == totalEstimatedBudget) {
        status = true
    }
    return status;
}

export function modifyExpanseList(data) {
    let arr = [];
    if (data && data.length > 0) {
        arr = data;
    }
    return arr;
}