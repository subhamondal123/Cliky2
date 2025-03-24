import Toast from 'react-native-simple-toast';

export function ShortTopToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.SHORT, Toast.TOP));
    } catch (e) {
        console.log(e);
    }
}


export function LongTopToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.LONG, Toast.TOP));
    } catch (e) {
        console.log(e);
    }
}


export function ShortCenterToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.SHORT, Toast.CENTER));
    } catch (e) {
        console.log(e);
    }
}


export function LongCenterToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.LONG, Toast.CENTER));
    } catch (e) {
        console.log(e);
    }
}



export function ShortBottomToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.SHORT, Toast.BOTTOM));
    } catch (e) {
        console.log(e);
    }
}

export function LongBottomToaster(data) {
    try {
        if (data === undefined || data === null || data === "") {
            data = "";
        }
        return (Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM));
    } catch (e) {
        console.log(e);
    }
}