import CryptoJS from "react-native-crypto-js";
import { Api_Key } from "../../config";

export function CryptoDecode(data) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, Api_Key.API_SECRET.CRYPTO_SECRET.SECRET);  // Decrypt the encripted crypto token in byteCode from api
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (e) {
        console.log(e)
    }
}


// For local store data
export function CryptoInternalDecode(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, Api_Key.API_SECRET.CRYPTO_SECRET.INTERNAL_DECODE_SECRET); // Decrypt the encripted crypto token in byteCode from api
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (e) {
      console.log(e);
    }
  }