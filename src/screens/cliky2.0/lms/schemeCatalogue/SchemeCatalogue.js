import React from "react";
import { SafeAreaView, Image, View, Text, ScrollView, TextInput } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton } from "../../../../shared";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { CatalogueItem } from "../../../../pageShared";

let data = [

    {
        id: 1,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 2,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 3,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 3,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 3,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 3,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },

]

let trader = [

    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    }
]


class SchemeCatalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabData: data,
            superTrader: trader

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
        const onView = () => {
            this.props.navigation.navigate("Catalogue")
        }
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
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 0.7, marginTop: 6 }}>Catalogue</Text>
                    <View style={{ flex: 0.3 }}>
                        <BigTextButton
                            text={"View All"}
                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            fontSize={FontSize.SM}
                            borderRadius={30}
                            height={40}
                            width={30}
                            start={{ x: 1, y: 0.3 }}
                            end={{ x: 0.5, y: 1 }}
                            onPress={() => onView()}
                        />
                    </View>

                </View>
            </React.Fragment>

        )
    }

    listSec = () => {
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 18, flexDirection: "row", }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row" }} >
                        {this.state.tabData.map((item, key) => (
                            <View style={{ marginHorizontal: 5, marginVertical: 5 }} key={key}>
                                <CatalogueItem
                                    data={item}
                                    // onPress={(value) => onSelectItem(value)}
                                    width={Dimension.width / 3 - 20}
                                    backgroundColor={"#D1D1D1"}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

        )
    }

    transPointSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <View style={{ flex: 0.7 }}>
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Transfer Points</Text>
                    <Text style={{ color: '#5F5F5F', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>You can transfer your points to any of your subordinate</Text>
                </View>
                <View style={{ flex: 0.3 }}>
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
        )
    }

    superTraderSec = () => {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    {this.state.superTrader.map((item, key) => (
                        <View style={{ alignItems: 'center', marginHorizontal: 5 }} key={key}>
                            <Image source={ImageName.USER_IMG} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 100, borderWidth: 0.3, borderColor: "#D1D1D1" }} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8 }}>Super Trader</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ScrollView>
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        {this.activePointSec()}
                        {this.listSec()}
                        {this.transPointSec()}
                        {this.superTraderSec()}
                        <View style={{ backgroundColor: '#F0F4F7', marginHorizontal: 5, borderRadius: 8, marginTop: 15 }}>
                            <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                                <Image source={ImageName.CREDIT_ADJUSTMENT} style={{ height: 220, width: 350, resizeMode: 'contain' }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, flex: 1 }}>Credit Adjustment</Text>
                                    <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"-₹" + " " + "20002020"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <Text style={{ color: '#5F5F5F', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, flex: 1 }}>You would get additional points value on credit adjustment</Text>
                                    <View style={{ backgroundColor: '#2D4454', paddingHorizontal: 8, paddingVertical: 8, alignItems: 'center', flexDirection: 'row', borderRadius: 8 }}>
                                        <Image source={ImageName.COINS_YELLOW} style={{ height: 18, width: 22, resizeMode: 'contain', top: -2 }} />
                                        <View style={{ width: 8 }} />
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"=" + " " + "₹" + " " + "20"}</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: '#fff', padding: 8, borderRadius: 8, marginTop: 15 }}>
                                    <View style={{ marginHorizontal: 4, flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                                        <View style={{}}>
                                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Active Points</Text>
                                            <Text style={{ color: "#156A94", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>12000</Text>
                                        </View>
                                        <View style={{ width: 10 }} />
                                        <View style={{ flex: 0.7 }}>
                                            <View style={{ width: "85%", justifyContent: "center", alignItems: "center", height: 40, borderWidth: 0.8, borderColor: "#000", borderRadius: 20 }}>
                                                <TextInput
                                                    placeholder={"Points"}
                                                    placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                    // value={item.inputRate.toString()}
                                                    // onChangeText={(value) => this._onChangeRate(value, item, key)}
                                                    keyboardType="number-pad"
                                                    style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                                    maxLength={8}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                            <Text style={{ color: '#5F5F5F', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Value</Text>
                                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"₹" + " " + "20000"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Adjusted Amount</Text>
                                        <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8 }}>{"₹" + " " + "2000000"}   <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{"-" + " " + "₹" + " " + "2000000"}</Text></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingVertical: 10 }}>
                                <View style={{ marginVertical: 6, flexDirection: 'row', marginHorizontal: 16, alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 0.7 }}>{"₹" + " " + "2000000"}</Text>
                                    <View style={{ flex: 0.3 }}>
                                        <BigTextButton
                                            text={"Process"}
                                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                            fontSize={FontSize.SM}
                                            borderRadius={30}
                                            start={{ x: 1, y: 0.3 }}
                                            end={{ x: 0.5, y: 1 }}
                                        // onPress={() => this._onNext()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 50 }} />
                    </View>
                </ScrollView>
            </SafeAreaView >
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

export default connect(mapStateToProps, mapDispatchToProps)(SchemeCatalogue);