import React from "react";
import { Color, ImageName } from '../../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CommonData, ErrorCode } from '../../../../services/constant';
import { modifyApiResp } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import Tooltip from "react-native-walkthrough-tooltip";
import { inputEmptyValidator } from "../../../../validators/dataValidator";


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

];

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

            refreshing: false
        }
    }

    componentDidMount() {

        this._load();
    }

    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("OrganizationDetails");
        this.props.navigation.navigate("NetworkError");
    }

    _load = async () => {
        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            this.state.detailsInfoData[i]["check"] = false;
        }


        this.setState({
            // detailsInfoData: staticDropDownData,
            // activitiesList: StaticActivity,
            activitiesButton: activitiesTabButton,
            // activitiesUpcoming: StaticActivityUpcoming,

        })

        let reqData = {
            organizationId: this.props.route.params.data.organizationId.toString()
        }
        let responseData = await MiddlewareCheck("getOrganizationDetails", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response.length == 0) {
                    Toaster.ShortCenterToaster("Some Error Ocurred !")
                    this.props.navigation.goBack();
                } else {
                    let modifiedResp = modifyApiResp(responseData.response)
                    this.state.detailsInfoData = modifiedResp.orgDetails;
                    this.state.allCompetitor = modifiedResp.competitors;
                    this.state.selectStatusObj = modifiedResp.slectedStatusObj;
                    this.state.allData = responseData.response[0];
                    this.state.businessInfoData = modifiedResp.businessRelativeInfo
                    this.setState({
                        allData: this.state.allData,
                        detailsInfoData: this.state.detailsInfoData,
                        allCompetitor: this.state.allCompetitor,
                        businessInfoData: this.state.businessInfoData
                    })
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        let reqPastActivityData = {
            organizationId: this.props.route.params.data.organizationId.toString(),
            limit: 4,
            offset: 0,
            type: "all"
        }
        let pastActivityResponseData = await MiddlewareCheck("getOrganizationAllActivity", reqPastActivityData, this.props);
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
        //     organizationId: this.props.route.params.data.organizationId.toString(),
        //     limit: 4,
        //     offset: 0,
        //     type: "up"
        // }
        // let upcomingActivityResponseData = await MiddlewareCheck("getOrganizationAllActivity", reqUpcomingActivityData);
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
                if (responseData === false) {
                    this._onNetworkError();
                } else {
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

    _onStatusView = () => {
        let statusText = "";
        if (this.state.allData.status == "1") {
            statusText = "ACTIVE";
        } else {
            statusText = "INACTIVE"
        }
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                        {/* <View style={{ marginLeft: '8%', marginTop: 2 }}>
                            <Text style={{ color: Color.COLOR.GREEN.SEA_GREEN, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD, }}>InActive</Text>
                        </View> */}
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this._onStatusModal()}
                            activeOpacity={0.9}>
                            <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN, marginLeft: '5%' }]}>{statusText}</Text>
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 10, width: 10, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textAssignTo}>Organization Name: <Text style={styles.textAssigntoName}>{this.state.allData.orgName && this.state.allData.orgName.length > 0 ? this.state.allData.orgName : "N/A"}</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Onbording Date : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allData.onbordingDate ? DateConvert.formatYYYYMMDD(this.state.allData.onbordingDate) : "N/A"}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textRecordIdText}>Designation : </Text>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textValueText}>{this.state.allData.contactTypeName && this.state.allData.contactTypeName.length > 0 ? this.state.allData.contactTypeName : "N/A"}</Text>
                    </View>
                </View>
            </React.Fragment>
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



    businessInfo = (item) => {
        let allBusinessInfo = []
        for (let [key, value] of Object.entries(this.state.businessInfoData)) {
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

    render() {

        // let orgStatus = "";
        // if (this.state.allData.contactStatus == 1){
        //     orgStatus = "Apporved"
        // }else{
        // }

        const ViewDetailsData = (item) => {
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
                        <View style={{ marginBottom: 5 }} />
                    </View>
                )
            }
            return (
                detailsDropDown
            );
        }
        const CompetitorData = (item) => {
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
                            <Text style={styles.detailsSubText}>{value.length > 0 ? value : "N/A"}</Text>
                        </View>
                    </View>
                )
            }
            return (
                alllistCompetitor
            );

        }

        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <React.Fragment>
                        <ProfileModal
                            isVisible={this.state.ProfileModal}
                            onCloseModal={() => this._onProfile()}
                        />

                        <PhoneEmailLocationPopup
                            isVisible={this.state.popUpModal}
                            data={this.state.popUpType == "phone" ? this.state.allData.contactPhone : this.state.popUpType == "email" ? this.state.allData.contactEmail : this.state.popUpType == "location" ? this.state.allData.orgAddress : ""}
                            type={this.state.popUpType}
                            onCloseModal={() => this.onOpenAndClosePopUp()}
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
                                        <View style={{ paddingVertical: 40 }}>
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
                                                        onPress={() => this._onStatusChange()}
                                                    />
                                                </View>
                                            </View>
                                        </>
                                    }
                                </View>
                            }
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
                                    <View style={{ marginHorizontal: '5%' }}>
                                        <View style={styles.shadowBox}>
                                            <ScrollView
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}>
                                                <Text style={styles.modalTextDetailsInfo}>Detail informations</Text>
                                                {/* <View style={styles.modalTabSec}>
                                                {this.state.tabSecButton.map((item, key) =>
                                                    <React.Fragment key={key}>
                                                        <TouchableOpacity style={this.state.selectTabId == item.id ? styles.madalactiveTabView : styles.modalTabView}
                                                            onPress={() => this._onSeleCtTabSection(item)}
                                                            activeOpacity={0.9}>
                                                            <Text style={this.state.selectTabId == item.id ? styles.activeTextTab : styles.textTab}>{item.tabButtonName}</Text>
                                                        </TouchableOpacity>
                                                    </React.Fragment>
                                                )}
                                            </View> */}
                                                {/* {this.state.selectTabId == 1 ?
                                                <React.Fragment>
                                                    {this.listBusiness()}
                                                </React.Fragment> :
                                                <React.Fragment>
                                                    {this.personalListmap()}
                                                </React.Fragment>
                                            } */}
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
                                                                    {ViewDetailsData(item)}
                                                                </React.Fragment> :
                                                                null
                                                            }
                                                        </View>
                                                        <View style={{ marginBottom: 5 }} />
                                                    </React.Fragment>
                                                )}
                                            </ScrollView>
                                        </View>
                                    </View>

                                </View>

                            }
                        />

                        <View style={{ marginHorizontal: '5%', marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ marginTop: 2 }}
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.imgSec}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => this._detailsModal()}>

                                            <Image source={{ uri: App_uri.IMAGE_VIEW_URI + "images/cbOrz.png" }} style={styles.userImg} />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'column', marginLeft: '3%' }}>
                                            <Text numberOfLines={1} style={styles.leadName}>{this.state.allData.orgName}</Text>
                                            {/* <Text style={styles.textType}>Type :</Text> */}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                        <View style={{ flex: 1 }} />
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onOpenAndClosePopUp("location")}>
                                                <Image source={ImageName.LOCATION_BLACK} style={styles.headerImg} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onOpenAndClosePopUp("phone")}>
                                                <Image source={ImageName.CALL_BLACK} style={styles.headerImg} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onOpenAndClosePopUp("email")}>
                                                <Image source={ImageName.SMS_LOGO} style={styles.headerImg} />
                                            </TouchableOpacity>
                                        </View>
                                        {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        {this._TooltipDownloadAction()}
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
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
                                    {this._onStatusView()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textDetailsInfo}>Business Relative Info</Text>
                                        <TouchableOpacity
                                            activeOpacity={0.9}>
                                            {/* <Text style={styles.textShowMore}>Show More</Text> */}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        {/* {this.state.businessInfoData.map((item, key) =>  */}
                                        {this.businessInfo()}
                                        {/* )} */}
                                    </View>
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textDetailsInfo}>Competitor Info</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}>
                                            {/* <Text style={styles.textShowMore}>Show More</Text> */}
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.allCompetitor.map((item, key) => (
                                        <View style={this.state.allCompetitor.length - 1 == key ? {} : { marginTop: 8, borderBottomWidth: 3, borderColor: "#fff" }} key={key}>
                                            {CompetitorData(item)}
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textDetailsInfo}>Organization Journey</Text>
                                        {/* <Text style={styles.textShowMore}>Show More</Text> */}
                                        {this.state.selectActivitiesButtonId == 1 && this.state.activitiesList.length > 3 || this.state.selectActivitiesButtonId == 2 && this.state.activitiesUpcoming.length > 3 ?
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={this._onShowMore}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity> :
                                            null
                                        }
                                    </View>

                                    <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginTop: 8 }}>
                                        <View style={{ flex: 0.25, }}>
                                            <Text style={styles.listHeaderText}>Type</Text>
                                        </View>
                                        <View style={{ flex: 0.3, }}>
                                            <Text style={styles.listHeaderText}>Date Due</Text>
                                        </View>
                                        <View style={{ flex: 0.25, }}>
                                            <Text style={styles.listHeaderText}>Assigned to</Text>
                                        </View>
                                        <View style={{ flex: 0.2, }}>
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