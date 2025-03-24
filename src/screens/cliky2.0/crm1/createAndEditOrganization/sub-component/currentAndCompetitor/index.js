import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { modifyLocationMappedData, modifyProductMappedData, validateData } from "./function";
import styles from "./style";
import { StorageDataModification } from "../../../../../../services/common-view-function";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DynamicProductMapping } from "../../../../../../pageShared";
import { ErrorCode } from "../../../../../../services/constant";

class CurrentAndCompetitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            productLoader: false,
            allPageData: {},
            productData: [
                {
                    selectedProductName: {},
                    productDesc: "",
                    productDescActive: false,
                    isCurrentlyCheck: false,
                    isCompetitorCheck: false
                }
            ],
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getProductHierarchyTypesSlNo()
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }


    // for get the get Hierarchy Types With Sl No for Products
    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ productLoader: true })
        if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.productMappedUserArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ productLoader: false })
        return true;
    }


    _onCheckCurrentlyUsing = (value, key) => {
        let productArr = this.state.allPageData.productData;
        for (let i = 0; i < productArr.length; i++) {
            if (i == key) {
                if (value == true) {
                    productArr[i].isCurrentlyCheck = value;
                    productArr[i].isCompetitorCheck = false
                }
            }
        }

        this.state.allPageData.productData = productArr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onCheckCompetitor = (value, key) => {
        let productArr = this.state.allPageData.productData;
        for (let i = 0; i < productArr.length; i++) {
            if (i == key) {
                if (value == true) {
                    productArr[i].isCompetitorCheck = value;
                    productArr[i].isCurrentlyCheck = false
                }
            }
        }

        this.state.allPageData.productData = productArr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectProductName = (value, key) => {
        this.state.allPageData.productData[key].selectedProductName = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeProductDesc = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.productData[key].productDesc = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onBack = () => {
        let data = {
            type: "previous",
            pageNum: 4
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let allArr = this.state.allPageData.productData;
        let modArr = [];

        for (let i = 0; i < allArr.length; i++) {
            let modObj = {
                "hierarchyTypeId": allArr[i].hierarchyTypeId,
                "hierarchyDataId": allArr[i].hierarchyDataId,
                "productArr": allArr[i].productArr,
                productDescription: allArr[i].productDesc ? allArr[i].productDesc : "",
                competitorType: allArr[i].isCurrentlyCheck ? "0" : allArr[i].isCompetitorCheck ? "1" : "",
            };

            modArr.push(modObj);
        }


        let reqData = {
            productArr: modArr
        }
        let validData = validateData(reqData);
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 6,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }

    }
    onSelectLocationData = (val, key) => {
        let allArr = this.state.allPageData.productData;

        allArr[key].hierarchyTypeId = val.value.hierarchyTypeId
        allArr[key].hierarchyDataId = val.value.hierarchyDataId
        allArr[key].productArr = val.totalData
        this.state.allPageData.productData = allArr
        this.setState({ allPageData: this.state.allPageData })
    }

    _leadProductSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.GRAY.DAVY_GRAY, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => this._onDeleteArray(key)}>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }
                    <View style={{ marginBottom: 10 }}>
                        {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Product Name</Text> */}
                        <View style={{ height: 10 }} />
                        {this.state.productLoader ?
                            null
                            :
                            <DynamicProductMapping
                                editData={item.productArr}
                                flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => this.onSelectLocationData(value, key)}
                            />
                        }
                        {/* <DropdownInputBox
                            selectedValue={item.selectedProductName.id ? item.selectedProductName.id.toString() : "0"}
                            data={this.state.allPageData.productNameArr}
                            onSelect={(value) => this._onSelectProductName(value, key)}
                            headerText={"Product Name*"}
                            // selectedText={item.selectedProductName.name ? item.selectedProductName.name : "Select Lead  Source"}
                            // selectedTextColor={item.selectedProductName.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        /> */}
                    </View>

                    <View style={{ marginBottom: 10, paddingHorizontal: 5 }}>
                        {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Product Description</Text> */}
                        {/* <View style={{ height: 10 }} /> */}
                        <TextInputBox
                            value={item.productDesc}
                            onChangeText={(value) => this._onChangeProductDesc(value, key)}
                            placeholder={"Enter Product Description"}
                            keyboardType={"default"}
                            isActive={item.productDescActive}
                            onFocus={() => {
                                this.state.allPageData.productData[key].productDescActive = true;
                                this.setState({
                                    allPageData: this.state.allPageData
                                })
                            }}
                            onBlur={() => {
                                this.state.allPageData.productData[key].productDescActive = false;
                                this.setState({
                                    allPageData: this.state.allPageData
                                })
                            }}
                            height={45}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <View style={{ height: 10 }} />

                        <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} >
                            <CheckBox
                                type={"round"}
                                borderRadius={30}
                                data={item.isCurrentlyCheck}
                                onClickValue={(value) => this._onCheckCurrentlyUsing(value, key)}
                            />
                            <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Currently using</Text>
                        </View>

                        <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} >
                            <CheckBox
                                type={"round"}
                                borderRadius={30}
                                data={item.isCompetitorCheck}
                                onClickValue={(value) => this._onCheckCompetitor(value, key)}
                            />
                            <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Competitor</Text>
                        </View>


                    </View>
                </View>
            </React.Fragment>
        )
    }

    _addAnother = () => {
        let obj = {
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "productArr": [],
            productDesc: "",
            productDescActive: false,
            isCurrentlyCheck: false,
            isCompetitorCheck: false
        }
        let arr = this.state.allPageData.productData;
        arr.push(obj);
        this.state.allPageData.productData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteArray = (key) => {
        let arr = this.state.allPageData.productData;
        arr.splice(key, 1);
        this.state.allPageData.productData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <>
                        <Loader />
                    </>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Current & Competitor</Text>
                                </View>
                            </View>

                            {this.state.allPageData.productData.map((item, key) => (
                                this._leadProductSection(item, key)
                            ))}

                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 15 }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                    onPress={() => this._addAnother()}
                                >
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={"Save & Next"}
                                    onPress={() => this._onSave()}
                                />
                            </View>

                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default CurrentAndCompetitor;