import React from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CustomStyle } from '../../style'
import { Color, Dimension, FontFamily, ImageName } from '../../../enums'
import styles from './Style'
import { BottomModal, DropdownInputBox, Loader, NoDataFound, TextInputBox } from '../../../shared'
import SvgComponent from '../../../assets/svg'
import { ErrorCode } from '../../../services/constant'
import { Toaster } from '../../../services/common-view-function'
import { MiddlewareCheck } from '../../../services/middleware'
import { modGiftCategoryData, modGiftTypeData, modListData } from './Funnction'
import { DataValidator } from '../../../validators'

class PartnerGift extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoader: true,
            giftArr: [],
            refreshing: false,
            listLoader: true,
            isVisibleModal: false,
            limit: 10,
            pageNum: 0,
            isApiCall: true,
            giftTypeArr: [],
            selectedGiftTypeObj: {},
            quantity: "",
            quantityActive: false,
            submitLoader: false,
            giftCategoryArr: [],
            giftRequestArr: [{ selectedGiftCategoryObj: {}, giftTypeArr: [], selectedGiftTypeObj: {}, quantity: "", quantityActive: false }]
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad = async () => {
        await this.getListData()
        await this.getGiftCategoryList()
        // await this.getMasterGiftItemList()
        // this.setState({ pageLoader: false })
    }

    getListData = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchText": "",

        }
        let responseData = await MiddlewareCheck("getGiftStockList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modListData(responseData.response)
                if (modData.list.length == 0) {
                    this.setState({ isApiCall: false })
                }
                this.setState({
                    giftArr: [...this.state.giftArr, ...modData.list],
                })

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }
    getGiftCategoryList = async () => {
        let responseData = await MiddlewareCheck("getGiftCategoryList", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modGiftCategoryData(responseData.response)
                this.setState({ giftCategoryArr: modData.list })

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getMasterGiftItemList = async (val, index) => {
        let reqData = {
            "giftCategoryId": val.id
        }
        let responseData = await MiddlewareCheck("getGiftTypeList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modGiftTypeData(responseData.response)
                this.state.giftRequestArr[index].giftTypeArr = modData.list

                this.setState({ giftRequestArr: this.state.giftRequestArr })

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    _onBack = () => {
        this.props.navigation.goBack();
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: Color.COLOR.BLACK.PURE_BLACK, }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <View style={{ flex: 0.35 }}>
                        <Text style={[styles.headerTxt, { fontSize: 12 }]}>{item.desc}</Text>
                    </View>
                    <View style={{ flex: 0.25 }}>
                        <Text style={[styles.headerTxt, { fontSize: 12 }]}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 0.18, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.headerTxt, { fontSize: 12 }]}>{item.requestQty}</Text>
                    </View>
                    <View style={{ flex: 0.17, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.headerTxt, { fontSize: 12 }]}>{item.qty}</Text>
                    </View>
                    <View style={{ flex: 0.2, }}>
                        {/* <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", backgroundColor: item.status == 0 ? Color.COLOR.RED.RED_ORANGE : Color.COLOR.GREEN.APPLE_GREEN, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                            <Text style={[styles.headerTxt, { fontSize: 10, color: "#fff" }]}>{item.status == 0 ? "pending" : "Approved"}</Text>
                        </View> */}
                        <Text style={[styles.headerTxt, { fontSize: 10 }]}>{item.date}</Text>

                    </View>

                </View>
            </View>
        )
    }

    renderLoader = () => {
        if (this.state.listLoader) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 200,
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        color={Color.COLOR.INDICATOR_COLOR.GRAY}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ marginBottom: 200 }} />
            )
        }
    }

    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this.getListData();
                } else {
                    this.setState({ listLoader: false })
                    return null;

                }
            }
        );
    };

    onRefresh = () => {

    }

    _onChangeGiftCategoryType = async (value, index) => {
        this.state.giftRequestArr[index].selectedGiftCategoryObj = value
        this.setState({ giftRequestArr: this.state.giftRequestArr })
        await this.getMasterGiftItemList(value, index)
    }

    _onChangeGiftType = (value, index) => {
        this.state.giftRequestArr[index].selectedGiftTypeObj = value
        this.setState({ giftRequestArr: this.state.giftRequestArr })
    }

    _onChangeQuantity = (value, index) => {
        let d = DataValidator.inputEntryValidate(value, "mobile")
        this.state.giftRequestArr[index].quantity = d
        this.setState({ giftRequestArr: this.state.giftRequestArr })

    }

    onRequest = () => {
        this.setState({ isVisibleModal: true, submitLoader: false })
    }

    onCloseModal = () => {
        this.setState({
            giftRequestArr: [{
                selectedGiftCategoryObj: {},
                selectedGiftTypeObj: {},
                quantity: "",
                quantityActive: false
            }],
            isVisibleModal: false
        })
    }

    onAddMore = () => {
        if (this.validateGiftData()) {
            let reqObj = {
                selectedGiftCategoryObj: {},
                selectedGiftTypeObj: {},
                quantity: "",
                quantityActive: false
            }
            this.state.giftRequestArr.push(reqObj)
            this.setState({ giftRequestArr: this.state.giftRequestArr })

        }

    }

    validateGiftData = () => {
        // let status = false;
        let c = 0;
        for (let i = 0; i < this.state.giftRequestArr.length; i++) {
            if (Object.keys(this.state.giftRequestArr[i].selectedGiftCategoryObj).length == 0) {
                Toaster.ShortCenterToaster("Please select Gift Category !")
                c++;
            } else if (Object.keys(this.state.giftRequestArr[i].selectedGiftTypeObj).length == 0) {
                Toaster.ShortCenterToaster("Please select Gift Item !")
                c++;
            } else if (this.state.giftRequestArr[i].quantity.length == 0) {
                Toaster.ShortCenterToaster("Please add Quantity")
                c++;
            }
        }
        if (c > 0) {
            return false
        } else {
            return true
        }

    }


    modReqData = (arrData) => {
        let arr = [];
        for (let i = 0; i < arrData.length; i++) {
            let modObj = {
                "giftTypeId": arrData[i].selectedGiftTypeObj.id,
                "giftStockQty": arrData[i].quantity
            }
            arr.push(modObj)
        }

        return arr
    }

    clearModalData = () => {
        this.setState({
            giftRequestArr: [{ selectedGiftCategoryObj: {}, selectedGiftTypeObj: {}, quantity: "", quantityActive: false }]
        })
    }

    onRemove = (index) => {
        this.state.giftRequestArr.splice(index, 1);
        this.setState({ giftRequestArr: this.state.giftRequestArr })
    }

    onSubmit = async () => {
        if (this.validateGiftData()) {
            let reqData = {
                "giftStockArr": this.modReqData(this.state.giftRequestArr)
            }
            this.setState({ submitLoader: true })
            let responseData = await MiddlewareCheck("addGiftStockRequest", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ isVisibleModal: false, pageLoader: true, listLoader: true, isApiCall: true, giftArr: [] })
                    this.clearModalData();
                    await this.getListData()

                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ submitLoader: false })
        }

    }

    modalSec = () => {
        return (
            <>
                {this.state.isVisibleModal ? <>
                    <BottomModal
                        isVisible={this.state.isVisibleModal}
                        children={
                            <View style={styles.modalview}>
                                <TouchableOpacity style={styles.dropdownSec} onPress={() => this.onCloseModal()} >
                                    <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                                </TouchableOpacity>
                                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />

                                <View style={{ marginTop: 20, marginHorizontal: 10, maxHeight: Dimension.height / 1.5 }}>
                                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}
                                        // keyboardShouldPersistTaps="handled"
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View style={{ marginBottom: 50 }}>
                                            {this.state.giftRequestArr.map((item, key) => (
                                                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }} key={key}>
                                                    <View style={{ flex: 0.38 }}>
                                                        <DropdownInputBox
                                                            upDownImgStyle={{ height: 12, width: 12 }}
                                                            fontSize={11}
                                                            selectedValue={item.selectedGiftCategoryObj.id ? item.selectedGiftCategoryObj.id.toString() : "0"}
                                                            data={this.state.giftCategoryArr}
                                                            borderRadius={25}
                                                            onSelect={(value) => this._onChangeGiftCategoryType(value, key)}
                                                            headerText={"Category*"}
                                                            // fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                                            // selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                            // unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                            backgroundColor={"#F0F4F7"}
                                                            isBackButtonPressRequired={true}
                                                            isBackdropPressRequired={true}
                                                            isSearchable={true}
                                                        />
                                                    </View>
                                                    <View style={{ width: 5 }} />
                                                    <View style={{ flex: 0.3 }}>
                                                        <DropdownInputBox
                                                            upDownImgStyle={{ height: 12, width: 12 }}
                                                            fontSize={11}
                                                            selectedValue={item.selectedGiftTypeObj.id ? item.selectedGiftTypeObj.id.toString() : "0"}
                                                            data={item.giftTypeArr}
                                                            borderRadius={25}
                                                            onSelect={(value) => this._onChangeGiftType(value, key)}
                                                            headerText={"Item*"}
                                                            // fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                                            // selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                            // unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                            backgroundColor={"#F0F4F7"}
                                                            isBackButtonPressRequired={true}
                                                            isBackdropPressRequired={true}
                                                            isSearchable={true}
                                                        />
                                                    </View>
                                                    <View style={{ width: 5 }} />
                                                    <View style={{ flex: 0.22 }}>
                                                        <TextInputBox
                                                            fontSize={11}
                                                            placeholder={"QTY*"}
                                                            value={item.quantity}
                                                            borderRadius={25}
                                                            height={45}
                                                            onChangeText={(value) => this._onChangeQuantity(value, key)}
                                                            isActive={item.quantityActive}
                                                            onFocus={() => { item.quantityActive = true; this.setState({ giftRequestArr: this.state.giftRequestArr }) }}
                                                            onBlur={() => { item.quantityActive = false; this.setState({ giftRequestArr: this.state.giftRequestArr }) }}
                                                            maxLength={6}
                                                            // alignItems={"flex-start"}
                                                            activeBGColor={"#F0F4F7"}
                                                            inactiveBGColor={"#F0F4F7"}
                                                        // activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                        // inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                        // placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                        // fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                                        />
                                                    </View>
                                                    <View style={{ width: 10 }} />
                                                    <View style={{ flex: 0.1 }}>
                                                        {key == 0 ? null :
                                                            <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: "red", borderRadius: 20, justifyContent: "center", alignItems: "center" }} onPress={() => this.onRemove(key)} >
                                                                <SvgComponent svgName={"delete"} strokeColor={"#fff"} height={12} width={12} />
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                                {this.state.giftRequestArr.length > 8 ? null :
                                    <View style={{ alignItems: "flex-end", marginHorizontal: 20, marginVertical: 15 }}>
                                        <TouchableOpacity onPress={() => this.onAddMore()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 }} >
                                            <Text style={[styles.textDealer, { fontSize: 12 }]}>{"Add more"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                                    {this.state.submitLoader ? <ActivityIndicator /> :
                                        <TouchableOpacity onPress={() => this.onSubmit()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 }} >
                                            <Text style={[styles.textDealer, { fontSize: 14 }]}>{"Submit"}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                            </View>
                        }
                    />
                </> : null}

            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.modalSec()}
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.2, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                            <TouchableOpacity style={CustomStyle.backButtonView} activeOpacity={0.9} onPress={() => this._onBack()}>
                                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                            </TouchableOpacity>
                            <View style={CustomStyle.headerTextView}>
                                <Text style={CustomStyle.headerText}>Partner's Gift</Text>
                            </View>
                            <View style={CustomStyle.backButtonView} />
                        </View>
                        {this.state.giftArr.length > 0 ?
                            <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F0F4F7", paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <View style={{ flex: 0.35 }}>
                                        <Text style={styles.headerTxt}>Category</Text>
                                    </View>
                                    <View style={{ flex: 0.25 }}>
                                        <Text style={styles.headerTxt}>Item</Text>
                                    </View>
                                    <View style={{ flex: 0.18, }}>
                                        <Text style={[styles.headerTxt, { fontSize: 11, textAlign: "center" }]}>Request Qty</Text>
                                    </View>
                                    <View style={{ flex: 0.17, }}>
                                        <Text style={[styles.headerTxt, { fontSize: 11, textAlign: "center" }]}>Approve Qty</Text>
                                    </View>
                                    <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={[styles.headerTxt, { fontSize: 11, textAlign: "center" }]}>Requested On</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={this.state.giftArr}
                                    renderItem={(item, key) => this.renderItem(item, key)}
                                    keyExtractor={(item, key) => key}
                                    // onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                />

                            </View>
                            :
                            <View style={{ marginTop: 20, height: Dimension.height }}>
                                <NoDataFound />
                            </View>
                        }
                        <View style={{ bottom: 15, position: "absolute", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <TouchableOpacity style={styles.btnView} onPress={() => this.onRequest()}>
                                <Text style={styles.btn}>Raise Request</Text>
                            </TouchableOpacity>
                        </View>
                    </>

                }

            </SafeAreaView>
        )
    }
}


export default PartnerGift