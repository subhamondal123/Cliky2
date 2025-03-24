//modify location hierarcy data
export function modData(data) {
    let arrData = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null) {
                obj["id"] = 0
            } else {
                obj["id"] = data[i].hierarchyTypeId

            }
            if (data[i].hmTypDesc == undefined || data[i].hmTypDesc == null) {
                obj["name"] = ""
            } else {
                obj["name"] = data[i].hmTypDesc
            }

            arrData.push(obj)

        }

    }
    return arrData
}

//modify chart data
export function setPieChartData(data) {
    let arrData = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj["color"] = data[i].color
            obj["percentage"] = Number(data[i].percentage)

            arrData.push(obj)
        }
    }
    return arrData
}

//modify list data
export function modMainData(data) {
    let arrData = { list: [], maxAmount: 0 };
    if (data && data.length > 0) {

        for (let i = 0; i < data.length; i++) {
            let obj = {}

            // Generate a random color
            const randomColor = getRandomColor();

            // Assign the generated color to the object
            obj["color"] = randomColor;

            if (data[i].title == undefined || data[i].title == null) {
                obj["title"] = ""
            } else {
                obj["title"] = data[i].title
                // obj["color"] = data[i].title == "Prabhuji 1" ? "#156A94" : "#000"
            }
            if (data[i].percentage == undefined || data[i].percentage == null) {
                obj["percentage"] = 0
            } else {
                obj["percentage"] = data[i].percentage
            }

            if (data[i].amount == undefined || data[i].amount == null) {
                obj["amount"] = 0
            } else {
                obj["amount"] = data[i].amount.toFixed(2)
            }

            arrData.maxAmount = arrData.maxAmount + parseFloat(data[i].amount)
            arrData.list.push(obj)
            // if (arrData.list.length == 3) {
            //     break;
            // }


        }
    }
    return arrData
}


// Function to generate a random color excluding white and black
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color;
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#FFFFFF' || color === '#000000'); // Continue generating until a color other than white is obtained
    return color;
}

//get the total amount
export function getTotalAmount(data) {
    let amt = 0;
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            amt = amt + parseFloat(data[i].amount)
        }
    }
    return amt

}