import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, DropdownInputBox, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { ConfirmsalesSuccessfulModal, DynamicCustomerProfile, GiftClaimModal, ProfileSec } from "../../../../pageShared";
import { ScrollView } from "react-native";



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


]



class InfluencerNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: data,
            superTraderist: [],
            selectedItem: {},

            sendSuccessfulModal: false


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
        this.setState({
            superTraderist: data
        })
    }

    profileSec = () => {
        return (
            <ProfileSec />
        )
    }

    searchSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, marginHorizontal: 10, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search by Name or Number"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={42}
                        borderRadius={22}
                    // additionalBoxStyle={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }}
                    // value={this.state.searchText}
                    // onChangeText={(value) => onSearch(value)}
                    // onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }



    onConfirm = () => {
        this.setState({
            sendSuccessfulModal: !this.state.sendSuccessfulModal
        })
    }


    footerSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginHorizontal: 15, flexDirection: 'row', bottom: 2, position: 'absolute' }}>
                    <BigTextButton
                        text={"Reset"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        fontColor={"#000"}
                        borderRadius={30}
                        backgroundColor={"#fff"}
                        additionalStyles={{ borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 0.8 }}
                    // onPress={() => this._onClassUpdate(item)}
                    />
                    <View style={{ width: 65 }} />
                    <BigTextButton
                        text={"Send all to Confirm"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        borderRadius={30}
                        start={{ x: 1, y: 0.3 }}
                        end={{ x: 0.5, y: 1 }}
                        onPress={() => this.onConfirm()}
                    />
                </View>
                <View style={{ marginBottom: 20 }} />
            </React.Fragment>
        )

    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                {this.profileSec()}
                <ScrollView>
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
                    <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                        <TouchableOpacity style={{ backgroundColor: '#0B4F6C', height: 60, borderTopLeftRadius: 14, borderTopRightRadius: 14, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>N E W   C U S T O M E R</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#f0f4f7', }}>
                            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }} >
                                <View style={{ height: 60, width: 60, borderRadius: 100, borderColor: "#000", borderWidth: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"camera"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={25} width={25} />
                                </View>
                                <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 10 }}>Upload Customer Image</Text>
                            </View>
                            <View style={{ marginHorizontal: 35, marginVertical: 8, marginTop: 10 }}>
                                <View style={styles.numberViewSec}>
                                    <Text style={styles.textNumber}>2 8 2 8 2 9 7 3 5 3</Text>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 35, marginVertical: 8, marginTop: 10 }}>
                                <View style={styles.numberViewSec}>
                                    <Text style={styles.textNumber}>Customer Name</Text>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 35, marginVertical: 8, marginTop: 10 }}>
                                <View style={styles.numberViewSec}>
                                    <Text style={styles.textNumber}>Customer Type</Text>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 55, marginTop: 20 }}>
                                <BigTextButton
                                    text={"Refer a New Customers"}
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

                    </View>


                </ScrollView>
                <View style={{ marginBottom: 10 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerNewCustomer);