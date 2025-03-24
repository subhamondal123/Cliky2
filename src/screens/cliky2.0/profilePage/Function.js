export function modifyResData(data) {
    if (data) {
        if (data.address == undefined || data.address == null || data.address.length == 0) {
            data.address = "";
        } else {
            data.address = data.address;
        }
        if (data.countryName == undefined || data.countryName == null || data.countryName.length == 0) {
            data.countryName = "";
        } else {
            data.countryName = data.countryName;
        }
        if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
            data.createdAt = "";
        } else {
            data.createdAt = data.createdAt;
        }
        if (data.levelName == undefined || data.levelName == null || data.levelName.length == 0) {
            data.levelName = "Level 0";
        } else {
            data.levelName = data.levelName;
        }
        if (data.pointsEarned == undefined || data.pointsEarned == null || data.pointsEarned.length == 0) {
            data.pointsEarned = "0";
        } else {
            data.pointsEarned = data.pointsEarned;
        }

        if (data.designationName == undefined || data.designationName == null || data.designationName.length == 0) {
            data.designationName = "";
        } else {
            data.designationName = data.designationName;
        }
        if (data.districtName == undefined || data.districtName == null || data.districtName.length == 0) {
            data.districtName = "";
        } else {
            data.districtName = data.districtName;
        }
        if (data.erpCode == undefined || data.erpCode == null || data.erpCode.length == 0) {
            data.erpCode = "N/A";
        } else {
            data.erpCode = data.erpCode;
        }
        if (data.email == undefined || data.email == null || data.email.length == 0) {
            data.email = "";
        } else {
            data.email = data.email;
        }
        if (data.name == undefined || data.name == null || data.name.length == 0) {
            data.name = "";
        } else {
            data.name = data.name;
        }
        if (data.phone == undefined || data.phone == null || data.phone.length == 0) {
            data.phone = "";
        } else {
            data.phone = data.phone;
        }
        if (data.profileImgUrl == undefined || data.profileImgUrl == null || data.profileImgUrl.length == 0) {
            data.profileImgUrl = "";
        } else {
            data.profileImgUrl = data.profileImgUrl;
        }
        if (data.roleName == undefined || data.roleName == null || data.roleName.length == 0) {
            data.roleName = "";
        } else {
            data.roleName = data.roleName;
        }
        if (data.hmUpperNodes.State == undefined || data.hmUpperNodes.State == null || data.hmUpperNodes.State.length == 0) {
            data.hmUpperNodes.State = "";
        } else {
            data.hmUpperNodes.State = data.hmUpperNodes.State;
        }
        if (data.hmUpperNodes.District == undefined || data.hmUpperNodes.District == null || data.hmUpperNodes.District.length == 0) {
            data.hmUpperNodes.District = "";
        } else {
            data.hmUpperNodes.District = data.hmUpperNodes.District;
        }
        if (data.userId == undefined || data.userId == null || data.userId.length == 0) {
            data.userId = "";
        } else {
            data.userId = data.userId;
        }
        if (data.username == undefined || data.username == null || data.username.length == 0) {
            data.username = "";
        } else {
            data.username = data.username;
        }
        if (data.hmName == undefined || data.hmName == null || data.hmName.length == 0) {
            data.hmName = "";
        } else {
            data.hmName = getLocation(data.hmName);
        }
    }
    return (data);
}

function getLocation(item) {
    let text = "";
    if (item.length > 0) {
        text = item.split(",")
    }
    return text;
}