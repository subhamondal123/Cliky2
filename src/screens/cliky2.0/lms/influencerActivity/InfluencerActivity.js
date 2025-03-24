import React from "react";
import { SafeAreaView, Image, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { CatalogueItem, DynamicCategoryTab, DynamicCustomerProfile, DynamicOfferCard, DynamicRecentlyCard } from "../../../../pageShared";



const tabData = [
    {
        id: 1,
        text: "Register New",
        check: true
    },
    {
        id: 2,
        text: "Favourite",
        check: false
    },
    {
        id: 3,
        text: "Mason",
        check: false
    },
    {
        id: 4,
        text: "Engineer",
        check: false
    },
    {
        id: 5,
        text: "IHB",
        check: false
    },
]


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



class InfluencerActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: data,
            tabData: tabData

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
                    <SvgComponent svgName={"downArrow"} strokeColor={"#000"} height={12} width={12} />
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

    tabSec = () => {
        const tabSelect = (item, key) => {
            let tabData = this.state.tabData;
            for (let i = 0; i < tabData.length; i++) {
                if (i == key) {
                    tabData[i].check = true;
                } else {
                    tabData[i].check = false;
                }
            }
            this.setState({ tabData: tabData })
        }

        // const skelitonPlaceHolder = () => {
        //     return (
        //         <SkeletonPlaceholder>
        //             <View style={{ flexDirection: "row", marginVertical: 5 }}>
        //                 <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
        //                 <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
        //                 <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
        //                 <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />

        //             </View>
        //         </SkeletonPlaceholder>
        //     )
        // }
        return (
            <>
                <View style={{ marginHorizontal: 10, marginTop: 10, }}>
                    {/* {this.state.tabLoader ?
                        skelitonPlaceHolder()
                        : */}
                    <React.Fragment>
                        {this.state.tabData.length > 0 ?
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: "row" }}>
                                    {this.state.tabData.map((item, key) => (
                                        <View style={{ marginHorizontal: 5, marginVertical: 5, flexDirection: "row", }} key={key}>
                                            <DynamicCategoryTab
                                                data={item}
                                                onSelectedTab={() => tabSelect(item, key)}
                                            />
                                        </View>
                                    ))}
                                </View>

                            </ScrollView>
                            :
                            null
                        }
                    </React.Fragment>
                    {/* } */}
                </View>
            </>
        )
    }

    onSelectTabData = () => {
        this.props.navigation.navigate("InfluencerActivityDetails")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 10 }}>
                        {this.activePointSec()}
                        {this.tabSec()}
                        {this.searchSec()}
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginTop: 25, flexWrap: 'wrap', marginLeft: '2%' }}>
                                {this.state.userData.map((item, key) => (
                                    <View style={{ marginTop: 12 }} key={key}>
                                        <DynamicCustomerProfile data={item} props={this.props} onSelectTab={() => this.onSelectTabData()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerActivity);