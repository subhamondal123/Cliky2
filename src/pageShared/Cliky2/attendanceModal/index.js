
import React, { Component, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Image, View, Text, ActivityIndicator } from "react-native";
import { Color, Dimension, ImageName } from "../../../enums";
import styles from "./style";
import { BottomModal, Loader, SwipeButton, } from "../../../shared";
import { DateConvert, GetUserData, OfflineFunction, StorageDataModification, Toaster } from '../../../services/common-view-function';
import { App_uri } from '../../../services/config';
import SvgComponent from '../../../assets/svg';
import { UserAccessPermission } from '../../../services/userPermissions';


function AttendanceModal({ props, onRefresh, onCloseModal, isVisible, isLoading, screen }) {
    const [loader, setLoader] = useState(true);
    const [attendanceLoader, setAttendanceLoader] = useState(false);

    const [permissionData, setPermissionData] = useState({ attendance: {} });
    const [userImg, setUserImg] = useState(ImageName.PROFILE_GRAY);
    const [profileCheck, setProfileCheck] = useState(false);
    const [name, setName] = useState("");

    // call this function initial
    useEffect(() => {
        load();
    }, []);

    // for load the function
    const load = async () => {
        onGetUserInfo();
        permissionData.attendance = await UserAccessPermission.ATTENDANCE.attendancePermission(props);
        setPermissionData(permissionData);
        await setLoaderData(false);
    }

    // for get the user info
    const onGetUserInfo = () => {
        let profileCheckTemp = false;
        let userImgTemp = ImageName.PROFILE_GRAY;
        let nameTemp = "";
        if (props.Sales360Redux.userInfo !== null || props.Sales360Redux.userInfo !== undefined) {
            if (Object.keys(props.Sales360Redux.userInfo).length > 0) {
                if (props.Sales360Redux.userInfo.details == undefined || props.Sales360Redux.userInfo.details == null || (Object.keys(props.Sales360Redux.userInfo.details).length) == 0) {
                } else {
                    if (props.Sales360Redux.userInfo.details.profileImgUrl == undefined || props.Sales360Redux.userInfo.details.profileImgUrl == null || props.Sales360Redux.userInfo.details.profileImgUrl.length == 0) {
                        nameTemp = props.Sales360Redux.userInfo.details.name
                    } else {
                        userImgTemp = props.Sales360Redux.userInfo.details.profileImgUrl;
                        nameTemp = props.Sales360Redux.userInfo.details.name
                        profileCheckTemp = true;
                    }
                }
            }
        }
        setUserImg(userImgTemp);
        setProfileCheck(profileCheckTemp);
        setName(nameTemp);
    }

    // for set loader
    const setLoaderData = async (type) => {
        setLoader(type);
    }

    // for back button close modal
    const onRequestCloseModal = () => {
        onCloseModal();
    }

    // for back button close modal
    const onBackDropPressModal = () => {
        onCloseModal();
    }

    // for back button close modal
    const onBackButtonPressModal = () => {
        onCloseModal();
    }

    const refresh = () => {
        if (screen == undefined || screen == null) {
            props.onRefresh();
        } else {
            onRefresh()
        }
    }

    const setAttendanceDataLoader = async (type) => {
        setAttendanceLoader(type)
    }

    // for swipe success api call
    const swipeSuccess = async () => {
        await setAttendanceDataLoader(true)
        // console.log("this.props.Sales360Redux.userInfo.isOdometer ", props.Sales360Redux.userInfo.isOdometer)

        let locationData = await GetUserData.getUserLocation();
        let attendanceReduxData = props.Sales360Redux.attendanceData;
        attendanceReduxData.isAttendance = 1;
        attendanceReduxData.inLattitude = locationData.lattitude;
        attendanceReduxData.inLongitude = locationData.longitude;
        attendanceReduxData.inTime = DateConvert.fullDateFormat(new Date());
        await onStoreAttendanceData(attendanceReduxData);
        // OfflineFunction.attendanceSyncData(props);
        await setAttendanceDataLoader(false)

        refresh()
    }

    const swipeLogOut = async () => {
        await setAttendanceDataLoader(true)
        // console.log("this.props.Sales360Redux.userInfo.isOdometer ", props.Sales360Redux.userInfo.isOdometer)
        if (props.Sales360Redux.userInfo.isOdometer == 1) {
            Toaster.ShortCenterToaster("Checkout Odometer first !")
            await setAttendanceDataLoader(false)
            
        } else {
            let locationData = await GetUserData.getUserLocation();
            let attendanceReduxData = props.Sales360Redux.attendanceData;
            attendanceReduxData.isAttendance = 2;
            attendanceReduxData.outLattitude = locationData.lattitude;
            attendanceReduxData.outLongitude = locationData.longitude;
            attendanceReduxData.outTime = DateConvert.fullDateFormat(new Date());
            await onStoreAttendanceData(attendanceReduxData);
            // OfflineFunction.attendanceSyncData(props);
            await setAttendanceDataLoader(false)

            refresh()
        }

    }


    // for store the attandence data
    const onStoreAttendanceData = async (attendanceData) => {
        props.userAttendanceData(attendanceData);
        await StorageDataModification.attendanceData(attendanceData, "store");
        // await refresh();
        onRequestCloseModal();
    }


    let timeData = DateConvert.getAllTimeData(new Date());
    let time = timeData.hour + ":" + timeData.minutes,
        prefix = (timeData.ampm).toLowerCase();
    return (
        <BottomModal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    {loader ?
                        <View style={{ paddingVertical: 30 }}>
                            <Loader type={"normal"} />
                        </View> :
                        <React.Fragment>
                            <View style={styles.centerView}>
                                <View style={styles.redBoder}>
                                    <Image source={{ uri: profileCheck ? App_uri.BASE_URI + userImg : userImg }} style={styles.userImage} />
                                </View>
                                <Text style={styles.hiiText}>Hi,<Text style={styles.nameText}> {name ? name : ""}</Text></Text>
                                <Text style={styles.swapText}>Please Swap <Text style={styles.workLoginText}>work {props.Sales360Redux.attendanceData.isAttendance == 1 ? "logout" : "login"}</Text> button before {props.Sales360Redux.attendanceData.isAttendance == 1 ? "end" : "start"} your work</Text>
                            </View>

                            <View style={styles.marginView}>
                                {attendanceLoader ?
                                    <ActivityIndicator size={"small"} />
                                    :
                                    <>
                                        {props.Sales360Redux.attendanceData.isAttendance == 1 ?
                                            <SwipeButton
                                                title={"Swipe to end your work"}
                                                thumbIcon={ImageName.RED_SWIPE_BUTTON_LOGO}
                                                width={Dimension.width / 1.5}
                                                height={40}
                                                thumbBackgroundColor={"#F13748"}
                                                onSuccessSwipe={() => swipeLogOut()}
                                            />
                                            : props.Sales360Redux.attendanceData.isAttendance == 0 ?
                                                <SwipeButton
                                                    title={"Swipe to start your work"}
                                                    thumbIcon={ImageName.SWIPE_BUTTON_LOGO}
                                                    width={Dimension.width / 1.5}
                                                    height={40}
                                                    onSuccessSwipe={() => swipeSuccess()}
                                                />
                                                :
                                                null
                                        }
                                    </>
                                }
                            </View>
                            <View style={styles.timeView}>
                                <SvgComponent svgName={"clock"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} />
                                <Text style={styles.itsText}>it's <Text style={styles.timeText}>{time}</Text> {prefix}</Text>
                            </View>
                            <View style={{ marginBottom: '20%' }} />
                        </React.Fragment>
                    }
                </View >
            }
        />
    )

}

AttendanceModal.defaultProps = {
    isVisible: false,
    isLoading: false,
    onRefresh: () => { },
    onCloseModal: () => { },
    props: {},
    screen: null
};

AttendanceModal.propTypes = {
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRefresh: PropTypes.func,
    onCloseModal: PropTypes.func,
    props: PropTypes.instanceOf(Object),
    screen: PropTypes.string
};


export default AttendanceModal;