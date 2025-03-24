
import React from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { validateData } from "./function";
import styles from "./style";


class PersonalAndContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allContactType: [],
            checkPhoneLoader: false,
            isPhoneExists: false,
            allPageData: {}

        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    _onLoad = async () => {
        this.setState({
            allPageData: this.props.allPageData,
            allContactType: this.props.contactLandingData.contactTypData,
            pageloader: false
        })

    }

    _onChangeFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.firstName = newText
        this.setState(this.state)

    }

    _onChangeLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.lastName = newText
        this.setState(this.state)
    }

    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.phoneNumberArr[key].phoneNumber = newText
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

        if (responseData) {
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
        this.state.allPageData.emailArr = [
            { emailId: "", emailActive: false },
        ]
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {
        this.state.allPageData.emailArr[key].emailId = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeTitle = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.title = newText;
        this.setState(this.state)
    }

    _onSelectContactType = (value) => {
        let data = this.state.allContactType;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedContactType = value
        this.setState({
            allPageData: this.state.allPageData,
            allContactType: data,
        })
    }

    _onSelectStatus = (value) => {
        let data = this.state.allPageData.allStatus;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedStatus = value
        this.setState({
            allPageData: this.state.allPageData,
        })
    }
    _onAddPhoneNumber = () => {
        this.state.allPageData.phoneNumberArr.push({ "phoneNumber": "", "phoneNumberActive": false });
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeletePhoneNumber = (key) => {

        this.state.allPageData.phoneNumberArr.splice(key, 1);
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onAddEmail = () => {
        this.state.allPageData.emailArr.push({ "emailId": "", "emailActive": false });
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteEmail = (key) => {
        this.state.allPageData.emailArr.splice(key, 1);
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSave = () => {
        let emailId = [];
        this.props.allPageData.emailArr.map((obj) => {
            emailId.push(obj.emailId)
        })

        let phoneId = [];
        this.props.allPageData.phoneNumberArr.map((obj) => {
            phoneId.push(obj.phoneNumber)
        })
        let obj = {
            "selectedContactBusinessTypeData": this.state.allPageData.selectedContactBusinessTypeData,
            "firstName": this.state.allPageData.firstName,
            "lastName": this.state.allPageData.lastName,
            "phoneNumber": phoneId,
            "email": emailId,
            "phoneNumberArr": this.props.allPageData.phoneNumberArr,
            "emailArr": this.props.allPageData.emailArr,
            "title": this.state.allPageData.title,
            "selectedContactType": this.state.allPageData.selectedContactType.id ? this.state.allPageData.selectedContactType.id : "",
            "selectedStatus": this.state.allPageData.selectedStatus.id ? this.state.allPageData.selectedStatus.value : ""

        }

        let validatedData = validateData(obj);
        if (validatedData.status) {
            let data = {
                type: "next",
                pageNum: 2,
                data: obj
            }
            this.props.onSaveDataToParent(data);
        }
    }

    checkBoxItem = (item, key) => {
        return (
            <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                <CheckBox
                    type={"tick"}
                    borderRadius={30}
                    data={item.check}
                    onClickValue={() => this._onCheckPermission(item)}
                />
                <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>{item.name}</Text>
            </View>
        )
    }

    //  for status check
    _onCheckPermission = (item) => {
        let arr = this.state.allPageData.allContactBusinessTypeData;
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].id == item.id) {
                arr[i].check = true;
            } else {
                arr[i].check = false;
            }
        }
        this.state.allPageData.allContactBusinessTypeData = arr;
        this.state.allPageData.selectedContactBusinessTypeData = item.value;
        this.setState(this.state)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                        <View>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Contact Detailsssss</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Contact Business Type</Text>
                                <View style={{ height: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    {this.state.allPageData.allContactBusinessTypeData.map((item, key) => (
                                        this.checkBoxItem(item, key)
                                    ))}
                                </View>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.firstName}
                                    onChangeText={(value) => this._onChangeFirstName(value)}
                                    placeholder={"Enter First Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.firstNameAcive}
                                    onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.lastName}
                                    onChangeText={(value) => this._onChangeLastName(value)}
                                    placeholder={"Enter Last Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.lastNameAcive}
                                    onFocus={() => { this.state.allPageData.lastNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.lastNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.title}
                                    onChangeText={(value) => this._onChangeTitle(value)}
                                    placeholder={"Enter Title"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.titleAcive}
                                    onFocus={() => { this.state.allPageData.titleAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.titleAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedContactType.id ? this.state.allPageData.selectedContactType.id.toString() : "0"}
                                    data={this.state.allContactType}
                                    onSelect={(value) => this._onSelectContactType(value)}
                                    headerText={"Select Contact Type"}
                                    selectedText={this.state.allPageData.selectedContactType.name ? this.state.allPageData.selectedContactType.name : "Select Contract Type"}
                                    selectedTextColor={this.state.allPageData.selectedContactType.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedStatus.id ? this.state.allPageData.selectedStatus.id.toString() : ""}
                                    selectedValueType={"id"}
                                    data={this.state.allPageData.allStatus}
                                    onSelect={(value) => this._onSelectStatus(value)}
                                    headerText={"Select Status"}
                                    selectedText={this.state.allPageData.selectedStatus.name ? this.state.allPageData.selectedStatus.name : "Select Status"}
                                    selectedTextColor={this.state.allPageData.selectedStatus.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                {this.state.allPageData.phoneNumberArr.map((item, key) => (
                                    <View style={{ marginTop: 8 }} key={key}>
                                        <TextInputBox
                                            value={item.phoneNumber}
                                            onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                                            placeholder={"Enter Phone Number"}
                                            keyboardType={"numeric"}
                                            isActive={item.phoneNumberActive}
                                            onFocus={() => {
                                                this.state.allPageData.phoneNumberArr[key].phoneNumberActive = true;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            onBlur={() => {
                                                this.state.allPageData.phoneNumberArr[key].phoneNumberActive = false;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            isActivityLoader={this.state.checkPhoneLoader ? true : false}
                                            activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                                            activityLoaderSize={"small"}
                                            height={45}
                                            maxLength={10}
                                            returnKeyType={'default'}
                                            rightIcon={ImageName.DELETE_WITH_RED}
                                            isRightIcon={this.state.allPageData.phoneNumberArr.length > 1 ? true : false}
                                            onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                                        />
                                    </View>
                                ))}
                                {this.state.allPageData.phoneNumberArr.length < 2 ?
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View> :
                                    null
                                }
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                {this.state.allPageData.emailArr.map((item, key) => (
                                    <View style={{ marginTop: 8 }} key={key}>
                                        <TextInputBox
                                            value={item.emailId}
                                            onChangeText={(value) => this._onChangeEmail(value, key)}
                                            placeholder={"Enter Email Id"}
                                            keyboardType={"email-address"}
                                            isActive={item.emailActive}
                                            onFocus={() => {
                                                this.state.allPageData.emailArr[key].emailActive = true;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            onBlur={() => {
                                                this.state.allPageData.emailArr[key].emailActive = false;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            height={45}
                                            returnKeyType={'default'}
                                            rightIcon={ImageName.DELETE_WITH_RED}
                                            isRightIcon={this.state.allPageData.emailArr.length > 1 ? true : false}
                                            onPressRightIcon={() => this._onDeleteEmail(key)}
                                        />
                                    </View>
                                ))}
                                {this.state.allPageData.emailArr.length < 2 ?
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View> :
                                    null
                                }
                            </View>
                            {this.state.isPhoneExists ?
                                null
                                :
                                <View style={{ marginTop: 20, marginBottom: 40 }}>
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

export default PersonalAndContactDetails;