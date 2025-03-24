import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CommonData, ErrorCode } from '../../../../services/constant';
import { modActivityDetailsData, modProductData, modSubordinateData, modifyLocationMappedData, modifyPriorityStatus, modifyQuoteList, modifyResp, modifySalesStage, modifyStatgeArr, validateActivityData, validateProductHeirarchyData, validateQuoteData } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddActivity, ArrowProgressTracker, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, TextInputBox } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import BigTextButton from "../../../../shared/big-text-button";
import { LeadStatusModal } from "./sub-component";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { modifyApiResp } from "./Function";
import { App_uri } from "../../../../services/config";
import Tooltip from "react-native-walkthrough-tooltip";
import * as Progress from 'react-native-progress';
import Header from "../../header/Header";
import { AddQuoteModal, DynamicProductMapping } from "../../../../pageShared";


let tabButton = [
    {
        id: 1,
        tabButtonName: "Business",
        check: false
    },
    {
        id: 2,
        tabButtonName: "Personal",
        check: false
    }

];

let activitiesTabButton = [
    {
        id: 1,
        tabButtonName: "Past",
        check: false
    },
    {
        id: 2,
        tabButtonName: "Upcoming",
        check: false
    }

]


class LeadDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            refreshing: false,
            //

            leadStageArr: [],
            detailsData: {
                selectedLeadStage: "",
                leadName: "",
                leadType: "",
                probability: "",
                leadOpenValue: "",
                leadCloseValue: "",
                leadStage: "",
                leadAge: "",
                salesStageName: "",
                salesOwner: "",
                leadStatus: "",
                lastUpdateNote: "",
                relatedContact: "",
                relatedAccount: "",
                leadSource: "",
                nextActivity: "",

                //

            },
            activityDetails: [],
            selectedLeadObj: this.props.route.params.data,
            subordinateList: [],
            isAddActivityModal: false,
            activityLoader: false,
            productData: [
                {
                    selectedProductName: {},
                    producthArr: [],
                    prodHmUpperNodes: {},
                    hierarchyDataId: "",
                    hierarchyTypeId: "",
                    price: "",
                    quantity: "",
                    discount: "",
                    unit: "",
                    unitName: "",
                    hmName: ""
                }
            ],
            productLoader: false,
            productDetails: [],
            addProductLoader: false,
            activityTypeDetails: [],
            isAddQuoteModal: false,
            productListData: [],
            quoteListLoader: false,
            quoteListDetails: [],
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this.getLeadAndOpportunityStages()
        await this.getLeadDetails()
        await this.activityDetailsApiCall({ activityId: "", date: "" })
        await this._fetchSubordinateList("");
        await this._getProductHierarchyTypesSlNo();
        await this.fetchGeneralQuoteApiCall();
        this.setState({
            pageLoader: false
        })
    }

    fetchGeneralQuoteApiCall = async () => {
        let reqData = {
            refId: this.state.selectedLeadObj ? this.state.selectedLeadObj.leadId.toString() : "",
            tableType: "3",
            "masterMdouleTypeId": "20"
        }
        this.setState({ quoteListLoader: true });
        let responseData = await MiddlewareCheck("fetchGeneralQuoteList", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.quoteListDetails = modifyQuoteList(responseData.response)
                this.setState({ quoteListDetails: this.state.quoteListDetails })
            }
        }
        this.setState({ quoteListLoader: false });
    }


    _fetchSubordinateList = async () => {
        let reqData = {
            "searchName": "",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("getAllSubordinatesOfUser", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let customerData = modSubordinateData(responseData.response);
                this.state.subordinateList = customerData;
                this.setState({ subordinateList: this.state.subordinateList })
            }
        }
    }
    activityDetailsApiCall = async (data) => {
        let reqData = {
            "typeDataId": this.props.route.params.data.LeadId,
            "type": "3",
            "isCompleted": "",
            "activityTypeId": data.activityId,
            "searchFrom": data.date,
            "searchTo": "",
            "masterMdouleTypeId": "20"
        }
        this.setState({ activityLoader: true })
        let responseData = await MiddlewareCheck("getAllActivitiesTypeWise", reqData, this.props);
        if (responseData) {
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let modActivityDetails = modActivityDetailsData(responseData.response);
                    this.setState({ activityDetails: modActivityDetails });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
        this.setState({ activityLoader: false })

    }

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

    getLeadAndOpportunityStages = async () => {
        let responseData = await MiddlewareCheck("getLeadOpportunityStages", { "salesStageFor": "1" }, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.leadStageArr = modifyStatgeArr(responseData.data)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getLeadDetails = async () => {
        let reqData = {
            leadId: this.props.route.params.data.leadId.toString(),
            contactType: this.props.route.params.data.contactType
        }
        let responseData = await MiddlewareCheck("fetchLeadDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0]);
                this.state.detailsData.selectedLeadStage = modifiedApiResponse.leadSourceType
                this.state.detailsData.leadName = modifiedApiResponse.leadName
                this.state.detailsData.leadType = modifiedApiResponse.contactTypeName
                this.state.detailsData.probability = modifiedApiResponse.probability
                this.state.detailsData.leadOpenValue = modifiedApiResponse.leadValue
                this.state.detailsData.leadCloseValue = modifiedApiResponse.leadOwnValue
                this.state.detailsData.leadAge = modifiedApiResponse.leadAge
                this.state.detailsData.salesStageName = modifiedApiResponse.salesStageName
                this.state.detailsData.salesOwner = modifiedApiResponse.LeadOwner
                this.state.detailsData.relatedContact = modifiedApiResponse.contactFullName
                this.state.detailsData.relatedAccount = modifiedApiResponse.organizationName
                this.state.detailsData.leadSource = modifiedApiResponse.leadSourceTypeName
                this.state.detailsData.leadStatus = modifiedApiResponse.leadTypeStatusName
                this.state.detailsData.lastUpdateNote = modifiedApiResponse.lastUpdateNote
                this.state.detailsData.nextActivity = modifiedApiResponse.nextActivity
                this.state.productListData = modifiedApiResponse.productHierarchyArr

                this.setState({ detailsData: this.state.detailsData })
            }
        }
    }

    // Modal Section Function Start
    _onProfile = () => {
        this.setState({
            ProfileModal: !this.state.ProfileModal

        })
    }


    _onMarkStage = () => {
        this.setState({
            showHideModal: !this.state.showHideModal,
        })

    }

    _onSelectModalButton = (item) => {
        this.setState({
            selectedStageObj: item
        })
    }

    _onShowMore = () => {
        this.props.navigation.navigate("leadActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "upcoming" })
    }
    _onBack = () => {
        this.props.navigation.goBack()
    }

    _onReload = async () => {
        await this._resetStateVariable();
        await this._load();
    }

    _resetStateVariable = async () => {
        this.setState({
            pageLoader: true,
            leadStageArr: [],
            detailsData: {
                selectedLeadStage: "",
                leadName: "",
                leadType: "",
                probability: "",
                leadOpenValue: "",
                leadCloseValue: "",
                leadStage: "",
                leadAge: "",
                salesStageName: "",
                salesOwner: "",
                leadStatus: "",
                lastUpdateNote: "",
                relatedContact: "",
                relatedAccount: "",
                leadSource: "",
                nextActivity: "",

                //

            },
            activityDetails: [],
            subordinateList: [],
            isAddActivityModal: false,
            activityLoader: false
        })
    }

    _addAnother = () => {
        let obj = {
            "selectedProductName": {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "producthArr": [],
            "price": "",
            "quantity": "",
            "discount": "",
            "unit": "",
            "unitName": "",
            "prodHmUpperNodes": {},
            "hmName": ""

        }
        let arr = this.state.productData;
        arr.push(obj);
        this.state.productData = arr;
        this.setState({
            productData: this.state.productData
        })
    }

    onAddProduct = async () => {
        // let modProductData = modProductHeirarchyData(this.state.productData);
        let validateProductData = validateProductHeirarchyData(this.state.productData)
        if (validateProductData) {
            let reqData = {
                "leadId": this.props.route.params.data.leadId.toString(),
                "productArr": this.state.productData,
                "masterMdouleTypeId": "20"
            }
            this.setState({ addProductLoader: true, productLoader: true });
            let responseData = await MiddlewareCheck("addProductForLead", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.activityTypeDetails = responseData.response;
                    Toaster.ShortCenterToaster(responseData.message)
                    this.setState({
                        productData: [
                            {
                                selectedProductName: {},
                                productArr: [],
                                hierarchyDataId: "",
                                hierarchyTypeId: "",
                                price: "",
                                quantity: "",
                                discount: "",
                                unit: ""
                            }
                        ],
                        productLoader: true
                    })
                    this.getLeadDetails();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ addProductLoader: false, productLoader: false });
        }
    }

    onDeleteProduct = async (item, index) => {
        let reqData = {
            "leadId": this.props.route.params.data.leadId.toString(),
            "hierarchyTypeId": item.hierarchyTypeId,
            "hierarchyDataId": item.hierarchyDataId,
            "masterMdouleTypeId": "20"
        }
        this.state.productListData[index].deleteProductLoader = true;
        this.setState({ productListData: this.state.productListData });
        let responseData = await MiddlewareCheck("removeProductForLead", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.productListData[index].deleteProductLoader = false;
        this.state.productListData.splice(index, 1);
        this.setState({ productListData: this.state.productListData });
    }

    onDeleteQuote = async (item, index) => {
        let reqData = {
            "quoteId": item.quoteId,
            "masterMdouleTypeId": "20"
        }
        this.state.quoteListDetails[index].deleteItemLoader = true;
        this.setState({ quoteListDetails: this.state.quoteListDetails });
        let responseData = await MiddlewareCheck("deleteGeneralQuote", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.quoteListDetails[index].deleteItemLoader = false;
        this.state.quoteListDetails.splice(index, 1);
        this.setState({ quoteListDetails: this.state.quoteListDetails });
    }

    _onDeleteArray = (key) => {
        let arr = this.state.productData;
        arr.splice(key, 1);
        this.state.productData = arr;
        this.setState({
            productData: this.state.productData
        })
    }

    onSelectLocationData = (val, key) => {
        this.state.productData[key].hierarchyDataId = val.value.hierarchyDataId
        this.state.productData[key].hierarchyTypeId = val.value.hierarchyTypeId
        this.state.productData[key].producthArr = val.totalData;
        this.setState({ productData: this.state.productData })
    }

    onChangePrice = (value, index) => {
        this.state.productData[index].price = value;
        this.setState({ productData: this.state.productData });
    }

    onChangeDiscount = (value, index) => {
        this.state.productData[index].discount = value;
        this.setState({ productData: this.state.productData });
    }

    onChangeQuantity = (value, index) => {
        this.state.productData[index].quantity = value;
        this.setState({ productData: this.state.productData });
    }

    onChangeUnit = (value, index) => {
        this.state.productData[index].unit = value;
        this.setState({ productData: this.state.productData });
    }

    onAddQuoteModal = (value) => {
        this.setState({ isAddQuoteModal: value });
    }


    //=====================================
    leadStages = () => {
        return (
            <View style={{ marginTop: 5 }}>
                {/* <View style={{ flex: 1 }} >
                    <Text style={styles.textDetailsInfo}>Lead Stage</Text>
                </View> */}
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    {this.state.leadStageArr.map((item, key) => (
                        <>
                            <View style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: this.state.detailsData.selectedLeadStage == item.id ? Color.COLOR.PINK.SEA_PINK : "#808080",
                                borderTopLeftRadius: key == 0 ? 10 : 0,
                                borderBottomLeftRadius: key == 0 ? 10 : 0,
                                borderTopRightRadius: key == this.state.leadStageArr.length - 1 ? 10 : 0,
                                borderBottomRightRadius: key == this.state.leadStageArr.length - 1 ? 10 : 0
                            }} key={key}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 11 }}>{item.name}</Text>
                            </View>
                        </>
                    ))}

                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, backgroundColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />
            </View>
        )
    }

    leadData = () => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flex: 1 }} >
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Lead Name</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.detailsData.leadName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <View style={{ height: 14, width: 14, borderRadius: 10, backgroundColor: Color.COLOR.RED.AMARANTH }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{this.state.detailsData.leadType}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Lead Type</Text>
                        </View>
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.GREEN.LIGHT_GREEN, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{this.state.detailsData.probability + "%"}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Probability</Text>
                        </View>
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{'\u20B9' + this.state.detailsData.leadOpenValue}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Lead Open Value</Text>
                        </View>
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{'\u20B9' + this.state.detailsData.leadCloseValue}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Lead Close Value</Text>
                        </View>
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{this.state.detailsData.salesStageName}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Lead Stage</Text>
                        </View>
                        <Image source={ImageName.RED_FLAG_ICON} style={{ height: 30, width: 30, resizeMode: "contain" }} />

                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ backgroundColor: "#F0F4F7", borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <Image source={ImageName.TIME_ICON} style={{ height: 18, width: 18, resizeMode: "contain" }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{this.state.detailsData.leadAge}</Text>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, bottom: 2 }}>Lead Age</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, backgroundColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />
            </View>
        )
    }

    otherDetail = () => {
        return (
            <View style={{ marginTop: 5 }}>
                <View>
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Other Detail</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Sales Owner</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.detailsData.salesOwner}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Status</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{this.state.detailsData.leadStatus}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Related Contact</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{this.state.detailsData.relatedContact}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Related Account</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{this.state.detailsData.relatedAccount}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Source</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{this.state.detailsData.leadSource}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Color.COLOR.GRAY.TRIPLET, borderColor: "#D3DDE5", borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, paddingRight: 20, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 5, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#ABB1BB", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Next Activity</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{this.state.detailsData.nextActivity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    activityInfo = () => {
        return (
            <>
                {this.state.activityLoader ?
                    <View>
                        <ActivityIndicator />
                    </View>
                    :
                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {this.state.activityDetails.map((item, index) => (
                            <>
                                <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={index}>
                                    {/* <ScrollView horizontal> */}
                                    <View style={{ flex: 0.33, paddingRight: 5, borderRightWidth: 0.5, borderRightColor: Color.COLOR.BLUE.LOTUS_BLUE }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.description}</Text>
                                        <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.assignToName}</Text>
                                    </View>
                                    <View style={{ flex: 0.33, paddingHorizontal: 5, borderRightWidth: 0.5, borderRightColor: Color.COLOR.BLUE.LOTUS_BLUE }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.createdByName}</Text>
                                        <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Created By</Text>
                                    </View>
                                    <View style={{ flex: 0.33, paddingLeft: 5 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.dueDate} | {item.dueTime}</Text>
                                        <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Over Due on</Text>
                                    </View>
                                    {/* </ScrollView> */}

                                </View>
                            </>

                        ))}
                    </ScrollView>
                }
            </>
        )
    }

    activityDetails = () => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textDetailsInfo}>Upcoming Activity Details</Text>
                    </View>
                    <View style={{ flex: 0.5 }} />
                    <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.openActivityModal()}>
                        <Text style={styles.textAssigntoName}>+Add New Activity</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginTop: 10 }} />
                {this.state.activityDetails.length > 0 ?
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity style={{}} onPress={() => this.onOpenFilterModal()}>
                                <Image source={ImageName.FILTER_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }} >
                            {this.activityInfo()}
                        </View>
                    </>
                    :
                    <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.textAssigntoName}>No Data Found !</Text>
                    </View>
                }

            </View>
        )
    }

    contactInformation = () => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textDetailsInfo}>Contact Information</Text>
                    </View>
                    <View style={{ flex: 0.5 }} />
                    <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.openActivityModal()}>
                        <Text style={styles.textAssigntoName}>+Add New Contact</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginTop: 10 }} />
            </View>
        )
    }

    _productSection = (item, key) => {
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
                        {this.state.productLoader ? null : <>

                            <View style={{ height: 10 }} />
                            <DynamicProductMapping
                                editData={item.producthArr}
                                // flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => this.onSelectLocationData(value, key)}
                            />
                        </>
                        }
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.price}
                            onChangeText={(value) => this.onChangePrice(value, key)}
                            placeholder={"Add price"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.discount}
                            onChangeText={(value) => this.onChangeDiscount(value, key)}
                            placeholder={"Add discount"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.quantity}
                            onChangeText={(value) => this.onChangeQuantity(value, key)}
                            placeholder={"Add quantity"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInputBox
                            value={item.unit}
                            onChangeText={(value) => this.onChangeUnit(value, key)}
                            placeholder={"Add Unit"}
                            keyboardType={"numeric"}
                            // multiline={true}
                            // isActive={this.state.priceActive}
                            additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            alignItems={'flex-start'}
                            // onFocus={() => { setDescriptionActive(true) }}
                            // onBlur={() => { setDescriptionActive(false) }}
                            height={45}
                            returnKeyType={'default'}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    productInfo = () => {
        return (
            <View >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textDetailsInfo}>Product Added for the Deal</Text>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />
                <View >
                    <View style={{}}>
                        {this.state.productData.map((item, key) => (
                            this._productSection(item, key)
                        ))}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 15 }}>
                        <TouchableOpacity
                            style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                            onPress={() => this._addAnother()}
                        >
                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.productListLoader ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            <ActivityIndicator color={Color.COLOR.BLUE.LOTUS_BLUE} />
                        </View>
                        :
                        <ScrollView style={{ maxHeight: 300 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
                            {this.state.productListData.map((item, key) => (
                                <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={key}>
                                    {item.prodhArr && item.prodhArr.length > 0 ?
                                        <>
                                            {item.prodhArr.map((item1, key1) => (
                                                <View style={{ flex: 0.3, justifyContent: "space-between" }} key={key1}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item1.name}</Text>
                                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item1.typeName}</Text>
                                                </View>
                                            ))}
                                        </>
                                        : null
                                    }
                                    {item.deleteProductLoader ?
                                        <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                                        :
                                        <TouchableOpacity style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onDeleteProduct(item, key)}>
                                            <Image source={ImageName.DELETE_WITH_RED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            ))}
                        </ScrollView>
                    }
                    {this.state.addProductLoader ?
                        <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                        :
                        <View style={{ marginTop: 10 }}>
                            <BigTextButton
                                height={40}
                                borderRadius={24}
                                backgroundColor={Color.COLOR.RED.AMARANTH}
                                text={"Add Product"}
                                onPress={() => this.onAddProduct()}
                            />
                        </View>
                    }


                </View>
            </View>
        )
    }

    quoteSec = () => {
        return (
            <View >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textDetailsInfo}>Quotes</Text>
                    </View>
                    <View style={{ flex: 0.5 }} />
                    <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.onAddQuoteModal(true)}>
                        <Text style={styles.textAssigntoName}>+Make a Quote</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />

                {this.state.quoteListLoader ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
                        <ActivityIndicator color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <>
                        {this.state.quoteListDetails.length > 0 ?
                            <ScrollView style={{ maxHeight: 300 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
                                {this.state.quoteListDetails.map((item, key) => (
                                    <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={key}>
                                        <>
                                            <View style={{ flex: 0.25, justifyContent: "space-between" }} >
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.quoteName}</Text>
                                                <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Quotes Name</Text>
                                            </View>
                                            <View style={{ flex: 0.25, justifyContent: "space-between" }} >
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.totalValue}</Text>
                                                <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Value</Text>
                                            </View>
                                            <View style={{ flex: 0.25, justifyContent: "space-between" }} >
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.quoteType}</Text>
                                                <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Quote Type</Text>
                                            </View>
                                            <View style={{ flex: 0.25, justifyContent: "space-between" }} >
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.createdAt}</Text>
                                                <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Create Date</Text>
                                            </View>
                                        </>
                                        {item.deleteItemLoader ?
                                            <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                                            :
                                            <TouchableOpacity style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onDeleteQuote(item, key)}>
                                                <Image source={ImageName.DELETE_WITH_RED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                ))}
                            </ScrollView>
                            :
                            <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.textAssigntoName}>No Data Found !</Text>
                            </View>
                        }
                    </>
                }
            </View>
        )
    }


    openActivityModal = () => {
        this.setState({ isAddActivityModal: true })
    }

    onCloseAddActivityModal = () => {
        this.setState({ isAddActivityModal: false });
    }
    onAddNewActivityData = async (data) => {
        let reqData = {
            "type": "3",
            "typeDataId": this.props.route.params.data.leadId,
            "activityTypeId": data.activityTypeId,
            "assignDueDate": data.assignDueDate,
            "assignDueTime": data.timeRaw,
            "time": data.assignDueTime,
            "description": data.description,
            "assignTo": data.assignTo,
            "masterMdouleTypeId": "20"
        }
        let validateData = validateActivityData(reqData);

        if (validateData) {
            let responseData = await MiddlewareCheck("addGeneralActivity", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ isAddActivityModal: false });
                    Toaster.ShortCenterToaster(responseData.message)
                    await this.activityDetailsApiCall({ activityId: "", date: "" });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    onAddQuotes = async (data) => {
        let validateData = validateQuoteData(data);

        if (validateData) {
            let responseData = await MiddlewareCheck("addGeneralQuote", data, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                    Toaster.ShortCenterToaster(responseData.message)
                    await this.fetchGeneralQuoteApiCall();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
        this.setState({ isAddQuoteModal: false });
    }

    modalSec = () => {
        return (
            <>
                {this.state.isAddActivityModal ?
                    <AddActivity
                        isVisible={this.state.isAddActivityModal}
                        customerList={this.state.subordinateList}
                        selectedItemData={this.state.selectedLeadObj}
                        onCloseModal={() => this.onCloseAddActivityModal()}
                        onPressAddActivity={(data) => this.onAddNewActivityData(data)}
                    />
                    : null
                }
                {this.state.isAddQuoteModal ?
                    <AddQuoteModal
                        isVisible={this.state.isAddQuoteModal}
                        onCloseModal={(value) => this.onAddQuoteModal(value)}
                        selectedItemData={this.state.selectedLeadObj}
                        onPressAddQuotes={(data) => this.onAddQuotes(data)}
                    />
                    : null
                }
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} />
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <React.Fragment>
                        {this.modalSec()}
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onReload()}
                                />
                            }>
                            <View style={styles.mainView}>
                                <View style={styles.shadowBox}>
                                    {this.leadStages()}
                                    {this.leadData()}
                                    {this.otherDetail()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.activityDetails()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.contactInformation()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.productInfo()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.quoteSec()}
                                </View>
                                <View style={{ marginBottom: '25%' }} />
                            </View>
                        </ScrollView>
                    </React.Fragment>
                }
            </SafeAreaView >
        )
    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LeadDetails);