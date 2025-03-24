import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, TextInputBox } from "../../../../shared";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { DynamicCustomerProfile } from "../../../../pageShared";

let data = [

    {
        id: 1,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 2,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 3,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },

    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
    {
        id: 4,
        image: ImageName.USER_IMG,
        label: "Super Trader"

    },
]



class SchemeTransferPoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: data,


        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = () => {
        this._apiCallRes();
    }

    // for network error check 
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
        this.props.stateCheckForNetwork("LocationList");
    }

    // here list api call
    _apiCallRes = async () => {

    }

    activePointSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginVertical: 5, flexDirection: "row" }}>
                    <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                        <SvgComponent svgName={"nineDot"} strokeColor={"#F13748"} height={11} width={11} />
                        <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                        <Text style={{ color: "#F13748", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                        <SvgComponent svgName={"locationWithBGColor"} strokeColor={"#F13748"} height={11} width={11} />
                        <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Kolkata </Text>
                        <Text style={{ color: "#F13748", fontSize: 11, fontFamily: FontFamily.FONTS.INTER.BOLD, marginRight: 5 }}>Zone 2</Text>
                        <SvgComponent svgName={"downArrow"} strokeColor={"#F13748"} height={11} width={11} />
                    </View>
                </View>
            </React.Fragment>

        )
    }

    searchSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Customer Name or Number"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={42}
                        borderRadius={22}
                    // value={this.state.searchText}
                    // onChangeText={(value) => onSearch(value)}
                    // onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <View style={{ marginHorizontal: 10 }}>
                    {this.activePointSec()}
                    {this.searchSec()}
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', marginTop: 25, flexWrap: 'wrap', marginLeft: '2%' }}>
                            {this.state.userData.map((item, key) => (
                                <View style={{ marginTop: 12 }} key={key}>
                                    <DynamicCustomerProfile data={item} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={{ marginHorizontal: 125, marginTop: 30 }}>
                        <BigTextButton
                            text={"Check All"}
                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            fontSize={FontSize.SM}
                            borderRadius={30}
                            height={40}
                            width={30}
                            start={{ x: 1, y: 0.3 }}
                            end={{ x: 0.5, y: 1 }}
                        // onPress={() => this._onNext()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userSelectedBeatRouteData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SchemeTransferPoints);