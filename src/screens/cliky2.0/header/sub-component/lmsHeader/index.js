
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { StorageDataModification } from "../../../../../services/common-view-function";
import styles from "./style";
import SvgComponent from "../../../../../assets/svg";
import { VisitFilterModal } from "../../../../../pageShared";

class LmsHeader extends React.Component {
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

    routefilterModal = () => {
        this.setState({ isVisibleRouteFilterModal: !this.state.isVisibleRouteFilterModal })

    }

    onApplyFilter = (data) => {
        this.props.onApplyFilter(data)
        this.routefilterModal()
    }

    onResetData = () => {
        this.props.onResetFilter()
    }

    onNotification = () => {
        this.props.onNotificationData()
    }

    modalSec = () => {
        return (
            <>
                <VisitFilterModal
                    isVisible={this.state.isVisibleRouteFilterModal}
                    onCloseModal={() => this.routefilterModal()}
                    onFilter={(data) => this.onApplyFilter(data)}
                    onDataReset={() => this.onResetData()}
                    props={this.props}
                />
            </>
        )
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.gamificationMainView}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.goBack()}>
                        <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM }}>{this.props.headerText}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.onNotification()} style={{borderRadius:100,borderWidth:0.5,borderColor:"#D1D1D1",padding:5}}>
                        <SvgComponent svgName={"notification"} strokeColor={"#1F2B4D"} height={24} width={24}/>
                    </TouchableOpacity>

                </View>
                {this.modalSec()}
            </View>
        )
    }
}

export default LmsHeader;