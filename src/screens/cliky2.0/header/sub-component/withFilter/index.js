
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
} from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { StorageDataModification } from "../../../../../services/common-view-function";
import styles from "./style";
import SvgComponent from "../../../../../assets/svg";
import { VisitFilterModal } from "../../../../../pageShared";
import { getIconName, hideIcon, visibleActionItems } from "./function";

class WithFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "",
            isVisibleModal: false,
            isSuccessAttendance: false,
            pageLoader: false,
            attendanceLoader: true,
            attendanceSuccessLoader: false,
            isAttendancePermission: true,

            attendanceDropDownArr: [],
            attendanceDropDownObj: {},
            showDropDown: false,
            logoutModal: false,
            logOutLoader: false,

            isVisibleRouteFilterModal: false
        }
    }

    componentDidMount() {
        this._load();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    _load = async () => {
    }

    // for network errror
    _onNetworkError = async () => {
        let headerData = await StorageDataModification.headerData({}, "get")
        if (headerData !== null || headerData !== undefined) {
            this.setState({ pageLoader: true });
            this.props.stateUserInformation(headerData);
            this.setState({ pageLoader: false });
        }
    }

    _onLogoutModal = () => {
        this.setState({
            logoutModal: !this.state.logoutModal
        })
    }

    routefilterModal = (type) => {
        this.state.isVisibleRouteFilterModal = type;
        this.setState(this.state);
    }

    onApplyFilter = (data) => {
        this.props.onApplyFilter(data)
        this.routefilterModal(false)
    }

    onResetData = () => {
        this.props.onResetFilter()
    }

    onDownload = () => {
        this.props.onDownloadData()
    }

    onShared = () => {
        this.props.onShare()
    }

    onSearch = () => {
        this.props.onSearchData()
    }

    modalSec = () => {
        return (
            <>
                <VisitFilterModal
                    isVisible={this.state.isVisibleRouteFilterModal}
                    onCloseModal={() => this.routefilterModal(false)}
                    onFilter={(data) => this.onApplyFilter(data)}
                    onDataReset={() => this.onResetData()}
                    props={this.props}
                />
            </>
        )
    }


    render() {
        let actionItem = visibleActionItems(this.props);
        return (
            <View style={styles.headerContainer}>
                <View style={styles.gamificationMainView}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.goBack()}>
                        <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    {hideIcon(this.props) ? null :
                        <View style={styles.drawerIconSection}>
                            <SvgComponent svgName={getIconName(this.props)} strokeColor={"#ffffff"} height={16} width={16} />
                        </View>
                    }
                    {/* {actionItem.iconVisible ?
                        this.props.route.name == "VisitHistory" ?
                            null
                            :
                            <View style={styles.drawerIconSection}>
                                <SvgComponent svgName={getIconName(this.props)} strokeColor={"#ffffff"} height={16} width={16} />
                            </View>
                        :
                        null
                    } */}
                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM }}>{this.props.headerText}</Text>
                    </View>
                    {actionItem.shareVisible ?
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => this.onShared()}>
                            <SvgComponent svgName={"share"} strokeColor={"#1F2B4D"} height={28} width={28}/>
                            {/* <Image source={ImageName.REAL_WHATSAPP_ICON} style={{ height: 36, width: 36, resizeMode: "contain" }} /> */}
                        </TouchableOpacity> : null
                    }
                    {actionItem.searchVisible ?
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.onSearch()}>
                            <SvgComponent svgName={"search"} strokeColor={"#1F2B4D"} />
                        </TouchableOpacity> : null
                    }
                    {actionItem.filterVisible ?
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => this.routefilterModal(true)}>
                            <SvgComponent svgName={"filter"} strokeColor={"#1F2B4D"} />
                        </TouchableOpacity> : null
                    }
                    {actionItem.downloadVisible ?
                        <TouchableOpacity onPress={() => this.onDownload()}>
                            <SvgComponent svgName={"download"} strokeColor={"#1F2B4D"} />
                        </TouchableOpacity> : null
                    }

                </View>
                {this.modalSec()}
            </View>
        )
    }
}

export default WithFilter;