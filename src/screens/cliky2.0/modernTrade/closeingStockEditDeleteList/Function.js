export function modifyListData(data) {
    if (data) {
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].productName == undefined || data[i].productName == null) {
                    modObj["productName"] = "";
                } else {
                    modObj["productName"] = data[i].productName;
                }
                if (data[i].prodhierarchyTypeId == undefined || data[i].prodhierarchyTypeId == null) {
                    modObj["prodhierarchyTypeId"] = "";
                } else {
                    modObj["prodhierarchyTypeId"] = data[i].prodhierarchyTypeId;
                }
                if (data[i].prodhierarchyDataId == undefined || data[i].prodhierarchyDataId == null) {
                    modObj["prodhierarchyDataId"] = "";
                } else {
                    modObj["prodhierarchyDataId"] = data[i].prodhierarchyDataId;
                }
                if (data[i].quantity == undefined || data[i].quantity == null) {
                    modObj["quantity"] = "";
                } else {
                    modObj["quantity"] = data[i].quantity;
                }
                if (data[i].totalPrice == undefined || data[i].totalPrice == null) {
                    modObj["totalPrice"] = "";
                } else {
                    modObj["totalPrice"] = data[i].totalPrice;
                }
                if (data[i].unitId == undefined || data[i].unitId == null) {
                    modObj["unitId"] = "";
                } else {
                    modObj["unitId"] = data[i].unitId;
                }
                if (data[i].unitShort == undefined || data[i].unitShort == null) {
                    modObj["unitShort"] = "";
                } else {
                    modObj["unitShort"] = data[i].unitShort;
                }
                if (data[i].rate == undefined || data[i].rate == null) {
                    modObj["rate"] = "";
                } else {
                    modObj["rate"] = data[i].rate;
                }
                if (data[i].CB == undefined || data[i].CB == null) {
                    modObj["CB"] = "";
                } else {
                    modObj["CB"] = data[i].CB;
                }
                if (data[i].pou == undefined || data[i].pou == null) {
                    modObj["pou"] = "";
                } else {
                    modObj["pou"] = data[i].pou;
                }
                if (data[i].stdUnitId == undefined || data[i].stdUnitId == null) {
                    modObj["stdUnitId"] = "";
                } else {
                    modObj["stdUnitId"] = data[i].stdUnitId;
                }
                if (data[i].stdUnitShort == undefined || data[i].stdUnitShort == null) {
                    modObj["stdUnitShort"] = "";
                } else {
                    modObj["stdUnitShort"] = data[i].stdUnitShort;
                }
                modObj["isCheck"] = false;

            }

        }
    }
    return data;

}