// map functions are here to modify the data

import { DataConvert, GetUserData } from "../../services/common-view-function";
import { App_uri } from "../../services/config";
import { CommonData } from "../../services/constant";

export function modifyUserMapedData(data) {
    let resData = { locationAreaRegion: {}, polylineArr: [], userLocationArr: [], salesMapData: { Lead: [], Enquiry: [], Opportunity: [], Closed: [] } }
    let polylineArr = [],
        locationAreaRegion = {
            latitude: 0.000,
            longitude: 0.000
        },
        sumOfLat = 0.00,
        sumOfLong = 0.00;
    if (data) {
        if (data.length > 0) {
            let k = 0;
            for (let i = 0; i < data.length; i++) {
                if (k > (Object.keys(CommonData.ACTIVITY_COLOR).length) - 1) {
                    k = 0;
                }
                data[i]["latitude"] = parseFloat(data[i].lat);
                data[i]["longitude"] = parseFloat(data[i].lng);
                data[i].title = data[i].description;
                sumOfLat = sumOfLat + data[i].latitude;
                sumOfLong = sumOfLong + data[i].longitude;
                polylineArr.push({
                    latitude: data[i].latitude,
                    longitude: data[i].longitude,
                });
                data[i]["title"] = data[i].firstName + " " + data[i].lastName;
                data[i]["description"] = "Phone : " + data[i].phone;
                data[i]["color"] = CommonData.ACTIVITY_COLOR[k].color;
                // data[i]["image"] = data[i].profileImgUrl ? App_uri.SFA_IMAGE_URI + data[i].profileImgUrl : App_uri.SFA_IMAGE_URI + "//images/profileImage.png";
                data[i]["image"] = "https://img.icons8.com/plasticine/100/000000/user-location.png";


                // sales Map Data section
                resData.salesMapData.Lead.push(data[i]);
                resData.salesMapData.Enquiry.push(data[i]);
                resData.salesMapData.Opportunity.push(data[i]);
                resData.salesMapData.Closed.push(data[i]);
                k++;
            }
            // locationAreaRegion.latitude = sumOfLat / data.length;
            // locationAreaRegion.longitude = sumOfLong / data.length;
            locationAreaRegion.latitude = data[data.length - 1].latitude;
            locationAreaRegion.longitude = data[data.length - 1].longitude;
        }
    }
    resData.locationAreaRegion = locationAreaRegion;
    resData.polylineArr = polylineArr;
    resData.userLocationArr = data;
    return resData;
}



export async function modifyLiveTruckingData(data) {
    let resData = { locationAreaRegion: {}, polylineArr: [], userLocationArr: [], viewCountData: { fieldForce: 0, onDuty: 0, absent: 0, onLeave: 0, late: 0 } }
    let userLocation = await GetUserData.getUserLocation();
    let polylineArr = [],
        userLocationArr = [],
        locationAreaRegion = {
            latitude: userLocation.lattitude,
            longitude: userLocation.longitude
        },
        onDuty = 0,
        absent = 0,
        onLeave = 0,
        late = 0;
    if (data) {
        if (data.length > 0) {
            let k = 0;
            for (let i = 0; i < data.length; i++) {
                if (k > (Object.keys(CommonData.ACTIVITY_COLOR).length) - 1) {
                    k = 0;
                }
                data[i]["latitude"] = parseFloat(data[i].lat);
                data[i]["longitude"] = parseFloat(data[i].lng);
                data[i].title = data[i].description;
                data[i]["title"] = data[i].firstName + " " + data[i].lastName;
                data[i]["description"] = "Phone : " + data[i].phone;
                data[i]["color"] = CommonData.ACTIVITY_COLOR[k].color;
                data[i]["image"] = "https://img.icons8.com/plasticine/100/000000/user-location.png";

                let addCheck = false;
                if (data[i].isPresent == 1) {
                    onDuty++;
                    addCheck = true;
                    if (data[i].isLate == 1) {
                        late++;
                    }
                } else if (data[i].onLeave == 1) {
                    onLeave++;
                } else {
                    absent++;
                }

                if (addCheck) {
                    polylineArr.push({
                        latitude: data[i].latitude,
                        longitude: data[i].longitude,
                    });
                    userLocationArr.push(data[i]);
                }
                k++;
            }
            if (userLocationArr.length > 0) {
                locationAreaRegion.latitude = userLocationArr[userLocationArr.length - 1].latitude;
                locationAreaRegion.longitude = userLocationArr[userLocationArr.length - 1].longitude;
            } else {
                locationAreaRegion.latitude = data[data.length - 1].latitude;
                locationAreaRegion.longitude = data[data.length - 1].longitude;
            }

            // view Count Data section
            resData.viewCountData.fieldForce = data.length;
            resData.viewCountData.onDuty = onDuty;
            resData.viewCountData.absent = absent;
            resData.viewCountData.onLeave = onLeave;
            resData.viewCountData.late = late;
        }
    }
    resData.locationAreaRegion = locationAreaRegion;
    resData.polylineArr = polylineArr;
    resData.userLocationArr = userLocationArr;
    return resData;
}



export async function modifyBeatRouteData(data) {
    let resData = { locationAreaRegion: {}, polylineArr: [], userLocationArr: [], visitType: [], customer: [], influencer: [], newcustomer: [] }
    let userLocation = await GetUserData.getUserLocation();
    let polylineArr = [],
        userLocationArr = [],
        locationAreaRegion = {
            latitude: userLocation.lattitude,
            longitude: userLocation.longitude
        };
    if (data.map) {
        if (data.map.length > 0) {
            let k = 0;
            for (let i = 0; i < data.map.length; i++) {
                if (k > (Object.keys(CommonData.BEAT_ROUTE_COLOR).length) - 1) {
                    k = 0;
                }
                if (data.map[i].lat !== null) {
                    let userLocationObj = {};
                    data.map[i].lat = parseFloat(data.map[i].lat);
                    data.map[i].lng = parseFloat(data.map[i].lng);
                    userLocationObj["latitude"] = data.map[i].lat;
                    userLocationObj["longitude"] = data.map[i].lng;
                    userLocationObj["title"] = data.map[i].name;
                    userLocationObj["description"] = "Type : " + data.map[i].type;
                    userLocationObj["color"] = CommonData.BEAT_ROUTE_COLOR[data.map[k].visitType].color;
                    userLocationObj["image"] = "https://img.icons8.com/plasticine/100/000000/user-location.png";
                    polylineArr.push({
                        latitude: data.map[i].lat,
                        longitude: data.map[i].lng,
                    });
                    userLocationArr.push(userLocationObj);
                }
                k++;
            }
            if (userLocationArr.length > 0) {
                locationAreaRegion.latitude = userLocationArr[userLocationArr.length - 1].latitude;
                locationAreaRegion.longitude = userLocationArr[userLocationArr.length - 1].longitude;
            }

            // view Count Data section
        }
    }
    resData.locationAreaRegion = locationAreaRegion;
    resData.polylineArr = polylineArr;
    resData.userLocationArr = userLocationArr;
    resData.visitType = data.visitType ? DataConvert.modifyObjToDynamicArr(data.visitType, 2) : [];
    resData.customer = data.customer ? DataConvert.modifyObjToDynamicArr(data.customer, 2) : [];
    resData.influencer = data.influencer ? DataConvert.modifyObjToDynamicArr(data.influencer, 2) : [];
    resData.newcustomer = data.newcustomer ? DataConvert.modifyObjToDynamicArr(data.newcustomer, 2) : [];
    // resData = {...resData, ...data};
    return resData;
}


export async function modifySalesData(data) {
    let resData = {
        locationAreaRegion: {},
        polylineArr: [],
        userLocationArr: [],
        enquery: {
            enqueryLocationAreaRegion: {},
            enqueryPolylineArr: [],
            enqueryUserLocationArr: [],
            enqueryObjData: data.enquiry ? data.enquiry : {}
        },
        lead: {
            leadLocationAreaRegion: {},
            leadPolylineArr: [],
            leadUserLocationArr: [],
            leadObjData: data.lead ? data.lead : {}
        },
        opportunity: {
            opportunityLocationAreaRegion: {},
            opportunityPolylineArr: [],
            opportunityUserLocationArr: [],
            opportunityObjData: data.opportunity ? data.opportunity : {}
        },
        closed: {
            closedLocationAreaRegion: {},
            closedPolylineArr: [],
            closedUserLocationArr: [],
            closedObjData: data.closed ? data.closed : {}
        },
        salesTotalCount: data.total ? data.total : 0,
        dealerCount: 0,
        subDealerCount: 0,
        distributorCount: 0,
        hierarchyArr:[]
    }
    let userLocation = await GetUserData.getUserLocation();
    let polylineArr = [],
        userLocationArr = [],
        locationAreaRegion = {
            latitude: userLocation.lattitude,
            longitude: userLocation.longitude
        },
        enqueryLocationAreaRegion = locationAreaRegion,
        enqueryPolylineArr = [],
        enqueryUserLocationArr = [],
        leadLocationAreaRegion = locationAreaRegion,
        leadPolylineArr = [],
        leadUserLocationArr = [],
        opportunityLocationAreaRegion = locationAreaRegion,
        opportunityPolylineArr = [],
        opportunityUserLocationArr = [],
        closedLocationAreaRegion = locationAreaRegion,
        closedPolylineArr = [],
        closedUserLocationArr = [],
        hierarchyArr=[];
    if (data.map) {
        if (data.map.length > 0) {
            for (let i = 0; i < data.map.length; i++) {
                let color = "#000000";
                if (data.map[i].type == "Enquiry") {
                    color = "#FF0000";
                } else if (data.map[i].type == "Lead") {
                    color = "#8db600";
                } else if (data.map[i].type == "Opportunity") {
                    color = "#0000FF";
                } else if (data.map[i].type == "Recently Converted") {
                    color = "#fc8a3f";
                }
                if (data.map[i].lat !== null) {
                    let userLocationObj = {};
                    data.map[i].lat = parseFloat(data.map[i].lat);
                    data.map[i].lng = parseFloat(data.map[i].lng);
                    userLocationObj["latitude"] = data.map[i].lat;
                    userLocationObj["longitude"] = data.map[i].lng;
                    userLocationObj["title"] = data.map[i].name;
                    userLocationObj["description"] = "Type : " + data.map[i].contactType;
                    userLocationObj["color"] = color;
                    userLocationObj["image"] = "https://img.icons8.com/plasticine/100/000000/user-location.png";
                    let polylineObj = {
                        latitude: data.map[i].lat,
                        longitude: data.map[i].lng,
                    };
                    polylineArr.push(polylineObj);
                    userLocationArr.push(userLocationObj);

                    if (data.map[i].type == "Enquiry") {
                        enqueryPolylineArr.push(polylineObj);
                        enqueryUserLocationArr.push(userLocationObj);
                    } else if (data.map[i].type == "Lead") {
                        leadPolylineArr.push(polylineObj);
                        leadUserLocationArr.push(userLocationObj);
                    } else if (data.map[i].type == "Opportunity") {
                        opportunityPolylineArr.push(polylineObj);
                        opportunityUserLocationArr.push(userLocationObj);
                    } else if (data.map[i].type == "Recently Converted") {
                        closedPolylineArr.push(polylineObj);
                        closedUserLocationArr.push(userLocationObj);
                    }
                }
            }
            if (userLocationArr.length > 0) {
                locationAreaRegion.latitude = userLocationArr[userLocationArr.length - 1].latitude;
                locationAreaRegion.longitude = userLocationArr[userLocationArr.length - 1].longitude;
            }
            if (enqueryUserLocationArr.length > 0) {
                enqueryLocationAreaRegion.latitude = enqueryUserLocationArr[enqueryUserLocationArr.length - 1].latitude;
                enqueryLocationAreaRegion.longitude = enqueryUserLocationArr[enqueryUserLocationArr.length - 1].longitude;
            }
            if (leadUserLocationArr.length > 0) {
                leadLocationAreaRegion.latitude = leadUserLocationArr[leadUserLocationArr.length - 1].latitude;
                leadLocationAreaRegion.longitude = leadUserLocationArr[leadUserLocationArr.length - 1].longitude;
            }
            if (opportunityUserLocationArr.length > 0) {
                opportunityLocationAreaRegion.latitude = opportunityUserLocationArr[opportunityUserLocationArr.length - 1].latitude;
                opportunityLocationAreaRegion.longitude = opportunityUserLocationArr[opportunityUserLocationArr.length - 1].longitude;
            }
            if (closedUserLocationArr.length > 0) {
                closedLocationAreaRegion.latitude = closedUserLocationArr[closedUserLocationArr.length - 1].latitude;
                closedLocationAreaRegion.longitude = closedUserLocationArr[closedUserLocationArr.length - 1].longitude;
            }

            if(data.enquiry.percent){
                hierarchyArr.push({"percent":data.enquiry.percent,"type":"Enquiry", color:"#FF0000"});
                hierarchyArr.push({"percent":data.lead.percent,"type":"Lead", color:"#8db600"});
                hierarchyArr.push({"percent":data.opportunity.percent,"type":"Opportunity", color:"#0000FF"});
                hierarchyArr.push({"percent":data.closed.percent,"type":"Recently Converted", color:"#fc8a3f"});
            }

            resData.dealerCount = (data.enquiry.contact.Dealer ? parseInt(data.enquiry.contact.Dealer) : 0) + (data.lead.contact.Dealer ? parseInt(data.lead.contact.Dealer) : 0) + (data.opportunity.contact.Dealer ? parseInt(data.opportunity.contact.Dealer) : 0) + (data.closed.contact.Dealer ? parseInt(data.closed.contact.Dealer) : 0);
            resData.subDealerCount = (data.enquiry.contact["Sub-Dealer"] ? parseInt(data.enquiry.contact["Sub-Dealer"]) : 0) + (data.lead.contact["Sub-Dealer"] ? parseInt(data.lead.contact["Sub-Dealer"]) : 0) + (data.opportunity.contact["Sub-Dealer"] ? parseInt(data.opportunity.contact["Sub-Dealer"]) : 0) + (data.closed.contact["Sub-Dealer"] ? parseInt(data.closed.contact["Sub-Dealer"]) : 0);
            resData.distributorCount = data.enquiry.contact.Distributor ? parseInt(data.enquiry.contact.Distributor) : 0 + data.lead.contact.Distributor ? parseInt(data.lead.contact.Distributor) : 0 + data.opportunity.contact.Distributor ? parseInt(data.opportunity.contact.Distributor) : 0 + data.closed.contact.Distributor ? parseInt(data.closed.contact.Distributor) : 0;

            // view Count Data section
        }
    }
    resData.locationAreaRegion = locationAreaRegion;
    resData.polylineArr = polylineArr;
    resData.userLocationArr = userLocationArr;
    resData.enquery.enqueryLocationAreaRegion = enqueryLocationAreaRegion;
    resData.enquery.enqueryPolylineArr = enqueryPolylineArr;
    resData.enquery.enqueryUserLocationArr = enqueryUserLocationArr;

    resData.lead.leadLocationAreaRegion = leadLocationAreaRegion;
    resData.lead.leadPolylineArr = leadPolylineArr;
    resData.lead.leadUserLocationArr = leadUserLocationArr;

    resData.opportunity.opportunityLocationAreaRegion = opportunityLocationAreaRegion;
    resData.opportunity.opportunityPolylineArr = opportunityPolylineArr;
    resData.opportunity.opportunityUserLocationArr = opportunityUserLocationArr;

    resData.closed.closedLocationAreaRegion = closedLocationAreaRegion;
    resData.closed.closedPolylineArr = closedPolylineArr;
    resData.closed.closedUserLocationArr = closedUserLocationArr;
    resData.hierarchyArr = hierarchyArr;
    return resData;
}