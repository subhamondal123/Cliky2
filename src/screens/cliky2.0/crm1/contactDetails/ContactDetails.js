import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    RefreshControl,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CommonData, ErrorCode, LengthValidate } from '../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, DropdownInputBox, BigTextButton } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import { modifyApiResp } from "./Function";
let StatusArr = [
    {
        id: "1",
        name: "Active"
    },
    {
        id: "0",
        name: "Inactive"
    },
]

let StaticActivity = [
    {
        id: 1,
        type: "Complete work area parking",
        dateDue: "23-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 2,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 3,
        type: "Complete new workspace connection",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 4,
        type: "New Complex at Rajarhat Space",
        dateDue: "27-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 5,
        type: "New Complex at Rajarhat Space",
        dateDue: "27-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 6,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 7,
        type: "Complete new workspace connection",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 8,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 9,
        type: "Complete new workspace connection",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },

];
let StaticActivityUpcoming = [
    {
        id: 1,
        type: "Complete work area parking",
        dateDue: "23-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 2,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },


];

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

let tabButtonOne = [
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

const actions = [
    {
        text: "Add Activity",
        icon: ImageName.WHITE_PLUS,
        name: "bt_addActivity",
        position: 2
    }
];
let allCompetitor = {
    "Business Name": "SRMB TMT Bar",
    "Business Type": "Coustomar Details",
    "Business Establishment Date": "20/08/22",
    "Annual Turnover": ""

};



class ContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectTabId: 1,
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: CommonData.COMMON.STATUS,
            selectStatusObj: {},


            detailsInfoData: [],
            ProfileModal: false,


            allPersonalDetails: [],
            pageLoader: true,

            allCustomerDetailsData: {},

            detailsModal: false,
            allBusiness: [],

            popUpModal: false,
            popUpType: "",

            isVisibleStatusModal: false,
            selectedStatusDataObj: {},
            statusModalLoader: false,

            refreshing: false
        }
    }


    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("CustomarDetails");
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {

        this._load();
    }

    _load = async () => {

        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            this.state.detailsInfoData[i]["check"] = false;
        }
        for (let i = 0; i < this.state.allPersonalDetails.length; i++) {
            this.state.allPersonalDetails[i]["check"] = false;
        }

        this.setState({
            // tabSecButton: tabButton,
            // activitiesList: StaticActivity,
            activitiesButton: activitiesTabButton,
            // allBusiness: allCompetitor
            // activitiesUpcoming: StaticActivityUpcoming

        })


        let reqData = {
            contactId: this.props.route.params.data.contactId

        }

        let responseData = await MiddlewareCheck("getContactDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let type = responseData.response[0].organization.length == 0 ? "self" : "business"
                let modifiedResp = modifyApiResp(responseData.response, type)
                this.state.detailsInfoData = modifiedResp.businessDetails;
                this.state.allPersonalDetails = modifiedResp.personalDetails;
                this.state.selectStatusObj = modifiedResp.slectedStatusObj;
                this.state.allCustomerDetailsData = responseData.response[0];
                this.state.allBusiness = modifiedResp.businessInfo
                this.setState({
                    allCustomerDetailsData: this.state.allCustomerDetailsData,
                    detailsInfoData: this.state.detailsInfoData,
                    allPersonalDetails: this.state.allPersonalDetails,
                    tabSecButton: type == "self" ? tabButtonOne : tabButton,
                    selectTabId: type == "self" ? 2 : 1,
                    selectStatusObj: this.state.selectStatusObj,
                    allBusiness: this.state.allBusiness
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        let reqPastActivityData = {
            contactId: this.props.route.params.data.contactId,
            limit: 4,
            offset: 0,
            type: "all"
        }
        let pastActivityResponseData = await MiddlewareCheck("getContactAllActivity", reqPastActivityData, this.props);
        if (pastActivityResponseData === false) {
            this._onNetworkError();
        } else {
            if (pastActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                this.state.activitiesList = pastActivityResponseData.response.activityListData.data;
                this.setState({
                    activitiesList: this.state.activitiesList
                })
            } else {
                Toaster.ShortCenterToaster(pastActivityResponseData.message)
            }
        }

        // let reqUpcomingActivityData = {
        //     contactId: this.props.route.params.data.contactId,
        //     limit: 4,
        //     offset: 0,
        //     type: "up"
        // }
        // let upcomingActivityResponseData = await MiddlewareCheck("getContactAllActivity", reqUpcomingActivityData);
        // if (upcomingActivityResponseData === false) {
        //     this._onNetworkError();
        // } else {
        //     if (upcomingActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         this.state.activitiesUpcoming = upcomingActivityResponseData.response.activityListData.data;
        //         this.setState({
        //             activitiesUpcoming: this.state.activitiesUpcoming
        //         })
        //     } else {
        //         Toaster.ShortCenterToaster(upcomingActivityResponseData.message)
        //     }
        // }

        this.setState({
            pageLoader: false
        })

    }

    _onReloadPage = async () => {
        await this._resetStateVariable();
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


        // this.state.allPersonalDetails[key].check = !this.state.allPersonalDetails[key].check;

    }

    _OnSelectStatus = (value) => {
        let data = this.state.allCustomerDetailsData.contactStatus;
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
                <Text style={[styles.nameText, { flex: 0.25 }]}>{item.contactFullName ? item.contactFullName : ""}</Text>
                <Text numberOfLines={4} style={[styles.nameText, { flex: 0.2 }]}>{item.remarks ? item.remarks : "N/A"}</Text>
                {/* <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT} style={styles.toolTipImg} />
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
            <View style={styles.listDataView} key={key}>
                <Text style={styles.textList}>{item.type}</Text>
                <Text style={styles.textDate}>{item.dateDue}</Text>
                <Text style={styles.nameText}>{item.assignedTo}</Text>
                {/* <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT} style={styles.toolTipImg} />
                </TouchableOpacity> */}
            </View>
        )
    }

    phoneNoSection = () => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    <View style={styles.viewImg}>
                        <Image source={ImageName.PHONE} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Phone Number</Text>
                    <Text style={styles.viewSubText}>{this.state.allCustomerDetailsData.contactPhone}</Text>
                </View>
            </View>
        )
    }

    emailSection = () => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    <View style={styles.viewImg}>
                        <Image source={ImageName.SECURED_LETTER} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Email Address</Text>
                    <Text style={styles.viewSubText}>{this.state.allCustomerDetailsData.contactEmail}</Text>
                </View>
            </View>
        )
    }

    statusSec = (status) => {
        return (
            <View style={{ marginLeft: '8%' }}>
                <Text style={{ color: Color.COLOR.GREEN.SEA_GREEN, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD, }}>{status == "1" ? "Active" : "Inactive"}</Text>
            </View>
        )
    }

    _onStatusModal = (item) => {
        if (this.state.isVisibleStatusModal == false) {
            this.setState({
                isVisibleStatusModal: true,
                selectedStatusDataObj: {}
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
                selectedStatusDataObj: {}
            })
        }
    }
    _OnSelectPriorityStatus = (value) => {
        this.setState({
            selectedStatusDataObj: value
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
                            selectedValue={this.state.selectedStatusDataObj.id ? this.state.selectedStatusDataObj.id.toString() : ""}
                            data={this.state.status}
                            onSelect={(value) => this._OnSelectPriorityStatus(value)}
                            headerText={"Status"}
                        // selectedText={this.state.selectPriorityStatusObj.name ? this.state.selectPriorityStatusObj.name : "Status"}
                        />
                    </View>

                </View>



            </React.Fragment>
        )
    }





    _onStatusView = () => {

        let cantactStatusName = "";
        if (this.state.allCustomerDetailsData.contactStatus !== undefined) {
            if (this.state.allCustomerDetailsData.contactStatus == 1) {
                cantactStatusName = "ACTIVE"
            } else {
                cantactStatusName = "INACTIVE"
            }
        }
        return (
            <React.Fragment>
                {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <View style={{}}>
                            {this.statusSec(this.state.allCustomerDetailsData.contactStatus)}
                            <View style={{  }}>
                                <DropdownInputBox
                                    selectedValue={this.state.selectStatusObj.id ? this.state.selectStatusObj.id.toString() : "0"}
                                    data={this.state.status}
                                    onSelect={(value) => this._OnSelectStatus(value)}
                                    headerText={"Status"}
                                    selectedText={this.state.selectStatusObj.name ? this.state.selectStatusObj.name : "Status"}
                                    isDisabled={true}
                                />
                            </View>
                        </View>
                    </View>
                </View> */}
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this._onStatusModal()}
                            activeOpacity={0.9}>
                            <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN, marginLeft: '5%' }]}>{cantactStatusName}</Text>
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 10, width: 10, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textAssignTo}>Party Code: <Text style={styles.textAssigntoName}>P O</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Record ID :</Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allCustomerDetailsData.contactId ? ("WS0700048" + this.state.allCustomerDetailsData.contactId.toString()) : ""}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Relationship : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allCustomerDetailsData.contactTypeName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Onbording Date : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{DateConvert.formatYYYYMMDD(this.state.allCustomerDetailsData.onbordingDate)}</Text>
                    </View>
                </View>
                {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Designation : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>N/A</Text>
                    </View>
                </View> */}

            </React.Fragment>
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
                        <Text style={styles.detailsSubText}>{value.length > 0 ? value : "N/A"}</Text>
                    </View>
                </View>
            )
        }
        return (
            detailsDropDown
        );
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
                        <Text style={styles.detailsSubText}>{value.length > 0 ? value : "N/A"}</Text>
                    </View>
                </View>
            )
        }
        return (
            personDropDown
        );
    }

    detailsInfoDropDown = () => {
        return (
            <View style={styles.shadowBox}>
                {/* <Text style={styles.textDetailsInfo}>Detail informations</Text> */}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.tabSec}>
                        {this.state.tabSecButton.map((item, key) =>
                            <React.Fragment key={key}>
                                <TouchableOpacity style={this.state.selectTabId == item.id ? styles.activeTabView : styles.tabView}
                                    onPress={() => this._onSeleCtTabSection(item)}
                                    activeOpacity={0.9}>
                                    <Text style={this.state.selectTabId == item.id ? styles.activeTextTab : styles.textTab}>{item.tabButtonName}</Text>
                                </TouchableOpacity>
                            </React.Fragment>
                        )}
                    </View>

                    {this.state.selectTabId == 1 ?
                        <React.Fragment>
                            {this.state.detailsInfoData.map((item, key) =>
                                <React.Fragment key={key} >
                                    <View style={styles.showHideBox}>
                                        <TouchableOpacity style={styles.dropDownSec}
                                            onPress={() => this._onShowHide(item, key)}
                                            activeOpacity={0.9}>
                                            <Text style={styles.boxMainText}>{item.tabName}</Text>
                                            <Image source={item.check ? ImageName.DROPDOWN_UP_ARROW : ImageName.DROPDOWN_DOWN_ARROW} style={styles.dropDownImg} />
                                        </TouchableOpacity>
                                        {item.check ?
                                            <React.Fragment>
                                                <View style={styles.underLine} />
                                                {this.ViewDetailsData(item)}
                                            </React.Fragment> :
                                            null
                                        }
                                    </View>
                                </React.Fragment>
                            )}
                        </React.Fragment> :
                        <React.Fragment>
                            {this.state.allPersonalDetails.map((item, key) =>
                                <React.Fragment key={key} >
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
                                                {item.tabName == "Online Existence" || item.tabName == "Dates to remember" ?
                                                    <React.Fragment>
                                                        {item.value.map((subItem, subKey) => (
                                                            <View key={subKey} style={item.tabName == "Dates to remember" ? { paddingBottom: 10 } : {}}>
                                                                {this.personalData(subItem)}

                                                            </View>
                                                        ))}
                                                    </React.Fragment>
                                                    :
                                                    <View>
                                                        {this.personalData(item)}
                                                    </View>
                                                    // personalData(item)
                                                }
                                            </React.Fragment> :
                                            null
                                        }
                                    </View>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    }

                    <View style={{ marginBottom: 50 }} />
                </ScrollView>
            </View>
        )
    }

    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
    }
    _onShowMore = () => {
        this.props.navigation.navigate("ContactActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "upcoming" })
    }

    _onBack = () => {
        this.props.navigation.goBack();
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


    businessInfo = (item) => {
        let allBusinessInfo = []
        for (let [key, value] of Object.entries(this.state.allBusiness)) {
            allBusinessInfo.push(
                <View style={{ flexDirection: 'row', marginBottom: 8 }} key={key}>
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.detailsHeaderText}>{key}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.detailsHeaderText}>:</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.detailsSubText}>{value.length > 0 ? value : "N/A"}</Text>
                    </View>
                </View>
            )
        }
        return (
            allBusinessInfo
        );
    }

    _resetStateVariable = async () => {
        this.setState({
            selectTabId: 1,
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            status: CommonData.COMMON.STATUS,
            selectStatusObj: {},
            detailsInfoData: [],
            ProfileModal: false,
            allPersonalDetails: [],
            pageLoader: true,
            allCustomerDetailsData: {},
            detailsModal: false,
            allBusiness: [],
        })
    }


    _onUpdateStatus = async () => {
        if (this.state.selectedStatusDataObj.id == undefined || this.state.selectedStatusDataObj.id == null) {
            Toaster.ShortCenterToaster("Please select status!")
        } else {
            if (this.state.allCustomerDetailsData.contactStatus == this.state.selectedStatusDataObj.value.toString()) {
                this._onStatusModal();
            } else {
                this.setState({
                    statusModalLoader: true
                });

                let reqData = {
                    contactId: [this.props.route.params.data.contactId.toString()],
                    activeStatus: this.state.selectedStatusDataObj.value.toString()
                }
                let statusObj = this.state.selectedStatusDataObj;
                let responseData = await MiddlewareCheck("changeContactStatus", reqData, this.props);

                if (responseData === false) {
                    this._onNetworkError();
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.props.route.params.onChangeStatus({ contactId: this.props.route.params.data.contactId, statusObj: statusObj });
                        this.state.allCustomerDetailsData.contactStatus = reqData.activeStatus;
                        this.setState({
                            allCustomerDetailsData: this.state.allCustomerDetailsData
                        })
                        await this._onStatusModal();
                        Toaster.ShortCenterToaster(responseData.message);
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);
                    }
                }
                this.setState({
                    statusModalLoader: false
                });
            }
        }
    }


    render() {


        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                    :
                    <React.Fragment>
                        <PhoneEmailLocationPopup
                            isVisible={this.state.popUpModal}
                            data={this.state.popUpType == "phone" ? this.state.allCustomerDetailsData.contactPhone : this.state.popUpType == "email" ? this.state.allCustomerDetailsData.contactEmail : this.state.popUpType == "location" ? this.state.allCustomerDetailsData.contactAddress : ""}
                            type={this.state.popUpType}
                            onCloseModal={() => this.onOpenAndClosePopUp()}
                        />
                        <Modal
                            isVisible={this.state.detailsModal}
                            children={
                                <View style={styles.modalview}>
                                    <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: '2%' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.headerText}>Details Info</Text>
                                        </View>
                                        <TouchableOpacity style={styles.cancelSec}
                                            activeOpacity={0.8}
                                            onPress={() => this._detailsModal()}>
                                            <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginHorizontal: '2%' }}>
                                        {this.detailsInfoDropDown()}
                                    </View>
                                </View>
                            }
                        />
                        <Modal
                            isVisible={this.state.isVisibleStatusModal}
                            onRequestClose={() => this._onStatusModal()}
                            onBackdropPress={() => this._onStatusModal()}
                            onBackButtonPress={() => this._onStatusModal()}
                            children={
                                <View style={styles.modalstatusview}>
                                    <View style={styles.modalHeaderSec}>
                                        <View style={styles.madalMarginView}>
                                            <Text style={styles.profileNameText}>Change Status</Text>
                                        </View>
                                    </View>
                                    {this.state.statusModalLoader ?
                                        <View style={{ paddingVertical: 40, }}>
                                            <Loader />
                                        </View>
                                        :
                                        <>
                                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                            </View>
                                            {this.proretyStatusSec()}
                                            <View style={{ marginHorizontal: '5%', marginTop: 40, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                                    <BigTextButton
                                                        height={40}
                                                        borderRadius={24}
                                                        backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                                        text={"Cancel"}
                                                        onPress={() => this._onStatusModal()}
                                                    />
                                                </View>
                                                <View style={{ flex: 1, marginHorizontal: '5%' }}>
                                                    <BigTextButton
                                                        height={40}
                                                        borderRadius={24}
                                                        text={"Ok"}
                                                        onPress={() => this._onUpdateStatus()}
                                                    />
                                                </View>
                                            </View>
                                        </>
                                    }
                                </View>
                            }
                        />

                        <View style={{ marginHorizontal: '2%', marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ marginTop: 2 }}
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                                <View style={styles.imgSec}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => this._detailsModal()}>
                                        <Image source={this.state.allCustomerDetailsData.contactPrflPic && this.state.allCustomerDetailsData.contactPrflPic.length > 0 ? { uri: App_uri.SFA_IMAGE_URI + this.state.allCustomerDetailsData.contactPrflPic } : ImageName.USER_IMG} style={styles.userImg} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                                        <Text numberOfLines={1} style={styles.textFollowUpCall}>{(this.state.allCustomerDetailsData.contactFirstName ? this.state.allCustomerDetailsData.contactFirstName : "") + " " + (this.state.allCustomerDetailsData.contactLastName ? this.state.allCustomerDetailsData.contactLastName : "")}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TouchableOpacity
                                            style={{ justifyContent: 'center', alignItems: 'center' }}
                                            activeOpacity={0.9}
                                            onPress={() => this.onOpenAndClosePopUp("location")}>
                                            <Image source={ImageName.LOCATION_BLACK} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TouchableOpacity
                                            style={{ justifyContent: 'center', alignItems: 'center' }}
                                            activeOpacity={0.9}
                                            onPress={() => this.onOpenAndClosePopUp("phone")}>
                                            <Image source={ImageName.CALL_BLACK} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TouchableOpacity
                                            style={{ justifyContent: 'center', alignItems: 'center' }}
                                            activeOpacity={0.9}
                                            onPress={() => this.onOpenAndClosePopUp("email")}>
                                            <Image source={ImageName.SMS_LOGO} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 5 }} />
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onReloadPage()}
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
                                {/* <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center', paddingVertical: 10
                                }}>
                                    <Image source={this.state.allCustomerDetailsData.contactPrflPic && this.state.allCustomerDetailsData.contactPrflPic.length > 0 ? { uri: App_uri.IMAGE_VIEW_URI + this.state.allCustomerDetailsData.contactPrflPic } : ImageName.NO_IMG} style={styles.profileImg} />
                                    <Text style={styles.textFollowUpCall}>{this.state.allCustomerDetailsData.contactFirstName + " " + this.state.allCustomerDetailsData.contactLastName}</Text>
                                    <Text style={styles.textPhoneCall}>Relationship : <Text style={styles.textPhoneCall}>{this.state.allCustomerDetailsData.contactTypeName}</Text></Text>
                                    <Text style={styles.textPhoneCall}>Record ID : <Text style={styles.textPhoneCall}>{"WS0700048" + this.state.allCustomerDetailsData.contactId.toString()}</Text></Text>

                                </View> */}

                                <View style={styles.shadowBox}>
                                    {/* {this.phoneNumerSec(this.state.allData.OrgDetails.phone)} */}
                                    {this._onStatusView()}
                                </View>
                                {/* <View style={styles.shadowBox}>
                                    {this.phoneNoSection()}
                                    {this.emailSection()}
                                </View> */}
                                {this.state.allCustomerDetailsData.organization && this.state.allCustomerDetailsData.organization.length == 0 ?
                                    null :
                                    <View style={styles.shadowBox}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textDetailsInfo}>Business Relative Info</Text>
                                            {/* <TouchableOpacity
                                                activeOpacity={0.9}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                        <View style={{ marginTop: 10 }} >
                                            {this.businessInfo()}
                                        </View>
                                    </View>
                                }

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textDetailsInfo}> Customar Activities</Text>

                                        {this.state.selectActivitiesButtonId == 1 && this.state.activitiesList.length > 3 || this.state.selectActivitiesButtonId == 2 && this.state.activitiesUpcoming.length > 3 ?
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={this._onShowMore}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity> :
                                            null
                                        }
                                    </View>
                                    {/* <View style={styles.tabSec}>
                                        {this.state.activitiesButton.map((item, key) =>
                                            <React.Fragment key={key}>
                                                <TouchableOpacity style={this.state.selectActivitiesButtonId == item.id ? styles.activitiesView : styles.inactiveActivitiesView}
                                                    activeOpacity={0.9}
                                                    onPress={() => this._onActivitiesTab(item)}>
                                                    <Text style={this.state.selectActivitiesButtonId == item.id ? styles.activitiesTabText : styles.inactiveActivitiesTabText}>{item.tabButtonName}</Text>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        )}
                                    </View> */}
                                    <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginTop: 8 }}>
                                        <View style={{ flex: 0.25 }}>
                                            <Text style={styles.listHeaderText}>Type</Text>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                            <Text style={styles.listHeaderText}>Date Due</Text>
                                        </View>
                                        <View style={{ flex: 0.25 }}>
                                            <Text style={styles.listHeaderText}>Assigned to</Text>
                                        </View>
                                        <View style={{ flex: 0.2 }}>
                                            <Text style={styles.listHeaderText}>Notes</Text>
                                        </View>
                                    </View>
                                    <View style={styles.underLine} />
                                    {this.state.selectActivitiesButtonId == 1 && this.state.activitiesList.length == 0 || this.state.selectActivitiesButtonId == 2 && this.state.activitiesUpcoming.length == 0 ?
                                        <Text style={styles.noDataFoundText}>No Data Found</Text>
                                        :
                                        <>
                                            {this.state.selectActivitiesButtonId == 1 ?
                                                <View>
                                                    {this.ListDataActivities()}
                                                </View> :
                                                <View>
                                                    {this.ListDataActivitiesUpcoming()}
                                                </View>
                                            }
                                        </>
                                    }
                                    {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity style={styles.addactivitiesButton}
                                            activeOpacity={0.9}
                                        >
                                            <Text style={styles.activitiesTabText}>Add Activity</Text>
                                            <Image source={ImageName.WHITE_PLUS} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 3 }} />
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                                <View style={{ marginBottom: 50 }} />
                            </View>
                        </ScrollView>
                    </React.Fragment>
                }
                {/* <FloatingButton /> */}

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
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);