// modify the data


// for client details
export function modifyDropdownData(data, selectedValueType, selectedValue) {
    var arrName = [];
    let headText = [];
    for (let i = 0; i < data.length; i++) {
        if (selectedValue.length > 0) {
            for (let j = 0; j < selectedValue.length; j++) {
                if (selectedValueType == "id") {
                    if (data[i].id == selectedValue[j] && selectedValue[j] != 0) {
                        data[i]["check"] = true;
                        headText.push(data[i].name);
                        break;
                    } else {
                        data[i]["check"] = false;
                    }
                } else if (selectedValueType == "name") {
                    if (data[i].name == selectedValue[j] && selectedValue[j].length > 0 || parseInt(selectedValue[j]) > 0) {
                        data[i]["check"] = true;
                        headText.push(data[i].name);
                        break;
                    } else {
                        data[i]["check"] = false;
                    }
                }
            }
        } else {
            data[i]["check"] = false;
        }
        arrName.push(data[i].name + "`|~" + i);
    }
    return { data: data, arrName: arrName, headerText: headText.toString() };
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



// for modify the selected array
export function modifySelectDataArr(selectItem, selectedValue) {
    let curIndex = 0;
    let curFoundData = false;
    if (selectedValue.length > 0) {
        for (let i = 0; i < selectedValue.length; i++) {
            if (selectedValue[i] == selectItem.id) {
                curIndex = i;
                curFoundData = true;
            }
        }
    }
    if (curFoundData) {
        selectedValue.splice(curIndex, 1);
    } else {
        selectedValue.push(selectItem.id);
    }
    return selectedValue;
}
