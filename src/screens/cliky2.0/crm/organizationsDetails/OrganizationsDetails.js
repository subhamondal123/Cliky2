import React from "react";
import { Color, FontFamily, FontSize, ImageName } from '../../../../enums';
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
import { modActivityDetailsData, modContactInfo, modProductData, modifyApiResp, modifyLocationMappedData, modifyUserData, validateActivityData, validateContactData, validateProductHeirarchyData } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActivityFilterModal, AddActivity, BigTextButton, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, TextInputBox } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import Tooltip from "react-native-walkthrough-tooltip";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import { DynamicProductMapping } from "../../../../pageShared";
import AddContactModal from "../../../../pageShared/Cliky2/addContactModal";
import Header from "../../header/Header";

class OrganizationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: CommonData.COMMON.STATUS,
            selectStatusObj: {},


            detailsInfoData: [],
            ProfileModal: false,

            pageLoader: true,
            allData: {},
            allCompetitor: [],
            detailsModal: false,

            popUpModal: false,
            popUpType: "",

            businessInfoData: [],

            isVisibleStatusModal: false,
            statusModalLoader: false,
            selectPriorityStatusObj: {},
            priorityStatus: CommonData.COMMON.STATUS,

            refreshing: false,


            subordinateList: [],
            selectedContactObj: {},
            organizationDetailsObj: {},
            activityDetails: [],
            isAddActivityModal: false,
            filterLoader: false,
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
            productLoaader: false,
            productDetails: [],
            addProductLoader: false,
            activityTypeDetails: [],
            productListLoader: false,
            contactInfo: [],
            isAddContactModal: false,
            contactListLoader: false
        }
    }

    componentDidMount() {

        this._load();
    }

    _load = async () => {
        this.setState({
            selectedContactObj: this.props.route.params.data
        })
        await this.fetchOrganizationDetails();
        await this.activityTypeDetails();
        await this._getProductHierarchyTypesSlNo();
        await this.fetchProductByOrgApiCall();
        await this.activityDetailsApiCall({ activityId: "", date: "" });
        await this.fetchContactByOrgApiCall();
        await this.fetchSubordinateList()
        this.setState({
            pageLoader: false
        })
    }

    // for get the get Hierarchy Types With Sl No for Products
    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ productLoaader: true })
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
        this.setState({ productLoaader: false })
        return true;
    }

    fetchSubordinateList = async () => {
        let reqData = {
            "searchName": "",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("getAllSubordinatesOfUser", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let customerData = modifyUserData(responseData.response);
                this.state.subordinateList = customerData;
                this.setState({ subordinateList: this.state.subordinateList })
            }
        }
    }

    fetchProductByOrgApiCall = async () => {
        let reqData = {
            "organizationId": this.props.route.params.data.organizationId,
            "masterMdouleTypeId": "20"
        }
        this.setState({ productListLoader: true });
        let responseData = await MiddlewareCheck("fetchProductListByOrg", reqData, this.props);
        if (responseData) {
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let modProductDetails = modProductData(responseData.response);
                    this.setState({ productDetails: modProductDetails });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
        this.setState({ productListLoader: false });
    }

    fetchContactByOrgApiCall = async () => {
        let reqData = {
            "organizationId": this.state.selectedContactObj.organizationId,
            "masterMdouleTypeId": "20"
        }
        this.setState({ contactListLoader: true });
        let responseData = await MiddlewareCheck("fetchContactByOrg", reqData, this.props);
        if (responseData) {
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let modContactData = modContactInfo(responseData.response);
                    this.setState({ contactInfo: modContactData });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
        this.setState({ contactListLoader: false });

    }


    fetchOrganizationDetails = async () => {
        let reqData = {
            "organizationId": this.props.route.params.data.organizationId,
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchOrganizationDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.organizationDetailsObj = responseData.response;
                this.setState({
                    organizationDetailsObj: this.state.organizationDetailsObj
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    activityTypeDetails = async () => {
        let reqData = {
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("getAllActivitiesTypeWise", reqData, this.props);
        if (responseData ) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.activityTypeDetails = responseData.response;
                this.setState({
                    activityTypeDetails: this.state.activityTypeDetails
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    activityDetailsApiCall = async (data) => {
        let reqData = {
            "typeDataId": this.props.route.params.data.organizationId,
            "type": "2",
            "isCompleted": "",
            "activityTypeId": data.activityId,
            "searchFrom": data.date,
            "searchTo": "",
            "masterMdouleTypeId": "20"
        }
        this.setState({ filterLoader: true });
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
        this.setState({ filterLoader: false });
    }

    _onResetStateData = async () => {
        this.setState({
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: CommonData.COMMON.STATUS,
            selectStatusObj: {},


            detailsInfoData: [],
            ProfileModal: false,

            pageLoader: true,
            allData: {},
            allCompetitor: [],
            detailsModal: false,

            popUpModal: false,
            popUpType: "",

            businessInfoData: [],
        })
    }

    _onReload = async () => {
        await this._onResetStateData();
        await this._load();
    }

    _onShowHide = (item, key) => {
        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            if (this.state.detailsInfoData[i].tabName == item.tabName) {
                if (this.state.detailsInfoData[key].check) {
                    this.state.detailsInfoData[i]["check"] = false
                } else {
                    this.state.detailsInfoData[i]["check"] = true
                }
            } else {
                this.state.detailsInfoData[i]["check"] = false
            }
        }
        this.setState({
            detailsInfoData: this.state.detailsInfoData
        })
    }

    _OnSelectStatus = (value) => {
        let data = this.state.status;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.setState({
            selectStatusObj: value,
            status: data,
        })
    }

    _onProfile = () => {
        this.setState({
            ProfileModal: !this.state.ProfileModal

        })
    }

    _onActivitiesTab = (item) => {
        this.setState({
            selectActivitiesButtonId: item.id
        })
    }

    ListDataActivities = () => {
        return (
            this.state.activitiesList.slice(0, 3).map((item, key) =>
                <React.Fragment key={key}>
                    {this.listView(item, key)}
                </React.Fragment>
            )
        )

    };

    listView = (item, key) => {
        return (
            <View style={styles.listDataView} key={key} >
                <Text style={[styles.textList, { flex: 0.25 }]}>{item.activityName ? item.activityName : "N/A"}</Text>
                <Text style={[styles.textDate, { textAlign: 'center', flex: 0.3 }]}>{item.dueDate ? DateConvert.formatYYYYMMDD(item.dueDate) : "N/A"}</Text>
                <Text style={[styles.nameText, { flex: 0.25 }]}>{item.firstName ? item.firstName : "" + " " + item.lastName ? item.lastName : ""}</Text>
                <Text numberOfLines={4} style={[styles.nameText, { flex: 0.2 }]}>{item.remarks ? item.remarks : "N/A"}</Text>
                {/* <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.toolTipImg} />
                </TouchableOpacity> */}
            </View>
        )

    }

    ListDataActivitiesUpcoming = () => {
        return (
            this.state.activitiesUpcoming.slice(0, 5).map((item, key) =>
                <React.Fragment key={key}>
                    {this.upcomingList(item, key)}
                </React.Fragment>
            )
        )

    };

    upcomingList = (item, key) => {
        return (
            <View style={styles.listDataView} key={key}>
                <Text style={styles.textList}>{item.activityName}</Text>
                <Text style={[styles.textDate, { textAlign: 'center' }]}>{DateConvert.formatYYYYMMDD(item.dueDate)}</Text>
                <Text style={styles.nameText}>{item.firstName ? item.firstName : "" + " " + item.lastName ? item.lastName : ""}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.toolTipImg} />
                </TouchableOpacity>
            </View>
        )

    }

    _onShowMore = () => {
        this.props.navigation.navigate("OrganizationActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "uncoming" })
    }

    phoneNumerSec = (number) => {
        return (
            <View style={styles.allDetailsView}>
                <TouchableOpacity style={{ flex: 0.3 }}
                    activeOpacity={1}
                // onPress={() => this._onProfile()}
                >
                    <View style={styles.viewImg}>
                        <Image source={ImageName.PHONE} style={styles.img} />
                    </View>
                </TouchableOpacity>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Phone number</Text>
                    <Text style={styles.viewSubText}>{number}</Text>
                </View>
            </View>

        )
    }

    emailIdSec = (email) => {
        return (
            <View style={styles.allDetailsView}>
                <TouchableOpacity style={{ flex: 0.3 }}
                    activeOpacity={1}
                // onPress={() => this._onProfile()}
                >
                    <View style={styles.viewImg}>
                        <Image source={ImageName.SECURED_LETTER} style={styles.img} />
                    </View>
                </TouchableOpacity>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Email address</Text>
                    <Text style={styles.viewSubText}>{email}</Text>
                </View>
            </View>
        )
    }

    _onBack = () => {
        this.props.navigation.goBack()
    }

    // ..............open action header tooltip ............
    _TooltipDownloadAction = () => {
        const onClickActionTooltip = () => {
            this.setState({
                downloadCheck: !this.state.downloadCheck
            })
        }

        const OnDownload = async (type) => {
        }

        const onActionTooltipClick = async (type) => {
            switch (type) {
                case "pdf":
                    OnDownload(type);
                    break;
                case "csv":
                    OnDownload(type);
                    break;
                case "excel":
                    OnDownload(type);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.downloadCheck}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("pdf")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("csv")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>CSV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("excel")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Excel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={this.state.downloadCheck}
                >
                    <LottyViewLoad type={"download"} autoPlay={true} loop={true} height={20} width={20} />
                </TouchableOpacity>
            </Tooltip>
        )
    }

    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
    }

    _OnSelectPriorityStatus = (value) => {
        this.setState({
            selectPriorityStatusObj: value,
        })
    }

    proretyStatusSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginTop: 30, marginHorizontal: '5%' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.shortheaderText}>Status:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.5 }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectPriorityStatusObj.id ? this.state.selectPriorityStatusObj.id.toString() : "0"}
                            data={this.state.priorityStatus}
                            onSelect={(value) => this._OnSelectPriorityStatus(value)}
                            headerText={"Status"}
                            selectedText={this.state.selectPriorityStatusObj.name ? this.state.selectPriorityStatusObj.name : "Status"}
                        />
                    </View>

                </View>
            </React.Fragment>
        )
    }



    _onStatusModal = (item) => {
        if (this.state.isVisibleStatusModal == false) {
            this.setState({
                isVisibleStatusModal: true,
                selectPriorityStatusObj: {},
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
            })
        }
    }

    _onStatusChange = async () => {
        let errorCount = 0;
        if (inputEmptyValidator(this.state.selectPriorityStatusObj.id) == false) {
            Toaster.ShortCenterToaster("Please select status")
            errorCount++;
        }

        if (errorCount === 0) {
            if (this.state.allData.status == this.state.selectPriorityStatusObj.value.toString()) {
                this._onStatusModal();
            } else {
                this.setState({
                    statusModalLoader: true
                });
                let reqData = {
                    organizationId: [this.props.route.params.data.organizationId.toString()],
                    status: this.state.selectPriorityStatusObj.value.toString()
                }
                let responseData = await MiddlewareCheck("updateOrganizationStatus", reqData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.props.route.params.onChangeListItemStatus(this.props.route.params.data, reqData.status, this.props)
                        this.state.allData.status = reqData.status;
                        this.setState({
                            allData: this.state.allData,
                            selectPriorityStatusObj: {}
                        })
                        Toaster.ShortCenterToaster(responseData.message);
                        this._onStatusModal();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState({
                    statusModalLoader: false
                });
            }
        }
    }

    detailsView = () => {
        return (
            <React.Fragment>
                <View style={{ marginTop: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.textAssignTo}>Contact Name : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.organizationDetailsObj.organizationName}</Text></Text>
                            <Text style={styles.textAssignTo}>Contact : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.organizationDetailsObj.primaryPhone}</Text></Text>
                            <Text style={styles.textAssignTo}>Email : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.organizationDetailsObj.primaryEmail}</Text></Text>

                            <Text style={styles.textAssignTo}>Website : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.website}</Text></Text>
                            <Text style={styles.textAssignTo}>Domain : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.domain}</Text></Text>
                            <Text style={styles.textAssignTo}>Sub Domain : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.sub_domain}</Text></Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.textAssignTo}>Owner Name : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.ownerName}</Text></Text>
                            <Text style={styles.textAssignTo}>Contact Name : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.contactName}</Text></Text>
                            <Text style={styles.textAssignTo}>Annual Revenue : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.anualRevenue}</Text></Text>
                            <Text style={styles.textAssignTo}>Number of employee : <Text style={styles.textAssigntoName}>{this.state.organizationDetailsObj.numberOfEmployee}</Text></Text>

                            {this.state.organizationDetailsObj.location.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>{item.typeName} : <Text style={styles.textAssigntoName}>{item.name}</Text></Text>
                                </View>
                            ))}
                        </View>

                    </View>
                </View>

            </React.Fragment >
        )
    }

    onFilterApiCall = async (value) => {
        await this.activityDetailsApiCall(value);
        this.setState({ isFilterModal: false });
    }

    onOpenFilterModal = () => {
        this.setState({ isFilterModal: true });
    }

    openActivityModal = () => {
        this.setState({ isAddActivityModal: true })
    }

    onCloseAddActivityModal = () => {
        this.setState({ isAddActivityModal: false });
    }

    onAddNewContactData = async (data) => {
        let validateData = validateContactData(data);
        if (validateData) {
            let responseData = await MiddlewareCheck("createNewContact", data, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ isAddContactModal: false });
                    Toaster.ShortCenterToaster(responseData.message)
                    await this.fetchContactByOrgApiCall();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }


    activityInfo = () => {
        return (
            <View>
                {this.state.filterLoader ?
                    <View>
                        <ActivityIndicator />
                    </View>
                    :
                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {this.state.activityDetails.map((item, index) => (
                            <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={index}>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.description}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.assignToName}</Text>
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.createdByName}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Created By</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Over Due on</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.dueDate}|{item.dueTime}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
        )
    }

    _addAnother = () => {
        let obj = {
            selectedProductName: {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "productArr": [],
            "price": "",
            "quantity": "",
            "discount": "",
            "unit": ""

        }
        let arr = this.state.productData;
        arr.push(obj);
        this.state.productData = arr;
        this.setState({
            productData: this.state.productData
        })
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
        this.state.productData[key].productArr = val.totalData;
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

    onAddProduct = async () => {
        // let modProductData = modProductHeirarchyData(this.state.productData);
        let validateProductData = validateProductHeirarchyData(this.state.productData)
        if (validateProductData) {
            let reqData = {
                "organizationId": this.state.selectedContactObj.organizationId,
                "productArr": this.state.productData,
                "masterMdouleTypeId": "20"
            }
            this.setState({ addProductLoader: true });
            let responseData = await MiddlewareCheck("addProductWithOrg", reqData, this.props);
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
                        productLoaader: true
                    })
                    this.fetchProductByOrgApiCall();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ addProductLoader: false, productLoaader: false });
        }
    }

    onDeleteProduct = async (item, index) => {
        let reqData = {
            "organizationId": this.state.selectedContactObj.organizationId,
            "id": item.id,
            "masterMdouleTypeId": "20"
        }
        this.state.productDetails[index].deleteProductLoader = true;
        this.setState({ productDetails: this.state.productDetails });
        let responseData = await MiddlewareCheck("deleteProductByOrg", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.productDetails[index].deleteProductLoader = false;
        this.state.productDetails.splice(index, 1);
        this.setState({ productDetails: this.state.productDetails });
    }

    openAddContactModal = () => {
        this.setState({ isAddContactModal: true });
    }

    onCloseAddContactModal = () => {
        this.setState({ isAddContactModal: false });
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
                        {this.state.productLoaader ? null : <>

                            <View style={{ height: 10 }} />
                            <DynamicProductMapping
                                // editData={item.productArr}
                                flexDirection={"row"}
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

    activityDetailsView = () => {
        return (
            <>
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{}} onPress={() => this.onOpenFilterModal()}>
                        <Image source={ImageName.FILTER_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                {this.state.activityDetails.length > 0 ?
                    <>
                        <View style={{ marginTop: 10 }} >
                            {this.activityInfo()}
                        </View>
                    </>
                    :
                    <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.textAssigntoName}>No Data Found !</Text>
                    </View>
                }
            </>

        )
    }
    contactInfo = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textDetailsInfo}>Contact Information</Text>
                    </View>
                    <View style={{ flex: 0.5 }} />
                    <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.openAddContactModal()}>
                        <Text style={styles.textAssigntoName}>+Add New Contact</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginTop: 10 }} />
                {this.state.contactListLoader ?
                    <ActivityIndicator />
                    :
                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {this.state.contactInfo.map((item, key) => (
                            <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={key}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.contactName}</Text>
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Contact Name</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.phoneNumber}</Text>
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_TINTS, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Phone Number</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                }
            </>
        )

    }

    productInfo = () => {
        return (
            <View >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textDetailsInfo}>Product Added for the account</Text>
                </View>
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
                            {this.state.productDetails.map((item, key) => (
                                <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={key}>
                                    <View style={{ flex: 0.3 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.hmName}</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Product Name</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.price}</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Price</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.discount}</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Discount</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.quantity}</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Quantity</Text>
                                    </View>
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

    modalSec = () => {
        return (
            <>
                <AddActivity
                    isVisible={this.state.isAddActivityModal}
                    customerList={this.state.subordinateList}
                    selectedItemData={this.state.selectedContactObj}
                    onCloseModal={() => this.onCloseAddActivityModal()}
                    onPressAddActivity={(data) => this.onAddNewActivityData(data)}
                />
                <ActivityFilterModal
                    isVisible={this.state.isFilterModal}
                    onSearch={(value) => this.onFilterApiCall(value)}
                    onCloseModal={() => this.onCloseFilterModal()}
                />
                <AddContactModal
                    isVisible={this.state.isAddContactModal}
                    customerList={this.state.subordinateList}
                    selectedItemData={this.state.selectedContactObj}
                    onCloseModal={() => this.onCloseAddContactModal()}
                    onPressAddContact={(data) => this.onAddNewContactData(data)}
                />
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
                        <ScrollView showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onReload()}
                                />
                            }>
                            {/* <View style={styles.backSec}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.mainView}>
                                <View style={styles.shadowBox}>
                                    {this.detailsView()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.activityDetailsView()}

                                </View>
                                <View style={styles.shadowBox}>
                                    {this.contactInfo()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.productInfo()}
                                </View>


                                <View style={{ marginBottom: 50 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetails);