export function orderHistoryModifyData(data, props) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.billcount;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].orderNumber == undefined || pjpData[i].orderNumber == null) {
                    modObj["recordNumber"] = "";
                } else {
                    modObj["recordNumber"] = pjpData[i].orderNumber;
                }
                if (pjpData[i].customerAccessTypeName == undefined || pjpData[i].customerAccessTypeName == null) {
                    modObj["customerAccessTypeName"] = "";
                } else {
                    modObj["customerAccessTypeName"] = pjpData[i].customerAccessTypeName;
                }
                if (pjpData[i].contactId == undefined || pjpData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = pjpData[i].contactId;
                }
                if (pjpData[i].custBusinessName == undefined || pjpData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = pjpData[i].custBusinessName;
                }
                if (pjpData[i].customerName == undefined || pjpData[i].customerName == null) {
                    modObj["customerName"] = "";
                } else {
                    modObj["customerName"] = pjpData[i].customerName;
                }
                if (pjpData[i].orderTypeName == undefined || pjpData[i].orderTypeName == null) {
                    modObj["orderTypeName"] = "";
                } else {
                    modObj["orderTypeName"] = pjpData[i].orderTypeName;
                }

                
                
                
                if (pjpData[i].createdAt == undefined || pjpData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = pjpData[i].createdAt;
                }
                if (pjpData[i].deliveryStatus == undefined || pjpData[i].deliveryStatus == null) {
                    modObj["deliveryStatus"] = "";
                } else {
                    modObj["deliveryStatus"] = pjpData[i].deliveryStatus;
                }
                if (pjpData[i].totalPrice == undefined || pjpData[i].totalPrice == null) {
                    modObj["totalPrice"] = "";
                } else {
                    modObj["totalPrice"] = pjpData[i].totalPrice;
                }
                if (pjpData[i].orderActtualBillAmount == undefined || pjpData[i].orderActtualBillAmount == null) {
                    modObj["orderActtualBillAmount"] = 0;
                } else {
                    modObj["orderActtualBillAmount"] = pjpData[i].orderActtualBillAmount;
                }

                if (pjpData[i].items == undefined || pjpData[i].items == null) {
                    modObj["items"] = {};
                } else {
                    modObj["items"] = pjpData[i].items;
                }
                if (pjpData[i].items == undefined || pjpData[i].items == null || Object.keys(pjpData[i].items).length == 0) {
                    modObj["itemcount"] = 0;
                } else {
                    modObj["itemcount"] = pjpData[i].items.itemcount;
                }


                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }

                // modObj["userId"] = props.item.id;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}

export function htmlToFormat(html) {
    const codes = { B: "*", I: "_", STRIKE: "~" };
    const {body} = new DOMParser().parseFromString(htmlText, "text/html");
    const dfs = ({childNodes}) => Array.from(childNodes, node => {
        if (node.nodeType == 1) {
            const s = dfs(node);
            const code = codes[node.tagName];
            return code ? s.replace(/^(\s*)(?=\S)|(?<=\S)(\s*)$/g, `$1${code}$2`) : s;
        } else {
            return node.textContent;
        }
    }).join("");

    return dfs(body);
}


// Function to chunk the text into smaller parts
export function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g')) || [];
}
