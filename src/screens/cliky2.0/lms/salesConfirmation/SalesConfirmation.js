import React from "react";
import { SafeAreaView, Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, FontFamily, FontSize, ImageName } from "../../../../enums";
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
]



class SalesConfirmation extends React.Component {
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
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"locationWithBGColor"} strokeColor={"#F13748"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Kolkata </Text>
                    <Text style={{ color: "#F13748", fontSize: 11, fontFamily: FontFamily.FONTS.INTER.BOLD, marginRight: 5 }}>Zone 2</Text>
                    <View style={{ flex: 0.7 }} />
                    <SvgComponent svgName={"downArrow"} strokeColor={"#F13748"} height={11} width={11} />
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

    onDetails = () => {
        this.props.navigation.navigate("ConfirmSalesListDetails")
    }

    onSelect = () => {
        this.props.navigation.navigate("ConfirmSalesListDetails")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 10 }}>
                        {this.activePointSec()}
                        {this.searchSec()}
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginTop: 25, flexWrap: 'wrap', marginLeft: '2%' }}>
                                {this.state.userData.map((item, key) => (
                                    <View style={{ marginTop: 12 }} key={key}>
                                        <DynamicCustomerProfile data={item} onSelectTab={() => this.onSelect()} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <View style={{ marginHorizontal: 55, marginTop: 20 }}>
                            <BigTextButton
                                text={"Explore All 800 Cusomer"}
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
                        <View style={{ marginTop: 55, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Recent Sales by Customer</Text>
                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Generate Confirmation Request</Text>
                            </View>
                            <View style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 19, height: 35, borderRadius: 16 }}>
                                <Text style={{ color: "#fff", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>800</Text>
                            </View>
                            <View style={{ width: 8 }} />
                            <SvgComponent svgName={"lmsFilter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={25} width={25} />
                        </View>
                        <TouchableOpacity style={{ borderColor: Color.COLOR.RED.AMARANTH, borderRadius: 12, borderWidth: 1, borderStyle: "dashed", marginTop: 18 }} onPress={() => this.onDetails()}>
                            <View style={{ marginVertical: 10, marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={ImageName.USER_IMG} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 100 }} />
                                <View style={{ marginLeft: '3%', flex: 1 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Super trade</Text>
                                    <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: -4 }}>Kolkata<Text>, Zone 2</Text></Text>
                                    <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Initiate  <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%' }}>sales new Sales</Text></Text>
                                </View>
                                <SvgComponent svgName={"threeDBox"} strokeColor={"#F13748"} height={35} width={35} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderColor: Color.COLOR.RED.AMARANTH, borderRadius: 12, borderWidth: 1, borderStyle: "dashed", marginTop: 18 }}>
                            <View style={{ marginVertical: 10, marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={ImageName.USER_IMG} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 100 }} />
                                <View style={{ marginLeft: '3%', flex: 1 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Super trade</Text>
                                    <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: -4 }}>Kolkata<Text>, Zone 2</Text></Text>
                                    <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Initiate  <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%' }}>sales new Sales</Text></Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ top: -8 }}>
                                        <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 22, width: 22, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>3</Text>
                                        </View>
                                    </View>
                                    <SvgComponent svgName={"threeDBox"} strokeColor={"#F13748"} height={30} width={30} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 55, marginTop: 20 }}>
                            <BigTextButton
                                text={"Explore All 800 Sales"}
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
                        <View style={{ marginBottom: 80 }} />
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesConfirmation);