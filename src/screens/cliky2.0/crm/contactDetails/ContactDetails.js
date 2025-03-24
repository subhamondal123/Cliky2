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
    ActivityIndicator,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CommonData, ErrorCode } from '../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup, DropdownInputBox, BigTextButton, AddActivity, EnquiryListDetailsFilterModal, ActivityFilterModal } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { modActivityDetailsData, modifyApiResp, modifyUserData, validateActivityData, validateAddLeadData } from "./Function";
import Header from "../../header/Header";
import { AddLeadModal } from "../../../../pageShared";

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
            refreshing: false,


            contactDetails: {},
            activityDetails: [],
            isAddActivityModal: false,
            subordinateList: [],
            selectedContactObj: {},
            isFilterModal: false,
            isAddLeadModal: false,
            contactLoader: false,
            filterLoader: false
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
        this.setState({
            selectedContactObj: this.props.route.params.data
        })

        await this.fetchContactDetails();
        await this.activityDetailsApiCall({ activityId: "", date: "" });
        await this.fetchSubordinateList();
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

    fetchContactDetails = async () => {
        let reqData = {
            "contactId": this.props.route.params.data.contactId,
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchNewContactDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.contactDetails = responseData.response;
                this.setState({
                    contactDetails: this.state.contactDetails
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    activityDetailsApiCall = async (data) => {
        let reqData = {
            "typeDataId": this.props.route.params.data.contactId,
            "type": "1",
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
        return (
            <React.Fragment>
                <View style={{ marginTop: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.textAssignTo}>Contact Name : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.contactDetails.contactName}</Text></Text>
                            <Text style={styles.textAssignTo}>Contact : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.contactDetails.phoneNumber}</Text></Text>
                            {/* <Text style={styles.textAssignTo}>Email : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} >{this.state.contactDetails.email}</Text></Text> */}
                            {this.state.contactDetails.email.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Email : <Text style={styles.textAssigntoName}>{item.typeValue}</Text></Text>
                                </View>
                            ))}
                            <Text style={styles.textAssignTo}>Title : <Text style={styles.textAssigntoName}>{this.state.contactDetails.title}</Text></Text>
                            <Text style={styles.textAssignTo}>Address : <Text style={styles.textAssigntoName}>{this.state.contactDetails.address}</Text></Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.textAssignTo}>Sales Owner : <Text style={styles.textAssigntoName}>{this.state.contactDetails.createdByName}</Text></Text>
                            {this.state.contactDetails.accounts.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Organization Name : <Text style={styles.textAssigntoName}>{item.organizationName}</Text></Text>
                                </View>
                            ))}
                            {this.state.contactDetails.accounts.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Phone : <Text style={styles.textAssigntoName}>{item.phone}</Text></Text>
                                </View>
                            ))}
                            {this.state.contactDetails.accounts.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Email : <Text style={styles.textAssigntoName}>{item.email}</Text></Text>
                                </View>
                            ))}
                            {this.state.contactDetails.accounts.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Website : <Text style={styles.textAssigntoName}>{item.website}</Text></Text>
                                </View>
                            ))}
                            {this.state.contactDetails.accounts.map((item, index) => (
                                <View>
                                    <Text style={styles.textAssignTo}>Lead Count : <Text style={styles.textAssigntoName}>{item.leadCount}</Text></Text>
                                </View>
                            ))}
                        </View>

                    </View>
                </View>

            </React.Fragment >
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

                if (responseData) {
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

    openActivityModal = () => {
        this.setState({ isAddActivityModal: true })
    }

    onCloseAddActivityModal = () => {
        this.setState({ isAddActivityModal: false });
    }

    onAddNewActivityData = async (data) => {
        let reqData = {
            "type": "1",
            "typeDataId": data.typeDataId,
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

    onFilterApiCall = async (value) => {
        await this.activityDetailsApiCall(value);
        this.setState({ isFilterModal: false });
    }

    onOpenFilterModal = () => {
        this.setState({ isFilterModal: true });
    }

    onCloseFilterModal = () => {
        this.setState({ isFilterModal: false });
    }

    openAddLeadModal = () => {
        this.setState({ isAddLeadModal: true });
    }

    onCloseLeadModal = () => {
        this.setState({ isAddLeadModal: false });
    }

    onAddLeadPress = async (data) => {
        let validateData = validateAddLeadData(data);

        if (validateData) {
            this.setState({ contactLoader: true });
            let responseData = await MiddlewareCheck("createNewLead", data, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    this.setState({ isAddLeadModal: false })
                    await this.fetchContactDetails();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ contactLoader: false });

        }
    }

    leadInfo = () => {
        return (
            <>
                {this.state.contactLoader ?
                    <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                    :
                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {this.state.contactDetails.leads.map((item, index) => (
                            <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 0.5, marginVertical: 5, borderColor: Color.COLOR.RED.AMARANTH }} key={index}>
                                <View style={{ flex: 0.25 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Lead Name</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.leadName}</Text>
                                </View>
                                <View style={{ flex: 0.25 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.LeadValue}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Lead Value</Text>
                                </View>
                                <View style={{ flex: 0.25 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.salesStageName}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Lead Stage</Text>
                                </View>
                                <View style={{ flex: 0.25 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{item.probability}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Probability</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                }
            </>
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
                <AddLeadModal
                    isVisible={this.state.isAddLeadModal}
                    data={this.state.selectedContactObj}
                    customerData={this.state.subordinateList}
                    addLead={(data) => this.onAddLeadPress(data)}
                    closeModal={() => this.onCloseLeadModal()}
                />
                <ActivityFilterModal
                    isVisible={this.state.isFilterModal}
                    onSearch={(value) => this.onFilterApiCall(value)}
                    onCloseModal={() => this.onCloseFilterModal()}
                />
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSec()}
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View>
                    :
                    <React.Fragment>
                        <Header {...this.props} />
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onReloadPage()}
                                />
                            }>
                            <View style={styles.mainView}>
                                <View style={styles.shadowBox}>
                                    {this._onStatusView()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textDetailsInfo}>Upcoming Activity Details</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }} />
                                        <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.openActivityModal()}>
                                            <Text style={styles.textAssigntoName}>+Add New Activity</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.activityDetails.length > 0 ?
                                        <View>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity style={{}} onPress={() => this.onOpenFilterModal()}>
                                                    <Image source={ImageName.FILTER_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: 10 }} >
                                                {this.activityInfo()}
                                            </View>
                                        </View>
                                        :
                                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                            <Text style={styles.textAssigntoName}>No Data Found</Text>
                                        </View>
                                    }
                                </View>

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textDetailsInfo}>Upcoming Activity Details</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }} />
                                        <TouchableOpacity style={[{ borderRadius: 10, padding: 5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderWidth: 0.5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }, styles.boxWithShadow]} onPress={() => this.openAddLeadModal()}>
                                            <Text style={styles.textAssigntoName}>+Add Lead</Text>
                                        </TouchableOpacity>
                                    </View>
                                   
                                    {this.leadInfo()}
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
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);