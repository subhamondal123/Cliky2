import React from "react";
import { PropTypes } from 'prop-types';
import Notification from "./Notification";
import Home from "./Home";
import Calender from "./Calender";
import Menu from "./Menu";
import FooterCurve from "./FooterCurve";
import Delete from "./Delete";
import Sun from "./Sun";
import Upload from "./Upload";
import DownArrow from "./DownArrow";
import Cross from "./Cross";
import AppLogo from "./AppLogo";
import CameraInsidePhone from "./CameraInsidePhone";
import Van from "./Van";
import Pencil from "./Pencil";
import Leave from "./Leave";
import Suggested from "./suggested";
import Love from "./Love";
import StopWatch from "./Stopwatch";
import Location_with_route from "./Location_with_route";
import RightArrow from "./RightArrow";
import ChartProgress from "./ChartProgress";
import FevouritWithTick from "./FevouritWithTick";
import LocationAdd from "./LocationAdd";
import Odomiter from "./Odomiter";
import Office from "./Office";
import ProfileWithBorder from "./ProfileWithBorder";
import TwoCircle from "./TwoCircle";
import LocationWithCircle from "./LocationWithCircle";
import DoubleUser from "./DoubleUser";


import Phone from "./Phone";
import BarGraphWithStar from "./BarGraphWithStar";
import PerformanceGraph from "./PerformanceGraph";
import Grievance from "./Grievance";
import Help from "./Help";
import Designation from "./Designation";
import Mail from "./Mail";
import ContactId from "./ContactId";
import Location from "./Location";
import User from "./User";
import Hording from "./Hording";
import ThreeDBoxWithTick from "./3dBoxWithTick";
import TelePhone from "./TelePhone";
import Tick from "./Tick";
import AchiveBook from "./AchiveBook";
import Refresh from "./Refresh";

import LocationTick from "./LocationTick";
import Expenses from "./Expenses";
import FlashArrow from "./FlashArrow";
import Customer from "./Customer";

import Clock from "./Clock";
import Shop from "./shop";
import LocationSlash from "./LocationSlash";

import Filter from "./Filter";
import Download from "./Download";
import Search from "./Search";
import Back from "./Back";

import Camera_with_pencil from "./camera_with_pencil";
import ThreeDCubeScan from "./3dCubeScan";
import LocationWithBGColor from "./LocationWithBGColor";
import Scanning from './Scanning'
import SunFog from "./SunFog";
import Moon from "./Moon";
import UpArrow from "./UpArrow";
import LmsFilter from "./lmsFilter";
import NineDot from "./NineDot";
import LmsHome from "./LmsHome";
import FourDot from "./FourDot";
import UserWithPlus from "./UserWithPlus";
import PlusWithCircle from "./PlusWithCircle";
import AngryFace from "./AngryFace";
import GreenDownArrrow from "./GreenDownArrow";
import RedUpArrow from "./RedUpArrow";
import BlueLock from "./BlueLock";
import Unlock from "./GreenUnlock";
import LmsCalender from "./LmsCalender";
import LmsUser from "./lmsUser";
import ThreeDBox from "./3dBox";
import PencilWithUnderline from "./PencilWithUnderline";
import SendDown from "./sendDown";
import SendUp from "./sendUp";
import Camera from "./Camera";
import ThreeDBoxRotate from "./3dBoxRotate";
import LmsUpload from "./LmsUpload";
import UserWithPencil from "./UserWithPencil";
import ThreeDBoxWithTwoCircleRotate from "./3DBoxWithTwoCircleRotate";
import InvoiceWithTick from "./InvoiceWithTick";
import Share from "./share";
import ManagerCalender from "./ManagerCalender";
import KalikaAppLogo from "./KalikaAppLogo";


function SvgComponent({
    strokeColor,
    svgName,
    height,
    width,
    children,
    isColorChange
}) {
    // if (!isColorChange) {
    //     strokeColor = undefined;
    // }
    var svgCom = null;
    switch (svgName) {
        case "home":
            svgCom = <Home strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "notification":
            svgCom = <Notification strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "calender":
            svgCom = <Calender strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "menu":
            svgCom = <Menu strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "footerCurve":
            svgCom = <FooterCurve strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "delete":
            svgCom = <Delete strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "upload":
            svgCom = <Upload strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "downArrow":
            svgCom = <DownArrow strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "appLogo":
            svgCom = <AppLogo strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "cross":
            svgCom = <Cross strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "cameraInsidePhone":
            svgCom = <CameraInsidePhone strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "pencil":
            svgCom = <Pencil strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "van":
            svgCom = <Van strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "leave":
            svgCom = <Leave strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "suggested":
            svgCom = <Suggested strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "love":
            svgCom = <Love strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "stopwatch":
            svgCom = <StopWatch strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "location_with_route":
            svgCom = <Location_with_route strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "rightArrow":
            svgCom = <RightArrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "sun":
            svgCom = <Sun strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "chartProgress":
            svgCom = <ChartProgress strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "fevouritWithTick":
            svgCom = <FevouritWithTick strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "locationAdd":
            svgCom = <LocationAdd strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "odomiter":
            svgCom = <Odomiter strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "office":
            svgCom = <Office strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "profileWithBorder":
            svgCom = <ProfileWithBorder strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "twoCircle":
            svgCom = <TwoCircle strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "locationWithCircle":
            svgCom = <LocationWithCircle strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "doubleUser":
            svgCom = <DoubleUser strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "grievance":
            svgCom = <Grievance strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "help":
            svgCom = <Help strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "designation":
            svgCom = <Designation strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "mail":
            svgCom = <Mail strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "contactId":
            svgCom = <ContactId strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "location":
            svgCom = <Location strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "user":
            svgCom = <User strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "hording":
            svgCom = <Hording strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "3dBoxWithTick":
            svgCom = <ThreeDBoxWithTick strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "tick":
            svgCom = <Tick strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "achiveBook":
            svgCom = <AchiveBook strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "telephone":
            svgCom = <TelePhone strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "refresh":
            svgCom = <Refresh strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "performanceGraph":
            svgCom = <PerformanceGraph strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "phone":
            svgCom = <Phone strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "barGraphWithStar":
            svgCom = <BarGraphWithStar strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "performanceGraph":
            svgCom = <PerformanceGraph strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "locationTick":
            svgCom = <LocationTick strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "expenses":
            svgCom = <Expenses strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "flashArrow":
            svgCom = <FlashArrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "customer":
            svgCom = <Customer strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "clock":
            svgCom = <Clock strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "shop":
            svgCom = <Shop strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "locationSlash":
            svgCom = <LocationSlash strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "filter":
            svgCom = <Filter strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "download":
            svgCom = <Download strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "search":
            svgCom = <Search strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "back":
            svgCom = <Back strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "camera_with_pencil":
            svgCom = <Camera_with_pencil strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "threeDCubeScan":
            svgCom = <ThreeDCubeScan strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "scanning":
            svgCom = <Scanning strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "locationWithBGColor":
            svgCom = <LocationWithBGColor strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "sunFog":
            svgCom = <SunFog strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "moon":
            svgCom = <Moon strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "upArrow":
            svgCom = <UpArrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "nineDot":
            svgCom = <NineDot strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsFilter":
            svgCom = <LmsFilter strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsHome":
            svgCom = <LmsHome strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "fourDot":
            svgCom = <FourDot strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "userWithPlus":
            svgCom = <UserWithPlus strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "plusWithCircle":
            svgCom = <PlusWithCircle strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "angryFace":
            svgCom = <AngryFace strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "greenDownArrow":
            svgCom = <GreenDownArrrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "redUpArrow":
            svgCom = <RedUpArrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "blueLock":
            svgCom = <BlueLock strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "unlock":
            svgCom = <Unlock strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsCalender":
            svgCom = <LmsCalender strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsUser":
            svgCom = <LmsUser strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "threeDBox":
            svgCom = <ThreeDBox strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "pencilWithUnderline":
            svgCom = <PencilWithUnderline strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "sendDown":
            svgCom = <SendDown strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "sendUp":
            svgCom = <SendUp strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "camera":
            svgCom = <Camera strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "threeDBoxRotate":
            svgCom = <ThreeDBoxRotate strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsUpload":
            svgCom = <LmsUpload strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "userWithPencil":
            svgCom = <UserWithPencil strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "threeDBoxWithTwoCircleRotate":
            svgCom = <ThreeDBoxWithTwoCircleRotate strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "invoiceWithTick":
            svgCom = <InvoiceWithTick strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "share":
            svgCom = <Share strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "managerCalender":
            svgCom = <ManagerCalender strokeColor={strokeColor} height={height} width={width} />;
            break;

        case "kalikaAppLogo":
            svgCom = <KalikaAppLogo strokeColor={strokeColor} height={height} width={width} />;
            break;
        default:
            svgCom = null;
    }
    return svgCom;
}


SvgComponent.defaultProps = {
    strokeColor: "#FFFFFF",
    svgName: "home",
    height: 25,
    width: 25,
    children: null,
    isColorChange: false
};

SvgComponent.propTypes = {
    strokeColor: PropTypes.string,
    svgName: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node,
    isColorChange: PropTypes.bool
};


export default SvgComponent;