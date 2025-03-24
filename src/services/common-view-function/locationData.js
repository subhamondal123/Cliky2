import { PermissionsAndroid, Platform } from "react-native";
// import Geocoder from "react-native-geocoder";
// import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

// Geocoder.init("AIzaSyBv-IGMgeps9smwC930M_4IVd_TN8dLXGc");

export function fetchCurrentLocation() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS == "android") {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission Required',
                        message:
                            'Application needs access to your Location',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    resolved(getGeoLocation());
                }
            } else {
                resolved(getGeoLocation());
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    });
}

function getGeoLocation() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS == 'ios') {
                Geolocation.requestAuthorization("always");
            }
            Geolocation.getCurrentPosition(
                async (position) => {
                    let currentLocation = position.coords;
                    resolved(currentLocation)
                    // await getGeoLocationAddress(currentLocation.latitude,currentLocation.longitude)
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    })
}

// export function getGeoLocationAddress(lat, long) {
//     return new Promise(async function (resolved, reject) {
//         try {

//             Geocoder.from(lat, long)
//                 .then(json => {
//                     var addressComponent = json.results[0].address_components[0];
//                     console.log(addressComponent);
//                 })
//                 .catch(error => console.warn(error));

//         } catch (err) {
//             // resolved(err)
//             console.log(err)
//         }
//     })
// }

// export function getAdderss(lat, long) {
//     console.log("lat long :::", lat, long)
//     return new Promise(async function (resolved, reject) {
//         try {
//             var NY = {
//                 lat: lat,
//                 lng: long
//             }
//             await Geocoder.geocodePosition(NY).then(res => {
//                 // res is an Array of geocoding object (see below)
//                 console.log("res ::::", JSON.stringify(res))
//                 if (res.length > 0) {
//                     resolved(res[0]);
//                 } else {
//                     resolved({});
//                 }
//             })
//                 .catch(err => {
//                     console.log(err);
//                     resolved({});
//                 })


//             // Geocoder.init("AIzaSyBv-IGMgeps9smwC930M_4IVd_TN8dLXGc");
//             // Geocoder.from(lat, long)
//             //     .then(json => {
//             //         var addressComponent = json.results[0].address_components[0];
//             //         console.log("addressComponent :::", addressComponent);
//             //     })
//             //     .catch(error => console.warn(error));
//         } catch (err) {
//             // resolved(err)
//             console.log(err)
//         }
//     })
// }