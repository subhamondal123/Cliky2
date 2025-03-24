import React from "react";
import {
    View,
    ScrollView,
    Text,
} from "react-native";
import { Color, Dimension } from "../../../../../enums";
import { StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { BigTextButton, CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../shared";
import { modifyCustomerType, modifyLocationMappedData, modifyPageData, modifyProductArr, validateData } from "./function";
import styles from "./style";
import { DynamicProductMapping } from "../../../../../pageShared";

class BusinessDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            productLoader: false,
            allCustomerType: [],
            allProductType: []
        }
    }

    componentDidMount = async () => {
        await this.load();
        await this._getProductHierarchyTypesSlNo()
    }

    load = async () => {
        this.setState({
            allPageData: this.props.allPageData,
            pageloader: false
        })
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

    _onFetchCustomerType = async () => {
        let responseData = await MiddlewareCheck("getContactTypes", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allCustomerType: modifyCustomerType(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onFetchProductList = async () => {
        let responseData = await MiddlewareCheck("productListDropdown", {}, this.props)
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allProductType: modifyProductArr(responseData.data)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    visitType = () => {
        const _onSelectVisitorType = (value) => {
            this.state.allPageData.selectedVisitorTypeObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Business Type</Text> */}
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedVisitorTypeObj.id ? this.state.allPageData.selectedVisitorTypeObj.id.toString() : ""}
                    data={this.state.allPageData.allCustomerType}
                    onSelect={(value) => _onSelectVisitorType(value)}
                    headerText={"Visitor Type*"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    orgName = () => {
        const _onChangeOrgName = (value) => {
            this.state.allPageData.orgName = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}>Business Name</Text> */}
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.orgName}
                    onChangeText={(value) => _onChangeOrgName(value)}
                    placeholder={"Organization Name*"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.orgNameActive}
                    onFocus={() => {
                        this.state.allPageData.orgNameActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.orgNameActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                />
            </View>
        )
    }

    ownerName = () => {
        const _onChangeOwnerName = (value) => {
            this.state.allPageData.ownerName = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }
        return (
            <View style={{ marginBottom: 15 }}>
                {/* <Text style={styles.labelText}>Business Name</Text> */}
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={this.state.allPageData.ownerName}
                    onChangeText={(value) => _onChangeOwnerName(value)}
                    placeholder={"Owner Name*"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.ownerNameActive}
                    onFocus={() => {
                        this.state.allPageData.ownerNameActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.ownerNameActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                />
            </View>
        )
    }


    onSelectLocationData = (val) => {
        this.state.allPageData.productArr = val.totalData
        this.state.allPageData.productData = val.value
        this.setState({ allPageData: this.state.allPageData })
    }

    productSection = () => {
        // const _onSelectProduct = (value) => {
        //     this.state.allObjData.selectedProduct = value;
        //     this.setState({
        //         allObjData: this.state.allObjData
        //     })
        // }
        return (
            <View style={{ marginBottom: 15 }}>
                <View style={{ height: 10 }} />
                {/* <DropdownInputBox
                    selectedValue={this.state.allObjData.selectedProduct.id ? this.state.allObjData.selectedProduct.id.toString() : ""}
                    data={this.state.allProductType}
                    onSelect={(value) => _onSelectProduct(value)}
                    headerText={"Product*"}
                    // selectedText={this.state.selectedBusinessTypeObj.name ? this.state.selectedBusinessTypeObj.name : "Business Type"}
                    // selectedTextColor={this.state.selectedBusinessTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                /> */}
                {/* <View style={styles.inputBoxStyle} >
                    <Text style={[styles.inputBoxText, { color: "#0A0A0A" }]} numberOfLines={1}>{this.props.route.params.data.productName}</Text>

                </View> */}
                {this.state.productLoader ?
                    null
                    :
                    <DynamicProductMapping
                        editData={this.state.allPageData.productArr}
                        flexDirection={"row"}
                        viewType={"edit"}
                        marginBottom={15}
                        onApiCallData={(value) => this.onSelectLocationData(value)}
                    />
                }
            </View>
        )
    }

    buttonSection = () => {
        const _onNext = () => {
            let validateResult = validateData(this.state.allPageData);
            if (validateResult.status) {
                let reqData = {
                    "productData": this.state.allPageData.productData,
                    // "productId": this.props.route.params.data.productId ? this.props.route.params.data.productId.toString() : "0",
                    "visitorTypeId": this.state.allPageData.selectedVisitorTypeObj.id ? this.state.allPageData.selectedVisitorTypeObj.id.toString() : "0",
                    "organizationName": this.state.allPageData.orgName,
                    "ownerName": this.state.allPageData.ownerName,

                }
                this.props.onParentCallBack({ pageNum: 2, data: reqData })
            }
        }
        return (
            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                <BigTextButton
                    text={"Next"}
                    color={Color.COLOR.BLUE.EBONY_CLAY}
                    onPress={() => _onNext()}
                />
            </View>
        )
    }


    mainContent = () => {
        return (
            <View style={styles.container}>
                <View style={styles.blueBox}>
                    <View style={styles.blueViewFlex}>
                        <Text style={styles.listHeaderText}>Business Details</Text>
                    </View>
                </View>

                {this.visitType()}
                {this.orgName()}
                {this.ownerName()}
                {/* {this.dealsWith()} */}
                {this.productSection()}
                {this.buttonSection()}
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

                        {this.mainContent()}

                    </ScrollView>
                }
            </View>
        )
    }
}

export default BusinessDetails;