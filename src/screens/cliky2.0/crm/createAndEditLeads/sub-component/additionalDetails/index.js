import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { DateConvert, StorageDataModification, Toaster } from "../../../../../../services/common-view-function";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { districtModifyData, modifyDistrictArrData, modifyEmailObject, modifyLocationMappedData, modifyPhoneNumberObject, modifyStateArrData, modifyZoneArrData, stateModifyData, validateData, zoneModifyData } from "./function";
import styles from "./style";
import { DynamicProductMapping } from "../../../../../../pageShared";
import DatePicker from "react-native-date-picker";



class BusinessDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            locationLoader: false,
            productLoader: false,
        };
    }

    componentDidMount = async () => {
        await this._getProductHierarchyTypesSlNo()
        await this._onLoad();
    }

    _onLoad = async () => {

        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }


    // for get the get Hierarchy Types With Sl No for Products
    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ productLoader: true })
        let mappedProductData = await StorageDataModification.mappedProductData({}, "get")
        // if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
        let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, mappedProductData), "store");
            } else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
        // }
        this.setState({ productLoader: false })
        return true;
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError")
    }

    _onSelectCurrencyType = (value) => {
        this.state.allPageData.selectedCurrencyObj = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }

    _onSelectProbabilityPrcnt = (value) => {
        this.state.allPageData.selectedProbabilityObj = value;
        this.setState({
            allPageData: this.state.allPageData,
        })
    }

    _onChangeOrganization = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.organizationName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLeadValue = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.leadValue = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLeadAge = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.leadAge = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeOwnLeadValue = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.ownLeadValue = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeOwnerName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.ownerName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.businessPhoneArr[key].phone = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        this.state.allPageData.businessEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "address");
        this.state.allPageData.businessAddress = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    modifyProductArrData = (arr) => {
        let arrData = [];
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["hierarchyDataId"] = arr[i].hierarchyDataId
            modObj["hierarchyTypeId"] = arr[i].hierarchyTypeId

            arrData.push(modObj)
        }
        return arrData
    }

    _onBack = () => {
        let data = {
            pageNum: 2,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let reqData = {
            leadValue: this.state.allPageData.leadValue,
            leadCurrencyType: this.state.allPageData.selectedCurrencyObj.shortName ? this.state.allPageData.selectedCurrencyObj.shortName : "",
            productArr: this.state.allPageData.productData ? this.modifyProductArrData(this.state.allPageData.productData) : [],
            closingDate: this.state.allPageData.fromDateObj.fromDate,
            probability: this.state.allPageData.probability,
            leadAge: this.state.allPageData.leadAge,
            leadOwnValue: this.state.allPageData.ownLeadValue,
            masterMdouleTypeId: "20"
        }
        let validData = validateData(reqData, this.props)
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 3,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }

    }
    onSelectLocationData = (val, key) => {
        this.state.allPageData.productData[key].hierarchyDataId = val.value.hierarchyDataId
        this.state.allPageData.productData[key].hierarchyTypeId = val.value.hierarchyTypeId
        this.state.allPageData.productData[key].productArr = val.totalData
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
                    <View style={{ marginBottom: 15, }}>
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
                    </View>
                </View>
            </React.Fragment>
        )
    }

    _addAnother = () => {
        let obj = {
            selectedProductName: {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "productArr": [],
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

    _onFromDatePicker = (type) => {
        if (this.state.allPageData.fromDatePicker) {
            this.state.allPageData.fromDatePicker = false
        } else {
            this.state.allPageData.fromDatePicker = true
        }

        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectFromDate = (date) => {
        this.state.allPageData.fromDateObj.rawDate = date.date;
        this.state.allPageData.fromDateObj.fromDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            allPageData: this.state.allPageData
        });
    }


    dateSection = () => {
        return (
            <View style={{ marginBottom: 15 }}>
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onFromDatePicker(true)} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, this.state.allPageData.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.allPageData.fromDateObj.fromDate.length == 0 ? "Closing Date*" : this.state.allPageData.fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={this.state.allPageData.fromDatePicker}
                    date={this.state.allPageData.fromDateObj.rawDate}
                    mode={"date"}
                    minimumDate={new Date()}
                    onConfirm={(date) => {
                        this._onSelectFromDate({ date })
                    }}
                    onCancel={() => {
                        this._onFromDatePicker(false)
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Additional Details</Text>
                                </View>
                            </View>
                            <React.Fragment>
                                <View style={{ marginVertical: 15, flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flex: 0.6 }}>
                                        <TextInputBox
                                            value={this.state.allPageData.leadValue}
                                            onChangeText={(value) => this._onChangeLeadValue(value)}
                                            placeholder={"Lead Value*"}
                                            keyboardType={"number-pad"}
                                            isActive={this.state.allPageData.leadValueActive}
                                            onFocus={() => { this.state.allPageData.leadValueActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                            onBlur={() => { this.state.allPageData.leadValueActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                            height={45}
                                            returnKeyType={'default'}
                                        />
                                    </View>
                                    <View style={{ flex: 0.4, marginLeft: 10 }}>
                                        <DropdownInputBox
                                            selectedValue={this.state.allPageData.selectedCurrencyObj.id ? this.state.allPageData.selectedCurrencyObj.id.toString() : "0"}
                                            data={this.state.allPageData.currencyArr}
                                            onSelect={(value) => this._onSelectCurrencyType(value)}
                                            headerText={"Currency*"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                            fontSize={12}
                                        />
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
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.dateSection()}
                                <View style={{ marginBottom: 15, }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.probability}
                                        onChangeText={(value) => this._onChangeLeadAge(value)}
                                        placeholder={"Lead Age (In Days)*"}
                                        keyboardType={"number-pad"}

                                        isActive={this.state.allPageData.leadAgeActive}
                                        onFocus={() => { this.state.allPageData.leadAgeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.leadAgeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        returnKeyType={'default'}
                                        editable={false}
                                    />
                                    {/* <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedProbabilityObj.id ? this.state.allPageData.selectedProbabilityObj.id.toString() : "0"}
                                        data={this.state.allPageData.probabilityArr}
                                        onSelect={(value) => this._onSelectProbabilityPrcnt(value)}
                                        headerText={"Probabilty %*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    /> */}
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.leadAge}
                                        onChangeText={(value) => this._onChangeLeadAge(value)}
                                        placeholder={"Lead Age (In Days)*"}
                                        keyboardType={"number-pad"}

                                        isActive={this.state.allPageData.leadAgeActive}
                                        onFocus={() => { this.state.allPageData.leadAgeActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.leadAgeActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        returnKeyType={'default'}
                                        editable={false}
                                    />
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <TextInputBox
                                        value={this.state.allPageData.ownLeadValue}
                                        onChangeText={(value) => this._onChangeOwnLeadValue(value)}
                                        placeholder={"Own Lead Value*"}
                                        keyboardType={"number-pad"}

                                        isActive={this.state.allPageData.ownLeadValueActive}
                                        onFocus={() => { this.state.allPageData.ownLeadValueActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                        onBlur={() => { this.state.allPageData.ownLeadValueActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                        height={45}
                                        returnKeyType={'default'}
                                    />
                                </View>
                            </React.Fragment>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={this.props.route.params.type == "edit" ? "Update" : "Submit"}
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

export default BusinessDetails;