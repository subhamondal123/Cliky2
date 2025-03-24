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
import { modActivityDetailsData, modEnqContactData, modProductData, modProductHeirarchyData, modifyLocationMappedData, modifyPriorityStatus, modifySalesStage, modifyUserData, validateActivityData, validateProductHeirarchyData } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActivityFilterModal, AddActivity, ArrowProgressTracker, EnquiryListDetailsFilterModal, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, TextInputBox } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import BigTextButton from "../../../../shared/big-text-button";
// import { LeadStatusModal } from "./sub-component";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { modifyApiResp } from "./Function";
import { App_uri } from "../../../../services/config";
import Tooltip from "react-native-walkthrough-tooltip";
import * as Progress from 'react-native-progress';
import { DynamicProductMapping } from "../../../../pageShared";
import Header from "../../header/Header";


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

const activityType = [
    {
        id: 1,
        tabButtonName: "All",
        check: true
    },
    {
        id: 2,
        tabButtonName: "Mail",
        check: false
    },
    {
        id: 3,
        tabButtonName: "Call",
        check: false
    },
    {
        id: 4,
        tabButtonName: "Meeting",
        check: false
    },
]


class EnquiryListDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectTabId: 1,
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: [],
            selectStatusObj: {},


            detailsInfoData: [],
            allPersonalDetails: [],

            ProfileModal: false,
            allLeadStatus: [],
            selectedStageObj: {},
            showHideModal: false,
            pageLoader: true,

            allLeadBy: {},
            allData: {},
            allCompetitor: [],

            detailsModal: false,
            downloadCheck: false,

            popUpModal: false,
            popUpType: "",

            isVisibleStatusModal: false,
            statusModalLoader: false,

            competitorModalVisibility: false,
            refreshing: false,
            selectedEnquiryObj: {},
            enquiryDetails: {},
            activityTabType: activityType,
            activityTypeDetails: [],
            isAddActivityModal: false,
            subordinateList: [],
            activityDetails: [],
            enquiryContact: [],
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
            deleteProductLoader: false,
            isFilterModal: false,
            productListLoader: false,
            filterLoader: false,
            activityLoader: false
        }
    }

    componentDidMount = async () => {
        await this._load();
    }


    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
    }
    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("LeadDetails");
        this.props.navigation.navigate("NetworkError");
    }

    _load = async () => {
        this.setState({
            selectedEnquiryObj: this.props.route.params.data
        })

        await this.fetchEnquiryDetails();
        await this.activityDetailsApiCall({ activityId: "", date: "" });
        await this.fetchContactByEnquiryApiCall();
        await this._getProductHierarchyTypesSlNo();
        await this.fetchProductByEnquiryApiCall();
        await this.fetchSubordinateList()

        this.setState({
            pageLoader: false
        })
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

    fetchProductByEnquiryApiCall = async () => {
        let reqData = {
            "enquiryId": this.state.selectedEnquiryObj.enqueryId,
            "masterMdouleTypeId": "20"
        }
        this.setState({ productListLoader: true });
        let responseData = await MiddlewareCheck("fetchProductByEnquiry", reqData, this.props);
        if (responseData) {
            if (responseData === false) {
                this._onNetworkError();
            } else {
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

    fetchContactByEnquiryApiCall = async () => {
        let reqData = {
            "enquiryId": this.state.selectedEnquiryObj.enqueryId,
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchContactByEnquiry", reqData, this.props);
        if (responseData) {
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let modEnqContactDetails = modEnqContactData(responseData.response);
                    this.setState({ enquiryContact: modEnqContactDetails });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    activityDetailsApiCall = async (data) => {
        let reqData = {
            "typeDataId": this.state.selectedEnquiryObj.enqueryId,
            "type": "4",
            "isCompleted": "",
            "activityTypeId": data.activityId,
            "searchFrom": data.date,
            "searchTo": "",
            "masterMdouleTypeId": "20"
        }
        this.setState({ filterLoader: true });
        let responseData = await MiddlewareCheck("getAllActivitiesTypeWise", reqData, this.props);
        if (responseData) {
            if (responseData === false) {
                this._onNetworkError();
            } else {
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

    fetchEnquiryDetails = async () => {
        let reqData = {
            "enquiryId": this.props.route.params.data.enqueryId,
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchEnquiryDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.enquiryDetails = responseData.response;
                this.setState({
                    enquiryDetails: this.state.enquiryDetails
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
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

    _onActivitiesShowHide = (item, key) => {
        for (let i = 0; i < this.state.allPersonalDetails.length; i++) {
            if (this.state.allPersonalDetails[i].tabName == item.tabName) {
                if (this.state.allPersonalDetails[key].check) {
                    this.state.allPersonalDetails[i]["check"] = false
                } else {
                    this.state.allPersonalDetails[i]["check"] = true
                }
            } else {
                this.state.allPersonalDetails[i]["check"] = false
            }
        }
        this.setState({
            allPersonalDetails: this.state.allPersonalDetails
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

    _onSeleCtTabSection = (item) => {
        this.setState({
            selectTabId: item.id
        })

    }

    _onActivitiesTab = (item) => {
        this.setState({
            selectActivitiesButtonId: item.id
        })
    }

    Actions = () => {

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
            <View style={styles.listDataView}>
                <Text style={[styles.textList, { flex: 0.25 }]}>{item.activityTypeName}</Text>
                <Text style={[styles.textDate, { textAlign: 'center', flex: 0.3 }]}>{DateConvert.formatYYYYMMDD(item.dueDate)}</Text>
                <Text style={[styles.nameText, { flex: 0.25 }]}>{item.firstName + " " + item.lastName}</Text>
                <Text numberOfLines={4} style={[styles.nameText, { flex: 0.2 }]}>{item.remarks}</Text>
                {/* <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.toolTipImg} />
                </TouchableOpacity> */}
            </View>
        )

    }
    ListDataActivitiesUpcoming = () => {
        return (
            this.state.activitiesUpcoming.slice(0, 3).map((item, key) =>
                <React.Fragment key={key}>
                    {this.upcomingList(item, key)}
                </React.Fragment>
            )
        )

    };

    upcomingList = (item, key) => {
        return (
            <View style={styles.listDataView}>
                <Text style={styles.textList}>{item.activityTypeName}</Text>
                <Text style={[styles.textDate, { textAlign: 'center' }]}>{DateConvert.formatYYYYMMDD(item.dueDate)}</Text>
                <Text style={styles.nameText}>{item.firstName + " " + item.lastName}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.toolTipImg} />
                </TouchableOpacity>
            </View>
        )

    }
    phoneNumerSec = (number) => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    <View style={styles.viewImg}>
                        <Image source={ImageName.PHONE} style={styles.img} />
                    </View>
                </View>
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
                <View style={{ flex: 0.3 }}>
                    <View style={styles.viewImg}>
                        <Image source={ImageName.SECURED_LETTER} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Email address</Text>
                    <Text style={styles.viewSubText}>{email}</Text>
                </View>
            </View>
        )
    }
    statusSec = (status) => {
        return (
            <View style={{ marginLeft: '5%', marginTop: 2 }}>
                <Text style={{ color: Color.COLOR.GREEN.SEA_GREEN, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD, }}>{status}</Text>
            </View>
        )
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
                            selectedValue={this.state.selectStatusObj.id ? this.state.selectStatusObj.id.toString() : "0"}
                            data={this.state.status}
                            onSelect={(value) => this._OnSelectStatus(value)}
                            headerText={"Status"}
                            selectedText={this.state.selectStatusObj.name ? this.state.selectStatusObj.name : "Status"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }

    personalData = (item) => {
        let personDropDown = [];
        for (let [key, value] of Object.entries(item.value)) {
            personDropDown.push(
                <View style={{ flexDirection: 'row', marginTop: 8 }} key={key}>
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.detailsSubText}>{value.length == 0 ? 'N/A' : value}</Text>
                    </View>
                </View>
            )
        }
        return (
            personDropDown
        );
    }
    personalListmap = () => {
        return (
            this.state.allPersonalDetails.map((item, key) =>
                <React.Fragment key={key} >
                    {this.personalList(item, key)}
                </React.Fragment>
            )
        )
    }
    personalList = (item, key) => {
        return (
            <View style={styles.showHideBox}>
                <TouchableOpacity style={styles.dropDownSec}
                    onPress={() => this._onActivitiesShowHide(item, key)}
                    activeOpacity={0.9}>
                    <Text style={styles.boxMainText}>{item.tabName}</Text>
                    <Image source={item.check ? ImageName.DROPDOWN_UP_ARROW : ImageName.DROPDOWN_DOWN_ARROW} style={styles.dropDownImg} />
                </TouchableOpacity>
                {item.check ?
                    <React.Fragment>
                        <View style={styles.underLine} />
                        {item.tabName == "Online Existence" ?
                            <React.Fragment>
                                {item.value.map((subItem, subKey) => (
                                    this.personalData(subItem)
                                ))}
                            </React.Fragment>
                            :
                            this.personalData(item)
                        }
                    </React.Fragment> :
                    null
                }
            </View>
        )
    }
    ViewDetailsData = (item) => {
        let detailsDropDown = [];
        for (let [key, value] of Object.entries(item.value)) {
            detailsDropDown.push(
                <View style={{ flexDirection: 'row', marginTop: 8 }} key={key}>
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.detailsSubText}>{value.length == 0 ? 'N/A' : value}</Text>
                    </View>
                </View>
            )
        }
        return (
            detailsDropDown
        );
    }
    listBusiness = () => {
        return (
            this.state.detailsInfoData.map((item, key) =>
                <React.Fragment key={key} >
                    {this.businessDetails(item, key)}
                </React.Fragment>
            )
        )
    }
    businessDetails = (item, key) => {
        return (
            <View style={styles.showHideBox}>
                <ScrollView>
                    <TouchableOpacity style={styles.dropDownSec}
                        onPress={() => this._onShowHide(item, key)}
                        activeOpacity={0.9}>
                        <Text style={styles.boxMainText}>{item.tabName}</Text>
                        <Image source={item.check ? ImageName.DROPDOWN_UP_ARROW : ImageName.DROPDOWN_DOWN_ARROW} style={styles.dropDownImg} />
                    </TouchableOpacity>
                </ScrollView>
                {item.check ?
                    <React.Fragment>
                        <View style={styles.underLine} />
                        {this.ViewDetailsData(item)}
                    </React.Fragment> :
                    null
                }
            </View>
        )
    }

    activitiesButton = () => {
        return (
            <TouchableOpacity style={styles.addactivitiesButton}
                activeOpacity={0.9}>
                <Text style={styles.activitiesTabText}>Add Activity</Text>
                <Image source={ImageName.WHITE_PLUS} style={styles.whiteImg} />
            </TouchableOpacity>
        )
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

    tabLeadStatusSection = () => {
        return (

            <ArrowProgressTracker
                data={this.state.allLeadStatus}
                buttonNameType={"salesStageName"}
                eachCellWidth={150}
                height={30}
                onPress={(item) => this._onSelectModalButton(item)}
                activeValueType={"isCompleted"}
                marginLeft={2}
                marginRight={2}

            />
            // this.state.allLeadStatus.map((item, key) =>
            //     <React.Fragment key={key}>
            //         {this.statusLeadaTab(item, key)}
            //     </React.Fragment>
            // )
        )
    }

    _onShowMore = () => {
        // this.props.navigation.navigate("leadActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "upcoming" })
    }
    _onBack = () => {
        this.props.navigation.goBack()
    }

    // for prediction score view
    _onPredictionScore = (prediction) => {
        return (
            <View style={{ marginTop: 5, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.textDetailsInfo}>Prediction Score</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: "#0068FF", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginTop: 6 }}>{prediction.toString() + '%'}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Progress.Bar
                        progress={prediction / 100}
                        width={Dimension.width / 1.3}
                        color={"#0068FF"}
                        borderWidth={1}
                        height={15}
                        borderRadius={14}
                    />
                </View>
            </View>
            // <Progress.Bar progress={this.state.allData.probabilityOfWining / 100} />
            // <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: '5%' }}>
            //     <ProgressCircle
            //         percent={60}
            //         radius={40}
            //         borderWidth={8}
            //         color="#0068FF"
            //         shadowColor={Color.COLOR.GRAY.LIGHT_GRAY_COLOR}
            //         bgColor="#fff"
            //     >
            //         <Text style={{ fontSize: 12, color: "#0068FF", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>{'60%'}</Text>
            //     </ProgressCircle>
            // </View>
        )
    }

    openActivityModal = () => {
        this.setState({ isAddActivityModal: true })
    }

    // for prediction score view
    detailsView = () => {
        return (
            <React.Fragment>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.textAssignTo}>Contact : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} onPress={() => this._onStatusModal()}>{this.state.enquiryDetails.ownerPhoneNo}</Text></Text>
                            <Text style={styles.textAssignTo}>Email : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} onPress={() => this._onStatusModal()}>{this.state.enquiryDetails.ownerEmail}</Text></Text>
                            <Text style={styles.textAssignTo}>Other Details</Text>
                            <Text style={styles.textAssignTo}>Owner Name : <Text style={styles.textAssigntoName}>{this.state.enquiryDetails.contactName}</Text></Text>
                            <Text style={styles.textAssignTo}>Notes : <Text style={styles.textAssigntoName}>{this.state.enquiryDetails.notes}</Text></Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            {this.state.enquiryDetails.location.map((item, index) => (
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

    onOpenAndClosePopUp = (type) => {
        if (this.state.popUpModal == false) {
            this.setState({
                popUpModal: true,
                popUpType: type
            })
        } else {
            this.setState({
                popUpModal: false,
            })
        }
    }

    _onStatusModal = (item) => {
        if (this.state.isVisibleStatusModal == false) {
            this.setState({
                isVisibleStatusModal: true,
                selectStatusObj: {}
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
                selectStatusObj: {}
            })
        }
    }

    _onUpdateStatus = async () => {
        if (this.state.selectStatusObj.id == undefined || this.state.selectStatusObj.id == null) {
            Toaster.ShortCenterToaster("Please select status!")
        } else {
            this.setState({
                statusModalLoader: true
            });
            // let reqData = {
            //     leadId: [this.props.route.params.data.leadId.toString()],
            //     leadTypeStatus: this.state.selectStatusObj.id
            // }
            // let statusObj = this.state.selectStatusObj;
            // let responseData = await MiddlewareCheck("updateLeadTypeStatus", reqData, this.props);
            // if (responseData === false) {
            //     this._onNetworkError();
            // } else {
            //     if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            //         Toaster.ShortCenterToaster(responseData.message);
            //         await this._onStatusModal();
            //         await this._resetStateVariable();
            //         await this._load();
            //         // this.props.route.params.onReloadListPage();
            //         this.props.route.params.onChangeStatus({ leadId: this.props.route.params.data.leadId, statusObj: statusObj });
            //     } else {
            //         Toaster.ShortCenterToaster(responseData.message);
            //     }
            // }
            this.setState({
                statusModalLoader: false
            });
        }
    }

    _onReload = async () => {
        await this._resetStateVariable();
        await this._load();
    }

    _resetStateVariable = async () => {
        this.setState({
            selectTabId: 1,
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: CommonData.COMMON.LEAD_DETAILS_STATUS,
            selectStatusObj: {},


            detailsInfoData: [],
            allPersonalDetails: [],

            ProfileModal: false,
            allLeadStatus: [],
            selectedStageObj: {},
            showHideModal: false,
            pageLoader: true,

            allLeadBy: {},
            allData: {},
            allCompetitor: [],

            detailsModal: false,
            downloadCheck: false,

            popUpModal: false,
            popUpType: "",
        })
    }

    _onStageUpdateSuccess = async () => {
        await this._onMarkStage();
        await this._resetStateVariable();
        await this._load();
    }

    competitorItem = (item) => {
        let alllistCompetitor = []
        for (let [key, value] of Object.entries(item)) {
            alllistCompetitor.push(
                <View style={{ flexDirection: 'row', marginBottom: 8 }} key={key}>
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.detailsSubText}>{value.length == 0 ? 'N/A' : value}</Text>
                    </View>
                </View>
            )
        }
        return (
            alllistCompetitor
        );
    }

    onOpenCloseCompetitorModal = () => {
        this.setState({
            competitorModalVisibility: !this.state.competitorModalVisibility
        })
    }

    competitorModal = () => {
        return (
            <Modal
                isVisible={this.state.competitorModalVisibility}
                children={
                    <View style={[styles.modalstatusview, { paddingBottom: 30 }]}>
                        <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: '2%' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Competitor Info</Text>
                            </View>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => this.onOpenCloseCompetitorModal()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: '5%' }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.state.allCompetitor.map((item, key) => (
                                    <View style={this.state.allCompetitor.length - 1 == key ? {} : { marginTop: 10, borderBottomWidth: 0.5, borderColor: Color.COLOR.GRAY.SONIC_SILVER }} key={key}>
                                        {this.competitorItem(item)}
                                    </View>
                                ))}
                                <View style={{ height: 30 }} />
                            </ScrollView>
                        </View>
                    </View>
                }
            />
        )
    }

    activityInfo = () => {
        return (
            <>
                {this.state.filterLoader ?
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

    modalSec = () => {
        return (
            <>
                {this.state.isFilterModal ?
                    <ActivityFilterModal
                        isVisible={this.state.isFilterModal}
                        onSearch={(value) => this.onFilterApiCall(value)}
                        onCloseModal={() => this.onCloseFilterModal()}
                        onReset={() => this.onResetFilter()}
                    />
                    : null}
                {this.state.isAddActivityModal ?
                    <AddActivity
                        isVisible={this.state.isAddActivityModal}
                        customerList={this.state.subordinateList}
                        // selectedItemData={this.state.selectedEnquiryObj}
                        onCloseModal={() => this.onCloseAddActivityModal()}
                        onPressAddActivity={(data) => this.onAddNewActivityData(data)}
                    />
                    : null}
            </>
        )
    }

    onCloseAddActivityModal = () => {
        this.setState({ isAddActivityModal: false });
    }


    onAddNewActivityData = async (data) => {
        let reqData = {
            "type": "4",
            "typeDataId": this.props.route.params.data.enqueryId,
            "activityTypeId": data.activityTypeId,
            "assignDueDate": data.assignDueDate,
            "assignDueTime": data.timeRaw,
            "description": data.description,
            "assignTo": data.assignTo,
            "masterMdouleTypeId": "20",
            "time": data.assignDueTime
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

    _productSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.GRAY.DAVY_GRAY, marginVertical: 15 }}>
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
                                // editData={item.productArr}
                                flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => this.onSelectLocationData(value, key)}
                            />
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

    onAddProduct = async () => {
        let validateProductData = validateProductHeirarchyData(this.state.productData)
        if (validateProductData) {
            let reqData = {
                "enquiryId": this.state.selectedEnquiryObj.enqueryId,
                "productArr": this.state.productData,
                "masterMdouleTypeId": "20"
            }
            this.setState({ addProductLoader: true });
            let responseData = await MiddlewareCheck("addProductWithEnquiry", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.activityTypeDetails = responseData.response;
                    Toaster.ShortCenterToaster(responseData.message)
                    this.fetchProductByEnquiryApiCall();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ addProductLoader: false });
        }
    }

    onDeleteProduct = async (item, index) => {
        let reqData = {
            "enquiryId": this.state.selectedEnquiryObj.enqueryId,
            "id": item.id,
            "masterMdouleTypeId": "20"
        }
        this.state.productDetails[index].deleteProductLoader = true;
        this.setState({ productDetails: this.state.productDetails });
        let responseData = await MiddlewareCheck("deleteProductWithEnquiry", reqData, this.props);
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

    onFilterApiCall = async (value) => {
        await this.activityDetailsApiCall(value);
        this.setState({ isFilterModal: false });
    }

    onResetFilter = async (value) => {
        await this.activityDetailsApiCall({ activityId: "", date: "" });
        this.setState({ isFilterModal: false });
    }

    onOpenFilterModal = () => {
        this.setState({ isFilterModal: true });
    }

    onCloseFilterModal = () => {
        this.setState({ isFilterModal: false });
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <React.Fragment>
                        {this.modalSec()}
                        <Header {...this.props} />
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
                                    {this.detailsView()}
                                </View>
                                <View style={styles.shadowBox}>
                                    {this.activityDetailsView()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.textDetailsInfo}>Contact Information</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />

                                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                        {this.state.enquiryContact.map((item, key) => (
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
                                </View>

                                <View style={styles.shadowBox}>
                                    <View style={{}}>
                                        <Text style={styles.textDetailsInfo}>Product Added for the Enquiry</Text>
                                        <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 10 }} />

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
                                        <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryListDetails);