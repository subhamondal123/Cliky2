import VersionCheck from 'react-native-version-check';


// get device app id
export function getCurrentAppVersion() {
    let appVersion = VersionCheck.getCurrentVersion();
    return (appVersion);
}


// get device package name
export function getAppPackageName() {
    let packageName = VersionCheck.getPackageName();
    return (packageName);
}


// get device build number
export function getCurrentAppBuildNumber() {
    let buildNumber = VersionCheck.getCurrentBuildNumber();
    return (buildNumber);
}