export function modInfoData(data) {
    let respData = {
        address: "N/A",
        recordId:"N/A"
    }
    if (data && data.length > 0) {
        respData.address = data[0].address;
        respData.recordId = data[0].recordId;
    }

    return respData
}