// modify the data


// for client details
export function modifyDropdownData(data, selectedValueType, selectedValue) {
    var arrName = [];
    let headText = "";
    for (let i = 0; i < data.length; i++) {
        if (selectedValueType == "id") {
            if (data[i].id == selectedValue && selectedValue != 0) {
                data[i]["check"] = true;
                headText = data[i].name;
            } else {
                data[i]["check"] = false;
            }
        } else if (selectedValueType == "name") {
            if (data[i].name == selectedValue && selectedValue.length > 0 || selectedValue != "") {
                data[i]["check"] = true;
                headText = data[i].name;
            } else {
                data[i]["check"] = false;
            }
        }
        arrName.push(data[i].name + "`|~" + i);
    }
    return { data: data, arrName: arrName, headerText: headText };
}


// search from array by name
function filterItems(arr, query) {
    return arr.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
}


// for modify the array data after search
export function modifyDataAfterSearch(mainData, dropdownNameArr, searchTxt) {
    let filterData = filterItems(dropdownNameArr, searchTxt);
    let modDropdownData = [];
    if (filterData.length > 0) {
        modDropdownData = [];
        for (let i = 0; i < mainData.length; i++) {
            for (let j = 0; j < filterData.length; j++) {
                if (mainData[i].name + "`|~" + i === filterData[j]) {
                    modDropdownData.push(mainData[i]);
                }
            }
        }
    } else {
        if (filterData.length == 0 && searchTxt.length > 0) {
            modDropdownData = [];
        } else {
            modDropdownData = mainData;
        }
    }
    return modDropdownData;
}