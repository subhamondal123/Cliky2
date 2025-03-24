import CryptoJS from "react-native-crypto-js";
import { Api_Key } from "../../config";


export function CryptoEncode(data) {
    try {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), Api_Key.API_SECRET.CRYPTO_SECRET.SECRET).toString(); // Encrypt the jwt token in Crypto
        return ciphertext;
    } catch (e) {
        console.log(e)
    }
}


// For local store data
export function CryptoInternalEncode(data) {
    try {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), Api_Key.API_SECRET.CRYPTO_SECRET.INTERNAL_ENCODE_SECRET).toString(); // Encrypt the jwt token in Crypto
        return ciphertext;
    } catch (e) {
        console.log(e);
    }
}