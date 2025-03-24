//modify chart data
export function getChartData(data) {
    let arrData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].percentage == undefined || data[i].percentage == null) {
                obj["percentage"] = 0
            } else {
                obj["percentage"] = data[i].percentage
            }
            if (data[i].color == undefined || data[i].color == null) {
                obj["color"] = ""
            } else {
                obj["color"] = data[i].color
            }

            arrData.push(obj)

        }
    }
    return arrData
}

//modify list data
export function modifyData(data) {
    let arrData = { list: [], maxVal: 0 }
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        if (data[i].percentage == undefined || data[i].percentage == null) {
            obj["percentage"] = 0
        } else {
            obj["percentage"] = data[i].percentage
        }
        if (data[i].color == undefined || data[i].color == null) {
            obj["color"] = ""
        } else {
            obj["color"] = data[i].color
        }
        if (data[i].amount == undefined || data[i].amount == null) {
            obj["amount"] = 0
        } else {
            obj["amount"] = data[i].amount
        }
        if (data[i].title == undefined || data[i].title == null) {
            obj["title"] = ""
        } else {
            obj["title"] = data[i].title
        }
        arrData.maxVal = arrData.maxVal + parseFloat(data[i].amount)

        arrData.list.push(obj)
    }

    return arrData

}

//modify main data
export function modMainData(data) {
    let arrData = [];
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

            arrData.push(obj)
            // if (arrData.length == 3) {
            //     break;
            // }


        }
    }
    return arrData
}


// Function to generate a random color excluding white
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
