import * as ImagePicker from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import {
    Alert,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { Permissions } from ".";

// upload from galary
export function uploadImg() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS === 'android') {
                const granted = await Permissions.GetAllPermissionsForAccess("image");
              
                if (granted) {
                    let options = {
                        storageOptions: {
                            skipBackup: true,
                            path: 'images'
                        },
                        quality: 0.6
                    };
                    ImagePicker.launchImageLibrary(options, (response) => {
                        if (response.didCancel) {
                        } else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                            Alert.alert(response.customButton);
                        } else {

                            let imgResData = { "uri": response.assets[0].uri, "type": response.assets[0].type, "name": response.assets[0].fileName, "size": response.assets[0].fileSize };
                            resolved(imgResData)
                        }
                    });
                } else {
                    console.log("File permission denied");
                }
            } else {
                let options = {
                    storageOptions: {
                        skipBackup: true,
                        path: 'images'
                    },
                    quality: 0.3
                };
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        Alert.alert(response.customButton);
                    } else {
                        let imgResData = { "uri": response.assets[0].uri, "type": response.assets[0].type, "name": response.assets[0].fileName, "size": response.assets[0].fileSize };
                        resolved(imgResData)
                    }
                });
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    });
}

// Open camera
export function uploadCameraImg() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS === 'android') {
                const granted = await Permissions.GetAllPermissionsForAccess("camera");
                if (granted) {
                    let options = {
                        storageOptions: {
                            skipBackup: true,
                            path: 'images'
                        },
                        quality: 0.3
                    };
                    ImagePicker.launchCamera(options, (response) => {
                        try {
                            if (response.didCancel) {
                            } else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            } else if (response.customButton) {
                                Alert.alert(response.customButton);
                            } else {
                                let imgResData = { "uri": response.assets[0].uri, "type": response.assets[0].type, "name": response.assets[0].fileName, "size": response.assets[0].fileSize };
                                resolved(imgResData)
                            }
                        } catch (err) {
                            console.log(err);
                            Toaster.LongCenterToaster("Error! Please try again");
                        }
                    });

                } else {
                    console.log("Camera permission denied");
                }
            } else {
                let options = {
                    storageOptions: {
                        skipBackup: true,
                        path: 'images'
                    },
                    quality: 0.3
                };
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        Alert.alert(response.customButton);
                    } else {
                        let imgResData = { "uri": response.assets[0].uri, "type": response.assets[0].type, "name": response.assets[0].fileName, "size": response.assets[0].fileSize };
                        resolved(imgResData)
                    }
                });
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    });
}


// Documents upload
export function uploadDocument() {
    return new Promise(async function (resolved, reject) {
        try {
            const res = await DocumentPicker.pick({
                //by using allFiles type, you will able to pick any type of media from user device, 
                //There can me more options as well
                //DocumentPicker.types.images: All image types
                //DocumentPicker.types.plainText: Plain text files
                //DocumentPicker.types.audio: All audio types
                //DocumentPicker.types.pdf: PDF documents
                //DocumentPicker.types.zip: Zip files
                //DocumentPicker.types.csv: Csv files
                //DocumentPicker.types.doc: doc files
                //DocumentPicker.types.docx: docx files
                //DocumentPicker.types.ppt: ppt files
                //DocumentPicker.types.pptx: pptx files
                //DocumentPicker.types.xls: xls files
                //DocumentPicker.types.xlsx: xlsx files
                //For selecting more more than one options use the 
                //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
                type: [DocumentPicker.types.docx, DocumentPicker.types.pdf, DocumentPicker.types.csv],
            });
            let docResData = { "uri": res[0].uri, "type": res[0].type, "name": res[0].name, "size": res[0].size }
            resolved(docResData);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                resolved(err);
            }
        }
    });
}

// Documents upload
export function uploadDocumentAndImage() {
    return new Promise(async function (resolved, reject) {
        try {
            const res = await DocumentPicker.pick({
                //by using allFiles type, you will able to pick any type of media from user device, 
                //There can me more options as well
                //DocumentPicker.types.images: All image types
                //DocumentPicker.types.plainText: Plain text files
                //DocumentPicker.types.audio: All audio types
                //DocumentPicker.types.pdf: PDF documents
                //DocumentPicker.types.zip: Zip files
                //DocumentPicker.types.csv: Csv files
                //DocumentPicker.types.doc: doc files
                //DocumentPicker.types.docx: docx filesFileUpload
                //DocumentPicker.types.ppt: ppt files
                //DocumentPicker.types.pptx: pptx files
                //DocumentPicker.types.xls: xls files
                //DocumentPicker.types.xlsx: xlsx files
                //For selecting more more than one options use the 
                //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
                type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.images],
            });
            let docResData = { "uri": res[0].uri, "type": res[0].type, "name": res[0].name, "size": res[0].size }
            resolved(docResData);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                resolved(err);
            }
        }
    });
}

// Documents upload
export function uploadPdfAndImage() {
    return new Promise(async function (resolved, reject) {
        try {
            const res = await DocumentPicker.pick({
                //by using allFiles type, you will able to pick any type of media from user device, 
                //There can me more options as well
                //DocumentPicker.types.images: All image types
                //DocumentPicker.types.plainText: Plain text files
                //DocumentPicker.types.audio: All audio types
                //DocumentPicker.types.pdf: PDF documents
                //DocumentPicker.types.zip: Zip files
                //DocumentPicker.types.csv: Csv files
                //DocumentPicker.types.doc: doc files
                //DocumentPicker.types.docx: docx filesFileUpload
                //DocumentPicker.types.ppt: ppt files
                //DocumentPicker.types.pptx: pptx files
                //DocumentPicker.types.xls: xls files
                //DocumentPicker.types.xlsx: xlsx files
                //For selecting more more than one options use the 
                //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            let docResData = { "uri": res[0].uri, "type": res[0].type, "name": res[0].name, "size": res[0].size }
            resolved(docResData);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                resolved(err);
            }
        }
    });
}

export function uploadImageOnly() {
    return new Promise(async function (resolved, reject) {
        try {
            const res = await DocumentPicker.pick({
                //by using allFiles type, you will able to pick any type of media from user device, 
                //There can me more options as well
                //DocumentPicker.types.images: All image types
                //DocumentPicker.types.plainText: Plain text files
                //DocumentPicker.types.audio: All audio types
                //DocumentPicker.types.pdf: PDF documents
                //DocumentPicker.types.zip: Zip files
                //DocumentPicker.types.csv: Csv files
                //DocumentPicker.types.doc: doc files
                //DocumentPicker.types.docx: docx filesFileUpload
                //DocumentPicker.types.ppt: ppt files
                //DocumentPicker.types.pptx: pptx files
                //DocumentPicker.types.xls: xls files
                //DocumentPicker.types.xlsx: xlsx files
                //For selecting more more than one options use the 
                //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
                type: [DocumentPicker.types.images],
            });
            let docResData = { "uri": res[0].uri, "type": res[0].type, "name": res[0].name, "size": res[0].size }
            resolved(docResData);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                resolved(err);
            }
        }
    });
}
