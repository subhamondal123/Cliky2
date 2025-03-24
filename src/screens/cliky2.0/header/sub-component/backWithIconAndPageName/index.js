
import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../enums";
import styles from "./style";
import { getIconName, getModData, hideIcon, modifyAttendanceData } from "./function";
import SvgComponent from "../../../../../assets/svg";

class BackWithIconAndPageName extends React.Component {
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


    render() {

        // let headerText = this.setHeaderText();
        return (
            <View style={styles.headerContainer}>
                <View style={styles.gamificationMainView}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.goBack()}>
                        <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    {hideIcon(this.props) ? null :
                        <View style={styles.drawerIconSection}>
                            <SvgComponent svgName={getIconName(this.props)} strokeColor={"#fff"} height={16} width={16} />
                        </View>
                    }

                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM }}>{this.props.headerText}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default BackWithIconAndPageName;