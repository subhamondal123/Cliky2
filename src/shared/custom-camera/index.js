import { PropTypes } from 'prop-types';
import { Modal } from '../';
import styles from './style';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator, PermissionsAndroid, Alert, SafeAreaView, Platform } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { changeFormatData, changeTorchImage } from './function';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

function CustomCamera({
    isHidden,
    isVisible,
    onCloseCamera,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    picData,
    quality,
    cameraType
}) {

    if (isHidden) return null;

    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [isPicImage, setIsPicImage] = useState(false);
    const [imgData, setImgData] = useState({});
    const [torch, setTorch] = useState("off");
    const [isCapture, setIsCapture] = useState(false);
    const [backFront, setBackFront] = useState(cameraType);
    const [loader, setLoader] = useState(true);
    const cameraRef = useRef(null);
    const [isPermitted, setIsPermitted] = useState(false);
    const [sizeTarget, setSizeTarget] = useState(height);
    // const devices = useCameraDevices();
    // var device = devices.back;

    const device = useCameraDevice('back');
    const devicefront = useCameraDevice('front');

    useEffect(() => {
        permition();
    }, []);

    const permition = async () => {
        await getPermitions();
    }

    const onCameraInitialized = useCallback(() => {
        setIsCameraInitialized(true);
    }, []);


    const getPermitions = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera",
                message:
                    "This app would like to view your camera.",
                buttonPositive: "OK"
            }
        );
        setLoader(false);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsPermitted(true);
        } else {
            console.log("Camera permission denied");
        }
    }

    const checkSamsungDevice = () => {
        const androidVersion = DeviceInfo.getSystemVersion();
         // Check if the device is a Samsung device
        return (Platform.OS === 'android' && Platform.constants.Brand === 'samsung') || (Platform.OS === 'android' && androidVersion < 13);
    };

    const changeBackfront = async (type) => {
        setBackFront(type)
    }

    const applySamsungRotationFix = async (image, isMirrored) => {
        // Replace this with your specific logic
        const isSamsungDevice = checkSamsungDevice();
        if (isSamsungDevice && isMirrored) {
            return await ImageResizer.createResizedImage(
                image,
                sizeTarget,
                sizeTarget,
                'JPEG',
                quality,
                90,//Rotate by 90 degrees
                undefined,
                false
            );
        }
        // Return the original image if no fix is needed
        return Promise.resolve({ uri: image });
    };

    // for click in the capture icon
    const onClickImg = useCallback(async () => {
        try {
            if (cameraRef && cameraRef.current) {
                setIsCapture(true);
                let img = await cameraRef.current.takePhoto({
                    enableAutoStabilization: true,
                    skipMetadata: true,
                    photoCodec: 'jpeg',
                    quality: 500,
                    orientation: "portrait",
                });

                img = changeFormatData(img);
                // setIsPicImage(true);
                // setImgData(img);
                // Rotate the image if necessary
                // const rotatedImage = await rotateImage(img.uri);
                const rotatedImage = await applySamsungRotationFix(img.uri, img.isMirrored);

                // Process the rotated image
                if (rotatedImage) {
                    setIsPicImage(true);
                    setImgData(rotatedImage);
                }
            }
        } catch (error) {
            console.log({ error });
        }
    }, [cameraRef])

    // for console the error
    const onError = (error) => {
        console.log(error);
    }
    // for change the flash on and off
    const onChangeTorch = async () => {
        if (torch === "on") {
            setTorch("off");
        } else {
            setTorch("on");
        }
    }
    // for loader change 
    const loaderChange = async (type) => {
        setLoader(type);
    }
    // for change the font and back image
    const onChangeFontBack = async () => {
        await loaderChange(true);
        if (backFront == "front") {
            // device = devices.back;
            await changeBackfront("back")
            // setBackFront("back");
        } else {
            // device = devices.front;
            setTorch("off");
            await changeBackfront("front")
            // setBackFront("front");
        }
        await loaderChange(false);
    }
    // for cancel the image
    const onCancelImage = async () => {
        await loaderChange(true);
        setIsPicImage(false);
        setImgData({});
        setIsCapture(false);
        await loaderChange(false);
    }
    const setCameraInitialState = async () => {
        setTorch("off");
        setIsCapture(false);
    }
    const resize = async () => {
        let rotation = 0;
        // if (backFront == "front" && imgData.orientation !== "landscape-left") {
        //     rotation = 90
        // }
        if (!imgData || !imgData.uri) return;
        try {
            let result = await ImageResizer.createResizedImage(
                imgData.uri,
                sizeTarget,
                sizeTarget,
                'JPEG',
                quality,
                rotation,//Rotate by 90 degrees
                undefined,
                false
            );
            result["type"] = "image/jpeg";
            picData(result);
            onRequestCloseModal();
        } catch (error) {
            Alert.alert('Unable to resize the photo');
        }

    };

    // for select image 
    const onSelectImage = async () => {
        await resize();
    }

    // for request to close the modal
    const onRequestCloseModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onRequestClose(false);

    }

    // for request to close the modal by back Drop
    const onBackDropPressModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onBackdropPress(false);
    }

    // for request to close the modal by back press
    const onBackButtonPressModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onBackButtonPress(false);
    }


    // for get the permition again
    const getPermition = async () => {
        await Linking.openSettings();
    }

    // for image view section
    const viewImgSection = () => {
        return (
            <View style={{ backgroundColor: "#000", flex: 1 }}>
                {
                    Object.keys(imgData).length > 0 ?
                        // <Image source={{ uri: imgData.uri }} style={{ height: height, width: width, resizeMode: backFront == "front" ? 'center' : 'contain', transform: [{ rotate: backFront == "front" && imgData.orientation !== "landscape-left" ? '90deg' : '0deg' }] }} /> :
                        <Image source={{ uri: imgData.uri }} style={{ height: height, width: width, resizeMode: backFront == "front" ? 'center' : 'contain', transform: [{ rotate: '0deg' }] }} /> :

                        null
                }
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onSelectImage()}>
                            <Image source={require('./assets/tick-circle_white.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onCancelImage()}>
                            <Image source={require('./assets/white_cross.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // for view the permision
    const viewPermision = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 20, marginVertical: 20, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 20, color: "#999999", textAlign: 'center' }}>You have declined the Photo Permission</Text>
                <Text style={{ fontSize: 14, color: "#000000", textAlign: 'center', marginTop: 20 }}>For capturing the image you have to enable the Permission</Text>
                <Text style={{ fontSize: 14, color: "blue", textAlign: 'center', marginTop: 20 }} onPress={() => getPermition()}>Get Permission</Text>
            </View>
        )
    }

    // for view the back camera
    const viewBackCamera = () => {
        return (

            <Camera
                style={[{ flex: 1 }, StyleSheet.absoluteFill]}
                ref={cameraRef}
                device={device}
                isActive={true}
                enableShutterSound={false}
                onInitialized={onCameraInitialized} // <-- wait camera initialized
                onError={onError}
                enableZoomGesture={false}
                photo={true}
                torch={isCapture ? "off" : torch}
            />

            // <Camera
            //     ref={cameraRef}
            //     style={{ flex: 1 }}
            //     device={devices.back}
            //     isActive={true}
            //     onInitialized={onCameraInitialized} // <-- wait camera initialized
            //     onError={onError}
            //     enableZoomGesture={false}
            //     photo={true}
            //     torch={isCapture ? "off" : torch}
            //     orientation="portrait"
            // />
        )
    }


    // for view the font camera
    const viewFontCamera = () => {
        return (
            <Camera
                style={[{ flex: 1 }, StyleSheet.absoluteFill]}
                device={devicefront}
                isActive={true}
                enableShutterSound={false}
                ref={cameraRef}
                onInitialized={onCameraInitialized} // <-- wait camera initialized
                onError={onError}
                enableZoomGesture={false}
                photo={true}
                torch={"off"}
            />
            // <Camera
            //     ref={cameraRef}
            //     style={{ flex: 1 }}
            //     device={devices.front}
            //     isActive={true}
            //     onInitialized={onCameraInitialized} // <-- wait camera initialized
            //     onError={onError}
            //     enableZoomGesture={false}
            //     photo={true}
            //     torch={"off"}
            //     orientation="portrait"
            // />
        )
    }


    // for view the camera
    const viewCameraSection = () => {
        if (device != null && isPermitted) {
            return (
                <>
                    {backFront == "back" ?
                        <React.Fragment>
                            {viewBackCamera()}
                        </React.Fragment> :
                        <React.Fragment>
                            {viewFontCamera()}
                        </React.Fragment>
                    }
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} onPress={() => onRequestCloseModal()}>
                                <Image source={require('./assets/white_cross.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        {cameraType == "front" ?
                            null :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onChangeFontBack()}>
                                    <Image source={require('./assets/rotate_camera.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onClickImg()}>
                                <Image source={require('./assets/pic_img.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        {backFront == "back" ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onChangeTorch()}>
                                    <Image source={changeTorchImage(torch)} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View> :
                            null
                        }
                    </View>
                </>
            )
        } else {
            return null;
        }
    }


    return (
        <Modal
            isVisible={isVisible}
            padding={0}
            transparent={false}
            additionalStyles={{ height: height, width: width, }}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.container}>
                    {loader ?
                        <ActivityIndicator size={"large"} /> :
                        <>
                            {isPicImage ?
                                <>
                                    {viewImgSection()}
                                </> :
                                <>
                                    {isPermitted ?
                                        <>
                                            {viewCameraSection()}
                                        </> :
                                        <>
                                            {viewPermision()}
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </View>
            }
        />
    );
};


CustomCamera.defaultProps = {
    modalPadding: 0,
    isHidden: false,
    isVisible: false,
    onCloseCamera: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    picData: () => { },
    quality: 100,   // it will be 0 - 100
    cameraType: "back" // camera type will be 'back' or 'front'
};

CustomCamera.propTypes = {
    modalPadding: PropTypes.number,
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseCamera: PropTypes.func,
    picData: PropTypes.func,
    quality: PropTypes.number,
    cameraType: PropTypes.string
};


export default CustomCamera;