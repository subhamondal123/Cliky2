
import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { ErrorCode, LengthValidate } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { enquirySourceModifyData, modifyEnquirySourceArrData, modifyEnquiryTypeArrData, validateData } from "./function";
import styles from "./style";

class EnquiryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    getLandingData = async () => {
        let responseData = await MiddlewareCheck("getEnquiryLandingData", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                this.setState({
                    allEnquirySourceArr: modifyEnquirySourceArrData(enquirySourceData.enquirySourceList),
                    allEnquiryTypeArr: modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList),
                })
            }
        }
        this.setState({
            pageloader: false
        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onLoad = async () => {

        this.setState({ allPageData: this.props.allPageData, pageloader: false })

    }

    _OnSelectEnquirySource = (value) => {
        let data = this.state.allPageData.allEnquirySourceArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedEnquirySourceObj = value;
        this.state.allPageData.allEnquirySourceArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _OnSelectEnquiryType = (value) => {
        let data = this.state.allPageData.allEnquiryTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedEnquiryTypeObj = value;
        this.state.allPageData.allEnquiryTypeArr = data;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeOwnerFirstName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.ownerFirstName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeOwnerLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.ownerLastName = newText
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeAddress = (value) => {
        this.state.allPageData.address = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for ph number change
    _onChangePhoneNumber = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "mobile");
        this.state.allPageData.ownerPhoneArr[key].phone = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmail = (value, key) => {

        this.state.allPageData.ownerEmailArr[key].email = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    // for add ph number
    _onAddPhoneNumber = () => {
        let arr = this.state.allPageData.ownerPhoneArr;
        arr.push({ phone: "", phoneActive: false });
        this.state.allPageData.ownerPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    // for delete ph number
    _onDeletePhoneNumber = (key) => {
        let arr = this.state.allPageData.ownerPhoneArr;
        arr.splice(key, 1);
        this.state.allPageData.ownerPhoneArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for add the email
    _onAddEmail = () => {
        let arr = this.state.allPageData.ownerEmailArr;
        arr.push({ email: "", emailActive: false });
        this.state.allPageData.ownerEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    // for delete email from array
    _onDeleteEmail = (key) => {
        let arr = this.state.allPageData.ownerEmailArr;
        arr.splice(key, 1);
        this.state.allPageData.ownerEmailArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSave = () => {
        let nameArr = this.props.allPageData.ownerName.split(" ");
        let emailId = [];
        this.props.allPageData.ownerEmailArr.map((obj) => {
            emailId.push(obj.email)
        })

        let phoneId = [];
        this.props.allPageData.ownerPhoneArr.map((obj) => {
            phoneId.push(obj.phone)
        })

        let reqData = {
            "enquirySourceTypeId":this.state.allPageData.selectedEnquirySourceObj.id ? this.state.allPageData.selectedEnquirySourceObj.id : "",
            "enquirySourceId": this.state.allPageData.selectedEnquirySourceObj.id ? this.state.allPageData.selectedEnquirySourceObj.id : "",
            "enquiryTypeId": this.state.allPageData.selectedEnquiryTypeObj.id ? this.state.allPageData.selectedEnquiryTypeObj.id : "",
            "ownerName": this.state.allPageData.ownerFirstName + " " + this.state.allPageData.ownerLastName,
            "emailArr": this.props.allPageData.ownerEmailArr,
            "phoneNumberArr": this.props.allPageData.ownerPhoneArr,
            "ownerPhone": phoneId,
            "ownerEmail": emailId,
            "ownerFirstName": this.state.allPageData.ownerFirstName ? this.state.allPageData.ownerFirstName : "",
            "ownerLastName": this.state.allPageData.ownerLastName ? this.state.allPageData.ownerLastName : "",
            "address": this.state.allPageData.address ? this.state.allPageData.address : "",
            "enqAddress": this.state.allPageData.address ? this.state.allPageData.address : "",
        }

        let validatedData = validateData(reqData);
        if (validatedData.status) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2,
            }
            this.props.onSaveDataToParent(data);
        }
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

                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Enquiry Details</Text>

                            </View>
                        </View>

                        <View style={styles.container}>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedEnquirySourceObj.id ? this.state.allPageData.selectedEnquirySourceObj.id.toString() : "0"}
                                    data={this.state.allPageData.allEnquirySourceArr}
                                    onSelect={(value) => this._OnSelectEnquirySource(value)}
                                    headerText={"Enquiry Source*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedEnquiryTypeObj.id ? this.state.allPageData.selectedEnquiryTypeObj.id.toString() : "0"}
                                    data={this.state.allPageData.allEnquiryTypeArr}
                                    onSelect={(value) => this._OnSelectEnquiryType(value)}
                                    headerText={"Enquiry Type*"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.ownerFirstName}
                                    onChangeText={(value) => this._onChangeOwnerFirstName(value)}
                                    placeholder={"Owner First Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.ownerFirstNameActive}
                                    onFocus={() => { this.state.allPageData.ownerFirstNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.ownerFirstNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.ownerLastName}
                                    onChangeText={(value) => this._onChangeOwnerLastName(value)}
                                    placeholder={"Owner Last Name*"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.ownerLastNameActive}
                                    onFocus={() => { this.state.allPageData.ownerLastNameActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.ownerLastNameActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.ownerPhoneArr.map((item, key) => (
                                    <View style={{ marginTop: 8 }} key={key}>
                                        <TextInputBox
                                            placeholder={"Phone Number*"}
                                            height={45}
                                            value={item.phone}
                                            onChangeText={(value) => this._onChangePhoneNumber(value, key)}
                                            keyboardType={"number-pad"}
                                            maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                            isActive={item.phoneActive}
                                            onFocus={() => {
                                                this.state.allPageData.ownerPhoneArr[key].phoneActive = true;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            onBlur={() => {
                                                this.state.allPageData.ownerPhoneArr[key].phoneActive = false;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            rightIcon={ImageName.DELETE_WITH_RED}
                                            isRightIcon={this.state.allPageData.ownerPhoneArr.length > 1 ? true : false}
                                            onPressRightIcon={() => this._onDeletePhoneNumber(key)}
                                        />
                                    </View>

                                ))}
                                {this.state.allPageData.ownerPhoneArr.length < 2 ?
                                    <View style={{ alignItems: 'flex-end', marginTop: '2%' }}>
                                        <Text style={{ paddingHorizontal: 10, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: FontSize.SM, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddPhoneNumber()}>+ Add</Text>
                                    </View> :
                                    null
                                }

                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.allPageData.ownerEmailArr.map((item, key) => (
                                    <View style={{ marginTop: 8 }} key={key}>
                                        <TextInputBox
                                            placeholder={"Email"}
                                            height={45}
                                            value={item.email}
                                            onChangeText={(value) => this._onChangeEmail(value, key)}
                                            isActive={item.emailActive}
                                            onFocus={() => {
                                                this.state.allPageData.ownerEmailArr[key].phoneActive = true;
                                                this.setState({ allPageData: this.state.allPageData })

                                            }}
                                            keyboardType={"email-address"}
                                            onBlur={() => {
                                                this.state.allPageData.ownerEmailArr[key].phoneActive = false;
                                                this.setState({ allPageData: this.state.allPageData })
                                            }}
                                            rightIcon={ImageName.DELETE_WITH_RED}
                                            isRightIcon={this.state.allPageData.ownerEmailArr.length > 1 ? true : false}
                                            onPressRightIcon={() => this._onDeleteEmail(key)}
                                        />
                                    </View>
                                ))}

                                {this.state.allPageData.ownerEmailArr.length < 2 ?
                                    <View style={{ alignItems: 'flex-end', marginTop: '2%' }}>
                                        <Text style={{ paddingHorizontal: 10, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: FontSize.SM, color: Color.COLOR.RED.AMARANTH }} onPress={() => this._onAddEmail()}>+ Add</Text>
                                    </View> :
                                    null
                                }
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.address}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Address"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.addressActive}
                                    onFocus={() => { this.state.allPageData.addressActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.addressActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={95}
                                    multiline={true}
                                    alignItems={"flex-start"}
                                // editable={this.state.allPageData.selectedBusinessTypeObj.id == "0" ? true : false}
                                />
                            </View>


                            <View style={{ marginTop: 20, marginBottom: 40 }}>
                                <BigTextButton
                                    text={"Next"}
                                    onPress={() => this._onSave()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}


export default EnquiryDetails;