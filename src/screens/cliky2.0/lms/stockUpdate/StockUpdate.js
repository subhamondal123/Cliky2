import React from "react";
import { SafeAreaView, Image, View, Text, FlatList, RefreshControl, TextInput } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from "../../header/Header";
import SvgComponent from "../../../../assets/svg";
import { StockUpdateSuccessfulModal } from "../../../../pageShared";


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
        id: 7,
        showHide: false
    },


]


class StockUpdateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            refreshing: true,
            pageLoader: false,
            listLoader: false,
            isApiCall: true,
            locationZoneList: [],
            selectedItem: {},
            successfulModal: false
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
            locationZoneList: data
        })
    }

    // for render the list 
    renderContactList = (item, key) => {
        return (
            <View>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };

    // for list design implement here
    listSec = (item, key) => {
        return (
            <View style={styles.activeBoxshadowColor} key={key}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.cicelView}>
                        <Text style={styles.itemHeaderName}>AB</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.itemName}>Biscuits</Text>
                        <Text style={styles.itemWeightText}>250 g</Text>
                    </View>
                    <View style={{ width: 40 }} />
                    <View style={styles.inputFeildMainView}>
                        <View style={styles.textInputView}>
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
                    <View style={styles.inputFeildMainView}>
                        <View style={styles.textInputView}>
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
            locationZoneList: [],
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

    currentStock = () => {
        return (
            <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Current Stock</Text>
                <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>22</Text>
                <View style={{ flex: 1 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>25 th Jan 23 </Text>
            </View>
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
                <View style={{ width: 10 }} />
                <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#F0F4F7' }}>
                    <SvgComponent svgName={"lmsFilter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
                </View>
            </View>
        )
    }

    _onUpdateStock = () => {
        this.setState({
            successfulModal: !this.state.successfulModal
        })
    }

    footerSec = () => {

        return (
            <React.Fragment>
                <View style={{ marginHorizontal: 15, flexDirection: 'row', bottom: 4, position: 'absolute' }}>
                    <BigTextButton
                        text={"Reset"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        fontColor={"#000"}
                        borderRadius={30}
                        backgroundColor={"#fff"}
                        additionalStyles={{ borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1 }}
                    // onPress={() => this._onClassUpdate(item)}
                    />
                    <View style={{ width: 65 }} />
                    <BigTextButton
                        text={"Update Stock"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        borderRadius={30}
                        onPress={() => this._onUpdateStock()}
                    />
                </View>
                <View style={{ marginBottom: 20 }} />
            </React.Fragment>
        )

    }


    modalSec = () => {
        return (
            <StockUpdateSuccessfulModal isVisible={this.state.successfulModal} onCloseModal={() => this._onUpdateStock()} />
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                {this.modalSec()}
                {this.currentStock()}
                {this.searchSec()}
                <View style={{ backgroundColor: '#F0F4F7', borderRadius: 12, marginHorizontal: 10, marginTop: 10 }}>
                    {this.state.pageLoader ?
                        <View>
                            <SkeletonPlaceholder>{this.ViewSkeletonPlaceholder()}</SkeletonPlaceholder>
                        </View> :
                        <React.Fragment>
                            {this.state.locationZoneList.length > 0 ?
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.locationZoneList}
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
                    <View style={{ marginBottom: 200 }} />
                </View>
                {this.footerSec()}

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
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdateList);