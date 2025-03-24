import { AlertMessage, ImageName } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";

// this funct
export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.selectPaymentStatus == undefined || data.selectPaymentStatus == null || data.selectPaymentStatus == "") {
        Toaster.ShortCenterToaster("Please Select Payment Status");
        errCounter++;
    } else if (data.paidAmount == undefined || data.paidAmount == null || data.paidAmount == "") {
        Toaster.ShortCenterToaster("Please Enter Paid Amount");
        errCounter++;
    } else if (data.selectPaymentmode.id == undefined || data.selectPaymentmode.id == null) {
        Toaster.ShortCenterToaster("Please Select Payment mode");
        errCounter++;
    }
    else if (data.documentImg.length == 0) {
        Toaster.ShortCenterToaster("Please Upload Document !");
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
};



// for modify List Data this function used
export function modifyPaymentHistoryList(data) {
    var respData = { "paymentHistoryList": [] ,"totalBillAmount":"",};
    if (data) {
        let paymentList = data.response.data[0].orderItemDetails;
        respData.totalBillAmount = data.response.data[0].orderActtualBillAmount;
        if (paymentList && paymentList.length > 0) {
            for (let i = 0; i < paymentList.length; i++) {
                let modObj = {};
                if (paymentList[i].orderNumber == undefined || paymentList[i].orderNumber == null) {
                    modObj["orderNumber"] = "";
                } else {
                    modObj["orderNumber"] = paymentList[i].orderNumber;
                }
                if (paymentList[i].orderActtualBillAmount == undefined || paymentList[i].orderActtualBillAmount == null) {
                    modObj["orderActtualBillAmount"] = "";
                } else {
                    modObj["orderActtualBillAmount"] = paymentList[i].orderActtualBillAmount;
                }
                if (paymentList[i].suportingDocPath == undefined || paymentList[i].suportingDocPath == null) {
                    modObj["suportingDocPath"] = "";
                } else {
                    modObj["suportingDocPath"] = paymentList[i].suportingDocPath;
                }
                if (paymentList[i].paidAmount == undefined || paymentList[i].paidAmount == null) {
                    modObj["paidAmount"] = "";
                } else {
                    modObj["paidAmount"] = paymentList[i].paidAmount;
                }
                if (paymentList[i].createdAt == undefined || paymentList[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = paymentList[i].createdAt;
                }
                if (paymentList[i].paymentStatus == undefined || paymentList[i].paymentStatus == null) {
                    modObj["paymentStatus"] = "";
                } else {
                    modObj["paymentStatus"] = paymentList[i].paymentStatus;
                }
                if (paymentList[i].paymentModeId == undefined || paymentList[i].paymentModeId == null) {
                    modObj["paymentModeId"] = "";
                } else {
                    modObj["paymentModeId"] = paymentList[i].paymentModeId;
                }
                if (paymentList[i].paymentModeId == undefined || paymentList[i].paymentModeId == null) {
                    modObj["paymentModeIcon"] = "";
                } else {
                    modObj["paymentModeIcon"] = paymentList[i].paymentModeId == 1 ? ImageName.PURSE_ICON : paymentList[i].paymentModeId == 2 ? ImageName.UPI_LOGO : paymentList[i].paymentModeId == 3 || paymentList[i].paymentModeId == 4 ? ImageName.CHEQUE_LOGO : paymentList[i].paymentModeId == 6 || paymentList[i].paymentModeId == 7 ? ImageName.CARD_LOGO : ImageName.UPI_LOGO;
                }
                modObj["index"] = i;
                respData.paymentHistoryList.push(modObj);
            }
        }
    }
    return (respData);
}
