import React from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Color, ImageName } from "../../../../enums";
import {
    stateUserInformation,
    stateCheckForNetwork
} from '../../../../redux/Sales360Action';
import { DateConvert, FileUpload, Toaster } from "../../../../services/common-view-function";
import { ErrorCode } from "../../../../services/constant";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../services/middleware";
import { BigTextButton, CheckBox, DropdownInputBox, Loader, Modal, TextInputBox } from "../../../../shared";
import { DataValidator } from "../../../../validators";
import { CustomStyle } from "../../../style";
import { calculateTotalEstimateBudget, modifyExpanseList, modifyResp, validateForSubmitOrSave, validateNewAddItemData, validateQuantityAmount } from "./Function";
import styles from "./Style";

class CreateAndEditBudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allDetails: {},
            allExpanse: [],
            allItems: [],
            totalEstimatedBudget: 0,
            partnerContribution: "",
            partnerContributionActive: false,
            companyPart: "",
            companyPartActive: false,
            isDraftorPublish: true,
            eventStatus: "",
            imageLoader: false,

            addModal: false,
            newItemObj: {
                particular: "",
                selectedParticular: {},
                docData: [],
                rate: "",
                rateActive: false,
                quantity: "",
                quantityActive: false,
                totalParticularAmount: 0,
                description: "",
                descriptionActive: false,
                remarks: "",
                remarksActive: false,

            },
            updateType: "",
            selectedIndex: ""
        }
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this.getEventAllBudgetDetails();
        await this.getAllExpanseList();
        this.setState({ pageloader: false, eventStatus: this.props.route.params.data.eventStatus == undefined || this.props.route.params.data.eventStatus == null ? "" : this.props.route.params.data.eventStatus })
    }

    getEventAllBudgetDetails = async () => {
        let reqData = {
            "indentID": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            "type": "all"
        };
        let responseData = await MiddlewareCheck("mmsGetindentBudgetList", reqData, this.props);
        console.log("responseData", JSON.stringify(responseData))
        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedData = modifyResp(responseData.response);
                this.state.allDetails = modifiedData.allDetails;
                this.state.allItems = modifiedData.budgetArr;
                this.state.totalEstimatedBudget = modifiedData.allDetails.estimatedBudgetInt;
                this.state.partnerContribution = modifiedData.allDetails.partnerBudget;
                this.state.companyPart = modifiedData.allDetails.companyBudget;
                this.setState({
                    allDetails: this.state.allDetails,
                    allItems: this.state.allItems,
                    totalEstimatedBudget: this.state.totalEstimatedBudget,
                    partnerContribution: this.state.partnerContribution.length == 0 ? "0" : this.state.partnerContribution,
                    companyPart: this.state.companyPart
                });
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    getAllExpanseList = async () => {
        let responseData = await MiddlewareCheck("mmsGetExpenseList", { "type": "all" }, this.props);

        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allExpanse = modifyExpanseList(responseData.response);
                this.setState({
                    allExpanse: this.state.allExpanse
                });
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    eventNameDescDSection = () => {
        return (
            <View style={styles.eventSectionView}>
                <Text style={styles.eventNameText}>{this.state.allDetails.meetingTitle ? this.state.allDetails.meetingTitle : ""}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.eventDescText}>{"ID : " + (this.state.allDetails.indentNumber ? this.state.allDetails.indentNumber : "")}</Text>
                    </View>
                    <Text style={styles.eventDescText}>{(this.state.allDetails.districtName ? this.state.allDetails.districtName : "")}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.eventDescText}>{this.state.allDetails.meetingTypeName ? this.state.allDetails.meetingTypeName : ""}</Text>
                    </View>
                    <Text style={styles.eventDescText}>{this.state.allDetails.meetingDate && this.state.allDetails.meetingDate.length == 0 ? "" : DateConvert.viewDateFormat(this.state.allDetails.meetingDate)}</Text>
                </View>
            </View>
        )
    }

    budgetItemListSection = () => {
        const modDoc = (data) => {
            let arr = [];
            let obj = {
                "fileName": data,
                "orgfilename": data.split('/').pop()
            }
            arr.push(obj)
            return arr
        }
        const onDeleteItem = (item, key) => {
            let arr = this.state.allItems;
            arr.splice(key, 1);
            this.state.allItems = arr;
            this.setState({
                allItems: this.state.allItems
            });
            this.calculateTotalBudget();
        }
        const onEditItem = (item, key) => {
            this.onOpenUpdateModal("update");
            this.state.newItemObj.selectedParticular = item.selectedParticular;
            // this.state.newItemObj.docData = item.docData
            this.state.newItemObj.rate = item.rate;
            this.state.newItemObj.quantity = item.quantity;
            this.state.newItemObj.totalParticularAmount = item.totalParticularAmount;
            this.state.newItemObj.description = item.description;
            // this.state.newItemObj.docData = modDoc(item.docData);
            this.state.newItemObj.docData = item.docData;
            this.state.newItemObj.remarks = item.remarks;

            this.setState({ selectedIndex: key })
        }
        return (
            <View style={styles.budgetSecionView}>
                <View style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1 }}>
                        <BigTextButton
                            text={this.state.eventStatus == 2 ? "+ Add Expenses" : "+ Add Budget"}
                            height={40}
                            borderRadius={20}
                            backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                            onPress={() => this.onAddModalOpenClose()}
                        />
                    </View>
                </View>

                {this.state.allItems.length == 0 ?
                    <>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={ImageName.CALCULATION_MM} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.calculatorText}>Create a Budget</Text>
                            <Text style={styles.calculatorSmallText}>Before Publish this Event</Text>
                        </View>
                    </>
                    :
                    <>
                        {this.state.allItems.map((item, key) => (
                            <View style={styles.mmBox} key={key}>
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.boxFirstText}>Particular</Text>
                                        <Text style={styles.boxSecondText} numberOfLines={1}>{item.selectedParticular.name ? item.selectedParticular.name : ""}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.editLogoSec} activeOpacity={0.9} onPress={() => onEditItem(item, key)}>
                                        <Image source={ImageName.WHITE_EDIT} style={styles.whiteDeleteLogo} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteLogoSec} activeOpacity={0.9} onPress={() => onDeleteItem(item, key)}>
                                        <Image source={ImageName.WHITE_DELETE_LOGO} style={styles.whiteDeleteLogo} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.boxRowSec}>
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Text style={styles.boxRowText}>Rate</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.boxRowValueText} numberOfLines={1}>{item.rate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Text style={styles.boxRowText}>Quantity</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.boxRowValueText} numberOfLines={1}>{item.quantity}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Text style={styles.boxRowText}>Total</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.boxRowValueLastText} numberOfLines={1}>{item.totalParticularAmount}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.firstDesSec}>
                                    <Text style={styles.boxRowText}>Description</Text>
                                    <Text style={styles.descriptionContent} numberOfLines={2}>{item.description}</Text>
                                </View>
                                <View style={styles.secondDesSec}>
                                    <Text style={styles.boxRowText}>Remarks</Text>
                                    <Text style={styles.descriptionContent} numberOfLines={2}>{item.remarks}</Text>
                                </View>
                                {item.docData.length == 0 ? null :
                                    <View style={styles.secondDesSec}>
                                        <Text style={styles.boxRowText}>Document</Text>
                                        <Text style={styles.descriptionContent} numberOfLines={2}>{item.docData[0].fileName.split('/').pop()}</Text>
                                    </View>
                                }
                            </View>
                        ))}
                    </>
                }
            </View>
        )
    }

    budgetCalculationSection = () => {
        const onPressCheckBox = (value) => {
            if (value !== this.state.isDraftorPublish) {
                this.state.isDraftorPublish = value;
                this.setState({
                    isDraftorPublish: this.state.isDraftorPublish
                })
            }
        }

        const _onChangePartnerContribution = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.partnerContribution = newText;
            this.setState({ partnerContribution: this.state.partnerContribution });
        }

        const _onChangeCompanyPart = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.companyPart = newText;
            this.setState({ companyPart: this.state.companyPart });
        }
        return (
            <View style={styles.budgetCalculationView}>
                <Text style={styles.boxSecondText}>{this.state.eventStatus == 2 ? "Actual Expenses" : "Total Estimated Budget"}</Text>
                <Text style={styles.totalBugetText}>{this.state.totalEstimatedBudget.toString()}</Text>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                        <Text style={styles.descriptionContent}>Partner Contribution *</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: '2%' }}>
                        <Text style={styles.descriptionContent}>Company Part</Text>
                        <Text style={styles.boxRowText}>Subject to approval</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                        <TextInputBox
                            value={this.state.partnerContribution}
                            // editable={this.state.totalEstimatedBudget == 0 ? false : true}
                            borderRadius={25}
                            onChangeText={(value) => _onChangePartnerContribution(value)}
                            placeholder={"*Partner Contribution"}
                            keyboardType={"numeric"}
                            isActive={this.state.partnerContributionActive}
                            onFocus={() => {
                                this.state.partnerContributionActive = true;
                                this.setState({ partnerContributionActive: this.state.partnerContributionActive });
                            }}
                            onBlur={() => {
                                this.state.partnerContributionActive = false;
                                this.setState({ partnerContributionActive: this.state.partnerContributionActive });
                            }}
                            height={45}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: '2%' }}>
                        <TextInputBox
                            value={this.state.companyPart}
                            // editable={this.state.totalEstimatedBudget == 0 ? false : true}
                            borderRadius={25}
                            onChangeText={(value) => _onChangeCompanyPart(value)}
                            placeholder={"*Company Part"}
                            keyboardType={"numeric"}
                            isActive={this.state.companyPartActive}
                            onFocus={() => {
                                this.state.companyPartActive = true;
                                this.setState({ companyPartActive: this.state.companyPartActive });
                            }}
                            onBlur={() => {
                                this.state.companyPartActive = false;
                                this.setState({ companyPartActive: this.state.companyPartActive });
                            }}
                            height={45}
                        />
                    </View>
                </View>
                {this.state.eventStatus == 2 ?
                    null
                    :
                    <View style={styles.CheckBoxSec}>
                        <View style={[styles.CheckBox, { marginRight: "2%" }]}>
                            <CheckBox
                                type={'circle'}
                                data={this.state.isDraftorPublish}
                                borderRadius={15}
                                onClickValue={() => onPressCheckBox(true)}
                                selectBackgroundColor={'#070457'}
                                borderColor={'#070457'}
                            />
                            <Text style={styles.checkBoxText}>Draft</Text>
                        </View>
                        <View style={[styles.CheckBox, { marginLeft: '2%' }]}>
                            <CheckBox
                                type={'circle'}
                                data={!this.state.isDraftorPublish}
                                onClickValue={() => onPressCheckBox(false)}
                                borderRadius={15}
                                selectBackgroundColor={'#070457'}
                                borderColor={'#070457'}
                            />
                            <Text style={styles.checkBoxText}>Publish</Text>
                        </View>
                    </View>
                }

            </View>
        )
    }

    buttonSection = () => {
        const onSubmitorSave = async () => {
            let validateStatus = validateForSubmitOrSave(this.state);
            if (validateStatus) {
                this.setState({
                    pageloader: true,
                })
                if (this.state.eventStatus == 2) {
                    let reqData = {
                        "budgetArr": this.state.allItems,
                        "totalBudget": this.state.totalEstimatedBudget,
                        "companyBudget": this.state.companyPart,
                        "partnerBudget": this.state.partnerContribution,
                        "meetingId": this.props.route.params.data.id ? this.props.route.params.data.id : "",
                        "indentID": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
                    }
                    let responseData = await MiddlewareCheck("mmsAddindentBudgetForApproved", reqData, this.props);

                    if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        if (this.props.route.params.type == "reloadNeeded") {
                            this.props.route.params.onReloadPreviousPage();
                        }
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);
                    }


                } else {
                    let indentBudgetAddStatus = await onAddIndentBudget();
                    let indentStatusChangeStatus = false;
                    if (this.state.isDraftorPublish == false && indentBudgetAddStatus == true) {
                        indentStatusChangeStatus = await onIndentStatusChange();
                    }

                    if (this.state.isDraftorPublish == true && indentBudgetAddStatus == true) {
                        if (this.props.route.params.type == "reloadNeeded") {
                            this.props.route.params.onReloadPreviousPage();
                        }
                        this.props.navigation.goBack();
                    } else if (this.state.isDraftorPublish == false && indentBudgetAddStatus == true && indentStatusChangeStatus == true) {
                        if (this.props.route.params.type == "reloadNeeded") {
                            this.props.route.params.onReloadPreviousPage();
                        }
                        this.props.navigation.goBack();
                    }
                }


                this.setState({
                    pageloader: false,
                })
            }
        }

        const onAddIndentBudget = async () => {
            let status = false;
            let reqData = {
                "budgetArr": this.state.allItems,
                "totalBudget": this.state.totalEstimatedBudget.toString(),
                "companyBudget": this.state.companyPart.toString(),
                "partnerBudget": this.state.partnerContribution.toString(),
                "indentID": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            }
            let responseData = await MiddlewareCheck("mmsAddindentBudgetV2", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    status = true
                    Toaster.ShortCenterToaster(responseData.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }

            return status;
        }

        const onIndentStatusChange = async () => {
            let status = false;
            let reqData = {
                "indentId": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            }
            let responseData = await MiddlewareCheck("mmsAddMeetingAndIndentStatusChange", reqData, this.props);
            if (responseData == false) {

            } else {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    status = true;
                    Toaster.ShortCenterToaster(responseData.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }

            return status;
        }
        return (
            <View style={styles.buttonSectionView}>
                {/* <View style={{ flex: 1, marginHorizontal: "10%" }}>
                    <BigTextButton
                        text={"Reset"}
                        borderRadius={30}
                        backgroundColor={"#fff"}
                        fontColor={Color.COLOR.BLUE.DARK_BLUE}
                        additionalStyles={{ borderColor: Color.COLOR.BLUE.DARK_BLUE, borderWidth: 1 }}
                    />
                </View> */}

                <View style={{ flex: 1, marginHorizontal: "10%" }}>
                    <BigTextButton
                        text={this.state.isDraftorPublish ? this.state.eventStatus == 2 ? "Submit" : "Save" : "Submit"}
                        borderRadius={30}
                        backgroundColor={Color.COLOR.RED.AMARANTH}
                        onPress={() => onSubmitorSave()}
                    />
                </View>
            </View>
        )
    }

    onOpenUpdateModal = async (type) => {
        this.state.addModal = true;
        this.setState({ addModal: this.state.addModal, updateType: type })
    }

    onAddModalOpenClose = async () => {
        if (this.state.addModal) {
            this.state.addModal = false;
            this.setState({
                addModal: this.state.addModal
            });
            await this.onClearModalData();
        } else {
            this.state.addModal = true;
            this.setState({
                addModal: this.state.addModal
            })
        }
    }

    onClearModalData = async () => {
        this.state.newItemObj = {
            particular: "",
            selectedParticular: {},
            docData: [],
            rate: "",
            rateActive: false,
            quantity: "",
            quantityActive: false,
            totalParticularAmount: 0,
            description: "",
            descriptionActive: false,
            remarks: "",
            remarksActive: false
        };
        this.setState({
            newItemObj: this.state.newItemObj
        })
    }

    calculateTotalBudget = () => {
        this.state.totalEstimatedBudget = calculateTotalEstimateBudget(this.state.allItems);
        this.setState({
            totalEstimatedBudget: this.state.totalEstimatedBudget
        })
    }

    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            // imageLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.name,
        })
        this.setState({ imageLoader: true })
        let responseData = await MiddlewareFileCheck("mmsFileUpload", uploadData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modNameArr = this.state.allImages;
                let modObj = {
                    "orgfilename": responseData.response.orgfilename,
                    "fileName": responseData.response.fileName,
                }

                // modNameArr.push(modObj);
                // this.state.allImages = modNameArr;
                // this.setState({ allImages: this.state.allImages });
                this.state.newItemObj.docData = [modObj]
                this.setState({ newItemObj: this.state.newItemObj })

                // this._modifyImgShowingArr(this.state.allImages);
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({ imageLoader: false })
    }


    docAttachmentSection = () => {
        const onAddAttachment = async () => {
            let uploadData = await FileUpload.uploadPdfAndImage();
            await this._onImageUpload(uploadData);
        }
        return (
            <>
                <TouchableOpacity onPress={() => onAddAttachment()} style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 20, marginBottom: 10 }}>
                    {this.state.imageLoader ? <ActivityIndicator size={"small"} /> :
                        <Text style={styles.addAttachment}>{this.state.newItemObj.docData.length == 0 ? "Add Attachment" : this.state.newItemObj.docData[0].orgfilename}</Text>
                    }
                </TouchableOpacity>
            </>
        )
    }

    modalSection = () => {
        const _onAddItem = async () => {
            let validationStatus = validateNewAddItemData(this.state.newItemObj);
            if (validationStatus) {
                let arr = this.state.allItems;
                arr.push(this.state.newItemObj);
                this.state.allItems = arr;
                this.setState({
                    allItems: this.state.allItems
                });
                await this.onClearModalData();
                this.onAddModalOpenClose();
                this.calculateTotalBudget();
            }
        }

        const _onEditItem = async () => {
            let validationStatus = validateNewAddItemData(this.state.newItemObj);
            if (validationStatus) {
                let arr = this.state.allItems;
                for (let i = 0; i < arr.length; i++) {
                    if (this.state.selectedIndex == i) {
                        arr[i].selectedParticular = this.state.newItemObj.selectedParticular
                        arr[i].rate = this.state.newItemObj.rate
                        arr[i].docData = this.state.newItemObj.docData
                        arr[i].quantity = this.state.newItemObj.quantity
                        arr[i].totalParticularAmount = this.state.newItemObj.totalParticularAmount
                        arr[i].description = this.state.newItemObj.description
                        arr[i].remarks = this.state.newItemObj.remarks
                    }
                }
                // arr.push(this.state.newItemObj);
                this.state.allItems = arr;
                this.setState({
                    allItems: this.state.allItems,
                    updateType: ""
                });
                await this.onClearModalData();
                this.onAddModalOpenClose();
                this.calculateTotalBudget();
            }
        }
        return (
            <Modal
                isVisible={this.state.addModal}
                onBackButtonPress={() => this.onAddModalOpenClose()}
                onBackdropPress={() => this.onAddModalOpenClose()}
                onRequestClose={() => this.onAddModalOpenClose()}
                children={
                    <View style={styles.modalMainView}>
                        <View style={styles.modalView}>
                            <View style={{ marginHorizontal: '5%' }}>
                                <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        {this.state.updateType == "update" ?
                                            <Text style={styles.modalHeader}>{this.state.eventStatus == 2 ? "Update Expenses" : "Update Budget"}</Text>
                                            :
                                            <Text style={styles.modalHeader}>{this.state.eventStatus == 2 ? "Add New Expenses" : "Add New Budget"}</Text>
                                        }
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.9} onPress={() => this.onAddModalOpenClose()}>
                                        <Image source={ImageName.WHITE_CROSS} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                    {this.particularInputSection()}
                                    {this.roleAndQuantitySection()}
                                    {this.docAttachmentSection()}

                                    <View style={{ marginBottom: 15, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.proposedBudgetUpperText}>Your Proposed {this.state.eventStatus == 2 ? "Expenses" : "Budget"}</Text>
                                            <Text style={styles.proposedBudgetUpperText}>for the time</Text>
                                        </View>
                                        <View style={{ flex: 1, borderBottomColor: Color.COLOR.WHITE.PURE_WHITE, borderBottomWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.proposedBudgetText}>{this.state.newItemObj.totalParticularAmount.toString()}</Text>
                                        </View>
                                    </View>

                                    {this.descriptionSection()}
                                    {this.remarksSection()}

                                    <View style={styles.buttonSectionView}>
                                        <View style={{ flex: 1, marginHorizontal: "10%" }}>
                                            <BigTextButton
                                                text={"Reset"}
                                                borderRadius={30}
                                                backgroundColor={"#F76770"}
                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                additionalStyles={{ borderColor: Color.COLOR.BLUE.DARK_BLUE, borderWidth: 1 }}
                                                onPress={() => this.onClearModalData()}
                                            />
                                        </View>

                                        <View style={{ flex: 1, marginHorizontal: "10%" }}>
                                            {this.state.updateType == "update" ?
                                                <BigTextButton
                                                    text={"Update"}
                                                    borderRadius={30}
                                                    backgroundColor={"#95ACE8"}
                                                    onPress={() => _onEditItem()}
                                                />
                                                :
                                                <BigTextButton
                                                    text={this.state.isDraftorPublish ? "Save" : "Submit"}
                                                    borderRadius={30}
                                                    backgroundColor={"#95ACE8"}
                                                    onPress={() => _onAddItem()}
                                                />
                                            }

                                        </View>
                                    </View>
                                    <View style={{ height: 100 }} />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                }
            />
        )
    }

    particularInputSection = () => {
        const _onSelectParticular = (data) => {
            this.state.newItemObj.particular = data.id;
            this.state.newItemObj.selectedParticular = data;
            this.setState({ newItemObj: this.state.newItemObj });
        }
        return (
            <View style={{ marginBottom: 15 }}>

                <DropdownInputBox
                    selectedValue={this.state.newItemObj.selectedParticular.id ? this.state.newItemObj.selectedParticular.id.toString() : "0"}
                    data={this.state.allExpanse}
                    onSelect={(value) => _onSelectParticular(value)}
                    headerText={"*Particular"}
                />
            </View>
        )
    }

    roleAndQuantitySection = () => {
        const _onChangeRate = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.newItemObj.rate = newText;
            this.setState({ newItemObj: this.state.newItemObj });

            calculateTotalParticularAmount();
        }

        const _onChangeQuantity = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.newItemObj.quantity = newText;
            this.setState({ newItemObj: this.state.newItemObj });

            calculateTotalParticularAmount();
        }

        const calculateTotalParticularAmount = () => {
            if (validateQuantityAmount(this.state.newItemObj)) {
                this.state.newItemObj.totalParticularAmount = parseInt(this.state.newItemObj.quantity) * parseInt(this.state.newItemObj.rate);
                this.setState({ newItemObj: this.state.newItemObj });
            } else {
                this.state.newItemObj.totalParticularAmount = 0;
                this.setState({ newItemObj: this.state.newItemObj });
            }
        }
        return (
            <View style={{ marginBottom: 15, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        value={this.state.newItemObj.rate}
                        borderRadius={25}
                        onChangeText={(value) => _onChangeRate(value)}
                        placeholder={"*Rate"}
                        keyboardType={"numeric"}
                        isActive={this.state.newItemObj.rateActive}
                        onFocus={() => {
                            this.state.newItemObj.rateActive = true;
                            this.setState({ newItemObj: this.state.newItemObj });
                        }}
                        onBlur={() => {
                            this.state.newItemObj.rateActive = false;
                            this.setState({ newItemObj: this.state.newItemObj });
                        }}
                        height={45}
                    />
                </View>
                <View style={{ width: "5%" }} />
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        value={this.state.newItemObj.quantity}
                        borderRadius={25}
                        onChangeText={(value) => _onChangeQuantity(value)}
                        placeholder={"*Quantity"}
                        keyboardType={"numeric"}
                        isActive={this.state.newItemObj.quantityActive}
                        onFocus={() => {
                            this.state.newItemObj.quantityActive = true;
                            this.setState({ newItemObj: this.state.newItemObj });
                        }}
                        onBlur={() => {
                            this.state.newItemObj.quantityActive = false;
                            this.setState({ newItemObj: this.state.newItemObj });
                        }}
                        height={45}
                    />
                </View>
            </View>
        )
    }

    descriptionSection = () => {
        const _onChangeDescription = (value) => {
            this.state.newItemObj.description = value;
            this.setState({ newItemObj: this.state.newItemObj });
        }
        return (
            <View style={{ marginBottom: 15 }}>
                <TextInputBox
                    value={this.state.newItemObj.description}
                    borderRadius={25}
                    onChangeText={(value) => _onChangeDescription(value)}
                    placeholder={"*Description"}
                    keyboardType={"default"}
                    isActive={this.state.newItemObj.descriptionActive}
                    onFocus={() => {
                        this.state.newItemObj.descriptionActive = true;
                        this.setState({ newItemObj: this.state.newItemObj });
                    }}
                    onBlur={() => {
                        this.state.newItemObj.descriptionActive = false;
                        this.setState({ newItemObj: this.state.newItemObj });
                    }}
                    height={45}
                />
            </View>
        )
    }

    remarksSection = () => {
        const _onChangeRemarks = (value) => {
            this.state.newItemObj.remarks = value;
            this.setState({ newItemObj: this.state.newItemObj });
        }
        return (
            <View style={{ marginBottom: 15 }}>
                <TextInputBox
                    value={this.state.newItemObj.remarks}
                    borderRadius={25}
                    // multiline={true}
                    onChangeText={(value) => _onChangeRemarks(value)}
                    placeholder={"*Remarks"}
                    keyboardType={"default"}
                    isActive={this.state.newItemObj.remarksActive}
                    onFocus={() => {
                        this.state.newItemObj.remarksActive = true;
                        this.setState({ newItemObj: this.state.newItemObj });
                    }}
                    onBlur={() => {
                        this.state.newItemObj.remarksActive = false;
                        this.setState({ newItemObj: this.state.newItemObj });
                    }}
                    alignItems={'flex-start'}
                    height={100}
                />
            </View>
        )
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: "2%", marginVertical: "5%" }}>
                    <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                    </TouchableOpacity>
                    <View style={CustomStyle.headerTextView}>
                        <Text style={styles.headerTxtMain}>{this.state.eventStatus == 2 ? "Expenses" : "Budget"}</Text>
                    </View>
                    <View style={CustomStyle.backButtonView} />
                </View>

                {this.state.pageloader ?
                    <Loader />
                    :
                    <>
                        {this.modalSection()}

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ marginHorizontal: "5%" }}>
                                {this.eventNameDescDSection()}
                                {this.budgetItemListSection()}
                                {this.budgetCalculationSection()}

                                {this.buttonSection()}
                            </View>
                            <View style={{ height: 80 }} />
                        </ScrollView>
                    </>
                }
            </SafeAreaView>
        )
    }
}

// export default CreateAndEditBudget;

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditBudget);