import AsyncStorage from "@react-native-async-storage/async-storage";
import { CryptoDecoder, CryptoEncoder } from "../auth";

// store single value
const storeData = async (item, value) => {
    try {
        value = CryptoEncoder.CryptoInternalEncode(value);
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(item, jsonValue);
        return true;
    } catch (e) {
        return false;
    }
};


// multile store value. (The value pair is "[["@MyApp_user", "value_1"],["@MyApp_key", "value_2"]]"
const multipleStoreData = async (itemArr) => {
    try {
        await AsyncStorage.multiSet(itemArr)
        return true;
    } catch (e) {
        return false;
    }
}


// Merges an existing value stored under key, with new value.
const mergeItem = async (item, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.mergeItem(item, jsonValue);
        return true;
    } catch (e) {
        return false;
    }
}


// get single item
const getData = async (item) => {
    try {
        const jsonValue = await AsyncStorage.getItem(item);
        return jsonValue != null ? CryptoDecoder.CryptoInternalDecode(JSON.parse(jsonValue)) : null;
    } catch (e) {
        return null;
    }
};

// Fetches multiple key-value pairs for given array of keys in a batch. (items are like "['@MyApp_item1', '@MyApp_item2']")
const getMultipleData = async (items) => {
    try {
        const values = await AsyncStorage.multiGet(items);
        // return values != null ? JSON.parse(values) : null;
        return values;
    } catch (e) {
        return null;
    }
}

// Returns all keys known to your App, for all callers, libraries, etc
const getAllKeys = async () =>{
    let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys
  } catch(e) {
      return null
  }
}


// Removes item for a key. (item is like "@MyApp_key")
const singleRemove = async (item) => {
    try {
        await AsyncStorage.removeItem(item)
        return true;
    } catch (e) {
        return null;
    }
}


// Multi remove (items are in array like "['@MyApp_ITEM_1', '@MyApp_ITEM_2']")
const multipleRemove = async (items) => {
    try {
        await AsyncStorage.multiRemove(items);
        return true;
    } catch (e) {
        return false;
    }
}

// clear all data from the storage
const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        return false;
    }
};


export { storeData, multipleStoreData, mergeItem, getData, getMultipleData, getAllKeys, singleRemove, multipleRemove, clearStorage };