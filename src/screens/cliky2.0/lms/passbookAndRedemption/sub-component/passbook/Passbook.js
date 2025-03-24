import React, { Component } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import { PassbookTab, PassbookTransactionDetailModal } from '../../../../../../pageShared'
import { Color, FontFamily, FontSize, ImageName } from '../../../../../../enums'
import SvgComponent from '../../../../../../assets/svg'
import { BigTextButton, TextInputBox } from '../../../../../../shared'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'


const passbookTabData = [
    {
        id: 1,
        image: "nineDot",
        label: "Passbook",
        color: ["#7af7ff82", "#BEDE3E", "#3BB900"]
    },
    {
        id: 2,
        image: "nineDot",
        label: "Stock \n & Lifting",
        color: ["#46D3C2", "#296D9B"]
    },
    {
        id: 3,
        image: "nineDot",
        label: "Redemption",
        color: ["#04ff6866", "#50B1CF", "#004F88"]
    },

]


let data = [
    {
        id: 1,
        showHide: false
    },
    {
        id: 2,
        showHide: false
    },
    {
        id: 3,
        showHide: false
    },
    {
        id: 4,
        showHide: false
    },
    {
        id: 5,
        showHide: false
    },
    {
        id: 6,
        showHide: false
    },
    {
        id: 7,
        showHide: false
    }
]

export default class Passbook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            limit: 10,
            pageNum: 0,
            isVisibleFilter: false,
            searchText: "",
            pageLoader: false,
            refreshing: true,
            listLoader: false,
            isApiCall: true,
            isVisibleDetailsModal: false,
            locationListData: [],
            selectedItem: {},
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

    _apiCallRes = async () => {
        this.setState({
            locationListData: data
        })
    }

    showHide = (item) => {
        // let allItems = this.state.locationListData;
        // for (let i = 0; i < allItems.length; i++) {
        //     if (allItems[i].id == item.id) {
        //         allItems[i].showHide = !(allItems[i].showHide)
        //     } else {
        //         allItems[i].showHide = false
        //     }
        // }
        // this.state.locationListData = allItems;
        this.setState({ isVisibleDetailsModal: !this.state.isVisibleDetailsModal, selectedItem: item })
    }

    renderList = (item, key) => {
        return (
            <View >
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };


    listSec = (item, key) => {
        return (
            <View style={styles.activeBoxshadowColor} key={key}>
                <TouchableOpacity style={{ padding: 14 }} activeOpacity={0.9} onPress={() => this.showHide(item, key)}>
                    <View style={{ marginHorizontal: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#efefef', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#3C3C3C", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>14</Text>
                            <Text style={{ color: "#3C3C3C", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Nov</Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: '5%' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Reference</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Subha Modal</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Mason</Text>
                        </View>
                        <SvgComponent svgName={"greenDownArrow"} strokeColor={"#61C234"} height={14} width={14} />
                        <SvgComponent svgName={"blueLock"} strokeColor={"#000"} height={18} width={18} />
                        <View style={{ width: 8 }} />
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>20</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // fetch more
    fetchMore = async () => {
        // if (this.state.initialApiCall) {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._apiCallRes();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
        // }
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 300 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 300 }} />
        );
    };

    // for change the state for refrace
    _onSetChangeData = async () => {
        this.setState({
            locationListData: [],
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            limit: 10,
            pageNum: 0,
        })
    }


    passbookTabSec = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: "row" }}>
                        {passbookTabData.map((item, key) => (
                            <View key={key} style={{ marginHorizontal: 5 }}>
                                <PassbookTab data={item} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

    filterModal = () => {
        this.setState({ isVisibleFilter: true })
    }


    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginTop: 15, flexDirection: "row", alignItems: "center" }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#00AB1B"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#00AB1B", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => this.filterModal()}>
                    <SvgComponent svgName={"filter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={24} width={24} />
                </TouchableOpacity>
            </View>
        )
    }


    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ searchText: val })
        }
        const onPressSearchIcon = () => {

        }
        return (
            <>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <TextInputBox
                        placeholder={"Search by Name or Number"}
                        placeholderTextColor={"#747C90"}
                        isRightIcon={true}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={45}
                        borderRadius={22}
                        additionalBoxStyle={{ borderColor:"#747C90",borderWidth:0.5 }}
                        additionalTextInput={{ color: "#747C90", fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: 12 }}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressLeftIcon={() => onPressSearchIcon()}
                    />
                </View>
            </>
        )
    }

    headingSec = () => {
        return (
            <View>
                <View style={{ flexDirection: "row", marginTop: 10, paddingVertical: 10, alignItems: "center", marginHorizontal: 15 }}>
                    <SvgComponent svgName={"lmsCalender"} strokeColor={"#000"} height={17} width={17} />
                    <View style={{ flex: 0.25 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 15, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: 5 }}>March 23</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: 5 }}>Description</Text>
                    </View>
                    <View style={{ flex: 0.15 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: 5, textAlign: "right" }}>Points</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 0.1, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, marginHorizontal: 10, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }} />
            </View>
        )
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    footerSec = () => {
        return (
            <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
                <BigTextButton
                    text={"Previous"}
                    fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                    fontSize={FontSize.SM}
                    fontColor={"#000"}
                    borderRadius={30}
                    isLinearGradient={true}
                    gradientColors={["#fff", "#dfdfdf"]}
                    additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                // onPress={() => this._onClassUpdate(item)}
                />
                <View style={{ width: 55 }} />
                <BigTextButton
                    isLinearGradient={true}
                    gradientColors={["#C5C91E", "#3AB500"]}
                    text={"Next"}
                    fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                    fontSize={FontSize.SM}
                    borderRadius={30}
                    start={{ x: 1, y: 0.3 }}
                    end={{ x: 0.5, y: 1 }}
                // onPress={() => this._onNext()}
                />


            </View>
        )
    }

    modalSec = () => {
        return (
            <>
                <PassbookTransactionDetailModal isVisible={this.state.isVisibleDetailsModal} onCloseModal={() => this.showHide()} />
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSec()}
                {/* {this.passbookTabSec()} */}
                {/* {this.activePointSec()} */}
                {this.searchSec()}
                {this.headingSec()}
                {this.state.pageLoader ?
                    <View>
                        <SkeletonPlaceholder>
                            {this.ViewSkeletonPlaceholder()}
                        </SkeletonPlaceholder>
                    </View> :
                    <View>
                        <FlatList
                            data={this.state.locationListData}
                            renderItem={({ item, index }) => this.renderList(item, index)}
                            // keyExtractor={(item, key) => key}
                            // onEndReached={this.fetchMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.renderLoader}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={() => this.onRefresh()}
                        //     />
                        // }
                        />
                        {this.footerSec()}
                    </View>
                }

            </SafeAreaView>
        )
    }
}
