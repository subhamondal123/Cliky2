
import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../enums";
import { StorageDataModification } from "../../../../../services/common-view-function";
import styles from "./style";
import SvgComponent from "../../../../../assets/svg";

class BackWithPageName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "",
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

    // for header name set
    setHeaderText = () => {
        let headerText = "";
        if (this.props.route) {
            if (this.props.route.name == "PjpVisitTab") {
                headerText = "PJP & Visit Detail";
            }
        }
        return headerText;
    }

    render() {
        let headerText = this.setHeaderText();
        return (
            <View style={styles.headerContainer}>
                <View style={styles.gamificationMainView}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.goBack()}>
                        <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <View style={styles.drawerIconSection}>
                        <SvgComponent svgName={"location"} strokeColor={"#1F2B4D"} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM }}>{headerText}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9}>
                        <SvgComponent svgName={"search"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <SvgComponent svgName={"filter"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <SvgComponent svgName={"download"} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default BackWithPageName;