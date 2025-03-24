export function modData(data) {
    var respData = { "list": [] };
 
    if (data) {
        let mainData = data.offRsnList.data;
        if(mainData.length > 0){
            for (let i = 0; i < mainData.length; i++) {
                let modObj = {};
                if (mainData[i].id == undefined || mainData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = mainData[i].id;
                }
                if (mainData[i].description == undefined || mainData[i].description == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = mainData[i].description;
                }
    
    
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
        

    }

    return respData;
}