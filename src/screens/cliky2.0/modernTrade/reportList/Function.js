export function modifyArrData(data) {
    if (data) {
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i]["Customer Name"] == null || data[i]["Customer Name"] == undefined) {
                    data[i]["CustomerName"] = "";
                } else {
                    data[i]["CustomerName"] = data[i]["Customer Name"].replace(/\s/g, '');
                }
                if (data[i]["Customer Phone No"] == null || data[i]["Customer Phone No"] == undefined) {
                    data[i]["CustomerPhoneNo"] = "";
                } else {
                    data[i]["CustomerPhoneNo"] = data[i]["Customer Phone No"].replace(/\s/g, '');
                }
                if (data[i]["Opening Quantity(Standard)"] == null || data[i]["Opening Quantity(Standard)"] == undefined) {
                    data[i]["OpeningQuantityStandard"] = "0";
                } else {
                    data[i]["OpeningQuantityStandard"] = data[i]["Opening Quantity(Standard)"].toString().replace(/\s/g, '');
                }
                if (data[i]["Opening Unit"] == null || data[i]["Opening Unit"] == undefined) {
                    data[i]["OpeningUnit"] = "";
                } else {
                    data[i]["OpeningUnit"] = data[i]["Opening Unit"].replace(/\s/g, '');
                }
                if (data[i]["Opening Unit(Standard)"] == null || data[i]["Opening Unit(Standard)"] == undefined) {
                    data[i]["OpeningUnitStandard"] = "";
                } else {
                    data[i]["OpeningUnitStandard"] = data[i]["Opening Unit(Standard)"].replace(/\s/g, '');
                }
                if (data[i]["Opening Quantity"] == null || data[i]["Opening Quantity"] == undefined) {
                    data[i]["OpeningQuantity"] = "0";
                } else {
                    data[i]["OpeningQuantity"] = data[i]["Opening Quantity"].toString().replace(/\s/g, '');
                }
                if (data[i]["Primary Category"] == null || data[i]["Primary Category"] == undefined) {
                    data[i]["PrimaryCategory"] = "";
                } else {
                    data[i]["PrimaryCategory"] = data[i]["Primary Category"].replace(/\s/g, '');
                }

                if (data[i]["Closing Quantity"] == null || data[i]["Closing Quantity"] == undefined) {
                    data[i]["ClosingQuantity"] = "0";
                } else {
                    data[i]["ClosingQuantity"] = data[i]["Closing Quantity"].toString().replace(/\s/g, '');
                }

                if (data[i][" Closing Unit"] == null || data[i]["Closing Unit"] == undefined) {
                    data[i]["ClosingUnit"] = "";
                } else {
                    data[i]["ClosingUnit"] = data[i]["Closing Unit"].replace(/\s/g, '');
                }
                if (data[i]["Closing Quantity(Standard)"] == null || data[i]["Closing Quantity(Standard)"] == undefined || data[i]["Closing Quantity(Standard)"] == "") {
                    data[i]["ClosingQuantityStandard"] = "0";
                } else {
                    data[i]["ClosingQuantityStandard"] = data[i]["Closing Quantity(Standard)"].toString().replace(/\s/g, '');
                }
                if (data[i]["Closing Unit(Standard)"] == null || data[i]["Closing Unit(Standard)"] == undefined) {
                    data[i]["ClosingUnitStandard"] = "";
                } else {
                    data[i]["ClosingUnitStandard"] = data[i]["Closing Unit(Standard)"].replace(/\s/g, '');
                }

                if (data[i]["Product"] == null || data[i]["Product"] == undefined) {
                    data[i]["Product"] = "";
                } else {
                    data[i]["Product"] = data[i]["Product"];
                }

            }
        }
    }
    return data
}