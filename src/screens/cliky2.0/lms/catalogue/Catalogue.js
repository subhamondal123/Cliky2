import React, { Component } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums'
import styles from './Style'
import { CatalogueItem, DynamicCategoryTab, LmsBannerModal } from '../../../../pageShared'
import SvgComponent from '../../../../assets/svg';
import Header from './../../header/Header'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'
import { modifyCategoryData } from './Function'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

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

const listData = [
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
        id: 4,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 5,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 6,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 7,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 8,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 9,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 10,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 11,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 12,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 13,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 14,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 15,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 16,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 17,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 18,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
]

export default class Catalogue extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabData: [],
            selectedTabData: {},
            tabLoader: false,
            listData: [],
            pageLoader: false,
            listLoader: false,
            refreshing: false,
            isVisibleBanner: true,
            bannerDataArr: [],
        }
    }

    componentDidMount = () => {
        this.load()
    }

    load = async () => {
        await this.getPromotionBanner();
        await this.getCatalogueCategory();
    }

    getCatalogueCategory = async () => {
        this.setState({ tabLoader: true })
        let responseData = await MiddlewareCheck("getCategoryByCatalogue", { "catalogueId": 1 }, this.props)
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ tabData: modifyCategoryData(responseData.response) })
            }
        }

        this.setCategory(modifyCategoryData(responseData.response));
        this.setState({ tabLoader: false })

    }

    setCategory = (arrData) => {
        let tabItemData = {};
        for (let i = 0; i < arrData.length; i++) {
            if (i == 0) {
                arrData[i].check = true;
                tabItemData = arrData[i]
            }
        }

        this.setState({ tabData: arrData, selectedTabData: tabItemData })

        this.getItemByCategory(tabItemData)
    }

    getItemByCategory = async (item) => {

        let reqData = {
            "categoryid": item.id,
            "limit": "10",
            "offset": "0"
        }
        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("getItemByCategory", reqData, this.props)
        // if (responseData) {
        //     if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         this.setState({ tabData: modifyCategoryData(responseData.response) })
        //     }
        // }

        // this.setCategory(modifyCategoryData(responseData.response));
        this.setState({ pageLoader: false })

    }
    getPromotionBanner = async () => {
        let bannerData = await MiddlewareCheck("getPromotionalImage", { clientid: 4 }, this.props)
        if (bannerData) {
            if (bannerData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ bannerDataArr: bannerData.response })
            }
        }
    }

    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
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
                <View style={{ marginHorizontal: 10, marginTop: 10, }}>
                    {this.state.tabLoader ?
                        skelitonPlaceHolder()
                        :
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
                    }
                </View>
            </>
        )
    }

    listSec = () => {
        const onSelectItem = () => {
            this.props.navigation.navigate("CatalogueItemDetails")
        }

        const renderList = (item, key) => {
            return (
                <View key={key}>
                    <View>
                        {listDataSec(item, key)}
                    </View>
                </View>
            );
        };

        const listDataSec = (item, key) => {
            return (
                <View style={{ marginHorizontal: 5, marginVertical: 5 }} key={key}>
                    <CatalogueItem
                        data={item}
                        onPress={(value) => onSelectItem(value)}
                        width={Dimension.width / 3 - 20}
                        backgroundColor={"#D1D1D1"}
                    />
                </View>
            )
        }

        const renderLoader = () => {
            return (
                <View>
                    <View style={{ height: 400 }} />
                </View>
            )
        }

        return (
            <View style={{ paddingHorizontal: 10 }}>
                {/* <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ flexWrap: "wrap", flexDirection: "row" }} >
                        {listData.map((item, key) => (
                            <View style={{ marginHorizontal: 5, marginVertical: 5 }} key={key}>
                                <CatalogueItem
                                    data={item}
                                    onPress={(value) => onSelectItem(value)}
                                    width={Dimension.width / 3 - 20}
                                    backgroundColor={"#D1D1D1"}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={{ marginBottom: 400 }} />
                </ScrollView> */}

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        numColumns={3}
                        data={listData}
                        renderItem={({ item, index }) => renderList(item, index)}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={renderLoader}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={() => this.onRefresh()}
                    //     />
                    // }
                    />
                </View>

                {/* <View style={{ flexWrap: "wrap", flexDirection: "row" }} >
                    <FlatList
                        data={listData}
                        renderItem={({ item, index }) => renderList(item, index)}
                        // keyExtractor={(item, key) => key}
                        // onEndReached={this.fetchMoreCustomer}
                        // onEndReachedThreshold={0.1}
                        // ListFooterComponent={this.renderCusmoterLoader}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={() => this.onRefresh()}
                    //     />
                    // }
                    />
                </View> */}
            </View >

        )
    }

    onNotification = () => {
        console.log("--notification----")
    }

    modalSec = () => {
        const onClose = () => {
            this.setState({ isVisibleBanner: false })
        }
        return (
            <>
                {this.state.bannerDataArr.length > 0 ?
                    <LmsBannerModal
                        isVisible={this.state.isVisibleBanner}
                        data={this.state.bannerDataArr[0]}
                        onCloseModal={() => onClose()}
                    />
                    :
                    null
                }
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} onApplyFilter={() => console.log("")} onResetFilter={() => console.log("")} onPressNotification={() => this.onNotification()} />
                <View style={{ marginTop: 5 }}>
                    {this.activePointSec()}
                    {this.tabSec()}
                    {this.listSec()}
                    {this.modalSec()}
                </View>
            </SafeAreaView>
        )
    }
}
