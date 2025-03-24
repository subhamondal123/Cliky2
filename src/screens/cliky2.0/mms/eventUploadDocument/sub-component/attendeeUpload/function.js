import { GetUserData } from "../../../../../../services/common-view-function";

export function _modifyAddDataArr(alldata) {
    let mainArr = [];
    let tempArr = [];
    for (let i = 0; i < alldata.length; i++) {
        tempArr = [...tempArr, ...[alldata[i]]]
        if (tempArr.length == 3) {
            mainArr = [...mainArr, ...[tempArr]]
            tempArr = [];
        }

        if (alldata.length % 3 == 1 || alldata.length % 3 == 2) {
            if (i == alldata.length - 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }
        }

    }

    return mainArr;
}

export async function modifyLoadData(data) {
    let locationData = await GetUserData.getUserLocation();
    let modArr = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            if (data[i].latitude == undefined || data[i].latitude == null) {
                obj["latitude"] = locationData.lattitude;
            } else {
                obj["latitude"] = data[i].latitude;
            }

            if (data[i].longitude == undefined || data[i].longitude == null) {
                obj["longitude"] = locationData.longitude;
            } else {
                obj["longitude"] = data[i].longitude;
            }

            if (data[i].imageurl == undefined || data[i].imageurl == null) {
                obj["fileName"] = "";
            } else {
                obj["fileName"] = data[i].imageurl;
            }

            if (data[i].orgfilename == undefined || data[i].orgfilename == null) {
                obj["orgfilename"] = "";
            } else {
                obj["orgfilename"] = data[i].orgfilename;
            }
            if (data[i].photoDescription == undefined || data[i].photoDescription == null) {
                obj["photoDescription"] = "";
            } else {
                obj["photoDescription"] = data[i].photoDescription;
            }


            modArr.push(obj);
        }
    }

    return modArr;
}