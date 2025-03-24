import React from "react";
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,

} from 'react-native';
import DatePicker from "react-native-date-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AlertMessage, Color, Dimension, ImageName } from "../../../../enums";
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action'
import { CommonFunctions, DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { getAllUserData } from "../../../../services/common-view-function/getUserData";
import { App_uri } from "../../../../services/config";
import { ErrorCode, LengthValidate } from "../../../../services/constant";
import { MiddlewareCheck } from "../../../../services/middleware";
import { BigTextButton, CheckBox, DropdownInputBox, Loader, Modal, TextInputBox } from "../../../../shared";
import { DataValidator } from "../../../../validators";
import { CustomStyle } from "../../../style";
import { modifyContactArr, modifyContactList, modifyConversionLanding, modifyCustomerArr, modifySizeSpecsArr, modifyStatgeArr, validateConversionData, validateProductItem, _modifyAddDataArr, getProductName, modifyLocationMappedData } from "./Function";
import styles from "./Style";
import { DynamicProductMapping } from "../../../../pageShared";

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allProductItemArr: [],
            allProductItemShowingArr: [],
            allSizes: [],
            selectedSizes: {},
            allBrand: [],
            selectedBrand: {},
            remarks: "",
            remarksActive: false,
            quantity: "",
            quantityActive: false,
            allUnit: [],
            selectedUnitObj: {},
            allCustomer: [],
            selectedCustomer: {},
            allContact: [],
            selectedContact: {},
            allLiftedFromContactType: [],
            selectedLiftedFromContactType: {},
            searchText: "",
            searchActive: false,

            liftedFromModal: false,
            customerArr: [],
            selectedLiftFromCustomer: {},
            isLeadOrOpportunity: true,
            allStage: [],
            selectedStage: {},
            countryId: "",
            datePicker: false,
            dateObj: {
                rawDate: new Date(),
                selectedDate: ""
            },
            productObj: {},
            productArr: [],
            productLoader: false,

            mappedProductArr: []
        }
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this.setMappedProductData()
        await this.loadConversionLandingData();
        // await this._fetchContactList();
        await this.loadCustomerTypesArr();
        await this._getProductHierarchyTypesSlNo()
        this.getCustomerName(this.state.allCustomer);
        await this.getLeadAndOpportunityStages();
        this.getContactName(this.state.allContact);
        let userData = await getAllUserData()
        this.setState({ pageLoader: false, countryId: userData.countryId });
    }

    setMappedProductData = async () => {
        let mappedProductData = await StorageDataModification.mappedProductData({}, "get")
        this.setState({ mappedProductArr: mappedProductData })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    loadConversionLandingData = async () => {
        let responseData = await MiddlewareCheck("conversionAllLanding", {}, this.props);
        let modifiedData = {};
        if (responseData == false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                modifiedData = await modifyConversionLanding(responseData.data);
                this.state.allBrand = modifiedData.brandingList;
                // this.state.allCustomer = modifiedData.customerList;
                // this.state.allContact = modifiedData.enquiryList;
                this.state.allUnit = modifiedData.unitList;
                this.setState({
                    allBrand: this.state.allBrand,
                    // allCustomer: this.state.allCustomer,
                    // allContact: this.state.allContact,
                    allUnit: this.state.allUnit
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ productLoader: true })
        // if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, this.state.mappedProductArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        // }
        this.setState({ productLoader: false })
        return true;
    }



    getCustomerName = (customerArr) => {
        this.state.selectedCustomer = {
            "id": this.props.route.params.data.leadId ? this.props.route.params.data.leadId : "",
            // "name": this.props.route.params.data.customerName ? this.props.route.params.data.customerName : "",
            "name": this.props.route.params.data.contactFullName == null || this.props.route.params.data.organizationName == undefined ? this.props.route.params.data.contactFullName : this.props.route.params.data.organizationName
        }

        this.setState({
            selectedCustomer: this.state.selectedCustomer
        })
    }

    getContactName = (customerArr) => {
        // let modObj = {};
        // customerArr.map((obj) => {
        //     if (obj.id == this.props.route.params.data.customerId) {
        //         modObj = {
        //             id: obj.id,
        //             name: obj.name
        //         }
        //     }
        // })

        // this.setState({
        //     selectedContact: modObj
        // })

        this.state.selectedContact = {
            "id": this.props.route.params.data.customerId ? this.props.route.params.data.customerId : "",
            // "name": this.props.route.params.data.customerName ? this.props.route.params.data.customerName : "",
            "name": this.props.route.params.data.custBusinessName == null || this.props.route.params.data.custBusinessName == undefined ? this.props.route.params.data.customerName : this.props.route.params.data.custBusinessName
        }

        this.setState({
            selectedContact: this.state.selectedContact
        })
    }

    // _fetchContactList = async () => {
    //     let responseData = await MiddlewareCheck("getAllDropdownForTarget", {}, this.props);
    //     if (responseData == false) {
    //         this._onNetworkError();
    //     } else {
    //         if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //             this.state.allContact = modifyContactList(responseData.data.contactList);
    //             this.setState({
    //                 allContact: this.state.allContact
    //             })
    //         } else {
    //             Toaster.ShortCenterToaster(responseData.message)
    //         }
    //     }
    // }

    loadCustomerTypesArr = async () => {
        let responseData = await MiddlewareCheck("getCustomersType", {}, this.props);
        if (responseData == false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allLiftedFromContactType = modifyContactArr(responseData.data);
                this.setState({
                    allLiftedFromContactType: this.state.allLiftedFromContactType
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getLeadAndOpportunityStages = async () => {
        this.setState({ stageSectionLoader: true })
        let responseData = await MiddlewareCheck("getLeadOpportunityStages", { "salesStageFor": this.state.isLeadOrOpportunity ? "1" : "2" }, this.props);
        if (responseData == false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allStage = modifyStatgeArr(responseData.data);
                this.setState({
                    allStage: this.state.allStage
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ stageSectionLoader: false })
    }

    customerSection = () => {
        return (
            <View style={{ marginTop: 10, marginBottom: 10 }}>
                <View style={styles.inputBoxStyle}>
                    <Text style={[styles.inputBoxText, { color: this.state.selectedCustomer.id ? "#0A0A0A" : "#C0C0C0" }]} numberOfLines={1}>{this.props.route.params.data.firstName + this.props.route.params.data.lastName ? this.props.route.params.data.firstName + " " + this.props.route.params.data.lastName : "Contact"}</Text>
                </View>
            </View>
        )
    }

    contactSection = () => {
        return (
            <View style={{ marginTop: 10, marginBottom: 10 }}>
                <View style={styles.inputBoxStyle} >
                    <Text style={[styles.inputBoxText, { color: this.state.selectedContact.id ? "#0A0A0A" : "#C0C0C0" }]} numberOfLines={1}>{this.state.selectedContact.name ? this.state.selectedContact.name : "Contact"}</Text>
                </View>
            </View>
        )
    }

    brandSection = () => {
        const _onSelectBrand = async (value) => {
            this.setState({
                selectedBrand: value
            })
            await this._onGetSizeSpecs(value);
        }
        return (
            <View style={{ marginTop: 15 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedBrand.id ? this.state.selectedBrand.id.toString() : "0"}
                    data={this.state.allBrand}
                    onSelect={(value) => _onSelectBrand(value)}
                    headerText={"Brand"}
                />
            </View>
        )
    }

    sizesection = () => {
        const _onSelectSize = (value) => {
            this.setState({
                selectedSizes: value
            })
        }
        return (
            <View style={{ marginTop: 10 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedSizes.id ? this.state.selectedSizes.id.toString() : "0"}
                    data={this.state.allSizes}
                    onSelect={(value) => _onSelectSize(value)}
                    headerText={"Size"}
                />
            </View>
        )
    }

    _onGetSizeSpecs = async (value) => {
        this.setState({ sizeLoader: true })
        let reqData = {
            "brand": value.id
        }
        let responseData = await MiddlewareCheck("addProductSIzeSpec", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allSizes: modifySizeSpecsArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ sizeLoader: false })
    }

    remarksSection = () => {
        const changeText = (value) => {
            this.setState({
                remarks: value
            })
        }
        return (
            <React.Fragment>
                <View style={{ marginTop: 10, }}>
                    <TextInputBox
                        placeholder={"Remarks"}
                        height={45}
                        value={this.state.remarks}
                        onChangeText={(value) => changeText(value)}
                        isActive={this.state.remarksActive}
                        onFocus={() => { this.setState({ remarksActive: true }) }}
                        onBlur={() => { this.setState({ remarksActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    quantitySection = () => {
        const changeText = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.setState({
                quantity: newText
            })
        }
        const _onSelectUnit = (value) => {
            this.setState({
                selectedUnitObj: value
            })
        }
        return (
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Quantity"}
                        height={45}
                        value={this.state.quantity}
                        onChangeText={(value) => changeText(value)}
                        keyboardType={"numeric"}
                        isActive={this.state.quantityActive}
                        onFocus={() => { this.setState({ quantityActive: true }) }}
                        onBlur={() => { this.setState({ quantityActive: false }) }}
                        maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                    />
                </View>
                <View style={{ width: 5 }} />
                <View style={{ flex: 1 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "0"}
                        data={this.state.allUnit}
                        onSelect={(value) => _onSelectUnit(value)}
                        headerText={"Unit"}
                        height={45}
                    // selectedText={this.state.selectedBrand.name ? this.state.selectedBrand.name : "Brand"}
                    />
                </View>
            </View>
        )
    }
    setProductLoader = async () => {
        this.state.productLoader = true;
        this.setState({ productLoader: this.state.productLoader })
    }

    brandSizeQuantityArrSection = () => {
        const _onAddMore = async () => {
            let id = Date.now();
            let remark = getProductName(this.state.productArr) + " - " + this.state.quantity + this.state.selectedUnitObj.name;
            let productData = {
                // "id": id.toString(),
                // "productObj": this.state.productObj,
                // "hierarchyDataId": this.state.productObj.hierarchyDataId,
                // "hierarchyTypeId": this.state.productObj.hierarchyTypeId,
                // "quantity": this.state.quantity,
                // "unit": this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "",
                // "remark": remark,
                // "brand": "",
                // "size": "",

                "id": id.toString(),
                "brand": "",
                "size": "",
                "quantity": this.state.quantity,
                "unit": this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "",
                "hierarchyDataId": this.state.productObj.hierarchyDataId,
                "hierarchyTypeId": this.state.productObj.hierarchyTypeId,
                "remark": remark,
                "productObj": this.state.productObj,


            }
            let validationStatus = validateProductItem(productData);
            if (validationStatus) {
                await this.setProductLoader()
                let allItem = this.state.allProductItemArr;
                allItem.push(productData);
                this.state.allProductItemArr = allItem;
                this.state.allProductItemShowingArr = _modifyAddDataArr(allItem);
                this.setState({
                    allProductItemArr: this.state.allProductItemArr,
                    allProductItemShowingArr: this.state.allProductItemShowingArr,
                    allSizes: [],
                    productObj: {},
                    selectedSizes: {},
                    selectedBrand: {},
                    selectedUnitObj: {},
                    quantity: "",
                    quantityActive: false,
                    productLoader: false
                });

            }
        }

        const _onDeleteItem = (item, key) => {
            let allItem = this.state.allProductItemArr;
            let tempArr = [];
            for (let i = 0; i < allItem.length; i++) {
                if (item.id == allItem[i].id) {

                } else {
                    tempArr.push(allItem[i]);
                }
            }
            this.state.allProductItemArr = tempArr;
            this.state.allProductItemShowingArr = _modifyAddDataArr(tempArr);
            this.setState({
                allProductItemArr: this.state.allProductItemArr,
                allProductItemShowingArr: this.state.allProductItemShowingArr
            })
        }

        return (
            <View style={{ marginTop: 10, minHeight: 180 }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.addMoreButton} activeOpacity={0.9} onPress={() => _onAddMore()}>
                        <Text style={styles.addMoreText}>Add More</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.state.allProductItemShowingArr.map((item, key) => (
                        <React.Fragment key={key}>
                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                {item.map((item1, key1) => (
                                    <React.Fragment key={key1}>
                                        <View style={styles.flexANdMarginView}>
                                            <View style={styles.timeSec}>
                                                <Text style={styles.textTime}>{item1.remark}</Text>
                                                <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={styles.crossBtnImg} onPress={() => _onDeleteItem(item1, key1)}
                                                        activeOpacity={0.9}>
                                                        <Image style={styles.crossImg} source={ImageName.WHITE_CROSS} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </React.Fragment>
                                ))}
                            </View>
                        </React.Fragment>
                    ))}
                </ScrollView>
            </View>
        )
    }

    liftedFromSection = () => {
        return (
            <React.Fragment>
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.liftedFromText}>{"Lifted From =>"}</Text>
                </View>
                {this.selectedLiftedFromCustSection()}
            </React.Fragment>
        )
    }

    liftingDateSection = () => {
        const _onOpenAndCloseDatePicker = (value) => {
            if (value) {
                this.state.datePicker = value;
                this.setState({
                    datePicker: this.state.datePicker
                });
            } else {
                this.state.datePicker = value;
                this.setState({
                    datePicker: this.state.datePicker
                });
            }
        }

        const _onSelectDate = (date) => {
            if (date) {
                this.state.dateObj.rawDate = date;
                this.state.dateObj.selectedDate = DateConvert.formatYYYYMMDD(date);
                this.setState({
                    dateObj: this.state.dateObj
                });
            }
            _onOpenAndCloseDatePicker(false);
        }

        return (
            <React.Fragment>
                <View style={{ marginTop: 25 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.liftedFromText}>{"Probable Lifting Date"}</Text>
                    </View>
                    <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => _onOpenAndCloseDatePicker(true)} >
                        <Text style={[styles.inputBoxText, { color: this.state.dateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{this.state.dateObj.selectedDate.length == 0 ? "Probable Lifting Date" : this.state.dateObj.selectedDate}</Text>
                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.datePicker}
                        date={this.state.dateObj.rawDate}
                        mode={"date"}
                        // maximumDate={new Date()}
                        onConfirm={(date) => {
                            _onSelectDate(date);
                        }}
                        onCancel={() => {
                            _onOpenAndCloseDatePicker(false)
                        }}
                    />
                </View>
            </React.Fragment>
        )
    }

    liftedFromContactType = () => {
        const _onContactType = (value) => {
            this.setState({
                selectedLiftedFromContactType: value
            })
        }
        return (
            <View style={{ marginTop: 10 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedLiftedFromContactType.id ? this.state.selectedLiftedFromContactType.id.toString() : "0"}
                    data={this.state.allLiftedFromContactType}
                    onSelect={(value) => _onContactType(value)}
                    headerText={"Contact Type"}
                // selectedText={this.state.selectedBrand.name ? this.state.selectedBrand.name : "Brand"}
                />
            </View>
        )
    }

    searchSection = () => {
        const _onSearchText = (value) => {
            this.setState({
                searchText: value
            })
        }
        return (
            <View style={{ marginTop: 10 }}>
                <TextInputBox
                    placeholder={"Search"}
                    value={this.state.searchText}
                    onChangeText={(value) => _onSearchText(value)}
                    isRightIcon={true}
                    keyboardType="default"
                    rightIcon={ImageName.SEARCH_LOGO}
                    onPressRightIcon={() => this._onSearchCustomerList()}
                    isActive={this.state.searchActive}
                    onFocus={() => { this.setState({ searchActive: true }) }}
                    onBlur={() => { this.setState({ searchActive: false }) }}
                    returnKeyType="done"
                />
            </View>
        )
    }

    _onSearchCustomerList = async () => {
        if (this.state.selectedLiftedFromContactType.id == undefined || this.state.selectedLiftedFromContactType.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.UNPLANNED_NOTES.CUSTOMER_TYPE_ERROR);
        } else {
            this.setState({
                selectedLiftFromCustomer: {},
                custSearchLoader: true
            });
            let reqData = {
                "contactTypeId": this.state.selectedLiftedFromContactType.id.toString(),
                "searchName": this.state.searchText,
                "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
                "isDownload": "0",
                "approvalList": "0"
            }
            let responseData = await MiddlewareCheck("registrationList", reqData, this.props);
            if (responseData == false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let info = await StorageDataModification.userCredential({}, "get");
                    this.setState({
                        customerArr: modifyCustomerArr(responseData.response.data, info.userId)
                    })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                custSearchLoader: false
            });
        }
    }

    selectCustomerSection = () => {
        return (
            <View style={{ marginTop: 10 }}>
                {this.state.custSearchLoader ?
                    <View style={{ height: 170, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                    :
                    <View style={{ height: 200 }}>
                        {this.state.customerArr.length == 0 ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textVisites}>No Data Found</Text>
                            </View>
                            :
                            <React.Fragment>
                                <FlatList
                                    data={this.state.customerArr}
                                    renderItem={(item, key) => this.customerItemSection(item, key)}
                                    keyExtractor={(item, key) => key}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                            </React.Fragment>
                        }
                    </View>
                }
            </View>
        )
    }

    _onCheck = (item) => {
        let arr = this.state.customerArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].customerId == item.customerId) {
                arr[i].isCheck = !arr[i].isCheck;
            } else {
                arr[i].isCheck = false;
            }
        }
        this.setState({
            customerArr: arr
        })

        if (this.state.selectedLiftFromCustomer.customerId && (this.state.selectedLiftFromCustomer.customerId == item.customerId)) {
            this.setState({
                selectedLiftFromCustomer: {}
            })
        } else {
            this.setState({
                selectedLiftFromCustomer: item
            })
        }
    }

    customerItemSection = ({ item, key }) => {
        return (
            <View style={styles.mainBox} key={key}>
                <View style={styles.blueBox}>
                    <View style={styles.blueViewFlex}>
                        <View style={styles.homeCircel}>
                            <Image source={item.profilePic ? { uri: App_uri.IMAGE_VIEW_URI + item.profilePic } : ImageName.NO_IMG} style={styles.homeLogo} />
                        </View>
                        <View style={{ marginLeft: '5%', flex: 0.8 }}>
                            {/* <Text style={styles.saiEnterprisesText}>{item.custBusinessName && item.custBusinessName.length > 0 ? item.custBusinessName : item.customerName}</Text> */}
                            {(item.custBusinessName && item.custBusinessName.length > 0) || (item.organizationName && item.organizationName.length > 0) ?
                                <>
                                    <Text style={styles.saiEnterprisesText} numberOfLines={1}>{item.custBusinessName && item.custBusinessName.length > 0 ? item.custBusinessName : item.organizationName && item.organizationName.length > 0 ? item.organizationName : ""}</Text>
                                    <Text style={styles.saiEnterprisesBelowText} numberOfLines={1}>{item.customerName}</Text>
                                </>
                                :
                                <Text style={styles.saiEnterprisesText} numberOfLines={1}>{item.customerName}</Text>
                            }
                        </View>
                        <View style={styles.addVisitsButton}>
                            <CheckBox
                                borderRadius={40}
                                data={item.isCheck}
                                onClickValue={() => this._onCheck(item)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.textFlexView}>
                    <View style={{ flex: 1, marginRight: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={ImageName.MAIL_ICON} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 3 }} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Email</Text>
                                <Text style={styles.textVisites}>{item.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 2 }}>
                            <Image source={ImageName.CALL_ICON} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 3 }} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Phone</Text>
                                <Text style={styles.textVisites}>{item.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.textFlexView}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginRight: 2 }}>
                            <Image source={ImageName.CONTACT_TYPE} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 3 }} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Visitor Type</Text>
                                <Text style={styles.textVisites}>{item.contactTypeName}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    selectedLiftedFromCustSection = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onOpenAndCloseLiftedFromModal()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText,
                    {
                        color: this.state.selectedLiftFromCustomer.customerId ? "#0A0A0A" : "#C0C0C0",
                        marginRight: this.state.selectedLiftFromCustomer.customerId ? 10 : 21
                    }
                    ]}
                        numberOfLines={1}
                    >
                        {this.state.selectedLiftFromCustomer.customerId ? this.state.selectedLiftFromCustomer.customerName : "Select Lifted From"}
                    </Text>
                    {this.state.selectedLiftFromCustomer.customerId ?
                        <TouchableOpacity style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }} onPress={() => this._onCheck(this.state.selectedLiftFromCustomer)}>
                            <Image style={[{ height: 15, width: 15, resizeMode: 'contain' }]} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                        :
                        null
                    }
                </TouchableOpacity>
            </View>
        )
    }

    _onOpenAndCloseLiftedFromModal = () => {
        this.setState({
            liftedFromModal: !this.state.liftedFromModal
        })
    }

    modalSection = () => {
        const _onProcced = () => {
            if (this.state.selectedLiftFromCustomer.customerId == undefined || this.state.selectedLiftFromCustomer.customerId == null) {
                Toaster.ShortCenterToaster("Please select a customer from where you have lifted the item !");
            } else {
                this._onOpenAndCloseLiftedFromModal();
            }
        }
        return (
            <Modal
                isVisible={this.state.liftedFromModal}
                onBackButtonPress={() => this._onOpenAndCloseLiftedFromModal()}
                onBackdropPress={() => this._onOpenAndCloseLiftedFromModal()}
                onRequestClose={() => this._onOpenAndCloseLiftedFromModal()}
                children={
                    <>
                        <View style={styles.modalview}>
                            <View style={styles.marginView}>
                                <TouchableOpacity style={styles.cancelSec}
                                    activeOpacity={0.8}
                                    onPress={() => this._onOpenAndCloseLiftedFromModal()}  >
                                    <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                                </TouchableOpacity>
                            </View>
                            {this.state.pageLoader ?
                                <View style={{ height: Dimension.height / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Loader />
                                </View>
                                :
                                <React.Fragment>
                                    <View style={{ marginHorizontal: '10%', flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.ModalheaderText}>Select Lifted From</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: '5%' }}>
                                        {this.liftedFromContactType()}
                                        {this.searchSection()}
                                        {this.selectCustomerSection()}
                                    </View>
                                    <View style={{ marginHorizontal: '5%', marginTop: 10, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                            <BigTextButton
                                                height={40}
                                                borderRadius={24}
                                                text={"Procced"}
                                                onPress={() => _onProcced()}
                                            />
                                        </View>
                                    </View>
                                </React.Fragment>
                            }
                        </View>
                    </>
                }
            />
        )
    }

    leadOpportunitySection = () => {
        const onClickLead = async () => {
            if (this.state.isLeadOrOpportunity == false) {
                this.state.isLeadOrOpportunity = true;
                this.state.selectedStage = {};
                this.setState({
                    isLeadOrOpportunity: this.state.isLeadOrOpportunity,
                    selectedStage: this.state.selectedStage
                });
                await this.getLeadAndOpportunityStages();
            }
        }
        const onClickOpportunity = async () => {
            if (this.state.isLeadOrOpportunity == true) {
                this.state.isLeadOrOpportunity = false;
                this.state.selectedStage = {};
                this.setState({
                    isLeadOrOpportunity: this.state.isLeadOrOpportunity,
                    selectedStage: this.state.selectedStage
                });
                await this.getLeadAndOpportunityStages();
            }
        }
        return (
            <View style={{ marginTop: 25 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <CheckBox
                            borderRadius={20}
                            height={20}
                            width={20}
                            data={this.state.isLeadOrOpportunity}
                            onClickValue={() => onClickLead()}
                        />
                        <View style={{ width: 5 }} />
                        <Text style={styles.checkBoxLabel}>Lead</Text>
                    </View>
                    <View style={{ width: 7 }} />
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <CheckBox
                            borderRadius={20}
                            height={20}
                            width={20}
                            data={!this.state.isLeadOrOpportunity}
                            onClickValue={() => onClickOpportunity()}
                        />
                        <View style={{ width: 5 }} />
                        <Text style={styles.checkBoxLabel}>Opportunity</Text>
                    </View>
                </View>
                {this.stageSection()}
            </View>
        )
    }

    stageSection = () => {
        const _onSelectStage = (value) => {
            this.setState({
                selectedStage: value
            })
        }
        return (
            <View style={{ marginTop: 10 }}>
                {this.state.stageSectionLoader ?
                    <View style={{ height: 45, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'small'} color={Color.COLOR.RED.AMARANTH} />
                    </View>
                    :
                    <DropdownInputBox
                        selectedValue={this.state.selectedStage.id ? this.state.selectedStage.id.toString() : "0"}
                        data={this.state.allStage}
                        onSelect={(value) => _onSelectStage(value)}
                        headerText={"Stage"}
                    // selectedText={this.state.selectedBrand.name ? this.state.selectedBrand.name : "Brand"}
                    />
                }
            </View>
        )
    }

    _onUpdateConversion = async () => {
        let validatedStatus = validateConversionData(this.state, this.props.route.params.data);
        if (validatedStatus) {
            this.setState({
                pageLoader: true,
            })
            let reqData = {
                "leadId": this.props.route.params.data.leadId,
                "noVisit": "0",
                "convertionCustTyp": this.props.route.params.data.contactType == 1 || this.props.route.params.data.contactType == 2 ? "2" : "1",
                "remarks": this.state.remarks,
                "contactId": this.props.route.params.data.contactId ? this.props.route.params.data.contactId.toString() : "0",
                "fieldVisitId": this.props.route.params.data.fieldVisitId ? this.props.route.params.data.fieldVisitId.toString() : "0",
                "productArr": this.state.allProductItemArr,
                "liftedFrom": this.state.selectedLiftFromCustomer.customerId ? this.state.selectedLiftFromCustomer.customerId.toString() : "0",
                "convertionTypeId": this.state.isLeadOrOpportunity ? "1" : "2",
                "convertionTypeStageId": this.state.selectedStage.id ? this.state.selectedStage.id.toString() : "0",
                "sequence": this.state.selectedStage.sequence ? this.state.selectedStage.sequence.toString() : "0",
                "prrobableLiftingDate": this.state.dateObj.selectedDate,
                "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.route.params.data.hierarchyTypeId, "hierarchyDataId": this.props.route.params.data.hierarchyDataId }]
            }
            let responseData = await MiddlewareCheck("addConvertion", reqData, this.props);
            if (responseData) {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.navigation.goBack();
                    Toaster.ShortCenterToaster(responseData.data.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                pageLoader: false
            })
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    onSelectLocationData = (val) => {
        this.setState({ productObj: val.value, productArr: val.totalData })
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.state.pageLoader ?
                    <React.Fragment>
                        <View style={CustomStyle.noDataFoundViewForTabList}>
                            <Loader />
                        </View>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {this.modalSection()}
                        <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={CustomStyle.backButtonView} activeOpacity={0.9} onPress={() => this._onBack()}>
                                    <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                                </TouchableOpacity>
                                <View style={CustomStyle.headerTextView}>
                                    <Text style={CustomStyle.headerText}>Conversion</Text>
                                </View>
                                <View style={CustomStyle.backButtonView} />
                            </View>
                            <View style={{ marginBottom: 10 }} />
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                <View style={{ marginTop: 20 }}>
                                    {this.customerSection()}
                                    {/* {this.brandSection()}
                                    {this.sizesection()} */}
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
                                    {this.quantitySection()}
                                    {this.brandSizeQuantityArrSection()}
                                    {this.remarksSection()}
                                    {this.liftedFromSection()}
                                    {this.leadOpportunitySection()}
                                    {this.liftingDateSection()}
                                    <View style={{ marginHorizontal: '5%', marginTop: 25, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <BigTextButton
                                                height={45}
                                                borderRadius={24}
                                                text={"Submit"}
                                                onPress={() => this._onUpdateConversion()}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: 100 }} />
                            </ScrollView>
                        </View>
                    </React.Fragment>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Conversion); 