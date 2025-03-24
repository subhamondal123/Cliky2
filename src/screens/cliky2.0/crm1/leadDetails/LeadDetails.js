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

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CommonData, ErrorCode } from '../../../../services/constant';
import { modifyPriorityStatus, modifySalesStage } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ArrowProgressTracker, Loader, LottyViewLoad, Modal, PhoneEmailLocationPopup } from "../../../../shared";
import { DropdownInputBox } from "../../../../shared";
import { ProfileModal } from "../../../../shared";
import BigTextButton from "../../../../shared/big-text-button";
import { LeadStatusModal } from "./sub-component";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { modifyApiResp } from "./Function";
import { App_uri } from "../../../../services/config";
import Tooltip from "react-native-walkthrough-tooltip";
import * as Progress from 'react-native-progress';


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
            refreshing: false
        }
    }

    componentDidMount() {

        this._load();
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
        for (let i = 0; i < this.state.detailsInfoData.length; i++) {
            this.state.detailsInfoData[i]["check"] = false;
        }
        for (let i = 0; i < this.state.allPersonalDetails.length; i++) {
            this.state.allPersonalDetails[i]["check"] = false;
        }

        this.setState({
            tabSecButton: tabButton,
            // activitiesList: StaticActivity,
            activitiesButton: activitiesTabButton,
            // allPersonalDetails: staticpersonalData,
            // activitiesUpcoming: StaticActivityUpcoming,
        })

        let reqData = {
            leadId: this.props.route.params.data.leadId.toString()
        }

        let responseData = await MiddlewareCheck("getLeadDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response.length == 0) {
                    Toaster.ShortCenterToaster("Some Error Ocurred !")
                    this.props.navigation.goBack();
                } else {
                    if (responseData.response[0].isConverted == 1) {
                        this.props.navigation.goBack();
                        this.props.route.params.onReloadListPage();
                    }
                    let modifiedResp = modifyApiResp(responseData.response)
                    this.state.detailsInfoData = modifiedResp.businessDetails;
                    this.state.allPersonalDetails = modifiedResp.personalDetails;
                    this.state.allLeadBy = modifiedResp.leadBy;
                    this.state.allCompetitor = modifiedResp.competitor;
                    this.state.allData = responseData.response[0];
                    this.setState({
                        allData: this.state.allData,
                        detailsInfoData: this.state.detailsInfoData,
                        allPersonalDetails: this.state.allPersonalDetails,
                        leadBy: this.state.leadBy,
                        allCompetitor: this.state.allCompetitor
                    })
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        let reqPastActivityData = {
            // ...await GetUserData.getUserData(),
            leadId: this.props.route.params.data.leadId.toString(),
            limit: 4,
            offset: 0,
            type: "all"
        }
        let pastActivityResponse = await MiddlewareCheck("getLeadsActivityLog", reqPastActivityData, this.props);
        if (pastActivityResponse === false) {
            this._onNetworkError();
        } else {
            if (pastActivityResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.activitiesList = pastActivityResponse.response.activityListData;
                this.setState({
                    activitiesList: this.state.activitiesList
                })
            } else {
                Toaster.ShortCenterToaster(pastActivityResponse.message)
            }
        }

        // let reqUpActivityData = {
        //     // ...await GetUserData.getUserData(),
        //     leadId: "5",
        //     limit: 4,
        //     offset: 0,
        //     type: "up"
        // }
        // let upActivityResponse = await MiddlewareCheck("getLeadsActivityLog", reqUpActivityData);
        // if (upActivityResponse === false) {
        //     this._onNetworkError();
        // } else {
        //     if (upActivityResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         this.state.activitiesUpcoming = upActivityResponse.response.activityListData;
        //         this.setState({
        //             activitiesUpcoming: this.state.activitiesUpcoming
        //         })
        //     } else {
        //         Toaster.ShortCenterToaster(upActivityResponse.message)
        //     }
        // }

        let reqSalesStageData = {
            moduleType: "lead"
        }
        let salesStagesResponse = await MiddlewareCheck("getSalesStage", reqSalesStageData, this.props);
        if (salesStagesResponse === false) {
            this._onNetworkError();
        } else {
            if (salesStagesResponse.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedStageData = modifySalesStage(salesStagesResponse.response, this.state.allData.leadStatus, this.state.allData.nextleadStatusName);
                this.state.allLeadStatus = modifiedStageData.stageArr;
                this.setState({
                    allLeadStatus: this.state.allLeadStatus,
                })
                this._onSelectModalButton(modifiedStageData.selectedStage)
            } else {
                Toaster.ShortCenterToaster(salesStagesResponse.message);
            }
        }

        let mstPriorityStatusResponse = await MiddlewareCheck("mstNatureList", { type: 1 }, this.props);
        if (mstPriorityStatusResponse === false) {
            this._onNetworkError();
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

    // leadStatus = () => {
    //     return (
    //         <View style={{ marginTop: 8 }}>
    //             <ScrollView
    //                 horizontal={true}
    //                 showsHorizontalScrollIndicator={false}>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Amount</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>2000</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Probability Of Wining(%)</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>8%</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Expected Revenue</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>2000</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Expected Closing Date</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>22/08/2022</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Follow Up Date</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>17/08/2022</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Modified By</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>Sourav</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column' }}>
    //                     <View style={styles.stageDetailsListTab}>
    //                         <Text style={styles.listHeaderText}>Modified At</Text>
    //                     </View>
    //                     <View style={styles.stageDetailsListView}>
    //                         <Text style={styles.listText}>Kolkata</Text>
    //                     </View>
    //                 </View>
    //             </ScrollView>
    //         </View>
    //     )
    // }
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
        this.props.navigation.navigate("leadActivityList", { data: this.props.route.params.data, type: this.state.selectActivitiesButtonId == 1 ? "past" : "upcoming" })
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

    // for prediction score view
    _onStatusView = () => {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <LottyViewLoad type={"handDiraction"} autoPlay={true} loop={true} height={30} width={30} />
                        {this.statusSec(this.state.allData.nextleadStatusName)}
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textAssignTo}>Assigned : <Text style={styles.textAssigntoName}>{this.state.allData.assignToUserName}</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <LottyViewLoad type={"nextAction"} autoPlay={true} loop={true} height={30} width={30} />
                        <TouchableOpacity style={{ marginLeft: '8%', marginTop: 2 }}
                            activeOpacity={0.9}
                            onPress={() => this._onMarkStage()}>
                            <Text style={styles.textNextAction}>Next Action </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderLeftWidth: 0.5, borderLeftColor: Color.COLOR.GRAY.GRAY_COLOR, flex: 0.1 }} />
                    {/* <View style={{ flex: 1 }}>
                        <Text style={styles.textFollowup}>Follow up on 30th july</Text>
                    </View> */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textAssignTo}>Status : <Text style={[styles.textAssigntoName, { color: Color.COLOR.GREEN.APPLE_GREEN }]} onPress={() => this._onStatusModal()}>{this.state.allData.leadTypeStatus}</Text></Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this._onStatusModal()}
                            activeOpacity={0.9}>
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 10, width: 10, marginLeft: 5 }} />
                        </TouchableOpacity>
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
            let reqData = {
                leadId: [this.props.route.params.data.leadId.toString()],
                leadTypeStatus: this.state.selectStatusObj.id
            }
            let statusObj = this.state.selectStatusObj;
            let responseData = await MiddlewareCheck("updateLeadTypeStatus", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    await this._onStatusModal();
                    await this._resetStateVariable();
                    await this._load();
                    // this.props.route.params.onReloadListPage();
                    this.props.route.params.onChangeStatus({ leadId: this.props.route.params.data.leadId, statusObj: statusObj });
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
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

    modalSec = () => {
        return (
            <>
                <ProfileModal
                    isVisible={this.state.ProfileModal}
                    onCloseModal={() => this._onProfile()}
                />
                <LeadStatusModal
                    isVisiable={this.state.showHideModal}
                    // type={this.state.selectedStageObj.isCompleted ? "change" : "markStage"}
                    type={"markStage"}
                    stageId={this.state.allData.leadStatus}
                    leadId={this.props.route.params.data.leadId}
                    remainingStages={this.state.allData.RemainingStages}
                    presentStage={this.state.allData.nextleadStatusName}
                    onClose={() => this._onMarkStage()}
                    onUpdateSuccess={() => this._onStageUpdateSuccess()}
                    {...this.props}
                />
                <PhoneEmailLocationPopup
                    isVisible={this.state.popUpModal}
                    data={this.state.popUpType == "phone" ? this.state.allData.ContactDetails && this.state.allData.ContactDetails.phoneNumber : this.state.popUpType == "email" ? this.state.allData.ContactDetails && this.state.allData.ContactDetails.email : this.state.popUpType == "location" ? this.state.allData.ContactDetails && this.state.allData.ContactDetails.address : ""}
                    type={this.state.popUpType}
                    onCloseModal={() => this.onOpenAndClosePopUp()}
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
                                        <View style={styles.modalTabSec}>
                                            {this.state.tabSecButton.map((item, key) =>
                                                <React.Fragment key={key}>
                                                    <TouchableOpacity style={this.state.selectTabId == item.id ? styles.madalactiveTabView : styles.modalTabView}
                                                        onPress={() => this._onSeleCtTabSection(item)}
                                                        activeOpacity={0.9}>
                                                        <Text style={this.state.selectTabId == item.id ? styles.activeTextTab : styles.textTab}>{item.tabButtonName}</Text>
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            )}
                                        </View>
                                        {this.state.selectTabId == 1 ?
                                            <React.Fragment>
                                                {this.listBusiness()}
                                            </React.Fragment> :
                                            <React.Fragment>
                                                {this.personalListmap()}
                                            </React.Fragment>
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    }
                />
            </>
        )
    }


    render() {

        const leadBy = () => {
            let alllistleadBy = []
            for (let [key, value] of Object.entries(this.state.allLeadBy)) {
                alllistleadBy.push(
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
                alllistleadBy
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
                        {this.modalSec()}
                        <View style={{ width: Dimension.width, backgroundColor: '#fff', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
                            <View style={{ marginHorizontal: '2%', marginTop: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
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
                                                <Image source={{ uri: App_uri.IMAGE_URI + this.props.route.params.data.profilePic }} style={styles.userImg} />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'column', marginLeft: '3%' }}>
                                                <Text numberOfLines={1} style={styles.leadName}>{(this.state.allData.ContactDetails && this.state.allData.ContactDetails.firstName ? this.state.allData.ContactDetails && this.state.allData.ContactDetails.firstName : "") + " " + (this.state.allData.ContactDetails && this.state.allData.ContactDetails.lastName ? this.state.allData.ContactDetails && this.state.allData.ContactDetails.lastName : "")}</Text>
                                                <Text numberOfLines={1} style={styles.textType}>Type : <Text style={styles.textType}>{this.state.allData.leadSourceTypeName}</Text></Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                            <View style={{ flex: 1 }} />
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("location")}>
                                                    <Image source={ImageName.LOCATION_BLACK} style={styles.headerImg} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("phone")}>
                                                    <Image source={ImageName.CALL_BLACK} style={styles.headerImg} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9} onPress={() => this.onOpenAndClosePopUp("email")}>
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
                        </View>

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
                                    {this._onStatusView()}
                                </View>
                                {/* <View style={styles.shadowBox}>
                                    <Text style={styles.textDetailsInfo}>Prediction Score</Text>
                                    {this._onPredictionScore()}
                                </View> */}
                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={styles.textDetailsInfo}>Lead Details</Text>
                                        </View>
                                        {/* <TouchableOpacity style={{ flex: 0.2 }}
                                            activeOpacity={0.8}>
                                            <Text style={styles.textShowMore}>Show More</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                    {leadBy()}
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
                                                <View style={{}} key={key}>
                                                    {competitor(item)}
                                                </View>
                                            ))}
                                        </>
                                    }
                                </View>

                                <View style={styles.shadowBox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.textDetailsInfo}>Lead Journey</Text>
                                        {this.state.selectActivitiesButtonId == 1 && this.state.activitiesList.length > 3 || this.state.selectActivitiesButtonId == 2 && this.state.activitiesUpcoming.length > 3 ?
                                            <TouchableOpacity
                                                onPress={this._onShowMore}>
                                                <Text style={styles.textShowMore}>Show More</Text>
                                            </TouchableOpacity>
                                            :
                                            null
                                        }
                                    </View>

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