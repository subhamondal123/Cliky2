import React from "react";
import { SafeAreaView, Image, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { CatalogueItem, DynamicCategoryTab, DynamicOfferCard, DynamicRecentlyCard } from "../../../../pageShared";

let data = [

    {
        id: 1,
        image: ImageName.GIFT_BANNER,

    },
    {
        id: 2,
        image: ImageName.OFFER_BANNER,

    },
    {
        id: 3,
        image: ImageName.GIFT_BANNER,

    },
    {
        id: 4,
        image: ImageName.OFFER_BANNER,

    },
]

const tabDataArr = [
    {
        id:1,
        text:"Offers"
    },

    {
        id:2,
        text:"Additional Points"
    },
    {
        id:1,
        text:"Gift"
    },

]


let joyadhaanidata = [

    {
        id: 1,
        image: ImageName.JOYADHAANI_BANNER,

    },
    {
        id: 2,
        image: ImageName.JOYADHAANI_BANNER,

    },
    {
        id: 3,
        image: ImageName.JOYADHAANI_BANNER,

    },
    {
        id: 4,
        image: ImageName.JOYADHAANI_BANNER,

    },
]

let imgData = [

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



class SchemePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabData:tabDataArr,
            offerCard: data,
            recentOffer: joyadhaanidata,
            listData: imgData,

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

        const skelitonPlaceHolder = () => {
            return (
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />

                    </View>
                </SkeletonPlaceholder>
            )
        }
        return (
            <>
                <View style={{ marginTop: 10, }}>
                    {this.state.tabLoader ?
                        skelitonPlaceHolder()
                        :
                        <React.Fragment>
                            {this.state.tabData.length > 0 ?
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    <View style={{ flexDirection: "row" }}>
                                        {this.state.tabData.map((item, key) => (
                                            <View style={{ marginRight: 5, marginVertical: 5, flexDirection: "row", }} key={key}>
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
                    }
                </View>
            </>
        )
    }

    listSec = () => {
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 18, flexDirection: "row", }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row" }} >
                        {this.state.listData.map((item, key) => (
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


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <View style={{ marginHorizontal: 10 }}>
                    {this.activePointSec()}
                    {this.tabSec()}
                </View>
                <ScrollView>
                    <View style={{ marginHorizontal: 10}}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {this.state.offerCard.map((item, key) => (
                                <View key={key}>
                                    <DynamicOfferCard
                                        data={item}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                        <View style={{ marginTop: 25 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Recently get</Text>
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                {this.state.recentOffer.map((item, key) => (
                                    <View key={key}>
                                        <DynamicRecentlyCard
                                            data={item}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Upcoming Catalogue</Text>
                        </View>
                        {this.listSec()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SchemePage);