import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, DropdownInputBox, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CommonFunctions, DateConvert, StorageDataModification } from "../../../../services/common-view-function";
import { TextInput } from "react-native";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { ConfirmsalesSuccessfulModal, GiftClaimModal, ProfileSec } from "../../../../pageShared";


let data = [
    {
        id: 1,
        showHide: false,
        product: [
            {
                id: 1,
                name: "Product Name",
                cbName: "5 CB",
                botName: "10 BOT"
            },
            {
                id: 2,
                name: "Product Name",
                cbName: "8 CB",
                botName: "40 BOT"
            },
            {
                id: 3,
                name: "Product Name",
                cbName: "14 CB",
                botName: "50 BOT"
            },
            {
                id: 4,
                name: "Product Name",
                cbName: "70 CB",
                botName: "5 BOT"
            }
        ]
    },
    {
        id: 2,
        showHide: false,
        product: [
            {
                id: 1,
                name: "Product Name",
                cbName: "5 CB",
                botName: "10 BOT"
            },
            {
                id: 2,
                name: "Product Name",
                cbName: "8 CB",
                botName: "40 BOT"
            },
            {
                id: 3,
                name: "Product Name",
                cbName: "14 CB",
                botName: "50 BOT"
            },
            {
                id: 4,
                name: "Product Name",
                cbName: "70 CB",
                botName: "5 BOT"
            }
        ]
    },
    {
        id: 3,
        showHide: false,
        product: [
            {
                id: 1,
                name: "Product Name",
                cbName: "5 CB",
                botName: "10 BOT"
            },
            {
                id: 2,
                name: "Product Name",
                cbName: "8 CB",
                botName: "40 BOT"
            },
            {
                id: 3,
                name: "Product Name",
                cbName: "14 CB",
                botName: "50 BOT"
            },
            {
                id: 4,
                name: "Product Name",
                cbName: "70 CB",
                botName: "5 BOT"
            }
        ]
    },
    {
        id: 4,
        showHide: false,
        product: [
            {
                id: 1,
                name: "Product Name",
                cbName: "5 CB",
                botName: "10 BOT"
            },
            {
                id: 2,
                name: "Product Name",
                cbName: "8 CB",
                botName: "40 BOT"
            },
            {
                id: 3,
                name: "Product Name",
                cbName: "14 CB",
                botName: "50 BOT"
            },
            {
                id: 4,
                name: "Product Name",
                cbName: "70 CB",
                botName: "5 BOT"
            }
        ]
    }

]


class ConfirmSalesListDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            refreshing: true,
            pageLoader: false,
            listLoader: false,
            isApiCall: true,
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

    // for render the list 
    renderContactList = (item, key) => {
        return (
            <View>
                <View style={{ flex: 1, marginHorizontal: '2%', marginTop: 20 }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };

    onShowHide = (item) => {
        let allItems = this.state.superTraderist;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.superTraderist = allItems;
        this.setState({ superTraderist: this.state.superTraderist })
    }

    // for list design implement here
    listSec = (item, key) => {
        return (
            <View style={{ marginTop: 10, marginHorizontal: 5 }} key={key}>
                <TouchableOpacity style={{ backgroundColor: '#d2e4ef', }} onPress={() => this.onShowHide(item)} activeOpacity={0.9}>
                    <View style={styles.mainTraderView}>
                        <View style={styles.userImgSec}>
                            <Image source={ImageName.USER_IMG} style={styles.imgSec} />
                        </View>
                        <Text style={styles.taderText}>Super Trader</Text>
                        <SvgComponent svgName={"downArrow"} strokeColor={"#fff"} height={18} width={18} />
                    </View>
                </TouchableOpacity>
                {item.showHide ?
                    <View style={{ backgroundColor: '#f0f4f7', }}>
                        <View style={styles.showHideView}>
                            <View style={styles.numberTextView}>
                                <Text style={styles.textNumber}>282829735353</Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 6, marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.invText}>INV - 268987654345678</Text>
                                <Text style={styles.dateText}>20 Jan 2023</Text>
                                <View style={{ width: 8 }} />
                                <SvgComponent svgName={"pencilWithUnderline"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                            </View>
                            <View style={styles.mainInputSec}>
                                <View style={{ flex: 0.5 }}>
                                    <DropdownInputBox
                                        // selectedValue={this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id.toString() : "0"}
                                        // data={this.state.allData.unitArr}
                                        onSelect={(value) => this._onChangeUnit(value)}
                                        headerText={"Point Type"}
                                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5, backgroundColor: "#fff" }}
                                        borderRadius={22}
                                    />
                                </View>
                                <View style={styles.flexView}>
                                    <View style={styles.inputSec}>
                                        <TextInput
                                            placeholder={"00 CB."}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            // value={item.inputRate.toString()}
                                            // onChangeText={(value) => this._onChangeRate(value, item, key)}
                                            keyboardType="number-pad"
                                            style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                            maxLength={8}
                                        />
                                    </View>
                                </View>
                                <View style={styles.flexView}>
                                    <View style={styles.inputSec}>
                                        <TextInput
                                            placeholder={"00 BOT."}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            // value={item.inputRate.toString()}
                                            // onChangeText={(value) => this._onChangeRate(value, item, key)}
                                            keyboardType="number-pad"
                                            style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: 'center' }}
                                            maxLength={8}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottonMainView}>
                                <View style={styles.cameraView}>
                                    <SvgComponent svgName={"camera"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={38} width={38} />
                                </View>
                                <View style={{ flex: 0.7 }} />
                                <View style={{ flex: 0.3 }}>
                                    <BigTextButton
                                        text={"Add"}
                                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                        fontSize={FontSize.SM}
                                        borderRadius={30}
                                        height={40}
                                        backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                    // onPress={() => this._onNext()}
                                    />
                                </View>
                            </View>
                            <View style={styles.dashUnderline} />
                            <View style={{ marginTop: 8 }}>
                                {item.product.map((item1, key1) => (
                                    <View style={styles.productView} key={key1}>
                                        <Text style={styles.productName}>{item1.name}</Text>
                                        <Text style={styles.productValue}>{item1.cbName}</Text>
                                        <Text style={styles.productValue}>{item1.botName}</Text>
                                        <TouchableOpacity style={{}}>
                                            <SvgComponent svgName={"cross"} strokeColor={Color.COLOR.RED.AMARANTH} height={13} width={13} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.dashUnderline} />
                            <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.salesRefferText}>Sales Referred by</Text>
                                <Text style={styles.putRefferalText}>Put referral phone number here</Text>

                            </View>
                            <View style={{ marginHorizontal: 35, marginVertical: 8 }}>
                                <View style={styles.numberViewSec}>
                                    <Text style={styles.textNumber}>2828297353</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <Image source={ImageName.USER_IMG} style={styles.imgSec} />
                                <View style={{ flex: 1, marginLeft: '5%' }}>
                                    <Text style={styles.superTraderText}>Super Tarder</Text>
                                    <Text style={styles.subRollText}>Masson</Text>
                                </View>
                                <Text style={styles.verifyText}>Verify</Text>
                            </View>
                            <View style={{ marginHorizontal: 70, marginTop: 10 }}>
                                <BigTextButton
                                    text={"Send to Confirm"}
                                    fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                    fontSize={FontSize.SM}
                                    borderRadius={30}
                                    height={35}
                                // onPress={() => this._onNext()}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }} />
                    </View> :
                    null
                }
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
            <View style={{ marginBottom: 200 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    // for change the state for refrace
    _onSetChangeData = async () => {
        this.setState({
            superTraderist: [],
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            limit: 10,
            pageNum: 0,
        })
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

    onRefresh = async () => {
        await this._onSetChangeData();
        await this._apiCallRes()
    }

    onDownload = () => {
        console.log("download")
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


    modalSec = () => {
        return (
            <>
                <ConfirmsalesSuccessfulModal isVisible={this.state.sendSuccessfulModal} onCloseModal={() => this.onConfirm()} />

            </>

        )
    }
    sendSuccessfulModal

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
                {this.modalSec()}
                {this.profileSec()}
                {this.searchSec()}
                {this.state.pageLoader ?
                    <View>
                        <SkeletonPlaceholder>{this.ViewSkeletonPlaceholder()}</SkeletonPlaceholder>
                    </View> :
                    <React.Fragment>
                        {this.state.superTraderist.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.superTraderist}
                                    renderItem={({ item, index }) => this.renderContactList(item, index)}
                                    keyExtractor={(item, key) => key}
                                    // onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    // ListFooterComponent={this.renderLoader}
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
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSalesListDetails);