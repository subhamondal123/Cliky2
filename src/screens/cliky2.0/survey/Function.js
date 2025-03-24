export function modifyPageData(data) {
    let resData = {
        selectedVisitorTypeObj: {},
        orgName: "",
        orgNameActive: false,
        ownerName: "",
        ownerNameActive: false,
        selectedProduct: {},
        phoneNo: "",
        phoneNoActive: false,
        email: "",
        emailActive: false,
        address: "",
        addressActive: false,
        selectedStateObj: {},
        selectedDistrictObj: {},
        selectedZoneObj: {},
        remarks: "",
        remarksActive: false,
    }
    if (data) {

    }
    return resData;
}

export function modifyCustomerType(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].contactTypeId;
            respArr[i]["name"] = respArr[i].contactTypeName;
        }
    }
    return respArr;
}
