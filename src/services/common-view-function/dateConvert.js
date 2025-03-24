import { CommonData } from "../constant";

export function normalDate(date) {
    try {
        if (date === undefined || date === null || date === "") {
            date = '';
        } else {

            date = new Date(date);
            let year = date.getFullYear();
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            date = day + "-" + month + "-" + year;
        }

        console.log(date)
        return date;
    } catch (err) {
        console.log(err)
    }
}

// Date Format is "2021-01-18"
export function resDataDateFormat(date) {
    try {
        if (date === undefined || date === null) {
            date = '';
        } else {
            let year = date.getFullYear();
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            date = year + "-" + month + "-" + day;
        }
        return date;
    } catch (err) {
        console.log(err)
    }
}

// Date Format is (January 02,2022)
export function formatDateWithMonthDate(date) {
    try {
        let resDate = "";
        if (date) {
            const currentMonth = new Date(date);
            resDate = CommonData.COMMON.MONTHS[currentMonth.getMonth()] + " " + ("0" + currentMonth.getDate()).slice(-2) + "," + currentMonth.getFullYear();
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// date format is "2022-02-23"
export function formatYYYYMMDD(date) {
    try {
        let resDate = "";
        if (date) {
            const currentMonth = new Date(date);
            let year = currentMonth.getFullYear();
            let day = ("0" + currentMonth.getDate()).slice(-2);
            let month = ("0" + (currentMonth.getMonth() + 1)).slice(-2);
            resDate = year + "-" + month + "-" + day;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}
// date format is "23-02-2022"
export function formatDDMMYYYY(date) {
    try {
        let resDate = "";
        if (date) {
            const currentMonth = new Date(date);
            let year = currentMonth.getFullYear();
            let day = ("0" + currentMonth.getDate()).slice(-2);
            let month = ("0" + (currentMonth.getMonth() + 1)).slice(-2);
            resDate = day + "-" + month + "-" + year;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// date format is "20 June 2023"
export function formatDDfullMonthYYYY(date) {
    try {
        let resDate = "";
        if (date) {
            const currentMonth = new Date(date);
            resDate = ("0" + currentMonth.getDate()).slice(-2) + " " + CommonData.COMMON.MONTHS[currentMonth.getMonth()] + " " + currentMonth.getFullYear();
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}


// date format is "23/03/2022"
export function viewDateFormat(date) {
    try {
        let resDate = "";
        if (date) {
            const currentMonth = new Date(date);
            let year = currentMonth.getFullYear();
            let day = ("0" + currentMonth.getDate()).slice(-2);
            let month = ("0" + (currentMonth.getMonth() + 1)).slice(-2);
            resDate = day + "/" + month + "/" + year;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}
// get the data { "hour": "01", "minutes": "03", "second": "04", "ampm": "AM", "rawTime": "01:03:00", "viewTime": "01:03 AM" } from time stamp
export function viewTimeFormat(date) {
    try {
        let resDate = { "hour": "0", "minutes": "0", "second": "0", "ampm": "", "rawTime": "", "viewTime": "" };
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let second = currentDate.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours < 10 ? "0" + hours.toString() : hours.toString();
            minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
            second = second < 10 ? "0" + second.toString() : second.toString();
            let rawTime = hours + ":" + minutes + ":" + second;
            let viewTime = hours + ":" + minutes + " " + ampm;
            // resDate = { "hour": hours, "minutes": minutes, "second": second, "ampm": ampm, "rawTime": rawTime, "viewTime": viewTime };
            resDate = viewTime
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// get the data { "hour": "01", "minutes": "03", "second": "04", "ampm": "AM", "rawTime": "01:03:00", "viewTime": "01:03 AM" } from time stamp
export function getAllTimeData(date) {
    try {
        let resDate = { "hour": "0", "minutes": "0", "second": "0", "ampm": "", "rawTime": "", "viewTime": "" };
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let second = currentDate.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            let smalCaseAmpm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours < 10 ? "0" + hours.toString() : hours.toString();
            minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
            second = second < 10 ? "0" + second.toString() : second.toString();
            let rawTime = hours + ":" + minutes + ":" + second;
            let viewTime = hours + ":" + minutes + " " + ampm;
            let viewTimeWithOutAmp = hours + ":" + minutes;
            resDate = { "hour": hours, "minutes": minutes, "second": second, "ampm": ampm, "smallCaseAmPm": smalCaseAmpm, "rawTime": rawTime, "viewTime": viewTime, "viewTimeWithOutAmp": viewTimeWithOutAmp };
            // resDate = viewTime
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// format 15:37:00

export function get24HourFormatTime(date) {
    try {
        let resDate = "";
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours(),
                minutes = currentDate.getMinutes(),
                secound = currentDate.getSeconds();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            secound = secound < 10 ? '0' + secound : secound;
            resDate = hours + ':' + minutes + ":" + secound;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}



export function formatYearAndHour(date) {
    try {
        let resDate = "";
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            resDate = CommonData.COMMON.MONTHS[currentDate.getMonth()] + " " + currentDate.getDate() + "," + currentDate.getFullYear() + "," + hours + ':' + minutes + ' ' + ampm;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

export function getAllDateInfo(date) {
    try {
        let resDate = { "year": 0, "month": 0, "day": 0, "hour": 0, "minutes": 0, "second": 0, "ampm": "" };
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let second = currentDate.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            resDate = { "year": parseInt(currentDate.getFullYear()), "month": parseInt(currentDate.getMonth()) + 1, "day": parseInt(currentDate.getDate()), "hour": parseInt(hours), "minutes": parseInt(minutes), "second": parseInt(second), "ampm": ampm }
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// format (2022-02-17 13:30:28)
export function fullDateFormat(date) {
    try {
        let resDate = "";
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours(),
                minutes = currentDate.getMinutes(),
                secound = currentDate.getSeconds();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            secound = secound < 10 ? '0' + secound : secound;
            resDate = currentDate.getFullYear() + "-" + ("0" + (currentDate.getMonth() + 1)).slice(-2) + "-" + ("0" + currentDate.getDate()).slice(-2) + " " + hours + ':' + minutes + ":" + secound;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}


export function resLanguageFormat(data) {
    try {
        var languageData = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                languageData.push({ "id": data[i].id, "name": data[i].language, "check": false })
            }
        }
        return languageData;
    } catch (err) {
        console.log(err)
    }
}

export function hourChange(hour) {
    try {
        hour = parseInt(hour);
        if (hour < 12) {
            if (hour < 9) {
                hour = hour + 1;
                hour = "0" + String(hour);
            } else {
                hour = hour + 1;
            }
        } else {
            hour = "01";
        }
        return String(hour);
    } catch (err) {
        console.log(err)
    }
}


export function hourReversChange(hour) {
    try {
        hour = parseInt(hour);
        if (hour > 0) {
            if (hour < 11) {
                hour = hour - 1;
                if (hour == 0) {
                    hour = "12";
                } else {
                    hour = "0" + String(hour);
                }
            } else {
                hour = hour - 1;
            }
        } else {
            hour = "12";
        }
        return String(hour);
    } catch (err) {
        console.log(err)
    }
}

export function minutesChange(minute) {
    try {
        minute = parseInt(minute);
        if (minute < 59) {
            if (minute < 9) {
                minute = minute + 1;
                minute = "0" + String(minute);
            } else {
                minute = minute + 1;
            }
        } else {
            minute = "00";
        }
        return String(minute);
    } catch (err) {
        console.log(err)
    }
}

export function minutesReversChange(minute) {
    try {
        minute = parseInt(minute);
        if (minute > 0) {
            if (minute < 11) {
                minute = minute - 1;
                if (minute == 0) {
                    minute = "00"
                } else {
                    minute = "0" + String(minute);
                }
            } else {
                minute = minute - 1;
            }
        } else {
            minute = "59";
        }
        return String(minute);
    } catch (err) {
        console.log(err)
    }
}

export function amPmChange(data) {
    try {
        if (data == "AM") {
            data = "PM"
        } else {
            data = "AM"
        }
        return data;
    } catch (err) {
        console.log(err)
    }
}

// date convert to am and pm {"fullTime": "4:02:45PM", "shortTime": "4:02PM"}
export function timeConvert(time) {
    try {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        let finalTime = { "fullTime": "", "shortTime": "" };
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
            finalTime.shortTime = time[0] + time[1] + time[2] + " " + time[time.length - 1];
            finalTime.fullTime = time.join('');
        }
        return finalTime; // return adjusted time or original string
    } catch (err) {
        console.log(err)
    }
}

// date change for api call ('2022/01/15 01:25 AM')
export function getDateReqInfoForApi(date, hour, minute, amp) {
    try {
        let resDate = "";
        if (date) {
            const currentDate = new Date(date);
            let year = currentDate.getFullYear();
            let day = ("0" + currentDate.getDate()).slice(-2);
            let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
            resDate = year + "/" + month + "/" + day + " " + hour + ":" + minute + " " + amp;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}


// date change for api call ('2022/01/15 01:25 AM')
export function formatYYYYMMDDHHMM(date) {
    try {
        let resDate = "";
        if (date) {
            const currentDate = new Date(date);
            let year = currentDate.getFullYear();
            let day = ("0" + currentDate.getDate()).slice(-2);
            let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            resDate = year + "-" + month + "-" + day + " , " + hours + ":" + minutes + " " + ampm;
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}
// date convart with respect to before and after with date range
export function dateChangeForBeforeAfter(date, type, range) {
    try {
        let resDate = "";
        if (date) {
            if (type == "after") {
                resDate = new Date(date.setDate(date.getDate() + range));
            } else {
                resDate = new Date(date.setDate(date.getDate() - range));
            }
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}

// date by range "N", "1W", "1M", "3M"
export function getDateByRange(type) {
    if (type == undefined || type == null || type.length == 0) {
        type = "3M"
    }
    let resDate = new Date();
    if (type == "N") {
        resDate = new Date();
    } else if (type == "1W") {
        resDate.setDate(resDate.getDate() - 7);
    } else if (type == "1M") {
        resDate.setDate(resDate.getDate() - 30);
    } else if (type == "3M") {
        resDate.setDate(resDate.getDate() - 90);
    }
    return formatYYYYMMDD(resDate)
}

// get the data { "hour": "01", "minutes": "03", "second": "04", "ampm": "AM", "rawTime": "01:03:00", "viewTime": "01:03 AM" } from time stamp
export function view24TimeFormat(date) {
    try {
        let resDate = { "hour": "0", "minutes": "0", "second": "0", "ampm": "", "rawTime": "", "viewTime": "" };
        if (date) {
            const currentDate = new Date(date);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let second = currentDate.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            let lowerCaseAmpm = hours >= 12 ? 'pm' : 'am';
            hours = hours < 10 ? "0" + hours.toString() : hours.toString();
            minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
            second = second < 10 ? "0" + second.toString() : second.toString();
            let rawTime = hours + ":" + minutes + ":" + second;
            let viewTime = hours + ":" + minutes + " " + ampm;
            resDate = { "hour": hours, "minutes": minutes, "second": second, "ampm": ampm, "rawTime": rawTime, "viewTime": viewTime, "lowerCaseAmpm": lowerCaseAmpm };
        }
        return resDate;
    } catch (err) {
        console.log(err)
    }
}


export function getDayName(date) {
    date = new Date(date);
    const currentDay = date.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[currentDay]
}

//format 12th January 2023
export function getDDthMonthNameYYYYformat(originalDate) {
    let dateObject = new Date(originalDate);
    let modObj = {};

    // Formatting the date to "17th August 2011"
    let day = dateObject.getUTCDate();
    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Getting the month name
    let month = monthNames[dateObject.getUTCMonth()];

    // let month = dateObject.toLocaleString('en-US', { month: 'long' });
    let year = dateObject.getUTCFullYear();

    // Function to add ordinal suffix (e.g., 'st', 'nd', 'rd', 'th')
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
    let ordinalDay = day + getOrdinalSuffix(day);
    modObj = { "day": `${ordinalDay}`, "month": `${month}`, "year": `${year}` };
    return modObj
}


// get day monthe year with name
export function getDayMonthYearName(originalDate) {
    let dateObject = new Date(originalDate);
    let modData = "";

    // Formatting the date to "17th August 2011"
    let day = dateObject.getUTCDate();
    // Array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Getting the month name
    let month = monthNames[dateObject.getUTCMonth()];

    // let month = dateObject.toLocaleString('en-US', { month: 'long' });
    let year = (dateObject.getUTCFullYear()) % 100;

    // Function to add ordinal suffix (e.g., 'st', 'nd', 'rd', 'th')
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
    let ordinalDay = day + getOrdinalSuffix(day);
    modData = ordinalDay + " " + month + " " + year;
    return modData
}

//format Tue,13 Dec
export function getDayNameMonthDateYYY(originalDate) {
    let dateObject = new Date(originalDate);
    let modData = "";

    // Array of day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Getting the day name
    let dayName = dayNames[dateObject.getUTCDay()];

    // Formatting the date to "Tue, 13 Dec"
    let day = dateObject.getUTCDate();
    let month = dateObject.getUTCMonth() + 1; // Months are zero-based, so add 1
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let monthName = monthNames[month - 1]; // Adjust index to get the correct month name
    let year = dateObject.getUTCFullYear() % 100;

    modData = `${dayName}, ${day} ${monthName}`;
    return modData;
}


// for get time period
export function getTimePeriodSvgName(originalDate) {
    const [time, modifier] = originalDate.split(" ");
    let [hour, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hour !== 12) {
        hour += 12;
    } else if (modifier === "AM" && hour === 12) {
        hour = 0;
    }
    // Parse the formatted date
    // let date = new Date(`1970-01-01T${originalDate}`);
    // const hour = date.getHours();

    let respData = { iconName: "sun", color: "#C7ECFF" };

    if (hour >= 5 && hour < 12) {
        respData.iconName = "sun"; //morning
    } else if (hour >= 12 && hour < 15) {
        respData.iconName = "sun"; //noon
    } else if (hour >= 15 && hour < 18) {
        respData.iconName = "sun"; //afternoon
    } else if (hour >= 18 && hour < 22) {
        respData.iconName = "sunFog"; //evening
        respData.color = "#C7FFD7";
    } else {
        respData.iconName = "moon"; //night
        respData.color = "#C7FFD7";
    }

    return respData
}


export function getITCtimeFormat(timestamp) {
    // const timestamp = "2023-08-31T18:04:04.000Z";

    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Get hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Format the minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Create the final formatted string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedTime
}

export function getITCDateFormat(timestamp) {

    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = date.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function getFirstDateOfCurrentMonth() {
    const currentDate = new Date();
    currentDate.setDate(1); // Set the day of the month to 1 (the first day of the month)
    return currentDate;
}
