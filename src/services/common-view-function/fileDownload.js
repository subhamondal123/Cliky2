import { Permissions, Toaster } from ".";
import RNFetchBlob from 'rn-fetch-blob';
import {
    Platform,
    PermissionsAndroid,
    Alert
} from 'react-native';
import { DeviceInfo } from "../config";

export function downloadDocument(documentPath) {
    return new Promise(async function (resolved, reject) {
        try {

            // Function to check the platform
            // If Platform is Android then check for permissions.

            if (Platform.OS === 'ios') {
                downloadFile(documentPath);
            } else {
                try {
                    const granted = await Permissions.GetAllPermissionsForAccess();
                    if (granted) {
                        // Start downloading
                        downloadFile(documentPath);
                        resolved(true);
                    } else {
                        // If permission denied then show alert
                        Alert.alert('Error', 'Storage Permission Not Granted');
                        reject(false)
                    }
                } catch (err) {
                    // To handle permission related exception
                    console.log("++++" + err);
                    reject(err)
                }
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

const downloadFile = (uri) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = uri;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
                RootDir +
                '/file_' +
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                file_ext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
        },
    };
    config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
            // Alert after successful downloading
            Toaster.ShortBottomToaster('File Downloaded Successfully.');
        });
};

const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
        /[^.]+$/.exec(fileUrl) : undefined;
};