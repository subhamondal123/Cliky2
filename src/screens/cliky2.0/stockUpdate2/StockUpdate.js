import React from "react";
import { Dimension, FontSize, ImageName } from '../../../enums';
import styles from './Style';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,

} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../redux/Sales360Action';
import { ErrorCode, LengthValidate } from '../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownInputBox, Loader, TextInputBox } from "../../../shared";
import BigTextButton from "../../../shared/big-text-button";
import { validateData, modifyUnitArr, modifyBrandArr, modifySizeSpecsArr } from "./Function";
import { MiddlewareCheck } from "../../../services/middleware";
import { StorageDataModification, Toaster } from "../../../services/common-view-function";
import Header from "../header/Header";
import { DynamicProductMapping } from "../../../pageShared";


class StockUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brandArr: [],
            selectedBrandObj: {},
            sizeSpecsArr: [],
            selectedSizeObj: {},
            unitArr: [],
            selectedUnitObj: {},
            quantity: "",
            quantityActive: false,

            pageLoader: true,
            formLoader: true,

            remark: "",
            remarkActive: false,

            allStockUpdate: [],
            allStockUpdateShow: [],
            productObj: {},
            productArr: [],
            productLoader: false,
            customerData: {},
            customerId:""
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let customerData = await StorageDataModification.selectedCustomerData({}, "get");
        this.setState({ customerId: customerData.customerId, customerData: customerData })

        await this._onGetUnitData();
        await this._onBrandDropDownData();
        this.setState({
            formLoader: false,
            pageLoader: false,
        });
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _OnSelectBrand = async (value) => {
        let data = this.state.brandArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.selectedBrandObj = value;
        this.setState({
            selectedBrandObj: this.state.selectedBrandObj,
            brandArr: data,
        })
        await this._onGetSizeSpecs(value)
    }
    _onBrandDropDownData = async () => {
        this.setState({ pageLoader: true });
        let responseData = await MiddlewareCheck("getProductCategory", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    brandArr: modifyBrandArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false });
    }

    _OnSelectSizeSpecs = async (value) => {
        let data = this.state.sizeSpecsArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.state.selectedSizeObj = value;
        this.setState({
            selectedSizeObj: this.state.selectedSizeObj,
            sizeSpecsArr: data,
        })
    }

    _onGetSizeSpecs = async (value) => {
        this.setState({ sizeLoader: true })
        let reqData = {
            // "customerId":this.props.route.params.data.customerId,
            "brand": value.id
        }
        let responseData = await MiddlewareCheck("addProductSIzeSpec", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    sizeSpecsArr: modifySizeSpecsArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ sizeLoader: false })
    }

    _OnSelectunit = async (value) => {
        let data = this.state.unitArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.selectedUnitObj = value;
        this.setState({
            selectedUnitObj: this.state.selectedUnitObj,
            unitArr: data,
        })
    }

    _onGetUnitData = async () => {
        let responseData = await MiddlewareCheck("getAllMasterUnitList", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    unitArr: modifyUnitArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onQuantity = (value) => {
        this.state.quantity = value;
        this.setState({
            quantity: this.state.quantity
        })
    }

    clearFieldData = async () => {
        this.state.selectedBrandObj = {};
        this.state.selectedSizeObj = {};
        this.state.selectedUnitObj = {};
        this.state.quantity = "";
        this.state.sizeSpecsArr = [];

        this.setState({
            selectedBrandObj: this.state.selectedBrandObj,
            selectedSizeObj: this.state.selectedSizeObj,
            selectedUnitObj: this.state.selectedUnitObj,
            quantity: this.state.quantity,
            sizeSpecsArr: this.state.sizeSpecsArr
        })
    }

    _onSubmit = async () => {
        if (this.state.allStockUpdate.length > 0) {
            this.setState({ pageLoader: true });
            let reqData = {
                "customerId": this.props.route.params.data.customerId,
                "fieldVisitId": this.props.route.params.data.id,
                "stockArrValues": this.state.allStockUpdate,
                "zoneId": "",
                "hierarchyDataId": this.state.productObj.hierarchyDataId,
                "hierarchyTypeId": this.state.productObj.hierarchyTypeId,
                "hierarchyDataIdArr": this.state.customerData.locationDataRaw,


            }
            // let responseData = await MiddlewareCheck("addStockUpdate", reqData, this.props)
            // if (responseData) {
            //     if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            //         Toaster.ShortCenterToaster(responseData.data.message)
            //         this.props.onSaveDataToParent({ pageNum: 2, isStockUpdateCompleted: true })
            //         this.props.route.params.onStockUpdateAdd();
            //     }
            //     else {
            //         Toaster.ShortCenterToaster(responseData.message)
            //     }
            // }
            this.setState({ pageLoader: false });
        } else {
            Toaster.ShortCenterToaster("Please add atleast a stock !")
        }
    }

    _modifyAddDataArr = () => {
        let mainArr = [];
        let tempArr = [];
        for (let i = 0; i < this.state.allStockUpdate.length; i++) {
            tempArr = [...tempArr, ...[this.state.allStockUpdate[i]]]
            if (i % 2 == 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }

            if (this.state.allStockUpdate.length % 2 == 1) {
                if (i == this.state.allStockUpdate.length - 1) {
                    mainArr = [...mainArr, ...[tempArr]]
                    tempArr = [];
                }
            }
        }

        this.state.allStockUpdateShow = mainArr;
        this.setState({
            allStockUpdateShow: this.state.allStockUpdateShow
        })
    }

    _onClose = (item, key) => {
        let arr = this.state.allStockUpdate;
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {

            } else {
                tempArr.push(arr[i]);
            }
        }
        this.state.allStockUpdate = tempArr;
        this.setState({
            allStockUpdate: this.state.allStockUpdate
        })
        this._modifyAddDataArr();
    }

    addmoreButton = async () => {
        let validatedData = validateData(this.state);
        if (validatedData.status) {
            this.setState({ formLoader: true })
            let remark = this.state.selectedSizeObj.name + " - " + this.state.quantity + this.state.selectedUnitObj.name;
            let allStock = this.state.allStockUpdate;
            let allObj = {
                "brand": this.state.selectedBrandObj.id ? this.state.selectedBrandObj.id : "",
                "productId": this.state.selectedSizeObj.id ? this.state.selectedSizeObj.id : "",
                "stockValue": this.state.quantity,
                "stockUnit": this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id : "",
                "remark": remark,
                "size": this.state.selectedSizeObj.name ? this.state.selectedSizeObj.name : "",
                "quanity": this.state.quantity,
                "unit": this.state.selectedUnitObj.name ? this.state.selectedUnitObj.name : ""
            };
            allStock.push(allObj);
            this.state.allStockUpdate = allStock;
            this.setState({
                allStockUpdate: this.state.allStockUpdate
            })
            this._modifyAddDataArr()
            await this.clearFieldData();
            this.setState({ formLoader: false })
        }
    }

    onSelectLocationData = (val) => {
        this.setState({ productObj: val.value, productArr: val.totalData })
    }

    filledData = () => {
        return (
            <React.Fragment>
                {this.state.formLoader ?
                    <View style={{ height: Dimension.height / 4, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} />
                    </View>
                    :
                    <>
                        <View>
                            {/* <View style={{ marginTop: 25 }}>
                                <DropdownInputBox
                                    selectedValue={this.state.selectedBrandObj.id ? this.state.selectedBrandObj.id.toString() : "0"}
                                    data={this.state.brandArr}
                                    onSelect={(value) => this._OnSelectBrand(value)}
                                    headerText={"Brand"}
                                />
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <View style={{ flex: 1 }}>
                                    {this.state.sizeLoader ?
                                        <>
                                            <ActivityIndicator />
                                        </>
                                        :
                                        <>
                                            <DropdownInputBox
                                                selectedValue={this.state.selectedSizeObj.id ? this.state.selectedSizeObj.id.toString() : "0"}
                                                data={this.state.sizeSpecsArr}
                                                onSelect={(value) => this._OnSelectSizeSpecs(value)}
                                                headerText={"Size Specs"}
                                            />
                                        </>
                                    }
                                </View>
                            </View> */}
                            <View style={{ marginTop: 10 }}>
                                {this.state.productLoader ?
                                    null
                                    :
                                    <DynamicProductMapping
                                        flexDirection={"row"}
                                        viewType={"add"}
                                        marginBottom={5}
                                        onApiCallData={(value) => this.onSelectLocationData(value)}
                                    />
                                }
                            </View>
                            <View style={{ marginTop: 25, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: '2%' }}>
                                    <TextInputBox
                                        placeholder={"Quantity"}
                                        value={this.state.quantity}
                                        height={45}
                                        onChangeText={(value) => this._onQuantity(value)}
                                        keyboardType="numeric"
                                        isActive={this.state.quantityActive}
                                        onFocus={() => { this.setState({ quantityActive: true }) }}
                                        onBlur={() => { this.setState({ quantityActive: false }) }}
                                        maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: '2%' }}>
                                    {this.state.unitLoader ?
                                        <>
                                            <ActivityIndicator />
                                        </>
                                        :
                                        <>
                                            <DropdownInputBox
                                                selectedValue={this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "0"}
                                                data={this.state.unitArr}
                                                onSelect={(value) => this._OnSelectunit(value)}
                                                headerText={"Unit"}
                                            />
                                        </>
                                    }
                                </View>
                            </View>
                        </View>
                    </>
                }

            </React.Fragment>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header onRefresh={() => console.log("")} {...this.props} />
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        {this.filledData()}
                        <View style={{ flexDirection: 'row', marginTop: 35 }}>
                            <View style={{ flex: 1, marginRight: '2%' }}>
                                <BigTextButton
                                    height={45}
                                    borderRadius={16}
                                    fontSize={FontSize.SM}
                                    text={"Submit"}
                                    onPress={() => this._onSubmit()}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: '2%' }}>
                                <BigTextButton
                                    borderRadius={16}
                                    text={"Add Stock"}
                                    isLeftIcon={true}
                                    leftIcon={ImageName.ADD_YELLOW}
                                    leftIconStyle={{ height: 20, width: 20 }}
                                    onPress={() => this.addmoreButton()}
                                />
                            </View>
                        </View>
                        {this.state.allStockUpdateShow.map((item, key) => (
                            <React.Fragment key={key}>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        {item.map((item1, key1) => (
                                            <React.Fragment key={key1}>
                                                <View style={styles.flexANdMarginView}>
                                                    <View style={styles.timeSec}>
                                                        <Text style={styles.textTime}>{item1.size}{" - "}<Text style={styles.textTime}>{item1.quanity}</Text><Text style={styles.textTime}>{item1.unit}</Text></Text>
                                                        <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                            <TouchableOpacity style={styles.crossBtnImg} onPress={() => this._onClose(item1, key1)}
                                                                activeOpacity={0.9}>
                                                                <Image style={styles.crossImg} source={ImageName.WHITE_CROSS} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </React.Fragment>
                                        ))}
                                    </View>
                                </View>
                            </React.Fragment>
                        ))}
                        <View style={{ marginBottom: 120 }} />
                    </ScrollView>
                }
            </SafeAreaView>
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdate);