import React from "react";
import { SafeAreaView, Image, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CommonFunctions, DateConvert, StorageDataModification } from "../../../../services/common-view-function";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { CatalogueItem, DynamicCategoryTab, DynamicCustomerProfile, DynamicOfferCard, DynamicRecentlyCard, ProfileSec } from "../../../../pageShared";
import ProductOfferCard from "../../../../pageShared/order/orderProductOfferCard";

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

let listData = [
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
    }

]


const CataloguegoryData = [
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

const tabData = [
    {
        id: 1,
        text: "Category 1",
        check: true
    },
    {
        id: 2,
        text: "Category 2",
        check: false
    },
    {
        id: 3,
        text: "Category 3",
        check: false
    },
    {
        id: 4,
        text: "Category 4",
        check: false
    },
    {
        id: 5,
        text: "Category 5",
        check: false
    },
]



class RequestRedemtionCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: data,
            listData: listData,
            tabData:tabData

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


    listSec = () => {
        const onSelectItem = () => {
            this.props.navigation.navigate("CatalogueItemDetails")
        }
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row", flexWrap: 'wrap' }} >
                        {CataloguegoryData.map((item, key) => (
                            <View style={{ marginVertical: 5 ,marginHorizontal:2}} key={key}>
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ProfileSec />
                {this.tabSec()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 10, marginTop: 15 }}>

                        {this.listSec()}
                        <View style={{ marginHorizontal: 55, marginTop: 20 }}>
                            <BigTextButton
                                text={"Check Redemption History"}
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


                    <View style={{ marginBottom: 80 }} />

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

export default connect(mapStateToProps, mapDispatchToProps)(RequestRedemtionCategory);