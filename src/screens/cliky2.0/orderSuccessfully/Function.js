import { DateConvert } from "../../../services/common-view-function";

export function orderSuccessfullmodifyData(data) {

    let modifiedObj = {};
    if (data == null || data == undefined || data.length == 0) {
        modifiedObj = {
            billId: "",
            transactionType: "",
            contactId: "",
            orderNumber: "",
            orderStatus: "",
            orderActtualBillAmount: "",
            orderInvoicePath: "",
            createdAt: "",
            approvedStatus: "",
            deliveryPartnerId: "",
            deliveryStatus: "",
            deliveryDate: "",
            deliveryPartnerDetails: []
        };
    } else {
        if (data.orderNumber == undefined || data.orderNumber == null || data.orderNumber.length == 0) {
            modifiedObj["orderNumber"] = "";
        } else {
            modifiedObj["orderNumber"] = data.orderNumber
        }
        if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
            modifiedObj["createdAt"] = "";
        } else {
            modifiedObj["createdAt"] = data.createdAt
        }
        if (data.deliveryStatus == undefined || data.deliveryStatus == null || data.deliveryStatus.length == 0) {
            modifiedObj["deliveryStatus"] = "";
        } else {
            modifiedObj["deliveryStatus"] = data.deliveryStatus
        }
        if (data.userName == undefined || data.userName == null || data.userName.length == 0) {
            modifiedObj["userName"] = "";
        } else {
            modifiedObj["userName"] = data.userName
        }
        if (data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0) {
            modifiedObj["profilePic"] = "";
        } else {
            modifiedObj["profilePic"] = data.profilePic
        }
        if (data.contactTypeName == undefined || data.contactTypeName == null || data.contactTypeName.length == 0) {
            modifiedObj["contactTypeName"] = "";
        } else {
            modifiedObj["contactTypeName"] = data.contactTypeName
        }
        if (data.approvedStatus == undefined || data.approvedStatus == null || data.approvedStatus.length == 0) {
            modifiedObj["approvedStatus"] = "";
        } else {
            modifiedObj["approvedStatus"] = data.approvedStatus == "0" ? "Rejected" : data.approvedStatus == "1" ? "Approved" : data.approvedStatus == "2" ? "Pending" : "Hold"
        }
        if (data.deliveryPartnerDetails == undefined || data.deliveryPartnerDetails == null || data.deliveryPartnerDetails.length == 0) {
            modifiedObj["deliveryPartnerDetails"] = [];
        } else {
            modifiedObj["deliveryPartnerDetails"] = data.deliveryPartnerDetails
        }

    }
    return (modifiedObj);

}



export function getReferalLinkText(refferCode, routeData, outletDetails, logInData, finalCartData, finalAmount) {
    let totalPrice = 0;
    let totalQuantity = 0;
    let itemData = [];
    for (let i = 0; i < finalCartData.length; i++) {
        totalPrice = totalPrice + parseFloat(finalCartData[i].totalPrice);
        if (finalCartData[i].itemArrData) {
            for (let j = 0; j < finalCartData[i].itemArrData.length; j++) {
                if (finalCartData[i].itemArrData[j].itemArrData) {
                    for (let k = 0; k < finalCartData[i].itemArrData[j].itemArrData.length; k++) {
                        totalQuantity = totalQuantity + parseFloat(finalCartData[i].itemArrData[j].itemArrData[k].quantity)
                        itemData.push({ Product: finalCartData[i].itemArrData[j].itemArrData[k].brandData.Item, totalPrice: finalCartData[i].itemArrData[j].itemArrData[k].totalPrice, quantity: finalCartData[i].itemArrData[j].itemArrData[k].quantity, unitShort: finalCartData[i].itemArrData[j].itemArrData[k].unitShort, rate: finalCartData[i].itemArrData[j].itemArrData[k].rate })
                    }
                }
            }
        }
    }

    // encodeURIComponent

    let resText = `
 Name : ${logInData.firstName + " " + logInData.lastName} 
 Company Name :${logInData.clientName}  
 Date : ${DateConvert.formatDDfullMonthYYYY(new Date())}
 Outlets Name : ${(refferCode.title)} 
 Address : ${outletDetails.address} 
 Contact No. : ${outletDetails.phone} 
 
 
 ${itemData.map((item, key) => (
        key + 1 + "." + (item.Product) + "\n" +
       (logInData.clientId == 19 ? "" : "\t" + "Unit Price " + ": " + item.rate + "\n")  +
        "\t" + "Qty" + " : " + item.quantity + " " + "(" + item.unitShort + ")" + "\n" +
        (logInData.clientId == 19 ? "" : "\t" + "Value" + " : " + item.totalPrice + "\n")) + "\n"
    )}
 ${logInData.clientId == 19 ? "" :  "Outlets Net Order Value : " + finalAmount.toFixed(2)}`;

console.log("resText",resText)
    return resText;
}

// Now use encodeURIComponent when sharing the text, for example:
