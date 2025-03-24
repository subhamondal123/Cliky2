import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { FileUpload, LocationData, Toaster } from "../../../../../../services/common-view-function";
import { App_uri } from "../../../../../../services/config";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { convertEmailsToAString, convertPhoneNumbersToAString, modifyAllData, modifyEventArr, modifyPlatformData, validateData } from "./function";
import styles from "./style";


class OnlineExistence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            platformArr: [],
            // imageUploadModal: false,
            // imageName: "",
            // imageUrl: "",
            // allPlatformArr: [
            //     {
            //         selectedTypeObj: {},
            //         link: "",
            //         linkActive: false
            //     }
            // ]
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({
            allPageData: this.props.allPageData,
            platformArr: this.props.contactLandingData.platformData,
            pageloader: false
        })
    }


    _onSelectLinkType = (value, key) => {
        this.state.allPageData.allPlatformArr[key].selectedTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLink = (value, key) => {
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.allPlatformArr[key].link = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _addAnother = () => {
        let obj = {
            selectedTypeObj: {},
            link: "",
            linkActive: false
        }

        let arr = this.state.allPageData.allPlatformArr;
        arr.push(obj);
        this.state.allPageData.allPlatformArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteArray = (key) => {
        let arr = this.state.allPageData.allPlatformArr;
        arr.splice(key, 1);
        this.state.allPageData.allPlatformArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    onOpenImagePickerModal = () => {
        this.openCloseImageUploadModal()
    }

    //for image picker
    _onChooseGallery = async () => {
        let uploadData = await FileUpload.uploadImg();
        this._onImageUpload(uploadData);
    }

    // get photo from camera
    _onChooseCamera = async () => {
        let uploadData = await FileUpload.uploadCameraImg();
        this._onImageUpload(uploadData);
    }

    _onImageUpload = async (uploadData) => {
        this.state.allPageData.imageUploadModal = false
        this.state.allPageData.profileImgLoader = true
        this.state.allPageData.imageName = uploadData.name
        this.setState({
            allPageData: this.state.allPageData,

        })

        let responseData = await MiddlewareFileCheck("imageupload", uploadData);
        this.state.allPageData.profileImgLoader = false
        this.setState({ allPageData: this.state.allPageData })
        if (responseData) {
            if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                this.state.allPageData.imageName = responseData.data.path + responseData.data.filename
                this.state.allPageData.imageUrl = uploadData.uri
                this.setState({
                    allPageData: this.state.allPageData
                })
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onBack = () => {
        let data = {
            pageNum: 5
        }
        this.props.onSaveDataToParent(data);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onSave = async () => {
        // let validatedData = validateData(this.state);
        // if (validatedData) {
        //     this.setState({
        //         pageloader: true
        //     })

        let loc = await LocationData.fetchCurrentLocation();
        let reqData = {
            // "bussinessType": this.state.allPageData.selectedContactBusinessTypeData.toString(),
            // "firstName": this.state.allPageData.firstName,
            // "lastName": this.state.allPageData.lastName,
            // "countryId": this.props.allData.selectedCountry,

            // "phoneNumber": await convertPhoneNumbersToAString(this.props.allData.phoneNumberArr),
            // "email": await convertEmailsToAString(this.props.allData.emailArr),
            // "title": this.props.allData.title,
            // "contactTypeId": this.props.allData.selectedContactType,
            // "status": this.props.allData.selectedStatus,

            // "address": this.props.allData.address,
            // "stateId": this.props.allData.selectedState,
            // "districtId": this.props.allData.selectedDistrictCity,
            // "zoneId": this.props.allData.selectedZone,
            // "geoLocation": this.props.route.params.type !== undefined && this.props.route.params.type == "edit" ? this.props.allData.geoLocation : null,

            // "orgName": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.orgName : "",
            // "orgPhoneNumber": this.props.allData.selectedContactBusinessTypeData == 1 ? await convertPhoneNumbersToAString(this.props.allData.orgPhoneNumberArr) : [],
            // "orgEmail": this.props.allData.selectedContactBusinessTypeData == 1 ? await convertEmailsToAString(this.props.allData.orgEmailArr) : [],
            // "orgAddress": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.orgAddress : "",
            // "orgCountryId": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.selectedOrgCountry : "",
            // "orgStateId": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.selectedOrgState : "",
            // "orgDistrictId": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.selectedOrgDistrictCity : "",
            // "orgZoneId": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.selectedOrgZone : "",
            // "orgGeoLocation": this.props.route.params.type !== undefined && this.props.route.params.type == "edit" ? this.props.allData.orgGeoLocation : null,
            // "orgLattitude": this.props.allData.selectedContactBusinessTypeData == 1 ? loc.latitude : "",
            // "orgLongitude": this.props.allData.selectedContactBusinessTypeData == 1 ? loc.longitude : "",
            // "orgAnualRevenue": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.orgAnnualRevenue : "",
            // "orgNumberOfEmployee": this.props.allData.selectedContactBusinessTypeData == 1 ? this.props.allData.orgNumOfEmp : "",
            // "description": this.props.allData.description,
            "profilePic": this.state.allPageData.imageName,
            // "enevtArr": await modifyEventArr(this.state.allPageData.datesToRemArr),
            "platformArr": modifyPlatformData(this.state.allPageData.allPlatformArr)
        }

        let validatedData = validateData(reqData);
        if (validatedData) {
            let data = {
                type: "next",
                pageNum: 6,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }
        // if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
        //     reqData["orgId"] = this.props.allData.organizationId;
        //     reqData["contactId"] = this.props.route.params.data.contactId;

        //     let responseData = await MiddlewareCheck("updateContactDetails", reqData, this.props);
        //     if (responseData === false) {
        //     } else {
        //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //             Toaster.ShortCenterToaster(responseData.message);
        //             this.props.route.params.onReloadPage();
        //             this.props.navigation.goBack();
        //         } else {
        //             Toaster.ShortCenterToaster(responseData.message)
        //         }
        //     }
        // } else {
        //     let responseData = await MiddlewareCheck("addContactDetails", reqData, this.props);
        //     if (responseData === false) {
        //     } else {
        //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //             Toaster.ShortCenterToaster(responseData.message);
        //             this.props.navigation.goBack();
        //         } else {
        //             Toaster.ShortCenterToaster(responseData.message)
        //         }
        //     }
        // }
        // this.setState({
        //     pageloader: false
        // })
        // }
    }

    renderItem = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.BLUE.LAPIS_LAZULI, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => this._onDeleteArray(key)}
                            activeOpacity={0.9}>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }

                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Platform</Text>
                        <View style={{ height: 10 }} />
                        <DropdownInputBox
                            selectedValue={item.selectedTypeObj.id ? item.selectedTypeObj.id.toString() : "0"}
                            data={this.state.platformArr}
                            onSelect={(value) => this._onSelectLinkType(value, key)}
                            headerText={"Select Platform"}
                            selectedText={item.selectedTypeObj.name ? item.selectedTypeObj.name : "Select Occasion"}
                            selectedTextColor={item.selectedTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                        <View style={{ height: 10 }} />
                        <TextInputBox
                            value={item.link}
                            onChangeText={(value) => this._onChangeLink(value, key)}
                            placeholder={"Enter Link"}
                            keyboardType={"default"}
                            isActive={item.linkActive}
                            onFocus={() => {
                                this.state.allPageData.allPlatformArr[key].linkActive = true
                                this.setState({ allPageData: this.state.allPageData })
                            }}
                            onBlur={() => {
                                this.state.allPageData.allPlatformArr[key].linkActive = false
                                this.setState({ allPageData: this.state.allPageData })
                            }}
                            height={45}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    openCloseImageUploadModal = () => {
        this.state.allPageData.imageUploadModal = !this.state.allPageData.imageUploadModal
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <>
                        <ImageUploadModal
                            isVisible={this.state.allPageData.imageUploadModal}
                            onCloseModal={() => this.openCloseImageUploadModal()}
                            onGallerySelect={() => this._onChooseGallery()}
                            onCameraSelect={() => this._onChooseCamera()}
                        />
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ marginVertical: 15 }}>
                                <View style={styles.blueBox}>
                                    <View style={styles.blueViewFlex}>
                                        <Text style={styles.listHeaderText}>Online Existence</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={{ marginBottom: 35 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={styles.profileImageView}>
                                            {this.state.allPageData.profileImgLoader ?
                                                <>
                                                    <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                                </>
                                                :
                                                <>
                                                    <Image source={this.state.allPageData.imageName.length == 0 ? ImageName.USER : { uri: App_uri.SFA_IMAGE_URI + this.state.allPageData.imageName }} style={styles.profileImage} />
                                                    <TouchableOpacity style={styles.cameraView}
                                                        activeOpacity={0.9}
                                                        onPress={() => this.onOpenImagePickerModal()}
                                                    >
                                                        <Image source={ImageName.CAMERA} style={styles.cameraImg} />
                                                    </TouchableOpacity>
                                                </>
                                            }
                                        </View>

                                        <View style={styles.belowImageText}>
                                            <Text style={{
                                                fontSize: FontSize.XS,
                                                fontFamily: FontFamily.FONTS.INTER.REGULAR,
                                                color: Color.COLOR.BLACK.PURE_BLACK
                                            }}>
                                                {"Upload File Below 100mb.\nSupported Format : Jpeg, jpg, png"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {this.state.allPageData.allPlatformArr.map((item, key) => (
                                    this.renderItem(item, key)
                                ))}

                                <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <TouchableOpacity
                                        style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                        onPress={() => this._addAnother()}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                    <BigTextButton
                                        text={"Previous"}
                                        onPress={() => this._onBack()}
                                    />
                                    <View style={{ width: "5%" }} />
                                    <BigTextButton
                                        text={this.props.route.params.type == "edit" ? "Update" : "Submit"}

                                        onPress={() => this._onSave()}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </>
                }
            </View>
        )
    }
}

export default OnlineExistence;