import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
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
import { CommonData, ErrorCode, LengthValidate } from '../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ArrowProgressTracker, FloatingButton, Loader, LottyViewLoad, PhoneEmailLocationPopup } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import { Modal } from '../../../../shared';
import { DateConvert, Toaster } from '../../../../services/common-view-function';
import { modifyApiResp, modifyPriorityStatus, modifySalesStage, validationCheck } from "./Function"
import BigTextButton from "../../../../shared/big-text-button";
import { MarkStageCompletedModal } from "./sub-component"
import { MiddlewareCheck } from "../../../../services/middleware";
import Tooltip from "react-native-walkthrough-tooltip";
import * as Progress from 'react-native-progress';
import { App_uri } from "../../../../services/config";




let allOpportunityOwnership = {
    "Source :": "Lead Convert",
    "Assigned user :": "Anup Ghosh",

};
let allCompetitor = {
    "Name :": "SRMB TMT Bar",
    "Description :": "They are using this currently.",

};


let staticDropDownData = [
    {
        "tabName": "Details",
        "value": {
            "Record Id :": "20S28GPZL4GYNZBE",
            "Task Name :": "Follow up Call",
            "Assigned to :": "AnupGhosh",
            "Due date :": "2022-06-18",
            "Priority status :": "Medium",
            "Task stage :": "Open"
        }
    },
    {
        "tabName": "Additional Information",
        "value": {
            "Record Id": "mlksmdk32",
            "Task Name": "krish"
        }
    },
    {
        "tabName": "Description",
        "value": {
            "Record Id": "mlksmdk32",
            "Task Name": "name"
        }
    },
    {
        "tabName": "Interested Items",
        "value": {
            "Record Id": "mlksmdk32",
            "Task Name": "name"
        }
    }

]

let StaticActivity = [
    {
        id: 1,
        type: "Transport employee equipment",
        dateDue: "23-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 2,
        type: "Complete new workspace connections",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 3,
        type: "Transport employee equipment",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 4,
        type: "Transport employee equipment",
        dateDue: "27-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 5,
        type: "New Complex at Rajarhat Space",
        dateDue: "27-06-2022",
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
    {
        id: 3,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 4,
        type: "Complete new workspace connection",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 5,
        type: "Transport employee equipment",
        dateDue: "25-06-2022",
        assignedTo: "Anup",
    },
    {
        id: 6,
        type: "Complete new workspace connection",
        dateDue: "26-06-2022",
        assignedTo: "Anup",
    },


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

];


let stageDetails = [
    {
        id: 1,
        buttonName: "Processing",
        type: "change",
        completionStatus: 1

    },
    {
        id: 2,
        buttonName: "Needs Analysis",
        type: "markStage",
        completionStatus: 0

    },
    {
        id: 3,
        buttonName: "dentify Decision Makers",
        type: "change",
        completionStatus: 0

    },
    {
        id: 4,
        buttonName: "Proposal",
        type: "markStage",
        completionStatus: 0

    },
    {
        id: 5,
        buttonName: "Negotiation",
        type: "markStage",
        completionStatus: 1

    },
    {
        id: 6,
        buttonName: "Closed",
        type: "markStage",
        completionStatus: 1

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

class OpportunityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            detailsInfoData: [],
            ProfileModal: false,
            showHideModal: false,
            modalType: "",

            selectPageObj: {},

            allStageButton: [],
            selectedStageObj: {},

            pageLoader: true,

            allData: [],
            allOpportunityOwnership: {},
            allCompetitor: [],
            detailsModal: false,

            popUpModal: false,
            popUpType: "",

            isVisibleStatusModal: false,

            status: [],
            selectStatusObj: {},
            statusModalLoader: false,

            competitorModalVisibility: false
        }
    }

    componentDidMount() {
        this._load();
    }

    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("OpportunityDetails");
        this.props.navigation.navigate("NetworkError");
    }

    _reloadAfterStageChange = async () => {
        this.setState({
            tabSecButton: [],
            activitiesList: [],
            activitiesButton: [],
            selectActivitiesButtonId: 1,
            activitiesUpcoming: [],
            detailsInfoData: [],
            ProfileModal: false,
            showHideModal: false,
            modalType: "",
            selectPageObj: {},
            allStageButton: [],
            selectedStageObj: {},
            pageLoader: true,
            allData: [],
            allOpportunityOwnership: {},
            allCompetitor: [],
            detailsModal: false,
            popUpModal: false,
            popUpType: "",
            isVisibleStatusModal: false,
            status: [],
            selectStatusObj: {}
        });
        await this._load();
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
            // allStageButton: stageDetails
        })


        // this._onmodalButtonOpen(
        //     {
        //         id: 1,
        //         buttonName: "Processing",
        //         type: "change",
        //         completionStatus: 1

        //     }
        // )

        let reqData = {
            id: this.props.route.params.data.id
        }

        let responseData = await MiddlewareCheck("getOpportunityDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response[0].isConverted == 1) {
                    this.props.navigation.goBack();
                    this.props.route.params.onReloadListPage()
                }
                let modifiedResp = modifyApiResp(responseData.response);
                this.state.detailsInfoData = modifiedResp.allDetails;
                this.state.allOpportunityOwnership = modifiedResp.opportunityOwnershipData;
                this.state.allCompetitor = modifiedResp.competitors;
                this.state.allData = responseData.response[0];
                this.setState({
                    allData: this.state.allData,
                    detailsInfoData: this.state.detailsInfoData,
                    allOpportunityOwnership: this.state.allOpportunityOwnership,
                    allCompetitor: this.state.allCompetitor
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        let reqPastActivityData = {
            opportunityId: this.props.route.params.data.id,
            limit: 4,
            offset: 0,
            type: "all"
        }
        let pastActivityResponseData = await MiddlewareCheck("getOpportunityActivityLog", reqPastActivityData, this.props);
        if (pastActivityResponseData === false) {
            this._onNetworkError();
        } else {
            if (pastActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.activitiesList = pastActivityResponseData.response.activityListData;
                this.setState({
                    activitiesList: this.state.activitiesList
                })
            } else {
                Toaster.ShortCenterToaster(pastActivityResponseData.message)
            }
        }

        // let reqUpcomingActivityData = {
        //     opportunityId: this.props.route.params.data.id,
        //     limit: 4,
        //     offset: 0,
        //     type: "up"
        // }
        // let upcomingActivityResponseData = await MiddlewareCheck("getOpportunityActivityLog", reqUpcomingActivityData);
        // if (upcomingActivityResponseData === false) {
        //     this._onNetworkError();
        // } else {
        //     if (upcomingActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         // console.log("upcomingActivityResponseData >>", JSON.stringify(upcomingActivityResponseData));
        //         this.state.activitiesUpcoming = upcomingActivityResponseData.response.activityListData;
        //         this.setState({
        //             activitiesUpcoming: this.state.activitiesUpcoming
        //         })
        //     } else {
        //         Toaster.ShortCenterToaster(upcomingActivityResponseData.message)
        //     }
        // }

        let reqSalesStageData = {
            moduleType: "opportunity"
        }
        let salesStagesResponse = await MiddlewareCheck("getSalesStage", reqSalesStageData, this.props);
        if (salesStagesResponse === false) {
        } else {
            if (salesStagesResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedStageData = modifySalesStage(salesStagesResponse.response, this.state.allData.salseStageId, this.state.allData.nextsalseStageName);
                this.state.allStageButton = modifiedStageData.stageArr;
                this.setState({
                    allStageButton: this.state.allStageButton,
                })
                this._onmodalButtonOpen(modifiedStageData.selectedStage)
            } else {
                Toaster.ShortCenterToaster(salesStagesResponse.message);
            }
        }

        let mstPriorityStatusResponse = await MiddlewareCheck("mstNatureList", { type: 2 }, this.props);
        if (mstPriorityStatusResponse === false) {
        } else {
            if (mstPriorityStatusResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedPriorityStatusData = modifyPriorityStatus(mstPriorityStatusResponse.response);
                this.state.status = modifiedPriorityStatusData;
                this.setState({
                    status: this.state.status,
                })
            } else {
                Toaster.ShortCenterToaster(mstPriorityStatusResponse.message);
            }
        }

        this.setState({
            pageLoader: false
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

    // open Profile Modal start
    _onProfile = () => {
        this.setState({
            ProfileModal: !this.state.ProfileModal

        })
    }
    // ShowHide DropDown 
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

    _onActivitiesTab = (item) => {
        this.setState({
            selectActivitiesButtonId: item.id
        })
    }

    // for PastActivities Tab Data

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
                    <Image source={ImageName.THREE_DOT} style={styles.toolTipImg} />
                </TouchableOpacity> */}
            </View>
        )

    }

    // forUpcomingActivities Tab Data

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
            <View style={styles.listDataView}>
                <Text style={styles.textList}>{item.activityTypeName}</Text>
                <Text style={[styles.textDate, { textAlign: 'center' }]}>{DateConvert.formatYYYYMMDD(item.dueDate)}</Text>
                <Text style={styles.nameText}>{item.firstName + " " + item.lastName}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT} style={styles.toolTipImg} />
                </TouchableOpacity>
            </View>
        )

    }
    organizationName = (organizationName) => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}
                // onPress={() => this._onProfile()}
                >
                    <View style={styles.viewImg}>
                        <Image source={ImageName.ORGANIZATION} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Organization name</Text>
                    <Text style={styles.viewSubText}>{organizationName}</Text>
                </View>
            </View>

        )
    }
    contactPerson = () => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}
                // onPress={() => this._onProfile()}
                >
                    <View style={styles.viewImg}>
                        <Image source={ImageName.DUMMY_PROFILE} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Contact person</Text>
                    <Text style={styles.viewSubText}>{ }</Text>
                </View>
            </View>

        )
    }
    dateSection = (expectedCloseDate) => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    <View style={styles.viewImg}>
                        <Image source={ImageName.PLANNNER} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Expected Close Date</Text>
                    <Text style={styles.viewSubText}>{DateConvert.formatYYYYMMDD(expectedCloseDate)}</Text>
                </View>
            </View>

        )
    }
    assignedToSec = (firstName, lastName) => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}
                // activeOpacity={0.8}
                // onPress={() => this._onProfile()}
                >
                    <View style={styles.viewImg}>
                        <Image source={ImageName.DUMMY_PROFILE} style={styles.img} />
                    </View>
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Assigned to</Text>
                    <Text style={styles.viewSubText}>{firstName + " " + lastName}</Text>
                </View>
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
    probabilitySec = (probability) => {
        return (
            <View style={styles.allDetailsView}>
                <View style={{ flex: 0.3 }}>
                    {/* <Image source={ImageName.NO_IMG} style={styles.viewImg} /> */}
                </View>
                <View style={styles.textSec}>
                    <Text style={styles.viewHeaderText}>Probability Of Winning</Text>
                    <Text style={styles.persentText}>{probability ? probability.toString() : "0" + "%"}</Text>
                </View>
            </View>
        )
    }
    personalData = (item) => {
        let personDropDown = [];
        for (let [key, value] of Object.entries(item.value)) {
            personDropDown.push(
                <View style={{ flexDirection: 'row', marginTop: 8 }} key={key}>
                    <Text style={styles.detailsHeaderText}>{key}</Text>
                    <Text style={styles.detailsSubText}>{value.length == 0 ? 'N/A' : value}</Text>
                </View>
            )
        }
        return (
            personDropDown
        );
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
    _onShowMore = () => {
        this.props.navigation.navigate("OpportunityActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "upcoming" })
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

    stageDetailsSubButton = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.tabFlexView}
                    activeOpacity={0.8}>
                    <Text style={styles.smallTabText}>CSV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabFlexView}
                    activeOpacity={0.8}>
                    <Text style={styles.smallTabText}>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabFlexView}
                    activeOpacity={0.8}>
                    <Text style={styles.smallTabText}>Excel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabFlexView}
                    activeOpacity={0.8}>
                    <Text style={styles.smallTabText}>Upload</Text>
                </TouchableOpacity>
            </View>
        )
    }

    opportunityStatus = () => {
        return (
            <View style={{ marginTop: 8 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Amount</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            {/* <Text style={styles.listText}>2000</Text> */}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Probability Of Wining(%)</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>8%</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Expected Revenue</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>2000</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Expected Closing Date</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>22/08/2022</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Follow Up Date</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>17/08/2022</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Modified By</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>Sourav</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.stageDetailsListTab}>
                            <Text style={styles.listHeaderText}>Modified At</Text>
                        </View>
                        <View style={styles.stageDetailsListView}>
                            <Text style={styles.listText}>Kolkata</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    detailsInfoDropDown = () => {
        return (
            this.state.detailsInfoData.map((item, key) =>
                <React.Fragment key={key} >
                    {this.detailsInfo(item, key)}
                </React.Fragment>
            )
        )

    }
    detailsInfo = (item, key) => {
        return (
            <View style={styles.shadowBox}>
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
        )
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    // Modal Section Start
    _onMarkStage = () => {
        this.setState({
            showHideModal: !this.state.showHideModal,
        })

    }

    _onmodalButtonOpen = (item) => {
        this.setState({
            selectedStageObj: item
        })

    }


    // allstageButton = () => {
    //     return (
    //         this.state.allStageButton.map((item, key) =>
    //             <React.Fragment key={key} >
    //                 {this._onStageDetailsButton(item, key)}
    //             </React.Fragment>
    //         )
    //     )

    // }

    // _onStageDetailsButton = (item, key) => {
    //     return (
    //         <React.Fragment>
    //             <TouchableOpacity style={styles.yellowBox}
    //                 activeOpacity={0.8}
    //                 onPress={() => this._onmodalButtonOpen(item)}>
    //                 <Text style={styles.trianglebouttonText}>{item.buttonName}</Text>
    //             </TouchableOpacity>
    //             <View style={{ width: 10 }} />
    //         </React.Fragment>

    //     )
    // }

    allstageButton = () => {
        return (

            <ArrowProgressTracker
                data={this.state.allStageButton}
                buttonNameType={"salesStageName"}
                eachCellWidth={180}
                height={25}
                onPress={(item) => this._onmodalButtonOpen(item)}
                activeValueType={"isCompleted"}
            />
            // this.state.allStageButton.map((item, key) =>
            //     <React.Fragment key={key} >
            //         {this._onStageDetailsButton(item, key)}
            //     </React.Fragment>
            // )
        )

    }

    statusSec = (status) => {
        return (

            <View style={{ marginHorizontal: '5%' }}>
                <Text style={{ color: Color.COLOR.GREEN.SEA_GREEN, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD, marginTop: 2 }}>{status}</Text>
            </View>
        )
    }

    // for prediction score view
    _onPredictionScore = (probability) => {
        return (
            <View style={{ marginTop: 5, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.textDetailsInfo}>Prediction Score</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: "#0068FF", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginTop: 6 }}>{(probability ? probability.toString() : "0") + '%'}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Progress.Bar
                        progress={probability ? probability / 100 : 0}
                        width={Dimension.width / 1.3}
                        color={"#0068FF"}
                        borderWidth={1}
                        height={15}
                        borderRadius={14}
                    />
                </View>
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

    _onStatusModal = (item) => {
        if (this.state.isVisibleStatusModal == false) {
            this.setState({
                isVisibleStatusModal: true,
                // selectedContactItem: item,
                selectStatusObj: {}
            });
        } else {
            this.setState({
                isVisibleStatusModal: false,
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
            let reqData = {
                opportunityId: [this.props.route.params.data.id],
                opportunityTypeStatus: this.state.selectStatusObj.id
            }
            let statusObj = this.state.selectStatusObj;
            let responseData = await MiddlewareCheck("updateOpportunityTypeStatus", reqData, this.props);
            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    await this._onStatusModal();
                    await this._reloadAfterStageChange();
                    this.props.route.params.onChangeStatus({ id: this.props.route.params.data.id, statusObj: statusObj });

                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.setState({
                statusModalLoader: false
            });
        }
    }



    // for prediction score view
    _onStatusView = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginRight: 10 }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                        {this.statusSec(this.state.allData.salesStageName)}
                    </View>
                    <View style={{ width: 1, backgroundColor: Color.COLOR.GRAY.GRAY_COLOR, marginHorizontal: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textAssignTo}>Assigned : <Text style={styles.textAssigntoName}>{(this.state.allData.assignTofirstName ? this.state.allData.assignTofirstName : "") + " " + (this.state.allData.assignTolastName ? this.state.allData.assignTolastName : "")}</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginRight: 10 }}>
                        <LottyViewLoad type={"nextAction"} autoPlay={true} loop={true} height={30} width={30} />
                        <View style={{ marginLeft: '8%', marginTop: 2 }}>
                            <Text onPress={() => this._onMarkStage()} style={[styles.textNextAction, { textDecorationLine: 'underline' }]}>Next Action </Text>
                        </View>
                    </View>
                    <View style={{ width: 1, backgroundColor: Color.COLOR.GRAY.GRAY_COLOR, marginHorizontal: 10 }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textAssignTo, { color: Color.COLOR.BLACK.PURE_BLACK }]}>Status : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} onPress={() => this._onStatusModal()}>{this.state.allData.typeStatusName}</Text></Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this._onStatusModal()}
                            activeOpacity={0.9}>
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 10, width: 10, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 5 }}>
                    {this._onPredictionScore(this.state.allData.probabilityOfWining)}
                </View>
            </>
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

    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
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

    render() {
        const opportunityOwnership = () => {
            let alllistopportunityOwnership = []
            for (let [key, value] of Object.entries(this.state.allOpportunityOwnership)) {
                alllistopportunityOwnership.push(
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
                alllistopportunityOwnership
            );
        }
        const competitor = (item) => {
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
                            data={this.state.popUpType == "phone" ? (this.state.allData.OrgDetails && this.state.allData.OrgDetails.phone ? this.state.allData.OrgDetails.phone : "") : this.state.popUpType == "email" ? (this.state.allData.OrgDetails && this.state.allData.OrgDetails.email ? this.state.allData.OrgDetails.email : "") : this.state.popUpType == "location" ? (this.state.allData.OrgDetails && this.state.allData.OrgDetails.address ? this.state.allData.OrgDetails.address : "") : ""}
                            type={this.state.popUpType}
                            onCloseModal={() => this.onOpenAndClosePopUp()}
                        />

                        <MarkStageCompletedModal
                            isVisiable={this.state.showHideModal}
                            type={this.state.selectedStageObj.isCompleted ? "change" : "markStage"}
                            onClose={() => this._onMarkStage()}
                            stageId={this.state.allData.salseStageId}
                            stageName={this.state.allData.salesStageName}
                            opportunityId={this.state.allData.id}
                            remainingStage={this.state.allData.RemainingStages}
                            reload={() => this._reloadAfterStageChange()}
                            {...this.props}
                        />
                        {this.competitorModal()}

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
                                                        onPress={() => this._onUpdateStatus()}
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
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            <View style={styles.shadowBox}>
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
                                                {this.detailsInfoDropDown()}
                                            </View>
                                        </ScrollView>
                                    </View>

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
                                        <Image source={this.state.allData.ContactDetails && this.state.allData.ContactDetails.profilePic && this.state.allData.ContactDetails.profilePic.length > 0 ? { uri: App_uri.IMAGE_URI + this.state.allData.ContactDetails.profilePic } : ImageName.USER_IMG} style={styles.userImg} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'column', marginLeft: '3%' }}>
                                        <Text numberOfLines={1} style={styles.leadName}>{this.state.allData.opportunityName}</Text>
                                        <Text numberOfLines={1} style={styles.textType}>Type : {this.state.allData.ContactDetails && this.state.allData.ContactDetails.contactTypeName ? this.state.allData.ContactDetails.contactTypeName : ""}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("location")}>
                                            <Image source={ImageName.LOCATION_BLACK} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("phone")}>
                                            <Image source={ImageName.CALL_BLACK} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("email")}>
                                            <Image source={ImageName.SMS_LOGO} style={styles.headerImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        {this._TooltipDownloadAction()}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._reloadAfterStageChange()}
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
                                    <Image source={ImageName.USER} style={styles.profileImg} />
                                    <Text style={styles.textFollowUpCall}>{this.state.allData.opportunityName}</Text>
                                    <Text style={styles.textPhoneCall}>{this.state.allData.expectedRevenue.toString() + " INR"}</Text>
                                </View> */}
                                <View style={styles.shadowBox}>
                                    {/* {this.phoneNumerSec(this.state.allData.OrgDetails.phone)} */}
                                    {this._onStatusView()}
                                </View>
                                {/* <View style={styles.shadowBox}>
                                    {this.organizationName(this.state.allData.OrgDetails.organizationName)}
                                    {this.contactPerson()}
                                    {this.dateSection(this.state.allData.expectedCloseDate)}
                                    {this.assignedToSec(this.state.allData.assignTofirstName, this.state.allData.assignTolastName)}
                                    {this.probabilitySec(this.state.allData.probabilityOfWining)}
                                </View> */}

                                {/* <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Prediction Score</Text>
                                    {this._onPredictionScore()}
                                </View> */}

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.textDetailsInfo}>Opportunity Ownership</Text>
                                        </View>
                                        {/* <View style={{ flex: 0.2 }}>
                                            <Text style={styles.textShowMore}>Show More</Text>
                                        </View> */}
                                    </View>
                                    {opportunityOwnership()}
                                </View>

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.textDetailsInfo}>Competitor Info</Text>
                                        </View>
                                        {this.state.allCompetitor.length > 1 ?
                                            <TouchableOpacity style={{ flex: 0.2 }} activeOpacity={0.9} onPress={() => this.onOpenCloseCompetitorModal()}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity>
                                            :
                                            null
                                        }
                                    </View>
                                    {this.state.allCompetitor.length == 0 ?
                                        <>
                                            <Text style={styles.noDataFoundText}>No Data Found</Text>
                                        </>
                                        :
                                        <>
                                            {this.state.allCompetitor.slice(0, 1).map((item, key) => (
                                                <View style={this.state.allCompetitor.length - 1 == key ? {} : { marginTop: 10, borderBottomWidth: 3, borderColor: "#fff" }} key={key}>
                                                    {competitor(item)}
                                                </View>
                                            ))}
                                        </>
                                    }
                                </View>

                                {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={styles.textLeadDetails}>Sales Stage: <Text style={styles.textDetailsInfo}>Completed</Text></Text>
                                    <View style={{ flex: 0.4 }}>
                                        {this.state.selectedStageObj.isCompleted ?
                                            <BigTextButton
                                                height={30}
                                                borderRadius={16}
                                                backgroundColor={Color.COLOR.YELLOW.SIMILER_YELLOW}
                                                text={"Change"}
                                                fontSize={8}
                                                onPress={() => this._onMarkStage()}
                                            /> :
                                            <React.Fragment>
                                                {this.state.selectedStageObj.isCompleted == false ?
                                                    <BigTextButton
                                                        height={30}
                                                        borderRadius={16}
                                                        backgroundColor={Color.COLOR.YELLOW.SIMILER_YELLOW}
                                                        text={"Mark This Stage As Completed"}
                                                        fontSize={8}
                                                        onPress={() => this._onMarkStage()}
                                                    /> :
                                                    null
                                                }

                                            </React.Fragment>
                                        }
                                    </View>
                                </View> */}
                                {/* <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Stage Details</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <ScrollView
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}>
                                            {this.allstageButton()}
                                        </ScrollView>
                                    </View>
                                    {this.stageDetailsSubButton()}
                                    {this.opportunityStatus()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Detail informations</Text>
                                    {this.detailsInfoDropDown()}
                                </View> */}

                                {/* <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Opportunity Ownership</Text>
                                    {opportunityOwnership()}
                                </View>
                                <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Competitor</Text>
                                    {this.state.allCompetitor.map((item, key) => (
                                        <View style={this.state.allCompetitor.length - 1 == key ? {} : { marginTop: 8, borderBottomWidth: 3, borderColor: "#fff" }} key={key}>
                                            {competitor(item)}
                                        </View>
                                    ))}
                                </View> */}

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textDetailsInfo}>Opportunity Journey</Text>
                                        {this.state.selectActivitiesButtonId == 1 && this.state.activitiesList.length > 3 || this.state.selectActivitiesButtonId == 2 && this.state.activitiesUpcoming.length > 3 ?
                                            <TouchableOpacity
                                                onPress={this._onShowMore}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity>
                                            :
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
                                        <View style={{ flex: 0.25, alignItems: 'flex-start' }}>
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
                                        {this.activitiesButton()}
                                    </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetails);