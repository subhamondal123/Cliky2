export default class Mcalendar {
	constructor() {
		this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.shortmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		this.weekdays = ["S", "M", "T", "W", "T", "F", "S"];
		this.fWeekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		this.timeObj = this.getTimeArr();
		this.dtObj = new Date();
		this.curObj = new Date();
		this.curView = "MONTH";
		this.events = {};
		this.eventsTime = {};
	}
	getTimeArr() {
		let arr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		let finalObj = [];
		for (let i = 0; i < arr.length; i++) {
			let daystr = (arr[i] < 10) ? "0" + arr[i] : arr[i];
			let ap = (i < 12) ? "AM" : "PM";
			let localObj = { "t": arr[i], "ap": ap, "ts": daystr };
			finalObj.push(localObj);
		}
		return finalObj;
	}
	setFullDate(date) {
		this.dtObj = new Date(date);
	}
	changeView(viewName) {
		this.curView = viewName;
	}
	getView() {
		return this.curView;
	}
	getCurDate() {
		let dtObj = new Date();
		let data = this.getAllTypes(dtObj);
		let stringDate = data.fullYear;
		if (data.month < 9) {
			stringDate = stringDate + "-0" + parseInt(data.month + 1);
		} else {
			stringDate = stringDate + "-" + parseInt(data.month + 1);
		}
		if (data.dateDay < 10) {
			stringDate = stringDate + "-0" + data.dateDay;
		} else {
			stringDate = stringDate + "-" + data.dateDay;
		}
		return stringDate;
	}
	setEventsDetails(events) {
		if (Array.isArray(events)) {
			let finalObj = {};
			let finalTimeObj = {};
			for (let i = 0; i < events.length; i++) {
				if (events[i].date !== undefined && events[i].data !== undefined) {
					if (finalObj[events[i].date] === undefined) {
						finalObj[events[i].date] = [events[i].data];
					} else {
						finalObj[events[i].date].push(events[i].data);
					}
				}
			}
			for (let i = 0; i < events.length; i++) {
				if (events[i].date !== undefined && events[i].time !== undefined && events[i].data !== undefined) {
					let time = events[i].time;
					let ttspl1 = time.split(" ");
					let ttspl2 = ttspl1[0].split(":");
					let time1 = ttspl2[0] + ":" + "00 " + ttspl1[1];
					if (finalTimeObj[events[i].date] === undefined) {
						finalTimeObj[events[i].date] = {};
						finalTimeObj[events[i].date][time1] = [events[i].data];
					} else {
						if (finalTimeObj[events[i].date][time1] === undefined) {
							finalTimeObj[events[i].date][time1] = [events[i].data];
						} else {
							finalTimeObj[events[i].date][time1].push(events[i].data);
						}
					}
				}
			}
			this.eventsTime = finalTimeObj;
			this.events = finalObj;
			return true;
		} else {
			return false;
		}
	}
	getAllTypes(dtObj) {
		return {

			"dateDay": dtObj.getDate(),          // Get the day as a number (1-31)
			"weekDay": dtObj.getDay(),           // Get the weekday as a number (0-6)
			"fullYear": dtObj.getFullYear(),      // Get the four digit year (yyyy)
			"hour": dtObj.getHours(),         // Get the hour (0-23)
			"milliSecond": dtObj.getMilliseconds(),  // Get the milliseconds (0-999)
			"minute": dtObj.getMinutes(),       // Get the minutes (0-59)
			"month": dtObj.getMonth(),         // Get the month (0-11)
			"second": dtObj.getSeconds(),       // Get the seconds (0-59)
			"time": dtObj.getTime()
		}
	}
	checkLeapYear(year) {
		//three conditions to find out the leap year
		if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
			return true;
		} else {
			return false;
		}
	}

	getNumberOfDay(dtObj) {
		let data = this.getAllTypes(dtObj);
		let NoOfDays = 0;
		switch (data.month) {
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				NoOfDays = 31;
				break;
			case 3:
			case 5:
			case 8:
			case 10:
				NoOfDays = 30;
				break;
			case 1:
				if (this.checkLeapYear(data.fullYear) === true) {
					NoOfDays = 29;
				} else {
					NoOfDays = 28;
				}
				break;
		}
		return NoOfDays;
	}

	getWeekDayOfFirstDate(dtObj) {
		let data = this.getAllTypes(dtObj);
		let month;
		if (data.month < 9) {
			month = "0" + parseInt(data.month + 1);
		} else {
			month = parseInt(data.month + 1);
		}
		let selectDateObj = new Date(data.fullYear + "/" + month + "/01");
		let data1 = this.getAllTypes(selectDateObj);
		return data1.weekDay;
	}
	changeNextMonth() {
		let data = this.getAllTypes(this.dtObj);
		let month;
		let year = data.fullYear;
		if (data.month === 11) {
			month = "01";
			year = year + 1;
		} else if (data.month < 8) {
			month = "0" + parseInt(data.month + 2);
		} else {
			month = parseInt(data.month + 2);
		}
		this.dtObj = new Date(year + "-" + month + "-01");

	}
	changePrevMonth() {
		let data = this.getAllTypes(this.dtObj);
		let month;
		let year = data.fullYear;
		if (data.month === 0) {
			month = "12";
			year = year - 1;
		} else if (data.month < 10) {
			month = "0" + parseInt(data.month);
		} else {
			month = parseInt(data.month);
		}
		this.dtObj = new Date(year + "-" + month + "-01");
	}
	getDateStrFromObj(dateData) {
		let eventDate = dateData.fullYear;
		if (dateData.month < 9) {
			eventDate = eventDate + "-0" + parseInt(dateData.month + 1);
		} else {
			eventDate = eventDate + "-" + parseInt(dateData.month + 1);
		}
		let dayStr = (dateData.dateDay < 10) ? "0" + dateData.dateDay : dateData.dateDay.toString();
		eventDate = eventDate + "-" + dayStr;
		return eventDate;
	}
	compDate(curStr, dateStr) {
		if (curStr === null || curStr === "") {
			curStr = this.getCurDate();
		}

		if (dateStr == curStr) {
			return true;
		} else {
			return false;
		}
	}
	changePrevWeek() {
		let weekView = this.getWeekView();
		let firstDay = weekView.weekView[0];
		let day = parseInt(firstDay.day), month = firstDay.month - 1, year = firstDay.year, dayStr = "";
		if (day == 1) {
			if (month == 0) {
				year = year - 1;
				month = 11;
				day = 31;
			} else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10) {
				month = month - 1;
				day = 31;
			} else if (month == 2) {
				month = month - 1;
				if (this.checkLeapYear(year) === true) {
					day = 29;
				} else {
					day = 28;
				}
			} else if (month == 4 || month == 6 || month == 9 || month == 11) {
				month = month - 1;
				day = 30;
			}
		} else {
			day = day - 1;
		}
		month = month + 1;
		let monthStr = (month < 10) ? "0" + month : month.toString();
		dayStr = (day < 10) ? "0" + day : day.toString();
		this.dtObj = new Date(year + "/" + monthStr + "/" + dayStr + " 23:59");
	}
	changeNextWeek() {
		let weekView = this.getWeekView();
		let lastDay = weekView.weekView[6];
		let day = parseInt(lastDay.day), month = lastDay.month - 1, year = lastDay.year, dayStr = "";
		if (day < 28) {
			day = day + 1;
		} else if (day === 31) {
			day = 1;
			dayStr = "0" + day;
			if (month === 11) {
				month = 0;
				year = year + 1;
			} else {
				month = month + 1;
			}
		} else if (day === 30) {
			if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
				day = day + 1;
			} else if (month == 3 || month == 5 || month == 8 || month == 10) {
				day = 1;
				month = month + 1;
			}
		} else if (day === 28 || day === 29) {
			if (month == 1) {
				if (day === 29) {
					day = 1;
					month = month + 1;
				} else if (this.checkLeapYear(year)) {
					day = day + 1;
				} else {
					day = 1;
					month = month + 1;
				}
			} else {
				day = day + 1;
			}
		}
		month = month + 1;
		let monthStr = (month < 10) ? "0" + month : month.toString();
		dayStr = (day < 10) ? "0" + day : day.toString();
		this.dtObj = new Date(year + "/" + monthStr + "/" + dayStr + " 23:59");
	}
	getWeekView() {
		let data = this.getAllTypes(this.dtObj);
		let dayStr = "";
		var dayObj = {};
		let month = data.month;
		let day = data.dateDay;
		let year = data.fullYear;
		let eventData;
		dayStr = (day < 10) ? "0" + day : day.toString();

		let eventDate = this.getDateStrFromObj({ "dateDay": day, "month": month, "fullYear": year });
		if (this.events[eventDate] !== undefined) {
			eventData = this.events[eventDate];
		}
		let arr = [{ "day": dayStr, "month": (month + 1), "weekIndex": data.weekDay, "year": year, "isToday": this.compDate("", eventDate), data: eventData, "time": "" }];
		if (data.weekDay !== 0) {
			for (let i = data.weekDay - 1; i >= 0; i--) {
				if (day == 1) {
					if (month == 0) {
						year = year - 1;
						month = 11;
						day = 31;
					} else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10) {
						month = month - 1;
						day = 31;
					} else if (month == 2) {
						month = month - 1;
						if (this.checkLeapYear(year) === true) {
							day = 29;
						} else {
							day = 28;
						}
					} else if (month == 4 || month == 6 || month == 9 || month == 11) {
						month = month - 1;
						day = 30;
					}
					eventDate = this.getDateStrFromObj({ "dateDay": day, "month": month, "fullYear": year });
					if (this.events[eventDate] !== undefined) {
						eventData = this.events[eventDate];
					}
					dayObj = { "day": day.toString(), "month": (month + 1), "weekIndex": i, "year": year, "isToday": this.compDate("", eventDate), data: eventData, "time": "" };
				} else {
					day = day - 1;
					dayStr = (day < 10) ? "0" + day : day.toString();
					eventDate = this.getDateStrFromObj({ "dateDay": day, "month": month, "fullYear": year });
					if (this.events[eventDate] !== undefined) {
						eventData = this.events[eventDate];
					}
					dayObj = { "day": dayStr, "month": (month + 1), "weekIndex": i, "year": year, "isToday": this.compDate("", eventDate), data: eventData, "time": "" };
				}
				arr.splice(0, 0, dayObj);
			}
		}
		month = data.month;
		day = data.dateDay;
		year = data.fullYear;
		if (data.weekDay !== 6) {
			for (let i = data.weekDay + 1; i <= 6; i++) {
				if (day < 28) {
					day = day + 1;
				} else if (day === 31) {
					day = 1;
					dayStr = "0" + day;
					if (month === 11) {
						month = 0;
						year = year + 1;
					} else {
						month = month + 1;
					}
				} else if (day === 30) {
					if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
						day = day + 1;
					} else if (month == 3 || month == 5 || month == 8 || month == 10) {
						day = 1;
						month = month + 1;
					}
				} else if (day === 28 || day === 29) {
					if (month == 1) {
						if (day === 29) {
							day = 1;
							month = month + 1;
						} else if (this.checkLeapYear(year)) {
							day = day + 1;
						} else {
							day = 1;
							month = month + 1;
						}
					} else {
						day = day + 1;
					}
				}
				dayStr = (day < 10) ? "0" + day : day.toString();
				eventDate = this.getDateStrFromObj({ "dateDay": day, "month": month, "fullYear": year });
				if (this.events[eventDate] !== undefined) {
					eventData = this.events[eventDate];
				}
				dayObj = { "day": dayStr, "month": (month + 1), "weekIndex": i, "year": year, "isToday": this.compDate("", eventDate), data: eventData, "time": "" };
				arr.push(dayObj);
			}
		}
		var calData = [];
		var calRowdata = [];
		for (let j = 0; j <= this.timeObj.length; j++) {
			calRowdata = [];
			for (let i = 0; i < 7; i++) {
				let timeStr = "";
				if (j == 0) {
					timeStr = "12:00 AM - 11:59 PM";
				} else {
					timeStr = this.timeObj[j - 1].ts + ":00 " + this.timeObj[j - 1].ap + " - " + this.timeObj[j - 1].ts + ":59" + this.timeObj[j - 1].ap;
				}
				let d = arr[i].day;
				let m = arr[i].month;
				let w = arr[i].weekIndex, y = arr[i].year, t = arr[i].isToday;
				eventDate = this.getDateStrFromObj({ "dateDay": d, "month": m - 1, "fullYear": y });
				eventData = [];
				if (j == 0) {
					if (this.events[eventDate] !== undefined) {
						eventData = this.events[eventDate];
					}
				} else {
					if (this.eventsTime[eventDate] !== undefined) {
						let ttt = this.timeObj[j - 1].t + ":00 " + this.timeObj[j - 1].ap;
						eventData = this.eventsTime[eventDate][ttt];
					}
				}
				let data111 = eventData === undefined ? [] : eventData;
				let fObj = {
					"day": d,
					"month": m,
					"weekIndex": w,
					"year": y,
					"isToday": t,
					"time": timeStr,
					"data": data111
				};
				calRowdata.push(fObj);
			}
			calData.push(calRowdata);
		}
		let headerStr = "";
		let fmonth = arr[0].month - 1;
		let lmonth = arr[6].month - 1;
		if (arr[0].year != arr[6].year) {
			headerStr = this.shortmonths[fmonth] + " " + arr[0].day + "," + arr[0].year + " - " + this.shortmonths[lmonth] + " " + arr[6].day + "," + arr[6].year;
		} else if (arr[0].month != arr[6].month) {
			headerStr = this.shortmonths[fmonth] + " " + arr[0].day + " - " + this.shortmonths[lmonth] + " " + arr[6].day + "," + arr[6].year;
		} else {
			headerStr = this.shortmonths[fmonth] + " " + arr[0].day + " - " + arr[6].day + "," + arr[6].year;
		}
		return { "months": this.shortmonths, "weekdays": this.weekdays, "view": calData, "currentMonth": this.months[data.month], "CurrentYear": data.fullYear, "weekView": arr, "headerStr": headerStr, "timeObj": this.timeObj };
	}
	getMonthView() {
		var caldata = [];
		let counter = 0;
		let data = this.getAllTypes(this.dtObj);
		let NoOfDays = this.getNumberOfDay(this.dtObj);
		let weekNum = this.getWeekDayOfFirstDate(this.dtObj);
		var calRowData = [];
		let weekDayCounter = 0;
		let curDate = this.getCurDate();
		for (let i = 0; i < weekNum; i++) {
			calRowData.push({ "weekIndex": counter % 7 });
			counter++;
		}
		for (let i = 1; i <= NoOfDays; i++) {
			if (counter % 7 == 0) {
				caldata.push(calRowData);
				var calRowData = [];
			}
			let isToday = false;
			let eventDate = data.fullYear;
			if (data.month < 9) {
				eventDate = eventDate + "-0" + parseInt(data.month + 1);
			} else {
				eventDate = eventDate + "-" + parseInt(data.month + 1);
			}
			let eventData = {};
			if (i < 10) {
				eventDate = eventDate + "-0" + i;
				if (this.events[eventDate] !== undefined) {
					eventData = this.events[eventDate];
				}
				if (curDate === eventDate) {
					isToday = true;
				}
				calRowData.push({ "day": "0" + i, "month": data.month + 1, "year": data.fullYear, "weekIndex": counter % 7, data: eventData, "isToday": isToday });
			} else {
				eventDate = eventDate + "-" + i;
				if (this.events[eventDate] !== undefined) {
					eventData = this.events[eventDate];
				}
				if (curDate === eventDate) {
					isToday = true;
				}
				calRowData.push({ "day": i.toString(), "month": data.month + 1, "year": data.fullYear, "weekIndex": counter % 7, data: eventData, "isToday": isToday });
			}
			counter++;
		}
		if (calRowData.length < 7) {
			let rowNum = (7 - calRowData.length);
			for (let i = 0; i < rowNum; i++) {
				calRowData.push({ "weekIndex": counter % 7 });
				counter++;
			}
		}
		caldata.push(calRowData);
		return { "weekView": [], "months": this.months, "weekdays": this.weekdays, "fWeekView": this.fWeekdays, "view": caldata, "currentMonth": this.months[data.month], "CurrentYear": data.fullYear, "timeObj": this.timeObj };
	}

	getDayView() {
		var calData = [];
		let data = this.getAllTypes(this.dtObj);
		let day = data.dateDay;
		let dayStr = (day < 10) ? "0" + day : day.toString();
		let isToday = false;
		let eventDate = data.fullYear;
		let headerStr = "";
		if (data.month < 9) {
			eventDate = eventDate + "-0" + parseInt(data.month + 1);
		} else {
			eventDate = eventDate + "-" + parseInt(data.month + 1);
		}
		let curDate = this.getCurDate();
		eventDate = eventDate + "-" + dayStr;
		if (curDate === eventDate) {
			isToday = true;
		}
		headerStr = this.months[data.month] + " " + dayStr;
		for (let j = 0; j <= this.timeObj.length; j++) {
			let timeStr = "";
			if (j == 0) {
				timeStr = "12:00 AM - 11:59 PM";
			} else {
				timeStr = this.timeObj[j - 1].ts + ":00 " + this.timeObj[j - 1].ap + " - " + this.timeObj[j - 1].ts + ":59" + this.timeObj[j - 1].ap;
			}
			let eDate = this.getDateStrFromObj({ "dateDay": day, "month": data.month, "fullYear": data.fullYear });
			let eventData = [];
			if (j == 0) {
				if (this.events[eDate] !== undefined) {
					eventData = this.events[eDate];
				}
			} else {
				if (this.eventsTime[eDate] !== undefined) {
					let ttt = this.timeObj[j - 1].t + ":00 " + this.timeObj[j - 1].ap;
					eventData = this.eventsTime[eDate][ttt];
				}
			}
			let data111 = eventData === undefined ? [] : eventData;
			let fObj = {
				"day": dayStr,
				"month": parseInt(data.month + 1),
				"weekIndex": data.weekDay,
				"year": data.fullYear,
				"isToday": isToday,
				"time": timeStr,
				"data": data111
			};
			calData.push(fObj);
		}
		return { "weekView": [], "months": this.months, "weekdays": this.weekdays, "view": calData, "currentMonth": this.months[data.month], "CurrentYear": data.fullYear, "headerStr": headerStr, "timeObj": this.timeObj };
	}

	changeNextDay() {
		let data = this.getAllTypes(this.dtObj);
		let month = data.month;
		let day = data.dateDay;
		let year = data.fullYear;
		if (day < 28) {
			day = day + 1;
		} else if (day === 31) {
			day = 1;
			if (month === 11) {
				month = 0;
				year = year + 1;
			} else {
				month = month + 1;
			}
		} else if (day === 30) {
			if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
				day = day + 1;
			} else if (month == 3 || month == 5 || month == 8 || month == 10) {
				day = 1;
				month = month + 1;
			}
		} else if (day === 28 || day === 29) {
			if (month == 1) {
				if (day === 29) {
					day = 1;
					month = month + 1;
				} else if (this.checkLeapYear(year)) {
					day = day + 1;
				} else {
					day = 1;
					month = month + 1;
				}
			} else {
				day = day + 1;
			}
		}
		let dayStr = (day < 10) ? "0" + day : day.toString();
		let mm = month + 1;
		let monthStr = mm < 10 ? "0" + mm : mm.toString();
		this.dtObj = new Date(year + "/" + monthStr + "/" + dayStr + " 23:59:59");
	}

	changePrevDay() {
		let data = this.getAllTypes(this.dtObj);
		let month = data.month;
		let day = data.dateDay;
		let year = data.fullYear;
		if (day == 1) {
			if (month == 0) {
				year = year - 1;
				month = 11;
				day = 31;
			} else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10) {
				month = month - 1;
				day = 31;
			} else if (month == 2) {
				month = month - 1;
				if (this.checkLeapYear(year) === true) {
					day = 29;
				} else {
					day = 28;
				}
			} else if (month == 4 || month == 6 || month == 9 || month == 11) {
				month = month - 1;
				day = 30;
			}
		} else {
			day = day - 1;
		}
		let dayStr = (day < 10) ? "0" + day : day.toString();
		let mm = month + 1;
		let monthStr = mm < 10 ? "0" + mm : mm.toString();
		this.dtObj = new Date(year + "/" + monthStr + "/" + dayStr + " 23:59:59");
	}
}