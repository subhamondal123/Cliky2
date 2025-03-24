export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data.response) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.data[0].items.itemcount;

        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                for (let j = 0; j < pjpData[i].items.data.length; j++) {
                    let modObj = {};
                    if (pjpData[i].items.data[j].id == undefined || pjpData[i].items.data[j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = pjpData[i].items.data[j].id;
                    }
                    if (pjpData[i].items.data[j].hierarchyTypeId == undefined || pjpData[i].items.data[j].hierarchyTypeId == null) {
                        modObj["brandId"] = "";
                    } else {
                        modObj["brandId"] = pjpData[i].items.data[j].hierarchyTypeId;
                    }
                    if (pjpData[i].items.data[j].hierarchyDataId == undefined || pjpData[i].items.data[j].hierarchyDataId == null) {
                        modObj["productId"] = "";
                    } else {
                        modObj["productId"] = pjpData[i].items.data[j].hierarchyDataId;
                    }
                    if (pjpData[i].items.data[j].totalQty == undefined || pjpData[i].items.data[j].totalQty == null) {
                        modObj["quantity"] = "";
                    } else {
                        modObj["quantity"] = parseFloat(pjpData[i].items.data[j].totalQty).toFixed(1);
                    }
                    if (pjpData[i].items.data[j].totalPrice == undefined || pjpData[i].items.data[j].totalPrice == null) {
                        modObj["totalPrice"] = "";
                    } else {
                        modObj["totalPrice"] = pjpData[i].items.data[j].totalPrice;
                    }
                    if (pjpData[i].items.data[j].rate == undefined || pjpData[i].items.data[j].rate == null) {
                        modObj["rate"] = "";
                    } else {
                        modObj["rate"] = pjpData[i].items.data[j].rate;
                    }
                    if (pjpData[i].items.data[j].createBy == undefined || pjpData[i].items.data[j].createBy == null) {
                        modObj["createBy"] = "";
                    } else {
                        modObj["createBy"] = pjpData[i].items.data[j].createBy;
                    }
                    if (pjpData[i].items.data[j].recordNumber == undefined || pjpData[i].items.data[j].recordNumber == null) {
                        modObj["recordNumber"] = "";
                    } else {
                        modObj["recordNumber"] = pjpData[i].items.data[j].recordNumber;
                    }
                    if (pjpData[i].items.data[j].remarks == undefined || pjpData[i].items.data[j].remarks == null) {
                        modObj["remarks"] = "";
                    } else {
                        modObj["remarks"] = pjpData[i].items.data[j].remarks;
                    }
                    if (pjpData[i].items.data[j].unitId == undefined || pjpData[i].items.data[j].unitId == null) {
                        modObj["unitId"] = "";
                    } else {
                        modObj["unitId"] = pjpData[i].items.data[j].unitId;
                    }
                    if (pjpData[i].items.data[j].prodHmUpperNodes == undefined || pjpData[i].items.data[j].prodHmUpperNodes == null) {
                        modObj["brandData"] = {};
                    } else {
                        modObj["brandData"] = pjpData[i].items.data[j].prodHmUpperNodes;
                    }
                    // if (pjpData[i].items.data[j].labelCode == undefined || pjpData[i].items.data[j].labelCode == null) {
                    //     modObj["brandName"] = "";
                    // } else {
                    //     modObj["brandName"] = pjpData[i].items.data[j].labelCode;
                    // }
                    // if (pjpData[i].items.data[j].productName == undefined || pjpData[i].items.data[j].productName == null) {
                    //     modObj["productName"] = "";
                    // } else {
                    //     modObj["productName"] = pjpData[i].items.data[j].productName;
                    // }
                    // if (pjpData[i].items.data[j].productName == undefined || pjpData[i].items.data[j].productName == null) {
                    //     modObj["productName"] = "";
                    // } else {
                    //     modObj["productName"] = pjpData[i].items.data[j].productName;
                    // }
                    if (pjpData[i].items.data[j].productAttributes.Unit == undefined || pjpData[i].items.data[j].productAttributes.Unit == null) {
                        modObj["unitShort"] = pjpData[i].items.data[j].unit;
                    } else {
                        modObj["unitShort"] = pjpData[i].items.data[j].productAttributes.Unit;
                    }
                    if (pjpData[i].items.data[j].id == undefined || pjpData[i].items.data[j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = pjpData[i].items.data[j].id;
                    }
                    if (pjpData[i].orderNumber == undefined || pjpData[i].orderNumber == null) {
                        modObj["recordNumber"] = "";
                    } else {
                        modObj["recordNumber"] = pjpData[i].orderNumber;
                    }

                    modObj["check"] = false;
                    modObj["tick"] = false;
                    modObj["showHide"] = false;
                    respData.pjpList.push(modObj);
                }
            }
        }
    }
    return (respData);
}

export function deliveryPartnerModifyData(data) {
    var respData = { "totalCount": 0, "deliveryPartnerList": [] };
    if (data) {
        let partnerData = data.response.data;
        respData.totalCount = data.response.count;
        if (partnerData && partnerData.length > 0) {
            for (let i = 0; i < partnerData.length; i++) {
                let modObj = {};
                if (partnerData[i].customerId == undefined || partnerData[i].customerId == null) {
                    modObj["customerId"] = "";
                } else {
                    modObj["customerId"] = partnerData[i].customerId;
                }
                if (partnerData[i].organizationId == undefined || partnerData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = partnerData[i].organizationId;
                }
                if (partnerData[i].recordId == undefined || partnerData[i].recordId == null) {
                    modObj["recordId"] = "";
                } else {
                    modObj["recordId"] = partnerData[i].recordId;
                }
                if (partnerData[i].customerName == undefined || partnerData[i].customerName == null) {
                    modObj["customerName"] = "";
                } else {
                    modObj["customerName"] = partnerData[i].customerName;
                }
                if (partnerData[i].phoneNumber == undefined || partnerData[i].phoneNumber == null) {
                    modObj["phoneNumber"] = "";
                } else {
                    modObj["phoneNumber"] = partnerData[i].phoneNumber;
                }
                if (partnerData[i].custBusinessName == undefined || partnerData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = partnerData[i].custBusinessName;
                }
                if (partnerData[i].organizationName == undefined || partnerData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = partnerData[i].organizationName;
                }
                if (partnerData[i].contactTypeName == undefined || partnerData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = partnerData[i].contactTypeName;
                }
                if (partnerData[i].contactTypeId == undefined || partnerData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = partnerData[i].contactTypeId;
                }
                if (partnerData[i].contactTypeId == undefined || partnerData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = partnerData[i].contactTypeId;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.deliveryPartnerList.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyProfileData(objData) {
    // transactionType == 3 -> primary, 2 -> secondary
    let obj = {
        cartCount: objData.totalItemCount == null || objData.totalItemCount == undefined ? "0" : objData.totalItemCount,
        title: objData.customerName == null || objData.customerName == undefined ? "" : objData.customerName,
        profileImg: objData.profilePic == null || objData.profilePic == undefined ? "" : objData.profilePic,
        userId: objData.customerId == null || objData.customerId == undefined ? "" : objData.customerId,
        customerType: objData.custType == null || objData.custType == undefined ? "" : objData.custType,
    }

    return obj
}


export function modCartDetailsData(obj) {
    let respArrData = [];
    let modObj = {
        "itemName": "",
        "totalPrice": obj.orderData.totalAmount,
        "totalItem": obj.orderData.orderDetails.length,
        "itemArrData": [
            {
                "itemName": "",
                "totalPrice": obj.orderData.totalAmount,
                "totalItem": obj.orderData.orderDetails.length,
                "itemArrData": getItemArrData(obj.orderData.orderDetails)
            }
        ]
    };
    respArrData.push(modObj)

    return respArrData
}

function getItemArrData(arr) {
    let respArrData = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isPlaceOrder == false) {
                let modObj = {};
                modObj["id"] = "";
                modObj["brandId"] = arr[i].prodhierarchyTypeId;
                modObj["productId"] = arr[i].prodhierarchyDataId;
                modObj["quantity"] = arr[i].quantity;
                modObj["totalPrice"] = Number(arr[i].totalPrice);
                modObj["rate"] = Number(arr[i].rate);
                modObj["createBy"] = "";
                modObj["recordNumber"] = "";
                modObj["remarks"] = "";
                modObj["unitId"] = "";
                modObj["brandData"] = {
                    "Product": arr[i].productName,
                    "Primary Category": "",
                    "Division": ""
                };
                modObj["unitShort"] = arr[i].unitShort;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;

                respArrData.push(modObj);
            }
        }
    }


    return respArrData
}