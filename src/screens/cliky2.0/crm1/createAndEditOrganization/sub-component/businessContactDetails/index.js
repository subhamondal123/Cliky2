import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { validateData } from "./function";
import styles from "./style";


class BusinessContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            orgName: "",
            orgNameActive: false,
            phoneNumberArr: [
                { phoneNumber: "", phoneNumberActive: false },
            ],
            emailArr: [
                { emailId: "", emailActive: false },
            ],
            annualRevenue: "",
            annualRevenueActive: false,
            numOfEmp: "",
            numOfEmpActive: false,
            orgDescription: "",
            orgDescriptionActive: false,

            checkPhoneLoader: false,
            isPhoneExists: false,
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {

        let allPageData = await this.props.allPageData
        this.setState({ allPageData: allPageData, pageloader: false })
    }

    _onChangeOrgName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.organizationName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeOrgDescription = (value) => {
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.businesDescription = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAnnualRevenue = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.annualRevenue = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeNumOfEmp = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.noOfEmployee = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.businessPhoneArr[key].phone = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
        if (value.length > 9) {
            this.checkMobileNoExistOrNot(value);
        }
    }

    checkMobileNoExistOrNot = async (txt) => {
        let reqData = {
            "phoneNumber": txt,
            "isProject": "0"
        }
        this.setState({ checkPhoneLoader: true })
        let responseData = await MiddlewareCheck("phoneNumberExist", reqData, this.props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: false })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: true })
                this.clearExistsData()
            }
        }
        this.setState({ checkPhoneLoader: false })
    }

    clearExistsData = () => {
        this.state.allPageData.noOfEmployee = "";
        this.state.allPageData.annualRevenue = "";
        this.state.allPageData.businesDescription = "";
        this.state.allPageData.businessEmailArr = [
            { email: "", emailActive: false },
        ];
        this.state.allPageData.selectedAssignedUserObj = {};

        this.setState({
            allData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "email");
        this.state.allPageData.businessEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.phone}
                    onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                    placeholder={"Enter Phone Number"}
                    keyboardType={"numeric"}
                    maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                    isActive={item.phoneActive}
                    onFocus={() => {
                        this.state.allPageData.businessPhoneArr[key].phoneActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.businessPhoneArr[key].phoneActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'done'}
                    isActivityLoader={this.state.checkPhoneLoader ? true : false}
                    activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                    activityLoaderSize={"small"}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.businessPhoneArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                />
            </React.Fragment>
        )
    }

    _onAddPhoneNumber = () => {
        let arr = this.state.allPageData.businessPhoneArr;
        arr.push({ phone: "", phoneActive: false });
        this.state.allPageData.businessPhoneArr = arr
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeletePhoneNumber = (key) => {
        let arr = this.state.allPageData.businessPhoneArr;
        arr.splice(key, 1);
        this.state.allPageData.businessPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={item.email}
                    onChangeText={(value) => this._onChangeEmail(value, key)}
                    placeholder={"Enter Email Id"}
                    keyboardType={"email-address"}
                    isActive={item.emailActive}
                    onFocus={() => {
                        this.state.allPageData.businessEmailArr[key].emailActive = true;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    onBlur={() => {
                        this.state.allPageData.businessEmailArr[key].emailActive = false;
                        this.setState({ allPageData: this.state.allPageData })
                    }}
                    height={45}
                    returnKeyType={'default'}
                    rightIcon={ImageName.DELETE_WITH_RED}
                    isRightIcon={this.state.allPageData.businessEmailArr.length > 1 ? true : false}
                    onPressRightIcon={() => this._onDeleteEmail(key)}
                />
            </React.Fragment>
        )
    }

    _onAddEmail = () => {
        let arr = this.state.allPageData.businessEmailArr;
        arr.push({ email: "", emailActive: false });
        this.state.allPageData.businessEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteEmail = (key) => {
        let arr = this.state.allPageData.businessEmailArr;
        arr.splice(key, 1);
        this.state.allPageData.businessEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onSelectAssignedUser = (value) => {
        let data = this.state.allPageData.assignedUserArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedAssignedUserObj = value
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    _onSave = () => {
        let emailId = [];
        this.state.allPageData.businessEmailArr.map((obj) => {
            emailId.push(obj.email)
        })

        let phoneId = [];
        this.state.allPageData.businessPhoneArr.map((obj) => {
            phoneId.push(obj.phone)
        })

        let reqData = {
            orgName: this.state.allPageData.organizationName ? this.state.allPageData.organizationName : "",
            orgPhoneNumber: phoneId ? phoneId : [],
            orgEmail: emailId ? emailId : [],
            description: this.state.allPageData.businesDescription ? this.state.allPageData.businesDescription : "",
            anualRevenue: this.state.allPageData.annualRevenue ? this.state.allPageData.annualRevenue : "",
            orgNumberOfEmployee: this.state.allPageData.noOfEmployee ? this.state.allPageData.noOfEmployee : "",
            emailArr: this.state.allPageData.businessEmailArr,
            phoneArr: this.state.allPageData.businessPhoneArr,
            assignTo: this.state.allPageData.selectedAssignedUserObj.id ? this.state.allPageData.selectedAssignedUserObj.id : "",
            assignType: "0"
        }

        let validData = validateData(reqData)
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 2,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <>
                        <Loader />
                    </>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Business Contact Details</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.organizationName}
                                    onChangeText={(value) => this._onChangeOrgName(value)}
                                    placeholder={"Organization Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.organizationNameActive}
                                    onFocus={() => { this.state.allPageData.organizationNameActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.organizationNameActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Phone Number</Text> */}
                                {this.state.allPageData.businessPhoneArr.map((item, key) => (
                                    this.phoneNumberSection(item, key)
                                ))}
                                {this.state.allPageData.businessPhoneArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Email Adderss</Text> */}
                                {this.state.allPageData.businessEmailArr.map((item, key) => (
                                    this.emailSection(item, key)
                                ))}
                                {this.state.allPageData.businessEmailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{"*"}</Text>Organization Description</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.businesDescription}
                                    onChangeText={(value) => this._onChangeOrgDescription(value)}
                                    placeholder={"Enter Description"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.businesDescriptionActive}
                                    onFocus={() => { this.state.allPageData.businesDescriptionActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.businesDescriptionActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    returnKeyType={'default'}
                                    alignItems={"flex-start"}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Annual Revenue</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.annualRevenue}
                                    onChangeText={(value) => this._onChangeAnnualRevenue(value)}
                                    placeholder={"Enter Annual Revenue"}
                                    keyboardType={"numeric"}
                                    isActive={this.state.allPageData.annualRevenueActive}
                                    onFocus={() => { this.state.allPageData.annualRevenueActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.annualRevenueActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Number Of Employee</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.noOfEmployee}
                                    onChangeText={(value) => this._onChangeNumOfEmp(value)}
                                    placeholder={"Enter Number Of Employee"}
                                    keyboardType={"numeric"}
                                    isActive={this.state.allPageData.noOfEmployeeActive}
                                    onFocus={() => { this.state.allPageData.noOfEmployeeActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.noOfEmployeeActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Assigned To</Text>
                                <View style={{ height: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    {this.state.allPageData.assignedToArr.map((item, key) => (
                                        <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                                            <CheckBox
                                                type={"tick"}
                                                borderRadius={30}
                                                data={item.check}

                                            />
                                            <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={{ marginBottom: 20, }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.userLoader ? null : <>
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedAssignedUserObj.id ? this.state.allPageData.selectedAssignedUserObj.id.toString() : "0"}
                                        data={this.state.allPageData.assignedUserArr}
                                        onSelect={(value) => this._onSelectAssignedUser(value)}
                                        headerText={"Select User*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </>}

                            </View>

                            {this.state.isPhoneExists ?
                                null
                                :
                                <View style={{ marginTop: 20, marginBottom: 40,}}>
                                    {this.state.checkPhoneLoader ?
                                        <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                        :
                                        <BigTextButton
                                            text={"Save & Next"}
                                            onPress={() => this._onSave()}
                                        />
                                    }

                                </View>
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default BusinessContactDetails;