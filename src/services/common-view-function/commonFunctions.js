import { useDispatch } from "react-redux";
import { StorageDataModification } from ".";
import { storeNotificationCountData } from "../../redux/Sales360Action";
import { ApiModule } from "../api";
import { ErrorCode } from "../constant";
import { useEffect } from "react";

export function modifyArrIntoTwoObjArrList(detailData) {
    let modData = [];
    let dividesBy = 2;
    if (detailData !== undefined && detailData.length > 0) {
        let divission = parseInt(detailData.length / dividesBy);
        let reminder = parseInt(detailData.length % dividesBy);
        for (let i = 0; i < divission; i++) {
            let subDivArr = [];
            for (let j = 0; j < dividesBy; j++) {
                subDivArr.push(detailData[i * dividesBy + j]);
            }
            modData.push(subDivArr)
        }
        if (reminder > 0) {
            let reminderArr = [];
            for (let i = 0; i < reminder; i++) {
                reminderArr.push(detailData[(divission * dividesBy) + i]);
            }
            modData.push(reminderArr)
        }
    }
    return modData;
}

export function textTruncate(stringValue, maxlength) {
    if (stringValue.length > maxlength) {
        return stringValue.slice(0, maxlength) + "...";
    } else {
        return stringValue;
    }
}


export function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}


// for get random number
export function getGenerateNumber() {
    let maxVal = 1234567;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
}

export function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

export function getDesiredLocationFormat(data) {
    // Convert the data into the desired format
    const convertedData = [];

    for (const item of data) {
        const countryIndex = convertedData.findIndex((c) => c.id === item.countryId);

        if (countryIndex === -1) {
            const newCountry = {
                id: item.countryId,
                name: item.countryName,
                state: [
                    {
                        id: item.stateId,
                        name: item.stateName,
                        city: [
                            {
                                id: item.cityId,
                                name: item.cityName,
                                zone: [
                                    {
                                        id: item.zoneId,
                                        name: item.zoneName
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            convertedData.push(newCountry);
        } else {
            const stateIndex = convertedData[countryIndex].state.findIndex((s) => s.id === item.stateId);

            if (stateIndex === -1) {
                const newState = {
                    id: item.stateId,
                    name: item.stateName,
                    city: [
                        {
                            id: item.cityId,
                            name: item.cityName,
                            zone: [
                                {
                                    id: item.zoneId,
                                    name: item.zoneName
                                }
                            ]
                        }
                    ]
                };

                convertedData[countryIndex].state.push(newState);
            } else {
                const cityIndex = convertedData[countryIndex].state[stateIndex].city.findIndex((c) => c.id === item.cityId);

                if (cityIndex === -1) {
                    const newCity = {
                        id: item.cityId,
                        name: item.cityName,
                        zone: [
                            {
                                id: item.zoneId,
                                name: item.zoneName
                            }
                        ]
                    };

                    convertedData[countryIndex].state[stateIndex].city.push(newCity);
                } else {
                    const newZone = {
                        id: item.zoneId,
                        name: item.zoneName
                    };

                    convertedData[countryIndex].state[stateIndex].city[cityIndex].zone.push(newZone);
                }
            }
        }
    }
    let outputData = JSON.stringify(convertedData, null, 2);
    return outputData

}


export function incrementByTwoDecimal(number) {
    var result = number + 0.01;
    var decimalPart = result - Math.floor(result);

    if (decimalPart >= 0.09) {
        result = Math.floor(result) + 1;
    }

    return result;
}

//
export function decrementByTwoDecimal(number) {
    var result = number - 0.01;
    var decimalPart = result - Math.floor(result);

    if (decimalPart < 0) {
        result = Math.floor(result);
    }

    return result;
}

//modify heirarcy location data 

// const data = [
//     [
//       {
//         "id": 1948,
//         "typeId": 4,
//         "name": "NORTH 24 PARGANAS - 1-TMT",
//         "typeName": "Zone",
//         "slNo": 4
//       },
//       {
//         "id": 858,
//         "typeId": 3,
//         "name": "North 24 Parganas",
//         "typeName": "District",
//         "slNo": 3
//       },
//       {
//         "id": 37,
//         "typeId": 2,
//         "name": "West Bengal",
//         "typeName": "State",
//         "slNo": 2
//       },
//       {
//         "id": 1,
//         "typeId": 1,
//         "name": "India",
//         "typeName": "Country",
//         "slNo": 1
//       }
//     ],
//     [
//       {
//         "id": 1949,
//         "typeId": 4,
//         "name": "South 24 PARGANAS - 1-TMT",
//         "typeName": "Zone",
//         "slNo": 4
//       },
//       {
//         "id": 858,
//         "typeId": 3,
//         "name": "South 24 Parganas",
//         "typeName": "District",
//         "slNo": 3
//       },
//       {
//         "id": 37,
//         "typeId": 2,
//         "name": "West Bengal",
//         "typeName": "State",
//         "slNo": 2
//       },
//       {
//         "id": 1,
//         "typeId": 1,
//         "name": "India",
//         "typeName": "Country",
//         "slNo": 1
//       }
//     ],
//     [
//       {
//         "id": 1950,
//         "typeId": 4,
//         "name": "west 24 PARGANAS - 1-TMT",
//         "typeName": "Zone",
//         "slNo": 4
//       },
//       {
//         "id": 858,
//         "typeId": 3,
//         "name": "South 24 Parganas",
//         "typeName": "District",
//         "slNo": 3
//       },
//       {
//         "id": 37,
//         "typeId": 2,
//         "name": "West Bengal",
//         "typeName": "State",
//         "slNo": 2
//       },
//       {
//         "id": 1,
//         "typeId": 1,
//         "name": "India",
//         "typeName": "Country",
//         "slNo": 1
//       }
//     ]
//   ];

// result 

// [{"hierarchyTypeId":"4","hierarchyDataId":"1948"},{"hierarchyTypeId":"4","hierarchyDataId":"1949"},{"hierarchyTypeId":"4","hierarchyDataId":"1950"}]

export function modifyHierarcyLocationData(data) {
    const modifiedData = [];

    for (const innerArray of data) {
        let maxSlNo = -Infinity;
        let maxElement = null;

        for (const element of innerArray) {
            if (element.slNo > maxSlNo) {
                maxSlNo = element.slNo;
                maxElement = element;
            }
        }

        if (maxElement) {
            modifiedData.push({
                hierarchyTypeId: maxElement.typeId.toString(),
                hierarchyDataId: maxElement.id.toString()
            });
        }
    }

    return modifiedData
}

// get the amount along with unit
export function getAmountWithUnit(value) {
    if (value >= 10000000) {
        // Convert to Crores
        return (value / 10000000).toFixed(2) + ' Cr';
    } else if (value >= 100000) {
        // Convert to Lakhs
        return (value / 100000).toFixed(2) + ' Lac';
    } else if (value >= 1000) {
        // Convert to Thousand
        return (value / 1000).toFixed(2) + ' k';
    }
    else {
        return value;
    }
}

// get the amount along with unit
export function isValidWebsiteUrl(url) {
    // Regular expression to match a URL pattern
    var re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

    // Test if the URL matches the pattern
    return re.test(url);
}

export async function getNotificationCount(payload,props) {
    let count = 0;
    let notificationData = await ApiModule.ApiCall("getUnreadNotificationCount", payload, props);
    if (notificationData) {
        if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            count = notificationData.response.unreadNotificationCount;
        }
    }
    await StorageDataModification.storeNotificationCountData(count, 'store');
}


export const MyComponent = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        await getNotificationCount(payload, props, dispatch);
    }, [])

};

export function maskData(amount) {
    // Convert amount to string (in case it's a number)
    // let amountStr = String(amount);

    // // Check if it contains a decimal
    // let [integerPart, decimalPart] = amountStr.includes(".")
    //     ? amountStr.split(".")
    //     : [amountStr, ""]; // If no decimal, keep integerPart, set empty decimalPart

    // // Mask the first four digits, or entire part if less than 4 digits
    // let maskedInteger = integerPart.length > 4
    //     ? "X".repeat(4) + integerPart.slice(4)  // Replace first 4 digits
    //     : "X".repeat(integerPart.length);       // Mask all if less than 4 digits

    // // Construct final output
    // return decimalPart ? maskedInteger + "." + decimalPart : maskedInteger;
    let amountStr = String(amount);

    // Replace all digits (0-9) with 'X'
    return amountStr.replace(/\d/g, "X");
}