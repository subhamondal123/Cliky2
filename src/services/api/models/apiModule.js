import axios from 'axios';
import { CryptoDecoder, CryptoEncoder } from '../../auth';
import { StorageDataModification, Toaster } from '../../common-view-function';
import { ApiConfigUrl } from "./";


export function ApiCall(uriName, payload) {
    // console.log("uriName----", uriName)
    return new Promise(async function (resolved, reject) {
        try {
            // let responseTimeExceeded = false; // Variable to track if response time has exceeded

            // Set a timeout for the response time (e.g., 10 seconds)
            // const responseTimeout = setInterval(() => {
            //     Toaster.ShortCenterToaster("Request is taking too long..Please wait");
            // }, 10000); // Change the timeout value as needed

            if (ApiConfigUrl.APP_LAST_URI[uriName].isAuth == true) {
                const token = await StorageDataModification.authData({}, "get");
                axios.interceptors.request.use(
                    config => {
                        if (config.headers.authorization === undefined) {
                            config.headers.authorization = `Bearer ` + token;
                        }
                        return config;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
            // console.log("------uriname----------" + uriName + "-----------" + ApiConfigUrl.APP_LAST_URI[uriName].path + "----------------" + JSON.stringify(payload))

            if (ApiConfigUrl.APP_LAST_URI[uriName].method == "POST") {
                if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                    payload = { payload: CryptoEncoder.CryptoEncode(payload) };
                }

                axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                    .then(res => {
                        // clearInterval(responseTimeout); // Clear the response timeout

                        let response = res.data;


                        if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                            response = CryptoDecoder.CryptoDecode(response);
                        }
                        resolved(response);
                    })
                    .catch(error => {
                        // clearInterval(responseTimeout); // Clear the response timeout
                        // handle error
                        Toaster.ShortCenterToaster("Network error !")
                        reject(error);
                        // console.log("error:::",error)

                    })
            } else if (ApiConfigUrl.APP_LAST_URI[uriName].method == "GET") {
                axios.get(ApiConfigUrl.APP_LAST_URI[uriName].path)
                    .then(res => {
                        let response = res.data;
                        if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                            response = CryptoDecoder.CryptoDecode(response);
                        }
                        resolved(response);
                    })
                    .catch(error => {
                        // handle error
                        reject(error);
                    })
            }
        } catch (e) {
            reject(e);
        }
    })
}


export function ApiFileCall(uriName, payload) {
    return new Promise(async function (resolved, reject) {
        try {
            // console.log("payload-------------", JSON.stringify(payload))
            axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                .then(res => {
                    let response = res.data;
                    if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                        response = CryptoDecoder.CryptoDecode(response);
                    }
                    resolved(response);
                })
                .catch(error => {
                    Toaster.ShortCenterToaster("Network Error, Please try again later !")
                    console.log(error)
                    // handle error
                    resolved(true);
                })
        } catch (e) {
            reject(e);
        }
    })
}
