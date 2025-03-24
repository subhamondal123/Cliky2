import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
} from '../../../enums';
import { ErrorCode, LengthValidate } from '../../../services/constant';
import { DropdownInputBox, TextInputBox, BigTextButton, CheckBox, Modal } from '../../../shared';

const businessPhoneDataArr = [{
    phoneNumber: "",
    countryCode: "91",
    isPrimary: true,
    selectedPhoneType: {
        id: 3,
        name: "personal"
    },
    phonetype: "personal",
    phoneActive: false
}]

const businessEmailDataArr = [{
    email: "",
    selectedEmailType: {
        id: 3,
        name: "personal"
    },
    emailtype: "personal",
    isPrimary: true,
    emailActive: false
},
]

const phoneTypeArray = [
    {
        id: 1,
        name: "business"
    }, {
        id: 2,
        name: "work"
    }, {
        id: 3,
        name: "personal"
    }, {
        id: 4,
        name: "home"
    }, {
        id: 5,
        name: "others"
    },
]


function AddContactModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    onCloseModal,
    modalType,
    submitData,
    data,
    customerList,
    selectedItemData,
    onPressAddContact
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    if (isVisible == false) return null;

    const [firstName, setFirstName] = useState("");
    const [firstNameActive, setFirstNameActive] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameActive, setLastNameActive] = useState(false);
    const [title, setTitle] = useState("");
    const [titleActive, setTitleActive] = useState(false);
    const [businessPhoneArr, setBusinessPhoneArr] = useState(businessPhoneDataArr);
    const [businessEmailArr, setBusinessEmailArr] = useState(businessEmailDataArr);
    const [phoneTypeArr, setPhoneTypeArr] = useState(phoneTypeArray);
    const [addProductLoader, setAddProductLoader] = useState(false);



    useEffect(async () => {

    }, []);

    const onChangeFirstName = (value) => {
        setFirstName(value);
    }

    const onChangeLastName = (value) => {
        setLastName(value);
    }

    const onChangeTitle = (value) => {
        setTitle(value);
    }

    const _onChangePhoneNumber = (value, key) => {
        const arr = [...businessPhoneArr];
        arr[key].phoneNumber = value;
        setBusinessPhoneArr(arr);
    }

    const _onClose = () => {
        onCloseModal();
        setBusinessPhoneArr(businessEmailDataArr);
        setBusinessPhoneArr(businessPhoneDataArr);
    }

    const setProductDataLoader = async (type) => {
        setAddProductLoader(type)
    }

    const _onAddPhoneNumber = async () => {
        await setProductDataLoader(true);
        let arr = businessPhoneArr;
        arr.push({
            phoneNumber: "",
            phoneActive: false,
            countryCode: "91",
            isPrimary: false,
            selectedPhoneType: {
                id: 3,
                name: "Personal"
            },
            phonetype: "Personal",
        });
        setBusinessPhoneArr(arr);
        await setProductDataLoader(false);
    }

    const _onDeletePhoneNumber = async (key) => {
        await setProductDataLoader(true);
        let arr = businessPhoneArr;
        arr.splice(key, 1);
        arr[0].isPrimary = true;
        setBusinessPhoneArr(arr);
        await setProductDataLoader(false);
    }

    const onClickPrimaryItem = (item, key) => {
        let arr = [...businessPhoneArr];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].isPrimary = true
            } else {
                arr[i].isPrimary = false
            }
        }
        setBusinessPhoneArr(arr);
    }

    const _onSelectPhoneType = (val, key) => {
        let arr = [...businessPhoneArr];
        arr[key].selectedPhoneType = val;
        arr[key].phonetype = val.name
        setBusinessPhoneArr(arr);
    }

    const _onChangeEmail = (value, key) => {
        let arr = [...businessEmailArr]
        arr[key].email = value;
        setBusinessEmailArr(arr);
    }

    const _onAddEmail = async () => {
        await setProductDataLoader(true);
        let arr = [...businessEmailArr];
        arr.push({
            email: "",
            emailActive: false,
            selectedEmailType: {
                id: 3,
                name: "Personal"
            },
            emailtype: "Personal",
            isPrimary: false,
        });
        setBusinessEmailArr(arr)
        await setProductDataLoader(false);
    }

    const _onDeleteEmail = async (key) => {
        await setProductDataLoader(true);
        let arr = [...businessEmailArr];
        arr.splice(key, 1);
        arr[0].isPrimary = true;
        setBusinessEmailArr(arr)
        await setProductDataLoader(false);
    }

    const onClickEmailPrimaryItem = (item, key) => {
        let arr = [...businessEmailArr];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].isPrimary = true
            } else {
                arr[i].isPrimary = false
            }
        }
        setBusinessEmailArr(arr)
    }

    const _onSelectEmailType = (val, key) => {
        let arr = [...businessEmailArr];
        arr[key].selectedEmailType = val;
        arr[key].emailtype = val.name
        setBusinessEmailArr(arr)
    }


    const phoneNumberSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, height: 45, borderRadius: 10, justifyContent: "center", paddingHorizontal: 10, marginRight: 5 }}>
                        <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.BLACK.PURE_BLACK }}>+{item.countryCode}</Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <TextInputBox
                            value={item.phoneNumber}
                            onChangeText={(value) => _onChangePhoneNumber(value, key)}
                            placeholder={"Enter Phone Number*"}
                            keyboardType={"numeric"}
                            maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                            // isActive={item.phoneActive}
                            // onFocus={() => {
                            //     this.state.allPageData.businessPhoneArr[key].phoneActive = true;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            // onBlur={() => {
                            //     this.state.allPageData.businessPhoneArr[key].phoneActive = false;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            height={45}
                            returnKeyType={'done'}
                            // isActivityLoader={this.state.checkPhoneLoader ? true : false}
                            // activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                            // activityLoaderSize={"small"}
                            rightIcon={ImageName.DELETE_WITH_RED}
                            isRightIcon={businessPhoneArr.length > 1 ? true : false}
                            onPressRightIcon={() => _onDeletePhoneNumber(key)}
                        />
                    </View>

                    <View style={{ marginLeft: 10, flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedPhoneType.id ? item.selectedPhoneType.id.toString() : "0"}
                            data={phoneTypeArr}
                            onSelect={(value) => _onSelectPhoneType(value, key)}
                            headerText={"PhoneType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                        />

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => onClickPrimaryItem(item, key)}

                        />
                    </View>
                </View>

            </React.Fragment>
        )
    }

    const emailSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 0.7 }}>
                        <TextInputBox
                            value={item.email}
                            onChangeText={(value) => _onChangeEmail(value, key)}
                            placeholder={"Enter Email Id*"}
                            keyboardType={"email-address"}
                            // isActive={item.emailActive}
                            // onFocus={() => {
                            //     this.state.allPageData.businessEmailArr[key].emailActive = true;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            // onBlur={() => {
                            //     this.state.allPageData.businessEmailArr[key].emailActive = false;
                            //     this.setState({ allPageData: this.state.allPageData })
                            // }}
                            height={45}
                            returnKeyType={'default'}
                            rightIcon={ImageName.DELETE_WITH_RED}
                            isRightIcon={businessEmailArr.length > 1 ? true : false}
                            onPressRightIcon={() => _onDeleteEmail(key)}
                        />
                    </View>
                    <View style={{ marginLeft: 10, flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={item.selectedEmailType.id ? item.selectedEmailType.id.toString() : "0"}
                            data={phoneTypeArr}
                            onSelect={(value) => _onSelectEmailType(value, key)}
                            headerText={"EmailType*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            fontSize={10}
                            upDownImgStyle={{ height: 10, width: 10, resizeMode: "contain" }}
                        />

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <CheckBox
                            type={"singleSelectBox"}
                            borderRadius={30}
                            data={item.isPrimary}
                            onClickValue={() => onClickEmailPrimaryItem(item, key)}

                        />
                    </View>
                </View>

            </React.Fragment>
        )
    }

    const onAddNewContact = () => {
        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "title": title,
            "phoneNumber": businessPhoneArr,
            "email": businessEmailArr,
            "organizationId": selectedItemData.organizationId,
            "masterMdouleTypeId": "20"
        }
        onPressAddContact(data);
        setBusinessEmailArr([{
            email: "",
            selectedEmailType: {
                id: 3,
                name: "personal"
            },
            emailtype: "personal",
            isPrimary: true,
            emailActive: false
        },
        ]);
        setBusinessPhoneArr([{
            phoneNumber: "",
            countryCode: "91",
            isPrimary: true,
            selectedPhoneType: {
                id: 3,
                name: "personal"
            },
            phonetype: "personal",
            phoneActive: false
        }]
        );
    }

    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            children={
                <View style={styles.modalview}>
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Add New Contact</Text>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => _onClose()}  >
                                <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                            <View style={{ marginBottom: 15 }} >
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>First Name</Text>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={firstName}
                                    onChangeText={(value) => onChangeFirstName(value)}
                                    placeholder={"Enter first name"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={firstNameActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setFirstNameActive(true) }}
                                    onBlur={() => { setFirstNameActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }} >
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Last Name</Text>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={lastName}
                                    onChangeText={(value) => onChangeLastName(value)}
                                    placeholder={"Enter last name"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={lastNameActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setLastNameActive(true) }}
                                    onBlur={() => { setLastNameActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }} >
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Ttile</Text>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={title}
                                    onChangeText={(value) => onChangeTitle(value)}
                                    placeholder={"Enter title"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={titleActive}
                                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                                    alignItems={'flex-start'}
                                    onFocus={() => { setTitleActive(true) }}
                                    onBlur={() => { setTitleActive(false) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Phone Number</Text> */}
                                {addProductLoader ?
                                    <ActivityIndicator /> :
                                    <>
                                        {businessPhoneArr.map((item, key) => (
                                            phoneNumberSection(item, key)
                                        ))}
                                    </>
                                }
                                {businessPhoneArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => _onAddPhoneNumber()}>+ Add</Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {addProductLoader ?
                                    <ActivityIndicator /> :
                                    <>
                                        {businessEmailArr.map((item, key) => (
                                            emailSection(item, key)
                                        ))}
                                    </>
                                }
                                {businessEmailArr.length > 1 ?
                                    null
                                    :
                                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                        <Text style={{ marginHorizontal: 15, color: Color.COLOR.RED.AMARANTH }} onPress={() => _onAddEmail()}>+ Add</Text>
                                    </View>
                                }
                            </View>
                            <BigTextButton
                                text={"Add Contact"}
                                onPress={() => onAddNewContact()}
                            />
                        </View>
                    </ScrollView>
                </View>
            }
        />
    );
}


AddContactModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    onCloseModal: () => { },
    modalType: "contact",
    submitData: () => { },
    data: {},
    customerList: [],
    selectedItemData: {},
    onPressAddContact: () => { }
};

AddContactModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onCloseModal: PropTypes.func,
    modalType: PropTypes.string,
    submitData: PropTypes.func,
    data: PropTypes.instanceOf(Object),
    customerList: PropTypes.array,
    selectedItemData: PropTypes.instanceOf(Object),
    onPressAddContact: PropTypes.func
};


export default AddContactModal;